import {
  type ParsedScore,
  type MeasureInfo,
  type Event,
  type VoiceStream,
  type Pitch,
  type Lyric,
  type Step,
  type KeySig,
  type TimeSig,
  type DirectionText,
  STEPS,
  midiOf,
} from './types';

/* ------------------------------------------------------------------ */
/* Small DOM helpers (direct children only - getElementsByTagName is   */
/* recursive and would happily reach into the wrong subtree).          */
/* ------------------------------------------------------------------ */

function kids(parent: Element, tag: string): Element[] {
  const out: Element[] = [];
  for (const c of Array.from(parent.children)) if (c.tagName === tag) out.push(c);
  return out;
}
function kid(parent: Element | null | undefined, tag: string): Element | null {
  if (!parent) return null;
  for (const c of Array.from(parent.children)) if (c.tagName === tag) return c;
  return null;
}
function kidText(parent: Element | null | undefined, tag: string): string | undefined {
  const e = kid(parent, tag);
  return e ? (e.textContent ?? '').trim() : undefined;
}
function kidNum(parent: Element | null | undefined, tag: string): number | undefined {
  const t = kidText(parent, tag);
  if (t === undefined || t === '') return undefined;
  const n = Number(t);
  return Number.isFinite(n) ? n : undefined;
}
/** First descendant with the given tag (used for header metadata only). */
function deep(root: Element | Document, tag: string): Element | null {
  return root.getElementsByTagName(tag)[0] ?? null;
}

function gcd(a: number, b: number): number {
  while (b) [a, b] = [b, a % b];
  return a;
}
function lcm(a: number, b: number): number {
  if (!a || !b) return a || b;
  return Math.abs((a / gcd(a, b)) * b);
}

const BEAT_UNIT_QUARTERS: Record<string, number> = {
  breve: 8,
  whole: 4,
  half: 2,
  quarter: 1,
  eighth: 0.5,
  '16th': 0.25,
  '32nd': 0.125,
  '64th': 0.0625,
};

/* ------------------------------------------------------------------ */

/** An event plus the staff it was written on - staff is resolved away later. */
type RawEvent = Event & { staff: number };

interface RawStream {
  partId: string;
  partName: string;
  voice: string;
  transpose: number;
  measures: RawEvent[][];
}

function emptyEvent(onset: number, duration: number, staff: number): RawEvent {
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
    measureRest: false,
    staff,
  };
}

