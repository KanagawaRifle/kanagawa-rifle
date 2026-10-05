import { spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';

import { runTool } from '@sasakiuri/repo-tooling/runtime';

const validation = process.env.YRSA_VALIDATION_BUILD === '1';
const run = (script) => {
  const status = runTool('tsx', [script]);
  if (status !== 0) process.exit(status);
};

run('scripts/generate-feed.ts');
if (validation) {
  console.log('Validation build: use fixture calendar settings and committed PDFs.');
} else {
  run('scripts/generate-calendar-pdf.ts');
}

const env = { ...process.env };
if (validation) {
  env.NEXT_PUBLIC_GOOGLE_CALENDAR_API_KEY = 'validation-only';
  env.NEXT_PUBLIC_GOOGLE_CALENDAR_ID_MAIN = 'main@example.invalid';
  env.NEXT_PUBLIC_GOOGLE_CALENDAR_ID_ANNUAL = 'annual@example.invalid';
  env.NEXT_PUBLIC_GA_MEASUREMENT_ID = '';
}

const require = createRequire(import.meta.url);
const result = spawnSync(process.execPath, [require.resolve('next/dist/bin/next'), 'build'], {
  env,
  stdio: 'inherit',
});
if (result.error) throw result.error;
process.exitCode = result.status ?? 1;
