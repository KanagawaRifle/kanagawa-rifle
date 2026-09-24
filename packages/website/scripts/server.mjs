// SPDX-License-Identifier: MIT
import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';
import { setTimeout } from 'node:timers/promises';

const require = createRequire(import.meta.url);

export async function startServer(port = 0, kind = 'next', directory = 'out') {
  const command =
    kind === 'next'
      ? [require.resolve('next/dist/bin/next'), 'start', '--hostname', '127.0.0.1', '--port', String(port)]
      : [require.resolve('serve/build/main.js'), directory, '--listen', `tcp://127.0.0.1:${port}`];
  const child = spawn(process.execPath, command, { stdio: ['ignore', 'pipe', 'pipe'] });
  let output = '';
  let url;
  let spawnError;
  const capture = (chunk) => {
    output = (output + chunk.toString()).slice(-16000);
    url ??= output.match(/http:\/\/127\.0\.0\.1:([1-9]\d*)/)?.[0];
  };
  child.stdout.on('data', capture);
  child.stderr.on('data', capture);
  child.on('error', (error) => {
    spawnError = error;
  });
  async function close() {
    if (child.exitCode !== null || child.signalCode !== null || spawnError) return;
    const exited = new Promise((resolve) => child.once('exit', resolve));
    child.kill('SIGTERM');
    const timer = globalThis.setTimeout(() => child.kill('SIGKILL'), 5000);
    try {
      await exited;
    } finally {
      globalThis.clearTimeout(timer);
    }
  }
  try {
    const deadline = Date.now() + 30000;
    while (Date.now() < deadline) {
      if (spawnError) throw spawnError;
      if (child.exitCode !== null || child.signalCode !== null)
        throw new Error(`Server exited during startup: ${output}`);
      if (url) {
        try {
          if ((await fetch(url, { signal: AbortSignal.timeout(1000) })).ok) return { url, close };
        } catch {
          /* Wait until the announced socket serves requests. */
        }
      }
      await setTimeout(100);
    }
    throw new Error(`Server startup timed out: ${output}`);
  } catch (error) {
    await close();
    throw error;
  }
}
