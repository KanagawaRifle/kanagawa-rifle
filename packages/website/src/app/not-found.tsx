import { Box, Card, CardHeader, CardContent } from '@mui/material';
import Button from '@mui/material/Button';
import type { Metadata } from 'next';
import React from 'react';
import { LuFrown, LuHouse } from 'react-icons/lu';

import { PageLayout } from '@/components';

const title = '404 Not Found';
const description = '指定されたページが見つかりませんでした。';

export const metadata: Metadata = {
  title,
  description,
};

export default function Page() {
  return (
    <PageLayout>
      <Card>
        <CardHeader title={<div className="text-center text-2xl font-bold">{title}</div>} />
        <CardContent className="flex flex-col items-center justify-center gap-4">
          <div className="flex items-center justify-center gap-4 text-gray-400">
            <LuFrown className="text-7xl" />
            <Box className="text-7xl font-black" component="span">
              404
            </Box>
          </div>
          <div className="text-center">{description}</div>
          <Button href="/" startIcon={<LuHouse />}>
            ホームへ
          </Button>
        </CardContent>
      </Card>
    </PageLayout>
  );
}
