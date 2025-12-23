// packages/website/src/app/links/page.tsx

import { Card, CardHeader, Link, List, ListItem, ListItemText } from '@mui/material';
import type { Metadata } from 'next';
import React from 'react';
import { LuLink } from 'react-icons/lu';

import { PageLayout } from '@/components';
import { env, paths } from '@/config';

type LinkItem = {
  href: string;
  title: string;
  description: string;
};

// noinspection HttpUrlsUsage
const LINK_ITEMS: readonly LinkItem[] = [
  {
    href: 'https://yokosukarifle.web.fc2.com/',
    title: '横須賀市ライフル射撃協会',
    description: 'エアライフル射撃場がある横須賀の有名な射撃協会です。',
  },
  {
    href: 'https://www.rs-ennis.com/',
    title: 'ガンショップ エニス',
    description: 'ライフル射撃競技に使用する銃および用品を輸入販売している専門店です。',
  },
  {
    href: 'https://www.fareast-gun.co.jp/',
    title: 'ＦＡＲＥＡＳＴ ＧＵＮ ＳＡＬＥＳ',
    description: 'コラムは一読しておきたいです。',
  },
  {
    href: 'http://www.ginzagun.com/',
    title: '銀座銃砲店',
    description: '日本で最も長い歴史を持つライフル射撃の専門店です。',
  },
  {
    href: 'https://www.beach-bum.jp',
    title: 'ＢＥＡＣＨ・ＢＵＭ',
    description: '三戸浜にあるホテル＆レストランです。',
  },
  {
    href: 'https://isehara-shooting.jp/hour.html',
    title: '伊勢原射撃場',
    description: 'ようやく開きました。',
  },
] as const;

function LinkListItem({ item, divider = true }: { readonly item: LinkItem; readonly divider?: boolean }) {
  return (
    <ListItem divider={divider}>
      <ListItemText
        primary={
          <Link href={item.href} target="_blank" rel="noopener noreferrer">
            {item.title}
          </Link>
        }
        secondary={item.description}
      />
    </ListItem>
  );
}

const currentPath = paths.sub.links;

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
              <LuLink aria-hidden="true" />
              リンク
            </div>
          }
        />
        <List>
          {LINK_ITEMS.map((link, index) => (
            <LinkListItem key={link.href} item={link} divider={index < LINK_ITEMS.length - 1} />
          ))}
        </List>
      </Card>
    </PageLayout>
  );
}
