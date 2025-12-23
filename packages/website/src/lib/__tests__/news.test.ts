// packages/website/src/lib/__tests__/news.test.ts

import { describe, expect, it } from 'vitest';

import { isValidSlug, getYearFromSlug, isNodeError, CACHE_HEADERS, FrontMatterSchema } from '../news';

describe('news utilities', () => {
  describe('isValidSlug', () => {
    it('有効な slug を受け入れる', () => {
      expect(isValidSlug('2024-01-15-01')).toBe(true);
      expect(isValidSlug('2025-12-09-99')).toBe(true);
      expect(isValidSlug('2000-01-01-00')).toBe(true);
    });

    it('無効な slug を拒否する', () => {
      expect(isValidSlug('')).toBe(false);
      expect(isValidSlug('invalid')).toBe(false);
      expect(isValidSlug('2024-1-15-01')).toBe(false); // 月が1桁
      expect(isValidSlug('2024-01-5-01')).toBe(false); // 日が1桁
      expect(isValidSlug('2024-01-15-1')).toBe(false); // 番号が1桁
      expect(isValidSlug('24-01-15-01')).toBe(false); // 年が2桁
      expect(isValidSlug('../../../etc/passwd')).toBe(false); // パストラバーサル
      expect(isValidSlug('2024-01-15-01.md')).toBe(false); // 拡張子付き
    });
  });

  describe('getYearFromSlug', () => {
    it('slug から年を抽出する', () => {
      expect(getYearFromSlug('2024-01-15-01')).toBe('2024');
      expect(getYearFromSlug('2025-12-09-99')).toBe('2025');
      expect(getYearFromSlug('2000-01-01-00')).toBe('2000');
    });
  });

  describe('isNodeError', () => {
    it('Node.js エラーを判定する', () => {
      const nodeError = new Error('Not found') as NodeJS.ErrnoException;
      nodeError.code = 'ENOENT';
      expect(isNodeError(nodeError)).toBe(true);
    });

    it('通常のエラーを判定する', () => {
      const normalError = new Error('Normal error');
      expect(isNodeError(normalError)).toBe(false);
    });

    it('非エラーオブジェクトを判定する', () => {
      expect(isNodeError('string')).toBe(false);
      expect(isNodeError(123)).toBe(false);
      expect(isNodeError(null)).toBe(false);
      expect(isNodeError(undefined)).toBe(false);
      expect(isNodeError({ code: 'ENOENT' })).toBe(false);
    });
  });

  describe('CACHE_HEADERS', () => {
    it('正しいキャッシュヘッダーを持つ', () => {
      expect(CACHE_HEADERS.NO_CACHE['Cache-Control']).toContain('no-cache');
      expect(CACHE_HEADERS.LIST['Cache-Control']).toContain('public');
      expect(CACHE_HEADERS.DETAIL['Cache-Control']).toContain('public');
    });
  });

  describe('FrontMatterSchema', () => {
    it('有効な FrontMatter をパースする', () => {
      const validData = {
        title: 'テスト記事',
        published: '2024-01-15',
        tags: ['tag1', 'tag2'],
      };

      const result = FrontMatterSchema.parse(validData);
      expect(result.title).toBe('テスト記事');
      expect(result.published).toBeInstanceOf(Date);
      expect(result.tags).toEqual(['tag1', 'tag2']);
    });

    it('オプショナルフィールドを処理する', () => {
      const minimalData = {
        title: 'タイトルのみ',
        published: '2024-01-15',
      };

      const result = FrontMatterSchema.parse(minimalData);
      expect(result.title).toBe('タイトルのみ');
      expect(result.tags).toEqual([]);
      expect(result.excerpt).toBeUndefined();
      expect(result.eyecatch).toBeUndefined();
      expect(result.updated).toBeUndefined();
    });

    it('無効なデータを拒否する', () => {
      const invalidData = {
        // title が欠落
        published: '2024-01-15',
      };

      expect(() => FrontMatterSchema.parse(invalidData)).toThrow();
    });
  });
});
