import { paths } from '@/config/paths';

import { DEFAULT_NEWS_PAGE_SIZE } from './constants';
import type { NewsQuery } from './schema';

export function getNewsItemHref(slug: string): string {
  return `${paths.main.news.getHref()}/${encodeURIComponent(slug)}`;
}

export function getNewsListHref({ page, size }: Partial<NewsQuery> = {}): string {
  const params = new URLSearchParams();
  if (page !== undefined && page !== 1) params.set('page', String(page));
  if (size !== undefined && size !== DEFAULT_NEWS_PAGE_SIZE) params.set('size', String(size));
  const query = params.toString();
  return `${paths.main.news.getHref()}${query ? `?${query}` : ''}`;
}
