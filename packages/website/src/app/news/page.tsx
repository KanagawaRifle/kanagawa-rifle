// packages/website/src/app/news/page.tsx

import { FormControl, List, MenuItem, Pagination, Select, Skeleton as MuiSkeleton, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import type { Metadata } from 'next';
import React, { Suspense } from 'react';

import { PageLayout } from '@/components';
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
      <Suspense
        fallback={
          <Stack spacing={2}>
            <div className="flex items-center justify-between">
              <FormControl>
                <Select variant="outlined" size="small" disabled value={DEFAULT_SIZE}>
                  {sizes.map((val, i) => (
                    <MenuItem key={i} value={val}>
                      {val}件
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button variant="text" loading loadingPosition="start">
                更新
              </Button>
            </div>
            <Stack className="flex flex-col items-center justify-center" spacing={2}>
              <Box color="text.secondary">
                <MuiSkeleton width="10rem" />
              </Box>
              <Pagination
                page={1}
                count={1}
                disabled
                color="primary"
                showFirstButton
                showLastButton
                variant="outlined"
              />
            </Stack>
            <Card>
              <List>
                {[...Array(DEFAULT_SIZE).keys()].map((item, index) => (
                  <Skeleton key={index} isLast={DEFAULT_SIZE - 1 === index} />
                ))}
              </List>
            </Card>
          </Stack>
        }
      >
        <HydrationBoundary state={dehydratedState}>
          <NewsItemList />
        </HydrationBoundary>
      </Suspense>
    </PageLayout>
  );
}
