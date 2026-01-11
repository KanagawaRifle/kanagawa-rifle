// packages/website/src/app/news/[slug]/page.tsx

import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { Metadata } from 'next';
import React from 'react';

import { app, env } from '@/config';
import { getNewsItem, getNewsItemQueryOptions } from '@/features/news/api/NewsItemGet';
import { listNewsItems, getListNewsItemsQueryOptions } from '@/features/news/api/NewsItemList';
import { logger } from '@/lib/logger';

import { NewsItem } from './_components/NewsItem';

type Props = {
  params: Promise<{ slug: string }>;
};

const preloadData = async (slug: string) => {
  const queryClient = new QueryClient();

  try {
    await Promise.all([
      queryClient.prefetchQuery(getNewsItemQueryOptions(slug)),
      queryClient.prefetchQuery(getListNewsItemsQueryOptions({ size: 64 })),
    ]);
  } catch {
    // ビルド時はAPIが利用できないためスキップ
  }

  const dehydratedState = dehydrate(queryClient);

  return {
    dehydratedState,
    queryClient,
  };
};

export async function generateStaticParams() {
  try {
    const res = await listNewsItems({ page: 1, size: 10000 });

    if (!res.data || res.data.length === 0) {
      logger.warn('No news items found for static generation', { source: 'news/[slug]/page.generateStaticParams' });
      return [];
    }

    return res.data.map((item) => ({ slug: item.slug }));
  } catch (error) {
    logger.error('Failed to generate static params', {
      error: error instanceof Error ? error.message : String(error),
      source: 'news/[slug]/page.generateStaticParams',
    });
    // ビルド時にAPIが利用できない場合は空配列を返す
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
    logger.error('Failed to generate metadata', {
      error: error instanceof Error ? error.message : String(error),
      source: 'news/[slug]/page.generateMetadata',
    });

    return {
      title: 'ニュース記事',
      description: 'ニュース記事をご覧ください',
    };
  }
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const { dehydratedState, queryClient } = await preloadData(slug);
  const newsItem = queryClient.getQueryData(getNewsItemQueryOptions(slug).queryKey);

  // Article JSON-LD を生成
  const articleJsonLd = newsItem
    ? {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: newsItem.title,
        description: newsItem.excerpt ?? newsItem.title,
        datePublished: newsItem.published,
        dateModified: newsItem.updated ?? newsItem.published,
        author: {
          '@type': 'Organization',
          name: app.name,
          url: env.APP_URL,
        },
        publisher: {
          '@type': 'Organization',
          name: app.name,
          url: env.APP_URL,
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': new URL(`/news/${slug}`, env.APP_URL).toString(),
        },
      }
    : null;

  return (
    <HydrationBoundary state={dehydratedState}>
      {articleJsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      )}
      <NewsItem slug={slug} />
    </HydrationBoundary>
  );
}
