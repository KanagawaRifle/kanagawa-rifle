// packages/website/src/features/news/api/GetNewsItem.ts
'use client'

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
  Typography
} from "@mui/material";
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import {
  LuNotebookText,
  LuArrowLeft,
  LuRotateCw,
  LuHash,
  LuCalendar,
} from "react-icons/lu";
import 'highlight.js/styles/github-dark.css';

import { useNewsItem } from '@/features/news/api/GetNewsItem';

import Markdown from './Markdown';
import ShareLinks from './ShareLinks';
import Skeleton from "./Skeleton";
import TableOfContents, { generateTableOfContents } from "./TableOfContents";

type Props = {
  slug: string
}

export function GetNewsItem({slug}: Props) {

  const {data: news, refetch, error, isLoading, isError, isFetching} = useNewsItem({slug});

  // クライアントサイドでのURL取得
  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    // クライアントサイドでマウント後にURLを設定
    setCurrentUrl(window.location.href);
  }, []);

  // 目次生成
  const tableOfContents = React.useMemo(() => {
    return !news?.content
      ? []
      : generateTableOfContents(news.content);
  }, [news?.content]);

  // ローディング中のフォールバック
  if (isLoading || isFetching) return <Skeleton />

  // エラー発生時のフォールバック
  if (isError && error instanceof Error) {
    return (
      <Alert severity="error">
        <AlertTitle>エラー</AlertTitle>
        <Stack spacing={1}>
          <Box>{error.message}</Box>
          <Button onClick={() => refetch()} color="error" startIcon={<LuRotateCw />}>再試行</Button>
        </Stack>
      </Alert>
    );
  }

  // 見つからなかったとき
  if (!news) {
    return (
      <Card>
        <CardHeader title={<Typography color="text.secondary" variant="h4">Not Found</Typography>} className="text-center" />
        <CardContent className="text-center">
          <Typography color="text.secondary" >指定された記事は存在しないか、削除された可能性があります。</Typography>
        </CardContent>
        <CardContent className="flex justify-center">
          <Box color="text.secondary"><LuNotebookText  className="text-7xl" /></Box>
        </CardContent>
        <CardActions className="flex justify-center">
          <Button component={Link} href="/news" startIcon={<LuArrowLeft />}>一覧に戻る</Button>
        </CardActions>
      </Card>
    );
  }

  return (
    <article className="max-w-4xl mx-auto">

      {/* ヘッダー */}
      <header className="mb-8">

        <Box className="flex justify-end mb-2">
          <ButtonGroup>
            <ShareLinks title={news.title} url={currentUrl} loading={currentUrl ===''} />
            <Button variant="text" startIcon={<LuRotateCw />} onClick={() => refetch()} disabled={isFetching}>更新</Button>
          </ButtonGroup>
        </Box>

        {/* メタ情報 */}
        <Stack direction="row" spacing={1}>
          {/* 作成日 */}
          <Chip
            label={
              <time dateTime={news.published.toISOString()}>
                {format(new Date(news.published), 'yyyy年M月d日', { locale: ja })}
              </time>
            }
            icon={<LuCalendar />}
            variant="outlined"
            color="default"
          />
          {/* タグ */}
          {news.tags && news.tags.length > 0 &&
            news.tags.map((tag: string) => (
              <Chip
                label={tag}
                key={tag}
                icon={<LuHash />}
                variant="outlined"
                color="primary"
              />
            ))
          }
        </Stack>
      </header>

      {/* 概要 */}
      {news.excerpt && (
        <div className="bg-gray-50 p-6 mb-8 rounded-r-lg">
          <p className="text-gray-700 italic text-lg leading-relaxed">
            {news.excerpt}
          </p>
        </div>
      )}

      {/* 目次 */}
      <TableOfContents toc={tableOfContents} />

      {/* 本文 */}
      <Card>
        <CardContent className="prose prose-lg dark:prose-invert max-w-none">
          {news.content && <Markdown content={news.content} />}
        </CardContent>
      </Card>

      {/* フッター */}
      <footer>
        <Box className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <Button component={Link} href="/news">一覧に戻る</Button>
        </Box>
      </footer>
    </article>
  );
}
