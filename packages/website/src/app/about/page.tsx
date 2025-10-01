// packages/website/src/app/about/page.tsx

import { Card, CardContent, CardHeader } from '@mui/material';
import type { Metadata } from 'next';
import React from 'react';
import { LuHouse, LuLandmark } from 'react-icons/lu';

import { PageLayout } from '@/components';
import { env, paths } from '@/config';

const currentPath = paths.main.about;
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
        <CardHeader
          title={
            <div className="flex items-center gap-2">
              <LuHouse />
              事務局
            </div>
          }
        />
        <CardContent>
          <div className="grid grid-cols-4 gap-0 border-b border-slate-300">
            <div className="p-2">メールアドレス</div>
            <div className="col-span-3 p-2">kraofficial@yahoo.co.jp</div>
          </div>
          <div className="grid grid-cols-4 gap-0 border-b border-slate-300">
            <div className="p-2">電話番号</div>
            <div className="col-span-3 p-2">080-1190-3911</div>
          </div>
          <div className="grid grid-cols-4 gap-0 border-b border-slate-300">
            <div className="p-2">FAX</div>
            <div className="col-span-3 p-2">046-833-6990 (くりはま花の国射撃場内)</div>
          </div>
          <div className="grid grid-cols-4 gap-0">
            <div className="p-2">所在地（窓口）</div>
            <div className="col-span-3 p-2">
              〒239-0832
              <br />
              神奈川県横須賀市神明町1番地
              <br />
              くりはま花の国エアライフル射撃場内
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader
          title={
            <div className="flex items-center gap-2">
              <LuLandmark />
              銀行口座{' '}
            </div>
          }
        />
        <CardContent>
          <div className="rounded-md border border-slate-300 bg-slate-50 p-2">ゆうちょ銀行からのお振込</div>
          <div className="grid grid-cols-4 gap-0 border-b border-slate-300">
            <div className="p-2">記号</div>
            <div className="col-span-3 p-2">10280</div>
          </div>
          <div className="grid grid-cols-4 gap-0 border-b border-slate-300">
            <div className="p-2">番号</div>
            <div className="col-span-3 p-2">79647111</div>
          </div>
          <div className="grid grid-cols-4 gap-0">
            <div className="p-2">名義</div>
            <div className="col-span-3 p-2">特定非営利活動法人 神奈川県ライフル射撃協会</div>
          </div>
          <div className="rounded-md border border-slate-300 bg-slate-50 p-2">ゆうちょ銀行以外からのお振込</div>
          <div className="grid grid-cols-4 gap-0 border-b border-slate-300">
            <div className="p-2">口座</div>
            <div className="col-span-3 p-2">ゆうちょ銀行 普通口座</div>
          </div>
          <div className="grid grid-cols-4 gap-0 border-b border-slate-300">
            <div className="p-2">支店</div>
            <div className="col-span-3 p-2">〇二八 店（ゼロニハチ 店）</div>
          </div>
          <div className="grid grid-cols-4 gap-0 border-b border-slate-300">
            <div className="p-2">番号</div>
            <div className="col-span-3 p-2">7964711</div>
          </div>
          <div className="grid grid-cols-4 gap-0">
            <div className="p-2">名義</div>
            <div className="col-span-3 p-2">トクヒ）カナガワケンライフルシヤゲキキョウカイ</div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader title="ご挨拶" />
        <CardContent>準備中……</CardContent>
      </Card>

      <Card>
        <CardHeader title="協会沿革" />
        <CardContent>準備中……</CardContent>
      </Card>
    </PageLayout>
  );
}
