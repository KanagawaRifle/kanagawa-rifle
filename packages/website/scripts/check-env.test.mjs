import assert from 'node:assert/strict';
import { test } from 'node:test';

import { checkEnvironment, environmentReferences } from './check-env.mjs';

test('finds static environment reads without treating comments and strings as accesses', () => {
  assert.deepEqual(
    environmentReferences(
      `// process.env.COMMENT\nconst text = 'process.env.TEXT'; const a = process.env.ONE; const b = process.env['TWO'];`,
    ),
    ['ONE', 'TWO'],
  );
  assert.throws(() => environmentReferences('process.env[name]'), /must be static/);
});

test('checks optional declarations and wildcard cache inputs, including runtime credentials', () => {
  const names = ['NEXT_PUBLIC_URL', 'BASIC_AUTH_ID', 'NODE_ENV'];
  const sample = '# NEXT_PUBLIC_URL=http://localhost:3000\nBASIC_AUTH_ID=\n';
  const turbo = {
    tasks: {
      build: { env: ['NEXT_PUBLIC_*'] },
      dev: { env: ['NEXT_PUBLIC_*', 'BASIC_AUTH_*'] },
      start: { env: ['NEXT_PUBLIC_*', 'BASIC_AUTH_*'] },
    },
  };
  assert.deepEqual(checkEnvironment(names, sample, turbo), []);
  assert.deepEqual(checkEnvironment(names, '', turbo), [
    '.env.example: missing NEXT_PUBLIC_URL',
    '.env.example: missing BASIC_AUTH_ID',
  ]);
  delete turbo.tasks.start;
  assert.deepEqual(checkEnvironment(names, sample, turbo), [
    'turbo start: missing NEXT_PUBLIC_URL',
    'turbo start: missing BASIC_AUTH_ID',
  ]);
});
