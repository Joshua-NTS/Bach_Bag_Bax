import { type MeasureInfo } from './types';

/**
 * Work out the order measures are actually played in.
 *
 * Handles forward/backward repeats (including `times="3"`) and first/second
 * endings, which is everything a hymn or chorale realistically uses. Anything
 * more exotic (D.C., segno, coda) is played straight through.
 */
export function playbackOrder(measures: MeasureInfo[], expand: boolean): number[] {
  const straight = measures.map((_, i) => i);
  if (!expand) return straight;

  const order: number[] = [];
  const timesPlayed = new Map<number, number>();
  let i = 0;
  let repeatStart = 0;
  let pass = 1;
  // A malformed repeat structure must not hang the browser.
  const limit = Math.max(2000, measures.length * 64);
  let guard = 0;

  while (i < measures.length) {
    if (guard++ > limit) return straight;
    const m = measures[i];

    if (m.repeatForward) {
      repeatStart = i;
      pass = timesPlayed.get(-i - 1) ?? 1;
    }

    const start = m.endings.find((e) => e.type === 'start');
    if (start && !start.numbers.includes(pass)) {
      // Wrong volta for this pass: jump to the bracket that does apply.
      let j = i + 1;
      while (j < measures.length) {
        const s = measures[j].endings.find((e) => e.type === 'start');
        if (s && s.numbers.includes(pass)) break;
        j++;
      }
      if (j >= measures.length) break;
      i = j;
      continue;
    }

    order.push(i);

    if (m.repeatBackward) {
      const target = m.repeatBackward;
      const played = timesPlayed.get(i) ?? 1;
      if (played < target) {
        timesPlayed.set(i, played + 1);
        pass = played + 1;
        timesPlayed.set(-repeatStart - 1, pass);
        i = repeatStart;
        continue;
      }
    }
    i++;
  }

  return order.length ? order : straight;
}

export function hasRepeats(measures: MeasureInfo[]): boolean {
  return measures.some((m) => m.repeatBackward !== null || m.repeatForward || m.endings.length > 0);
}
