import { env } from './env';

/** Stable identifiers connect the organization, website, and articles. */
export const seoIds = {
  organization: new URL('/#organization', env.APP_URL).toString(),
  website: new URL('/#website', env.APP_URL).toString(),
};

/** Self-hosted production remains indexable when Vercel variables are absent. */
export function isPreviewDeployment(): boolean {
  return (
    process.env.VERCEL_GIT_COMMIT_REF === 'staging' ||
    (process.env.VERCEL_ENV !== undefined && process.env.VERCEL_ENV !== 'production')
  );
}