export function parseMusicXml(xmlText: string): ParsedScore {
  const warnings: string[] = [];
  const doc = new DOMParser().parseFromString(xmlText, 'application/xml');

  const parseError = doc.getElementsByTagName('parsererror')[0];
  if (parseError) {
    throw new Error(`This file is not valid XML. ${(parseError.textContent ?? '').slice(0, 200)}`);
  }

  const root = doc.documentElement;
  if (!root) throw new Error('Empty document.');
  if (root.tagName === 'score-timewise') {
    throw new Error(
      'This is a time-wise MusicXML file. Re-export as part-wise MusicXML (every notation app does this by default).',
    );
  }
  if (root.tagName !== 'score-partwise') {
    throw new Error(
      `Expected a MusicXML score but the document root is <${root.tagName}>. ` +
        'Export the piece as MusicXML (.musicxml, .xml or .mxl) and try again.',
    );
  }

  /* ---- header metadata ------------------------------------------- */
  const title =
    kidText(deep(doc, 'work'), 'work-title') ||
    (deep(doc, 'movement-title')?.textContent ?? '').trim() ||
    undefined;
  const subtitle = kidText(deep(doc, 'work'), 'work-number') || undefined;
  let composer: string | undefined;
  let lyricist: string | undefined;
  const identification = deep(doc, 'identification');
  if (identification) {
    for (const c of kids(identification, 'creator')) {
      const type = (c.getAttribute('type') ?? '').toLowerCase();
      const value = (c.textContent ?? '').trim();
      if (!value) continue;
      if (type === 'composer' && !composer) composer = value;
      else if ((type === 'lyricist' || type === 'poet') && !lyricist) lyricist = value;
      else if (!composer && !type) composer = value;
    }
  }

  /* ---- part names ------------------------------------------------- */
  const partNames = new Map<string, string>();
  const partList = deep(doc, 'part-list');
  if (partList) {
    for (const sp of kids(partList, 'score-part')) {
      const id = sp.getAttribute('id') ?? '';
      const name =
        kidText(sp, 'part-name') ||
        kidText(sp, 'part-abbreviation') ||
        kidText(kid(sp, 'score-instrument'), 'instrument-name') ||
        id;
      partNames.set(id, name);
    }
  }

  /* ---- normalise <divisions> across the whole score ---------------- */
  let divisions = 1;
  for (const d of Array.from(doc.getElementsByTagName('divisions'))) {
    const v = Number((d.textContent ?? '').trim());
    if (Number.isFinite(v) && v > 0) divisions = lcm(divisions, Math.round(v));
  }
  // Guard against pathological values that would overflow later maths.
  if (!Number.isFinite(divisions) || divisions <= 0 || divisions > 1_000_000) {
    warnings.push('Unusual <divisions> values in the source; timing was rounded.');
    divisions = 768;
  }

  const parts = kids(root, 'part');
  if (parts.length === 0) throw new Error('The score contains no parts.');

  const measures: MeasureInfo[] = [];
  const rawStreams = new Map<string, RawStream>();
  /** Longest content actually written in each bar, across all parts. */
  const writtenLength = new Map<number, number>();
  /** What the prevailing time signature says the bar should hold. */
  const nominalLength = new Map<number, number>();

  /** Ensure a measure slot exists and return it. */
  function measureAt(i: number): MeasureInfo {
    while (measures.length <= i) {
      measures.push({
        index: measures.length,
        number: String(measures.length + 1),
        repeatForward: false,
        repeatBackward: null,
        endings: [],
        implicit: false,
        newSystem: false,
        newPage: false,
        length: 0,
      });
    }
    return measures[i];
  }

  const directionsByMeasure = new Map<number, DirectionText[]>();

  for (const part of parts) {
    const partId = part.getAttribute('id') ?? `P${parts.length}`;
    const partName = partNames.get(partId) ?? partId;
    const isFirstPart = part === parts[0];

    let localDivisions = 1;
    let scale = divisions; // normalised divisions per local division
    let transpose = 0;
    let curTime: TimeSig | undefined;

    const partMeasures = kids(part, 'measure');

    partMeasures.forEach((measureEl, mi) => {
      const info = measureAt(mi);
      const numAttr = measureEl.getAttribute('number');
      if (isFirstPart && numAttr) info.number = numAttr;
      if (measureEl.getAttribute('implicit') === 'yes') info.implicit = true;

      let cursor = 0;
      let maxCursor = 0;
      const lastEvent = new Map<string, RawEvent>();

      const streamFor = (voice: string): RawStream => {
        const key = `${partId} ${voice}`;
        let s = rawStreams.get(key);
        if (!s) {
          s = { partId, partName, voice, transpose, measures: [] };
          rawStreams.set(key, s);
        }
        s.transpose = transpose;
        while (s.measures.length <= mi) s.measures.push([]);
        return s;
      };

      for (const node of Array.from(measureEl.children)) {
        switch (node.tagName) {
          case 'attributes': {
            const d = kidNum(node, 'divisions');
            if (d && d > 0) {
              localDivisions = d;
              scale = divisions / localDivisions;
            }
            const keyEl = kid(node, 'key');
            if (keyEl) {
              const fifths = kidNum(keyEl, 'fifths');
              if (fifths !== undefined && !info.key) {
                info.key = { fifths, mode: kidText(keyEl, 'mode') } satisfies KeySig;
              }
            }
            const timeEl = kid(node, 'time');
            if (timeEl) {
              const beats = Number(kidText(timeEl, 'beats') ?? '');
              const beatType = Number(kidText(timeEl, 'beat-type') ?? '');
              if (Number.isFinite(beats) && Number.isFinite(beatType) && beats > 0 && beatType > 0) {
                curTime = { beats, beatType, symbol: timeEl.getAttribute('symbol') ?? undefined };
                if (!info.time) info.time = curTime;
              }
            }
            const tr = kid(node, 'transpose');
            if (tr) {
              transpose = (kidNum(tr, 'chromatic') ?? 0) + (kidNum(tr, 'octave-change') ?? 0) * 12;
            }
            break;
          }

          case 'print': {
            if (node.getAttribute('new-system') === 'yes') info.newSystem = true;
            if (node.getAttribute('new-page') === 'yes') info.newPage = true;
            break;
          }

          case 'backup': {
            cursor -= (kidNum(node, 'duration') ?? 0) * scale;
            if (cursor < 0) cursor = 0;
            break;
          }

          case 'forward': {
            cursor += (kidNum(node, 'duration') ?? 0) * scale;
            maxCursor = Math.max(maxCursor, cursor);
            break;
          }

          case 'direction': {
            readDirection(node, info, directionsByMeasure, mi, scale, cursor);
            break;
          }

          case 'sound': {
            const t = Number(node.getAttribute('tempo') ?? '');
            if (Number.isFinite(t) && t > 0 && info.tempo === undefined) info.tempo = t;
            break;
          }

          case 'barline': {
            readBarline(node, info);
            break;
          }

          case 'note': {
            const voice = kidText(node, 'voice') || '1';
            const staff = Math.max(1, Math.round(kidNum(node, 'staff') ?? 1));
            const stream = streamFor(voice);
            const bucket = stream.measures[mi];
            const isChord = kid(node, 'chord') !== null;
            const graceEl = kid(node, 'grace');
            const isGrace = graceEl !== null;
            const dur = isGrace ? 0 : (kidNum(node, 'duration') ?? 0) * scale;

            if (isChord) {
              const prev = lastEvent.get(voice);
              if (prev) {
                appendPitch(node, prev);
                break;
              }
              // A stray <chord/> with nothing to attach to: treat it as a normal note.
            }

            const ev = emptyEvent(cursor, dur, staff);
            ev.grace = isGrace;
            ev.graceSlash = isGrace && graceEl?.getAttribute('slash') === 'yes';
            ev.cue = kid(node, 'cue') !== null;
            ev.noteType = kidText(node, 'type');
            ev.dots = kids(node, 'dot').length;

            const restEl = kid(node, 'rest');
            if (restEl) {
              ev.measureRest = restEl.getAttribute('measure') === 'yes';
            } else {
              appendPitch(node, ev);
            }

            const timeModEl = kid(node, 'time-modification');
            if (timeModEl) {
              const actual = kidNum(timeModEl, 'actual-notes');
              const normal = kidNum(timeModEl, 'normal-notes');
              if (actual && normal) ev.timeMod = { actual, normal };
            }

            for (const tie of kids(node, 'tie')) {
              if (tie.getAttribute('type') === 'start') ev.tieStart = true;
              if (tie.getAttribute('type') === 'stop') ev.tieStop = true;
            }

            const notations = kid(node, 'notations');
            if (notations) readNotations(notations, ev);

            for (const ly of kids(node, 'lyric')) {
              const lyric = readLyric(ly);
              if (lyric) ev.lyrics.push(lyric);
            }

            bucket.push(ev);
            lastEvent.set(voice, ev);
            if (!isGrace) {
              cursor += dur;
              maxCursor = Math.max(maxCursor, cursor);
            }
            break;
          }
        }
      }

      if (curTime) {
        const nominal = (curTime.beats * divisions * 4) / curTime.beatType;
        nominalLength.set(mi, Math.max(nominalLength.get(mi) ?? 0, nominal));
      }
      writtenLength.set(mi, Math.max(writtenLength.get(mi) ?? 0, maxCursor));
    });
  }

  if (measures.length === 0) throw new Error('The score contains no measures.');

  // A pickup holds only what is written in it; anything else is at least a full
  // bar, so a voice that stops early still gets padded out with rests.
  let lastNominal = divisions * 4;
  for (const m of measures) {
    const nominal = nominalLength.get(m.index) ?? 0;
    if (nominal > 0) lastNominal = nominal;
    const written = writtenLength.get(m.index) ?? 0;
    const isPickup = m.implicit || m.number === '0';
    m.length = isPickup && written > 0 ? written : Math.max(lastNominal, written);
  }
  for (const [mi, list] of directionsByMeasure) {
    const target = measures[mi];
    if (target) target.directions = list;
  }

  const streams = finaliseStreams(rawStreams, measures, warnings);
  if (streams.length === 0) throw new Error('No notes were found in this score.');

  return { divisions, measures, streams, title, subtitle, composer, lyricist, warnings };
}

