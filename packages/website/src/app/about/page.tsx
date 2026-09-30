// packages/website/src/app/about/page.tsx

import { House, Landmark } from 'lucide-react';

import { PageLayout } from '@/components/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { app } from '@/config/app';
import { office } from '@/config/organization';
import { paths } from '@/config/paths';
import { seoIds } from '@/config/seo';
import { createPageMetadata } from '@/lib/metadata';

const currentPath = paths.main.about;
export const metadata = createPageMetadata({
  title: currentPath.title,
  description: currentPath.description,
  path: currentPath.getHref(),
});

export default function Page() {
  return (
    <PageLayout
      title={currentPath.title}
      page={{
        path: currentPath.getHref(),
        description: currentPath.description,
        type: 'AboutPage',
        mainEntity: { '@id': seoIds.organization },
      }}
      breadcrumbs={[
        { name: paths.home.name, path: paths.home.getHref() },
        { name: currentPath.name, path: currentPath.getHref() },
      ]}
    >
      <p>
        {app.longName}は、神奈川県でライフル射撃競技の普及と振興に取り組む団体です。
        スモールボア・エアライフル・ビームライフル競技の大会開催・運営や普及活動を行っています。
        お問い合わせは下記の事務局へご連絡ください。
      </p>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <House className="h-5 w-5" aria-hidden="true" />
            事務局
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border-border grid grid-cols-4 gap-0 border-b">
            <div className="px-4 py-2">メールアドレス</div>
            <div className="col-span-3 px-4 py-2">
              <a href={`mailto:${office.email}`} className="text-primary break-all underline">
                {office.email}
              </a>
            </div>
          </div>
          <div className="border-border grid grid-cols-4 gap-0 border-b">
            <div className="px-4 py-2">電話番号</div>
            <div className="col-span-3 px-4 py-2">
              <a href={`tel:${office.telephone}`} className="text-primary underline">
                {office.telephone}
              </a>
            </div>
          </div>
          <div className="border-border grid grid-cols-4 gap-0 border-b">
            <div className="px-4 py-2">FAX</div>
            <div className="col-span-3 px-4 py-2">{office.fax} (くりはま花の国射撃場内)</div>
          </div>
          <div className="grid grid-cols-4 gap-0">
            <div className="px-4 py-2">所在地（窓口）</div>
            <div className="col-span-3 px-4 py-2">
              〒{office.postalCode}
              <br />
              {office.region}
              {office.locality}
              {office.street}
              <br />
              {office.building}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Landmark className="h-5 w-5" aria-hidden="true" />
            銀行口座
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border-border bg-muted rounded-md border px-4 py-2">ゆうちょ銀行からのお振込</div>
          <div className="border-border grid grid-cols-4 gap-0 border-b">
            <div className="px-4 py-2">記号</div>
            <div className="col-span-3 px-4 py-2">10280</div>
          </div>
          <div className="border-border grid grid-cols-4 gap-0 border-b">
            <div className="px-4 py-2">番号</div>
            <div className="col-span-3 px-4 py-2">79647111</div>
          </div>
          <div className="grid grid-cols-4 gap-0">
            <div className="px-4 py-2">名義</div>
            <div className="col-span-3 px-4 py-2">特定非営利活動法人 神奈川県ライフル射撃協会</div>
          </div>
          <div className="border-border bg-muted rounded-md border px-4 py-2">ゆうちょ銀行以外からのお振込</div>
          <div className="border-border grid grid-cols-4 gap-0 border-b">
            <div className="px-4 py-2">口座</div>
            <div className="col-span-3 px-4 py-2">ゆうちょ銀行 普通口座</div>
          </div>
          <div className="border-border grid grid-cols-4 gap-0 border-b">
            <div className="px-4 py-2">支店</div>
            <div className="col-span-3 px-4 py-2">〇二八 店（ゼロニハチ 店）</div>
          </div>
          <div className="border-border grid grid-cols-4 gap-0 border-b">
            <div className="px-4 py-2">番号</div>
            <div className="col-span-3 px-4 py-2">7964711</div>
          </div>
          <div className="grid grid-cols-4 gap-0">
            <div className="px-4 py-2">名義</div>
            <div className="col-span-3 px-4 py-2">トクヒ）カナガワケンライフルシヤゲキキョウカイ</div>
          </div>
        </CardContent>
      </Card>
    </PageLayout>
  );
}
