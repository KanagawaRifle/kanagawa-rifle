// packages/website/src/features/news/api/NewsItemGet.ts

import { useQuery, queryOptions } from '@tanstack/react-query';

import { getApiUrl } from '@/config/env';
import { QueryConfig } from '@/lib/ReactQuery';
import { ApiResponse, NewsItem } from '@/types';

class LocalError extends Error {}

// APIから取得
export async function getNewsItem({ slug }: { slug: string }): Promise<NewsItem | null> {
  try {
    const apiUrl = getApiUrl();
    const response = await fetch(`${apiUrl}/api/news/${slug}`);
    const result = (await response.json()) as ApiResponse<NewsItem>;

    if (!response.ok) {
      if (response.status === 404) {
        console.warn(`[features/news/api/NewsItemGet/getNewsItem] 記事が見つかりませんでした (slug: ${slug})`);
        return null;
      }
      if (response.status === 500) {
        console.error(`[features/news/api/NewsItemGet/getNewsItem] サーバーエラーが発生しました:`, {
          slug,
          status: response.status,
          error: result?.error?.message,
        });
        throw new LocalError('サーバーエラーが発生しました');
      }
      console.error(`[features/news/api/NewsItemGet/getNewsItem] 記事の取得に失敗しました:`, {
        slug,
        status: response.status,
        error: result?.error?.message,
      });
      throw new LocalError(`記事の取得に失敗しました (ステータス: ${response.status})`);
    }

    // レスポンスデータの検証
    if (!result.data) {
      console.error(`[features/news/api/NewsItemGet/getNewsItem] 記事データが取得できませんでした:`, {
        slug,
        error: result?.error?.message,
      });
      throw new LocalError('記事データが取得できませんでした');
    }

    const data = result.data;
    try {
      return {
        ...data,
        published: data.published ? new Date(data.published) : new Date(),
        updated: data.updated ? new Date(data.updated) : undefined,
      };
    } catch (error) {
      console.error(`[features/news/api/NewsItemGet/getNewsItem] 日付の変換に失敗しました:`, {
        slug,
        error,
        published: data.published,
        updated: data.updated,
      });

      return {
        ...data,
        published: new Date(),
        updated: undefined,
      };
    }
  } catch (error) {
    if (error instanceof LocalError) {
      throw error;
    }

    console.error(`[features/news/api/NewsItemGet/getNewsItem] ネットワークエラー:`, {
      slug,
      error: error instanceof Error ? error.message : String(error),
      name: error instanceof Error ? error.name : 'Unknown',
    });
    throw new Error('ネットワークエラーが発生しました');
  }
}

export const getNewsItemQueryOptions = (slug: string) => {
  return queryOptions({
    queryKey: ['newsItems', slug] as const,
    queryFn: () => getNewsItem({ slug }),
  });
};

type UseNewsItemOptions = {
  queryConfig?: QueryConfig<() => typeof getNewsItemQueryOptions>;
  slug: string;
};

export const useNewsItem = ({ slug, queryConfig }: UseNewsItemOptions) => {
  return useQuery({
    ...getNewsItemQueryOptions(slug),
    ...queryConfig,
    enabled: !!slug,
  });
};
