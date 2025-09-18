'use client'

import {faWpforms} from "@fortawesome/free-brands-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TagIcon from '@mui/icons-material/Tag';
import {Avatar, CardActions, ListItemAvatar, useTheme} from "@mui/material";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Chip from "@mui/material/Chip";
import Link from '@mui/material/Link';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Stack from '@mui/material/Stack';
import Typography from "@mui/material/Typography";
import * as React from "react";

import {PageLayout} from "@/components"
import {paths} from "@/config";

export default function Page() {
  const theme = useTheme();

  return (
    <PageLayout>
      <Box className={'text-center'}>
        <Box className={'text-xs text-slate-700'}>特定非営利活動法人</Box>
        <Box component={'h1'} className={'font-medium text-2xl'} sx={{}}>
          <Box component={'span'} sx={{color: theme.palette.primary.main}}>神奈川県</Box>
          <Box component={'span'} sx={{color: theme.palette.secondary.main}}>ライフル射撃</Box>
          <Box component={'span'} sx={{color: "#4285f4"}}>協会</Box>
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
          <div>
            各種大会 (当協会主管以外) および東日本選手権については下記よりお申し込みください。<br />
            ※国体スポ予選および県選手権については<Link href="/competitions">個別のお申込みフォーム</Link>がございますのでそちらよりお申し込みください。
          </div>
          <div>
            <Button
              variant="outlined"
              startIcon={<FontAwesomeIcon fixedWidth={true} size="sm" icon={faWpforms} />}
              href="https://forms.gle/6XGY1qhEvr3gkasJ9"
              target="_blank"
            >
              日ラ等大会申込
            </Button>
          </div>
        </Stack>
      </Alert>

      <Card>
        <CardActionArea component={Link} href={paths.cdn.getHref('/news/2024-02-02-01-kokuspo-trial-poster.pdf')} target="_blank">
          <CardMedia component="img" height="164" image="https://static.kanagawa-rifle.org/website/news/2024-02-22-02-card.png" alt="国スポ予選ポスター" />
        </CardActionArea>
      </Card>

      <Card>
        <CardHeader title="お知らせ" />
        <CardActions>
          <Button size="small" startIcon={<ChevronRightIcon />}>お知らせ一覧へ</Button>
        </CardActions>
        <List>
          <ListItem alignItems="flex-start" divider>
            <ListItemAvatar><Avatar><CameraAltIcon /></Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={<Typography variant="h6" gutterBottom>AIの新技術が医療分野に革命をもたらす</Typography>}
              secondary={
                <Stack spacing={2}>
                  <Box>最新の火星探査ミッションで発見された証拠が、宇宙生物学の分野に新たな希望をもたらしています。</Box>
                  <Stack direction="row" spacing={1}>
                    <Chip label="テクノロジー" icon={<TagIcon />} variant="outlined" color="primary" size="small" />
                    <Chip label="環境" icon={<TagIcon />} variant="outlined" color="primary" size="small" />
                    <Chip label="2025年9月1日" icon={<AccessTimeIcon />} variant="outlined" color="default" size="small" sx={{ border: 'none' }} />
                  </Stack>
                </Stack>
              }
            />
          </ListItem>
          <ListItem alignItems="flex-start" divider>
            <ListItemAvatar><Avatar><CameraAltIcon /></Avatar></ListItemAvatar>
            <ListItemText
              primary={<Typography variant="h6" gutterBottom>AIの新技術が医療分野に革命をもたらす</Typography>}
              secondary={
                <Stack spacing={2}>
                  <Box>最新の火星探査ミッションで発見された証拠が、宇宙生物学の分野に新たな希望をもたらしています。</Box>
                  <Stack direction="row" spacing={1}>
                    <Chip label="テクノロジー" icon={<TagIcon />} variant="outlined" color="primary" size="small" />
                    <Chip label="環境" icon={<TagIcon />} variant="outlined" color="primary" size="small" />
                    <Chip label="2025年9月1日" icon={<AccessTimeIcon />} variant="outlined" color="default" size="small" sx={{ border: 'none' }} />
                  </Stack>
                </Stack>
              }
            />
          </ListItem>
          <ListItem alignItems="flex-start">
            <ListItemAvatar><Avatar><CameraAltIcon /></Avatar></ListItemAvatar>
            <ListItemText
              primary={<Typography variant="h6" gutterBottom>AIの新技術が医療分野に革命をもたらす</Typography>}
              secondary={
                <Stack spacing={2}>
                  <Box>最新の火星探査ミッションで発見された証拠が、宇宙生物学の分野に新たな希望をもたらしています。</Box>
                  <Stack direction="row" spacing={1}>
                    <Chip label="テクノロジー" icon={<TagIcon />} variant="outlined" color="primary" size="small" />
                    <Chip label="環境" icon={<TagIcon />} variant="outlined" color="primary" size="small" />
                    <Chip label="2025年9月1日" icon={<AccessTimeIcon />} variant="outlined" color="default" size="small" sx={{ border: 'none' }} />
                  </Stack>
                </Stack>
              }
            />
          </ListItem>
        </List>
      </Card>
    </PageLayout>
  )
}
