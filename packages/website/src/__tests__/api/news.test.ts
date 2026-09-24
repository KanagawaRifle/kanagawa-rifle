import { NextRequest } from 'next/server';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { GET as getDetail } from '@/app/api/news/[slug]/route';
import { GET as getList } from '@/app/api/news/route';
import { FrontMatterSchema } from '@/features/news/schema';
import { CACHE_HEADERS } from '@/features/news/server/http';
import { getNewsItem, getNewsList } from '@/features/news/server/news';
import type { NewsItem, NewsSummary } from '@/features/news/types';
import type { Paginated } from '@/lib/pagination';

vi.mock('@/features/news/server/news', () => ({
  getNewsList: vi.fn(),
  getNewsItem: vi.fn(),
}));

vi.mock('@/lib/logger', () => ({
  logger: { error: vi.fn(), warn: vi.fn(), info: vi.fn() },
}));

const article: NewsItem = {
  slug: '2024-01-15-01',
  title: 'テスト記事',
  published: new Date('2024-01-15'),
  updated: new Date('2024-01-16'),
  tags: ['テスト'],
  content: 'テスト本文',
  excerpt: 'テスト抜粋',
};
const listing: Paginated<NewsSummary> = {
  data: [
    {
      slug: article.slug,
      title: article.title,
      published: article.published,
      updated: article.updated,
      tags: article.tags,
      excerpt: article.excerpt,
    },
  ],
  pagination: { current: 1, size: 12, total: 1, totalPages: 1, hasNext: false, hasPrev: false },
};

beforeEach(() => {
  vi.resetAllMocks();
  vi.mocked(getNewsList).mockResolvedValue(listing);
  vi.mocked(getNewsItem).mockResolvedValue(article);
});

describe('GET /api/news', () => {
  it('preserves the response envelope, default pagination, empty list bodies and ISO dates', async () => {
    const response = await getList(new NextRequest('http://localhost/api/news'));
    expect(response.status).toBe(200);
    expect(getNewsList).toHaveBeenCalledWith({ page: 1, size: 12 });
    expect(await response.json()).toEqual({
      data: {
        ...listing,
        data: [{ ...article, content: '', published: '2024-01-15T00:00:00.000Z', updated: '2024-01-16T00:00:00.000Z' }],
      },
    });
    expect(response.headers.get('Cache-Control')).toBe(CACHE_HEADERS.LIST['Cache-Control']);
  });

  it('passes custom page and size to the repository', async () => {
    const response = await getList(new NextRequest('http://localhost/api/news?page=2&size=2'));
    expect(response.status).toBe(200);
    expect(getNewsList).toHaveBeenCalledWith({ page: 2, size: 2 });
  });

  it.each(['page=0', 'page=-1', 'page=abc', 'page=1.5', 'size=0', 'size=129'])(
    'returns uncached 400 for invalid query %s',
    async (query) => {
      const response = await getList(new NextRequest(`http://localhost/api/news?${query}`));
      expect(response.status).toBe(400);
      expect(await response.json()).toMatchObject({ data: null, error: { code: 'VALIDATION_ERROR', status: 400 } });
      expect(response.headers.get('Cache-Control')).toBe(CACHE_HEADERS.NO_CACHE['Cache-Control']);
      expect(getNewsList).not.toHaveBeenCalled();
    },
  );

  it.each(['ENOENT', 'EACCES', 'EIO'])('returns uncached 500 for repository failure %s', async (code) => {
    vi.mocked(getNewsList).mockRejectedValue(Object.assign(new Error('Directory read failed'), { code }));
    const response = await getList(new NextRequest('http://localhost/api/news'));
    expect(response.status).toBe(500);
    expect(await response.json()).toMatchObject({ data: null, error: { code: 'INTERNAL_SERVER', status: 500 } });
    expect(response.headers.get('Cache-Control')).toBe(CACHE_HEADERS.NO_CACHE['Cache-Control']);
  });
});

