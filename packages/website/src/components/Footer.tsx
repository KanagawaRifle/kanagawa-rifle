// packages/website/src/components/Footer.tsx

import { ExternalLink } from 'lucide-react';
import Link from 'next/link';

import { SocialLinks } from '@/components/SocialLinks';
import { buttonVariants } from '@/components/ui/button';
import { app } from '@/config/app';
import { paths } from '@/config/paths';
import { cn } from '@/lib/utils';

export function Footer() {
  return (
    <footer className="bg-muted">
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
                  <Link
                    href={obj.getHref()}
                    className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), 'text-primary justify-start')}
                  >
                    {obj.name}
                  </Link>
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
                  <Link
                    href={obj.getHref()}
                    className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), 'text-primary justify-start')}
                  >
                    {obj.name}
                  </Link>
                </li>
              ))}
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
                    <ExternalLink className="h-3 w-3" aria-hidden="true" />
                    <span className="sr-only">（新しいタブで開く）</span>
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
          <Link href="/" className="inline-flex min-h-6 items-center text-xs font-bold no-underline hover:underline">
            {app.longName}
          </Link>
        </div>
        <div>
          <Link
            href="/"
            className="inline-flex min-h-6 items-center text-xl font-black no-underline"
            style={{ fontFamily: 'Roboto' }}
          >
            {app.shortName.replace(/[A-Za-z]/g, (c) => String.fromCharCode(c.charCodeAt(0) + 0xfee0))}
          </Link>
        </div>
      </div>
    </footer>
  );
}
