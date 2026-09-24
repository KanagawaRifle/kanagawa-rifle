import { describe, expect, it } from 'vitest';

import { FrontMatterSchema, isValidSlug, NewsQuerySchema } from '../schema';

describe('news schema', () => {
  it.each(['2024-01-15-01', '2025-12-09-99', '2000-01-01-00'])('accepts slug %s', (slug) => {
    expect(isValidSlug(slug)).toBe(true);
  });

  it.each([
    '',
    'invalid',
    '2024-1-15-01',
    '2024-01-5-01',
    '2024-01-15-1',
    '24-01-15-01',
    '../2024-01-15-01',
    '2024-01-15-01.md',
  ])('rejects unsafe or malformed slug %s', (slug) => {
    expect(isValidSlug(slug)).toBe(false);
  });

  it('parses metadata dates and applies optional defaults', () => {
    expect(FrontMatterSchema.parse({ title: '記事', published: '2024-01-15' })).toEqual({
      title: '記事',
      published: new Date('2024-01-15'),
      tags: [],
    });
    const article = FrontMatterSchema.parse({
      title: '記事',
      published: '2024-01-15',
      updated: '2024-01-16T09:00:00+09:00',
      tags: ['大会'],
    });
    expect(article.updated?.toISOString()).toBe('2024-01-16T00:00:00.000Z');
    expect(article.tags).toEqual(['大会']);
  });

  it.each([undefined, null, true, 0, '', 'invalid', '2024-02-30', new Date('2024-01-15')])(
    'rejects invalid publication date %s',
    (published) => {
      expect(FrontMatterSchema.safeParse({ title: '記事', published }).success).toBe(false);
    },
  );

  it('rejects missing metadata and malformed updates and tags', () => {
    expect(FrontMatterSchema.safeParse({ published: '2024-01-15' }).success).toBe(false);
    expect(FrontMatterSchema.safeParse({ title: '', published: '2024-01-15' }).success).toBe(false);
    expect(FrontMatterSchema.safeParse({ title: '記事', published: '2024-01-15', updated: null }).success).toBe(false);
    expect(FrontMatterSchema.safeParse({ title: '記事', published: '2024-01-15', tags: '大会' }).success).toBe(false);
  });

  it('validates shared pagination and defaults', () => {
    expect(NewsQuerySchema.parse({})).toEqual({ page: 1, size: 12 });
    expect(NewsQuerySchema.parse({ page: '2', size: '128' })).toEqual({ page: 2, size: 128 });
    for (const query of [{ page: 0 }, { page: 'abc' }, { page: 1.5 }, { size: 0 }, { size: 129 }]) {
      expect(NewsQuerySchema.safeParse(query).success).toBe(false);
    }
  });

  it.each([
    [{ page: 'invalid' }, 'Page must be a number'],
    [{ page: 1.5 }, 'Page must be an integer'],
    [{ page: 0 }, 'Page number must be greater than 0'],
    [{ size: 'invalid' }, 'Size must be a number'],
    [{ size: 1.5 }, 'Size must be an integer'],
    [{ size: 0 }, 'Size must be between 1 and 128'],
    [{ size: 129 }, 'Size must be between 1 and 128'],
  ])('explains invalid query input %j', (query, message) => {
    expect(() => NewsQuerySchema.parse(query)).toThrow(message);
  });
});
