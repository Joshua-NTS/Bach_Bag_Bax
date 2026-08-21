/** Awkward-but-legal MusicXML shapes that real exporters actually produce. */

/**
 * Closed score: one part, two staves, four voices, a pickup bar, a key change,
 * a tie across a barline and a first/second ending.
 */
export const CLOSED_SCORE = `<?xml version="1.0" encoding="UTF-8"?>
<score-partwise version="3.1">
  <work><work-title>Closed Score</work-title></work>
  <identification><creator type="composer">Anon.</creator></identification>
  <part-list>
    <score-part id="P1"><part-name>Choir</part-name></score-part>
  </part-list>
  <part id="P1">
    <measure number="0" implicit="yes">
      <attributes>
        <divisions>24</divisions>
        <key><fifths>1</fifths></key>
        <time><beats>4</beats><beat-type>4</beat-type></time>
        <staves>2</staves>
        <clef number="1"><sign>G</sign><line>2</line></clef>
        <clef number="2"><sign>F</sign><line>4</line></clef>
      </attributes>
      <note><pitch><step>D</step><octave>5</octave></pitch><duration>24</duration><voice>1</voice><type>quarter</type><staff>1</staff></note>
      <backup><duration>24</duration></backup>
      <note><pitch><step>A</step><octave>4</octave></pitch><duration>24</duration><voice>2</voice><type>quarter</type><staff>1</staff></note>
      <backup><duration>24</duration></backup>
      <note><pitch><step>F</step><alter>1</alter><octave>4</octave></pitch><duration>24</duration><voice>5</voice><type>quarter</type><staff>2</staff></note>
      <backup><duration>24</duration></backup>
      <note><pitch><step>D</step><octave>3</octave></pitch><duration>24</duration><voice>6</voice><type>quarter</type><staff>2</staff></note>
      <barline location="right"><repeat direction="forward"/></barline>
    </measure>
    <measure number="1">
      <note><pitch><step>D</step><octave>5</octave></pitch><duration>48</duration><voice>1</voice><type>half</type><staff>1</staff></note>
      <note><pitch><step>E</step><octave>5</octave></pitch><duration>48</duration><voice>1</voice><type>half</type><staff>1</staff><tie type="start"/><notations><tied type="start"/></notations></note>
      <backup><duration>96</duration></backup>
      <note><pitch><step>A</step><octave>4</octave></pitch><duration>96</duration><voice>2</voice><type>whole</type><staff>1</staff></note>
      <backup><duration>96</duration></backup>
      <note><pitch><step>C</step><alter>1</alter><octave>5</octave></pitch><duration>96</duration><voice>5</voice><type>whole</type><staff>2</staff></note>
      <backup><duration>96</duration></backup>
      <note><pitch><step>A</step><octave>2</octave></pitch><duration>96</duration><voice>6</voice><type>whole</type><staff>2</staff></note>
      <barline location="left"><ending number="1" type="start"/></barline>
      <barline location="right"><ending number="1" type="stop"/><repeat direction="backward"/></barline>
    </measure>
    <measure number="2">
      <attributes><key><fifths>-1</fifths></key></attributes>
      <note><pitch><step>E</step><octave>5</octave></pitch><duration>48</duration><voice>1</voice><type>half</type><staff>1</staff><tie type="stop"/><notations><tied type="stop"/></notations></note>
      <note><rest/><duration>48</duration><voice>1</voice><type>half</type><staff>1</staff></note>
      <backup><duration>96</duration></backup>
      <note><pitch><step>B</step><alter>-1</alter><octave>4</octave></pitch><duration>96</duration><voice>2</voice><type>whole</type><staff>1</staff></note>
      <backup><duration>96</duration></backup>
      <note><pitch><step>G</step><octave>4</octave></pitch><duration>96</duration><voice>5</voice><type>whole</type><staff>2</staff></note>
      <backup><duration>96</duration></backup>
      <note><pitch><step>G</step><octave>2</octave></pitch><duration>96</duration><voice>6</voice><type>whole</type><staff>2</staff></note>
      <barline location="left"><ending number="2" type="start"/></barline>
      <barline location="right"><bar-style>light-heavy</bar-style><ending number="2" type="stop"/></barline>
    </measure>
  </part>
</score-partwise>`;

