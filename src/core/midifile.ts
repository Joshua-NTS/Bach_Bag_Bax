import {
  type ParsedScore,
  type MeasureInfo,
  type Event,
  type VoiceStream,
  type Pitch,
  type Step,
  STEPS,
  midiOf,
} from './types';

/**
 * Reading a MIDI file is not the same job as reading MusicXML. MusicXML says
 * what the notation is; MIDI only says which keys went down and when. Turning
 * that back into notation means guessing: where the barlines fall, how the
 * notes should be spelled, and which line each note belongs to.
 *
 * The guesses here are the conservative ones, and every one of them is exposed
 * as a setting so it can be overridden when it guesses wrong.
 */

/** Ticks per quarter note used internally. Divides by 3 for triplets. */
export const MIDI_DIVISIONS = 768;

export interface MidiImportOptions {
  /**
   * Snap note starts and ends to this fraction of a whole note: 16 is a
   * sixteenth-note grid. 0 leaves the recorded timing alone, which is honest
   * but usually unreadable.
   */
  quantize: number;
  /** Treat channel 10 (drums) as music rather than skipping it. */
  includePercussion: boolean;
}

export const DEFAULT_MIDI_IMPORT: MidiImportOptions = {
  quantize: 16,
  includePercussion: false,
};

export const QUANTIZE_CHOICES = [
  { value: 0, label: 'Off' },
  { value: 4, label: '1/4' },
  { value: 8, label: '1/8' },
  { value: 16, label: '1/16' },
  { value: 32, label: '1/32' },
];

/* ------------------------------------------------------------------ */
/* Standard MIDI File reader                                           */
/* ------------------------------------------------------------------ */

interface RawNote {
  track: number;
  channel: number;
  midi: number;
  start: number;
  end: number;
}

interface SmfData {
  ppq: number;
  notes: RawNote[];
  tempos: Array<{ tick: number; qpm: number }>;
  timeSignatures: Array<{ tick: number; beats: number; beatType: number }>;
  keySignatures: Array<{ tick: number; fifths: number; minor: boolean }>;
  trackNames: string[];
  endTick: number;
}

export function isMidiFile(bytes: Uint8Array): boolean {
  return bytes.length > 4 && bytes[0] === 0x4d && bytes[1] === 0x54 && bytes[2] === 0x68 && bytes[3] === 0x64;
}

function readSmf(bytes: Uint8Array): SmfData {
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const ascii = (at: number, n: number) => String.fromCharCode(...bytes.subarray(at, at + n));

  if (bytes.length < 14 || ascii(0, 4) !== 'MThd') {
    throw new Error('This is not a MIDI file (no MThd header).');
  }
  const headerLength = view.getUint32(4);
  const trackCount = view.getUint16(10);
  const division = view.getUint16(12);
  if (division & 0x8000) {
    throw new Error(
      'This MIDI file is timed in SMPTE frames rather than musical beats, so it has no note values to notate.',
    );
  }
  const ppq = division || 480;

  const data: SmfData = {
    ppq,
    notes: [],
    tempos: [],
    timeSignatures: [],
    keySignatures: [],
    trackNames: [],
    endTick: 0,
  };

  let at = 8 + headerLength;
  for (let track = 0; track < trackCount && at + 8 <= bytes.length; track++) {
    if (ascii(at, 4) !== 'MTrk') break;
    const length = view.getUint32(at + 4);
    const end = Math.min(bytes.length, at + 8 + length);
    let p = at + 8;
    let tick = 0;
    let running = 0;
    // A pitch can be struck again before the first one is released, so the
    // pending starts are a stack per (channel, pitch).
    const pending = new Map<number, number[]>();

    const readVarLen = () => {
      let value = 0;
      for (let i = 0; i < 4 && p < end; i++) {
        const b = bytes[p++];
        value = (value << 7) | (b & 0x7f);
        if ((b & 0x80) === 0) break;
      }
      return value;
    };

    while (p < end) {
      tick += readVarLen();
      let status = bytes[p];
      if (status & 0x80) p++;
      else status = running;

      if (status === 0xff) {
        const type = bytes[p++];
        const length = readVarLen();
        const payload = bytes.subarray(p, p + length);
        p += length;
        running = 0;
        if (type === 0x03 && payload.length) {
          data.trackNames[track] = new TextDecoder().decode(payload).trim();
        } else if (type === 0x51 && payload.length >= 3) {
          const usPerQuarter = (payload[0] << 16) | (payload[1] << 8) | payload[2];
          if (usPerQuarter > 0) data.tempos.push({ tick, qpm: 60_000_000 / usPerQuarter });
        } else if (type === 0x58 && payload.length >= 2) {
          data.timeSignatures.push({ tick, beats: payload[0] || 4, beatType: 2 ** payload[1] || 4 });
        } else if (type === 0x59 && payload.length >= 2) {
          const fifths = (payload[0] << 24) >> 24; // signed byte
          data.keySignatures.push({ tick, fifths, minor: payload[1] === 1 });
        } else if (type === 0x2f) {
          break;
        }
        continue;
      }

      if (status === 0xf0 || status === 0xf7) {
        p += readVarLen();
        running = 0;
        continue;
      }

      running = status;
      const kind = status & 0xf0;
      const channel = status & 0x0f;

      if (kind === 0x90 || kind === 0x80) {
        const pitch = bytes[p++];
        const velocity = bytes[p++];
        const key = (channel << 8) | pitch;
        if (kind === 0x90 && velocity > 0) {
          const stack = pending.get(key);
          if (stack) stack.push(tick);
          else pending.set(key, [tick]);
        } else {
          const stack = pending.get(key);
          const start = stack?.shift();
          if (start !== undefined && tick > start) {
            data.notes.push({ track, channel, midi: pitch, start, end: tick });
          }
        }
      } else if (kind === 0xc0 || kind === 0xd0) {
        p += 1;
      } else {
        p += 2;
      }
    }

    // Anything still held at the end of the track stops there.
    for (const [key, stack] of pending) {
      for (const start of stack) {
        if (tick > start) {
          data.notes.push({ track, channel: (key >> 8) & 0x0f, midi: key & 0xff, start, end: tick });
        }
      }
    }
    data.endTick = Math.max(data.endTick, tick);
    at = at + 8 + length;
  }

  if (data.notes.length === 0) throw new Error('This MIDI file contains no notes.');
  data.notes.sort((a, b) => a.start - b.start || b.midi - a.midi);
  for (const list of [data.tempos, data.timeSignatures, data.keySignatures]) {
    list.sort((a, b) => a.tick - b.tick);
  }
  return data;
}

