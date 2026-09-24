import { readdir } from 'node:fs/promises';
import { join } from 'node:path';

import { describe, expect, it } from 'vitest';

import { getAllNews, getNewsSlugs } from '../news';

describe('published news content', () => {
  it('validates every Markdown article and enumerates the complete filesystem inventory', async () => {
    const root = join(process.cwd(), 'src', 'contents', 'news');
    const paths = await readdir(root, { recursive: true });
    const markdownPaths = paths.filter((path) => path.endsWith('.md'));
    // Keep the migration inventory as a minimum while allowing new articles.
    expect(markdownPaths.length).toBeGreaterThanOrEqual(344);
    const expectedSlugs = markdownPaths
      .map((path) => {
        expect(path).toMatch(/^\d{4}\/\d{4}-\d{2}-\d{2}-\d{2}\.md$/);
        const [year, file] = path.split('/');
        expect(file?.startsWith(`${year}-`)).toBe(true);
        return file!.slice(0, -3);
      })
      .sort((a, b) => b.localeCompare(a));

    const slugs = await getNewsSlugs();
    expect(slugs).toEqual(expectedSlugs);
    expect(new Set(slugs).size).toBe(markdownPaths.length);
    const articles = await getAllNews();
    expect(articles.map((article) => article.slug)).toEqual(expectedSlugs);
    for (const article of articles) {
      expect(article.title.trim(), article.slug).not.toBe('');
      expect(article.content.trim(), article.slug).not.toBe('');
      expect(Number.isFinite(article.published.getTime()), article.slug).toBe(true);
      if (article.updated) expect(Number.isFinite(article.updated.getTime()), article.slug).toBe(true);
    }
  });
});
