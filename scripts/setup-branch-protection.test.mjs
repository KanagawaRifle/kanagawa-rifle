import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { delimiter, join } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

const script = fileURLToPath(new URL('./setup-branch-protection.mjs', import.meta.url));
const ruleset = JSON.parse(readFileSync(new URL('../.github/branch-ruleset.json', import.meta.url), 'utf8'));

const run = (t, { entries = [], failListing = false, apply = true } = {}) => {
  const directory = mkdtempSync(join(tmpdir(), 'branch-protection-'));
  t.after(() => rmSync(directory, { recursive: true, force: true }));
  const log = join(directory, 'calls.jsonl');
  writeFileSync(log, '');
  writeFileSync(
    join(directory, 'gh'),
    `#!${process.execPath}
const fs = require('node:fs');
const args = process.argv.slice(2);
fs.appendFileSync(process.env.CALL_LOG, JSON.stringify(args) + '\\n');
if (args.includes('--paginate')) {
  if (process.env.FAIL_LISTING === 'true') process.exit(1);
  console.log(process.env.RULE_ENTRIES);
} else {
  fs.writeFileSync(process.env.PAYLOAD, fs.readFileSync(0));
}
`,
    { mode: 0o755 },
  );
  const payload = join(directory, 'payload.json');
  const result = spawnSync(process.execPath, [script, ...(apply ? ['--apply', '--repo', 'example/site'] : [])], {
    encoding: 'utf8',
    env: {
      ...process.env,
      PATH: `${directory}${delimiter}${process.env.PATH}`,
      CALL_LOG: log,
      PAYLOAD: payload,
      RULE_ENTRIES: entries.map((entry) => JSON.stringify(entry)).join('\n'),
      FAIL_LISTING: String(failListing),
    },
  });
  return {
    result,
    calls: readFileSync(log, 'utf8')
      .trim()
      .split('\n')
      .filter(Boolean)
      .map((line) => JSON.parse(line)),
    payload,
  };
};

test('dry run prints the ruleset without accessing GitHub', (t) => {
  const { result, calls } = run(t, { apply: false });
  assert.equal(result.status, 0, result.stderr);
  assert.deepEqual(JSON.parse(result.stdout), ruleset);
  assert.deepEqual(calls, []);
});

test('creates a ruleset only after a complete successful listing', (t) => {
  const { result, calls, payload } = run(t, { entries: [{ id: 7, name: 'unrelated' }] });
  assert.equal(result.status, 0, result.stderr);
  assert.ok(calls[0].includes('--paginate'));
  assert.ok(calls[0].includes('.[] | @json'));
  assert.deepEqual(calls[1], ['api', '--method', 'POST', '/repos/example/site/rulesets', '--input', '-']);
  assert.deepEqual(JSON.parse(readFileSync(payload, 'utf8')), ruleset);
});

test('updates a matching ruleset found after an unrelated entry', (t) => {
  const { result, calls } = run(t, {
    entries: [
      { id: 7, name: 'unrelated' },
      { id: 8, name: ruleset.name },
    ],
  });
  assert.equal(result.status, 0, result.stderr);
  assert.deepEqual(calls[1], ['api', '--method', 'PUT', '/repos/example/site/rulesets/8', '--input', '-']);
});

test('does not mutate settings when listing fails or names are ambiguous', (t) => {
  for (const options of [
    { failListing: true },
    {
      entries: [
        { id: 7, name: ruleset.name },
        { id: 8, name: ruleset.name },
      ],
    },
  ]) {
    const { result, calls } = run(t, options);
    assert.notEqual(result.status, 0);
    assert.equal(calls.length, 1);
  }
});
