// packages/website/src/app/api/news/[slug]/__tests__/route.test.ts

import { NextRequest } from 'next/server';
import { describe, expect, it } from 'vitest';

import { GET } from '../route';

/**
 * API Route /api/news/[slug] のテスト
 *
 * 注意: このテストは実際のファイルシステムを使用しています。
 * セキュリティ関連のテスト（slug 検証）は独立してテスト可能です。
 */
describe('GET /api/news/[slug]', () => {
  describe('Slug validation (security)', () => {
    it('should return 400 for invalid slug format', async () => {
      const request = new NextRequest('http://localhost/api/news/invalid-slug');
      const response = await GET(request, { params: Promise.resolve({ slug: 'invalid-slug' }) });
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error.code).toBe('INVALID_NEWS_SLUG');
    });

    it('should return 400 for path traversal attempt', async () => {
      const request = new NextRequest('http://localhost/api/news/../../../etc/passwd');
      const response = await GET(request, { params: Promise.resolve({ slug: '../../../etc/passwd' }) });
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error.code).toBe('INVALID_NEWS_SLUG');
    });

    it('should return 400 for empty slug', async () => {
      const request = new NextRequest('http://localhost/api/news/');
      const response = await GET(request, { params: Promise.resolve({ slug: '' }) });
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error.code).toBe('INVALID_NEWS_SLUG');
    });

    it('should return 400 for slug with only year', async () => {
      const response = await GET(new NextRequest('http://localhost/api/news/2024'), {
        params: Promise.resolve({ slug: '2024' }),
      });
      expect(response.status).toBe(400);
    });

    it('should return 400 for slug with missing sequence number', async () => {
      const response = await GET(new NextRequest('http://localhost/api/news/2024-01-01'), {
        params: Promise.resolve({ slug: '2024-01-01' }),
      });
      expect(response.status).toBe(400);
    });

    it('should return 400 for slug with 3-digit sequence number', async () => {
      const response = await GET(new NextRequest('http://localhost/api/news/2024-01-01-001'), {
        params: Promise.resolve({ slug: '2024-01-01-001' }),
      });
      expect(response.status).toBe(400);
    });

    it('should return 400 for slug with non-numeric year', async () => {
      const response = await GET(new NextRequest('http://localhost/api/news/abcd-01-01-01'), {
        params: Promise.resolve({ slug: 'abcd-01-01-01' }),
      });
      expect(response.status).toBe(400);
    });

    it('should return 400 for slug with single-digit month/day', async () => {
      const response = await GET(new NextRequest('http://localhost/api/news/2024-1-1-01'), {
        params: Promise.resolve({ slug: '2024-1-1-01' }),
      });
      expect(response.status).toBe(400);
    });
  });

  describe('Non-existent news', () => {
    it('should return 404 for non-existent news item with valid format', async () => {
      // 有効なフォーマットだが存在しない記事
      const response = await GET(new NextRequest('http://localhost/api/news/1999-01-01-99'), {
        params: Promise.resolve({ slug: '1999-01-01-99' }),
      });
      const data = await response.json();

      expect(response.status).toBe(404);
      expect(data.error.code).toBe('NEWS_NOT_FOUND');
    });
  });

  describe('Success cases', () => {
    it('should return news item for existing valid slug', async () => {
      // 実際に存在する記事をテスト（最新の記事を使用）
      const response = await GET(new NextRequest('http://localhost/api/news/2025-12-21-01'), {
        params: Promise.resolve({ slug: '2025-12-21-01' }),
      });
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.data.slug).toBe('2025-12-21-01');
      expect(data.data.title).toBe('「第6回秋季神奈川オープン大会」成績表について');
      expect(data.data.content).toContain('成績表（PDF）');
      expect(data.data.published).toBe('2025-12-21T00:00:00.000Z');
    });
  });

  describe('Cache headers', () => {
    it('should include cache headers for successful response', async () => {
      // 実際に存在する記事を使用
      const response = await GET(new NextRequest('http://localhost/api/news/2025-12-09-01'), {
        params: Promise.resolve({ slug: '2025-12-09-01' }),
      });

      expect(response.status).toBe(200);
      expect(response.headers.get('Cache-Control')).toBe(
        'public, max-age=600, s-maxage=600, stale-while-revalidate=3600',
      );
    });

    it('should include no-cache headers for error response', async () => {
      // 存在しない記事
      const response = await GET(new NextRequest('http://localhost/api/news/1999-01-01-99'), {
        params: Promise.resolve({ slug: '1999-01-01-99' }),
      });

      expect(response.status).toBe(404);
      const cacheControl = response.headers.get('Cache-Control');
      // エラーレスポンスにはキャッシュ禁止ヘッダーが設定される
      expect(cacheControl).toBe('private, no-store, no-cache, must-revalidate');
    });
  });
});
