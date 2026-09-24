// SPDX-License-Identifier: MIT
import assert from 'node:assert/strict';
import { test } from 'node:test';

import { loadConfiguration } from './k6.mjs';

const targeted = {
  WEBSITE_LOAD_BASE_URL: 'https://preview.example.test/manuals/',
  WEBSITE_LOAD_RATE: '2',
  WEBSITE_LOAD_DURATION: '30s',
  WEBSITE_LOAD_VUS: '3',
  WEBSITE_LOAD_P95_MS: '500',
};

test('smoke uses a bounded local scenario even when a remote target is in the environment', () => {
  const configuration = loadConfiguration('smoke', targeted);
  assert.equal(configuration.baseUrl, undefined);
  assert.deepEqual(configuration.options.scenarios.smoke, {
    executor: 'shared-iterations',
    vus: 1,
    iterations: 5,
    maxDuration: '1m',
  });
  assert.equal(configuration.options.thresholds['http_req_duration{name:detail}'], undefined);
});

test('load requires an explicit target, workload and latency budget', () => {
  for (const key of Object.keys(targeted)) {
    const env = { ...targeted };
    delete env[key];
    assert.throws(() => loadConfiguration('load', env), new RegExp(key));
  }
  const configuration = loadConfiguration('load', targeted);
  assert.equal(configuration.baseUrl, 'https://preview.example.test/manuals');
  assert.equal(configuration.options.scenarios.load.rate, 2);
  assert.deepEqual(configuration.options.thresholds['http_req_duration{name:detail}'], ['p(95)<500']);
  assert.deepEqual(configuration.options.thresholds.dropped_iterations, ['count==0']);
  assert.equal(configuration.options.maxRedirects, 0);
});

test('load rejects malformed targets and non-positive or fractional workloads', () => {
  for (const url of ['file:///tmp/docs', 'https://user:secret@example.test', 'https://example.test/?page=1'])
    assert.throws(() => loadConfiguration('load', { ...targeted, WEBSITE_LOAD_BASE_URL: url }), /HTTP\(S\) URL/);
  for (const key of ['WEBSITE_LOAD_RATE', 'WEBSITE_LOAD_VUS', 'WEBSITE_LOAD_P95_MS'])
    for (const value of ['0', '-1', '1.5', 'invalid'])
      assert.throws(() => loadConfiguration('load', { ...targeted, [key]: value }), /positive integer/);
});

test('preview Basic authentication uses the existing environment contract', () => {
  assert.throws(() => loadConfiguration('smoke', { WEBSITE_PREVIEW_AUTH: '1' }), /BASIC_AUTH_ID/);
  const configuration = loadConfiguration('smoke', {
    WEBSITE_PREVIEW_AUTH: '1',
    BASIC_AUTH_ID: 'preview-test',
    BASIC_AUTH_PASSWORD: 'test-only-password',
  });
  assert.equal(
    configuration.authorization,
    `Basic ${Buffer.from('preview-test:test-only-password').toString('base64')}`,
  );
});

test('load rejects malformed durations', () => {
  for (const duration of ['forever', '1.5', '-1s', '1s trailing', '9'.repeat(10_000)]) {
    assert.throws(() => loadConfiguration('load', { ...targeted, WEBSITE_LOAD_DURATION: duration }), /duration/);
  }
});

test('load accepts compound k6 durations', () => {
  const duration = '1h2m3s4ms';
  const configuration = loadConfiguration('load', { ...targeted, WEBSITE_LOAD_DURATION: duration });
  assert.equal(configuration.options.scenarios.load.duration, duration);
});
