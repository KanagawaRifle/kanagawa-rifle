import { afterEach, describe, expect, it, vi } from 'vitest';

import { createPageMetadata, getSocialImageUrl } from '../metadata';

vi.mock('@/config/env', () => ({ env: { APP_URL: 'https://example.test' } }));

describe('page metadata', () => {
  afterEach(() => vi.unstubAllEnvs());

  it('keeps punctuation and Japanese titles within one image query parameter', () => {
    const title = '大会 & 成績 #1 / 100% + 参加案内';
    const metadata = createPageMetadata({ title, description: '説明', path: '/competitions' });
    const url = getSocialImageUrl(title);
    expect(url.origin).toBe('https://example.test');
    expect(url.pathname).toBe('/api/og');
    expect([...url.searchParams]).toEqual([['title', title]]);
    expect(url.hash).toBe('');
    expect(metadata.twitter?.images).toEqual(metadata.openGraph?.images);
    expect(metadata.title).toBe(title);
    expect(metadata.description).toBe('説明');
    expect(metadata.openGraph).toMatchObject({
      type: 'website',
      title: `${title}：神奈川県ライフル射撃協会`,
      description: '説明',
      url: new URL('https://example.test/competitions'),
      siteName: '神奈川県ライフル射撃協会',
      locale: 'ja_JP',
      images: [{ url, width: 1200, height: 630, alt: `${title}：神奈川県ライフル射撃協会` }],
    });
    expect(metadata.twitter).toMatchObject({ card: 'summary_large_image' });
    expect(metadata.alternates?.canonical).toEqual(new URL('https://example.test/competitions'));
  });

  it('retains pagination in canonical and Open Graph URLs', () => {
    const metadata = createPageMetadata({ title: 'お知らせ', path: '/news?page=2' });
    expect(metadata.alternates?.canonical).toEqual(new URL('https://example.test/news?page=2'));
    expect(metadata.openGraph?.url).toEqual(metadata.alternates?.canonical);
    expect(metadata.description).toBeTruthy();
  });

  it('resolves adjacent page links and leaves missing neighbors absent', () => {
    expect(
      createPageMetadata({
        title: 'お知らせ',
        path: '/news?page=2',
        pagination: { previous: '/news', next: '/news?page=3' },
      }).pagination,
    ).toEqual({ previous: 'https://example.test/news', next: 'https://example.test/news?page=3' });
    expect(
      createPageMetadata({ title: 'お知らせ', path: '/news', pagination: { next: '/news?page=2' } }).pagination
        ?.previous,
    ).toBeUndefined();
    expect(createPageMetadata({ title: '記事', path: '/news/test' }).pagination).toBeUndefined();
  });

  it('advertises the published feed and suppresses discovery from previews', () => {
    expect(createPageMetadata({ title: 'お知らせ', path: '/news' }).alternates?.types).toEqual({
      'application/atom+xml': 'https://example.test/feed.xml',
    });
    vi.stubEnv('VERCEL_ENV', 'preview');
    expect(createPageMetadata({ title: 'お知らせ', path: '/news' }).alternates?.types).toBeUndefined();
  });

  it('does not repeat the site name in the home title', () => {
    const metadata = createPageMetadata({ title: '神奈川県ライフル射撃協会', path: '/' });
    expect(metadata.openGraph?.title).toBe('神奈川県ライフル射撃協会');
  });

  it('publishes article dates and tags without losing shared Open Graph fields', () => {
    const article = { published: new Date('2026-01-01'), updated: new Date('2026-01-03'), tags: ['大会'] };
    const metadata = createPageMetadata({ title: '大会案内', path: '/news/2026-01-01-01', article });
    expect(metadata.openGraph).toMatchObject({
      type: 'article',
      publishedTime: '2026-01-01T00:00:00.000Z',
      modifiedTime: '2026-01-03T00:00:00.000Z',
      tags: ['大会'],
      authors: ['https://example.test/about'],
      locale: 'ja_JP',
    });
    expect(
      createPageMetadata({ title: '記事', path: '/news/test', article: { ...article, updated: undefined } }).openGraph,
    ).toMatchObject({ modifiedTime: article.published.toISOString() });
  });

  it('uses an actual article image consistently without inventing its dimensions', () => {
    const image = { url: 'https://cdn.example.test/result.jpg', alt: '大会写真' };
    const metadata = createPageMetadata({ title: '大会結果', path: '/news/2026-01-01-01', image });
    expect(metadata.openGraph?.images).toEqual([image]);
    expect(metadata.twitter?.images).toEqual([image]);
  });

  it.each([
    [undefined, undefined, false, true],
    ['production', 'main', false, true],
    ['preview', 'feature', false, false],
    ['development', 'main', false, false],
    ['production', 'staging', false, false],
    ['production', 'main', true, false],
  ] as const)('sets indexing for deployment %s / %s (noindex %s)', (environment, branch, noindex, index) => {
    vi.stubEnv('VERCEL_ENV', environment);
    vi.stubEnv('VERCEL_GIT_COMMIT_REF', branch);
    expect(createPageMetadata({ title: 'お知らせ', path: '/news', noindex }).robots).toMatchObject({
      index,
      follow: true,
    });
  });
});
