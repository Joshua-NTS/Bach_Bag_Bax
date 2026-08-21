import { type ParsedScore, midiOf } from './types';
import { type StaffPlanVoice } from './merge';
import { playbackOrder } from './repeats';

export const TICKS_PER_QUARTER = 480;
export const DEFAULT_TEMPO = 84;

export interface MidiOptions {
  /** Multiplies whatever tempo the score asks for. 1 = as written. */
  tempoScale: number;
  /** Used when the source has no tempo of its own. */
  fallbackTempo: number;
  expandRepeats: boolean;
  /** General MIDI program numbers (0-based), one per staff. */
  programs: [number, number];
  velocity: number;
  /** Fraction of each note that actually sounds, so repeated notes re-attack. */
  gate: number;
  /** One channel per staff, or everything on channel 1. */
  separateChannels: boolean;
  /** Play the octave shifts applied for readability, so print matches sound. */
  followOctaveShifts: boolean;
}

export const DEFAULT_MIDI_OPTIONS: MidiOptions = {
  tempoScale: 1,
  fallbackTempo: DEFAULT_TEMPO,
  expandRepeats: true,
  programs: [52, 52], // Choir Aahs
  velocity: 90,
  gate: 0.97,
  separateChannels: true,
  followOctaveShifts: true,
};

export const GM_PROGRAMS: Array<{ value: number; label: string }> = [
  { value: 52, label: 'Choir aahs' },
  { value: 53, label: 'Voice oohs' },
  { value: 54, label: 'Synth choir' },
  { value: 19, label: 'Church organ' },
  { value: 16, label: 'Drawbar organ' },
  { value: 0, label: 'Grand piano' },
  { value: 6, label: 'Harpsichord' },
  { value: 48, label: 'String ensemble' },
  { value: 42, label: 'Cello' },
  { value: 40, label: 'Violin' },
  { value: 71, label: 'Clarinet' },
  { value: 73, label: 'Flute' },
];

export interface RenderedNote {
  /** Seconds from the start of playback. */
  time: number;
  duration: number;
  midi: number;
  staff: number;
  /** Index into the playback order, useful for following along. */
  measure: number;
}

export interface MeasureSpan {
  /** Index of the measure in the original score. */
  sourceIndex: number;
  start: number;
  end: number;
}

export interface MidiRender {
  bytes: Uint8Array;
  notes: RenderedNote[];
  /** Total sounding length in seconds. */
  duration: number;
  trackNames: string[];
  /** Where each played measure sits on the timeline, for follow-along. */
  measureSpans: MeasureSpan[];
}

/* ------------------------------------------------------------------ */
/* SMF primitives                                                      */
/* ------------------------------------------------------------------ */

function vlq(value: number): number[] {
  let v = Math.max(0, Math.round(value));
  const bytes = [v & 0x7f];
  v >>= 7;
  while (v > 0) {
    bytes.unshift((v & 0x7f) | 0x80);
    v >>= 7;
  }
  return bytes;
}

function text(s: string): number[] {
  return Array.from(new TextEncoder().encode(s));
}

function chunk(id: string, data: number[]): number[] {
  const len = data.length;
  return [
    ...text(id),
    (len >>> 24) & 0xff,
    (len >>> 16) & 0xff,
    (len >>> 8) & 0xff,
    len & 0xff,
    ...data,
  ];
}

interface TrackEvent {
  tick: number;
  /** Note-offs sort before note-ons at the same tick so nothing sticks. */
  priority: number;
  data: number[];
}

function serialiseTrack(events: TrackEvent[]): number[] {
  const sorted = events.slice().sort((a, b) => a.tick - b.tick || a.priority - b.priority);
  const out: number[] = [];
  let last = 0;
  for (const ev of sorted) {
    out.push(...vlq(ev.tick - last), ...ev.data);
    last = ev.tick;
  }
  out.push(...vlq(0), 0xff, 0x2f, 0x00); // end of track
  return out;
}

function metaText(type: number, value: string): number[] {
  const bytes = text(value);
  return [0xff, type, ...vlq(bytes.length), ...bytes];
}

/* ------------------------------------------------------------------ */
/* Score to notes                                                      */
/* ------------------------------------------------------------------ */

interface RawNote {
  startDiv: number;
  durDiv: number;
  midi: number;
  staff: number;
  measure: number;
}