describe('news API failure boundary', () => {
  it.each([new Error('/private/content/read-failed.md'), 'unexpected failure', null])(
    'handles unknown thrown values without exposing internal diagnostics',
    async (cause) => {
      vi.mocked(getNewsList).mockRejectedValue(cause);
      const response = await getList(new NextRequest('http://localhost/api/news'));
      expect(await response.json()).toEqual({
        data: null,
        error: { status: 500, code: 'INTERNAL_SERVER', message: 'API Error: Internal server error' },
      });
      expect(response.status).toBe(500);
      expect(response.headers.get('Cache-Control')).toBe(CACHE_HEADERS.NO_CACHE['Cache-Control']);
    },
  );

  it('omits optional update dates when serializing an article', async () => {
    vi.mocked(getNewsItem).mockResolvedValue({ ...article, updated: undefined });
    const response = await getDetail(new NextRequest('http://localhost/api/news/2024-01-15-01'), {
      params: Promise.resolve({ slug: article.slug }),
    });
    expect((await response.json()).data).not.toHaveProperty('updated');
  });
});

describe('GET /api/news/[slug]', () => {
  const request = new NextRequest('http://localhost/api/news/2024-01-15-01');
  const params = { params: Promise.resolve({ slug: '2024-01-15-01' }) };

  it('preserves full article content, the response envelope and ISO dates', async () => {
    const response = await getDetail(request, params);
    expect(response.status).toBe(200);
    expect(getNewsItem).toHaveBeenCalledWith('2024-01-15-01');
    expect(await response.json()).toEqual({
      data: { ...article, published: '2024-01-15T00:00:00.000Z', updated: '2024-01-16T00:00:00.000Z' },
    });
    expect(response.headers.get('Cache-Control')).toBe(CACHE_HEADERS.DETAIL['Cache-Control']);
  });

  it.each(['invalid-slug', '../../../etc/passwd', '', '2024-01-15-01.md'])(
    'returns uncached 400 for invalid slug %s',
    async (slug) => {
      const response = await getDetail(request, { params: Promise.resolve({ slug }) });
      expect(response.status).toBe(400);
      expect(await response.json()).toEqual({
        data: null,
        error: { message: 'Invalid slug parameter', code: 'INVALID_NEWS_SLUG', status: 400 },
      });
      expect(response.headers.get('Cache-Control')).toBe(CACHE_HEADERS.NO_CACHE['Cache-Control']);
      expect(getNewsItem).not.toHaveBeenCalled();
    },
  );

  it('returns uncached 404 only for an absent article', async () => {
    vi.mocked(getNewsItem).mockResolvedValue(null);
    const response = await getDetail(request, params);
    expect(response.status).toBe(404);
    expect(await response.json()).toEqual({
      data: null,
      error: { message: 'News with slug "2024-01-15-01" not found', code: 'NEWS_NOT_FOUND', status: 404 },
    });
    expect(response.headers.get('Cache-Control')).toBe(CACHE_HEADERS.NO_CACHE['Cache-Control']);
  });

  it.each(['ENOENT', 'EACCES', 'EIO'])('returns uncached 500 for repository failure %s', async (code) => {
    vi.mocked(getNewsItem).mockRejectedValue(Object.assign(new Error('Content root read failed'), { code }));
    const response = await getDetail(request, params);
    expect(response.status).toBe(500);
    expect(await response.json()).toMatchObject({ data: null, error: { code: 'INTERNAL_SERVER', status: 500 } });
    expect(response.headers.get('Cache-Control')).toBe(CACHE_HEADERS.NO_CACHE['Cache-Control']);
  });

  it('returns the existing article-format error for invalid front matter', async () => {
    const result = FrontMatterSchema.safeParse({});
    if (result.success) throw new Error('Expected invalid metadata fixture');
    vi.mocked(getNewsItem).mockRejectedValue(result.error);
    const response = await getDetail(request, params);
    expect(response.status).toBe(500);
    expect(await response.json()).toEqual({
      data: null,
      error: { message: 'API Error: Invalid article format', code: 'INTERNAL_SERVER', status: 500 },
    });
    expect(response.headers.get('Cache-Control')).toBe(CACHE_HEADERS.NO_CACHE['Cache-Control']);
  });
});
