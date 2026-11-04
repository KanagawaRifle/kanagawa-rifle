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
// Apply the owner review gate before lowering the universal approval count.
const rulesets = ['branch-owner-review-ruleset.json', 'branch-mergers-ruleset.json', 'branch-ruleset.json'].map(
  (name) => JSON.parse(readFileSync(new URL(`../.github/${name}`, import.meta.url), 'utf8')),
);
if (!args.length) {
  console.log(JSON.stringify(rulesets, null, 2));
} else {
  const repository = args[2];
  const endpoint = `/repos/${repository}/rulesets`;
  // Complete listing must succeed before selecting create or update.
  const entries = execFileSync(
    'gh',
    ['api', '--paginate', `${endpoint}?includes_parents=false`, '--jq', '.[] | @json'],
    {
      encoding: 'utf8',
    },
  )
    .split('\n')
    .filter(Boolean)
    .map((line) => JSON.parse(line));
  // Validate every name before changing any ruleset.
  const updates = rulesets.map((ruleset) => {
    const matches = entries.filter((entry) => entry.name === ruleset.name);
    if (matches.length > 1) throw new Error('Multiple matching rulesets; review the repository settings first.');
    return { ruleset, existing: matches[0] };
  });
  for (const { ruleset, existing } of updates) {
    execFileSync(
      'gh',
      [
        'api',
        '--method',
        existing ? 'PUT' : 'POST',
        existing ? `${endpoint}/${existing.id}` : endpoint,
        '--input',
        '-',
      ],
      { input: JSON.stringify(ruleset), stdio: ['pipe', 'inherit', 'inherit'] },
    );
  }
}
