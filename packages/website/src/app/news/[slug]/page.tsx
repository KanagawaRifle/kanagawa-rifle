// packages/website/src/app/news/[slug]/page.tsx

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { Metadata } from 'next';
import {notFound} from "next/navigation";
import React from 'react';

import {env} from "@/config";
import {
  getNewsItem,
  getNewsItemQueryOptions,
} from '@/features/news/api/GetNewsItem';

import {NewsItem} from './_components/NewsItem'

type Props = {
  params: Promise<{ slug: string }>;
};

const preloadData = async (slug: string) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(getNewsItemQueryOptions(slug));
  const dehydratedState = dehydrate(queryClient);

  return {
    dehydratedState,
    queryClient,
  };
};

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { slug } = await params;
  const item = await getNewsItem({ slug });

  return {
    title: item.title,
    description: item.excerpt ?? item.title,
    openGraph: {images: new URL(`/api/og?title=${item.title}`, env.APP_URL)},
    twitter: {images: new URL(`/api/og?title=${item.title}`, env.APP_URL)},
  };
};

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const { dehydratedState, queryClient } = await preloadData(slug);
  const item = queryClient.getQueryData(
    getNewsItemQueryOptions(slug).queryKey,
  );

  if (!item) notFound()

  return (
    <HydrationBoundary state={dehydratedState}>
      <NewsItem slug={slug} />
    </HydrationBoundary>
  );
}
