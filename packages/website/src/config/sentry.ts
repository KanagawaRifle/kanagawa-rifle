import type { init } from '@sentry/nextjs';

// Preserve the v10 collection and tracing behavior when upgrading to Sentry 11.
export const sentryDefaults = {
  traceLifecycle: 'static',
  dataCollection: {
    userInfo: false,
    cookies: false,
    httpHeaders: {
      request: { deny: ['forwarded', '-ip', 'remote-', 'via', '-user'] },
      response: { deny: ['forwarded', '-ip', 'remote-', 'via', '-user'] },
    },
    httpBodies: [],
    urlQueryParams: { deny: ['forwarded', '-ip', 'remote-', 'via', '-user'] },
    genAI: { inputs: false, outputs: false },
    databaseQueryData: false,
    graphQL: { document: false, variables: false },
  },
} satisfies Parameters<typeof init>[0];
