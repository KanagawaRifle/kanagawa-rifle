import {z} from 'zod';

const createEnv = () => {
  const EnvSchema = z.object({
    APP_URL: z.url().default('http://kanagawa-rifle.org.local'),
    CDN_URL: z.url().default('https://static.kanagawa-rifle.org'),
    API_URL: z.url().default(
      typeof window !== 'undefined' ? 'http://kanagawa-rifle.org.local' : 'http://localhost:3001'
    ),

      AXIOM_DATASET: z.string().optional(),
      AXIOM_TOKEN: z.string().optional(),

      GOOGLE_ANALYTICS_ID: z.string().optional(),

    SENTRY_ORG: z.string().optional(),
    SENTRY_PROJECT: z.string().optional(),
    SENTRY_AUTH_TOKEN: z.string().optional(),
    SENTRY_DSN: z.string().optional(),

      CLARITY_ID: z.string().optional(),
    });

  const vars = {
    APP_URL: process.env.NEXT_PUBLIC_URL,
    CDN_URL: process.env.NEXT_PUBLIC_CDN_URL,
    API_URL: process.env.NEXT_PUBLIC_API_URL,

    AXIOM_DATASET: process.env.NEXT_PUBLIC_AXIOM_DATASET,
    AXIOM_TOKEN: process.env.NEXT_PUBLIC_AXIOM_TOKEN,

    GOOGLE_ANALYTICS_ID: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID,

    SENTRY_ORG: process.env.SENTRY_ORG,
    SENTRY_PROJECT: process.env.SENTRY_PROJECT,
    SENTRY_AUTH_TOKEN: process.env.SENTRY_AUTH_TOKEN,
    SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,

    CLARITY_ID: process.env.NEXT_PUBLIC_CLARITY_ID,
  };

  const env = EnvSchema.safeParse(vars);

  if (!env.success) {
    throw new Error(
      `Invalid env provided.
  The following variables are missing or invalid:
  ${Object.entries(z.treeifyError(env.error))
        .map(([k, v]) => `- ${k}: ${v}`)
        .join('\n')}
  `,
    );
  }

  return env.data ?? {};
};

export const env = createEnv();
