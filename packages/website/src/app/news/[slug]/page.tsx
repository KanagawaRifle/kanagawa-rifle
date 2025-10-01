// packages/website/src/app/news/[slug]/page.tsx

import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { Metadata } from 'next';
import React from 'react';

import { env } from '@/config';
import { getNewsItem, getNewsItemQueryOptions } from '@/features/news/api/NewsItemGet';
import { listNewsItems, getListNewsItemsQueryOptions } from '@/features/news/api/NewsItemList';

import { NewsItem } from './_components/NewsItem';

type Props = {
  params: Promise<{ slug: string }>;
};

const preloadData = async (slug: string) => {
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery(getNewsItemQueryOptions(slug)),
    queryClient.prefetchQuery(getListNewsItemsQueryOptions({ size: 64 })),
  ]);

  const dehydratedState = dehydrate(queryClient);

  return {
    dehydratedState,
    queryClient,
  };
};

export async function generateStaticParams() {
  try {
    const res = await listNewsItems({ page: 1, size: 64 });

    if (!res.data || res.data.length === 0) {
      console.warn('No news items found for static generation');
      return [];
    }

    return res.data.map((item) => ({ slug: item.slug }));
  } catch (error) {
    console.error('Failed to generate static params:', error);

    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { slug } = await params;
    const item = await getNewsItem({ slug });

    return {
      title: item?.title,
      description: item?.excerpt ?? item?.title,
      openGraph: { images: new URL(`/api/og?title=${encodeURIComponent(item?.title || '')}`, env.APP_URL) },
      twitter: { images: new URL(`/api/og?title=${encodeURIComponent(item?.title || '')}`, env.APP_URL) },
    };
  } catch (error) {
    console.error('Failed to generate metadata:', error);

    return {
      title: 'ニュース記事',
      description: 'ニュース記事をご覧ください',
    };
  }
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const { dehydratedState, queryClient } = await preloadData(slug);
  const _ = queryClient.getQueryData(getNewsItemQueryOptions(slug).queryKey);

  return (
    <HydrationBoundary state={dehydratedState}>
      <NewsItem slug={slug} />
    </HydrationBoundary>
  );
}
