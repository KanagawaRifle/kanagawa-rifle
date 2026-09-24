import type { MetadataRoute } from 'next';

import { env } from '@/config/env';
import { getCompetitionPath, paths, type PathItem } from '@/config/paths';
import { COMPETITION_YEARS } from '@/features/competitions/data';
import { getNewsItemHref } from '@/features/news/paths';
import { getAllNewsSummaries } from '@/features/news/server/news';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const createSitemapEntry = (page: PathItem, priority: number): MetadataRoute.Sitemap[number] => ({
    url: new URL(page.getHref(), env.APP_URL).toString(),
    changeFrequency: 'monthly',
    priority,
  });
  const articles = await getAllNewsSummaries();
  return [
    createSitemapEntry(paths.home, 1),
    ...Object.values(paths.main).map((page) => createSitemapEntry(page, 0.8)),
    ...Object.values(paths.sub).map((page) => createSitemapEntry(page, 0.6)),
    ...COMPETITION_YEARS.map((year) => createSitemapEntry(getCompetitionPath(year), 0.6)),
    ...articles.map((article): MetadataRoute.Sitemap[number] => ({
      url: new URL(getNewsItemHref(article.slug), env.APP_URL).toString(),
      lastModified: article.updated ?? article.published,
      changeFrequency: 'monthly',
      priority: 0.7,
    })),
  ];
}
