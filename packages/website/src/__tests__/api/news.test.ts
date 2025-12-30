// packages/website/src/__tests__/api/news.test.ts

import { NextRequest } from 'next/server';
import { describe, it, expect, vi, beforeEach } from 'vitest';

// モック設定
vi.mock('@/lib/news', () => ({
  getAllNewsFiles: vi.fn().mockResolvedValue(['2024-01-15-01.md', '2024-01-14-01.md', '2024-01-13-01.md']),
  parseMarkdownFile: vi.fn().mockImplementation((_path: string, slug: string) =>
    Promise.resolve({
      slug,
      title: `テスト記事 ${slug}`,
      published: new Date('2024-01-15'),
      tags: ['テスト'],
      content: 'テスト本文',
      excerpt: 'テスト抜粋',
    }),
  ),
  getYearFromSlug: vi.fn((slug: string) => slug.substring(0, 4)),
  NEWS_CONTENTS_DIR: '/mock/path',
  CACHE_HEADERS: {
    NO_CACHE: { 'Cache-Control': 'private, no-store, no-cache, must-revalidate' },
    LIST: { 'Cache-Control': 'public, max-age=300, s-maxage=300, stale-while-revalidate=3600' },
    DETAIL: { 'Cache-Control': 'public, max-age=600, s-maxage=600, stale-while-revalidate=3600' },
  },
  isValidSlug: vi.fn((slug: string) => /^\d{4}-\d{2}-\d{2}-\d{2}$/.test(slug)),
  isNodeError: vi.fn((error: unknown) => error instanceof Error && 'code' in error),
}));

vi.mock('@/lib/logger', () => ({
  logger: {
    error: vi.fn(),
    warn: vi.fn(),
    info: vi.fn(),
  },
}));

describe('GET /api/news', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return paginated news with default parameters', async () => {
    const { GET } = await import('@/app/api/news/route');
    const request = new NextRequest('http://localhost/api/news');

    const response = await GET(request);
    const json = await response.json();

    expect(response.status).toBe(200);
    expect(json.data).toBeDefined();
    expect(json.data.pagination.current).toBe(1);
    expect(json.data.pagination.size).toBe(12);
    expect(json.data.data).toHaveLength(3);
  });

  it('should respect custom page and size parameters', async () => {
    const { GET } = await import('@/app/api/news/route');
    const request = new NextRequest('http://localhost/api/news?page=1&size=2');

    const response = await GET(request);
    const json = await response.json();

    expect(response.status).toBe(200);
    expect(json.data.pagination.size).toBe(2);
    expect(json.data.data).toHaveLength(2);
  });

  it('should return 400 for invalid page parameter (less than 1)', async () => {
    const { GET } = await import('@/app/api/news/route');
    const request = new NextRequest('http://localhost/api/news?page=0');

    const response = await GET(request);

    expect(response.status).toBe(400);
    const json = await response.json();
    expect(json.error).toBeDefined();
  });

  it('should return 400 for invalid size parameter (greater than 128)', async () => {
    const { GET } = await import('@/app/api/news/route');
    const request = new NextRequest('http://localhost/api/news?size=200');

    const response = await GET(request);

    expect(response.status).toBe(400);
    const json = await response.json();
    expect(json.error).toBeDefined();
  });

  it('should return 400 for non-numeric page parameter', async () => {
    const { GET } = await import('@/app/api/news/route');
    const request = new NextRequest('http://localhost/api/news?page=abc');

    const response = await GET(request);

    expect(response.status).toBe(400);
  });

  it('should include correct cache headers', async () => {
    const { GET } = await import('@/app/api/news/route');
    const request = new NextRequest('http://localhost/api/news');

    const response = await GET(request);

    expect(response.headers.get('Cache-Control')).toContain('max-age=300');
    expect(response.headers.get('Cache-Control')).toContain('stale-while-revalidate');
  });
});

describe('GET /api/news/[slug]', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return news item for valid slug', async () => {
    const { GET } = await import('@/app/api/news/[slug]/route');
    const request = new NextRequest('http://localhost/api/news/2024-01-15-01');

    const response = await GET(request, { params: Promise.resolve({ slug: '2024-01-15-01' }) });
    const json = await response.json();

    expect(response.status).toBe(200);
    expect(json.data).toBeDefined();
    expect(json.data.slug).toBe('2024-01-15-01');
  });

  it('should return 400 for invalid slug format', async () => {
    const { GET } = await import('@/app/api/news/[slug]/route');
    const request = new NextRequest('http://localhost/api/news/invalid-slug');

    const response = await GET(request, { params: Promise.resolve({ slug: 'invalid-slug' }) });

    expect(response.status).toBe(400);
    const json = await response.json();
    expect(json.error).toBeDefined();
  });

  it('should prevent path traversal attacks', async () => {
    const { GET } = await import('@/app/api/news/[slug]/route');
    const request = new NextRequest('http://localhost/api/news/../../../etc/passwd');

    const response = await GET(request, { params: Promise.resolve({ slug: '../../../etc/passwd' }) });

    expect(response.status).toBe(400);
  });

  it('should include correct cache headers for detail', async () => {
    const { GET } = await import('@/app/api/news/[slug]/route');
    const request = new NextRequest('http://localhost/api/news/2024-01-15-01');

    const response = await GET(request, { params: Promise.resolve({ slug: '2024-01-15-01' }) });

    expect(response.headers.get('Cache-Control')).toContain('max-age=600');
  });
});
