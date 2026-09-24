import { paths } from '@/config/paths';

import type { NewsQuery } from './schema';

export function getNewsItemHref(slug: string): string {
  return `${paths.main.news.getHref()}/${encodeURIComponent(slug)}`;
}

export function getNewsListHref({ page, size }: Partial<NewsQuery> = {}): string {
  const params = new URLSearchParams();
  if (page !== undefined) params.set('page', String(page));
  if (size !== undefined) params.set('size', String(size));
  const query = params.toString();
  return `${paths.main.news.getHref()}${query ? `?${query}` : ''}`;
}
