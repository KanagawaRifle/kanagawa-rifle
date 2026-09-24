import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { PageLayout } from '@/components';
import { env, paths } from '@/config';
import { NewsItemList } from '@/features/news/components/NewsItemList';
import { NewsQuerySchema } from '@/features/news/schema';
import { getNewsList } from '@/features/news/server/news';

const currentPath = paths.main.news;
export const metadata: Metadata = {
  title: currentPath.name,
  description: currentPath.description,
  openGraph: { images: new URL(`/api/og?title=${currentPath.name}`, env.APP_URL) },
  twitter: { images: new URL(`/api/og?title=${currentPath.name}`, env.APP_URL) },
};

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

export default async function Page({ searchParams }: Props) {
  const params = await searchParams;
  if (Array.isArray(params.page) || Array.isArray(params.size)) notFound();
  const query = NewsQuerySchema.safeParse(params);
  if (!query.success) notFound();
  const news = await getNewsList(query.data);
  if (query.data.page > Math.max(1, news.pagination.totalPages)) notFound();

  return (
    <PageLayout
      title={currentPath.name}
      breadcrumbs={[
        { name: paths.home.name, path: paths.home.getHref() },
        { name: currentPath.name, path: currentPath.getHref() },
      ]}
    >
      <NewsItemList news={news} />
    </PageLayout>
  );
}