/**
 * Hymnal layout: two parts, each a single voice carrying two singers as chords.
 * Also uses a different <divisions> per part, which has to be reconciled.
 */
export const CHORDAL = `<?xml version="1.0" encoding="UTF-8"?>
<score-partwise version="4.0">
  <part-list>
    <score-part id="P1"><part-name>Women</part-name></score-part>
    <score-part id="P2"><part-name>Men</part-name></score-part>
  </part-list>
  <part id="P1">
    <measure number="1">
      <attributes><divisions>2</divisions><key><fifths>0</fifths></key>
        <time><beats>2</beats><beat-type>4</beat-type></time>
        <clef><sign>G</sign><line>2</line></clef></attributes>
      <note><pitch><step>E</step><octave>5</octave></pitch><duration>2</duration><voice>1</voice><type>quarter</type></note>
      <note><chord/><pitch><step>G</step><octave>4</octave></pitch><duration>2</duration><voice>1</voice><type>quarter</type></note>
      <note><pitch><step>D</step><octave>5</octave></pitch><duration>2</duration><voice>1</voice><type>quarter</type></note>
      <note><chord/><pitch><step>F</step><octave>4</octave></pitch><duration>2</duration><voice>1</voice><type>quarter</type></note>
    </measure>
  </part>
  <part id="P2">
    <measure number="1">
      <attributes><divisions>6</divisions><key><fifths>0</fifths></key>
        <time><beats>2</beats><beat-type>4</beat-type></time>
        <clef><sign>F</sign><line>4</line></clef></attributes>
      <note><pitch><step>C</step><octave>4</octave></pitch><duration>6</duration><voice>1</voice><type>quarter</type></note>
      <note><chord/><pitch><step>C</step><octave>3</octave></pitch><duration>6</duration><voice>1</voice><type>quarter</type></note>
      <note><pitch><step>B</step><octave>3</octave></pitch><duration>6</duration><voice>1</voice><type>quarter</type></note>
      <note><chord/><pitch><step>G</step><octave>2</octave></pitch><duration>6</duration><voice>1</voice><type>quarter</type></note>
    </measure>
  </part>
</score-partwise>`;

/** Four separate parts, Dutch names, tenor written in an octave-treble clef. */
export const FOUR_PARTS_NL = `<?xml version="1.0" encoding="UTF-8"?>
<score-partwise version="4.0">
  <part-list>
    <score-part id="P1"><part-name>Sopraan</part-name></score-part>
    <score-part id="P2"><part-name>Alt</part-name></score-part>
    <score-part id="P3"><part-name>Tenor</part-name></score-part>
    <score-part id="P4"><part-name>Bas</part-name></score-part>
  </part-list>
  ${['C5', 'E4', 'G3', 'C3']
    .map(
      (p, i) => `<part id="P${i + 1}">
    <measure number="1">
      <attributes><divisions>4</divisions><key><fifths>0</fifths></key>
        <time><beats>3</beats><beat-type>4</beat-type></time>
        <clef><sign>${i === 3 ? 'F' : 'G'}</sign><line>${i === 3 ? 4 : 2}</line>${
          i === 2 ? '<clef-octave-change>-1</clef-octave-change>' : ''
        }</clef></attributes>
      <note><pitch><step>${p[0]}</step><octave>${p[1]}</octave></pitch><duration>4</duration><voice>1</voice><type>quarter</type></note>
      <note><rest/><duration>4</duration><voice>1</voice><type>quarter</type></note>
      <note><pitch><step>${p[0]}</step><octave>${p[1]}</octave></pitch><duration>4</duration><voice>1</voice><type>quarter</type><notations><fermata/></notations></note>
    </measure>
  </part>`,
    )
    .join('\n  ')}
</score-partwise>`;


/**
 * Two voices on one staff that meet in unison, and one that holds while the
 * other re-attacks the same note.
 */
