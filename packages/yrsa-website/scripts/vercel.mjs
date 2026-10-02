import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const task = process.argv[2];
if (!['install', 'build'].includes(task)) {
  throw new Error('Expected install or build');
}

const root = fileURLToPath(new URL('../../../', import.meta.url));
const upstream = resolve(root, '../oss');
const environment = { ...process.env, CI: 'true', HUSKY: '0' };

function run(command, arguments_, cwd) {
  const result = spawnSync(command, arguments_, {
    cwd,
    env: environment,
    stdio: 'inherit',
  });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
}

if (task === 'install' && !existsSync(upstream)) {
  run('git', ['clone', '--depth', '1', '--branch', '1.x', 'https://github.com/sasakiuri/oss.git', upstream], root);
}

console.log('Shared tooling revision:');
run('git', ['rev-parse', 'HEAD'], upstream);

const node = readFileSync(resolve(upstream, '.nvmrc'), 'utf8').trim();
const npm = JSON.parse(readFileSync(resolve(upstream, 'package.json'), 'utf8')).volta.npm;
const runtime = ['--yes', `--package=node@${node}`, `--package=npm@${npm}`, '--'];

if (task === 'install') {
  run('npx', [...runtime, 'npm', 'ci', '--ignore-scripts'], upstream);
  run('npx', [...runtime, 'node', resolve(upstream, 'packages/repo-tooling/cli.mjs'), 'install', '--ci'], root);
} else {
  run('npx', [...runtime, 'npm', 'run', 'build', '-w', '@acme/yrsa.website'], root);
}
