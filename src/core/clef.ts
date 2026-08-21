import { type ClefName } from './types';

export type ClefId = Exclude<ClefName, 'auto'>;

export interface ClefDef {
  id: ClefId;
  label: string;
  sign: 'G' | 'F' | 'C';
  line: number;
  octaveChange: number;
  /** Diatonic index of the pitch that sits on the middle staff line. */
  middle: number;
  /**
   * How readily a reader takes to it. Octave clefs are perfectly valid but
   * unfamiliar, so they only win when clearly the better fit.
   */
  bias: number;
  /**
   * Whether the automatic choice may pick it. C clefs fit a narrow two-voice
   * staff beautifully on paper, but a choir does not read them, so they are
   * offered only when asked for by name.
   */
  auto: boolean;
}

export const CLEFS: ClefDef[] = [
  { id: 'G2', label: 'Treble', sign: 'G', line: 2, octaveChange: 0, middle: 34, bias: 1, auto: true }, // B4
  { id: 'F4', label: 'Bass', sign: 'F', line: 4, octaveChange: 0, middle: 22, bias: 1, auto: true }, // D3
  { id: 'C3', label: 'Alto', sign: 'C', line: 3, octaveChange: 0, middle: 28, bias: 1.6, auto: false }, // C4
  { id: 'C4', label: 'Tenor', sign: 'C', line: 4, octaveChange: 0, middle: 26, bias: 1.7, auto: false }, // A3
  { id: 'G2-8', label: 'Treble 8vb', sign: 'G', line: 2, octaveChange: -1, middle: 27, bias: 1.35, auto: true }, // B3
  { id: 'F4+8', label: 'Bass 8va', sign: 'F', line: 4, octaveChange: 1, middle: 29, bias: 1.75, auto: false }, // D4
];

export function clefById(id: ClefId): ClefDef {
  return CLEFS.find((c) => c.id === id) ?? CLEFS[0];
}

/**
 * Average number of ledger lines per note. The staff itself spans -4..+4 and
 * the spaces just outside it need no ledger, hence the 5.
 */
export function ledgerLoad(positions: number[], clef: ClefDef): number {
  if (positions.length === 0) return 0;
  let total = 0;
  for (const d of positions) total += Math.max(0, (Math.abs(d - clef.middle) - 5) / 2);
  return total / positions.length;
}

function cost(positions: number[], clef: ClefDef): number {
  if (positions.length === 0) return 0;
  let ledgerTotal = 0;
  let offCentre = 0;
  for (const d of positions) {
    const distance = Math.abs(d - clef.middle);
    const ledgers = Math.max(0, (distance - 5) / 2);
    ledgerTotal += ledgers * ledgers;
    offCentre += distance;
  }
  const n = positions.length;
  // Ledger lines dominate; the rest only settles ties, so that a clef which
  // centres the music and one a reader meets every day come out ahead.
  return (
    (ledgerTotal / n) * clef.bias + (clef.bias - 1) * 0.18 + (offCentre / n) * 0.001
  );
}

/**
 * Pick the clef that keeps the most notes on (or near) the staff. With two
 * voices sharing one staff the range is wide, so this matters far more than it
 * would for a single line.
 */
const AUTO_CLEFS = CLEFS.filter((c) => c.auto);

export function chooseClef(positions: number[]): ClefId {
  if (positions.length === 0) return 'G2';
  let best = AUTO_CLEFS[0];
  let bestScore = Infinity;
  AUTO_CLEFS.forEach((clef, index) => {
    const score = cost(positions, clef) + index / 10_000;
    if (score < bestScore) {
      bestScore = score;
      best = clef;
    }
  });
  return best.id;
}

export function bestClefCost(positions: number[]): number {
  return Math.min(...AUTO_CLEFS.map((clef) => cost(positions, clef)));
}

/**
 * The range a staff has to cover, in diatonic steps, ignoring the odd extreme
 * note. Five staff lines hold 8 steps, and two ledger lines either side take
 * that to about 16, so anything past ~13 starts to hurt.
 */
export function staffSpan(positions: number[]): number {
  if (positions.length === 0) return 0;
  const sorted = positions.slice().sort((a, b) => a - b);
  const at = (fraction: number) => sorted[Math.min(sorted.length - 1, Math.floor(fraction * sorted.length))];
  return at(0.95) - at(0.05);
}

/**
 * Suggest a whole-octave shift per voice so that two voices sharing a staff
 * actually fit on it. Used by the "fit to staff" action; shifting is only
 * proposed when it buys a real reduction in ledger lines.
 */
export function suggestOctaveShifts(voicePositions: number[][]): number[] {
  const count = voicePositions.length;
  if (count === 0) return [];
  const choices = [-1, 0, 1];
  let best = new Array<number>(count).fill(0);
  let bestScore = Infinity;
  // Moving the top line is more disruptive than moving an inner one: it is
  // usually the tune, and it is what a singer scans for first.
  const shiftPenalty = (index: number) => (index === 0 ? 0.3 : 0.22);

  const walk = (index: number, shifts: number[]) => {
    if (index === count) {
      const combined: number[] = [];
      voicePositions.forEach((positions, i) => {
        for (const d of positions) combined.push(d + shifts[i] * 7);
      });
      // A shift has to earn its keep, so each one carries a small penalty.
      const penalty = shifts.reduce((sum, s, i) => sum + (s === 0 ? 0 : shiftPenalty(i)), 0);
      const score = bestClefCost(combined) + penalty;
      if (score < bestScore - 1e-9) {
        bestScore = score;
        best = shifts.slice();
      }
      return;
    }
    for (const shift of choices) walk(index + 1, [...shifts, shift]);
  };
  walk(0, []);

  // Shifting every voice by the same amount only changes the clef, not the
  // relationship between the voices, so leave that to the clef chooser.
  if (best[0] !== 0 && best.every((s) => s === best[0])) return best.map(() => 0);
  return best;
}
