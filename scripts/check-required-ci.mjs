// SPDX-License-Identifier: MIT
import { pathToFileURL } from 'node:url';

export function requiredChecksPass(needs) {
  return ['test', 'browser', 'infrastructure', 'storybook'].every((job) => needs?.[job]?.result === 'success');
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  let results;
  try {
    results = JSON.parse(process.env.RESULTS);
  } catch {
    // Missing or invalid results fail the gate.
  }
  if (!requiredChecksPass(results)) {
    console.error('A required check did not succeed.');
    process.exitCode = 1;
  } else console.log('All required checks passed.');
}
