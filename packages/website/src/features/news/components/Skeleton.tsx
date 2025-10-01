import 'highlight.js/styles/github-dark.css';

import { Box, Card, CardContent, Stack, ButtonGroup, Button, Chip, Skeleton as MuiSkeleton } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import { LuArrowLeft, LuCalendar, LuHash } from 'react-icons/lu';

import ShareLinks from '@/features/news/components/ShareLinks';

export default function MySkeleton() {
  return (
    <article className="w-full">
      <header className="mb-8">
        <Box className="mb-2 flex justify-end">
          <ButtonGroup>
            <ShareLinks title={''} url={''} loading={true} />
            <Button variant="text" loading loadingPosition="start">
              更新
            </Button>
          </ButtonGroup>
        </Box>
        <Stack direction="row" spacing={1}>
          <Chip label={<MuiSkeleton width="4rem" />} icon={<LuCalendar />} variant="outlined" />
          {[...Array(2).keys()].map((_, index) => (
            <Chip
              key={index}
              label={<MuiSkeleton width="2rem" />}
              icon={<LuHash />}
              variant="outlined"
              color="primary"
            />
          ))}
        </Stack>
      </header>

      {/* 概要 */}
      <div className="italicleading-relaxed mb-8 rounded-r-lg bg-gray-50 p-6 text-gray-700">
        {[...Array(2).keys()].map((_, index) => (
          <MuiSkeleton key={index} />
        ))}
        <MuiSkeleton width="60%" />
      </div>

      <Card>
        <CardContent className="prose prose-lg dark:prose-invert max-w-none">
          <h1 className="mt-8 mb-6 border-b-2 border-gray-200 pb-3 text-3xl font-bold text-gray-900 no-underline first:mt-0">
            <MuiSkeleton />
          </h1>
          {[...Array(5).keys()].map((_, index) => (
            <MuiSkeleton key={index} />
          ))}
          <MuiSkeleton width="60%" />
        </CardContent>
      </Card>

      <footer>
        <div className="mt-6">
          <Button component={Link} href="/news" startIcon={<LuArrowLeft />}>
            一覧に戻る
          </Button>
        </div>
      </footer>
    </article>
  );
}
