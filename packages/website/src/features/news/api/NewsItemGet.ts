// packages/website/src/features/news/api/NewsItemGet.ts

import { useQuery, queryOptions } from '@tanstack/react-query';

import { getApiUrl, REVALIDATE } from '@/config';
import { logger } from '@/lib/logger';
import { QueryConfig } from '@/lib/ReactQuery';
import { ApiResponse, NewsItem } from '@/types';

class LocalError extends Error {}

// APIから取得
export async function getNewsItem({ slug }: { slug: string }): Promise<NewsItem | null> {
  try {
    const apiUrl = getApiUrl();
    const response = await fetch(`${apiUrl}/api/news/${slug}`, {
      next: { revalidate: REVALIDATE.NEWS_ITEM },
    });

    if (!response.ok) {
      if (response.status === 404) {
        logger.warn('記事が見つかりませんでした', { slug, source: 'NewsItemGet.getNewsItem' });
        return null;
      }
      if (response.status === 500) {
        logger.error('サーバーエラーが発生しました', { slug, status: response.status, source: 'NewsItemGet.getNewsItem' });
        throw new LocalError('サーバーエラーが発生しました');
      }
      logger.error('記事の取得に失敗しました', { slug, status: response.status, source: 'NewsItemGet.getNewsItem' });
      throw new LocalError(`記事の取得に失敗しました (ステータス: ${response.status})`);
    }

    const result = (await response.json()) as ApiResponse<NewsItem>;

    // レスポンスデータの検証
    if (!result.data) {
      logger.error('記事データが取得できませんでした', {
        slug,
        error: result?.error?.message,
        source: 'NewsItemGet.getNewsItem',
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
      logger.error('日付の変換に失敗しました', {
        slug,
        error: error instanceof Error ? error.message : String(error),
        published: String(data.published),
        updated: String(data.updated),
        source: 'NewsItemGet.getNewsItem',
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

    logger.error('ネットワークエラー', {
      slug,
      error: error instanceof Error ? error.message : String(error),
      errorName: error instanceof Error ? error.name : 'Unknown',
      source: 'NewsItemGet.getNewsItem',
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
