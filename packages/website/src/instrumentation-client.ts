// packages/website/src/instrumentation-client.ts
// This file configures the initialization of Sentry on the client.
// The added config here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';

import { env } from '@/config';

// 本番環境では 10% サンプリング、開発環境では 100%
const tracesSampleRate = process.env.NODE_ENV === 'production' ? 0.1 : 1.0;

Sentry.init({
  dsn: env.SENTRY_DSN,

  // console.errorを自動的にキャプチャ + 既存のReplay統合
  integrations: [
    Sentry.captureConsoleIntegration({
      levels: ['error'],
    }),
    Sentry.replayIntegration(),
  ],

  // 本番環境ではサンプリングレートを下げてコスト最適化
  tracesSampleRate,

  // Define how likely Replay events are sampled.
  // This sets the sample rate to be 10%. You may want this to be 100% while
  // in development and sample at a lower rate in production
  replaysSessionSampleRate: 0.1,

  // Define how likely Replay events are sampled when an error occurs.
  replaysOnErrorSampleRate: 1.0,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
