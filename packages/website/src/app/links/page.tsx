// packages/website/src/app/links/page.tsx

import { Link as LinkIcon } from 'lucide-react';

import { PageLayout } from '@/components/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { paths } from '@/config/paths';
import { createPageMetadata } from '@/lib/metadata';

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
    <li className={divider ? 'border-border border-b' : ''}>
      <div className="p-4">
        <a
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:bg-primary/10 font-medium underline"
        >
          {item.title}
          <span className="sr-only">（新しいタブで開く）</span>
        </a>
        <p className="text-muted-foreground mt-1">{item.description}</p>
      </div>
    </li>
  );
}

const currentPath = paths.sub.links;

export const metadata = createPageMetadata({
  title: currentPath.title,
  description: currentPath.description,
  path: currentPath.getHref(),
});

export default function Page() {
  return (
    <PageLayout
      title={currentPath.title}
      page={{ path: currentPath.getHref(), description: currentPath.description, type: 'CollectionPage' }}
      breadcrumbs={[
        { name: paths.home.name, path: paths.home.getHref() },
        { name: currentPath.name, path: currentPath.getHref() },
      ]}
    >
      <p>{currentPath.description}</p>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LinkIcon className="h-5 w-5" aria-hidden="true" />
            リンク
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ul>
            {LINK_ITEMS.map((link, index) => (
              <LinkListItem key={link.href} item={link} divider={index < LINK_ITEMS.length - 1} />
            ))}
          </ul>
        </CardContent>
      </Card>
    </PageLayout>
  );
}
