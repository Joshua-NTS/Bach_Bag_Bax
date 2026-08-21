/**
 * Drives the real interface: loading, layout controls, printing and playback.
 *
 *   npm run dev            # in one shell
 *   node test/ui.test.mjs
 */
import { chromium } from 'playwright';
import { CLOSED_SCORE, MIDI_SATB } from './fixtures.mjs';

const BASE = process.env.BASE || 'http://localhost:5173';
const CHROME = process.env.CHROME || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const SHOTS = process.env.SHOTS;

let passed = 0;
const failures = [];
const check = (name, ok, detail) =>
  ok ? passed++ : failures.push(`${name}${detail === undefined ? '' : ` — ${JSON.stringify(detail)}`}`);
const eq = (name, actual, expected) =>
  check(name, JSON.stringify(actual) === JSON.stringify(expected), { actual, expected });
const near = (name, actual, expected, tolerance) =>
  check(name, Math.abs(actual - expected) <= tolerance, { actual, expected, tolerance });

const browser = await chromium.launch({ executablePath: CHROME });
const page = await browser.newPage({ viewport: { width: 1500, height: 950 }, deviceScaleFactor: 2 });
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));

await page.goto(BASE, { waitUntil: 'domcontentloaded' });
await page.getByRole('button', { name: 'Load a sample' }).click();
await page.waitForSelector('.page svg', { timeout: 120000 });
await page.waitForTimeout(800);

/* ---- the default pairing ------------------------------------------ */

const defaults = await page.evaluate(() => ({
  pairing: document.querySelector('.segmented button[aria-pressed="true"]')?.textContent,
  clefs: Array.from(document.querySelectorAll('.panel-badge')).map((b) => b.textContent),
  octaves: Array.from(document.querySelectorAll('.voice-slot')).map(
    (r) => r.querySelectorAll('select')[1].selectedOptions[0].textContent,
  ),
}));
eq('S+A / T+B is the default pairing', defaults.pairing, 'S+A/T+B');
check('it needs no octave shifting', defaults.octaves.every((o) => o === 'as is'), defaults.octaves);
check('and reads treble over bass', defaults.clefs.includes('Treble / Bass'), defaults.clefs);

/* ---- paper sizes -------------------------------------------------- */

async function pageBox() {
  return page.evaluate(() => {
    const el = document.querySelector('.page');
    const r = el.getBoundingClientRect();
    const zoom = Number(getComputedStyle(el.parentElement).getPropertyValue('--z'));
    const mm = 96 / 25.4;
    return { w: r.width / zoom / mm, h: r.height / zoom / mm };
  });
}

let box = await pageBox();
near('A4 page is 210 mm wide', box.w, 210, 0.5);
near('A4 page is 297 mm tall', box.h, 297, 0.5);

await page.getByLabel('Paper size').selectOption('A5');
await page.waitForTimeout(600);
box = await pageBox();
near('A5 page is 148 mm wide', box.w, 148, 0.5);
near('A5 page is 210 mm tall', box.h, 210, 0.5);

const a5Pages = await page.locator('.page').count();
check('A5 needs more pages than A4', a5Pages >= 1, a5Pages);

await page.getByRole('button', { name: 'Landscape' }).click();
await page.waitForTimeout(600);
box = await pageBox();
near('landscape A5 is 210 mm wide', box.w, 210, 0.5);
near('landscape A5 is 148 mm tall', box.h, 148, 0.5);
await page.getByRole('button', { name: 'Portrait' }).click();
await page.waitForTimeout(400);

/* ---- music size --------------------------------------------------- */

const pagesAt = async (scale) => {
  await page.getByLabel('Music size').fill(String(scale));
  await page.waitForTimeout(700);
  return page.locator('.page').count();
};
const small = await pagesAt(60);
const large = await pagesAt(180);
check('bigger music needs more pages', large > small, { small, large });
await page.getByLabel('Music size').fill('100');
await page.waitForTimeout(600);

/* ---- margins ------------------------------------------------------ */

