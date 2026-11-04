import { describe, expect, it, vi } from 'vitest';

import type { NewsItem } from '../../types';
import {
  getArticleDescription,
  getArticleImage,
  getArticleImageMetadata,
  getArticleJsonLd,
  getNewsListJsonLd,
} from '../seo';

vi.mock('@/config/env', () => ({ env: { APP_URL: 'https://example.test/' } }));

const article: NewsItem = {
  slug: '2026-01-01-01',
  title: '大会のご案内',
  content: '## 開催案内\n\n**神奈川県**の[大会](https://example.test/entry)です。\n\n参加をお待ちしています。',
  tags: ['大会'],
  published: new Date('2026-01-01'),
};

describe('article search metadata', () => {
  it('prefers editorial excerpts and falls back to visible Markdown text', () => {
    expect(getArticleDescription({ ...article, excerpt: '  編集した説明  ' })).toBe('編集した説明');
    expect(getArticleDescription(article)).toBe('開催案内 神奈川県の大会です。 参加をお待ちしています。');
    expect(getArticleDescription({ ...article, excerpt: '  ' })).toBe(getArticleDescription(article));
    expect(getArticleDescription({ ...article, content: '' })).toBe(article.title);
  });

  it('excludes scripts, styles, code blocks and HTML markup, and decodes entities', () => {
    const content =
      '<script>secret()</script>\n<style>.hidden{}</style>\n\n```js\ncode()\n```\n\n<p>大会 &amp; 結果<br>ご案内</p>';
    expect(getArticleDescription({ ...article, content })).toBe('大会 & 結果 ご案内');
  });

  it('bounds generated snippets without splitting Unicode characters', () => {
    const description = getArticleDescription({ ...article, content: '🏅'.repeat(170) });
    expect(Array.from(description)).toHaveLength(160);
    expect(description).toBe(`${'🏅'.repeat(159)}…`);
  });

  it('connects article identity and dates to the canonical URL and organization', () => {
    const jsonLd = getArticleJsonLd({ ...article, updated: new Date('2026-01-02') });
    expect(jsonLd).toMatchObject({
      '@id': 'https://example.test/news/2026-01-01-01#article',
      url: 'https://example.test/news/2026-01-01-01',
      inLanguage: 'ja',
      keywords: '大会',
      datePublished: '2026-01-01T00:00:00.000Z',
      dateModified: '2026-01-02T00:00:00.000Z',
      author: { '@id': 'https://example.test/#organization', url: 'https://example.test/about' },
      publisher: { '@id': 'https://example.test/#organization' },
      isPartOf: { '@id': 'https://example.test/#website' },
      mainEntityOfPage: { '@id': 'https://example.test/news/2026-01-01-01' },
    });
    expect(getArticleJsonLd(article).dateModified).toBe(article.published.toISOString());
  });

  it('uses visible Markdown and HTML images and resolves relative paths against the article URL', () => {
    const withImage = { ...article, content: '![大会写真](/images/result.jpg)\n\n![別の写真](/images/second.jpg)' };
    expect(getArticleImage(withImage)).toBe('https://example.test/images/result.jpg');
    expect(getArticleJsonLd(withImage).image).toEqual(['https://example.test/images/result.jpg']);
    expect(getArticleImage({ ...article, content: '<img src="photos/result.jpg" alt="結果">' })).toBe(
      'https://example.test/news/photos/result.jpg',
    );
    expect(getArticleImage({ ...article, content: '![写真](https://cdn.example.test/result.png)' })).toBe(
      'https://cdn.example.test/result.png',
    );
  });

  it('does not invent article images or use empty, unsafe, invalid, hidden or code images', () => {
    for (const content of [
      '',
      '<img src="" alt="空">',
      '![写真](javascript:alert%281%29)',
      '<img src="https://[invalid" alt="不正">',
      '<div hidden><img src="/hidden.jpg" alt="非表示"></div>',
      '```html\n<img src="/code.jpg">\n```',
    ]) {
      const item = { ...article, content, tags: [] };
      expect(getArticleImage(item)).toBeUndefined();
      expect(getArticleJsonLd(item)).not.toHaveProperty('image');
      expect(getArticleJsonLd(item)).not.toHaveProperty('keywords');
    }
  });

  it('preserves image descriptions and only publishes complete positive dimensions', () => {
    expect(
      getArticleImageMetadata({ ...article, content: '<img src="/photo.jpg" alt="表彰式" width="1200" height="800">' }),
    ).toEqual({
      url: 'https://example.test/photo.jpg',
      alt: '表彰式',
      width: 1200,
      height: 800,
    });
    for (const dimensions of [
      '',
      'width="0" height="800"',
      'width="-1" height="800"',
      'width="100%" height="800"',
      'width="1200"',
    ]) {
      expect(getArticleImageMetadata({ ...article, content: `<img src="/photo.jpg" ${dimensions}>` })).toEqual({
        url: 'https://example.test/photo.jpg',
        alt: article.title,
      });
    }
  });

  it('describes exactly the articles and order displayed on each listing page', () => {
    const jsonLd = getNewsListJsonLd({
      data: [article, { ...article, slug: '2025-12-31-01', title: '前の記事' }],
      pagination: { current: 2, size: 12, total: 14, totalPages: 2, hasNext: false, hasPrev: true },
    });
    expect(jsonLd['@id']).toBe('https://example.test/news?page=2#news-list');
    expect(jsonLd.numberOfItems).toBe(2);
    expect(jsonLd.itemListElement.map(({ position, item }) => [position, item.headline, item.url])).toEqual([
      [1, article.title, 'https://example.test/news/2026-01-01-01'],
      [2, '前の記事', 'https://example.test/news/2025-12-31-01'],
    ]);
  });
});
