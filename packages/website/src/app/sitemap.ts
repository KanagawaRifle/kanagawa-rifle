import type {MetadataRoute} from 'next'

import {paths, env, PathItem} from '@/config'

export default function sitemap(): MetadataRoute.Sitemap {
  const createSitemapEntry = (page: PathItem, priority: number): {
    url: string,
    lastModified: Date,
    changeFrequency: "monthly",
    priority: number
  } => ({
    url: new URL(page.getHref(), env.APP_URL).toString(),
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority,
  });

  return [
    createSitemapEntry(paths.home, 1),
    ...Object.values(paths.main).map(page => createSitemapEntry(page, 0.8)),
    ...Object.values(paths.sub).map(page => createSitemapEntry(page, 0.6)),
  ];

}