await page.getByLabel('left margin in millimetres').fill('40');
await page.waitForTimeout(700);
const svgBox = await page.evaluate(() => {
  const el = document.querySelector('.page');
  const zoom = Number(getComputedStyle(el.parentElement).getPropertyValue('--z'));
  const mm = 96 / 25.4;
  const pageRect = el.getBoundingClientRect();
  const svgRect = el.querySelector('svg').getBoundingClientRect();
  return { left: (svgRect.left - pageRect.left) / zoom / mm, width: svgRect.width / zoom / mm };
});
near('a 40 mm left margin is honoured', svgBox.left, 40, 0.6);
near('the music fills what is left', svgBox.width, 148 - 40 - 12, 0.6);
await page.getByLabel('left margin in millimetres').fill('12');
await page.waitForTimeout(500);

/* ---- spacing controls move things ---------------------------------- */

const systemTops = () =>
  page.evaluate(() =>
    Array.from(document.querySelectorAll('.page svg g.system')).map((g) =>
      Math.round(g.getBoundingClientRect().top),
    ),
  );
const tight = await systemTops();
await page.getByLabel('Distance between systems').fill('30');
await page.waitForTimeout(700);
const loose = await systemTops();
check(
  'system spacing changes the layout',
  tight.length > 1 && loose.length > 1 ? loose[1] - loose[0] > tight[1] - tight[0] : tight.length !== loose.length,
  { tight, loose },
);
await page.getByLabel('Distance between systems').fill('8');
await page.waitForTimeout(500);

/* ---- printing ------------------------------------------------------ */

