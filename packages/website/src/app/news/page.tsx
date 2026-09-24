import { notFound } from 'next/navigation';
import { cache } from 'react';

import { PageLayout } from '@/components/PageLayout';
import { paths } from '@/config/paths';
import { NewsList } from '@/features/news/components/NewsList';
import { DEFAULT_NEWS_PAGE_SIZE } from '@/features/news/constants';
import { getNewsListHref } from '@/features/news/paths';
import { NewsQuerySchema } from '@/features/news/schema';
import { getNewsList } from '@/features/news/server/news';
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
  });
}

export default async function Page({ searchParams }: Props) {
  const news = await getPage(searchParams);

  return (
    <PageLayout
      title={currentPath.name}
      breadcrumbs={[
        { name: paths.home.name, path: paths.home.getHref() },
        { name: currentPath.name, path: currentPath.getHref() },
      ]}
    >
      <p className="text-muted-foreground">{currentPath.description}</p>
      <NewsList news={news} />
    </PageLayout>
  );
}
