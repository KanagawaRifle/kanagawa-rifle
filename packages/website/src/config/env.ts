import { z } from 'zod';

const createEnv = () => {
  const EnvSchema = z.object({
    APP_URL: z.string().url().default('http://kanagawa-rifle.org.local'),
    CDN_URL: z.string().url().default('https://static.kanagawa-rifle.org'),
    // クライアントサイド用API URL
    API_URL: z
      .string()
      .default('')
      .transform((val) => {
        if (val) return val;
        return typeof window !== 'undefined' ? 'http://kanagawa-rifle.org.local' : 'http://localhost:3001';
      })
      .pipe(z.string().url()),
    // サーバーサイド用内部API URL（Docker環境ではサービス名を使用）
    API_INTERNAL_URL: z.string().url().optional(),

    AXIOM_DATASET: z.string().optional(),
    AXIOM_TOKEN: z.string().optional(),

    GOOGLE_ANALYTICS_ID: z.string().optional(),

    SENTRY_ORG: z.string().optional(),
    SENTRY_PROJECT: z.string().optional(),
    SENTRY_AUTH_TOKEN: z.string().optional(),
    SENTRY_DSN: z.string().url().optional(),

    CLARITY_ID: z.string().optional(),
  });

  const vars = {
    APP_URL: process.env.NEXT_PUBLIC_URL,
    CDN_URL: process.env.NEXT_PUBLIC_CDN_URL,
    API_URL: process.env.NEXT_PUBLIC_API_URL,
    API_INTERNAL_URL: process.env.API_INTERNAL_URL,

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

    console.error('Environment validation failed!');
    console.error('Provided values:', JSON.stringify(vars, null, 2));
    console.error('Validation errors:\n', errors);

    throw new Error(`Invalid environment variables:\n${errors}`);
  }

  return result.data;
};

export const env = createEnv();

/**
 * 実行環境に応じたAPI URLを取得
 * - サーバーサイド: API_INTERNAL_URL（未設定時はAPI_URLにフォールバック）
 * - クライアントサイド: API_URL
 */
export const getApiUrl = (): string => {
  if (typeof window === 'undefined') {
    return env.API_INTERNAL_URL ?? env.API_URL;
  }
  return env.API_URL;
};
