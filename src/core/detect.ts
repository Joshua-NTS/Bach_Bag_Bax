import {
  type ParsedScore,
  type VoiceStream,
  type Role,
  type SlotAssignment,
  type Event,
  midiOf,
} from './types';

/* ------------------------------------------------------------------ */
/* Voice-name recognition                                              */
/* ------------------------------------------------------------------ */

/**
 * Part/voice names as they actually turn up in choral MusicXML, across the
 * languages these files tend to come in (EN, NL, DE, FR, IT, Latin).
 */
const ROLE_PATTERNS: Array<{ role: Role; re: RegExp }> = [
  { role: 'S', re: /\b(sopran[oa]?|sopraan|sopran|cantus|canto|superius|discant|descant|treble|dessus|s\.?)\b/i },
  { role: 'A', re: /\b(alt[oi]?|altus|contralto|contra-?alt[oa]?|mezzo|haute-?contre|a\.?)\b/i },
  { role: 'T', re: /\b(tenor[ei]?|tenore|tenuto-?voice|taille|t\.?)\b/i },
  { role: 'B', re: /\b(bass?[oi]?|bas|bassus|bariton[e]?|basse|b\.?)\b/i },
];

/** Order matters: "basso" must not be read as "alto", etc. */
function roleFromName(name: string): Role | null {
  const cleaned = name.replace(/[_\-.]+/g, ' ').trim();
  if (!cleaned) return null;
  const hits = new Set<Role>();
  for (const { role, re } of ROLE_PATTERNS) if (re.test(cleaned)) hits.add(role);
  // "Bass" also matches the /b\.?/ branch only; ambiguity means we cannot trust it.
  return hits.size === 1 ? [...hits][0] : null;
}

/**
 * Work out which stream sings which part.
 *
 * Names win when they cover all four roles cleanly, because a composer's
 * labelling beats any heuristic. Otherwise the streams fall back to pitch
 * order, which is right for the overwhelming majority of SATB scores.
 */
export function detectRoles(streams: VoiceStream[]): Map<string, Role> {
  const result = new Map<string, Role>();
  if (streams.length === 0) return result;

  const named = streams.map((s) => ({
    stream: s,
    role: roleFromName(`${s.partName} ${s.voice}`) ?? roleFromName(s.partName),
  }));

  const counts = new Map<Role, number>();
  for (const n of named) if (n.role) counts.set(n.role, (counts.get(n.role) ?? 0) + 1);
  const namesAreClean =
    named.filter((n) => n.role).length >= Math.min(4, streams.length) &&
    [...counts.values()].every((c) => c === 1);

  if (namesAreClean) {
    for (const n of named) if (n.role) result.set(n.stream.key, n.role);
  }

  // Fill anything still unassigned by descending average pitch.
  const order: Role[] = ['S', 'A', 'T', 'B'];
  const remainingRoles = order.filter((r) => ![...result.values()].includes(r));
  const remainingStreams = streams
    .filter((s) => !result.has(s.key))
    .sort((a, b) => b.avgMidi - a.avgMidi);
  remainingStreams.forEach((s, i) => {
    if (i < remainingRoles.length) result.set(s.key, remainingRoles[i]);
  });

  return result;
}

/* ------------------------------------------------------------------ */
/* Chord splitting                                                     */
/* ------------------------------------------------------------------ */

function chordShare(stream: VoiceStream): number {
  let chords = 0;
  let sounded = 0;
  for (const bar of stream.measures) {
    for (const ev of bar) {
      if (!ev.pitches.length) continue;
      sounded++;
      if (ev.pitches.length >= 2) chords++;
    }
  }
  return sounded ? chords / sounded : 0;
}

function pickPitch(ev: Event, which: 'upper' | 'lower', keepLyrics: boolean): Event {
  if (!ev.pitches.length) return { ...ev, lyrics: keepLyrics ? ev.lyrics : [] };
  const indexed = ev.pitches.map((p, i) => ({ p, i, m: midiOf(p) }));
  indexed.sort((a, b) => a.m - b.m);
  const chosen = which === 'upper' ? indexed[indexed.length - 1] : indexed[0];
  return {
    ...ev,
    pitches: [chosen.p],
    accidentals: [ev.accidentals[chosen.i]],
    lyrics: keepLyrics ? ev.lyrics : [],
  };
}

