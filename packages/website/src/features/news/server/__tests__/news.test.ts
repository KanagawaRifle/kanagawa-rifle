import { promises as fs } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { createNewsRepository } from '../news';

type Repository = ReturnType<typeof createNewsRepository>;

describe('news repository with filesystem fixtures', () => {
  let workspace: string;
  let root: string;
  let news: Repository;

  async function writeArticle(slug: string, title = slug): Promise<void> {
    const year = join(root, slug.slice(0, 4));
    await fs.mkdir(year, { recursive: true });
    await fs.writeFile(
      join(year, `${slug}.md`),
      `---\ntitle: '${title}'\npublished: '${slug.slice(0, 10)}'\nupdated: '2026-01-01'\ntags: ['大会']\n---\n\n本文 ${title}\n`,
    );
  }

  beforeEach(async () => {
    workspace = await fs.mkdtemp(join(tmpdir(), 'kanagawa-news-'));
    root = join(workspace, 'src', 'contents', 'news');
    await fs.mkdir(root, { recursive: true });
    news = createNewsRepository(root);
  });

  afterEach(async () => {
    vi.restoreAllMocks();
    await fs.rm(workspace, { recursive: true, force: true });
  });

  it('enumerates and reads all articles beyond the HTTP limit', async () => {
    const slugs = Array.from({ length: 130 }, (_, index) => {
      const day = String(Math.floor(index / 99) + 1).padStart(2, '0');
      const sequence = String((index % 99) + 1).padStart(2, '0');
      return `2024-01-${day}-${sequence}`;
    });
    await Promise.all(slugs.map((slug) => writeArticle(slug)));
    const expected = [...slugs].sort((a, b) => b.localeCompare(a));
    expect(await news.getNewsSlugs()).toEqual(expected);
    expect((await news.getAllNews()).map((article) => article.slug)).toEqual(expected);
    const page = await news.getNewsList({ page: 2, size: 128 });
    expect(page.data.map((article) => article.slug)).toEqual(expected.slice(128));
    expect(page.pagination).toEqual({
      current: 2,
      size: 128,
      total: 130,
      totalPages: 2,
      hasNext: false,
      hasPrev: true,
    });
  });

  it('sorts across years, paginates and keeps article bodies out of lists', async () => {
    await writeArticle('2023-12-31-01');
    await writeArticle('2024-01-15-01');
    await writeArticle('2024-01-16-01');
    const page = await news.getNewsList({ page: 2, size: 1 });
    expect(page.data).toMatchObject([{ slug: '2024-01-15-01', tags: ['大会'] }]);
    expect(page.data[0]).not.toHaveProperty('content');
    expect(page.data[0]?.published).toEqual(new Date('2024-01-15'));
    expect(page.pagination).toEqual({ current: 2, size: 1, total: 3, totalPages: 3, hasNext: true, hasPrev: true });
    expect((await news.getNewsItem('2024-01-15-01'))?.content).toBe('本文 2024-01-15-01');
    expect((await news.getNewsItem('2024-01-15-01'))?.updated).toEqual(new Date('2026-01-01'));
    expect((await news.getNewsList({ page: 4, size: 1 })).data).toEqual([]);
  });

  it('keeps metadata-only inventories and content roots independent', async () => {
    await writeArticle('2024-01-15-01');
    const summaries = await news.getAllNewsSummaries();
    expect(summaries).toHaveLength(1);
    expect(summaries[0]).not.toHaveProperty('content');
    expect(summaries[0]?.updated).toEqual(new Date('2026-01-01'));
    const otherRoot = join(workspace, 'other-news');
    await fs.mkdir(otherRoot);
    const other = createNewsRepository(otherRoot);
    expect(await other.getAllNewsSummaries()).toEqual([]);
    expect(await news.getNewsSlugs()).toEqual(['2024-01-15-01']);
  });

  it('reads additions, edits and removals immediately', async () => {
    await writeArticle('2024-01-15-01', '初版');
    expect(await news.getNewsSlugs()).toEqual(['2024-01-15-01']);
    expect((await news.getNewsItem('2024-01-15-01'))?.title).toBe('初版');

    await writeArticle('2024-01-15-01', '改訂');
    await writeArticle('2025-01-15-01', '追加');
    expect(await news.getNewsSlugs()).toEqual(['2025-01-15-01', '2024-01-15-01']);
    expect((await news.getNewsItem('2024-01-15-01'))?.content).toBe('本文 改訂');
    expect((await news.getNewsList({ page: 1, size: 12 })).data.map((article) => article.title)).toEqual([
      '追加',
      '改訂',
    ]);

    await fs.unlink(join(root, '2024', '2024-01-15-01.md'));
    expect(await news.getNewsSlugs()).toEqual(['2025-01-15-01']);
    expect(await news.getNewsItem('2024-01-15-01')).toBeNull();
    expect((await news.getNewsList({ page: 1, size: 12 })).pagination.total).toBe(1);
  });

  it('links adjacent articles across years and handles either end and missing articles', async () => {
    const newer = '2026-01-01-01';
    const current = '2025-12-31-02';
    const older = '2025-12-31-01';
    await Promise.all([newer, current, older].map((slug) => writeArticle(slug)));
    expect(await news.getNewsNavigation(current)).toMatchObject({ newer: { slug: newer }, older: { slug: older } });
    expect(await news.getNewsNavigation(newer)).toMatchObject({ newer: undefined, older: { slug: current } });
    expect(await news.getNewsNavigation(older)).toMatchObject({ newer: { slug: current }, older: undefined });
    expect(await news.getNewsNavigation('2025-12-30-01')).toEqual({});
    expect(await news.getNewsNavigation('../2025-12-31-01')).toEqual({});
    await fs.unlink(join(root, '2025', `${current}.md`));
    expect(await news.getNewsNavigation(newer)).toMatchObject({ older: { slug: older } });
  });

  it('limits the update feed to twenty recent full articles in the listing order', async () => {
    const slugs = Array.from({ length: 21 }, (_, index) => `2025-01-${String(index + 1).padStart(2, '0')}-01`);
    await Promise.all(slugs.map((slug) => writeArticle(slug)));
    const articles = await news.getNewsFeedItems();
    expect(articles).toHaveLength(20);
    expect(articles.map((article) => article.slug)).toEqual([...slugs].reverse().slice(0, 20));
    expect(articles[0]?.content).toContain('本文');
  });

  it('returns empty results for an existing empty root and empty year directories', async () => {
    expect(await news.getNewsSlugs()).toEqual([]);
    await fs.mkdir(join(root, '2024'));
    expect(await news.getAllNews()).toEqual([]);
    expect(await news.getNewsList({ page: 1, size: 12 })).toEqual({
      data: [],
      pagination: { current: 1, size: 12, total: 0, totalPages: 0, hasNext: false, hasPrev: false },
    });
    expect(await news.getNewsItem('2024-01-15-01')).toBeNull();
    expect(await news.getNewsItem('2023-01-15-01')).toBeNull();
  });

  it('rejects invalid slugs without filesystem access', async () => {
    const read = vi.spyOn(fs, 'readdir');
    for (const slug of ['../2024-01-15-01', '2024-01-15-01.md', '', 'invalid']) {
      expect(await news.getNewsItem(slug)).toBeNull();
    }
    expect(read).not.toHaveBeenCalled();
  });

  it('propagates a missing content root for both list and detail readers', async () => {
    await fs.rm(root, { recursive: true });
    await expect(news.getNewsSlugs()).rejects.toMatchObject({ code: 'ENOENT' });
    await expect(news.getNewsItem('2024-01-15-01')).rejects.toMatchObject({ code: 'ENOENT' });
    await expect(news.getNewsList({ page: 1, size: 12 })).rejects.toMatchObject({ code: 'ENOENT' });
    await expect(news.getAllNews()).rejects.toMatchObject({ code: 'ENOENT' });
  });

  it('propagates root permission errors', async () => {
    const failure = Object.assign(new Error('Permission denied'), { code: 'EACCES' });
    vi.spyOn(fs, 'readdir').mockRejectedValue(failure);
    await expect(news.getNewsSlugs()).rejects.toBe(failure);
    await expect(news.getNewsItem('2024-01-15-01')).rejects.toBe(failure);
  });

  it.each(['EACCES', 'EIO', 'ENOENT'])('propagates year directory failure %s', async (code) => {
    await writeArticle('2024-01-15-01');
    const failure = Object.assign(new Error('Year directory read failed'), { code });
    const readDirectory = fs.readdir.bind(fs);
    vi.spyOn(fs, 'readdir').mockImplementation((...args: Parameters<typeof fs.readdir>) => {
      if (String(args[0]) === join(root, '2024')) return Promise.reject(failure);
      return readDirectory(...args);
    });
    await expect(news.getNewsSlugs()).rejects.toBe(failure);
    await expect(news.getNewsItem('2024-01-15-01')).rejects.toBe(failure);
  });

  it.each(['EACCES', 'EIO'])('propagates article read failure %s', async (code) => {
    await writeArticle('2024-01-15-01');
    const failure = Object.assign(new Error('Article read failed'), { code });
    vi.spyOn(fs, 'readFile').mockRejectedValue(failure);
    await expect(news.getNewsItem('2024-01-15-01')).rejects.toBe(failure);
    await expect(news.getNewsList({ page: 1, size: 12 })).rejects.toBe(failure);
    await expect(news.getAllNews()).rejects.toBe(failure);
  });

  it.each([
    "published: '2024-01-15'",
    "title: '記事'\npublished: invalid",
    "title: '記事'\npublished: null",
    "title: '記事'\npublished: '2024-02-30'",
    "title: '記事'\npublished: '2024-01-15'\ntags: invalid",
  ])('rejects malformed front matter: %s', async (metadata) => {
    await writeArticle('2024-01-15-01');
    await fs.writeFile(join(root, '2024', '2024-01-15-01.md'), `---\n${metadata}\n---\n本文`);
    await expect(news.getNewsItem('2024-01-15-01')).rejects.toThrow();
    await expect(news.getNewsList({ page: 1, size: 12 })).rejects.toThrow();
    await expect(news.getAllNews()).rejects.toThrow();
  });

  describe.each(['published', 'updated'])('unquoted %s metadata', (field) => {
    it.each(['2024-02-30', '2024-13-01', '2024-02-30T00:00:00Z', '2024-13-01T00:00:00Z'])(
      'rejects invalid date %s before YAML can normalize it',
      async (value) => {
        await writeArticle('2024-01-15-01');
        const dates = { published: '2024-01-15', updated: '2024-01-16', [field]: value };
        await fs.writeFile(
          join(root, '2024', '2024-01-15-01.md'),
          `---\ntitle: 記事\npublished: ${dates.published}\nupdated: ${dates.updated}\n---\n本文`,
        );
        await expect(news.getNewsItem('2024-01-15-01')).rejects.toThrow();
        await expect(news.getNewsList({ page: 1, size: 12 })).rejects.toThrow();
        await expect(news.getAllNews()).rejects.toThrow();
      },
    );

    it.each([
      ['2024-02-29', '2024-02-29T00:00:00.000Z'],
      ['2024-02-29T09:00:00+09:00', '2024-02-29T00:00:00.000Z'],
      ['2024-02-29T10:30:00.123Z', '2024-02-29T10:30:00.123Z'],
    ])('accepts valid date or timestamp %s without changing its instant', async (value, iso) => {
      await writeArticle('2024-01-15-01');
      const dates = { published: '2024-01-15', updated: '2024-01-16', [field]: value };
      await fs.writeFile(
        join(root, '2024', '2024-01-15-01.md'),
        `---\ntitle: 記事\npublished: ${dates.published}\nupdated: ${dates.updated}\n---\n本文`,
      );
      const article = await news.getNewsItem('2024-01-15-01');
      expect(article?.[field as 'published' | 'updated']?.toISOString()).toBe(iso);
      const list = await news.getNewsList({ page: 1, size: 12 });
      expect(list.data[0]?.[field as 'published' | 'updated']?.toISOString()).toBe(iso);
    });
  });

  it.each(['drafts/2024-01-15-01.md', '2023/2024-01-15-01.md', '2024/invalid.md'])(
    'rejects malformed article path %s',
    async (path) => {
      const [year] = path.split('/');
      await fs.mkdir(join(root, year!));
      await fs.writeFile(join(root, path), '---\ntitle: 記事\npublished: 2024-01-15\n---');
      await expect(news.getNewsSlugs()).rejects.toThrow(/Invalid news/);
    },
  );

  it('rejects article symlinks outside the content tree', async () => {
    await fs.mkdir(join(root, '2024'));
    await fs.writeFile(join(workspace, 'outside.md'), 'private');
    await fs.symlink(join(workspace, 'outside.md'), join(root, '2024', '2024-01-15-01.md'));
    await expect(news.getNewsSlugs()).rejects.toThrow('Invalid news article path');
    await expect(news.getNewsItem('2024-01-15-01')).rejects.toThrow('Invalid news article path');
  });
});
