/**
 * Runs the conversion pipeline inside a real browser (it needs DOMParser and
 * the Verovio WASM build) and checks the results.
 *
 *   npm run dev            # in one shell
 *   node test/pipeline.test.mjs
 */
import { chromium } from 'playwright';
import { CLOSED_SCORE, CHORDAL, FOUR_PARTS_NL, UNISON } from './fixtures.mjs';

const BASE = process.env.BASE || 'http://localhost:5173';
const CHROME = process.env.CHROME || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';

let passed = 0;
const failures = [];

function check(name, condition, detail) {
  if (condition) {
    passed++;
  } else {
    failures.push(`${name}${detail === undefined ? '' : ` — ${JSON.stringify(detail)}`}`);
  }
}

function eq(name, actual, expected) {
  const ok = JSON.stringify(actual) === JSON.stringify(expected);
  check(name, ok, ok ? undefined : { actual, expected });
}

/** Minimal Standard MIDI File reader, used to check what we actually wrote. */
function parseSmf(bytes) {
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const ascii = (at, n) => String.fromCharCode(...bytes.slice(at, at + n));
  if (ascii(0, 4) !== 'MThd') throw new Error('not a MIDI file');

  const format = view.getUint16(8);
  const ntrks = view.getUint16(10);
  const division = view.getUint16(12);

  let at = 8 + view.getUint32(4);
  const tracks = [];
  const trackNames = [];
  const tempos = [];
  const programs = [];
  const channels = new Set();
  let timeSignature = null;
  let noteOns = 0;
  let dangling = 0;
  let lastTick = 0;

  while (at < bytes.length) {
    if (ascii(at, 4) !== 'MTrk') break;
    const length = view.getUint32(at + 4);
    const end = at + 8 + length;
    let p = at + 8;
    let tick = 0;
    let running = 0;
    const open = new Map();

    while (p < end) {
      let delta = 0;
      for (;;) {
        const b = bytes[p++];
        delta = (delta << 7) | (b & 0x7f);
        if ((b & 0x80) === 0) break;
      }
      tick += delta;

      let status = bytes[p];
      if (status & 0x80) p++;
      else status = running;
      if (status < 0xf0) running = status;

      if (status === 0xff) {
        const type = bytes[p++];
        let len = 0;
        for (;;) {
          const b = bytes[p++];
          len = (len << 7) | (b & 0x7f);
          if ((b & 0x80) === 0) break;
        }
        const data = bytes.slice(p, p + len);
        p += len;
        if (type === 0x03) trackNames.push(String.fromCharCode(...data));
        if (type === 0x51) tempos.push((data[0] << 16) | (data[1] << 8) | data[2]);
        if (type === 0x58 && !timeSignature) timeSignature = [data[0], data[1]];
        if (type === 0x2f) break;
        continue;
      }

      const kind = status & 0xf0;
      const channel = status & 0x0f;
      if (kind === 0x90 || kind === 0x80) {
        const note = bytes[p++];
        const velocity = bytes[p++];
        channels.add(channel);
        if (kind === 0x90 && velocity > 0) {
          noteOns++;
          open.set(note, (open.get(note) ?? 0) + 1);
        } else {
          const count = open.get(note) ?? 0;
          if (count === 0) dangling++;
          else open.set(note, count - 1);
          lastTick = Math.max(lastTick, tick);
        }
      } else if (kind === 0xc0 || kind === 0xd0) {
        if (kind === 0xc0) programs.push(bytes[p]);
        p += 1;
      } else {
        p += 2;
      }
    }
    for (const count of open.values()) dangling += count;
    tracks.push({ length });
    at = end;
  }

  return {
    format,
    ntrks,
    division,
    tracks,
    trackNames,
    tempos,
    programs,
    channels: [...channels].sort((a, b) => a - b),
    timeSignature,
    noteOns,
    dangling,
    lastTick,
    trailing: bytes.length - at,
  };
}

const browser = await chromium.launch({ executablePath: CHROME });
const page = await browser.newPage();
const pageErrors = [];
page.on('pageerror', (e) => pageErrors.push(e.message));
await page.goto(BASE, { waitUntil: 'domcontentloaded' });