/* ------------------------------------------------------------------ */

function appendPitch(noteEl: Element, ev: Event) {
  const pitchEl = kid(noteEl, 'pitch');
  if (!pitchEl) return; // <unpitched> and friends carry no pitch we can use
  const stepText = (kidText(pitchEl, 'step') ?? 'C').toUpperCase();
  const step = (STEPS as readonly string[]).includes(stepText) ? (stepText as Step) : 'C';
  const octave = Math.round(kidNum(pitchEl, 'octave') ?? 4);
  const alter = Math.round(kidNum(pitchEl, 'alter') ?? 0);
  ev.pitches.push({ step, alter, octave } satisfies Pitch);
  ev.accidentals.push(kidText(noteEl, 'accidental'));
}

function readNotations(notations: Element, ev: Event) {
  for (const tied of kids(notations, 'tied')) {
    if (tied.getAttribute('type') === 'start') ev.tieStart = true;
    if (tied.getAttribute('type') === 'stop') ev.tieStop = true;
  }
  for (const slur of kids(notations, 'slur')) {
    if (slur.getAttribute('type') === 'start') ev.slurStart = true;
    if (slur.getAttribute('type') === 'stop') ev.slurStop = true;
  }
  if (kid(notations, 'fermata')) ev.fermata = true;
  for (const tup of kids(notations, 'tuplet')) {
    const t = tup.getAttribute('type');
    if (t === 'start' || t === 'stop') ev.tuplet = t;
  }
  const artic = kid(notations, 'articulations');
  if (artic) for (const a of Array.from(artic.children)) ev.articulations.push(a.tagName);
}