function collectStream(
  voice: StaffPlanVoice,
  staff: number,
  order: number[],
  measureStart: number[],
  out: RawNote[],
  applyOctaveShift: boolean,
) {
  const stream = voice.stream;
  let pending = new Map<number, RawNote>();
  const transpose = stream.transpose + (applyOctaveShift ? voice.octaveShift * 12 : 0);

  order.forEach((mi, step) => {
    const base = measureStart[step];
    for (const ev of stream.measures[mi] ?? []) {
      if (ev.grace || ev.duration <= 0 || ev.pitches.length === 0) continue;
      const at = base + ev.onset;
      const carried = new Map<number, RawNote>();
      const closed = new Set<number>();

      for (const pitch of ev.pitches) {
        const note = midiOf(pitch) + transpose;
        if (note < 0 || note > 127) continue;
        const held = ev.tieStop ? pending.get(note) : undefined;
        if (held) {
          held.durDiv = at + ev.duration - held.startDiv;
          if (ev.tieStart) carried.set(note, held);
          else {
            closed.add(note);
            out.push(held);
          }
        } else {
          const fresh: RawNote = {
            startDiv: at,
            durDiv: ev.duration,
            midi: note,
            staff,
            measure: step,
          };
          if (ev.tieStart) carried.set(note, fresh);
          else out.push(fresh);
        }
      }

      // A tie nothing picked up ends here; one that was just closed is already out.
      for (const [note, held] of pending) {
        if (!carried.has(note) && !closed.has(note)) out.push(held);
      }
      pending = carried;
    }
  });

  for (const held of pending.values()) out.push(held);
}

/**
 * Two voices sharing a staff regularly land on the same note, and one MIDI
 * channel cannot sound the same pitch twice: the first note-off would cut the
 * second short. Overlapping notes of the same pitch on the same channel are
 * therefore fused into one.
 */
function fuseUnisons(raw: RawNote[], perStaffChannels: boolean): RawNote[] {
  const groups = new Map<string, RawNote[]>();
  for (const note of raw) {
    const key = perStaffChannels ? `${note.staff}:${note.midi}` : `${note.midi}`;
    const list = groups.get(key);
    if (list) list.push(note);
    else groups.set(key, [note]);
  }

  const out: RawNote[] = [];
  for (const list of groups.values()) {
    list.sort((a, b) => a.startDiv - b.startDiv);
    let current = { ...list[0] };
    for (let i = 1; i < list.length; i++) {
      const next = list[i];
      if (next.startDiv < current.startDiv + current.durDiv - 1e-6) {
        current.durDiv = Math.max(current.durDiv, next.startDiv + next.durDiv - current.startDiv);
      } else {
        out.push(current);
        current = { ...next };
      }
    }
    out.push(current);
  }
  return out.sort((a, b) => a.startDiv - b.startDiv || a.midi - b.midi);
}

/* ------------------------------------------------------------------ */