/** Run a function in the page with the pipeline modules injected. */
async function run(fn, arg) {
  return page.evaluate(async ({ body, arg }) => {
    const mods = {
      musicxml: await import('/src/core/musicxml.ts'),
      merge: await import('/src/core/merge.ts'),
      midi: await import('/src/core/midi.ts'),
      detect: await import('/src/core/detect.ts'),
      repeats: await import('/src/core/repeats.ts'),
      clef: await import('/src/core/clef.ts'),
      types: await import('/src/core/types.ts'),
      paper: await import('/src/core/paper.ts'),
      mxl: await import('/src/core/mxl.ts'),
      sample: await import('/src/sample.ts'),
      verovio: await import('/src/render/verovio.ts'),
    };
    // eslint-disable-next-line no-new-func
    const f = new Function('mods', 'arg', `return (${body})(mods, arg);`);
    return await f(mods, arg);
  }, { body: fn.toString(), arg });
}

/* ================================================================== */
/* 1. Parsing the sample                                              */
/* ================================================================== */

const parsed = await run((m) => {
  const score = m.musicxml.parseMusicXml(m.sample.SAMPLE_CHORALE);
  const roles = m.detect.detectRoles(score.streams);
  return {
    measures: score.measures.length,
    divisions: score.divisions,
    streams: score.streams.map((s) => ({
      name: s.partName,
      role: roles.get(s.key),
      notes: s.noteCount,
      min: s.minMidi,
      max: s.maxMidi,
      bars: s.measures.length,
      firstBarLength: s.measures[0].reduce((a, e) => a + e.duration, 0),
    })),
    tempo: score.measures[0].tempo,
    key: score.measures[0].key,
    time: score.measures[0].time,
    repeatForward: score.measures[0].repeatForward,
    repeatBackward: score.measures[3].repeatBackward,
    lyricCount: score.streams[0].measures.flat().filter((e) => e.lyrics.length).length,
    fermatas: score.streams.map((s) => s.measures.flat().filter((e) => e.fermata).length),
  };
});

eq('sample: measure count', parsed.measures, 8);
eq('sample: voice count', parsed.streams.length, 4);
eq('sample: roles', parsed.streams.map((s) => s.role), ['S', 'A', 'T', 'B']);
eq('sample: notes per voice', parsed.streams.map((s) => s.notes), [26, 26, 26, 26]);
eq('sample: every bar is full', parsed.streams.map((s) => s.firstBarLength), Array(4).fill(parsed.divisions * 4));
eq('sample: tempo', parsed.tempo, 72);
eq('sample: key', parsed.key, { fifths: 0, mode: 'major' });
eq('sample: time', parsed.time, { beats: 4, beatType: 4, symbol: undefined });
check('sample: forward repeat found', parsed.repeatForward === true, parsed.repeatForward);
eq('sample: backward repeat found', parsed.repeatBackward, 2);
eq('sample: lyric syllables', parsed.lyricCount, 26);
eq('sample: fermatas per voice', parsed.fermatas, [4, 4, 4, 4]);

/* ================================================================== */
/* 2. Merging keeps every pitch, in order                             */
/* ================================================================== */

