// packages/website/src/app/news/[slug]/_components/NewsItem.tsx
'use client';

import {PageLayout} from "@/components"
import {paths} from "@/config";
import {useNewsItem} from '@/features/news/api/GetNewsItem'
import {GetNewsItem} from '@/features/news/components/GetNewsItem'

export function NewsItem({ slug }: { slug: string })
{
  const query = useNewsItem({slug})
  const item = query.data

  return (
    <PageLayout
      title={String(item?.title)}
      breadcrumbs={[
        {name: paths.home.name, path: paths.home.getHref()},
        {name: paths.main.news.name, path: paths.main.news.getHref()},
        {name: String(item?.title), path: `/news/${slug}`},
      ]}
    >
      <GetNewsItem slug={slug} />
    </PageLayout>
  );
}
