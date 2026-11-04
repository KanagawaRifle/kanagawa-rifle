import { notFound } from 'next/navigation';
import { cache } from 'react';

import { PageLayout } from '@/components/PageLayout';
import { paths } from '@/config/paths';
import { NewsList } from '@/features/news/components/NewsList';
import { NewsListControls } from '@/features/news/components/NewsListControls';
import { DEFAULT_NEWS_PAGE_SIZE } from '@/features/news/constants';
import { getNewsListHref } from '@/features/news/paths';
import { NewsQuerySchema } from '@/features/news/schema';
import { getNewsList } from '@/features/news/server/news';
import { getNewsListJsonLd } from '@/features/news/server/seo';
import { createPageMetadata } from '@/lib/metadata';

const currentPath = paths.main.news;

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

const getPage = cache(async (searchParams: Props['searchParams']) => {
  const params = await searchParams;
  if (Array.isArray(params.page) || Array.isArray(params.size)) notFound();
  const query = NewsQuerySchema.safeParse(params);
  if (!query.success) notFound();
  const news = await getNewsList(query.data);
  if (query.data.page > Math.max(1, news.pagination.totalPages)) notFound();
  return news;
});

export async function generateMetadata({ searchParams }: Props) {
  const { pagination } = await getPage(searchParams);
  const title = pagination.current === 1 ? currentPath.name : `${currentPath.name}（${pagination.current}ページ目）`;
  return createPageMetadata({
    title,
    description: `${currentPath.description}${pagination.current > 1 ? ` ${pagination.current}ページ目を表示しています。` : ''}`,
    path: getNewsListHref({ page: pagination.current, size: pagination.size }),
    noindex: pagination.size !== DEFAULT_NEWS_PAGE_SIZE,
    pagination: {
      previous: pagination.hasPrev
        ? getNewsListHref({ page: pagination.current - 1, size: pagination.size })
        : undefined,
      next: pagination.hasNext ? getNewsListHref({ page: pagination.current + 1, size: pagination.size }) : undefined,
    },
  });
}

export default async function Page({ searchParams }: Props) {
  const news = await getPage(searchParams);
  const title =
    news.pagination.current === 1 ? currentPath.name : `${currentPath.name}（${news.pagination.current}ページ目）`;
  const path = getNewsListHref({ page: news.pagination.current, size: news.pagination.size });
  const description = `${currentPath.description}${news.pagination.current > 1 ? ` ${news.pagination.current}ページ目を表示しています。` : ''}`;

  return (
    <PageLayout
      title={title}
      page={{ path, description, type: 'CollectionPage', mainEntity: getNewsListJsonLd(news) }}
      breadcrumbs={[
        { name: paths.home.name, path: paths.home.getHref() },
        ...(news.pagination.current > 1 ? [{ name: currentPath.name, path: currentPath.getHref() }] : []),
        { name: title, path },
      ]}
    >
      <p className="text-muted-foreground">{currentPath.description}</p>
      <div className="space-y-4">
        <NewsListControls size={news.pagination.size} />
        <NewsList news={news} />
      </div>
    </PageLayout>
  );
}
