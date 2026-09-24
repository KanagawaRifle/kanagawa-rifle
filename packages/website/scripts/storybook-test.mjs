// SPDX-License-Identifier: MIT
import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';

import { startServer } from './server.mjs';

const require = createRequire(import.meta.url);
const server = await startServer(0, 'static', 'storybook-static');
try {
  const runner = spawn(
    process.execPath,
    [
      require.resolve('@storybook/test-runner/dist/test-storybook.js'),
      '--url',
      server.url,
      '--maxWorkers',
      '2',
      '--junit',
    ],
    {
      stdio: 'inherit',
      env: { ...process.env, JEST_JUNIT_OUTPUT_DIR: 'reports/storybook', JEST_JUNIT_OUTPUT_NAME: 'storybook.xml' },
    },
  );
  const stop = () => runner.kill('SIGTERM');
  process.once('SIGINT', stop);
  process.once('SIGTERM', stop);
  try {
    process.exitCode = await new Promise((resolve, reject) => {
      runner.once('error', reject);
      runner.once('exit', (code) => resolve(code ?? 1));
    });
  } finally {
    process.removeListener('SIGINT', stop);
    process.removeListener('SIGTERM', stop);
  }
} finally {
  await server.close();
}
