// SPDX-License-Identifier: MIT
import { spawn } from 'node:child_process';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { startServer } from './server.mjs';

const image = 'grafana/k6:1.4.1@sha256:200d24a0770ad12761569993c723fd7d48b29fc7983ff5f976bf8b8dba4c7d21';

export function loadConfiguration(mode, env) {
  if (!['smoke', 'load'].includes(mode)) throw new Error('Select smoke or load.');
  const smoke = mode === 'smoke';
  const required = (key) => {
    if (!env[key]) throw new Error(`${key} is required for an explicitly targeted load test.`);
    return env[key];
  };
  const positiveInteger = (key) => {
    const value = Number(required(key));
    if (!Number.isSafeInteger(value) || value <= 0) throw new Error(`${key} must be a positive integer.`);
    return value;
  };
  let baseUrl;
  if (!smoke) {
    const url = new URL(required('WEBSITE_LOAD_BASE_URL'));
    if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password || url.search || url.hash)
      throw new Error('WEBSITE_LOAD_BASE_URL must be an HTTP(S) URL without credentials, query or fragment.');
    baseUrl = url.href.replace(/\/$/, '');
  }
  if (!smoke) {
    const duration = required('WEBSITE_LOAD_DURATION');
    if (duration.length > 100 || duration.replace(/\d+(?:ms|s|m|h)/g, '') !== '')
      throw new Error('WEBSITE_LOAD_DURATION must be a k6 duration such as 30s or 2m.');
  }
  let authorization = '';
  if (env.WEBSITE_PREVIEW_AUTH === '1') {
    if (!env.BASIC_AUTH_ID || !env.BASIC_AUTH_PASSWORD)
      throw new Error('Preview authentication requires BASIC_AUTH_ID and BASIC_AUTH_PASSWORD.');
    authorization = `Basic ${Buffer.from(`${env.BASIC_AUTH_ID}:${env.BASIC_AUTH_PASSWORD}`).toString('base64')}`;
  }
  const thresholds = { checks: ['rate==1'], http_req_failed: ['rate==0'] };
  if (smoke) thresholds.iterations = ['count==5'];
  else {
    const p95 = positiveInteger('WEBSITE_LOAD_P95_MS');
    thresholds['http_req_duration{name:news}'] = [`p(95)<${p95}`];
    thresholds['http_req_duration{name:detail}'] = [`p(95)<${p95}`];
    thresholds.dropped_iterations = ['count==0'];
  }
  return {
    baseUrl,
    authorization,
    options: {
      maxRedirects: 0,
      thresholds,
      scenarios: smoke
        ? { smoke: { executor: 'shared-iterations', vus: 1, iterations: 5, maxDuration: '1m' } }
        : {
            load: {
              executor: 'constant-arrival-rate',
              rate: positiveInteger('WEBSITE_LOAD_RATE'),
              timeUnit: '1s',
              duration: required('WEBSITE_LOAD_DURATION'),
              preAllocatedVUs: positiveInteger('WEBSITE_LOAD_VUS'),
            },
          },
    },
  };
}

async function run(mode) {
  const configuration = loadConfiguration(mode, process.env);
  let server;
  try {
    if (mode === 'smoke') server = await startServer();
    const env = {
      ...process.env,
      WEBSITE_LOAD_BASE_URL: server?.url ?? configuration.baseUrl,
      WEBSITE_LOAD_AUTHORIZATION: configuration.authorization,
      WEBSITE_LOAD_OPTIONS: JSON.stringify(configuration.options),
      WEBSITE_LOAD_PROFILE: mode,
    };
    const child = spawn(
      process.env.K6_BINARY || 'docker',
      process.env.K6_BINARY
        ? ['run', 'tests/load/website.js']
        : [
            'run',
            '--rm',
            '--network=host',
            '--volume',
            `${fileURLToPath(new URL('..', import.meta.url))}:/work:ro`,
            '--workdir=/work',
            ...[
              'WEBSITE_LOAD_BASE_URL',
              'WEBSITE_LOAD_AUTHORIZATION',
              'WEBSITE_LOAD_OPTIONS',
              'WEBSITE_LOAD_PROFILE',
            ].flatMap((key) => ['--env', key]),
            image,
            'run',
            'tests/load/website.js',
          ],
      { stdio: 'inherit', env },
    );
    const stop = () => child.kill('SIGTERM');
    process.once('SIGINT', stop);
    process.once('SIGTERM', stop);
    try {
      const code = await new Promise((resolve, reject) => {
        child.once('error', reject);
        child.once('exit', (code) => resolve(code ?? 1));
      });
      process.exitCode = code;
    } finally {
      process.removeListener('SIGINT', stop);
      process.removeListener('SIGTERM', stop);
    }
  } finally {
    await server?.close();
  }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await run(process.argv[2]);
