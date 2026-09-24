// packages/website/src/app/page.tsx

import { ChevronRight, NotebookPen } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { PageLayout } from '@/components';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button, ButtonGroup } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { env, paths } from '@/config';
import { HomeCompetitionNotices } from '@/features/competitions/components/HomeCompetitionNotices';
import { COMPETITION_ENTRY_FORM_URL } from '@/features/competitions/data';
import { NewsItemList } from '@/features/news/components/NewsItemList';
import { getNewsList } from '@/features/news/server/news';

export const metadata: Metadata = {
  description: paths.home.description,
  openGraph: {
    images: new URL(`/api/og?title=${encodeURIComponent('神奈川県ライフル射撃協会')}`, env.APP_URL),
  },
  twitter: {
    images: new URL(`/api/og?title=${encodeURIComponent('神奈川県ライフル射撃協会')}`, env.APP_URL),
  },
};

export default async function Page() {
  const news = await getNewsList({ page: 1, size: 6 });
  return (
    <PageLayout>
      <div className="text-center">
        <div className="text-muted-foreground text-xs">特定非営利活動法人</div>
        <h1 className="text-2xl font-bold">
          <span className="text-primary">神奈川県</span>
          <span style={{ color: 'var(--color-secondary-bright)' }}>ライフル射撃</span>
          <span className="text-accent">協会</span>
        </h1>
        <p className="text-muted-foreground mt-2">ライフル射撃競技の普及と振興を目指す神奈川県の射撃団体</p>
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

      <HomeCompetitionNotices />

      <Alert variant="info">
        <AlertTitle>各種大会 (当協会主管以外) 申込</AlertTitle>
        <AlertDescription>
          <div className="flex flex-col gap-2">
            <div>
              <p>各種大会 (当協会主管以外) および東日本選手権については下記よりお申し込みください。</p>
              <p>
                ※国体スポ予選および県選手権については
                <Link href="/competitions" className="text-primary hover:bg-primary/10 underline">
                  個別のお申込みフォーム
                </Link>
                がございますのでそちらよりお申し込みください。
              </p>
            </div>
            <div>
              <Button variant="outline" asChild>
                <a href={COMPETITION_ENTRY_FORM_URL} target="_blank" rel="noopener noreferrer">
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

        <NewsItemList news={news} withControls={false} />
      </Card>
    </PageLayout>
  );
}
