// packages/website/src/app/news/[slug]/_components/NewsItem.tsx
'use client';

import React from 'react';

import { PageLayout } from '@/components';
import { paths } from '@/config';
import { useNewsItem } from '@/features/news/api/NewsItemGet';
import { NewsItemGet } from '@/features/news/components/NewsItemGet';

type Props = {
  slug: string;
};

export function NewsItem({ slug }: Props) {
  const { data: item, isLoading, isError } = useNewsItem({ slug });

  const title = React.useMemo(() => {
    if (isError) return 'エラー';
    if (isLoading) return '読み込み中...';
    return item?.title ?? 'お知らせ';
  }, [item?.title, isLoading, isError]);

  const breadcrumbs = React.useMemo(
    () => [
      { name: paths.home.name, path: paths.home.getHref() },
      { name: paths.main.news.name, path: paths.main.news.getHref() },
      { name: title, path: `/news/${slug}` },
    ],
    [title, slug],
  );

  return (
    <PageLayout title={title} breadcrumbs={breadcrumbs}>
      <NewsItemGet slug={slug} />
    </PageLayout>
  );
}