export function renderMidi(
  score: ParsedScore,
  staves: StaffPlanVoice[][],
  staffLabels: string[],
  options: MidiOptions,
  staffFilter?: number,
): MidiRender {
  const order = playbackOrder(score.measures, options.expandRepeats);
  const divisions = score.divisions;

  // Where each played measure begins, in divisions.
  const measureStart: number[] = [];
  let cursor = 0;
  for (const mi of order) {
    measureStart.push(cursor);
    cursor += score.measures[mi].length;
  }
  const totalDiv = cursor;

  const collected: RawNote[] = [];
  staves.forEach((voices, si) => {
    if (staffFilter !== undefined && staffFilter !== si) return;
    for (const voice of voices) {
      collectStream(voice, si, order, measureStart, collected, options.followOctaveShifts);
    }
  });
  const raw = fuseUnisons(collected, options.separateChannels);

  const toTicks = (div: number) => Math.round((div / divisions) * TICKS_PER_QUARTER);

  /* ---- tempo / meter track --------------------------------------- */
  const conductor: TrackEvent[] = [];
  conductor.push({ tick: 0, priority: 0, data: metaText(0x03, score.title || 'Bach Bag Bax') });

  let currentTempo: number | null = null;
  let currentMeter = '';
  order.forEach((mi, step) => {
    const info = score.measures[mi];
    const tick = toTicks(measureStart[step]);
    const tempo = info.tempo ?? (step === 0 ? options.fallbackTempo : undefined);
    if (tempo !== undefined) {
      const qpm = Math.max(10, Math.min(400, tempo * options.tempoScale));
      if (currentTempo === null || Math.abs(qpm - currentTempo) > 0.01) {
        currentTempo = qpm;
        const usPerQuarter = Math.round(60_000_000 / qpm);
        conductor.push({
          tick,
          priority: 0,
          data: [0xff, 0x51, 0x03, (usPerQuarter >> 16) & 0xff, (usPerQuarter >> 8) & 0xff, usPerQuarter & 0xff],
        });
      }
    }
    if (info.time) {
      const sig = `${info.time.beats}/${info.time.beatType}`;
      if (sig !== currentMeter) {
        currentMeter = sig;
        const denomPow = Math.max(0, Math.round(Math.log2(info.time.beatType)));
        conductor.push({
          tick,
          priority: 0,
          data: [0xff, 0x58, 0x04, info.time.beats & 0xff, denomPow, 24, 8],
        });
      }
    }
    if (step === 0 && info.key) {
      const fifths = Math.max(-7, Math.min(7, Math.round(info.key.fifths)));
      const minor = (info.key.mode ?? '').toLowerCase() === 'minor' ? 1 : 0;
      conductor.push({ tick, priority: 0, data: [0xff, 0x59, 0x02, fifths & 0xff, minor] });
    }
  });
  if (currentTempo === null) {
    const qpm = Math.max(10, Math.min(400, options.fallbackTempo * options.tempoScale));
    const usPerQuarter = Math.round(60_000_000 / qpm);
    conductor.unshift({
      tick: 0,
      priority: 0,
      data: [0xff, 0x51, 0x03, (usPerQuarter >> 16) & 0xff, (usPerQuarter >> 8) & 0xff, usPerQuarter & 0xff],
    });
    currentTempo = qpm;
  }

  /* ---- one track per staff --------------------------------------- */
  const activeStaves = staves
    .map((_, si) => si)
    .filter((si) => staffFilter === undefined || si === staffFilter);

  const trackNames: string[] = [];
  const tracks: number[][] = [serialiseTrack(conductor)];

  activeStaves.forEach((si, index) => {
    const channel = options.separateChannels ? Math.min(15, index) : 0;
    const program = options.programs[si] ?? options.programs[0] ?? 0;
    const label = staffLabels[si] ?? `Staff ${si + 1}`;
    trackNames.push(label);

    const events: TrackEvent[] = [
      { tick: 0, priority: 0, data: metaText(0x03, label) },
      { tick: 0, priority: 0, data: [0xc0 | channel, program & 0x7f] },
    ];

    for (const note of raw) {
      if (note.staff !== si) continue;
      const onTick = toTicks(note.startDiv);
      const rawLen = toTicks(note.startDiv + note.durDiv) - onTick;
      const len = Math.max(1, Math.round(rawLen * options.gate));
      events.push({ tick: onTick, priority: 1, data: [0x90 | channel, note.midi, options.velocity & 0x7f] });
      events.push({ tick: onTick + len, priority: 0, data: [0x80 | channel, note.midi, 0x40] });
    }
    tracks.push(serialiseTrack(events));
  });

  /* ---- assemble the file ----------------------------------------- */
  const header = chunk('MThd', [
    0x00,
    0x01, // format 1
    (tracks.length >> 8) & 0xff,
    tracks.length & 0xff,
    (TICKS_PER_QUARTER >> 8) & 0xff,
    TICKS_PER_QUARTER & 0xff,
  ]);
  const body = tracks.flatMap((t) => chunk('MTrk', t));
  const bytes = Uint8Array.from([...header, ...body]);

  /* ---- a seconds-based copy for in-page playback ------------------ */
  const secondsAt = buildTimeline(score, order, measureStart, divisions, options);

  const notes: RenderedNote[] = raw
    .map((n) => ({
      time: secondsAt(n.startDiv),
      duration: Math.max(0.03, secondsAt(n.startDiv + n.durDiv) - secondsAt(n.startDiv)),
      midi: n.midi,
      staff: n.staff,
      measure: n.measure,
    }))
    .sort((a, b) => a.time - b.time);

  const measureSpans: MeasureSpan[] = order.map((mi, step) => ({
    sourceIndex: mi,
    start: secondsAt(measureStart[step]),
    end: secondsAt(measureStart[step] + score.measures[mi].length),
  }));

  return {
    bytes,
    notes,
    duration: secondsAt(totalDiv),
    trackNames,
    measureSpans,
  };
}

/** Piecewise-linear divisions-to-seconds, honouring every tempo change. */
function buildTimeline(
  score: ParsedScore,
  order: number[],
  measureStart: number[],
  divisions: number,
  options: MidiOptions,
): (div: number) => number {
  const clamp = (qpm: number) => Math.max(10, Math.min(400, qpm));
  const changes: Array<{ div: number; qpm: number }> = [];

  order.forEach((mi, step) => {
    const tempo = score.measures[mi].tempo;
    if (tempo === undefined) return;
    const qpm = clamp(tempo * options.tempoScale);
    const at = measureStart[step];
    const last = changes[changes.length - 1];
    if (last && last.div === at) last.qpm = qpm;
    else if (!last || Math.abs(last.qpm - qpm) > 0.01) changes.push({ div: at, qpm });
  });

  if (!changes.length || changes[0].div !== 0) {
    changes.unshift({ div: 0, qpm: clamp(options.fallbackTempo * options.tempoScale) });
  }

  const cumulative: number[] = [0];
  for (let i = 1; i < changes.length; i++) {
    cumulative[i] =
      cumulative[i - 1] + ((changes[i].div - changes[i - 1].div) / divisions) * (60 / changes[i - 1].qpm);
  }

  return (div: number) => {
    let i = 0;
    while (i + 1 < changes.length && changes[i + 1].div <= div) i++;
    return cumulative[i] + ((div - changes[i].div) / divisions) * (60 / changes[i].qpm);
  };
}
