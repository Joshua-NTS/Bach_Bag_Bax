import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { readScoreFile, baseName } from './core/mxl';
import { parseMusicXml } from './core/musicxml';
import { splitChordalStreams, shouldOfferChordSplit, detectRoles, assignmentFor } from './core/detect';
import {
  buildMergedScore,
  autoFitOctaves,
  needsOctaveFitting,
  NO_OCTAVE_SHIFT,
  type MergeResult,
} from './core/merge';
import { type ParsedScore, type Role, type SlotAssignment, ROLE_LABEL } from './core/types';
import { DEFAULT_LAYOUT, geometryFor, verovioOptions, type LayoutSettings } from './core/paper';
import { DEFAULT_MIDI_OPTIONS, renderMidi, type MidiOptions } from './core/midi';
import { hasRepeats } from './core/repeats';
import { engrave, loadToolkit } from './render/verovio';
import { ScorePlayer } from './core/audio';
import { DropZone, useWindowDrop } from './components/DropZone';
import { Sidebar, type ScoreSettings } from './components/Sidebar';
import { ScorePreview } from './components/ScorePreview';
import { PlayerBar } from './components/PlayerBar';
import { Icon, Notice } from './components/ui';
import { SAMPLE_CHORALE } from './sample';

const PX_PER_MM = 96 / 25.4;