export const UNISON = `<?xml version="1.0" encoding="UTF-8"?>
<score-partwise version="4.0">
  <part-list>
    <score-part id="P1"><part-name>Upper</part-name></score-part>
    <score-part id="P2"><part-name>Lower</part-name></score-part>
  </part-list>
  <part id="P1">
    <measure number="1">
      <attributes><divisions>2</divisions><key><fifths>0</fifths></key>
        <time><beats>4</beats><beat-type>4</beat-type></time>
        <clef><sign>G</sign><line>2</line></clef></attributes>
      <note><pitch><step>G</step><octave>4</octave></pitch><duration>8</duration><voice>1</voice><type>whole</type></note>
    </measure>
  </part>
  <part id="P2">
    <measure number="1">
      <attributes><divisions>2</divisions><key><fifths>0</fifths></key>
        <time><beats>4</beats><beat-type>4</beat-type></time>
        <clef><sign>G</sign><line>2</line></clef></attributes>
      <note><pitch><step>G</step><octave>4</octave></pitch><duration>4</duration><voice>1</voice><type>half</type></note>
      <note><pitch><step>G</step><octave>4</octave></pitch><duration>4</duration><voice>1</voice><type>half</type></note>
    </measure>
  </part>
</score-partwise>`;

/* ------------------------------------------------------------------ */
/* A tiny Standard MIDI File writer, so the importer can be tested     */
/* against input whose every note is known.                            */
/* ------------------------------------------------------------------ */

function varlen(value) {
  const bytes = [value & 0x7f];
  let v = value >> 7;
  while (v > 0) {
    bytes.unshift((v & 0x7f) | 0x80);
    v >>= 7;
  }
  return bytes;
}

const ascii = (s) => [...s].map((c) => c.charCodeAt(0));

function chunk(id, data) {
  const n = data.length;
  return [...ascii(id), (n >>> 24) & 255, (n >>> 16) & 255, (n >>> 8) & 255, n & 255, ...data];
}

function serialise(events) {
  const sorted = events.slice().sort((a, b) => a.tick - b.tick || a.order - b.order);
  const out = [];
  let last = 0;
  for (const e of sorted) {
    out.push(...varlen(e.tick - last), ...e.data);
    last = e.tick;
  }
  return [...out, ...varlen(0), 0xff, 0x2f, 0x00];
}

/**
 * tracks: [{ name, channel, notes: [{ midi, start, dur }] }]  — ticks.
 */
export function makeMidiFile({ ppq = 480, tempo = 100, timeSig = [4, 4], keySig, tracks }) {
  const conductor = [
    { tick: 0, order: 0, data: [0xff, 0x03, ...varlen(4), ...ascii('Song')] },
    {
      tick: 0,
      order: 1,
      data: (() => {
        const us = Math.round(60_000_000 / tempo);
        return [0xff, 0x51, 0x03, (us >> 16) & 255, (us >> 8) & 255, us & 255];
      })(),
    },
    {
      tick: 0,
      order: 2,
      data: [0xff, 0x58, 0x04, timeSig[0], Math.round(Math.log2(timeSig[1])), 24, 8],
    },
  ];
  if (keySig !== undefined) {
    conductor.push({ tick: 0, order: 3, data: [0xff, 0x59, 0x02, keySig & 0xff, 0] });
  }

  const chunks = [chunk('MTrk', serialise(conductor))];
  for (const track of tracks) {
    const channel = track.channel ?? 0;
    const events = [];
    if (track.name) {
      const bytes = ascii(track.name);
      events.push({ tick: 0, order: 0, data: [0xff, 0x03, ...varlen(bytes.length), ...bytes] });
    }
    for (const note of track.notes) {
      events.push({ tick: note.start, order: 2, data: [0x90 | channel, note.midi, note.velocity ?? 80] });
      events.push({ tick: note.start + note.dur, order: 1, data: [0x80 | channel, note.midi, 0x40] });
    }
    chunks.push(chunk('MTrk', serialise(events)));
  }

  const header = chunk('MThd', [
    0x00, 0x01,
    (chunks.length >> 8) & 255, chunks.length & 255,
    (ppq >> 8) & 255, ppq & 255,
  ]);
  return Uint8Array.from([...header, ...chunks.flat()]);
}

