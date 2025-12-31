// packages/website/src/app/recommendation/page.tsx

import {
  Calendar,
  CalendarClock,
  CalendarDays,
  CheckCircle,
  CircleX,
  Clipboard,
  Clock,
  CreditCard,
  FileType,
  Newspaper,
  Recycle,
  TriangleAlert,
} from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

import { PageLayout } from '@/components';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Step, StepContent, StepLabel, Stepper } from '@/components/ui/stepper';
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
      <Alert variant="warning">
        <TriangleAlert className="h-4 w-4" />
        <AlertTitle>【重要】推薦申請システムの移行について</AlertTitle>
        <AlertDescription>
          <p>
            <strong>2025年11月</strong>
            より、ニチラネットから新システムへ移行します。これに伴い、推薦申請は新システム上で行っていただくこととなります。
          </p>
          <p>詳細につきましては、日本ライフル射撃協会の発表をお待ちください。</p>
        </AlertDescription>
      </Alert>

      <Alert variant="warning">
        <TriangleAlert className="h-4 w-4" />
        <AlertTitle>低年者空気けん銃推薦申請料について</AlertTitle>
        <AlertDescription>
          <p>
            <strong>2025年10月</strong>
            度推薦より、低年者（14-17歳）の空気けん銃推薦申請につきまして、申請手数料が有料に変更となります。
          </p>
          <p>（新）手数料 4,000円</p>
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>手数料</CardTitle>
          <CardDescription>推薦に係る手数料</CardDescription>
        </CardHeader>
        <CardContent>
          手数料は
          <Link href="/about" className="text-primary underline hover:bg-primary/10">
            当協会の指定口座
          </Link>
          までお振込みください。
        </CardContent>
        <ul>
          <li className="flex items-center justify-between border-b border-border p-4">
            <div className="flex items-center gap-2">
              <Badge variant="default">ライフル</Badge>
              <span>ライフル銃 (小口径)</span>
            </div>
            <span className="text-xl font-bold">6,000円</span>
          </li>
          <li className="flex items-center justify-between border-b border-border p-4">
            <div className="flex items-center gap-2">
              <Badge variant="default">ライフル</Badge>
              <span>ライフル銃 (大口径)</span>
            </div>
            <span className="text-xl font-bold">10,000円</span>
          </li>
          <li className="flex items-center justify-between border-b border-border p-4">
            <div className="flex items-center gap-2">
              <Badge variant="secondary">けん銃</Badge>
              <span>けん銃</span>
            </div>
            <span className="text-xl font-bold">10,000円</span>
          </li>
          <li className="flex items-center justify-between border-b border-border p-4">
            <div className="flex items-center gap-2">
              <Badge variant="secondary">けん銃</Badge>
              <span>空気けん銃</span>
            </div>
            <span className="text-xl font-bold">6,000円</span>
          </li>
          <li className="flex items-center justify-between border-b border-border p-4">
            <div className="flex items-center gap-2">
              <Badge variant="info">低年者</Badge>
              <span>低年者空気銃</span>
            </div>
            <span className="text-xl font-bold text-green-700 dark:text-green-400">無料</span>
          </li>
          <li className="flex items-center justify-between border-b border-border p-4">
            <div className="flex items-center gap-2">
              <Badge variant="info">低年者</Badge>
              <div>
                <span>低年者空気けん銃</span>
                <div className="text-xs text-muted-foreground">※2025年10月度推薦より</div>
              </div>
            </div>
            <span className="text-xl font-bold">4,000円</span>
          </li>
          <li className="flex items-center justify-between border-b border-border p-4">
            <div className="flex items-center gap-2">
              <Badge variant="info">低年者</Badge>
              <span>低年者ライフル銃 (小口径)</span>
            </div>
            <span className="text-xl font-bold">6,000円</span>
          </li>
          <li className="flex items-center justify-between border-b border-border p-4">
            <div className="flex items-center gap-2">
              <Badge variant="outline">その他</Badge>
              <span>技能講習免除</span>
            </div>
            <span className="text-xl font-bold">6,000円</span>
          </li>
          <li className="flex items-center justify-between p-4">
            <div className="flex items-center gap-2">
              <Badge variant="outline">その他</Badge>
              <span>再発行</span>
            </div>
            <span className="text-xl font-bold">2,000円</span>
          </li>
        </ul>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>申請の流れ</CardTitle>
        </CardHeader>
        <CardContent>
          <Stepper orientation="vertical">
            <Step expanded active>
              <StepLabel icon="1">推薦の申請（ニチラネット）</StepLabel>
              <StepContent>所持希望者は、「ニチラネット」を通じて推薦の申請を行います。</StepContent>
            </Step>
            <Step expanded active>
              <StepLabel icon="2">承認（加盟団体推薦委員会）</StepLabel>
              <StepContent>申請内容は、所属する加盟団体の推薦委員会において審査されます。</StepContent>
            </Step>
            <Step expanded active>
              <StepLabel icon="3">承認（本部推薦委員会）</StepLabel>
              <StepContent>加盟団体の承認後、日本ライフル射撃協会推薦委員会により審査が行われます。</StepContent>
            </Step>
            <Step expanded active>
              <StepLabel icon="4">推薦状の発行</StepLabel>
              <StepContent>日本スポーツ協会より推薦状が発行されます。</StepContent>
            </Step>
            <Step expanded active>
              <StepLabel icon="5">銃所持報告書の提出</StepLabel>
              <StepContent>銃を所持した後、日本ライフル射撃協会に「銃所持報告書」を提出します。</StepContent>
            </Step>
          </Stepper>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>技能講習免除について</CardTitle>
          <CardDescription>免除の申請資格</CardDescription>
        </CardHeader>
        <ul>
          <li className="flex items-start gap-3 p-4">
            <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-green-700 dark:text-green-400" aria-hidden="true" />
            <div>
              <span className="font-bold text-green-700 dark:text-green-400">1年間で</span>
              当協会主催・主管の大会に、
              <span className="font-bold text-green-700 dark:text-green-400">2回以上</span>
              出場していること
            </div>
          </li>
          <li className="flex items-center justify-center py-2">
            <div className="flex-1 border-t border-border" aria-hidden="true"></div>
            <span className="bg-background px-4 text-sm font-medium text-muted-foreground">または</span>
            <div className="flex-1 border-t border-border" aria-hidden="true"></div>
          </li>
          <li className="flex items-start gap-3 p-4">
            <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" aria-hidden="true" />
            <div>
              <span className="font-bold text-blue-600">3年間で</span>
              当協会主催・主管の大会に、
              <span className="font-bold text-blue-600">6回以上</span>
              出場していること
            </div>
          </li>
        </ul>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarDays className="h-5 w-5" aria-hidden="true" />
            スケジュール
          </CardTitle>
        </CardHeader>
        <ul>
          <li className="flex items-start gap-3 border-b border-border p-4">
            <CalendarClock className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
            <div>
              <div className="font-medium">申請締切日</div>
              <div className="text-muted-foreground">
                <a
                  href={paths.cdn.getHref('/projects/2025/competitions.pdf')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline hover:bg-primary/10"
                >
                  推薦スケジュール
                  <span className="sr-only">（PDF、新しいタブで開く）</span>
                </a>
                をご覧ください。
              </div>
            </div>
          </li>
          <li className="flex items-start gap-3 border-b border-border p-4">
            <Clock className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
            <div>
              <div className="font-medium">所要日数</div>
              <div className="text-muted-foreground">
                当協会の締切後、お届けまでに標準で<strong>1ヶ月弱</strong>
                かかりますので、余裕を持って申請するようお願いいたします。
                <br />
                ※特にピストルに関する申請をされる方は、所持銃の許可有効期間をよく確認の上、余裕を持って計画的にご申請ください。
              </div>
            </div>
          </li>
          <li className="flex items-start gap-3 border-b border-border p-4">
            <Clipboard className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
            <div>
              <div className="font-medium">申請が翌月審査となる場合</div>
              <div className="text-muted-foreground">
                当協会の締切日以降に届いた申請につきましては、翌月の推薦委員会の審査となります。
              </div>
            </div>
          </li>
          <li className="flex items-start gap-3 p-4">
            <TriangleAlert className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
            <div>
              <div className="font-medium">推薦委員会</div>
              <div className="text-muted-foreground">
                推薦委員会がない月がございますので、ご申請される方はご注意ください。
              </div>
            </div>
          </li>
        </ul>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" aria-hidden="true" />
            手数料について
          </CardTitle>
        </CardHeader>
        <ul>
          <li className="flex items-start gap-3 p-4">
            <CircleX className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
            <div>
              <div className="font-medium">非承認の場合</div>
              <div className="text-muted-foreground">
                日ラで承認されなかった場合でも推薦手数料は返却されません。※推薦委員会以前に自己取り下げの場合は支払い不要です。
              </div>
            </div>
          </li>
        </ul>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Newspaper className="h-5 w-5" aria-hidden="true" />
            推薦書について
          </CardTitle>
        </CardHeader>
        <ul>
          <li className="flex items-start gap-3 border-b border-border p-4">
            <Calendar className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
            <div>
              <div className="font-medium">有効期限</div>
              <div className="text-muted-foreground">
                推薦書の有効期限は1年間（発行日より公安委員会に提出するまで）です。
              </div>
            </div>
          </li>
          <li className="flex items-start gap-3 p-4">
            <Recycle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
            <div>
              <div className="font-medium">未使用推薦書の返却</div>
              <div className="text-muted-foreground">
                期限切れ、または使わなかった推薦書は返却の義務があります。当協会事務局までご返却ください。
                <br />
                ※空気けん銃につきましては、500人枠がありますので、特に速やかにご返却をお願いいたします。
              </div>
            </div>
          </li>
        </ul>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>ピストルを所持中の皆様へ</CardTitle>
          <CardDescription>※ご不明な点は日ラへ直接お問い合わせください。</CardDescription>
        </CardHeader>
        <ul>
          <li className="flex items-center gap-3 border-b border-border p-4">
            <FileType className="h-5 w-5 text-red-600 dark:text-red-400" aria-hidden="true" />
            <a
              href={paths.cdn.getHref('/recommendation/Recommendation_Bulletin_no_57.pdf')}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline hover:bg-primary/10"
            >
              推薦ブレッテン no.57
              <span className="sr-only">（PDF、新しいタブで開く）</span>
            </a>
          </li>
          <li className="flex items-center gap-3 border-b border-border p-4">
            <FileType className="h-5 w-5 text-red-600 dark:text-red-400" aria-hidden="true" />
            <a
              href={paths.cdn.getHref('/recommendation/Recommendation_Bulletin_no_56.pdf')}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline hover:bg-primary/10"
            >
              推薦ブレッテン no.56
              <span className="sr-only">（PDF、新しいタブで開く）</span>
            </a>
          </li>
          <li className="flex items-center gap-3 border-b border-border p-4">
            <FileType className="h-5 w-5 text-red-600 dark:text-red-400" aria-hidden="true" />
            <a
              href={paths.cdn.getHref('/recommendation/Recommendation_Bulletin_no_55.pdf')}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline hover:bg-primary/10"
            >
              推薦ブレッテン no.55
              <span className="sr-only">（PDF、新しいタブで開く）</span>
            </a>
          </li>
          <li className="flex items-center gap-3 border-b border-border p-4">
            <FileType className="h-5 w-5 text-red-600 dark:text-red-400" aria-hidden="true" />
            <a
              href={paths.cdn.getHref('/recommendation/Recommendation_Bulletin_no_51.pdf')}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline hover:bg-primary/10"
            >
              推薦ブレッテン no.51
              <span className="sr-only">（PDF、新しいタブで開く）</span>
            </a>
          </li>
          <li className="flex items-center gap-3 p-4">
            <FileType className="h-5 w-5 text-red-600 dark:text-red-400" aria-hidden="true" />
            <a
              href={paths.cdn.getHref('/recommendation/Recommendation_Bulletin_no_49.pdf')}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline hover:bg-primary/10"
            >
              推薦ブレッテン no.49
              <span className="sr-only">（PDF、新しいタブで開く）</span>
            </a>
          </li>
        </ul>
      </Card>
    </PageLayout>
  );
}
