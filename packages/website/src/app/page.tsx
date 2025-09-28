// packages/website/src/app/page.tsx

import {
  Alert,
  AlertTitle,
  Box,
  Button,
  ButtonGroup,
  Card,
  CardActionArea,
  CardHeader,
  CardMedia,
  Link,
  Stack,
  Typography, List,
} from "@mui/material";
import React, {Suspense} from "react";
import { LuNotebookPen, LuChevronRight } from "react-icons/lu";

import { PageLayout } from "@/components";
import { paths } from "@/config";
import {DEFAULT_SIZE} from "@/features/news/api/ListNewsItems";
import {Skeleton} from "@/features/news/components/ListItem";
import { ListNewsItems } from "@/features/news/components/ListNewsItems";

export default function Page() {
  return (
    <PageLayout>
      <Box className="text-center">
        <Box className="text-xs text-slate-700">特定非営利活動法人</Box>
        <Box component="h1">
          <Typography component="span" variant="h5" color="primary"><span className="font-bold text-2xl">神奈川県</span></Typography>
          <Typography component="span" variant="h5" color="secondary"><span className="font-bold text-2xl">ライフル射撃</span></Typography>
          <Typography component="span" variant="h5" sx={{color: "#4285f4"}}><span className="font-bold text-2xl">協会</span></Typography>
        </Box>
      </Box>

      <Alert severity="error">
        <AlertTitle>秋季神奈川オープン（県選手権）期日変更のご案内</AlertTitle>
        年度初めにご案内した期日から変更となりました。
        <p className="text-xl"><strong>12月14日（日</strong>）← <del>11月2日（日）</del></p>
      </Alert>

      <Alert severity="info">
        <AlertTitle>第6回秋季神奈川オープンのご案内</AlertTitle>
        <ButtonGroup variant="outlined">
          <Button href="https://forms.gle/G8t7vH7DsRERi5Vx6" target="_blank">申込</Button>
          <Button href={paths.cdn.getHref('/competitions/2025/2025-12-14-autumn-kanagawa-open-championship-details.pdf')} target="_blank">要項</Button>
          <Button disabled href={paths.cdn.getHref('/competitions/2025/2025-12-14-autumn-kanagawa-open-championship-start-lists.pdf')} target="_blank">射座</Button>
          <Button disabled href={paths.cdn.getHref('/competitions/2025/2025-12-14-autumn-kanagawa-open-championship-results')} target="_blank">成績</Button>
        </ButtonGroup>
      </Alert>

      <Alert severity="info">
        <AlertTitle>各種大会 (当協会主管以外) 申込</AlertTitle>
        <Stack spacing={2}>
          <Box>
            各種大会 (当協会主管以外) および東日本選手権については下記よりお申し込みください。<br />
            ※国体スポ予選および県選手権については<Link href="/competitions">個別のお申込みフォーム</Link>がございますのでそちらよりお申し込みください。
          </Box>
          <Box>
            <Button
              variant="outlined"
              startIcon={<LuNotebookPen />}
              href="https://forms.gle/6XGY1qhEvr3gkasJ9"
              target="_blank"
            >
              日ラ等大会申込
            </Button>
          </Box>
        </Stack>
      </Alert>

      <Card>
        <CardActionArea component={Link} href={paths.cdn.getHref('/news/2024-02-02-01-kokuspo-trial-poster.pdf')} target="_blank">
          <CardMedia component="img" height="164" image="https://static.kanagawa-rifle.org/website/news/2024-02-22-02-card.png" alt="国スポ予選ポスター" />
        </CardActionArea>
      </Card>

      <Card>
        <CardHeader title={
          <Box className="flex items-center justify-between">
            お知らせ
            <Button size="small" startIcon={<LuChevronRight />} href={paths.main.news.getHref()}>一覧へ</Button>
          </Box>
        } />
        <Suspense fallback={<List>
          {[...Array(DEFAULT_SIZE).keys()].map((item, index) => (
            <Skeleton key={index} isLast={DEFAULT_SIZE - 1 === index}/>
          ))}
        </List>}>
          <ListNewsItems size={6} page={1} withControls={false} />
        </Suspense>
      </Card>

    </PageLayout>
  )
}