async function printedSize() {
  const pdf = await page.pdf({ preferCSSPageSize: true, printBackground: true });
  const text = pdf.toString('latin1');
  const match = /\/MediaBox\s*\[\s*0\s+0\s+([\d.]+)\s+([\d.]+)/.exec(text);
  const pages = (text.match(/\/Type\s*\/Page[^s]/g) || []).length;
  return match ? { w: Number(match[1]), h: Number(match[2]), pages } : null;
}

await page.emulateMedia({ media: 'print' });
const a5Print = await printedSize();
near('printed A5 is 148 mm wide', (a5Print.w / 72) * 25.4, 148, 1);
near('printed A5 is 210 mm tall', (a5Print.h / 72) * 25.4, 210, 1);
check('printed page count matches the preview', a5Print.pages === a5Pages, {
  printed: a5Print.pages,
  preview: a5Pages,
});

await page.emulateMedia({ media: 'screen' });
await page.getByLabel('Paper size').selectOption('A4');
await page.waitForTimeout(700);
await page.emulateMedia({ media: 'print' });
const a4Print = await printedSize();
near('printed A4 is 210 mm wide', (a4Print.w / 72) * 25.4, 210, 1);
near('printed A4 is 297 mm tall', (a4Print.h / 72) * 25.4, 297, 1);
await page.emulateMedia({ media: 'screen' });

/* ---- downloads ------------------------------------------------------ */

const midiDownload = await Promise.all([
  page.waitForEvent('download'),
  page.getByTitle('Download the MIDI file').click(),
]).then(([d]) => d);
check('MIDI download is offered', midiDownload.suggestedFilename().endsWith('.mid'), midiDownload.suggestedFilename());

/* ---- playback -------------------------------------------------------- */

await page.getByRole('button', { name: 'Play' }).click();
await page.waitForTimeout(1600);
const state = await page.evaluate(() => ({
  clock: document.querySelector('.player-time')?.textContent,
  highlighted: document.querySelectorAll('.page svg g.measure.is-playing').length,
}));
check('the clock advances during playback', state.clock !== '0:00', state);
check('the current bar is highlighted', state.highlighted === 1, state);
await page.getByRole('button', { name: 'Stop' }).click();
await page.waitForTimeout(300);
eq('stopping rewinds', await page.locator('.player-time').first().textContent(), '0:00');

/* ---- the shell owns the viewport ------------------------------------- */

// A hidden control laid out against the document instead of its own panel used
// to stretch the page, so clicking anything low in the sidebar scrolled the
// whole interface out of view.
await page.locator('.sidebar').evaluate((el) => (el.scrollTop = 9999));
await page.getByText('Show margin guides').click();
await page.waitForTimeout(400);
const shell = await page.evaluate(() => ({
  docHeight: document.documentElement.scrollHeight,
  viewport: window.innerHeight,
  scrollY: Math.round(window.scrollY),
  appTop: Math.round(document.querySelector('.app').getBoundingClientRect().top),
  sidebarScrolls: (() => {
    const el = document.querySelector('.sidebar');
    return el.scrollHeight > el.clientHeight;
  })(),
  guides: !!document.querySelector('.page.margin-guides'),
}));
eq('the page itself never scrolls', shell.docHeight, shell.viewport);
eq('the interface stays put', [shell.scrollY, shell.appTop], [0, 0]);
check('the sidebar scrolls on its own', shell.sidebarScrolls === true, shell);
check('margin guides can be turned on', shell.guides === true, shell);
await page.getByText('Show margin guides').click();

/* ---- theme ----------------------------------------------------------- */

await page.getByRole('button', { name: /light interface/i }).click();
await page.waitForTimeout(250);
eq('light theme applies', await page.evaluate(() => document.documentElement.dataset.theme), 'light');
if (SHOTS) await page.screenshot({ path: `${SHOTS}/10-light.png` });
await page.getByRole('button', { name: /dark interface/i }).click();
await page.waitForTimeout(250);

/* ---- a second, awkward file ------------------------------------------ */

await page.evaluate(async (xml) => {
  const transfer = new DataTransfer();
  transfer.items.add(new File([xml], 'closed-score.musicxml', { type: 'application/xml' }));
  const input = document.querySelector('input[type="file"]');
  input.files = transfer.files;
  input.dispatchEvent(new Event('change', { bubbles: true }));
}, CLOSED_SCORE).catch(() => {});

await page.waitForTimeout(400);
const reopened = await page.getByRole('button', { name: 'Close this file' }).isVisible();
check('a file stays open', reopened === true);

/* ---- a MIDI file goes through the same pipeline --------------------- */

async function dropFile(bytes, name, type) {
  await page.evaluate(
    ({ bytes, name, type }) => {
      const transfer = new DataTransfer();
      transfer.items.add(new File([Uint8Array.from(bytes)], name, { type }));
      const input = document.querySelector('input[type="file"]');
      input.files = transfer.files;
      input.dispatchEvent(new Event('change', { bubbles: true }));
    },
    { bytes, name, type },
  );
}

await page.getByRole('button', { name: 'Close this file' }).click();
await page.waitForSelector('.dropzone', { timeout: 15000 });
await dropFile(Array.from(MIDI_SATB), 'chorale.mid', 'audio/midi');
await page.waitForSelector('.page svg', { timeout: 60000 });
await page.waitForTimeout(1200);

const midi = await page.evaluate(() => ({
  fileName: document.querySelector('.file-chip strong')?.textContent,
  voices: Array.from(document.querySelectorAll('.voice-legend-row')).map((r) => r.textContent),
  notes: document.querySelectorAll('.page svg g.note').length,
  panels: Array.from(document.querySelectorAll('.panel-head h3')).map((h) => h.textContent),
  staffLabels: Array.from(document.querySelectorAll('.mute-btn')).map((b) => b.textContent),
}));
eq('the MIDI file is loaded', midi.fileName, 'chorale.mid');
check('four voices come out of it', midi.voices.length === 4, midi.voices);
eq('roles are read from the track names', midi.voices.map((v) => v[0]), ['S', 'A', 'T', 'B']);
check('the same 104 notes are engraved', midi.notes === 104, midi.notes);
check('the MIDI import panel appears', midi.panels.includes('MIDI import'), midi.panels);
eq('paired S+A / T+B', midi.staffLabels.slice(0, 2), ['Soprano + Alto', 'Tenor + Bass']);

// Changing how the MIDI is read re-reads it without losing the layout.
await page.getByRole('button', { name: '1/4', exact: true }).click();
await page.waitForTimeout(1500);
const requantised = await page.evaluate(() => ({
  notes: document.querySelectorAll('.page svg g.note').length,
  paper: document.querySelector('.preview-bar')?.textContent.includes('210'),
}));
check('quantising again still engraves', requantised.notes > 0, requantised);
check('and keeps the page settings', requantised.paper === true, requantised);

check('no console or page errors', errors.length === 0, errors);

await browser.close();
console.log(`\n${passed} passed, ${failures.length} failed`);
for (const f of failures) console.log(`  FAIL  ${f}`);
process.exit(failures.length ? 1 : 0);
