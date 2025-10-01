import {
  Alert,
  AlertTitle,
  Box,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
} from '@mui/material';
import type { Metadata } from 'next';
import React from 'react';
import { FaFilePdf } from 'react-icons/fa';
import {
  LuCalendar,
  LuCalendarClock,
  LuCalendarDays,
  LuCircleCheckBig,
  LuCircleX,
  LuClipboard,
  LuClock,
  LuCreditCard,
  LuNewspaper,
  LuRecycle,
  LuTriangleAlert,
} from 'react-icons/lu';

import { PageLayout } from '@/components';
import { env, paths } from '@/config';

const currentPath = paths.main.recommendation;
export const metadata: Metadata = {
  title: currentPath.name,
  description: currentPath.description,
  openGraph: { images: new URL(`/api/og?title=${currentPath.name}`, env.APP_URL) },
  twitter: { images: new URL(`/api/og?title=${currentPath.name}`, env.APP_URL) },
};

export default function Page() {
  return (
    <PageLayout
      title={currentPath.name}
      breadcrumbs={[
        { name: paths.home.name, path: paths.home.getHref() },
        { name: currentPath.name, path: currentPath.getHref() },
      ]}
    >
      <Alert severity="warning">
        <AlertTitle>【重要】推薦申請システムの移行について</AlertTitle>
        <p>
          <strong>2025年11月</strong>
          より、ニチラネットから新システムへ移行します。これに伴い、推薦申請は新システム上で行っていただくこととなります。
        </p>
        <p>詳細につきましては、日本ライフル射撃協会の発表をお待ちください。</p>
      </Alert>

      <Alert severity="warning">
        <AlertTitle>低年者空気けん銃推薦申請料について</AlertTitle>
        <p>
          <strong>2025年10月</strong>
          度推薦より、低年者（14-17歳）の空気けん銃推薦申請につきまして、申請手数料が有料に変更となります。
        </p>
        <p>（新）手数料 4,000円</p>
      </Alert>

      <Card>
        <CardHeader title="手数料" subheader="推薦に係る手数料" />
        <CardContent>
          手数料は<Link href="/about">当協会の指定口座</Link>までお振込みください。
        </CardContent>
        <List>
          <ListItem divider>
            <ListItemText
              primary={
                <div className="flex flex-row items-center gap-2">
                  <Chip label="ライフル" size="small" color="primary" />
                  <div>ライフル銃 (小口径) </div>
                </div>
              }
            />
            <div className="text-xl font-bold">6,000円</div>
          </ListItem>
          <ListItem divider>
            <ListItemText
              primary={
                <div className="flex flex-row items-center gap-2">
                  <Chip label="ライフル" size="small" color="primary" />
                  <div>ライフル銃 (大口径)</div>
                </div>
              }
            />
            <div className="text-xl font-bold">10,000円</div>
          </ListItem>
          <ListItem divider>
            <ListItemText
              primary={
                <div className="flex flex-row items-center gap-2">
                  <Chip label="けん銃" size="small" color="secondary" />
                  <div>けん銃</div>
                </div>
              }
            />
            <div className="text-xl font-bold">10,000円</div>
          </ListItem>
          <ListItem divider>
            <ListItemText
              primary={
                <div className="flex flex-row items-center gap-2">
                  <Chip label="けん銃" size="small" color="secondary" />
                  <div>空気けん銃</div>
                </div>
              }
            />
            <div className="text-xl font-bold">6,000円</div>
          </ListItem>
          <ListItem divider>
            <ListItemText
              primary={
                <div className="flex flex-row items-center gap-2">
                  <Chip label="低年者" size="small" color="info" />
                  <div>低年者空気銃</div>
                </div>
              }
            />
            <div className="text-xl font-bold text-green-600">無料</div>
          </ListItem>
          <ListItem divider>
            <ListItemText
              primary={
                <div className="flex flex-row items-center gap-2">
                  <Chip label="低年者" size="small" color="info" />
                  <div>
                    低年者空気けん銃
                    <Box>
                      <small>※2025年10月度推薦より</small>
                    </Box>
                  </div>
                </div>
              }
            />
            <div className="text-xl font-bold">4,000円</div>
          </ListItem>
          <ListItem divider>
            <ListItemText
              primary={
                <div className="flex flex-row items-center gap-2">
                  <Chip label="低年者" size="small" color="info" />
                  <div>低年者ライフル銃 (小口径) </div>
                </div>
              }
            />
            <div className="text-xl font-bold">6,000円</div>
          </ListItem>
          <ListItem divider>
            <ListItemText
              primary={
                <div className="flex flex-row items-center gap-2">
                  <Chip label="その他" size="small" />
                  <div>技能講習免除</div>
                </div>
              }
            />
            <div className="text-xl font-bold">6,000円</div>
          </ListItem>
          <ListItem>
            <ListItemText
              primary={
                <div className="flex flex-row items-center gap-2">
                  <Chip label="その他" size="small" />
                  <div>再発行</div>
                </div>
              }
            />
            <div className="text-xl font-bold">2,000円</div>
          </ListItem>
        </List>
      </Card>

      <Card>
        <CardHeader title={'申請の流れ'} />
        <CardContent>
          <Stepper orientation="vertical">
            <Step expanded active>
              <StepLabel>推薦の申請（ニチラネット）</StepLabel>
              <StepContent>所持希望者は、「ニチラネット」を通じて推薦の申請を行います。</StepContent>
            </Step>
            <Step expanded active>
              <StepLabel>承認（加盟団体推薦委員会）</StepLabel>
              <StepContent>申請内容は、所属する加盟団体の推薦委員会において審査されます。</StepContent>
            </Step>
            <Step expanded active>
              <StepLabel>承認（本部推薦委員会）</StepLabel>
              <StepContent>加盟団体の承認後、日本ライフル射撃協会推薦委員会により審査が行われます。</StepContent>
            </Step>
            <Step expanded active>
              <StepLabel>推薦状の発行</StepLabel>
              <StepContent>日本スポーツ協会より推薦状が発行されます。</StepContent>
            </Step>
            <Step expanded active>
              <StepLabel>銃所持報告書の提出</StepLabel>
              <StepContent>銃を所持した後、日本ライフル射撃協会に「銃所持報告書」を提出します。</StepContent>
            </Step>
          </Stepper>
        </CardContent>
      </Card>

      <Card>
        <CardHeader title="技能講習免除について" subheader="免除の申請資格" />
        <List>
          <ListItem alignItems="flex-start">
            <ListItemIcon sx={{ color: 'success.main' }}>
              <LuCircleCheckBig size="1.3rem" />
            </ListItemIcon>
            <ListItemText>
              <Typography color="success.main">
                <strong>1年間で</strong>
              </Typography>
              当協会主催・主管の大会に、
              <Typography component="span" color="success.main">
                <strong>2回以上</strong>
              </Typography>
              出場していること
            </ListItemText>
          </ListItem>
          <ListItem className="flex items-center justify-center py-2">
            <div className="flex-1 border-t border-gray-200"></div>
            <span className="bg-white px-4 text-sm font-medium text-gray-500">または</span>
            <div className="flex-1 border-t border-gray-200"></div>
          </ListItem>
          <ListItem alignItems="flex-start">
            <ListItemIcon sx={{ color: 'info.main' }}>
              <LuCircleCheckBig size="1.3rem" />
            </ListItemIcon>
            <ListItemText>
              <Typography color="info.main">
                <strong>3年間で</strong>
              </Typography>
              当協会主催・主管の大会に、
              <Typography component="span" color="info.main">
                <strong>6回以上</strong>
              </Typography>
              出場していること
            </ListItemText>
          </ListItem>
        </List>
      </Card>

      <Card>
        <CardHeader
          title={
            <div className="flex flex-row items-center gap-2">
              <LuCalendarDays />
              スケジュール
            </div>
          }
        />
        <List>
          <ListItem alignItems="flex-start" divider>
            <ListItemIcon>
              <LuCalendarClock size="1.3rem" />
            </ListItemIcon>
            <ListItemText
              primary="申請締切日"
              secondary={
                <>
                  <Link href={paths.cdn.getHref('/projects/2025/competitions.pdf')} target="_blank">
                    推薦スケジュール
                  </Link>
                  をご覧ください。
                </>
              }
            />
          </ListItem>
          <ListItem alignItems="flex-start" divider>
            <ListItemIcon>
              <LuClock size="1.3rem" />
            </ListItemIcon>
            <ListItemText
              primary="所要日数"
              secondary={
                <>
                  当協会の締切後、お届けまでに標準で<strong>1ヶ月弱</strong>
                  かかりますので、余裕を持って申請するようお願いいたします。
                  <br />
                  ※特にピストルに関する申請をされる方は、所持銃の許可有効期間をよく確認の上、余裕を持って計画的にご申請ください。
                </>
              }
            />
          </ListItem>
          <ListItem alignItems="flex-start" divider>
            <ListItemIcon>
              <LuClipboard size="1.3rem" />
            </ListItemIcon>
            <ListItemText
              primary="申請が翌月審査となる場合"
              secondary="当協会の締切日以降に届いた申請につきましては、翌月の推薦委員会の審査となります。"
            />
          </ListItem>
          <ListItem alignItems="flex-start">
            <ListItemIcon>
              <LuTriangleAlert size="1.3rem" />
            </ListItemIcon>
            <ListItemText
              primary="推薦委員会"
              secondary="推薦委員会がない月がございますので、ご申請される方はご注意ください。"
            />
          </ListItem>
        </List>
      </Card>

      <Card>
        <CardHeader
          title={
            <div className="flex flex-row items-center gap-2">
              <LuCreditCard />
              手数料について
            </div>
          }
        />
        <List>
          <ListItem alignItems="flex-start">
            <ListItemIcon>
              <LuCircleX size="1.3rem" />
            </ListItemIcon>
            <ListItemText
              primary="非承認の場合"
              secondary="日ラで承認されなかった場合でも推薦手数料は返却されません。※推薦委員会以前に自己取り下げの場合は支払い不要です。"
            />
          </ListItem>
        </List>
      </Card>

      <Card>
        <CardHeader
          title={
            <div className="flex flex-row items-center gap-2">
              <LuNewspaper />
              推薦書について
            </div>
          }
        />
        <List>
          <ListItem alignItems="flex-start" divider>
            <ListItemIcon>
              <LuCalendar size="1.3rem" />
            </ListItemIcon>
            <ListItemText
              primary="有効期限"
              secondary="推薦書の有効期限は1年間（発行日より公安委員会に提出するまで）です。"
            />
          </ListItem>
          <ListItem alignItems="flex-start">
            <ListItemIcon>
              <LuRecycle size="1.3rem" />
            </ListItemIcon>
            <ListItemText
              primary="未使用推薦書の返却"
              secondary={
                <>
                  期限切れ、または使わなかった推薦書は返却の義務があります。当協会事務局までご返却ください。
                  <br />
                  ※空気けん銃につきましては、500人枠がありますので、特に速やかにご返却をお願いいたします。
                </>
              }
            />
          </ListItem>
        </List>
      </Card>

      <Card>
        <CardHeader title="ピストルを所持中の皆様へ" subheader="※ご不明な点は日ラへ直接お問い合わせください。" />
        <List>
          <ListItem divider>
            <ListItemIcon sx={{ color: 'error.main' }}>
              <FaFilePdf />
            </ListItemIcon>
            <ListItemText>
              <Link target="_blank" href={paths.cdn.getHref('/recommendation/Recommendation_Bulletin_no_57.pdf')}>
                推薦ブレッテン no.57
              </Link>
            </ListItemText>
          </ListItem>
          <ListItem divider>
            <ListItemIcon sx={{ color: 'error.main' }}>
              <FaFilePdf />
            </ListItemIcon>
            <ListItemText>
              <Link target="_blank" href={paths.cdn.getHref('/recommendation/Recommendation_Bulletin_no_56.pdf')}>
                推薦ブレッテン no.56
              </Link>
            </ListItemText>
          </ListItem>
          <ListItem divider>
            <ListItemIcon sx={{ color: 'error.main' }}>
              <FaFilePdf />
            </ListItemIcon>
            <ListItemText>
              <Link target="_blank" href={paths.cdn.getHref('/recommendation/Recommendation_Bulletin_no_55.pdf')}>
                推薦ブレッテン no.55
              </Link>
            </ListItemText>
          </ListItem>
          <ListItem divider>
            <ListItemIcon sx={{ color: 'error.main' }}>
              <FaFilePdf />
            </ListItemIcon>
            <ListItemText>
              <Link target="_blank" href={paths.cdn.getHref('/recommendation/Recommendation_Bulletin_no_51.pdf')}>
                推薦ブレッテン no.51
              </Link>
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon sx={{ color: 'error.main' }}>
              <FaFilePdf />
            </ListItemIcon>
            <ListItemText>
              <Link target="_blank" href={paths.cdn.getHref('/recommendation/Recommendation_Bulletin_no_49.pdf')}>
                推薦ブレッテン no.49
              </Link>
            </ListItemText>
          </ListItem>
        </List>
      </Card>
    </PageLayout>
  );
}
