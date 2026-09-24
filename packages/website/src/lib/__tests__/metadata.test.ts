import { describe, expect, it, vi } from 'vitest';

import { createPageMetadata } from '../metadata';

vi.mock('@/config/env', () => ({ env: { APP_URL: 'https://example.test' } }));

describe('page metadata', () => {
  it('keeps punctuation and Japanese titles within one image query parameter', () => {
    const title = '大会 & 成績 #1 / 100% + 参加案内';
    const metadata = createPageMetadata({ title, description: '説明' });
    const images = metadata.openGraph?.images;
    expect(images).toBeInstanceOf(URL);
    const url = images as URL;
    expect(url.origin).toBe('https://example.test');
    expect(url.pathname).toBe('/api/og');
    expect([...url.searchParams]).toEqual([['title', title]]);
    expect(url.hash).toBe('');
    expect(metadata.twitter?.images).toEqual(images);
    expect(metadata.title).toBe(title);
    expect(metadata.description).toBe('説明');
  });
});
