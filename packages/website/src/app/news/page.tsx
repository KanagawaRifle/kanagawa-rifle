// packages/website/src/app/news/page.tsx

import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { ChevronFirst, ChevronLast, ChevronLeft, ChevronRight, RotateCw } from 'lucide-react';
import type { Metadata } from 'next';
import React, { Suspense } from 'react';

import { PageLayout } from '@/components';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton as UISkeleton } from '@/components/ui/skeleton';
import { env, paths } from '@/config';
import { DEFAULT_SIZE, sizes, getListNewsItemsQueryOptions } from '@/features/news/api/NewsItemList';
import { Skeleton } from '@/features/news/components/ListItem';
import { NewsItemList } from '@/features/news/components/NewsItemList';

/**
 * サーバーサイドでニュースデータをプリフェッチ
 * これにより、クライアントサイドでのデータ取得を待つ必要がなくなり、FCP が改善される
 */
const preloadData = async (page = 1, size = DEFAULT_SIZE) => {
  const queryClient = new QueryClient();

  // サーバーサイドでデータをプリフェッチ
  await queryClient.prefetchQuery(getListNewsItemsQueryOptions({ page, size }));

  const dehydratedState = dehydrate(queryClient);

  return {
    dehydratedState,
    queryClient,
  };
};

const currentPath = paths.main.news;
export const metadata: Metadata = {
  title: currentPath.name,
  description: currentPath.description,
  openGraph: { images: new URL(`/api/og?title=${currentPath.name}`, env.APP_URL) },
  twitter: { images: new URL(`/api/og?title=${currentPath.name}`, env.APP_URL) },
};

function LoadingFallback() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Select disabled value={DEFAULT_SIZE.toString()}>
          <SelectTrigger className="w-24">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {sizes.map((val) => (
              <SelectItem key={val} value={val.toString()}>
                {val}件
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button variant="ghost" disabled>
          <RotateCw className="mr-2 h-4 w-4 animate-spin" />
          更新
        </Button>
      </div>
      <div className="flex flex-col items-center justify-center gap-4">
        <UISkeleton className="h-5 w-40" />
        <div className="flex items-center gap-1">
          <Button variant="outline" size="icon" disabled>
            <ChevronFirst className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" disabled>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="px-3 text-sm">1 / 1</span>
          <Button variant="outline" size="icon" disabled>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" disabled>
            <ChevronLast className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <Card>
        <ul>
          {[...Array(DEFAULT_SIZE).keys()].map((item, index) => (
            <Skeleton key={index} isLast={DEFAULT_SIZE - 1 === index} />
          ))}
        </ul>
      </Card>
    </div>
  );
}

export default async function Page() {
  const { dehydratedState } = await preloadData();

  return (
    <PageLayout
      title={currentPath.name}
      breadcrumbs={[
        { name: paths.home.name, path: paths.home.getHref() },
        { name: currentPath.name, path: currentPath.getHref() },
      ]}
    >
      <Suspense fallback={<LoadingFallback />}>
        <HydrationBoundary state={dehydratedState}>
          <NewsItemList />
        </HydrationBoundary>
      </Suspense>
    </PageLayout>
  );
}