function readLyric(ly: Element): Lyric | null {
  const text = kidText(ly, 'text');
  const extend = kid(ly, 'extend') !== null;
  if (!text && !extend) return null;
  const numAttr = ly.getAttribute('number') ?? '1';
  const verse = Math.max(1, Math.round(Number(numAttr.replace(/\D+/g, '')) || 1));
  const syllabic = kidText(ly, 'syllabic') as Lyric['syllabic'] | undefined;
  return { verse, syllabic, text: text ?? '', extend };
}

function readBarline(node: Element, info: MeasureInfo) {
  const location = node.getAttribute('location') ?? 'right';
  const style = kidText(node, 'bar-style');
  if (style) {
    if (location === 'left') info.barStyleLeft = style;
    else info.barStyleRight = style;
  }
  const repeat = kid(node, 'repeat');
  if (repeat) {
    const dir = repeat.getAttribute('direction');
    if (dir === 'forward') info.repeatForward = true;
    if (dir === 'backward') {
      const times = Number(repeat.getAttribute('times') ?? '2');
      info.repeatBackward = Number.isFinite(times) && times >= 2 ? Math.round(times) : 2;
    }
  }
  const ending = kid(node, 'ending');
  if (ending) {
    const type = ending.getAttribute('type');
    const numbers = (ending.getAttribute('number') ?? '')
      .split(/[,\s]+/)
      .map((n) => Number(n))
      .filter((n) => Number.isFinite(n) && n > 0);
    if (type === 'start' || type === 'stop' || type === 'discontinue') {
      const entry: MeasureInfo['endings'][number] = {
        numbers: numbers.length ? numbers : [1],
        type,
        location: location === 'left' ? 'left' : 'right',
      };
      if (!info.endings.some((e) => e.type === entry.type && e.location === entry.location)) {
        info.endings.push(entry);
      }
    }
  }
}

function readDirection(
  node: Element,
  info: MeasureInfo,
  byMeasure: Map<number, DirectionText[]>,
  mi: number,
  scale: number,
  cursor: number,
) {
  const placement = (node.getAttribute('placement') ?? undefined) as 'above' | 'below' | undefined;
  const onset = Math.max(0, cursor + (kidNum(node, 'offset') ?? 0) * scale);

  const sound = kid(node, 'sound');
  const soundTempo = sound ? Number(sound.getAttribute('tempo') ?? '') : NaN;
  if (Number.isFinite(soundTempo) && soundTempo > 0 && info.tempo === undefined) {
    info.tempo = soundTempo;
  }

  const push = (d: DirectionText) => {
    const list = byMeasure.get(mi) ?? [];
    list.push(d);
    byMeasure.set(mi, list);
  };

  for (const dt of kids(node, 'direction-type')) {
    for (const child of Array.from(dt.children)) {
      if (child.tagName === 'metronome') {
        const unit = kidText(child, 'beat-unit') ?? 'quarter';
        const dotted = kids(child, 'beat-unit-dot').length;
        const perMinute = Number((kidText(child, 'per-minute') ?? '').replace(/[^\d.]/g, ''));
        const quarters = (BEAT_UNIT_QUARTERS[unit] ?? 1) * 1.5 ** dotted;
        if (Number.isFinite(perMinute) && perMinute > 0) {
          if (info.tempo === undefined) info.tempo = perMinute * quarters;
          if (!info.tempoText) info.tempoText = `${unit}${'.'.repeat(dotted)} = ${Math.round(perMinute)}`;
        }
      } else if (child.tagName === 'words' || child.tagName === 'rehearsal') {
        const text = (child.textContent ?? '').trim();
        if (text) push({ onset, kind: child.tagName === 'words' ? 'words' : 'rehearsal', text, placement });
      } else if (child.tagName === 'dynamics') {
        const text = Array.from(child.children)
          .map((c) => c.tagName)
          .filter((m) => m !== 'other-dynamics')
          .join('');
        if (text) push({ onset, kind: 'dynamics', text, placement: placement ?? 'below' });
      }
    }
  }
}

