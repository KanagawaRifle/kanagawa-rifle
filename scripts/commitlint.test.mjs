import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

const cli = fileURLToPath(new URL('../node_modules/@commitlint/cli/cli.js', import.meta.url));
const config = fileURLToPath(new URL('../commitlint.config.mjs', import.meta.url));
const lint = (message) => spawnSync(process.execPath, [cli, '--config', config], { input: message, encoding: 'utf8' });

test('standard headers support optional scopes, dependency scopes, and breaking changes', () => {
  for (const message of [
    'fix: correct article links',
    'fix(website): correct article links',
    'chore(deps-dev): bump vitest',
    'ci(deps): bump actions/checkout',
    'build(deps): bump node',
    'feat!: change the news API',
    'feat(website)!: change the news API',
  ]) {
    const result = lint(message);
    assert.equal(result.status, 0, `${message}\n${result.stdout}${result.stderr}`);
  }
});

test('legacy, missing, unsupported, and oversized headers are rejected', () => {
  for (const message of [
    '[website] fix: correct article links',
    'correct article links',
    'security(website): update headers',
    `fix: ${'a'.repeat(100)}`,
  ]) {
    const result = lint(message);
    assert.notEqual(result.status, 0, message);
  }
});
