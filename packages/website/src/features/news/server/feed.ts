import 'server-only';

import { app } from '@/config/app';
import { env } from '@/config/env';
import { NEWS_FEED_PATH, paths } from '@/config/paths';

import { getNewsItemHref } from '../paths';
import type { NewsItem } from '../types';
import { getArticleDescription } from './seo';

function escapeXml(value: string): string {
  return value
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\ufffe\uffff]/g, '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/** Atom represents publication and real modification dates independently. */
export function renderNewsFeed(articles: readonly NewsItem[]): string {
  const feedUrl = escapeXml(new URL(NEWS_FEED_PATH, env.APP_URL).toString());
  const newsUrl = escapeXml(new URL(paths.main.news.getHref(), env.APP_URL).toString());
  // The epoch is a stable fallback for a genuinely empty content tree, not the build time.
  const updated = new Date(Math.max(0, ...articles.map((article) => (article.updated ?? article.published).getTime())));
  const entries = articles.map((article) => {
    const url = escapeXml(new URL(getNewsItemHref(article.slug), env.APP_URL).toString());
    return `<entry>
  <id>${url}</id>
  <title>${escapeXml(article.title)}</title>
  <link rel="alternate" type="text/html" href="${url}" />
  <published>${article.published.toISOString()}</published>
  <updated>${(article.updated ?? article.published).toISOString()}</updated>
  <summary type="text">${escapeXml(getArticleDescription(article))}</summary>
  ${article.tags.map((tag) => `<category term="${escapeXml(tag)}" />`).join('\n  ')}
</entry>`;
  });
  return `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom" xml:lang="ja">
  <id>${feedUrl}</id>
  <title>${escapeXml(`${app.name}のお知らせ`)}</title>
  <subtitle>${escapeXml(paths.main.news.description)}</subtitle>
  <link rel="self" type="application/atom+xml" href="${feedUrl}" />
  <link rel="alternate" type="text/html" href="${newsUrl}" />
  <updated>${updated.toISOString()}</updated>
  <author>
    <name>${escapeXml(app.name)}</name>
    <uri>${escapeXml(new URL(paths.main.about.getHref(), env.APP_URL).toString())}</uri>
  </author>
  ${entries.join('\n  ')}
</feed>`;
}
