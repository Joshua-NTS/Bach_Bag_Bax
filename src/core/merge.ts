import {
  type ParsedScore,
  type VoiceStream,
  type Event,
  type Pitch,
  type SlotAssignment,
  type ClefName,
  type MeasureInfo,
  type SlotKey,
  diatonicOf,
} from './types';
import { chooseClef, clefById, ledgerLoad, staffSpan, suggestOctaveShifts, type ClefDef } from './clef';

export type LyricsMode = 'none' | 'top' | 'all';

/** Whole-octave display shift applied to one voice, in octaves. */
export type OctaveShift = -2 | -1 | 0 | 1 | 2;

export interface MergeOptions {
  assignment: SlotAssignment;
  octaves: Record<SlotKey, OctaveShift>;
  clef1: ClefName;
  clef2: ClefName;
  lyrics: LyricsMode;
  /** Names printed at the left of the first system, or null to hide them. */
  staffNames: [string, string] | null;
  title?: string;
  composer?: string;
  lyricist?: string;
}

export interface StaffPlanVoice {
  stream: VoiceStream;
  voiceNumber: number;
  stem: 'up' | 'down' | null;
  slot: SlotKey;
  octaveShift: OctaveShift;
}

export interface MergeResult {
  xml: string;
  clefs: [ClefDef, ClefDef];
  staves: StaffPlanVoice[][];
  measureCount: number;
  /** How far each staff reaches beyond its five lines, in ledger lines. */
  ledgerLoad: [number, number];
  /** Range each staff has to cover, in diatonic steps. */
  span: [number, number];
}

/* ------------------------------------------------------------------ */
/* Note-value arithmetic                                               */
/* ------------------------------------------------------------------ */

const NOTE_TYPES: Array<{ type: string; quarters: number }> = [
  { type: 'breve', quarters: 8 },
  { type: 'whole', quarters: 4 },
  { type: 'half', quarters: 2 },
  { type: 'quarter', quarters: 1 },
  { type: 'eighth', quarters: 0.5 },
  { type: '16th', quarters: 0.25 },
  { type: '32nd', quarters: 0.125 },
  { type: '64th', quarters: 0.0625 },
  { type: '128th', quarters: 0.03125 },
];

const DOTTED = NOTE_TYPES.flatMap((n) =>
  [0, 1, 2].map((dots) => ({
    type: n.type,
    dots,
    quarters: n.quarters * (dots === 0 ? 1 : dots === 1 ? 1.5 : 1.75),
  })),
).sort((a, b) => b.quarters - a.quarters || a.dots - b.dots);

interface Piece {
  duration: number;
  type: string;
  dots: number;
}

/** Break an arbitrary length into printable note values, largest first. */
function decompose(duration: number, divisions: number): Piece[] {
  const eps = divisions / 512;
  const out: Piece[] = [];
  let rem = duration;
  let guard = 0;
  while (rem > eps && guard++ < 32) {
    const hit = DOTTED.find((d) => d.quarters * divisions <= rem + eps);
    if (!hit) break;
    out.push({ duration: Math.min(rem, hit.quarters * divisions), type: hit.type, dots: hit.dots });
    rem -= hit.quarters * divisions;
  }
  if (out.length === 0) out.push({ duration, type: nearestType(duration, divisions), dots: 0 });
  return out;
}

function nearestType(duration: number, divisions: number): string {
  const quarters = duration / divisions;
  let best = NOTE_TYPES[3];
  for (const n of NOTE_TYPES) {
    if (Math.abs(n.quarters - quarters) < Math.abs(best.quarters - quarters)) best = n;
  }
  return best.type;
}

/* ------------------------------------------------------------------ */
/* XML helpers                                                         */
/* ------------------------------------------------------------------ */

