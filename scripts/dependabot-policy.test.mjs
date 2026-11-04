// SPDX-License-Identifier: MIT
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { test } from 'node:test';

import yaml from 'js-yaml';

const configuration = yaml.load(readFileSync(new URL('../.github/dependabot.yml', import.meta.url), 'utf8'));

test('dependency updates have one npm policy and retain reviewable update groups', () => {
  const npm = configuration.updates.filter((update) => update['package-ecosystem'] === 'npm');
  assert.equal(npm.length, 1);
  assert.equal(npm[0].directory, '/');
  for (const name of ['npm-development', 'security-dev-safe']) {
    assert.equal(npm[0].groups[name]['dependency-type'], 'development');
    assert.deepEqual([...npm[0].groups[name]['update-types']].sort(), ['minor', 'patch']);
  }
  assert.equal(npm[0].groups['security-dev-safe']['applies-to'], 'security-updates');
  for (const update of configuration.updates) assert.equal(update.cooldown['default-days'], 7);
});

test('every dependency ecosystem explicitly uses Conventional Commits', () => {
  const prefixes = { npm: 'chore', 'github-actions': 'ci', docker: 'build', 'docker-compose': 'build' };
  for (const update of configuration.updates) {
    assert.deepEqual(update['commit-message'], { prefix: prefixes[update['package-ecosystem']], include: 'scope' });
  }
});

test('GitHub Actions cannot arm dependency auto-merge or bypass the owner review gate', () => {
  assert.equal(existsSync(new URL('../.github/workflows/dependabot-auto-merge.yml', import.meta.url)), false);
  const mergers = JSON.parse(readFileSync(new URL('../.github/branch-mergers-ruleset.json', import.meta.url), 'utf8'));
  const review = JSON.parse(
    readFileSync(new URL('../.github/branch-owner-review-ruleset.json', import.meta.url), 'utf8'),
  );
  assert.deepEqual(mergers.bypass_actors, [
    { actor_id: 34340317, actor_type: 'User', bypass_mode: 'pull_request' },
    { actor_id: 29110, actor_type: 'Integration', bypass_mode: 'pull_request' },
  ]);
  assert.deepEqual(review.bypass_actors, [{ actor_id: 34340317, actor_type: 'User', bypass_mode: 'pull_request' }]);
  assert.equal(review.rules[0].parameters.require_code_owner_review, true);
  assert.equal(review.rules[0].parameters.required_approving_review_count, 1);
});
