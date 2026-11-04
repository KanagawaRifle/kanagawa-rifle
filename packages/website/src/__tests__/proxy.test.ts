// packages/website/src/__tests__/proxy.test.ts

import { AsyncLocalStorage } from 'node:async_hooks';

import { NextRequest } from 'next/server';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const originalEnv = process.env;

describe('proxy', () => {
  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
    vi.unstubAllGlobals();
  });

  describe('non-staging environment', () => {
    it('should pass through when not on staging', async () => {
      process.env.VERCEL_GIT_COMMIT_REF = 'main';

      const { proxy } = await import('../proxy');
      const request = new NextRequest('http://localhost/');
      const response = proxy(request);

      expect(response.status).toBe(200);
    });

    it('should pass through when VERCEL_GIT_COMMIT_REF is not set', async () => {
      delete process.env.VERCEL_GIT_COMMIT_REF;

      const { proxy } = await import('../proxy');
      const request = new NextRequest('http://localhost/');
      const response = proxy(request);

      expect(response.status).toBe(200);
    });
  });

  describe('staging environment', () => {
    const protectedRequests: Array<{ url: string; headers: Record<string, string> }> = [
      { url: '/about', headers: {} },
      { url: '/about', headers: { purpose: 'prefetch' } },
      { url: '/news?_rsc=test', headers: { 'next-router-prefetch': '1', rsc: '1' } },
      { url: '/api/news', headers: {} },
      { url: '/api/news/2026-10-15-01', headers: {} },
      { url: '/api/og', headers: {} },
      { url: '/sitemap.xml', headers: {} },
      { url: '/robots.txt', headers: {} },
      { url: '/feed.xml', headers: {} },
      { url: '/favicon.ico', headers: {} },
      { url: '/_next/static/chunks/app.js', headers: {} },
      { url: '/_next/image?url=/opengraph-image.png&w=640&q=75', headers: {} },
    ];

    it.each(protectedRequests)('requires authentication for $url with $headers', async ({ url, headers }) => {
      process.env.VERCEL_GIT_COMMIT_REF = 'staging';
      process.env.BASIC_AUTH_ID = 'user';
      process.env.BASIC_AUTH_PASSWORD = 'pass';
      vi.stubGlobal('AsyncLocalStorage', AsyncLocalStorage);

      const { unstable_doesMiddlewareMatch } = await import('next/experimental/testing/server');
      const { config, proxy } = await import('../proxy');
      expect(unstable_doesMiddlewareMatch({ config, nextConfig: {}, url, headers })).toBe(true);

      const requestUrl = new URL(url, 'http://localhost');
      expect(proxy(new NextRequest(requestUrl, { headers })).status).toBe(401);
      expect(
        proxy(
          new NextRequest(requestUrl, {
            headers: { ...headers, Authorization: `Basic ${Buffer.from('user:pass').toString('base64')}` },
          }),
        ).status,
      ).toBe(200);
    });

    it('should return 500 when auth credentials are not configured', async () => {
      process.env.VERCEL_GIT_COMMIT_REF = 'staging';
      delete process.env.BASIC_AUTH_ID;
      delete process.env.BASIC_AUTH_PASSWORD;

      const { proxy } = await import('../proxy');
      const request = new NextRequest('http://localhost/');
      const response = proxy(request);

      expect(response.status).toBe(500);
    });

    it('should return 401 when no authorization header is provided', async () => {
      process.env.VERCEL_GIT_COMMIT_REF = 'staging';
      process.env.BASIC_AUTH_ID = 'user';
      process.env.BASIC_AUTH_PASSWORD = 'pass';

      const { proxy } = await import('../proxy');
      const request = new NextRequest('http://localhost/');
      const response = proxy(request);

      expect(response.status).toBe(401);
      expect(response.headers.get('WWW-Authenticate')).toBe('Basic realm="Secure Area"');
    });

    it('should return 401 for invalid credentials', async () => {
      process.env.VERCEL_GIT_COMMIT_REF = 'staging';
      process.env.BASIC_AUTH_ID = 'user';
      process.env.BASIC_AUTH_PASSWORD = 'pass';

      const { proxy } = await import('../proxy');

      const wrongCredentials = Buffer.from('wrong:credentials').toString('base64');
      const request = new NextRequest('http://localhost/', {
        headers: { Authorization: `Basic ${wrongCredentials}` },
      });
      const response = proxy(request);

      expect(response.status).toBe(401);
    });

    it('should allow access with valid credentials', async () => {
      process.env.VERCEL_GIT_COMMIT_REF = 'staging';
      process.env.BASIC_AUTH_ID = 'user';
      process.env.BASIC_AUTH_PASSWORD = 'pass';

      const { proxy } = await import('../proxy');

      const validCredentials = Buffer.from('user:pass').toString('base64');
      const request = new NextRequest('http://localhost/', {
        headers: { Authorization: `Basic ${validCredentials}` },
      });
      const response = proxy(request);

      expect(response.status).toBe(200);
    });

    it('should reject malformed authorization header', async () => {
      process.env.VERCEL_GIT_COMMIT_REF = 'staging';
      process.env.BASIC_AUTH_ID = 'user';
      process.env.BASIC_AUTH_PASSWORD = 'pass';

      const { proxy } = await import('../proxy');

      const request = new NextRequest('http://localhost/', {
        headers: { Authorization: 'Bearer token' },
      });
      const response = proxy(request);

      expect(response.status).toBe(401);
    });

    it('should reject authorization header without password', async () => {
      process.env.VERCEL_GIT_COMMIT_REF = 'staging';
      process.env.BASIC_AUTH_ID = 'user';
      process.env.BASIC_AUTH_PASSWORD = 'pass';

      const { proxy } = await import('../proxy');

      // パスワードなしのBase64エンコード
      const noPasswordCredentials = Buffer.from('user').toString('base64');
      const request = new NextRequest('http://localhost/', {
        headers: { Authorization: `Basic ${noPasswordCredentials}` },
      });
      const response = proxy(request);

      expect(response.status).toBe(401);
    });
  });
});

