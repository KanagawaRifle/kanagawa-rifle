import { z } from 'zod';

const HttpUrlSchema = z.url({ protocol: /^https?$/ });

const createEnv = () => {
  const EnvSchema = z.object({
    APP_URL: HttpUrlSchema.default('http://localhost:3000'),
    CDN_URL: HttpUrlSchema.default('https://static.kanagawa-rifle.org'),
    STATIC_FILE_BASE_URL: HttpUrlSchema.optional(),

    AXIOM_DATASET: z.string().optional(),
    AXIOM_TOKEN: z.string().optional(),

    GOOGLE_ANALYTICS_ID: z.string().optional(),

    SENTRY_DSN: z.preprocess((value) => (value === '' ? undefined : value), z.string().url().optional()),

    CLARITY_ID: z.string().optional(),

    GOOGLE_SITE_VERIFICATION: z.string().trim().optional(),
    BING_SITE_VERIFICATION: z.string().trim().optional(),
  });

  const vars = {
    APP_URL: process.env.NEXT_PUBLIC_URL,
    CDN_URL: process.env.NEXT_PUBLIC_CDN_URL,
    STATIC_FILE_BASE_URL: process.env.NEXT_PUBLIC_STATIC_FILE_BASE_URL,

    AXIOM_DATASET: process.env.NEXT_PUBLIC_AXIOM_DATASET,
    AXIOM_TOKEN: process.env.NEXT_PUBLIC_AXIOM_TOKEN,

    GOOGLE_ANALYTICS_ID: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID,

    SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,

    CLARITY_ID: process.env.NEXT_PUBLIC_CLARITY_ID,

    GOOGLE_SITE_VERIFICATION: process.env.GOOGLE_SITE_VERIFICATION,
    BING_SITE_VERIFICATION: process.env.BING_SITE_VERIFICATION,
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

  return {
    ...result.data,
    STATIC_FILE_BASE_URL: result.data.STATIC_FILE_BASE_URL ?? `${result.data.CDN_URL.replace(/\/+$/, '')}/website`,
  };
};

export const env = createEnv();
