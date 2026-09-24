import { afterEach, describe, expect, it, vi } from 'vitest';

import sitemap from '@/app/sitemap';
import { COMPETITION_YEARS } from '@/features/competitions/data';
import { getAllNewsSummaries } from '@/features/news/server/news';

vi.mock('@/config/env', () => ({
  env: { APP_URL: 'https://example.test', STATIC_FILE_BASE_URL: 'https://cdn.example.test/website' },
}));
vi.mock('@/features/news/server/news', () => ({
  getAllNewsSummaries: vi.fn(async () => [
    { slug: '2026-01-01-01', published: new Date('2026-01-01'), updated: new Date('2026-01-02') },
    { slug: '2025-01-01-01', published: new Date('2025-01-01') },
  ]),
}));

describe('sitemap', () => {
  afterEach(() => vi.unstubAllEnvs());

  it('includes every registered archive and uses actual article modification dates', async () => {
    const entries = await sitemap();
    const urls = entries.map((entry) => entry.url);
    expect(new Set(urls).size).toBe(urls.length);
    for (const year of COMPETITION_YEARS) expect(urls).toContain(`https://example.test/competitions/${year}`);
    expect(entries.find((entry) => entry.url.endsWith('/news/2026-01-01-01'))?.lastModified).toEqual(
      new Date('2026-01-02'),
    );
    expect(entries.find((entry) => entry.url.endsWith('/news/2025-01-01-01'))?.lastModified).toEqual(
      new Date('2025-01-01'),
    );
  });

  it('includes only canonical default-size pagination without duplicating page one', async () => {
    const summaries = await getAllNewsSummaries();
    vi.mocked(getAllNewsSummaries).mockResolvedValueOnce(Array.from({ length: 25 }, () => summaries[0]!));
    const urls = (await sitemap()).map((entry) => entry.url);
    expect(urls).toContain('https://example.test/news?page=2');
    expect(urls).toContain('https://example.test/news?page=3');
    expect(urls).not.toContain('https://example.test/news?page=4');
    expect(urls.some((url) => /[?&](size|page=1)/.test(url))).toBe(false);
  });

  it('does not advertise preview pages to crawlers', async () => {
    vi.stubEnv('VERCEL_ENV', 'preview');
    expect(await sitemap()).toEqual([]);
  });
});