const DEFAULT_SETTINGS: ScoreSettings = {
  pairing: 'ST_AB',
  assignment: { s1upper: null, s1lower: null, s2upper: null, s2lower: null },
  octaves: NO_OCTAVE_SHIFT,
  clef1: 'auto',
  clef2: 'auto',
  lyrics: 'top',
  staffLabels: true,
  splitChords: true,
  title: '',
  composer: '',
};

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [fileName, setFileName] = useState<string | null>(null);
  const [rawScore, setRawScore] = useState<ParsedScore | null>(null);
  const [settings, setSettings] = useState<ScoreSettings>(DEFAULT_SETTINGS);
  const [layout, setLayout] = useState<LayoutSettings>(DEFAULT_LAYOUT);
  const [midiOptions, setMidiOptions] = useState<MidiOptions>(DEFAULT_MIDI_OPTIONS);

  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [pages, setPages] = useState<string[]>([]);
  const [engraving, setEngraving] = useState(false);
  const [engraveError, setEngraveError] = useState<string | null>(null);

  const [zoomMode, setZoomMode] = useState<'fit' | 'manual'>('fit');
  const [zoom, setZoom] = useState(1);
  const [fitZoom, setFitZoom] = useState(1);
  const [showGuides, setShowGuides] = useState(false);

  const [playing, setPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [mutedStaves, setMutedStaves] = useState<boolean[]>([false, false]);
  const [followCursor, setFollowCursor] = useState(true);

  const scrollRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<ScorePlayer | null>(null);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  /* ---- the score, after the optional chord split ------------------ */
  const score = useMemo(() => {
    if (!rawScore) return null;
    return settings.splitChords && shouldOfferChordSplit(rawScore)
      ? splitChordalStreams(rawScore)
      : rawScore;
  }, [rawScore, settings.splitChords]);

  const roles = useMemo<Map<string, Role>>(() => (score ? detectRoles(score.streams) : new Map()), [score]);

  /* ---- loading ---------------------------------------------------- */
  const ingest = useCallback((xml: string, name: string) => {
    const parsed = parseMusicXml(xml);
    const effective =
      shouldOfferChordSplit(parsed) && DEFAULT_SETTINGS.splitChords ? splitChordalStreams(parsed) : parsed;
    const detected = detectRoles(effective.streams);
    const assignment = assignmentFor(effective.streams, detected, DEFAULT_SETTINGS.pairing);
    // S+T and A+B each span about two octaves at written pitch, so unless the
    // voices already fit a staff, start with them folded onto one.
    const octaves = needsOctaveFitting(effective, assignment)
      ? autoFitOctaves(effective, assignment)
      : NO_OCTAVE_SHIFT;
    setRawScore(parsed);
    setFileName(name);
    setSettings({
      ...DEFAULT_SETTINGS,
      assignment,
      octaves,
      title: parsed.title ?? '',
      composer: parsed.composer ?? '',
    });
    setPages([]);
    setLoadError(null);
    setEngraveError(null);
  }, []);

  const openFile = useCallback(
    async (file: File) => {
      setLoading(true);
      setLoadError(null);
      try {
        const { xml, name } = await readScoreFile(file);
        ingest(xml, name);
      } catch (error) {
        setRawScore(null);
        setFileName(null);
        setLoadError(error instanceof Error ? error.message : String(error));
      } finally {
        setLoading(false);
      }
    },
    [ingest],
  );

  const openSample = useCallback(() => {
    setLoading(true);
    setLoadError(null);
    try {
      ingest(SAMPLE_CHORALE, 'sample-chorale.musicxml');
    } catch (error) {
      setLoadError(error instanceof Error ? error.message : String(error));
    } finally {
      setLoading(false);
    }
  }, [ingest]);

  const dragging = useWindowDrop(openFile);

  /* ---- warm the engraver up while the user reads the drop zone ---- */
  useEffect(() => {
    void loadToolkit().catch(() => undefined);
  }, []);

  /* ---- settings plumbing ------------------------------------------ */
  const patchSettings = useCallback(
    (patch: Partial<ScoreSettings>) => {
      setSettings((prev) => {
        const next = { ...prev, ...patch };
        // Changing the pairing re-derives the four slots from the detected roles.
        if (patch.pairing && patch.pairing !== prev.pairing && score) {
          next.assignment = assignmentFor(score.streams, roles, patch.pairing);
          next.octaves = needsOctaveFitting(score, next.assignment as SlotAssignment)
            ? autoFitOctaves(score, next.assignment as SlotAssignment)
            : NO_OCTAVE_SHIFT;
        }
        return next;
      });
    },
    [score, roles],
  );

  // A chord split changes which streams exist, so the slots must be rebuilt.
  useEffect(() => {
    if (!score) return;
    setSettings((prev) => {
      const known = new Set(score.streams.map((s) => s.key));
      const stale = Object.values(prev.assignment).some((k) => k !== null && !known.has(k));
      const empty = Object.values(prev.assignment).every((k) => k === null);
      if (!stale && !empty) return prev;
      return { ...prev, assignment: assignmentFor(score.streams, detectRoles(score.streams), prev.pairing) };
    });
  }, [score]);

  const patchLayout = useCallback((patch: Partial<LayoutSettings>) => {
    setLayout((prev) => ({ ...prev, ...patch }));
  }, []);

  const patchMidi = useCallback((patch: Partial<MidiOptions>) => {
    setMidiOptions((prev) => ({ ...prev, ...patch }));
  }, []);

  /* ---- merge ------------------------------------------------------ */
  const staffLabelText = useMemo<[string, string] | null>(() => {
    if (!score) return null;
    const label = (keys: Array<string | null>) =>
      keys
        .filter((k): k is string => !!k)
        .map((k) => {
          const role = roles.get(k);
          if (role) return ROLE_LABEL[role];
          return score.streams.find((s) => s.key === k)?.partName ?? '';
        })
        .filter(Boolean)
        .join(' + ');
    return [
      label([settings.assignment.s1upper, settings.assignment.s1lower]),
      label([settings.assignment.s2upper, settings.assignment.s2lower]),
    ];
  }, [score, roles, settings.assignment]);

  const mergeResult = useMemo<{ score?: MergeResult; error?: string }>(() => {
    if (!score) return {};
    try {
      return {
        score: buildMergedScore(score, {
          assignment: settings.assignment as SlotAssignment,
          clef1: settings.clef1,
          clef2: settings.clef2,
          lyrics: settings.lyrics,
          octaves: settings.octaves,
          staffNames: settings.staffLabels ? staffLabelText : null,
          title: settings.title,
          composer: settings.composer,
          lyricist: score.lyricist,
        }),
      };
    } catch (error) {
      return { error: error instanceof Error ? error.message : String(error) };
    }
  }, [score, settings, staffLabelText]);
  const merged = mergeResult.score ?? null;

  const fitOctaves = useCallback(() => {
    if (!score) return;
    setSettings((prev) => ({
      ...prev,
      octaves: autoFitOctaves(score, prev.assignment as SlotAssignment),
    }));
  }, [score]);

  const resetOctaves = useCallback(() => {
    setSettings((prev) => ({ ...prev, octaves: NO_OCTAVE_SHIFT }));
  }, []);

  /* ---- engrave ---------------------------------------------------- */
  const geometry = useMemo(() => geometryFor(layout), [layout]);
  const options = useMemo(() => verovioOptions(layout, geometry), [layout, geometry]);
  const optionsKey = useMemo(() => JSON.stringify(options), [options]);

  useEffect(() => {
    if (!merged) {
      setPages([]);
      setEngraving(false);
      return;
    }
    let cancelled = false;
    setEngraving(true);
    const timer = window.setTimeout(async () => {
      try {
        const result = await engrave(merged.xml, JSON.parse(optionsKey));
        if (cancelled) return;
        setPages(result.pages);
        setEngraveError(null);
      } catch (error) {
        if (cancelled) return;
        setEngraveError(error instanceof Error ? error.message : String(error));
      } finally {
        if (!cancelled) setEngraving(false);
      }
    }, 120);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [merged, optionsKey]);

  /* ---- MIDI ------------------------------------------------------- */
  const midi = useMemo(() => {
    if (!score || !merged) return null;
    try {
      return renderMidi(score, merged.staves, staffLabelText ?? [], midiOptions);
    } catch {
      return null;
    }
  }, [score, merged, staffLabelText, midiOptions]);

  /* ---- playback --------------------------------------------------- */
  useEffect(() => {
    const player = new ScorePlayer();
    playerRef.current = player;
    player.onTick = (seconds) => setPosition(seconds);
    player.onEnd = () => {
      setPlaying(false);
      setPosition(0);
    };
    return () => {
      player.dispose();
      playerRef.current = null;
    };
  }, []);

  useEffect(() => {
    const player = playerRef.current;
    if (!player) return;
    player.setNotes(midi?.notes ?? [], midi?.duration ?? 0);
    setPlaying(false);
    setPosition(0);
  }, [midi]);

  const togglePlay = useCallback(() => {
    const player = playerRef.current;
    if (!player) return;
    if (player.playing) {
      player.pause();
      setPlaying(false);
    } else {
      void player.play();
      setPlaying(true);
    }
  }, []);

  const stopPlayback = useCallback(() => {
    playerRef.current?.stop();
    setPlaying(false);
    setPosition(0);
  }, []);

  const toggleMute = useCallback((staff: number) => {
    const player = playerRef.current;
    if (!player) return;
    setMutedStaves((prev) => {
      const next = prev.slice();
      next[staff] = !next[staff];
      player.setStaffMuted(staff, next[staff]);
      return next;
    });
  }, []);

  const activeMeasure = useMemo(() => {
    if (!playing || !midi) return null;
    const span = midi.measureSpans.find((s) => position >= s.start && position < s.end);
    return span ? span.sourceIndex : null;
  }, [playing, position, midi]);

  /* ---- zoom ------------------------------------------------------- */
  useEffect(() => {
    const node = scrollRef.current;
    if (!node) return;
    const recompute = () => {
      const available = node.clientWidth - 48;
      const natural = geometry.pageWidth * PX_PER_MM;
      setFitZoom(Math.max(0.15, Math.min(2.5, available / natural)));
    };
    recompute();
    const observer = new ResizeObserver(recompute);
    observer.observe(node);
    return () => observer.disconnect();
  }, [geometry.pageWidth, pages.length]);

  const effectiveZoom = zoomMode === 'fit' ? fitZoom : zoom;

  const nudgeZoom = useCallback(
    (delta: number) => {
      setZoom((prev) => {
        const from = zoomMode === 'fit' ? fitZoom : prev;
        return Math.max(0.2, Math.min(3, Math.round((from + delta) * 100) / 100));
      });
      setZoomMode('manual');
    },
    [zoomMode, fitZoom],
  );

  /* ---- printing --------------------------------------------------- */
  useEffect(() => {
    const style = document.createElement('style');
    style.id = 'page-size';
    style.textContent = `@page { size: ${round(geometry.pageWidth)}mm ${round(geometry.pageHeight)}mm; margin: 0; }`;
    document.head.appendChild(style);
    return () => style.remove();
  }, [geometry.pageWidth, geometry.pageHeight]);

  const print = useCallback(() => {
    stopPlayback();
    window.setTimeout(() => window.print(), 60);
  }, [stopPlayback]);

  /* ---- downloads -------------------------------------------------- */
  const stem = fileName ? baseName(fileName) : 'score';

  const downloadMidi = useCallback(
    (staff?: number) => {
      if (!score || !merged) return;
      const render = renderMidi(score, merged.staves, staffLabelText ?? [], midiOptions, staff);
      const suffix = staff === undefined ? '2-voice' : `staff${staff + 1}`;
      saveBlob(new Blob([render.bytes as BlobPart], { type: 'audio/midi' }), `${stem}-${suffix}.mid`);
    },
    [score, merged, staffLabelText, midiOptions, stem],
  );

  const downloadXml = useCallback(() => {
    if (!merged) return;
    saveBlob(new Blob([merged.xml], { type: 'application/vnd.recordare.musicxml+xml' }), `${stem}-2staff.musicxml`);
  }, [merged, stem]);

  const reset = useCallback(() => {
    stopPlayback();
    setRawScore(null);
    setFileName(null);
    setPages([]);
    setLoadError(null);
    setEngraveError(null);
  }, [stopPlayback]);

  /* ---- keyboard --------------------------------------------------- */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && /^(INPUT|SELECT|TEXTAREA)$/.test(target.tagName)) return;
      if (e.key === ' ' && score) {
        e.preventDefault();
        togglePlay();
      } else if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'p' && score) {
        e.preventDefault();
        print();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [togglePlay, print, score]);

  /* ---- render ------------------------------------------------------ */
  const warnings = useMemo(() => {
    const list = [...(score?.warnings ?? [])];
    if (score && score.streams.length > 4) {
      list.push(`${score.streams.length} voices were found. Check that the right four are selected.`);
    }
    return list;
  }, [score]);

  const hasLyrics = useMemo(
    () => !!score?.streams.some((s) => s.measures.some((bar) => bar.some((ev) => ev.lyrics.length > 0))),
    [score],
  );

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          <span className="brand-mark" aria-hidden>
            &#9835;
          </span>
          <div className="brand-text">
            <div className="brand-title">Bach Bag Bax</div>
            <div className="brand-sub">SATB &rarr; two staves &amp; two-track MIDI</div>
          </div>
        </div>

        <div className="topbar-spacer" />

        {fileName && (
          <div className="file-chip">
            <Icon.File />
            <strong>{fileName}</strong>
            <button type="button" className="btn icon ghost" onClick={reset} title="Close this file">
              <Icon.Close />
            </button>
          </div>
        )}

        <div className="topbar-actions">
          <button
            type="button"
            className="btn icon ghost"
            onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
            title={theme === 'dark' ? 'Switch to light interface' : 'Switch to dark interface'}
          >
            {theme === 'dark' ? <Icon.Sun /> : <Icon.Moon />}
          </button>
          {score && (
            <>
              <button type="button" className="btn" onClick={() => downloadMidi()} title="Download the MIDI file">
                <Icon.Download /> MIDI
              </button>
              <button type="button" className="btn primary" onClick={print} title="Print or save as PDF">
                <Icon.Print /> Print
              </button>
            </>
          )}
        </div>
      </header>

      <div className="main">
        {score ? (
          <Sidebar
            score={score}
            merged={merged}
            settings={settings}
            roles={roles}
            layout={layout}
            midiOptions={midiOptions}
            hasLyrics={hasLyrics}
            canSplitChords={shouldOfferChordSplit(rawScore ?? score)}
            scoreHasRepeats={hasRepeats(score.measures)}
            showGuides={showGuides}
            warnings={warnings}
            onSettings={patchSettings}
            onLayout={patchLayout}
            onMidi={patchMidi}
            onGuides={setShowGuides}
            onResetLayout={() => setLayout(DEFAULT_LAYOUT)}
            onFitOctaves={fitOctaves}
            onResetOctaves={resetOctaves}
            onDownloadMidi={downloadMidi}
            onDownloadXml={downloadXml}
          />
        ) : (
          <aside className="sidebar">
            <div className="panel-body" style={{ paddingTop: 18 }}>
              <Notice kind="info" icon="i">
                <strong>How it works</strong>
                <div style={{ marginTop: 6 }}>
                  Your four voices are matched to soprano, alto, tenor and bass, then written onto two
                  staves: soprano with tenor, alto with bass. You can change any of that, resize and
                  re-space the page, print at A4 or A5, and export a two-track MIDI file.
                </div>
              </Notice>
              {loadError && (
                <Notice kind="error" icon="!">
                  <strong>That file could not be read</strong>
                  <pre>{loadError}</pre>
                </Notice>
              )}
            </div>
          </aside>
        )}

        <main className="preview">
          {score && (
            <div className="preview-bar">
              <span>
                {pages.length} page{pages.length === 1 ? '' : 's'} &middot; {score.measures.length} bars
              </span>
              <div className="sep" />
              <span>
                {round(geometry.pageWidth)} &times; {round(geometry.pageHeight)} mm
              </span>
              <div className="topbar-spacer" />
              <div className="zoom-group">
                <button type="button" className="btn icon ghost" onClick={() => nudgeZoom(-0.1)} title="Zoom out">
                  <Icon.Minus />
                </button>
                <span className="zoom-value">{Math.round(effectiveZoom * 100)}%</span>
                <button type="button" className="btn icon ghost" onClick={() => nudgeZoom(0.1)} title="Zoom in">
                  <Icon.Plus />
                </button>
              </div>
              <div className="segmented" style={{ padding: 2 }}>
                <button type="button" aria-pressed={zoomMode === 'fit'} onClick={() => setZoomMode('fit')}>
                  Fit
                </button>
                <button
                  type="button"
                  aria-pressed={zoomMode === 'manual' && Math.abs(zoom - 1) < 0.001}
                  onClick={() => {
                    setZoom(1);
                    setZoomMode('manual');
                  }}
                >
                  100%
                </button>
              </div>
            </div>
          )}

          <div className="preview-body">
            {engraving && score && (
              <div className="busy-pill">
                <span className="spinner" /> Engraving
              </div>
            )}

            {!score ? (
              <DropZone onFile={openFile} onSample={openSample} busy={loading} />
            ) : mergeResult.error ? (
              <div className="preview-scroll">
                <div style={{ maxWidth: 620, margin: '40px auto' }}>
                  <Notice kind="warn" icon="!">
                    <strong>Nothing to show yet</strong>
                    <div style={{ marginTop: 6 }}>{mergeResult.error}</div>
                  </Notice>
                </div>
              </div>
            ) : engraveError ? (
              <div className="preview-scroll">
                <div style={{ maxWidth: 620, margin: '40px auto' }}>
                  <Notice kind="error" icon="!">
                    <strong>The score could not be engraved</strong>
                    <pre>{engraveError}</pre>
                  </Notice>
                </div>
              </div>
            ) : pages.length === 0 ? (
              <div className="preview-busy">
                <span className="spinner" />
                <span>Preparing the engraver…</span>
              </div>
            ) : (
              <div className="preview-scroll" ref={scrollRef}>
                <ScorePreview
                  pages={pages}
                  geometry={geometry}
                  zoom={effectiveZoom}
                  showGuides={showGuides}
                  activeMeasure={activeMeasure}
                  followCursor={followCursor}
                />
              </div>
            )}
          </div>

          {score && midi && (
            <PlayerBar
              playing={playing}
              position={position}
              duration={midi.duration}
              staffLabels={(staffLabelText ?? ['Staff 1', 'Staff 2']).map((l, i) => l || `Staff ${i + 1}`)}
              mutedStaves={mutedStaves}
              followCursor={followCursor}
              onToggleFollow={() => setFollowCursor((v) => !v)}
              onPlayPause={togglePlay}
              onStop={stopPlayback}
              onSeek={(seconds) => {
                playerRef.current?.seek(seconds);
                setPosition(seconds);
              }}
              onToggleMute={toggleMute}
            />
          )}
        </main>
      </div>

      {dragging && (
        <div className="drop-overlay">
          <div>Drop to open</div>
        </div>
      )}
    </div>
  );
}

function round(value: number): number {
  return Math.round(value * 10) / 10;
}

function saveBlob(blob: Blob, name: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}
