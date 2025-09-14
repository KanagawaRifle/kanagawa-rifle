import type { MetadataRoute } from 'next'

import { siteConfig } from '@kanagawa-rifle/website/site'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: siteConfig.sitemap,
  }
}
