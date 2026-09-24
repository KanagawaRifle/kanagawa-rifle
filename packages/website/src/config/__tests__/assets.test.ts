import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

describe('published attachment URLs', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.stubEnv('NEXT_PUBLIC_STATIC_FILE_BASE_URL', undefined);
    vi.stubEnv('NEXT_PUBLIC_CDN_URL', 'https://cdn.example.test/');
  });
  afterEach(() => vi.unstubAllEnvs());

  it('uses the configured CDN for paths with and without a leading slash', async () => {
    const { getStaticFileUrl } = await import('../assets');
    expect(getStaticFileUrl()).toBe('https://cdn.example.test/website');
    expect(getStaticFileUrl('/news/result.pdf')).toBe('https://cdn.example.test/website/news/result.pdf');
    expect(getStaticFileUrl('news/result.pdf')).toBe('https://cdn.example.test/website/news/result.pdf');
    expect(getStaticFileUrl('https://other.example.test/result.pdf')).toBe('https://other.example.test/result.pdf');
  });

  it('preserves the existing explicit attachment-root override', async () => {
    vi.stubEnv('NEXT_PUBLIC_STATIC_FILE_BASE_URL', 'https://files.example.test/archive/');
    const { getStaticFileUrl } = await import('../assets');
    expect(getStaticFileUrl('/result.pdf')).toBe('https://files.example.test/archive/result.pdf');
  });

  it('rejects invalid overrides before generating published URLs', async () => {
    vi.stubEnv('NEXT_PUBLIC_STATIC_FILE_BASE_URL', 'invalid');
    await expect(import('../assets')).rejects.toThrow('STATIC_FILE_BASE_URL');
  });
});