/* ------------------------------------------------------------------ */
/* Pitch spelling                                                      */
/* ------------------------------------------------------------------ */

// [step index, alter] per pitch class. No B# or Cb, so the octave is always
// simply floor(midi / 12) - 1.
const SHARP_SPELLING: Array<[number, number]> = [
  [0, 0], [0, 1], [1, 0], [1, 1], [2, 0], [3, 0], [3, 1], [4, 0], [4, 1], [5, 0], [5, 1], [6, 0],
];
const FLAT_SPELLING: Array<[number, number]> = [
  [0, 0], [1, -1], [1, 0], [2, -1], [2, 0], [3, 0], [4, -1], [4, 0], [5, -1], [5, 0], [6, -1], [6, 0],
];

function spell(midi: number, fifths: number): Pitch {
  const table = fifths < 0 ? FLAT_SPELLING : SHARP_SPELLING;
  const [stepIndex, alter] = table[((midi % 12) + 12) % 12];
  return {
    step: STEPS[stepIndex] as Step,
    alter,
    octave: Math.floor(midi / 12) - 1,
  };
}

/** Pick the key whose scale accounts for the most notes actually played. */
export function inferKey(notes: Array<{ midi: number }>): number {
  const histogram = new Array<number>(12).fill(0);
  for (const n of notes) histogram[((n.midi % 12) + 12) % 12]++;

  const MAJOR = [0, 2, 4, 5, 7, 9, 11];
  let best = 0;
  let bestScore = -Infinity;
  for (let fifths = -7; fifths <= 7; fifths++) {
    const tonic = ((fifths * 7) % 12 + 12) % 12;
    let score = 0;
    for (const degree of MAJOR) score += histogram[(tonic + degree) % 12];
    // Prefer simpler signatures when two explain the notes equally well.
    score -= Math.abs(fifths) * 0.01;
    if (score > bestScore) {
      bestScore = score;
      best = fifths;
    }
  }
  return best;
}

/* ------------------------------------------------------------------ */
/* Splitting a track into single lines                                 */
/* ------------------------------------------------------------------ */

interface TimedNote {
  midi: number;
  start: number;
  end: number;
}

/**
 * One MIDI track routinely holds a whole chord. Split it into lines, keeping
 * the highest note in the first line, the next in the second, and so on — which
 * is what makes a four-note chorale track come back out as soprano, alto,
 * tenor and bass.
 */
