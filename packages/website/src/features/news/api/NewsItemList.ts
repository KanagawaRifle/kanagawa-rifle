import { queryOptions, useQuery } from '@tanstack/react-query';

import { getApiUrl } from '@/config/env';
import { QueryConfig } from '@/lib/ReactQuery';
import { ApiResponse, NewsItem, Paginated } from '@/types';

export const DEFAULT_SIZE = 12;
export const sizes = [6, DEFAULT_SIZE, 64, 128] as const;

// APIから取得
export async function listNewsItems({ page, size }: { page: number; size: number }): Promise<Paginated<NewsItem>> {
  const apiUrl = getApiUrl();
  const response = await fetch(`${apiUrl}/api/news?page=${page}&size=${size}`, {
    // サーバーサイドでは Next.js Data Cache を使用（5分間キャッシュ）
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    throw new Error(`HTTP エラー! ステータス: ${response.status}`);
  }

  const result = (await response.json()) as ApiResponse<Paginated<NewsItem>>;

  if (result.data === null) {
    throw new Error('APIからデータを取得できませんでした');
  }

  return result.data;
}

export const getListNewsItemsQueryOptions = ({
  page = 1,
  size = DEFAULT_SIZE,
}: { page?: number; size?: number } = {}) => {
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

export const useListNewsItems = ({ queryConfig, page, size }: UseListNewsItemsOptions) => {
  return useQuery({
    ...getListNewsItemsQueryOptions({ page, size }),
    ...queryConfig,
  });
};