function splitOne(stream: VoiceStream, which: 'upper' | 'lower'): VoiceStream {
  const measures = stream.measures.map((bar) => bar.map((ev) => pickPitch(ev, which, which === 'upper')));
  let sum = 0;
  let count = 0;
  let min = Infinity;
  let max = -Infinity;
  for (const bar of measures) {
    for (const ev of bar) {
      for (const p of ev.pitches) {
        const m = midiOf(p);
        sum += m;
        count++;
        if (m < min) min = m;
        if (m > max) max = m;
      }
    }
  }
  return {
    ...stream,
    key: `${stream.key}#${which}`,
    partName: `${stream.partName} (${which})`,
    measures,
    noteCount: count,
    avgMidi: count ? sum / count : 0,
    minMidi: count ? min : 0,
    maxMidi: count ? max : 0,
    derivedFrom: { key: stream.key, role: which },
  };
}

/**
 * Hymnal-style sources write two singers as one chordal voice. When that
 * leaves us short of four lines, split every chordal stream into its top and
 * bottom note so the four voices reappear.
 */
export function splitChordalStreams(score: ParsedScore): ParsedScore {
  const chordal = score.streams.filter((s) => chordShare(s) >= 0.5);
  if (chordal.length === 0) return score;

  const streams: VoiceStream[] = [];
  for (const s of score.streams) {
    if (chordal.includes(s)) {
      streams.push(splitOne(s, 'upper'), splitOne(s, 'lower'));
    } else {
      streams.push(s);
    }
  }
  streams.sort((a, b) => b.avgMidi - a.avgMidi);
  return { ...score, streams };
}

/** True when splitting would actually help, i.e. we are short of four voices. */
export function shouldOfferChordSplit(score: ParsedScore): boolean {
  return score.streams.length < 4 && score.streams.some((s) => chordShare(s) >= 0.5);
}

/* ------------------------------------------------------------------ */
/* Slot assignment                                                     */
/* ------------------------------------------------------------------ */

export type Pairing = 'ST_AB' | 'SA_TB' | 'SB_AT';

export const PAIRINGS: Array<{ id: Pairing; label: string; hint: string; roles: [Role, Role, Role, Role] }> = [
  {
    id: 'ST_AB',
    label: 'S + T  /  A + B',
    hint: 'Soprano over tenor, alto over bass',
    roles: ['S', 'T', 'A', 'B'],
  },
  {
    id: 'SA_TB',
    label: 'S + A  /  T + B',
    hint: 'Classic closed score: women above, men below',
    roles: ['S', 'A', 'T', 'B'],
  },
  {
    id: 'SB_AT',
    label: 'S + B  /  A + T',
    hint: 'Outer voices above, inner voices below',
    roles: ['S', 'B', 'A', 'T'],
  },
];

/** Build the four notated slots from the detected roles, for a given pairing. */
export function assignmentFor(
  streams: VoiceStream[],
  roles: Map<string, Role>,
  pairing: Pairing,
): SlotAssignment {
  const byRole = new Map<Role, string>();
  for (const s of streams) {
    const r = roles.get(s.key);
    if (r && !byRole.has(r)) byRole.set(r, s.key);
  }
  const [a, b, c, d] = (PAIRINGS.find((p) => p.id === pairing) ?? PAIRINGS[0]).roles;
  const pick = (role: Role) => byRole.get(role) ?? null;

  // Within each staff the higher-sounding line takes the upper slot.
  const orderPair = (x: string | null, y: string | null): [string | null, string | null] => {
    const sx = streams.find((s) => s.key === x);
    const sy = streams.find((s) => s.key === y);
    if (sx && sy && sy.avgMidi > sx.avgMidi) return [y, x];
    return [x, y];
  };

  const [s1upper, s1lower] = orderPair(pick(a), pick(b));
  const [s2upper, s2lower] = orderPair(pick(c), pick(d));
  return { s1upper, s1lower, s2upper, s2lower };
}
