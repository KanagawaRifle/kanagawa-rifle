// packages/website/src/__tests__/middleware.test.ts

import { NextRequest } from 'next/server';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

const originalEnv = process.env;

describe('middleware', () => {
  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  describe('non-staging environment', () => {
    it('should pass through when not on staging', async () => {
      process.env.VERCEL_GIT_COMMIT_REF = 'main';

      const { middleware } = await import('../middleware');
      const request = new NextRequest('http://localhost/');
      const response = middleware(request);

      expect(response.status).toBe(200);
    });

    it('should pass through when VERCEL_GIT_COMMIT_REF is not set', async () => {
      delete process.env.VERCEL_GIT_COMMIT_REF;

      const { middleware } = await import('../middleware');
      const request = new NextRequest('http://localhost/');
      const response = middleware(request);

      expect(response.status).toBe(200);
    });
  });

  describe('staging environment', () => {
    it('should return 500 when auth credentials are not configured', async () => {
      process.env.VERCEL_GIT_COMMIT_REF = 'staging';
      delete process.env.BASIC_AUTH_ID;
      delete process.env.BASIC_AUTH_PASSWORD;

      const { middleware } = await import('../middleware');
      const request = new NextRequest('http://localhost/');
      const response = middleware(request);

      expect(response.status).toBe(500);
    });

    it('should return 401 when no authorization header is provided', async () => {
      process.env.VERCEL_GIT_COMMIT_REF = 'staging';
      process.env.BASIC_AUTH_ID = 'user';
      process.env.BASIC_AUTH_PASSWORD = 'pass';

      const { middleware } = await import('../middleware');
      const request = new NextRequest('http://localhost/');
      const response = middleware(request);

      expect(response.status).toBe(401);
      expect(response.headers.get('WWW-Authenticate')).toBe('Basic realm="Secure Area"');
    });

    it('should return 401 for invalid credentials', async () => {
      process.env.VERCEL_GIT_COMMIT_REF = 'staging';
      process.env.BASIC_AUTH_ID = 'user';
      process.env.BASIC_AUTH_PASSWORD = 'pass';

      const { middleware } = await import('../middleware');

      const wrongCredentials = Buffer.from('wrong:credentials').toString('base64');
      const request = new NextRequest('http://localhost/', {
        headers: { Authorization: `Basic ${wrongCredentials}` },
      });
      const response = middleware(request);

      expect(response.status).toBe(401);
    });

    it('should allow access with valid credentials', async () => {
      process.env.VERCEL_GIT_COMMIT_REF = 'staging';
      process.env.BASIC_AUTH_ID = 'user';
      process.env.BASIC_AUTH_PASSWORD = 'pass';

      const { middleware } = await import('../middleware');

      const validCredentials = Buffer.from('user:pass').toString('base64');
      const request = new NextRequest('http://localhost/', {
        headers: { Authorization: `Basic ${validCredentials}` },
      });
      const response = middleware(request);

      expect(response.status).toBe(200);
    });

    it('should reject malformed authorization header', async () => {
      process.env.VERCEL_GIT_COMMIT_REF = 'staging';
      process.env.BASIC_AUTH_ID = 'user';
      process.env.BASIC_AUTH_PASSWORD = 'pass';

      const { middleware } = await import('../middleware');

      const request = new NextRequest('http://localhost/', {
        headers: { Authorization: 'Bearer token' },
      });
      const response = middleware(request);

      expect(response.status).toBe(401);
    });

    it('should reject authorization header without password', async () => {
      process.env.VERCEL_GIT_COMMIT_REF = 'staging';
      process.env.BASIC_AUTH_ID = 'user';
      process.env.BASIC_AUTH_PASSWORD = 'pass';

      const { middleware } = await import('../middleware');

      // パスワードなしのBase64エンコード
      const noPasswordCredentials = Buffer.from('user').toString('base64');
      const request = new NextRequest('http://localhost/', {
        headers: { Authorization: `Basic ${noPasswordCredentials}` },
      });
      const response = middleware(request);

      expect(response.status).toBe(401);
    });
  });
});

describe('constantTimeCompare', () => {
  // constantTimeCompare は内部関数なので、middleware を通してテストする
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

    const { middleware } = await import('../middleware');

    // 正しい認証情報
    const validCredentials = Buffer.from('user:pass').toString('base64');
    const validRequest = new NextRequest('http://localhost/', {
      headers: { Authorization: `Basic ${validCredentials}` },
    });
    expect(middleware(validRequest).status).toBe(200);

    // 間違った認証情報（同じ長さ）
    const wrongCredentials = Buffer.from('user:bass').toString('base64');
    const wrongRequest = new NextRequest('http://localhost/', {
      headers: { Authorization: `Basic ${wrongCredentials}` },
    });
    expect(middleware(wrongRequest).status).toBe(401);
  });

  it('should correctly compare credentials of different lengths', async () => {
    process.env.BASIC_AUTH_ID = 'user';
    process.env.BASIC_AUTH_PASSWORD = 'password123';

    const { middleware } = await import('../middleware');

    // 短いパスワード
    const shortCredentials = Buffer.from('user:pass').toString('base64');
    const shortRequest = new NextRequest('http://localhost/', {
      headers: { Authorization: `Basic ${shortCredentials}` },
    });
    expect(middleware(shortRequest).status).toBe(401);

    // 長いパスワード
    const longCredentials = Buffer.from('user:password123456789').toString('base64');
    const longRequest = new NextRequest('http://localhost/', {
      headers: { Authorization: `Basic ${longCredentials}` },
    });
    expect(middleware(longRequest).status).toBe(401);
  });
});
