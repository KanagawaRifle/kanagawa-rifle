import type { MetadataRoute } from 'next';

import { env, paths, type PathItem } from '@/config';
import { getAllNews } from '@/features/news/server/news';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const createSitemapEntry = (page: PathItem, priority: number): MetadataRoute.Sitemap[number] => ({
    url: new URL(page.getHref(), env.APP_URL).toString(),
    changeFrequency: 'monthly',
    priority,
  });
  const articles = await getAllNews();
  return [
    createSitemapEntry(paths.home, 1),
    ...Object.values(paths.main).map((page) => createSitemapEntry(page, 0.8)),
    ...Object.values(paths.sub).map((page) => createSitemapEntry(page, 0.6)),
    ...articles.map((article): MetadataRoute.Sitemap[number] => ({
      url: new URL(`/news/${article.slug}`, env.APP_URL).toString(),
      lastModified: article.updated ?? article.published,
      changeFrequency: 'monthly',
      priority: 0.7,
    })),
  ];
}