const roundTrip = await run((m) => {
  const score = m.musicxml.parseMusicXml(m.sample.SAMPLE_CHORALE);
  const roles = m.detect.detectRoles(score.streams);
  const assignment = m.detect.assignmentFor(score.streams, roles, 'ST_AB');
  const merged = m.merge.buildMergedScore(score, {
    assignment,
    octaves: { s1upper: 0, s1lower: 0, s2upper: 0, s2lower: 0 },
    clef1: 'auto',
    clef2: 'auto',
    lyrics: 'top',
    staffNames: ['Soprano + Tenor', 'Alto + Bass'],
    title: 'Sample Chorale',
  });

  // Read the merged file back and pull the pitches out per part and voice.
  const doc = new DOMParser().parseFromString(merged.xml, 'application/xml');
  const readVoice = (partIndex, voice) => {
    const part = doc.getElementsByTagName('part')[partIndex];
    const out = [];
    for (const note of Array.from(part.getElementsByTagName('note'))) {
      if ((note.getElementsByTagName('voice')[0]?.textContent ?? '1') !== String(voice)) continue;
      const pitch = note.getElementsByTagName('pitch')[0];
      if (!pitch) continue;
      out.push(
        `${pitch.getElementsByTagName('step')[0].textContent}${
          pitch.getElementsByTagName('octave')[0].textContent
        }`,
      );
    }
    return out;
  };
  const source = (key) => {
    const stream = score.streams.find((s) => s.key === key);
    return stream.measures.flat().flatMap((e) => e.pitches.map((p) => `${p.step}${p.octave}`));
  };

  return {
    parts: doc.getElementsByTagName('part').length,
    brace: doc.getElementsByTagName('group-symbol')[0]?.textContent,
    names: Array.from(doc.getElementsByTagName('part-name')).map((n) => n.textContent),
    clefs: merged.clefs.map((c) => c.id),
    lyrics: doc.getElementsByTagName('lyric').length,
    fermatas: doc.getElementsByTagName('fermata').length,
    repeats: Array.from(doc.getElementsByTagName('repeat')).map((r) => r.getAttribute('direction')),
    voices: {
      s1upper: readVoice(0, 1),
      s1lower: readVoice(0, 2),
      s2upper: readVoice(1, 1),
      s2lower: readVoice(1, 2),
    },
    expected: {
      s1upper: source(assignment.s1upper),
      s1lower: source(assignment.s1lower),
      s2upper: source(assignment.s2upper),
      s2lower: source(assignment.s2lower),
    },
    // Every measure of every part must add up to a full bar.
    barTotals: Array.from(doc.getElementsByTagName('part')).map((part) =>
      Array.from(part.getElementsByTagName('measure')).map((measure) => {
        const totals = {};
        for (const note of Array.from(measure.getElementsByTagName('note'))) {
          if (note.getElementsByTagName('chord')[0]) continue;
          const v = note.getElementsByTagName('voice')[0]?.textContent ?? '1';
          const d = Number(note.getElementsByTagName('duration')[0]?.textContent ?? 0);
          totals[v] = (totals[v] ?? 0) + d;
        }
        return totals;
      }),
    ),
  };
});

eq('merge: two parts', roundTrip.parts, 2);
eq('merge: braced', roundTrip.brace, 'brace');
eq('merge: staff names', roundTrip.names, ['Soprano + Tenor', 'Alto + Bass']);
eq('merge: pitches survive (staff 1 upper)', roundTrip.voices.s1upper, roundTrip.expected.s1upper);
eq('merge: pitches survive (staff 1 lower)', roundTrip.voices.s1lower, roundTrip.expected.s1lower);
eq('merge: pitches survive (staff 2 upper)', roundTrip.voices.s2upper, roundTrip.expected.s2upper);
eq('merge: pitches survive (staff 2 lower)', roundTrip.voices.s2lower, roundTrip.expected.s2lower);
eq('merge: lyrics carried over once', roundTrip.lyrics, 26);
eq('merge: fermatas carried over', roundTrip.fermatas, 16);
eq('merge: repeats carried over', roundTrip.repeats, ['forward', 'backward', 'forward', 'backward']);
check(
  'merge: every bar of every voice is complete',
  roundTrip.barTotals.every((part) => part.every((bar) => Object.values(bar).every((d) => d === 16))),
  roundTrip.barTotals,
);

/* ================================================================== */
/* 3. Octave shifts                                                   */
/* ================================================================== */

