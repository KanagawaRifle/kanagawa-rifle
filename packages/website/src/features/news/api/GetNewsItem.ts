// packages/website/src/features/news/api/GetNewsItem.ts

import {useQuery, queryOptions} from '@tanstack/react-query';

import {env} from '@/config/env'
import { QueryConfig } from '@/lib/ReactQuery';
import {ApiResponse, NewsItem} from '@/types';

export async function getNewsItem({slug}: {slug: string}): Promise<NewsItem>
{
  const response = await fetch(`${env.API_URL}/api/news/${slug}`);
  const result = (await response.json()) as ApiResponse<NewsItem>;

  if (!response.ok || result.data === null) {
    if (response.status === 404) {
      throw new Error('記事が見つかりません');
    }
    throw new Error(`HTTP エラー! ステータス: ${response.status}`);
  }

  const data = result.data;

  return {
    ...data,
    published: new Date(data.published),
    updated: data.updated ? new Date(data.updated) : undefined,
  };
}
export const getNewsItemQueryOptions = (slug: string) => {
  return queryOptions({
    queryKey: ['newsItems', slug],
    queryFn: () => getNewsItem({ slug }),
  });
};

type UseNewsItemOptions = {
  queryConfig?: QueryConfig<() => typeof getNewsItemQueryOptions>;
  slug: string;
};

export const useNewsItem = ({
  slug,
  queryConfig,
}: UseNewsItemOptions) => {
  return useQuery({
    ...getNewsItemQueryOptions(slug),
    ...queryConfig,
    enabled: !!slug,
  });
};
