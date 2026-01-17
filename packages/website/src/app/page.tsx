// packages/website/src/app/page.tsx

import { ChevronRight, NotebookPen } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import React, { Suspense } from 'react';

import { PageLayout } from '@/components';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button, ButtonGroup } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
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
        <div className="text-xs text-muted-foreground">特定非営利活動法人</div>
        <h1 className="text-2xl font-bold">
          <span className="text-primary">神奈川県</span>
          <span style={{ color: 'var(--color-secondary-bright)' }}>ライフル射撃</span>
          <span className="text-accent">協会</span>
        </h1>
        <p className="mt-2 text-muted-foreground">
          ライフル射撃競技の普及と振興を目指す神奈川県の射撃団体
        </p>
      </div>

      <Alert variant="warning">
        <AlertTitle>【重要】令和8年度のお知らせ</AlertTitle>
        <AlertDescription>
          <ButtonGroup className="flex-wrap">
            <Button variant="outline" size="sm" asChild>
              <Link href="/news/2026-01-11-03">国スポ予選日程</Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href="/news/2026-01-11-04">会費改定・資格更新</Link>
            </Button>
          </ButtonGroup>
        </AlertDescription>
      </Alert>

      <Alert variant="info">
        <AlertTitle>第25回冬季ＡＲ･ＡＰランクリスト競技会</AlertTitle>
        <AlertDescription>
          <ButtonGroup className="flex-wrap">
            <Button variant="outline" size="sm" asChild>
              <a href="https://forms.gle/E1pTSoqR4feEPApH8" target="_blank" rel="noopener noreferrer">
                申込
              </a>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <a
                href="https://docs.google.com/spreadsheets/d/e/2PACX-1vSJljyFwEUQXU5msbN8e2pI0_b-hutOqsOP1PdfneI6KcK2InJq_1kHG630IrJCXxwrnIXmLNYhh83v/pubhtml"
                target="_blank"
                rel="noopener noreferrer"
              >
                名簿
              </a>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <a
                href={paths.cdn.getHref('/competitions/2025/2025-12-06-winter-10m-rank-list-details.pdf')}
                target="_blank"
                rel="noopener noreferrer"
              >
                要項
              </a>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <a
                href={paths.cdn.getHref('/competitions/2025/2025-12-06-winter-10m-rank-list-start-lists.pdf')}
                target="_blank"
                rel="noopener noreferrer"
              >
                射座
              </a>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <a
                href={paths.cdn.getHref('/competitions/2025/2025-12-06-winter-10m-rank-list-results.pdf')}
                target="_blank"
                rel="noopener noreferrer"
              >
                成績
              </a>
            </Button>
          </ButtonGroup>
        </AlertDescription>
      </Alert>

      <Alert variant="info">
        <AlertTitle>各種大会 (当協会主管以外) 申込</AlertTitle>
        <AlertDescription>
          <div className="flex flex-col gap-2">
            <div>
              <p>各種大会 (当協会主管以外) および東日本選手権については下記よりお申し込みください。</p>
              <p>
                ※国体スポ予選および県選手権については
                <Link href="/competitions" className="text-primary underline hover:bg-primary/10">
                  個別のお申込みフォーム
                </Link>
                がございますのでそちらよりお申し込みください。
              </p>
            </div>
            <div>
              <Button variant="outline" asChild>
                <a href="https://forms.gle/6XGY1qhEvr3gkasJ9" target="_blank" rel="noopener noreferrer">
                  <NotebookPen className="mr-2 h-4 w-4" />
                  日ラ等大会申込
                </a>
              </Button>
            </div>
          </div>
        </AlertDescription>
      </Alert>

      <Card className="overflow-hidden p-0">
        <a
          href={paths.cdn.getHref('/news/2024-02-02-01-kokuspo-trial-poster.pdf')}
          target="_blank"
          rel="noopener noreferrer"
          className="block transition-opacity hover:opacity-90"
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
        </a>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>お知らせ</CardTitle>
          <Button variant="ghost" size="sm" asChild>
            <Link href={paths.main.news.getHref()}>
              一覧へ
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </CardHeader>

        <Suspense
          fallback={
            <ul>
              {[...Array(DEFAULT_SIZE).keys()].map((item, index) => (
                <Skeleton key={index} isLast={DEFAULT_SIZE - 1 === index} />
              ))}
            </ul>
          }
        >
          <NewsItemList size={6} page={1} withControls={false} />
        </Suspense>
      </Card>
    </PageLayout>
  );
}
