import Link from 'next/link';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { formatNewsDate } from '../dates';
import { getNewsItemHref } from '../paths';
import type { NewsSummary } from '../types';

export function NewsArticleNavigation({ newer, older }: { newer?: NewsSummary; older?: NewsSummary }) {
  if (!newer && !older) return null;
  return (
    <nav aria-label="前後のお知らせ">
      <Card>
        <CardHeader>
          <CardTitle>前後のお知らせ</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="flex flex-col gap-4">
            {[
              { article: newer, label: '新しいお知らせ' },
              { article: older, label: '以前のお知らせ' },
            ].map(({ article, label }) =>
              article ? (
                <li key={article.slug}>
                  <p className="text-muted-foreground mb-1 text-sm">
                    {label}：<time dateTime={article.published.toISOString()}>{formatNewsDate(article.published)}</time>
                  </p>
                  <Link href={getNewsItemHref(article.slug)} className="text-primary underline">
                    {article.title}
                  </Link>
                </li>
              ) : null,
            )}
          </ul>
        </CardContent>
      </Card>
    </nav>
  );
}
