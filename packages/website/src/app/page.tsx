// packages/website/src/app/page.tsx

import {
  Alert,
  AlertTitle,
  Button,
  ButtonGroup,
  Card,
  CardActionArea,
  CardHeader,
  Link,
  List,
} from '@mui/material';
import type { Metadata } from 'next';
import Image from 'next/image';
import React, { Suspense } from 'react';
import { LuNotebookPen, LuChevronRight } from 'react-icons/lu';

import { PageLayout } from '@/components';
import { env, paths } from '@/config';
import { DEFAULT_SIZE } from '@/features/news/api/NewsItemList';
import { Skeleton } from '@/features/news/components/ListItem';
import { NewsItemList } from '@/features/news/components/NewsItemList';

export const metadata: Metadata = {
  description: paths.home.description,
  openGraph: {
    images: new URL(`/api/og?title=${encodeURIComponent('神奈川県ライフル射撃協会')}`, env.APP_URL),
  },
  twitter: {
    images: new URL(`/api/og?title=${encodeURIComponent('神奈川県ライフル射撃協会')}`, env.APP_URL),
  },
};

export default function Page() {
  return (
    <PageLayout>
      <div className="text-center">
        <div className="text-xs text-slate-700">特定非営利活動法人</div>
        <h1 className="text-2xl font-bold">
          <span className="text-[#288140]">神奈川県</span>
          <span className="text-[#e37400]">ライフル射撃</span>
          <span className="text-[#0288d1]">協会</span>
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          エアライフル・ビームライフル競技の普及と振興を目指す神奈川県の射撃団体
        </p>
      </div>

      <Alert severity="info">
        <AlertTitle>第25回冬季ＡＲ･ＡＰランクリスト競技会</AlertTitle>
        <ButtonGroup variant="outlined">
          <Button href="https://forms.gle/E1pTSoqR4feEPApH8" target="_blank" rel="noopener noreferrer">
            申込
          </Button>
          <Button
            href="https://docs.google.com/spreadsheets/d/e/2PACX-1vSJljyFwEUQXU5msbN8e2pI0_b-hutOqsOP1PdfneI6KcK2InJq_1kHG630IrJCXxwrnIXmLNYhh83v/pubhtml"
            target="_blank"
            rel="noopener noreferrer"
          >
            名簿
          </Button>
          <Button
            href={paths.cdn.getHref('/competitions/2025/2025-12-06-winter-10m-rank-list-details.pdf')}
            target="_blank"
            rel="noopener noreferrer"
          >
            要項
          </Button>
          <Button
            href={paths.cdn.getHref('/competitions/2025/2025-12-06-winter-10m-rank-list-start-lists.pdf')}
            target="_blank"
            rel="noopener noreferrer"
          >
            射座
          </Button>
          <Button
            href={paths.cdn.getHref('/competitions/2025/2025-12-06-winter-10m-rank-list-results.pdf')}
            target="_blank"
            rel="noopener noreferrer"
          >
            成績
          </Button>
        </ButtonGroup>
      </Alert>

      <Alert severity="info">
        <AlertTitle>各種大会 (当協会主管以外) 申込</AlertTitle>
        <div className="flex flex-col gap-2">
          <div>
            <div>各種大会 (当協会主管以外) および東日本選手権については下記よりお申し込みください。</div>
            <div>
              ※国体スポ予選および県選手権については<Link href="/competitions">個別のお申込みフォーム</Link>
              がございますのでそちらよりお申し込みください。
            </div>
          </div>
          <div>
            <Button
              variant="outlined"
              startIcon={<LuNotebookPen />}
              href="https://forms.gle/6XGY1qhEvr3gkasJ9"
              target="_blank"
              rel="noopener noreferrer"
            >
              日ラ等大会申込
            </Button>
          </div>
        </div>
      </Alert>

      <Card>
        <CardActionArea
          component={Link}
          href={paths.cdn.getHref('/news/2024-02-02-01-kokuspo-trial-poster.pdf')}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src={paths.cdn.getHref('/news/2024-02-22-02-card.png')}
            alt="国スポ予選ポスター"
            width={734}
            height={150}
            priority
            style={{
              width: '100%',
              height: 'auto',
            }}
            sizes="(max-width: 768px) 100vw, 734px"
          />
        </CardActionArea>
      </Card>

      <Card>
        <CardHeader
          title={<div className="flex items-center justify-between">お知らせ</div>}
          action={
            <Button size="small" startIcon={<LuChevronRight />} href={paths.main.news.getHref()}>
              一覧へ
            </Button>
          }
        />

        <Suspense
          fallback={
            <List>
              {[...Array(DEFAULT_SIZE).keys()].map((item, index) => (
                <Skeleton key={index} isLast={DEFAULT_SIZE - 1 === index} />
              ))}
            </List>
          }
        >
          <NewsItemList size={6} page={1} withControls={false} />
        </Suspense>
      </Card>
    </PageLayout>
  );
}
