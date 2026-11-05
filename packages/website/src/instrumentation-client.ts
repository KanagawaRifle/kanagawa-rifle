// packages/website/src/instrumentation-client.ts
// This file configures the initialization of Sentry on the client.
// The added config here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';

import { sentryDefaults } from '@/config/sentry';

// next.config.ts validates this public value with config/env.ts before building.
// A direct reference lets Next.js remove unused monitoring from builds without a DSN,
// and keeps the server's Zod validators out of the browser's initial bundle.
if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
  Sentry.init({
    ...sentryDefaults,
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    integrations: [Sentry.captureConsoleIntegration({ levels: ['error'] }), Sentry.replayIntegration()],
    tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
    debug: false,
  });
}

export function onRouterTransitionStart(...args: Parameters<typeof Sentry.captureRouterTransitionStart>) {
  if (process.env.NEXT_PUBLIC_SENTRY_DSN) Sentry.captureRouterTransitionStart(...args);
}
