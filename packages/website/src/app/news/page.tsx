import { notFound } from 'next/navigation';

import { PageLayout } from '@/components/PageLayout';
import { paths } from '@/config/paths';
import { NewsList } from '@/features/news/components/NewsList';
import { NewsQuerySchema } from '@/features/news/schema';
import { getNewsList } from '@/features/news/server/news';
import { createPageMetadata } from '@/lib/metadata';

const currentPath = paths.main.news;
export const metadata = createPageMetadata({ title: currentPath.name, description: currentPath.description });

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
      <NewsList news={news} />
    </PageLayout>
  );
}