/**
 * The sample chorale again, this time as a four-track MIDI file. Importing it
 * must land on the same notes as importing the MusicXML, which is what makes
 * the two readers checkable against each other.
 */
export const MIDI_SATB = makeMidiFile({
  ppq: 480,
  tempo: 72,
  timeSig: [4, 4],
  tracks: [
    { name: 'Soprano', channel: 0, notes: [{ midi: 72, start: 0, dur: 480 }, { midi: 72, start: 480, dur: 480 }, { midi: 74, start: 960, dur: 480 }, { midi: 76, start: 1440, dur: 480 }, { midi: 76, start: 1920, dur: 480 }, { midi: 74, start: 2400, dur: 480 }, { midi: 72, start: 2880, dur: 960 }, { midi: 77, start: 3840, dur: 480 }, { midi: 76, start: 4320, dur: 480 }, { midi: 74, start: 4800, dur: 480 }, { midi: 72, start: 5280, dur: 480 }, { midi: 71, start: 5760, dur: 480 }, { midi: 71, start: 6240, dur: 480 }, { midi: 72, start: 6720, dur: 960 }, { midi: 76, start: 7680, dur: 480 }, { midi: 76, start: 8160, dur: 480 }, { midi: 77, start: 8640, dur: 480 }, { midi: 79, start: 9120, dur: 480 }, { midi: 79, start: 9600, dur: 480 }, { midi: 77, start: 10080, dur: 480 }, { midi: 76, start: 10560, dur: 960 }, { midi: 77, start: 11520, dur: 480 }, { midi: 76, start: 12000, dur: 480 }, { midi: 74, start: 12480, dur: 480 }, { midi: 74, start: 12960, dur: 480 }, { midi: 72, start: 13440, dur: 1920 }] },
    { name: 'Alto', channel: 1, notes: [{ midi: 67, start: 0, dur: 480 }, { midi: 67, start: 480, dur: 480 }, { midi: 71, start: 960, dur: 480 }, { midi: 67, start: 1440, dur: 480 }, { midi: 67, start: 1920, dur: 480 }, { midi: 71, start: 2400, dur: 480 }, { midi: 64, start: 2880, dur: 960 }, { midi: 69, start: 3840, dur: 480 }, { midi: 67, start: 4320, dur: 480 }, { midi: 71, start: 4800, dur: 480 }, { midi: 64, start: 5280, dur: 480 }, { midi: 67, start: 5760, dur: 480 }, { midi: 67, start: 6240, dur: 480 }, { midi: 64, start: 6720, dur: 960 }, { midi: 67, start: 7680, dur: 480 }, { midi: 67, start: 8160, dur: 480 }, { midi: 69, start: 8640, dur: 480 }, { midi: 64, start: 9120, dur: 480 }, { midi: 64, start: 9600, dur: 480 }, { midi: 71, start: 10080, dur: 480 }, { midi: 67, start: 10560, dur: 960 }, { midi: 69, start: 11520, dur: 480 }, { midi: 67, start: 12000, dur: 480 }, { midi: 71, start: 12480, dur: 480 }, { midi: 71, start: 12960, dur: 480 }, { midi: 64, start: 13440, dur: 1920 }] },
    { name: 'Tenor', channel: 2, notes: [{ midi: 64, start: 0, dur: 480 }, { midi: 64, start: 480, dur: 480 }, { midi: 55, start: 960, dur: 480 }, { midi: 60, start: 1440, dur: 480 }, { midi: 60, start: 1920, dur: 480 }, { midi: 55, start: 2400, dur: 480 }, { midi: 55, start: 2880, dur: 960 }, { midi: 60, start: 3840, dur: 480 }, { midi: 60, start: 4320, dur: 480 }, { midi: 62, start: 4800, dur: 480 }, { midi: 55, start: 5280, dur: 480 }, { midi: 62, start: 5760, dur: 480 }, { midi: 62, start: 6240, dur: 480 }, { midi: 55, start: 6720, dur: 960 }, { midi: 60, start: 7680, dur: 480 }, { midi: 60, start: 8160, dur: 480 }, { midi: 60, start: 8640, dur: 480 }, { midi: 60, start: 9120, dur: 480 }, { midi: 60, start: 9600, dur: 480 }, { midi: 62, start: 10080, dur: 480 }, { midi: 60, start: 10560, dur: 960 }, { midi: 60, start: 11520, dur: 480 }, { midi: 60, start: 12000, dur: 480 }, { midi: 55, start: 12480, dur: 480 }, { midi: 55, start: 12960, dur: 480 }, { midi: 55, start: 13440, dur: 1920 }] },
    { name: 'Bass', channel: 3, notes: [{ midi: 48, start: 0, dur: 480 }, { midi: 48, start: 480, dur: 480 }, { midi: 43, start: 960, dur: 480 }, { midi: 48, start: 1440, dur: 480 }, { midi: 48, start: 1920, dur: 480 }, { midi: 43, start: 2400, dur: 480 }, { midi: 48, start: 2880, dur: 960 }, { midi: 53, start: 3840, dur: 480 }, { midi: 48, start: 4320, dur: 480 }, { midi: 55, start: 4800, dur: 480 }, { midi: 48, start: 5280, dur: 480 }, { midi: 55, start: 5760, dur: 480 }, { midi: 55, start: 6240, dur: 480 }, { midi: 48, start: 6720, dur: 960 }, { midi: 48, start: 7680, dur: 480 }, { midi: 48, start: 8160, dur: 480 }, { midi: 53, start: 8640, dur: 480 }, { midi: 48, start: 9120, dur: 480 }, { midi: 48, start: 9600, dur: 480 }, { midi: 55, start: 10080, dur: 480 }, { midi: 48, start: 10560, dur: 960 }, { midi: 53, start: 11520, dur: 480 }, { midi: 48, start: 12000, dur: 480 }, { midi: 55, start: 12480, dur: 480 }, { midi: 55, start: 12960, dur: 480 }, { midi: 48, start: 13440, dur: 1920 }] },
  ],
});