export function splitIntoVoices(notes: TimedNote[], maxVoices = 8): TimedNote[][] {
  const byOnset = new Map<number, TimedNote[]>();
  for (const note of notes) {
    const list = byOnset.get(note.start);
    if (list) list.push(note);
    else byOnset.set(note.start, [note]);
  }

  const voices: TimedNote[][] = [];
  const busyUntil: number[] = [];

  for (const onset of [...byOnset.keys()].sort((a, b) => a - b)) {
    const starting = byOnset.get(onset)!.slice().sort((a, b) => b.midi - a.midi);
    // Lowest index first, so the highest note lands in the first free line.
    const free = voices.map((_, i) => i).filter((i) => busyUntil[i] <= onset);

    for (const note of starting) {
      let index = free.shift();
      if (index === undefined) {
        if (voices.length < maxVoices) {
          voices.push([]);
          busyUntil.push(0);
          index = voices.length - 1;
        } else {
          // Out of lines: give it to whichever frees up soonest and clip that
          // note, rather than dropping this one.
          index = busyUntil.indexOf(Math.min(...busyUntil));
          const last = voices[index][voices[index].length - 1];
          if (last && last.end > onset) last.end = onset;
        }
      }
      voices[index].push(note);
      busyUntil[index] = note.end;
    }
  }

  return voices.filter((v) => v.length > 0);
}

/* ------------------------------------------------------------------ */
/* MIDI to score                                                       */
/* ------------------------------------------------------------------ */

function makeRest(onset: number, duration: number, measureRest = false): Event {
  return {
    onset,
    duration,
    pitches: [],
    dots: 0,
    tieStart: false,
    tieStop: false,
    slurStart: false,
    slurStop: false,
    fermata: false,
    articulations: [],
    accidentals: [],
    lyrics: [],
    grace: false,
    graceSlash: false,
    cue: false,
    measureRest,
  };
}

export function parseMidiScore(bytes: Uint8Array, options: MidiImportOptions): ParsedScore {
  const smf = readSmf(bytes);
  const warnings: string[] = [];
  const divisions = MIDI_DIVISIONS;

  /* ---- timing ----------------------------------------------------- */
  const toDivisions = (tick: number) => (tick * divisions) / smf.ppq;
  const grid = options.quantize > 0 ? (divisions * 4) / options.quantize : 0;
  const snap = (value: number) => (grid > 0 ? Math.round(value / grid) * grid : Math.round(value));
  const shortest = grid > 0 ? grid : divisions / 16;

  let notes = smf.notes
    .filter((n) => options.includePercussion || n.channel !== 9)
    .map((n) => {
      const start = snap(toDivisions(n.start));
      const end = Math.max(start + shortest, snap(toDivisions(n.end)));
      return { ...n, start, end };
    });

  if (notes.length === 0) {
    throw new Error(
      smf.notes.length > 0
        ? 'This MIDI file only contains a drum track, which cannot be notated as voices.'
        : 'This MIDI file contains no notes.',
    );
  }
  if (smf.notes.length !== notes.length) {
    warnings.push('A percussion channel was skipped.');
  }

  /* ---- bars ------------------------------------------------------- */
  const totalDivisions = Math.max(
    ...notes.map((n) => n.end),
    snap(toDivisions(smf.endTick)),
  );

  const timeSignatures = smf.timeSignatures.length
    ? smf.timeSignatures.map((t) => ({ ...t, at: snap(toDivisions(t.tick)) }))
    : [{ tick: 0, beats: 4, beatType: 4, at: 0 }];
  if (timeSignatures[0].at > 0) timeSignatures.unshift({ tick: 0, beats: 4, beatType: 4, at: 0 });

  const keyFifths = smf.keySignatures.length ? smf.keySignatures[0].fifths : inferKey(notes);
  if (!smf.keySignatures.length) {
    warnings.push('The file has no key signature, so one was inferred from the notes.');
  }

  const measures: MeasureInfo[] = [];
  const measureStarts: number[] = [];
  let cursor = 0;
  let signatureIndex = 0;
  let previous = { beats: 0, beatType: 0 };
  let guard = 0;

  while (cursor < totalDivisions - 1 && guard++ < 20_000) {
    while (
      signatureIndex + 1 < timeSignatures.length &&
      timeSignatures[signatureIndex + 1].at <= cursor
    ) {
      signatureIndex++;
    }
    const signature = timeSignatures[signatureIndex];
    const length = Math.max(divisions, (signature.beats * divisions * 4) / signature.beatType);
    const index = measures.length;
    const changed = signature.beats !== previous.beats || signature.beatType !== previous.beatType;
    previous = { beats: signature.beats, beatType: signature.beatType };

    const tempoHere = smf.tempos.filter((t) => snap(toDivisions(t.tick)) <= cursor).pop();
    const tempoStartsHere = smf.tempos.find(
      (t) => snap(toDivisions(t.tick)) >= cursor && snap(toDivisions(t.tick)) < cursor + length,
    );

    measures.push({
      index,
      number: String(index + 1),
      key: index === 0 ? { fifths: keyFifths } : undefined,
      time: changed ? { beats: signature.beats, beatType: signature.beatType } : undefined,
      tempo: index === 0 ? (tempoHere?.qpm ?? smf.tempos[0]?.qpm ?? 100) : tempoStartsHere?.qpm,
      repeatForward: false,
      repeatBackward: null,
      endings: [],
      implicit: false,
      newSystem: false,
      newPage: false,
      length,
    });
    measureStarts.push(cursor);
    cursor += length;
  }
  if (measures.length === 0) {
    measures.push({
      index: 0,
      number: '1',
      key: { fifths: keyFifths },
      time: { beats: 4, beatType: 4 },
      tempo: smf.tempos[0]?.qpm ?? 100,
      repeatForward: false,
      repeatBackward: null,
      endings: [],
      implicit: false,
      newSystem: false,
      newPage: false,
      length: divisions * 4,
    });
    measureStarts.push(0);
  }

  /* ---- one stream per line ---------------------------------------- */
  const groups = new Map<string, typeof notes>();
  for (const note of notes) {
    const key = `${note.track}:${note.channel}`;
    const list = groups.get(key);
    if (list) list.push(note);
    else groups.set(key, [note]);
  }

  const streams: VoiceStream[] = [];
  for (const [key, groupNotes] of groups) {
    const [track, channel] = key.split(':').map(Number);
    const name =
      smf.trackNames[track] ||
      (groups.size > 1 ? `Track ${track + 1}${channel ? ` ch${channel + 1}` : ''}` : 'MIDI');

    const lines = splitIntoVoices(groupNotes.map((n) => ({ midi: n.midi, start: n.start, end: n.end })));
    lines.forEach((line, lineIndex) => {
      streams.push(
        buildStream(
          lines.length > 1 ? `${key}/${lineIndex + 1}` : key,
          lines.length > 1 ? `${name} ${lineIndex + 1}` : name,
          String(lineIndex + 1),
          line,
          measures,
          measureStarts,
          keyFifths,
        ),
      );
    });
  }

  streams.sort((a, b) => b.avgMidi - a.avgMidi);
  if (streams.length < 4) {
    warnings.push(
      `Only ${streams.length} line${streams.length === 1 ? '' : 's'} could be separated out of this MIDI file.`,
    );
  }

  const title = (smf.trackNames.find((n) => n && !/^(track|piano|midi)/i.test(n)) ?? '').trim();

  return {
    divisions,
    measures,
    streams,
    title: title || undefined,
    warnings,
  };
}