const shifted = await run((m) => {
  const score = m.musicxml.parseMusicXml(m.sample.SAMPLE_CHORALE);
  const roles = m.detect.detectRoles(score.streams);
  const assignment = m.detect.assignmentFor(score.streams, roles, 'ST_AB');
  const octaves = { s1upper: 0, s1lower: 1, s2upper: -1, s2lower: 0 };
  const merged = m.merge.buildMergedScore(score, {
    assignment,
    octaves,
    clef1: 'auto',
    clef2: 'auto',
    lyrics: 'none',
    staffNames: null,
  });
  const doc = new DOMParser().parseFromString(merged.xml, 'application/xml');
  const octavesOf = (partIndex, voice) => {
    const part = doc.getElementsByTagName('part')[partIndex];
    const out = new Set();
    for (const note of Array.from(part.getElementsByTagName('note'))) {
      if ((note.getElementsByTagName('voice')[0]?.textContent ?? '1') !== String(voice)) continue;
      const pitch = note.getElementsByTagName('pitch')[0];
      if (pitch) out.add(Number(pitch.getElementsByTagName('octave')[0].textContent));
    }
    return [...out].sort((a, b) => a - b);
  };

  const plain = m.midi.renderMidi(score, merged.staves, ['a', 'b'], {
    ...m.midi.DEFAULT_MIDI_OPTIONS,
    expandRepeats: false,
    followOctaveShifts: false,
  });
  const following = m.midi.renderMidi(score, merged.staves, ['a', 'b'], {
    ...m.midi.DEFAULT_MIDI_OPTIONS,
    expandRepeats: false,
    followOctaveShifts: true,
  });
  // Staff 2 holds the alto (shifted down an octave) and the bass (unshifted),
  // so following the shift lowers the top of that staff by an octave and
  // leaves its bottom, which the bass owns, exactly where it was.
  const range = (r) => {
    const midi = r.notes.filter((n) => n.staff === 1).map((n) => n.midi);
    return [Math.min(...midi), Math.max(...midi)];
  };

  return {
    tenorOctaves: octavesOf(0, 2),
    altoOctaves: octavesOf(1, 1),
    noShiftRange: range(plain),
    shiftedRange: range(following),
    suggestion: m.clef.suggestOctaveShifts([
      [25, 26, 27], // roughly a tenor line, an octave below a soprano
      [32, 33, 34],
    ]),
  };
});

eq('octaves: tenor written an octave up', shifted.tenorOctaves, [4, 5]);
eq('octaves: alto written an octave down', shifted.altoOctaves, [3]);
eq('octaves: ignoring the shift keeps the written pitches', shifted.noShiftRange, [43, 71]);
eq('octaves: following it drops the alto an octave', shifted.shiftedRange, [43, 59]);
check('octaves: a suggestion is returned', Array.isArray(shifted.suggestion), shifted.suggestion);

/* ---- when folding voices onto a staff is worth doing -------------- */

const fitting = await run((m) => {
  const score = m.musicxml.parseMusicXml(m.sample.SAMPLE_CHORALE);
  const roles = m.detect.detectRoles(score.streams);
  const report = (pairing) => {
    const assignment = m.detect.assignmentFor(score.streams, roles, pairing);
    const plain = m.merge.buildMergedScore(score, {
      assignment,
      octaves: m.merge.NO_OCTAVE_SHIFT,
      clef1: 'auto',
      clef2: 'auto',
      lyrics: 'none',
      staffNames: null,
    });
    const octaves = m.merge.autoFitOctaves(score, assignment);
    const fitted = m.merge.buildMergedScore(score, {
      assignment,
      octaves,
      clef1: 'auto',
      clef2: 'auto',
      lyrics: 'none',
      staffNames: null,
    });
    return {
      needsFitting: m.merge.needsOctaveFitting(score, assignment),
      span: plain.span,
      suggested: [octaves.s1upper, octaves.s1lower, octaves.s2upper, octaves.s2lower],
      clefsBefore: plain.clefs.map((c) => c.id),
      clefsAfter: fitted.clefs.map((c) => c.id),
      ledgersBefore: plain.ledgerLoad.map((l) => Math.round(l * 100) / 100),
      ledgersAfter: fitted.ledgerLoad.map((l) => Math.round(l * 100) / 100),
    };
  };
  return { ST_AB: report('ST_AB'), SA_TB: report('SA_TB') };
});

check('fitting: S+T / A+B needs folding', fitting.ST_AB.needsFitting === true, fitting.ST_AB);
check(
  'fitting: exactly one voice moves on each staff',
  fitting.ST_AB.suggested.filter((s, i) => i < 2 && s !== 0).length === 1 &&
    fitting.ST_AB.suggested.filter((s, i) => i >= 2 && s !== 0).length === 1,
  fitting.ST_AB.suggested,
);
eq('fitting: folded staves read treble and bass', fitting.ST_AB.clefsAfter, ['G2', 'F4']);
check(
  'fitting: folding all but removes the ledger lines',
  fitting.ST_AB.ledgersAfter.every((l) => l < 0.05) && fitting.ST_AB.ledgersBefore.some((l) => l > 0.3),
  fitting.ST_AB,
);
check('fitting: S+A / T+B is left alone', fitting.SA_TB.needsFitting === false, fitting.SA_TB);
eq('fitting: S+A / T+B suggests no shift', fitting.SA_TB.suggested, [0, 0, 0, 0]);
eq('fitting: S+A / T+B is already treble and bass', fitting.SA_TB.clefsBefore, ['G2', 'F4']);

