import 'server-only';

import { app } from '@/config/app';
import { env } from '@/config/env';
import { seoIds } from '@/config/seo';
import { getMarkdownDescription } from '@/lib/markdown/description';

import { getNewsItemHref } from '../paths';
import type { NewsItem } from '../types';

export function getArticleDescription(article: NewsItem): string {
  return article.excerpt?.trim() || getMarkdownDescription(article.content) || article.title;
}

export function getArticleJsonLd(article: NewsItem) {
  const url = new URL(getNewsItemHref(article.slug), env.APP_URL).toString();
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${url}#article`,
    url,
    headline: article.title,
    description: getArticleDescription(article),
    inLanguage: 'ja',
    datePublished: article.published.toISOString(),
    dateModified: (article.updated ?? article.published).toISOString(),
    author: {
      '@type': 'SportsOrganization',
      '@id': seoIds.organization,
      name: app.name,
      url: new URL('/about', env.APP_URL).toString(),
    },
    publisher: { '@id': seoIds.organization },
    isPartOf: { '@id': seoIds.website },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
  };
}
