// packages/website/src/app/api/news/__tests__/route.test.ts

import { NextRequest } from 'next/server';
import { describe, expect, it } from 'vitest';

import { GET } from '../route';

/**
 * API Route のテスト
 *
 * 注意: このテストは実際のファイルシステムを使用しています。
 * モックを使用すると Vitest のモジュール解決との相性問題が発生するため、
 * 実際のコンテンツディレクトリを使用してテストしています。
 */
describe('GET /api/news', () => {
  describe('Validation', () => {
    it('should return 400 for invalid page number (page=0)', async () => {
      const request = new NextRequest('http://localhost/api/news?page=0');
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error.code).toBe('VALIDATION_ERROR');
      expect(data.error.message).toContain('Page number must be greater than 0');
    });

    it('should return 400 for negative page number', async () => {
      const request = new NextRequest('http://localhost/api/news?page=-1');
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error.code).toBe('VALIDATION_ERROR');
    });

    it('should return 400 for invalid size (size > 128)', async () => {
      const request = new NextRequest('http://localhost/api/news?size=999');
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error.code).toBe('VALIDATION_ERROR');
      expect(data.error.message).toContain('Size must be between 1 and 128');
    });

    it('should return 400 for invalid size (size < 1)', async () => {
      const request = new NextRequest('http://localhost/api/news?size=0');
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error.code).toBe('VALIDATION_ERROR');
    });
  });

  describe('Success cases', () => {
    it('should return paginated news items', async () => {
      const request = new NextRequest('http://localhost/api/news?page=1&size=12');
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.data).toBeDefined();
      expect(data.data.pagination).toBeDefined();
      expect(data.data.pagination.current).toBe(1);
      expect(data.data.pagination.size).toBe(12);
    });

    it('should include cache headers', async () => {
      const request = new NextRequest('http://localhost/api/news');
      const response = await GET(request);

      expect(response.headers.get('Cache-Control')).toContain('max-age=');
      expect(response.headers.get('Cache-Control')).toContain('stale-while-revalidate');
    });

    it('should include no-cache headers for error response', async () => {
      const request = new NextRequest('http://localhost/api/news?page=0');
      const response = await GET(request);

      expect(response.status).toBe(400);
      expect(response.headers.get('Cache-Control')).toBe('private, no-store, no-cache, must-revalidate');
    });

    it('should use default pagination values when not specified', async () => {
      const request = new NextRequest('http://localhost/api/news');
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.data.pagination.current).toBe(1);
      expect(data.data.pagination.size).toBe(12); // DEFAULT_SIZE
    });

    it('should return news items with correct structure', async () => {
      const request = new NextRequest('http://localhost/api/news?page=1&size=1');
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);

      expect(data.data.data).toHaveLength(1);
      const item = data.data.data[0];
      expect(item).toHaveProperty('slug');
      expect(item).toHaveProperty('title');
      expect(item.published).toMatch(/^\d{4}-\d{2}-\d{2}T00:00:00\.000Z$/);
      expect(item).toHaveProperty('tags');
      expect(item.content).toBe('');
    });
  });
});