/* ================================================================== */
/* 4. MIDI                                                            */
/* ================================================================== */

const midi = await run((m) => {
  const score = m.musicxml.parseMusicXml(m.sample.SAMPLE_CHORALE);
  const roles = m.detect.detectRoles(score.streams);
  const assignment = m.detect.assignmentFor(score.streams, roles, 'ST_AB');
  const merged = m.merge.buildMergedScore(score, {
    assignment,
    octaves: { s1upper: 0, s1lower: 0, s2upper: 0, s2lower: 0 },
    clef1: 'auto',
    clef2: 'auto',
    lyrics: 'none',
    staffNames: null,
  });
  const opts = { ...m.midi.DEFAULT_MIDI_OPTIONS, followOctaveShifts: true };
  const flat = m.midi.renderMidi(score, merged.staves, ['S+T', 'A+B'], { ...opts, expandRepeats: false });
  const repeated = m.midi.renderMidi(score, merged.staves, ['S+T', 'A+B'], { ...opts, expandRepeats: true });
  const staffOnly = m.midi.renderMidi(score, merged.staves, ['S+T', 'A+B'], { ...opts, expandRepeats: false }, 0);

  const header = Array.from(flat.bytes.slice(0, 14));
  const trackCount = (header[10] << 8) | header[11];
  const division = (header[12] << 8) | header[13];

  return {
    magic: String.fromCharCode(...flat.bytes.slice(0, 4)),
    trackCount,
    division,
    soloTrackCount: (staffOnly.bytes[10] << 8) | staffOnly.bytes[11],
    notes: flat.notes.length,
    repeatedNotes: repeated.notes.length,
    duration: Math.round(flat.duration * 100) / 100,
    repeatedDuration: Math.round(repeated.duration * 100) / 100,
    firstNotes: flat.notes.slice(0, 4).map((n) => n.midi).sort((a, b) => a - b),
    order: m.repeats.playbackOrder(score.measures, true),
    spans: repeated.measureSpans.length,
    staffSplit: [0, 1].map((s) => flat.notes.filter((n) => n.staff === s).length),
  };
});

eq('midi: SMF header', midi.magic, 'MThd');
eq('midi: three tracks (tempo + two staves)', midi.trackCount, 3);
eq('midi: single-staff export has two tracks', midi.soloTrackCount, 2);
eq('midi: ticks per quarter', midi.division, 480);
eq('midi: note count without repeats', midi.notes, 104);
eq('midi: notes split evenly between staves', midi.staffSplit, [52, 52]);
eq('midi: first chord', midi.firstNotes, [48, 64, 67, 72]); // C3 E4 G4 C5
eq('midi: 8 bars at 72 bpm', midi.duration, Math.round((8 * 4 * 60 / 72) * 100) / 100);
eq('midi: repeat expands bars 1-4', midi.order, [0, 1, 2, 3, 0, 1, 2, 3, 4, 5, 6, 7]);
eq('midi: repeat replays bars 1-4', midi.repeatedNotes, 104 + 14 * 4);
eq('midi: repeated span count', midi.spans, 12);

/* ---- read the bytes back as a real Standard MIDI File ------------ */

const bytes = Uint8Array.from(
  await run((m) => {
    const score = m.musicxml.parseMusicXml(m.sample.SAMPLE_CHORALE);
    const roles = m.detect.detectRoles(score.streams);
    const merged = m.merge.buildMergedScore(score, {
      assignment: m.detect.assignmentFor(score.streams, roles, 'ST_AB'),
      octaves: { s1upper: 0, s1lower: 0, s2upper: 0, s2lower: 0 },
      clef1: 'auto',
      clef2: 'auto',
      lyrics: 'none',
      staffNames: null,
    });
    const r = m.midi.renderMidi(score, merged.staves, ['S+T', 'A+B'], {
      ...m.midi.DEFAULT_MIDI_OPTIONS,
      expandRepeats: false,
    });
    return Array.from(r.bytes);
  }),
);

