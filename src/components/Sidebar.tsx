import { type ParsedScore, type Role, type SlotKey, type ClefName, ROLE_LABEL, SLOT_LABEL } from '../core/types';
import { type Pairing, PAIRINGS } from '../core/detect';
import { CROWDED_SPAN, type LyricsMode, type MergeResult, type OctaveShift } from '../core/merge';
import { type LayoutSettings, PAPERS, MUSIC_FONTS, DEFAULT_LAYOUT } from '../core/paper';
import { type MidiOptions, GM_PROGRAMS } from '../core/midi';
import { QUANTIZE_CHOICES, type MidiImportOptions } from '../core/midifile';
import { CLEFS } from '../core/clef';
import { Panel, Field, Slider, Segmented, Toggle, Select, NumberInput, Notice, Icon } from './ui';

const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

/** Whole-octave display shift for one voice. */
const OCTAVE_OPTIONS = [
  { value: '-2', label: '-2 oct' },
  { value: '-1', label: '-1 oct' },
  { value: '0', label: 'as is' },
  { value: '1', label: '+1 oct' },
  { value: '2', label: '+2 oct' },
];

function noteName(midi: number): string {
  if (!Number.isFinite(midi) || midi <= 0) return '–';
  return `${NOTE_NAMES[Math.round(midi) % 12]}${Math.floor(Math.round(midi) / 12) - 1}`;
}

export interface ScoreSettings {
  pairing: Pairing;
  assignment: Record<SlotKey, string | null>;
  octaves: Record<SlotKey, OctaveShift>;
  clef1: ClefName;
  clef2: ClefName;
  lyrics: LyricsMode;
  staffLabels: boolean;
  splitChords: boolean;
  title: string;
  composer: string;
}

interface Props {
  score: ParsedScore;
  merged: MergeResult | null;
  settings: ScoreSettings;
  roles: Map<string, Role>;
  layout: LayoutSettings;
  midiOptions: MidiOptions;
  hasLyrics: boolean;
  canSplitChords: boolean;
  scoreHasRepeats: boolean;
  showGuides: boolean;
  warnings: string[];
  /** Present only when the loaded file was a MIDI file. */
  midiImport: MidiImportOptions | null;
  onMidiImport: (patch: Partial<MidiImportOptions>) => void;
  onSettings: (patch: Partial<ScoreSettings>) => void;
  onLayout: (patch: Partial<LayoutSettings>) => void;
  onMidi: (patch: Partial<MidiOptions>) => void;
  onGuides: (value: boolean) => void;
  onResetLayout: () => void;
  onFitOctaves: () => void;
  onResetOctaves: () => void;
  onDownloadMidi: (staff?: number) => void;
  onDownloadXml: () => void;
}

