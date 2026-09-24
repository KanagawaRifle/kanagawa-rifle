import { afterEach, describe, expect, it, vi } from 'vitest';

import robots from '@/app/robots';

vi.mock('@/config/env', () => ({ env: { APP_URL: 'https://example.test/' } }));

describe('crawler discovery', () => {
  afterEach(() => vi.unstubAllEnvs());

  it('advertises a normalized sitemap and keeps image and script resources crawlable', () => {
    vi.stubEnv('VERCEL_ENV', 'production');
    vi.stubEnv('VERCEL_GIT_COMMIT_REF', 'main');
    expect(robots()).toEqual({
      rules: { userAgent: '*', allow: '/' },
      sitemap: 'https://example.test/sitemap.xml',
    });
  });

  it('lets crawlers see preview noindex directives without advertising its sitemap', () => {
    vi.stubEnv('VERCEL_ENV', 'preview');
    expect(robots()).toEqual({ rules: { userAgent: '*', allow: '/' }, sitemap: undefined });
  });
});
