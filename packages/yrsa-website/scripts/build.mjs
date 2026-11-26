import { spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const validation = process.env.YRSA_VALIDATION_BUILD === '1';
const node = (arguments_, env = process.env) => {
  const result = spawnSync(process.execPath, arguments_, { env, stdio: 'inherit' });
  if (result.error) throw result.error;
  return result.status ?? 1;
};
const run = (script) => {
  const status = node([require.resolve('tsx/cli'), script]);
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

process.exitCode = node([require.resolve('next/dist/bin/next'), 'build'], env);