export function Sidebar(props: Props) {
  const {
    score,
    merged,
    settings,
    roles,
    layout,
    midiOptions,
    hasLyrics,
    canSplitChords,
    scoreHasRepeats,
    showGuides,
    warnings,
    midiImport,
    onMidiImport,
    onSettings,
    onLayout,
    onMidi,
    onGuides,
    onResetLayout,
    onFitOctaves,
    onResetOctaves,
    onDownloadMidi,
    onDownloadXml,
  } = props;

  const voiceOptions = [
    { value: '', label: '— none —' },
    ...score.streams.map((s) => {
      const role = roles.get(s.key);
      // The part name usually already says "Soprano"; only add the role when
      // it tells the reader something the name does not.
      const name = s.partName.trim() || 'Unnamed';
      const redundant = role && name.toLowerCase().startsWith(ROLE_LABEL[role].slice(0, 3).toLowerCase());
      const prefix = role && !redundant ? `${role} · ` : '';
      const voice = s.voice !== '1' ? ` v${s.voice}` : '';
      return {
        value: s.key,
        label: `${prefix}${name}${voice} · ${noteName(s.minMidi)}–${noteName(s.maxMidi)}`,
      };
    }),
  ];
  const labelFor = (key: string | null) => voiceOptions.find((o) => o.value === (key ?? ''))?.label;

  const clefOptions: Array<{ value: ClefName; label: string }> = [
    { value: 'auto', label: 'Automatic' },
    ...CLEFS.map((c) => ({ value: c.id as ClefName, label: c.label })),
  ];

  const paperOptions = PAPERS.map((p) => ({
    value: p.id,
    label: p.id === 'custom' ? 'Custom…' : `${p.label} · ${trim(p.width)} × ${trim(p.height)} mm`,
  }));

  const shifts = (['s1upper', 's1lower', 's2upper', 's2lower'] as SlotKey[])
    .map((slot) => ({ slot, by: settings.octaves[slot] ?? 0, key: settings.assignment[slot] }))
    .filter((e) => e.by !== 0 && e.key);
  const shifted = shifts.length > 0;
  const shiftSummary = shifts
    .map((e) => {
      const stream = score.streams.find((s) => s.key === e.key);
      const role = e.key ? roles.get(e.key) : undefined;
      const name = role ? ROLE_LABEL[role] : (stream?.partName ?? 'A voice');
      const direction = e.by > 0 ? 'up' : 'down';
      const amount = Math.abs(e.by) === 1 ? 'an octave' : `${Math.abs(e.by)} octaves`;
      return `${name} is written ${amount} ${direction}`;
    })
    .join(', ');

  const crowded = merged
    ? merged.span
        .map((width, i) => (width >= CROWDED_SPAN ? `Staff ${i + 1} has to cover a wide range.` : ''))
        .filter(Boolean)
    : [];

  const staffLabelText = merged
    ? merged.staves.map((voices) =>
        voices
          .map((v) => {
            const role = roles.get(v.stream.key);
            return role ?? v.stream.partName.slice(0, 4);
          })
          .join(' + '),
      )
    : [];

  return (
    <aside className="sidebar">
      {warnings.length > 0 && (
        <div style={{ padding: '14px 16px 0' }}>
          <Notice kind="warn" icon="!">
            {warnings.map((w, i) => (
              <div key={i}>{w}</div>
            ))}
          </Notice>
        </div>
      )}

      {midiImport && (
        <Panel title="MIDI import" badge="from .mid">
          <div className="field-hint">
            A MIDI file records key presses, not notation, so where the notes land has to be
            guessed. These two settings are the guesses.
          </div>
          <Segmented
            label="Snap notes to"
            value={String(midiImport.quantize)}
            options={QUANTIZE_CHOICES.map((q) => ({ value: String(q.value), label: q.label }))}
            hint={
              midiImport.quantize === 0
                ? 'Timing is kept exactly as recorded, which a live performance rarely survives.'
                : `Starts and lengths are rounded to the nearest 1/${midiImport.quantize} note.`
            }
            onChange={(value) => onMidiImport({ quantize: Number(value) })}
          />
          <Toggle
            label="Include the drum channel"
            checked={midiImport.includePercussion}
            onChange={(includePercussion) => onMidiImport({ includePercussion })}
          />
        </Panel>
      )}

      <Panel title="Voices" badge={`${score.streams.length} found`}>
        <Segmented<Pairing>
          label="Combine as"
          value={settings.pairing}
          options={PAIRINGS.map((p) => ({ value: p.id, label: p.label.replace(/\s+/g, ''), title: p.hint }))}
          hint={PAIRINGS.find((p) => p.id === settings.pairing)?.hint}
          onChange={(pairing) => onSettings({ pairing })}
        />

        <div className="voice-legend">
          {score.streams.map((s) => {
            const role = roles.get(s.key);
            return (
              <div className="voice-legend-row" key={s.key}>
                <span className="role-pill" data-role={role ?? ''}>
                  {role ?? '?'}
                </span>
                <span className="voice-legend-name">
                  {s.partName}
                  {s.voice !== '1' ? ` · voice ${s.voice}` : ''}
                </span>
                <span className="voice-legend-range">
                  {noteName(s.minMidi)}–{noteName(s.maxMidi)}
                </span>
              </div>
            );
          })}
        </div>

        {(['s1upper', 's1lower', 's2upper', 's2lower'] as SlotKey[]).map((slot) => (
          <div className="voice-slot" key={slot}>
            <span className="slot-tag">
              <span className={`slot-dot${slot.startsWith('s2') ? ' s2' : ''}`} />
              {SLOT_LABEL[slot].replace('Staff ', 'St ')}
            </span>
            <Select
              value={settings.assignment[slot] ?? ''}
              options={voiceOptions}
              title={labelFor(settings.assignment[slot])}
              onChange={(value) => onSettings({ assignment: { ...settings.assignment, [slot]: value || null } })}
            />
            <Select
              value={String(settings.octaves[slot] ?? 0)}
              options={OCTAVE_OPTIONS}
              disabled={!settings.assignment[slot]}
              onChange={(value) =>
                onSettings({ octaves: { ...settings.octaves, [slot]: Number(value) as OctaveShift } })
              }
            />
          </div>
        ))}

        <div className="row two">
          <button type="button" className="btn" onClick={onFitOctaves}>
            Fit to staves
          </button>
          <button type="button" className="btn" onClick={onResetOctaves} disabled={!shifted}>
            Original octaves
          </button>
        </div>
        {shifted ? (
          <div className="field-hint">
            {shiftSummary} so the two voices share a staff without a thicket of ledger lines. Choose
            <em> original octaves</em> to hear and print them exactly as written.
          </div>
        ) : crowded.length > 0 ? (
          <div className="field-hint">
            {crowded.join(' ')} Try <em>fit to staves</em>, another clef, or a different pairing.
          </div>
        ) : null}

        {canSplitChords && (
          <Toggle
            label="Split chords into separate voices"
            checked={settings.splitChords}
            onChange={(splitChords) => onSettings({ splitChords })}
          />
        )}
      </Panel>

      <Panel title="Staves" badge={merged ? merged.clefs.map((c) => c.label).join(' / ') : undefined}>
        <div className="row two">
          <Select<ClefName>
            label="Staff 1 clef"
            value={settings.clef1}
            options={clefOptions}
            onChange={(clef1) => onSettings({ clef1 })}
          />
          <Select<ClefName>
            label="Staff 2 clef"
            value={settings.clef2}
            options={clefOptions}
            onChange={(clef2) => onSettings({ clef2 })}
          />
        </div>
        <Segmented<LyricsMode>
          label="Lyrics"
          value={settings.lyrics}
          options={[
            { value: 'none', label: 'None' },
            { value: 'top', label: 'Top voice' },
            { value: 'all', label: 'Every voice' },
          ]}
          hint={hasLyrics ? undefined : 'This file has no lyrics.'}
          onChange={(lyrics) => onSettings({ lyrics })}
        />
        <Toggle
          label={`Label staves${staffLabelText.length ? ` (${staffLabelText.join(' / ')})` : ''}`}
          checked={settings.staffLabels}
          onChange={(staffLabels) => onSettings({ staffLabels })}
        />
        <Field label="Title">
          <input
            type="text"
            value={settings.title}
            placeholder="Untitled"
            onChange={(e) => onSettings({ title: e.target.value })}
          />
        </Field>
        <Field label="Composer">
          <input
            type="text"
            value={settings.composer}
            placeholder="—"
            onChange={(e) => onSettings({ composer: e.target.value })}
          />
        </Field>
      </Panel>

      <Panel title="Page">
        <Select
          label="Paper size"
          value={layout.paper}
          options={paperOptions}
          onChange={(paper) => onLayout({ paper })}
        />
        {layout.paper === 'custom' && (
          <div className="row two">
            <NumberInput
              label="Width"
              suffix="mm"
              value={layout.customWidth}
              min={40}
              max={1000}
              onChange={(customWidth) => onLayout({ customWidth })}
            />
            <NumberInput
              label="Height"
              suffix="mm"
              value={layout.customHeight}
              min={40}
              max={1000}
              onChange={(customHeight) => onLayout({ customHeight })}
            />
          </div>
        )}
        <Segmented
          label="Orientation"
          value={layout.orientation}
          options={[
            { value: 'portrait', label: 'Portrait' },
            { value: 'landscape', label: 'Landscape' },
          ]}
          onChange={(orientation) => onLayout({ orientation })}
        />

        <Field label="Margins" value="mm">
          <div className="row four">
            {(['top', 'right', 'bottom', 'left'] as const).map((side) => (
              <label key={side} style={{ display: 'grid', gap: 4 }}>
                <span className="field-value" style={{ textTransform: 'capitalize' }}>
                  {side}
                </span>
                <input
                  type="number"
                  min={0}
                  max={80}
                  step={1}
                  value={layout.margins[side]}
                  aria-label={`${side} margin in millimetres`}
                  onChange={(e) => {
                    const v = Number(e.target.value);
                    if (Number.isFinite(v)) {
                      onLayout({ margins: { ...layout.margins, [side]: Math.min(80, Math.max(0, v)) } });
                    }
                  }}
                />
              </label>
            ))}
          </div>
        </Field>

        <Toggle label="Show margin guides" checked={showGuides} onChange={onGuides} />
      </Panel>

      <Panel title="Music size &amp; spacing">
        <Slider
          label="Music size"
          value={layout.scale}
          min={40}
          max={220}
          step={1}
          suffix="%"
          hint="The staff and every symbol on it, relative to the paper."
          onChange={(scale) => onLayout({ scale })}
        />
        <Slider
          label="Distance between the two staves"
          value={layout.staffGap}
          min={0}
          max={40}
          step={0.5}
          format={(v) => v.toFixed(1)}
          onChange={(staffGap) => onLayout({ staffGap })}
        />
        <Slider
          label="Distance between systems"
          value={layout.systemGap}
          min={0}
          max={40}
          step={0.5}
          format={(v) => v.toFixed(1)}
          hint="How much air between one line of music and the next."
          onChange={(systemGap) => onLayout({ systemGap })}
        />
        <Slider
          label="Note spacing"
          value={layout.noteSpacing}
          min={0.05}
          max={0.8}
          step={0.01}
          format={(v) => v.toFixed(2)}
          hint="Lower packs more bars onto each line."
          onChange={(noteSpacing) => onLayout({ noteSpacing })}
        />
        <Slider
          label="Lyric size"
          value={layout.lyricSize}
          min={2}
          max={8}
          step={0.1}
          format={(v) => v.toFixed(1)}
          onChange={(lyricSize) => onLayout({ lyricSize })}
        />
        <Slider
          label="Staff line thickness"
          value={layout.staffLineWidth}
          min={0.1}
          max={0.3}
          step={0.01}
          format={(v) => v.toFixed(2)}
          onChange={(staffLineWidth) => onLayout({ staffLineWidth })}
        />
        <Select
          label="Music font"
          value={layout.font}
          options={MUSIC_FONTS.map((f) => ({ value: f, label: f }))}
          onChange={(font) => onLayout({ font })}
        />
        <Segmented
          label="Line breaks"
          value={layout.breaks}
          options={[
            { value: 'auto', label: 'Automatic' },
            { value: 'smart', label: 'Smart' },
            { value: 'encoded', label: 'As in file' },
          ]}
          onChange={(breaks) => onLayout({ breaks })}
        />
        <Toggle
          label="Spread systems down the page"
          checked={layout.justifyVertically}
          onChange={(justifyVertically) => onLayout({ justifyVertically })}
        />
        <Toggle label="Print title block" checked={layout.showHeader} onChange={(showHeader) => onLayout({ showHeader })} />
        <Toggle
          label="Print page numbers"
          checked={layout.showFooter}
          onChange={(showFooter) => onLayout({ showFooter })}
        />
        <button type="button" className="btn wide" onClick={onResetLayout} disabled={isDefaultLayout(layout)}>
          <Icon.Reset /> Reset layout
        </button>
      </Panel>

      <Panel title="MIDI" defaultOpen={false}>
        <div className="row two">
          <Select
            label="Staff 1 sound"
            value={String(midiOptions.programs[0])}
            options={GM_PROGRAMS.map((p) => ({ value: String(p.value), label: p.label }))}
            onChange={(v) => onMidi({ programs: [Number(v), midiOptions.programs[1]] })}
          />
          <Select
            label="Staff 2 sound"
            value={String(midiOptions.programs[1])}
            options={GM_PROGRAMS.map((p) => ({ value: String(p.value), label: p.label }))}
            onChange={(v) => onMidi({ programs: [midiOptions.programs[0], Number(v)] })}
          />
        </div>
        <Slider
          label="Tempo"
          value={midiOptions.tempoScale}
          min={0.4}
          max={2}
          step={0.01}
          format={(v) => `${Math.round(v * 100)}`}
          suffix="%"
          hint={
            score.measures.some((m) => m.tempo !== undefined)
              ? 'Scales the tempo written in the file.'
              : `The file has no tempo, so ${midiOptions.fallbackTempo} bpm is used.`
          }
          onChange={(tempoScale) => onMidi({ tempoScale })}
        />
        {!score.measures.some((m) => m.tempo !== undefined) && (
          <Slider
            label="Base tempo"
            value={midiOptions.fallbackTempo}
            min={30}
            max={220}
            step={1}
            suffix=" bpm"
            onChange={(fallbackTempo) => onMidi({ fallbackTempo })}
          />
        )}
        <Slider
          label="Note length"
          value={midiOptions.gate}
          min={0.4}
          max={1}
          step={0.01}
          format={(v) => `${Math.round(v * 100)}`}
          suffix="%"
          hint="Shorter notes give a more detached, easier-to-follow line."
          onChange={(gate) => onMidi({ gate })}
        />
        <Toggle
          label="Play repeats out"
          checked={midiOptions.expandRepeats}
          onChange={(expandRepeats) => onMidi({ expandRepeats })}
        />
        {!scoreHasRepeats && <div className="field-hint">This score has no repeat signs.</div>}
        <Toggle
          label="One MIDI channel per staff"
          checked={midiOptions.separateChannels}
          onChange={(separateChannels) => onMidi({ separateChannels })}
        />
        <Toggle
          label="Play the octave shifts too"
          checked={midiOptions.followOctaveShifts}
          onChange={(followOctaveShifts) => onMidi({ followOctaveShifts })}
        />
        <div className="field-hint">
          {midiOptions.followOctaveShifts
            ? 'The MIDI matches the printed page.'
            : 'The MIDI keeps the original pitches, whatever the page shows.'}
        </div>

        <button type="button" className="btn wide primary" onClick={() => onDownloadMidi()}>
          <Icon.Download /> Download MIDI (2 tracks)
        </button>
        <div className="row two">
          <button type="button" className="btn" onClick={() => onDownloadMidi(0)}>
            Staff 1 only
          </button>
          <button type="button" className="btn" onClick={() => onDownloadMidi(1)}>
            Staff 2 only
          </button>
        </div>
        <button type="button" className="btn wide" onClick={onDownloadXml}>
          <Icon.Download /> Download merged MusicXML
        </button>
      </Panel>
    </aside>
  );
}

function trim(n: number): string {
  return String(Math.round(n * 10) / 10);
}

function isDefaultLayout(layout: LayoutSettings): boolean {
  return JSON.stringify(layout) === JSON.stringify(DEFAULT_LAYOUT);
}
