// cspell:ignore parsererror
import { describe, expect, it, vi } from 'vitest';

import type { NewsItem } from '../../types';
import { renderNewsFeed } from '../feed';

vi.mock('@/config/env', () => ({ env: { APP_URL: 'https://example.test/' } }));

const article: NewsItem = {
  slug: '2026-01-01-01',
  title: '大会 & 結果 <速報>',
  published: new Date('2026-01-01'),
  tags: ['大会 "速報"'],
  content: '## 結果\n\n[大会](https://example.test)の**結果**です。',
};

function parseFeed(articles: readonly NewsItem[]) {
  const document = new DOMParser().parseFromString(renderNewsFeed(articles), 'application/xml');
  expect(document.querySelector('parsererror')).toBeNull();
  expect(document.documentElement.namespaceURI).toBe('http://www.w3.org/2005/Atom');
  return document;
}

describe('news Atom feed', () => {
  it('emits canonical links, plain summaries, publication dates and actual modification dates', () => {
    const document = parseFeed([article, { ...article, slug: '2025-12-31-01', updated: new Date('2026-01-03') }]);
    expect(document.querySelector('feed > id')?.textContent).toBe('https://example.test/feed.xml');
    expect(document.querySelector('feed > updated')?.textContent).toBe('2026-01-03T00:00:00.000Z');
    expect(document.querySelector('link[rel="self"]')?.getAttribute('href')).toBe('https://example.test/feed.xml');
    expect(document.querySelector('author > uri')?.textContent).toBe('https://example.test/about');
    const entries = document.querySelectorAll('entry');
    expect(entries).toHaveLength(2);
    expect(entries[0]?.querySelector('id')?.textContent).toBe('https://example.test/news/2026-01-01-01');
    expect(entries[0]?.querySelector('link')?.getAttribute('href')).toBe('https://example.test/news/2026-01-01-01');
    expect(entries[0]?.querySelector('title')?.textContent).toBe(article.title);
    expect(entries[0]?.querySelector('category')?.getAttribute('term')).toBe(article.tags[0]);
    expect(entries[0]?.querySelector('summary')?.textContent).toBe('結果 大会の結果です。');
    expect(entries[0]?.querySelector('published')?.textContent).toBe('2026-01-01T00:00:00.000Z');
    expect(entries[0]?.querySelector('updated')?.textContent).toBe('2026-01-01T00:00:00.000Z');
    expect(entries[1]?.querySelector('updated')?.textContent).toBe('2026-01-03T00:00:00.000Z');
  });

  it('escapes editorial XML delimiters, closing tags and invalid XML control characters', () => {
    const title = '大会 </title><script>内容</script> & "引用"';
    const excerpt = `説明 ]]> & <summary>本文</summary>${String.fromCharCode(0, 1, 11, 31)}`;
    const document = parseFeed([{ ...article, title, excerpt }]);
    expect(document.querySelector('entry > title')?.textContent).toBe(title);
    expect(document.querySelector('entry > summary')?.textContent).toBe('説明 ]]> & <summary>本文</summary>');
    expect(document.querySelector('script')).toBeNull();
    expect(document.querySelectorAll('summary')).toHaveLength(1);
  });

  it('does not fabricate an update date when there are no articles', () => {
    const document = parseFeed([]);
    expect(document.querySelectorAll('entry')).toHaveLength(0);
    expect(document.querySelector('updated')?.textContent).toBe('1970-01-01T00:00:00.000Z');
  });
});
