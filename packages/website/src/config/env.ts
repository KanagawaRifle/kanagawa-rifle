import {z} from 'zod';

const createEnv = () => {
  const EnvSchema = z.object({
    APP_URL: z.url().default('http://rifle.kanagawa.jp.local'),
    CDN_URL: z.url().default('https://static.kanagawa-rifle.org'),
    API_URL: z.url().default(
      typeof window !== 'undefined' ? 'http://rifle.kanagawa.jp.local' : 'http://localhost:3001'
    ),
  });

  const vars = {
    APP_URL: process.env.NEXT_PUBLIC_URL,
    CDN_URL: process.env.NEXT_PUBLIC_CDN_URL,
    API_URL: process.env.NEXT_PUBLIC_API_URL,
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
