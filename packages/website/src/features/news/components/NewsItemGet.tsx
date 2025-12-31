// packages/website/src/features/news/components/NewsItemGet.tsx

'use client';

import { ArrowLeft, Calendar, Hash, NotebookText, RotateCw } from 'lucide-react';
import dynamic from 'next/dynamic';
import Link from 'next/link';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton as UISkeleton } from '@/components/ui/skeleton';
import { env } from '@/config';
import { useNewsItem } from '@/features/news/api/NewsItemGet';

// Markdown パーサーを遅延読み込み（バンドルサイズ削減: 50-100KB）
const ReactMarkdown = dynamic(() => import('@/lib/client').then((mod) => mod.ReactMarkdown), {
  loading: () => (
    <div className="space-y-4">
      <UISkeleton className="h-6 w-full" />
      <UISkeleton className="h-6 w-[90%]" />
      <UISkeleton className="h-6 w-[95%]" />
      <UISkeleton className="h-48 w-full" />
    </div>
  ),
  ssr: true,
});

import ShareLinks from './ShareLinks';
import Skeleton from './Skeleton';
import TableOfContents, { generateTableOfContents } from './TableOfContents';

type Props = {
  slug: string;
};

export function NewsItemGet({ slug }: Props) {
  const { data: news, refetch, error, isLoading, isError, isFetching } = useNewsItem({ slug });

  const tableOfContents = news?.content ? generateTableOfContents(news.content) : [];
  const articleUrl = new URL(`/news/${slug}`, env.APP_URL).toString();

  const formattedDate = news?.published
    ? new Intl.DateTimeFormat('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' }).format(
        new Date(news.published)
      )
    : '';

  if (isLoading || isFetching) return <Skeleton />;

  if (isError) {
    const errorMessage = error instanceof Error ? error.message : '記事の取得に失敗しました';

    return (
      <Alert variant="destructive">
        <AlertTitle>エラー</AlertTitle>
        <AlertDescription className="space-y-4">
          <p>{errorMessage}</p>
          <Button onClick={() => refetch()} variant="outline" size="sm" disabled={isFetching}>
            <RotateCw className="mr-2 h-4 w-4" />
            再試行
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  if (!news) {
    return (
      <Card className="text-center">
        <CardHeader>
          <CardTitle className="text-muted-foreground">記事が見つかりません</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">指定された記事は存在しないか、削除された可能性があります。</p>
        </CardContent>
        <CardContent>
          <NotebookText className="mx-auto h-16 w-16 text-muted-foreground" />
        </CardContent>
        <CardFooter className="justify-center">
          <Button variant="ghost" asChild>
            <Link href="/news">
              <ArrowLeft className="mr-2 h-4 w-4" />
              一覧に戻る
            </Link>
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <article>
      {/* ヘッダー */}
      <header className="mb-8">
        {/* アクションボタン */}
        <div className="mb-2 flex justify-end gap-2">
          <ShareLinks title={news.title} url={articleUrl} />
          <Button variant="ghost" onClick={() => refetch()} disabled={isFetching} aria-label="記事を更新">
            <RotateCw className="mr-2 h-4 w-4" />
            更新
          </Button>
        </div>

        {/* メタ情報 */}
        <div className="flex flex-wrap gap-2">
          {/* 作成日 */}
          <Badge variant="outline">
            <Calendar className="mr-1 h-3 w-3" />
            <time dateTime={news.published.toISOString()}>{formattedDate}</time>
          </Badge>

          {/* タグ */}
          {news.tags?.map((tag) => (
            <Badge key={tag} variant="outline" className="border-primary text-primary">
              <Hash className="mr-1 h-3 w-3" />
              {tag}
            </Badge>
          ))}
        </div>
      </header>

      {/* 概要 */}
      {news.excerpt && (
        <div className="mb-8 rounded-lg bg-muted p-6 italic leading-relaxed text-muted-foreground">{news.excerpt}</div>
      )}

      {/* 目次 */}
      {tableOfContents.length > 0 && <TableOfContents toc={tableOfContents} />}

      {/* 本文 */}
      <Card>
        <div className="prose prose-lg dark:prose-invert p-4 md:p-10">
          {news.content && <ReactMarkdown content={news.content} />}
        </div>
      </Card>

      {/* フッター */}
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
