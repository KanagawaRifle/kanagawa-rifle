import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

import * as yaml from 'js-yaml';

const labels = yaml.load(readFileSync(new URL('../.github/labels.yml', import.meta.url), 'utf8'));
if (
  !Array.isArray(labels) ||
  labels.some(
    (label) =>
      typeof label.name !== 'string' ||
      !label.name ||
      !/^[a-f\d]{6}$/i.test(label.color) ||
      typeof label.description !== 'string',
  )
) {
  throw new Error('Labels must have a name, six-digit color, and description.');
}
// Only an explicitly dispatched workflow or direct CLI invocation applies these changes.
// Existing labels outside this file are preserved.
for (const { name, color, description } of labels) {
  execFileSync('gh', ['label', 'create', name, '--color', color, '--description', description, '--force'], {
    stdio: 'inherit',
  });
}