/* ------------------------------------------------------------------ */
/* Turn raw (part, voice) buckets into clean, gap-free voice streams.  */
/* ------------------------------------------------------------------ */

function finaliseStreams(
  rawStreams: Map<string, RawStream>,
  measures: MeasureInfo[],
  warnings: string[],
): VoiceStream[] {
  const out: VoiceStream[] = [];

  for (const raw of rawStreams.values()) {
    while (raw.measures.length < measures.length) raw.measures.push([]);

    // A single <voice> can legitimately live on two staves (closed score), or
    // just dip into the other staff for a note or two. Split only when both
    // staves carry a real share of the notes.
    const staffCounts = new Map<number, number>();
    let total = 0;
    for (const bucket of raw.measures) {
      for (const ev of bucket) {
        if (!ev.pitches.length) continue;
        staffCounts.set(ev.staff, (staffCounts.get(ev.staff) ?? 0) + 1);
        total++;
      }
    }
    const ranked = [...staffCounts.entries()].sort((a, b) => b[1] - a[1]);
    const shouldSplit = ranked.length > 1 && ranked.slice(1).some(([, n]) => n / Math.max(1, total) >= 0.25);

    if (shouldSplit) {
      for (const staff of ranked.map(([s]) => s).sort((a, b) => a - b)) {
        out.push(
          buildStream(
            `${raw.partId}/${raw.voice}/s${staff}`,
            raw,
            staff,
            raw.measures.map((b) => b.filter((e) => e.staff === staff)),
            measures,
          ),
        );
      }
    } else {
      out.push(buildStream(`${raw.partId}/${raw.voice}`, raw, ranked[0]?.[0] ?? 1, raw.measures, measures));
    }
  }

  // Rest-only staves carry no music, so they are not offered as voices.
  const kept = out.filter((s) => s.noteCount > 0);
  kept.sort((a, b) => b.avgMidi - a.avgMidi);

  if (kept.length < 4) {
    warnings.push(
      `Only ${kept.length} voice${kept.length === 1 ? '' : 's'} found, fewer than the four expected for SATB. ` +
        'Check the voice assignment below.',
    );
  }
  return kept;
}

function buildStream(
  key: string,
  raw: RawStream,
  staff: number,
  buckets: RawEvent[][],
  measures: MeasureInfo[],
): VoiceStream {
  const cleaned: Event[][] = [];
  let sum = 0;
  let count = 0;
  let min = Infinity;
  let max = -Infinity;

  for (let mi = 0; mi < measures.length; mi++) {
    const src = (buckets[mi] ?? []).slice();
    // Grace notes share their host's onset; a stable sort keeps them in front.
    src.sort((a, b) => a.onset - b.onset);

    const events: Event[] = [];
    let pos = 0;
    for (const ev of src) {
      if (ev.grace) {
        events.push(stripStaff(ev));
        continue;
      }
      if (ev.onset > pos + 1e-6) events.push(makeRest(pos, ev.onset - pos));
      events.push(stripStaff(ev));
      pos = Math.max(pos, ev.onset + ev.duration);
      for (const p of ev.pitches) {
        const m = midiOf(p);
        sum += m;
        count++;
        if (m < min) min = m;
        if (m > max) max = m;
      }
    }

    const target = measures[mi].length;
    if (events.length === 0) {
      const r = makeRest(0, target);
      r.measureRest = true;
      events.push(r);
    } else if (pos < target - 1e-6) {
      events.push(makeRest(pos, target - pos));
    }
    cleaned.push(events);
  }

  return {
    key,
    partId: raw.partId,
    partName: raw.partName,
    staff,
    voice: raw.voice,
    measures: cleaned,
    noteCount: count,
    avgMidi: count ? sum / count : 0,
    minMidi: count ? min : 0,
    maxMidi: count ? max : 0,
    transpose: raw.transpose,
  };
}

function stripStaff(ev: RawEvent): Event {
  const { staff: _staff, ...rest } = ev;
  void _staff;
  return rest;
}

function makeRest(onset: number, duration: number): Event {
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
    measureRest: false,
  };
}