const smf = parseSmf(bytes);
eq('smf: format 1', smf.format, 1);
eq('smf: track count matches the header', smf.tracks.length, smf.ntrks);
eq('smf: division', smf.division, 480);
eq('smf: every chunk length is exact', smf.trailing, 0);
eq('smf: track names', smf.trackNames, ['Sample Chorale', 'S+T', 'A+B']);
eq('smf: tempo events', smf.tempos, [Math.round(60000000 / 72)]);
eq('smf: time signature', smf.timeSignature, [4, 2]);
eq('smf: note-ons balance note-offs', smf.dangling, 0);
eq('smf: sounding notes', smf.noteOns, 104);
eq('smf: programs per track', smf.programs, [52, 52]);
eq('smf: channels used', smf.channels, [0, 1]);
eq(
  'smf: last note-off lands at bar 9',
  Math.round(smf.lastTick / 480),
  8 * 4, // eight 4/4 bars, in quarter notes
);

/* ================================================================== */
/* 5. Awkward inputs                                                  */
/* ================================================================== */

const closed = await run((m, fixtures) => {
  const score = m.musicxml.parseMusicXml(fixtures.CLOSED_SCORE);
  const roles = m.detect.detectRoles(score.streams);
  const assignment = m.detect.assignmentFor(score.streams, roles, 'ST_AB');
  const merged = m.merge.buildMergedScore(score, {
    assignment,
    octaves: { s1upper: 0, s1lower: 0, s2upper: 0, s2lower: 0 },
    clef1: 'auto',
    clef2: 'auto',
    lyrics: 'none',
    staffNames: null,
  });
  // Straight through, so the tie from bar 1 into bar 2 is actually reached.
  // (Played with the repeat, that tie is cut by the jump back, as it should be.)
  const straight = m.midi.renderMidi(score, merged.staves, ['a', 'b'], {
    ...m.midi.DEFAULT_MIDI_OPTIONS,
    expandRepeats: false,
    followOctaveShifts: false,
  });
  const withRepeat = m.midi.renderMidi(score, merged.staves, ['a', 'b'], {
    ...m.midi.DEFAULT_MIDI_OPTIONS,
    expandRepeats: true,
    followOctaveShifts: false,
  });
  const e5 = (r) => r.notes.filter((n) => n.midi === 76).sort((a, b) => a.time - b.time);
  return {
    voices: score.streams.length,
    roles: score.streams.map((s) => roles.get(s.key)),
    pickup: score.measures[0].implicit,
    pickupLength: score.measures[0].length,
    fullLength: score.measures[1].length,
    keyChange: score.measures[2].key,
    endings: score.measures.map((mm) => mm.endings.map((e) => `${e.type}${e.numbers.join('')}${e.location[0]}`)),
    order: m.repeats.playbackOrder(score.measures, true),
    tiedDurations: e5(straight).map((n) => Math.round(n.duration * 1000) / 1000),
    tiedWithRepeat: e5(withRepeat).map((n) => Math.round(n.duration * 1000) / 1000),
    xmlHasTie: merged.xml.includes('<tie type="start"/>'),
  };
}, { CLOSED_SCORE });

eq('closed score: four voices found', closed.voices, 4);
eq('closed score: roles by pitch', closed.roles, ['S', 'A', 'T', 'B']);
check('closed score: pickup flagged', closed.pickup === true, closed.pickup);
eq('closed score: pickup holds one beat, not four', [closed.pickupLength, closed.fullLength], [
  closed.fullLength / 4,
  closed.fullLength,
]);
eq('closed score: key change read', closed.keyChange, { fifths: -1, mode: undefined });
eq('closed score: voltas', closed.endings, [[], ['start1l', 'stop1r'], ['start2l', 'stop2r']]);
eq('closed score: playback order', closed.order, [0, 1, 0, 2]);
check('closed score: tie preserved in the XML', closed.xmlHasTie === true);
const beats = (n) => Math.round((n * 60 / 84) * 1000) / 1000;
eq('closed score: tie across the barline is joined', closed.tiedDurations, [beats(4)]);
eq('closed score: a repeat jump cuts the tie instead', closed.tiedWithRepeat, [beats(2), beats(2)]);

