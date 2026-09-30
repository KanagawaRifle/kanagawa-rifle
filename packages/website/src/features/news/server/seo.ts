import 'server-only';

import { SKIP, visit } from 'unist-util-visit';

import { app } from '@/config/app';
import { env } from '@/config/env';
import { seoIds } from '@/config/seo';
import { getMarkdownDescription } from '@/lib/markdown/description';
import { parseMarkdown } from '@/lib/markdown/parse';
import type { Paginated } from '@/lib/pagination';

import { getNewsItemHref, getNewsListHref } from '../paths';
import type { NewsItem, NewsSummary } from '../types';

export function getArticleDescription(article: NewsItem): string {
  return article.excerpt?.trim() || getMarkdownDescription(article.content) || article.title;
}

/** Only describe an image actually present in the rendered article. */
export function getArticleImage(article: NewsItem): string | undefined {
  const { tree } = parseMarkdown(article.content);
  let image: string | undefined;
  visit(tree, 'element', (node) => {
    if (['script', 'style', 'pre'].includes(node.tagName) || node.properties.hidden) return SKIP;
    if (!image && node.tagName === 'img' && typeof node.properties.src === 'string' && node.properties.src.trim()) {
      try {
        const url = new URL(node.properties.src, new URL(getNewsItemHref(article.slug), env.APP_URL));
        if (['http:', 'https:'].includes(url.protocol)) image = url.toString();
      } catch {
        // Invalid image URLs cannot describe an article's search appearance.
      }
    }
    return undefined;
  });
  return image;
}

export function getNewsListJsonLd(news: Paginated<NewsSummary>) {
  const path = getNewsListHref({ page: news.pagination.current, size: news.pagination.size });
  return {
    '@type': 'ItemList',
    '@id': `${new URL(path, env.APP_URL)}#news-list`,
    numberOfItems: news.data.length,
    itemListElement: news.data.map((article, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Article',
        '@id': `${new URL(getNewsItemHref(article.slug), env.APP_URL)}#article`,
        url: new URL(getNewsItemHref(article.slug), env.APP_URL).toString(),
        headline: article.title,
      },
    })),
  };
}

export function getArticleJsonLd(article: NewsItem) {
  const url = new URL(getNewsItemHref(article.slug), env.APP_URL).toString();
  const image = getArticleImage(article);
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${url}#article`,
    url,
    headline: article.title,
    ...(image ? { image: [image] } : {}),
    ...(article.tags.length ? { keywords: article.tags.join(', ') } : {}),
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