/** Two bars where the middle note runs straight through the barline. */
export const MIDI_TIE = makeMidiFile({
  ppq: 480,
  tempo: 96,
  tracks: [
    { name: 'Upper', channel: 0, notes: [
      { midi: 72, start: 0, dur: 960 }, { midi: 74, start: 960, dur: 960 }, { midi: 76, start: 1920, dur: 1920 },
    ] },
    { name: 'Lower', channel: 1, notes: [
      { midi: 64, start: 0, dur: 960 }, { midi: 64, start: 960, dur: 1920 },
    ] },
  ],
});

/** One track holding the whole chord, plus a drum channel that must be skipped. */
export const MIDI_CHORDAL = makeMidiFile({
  ppq: 480,
  tempo: 100,
  tracks: [
    { name: 'Piano', channel: 0, notes: [
      ...[72, 67, 64, 48].map((midi) => ({ midi, start: 0, dur: 1920 })),
      ...[76, 67, 60, 48].map((midi) => ({ midi, start: 1920, dur: 1920 })),
    ] },
    { name: 'Drums', channel: 9, notes: [{ midi: 36, start: 0, dur: 240 }] },
  ],
});

/** G major, so F sharp has to be spelled as F# and not G flat. */
export const MIDI_GMAJOR = makeMidiFile({
  ppq: 480,
  tracks: [
    { name: 'Tune', channel: 0, notes: [
      { midi: 67, start: 0, dur: 480 }, { midi: 69, start: 480, dur: 480 },
      { midi: 71, start: 960, dur: 480 }, { midi: 66, start: 1440, dur: 480 },
    ] },
  ],
});

/** Deliberately sloppy timing, to exercise quantisation. */
export const MIDI_SLOPPY = makeMidiFile({
  ppq: 480,
  tracks: [
    { name: 'Loose', channel: 0, notes: [
      { midi: 60, start: 7, dur: 470 }, { midi: 62, start: 486, dur: 462 },
      { midi: 64, start: 953, dur: 495 }, { midi: 65, start: 1437, dur: 470 },
    ] },
  ],
});
