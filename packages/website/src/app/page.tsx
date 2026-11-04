// packages/website/src/app/page.tsx

import { ChevronRight, NotebookPen } from 'lucide-react';
import Link from 'next/link';

import { PageLayout } from '@/components/PageLayout';
import { StaticImage } from '@/components/StaticImage';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { buttonVariants } from '@/components/ui/button-styles';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { app } from '@/config/app';
import { getStaticFileUrl } from '@/config/assets';
import { paths } from '@/config/paths';
import { HomeCompetitionNotices } from '@/features/competitions/components/HomeCompetitionNotices';
import { getHomeCompetitionNotices } from '@/features/competitions/data';
import { COMPETITION_ENTRY_FORM_URL } from '@/features/competitions/entry';
import { NewsList } from '@/features/news/components/NewsList';
import { getNewsList } from '@/features/news/server/news';
import { createPageMetadata } from '@/lib/metadata';

export const metadata = {
  ...createPageMetadata({ title: app.name, description: paths.home.description, path: paths.home.getHref() }),
  title: { absolute: app.name },
};

export default async function Page() {
  const news = await getNewsList({ page: 1, size: 6 });
  return (
    <PageLayout page={{ path: paths.home.getHref(), description: paths.home.description }}>
      <div className="text-center">
        <div className="text-muted-foreground text-xs">特定非営利活動法人</div>
        <h1 className="text-2xl font-bold">
          <span className="text-primary">神奈川県</span>
          <span style={{ color: 'var(--color-secondary-bright)' }}>ライフル射撃</span>
          <span className="text-accent">協会</span>
        </h1>
        <p className="text-muted-foreground mt-2">
          スモールボア・エアライフル・ビームライフル競技の大会日程、入会案内、会費、各種申請書を掲載しています。
        </p>
      </div>

      <HomeCompetitionNotices competitions={getHomeCompetitionNotices()} />

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
              <a
                className={buttonVariants({ variant: 'outline' })}
                href={COMPETITION_ENTRY_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <NotebookPen className="mr-2 h-4 w-4" />
                日ラ等大会申込
              </a>
            </div>
          </div>
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>入会・大会参加のご案内</CardTitle>
        </CardHeader>
        <CardContent>
          <nav aria-label="入会・大会参加のご案内">
            <ul className="flex flex-col gap-3">
              {[
                { path: paths.main.join, label: '入会の手続き・会費を確認する' },
                { path: paths.main.competitions, label: '大会日程・要項・結果を確認する' },
                { path: paths.sub.forms, label: '大会・入会の申込書をダウンロードする' },
              ].map(({ path, label }) => (
                <li key={path.getHref()}>
                  <Link href={path.getHref()} className="text-primary underline">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </CardContent>
      </Card>

      <Card className="overflow-hidden p-0">
        <a
          href={getStaticFileUrl('/news/2024-02-02-01-kokuspo-trial-poster.pdf')}
          target="_blank"
          rel="noopener noreferrer"
          className="block transition-opacity hover:opacity-90"
        >
          <StaticImage
            src={getStaticFileUrl('/news/2024-02-22-02-card.png')}
            alt="国スポ予選ポスター"
            width={1225}
            height={417}
            loading="lazy"
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
          <Link className={buttonVariants({ variant: 'ghost', size: 'sm' })} href={paths.main.news.getHref()}>
            一覧へ
            <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </CardHeader>

        <NewsList news={news} withPagination={false} headingAs="h3" />
      </Card>
    </PageLayout>
  );
}
