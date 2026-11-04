// cspell:words mktree
import assert from 'node:assert/strict';
import { execFileSync, spawnSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

import yaml from 'js-yaml';

import { buildReport, createLinter, readCommits, validatePullRequest } from './validate-pr-messages.mjs';

const lintMessage = await createLinter();
const title = 'fix(website): 記事のリンクを修正';

function repository(t) {
  const cwd = mkdtempSync(join(tmpdir(), 'pr-messages-'));
  t.after(() => rmSync(cwd, { recursive: true, force: true }));
  const env = {
    ...process.env,
    GIT_AUTHOR_NAME: 'Test Author',
    GIT_AUTHOR_EMAIL: 'author@example.test',
    GIT_COMMITTER_NAME: 'Test Committer',
    GIT_COMMITTER_EMAIL: 'committer@example.test',
  };
  const git = (args, input) => execFileSync('git', args, { cwd, env, input, encoding: 'utf8' }).trim();
  git(['init', '--quiet']);
  const tree = git(['mktree'], '');
  const commit = (message, parents = []) =>
    git(['commit-tree', tree, ...parents.flatMap((parent) => ['-p', parent])], message + '\n');
  const root = commit('Initial commit');
  git(['update-ref', 'HEAD', root]);
  return { cwd, root, commit, git };
}

test('standard messages allow optional scopes, Japanese text, and breaking changes', async () => {
  for (const message of [title, 'fix: correct links', 'chore(deps-dev): bump vitest', 'feat!: change the API']) {
    assert.equal((await lintMessage(message)).valid, true, message);
  }
});

test('empty messages and commitlint default ignores cannot bypass validation', async () => {
  for (const message of ['', ' \n\t', 'v1.2.3', "Merge branch 'topic'", 'Revert "something"']) {
    assert.equal((await lintMessage(message)).valid, false, JSON.stringify(message));
  }
});

test('a valid title and later valid commit cannot hide earlier invalid messages', async (t) => {
  const { cwd, root, commit } = repository(t);
  const bad = commit('work in progress', [root]);
  const empty = commit('', [bad]);
  const head = commit(title, [empty]);
  const result = await validatePullRequest({ title, base: root, head, expectedCount: 3, cwd, lintMessage });
  assert.equal(result.commitsChecked, 3);
  assert.deepEqual(
    result.failures.map(({ label }) => label),
    [`Commit ${bad}`, `Commit ${empty}`],
  );
});

test('only PR commits are checked, excluding base history and the synthetic merge', async (t) => {
  const { cwd, root, commit, git } = repository(t);
  const base = commit('existing base history', [root]);
  const head = commit(title, [root]);
  const merge = commit('synthetic merge', [base, head]);
  git(['update-ref', 'HEAD', merge]);
  const result = await validatePullRequest({ title, base, head, expectedCount: 1, cwd, lintMessage });
  assert.deepEqual(result, { commitsChecked: 1, failures: [] });
});

test('the title is checked independently of valid commits', async (t) => {
  const { cwd, root, commit } = repository(t);
  const head = commit(title, [root]);
  const result = await validatePullRequest({
    title: 'invalid title',
    base: root,
    head,
    expectedCount: 1,
    cwd,
    lintMessage,
  });
  assert.deepEqual(
    result.failures.map(({ label }) => label),
    ['PR title'],
  );
});

test('all messages are checked beyond the REST API limit of 250 commits', async (t) => {
  const { cwd, root, commit } = repository(t);
  let head = root;
  let bad;
  for (let i = 0; i < 252; i += 1) {
    head = commit(i === 250 ? 'invalid message beyond the API limit' : `chore: change ${i}`, [head]);
    if (i === 250) bad = head;
  }
  const result = await validatePullRequest({ title, base: root, head, expectedCount: 252, cwd, lintMessage });
  assert.equal(result.commitsChecked, 252);
  assert.deepEqual(
    result.failures.map(({ label }) => label),
    [`Commit ${bad}`],
  );
});

test('incomplete history and mismatched event metadata fail closed', (t) => {
  const { cwd, root, commit, git } = repository(t);
  const head = commit(title, [root]);
  const range = { base: root, head, expectedCount: 1, cwd };
  assert.throws(() => readCommits({ ...range, expectedCount: 2 }), /does not match/);
  assert.throws(() => readCommits({ ...range, expectedCount: 0 }), /positive commit count/);
  assert.throws(() => readCommits({ ...range, head: '--all' }), /full base and head/);
  writeFileSync(join(cwd, '.git', 'shallow'), root + '\n');
  assert.equal(git(['rev-parse', '--is-shallow-repository']), 'true');
  assert.throws(() => readCommits(range), /Full Git history/);
});

test('the workflow command fails on violations and writes actionable summary output', (t) => {
  const { cwd, root, commit } = repository(t);
  const head = commit('invalid commit', [root]);
  const event = join(cwd, 'event.json');
  const summary = join(cwd, 'summary.md');
  writeFileSync(
    event,
    JSON.stringify({ pull_request: { title, base: { sha: root }, head: { sha: head }, commits: 1 } }),
  );
  const result = spawnSync(process.execPath, [fileURLToPath(new URL('./validate-pr-messages.mjs', import.meta.url))], {
    cwd,
    encoding: 'utf8',
    env: { ...process.env, GITHUB_EVENT_PATH: event, GITHUB_STEP_SUMMARY: summary },
  });
  assert.equal(result.status, 1, result.stderr);
  assert.equal(JSON.parse(result.stdout).failures[0].label, `Commit ${head}`);
  assert.match(readFileSync(summary, 'utf8'), /amend \/ rebase/);
});

test('report size is bounded while full failures remain available in the log', () => {
  const failures = Array.from({ length: 25 }, (_, i) => ({
    label: `Commit ${i}`,
    errors: [{ name: 'type-empty', message: 'type missing' }],
  }));
  const report = buildReport({ commitsChecked: 25, failures });
  assert.match(report, /5 additional failures/);
  assert.doesNotMatch(report, /Commit 20:/);
});

test('the required check runs with read-only permissions and full history on every PR revision', () => {
  const workflow = yaml.load(readFileSync(new URL('../.github/workflows/pr-messages.yml', import.meta.url), 'utf8'));
  assert.deepEqual(workflow.permissions, { contents: 'read' });
  assert.deepEqual(workflow.on.pull_request.types, ['opened', 'edited', 'synchronize', 'reopened']);
  assert.equal(workflow.jobs.validate.name, 'PR Messages');
  assert.equal(workflow.jobs.validate.steps[0].with['fetch-depth'], 0);
  assert.equal(workflow.jobs.validate.steps[0].with['persist-credentials'], false);
});
