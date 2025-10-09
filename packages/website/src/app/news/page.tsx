// packages/website/src/app/news/page.tsx

import { FormControl, InputLabel, List, MenuItem, Select, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import type { Metadata } from 'next';
import React, { Suspense } from 'react';

import { PageLayout } from '@/components';
import { env, paths } from '@/config';
import { DEFAULT_SIZE, sizes } from '@/features/news/api/NewsItemList';
import { Skeleton } from '@/features/news/components/ListItem';

import { NewsItems } from './_components/NewsItems';

const preloadData = async () => {
  const queryClient = new QueryClient();
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
    <Suspense
      fallback={
        <Stack spacing={2}>
          <Box className="flex items-center justify-between">
            <FormControl>
              <InputLabel>表示件数</InputLabel>
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
          </Box>
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
        <PageLayout
          title={currentPath.name}
          breadcrumbs={[
            { name: paths.home.name, path: paths.home.getHref() },
            { name: currentPath.name, path: currentPath.getHref() },
          ]}
        >
          <NewsItems />
        </PageLayout>
      </HydrationBoundary>
    </Suspense>
  );
}