function buildStream(
  key: string,
  partName: string,
  voice: string,
  line: TimedNote[],
  measures: MeasureInfo[],
  measureStarts: number[],
  fifths: number,
): VoiceStream {
  // A line is meant to be monophonic; clip anything that still overlaps.
  const sorted = line.slice().sort((a, b) => a.start - b.start);
  const clean: TimedNote[] = [];
  for (const note of sorted) {
    const previous = clean[clean.length - 1];
    if (previous && note.start < previous.end) previous.end = note.start;
    if (note.end > note.start) clean.push({ ...note });
  }

  const cleaned: Event[][] = [];
  let sum = 0;
  let count = 0;
  let min = Infinity;
  let max = -Infinity;
  let cursor = 0;

  measures.forEach((measure, index) => {
    const start = measureStarts[index];
    const end = start + measure.length;
    const events: Event[] = [];
    let position = 0;

    while (cursor < clean.length && clean[cursor].end <= start) cursor++;
    for (let i = cursor; i < clean.length && clean[i].start < end; i++) {
      const note = clean[i];
      const from = Math.max(0, note.start - start);
      const to = Math.min(measure.length, note.end - start);
      if (to - from < 1) continue;
      if (from > position) events.push(makeRest(position, from - position));

      const pitch = spell(note.midi, fifths);
      events.push({
        ...makeRest(from, to - from),
        pitches: [pitch],
        accidentals: [undefined],
        // A note that runs through a barline is written as tied pieces.
        tieStop: note.start < start,
        tieStart: note.end > end,
      });
      position = to;

      const value = midiOf(pitch);
      sum += value;
      count++;
      if (value < min) min = value;
      if (value > max) max = value;
    }

    if (events.length === 0) events.push(makeRest(0, measure.length, true));
    else if (position < measure.length) events.push(makeRest(position, measure.length - position));
    cleaned.push(events);
  });

  return {
    key,
    partId: key,
    partName,
    staff: 1,
    voice,
    measures: cleaned,
    noteCount: count,
    avgMidi: count ? sum / count : 0,
    minMidi: count ? min : 0,
    maxMidi: count ? max : 0,
    transpose: 0,
  };
}
