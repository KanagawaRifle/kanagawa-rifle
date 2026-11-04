// packages/website/src/app/about/page.tsx

import { House, Landmark } from 'lucide-react';
import { Fragment, type ReactNode } from 'react';

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

function Details({ items }: { items: Array<{ label: string; value: ReactNode }> }) {
  return (
    <dl className="grid grid-cols-4">
      {items.map(({ label, value }, index) => {
        const border = index < items.length - 1 ? 'border-border border-b' : '';
        return (
          <Fragment key={label}>
            <dt className={`px-4 py-2 ${border}`}>{label}</dt>
            <dd className={`col-span-3 px-4 py-2 ${border}`}>{value}</dd>
          </Fragment>
        );
      })}
    </dl>
  );
}

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
          <Details
            items={[
              {
                label: 'メールアドレス',
                value: (
                  <a href={`mailto:${office.email}`} className="text-primary break-all underline">
                    {office.email}
                  </a>
                ),
              },
              {
                label: '電話番号',
                value: (
                  <a href={`tel:${office.telephone}`} className="text-primary underline">
                    {office.telephone}
                  </a>
                ),
              },
              { label: 'FAX', value: `${office.fax} (くりはま花の国射撃場内)` },
              {
                label: '所在地（窓口）',
                value: (
                  <>
                    〒{office.postalCode}
                    <br />
                    {office.region}
                    {office.locality}
                    {office.street}
                    <br />
                    {office.building}
                  </>
                ),
              },
            ]}
          />
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
          <Details
            items={[
              { label: '記号', value: '10280' },
              { label: '番号', value: '79647111' },
              { label: '名義', value: '特定非営利活動法人 神奈川県ライフル射撃協会' },
            ]}
          />
          <div className="border-border bg-muted rounded-md border px-4 py-2">ゆうちょ銀行以外からのお振込</div>
          <Details
            items={[
              { label: '口座', value: 'ゆうちょ銀行 普通口座' },
              { label: '支店', value: '〇二八 店（ゼロニハチ 店）' },
              { label: '番号', value: '7964711' },
              { label: '名義', value: 'トクヒ）カナガワケンライフルシヤゲキキョウカイ' },
            ]}
          />
        </CardContent>
      </Card>
    </PageLayout>
  );
}
