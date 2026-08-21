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
