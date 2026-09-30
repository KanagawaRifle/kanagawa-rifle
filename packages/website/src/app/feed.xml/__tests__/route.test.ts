import { afterEach, describe, expect, it, vi } from 'vitest';

import { getNewsFeedItems } from '@/features/news/server/news';

import { GET } from '../route';

vi.mock('@/features/news/server/news', () => ({ getNewsFeedItems: vi.fn(async () => []) }));

describe('news feed response', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.clearAllMocks();
  });

  it('serves UTF-8 Atom while keeping the XML itself out of search results', async () => {
    const response = await GET();
    expect(response.status).toBe(200);
    expect(response.headers.get('content-type')).toBe('application/atom+xml; charset=utf-8');
    expect(response.headers.get('x-robots-tag')).toBe('noindex');
    expect(await response.text()).toContain('<feed xmlns="http://www.w3.org/2005/Atom"');
  });

  it('does not publish a feed from preview deployments', async () => {
    vi.stubEnv('VERCEL_ENV', 'preview');
    expect((await GET()).status).toBe(404);
    expect(getNewsFeedItems).not.toHaveBeenCalled();
  });

  it('propagates content failures instead of returning a misleading empty feed', async () => {
    vi.mocked(getNewsFeedItems).mockRejectedValueOnce(new Error('Content read failed'));
    await expect(GET()).rejects.toThrow('Content read failed');
  });
});
