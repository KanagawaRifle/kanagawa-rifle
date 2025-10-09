// packages/website/sentry.server.config.ts
// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';

import { env } from '@/config';

Sentry.init({
  dsn: env.SENTRY_DSN,

  integrations: [
    Sentry.captureConsoleIntegration({
      levels: ['error'],
    }),
  ],

  tracesSampleRate: 1,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
});
