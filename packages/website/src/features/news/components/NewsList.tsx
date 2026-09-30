import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { getNewsListHref } from '@/features/news/paths';
import type { NewsSummary } from '@/features/news/types';
import { getPaginationPages, type Paginated, type Pagination as PaginationData } from '@/lib/pagination';

import { NewsListControls } from './NewsListControls';
import { NewsListItem } from './NewsListItem';

function Pagination({ current, totalPages, total, size, hasNext, hasPrev }: PaginationData) {
  const pages = getPaginationPages(current, totalPages);
  const links = [
    { label: '前のページ', page: current - 1, enabled: hasPrev, Icon: ChevronLeft },
    { label: '次のページ', page: current + 1, enabled: hasNext, Icon: ChevronRight },
  ];
  return (
    <nav aria-label="ページネーション" className="flex flex-col items-center justify-center gap-4">
      <p className="text-muted-foreground text-sm">
        {total}件中 {total === 0 ? 0 : (current - 1) * size + 1}〜{Math.min(current * size, total)}件を表示
      </p>
      <div className="flex items-center gap-1">
        {links.map(({ label, page, enabled, Icon }, index) => (
          <span key={label} className="contents">
            {index === 1 &&
              pages.map((page, pageIndex) => (
                <span key={page} className="contents">
                  {pageIndex > 0 && page > pages[pageIndex - 1]! + 1 && (
                    <span className="px-1" aria-hidden="true">
                      …
                    </span>
                  )}
                  <Button variant={page === current ? 'default' : 'outline'} size="icon" className="h-8 w-8" asChild>
                    <Link
                      href={getNewsListHref({ page, size })}
                      aria-label={`${page}ページ目`}
                      aria-current={page === current ? 'page' : undefined}
                    >
                      {page}
                    </Link>
                  </Button>
                </span>
              ))}
            {enabled ? (
              <Button variant="outline" size="icon" className="h-8 w-8" asChild>
                <Link href={getNewsListHref({ page, size })} aria-label={label}>
                  <Icon className="h-4 w-4" />
                </Link>
              </Button>
            ) : (
              <Button variant="outline" size="icon" className="h-8 w-8" disabled aria-label={label}>
                <Icon className="h-4 w-4" />
              </Button>
            )}
          </span>
        ))}
      </div>
    </nav>
  );
}

export function NewsList({
  news,
  withControls = true,
  headingAs = 'h2',
}: {
  news: Paginated<NewsSummary>;
  withControls?: boolean;
  headingAs?: 'h2' | 'h3';
}) {
  return (
    <div className="space-y-4">
      {withControls && <NewsListControls size={news.pagination.size} />}
      {withControls && <Pagination {...news.pagination} />}
      <Card>
        {news.data.length === 0 ? (
          <p className="text-muted-foreground p-4">お知らせはありません。</p>
        ) : (
          <ul aria-label="お知らせ一覧">
            {news.data.map((item, index) => (
              <NewsListItem key={item.slug} {...item} isLast={index === news.data.length - 1} headingAs={headingAs} />
            ))}
          </ul>
        )}
      </Card>
      {withControls && <Pagination {...news.pagination} />}
    </div>
  );
}
