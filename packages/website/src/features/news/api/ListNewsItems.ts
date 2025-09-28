import { queryOptions, useQuery } from '@tanstack/react-query';

import {env} from '@/config/env'
import { QueryConfig } from '@/lib/ReactQuery';
import {ApiResponse, NewsItem, Paginated} from '@/types';

export const DEFAULT_SIZE = 12;
export const sizes = [6, DEFAULT_SIZE, 64, 128] as const
export async function listNewsItems(
  {page, size}: {page: number, size: number}
): Promise<Paginated<NewsItem>> {
  const response = await fetch(`${env.API_URL}/api/news?page=${page}&size=${size}`);
  const result = (await response.json()) as ApiResponse<Paginated<NewsItem>>;

  if (!response.ok || result.data === null) {
    console.error(`HTTP エラー! ステータス: ${response.status}` + {result})
    throw new Error(`HTTP エラー! ステータス: ${response.status}`);
  }

  return result.data;
}
export const getListNewsItemsQueryOptions = (
  {page = 1, size = DEFAULT_SIZE}: {page?: number, size?: number} = {}
) => {
  return queryOptions({
    queryKey: ['ListNewsItems', { page, size }],
    queryFn: () => listNewsItems({ page, size }),
  });
};

type UseListNewsItemsOptions = {
  queryConfig?: QueryConfig<() => typeof getListNewsItemsQueryOptions>;
  page?: number;
  size?: number;
};

export const useListNewsItems = ({
  queryConfig,
  page,
  size,
}: UseListNewsItemsOptions) => {
  return useQuery({
    ...getListNewsItemsQueryOptions({page, size}),
    ...queryConfig,
  });
};