function esc(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

const ACCIDENTAL_NAMES = new Set([
  'sharp',
  'natural',
  'flat',
  'double-sharp',
  'sharp-sharp',
  'flat-flat',
  'natural-sharp',
  'natural-flat',
  'quarter-flat',
  'quarter-sharp',
  'three-quarters-flat',
  'three-quarters-sharp',
]);

export function shiftPitch(pitch: Pitch, octaves: number): Pitch {
  return octaves === 0 ? pitch : { ...pitch, octave: pitch.octave + octaves };
}

/* ------------------------------------------------------------------ */
/* Planning                                                            */
/* ------------------------------------------------------------------ */

const STAFF_SLOTS: Array<[SlotKey, SlotKey]> = [
  ['s1upper', 's1lower'],
  ['s2upper', 's2lower'],
];

export function planStaves(
  score: ParsedScore,
  assignment: SlotAssignment,
  octaves: Record<SlotKey, OctaveShift>,
): StaffPlanVoice[][] {
  const byKey = new Map(score.streams.map((s) => [s.key, s]));
  return STAFF_SLOTS.map((slots) => {
    const present = slots
      .map((slot) => ({ slot, stream: assignment[slot] ? byKey.get(assignment[slot]!) : undefined }))
      .filter((e): e is { slot: SlotKey; stream: VoiceStream } => e.stream !== undefined);
    return present.map((e, i) => ({
      stream: e.stream,
      slot: e.slot,
      voiceNumber: i + 1,
      // Two voices on one staff need opposed stems to stay readable.
      stem: present.length > 1 ? (i === 0 ? ('up' as const) : ('down' as const)) : null,
      octaveShift: octaves[e.slot] ?? 0,
    }));
  });
}

/** Every written diatonic position on a staff, after octave shifts. */
export function staffPositions(voices: StaffPlanVoice[]): number[] {
  const out: number[] = [];
  for (const voice of voices) {
    for (const bar of voice.stream.measures) {
      for (const ev of bar) {
        for (const p of ev.pitches) out.push(diatonicOf(p) + voice.octaveShift * 7);
      }
    }
  }
  return out;
}

export const NO_OCTAVE_SHIFT: Record<SlotKey, OctaveShift> = {
  s1upper: 0,
  s1lower: 0,
  s2upper: 0,
  s2lower: 0,
};

/**
 * Choose an octave for each voice so the two sharing a staff actually fit on
 * it. Pairing soprano with tenor spans two octaves at written pitch, which is
 * legible only through a thicket of ledger lines.
 */
export function autoFitOctaves(
  score: ParsedScore,
  assignment: SlotAssignment,
): Record<SlotKey, OctaveShift> {
  const result = { ...NO_OCTAVE_SHIFT };
  for (const voices of planStaves(score, assignment, NO_OCTAVE_SHIFT)) {
    if (voices.length === 0) continue;
    const shifts = suggestOctaveShifts(voices.map((v) => staffPositions([v])));
    voices.forEach((voice, i) => {
      result[voice.slot] = Math.max(-2, Math.min(2, shifts[i] ?? 0)) as OctaveShift;
    });
  }
  return result;
}

/** How wide a staff has to reach once its two voices are on it. */
export const CROWDED_SPAN = 13;

/** True when, at written pitch, a staff would have to cover too much ground. */
export function needsOctaveFitting(score: ParsedScore, assignment: SlotAssignment): boolean {
  return planStaves(score, assignment, NO_OCTAVE_SHIFT).some(
    (voices) => voices.length >= 2 && staffSpan(staffPositions(voices)) >= CROWDED_SPAN,
  );
}

/* ------------------------------------------------------------------ */

export function buildMergedScore(score: ParsedScore, options: MergeOptions): MergeResult {
  const plan = planStaves(score, options.assignment, options.octaves);
  if (plan.every((voices) => voices.length === 0)) {
    throw new Error('No voices are assigned. Pick at least one voice for a staff.');
  }

  const clefDefs: [ClefDef, ClefDef] = [
    clefById(options.clef1 === 'auto' ? chooseClef(staffPositions(plan[0])) : options.clef1),
    clefById(options.clef2 === 'auto' ? chooseClef(staffPositions(plan[1])) : options.clef2),
  ];

  const load: [number, number] = [
    ledgerLoad(staffPositions(plan[0]), clefDefs[0]),
    ledgerLoad(staffPositions(plan[1]), clefDefs[1]),
  ];
  const span: [number, number] = [staffSpan(staffPositions(plan[0])), staffSpan(staffPositions(plan[1]))];

  const active = plan.map((voices, i) => ({ voices, index: i })).filter((s) => s.voices.length > 0);
  const divisions = score.divisions;
  const out: string[] = [];

  out.push('<?xml version="1.0" encoding="UTF-8"?>');
  out.push(
    '<!DOCTYPE score-partwise PUBLIC "-//Recordare//DTD MusicXML 4.0 Partwise//EN" ' +
      '"http://www.musicxml.org/dtds/partwise.dtd">',
  );
  out.push('<score-partwise version="4.0">');

  const title = options.title?.trim();
  const composer = options.composer?.trim();
  const lyricist = options.lyricist?.trim();
  if (title) out.push(`  <work><work-title>${esc(title)}</work-title></work>`);
  out.push('  <identification>');
  if (composer) out.push(`    <creator type="composer">${esc(composer)}</creator>`);
  if (lyricist) out.push(`    <creator type="lyricist">${esc(lyricist)}</creator>`);
  out.push('    <encoding><software>Bach Bag Bax</software></encoding>');
  out.push('  </identification>');

  /* The two staves are separate parts held together by a brace, which is what
     gives them proper names on the left of the first system. */
  out.push('  <part-list>');
  if (active.length > 1) {
    out.push('    <part-group type="start" number="1">');
    out.push('      <group-symbol>brace</group-symbol>');
    out.push('      <group-barline>yes</group-barline>');
    out.push('    </part-group>');
  }
  active.forEach((staff, i) => {
    const name = options.staffNames?.[staff.index]?.trim();
    const hidden = name ? '' : ' print-object="no"';
    out.push(`    <score-part id="P${i + 1}">`);
    out.push(`      <part-name${hidden}>${esc(name || `Staff ${staff.index + 1}`)}</part-name>`);
    out.push('    </score-part>');
  });
  if (active.length > 1) out.push('    <part-group type="stop" number="1"/>');
  out.push('  </part-list>');

  active.forEach((staff, i) => {
    const isFirstPart = i === 0;
    const clef = clefDefs[staff.index] ?? clefDefs[0];
    out.push(`  <part id="P${i + 1}">`);

    for (let mi = 0; mi < score.measures.length; mi++) {
      const info = score.measures[mi];
      out.push(`    <measure number="${esc(info.number)}"${info.implicit ? ' implicit="yes"' : ''}>`);

      if (mi > 0 && info.newPage) out.push('      <print new-page="yes"/>');
      else if (mi > 0 && info.newSystem) out.push('      <print new-system="yes"/>');

      const attrs = measureAttributes(info, mi, divisions, clef);
      if (attrs) out.push(attrs);

      if (isFirstPart) {
        const tempo = tempoDirection(info, mi);
        if (tempo) out.push(tempo);
        for (const dir of info.directions ?? []) {
          if (dir.kind === 'dynamics') continue; // a dynamic belongs to one voice, not the pair
          out.push(wordsDirection(dir.text, dir.placement ?? 'above'));
        }
      }

      const leftBar = leftBarline(info);
      if (leftBar) out.push(leftBar);

      let pendingBackup = 0;
      staff.voices.forEach((voice, vi) => {
        if (pendingBackup > 0) out.push(`      <backup><duration>${pendingBackup}</duration></backup>`);
        const wantsLyrics =
          options.lyrics === 'all' || (options.lyrics === 'top' && staff.index === 0 && vi === 0);
        for (const ev of voice.stream.measures[mi] ?? []) {
          const xml = noteXml(ev, {
            divisions,
            voiceNumber: voice.voiceNumber,
            stem: voice.stem,
            lyrics: wantsLyrics,
            octaveShift: voice.octaveShift,
          });
          if (xml) out.push(xml);
        }
        pendingBackup = Math.round(measureDuration(voice.stream, mi, info));
      });

      const rightBar = rightBarline(info);
      if (rightBar) out.push(rightBar);

      out.push('    </measure>');
    }
    out.push('  </part>');
  });

  out.push('</score-partwise>');

  return {
    xml: out.join('\n'),
    clefs: clefDefs,
    staves: plan,
    measureCount: score.measures.length,
    ledgerLoad: load,
    span,
  };
}

/* ------------------------------------------------------------------ */

function measureDuration(stream: VoiceStream, mi: number, info: MeasureInfo): number {
  let total = 0;
  for (const ev of stream.measures[mi] ?? []) total += ev.duration;
  return total || info.length;
}

function measureAttributes(
  info: MeasureInfo,
  mi: number,
  divisions: number,
  clef: ClefDef,
): string | null {
  const first = mi === 0;
  const hasKey = info.key !== undefined;
  const hasTime = info.time !== undefined;
  if (!first && !hasKey && !hasTime) return null;

  const lines: string[] = ['      <attributes>'];
  if (first) lines.push(`        <divisions>${Math.round(divisions)}</divisions>`);
  if (hasKey || first) {
    lines.push('        <key>');
    lines.push(`          <fifths>${info.key?.fifths ?? 0}</fifths>`);
    if (info.key?.mode) lines.push(`          <mode>${esc(info.key.mode)}</mode>`);
    lines.push('        </key>');
  }
  if (hasTime || first) {
    const time = info.time ?? { beats: 4, beatType: 4, symbol: undefined };
    const symbol = time.symbol && time.symbol !== 'normal' ? ` symbol="${esc(time.symbol)}"` : '';
    lines.push(`        <time${symbol}>`);
    lines.push(`          <beats>${time.beats}</beats>`);
    lines.push(`          <beat-type>${time.beatType}</beat-type>`);
    lines.push('        </time>');
  }
  if (first) {
    lines.push('        <clef>');
    lines.push(`          <sign>${clef.sign}</sign>`);
    lines.push(`          <line>${clef.line}</line>`);
    if (clef.octaveChange) {
      lines.push(`          <clef-octave-change>${clef.octaveChange}</clef-octave-change>`);
    }
    lines.push('        </clef>');
  }
  lines.push('      </attributes>');
  return lines.join('\n');
}

function tempoDirection(info: MeasureInfo, mi: number): string | null {
  if (info.tempo === undefined) return null;
  const qpm = Math.round(info.tempo);
  if (!Number.isFinite(qpm) || qpm <= 0) return null;
  const showText = mi === 0 || info.tempoText !== undefined;
  const lines = ['      <direction placement="above" directive="yes">'];
  if (showText) {
    lines.push('        <direction-type>');
    lines.push('          <metronome parentheses="no">');
    lines.push('            <beat-unit>quarter</beat-unit>');
    lines.push(`            <per-minute>${qpm}</per-minute>`);
    lines.push('          </metronome>');
    lines.push('        </direction-type>');
  }
  lines.push(`        <sound tempo="${qpm}"/>`);
  lines.push('      </direction>');
  return lines.join('\n');
}

function wordsDirection(text: string, placement: 'above' | 'below'): string {
  return [
    `      <direction placement="${placement}">`,
    '        <direction-type>',
    `          <words>${esc(text)}</words>`,
    '        </direction-type>',
    '      </direction>',
  ].join('\n');
}

function leftBarline(info: MeasureInfo): string | null {
  const endings = info.endings.filter((e) => e.location === 'left');
  if (!info.repeatForward && endings.length === 0) return null;
  const lines = ['      <barline location="left">'];
  if (info.repeatForward) lines.push('        <bar-style>heavy-light</bar-style>');
  for (const e of endings) lines.push(`        <ending number="${e.numbers.join(', ')}" type="${e.type}"/>`);
  if (info.repeatForward) lines.push('        <repeat direction="forward"/>');
  lines.push('      </barline>');
  return lines.join('\n');
}

function rightBarline(info: MeasureInfo): string | null {
  const endings = info.endings.filter((e) => e.location === 'right');
  const style = info.repeatBackward ? 'light-heavy' : info.barStyleRight;
  if (!style && !info.repeatBackward && endings.length === 0) return null;
  const lines = ['      <barline location="right">'];
  if (style) lines.push(`        <bar-style>${esc(style)}</bar-style>`);
  for (const e of endings) lines.push(`        <ending number="${e.numbers.join(', ')}" type="${e.type}"/>`);
  if (info.repeatBackward) {
    const times = info.repeatBackward > 2 ? ` times="${info.repeatBackward}"` : '';
    lines.push(`        <repeat direction="backward"${times}/>`);
  }
  lines.push('      </barline>');
  return lines.join('\n');
}

/* ------------------------------------------------------------------ */

interface NoteContext {
  divisions: number;
  voiceNumber: number;
  stem: 'up' | 'down' | null;
  lyrics: boolean;
  octaveShift: OctaveShift;
}

function noteXml(ev: Event, ctx: NoteContext): string {
  const isRest = ev.pitches.length === 0;
  if (ev.grace) return graceNoteXml(ev, ctx);

  if (isRest && ev.measureRest) {
    return block([
      '<note>',
      '  <rest measure="yes"/>',
      `  <duration>${Math.max(1, Math.round(ev.duration))}</duration>`,
      `  <voice>${ctx.voiceNumber}</voice>`,
      '</note>',
    ]);
  }

  // Trust the source's printed note value when it gave us one; only lengths we
  // invented (gap-filling rests) have to be broken down.
  const pieces = ev.noteType
    ? [{ duration: ev.duration, type: ev.noteType, dots: ev.dots }]
    : decompose(ev.duration, ctx.divisions);
  const rounded = roundPieces(pieces, ev.duration);
  const chunks: string[] = [];

  rounded.forEach((piece, index) => {
    const isFirst = index === 0;
    const isLast = index === rounded.length - 1;
    // Notes we had to split are tied back together so they still sound as one.
    const tieStop = (ev.tieStop && isFirst) || !isFirst;
    const tieStart = (ev.tieStart && isLast) || !isLast;

    if (isRest) {
      chunks.push(
        block([
          '<note>',
          '  <rest/>',
          `  <duration>${piece.duration}</duration>`,
          `  <voice>${ctx.voiceNumber}</voice>`,
          `  <type>${piece.type}</type>`,
          ...dots(piece.dots),
          '</note>',
        ]),
      );
      return;
    }

    ev.pitches.forEach((rawPitch, pi) => {
      const pitch = shiftPitch(rawPitch, ctx.octaveShift);
      const accidental = ev.accidentals[pi];
      const showAccidental = isFirst && accidental && ACCIDENTAL_NAMES.has(accidental);
      const notations: string[] = [];
      if (tieStop) notations.push('    <tied type="stop"/>');
      if (tieStart) notations.push('    <tied type="start"/>');
      if (pi === 0 && isFirst && ev.slurStart) notations.push('    <slur type="start" number="1"/>');
      if (pi === 0 && isLast && ev.slurStop) notations.push('    <slur type="stop" number="1"/>');
      if (pi === 0 && isFirst && ev.tuplet === 'start') notations.push('    <tuplet type="start"/>');
      if (pi === 0 && isLast && ev.tuplet === 'stop') notations.push('    <tuplet type="stop"/>');
      if (pi === 0 && isFirst && ev.articulations.length) {
        notations.push('    <articulations>');
        for (const a of ev.articulations) notations.push(`      <${a}/>`);
        notations.push('    </articulations>');
      }
      if (pi === 0 && isLast && ev.fermata) {
        notations.push(`    <fermata type="${ctx.stem === 'down' ? 'inverted' : 'upright'}"/>`);
      }

      const lyrics: string[] = [];
      if (ctx.lyrics && pi === 0 && isFirst) {
        for (const ly of ev.lyrics) {
          lyrics.push(`  <lyric number="${ly.verse}">`);
          if (ly.syllabic) lyrics.push(`    <syllabic>${ly.syllabic}</syllabic>`);
          lyrics.push(`    <text>${esc(ly.text)}</text>`);
          if (ly.extend) lyrics.push('    <extend/>');
          lyrics.push('  </lyric>');
        }
      }

      chunks.push(
        block([
          '<note>',
          pi > 0 ? '  <chord/>' : null,
          ev.cue ? '  <cue/>' : null,
          '  <pitch>',
          `    <step>${pitch.step}</step>`,
          pitch.alter ? `    <alter>${pitch.alter}</alter>` : null,
          `    <octave>${pitch.octave}</octave>`,
          '  </pitch>',
          `  <duration>${piece.duration}</duration>`,
          tieStop ? '  <tie type="stop"/>' : null,
          tieStart ? '  <tie type="start"/>' : null,
          `  <voice>${ctx.voiceNumber}</voice>`,
          `  <type>${piece.type}</type>`,
          ...dots(piece.dots),
          showAccidental ? `  <accidental>${accidental}</accidental>` : null,
          ev.timeMod
            ? `  <time-modification><actual-notes>${ev.timeMod.actual}</actual-notes>` +
              `<normal-notes>${ev.timeMod.normal}</normal-notes></time-modification>`
            : null,
          ctx.stem ? `  <stem>${ctx.stem}</stem>` : null,
          notations.length ? `  <notations>\n${notations.join('\n')}\n  </notations>` : null,
          ...lyrics,
          '</note>',
        ]),
      );
    });
  });

  return chunks.join('\n');
}

function graceNoteXml(ev: Event, ctx: NoteContext): string {
  if (!ev.pitches.length) return '';
  return ev.pitches
    .map((raw, pi) => {
      const pitch = shiftPitch(raw, ctx.octaveShift);
      return block([
        '<note>',
        `  <grace${ev.graceSlash ? ' slash="yes"' : ''}/>`,
        pi > 0 ? '  <chord/>' : null,
        '  <pitch>',
        `    <step>${pitch.step}</step>`,
        pitch.alter ? `    <alter>${pitch.alter}</alter>` : null,
        `    <octave>${pitch.octave}</octave>`,
        '  </pitch>',
        `  <voice>${ctx.voiceNumber}</voice>`,
        `  <type>${ev.noteType ?? 'eighth'}</type>`,
        ctx.stem ? `  <stem>${ctx.stem}</stem>` : null,
        '</note>',
      ]);
    })
    .join('\n');
}

function dots(count: number): string[] {
  return Array.from({ length: Math.max(0, Math.min(3, count)) }, () => '  <dot/>');
}

function block(lines: Array<string | null>): string {
  return lines
    .filter((l): l is string => l !== null && l !== '')
    .map((l) => `      ${l}`)
    .join('\n');
}

/** Round each piece to whole divisions while keeping the total exact. */
function roundPieces(pieces: Piece[], total: number): Piece[] {
  const target = Math.max(0, Math.round(total));
  const out = pieces.map((p) => ({ ...p, duration: Math.max(0, Math.round(p.duration)) }));
  const sum = out.reduce((a, p) => a + p.duration, 0);
  if (out.length && sum !== target) out[out.length - 1].duration += target - sum;
  return out.filter((p) => p.duration > 0);
}
