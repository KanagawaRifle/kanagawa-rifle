// packages/website/src/features/news/components/NewsItemList.tsx

'use client';

import { useQueryClient } from '@tanstack/react-query';
import { ChevronFirst, ChevronLast, ChevronLeft, ChevronRight, RotateCw } from 'lucide-react';
import { notFound, useSearchParams, useRouter } from 'next/navigation';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton as UISkeleton } from '@/components/ui/skeleton';
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
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-sm text-muted-foreground">
        {total}件中 {(current - 1) * size + 1}〜{Math.min(current * size, total)}件を表示
      </p>
      <div className="flex items-center gap-1">
        <Button variant="outline" size="icon" onClick={() => onPageChange(1)} disabled={current === 1}>
          <ChevronFirst className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={() => onPageChange(current - 1)} disabled={current === 1}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span className="px-3 text-sm">
          {current} / {totalPages}
        </span>
        <Button
          variant="outline"
          size="icon"
          onClick={() => onPageChange(current + 1)}
          disabled={current === totalPages}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={() => onPageChange(totalPages)} disabled={current === totalPages}>
          <ChevronLast className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

function PaginationSkeleton() {
  return (
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

  const changeSize = (newSize: string) => {
    const params = new URLSearchParams(searchParams?.toString() ?? '');
    params.set('size', newSize);
    params.delete('page');
    router.push(`?${params.toString()}`);
  };

  if (query.isLoading || query.isFetching) {
    return (
      <div className="space-y-4">
        {withControls && (
          <div className="flex items-center justify-between">
            <Select disabled value={size.toString()}>
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
        )}

        {withControls && <PaginationSkeleton />}

        {withControls ? (
          <Card>
            <ul>
              {[...Array(DEFAULT_SIZE).keys()].map((_, index) => (
                <Skeleton key={index} isLast={DEFAULT_SIZE - 1 === index} />
              ))}
            </ul>
          </Card>
        ) : (
          <ul>
            {[...Array(DEFAULT_SIZE).keys()].map((_, index) => (
              <Skeleton key={index} isLast={DEFAULT_SIZE - 1 === index} />
            ))}
          </ul>
        )}

        {withControls && <PaginationSkeleton />}
      </div>
    );
  }

  if (query.isError) {
    return (
      <Alert variant="destructive">
        <AlertTitle>エラー</AlertTitle>
        <AlertDescription className="space-y-2">
          <p>{query.error.message}</p>
          <Button onClick={() => query.refetch()} variant="outline" size="sm">
            <RotateCw className="mr-2 h-4 w-4" />
            再試行
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  if (!query.data) notFound();

  const items = query.data.data;
  const pagination = query.data.pagination;

  return (
    <div className="space-y-4">
      {withControls && (
        <div className="flex items-center justify-between">
          <Select value={size.toString()} onValueChange={changeSize}>
            <SelectTrigger className="w-24">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="12">12件</SelectItem>
              <SelectItem value="64">64件</SelectItem>
              <SelectItem value="128">128件</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="ghost" onClick={() => query.refetch()}>
            <RotateCw className="mr-2 h-4 w-4" />
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

      {(() => {
        const listContent = items.map((item, index) => (
          <ListNewsItem
            key={item.slug}
            {...item}
            isLast={items.length - 1 === index}
            onMouseEnter={async () => {
              await queryClient.prefetchQuery(getNewsItemQueryOptions(item.slug));
              onPrefetch?.(item.slug);
            }}
          />
        ));
        return withControls ? (
          <Card>
            <ul>{listContent}</ul>
          </Card>
        ) : (
          <ul>{listContent}</ul>
        );
      })()}

      {withControls && (
        <PaginationControl
          total={pagination.total}
          current={pagination.current}
          size={pagination.size}
          totalPages={pagination.totalPages}
          onPageChange={goToPage}
        />
      )}
    </div>
  );
}
