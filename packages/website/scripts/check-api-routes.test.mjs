import assert from 'node:assert/strict';
import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';

import { checkApiRoutes, routeOperations } from './check-api-routes.mjs';

test('understands route groups, parameters and exported handlers while ignoring comments', () => {
  assert.deepEqual(
    routeOperations(
      'api/(public)/news/[slug]/route.ts',
      '// export function DELETE() {}\nexport async function GET() {}\nexport const POST = handler;',
    ),
    ['get /api/news/{slug}', 'post /api/news/{slug}'],
  );
  assert.throws(() => routeOperations('api/news/route.ts', 'const GET = handler'), /No explicit HTTP method/);
});

test('fails for undocumented operations and removed routes', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'website-api-'));
  try {
    await mkdir(join(directory, 'news'));
    await writeFile(join(directory, 'news/route.ts'), 'export async function GET() {}');
    assert.equal(await checkApiRoutes(directory, { paths: { '/api/news': { get: {} } } }), 1);
    await assert.rejects(
      checkApiRoutes(directory, { paths: { '/api/old': { get: {} } } }),
      /Missing: get \/api\/news; stale: get \/api\/old/,
    );
  } finally {
    await rm(directory, { recursive: true });
  }
});
