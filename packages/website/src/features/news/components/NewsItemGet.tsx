// packages/website/src/features/news/components/NewsItemGet.tsx
'use client';

import {
  Alert,
  AlertTitle,
  Box,
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Skeleton as MuiSkeleton,
  Stack,
  Typography,
} from '@mui/material';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { LuNotebookText, LuArrowLeft, LuRotateCw, LuHash, LuCalendar } from 'react-icons/lu';

import { env } from '@/config';
import { useNewsItem } from '@/features/news/api/NewsItemGet';

// Markdown パーサーを遅延読み込み（バンドルサイズ削減: 50-100KB）
const ReactMarkdown = dynamic(() => import('@/lib/client').then((mod) => mod.ReactMarkdown), {
  loading: () => (
    <div className="space-y-4">
      <MuiSkeleton variant="text" width="100%" height={24} />
      <MuiSkeleton variant="text" width="90%" height={24} />
      <MuiSkeleton variant="text" width="95%" height={24} />
      <MuiSkeleton variant="rectangular" width="100%" height={200} />
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
      <Alert severity="error">
        <AlertTitle>エラー</AlertTitle>
        <Stack spacing={2}>
          <Typography>{errorMessage}</Typography>
          <Button onClick={() => refetch()} color="error" startIcon={<LuRotateCw />} disabled={isFetching}>
            再試行
          </Button>
        </Stack>
      </Alert>
    );
  }

  if (!news) {
    return (
      <Card>
        <CardHeader
          title={
            <Typography color="text.secondary" variant="h4">
              記事が見つかりません
            </Typography>
          }
          className="text-center"
        />
        <CardContent className="text-center">
          <Typography color="text.secondary">指定された記事は存在しないか、削除された可能性があります。</Typography>
        </CardContent>
        <CardContent className="flex justify-center">
          <Box color="text.secondary">
            <LuNotebookText className="text-7xl" />
          </Box>
        </CardContent>
        <CardActions className="flex justify-center">
          <Button component={Link} href="/news" startIcon={<LuArrowLeft />}>
            一覧に戻る
          </Button>
        </CardActions>
      </Card>
    );
  }

  return (
    <article>
      {/* ヘッダー */}
      <header className="mb-8">
        {/* アクションボタン */}
        <Box className="mb-2 flex justify-end">
          <ButtonGroup>
            <ShareLinks title={news.title} url={articleUrl} />
            <Button
              variant="text"
              startIcon={<LuRotateCw />}
              onClick={() => refetch()}
              disabled={isFetching}
              aria-label="記事を更新"
            >
              更新
            </Button>
          </ButtonGroup>
        </Box>

        {/* メタ情報 */}
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          {/* 作成日 */}
          <Chip
            label={<time dateTime={news.published.toISOString()}>{formattedDate}</time>}
            icon={<LuCalendar />}
            variant="outlined"
            color="default"
          />

          {/* タグ */}
          {news.tags?.map((tag) => (
            <Chip label={tag} key={tag} icon={<LuHash />} variant="outlined" color="primary" />
          ))}
        </Stack>
      </header>

      {/* 概要 */}
      {news.excerpt && (
        <div className="mb-8 rounded-lg bg-gray-50 p-6 leading-relaxed text-gray-700 italic">{news.excerpt}</div>
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
        <Button component={Link} href="/news" startIcon={<LuArrowLeft />}>
          一覧に戻る
        </Button>
      </footer>
    </article>
  );
}
