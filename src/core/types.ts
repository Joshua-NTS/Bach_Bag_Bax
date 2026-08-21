/** Diatonic step letters, in the order used for staff-position maths. */
export const STEPS = ['C', 'D', 'E', 'F', 'G', 'A', 'B'] as const;
export type Step = (typeof STEPS)[number];

export interface Pitch {
  step: Step;
  /** Chromatic alteration in semitones (-2..2). Fractional micro-tones are rounded. */
  alter: number;
  octave: number;
}

export interface Lyric {
  /** Verse number, 1-based. */
  verse: number;
  syllabic?: 'single' | 'begin' | 'middle' | 'end';
  text: string;
  extend?: boolean;
}

/** One note, chord or rest inside a single voice stream. */
export interface Event {
  /** Onset inside its measure, in normalised divisions. */
  onset: number;
  /** Sounding length in normalised divisions. Grace notes are 0. */
  duration: number;
  /** Empty for a rest. More than one entry means a chord. */
  pitches: Pitch[];
  /** MusicXML `<type>` (`quarter`, `half`, ...). Absent means "derive from duration". */
  noteType?: string;
  dots: number;
  tieStart: boolean;
  tieStop: boolean;
  slurStart: boolean;
  slurStop: boolean;
  fermata: boolean;
  articulations: string[];
  accidentals: (string | undefined)[];
  lyrics: Lyric[];
  grace: boolean;
  graceSlash: boolean;
  cue: boolean;
  /** Tuplets: `<time-modification>`. */
  timeMod?: { actual: number; normal: number };
  tuplet?: 'start' | 'stop';
  /** A whole-measure rest (`<rest measure="yes"/>`). */
  measureRest: boolean;
}

export interface StreamId {
  partId: string;
  staff: number;
  voice: string;
}

/** Every note that shares a (part, staff, voice) address — i.e. one singer's line. */
export interface VoiceStream {
  key: string;
  partId: string;
  partName: string;
  staff: number;
  voice: string;
  /** Indexed by global measure index; each entry is that measure's events in time order. */
  measures: Event[][];
  noteCount: number;
  avgMidi: number;
  minMidi: number;
  maxMidi: number;
  /** Sounding transposition in semitones, from the part's `<transpose>`. */
  transpose: number;
  /** Set when this stream was produced by splitting a chordal stream. */
  derivedFrom?: { key: string; role: 'upper' | 'lower' };
}

export interface KeySig {
  fifths: number;
  mode?: string;
}

export interface TimeSig {
  beats: number;
  beatType: number;
  symbol?: string;
}

export interface DirectionText {
  onset: number;
  kind: 'words' | 'dynamics' | 'rehearsal';
  text: string;
  placement?: 'above' | 'below';
}

export interface MeasureInfo {
  index: number;
  number: string;
  key?: KeySig;
  time?: TimeSig;
  /** Quarter notes per minute, from `<sound tempo>` or `<metronome>`. */
  tempo?: number;
  tempoText?: string;
  repeatForward: boolean;
  repeatBackward: number | null;
  /** Volta brackets. One measure can both close ending 1 and open ending 2. */
  endings: Array<{ numbers: number[]; type: 'start' | 'stop' | 'discontinue'; location: 'left' | 'right' }>;
  barStyleRight?: string;
  barStyleLeft?: string;
  /** `<measure implicit="yes">` — an anacrusis or a mid-bar split. */
  implicit: boolean;
  newSystem: boolean;
  newPage: boolean;
  /** Words, rehearsal marks and dynamics attached to this measure. */
  directions?: DirectionText[];
  /** Nominal length in normalised divisions, from the prevailing time signature. */
  length: number;
}

export interface ParsedScore {
  divisions: number;
  measures: MeasureInfo[];
  streams: VoiceStream[];
  title?: string;
  subtitle?: string;
  composer?: string;
  lyricist?: string;
  /** Non-fatal notes raised while reading the file. */
  warnings: string[];
}

export type Role = 'S' | 'A' | 'T' | 'B';

export const ROLE_LABEL: Record<Role, string> = {
  S: 'Soprano',
  A: 'Alto',
  T: 'Tenor',
  B: 'Bass',
};

/** Which stream sits in each of the four notated slots of the merged score. */
export interface SlotAssignment {
  s1upper: string | null;
  s1lower: string | null;
  s2upper: string | null;
  s2lower: string | null;
}

export const SLOT_KEYS = ['s1upper', 's1lower', 's2upper', 's2lower'] as const;
export type SlotKey = (typeof SLOT_KEYS)[number];

export const SLOT_LABEL: Record<SlotKey, string> = {
  s1upper: 'Staff 1 · upper',
  s1lower: 'Staff 1 · lower',
  s2upper: 'Staff 2 · upper',
  s2lower: 'Staff 2 · lower',
};

export type ClefName = 'G2' | 'G2-8' | 'F4' | 'F4+8' | 'C3' | 'C4' | 'auto';

export function midiOf(p: Pitch): number {
  const semis = [0, 2, 4, 5, 7, 9, 11][STEPS.indexOf(p.step)];
  return (p.octave + 1) * 12 + semis + p.alter;
}

/** Diatonic index used for staff placement: C0 = 0, D0 = 1, ... */
export function diatonicOf(p: Pitch): number {
  return p.octave * 7 + STEPS.indexOf(p.step);
}
