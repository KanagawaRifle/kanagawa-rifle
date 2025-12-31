import type { MetadataRoute } from 'next';

import { env } from '@/config';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${env.APP_URL}/sitemap.xml`,
  };
}
