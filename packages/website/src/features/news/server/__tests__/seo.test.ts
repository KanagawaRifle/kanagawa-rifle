import { describe, expect, it, vi } from 'vitest';

import type { NewsItem } from '../../types';
import { getArticleDescription, getArticleJsonLd } from '../seo';

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
      datePublished: '2026-01-01T00:00:00.000Z',
      dateModified: '2026-01-02T00:00:00.000Z',
      author: { '@id': 'https://example.test/#organization', url: 'https://example.test/about' },
      publisher: { '@id': 'https://example.test/#organization' },
      isPartOf: { '@id': 'https://example.test/#website' },
      mainEntityOfPage: { '@id': 'https://example.test/news/2026-01-01-01' },
    });
    expect(getArticleJsonLd(article).dateModified).toBe(article.published.toISOString());
  });
});
