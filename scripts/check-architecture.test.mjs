import assert from 'node:assert/strict';
import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { test } from 'node:test';

import { checkArchitecture } from './check-architecture.mjs';

async function check(files) {
  const directory = await mkdtemp(join(tmpdir(), 'kanagawa-architecture-'));
  try {
    const source = join(directory, 'src');
    for (const [file, content] of Object.entries(files)) {
      const path = join(source, file);
      await mkdir(dirname(path), { recursive: true });
      await writeFile(path, content);
    }
    const config = join(directory, 'tsconfig.json');
    await writeFile(config, JSON.stringify({ compilerOptions: { baseUrl: '.', paths: { '@/*': ['src/*'] } } }));
    return (await checkArchitecture(source, config)).violations;
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
}

test('allows route composition, shared dependencies and type-only server imports', async () => {
  assert.deepEqual(
    await check({
      'app/page.tsx': "import { article } from '@/features/news/server'; export default article;",
      'features/news/server.ts':
        "import 'server-only'; import { value } from '@/lib/value'; export const article = value; export type Article = string;",
      'features/news/Controls.tsx':
        "'use client'; import type { Article } from './server'; export const show = (article: Article) => article;",
      'lib/value.ts': "export const value = 'article';",
    }),
    [],
  );
});

test('rejects reversed layer dependencies and cross-feature imports', async () => {
  const violations = await check({
    'app/page.ts': 'export const value = 1;',
    'lib/shared.ts': "export { value } from '@/features/news/model';",
    'features/news/model.ts': "export { value } from '@/app/page';",
    'features/competitions/model.ts': "export { value } from '../news/model';",
  });
  assert.equal(violations.length, 3);
  assert(violations.some((message) => message.startsWith('Route dependency:')));
  assert(violations.some((message) => message.startsWith('Shared module')));
  assert(violations.some((message) => message.startsWith('Cross-feature')));
});

test('detects a server import hidden behind an intermediate module', async () => {
  const violations = await check({
    'features/news/Controls.tsx': "'use client'; import { article } from './index'; export const value = article;",
    'features/news/index.ts': "export { article } from './server';",
    'features/news/server.ts': "import 'server-only'; export const article = 'private';",
  });
  assert.equal(violations.length, 1);
  assert.match(violations[0], /Controls.tsx -> features\/news\/index.ts -> features\/news\/server.ts/);
});

test('fails circular runtime dependencies', async () => {
  const violations = await check({
    'lib/a.ts': "import { b } from './b'; export const a = () => b();",
    'lib/b.ts': "import { a } from './a'; export const b = () => a();",
  });
  assert.equal(violations.length, 1);
  assert.match(violations[0], /^Circular import:/);
});

test('keeps configuration, shared logic and feature data independent of UI', async () => {
  const violations = await check({
    'components/View.tsx': 'export const View = () => null;',
    'lib/parser.ts': "export { View } from '@/components/View';",
    'config/settings.ts': "export { View } from '@/lib/parser';",
    'features/news/components/Article.tsx': 'export const Article = () => null;',
    'features/news/server/news.ts': "export { Article } from '../components/Article';",
    'features/membership/fees.ts': "export { View } from '@/components/View';",
  });
  assert.equal(violations.length, 4);
  assert(violations.some((message) => message.startsWith('Non-UI module depends on UI:')));
  assert(violations.some((message) => message.startsWith('Configuration depends on behavior:')));
  assert.equal(violations.filter((message) => message.startsWith('Feature data depends on UI:')).length, 2);
});

test('allows server rendering to compose shared parsing and presentation', async () => {
  assert.deepEqual(
    await check({
      'app/news/page.tsx': "export { Article as default } from '@/features/news/components/Article';",
      'features/news/components/Article.tsx': "export { Markdown as Article } from '@/components/Markdown';",
      'components/Markdown.tsx': "import { parse } from '@/lib/markdown'; export const Markdown = () => parse('body');",
      'lib/markdown.ts': "import 'server-only'; export const parse = (source: string) => source;",
    }),
    [],
  );
});
