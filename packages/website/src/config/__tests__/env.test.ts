import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const validVariables = {
  NEXT_PUBLIC_URL: 'https://app.example.test',
  NEXT_PUBLIC_CDN_URL: 'https://cdn.example.test',
  NEXT_PUBLIC_AXIOM_DATASET: 'synthetic-axiom-dataset',
  NEXT_PUBLIC_AXIOM_TOKEN: 'synthetic-axiom-token',
  NEXT_PUBLIC_GOOGLE_ANALYTICS_ID: 'synthetic-analytics-id',
  SENTRY_ORG: 'synthetic-sentry-org',
  SENTRY_PROJECT: 'synthetic-sentry-project',
  SENTRY_AUTH_TOKEN: 'synthetic-sentry-auth-token',
  NEXT_PUBLIC_SENTRY_DSN: 'https://synthetic-sentry-key@sentry.example.test/1',
  NEXT_PUBLIC_CLARITY_ID: 'synthetic-clarity-id',
};

describe('environment configuration', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.stubEnv('NEXT_PUBLIC_STATIC_FILE_BASE_URL', undefined);
    vi.stubEnv('GOOGLE_SITE_VERIFICATION', undefined);
    vi.stubEnv('BING_SITE_VERIFICATION', undefined);
    for (const [name, value] of Object.entries(validVariables)) {
      vi.stubEnv(name, value);
    }
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it.each([
    ['NEXT_PUBLIC_URL', 'APP_URL'],
    ['NEXT_PUBLIC_CDN_URL', 'CDN_URL'],
    ['NEXT_PUBLIC_SENTRY_DSN', 'SENTRY_DSN'],
  ])('reports an invalid %s without exposing configured values', async (name, field) => {
    const invalidValue = `synthetic-invalid-secret-${name}`;
    vi.stubEnv(name, invalidValue);

    let validationError: unknown;
    try {
      await import('../env');
    } catch (error) {
      validationError = error;
    }

    expect(validationError).toBeInstanceOf(Error);
    const diagnostic = String(validationError);
    expect(diagnostic).toContain('Environment validation failed!');
    expect(diagnostic).toContain(`${field}: Invalid URL`);
    expect(diagnostic).not.toContain(invalidValue);
    for (const value of Object.values(validVariables)) {
      expect(diagnostic).not.toContain(value);
    }
  });

  it('preserves valid values', async () => {
    const { env } = await import('../env');

    expect(env).toEqual({
      APP_URL: validVariables.NEXT_PUBLIC_URL,
      CDN_URL: validVariables.NEXT_PUBLIC_CDN_URL,
      STATIC_FILE_BASE_URL: `${validVariables.NEXT_PUBLIC_CDN_URL}/website`,
      AXIOM_DATASET: validVariables.NEXT_PUBLIC_AXIOM_DATASET,
      AXIOM_TOKEN: validVariables.NEXT_PUBLIC_AXIOM_TOKEN,
      GOOGLE_ANALYTICS_ID: validVariables.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID,
      SENTRY_DSN: validVariables.NEXT_PUBLIC_SENTRY_DSN,
      CLARITY_ID: validVariables.NEXT_PUBLIC_CLARITY_ID,
      GOOGLE_SITE_VERIFICATION: undefined,
      BING_SITE_VERIFICATION: undefined,
    });
  });

  it('allows an empty optional Sentry DSN to disable telemetry', async () => {
    vi.stubEnv('NEXT_PUBLIC_SENTRY_DSN', '');
    const { env } = await import('../env');

    expect(env.SENTRY_DSN).toBeUndefined();
  });

  it('accepts optional webmaster verification tokens and trims pasted whitespace', async () => {
    vi.stubEnv('GOOGLE_SITE_VERIFICATION', '  google-verification-token  ');
    vi.stubEnv('BING_SITE_VERIFICATION', '  bing-verification-token  ');
    const { env } = await import('../env');
    expect(env.GOOGLE_SITE_VERIFICATION).toBe('google-verification-token');
    expect(env.BING_SITE_VERIFICATION).toBe('bing-verification-token');
  });

  it('uses the standard local app URL and preserves optional values', async () => {
    for (const name of Object.keys(validVariables)) {
      vi.stubEnv(name, undefined);
    }
    const { env } = await import('../env');

    expect(env.APP_URL).toBe('http://localhost:3000');
    expect(env.CDN_URL).toBe('https://static.kanagawa-rifle.org');
    expect(env).not.toHaveProperty('SENTRY_AUTH_TOKEN');
    expect(env).not.toHaveProperty('SENTRY_ORG');
    expect(env).not.toHaveProperty('SENTRY_PROJECT');
    expect(env.SENTRY_DSN).toBeUndefined();
  });
});
