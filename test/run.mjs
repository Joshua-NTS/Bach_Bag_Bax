/**
 * Starts a dev server, runs every suite against it, then shuts it down.
 *
 *   npm test
 */
import { spawn } from 'node:child_process';
import { setTimeout as sleep } from 'node:timers/promises';

const PORT = Number(process.env.PORT || 5199);
const BASE = `http://localhost:${PORT}`;

const server = spawn('npx', ['vite', '--port', String(PORT), '--strictPort', '--logLevel', 'error'], {
  stdio: ['ignore', 'inherit', 'inherit'],
});

const shutdown = () => {
  if (!server.killed) server.kill('SIGTERM');
};
process.on('exit', shutdown);
process.on('SIGINT', () => {
  shutdown();
  process.exit(130);
});

async function waitForServer(timeoutMs = 60_000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(BASE, { signal: AbortSignal.timeout(2000) });
      if (response.ok) return;
    } catch {
      /* not up yet */
    }
    await sleep(300);
  }
  throw new Error(`Dev server did not start on ${BASE}`);
}

function runSuite(file) {
  return new Promise((resolve) => {
    console.log(`\n=== ${file} ===`);
    const child = spawn(process.execPath, [file], {
      stdio: 'inherit',
      env: { ...process.env, BASE },
    });
    child.on('exit', (code) => resolve(code ?? 1));
  });
}

await waitForServer();

let failed = 0;
for (const suite of ['test/pipeline.test.mjs', 'test/ui.test.mjs']) {
  failed += (await runSuite(suite)) === 0 ? 0 : 1;
}

shutdown();
process.exit(failed ? 1 : 0);
