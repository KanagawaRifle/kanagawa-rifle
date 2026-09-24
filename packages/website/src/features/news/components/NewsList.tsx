import { ChevronFirst, ChevronLast, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import type { NewsSummary } from '@/features/news/types';
import type { Paginated, Pagination as PaginationData } from '@/lib/pagination';

import { NewsListControls } from './NewsListControls';
import { NewsListItem } from './NewsListItem';

function Pagination({ current, totalPages, total, size, hasNext, hasPrev }: PaginationData) {
  const pages = Math.max(1, totalPages);
  const links = [
    { label: '最初のページ', page: 1, enabled: hasPrev, Icon: ChevronFirst },
    { label: '前のページ', page: current - 1, enabled: hasPrev, Icon: ChevronLeft },
    { label: '次のページ', page: current + 1, enabled: hasNext, Icon: ChevronRight },
    { label: '最後のページ', page: pages, enabled: hasNext, Icon: ChevronLast },
  ];
  return (
    <nav aria-label="ページネーション" className="flex flex-col items-center justify-center gap-4">
      <p className="text-muted-foreground text-sm">
        {total}件中 {total === 0 ? 0 : (current - 1) * size + 1}〜{Math.min(current * size, total)}件を表示
      </p>
      <div className="flex items-center gap-1">
        {links.map(({ label, page, enabled, Icon }, index) => (
          <span key={label} className="contents">
            {index === 2 && (
              <span className="px-3 text-sm">
                {current} / {pages}
              </span>
            )}
            {enabled ? (
              <Button variant="outline" size="icon" asChild>
                <Link href={`/news?page=${page}&size=${size}`} aria-label={label}>
                  <Icon className="h-4 w-4" />
                </Link>
              </Button>
            ) : (
              <Button variant="outline" size="icon" disabled aria-label={label}>
                <Icon className="h-4 w-4" />
              </Button>
            )}
          </span>
        ))}
      </div>
    </nav>
  );
}

export function NewsList({ news, withControls = true }: { news: Paginated<NewsSummary>; withControls?: boolean }) {
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
              <NewsListItem key={item.slug} {...item} isLast={index === news.data.length - 1} />
            ))}
          </ul>
        )}
      </Card>
      {withControls && <Pagination {...news.pagination} />}
    </div>
  );
}
