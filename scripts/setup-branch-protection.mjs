// SPDX-License-Identifier: MIT
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

const args = process.argv.slice(2);
if (
  args.length &&
  (args.length !== 3 || args[0] !== '--apply' || args[1] !== '--repo' || !/^[\w.-]+\/[\w.-]+$/.test(args[2]))
) {
  throw new Error('Usage: node scripts/setup-branch-protection.mjs [--apply --repo owner/repo]');
}
const payload = readFileSync(new URL('../.github/branch-ruleset.json', import.meta.url), 'utf8');
const ruleset = JSON.parse(payload);
if (!args.length) {
  console.log(payload);
} else {
  const repository = args[2];
  const endpoint = `/repos/${repository}/rulesets`;
  // Complete listing must succeed before selecting create or update.
  const pages = JSON.parse(
    execFileSync('gh', ['api', '--paginate', '--slurp', `${endpoint}?includes_parents=false`], { encoding: 'utf8' }),
  );
  const matches = pages.flat().filter((entry) => entry.name === ruleset.name);
  if (matches.length > 1) throw new Error('Multiple matching rulesets; review the repository settings first.');
  const existing = matches[0];
  execFileSync(
    'gh',
    ['api', '--method', existing ? 'PUT' : 'POST', existing ? `${endpoint}/${existing.id}` : endpoint, '--input', '-'],
    { input: payload, stdio: ['pipe', 'inherit', 'inherit'] },
  );
}