const chordal = await run((m, fixtures) => {
  const score = m.musicxml.parseMusicXml(fixtures.CHORDAL);
  const split = m.detect.splitChordalStreams(score);
  const roles = m.detect.detectRoles(split.streams);
  return {
    before: score.streams.length,
    offered: m.detect.shouldOfferChordSplit(score),
    after: split.streams.length,
    divisions: score.divisions,
    ranges: split.streams.map((s) => [s.minMidi, s.maxMidi]),
    roles: split.streams.map((s) => roles.get(s.key)),
  };
}, { CHORDAL });

eq('chordal: two voices before splitting', chordal.before, 2);
check('chordal: split offered', chordal.offered === true);
eq('chordal: four voices after splitting', chordal.after, 4);
eq('chordal: divisions reconciled to the LCM', chordal.divisions, 6);
eq('chordal: roles after splitting', chordal.roles, ['S', 'A', 'T', 'B']);
eq('chordal: ranges', chordal.ranges, [
  [74, 76], // D5-E5
  [65, 67], // F4-G4
  [59, 60], // B3-C4
  [43, 48], // G2-C3
]);

const dutch = await run((m, fixtures) => {
  const score = m.musicxml.parseMusicXml(fixtures.FOUR_PARTS_NL);
  const roles = m.detect.detectRoles(score.streams);
  return {
    roles: score.streams.map((s) => [s.partName, roles.get(s.key)]),
    barLength: score.measures[0].length,
    divisions: score.divisions,
    restsFilled: score.streams.map((s) => s.measures[0].length),
  };
}, { FOUR_PARTS_NL });

eq('dutch names: roles from the part names', dutch.roles, [
  ['Sopraan', 'S'],
  ['Alt', 'A'],
  ['Tenor', 'T'],
  ['Bas', 'B'],
]);
eq('dutch names: 3/4 bar length', dutch.barLength, dutch.divisions * 3);
eq('dutch names: rest kept between the notes', dutch.restsFilled, [3, 3, 3, 3]);

const unison = await run((m, fixtures) => {
  const score = m.musicxml.parseMusicXml(fixtures.UNISON);
  const roles = m.detect.detectRoles(score.streams);
  const assignment = m.detect.assignmentFor(score.streams, roles, 'ST_AB');
  // Put both voices on one staff, which is where a unison actually collides.
  const both = { ...assignment, s1upper: score.streams[0].key, s1lower: score.streams[1].key, s2upper: null, s2lower: null };
  const merged = m.merge.buildMergedScore(score, {
    assignment: both,
    octaves: m.merge.NO_OCTAVE_SHIFT,
    clef1: 'auto',
    clef2: 'auto',
    lyrics: 'none',
    staffNames: null,
  });
  const rendered = m.midi.renderMidi(score, merged.staves, ['one'], {
    ...m.midi.DEFAULT_MIDI_OPTIONS,
    expandRepeats: false,
  });
  return {
    notes: rendered.notes.map((n) => ({
      midi: n.midi,
      time: Math.round(n.time * 100) / 100,
      duration: Math.round(n.duration * 100) / 100,
    })),
    xmlPitches: (merged.xml.match(/<pitch>/g) || []).length,
  };
}, { UNISON });

// Three written notes become one sounding note: a whole note against two tied
// halves of the same pitch cannot be two things on one channel.
eq('unison: fused into a single sounding note', unison.notes.length, 1);
eq('unison: it lasts the full bar', unison.notes[0], {
  midi: 67,
  time: 0,
  duration: Math.round((4 * 60 / 84) * 100) / 100,
});
eq('unison: both voices are still written out', unison.xmlPitches, 3);

/* ================================================================== */
/* 6. Compressed .mxl containers                                      */
/* ================================================================== */

const mxl = await run(async (m) => {
  const { zipSync, strToU8 } = await import('/node_modules/.vite/deps/fflate.js').catch(() => import('fflate'));
  const container =
    '<?xml version="1.0" encoding="UTF-8"?><container><rootfiles>' +
    '<rootfile full-path="score.xml" media-type="application/vnd.recordare.musicxml+xml"/>' +
    '</rootfiles></container>';
  const zipped = zipSync({
    'META-INF/container.xml': strToU8(container),
    'score.xml': strToU8(m.sample.SAMPLE_CHORALE),
  });
  const file = new File([zipped], 'chorale.mxl');
  const loaded = await m.mxl.readScoreFile(file);
  const score = m.musicxml.parseMusicXml(loaded.xml);
  return { name: loaded.name, base: m.mxl.baseName(loaded.name), measures: score.measures.length };
});

