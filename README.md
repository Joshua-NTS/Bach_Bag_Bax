# Bach Bag Bax

Drop a four-voice MusicXML file on the page. Get back a printable two-staff
score and a two-track MIDI file.

The four singers are matched to soprano, alto, tenor and bass, then written
onto two staves — **soprano with tenor, alto with bass** by default, which is
what this was built for. Everything runs in the browser: no upload, no server,
no account.

```
npm install
npm run dev        # http://localhost:5173
```

## What it does

**Reads the file.** `.musicxml`, `.xml` and compressed `.mxl` all work. It
copes with the shapes real notation software produces: four separate parts, one
part with two staves and four voices (closed score), a differing `<divisions>`
per part, pickup bars, key and time changes, ties across barlines, repeats and
first/second endings, fermatas, lyrics and tempo marks. Hymnal files that write
two singers as one chordal voice are split back into four lines.

**Finds the voices.** Part names are matched in English, Dutch, German, French,
Italian and Latin; anything unlabelled falls back to pitch order. The four
slots — staff 1 upper and lower, staff 2 upper and lower — are then yours to
change, and three pairings are one click away:

| Pairing | |
| --- | --- |
| `S+T / A+B` | the default: soprano over tenor, alto over bass |
| `S+A / T+B` | classic closed score |
| `S+B / A+T` | outer voices above, inner voices below |

**Fits them onto a staff.** Soprano paired with tenor spans two octaves, which
at written pitch means a thicket of ledger lines. When a staff has to cover
more than about thirteen diatonic steps, one of its voices is written an octave
away so both sit on the staff. The sidebar says exactly what was moved, every
voice has its own octave control, and **Original octaves** puts everything back
to written pitch. The clef for each staff is chosen to need the fewest ledger
lines, favouring the treble and bass a choir actually reads, and can be
overridden.

**Prints properly.** The preview is the printed page: A3, A4, A5, A6, B4, B5,
Letter, Legal, Tabloid or a custom size in millimetres, portrait or landscape,
with margins you set per side. Printing goes to the real paper size — no
scaling, no browser margins on top of yours. "Save as PDF" in the print dialog
gives you a PDF at exactly those dimensions.

**Lets you set the look.** Music size (the "font size" of the score), the gap
between the two staves, the gap between systems, how tightly notes are packed
horizontally, lyric size, staff line thickness, five music fonts, line-break
strategy, vertical justification, title block and page numbers.

**Plays it back.** A small built-in synth, one timbre per staff, with the
current bar highlighted and the page scrolling to follow. Either staff can be
muted to hear the other on its own.

**Exports.** A two-track MIDI file (one track per staff, plus a tempo track),
either staff on its own, or the merged two-staff MusicXML to take into a
notation program. Repeats can be played out or left folded; the General MIDI
sound, tempo and note length are adjustable.

## How the printing works

Verovio is handed the *content box* — the paper minus your margins — measured
in millimetres, and the margins themselves are done in CSS. So the printed
margin is exactly the number you typed, and it is not capped by Verovio's own
limits.

Verovio's `scale` shrinks the whole page rather than just the notes, so to make
it behave like a font size the page it is given is measured in music units:
`100 / scale` times the physical size. The SVG then always comes out at the
true paper size while more or less music fits inside it. `src/core/paper.ts`
has the arithmetic.

## Layout

```
src/
  core/
    types.ts       shared model: pitches, events, voice streams, measures
    mxl.ts         reads .mxl containers and plain XML
    musicxml.ts    MusicXML -> voice streams + measure info
    detect.ts      names the voices, splits chordal ones, fills the four slots
    clef.ts        clef choice, ledger-line cost, octave-fit suggestions
    merge.ts       four voices -> a two-staff MusicXML score
    midi.ts        the score -> a Standard MIDI File and a playback timeline
    repeats.ts     the order the bars are actually played in
    paper.ts       paper sizes, margins and the Verovio option mapping
    audio.ts       WebAudio playback
  render/verovio.ts  lazy WASM engraver, serialised and layout-cached
  components/      the interface
```

## Borrowed

- [**Verovio**](https://www.verovio.org) (LGPL) engraves the score. Its WASM
  build imports MusicXML and renders SVG pages, and it is the reason the paper
  sizes and spacing controls are exact rather than approximate. It is loaded
  lazily, so the page paints before the 7 MB module arrives.
- [**fflate**](https://github.com/101arrowz/fflate) (MIT) unzips `.mxl`.
- **React** and **Vite** for the shell.

The MusicXML reader, the two-staff writer, the MIDI writer and the playback
synth are written here — small enough to keep, and it means the merged score
and the MIDI agree note for note.

## Tests

```
npm test
```

Both suites drive a real Chromium, because the pipeline needs `DOMParser` and
the Verovio WASM build.

- `test/pipeline.test.mjs` runs the conversion modules directly: every pitch
  survives the merge in order, every bar of every voice adds up, ties join
  across barlines (and are cut by a repeat jump, as they should be), repeats
  expand to the right bar order, pickup bars hold only what is written in them,
  awkward files parse, and the generated MIDI is read back byte by byte and
  checked for balanced note-ons, tempo, meter and channels.
- `test/ui.test.mjs` drives the interface: paper sizes and margins measured in
  millimetres on screen, printing checked against the `/MediaBox` of a real
  PDF, the spacing sliders, downloads, playback and the theme.
- `test/external.test.mjs` is opt-in and points at a folder of your own
  scores, since other people's music does not belong in this repository:

  ```
  npm run dev
  EXTERNAL_SCORES=~/scores node test/external.test.mjs
  ```

  Each file is parsed, merged, engraved and turned into MIDI, and the result is
  checked for the things that go wrong quietly — bars whose voices disagree on
  length, notes lost in the merge, notes with a nonsensical time.

## Deploying

`.github/workflows/deploy.yml` publishes `dist/` to GitHub Pages on every push
to `main` (enable Pages → "GitHub Actions" in the repository settings). The
build uses relative asset paths, so the same `dist/` also works from any static
host or a local folder.

## Known limits

- Dynamics are dropped on merge: they belong to one singer, and the merged
  staff carries two.
- `D.C.`, `D.S.`, segno and coda jumps are played straight through; ordinary
  repeats and first/second endings are followed.
- Grace notes are engraved but not sounded.
- Playback is a plain oscillator synth, not a sampled choir. For a real sound,
  open the exported MIDI in something with a soundfont.
