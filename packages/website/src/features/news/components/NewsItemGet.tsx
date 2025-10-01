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
  Stack,
  Typography,
} from '@mui/material';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import Link from 'next/link';
import React from 'react';
import { LuNotebookText, LuArrowLeft, LuRotateCw, LuHash, LuCalendar } from 'react-icons/lu';
import 'highlight.js/styles/github-dark.css';

import { env } from '@/config';
import { useNewsItem } from '@/features/news/api/NewsItemGet';
import { ReactMarkdown } from '@/lib/client';

import ShareLinks from './ShareLinks';
import Skeleton from './Skeleton';
import TableOfContents, { generateTableOfContents } from './TableOfContents';

type Props = {
  slug: string;
};

export function NewsItemGet({ slug }: Props) {
  const { data: news, refetch, error, isLoading, isError, isFetching } = useNewsItem({ slug });

  const tableOfContents = React.useMemo(() => {
    return news?.content ? generateTableOfContents(news.content) : [];
  }, [news?.content]);

  const articleUrl = React.useMemo(() => new URL(`/news/${slug}`, env.APP_URL).toString(), [slug]);

  const formattedDate = React.useMemo(() => {
    if (!news?.published) return '';
    return format(new Date(news.published), 'yyyy年M月d日', { locale: ja });
  }, [news?.published]);

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