describe('constantTimeCompare', () => {
  // constantTimeCompare は内部関数なので、proxy を通してテストする
  // タイミング攻撃に対する防御をテストするのは難しいが、
  // 少なくとも正しい比較結果を返すことを確認する

  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv };
    process.env.VERCEL_GIT_COMMIT_REF = 'staging';
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('should correctly compare credentials of same length', async () => {
    process.env.BASIC_AUTH_ID = 'user';
    process.env.BASIC_AUTH_PASSWORD = 'pass';

    const { proxy } = await import('../proxy');

    // 正しい認証情報
    const validCredentials = Buffer.from('user:pass').toString('base64');
    const validRequest = new NextRequest('http://localhost/', {
      headers: { Authorization: `Basic ${validCredentials}` },
    });
    expect(proxy(validRequest).status).toBe(200);

    // 間違った認証情報（同じ長さ）
    const wrongCredentials = Buffer.from('user:bass').toString('base64');
    const wrongRequest = new NextRequest('http://localhost/', {
      headers: { Authorization: `Basic ${wrongCredentials}` },
    });
    expect(proxy(wrongRequest).status).toBe(401);
  });

  it('should correctly compare credentials of different lengths', async () => {
    process.env.BASIC_AUTH_ID = 'user';
    process.env.BASIC_AUTH_PASSWORD = 'password123';

    const { proxy } = await import('../proxy');

    // 短いパスワード
    const shortCredentials = Buffer.from('user:pass').toString('base64');
    const shortRequest = new NextRequest('http://localhost/', {
      headers: { Authorization: `Basic ${shortCredentials}` },
    });
    expect(proxy(shortRequest).status).toBe(401);

    // 長いパスワード
    const longCredentials = Buffer.from('user:password123456789').toString('base64');
    const longRequest = new NextRequest('http://localhost/', {
      headers: { Authorization: `Basic ${longCredentials}` },
    });
    expect(proxy(longRequest).status).toBe(401);
  });
});