eq('mxl: unzipped and parsed', mxl.measures, 8);
eq('mxl: base name', mxl.base, 'chorale');

/* ================================================================== */
/* 7. Page geometry and Verovio                                       */
/* ================================================================== */

const geo = await run(async (m) => {
  const a4 = m.paper.geometryFor({ ...m.paper.DEFAULT_LAYOUT, paper: 'A4' });
  const a5 = m.paper.geometryFor({ ...m.paper.DEFAULT_LAYOUT, paper: 'A5' });
  const land = m.paper.geometryFor({ ...m.paper.DEFAULT_LAYOUT, paper: 'A4', orientation: 'landscape' });
  const opts50 = m.paper.verovioOptions({ ...m.paper.DEFAULT_LAYOUT, scale: 50 }, a4);
  const opts200 = m.paper.verovioOptions({ ...m.paper.DEFAULT_LAYOUT, scale: 200 }, a4);

  const score = m.musicxml.parseMusicXml(m.sample.SAMPLE_CHORALE);
  const roles = m.detect.detectRoles(score.streams);
  const merged = m.merge.buildMergedScore(score, {
    assignment: m.detect.assignmentFor(score.streams, roles, 'ST_AB'),
    octaves: { s1upper: 0, s1lower: 0, s2upper: 0, s2lower: 0 },
    clef1: 'auto',
    clef2: 'auto',
    lyrics: 'top',
    staffNames: ['S + T', 'A + B'],
  });

  const viewBox = async (layout) => {
    const g = m.paper.geometryFor(layout);
    const out = await m.verovio.engrave(merged.xml, m.paper.verovioOptions(layout, g));
    return {
      pages: out.pages.length,
      viewBox: /viewBox="([^"]+)"/.exec(out.pages[0])?.[1],
      expected: `0 0 ${Math.round(g.contentWidth * 100) / 100} ${Math.round(g.contentHeight * 100) / 100}`,
    };
  };

  return {
    a4: [a4.pageWidth, a4.pageHeight, a4.contentWidth, a4.contentHeight],
    a5: [a5.pageWidth, a5.pageHeight],
    landscape: [land.pageWidth, land.pageHeight],
    scale50: [opts50.scale, opts50.pageWidth, opts50.pageHeight],
    scale200: [opts200.scale, opts200.pageWidth, opts200.pageHeight],
    renderA4: await viewBox({ ...m.paper.DEFAULT_LAYOUT, paper: 'A4' }),
    renderA5: await viewBox({ ...m.paper.DEFAULT_LAYOUT, paper: 'A5' }),
    renderA5Big: await viewBox({ ...m.paper.DEFAULT_LAYOUT, paper: 'A5', scale: 160 }),
  };
});

eq('paper: A4 geometry', geo.a4, [210, 297, 186, 267]);
eq('paper: A5 geometry', geo.a5, [148, 210]);
eq('paper: landscape swaps the sides', geo.landscape, [297, 210]);
// Halving the music size doubles the page measured in music units, so the
// sheet stays the same physical size while twice as much music fits on it.
eq('paper: scale 50 doubles the music-unit page', geo.scale50, [50, 3720, 5340]);
eq('paper: scale 200 halves it', geo.scale200, [200, 930, 1335]);
check('render: A4 SVG is the content box in mm', geo.renderA4.viewBox === geo.renderA4.expected, geo.renderA4);
check('render: A5 SVG is the content box in mm', geo.renderA5.viewBox === geo.renderA5.expected, geo.renderA5);
check('render: A4 fits on one page', geo.renderA4.pages === 1, geo.renderA4);
check('render: bigger music on A5 needs more pages', geo.renderA5Big.pages > geo.renderA5.pages, {
  a5: geo.renderA5.pages,
  a5Big: geo.renderA5Big.pages,
});

/* ================================================================== */

check('no uncaught page errors', pageErrors.length === 0, pageErrors);

await browser.close();

console.log(`\n${passed} passed, ${failures.length} failed`);
for (const f of failures) console.log(`  FAIL  ${f}`);
process.exit(failures.length ? 1 : 0);
