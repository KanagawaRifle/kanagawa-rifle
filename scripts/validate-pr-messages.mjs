// SPDX-License-Identifier: MIT
// cspell:words topo
import { execFileSync } from 'node:child_process';
import { appendFileSync, readFileSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';

import lint from '@commitlint/lint';
import load from '@commitlint/load';

export async function createLinter() {
  const config = await load({}, { file: fileURLToPath(new URL('../commitlint.config.mjs', import.meta.url)) });
  return (message) => {
    if (!message.trim()) {
      return { valid: false, errors: [{ name: 'message-empty', message: 'message must not be empty' }] };
    }
    return lint(message, config.rules, {
      parserOpts: config.parserPreset?.parserOpts,
      plugins: config.plugins,
      ignores: config.ignores,
      // Inspect version, merge, and revert messages instead of silently ignoring them.
      defaultIgnores: false,
    });
  };
}

export function readCommits({ base, head, expectedCount, cwd = process.cwd() }) {
  if (![base, head].every((sha) => /^[0-9a-f]{40}(?:[0-9a-f]{24})?$/.test(sha))) {
    throw new Error('The PR must provide full base and head commit SHAs.');
  }
  if (!Number.isSafeInteger(expectedCount) || expectedCount < 1) {
    throw new Error('The PR must provide a positive commit count.');
  }
  const git = (...args) => execFileSync('git', args, { cwd, encoding: 'utf8', maxBuffer: 32 * 1024 * 1024 });
  if (git('rev-parse', '--is-shallow-repository').trim() !== 'false') {
    throw new Error('Full Git history is required; use fetch-depth: 0.');
  }
  git('merge-base', base, head);
  // Use the event's exact revision range, excluding the synthetic PR merge commit.
  const commits = git('rev-list', '--reverse', '--topo-order', `${base}..${head}`).trim().split('\n').filter(Boolean);
  if (commits.length !== expectedCount || commits.at(-1) !== head) {
    throw new Error('The commit range does not match the PR event; rerun against the current revision.');
  }
  return commits.map((sha) => ({ sha, message: git('show', '-s', '--format=%B', sha) }));
}

export async function validatePullRequest({ title, lintMessage, ...range }) {
  const commits = readCommits(range);
  const failures = [];
  for (const { label, message } of [
    { label: 'PR title', message: title },
    ...commits.map(({ sha, message }) => ({ label: `Commit ${sha}`, message })),
  ]) {
    const result = await lintMessage(message);
    if (!result.valid) failures.push({ label, errors: result.errors });
  }
  return { commitsChecked: commits.length, failures };
}

export function buildReport({ commitsChecked, failures }) {
  const lines = [`Checked the PR title and all ${commitsChecked} commits with Conventional Commits.`, ''];
  if (failures.length === 0) return `${lines.join('\n')}All messages passed.\n`;
  for (const { label, errors } of failures.slice(0, 20)) {
    lines.push(`- ${label}: ${errors.map(({ name, message }) => `${message} (${name})`).join('; ')}`);
  }
  if (failures.length > 20) lines.push(`- ${failures.length - 20} additional failures; see the workflow log.`);
  lines.push(
    '',
    'Use `type(scope): summary`; scope is optional. Example: `fix(website): correct article links`.',
    'Edit an invalid title. Use amend / rebase to fix invalid commit messages, then push the corrected history.',
    'Changing only the title or adding a valid commit does not fix earlier invalid commits.',
  );
  return `${lines.join('\n')}\n`;
}

async function main() {
  const { pull_request: pull } = JSON.parse(readFileSync(process.env.GITHUB_EVENT_PATH, 'utf8'));
  const result = await validatePullRequest({
    title: pull.title,
    base: pull.base.sha,
    head: pull.head.sha,
    expectedCount: pull.commits,
    lintMessage: await createLinter(),
  });
  console.log(JSON.stringify(result, null, 2));
  if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, buildReport(result));
  if (result.failures.length > 0) process.exitCode = 1;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
