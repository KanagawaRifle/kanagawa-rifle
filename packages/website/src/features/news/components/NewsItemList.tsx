// packages/website/src/features/news/components/NewsItemList.tsx

'use client';

import {
  Alert,
  AlertTitle,
  FormControl,
  List,
  MenuItem,
  Pagination,
  Select,
  Skeleton as MuiSkeleton,
  Stack,
} from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import { useQueryClient } from '@tanstack/react-query';
import { notFound, useSearchParams, useRouter } from 'next/navigation';
import React from 'react';
import { LuRotateCw } from 'react-icons/lu';

import { getNewsItemQueryOptions } from '@/features/news/api/NewsItemGet';
import { useListNewsItems, DEFAULT_SIZE, sizes } from '@/features/news/api/NewsItemList';

import { Skeleton, ListNewsItem } from './ListItem';

type PaginationControlProps = {
  total: number;
  current: number;
  size: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

function PaginationControl({ total, current, size, totalPages, onPageChange }: PaginationControlProps) {
  return (
    <Stack className="flex flex-col items-center justify-center" spacing={2}>
      <Box color="text.secondary">
        {total}件中 {(current - 1) * size + 1}〜{Math.min(current * size, total)}件を表示
      </Box>
      <Pagination
        count={totalPages}
        page={current}
        onChange={(_, page) => onPageChange(page)}
        color="primary"
        showFirstButton
        showLastButton
        siblingCount={1}
        boundaryCount={1}
        variant="outlined"
      />
    </Stack>
  );
}

function PaginationSkeleton() {
  return (
    <Stack className="flex flex-col items-center justify-center" spacing={2}>
      <Box color="text.secondary">
        <MuiSkeleton width="10rem" />
      </Box>
      <Pagination page={1} count={1} disabled color="primary" showFirstButton showLastButton variant="outlined" />
    </Stack>
  );
}

export type ListNewsItemsProps = {
  onPrefetch?: (slug: string) => void;
  page?: number;
  size?: number;
  withControls?: boolean;
};

export function NewsItemList({
  onPrefetch,
  page: paramPage,
  size: paramSize,
  withControls = true,
}: ListNewsItemsProps) {
  const searchParams = useSearchParams();
  const page = paramPage ?? (searchParams?.get('page') ? Number(searchParams.get('page')) : 1);
  const size = paramSize ?? (searchParams?.get('size') ? Number(searchParams.get('size')) : DEFAULT_SIZE);

  const query = useListNewsItems({ page, size });
  const queryClient = useQueryClient();

  const router = useRouter();

  const goToPage = (newPage: number) => {
    const params = new URLSearchParams(searchParams?.toString() ?? '');
    params.set('size', size.toString());
    params.set('page', newPage.toString());
    router.push(`?${params.toString()}`);
  };

  const changeSize = (newSize: number) => {
    const params = new URLSearchParams(searchParams?.toString() ?? '');
    params.set('size', newSize.toString());
    params.delete('page');
    router.push(`?${params.toString()}`);
  };

  if (query.isLoading || query.isFetching) {
    return (
      <Stack spacing={2}>
        {withControls && (
          <div className="flex items-center justify-between">
            <FormControl>
              <Select variant="outlined" size="small" disabled value={size}>
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
        )}

        {withControls && <PaginationSkeleton />}

        {withControls ? (
          <Card>
            <List>
              {[...Array(DEFAULT_SIZE).keys()].map((_, index) => (
                <Skeleton key={index} isLast={DEFAULT_SIZE - 1 === index} />
              ))}
            </List>
          </Card>
        ) : (
          <List>
            {[...Array(DEFAULT_SIZE).keys()].map((_, index) => (
              <Skeleton key={index} isLast={DEFAULT_SIZE - 1 === index} />
            ))}
          </List>
        )}

        {withControls && <PaginationSkeleton />}
      </Stack>
    );
  }

  if (query.isError) {
    return (
      <Alert severity="error">
        <AlertTitle>エラー</AlertTitle>
        <Stack spacing={1}>
          <div>{query.error.message}</div>
          <Button onClick={() => query.refetch()} color="error" startIcon={<LuRotateCw />}>
            再試行
          </Button>
        </Stack>
      </Alert>
    );
  }

  if (!query.data) notFound();

  const items = query.data.data;
  const pagination = query.data.pagination;

  return (
    <Stack spacing={2}>
      {withControls && (
        <div className="flex items-center justify-between">
          <FormControl>
            <Select variant="outlined" size="small" value={size} onChange={(e) => changeSize(Number(e.target.value))}>
              <MenuItem value={12}>12件</MenuItem>
              <MenuItem value={64}>64件</MenuItem>
              <MenuItem value={128}>128件</MenuItem>
            </Select>
          </FormControl>
          <Button variant="text" startIcon={<LuRotateCw />} onClick={() => query.refetch()}>
            更新
          </Button>
        </div>
      )}

      {withControls && (
        <PaginationControl
          total={pagination.total}
          current={pagination.current}
          size={pagination.size}
          totalPages={pagination.totalPages}
          onPageChange={goToPage}
        />
      )}

      {withControls ? (
        <Card>
          <List>
            {items.map((item, index) => (
              <ListNewsItem
                key={item.slug}
                {...item}
                isLast={items.length - 1 === index}
                onMouseEnter={async () => {
                  await queryClient.prefetchQuery(getNewsItemQueryOptions(item.slug));
                  onPrefetch?.(item.slug);
                }}
              />
            ))}
          </List>
        </Card>
      ) : (
        <List>
          {items.map((item, index) => (
            <ListNewsItem
              key={item.slug}
              {...item}
              isLast={items.length - 1 === index}
              onMouseEnter={async () => {
                await queryClient.prefetchQuery(getNewsItemQueryOptions(item.slug));
                onPrefetch?.(item.slug);
              }}
            />
          ))}
        </List>
      )}

      {withControls && (
        <PaginationControl
          total={pagination.total}
          current={pagination.current}
          size={pagination.size}
          totalPages={pagination.totalPages}
          onPageChange={goToPage}
        />
      )}
    </Stack>
  );
}
