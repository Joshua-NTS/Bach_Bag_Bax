import type { VerovioToolkit } from 'verovio/esm';

let toolkitPromise: Promise<VerovioToolkit> | null = null;

/**
 * Verovio ships as a ~7 MB single-file WASM bundle, so it is pulled in lazily:
 * the interface paints immediately and the engraver arrives a moment later.
 */
export function loadToolkit(): Promise<VerovioToolkit> {
  if (!toolkitPromise) {
    toolkitPromise = (async () => {
      const [{ default: createVerovioModule }, { VerovioToolkit: Toolkit }] = await Promise.all([
        import('verovio/wasm'),
        import('verovio/esm'),
      ]);
      const module = await createVerovioModule();
      return new Toolkit(module);
    })().catch((error) => {
      toolkitPromise = null;
      throw error;
    });
  }
  return toolkitPromise;
}

export interface EngraveResult {
  pages: string[];
  warnings: string[];
}

let loadedXml: string | null = null;
/** The toolkit holds one score at a time, so calls have to be serialised. */
let queue: Promise<unknown> = Promise.resolve();

export function engrave(musicXml: string, options: Record<string, unknown>): Promise<EngraveResult> {
  const run = queue.then(
    () => engraveNow(musicXml, options),
    () => engraveNow(musicXml, options),
  );
  queue = run.catch(() => undefined);
  return run;
}

async function engraveNow(musicXml: string, options: Record<string, unknown>): Promise<EngraveResult> {
  const toolkit = await loadToolkit();
  toolkit.setOptions(options);

  if (loadedXml !== musicXml) {
    loadedXml = null;
    if (!toolkit.loadData(musicXml)) {
      const log = toolkit.getLog();
      throw new Error(`Verovio could not engrave this score.${log ? `\n${log.slice(0, 400)}` : ''}`);
    }
    loadedXml = musicXml;
  } else {
    // Same music, new layout: relaying out is far cheaper than re-importing.
    toolkit.redoLayout();
  }

  const count = Math.max(1, toolkit.getPageCount());
  const pages: string[] = [];
  for (let page = 1; page <= count; page++) pages.push(toolkit.renderToSVG(page));

  const log = toolkit.getLog().trim();
  const warnings = log
    ? Array.from(new Set(log.split('\n').map((l) => l.trim()).filter(Boolean))).slice(0, 8)
    : [];
  return { pages, warnings };
}
