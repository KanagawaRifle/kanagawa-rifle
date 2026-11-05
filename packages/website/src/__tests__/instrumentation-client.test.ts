import * as Sentry from '@sentry/nextjs';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@sentry/nextjs', () => ({
  init: vi.fn(),
  captureConsoleIntegration: vi.fn(() => ({ name: 'CaptureConsole' })),
  replayIntegration: vi.fn(() => ({ name: 'Replay' })),
  captureRouterTransitionStart: vi.fn(),
}));

describe('browser monitoring', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });
  afterEach(() => vi.unstubAllEnvs());

  it.each(['', undefined])('does not initialize or track navigation without a DSN (%s)', async (dsn) => {
    vi.stubEnv('NEXT_PUBLIC_SENTRY_DSN', dsn);
    const { onRouterTransitionStart } = await import('../instrumentation-client');
    onRouterTransitionStart('/news', 'push');
    expect(Sentry.init).not.toHaveBeenCalled();
    expect(Sentry.replayIntegration).not.toHaveBeenCalled();
    expect(Sentry.captureRouterTransitionStart).not.toHaveBeenCalled();
  });

  it.each([
    ['production', 0.1],
    ['development', 1],
  ] as const)('preserves early error reporting, replay and navigation in %s', async (environment, rate) => {
    vi.stubEnv('NODE_ENV', environment);
    vi.stubEnv('NEXT_PUBLIC_SENTRY_DSN', 'https://public@sentry.example.test/1');
    const { onRouterTransitionStart } = await import('../instrumentation-client');
    expect(Sentry.init).toHaveBeenCalledWith({
      dsn: 'https://public@sentry.example.test/1',
      traceLifecycle: 'static',
      dataCollection: expect.objectContaining({
        userInfo: false,
        cookies: false,
        httpBodies: [],
        genAI: { inputs: false, outputs: false },
        databaseQueryData: false,
        graphQL: { document: false, variables: false },
      }),
      integrations: [{ name: 'CaptureConsole' }, { name: 'Replay' }],
      tracesSampleRate: rate,
      replaysSessionSampleRate: 0.1,
      replaysOnErrorSampleRate: 1,
      debug: false,
    });
    expect(Sentry.captureConsoleIntegration).toHaveBeenCalledWith({ levels: ['error'] });
    onRouterTransitionStart('/news', 'push');
    expect(Sentry.captureRouterTransitionStart).toHaveBeenCalledWith('/news', 'push');
  });
});
