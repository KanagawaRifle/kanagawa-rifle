// packages/website/src/components/Footer.tsx

import { ExternalLink } from 'lucide-react';

import { SocialLinks } from '@/components/SocialLinks';
import { buttonVariants } from '@/components/ui/button-styles';
import { app } from '@/config/app';
import { NEWS_FEED_PATH, paths } from '@/config/paths';
import { isPreviewDeployment } from '@/config/seo';
import { cn } from '@/lib/utils';

const externalLinkHint = (
  <>
    <ExternalLink className="h-3 w-3" aria-hidden="true" />
    <span className="sr-only">（新しいタブで開く）</span>
  </>
);

export function Footer() {
  return (
    <footer className="defer-render bg-muted [contain-intrinsic-block-size:auto_650px]">
      {/* ソーシャルリンク */}
      <nav aria-label="ソーシャルメディア">
        <div className="border-border mx-auto mt-2 max-w-screen-xl border-b px-4 py-6">
          <div className="flex gap-1">
            <SocialLinks />
          </div>
        </div>
      </nav>

      {/* ナビゲーションリンク */}
      <nav aria-label="フッターナビゲーション">
        <div className="border-border mx-auto mt-2 grid max-w-screen-xl grid-cols-1 gap-4 border-b px-4 py-6 md:grid-cols-3">
          <section aria-labelledby="footer-main-nav">
            <h2 id="footer-main-nav" className="text-muted-foreground mb-2 text-xs font-bold">
              メインナビゲーション
            </h2>
            <ul className="-ml-4">
              {Object.entries(paths.main).map(([key, obj]) => (
                <li key={key}>
                  <a
                    href={obj.getHref()}
                    className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), 'text-primary justify-start')}
                  >
                    {obj.name}
                  </a>
                </li>
              ))}
            </ul>
          </section>
          <section aria-labelledby="footer-sub-nav">
            <h2 id="footer-sub-nav" className="text-muted-foreground mb-2 text-xs font-bold">
              各種情報
            </h2>
            <ul className="-ml-4">
              {Object.entries(paths.sub).map(([key, obj]) => (
                <li key={key}>
                  <a
                    href={obj.getHref()}
                    className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), 'text-primary justify-start')}
                  >
                    {obj.name}
                  </a>
                </li>
              ))}
              {!isPreviewDeployment() && (
                <li>
                  <a
                    href={NEWS_FEED_PATH}
                    className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), 'text-primary justify-start')}
                  >
                    お知らせの更新フィード
                  </a>
                </li>
              )}
            </ul>
          </section>
          <section aria-labelledby="footer-external-nav">
            <h2 id="footer-external-nav" className="text-muted-foreground mb-2 text-xs font-bold">
              関連リンク
            </h2>
            <ul className="-ml-4">
              {Object.entries(paths.external).map(([key, obj]) => (
                <li key={key}>
                  <a
                    href={obj.getHref()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), 'text-primary justify-start')}
                  >
                    {obj.name}
                    {externalLinkHint}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </nav>

      {/* コピーライト */}
      <div className="text-muted-foreground mx-auto mt-2 max-w-screen-xl px-4 py-6">
        <div>
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- The static footer uses native navigation to avoid client hydration. */}
          <a href="/" className="inline-flex min-h-6 items-center text-xs font-bold no-underline hover:underline">
            {app.longName}
          </a>
        </div>
        <div>
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- Keep all footer links on the same native navigation path. */}
          <a href="/" className="inline-flex min-h-6 items-center font-sans text-xl font-black no-underline">
            {app.shortName.replace(/[A-Za-z]/g, (c) => String.fromCharCode(c.charCodeAt(0) + 0xfee0))}
          </a>
        </div>
      </div>
    </footer>
  );
}
