// packages/website/src/app/about/page.tsx

import { House, Landmark } from 'lucide-react';
import type { Metadata } from 'next';

import { PageLayout } from '@/components';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { app, env, paths } from '@/config';

const currentPath = paths.main.about;
export const metadata: Metadata = {
  title: currentPath.name,
  description: currentPath.description,
  openGraph: { images: new URL(`/api/og?title=${currentPath.name}`, env.APP_URL) },
  twitter: { images: new URL(`/api/og?title=${currentPath.name}`, env.APP_URL) },
};

const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SportsOrganization',
  '@id': `${env.APP_URL}/#organization`,
  name: app.name,
  legalName: app.longName,
  alternateName: app.shortName,
  description: app.description,
  url: env.APP_URL,
  telephone: '080-1190-3911',
  faxNumber: '046-833-6990',
  email: 'kraofficial@yahoo.co.jp',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '神明町1番地 くりはま花の国エアライフル射撃場内',
    addressLocality: '横須賀市',
    addressRegion: '神奈川県',
    postalCode: '239-0832',
    addressCountry: 'JP',
  },
  areaServed: {
    '@type': 'AdministrativeArea',
    name: '神奈川県',
  },
  sport: 'ライフル射撃',
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }} />
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <House className="h-5 w-5" />
            事務局
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-0 border-b border-border">
            <div className="p-2">メールアドレス</div>
            <div className="col-span-3 p-2">kraofficial@yahoo.co.jp</div>
          </div>
          <div className="grid grid-cols-4 gap-0 border-b border-border">
            <div className="p-2">電話番号</div>
            <div className="col-span-3 p-2">080-1190-3911</div>
          </div>
          <div className="grid grid-cols-4 gap-0 border-b border-border">
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
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Landmark className="h-5 w-5" />
            銀行口座
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-border bg-muted p-2">ゆうちょ銀行からのお振込</div>
          <div className="grid grid-cols-4 gap-0 border-b border-border">
            <div className="p-2">記号</div>
            <div className="col-span-3 p-2">10280</div>
          </div>
          <div className="grid grid-cols-4 gap-0 border-b border-border">
            <div className="p-2">番号</div>
            <div className="col-span-3 p-2">79647111</div>
          </div>
          <div className="grid grid-cols-4 gap-0">
            <div className="p-2">名義</div>
            <div className="col-span-3 p-2">特定非営利活動法人 神奈川県ライフル射撃協会</div>
          </div>
          <div className="rounded-md border border-border bg-muted p-2">ゆうちょ銀行以外からのお振込</div>
          <div className="grid grid-cols-4 gap-0 border-b border-border">
            <div className="p-2">口座</div>
            <div className="col-span-3 p-2">ゆうちょ銀行 普通口座</div>
          </div>
          <div className="grid grid-cols-4 gap-0 border-b border-border">
            <div className="p-2">支店</div>
            <div className="col-span-3 p-2">〇二八 店（ゼロニハチ 店）</div>
          </div>
          <div className="grid grid-cols-4 gap-0 border-b border-border">
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
        <CardHeader>
          <CardTitle>ご挨拶</CardTitle>
        </CardHeader>
        <CardContent>準備中……</CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>協会沿革</CardTitle>
        </CardHeader>
        <CardContent>準備中……</CardContent>
      </Card>
    </PageLayout>
  );
}
