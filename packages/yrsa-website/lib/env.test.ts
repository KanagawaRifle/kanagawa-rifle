import { afterEach, expect, it, vi } from 'vitest';

afterEach(() => {
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
  vi.resetModules();
});

it('requires each calendar setting without requiring optional analytics', async () => {
  vi.stubEnv('NEXT_PUBLIC_GOOGLE_CALENDAR_API_KEY', 'fixture-key');
  vi.stubEnv('NEXT_PUBLIC_GOOGLE_CALENDAR_ID_MAIN', 'main@example.test');
  vi.stubEnv('NEXT_PUBLIC_GOOGLE_CALENDAR_ID_ANNUAL', 'annual@example.test');
  vi.stubEnv('NEXT_PUBLIC_GA_MEASUREMENT_ID', undefined);
  const { env } = await import('./env');
  expect(env.GOOGLE_CALENDAR_ID_MAIN).toBe('main@example.test');
  expect(env.GA_MEASUREMENT_ID).toBeUndefined();
});

it('rejects empty required calendar configuration with the missing field name', async () => {
  vi.stubEnv('NEXT_PUBLIC_GOOGLE_CALENDAR_API_KEY', '');
  vi.spyOn(console, 'error').mockImplementation(() => undefined);
  await expect(import('./env')).rejects.toThrow('GOOGLE_CALENDAR_API_KEY');
});
