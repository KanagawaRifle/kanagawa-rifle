import { execFileSync } from 'node:child_process';

const ignored = execFileSync('git', ['ls-files', '-ci', '--exclude-standard', '-z'], { encoding: 'utf8' })
  .split('\0')
  .filter(Boolean);

if (ignored.length) {
  console.error(`Ignored files are tracked by Git:\n${ignored.join('\n')}`);
  process.exitCode = 1;
} else {
  console.log('No ignored files are tracked by Git.');
}
