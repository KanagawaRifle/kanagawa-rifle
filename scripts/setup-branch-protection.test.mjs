import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { delimiter, join } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

const script = fileURLToPath(new URL('./setup-branch-protection.mjs', import.meta.url));
const rulesets = ['branch-owner-review-ruleset.json', 'branch-mergers-ruleset.json', 'branch-ruleset.json'].map(
  (name) => JSON.parse(readFileSync(new URL(`../.github/${name}`, import.meta.url), 'utf8')),
);

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
  fs.appendFileSync(process.env.PAYLOAD, fs.readFileSync(0) + '\\n');
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

test('dry run prints all rulesets without accessing GitHub', (t) => {
  const { result, calls } = run(t, { apply: false });
  assert.equal(result.status, 0, result.stderr);
  assert.deepEqual(JSON.parse(result.stdout), rulesets);
  assert.deepEqual(calls, []);
});

test('creates every ruleset in order only after a complete successful listing', (t) => {
  const { result, calls, payload } = run(t, { entries: [{ id: 7, name: 'unrelated' }] });
  assert.equal(result.status, 0, result.stderr);
  assert.ok(calls[0].includes('--paginate'));
  assert.ok(calls[0].includes('.[] | @json'));
  assert.equal(calls.length, 4);
  for (const call of calls.slice(1)) {
    assert.deepEqual(call, ['api', '--method', 'POST', '/repos/example/site/rulesets', '--input', '-']);
  }
  assert.deepEqual(readFileSync(payload, 'utf8').trim().split('\n').map(JSON.parse), rulesets);
});

test('updates a matching ruleset found after an unrelated entry', (t) => {
  const { result, calls } = run(t, {
    entries: [
      { id: 7, name: 'unrelated' },
      { id: 8, name: rulesets[0].name },
      { id: 9, name: rulesets[2].name },
    ],
  });
  assert.equal(result.status, 0, result.stderr);
  assert.deepEqual(calls[1], ['api', '--method', 'PUT', '/repos/example/site/rulesets/8', '--input', '-']);
  assert.deepEqual(calls[2], ['api', '--method', 'POST', '/repos/example/site/rulesets', '--input', '-']);
  assert.deepEqual(calls[3], ['api', '--method', 'PUT', '/repos/example/site/rulesets/9', '--input', '-']);
});

test('does not mutate settings when listing fails or names are ambiguous', (t) => {
  for (const options of [
    { failListing: true },
    {
      entries: [
        { id: 7, name: rulesets[2].name },
        { id: 8, name: rulesets[2].name },
      ],
    },
  ]) {
    const { result, calls } = run(t, options);
    assert.notEqual(result.status, 0);
    assert.equal(calls.length, 1);
  }
});

test('owner exceptions cannot bypass CI or grant other users merge access', () => {
  const [review, mergers, base] = rulesets;
  assert.deepEqual(base.bypass_actors, []);
  assert.equal(base.rules.find((rule) => rule.type === 'pull_request').parameters.required_approving_review_count, 0);
  assert.deepEqual(
    base.rules.find((rule) => rule.type === 'required_status_checks').parameters.required_status_checks,
    [{ context: 'CI Required' }, { context: 'PR Messages' }],
  );
  assert.ok(base.rules.some((rule) => rule.type === 'required_linear_history'));
  for (const ruleset of [base, review]) {
    assert.deepEqual(ruleset.rules.find((rule) => rule.type === 'pull_request').parameters.allowed_merge_methods, [
      'rebase',
    ]);
  }
  assert.deepEqual(review.bypass_actors, [{ actor_id: 34340317, actor_type: 'User', bypass_mode: 'pull_request' }]);
  assert.equal(review.rules[0].parameters.required_approving_review_count, 1);
  assert.equal(review.rules[0].parameters.require_code_owner_review, true);
  assert.deepEqual(mergers.rules, [{ type: 'update' }]);
  assert.deepEqual(mergers.bypass_actors, [
    { actor_id: 34340317, actor_type: 'User', bypass_mode: 'pull_request' },
    { actor_id: 29110, actor_type: 'Integration', bypass_mode: 'pull_request' },
  ]);
});
