// Adapted from OSS; see licenses/oss-MIT.txt.
import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const manifest = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));
let failed = false;
for (const [command, args, expected] of [
  ['node', ['--version'], manifest.volta.node],
  ['npm', ['--version'], manifest.volta.npm],
  ['git', ['--version'], null],
]) {
  const result = spawnSync(command, args, { encoding: 'utf8' });
  const output = result.stdout?.trim();
  const ok = result.status === 0 && (!expected || output?.replace(/^v/, '') === expected);
  console.log(
    `${ok ? 'OK' : 'FAIL'} ${command}: ${output || 'unavailable'}${expected ? ` (expected ${expected})` : ''}`,
  );
  failed ||= !ok;
}
for (const path of ['node_modules', 'packages/website/.env.local']) {
  const ok = existsSync(new URL(`../${path}`, import.meta.url));
  console.log(`${ok ? 'OK' : 'FAIL'} ${path}${ok ? '' : '; run make setup'}`);
  failed ||= !ok;
}
if (process.argv.includes('--docker')) {
  for (const args of [
    ['compose', 'version'],
    ['compose', '--project-directory', 'docker', '-f', 'docker/docker-compose.yml', 'config', '--quiet'],
    ['info', '--format', '{{.ServerVersion}}'],
  ]) {
    const result = spawnSync('docker', args, { cwd: root, encoding: 'utf8' });
    console.log(`${result.status === 0 ? 'OK' : 'FAIL'} docker ${args[0]}`);
    failed ||= result.status !== 0;
  }
}
process.exitCode = failed ? 1 : 0;
