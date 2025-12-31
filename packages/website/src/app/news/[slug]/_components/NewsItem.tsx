// packages/website/src/app/news/[slug]/_components/NewsItem.tsx
'use client';

import { PageLayout } from '@/components';
import { paths } from '@/config';
import { useNewsItem } from '@/features/news/api/NewsItemGet';
import { NewsItemGet } from '@/features/news/components/NewsItemGet';

type Props = {
  slug: string;
};

export function NewsItem({ slug }: Props) {
  const { data: item, isLoading, isError } = useNewsItem({ slug });

  const title = isError ? 'エラー' : isLoading ? '読み込み中...' : (item?.title ?? 'お知らせ');

  const breadcrumbs = [
    { name: paths.home.name, path: paths.home.getHref() },
    { name: paths.main.news.name, path: paths.main.news.getHref() },
    { name: title, path: `/news/${slug}` },
  ];

  return (
    <PageLayout title={title} breadcrumbs={breadcrumbs}>
      <NewsItemGet slug={slug} />
    </PageLayout>
  );
}
