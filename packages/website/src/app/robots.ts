import type { MetadataRoute } from 'next';

import { env } from '@/config/env';
import { isPreviewDeployment } from '@/config/seo';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    // Crawling must remain allowed so crawlers can read preview noindex headers.
    sitemap: isPreviewDeployment() ? undefined : new URL('/sitemap.xml', env.APP_URL).toString(),
  };
}
