import { describe, expect, it } from 'vitest';

import { getNewsItemHref, getNewsListHref } from '../paths';

describe('news links', () => {
  it('preserves pagination and resets the page when only a size is selected', () => {
    expect(getNewsListHref()).toBe('/news');
    expect(getNewsListHref({ page: 2, size: 6 })).toBe('/news?page=2&size=6');
    expect(getNewsListHref({ size: 128 })).toBe('/news?size=128');
    expect(getNewsListHref({ page: 3 })).toBe('/news?page=3');
    expect(getNewsListHref({ page: 1, size: 12 })).toBe('/news');
    expect(getNewsListHref({ page: 2, size: 12 })).toBe('/news?page=2');
    expect(getNewsListHref({ page: 1, size: 6 })).toBe('/news?size=6');
  });

  it('treats the article slug as one URL segment', () => {
    expect(getNewsItemHref('2026-09-24-01')).toBe('/news/2026-09-24-01');
    expect(getNewsItemHref('a/b?#')).toBe('/news/a%2Fb%3F%23');
  });
});
