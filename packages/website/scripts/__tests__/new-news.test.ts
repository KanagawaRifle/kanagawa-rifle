import { mkdtemp, readFile, readdir, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import matter from 'gray-matter';
import { afterEach, describe, expect, it } from 'vitest';

import { FrontMatterSchema } from '../../src/features/news/schema';
import { createNews } from '../new-news';

const roots: string[] = [];
async function fixture() {
  const root = await mkdtemp(join(tmpdir(), 'kanagawa-news-template-'));
  roots.push(root);
  return root;
}
afterEach(async () => {
  await Promise.all(roots.splice(0).map((root) => rm(root, { recursive: true, force: true })));
});

describe('news template', () => {
  it('creates schema-valid metadata and preserves existing files during concurrent creation', async () => {
    const root = await fixture();
    const title = '大会: "案内"\n次の行';
    const first = await createNews(root, title, '2026-09-24');
    const original = await readFile(first, 'utf8');
    const rest = await Promise.all(Array.from({ length: 3 }, () => createNews(root, title, '2026-09-24')));
    expect(new Set([first, ...rest]).size).toBe(4);
    expect(await readFile(first, 'utf8')).toBe(original);
    expect(FrontMatterSchema.parse(matter(original).data).title).toBe(title);
    expect((await readdir(join(root, '2026'))).sort()).toEqual([
      '2026-09-24-01.md',
      '2026-09-24-02.md',
      '2026-09-24-03.md',
      '2026-09-24-04.md',
    ]);
  });

  it.each(['../../escape', '2026-02-30', '2026-1-01'])('rejects an invalid date before writing: %s', async (date) => {
    const root = await fixture();
    await expect(createNews(root, '記事', date)).rejects.toThrow();
    expect(await readdir(root)).toEqual([]);
  });

  it('rejects an empty title before writing', async () => {
    const root = await fixture();
    await expect(createNews(root, '  ', '2026-09-24')).rejects.toThrow();
    expect(await readdir(root)).toEqual([]);
  });
});
