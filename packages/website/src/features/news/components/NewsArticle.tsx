import { ArrowLeft, Calendar, Hash } from 'lucide-react';
import Link from 'next/link';

import { renderMarkdown } from '@/components/Markdown/renderMarkdown';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { app } from '@/config/app';
import { env } from '@/config/env';
import { getNewsItemHref } from '@/features/news/paths';
import type { NewsItem } from '@/features/news/types';

import { formatNewsDate } from '../dates';
import { RefreshNewsButton } from './NewsListControls';
import ShareLinks from './ShareLinks';
import TableOfContents from './TableOfContents';

export function NewsArticle({ news }: { news: NewsItem }) {
  const { body, toc } = renderMarkdown(news.content);
  const articleUrl = new URL(getNewsItemHref(news.slug), env.APP_URL).toString();

  return (
    <article>
      <header className="mb-8">
        <div className="mb-2 flex justify-end gap-2">
          <ShareLinks title={news.title} url={articleUrl} />
          <RefreshNewsButton />
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline">
            <Calendar className="mr-1 h-3 w-3" />
            <time dateTime={news.published.toISOString()}>{formatNewsDate(news.published)}</time>
          </Badge>
          {news.updated && (
            <Badge variant="outline">
              更新：<time dateTime={news.updated.toISOString()}>{formatNewsDate(news.updated)}</time>
            </Badge>
          )}
          {news.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="border-primary text-primary">
              <Hash className="mr-1 h-3 w-3" />
              {tag}
            </Badge>
          ))}
        </div>
        <p className="text-muted-foreground mt-3 text-sm">
          発信：
          <Link href="/about" className="text-primary underline">
            {app.name}
          </Link>
        </p>
      </header>
      {news.excerpt && (
        <div className="bg-muted text-muted-foreground mb-8 rounded-lg p-6 leading-relaxed italic">{news.excerpt}</div>
      )}
      <TableOfContents toc={toc} />
      <Card>
        <div className="prose prose-lg dark:prose-invert max-w-none p-4 md:p-10">{body}</div>
      </Card>
      <footer className="mt-6">
        <Button variant="ghost" asChild>
          <Link href="/news">
            <ArrowLeft className="mr-2 h-4 w-4" />
            一覧に戻る
          </Link>
        </Button>
      </footer>
    </article>
  );
}
