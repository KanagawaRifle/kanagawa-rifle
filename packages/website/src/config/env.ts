import { z } from 'zod';

const createEnv = () => {
  const EnvSchema = z.object({
    APP_URL: z.string().url().default('http://localhost:3000'),
    CDN_URL: z.string().url().default('https://static.kanagawa-rifle.org'),

    AXIOM_DATASET: z.string().optional(),
    AXIOM_TOKEN: z.string().optional(),

    GOOGLE_ANALYTICS_ID: z.string().optional(),

    SENTRY_ORG: z.string().optional(),
    SENTRY_PROJECT: z.string().optional(),
    SENTRY_AUTH_TOKEN: z.string().optional(),
    SENTRY_DSN: z.preprocess((value) => (value === '' ? undefined : value), z.string().url().optional()),

    CLARITY_ID: z.string().optional(),
  });

  const vars = {
    APP_URL: process.env.NEXT_PUBLIC_URL,
    CDN_URL: process.env.NEXT_PUBLIC_CDN_URL,

    AXIOM_DATASET: process.env.NEXT_PUBLIC_AXIOM_DATASET,
    AXIOM_TOKEN: process.env.NEXT_PUBLIC_AXIOM_TOKEN,

    GOOGLE_ANALYTICS_ID: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID,

    SENTRY_ORG: process.env.SENTRY_ORG,
    SENTRY_PROJECT: process.env.SENTRY_PROJECT,
    SENTRY_AUTH_TOKEN: process.env.SENTRY_AUTH_TOKEN,
    SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,

    CLARITY_ID: process.env.NEXT_PUBLIC_CLARITY_ID,
  };

  const result = EnvSchema.safeParse(vars);

  if (!result.success) {
    const errors = result.error.issues
      .map((err) => {
        const path = err.path.join('.');
        return `  - ${path}: ${err.message}`;
      })
      .join('\n');

    // 秘密情報を含む値は出力せず、変数名と検証エラーのみを通知する
    const errorMessage = ['Environment validation failed!', `Validation errors:\n${errors}`].join('\n');

    throw new Error(errorMessage);
  }

  return result.data;
};

export const env = createEnv();
