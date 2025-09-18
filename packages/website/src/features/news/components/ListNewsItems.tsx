'use client';

import {
  Alert,
  AlertTitle,
  FormControl,
  InputLabel,
  List,
  MenuItem, Pagination,
  Select,
  Stack
} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import {useQueryClient} from '@tanstack/react-query';
import {notFound, useSearchParams, useRouter} from 'next/navigation';
import React from "react";
import {LuRotateCw} from "react-icons/lu";

import {getNewsItemQueryOptions} from '@/features/news/api/GetNewsItem'
import {useListNewsItems, DEFAULT_SIZE, sizes} from '@/features/news/api/ListNewsItems'


import {Skeleton, ListNewsItem} from "./ListItem"


export type ListNewsItemsProps = {
  onPrefetch?: (slug: string) => void;
};

export function ListNewsItems({onPrefetch}: ListNewsItemsProps) {
  const searchParams = useSearchParams();
  const page = searchParams?.get('page') ? Number(searchParams.get('page')) : 1;
  const size = searchParams?.get('size') ? Number(searchParams.get('size')) : DEFAULT_SIZE;

  const query = useListNewsItems({page, size});
  const queryClient = useQueryClient();

  const router = useRouter();

  const goToPage = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('size', size.toString());
    params.set('page', newPage.toString());
    router.push(`?${params.toString()}`);
  };

  const changeSize = (newSize: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('size', newSize.toString());
    params.delete('page');
    router.push(`?${params.toString()}`);
  }

  if (query.isLoading || query.isFetching) {
    return (
      <Stack spacing={2}>
        <Box className="flex items-center justify-between">
          <FormControl>
            <InputLabel>表示件数</InputLabel>
            <Select
              size="small"
              disabled
              value={size}
            >
              {sizes.map((val, i) => <MenuItem key={i} value={val}>{val}件</MenuItem>)}
            </Select>
          </FormControl>
          <Button variant="text" loading loadingPosition="start">更新</Button>
        </Box>
        <Card>
          <List>
            {[...Array(DEFAULT_SIZE).keys()].map((item, index) => (
              <Skeleton key={index} isLast={DEFAULT_SIZE - 1 === index}/>
            ))}
          </List>
        </Card>
      </Stack>
    );
  }

  if (query.isError) {
    return (
      <Alert severity="error">
        <AlertTitle>エラー</AlertTitle>
        <Stack spacing={1}>
          <Box>{query.error.message}</Box>
          <Button onClick={() => query.refetch()} color="error" startIcon={<LuRotateCw/>}>再試行</Button>
        </Stack>
      </Alert>
    );
  }

  if (!query.data) notFound();

  const items = query.data.data;
  const pagination = query.data.pagination;

  return (
    <Stack spacing={2}>
      <Box className="flex items-center justify-between">
        {/* ページサイズ選択 */}
        <FormControl>
          <InputLabel>表示件数</InputLabel>
          <Select
            size="small"
            value={size}
            onChange={(e) => changeSize(Number(e.target.value))}
          >
            <MenuItem value={12}>12件</MenuItem>
            <MenuItem value={64}>64件</MenuItem>
            <MenuItem value={128}>128件</MenuItem>
          </Select>
        </FormControl>
        {/* ページ更新 */}
        <Button variant="text" startIcon={<LuRotateCw />} onClick={() => query.refetch()}>更新</Button>
      </Box>

      <Card>
        <List>
          {items.map((item, index) => (
            <ListNewsItem
              key={index}
              {...item}
              isLast={items.length - 1 === index}
              onMouseEnter={async () => {
                await queryClient.prefetchQuery(getNewsItemQueryOptions(item.slug));
                onPrefetch?.(item.slug)
              }}
            />
          ))}
        </List>
      </Card>

      <Stack className="flex justify-center items-center flex-col" spacing={2}>
        {/* 件数表示 */}
        <Box color="text.secondary">
          {pagination.total}件中 {(pagination.current - 1) * pagination.size + 1}〜
          {Math.min(pagination.current * pagination.size, pagination.total)}件を表示
        </Box>
        {/* Paginator */}
        <Pagination
          count={pagination.totalPages}
          page={pagination.current}
          onChange={(event, page) => goToPage(page)}
          // onMouseEnter={pagination.current < pagination.totalPages ? handleNextPageHover : undefined}
          color="primary"
          showFirstButton
          showLastButton
          siblingCount={1}
          boundaryCount={1}
          variant="outlined"

        />
      </Stack>
    </Stack>
  )
}
