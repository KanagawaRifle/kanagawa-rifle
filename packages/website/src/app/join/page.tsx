// packages/website/src/app/join/page.tsx

import { Box, Check, CreditCard, PenSquare, Stamp } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { PageLayout } from '@/components';
import { Card, CardActionArea, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Step, StepContent, StepLabel, Stepper } from '@/components/ui/stepper';
import { env, paths } from '@/config';

const currentPath = paths.main.join;
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
      <Card>
        <CardHeader>
          <CardTitle>入会のお申込</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div>
            下記の専用サイト、
            <a
              href="https://jrsf.sportscom.jp/#/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              日本ライフル射撃協会 ShootersHub
            </a>{' '}
            よりお申し込みください。
          </div>
          <Card>
            <CardActionArea href="https://jrsf.sportscom.jp/#/" target="_blank" rel="noopener noreferrer">
              <div className="relative h-[82px] w-full">
                <Image
                  src="https://static.kanagawa-rifle.org/website/join/shooters-hub-logo.png"
                  alt="入会申し込みサイト（ShootersHub）"
                  fill
                  style={{ objectFit: 'contain' }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            </CardActionArea>
          </Card>
          <Stepper orientation="vertical">
            <Step expanded active>
              <StepLabel icon="1">
                <span className="flex items-center gap-2">
                  <PenSquare className="h-4 w-4" />
                  お申込み
                </span>
              </StepLabel>
              <StepContent>
                日本ライフル射撃協会の専用サイト、ShootersHub より必要事項をご入力の上、お申し込みください。
              </StepContent>
            </Step>
            <Step expanded active>
              <StepLabel icon="2">
                <span className="flex items-center gap-2">
                  <Stamp className="h-4 w-4" />
                  承認（神奈川県ライフル射撃協会）
                </span>
              </StepLabel>
              <StepContent>
                神奈川県ライフル射撃協会の会員登録担当者が承認いたします。承認完了までしばらくお待ちください。
              </StepContent>
            </Step>
            <Step expanded active>
              <StepLabel icon="3">
                <span className="flex items-center gap-2">
                  <Stamp className="h-4 w-4" />
                  承認（日本ライフル射撃協会）
                </span>
              </StepLabel>
              <StepContent>
                日本ライフル射撃協会の会員登録担当者が承認いたします。承認完了までしばらくお待ちください。
              </StepContent>
            </Step>
            <Step expanded active>
              <StepLabel icon="4">
                <span className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  ご入金
                </span>
              </StepLabel>
              <StepContent>ShootersHub より、ご入会金および年会費をお支払いください。</StepContent>
            </Step>
            <Step expanded active>
              <StepLabel icon="5">
                <span className="flex items-center gap-2">
                  <Check className="h-4 w-4" />
                  お手続完了
                </span>
              </StepLabel>
              <StepContent>
                当協会の会員証ならびにご案内をお届けいたします。なお、発送までにお時間をいただく場合がございますので、あらかじめご了承ください。
              </StepContent>
            </Step>
          </Stepper>
          <div>
            <ul className="ml-4 list-outside list-disc">
              <li>お申込および会費等のご入金後、理事会の承認を受けて正式に入会となります。</li>
              <li>
                お申込みシステムをご利用できない方は
                <a href={paths.cdn.getHref('/forms/membership.xlsx')} className="text-primary hover:underline">
                  入会申込書
                </a>
                に必要事項をご記入の上、
                <Link href="/about" className="text-primary hover:underline">
                  当協会事務局
                </Link>
                まで封書、ファックスまたは電子メールの添付にてお送り下さい。
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>一般の方</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-0 border-b border-border text-center">
            <div></div>
            <div className="p-2">
              <div className="font-bold">新規</div>
              <div className="mt-2 text-xs">これから新しく入会される方。</div>
            </div>
            <div className="rounded-t-md border-t border-r border-l border-border bg-muted p-2">
              <div className="font-bold">更新</div>
              <div className="mt-2 text-xs">神ラに既にご入会されている方。</div>
            </div>
            <div className="p-2">
              <div className="font-bold">移籍</div>
              <div className="mt-2 text-xs">
                神ラに入会されていない方で、学連や他都道府県団体から日ラ所属団体を神ラに変更される方。
              </div>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-0 border-b border-border text-center">
            <div className="p-2">
              <span className="font-bold text-red-600">日ラ</span>＋
              <span className="font-bold text-green-600">神ラ</span>
            </div>
            <div className="p-2">27,000円</div>
            <div className="border-r border-l border-border bg-muted p-2">17,000円</div>
            <div className="p-2">22,500円</div>
          </div>
          <div className="grid grid-cols-4 gap-0 border-b border-border text-center">
            <div className="p-2">
              <span className="font-bold text-green-600">神ラ</span>のみ
            </div>
            <div className="p-2">12,000円</div>
            <div className="border-r border-l border-border bg-muted p-2">7,000円</div>
            <div className="p-2">―</div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>学生（大学・専門学校）の方</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-2">ご入会時に学生証等所属を証明できる書類をお送りください。</div>
          <div className="grid grid-cols-4 gap-0 border-b border-border text-center">
            <div></div>
            <div className="p-2">
              <div className="font-bold">新規</div>
              <div className="mt-2 text-xs">これから新しく入会される方。</div>
            </div>
            <div className="rounded-t-md border-t border-r border-l border-border bg-muted p-2">
              <div className="font-bold">更新</div>
              <div className="mt-2 text-xs">神ラに既にご入会されている方。</div>
            </div>
            <div className="p-2">
              <div className="font-bold">移籍</div>
              <div className="mt-2 text-xs">
                神ラに入会されていない方で、学連や他都道府県団体から日ラ所属団体を神ラに変更される方。
              </div>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-0 border-b border-border text-center">
            <div className="p-2">
              <span className="font-bold text-red-600">日ラ</span>＋
              <span className="font-bold text-green-600">神ラ</span>
            </div>
            <div className="p-2">7,000円</div>
            <div className="border-r border-l border-border bg-muted p-2">5,000円</div>
            <div className="p-2">6,500円</div>
          </div>
          <div className="grid grid-cols-4 gap-0 border-b border-border text-center">
            <div className="p-2">
              <span className="font-bold text-green-600">神ラ</span>のみ
            </div>
            <div className="p-2">3,000円</div>
            <div className="border-r border-l border-border bg-muted p-2">2,000円</div>
            <div className="p-2">―</div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>生徒（高校生以下）の方</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-0 border-b border-border text-center">
            <div></div>
            <div className="p-2">
              <div className="font-bold">新規</div>
              <div className="mt-2 text-xs">これから新しく入会される方。</div>
            </div>
            <div className="rounded-t-md border-t border-r border-l border-border bg-muted p-2">
              <div className="font-bold">更新</div>
              <div className="mt-2 text-xs">神ラに既にご入会されている方。</div>
            </div>
            <div className="p-2">
              <div className="font-bold">移籍</div>
              <div className="mt-2 text-xs">
                神ラに入会されていない方で、学連や他都道府県団体から日ラ所属団体を神ラに変更される方。
              </div>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-0 border-b border-border text-center">
            <div className="p-2">
              <span className="font-bold text-red-600">日ラ</span>＋
              <span className="font-bold text-green-600">神ラ</span>
            </div>
            <div className="p-2">4,500円</div>
            <div className="border-r border-l border-border bg-muted p-2">3,000円</div>
            <div className="p-2">4,500円</div>
          </div>
          <div className="grid grid-cols-4 gap-0 border-b border-border text-center">
            <div className="p-2">
              <span className="font-bold text-green-600">神ラ</span>のみ
            </div>
            <div className="p-2">3,000円</div>
            <div className="border-r border-l border-border bg-muted p-2">2,000円</div>
            <div className="p-2">―</div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>ご進学・ご就職される皆様へ</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-border bg-muted p-2 text-sm font-bold">新大学生（4月1日～）</div>
          <div className="grid grid-cols-2 gap-0 border-b border-border">
            <div className="p-2">
              神ラ生徒会員→学生会員
              <br />
              <span className="font-bold text-red-600">日ラ</span>＋
              <span className="font-bold text-green-600">神ラ</span>更新
            </div>
            <div className="p-2 text-center">5,500円</div>
          </div>
          <div className="grid grid-cols-2 gap-0 border-b border-border">
            <div className="p-2">
              神ラ→学連へ所属移籍
              <br />
              <span className="font-bold text-green-600">神ラ</span>のみ更新
            </div>
            <div className="p-2 text-center">2,000円</div>
          </div>
          <div className="grid grid-cols-2 gap-0">
            <div className="p-2">
              他所属加盟団体→神ラへ新規移籍
              <br />
              <span className="font-bold text-red-600">日ラ</span>更新＋
              <span className="font-bold text-green-600">神ラ</span>新規
            </div>
            <div className="p-2 text-center">6,500円</div>
          </div>
          <div className="rounded-md border border-border bg-muted p-2 text-sm font-bold">新社会人（4月1日～）</div>
          <div className="grid grid-cols-2 gap-0 border-b border-border">
            <div className="p-2">
              神ラ学生・生徒会員→一般会員
              <br />
              <span className="font-bold text-red-600">日ラ</span>＋
              <span className="font-bold text-green-600">神ラ</span>更新
            </div>
            <div className="p-2 text-center">17,500円</div>
          </div>
          <div className="grid grid-cols-2 gap-0 border-b border-border">
            <div className="p-2">
              学連→神ラへ所属移籍
              <br />
              <span className="font-bold text-red-600">日ラ</span>＋
              <span className="font-bold text-green-600">神ラ</span>更新
            </div>
            <div className="p-2 text-center">17,500円</div>
          </div>
          <div className="grid grid-cols-2 gap-0">
            <div className="p-2">
              他所属加盟団体→神ラへ新規移籍
              <br />
              <span className="font-bold text-red-600">日ラ</span>更新＋
              <span className="font-bold text-green-600">神ラ</span>新規
            </div>
            <div className="p-2 text-center">22,500円</div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>入会金・年会費一覧</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-0 border-b border-border text-center">
            <div></div>
            <div className="p-2">
              <div className="flex items-center justify-center gap-2 font-bold">
                <Box className="h-4 w-4 text-purple-400" />
                一般
              </div>
              <div className="mt-2 text-xs">4月1日時点で24歳以上の学生を含む。</div>
            </div>
            <div className="rounded-t-md border-t border-r border-l border-border bg-muted p-2">
              <div className="flex items-center justify-center gap-2 font-bold">
                <Box className="h-4 w-4 text-teal-400" />
                学生
              </div>
              <div className="mt-2 text-xs">大学生・専門学校生。</div>
            </div>
            <div className="p-2">
              <div className="flex items-center justify-center gap-2 font-bold">
                <Box className="h-4 w-4 text-rose-400" />
                生徒
              </div>
              <div className="mt-2 text-xs">高校生以下。</div>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-0 border-b border-border text-center">
            <div className="p-2 align-middle">
              <span className="font-bold text-red-600">日</span>　　本
              <br />
              <span className="font-bold text-red-600">ラ</span>入会金
            </div>
            <div className="p-2">5,000円</div>
            <div className="border-r border-l border-border bg-muted p-2">1,000円</div>
            <div className="p-2">500円</div>
          </div>
          <div className="grid grid-cols-4 gap-0 border-b border-border text-center">
            <div className="p-2">
              <span className="font-bold text-green-600">神</span>奈川県
              <br />
              <span className="font-bold text-green-600">ラ</span>入会金
            </div>
            <div className="p-2">5,000円</div>
            <div className="border-r border-l border-border bg-muted p-2">1,000円</div>
            <div className="p-2">1,000円</div>
          </div>
          <div className="grid grid-cols-4 gap-0 border-b border-border text-center">
            <div className="p-2">
              <span className="font-bold text-red-600">日</span>　　本
              <br />
              <span className="font-bold text-red-600">ラ</span>年会費
            </div>
            <div className="p-2">10,000円</div>
            <div className="border-r border-l border-border bg-muted p-2">3,000円</div>
            <div className="p-2">1,000円</div>
          </div>
          <div className="grid grid-cols-4 gap-0 border-b border-border text-center">
            <div className="p-2">
              <span className="font-bold text-green-600">神</span>奈川県
              <br />
              <span className="font-bold text-green-600">ラ</span>年会費
            </div>
            <div className="p-2">7,000円</div>
            <div className="border-r border-l border-border bg-muted p-2">2,000円</div>
            <div className="p-2">2,000円</div>
          </div>
          <div className="grid grid-cols-4 gap-0 border-b border-border text-center">
            <div className="p-2">移籍料</div>
            <div className="p-2">500円</div>
            <div className="border-r border-l border-border bg-muted p-2">500円</div>
            <div className="p-2">500円</div>
          </div>
        </CardContent>
      </Card>
    </PageLayout>
  );
}
