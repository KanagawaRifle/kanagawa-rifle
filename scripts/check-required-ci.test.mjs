import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

import * as yaml from 'js-yaml';

import { requiredChecksPass } from './check-required-ci.mjs';

test('every required workflow job must succeed; missing and skipped results fail', () => {
  const workflow = yaml.load(readFileSync(new URL('../.github/workflows/test.yml', import.meta.url), 'utf8'));
  const results = Object.fromEntries(workflow.jobs.required.needs.map((job) => [job, { result: 'success' }]));
  assert.equal(requiredChecksPass(results), true);
  assert.equal(requiredChecksPass(undefined), false);
  assert.equal(requiredChecksPass({}), false);
  for (const job of Object.keys(results)) {
    for (const result of ['failure', 'cancelled', 'skipped', undefined]) {
      assert.equal(requiredChecksPass({ ...results, [job]: { result } }), false, `${job}: ${result}`);
    }
  }
});
