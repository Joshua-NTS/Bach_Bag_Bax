/**
 * Runs the pipeline over MusicXML files exported by other programs.
 *
 * These are not committed (they are other people's scores), so point the test
 * at a folder of your own:
 *
 *   npm run dev
 *   EXTERNAL_SCORES=~/scores node test/external.test.mjs
 *
 * Anything that parses is merged, engraved and turned into MIDI, and the
 * results are checked for the things that silently go wrong: bars that do not
 * add up, notes that vanish, stuck MIDI notes.
 */
import { chromium } from 'playwright';
import { readdirSync, readFileSync } from 'node:fs';
import { join, extname } from 'node:path';

const DIR = process.env.EXTERNAL_SCORES;
if (!DIR) {
  console.log('EXTERNAL_SCORES is not set — skipping.');
  process.exit(0);
}

const BASE = process.env.BASE || 'http://localhost:5173';
const CHROME = process.env.CHROME || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';

const files = readdirSync(DIR).filter((f) => ['.xml', '.musicxml', '.mxl'].includes(extname(f).toLowerCase()));
if (files.length === 0) {
  console.log(`No MusicXML files in ${DIR} — skipping.`);
  process.exit(0);
}

const browser = await chromium.launch({ executablePath: CHROME });
const page = await browser.newPage();
const pageErrors = [];
page.on('pageerror', (e) => pageErrors.push(e.message));
await page.goto(BASE, { waitUntil: 'domcontentloaded' });

let failed = 0;

for (const name of files) {
  const bytes = Array.from(readFileSync(join(DIR, name)));
  const report = await page.evaluate(
    async ({ bytes, name }) => {
      const mods = {
        musicxml: await import('/src/core/musicxml.ts'),
        merge: await import('/src/core/merge.ts'),
        midi: await import('/src/core/midi.ts'),
        detect: await import('/src/core/detect.ts'),
        paper: await import('/src/core/paper.ts'),
        mxl: await import('/src/core/mxl.ts'),
        verovio: await import('/src/render/verovio.ts'),
      };
      try {
        const started = performance.now();
        const file = new File([Uint8Array.from(bytes)], name);
        const { xml } = await mods.mxl.readScoreFile(file);
        const parsed = mods.musicxml.parseMusicXml(xml);
        const score = mods.detect.shouldOfferChordSplit(parsed)
          ? mods.detect.splitChordalStreams(parsed)
          : parsed;
        const roles = mods.detect.detectRoles(score.streams);
        const assignment = mods.detect.assignmentFor(score.streams, roles, 'ST_AB');
        const octaves = mods.merge.needsOctaveFitting(score, assignment)
          ? mods.merge.autoFitOctaves(score, assignment)
          : mods.merge.NO_OCTAVE_SHIFT;
        const merged = mods.merge.buildMergedScore(score, {
          assignment,
          octaves,
          clef1: 'auto',
          clef2: 'auto',
          lyrics: 'top',
          staffNames: ['1', '2'],
        });

        // Every voice must fill every bar it appears in.
        const doc = new DOMParser().parseFromString(merged.xml, 'application/xml');
        if (doc.getElementsByTagName('parsererror')[0]) throw new Error('merged output is not valid XML');
        let ragged = 0;
        for (const part of Array.from(doc.getElementsByTagName('part'))) {
          for (const measure of Array.from(part.getElementsByTagName('measure'))) {
            const totals = new Map();
            for (const note of Array.from(measure.getElementsByTagName('note'))) {
              if (note.getElementsByTagName('chord')[0] || note.getElementsByTagName('grace')[0]) continue;
              const v = note.getElementsByTagName('voice')[0]?.textContent ?? '1';
              const d = Number(note.getElementsByTagName('duration')[0]?.textContent ?? 0);
              totals.set(v, (totals.get(v) ?? 0) + d);
            }
            const lengths = [...totals.values()];
            if (lengths.length > 1 && new Set(lengths).size > 1) ragged++;
          }
        }

        // Notes must survive the merge.
        const chosen = [assignment.s1upper, assignment.s1lower, assignment.s2upper, assignment.s2lower]
          .filter(Boolean)
          .map((key) => score.streams.find((s) => s.key === key).noteCount)
          .reduce((a, b) => a + b, 0);
        const written = Array.from(doc.getElementsByTagName('pitch')).length;

        const rendered = mods.midi.renderMidi(score, merged.staves, ['1', '2'], {
          ...mods.midi.DEFAULT_MIDI_OPTIONS,
        });
        const engraved = await mods.verovio.engrave(
          merged.xml,
          mods.paper.verovioOptions(mods.paper.DEFAULT_LAYOUT, mods.paper.geometryFor(mods.paper.DEFAULT_LAYOUT)),
        );

        return {
          ok: true,
          ms: Math.round(performance.now() - started),
          parts: parsed.streams.length,
          measures: parsed.measures.length,
          divisions: parsed.divisions,
          clefs: merged.clefs.map((c) => c.id),
          ragged,
          chosen,
          written,
          midiNotes: rendered.notes.length,
          seconds: Math.round(rendered.duration),
          pages: engraved.pages.length,
          verovioWarnings: engraved.warnings.length,
          badTimes: rendered.notes.filter((n) => !Number.isFinite(n.time) || n.duration <= 0).length,
        };
      } catch (error) {
        return { ok: false, error: String(error?.message ?? error) };
      }
    },
    { bytes, name },
  );

  if (!report.ok) {
    failed++;
    console.log(`FAIL  ${name}\n      ${report.error}`);
    continue;
  }

  const problems = [];
  if (report.ragged > 0) problems.push(`${report.ragged} bars where the voices disagree on length`);
  if (report.written < report.chosen) problems.push(`lost notes: ${report.chosen} in, ${report.written} out`);
  if (report.badTimes > 0) problems.push(`${report.badTimes} notes with a bad time`);
  if (report.pages === 0) problems.push('nothing engraved');

  if (problems.length) {
    failed++;
    console.log(`FAIL  ${name}\n      ${problems.join('\n      ')}`);
  } else {
    console.log(
      `ok    ${name}\n      ${report.parts} voices, ${report.measures} bars, div ${report.divisions}, ` +
        `clefs ${report.clefs.join('/')}, ${report.written} notes, ${report.midiNotes} midi notes, ` +
        `${report.seconds}s, ${report.pages} pages, ${report.ms} ms` +
        (report.verovioWarnings ? `, ${report.verovioWarnings} engraver warnings` : ''),
    );
  }
}

if (pageErrors.length) {
  failed++;
  console.log(`FAIL  uncaught page errors: ${pageErrors.join(' | ')}`);
}

await browser.close();
console.log(`\n${files.length - failed}/${files.length} files handled`);
process.exit(failed ? 1 : 0);
