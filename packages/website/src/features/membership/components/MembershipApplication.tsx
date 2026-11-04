import { Check, CreditCard, PenSquare, Stamp } from 'lucide-react';
import Link from 'next/link';

import { StaticImage } from '@/components/StaticImage';
import { Card, CardActionArea, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Step, StepContent, StepLabel, Stepper } from '@/components/ui/stepper';
import { getStaticFileUrl } from '@/config/assets';

export function MembershipApplication() {
  return (
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
            className="text-primary hover:bg-primary/10 underline"
          >
            日本ライフル射撃協会 ShootersHub
            <span className="sr-only">（新しいタブで開く）</span>
          </a>{' '}
          よりお申し込みください。
        </div>
        <Card>
          <CardActionArea
            href="https://jrsf.sportscom.jp/#/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="ShootersHub 入会申し込みサイトへ移動（新しいタブで開く）"
          >
            <div className="relative h-[82px] w-full">
              <StaticImage
                src={getStaticFileUrl('/join/shooters-hub-logo.png')}
                alt="ShootersHub - 日本ライフル射撃協会の会員管理システム"
                fill
                style={{ objectFit: 'contain' }}
                sizes="(min-width: 768px) 700px, calc(100vw - 44px)"
              />
            </div>
          </CardActionArea>
        </Card>
        <Stepper orientation="vertical">
          <Step expanded active>
            <StepLabel icon="1">
              <span className="flex items-center gap-2">
                <PenSquare className="h-4 w-4" aria-hidden="true" />
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
                <Stamp className="h-4 w-4" aria-hidden="true" />
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
                <Stamp className="h-4 w-4" aria-hidden="true" />
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
                <CreditCard className="h-4 w-4" aria-hidden="true" />
                ご入金
              </span>
            </StepLabel>
            <StepContent>ShootersHub より、ご入会金および年会費をお支払いください。</StepContent>
          </Step>
          <Step expanded active>
            <StepLabel icon="5">
              <span className="flex items-center gap-2">
                <Check className="h-4 w-4" aria-hidden="true" />
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
              <a
                href={getStaticFileUrl('/forms/membership.xlsx')}
                className="text-primary hover:bg-primary/10 underline"
              >
                入会申込書
                <span className="sr-only">（ダウンロード）</span>
              </a>
              に必要事項をご記入の上、
              <Link href="/about" className="text-primary hover:bg-primary/10 underline">
                当協会事務局
              </Link>
              まで封書、ファックスまたは電子メールの添付にてお送り下さい。
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
