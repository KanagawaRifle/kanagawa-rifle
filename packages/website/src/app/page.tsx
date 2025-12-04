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
  Typography,
  List,
} from '@mui/material';
import Image from 'next/image';
import React, { Suspense } from 'react';
import { LuNotebookPen, LuChevronRight } from 'react-icons/lu';

import { PageLayout } from '@/components';
import { paths } from '@/config';
import { DEFAULT_SIZE } from '@/features/news/api/NewsItemList';
import { Skeleton } from '@/features/news/components/ListItem';
import { NewsItemList } from '@/features/news/components/NewsItemList';

export const metadata = {
  other: {
    link: [
      {
        rel: 'preload',
        as: 'image',
        href: paths.cdn.getHref('/news/2024-02-22-02-card.png'),
        fetchpriority: 'high',
      },
    ],
  },
};

export default function Page() {
  return (
    <PageLayout>
      <div className="text-center">
        <div className="text-xs text-slate-700">特定非営利活動法人</div>
        <h1>
          <Typography component="span" color="primary">
            <span className="text-2xl font-bold">神奈川県</span>
          </Typography>
          <Typography component="span" color="secondary">
            <span className="text-2xl font-bold">ライフル射撃</span>
          </Typography>
          <Typography component="span" color="info">
            <span className="text-2xl font-bold">協会</span>
          </Typography>
        </h1>
      </div>

      <Alert severity="error">
        <AlertTitle>秋季神奈川オープン（県選手権）期日変更のご案内</AlertTitle>
        <div className="flex flex-col gap-4">
          <div>
            年度初めにご案内した期日から変更となりました。
            <div className="text-xl">
              <strong>12月14日（日</strong>）← <del>11月2日（日）</del>
            </div>
          </div>
          <ButtonGroup variant="outlined">
            <Button href="https://forms.gle/G8t7vH7DsRERi5Vx6" target="_blank">
              申込
            </Button>
            <Button
              href={paths.cdn.getHref('/competitions/2025/2025-12-14-autumn-kanagawa-open-championship-details.pdf')}
              target="_blank"
            >
              要項
            </Button>
            <Button
              href={paths.cdn.getHref(
                '/competitions/2025/2025-12-14-autumn-kanagawa-open-championship-start-lists.pdf',
              )}
              target="_blank"
            >
              射座
            </Button>
            <Button
              disabled
              href={paths.cdn.getHref('/competitions/2025/2025-12-14-autumn-kanagawa-open-championship-results')}
              target="_blank"
            >
              成績
            </Button>
          </ButtonGroup>
        </div>
      </Alert>

      <Alert severity="error">
        <AlertTitle>第25回冬季ＡＲ･ＡＰランクリスト競技会</AlertTitle>
        <ButtonGroup variant="outlined">
          <Button href="https://forms.gle/E1pTSoqR4feEPApH8" target="_blank">
            申込
          </Button>
          <Button
            href={paths.cdn.getHref('/competitions/2025/2025-12-06-winter-10m-rank-list-details.pdf')}
            target="_blank"
          >
            要項
          </Button>
          <Button
            href={paths.cdn.getHref('/competitions/2025/2025-12-06-winter-10m-rank-list-start-lists.pdf')}
            target="_blank"
          >
            射座
          </Button>
          <Button
            disabled
            href={paths.cdn.getHref('/competitions/2025/2025-12-06-winter-10m-rank-list-results.pdf')}
            target="_blank"
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
