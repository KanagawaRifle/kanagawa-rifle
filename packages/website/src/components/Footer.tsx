// packages/website/src/components/Footer.tsx

import { ExternalLink } from 'lucide-react';
import Link from 'next/link';

import { SocialLinks } from '@/components/SocialLinks';
import { buttonVariants } from '@/components/ui/button';
import { paths, app } from '@/config';
import { cn } from '@/lib/utils';

export function Footer() {
  return (
    <footer className="bg-muted">
      {/* ソーシャルリンク */}
      <nav aria-label="ソーシャルメディア">
        <div className="mx-auto mt-2 max-w-screen-xl border-b border-border px-4 py-6">
          <div className="flex gap-1">
            <SocialLinks />
          </div>
        </div>
      </nav>

      {/* ナビゲーションリンク */}
      <nav aria-label="フッターナビゲーション">
        <div className="mx-auto mt-2 grid max-w-screen-xl grid-cols-1 gap-4 border-b border-border px-4 py-6 md:grid-cols-3">
          <section aria-labelledby="footer-main-nav">
            <h3 id="footer-main-nav" className="mb-2 text-xs font-bold text-muted-foreground">
              メインナビゲーション
            </h3>
            <ul className="-ml-4">
              {Object.entries(paths.main).map(([key, obj]) => (
                <li key={key}>
                  <Link
                    href={obj.getHref()}
                    className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), 'justify-start text-primary')}
                  >
                    {obj.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
          <section aria-labelledby="footer-sub-nav">
            <h3 id="footer-sub-nav" className="mb-2 text-xs font-bold text-muted-foreground">
              各種情報
            </h3>
            <ul className="-ml-4">
              {Object.entries(paths.sub).map(([key, obj]) => (
                <li key={key}>
                  <Link
                    href={obj.getHref()}
                    className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), 'justify-start text-primary')}
                  >
                    {obj.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
          <section aria-labelledby="footer-external-nav">
            <h3 id="footer-external-nav" className="mb-2 text-xs font-bold text-muted-foreground">
              関連リンク
            </h3>
            <ul className="-ml-4">
              {Object.entries(paths.external).map(([key, obj]) => (
                <li key={key}>
                  <a
                    href={obj.getHref()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), 'justify-start text-primary')}
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
      <div className="mx-auto mt-2 max-w-screen-xl px-4 py-6 text-muted-foreground">
        <div>
          <Link href="/" className="text-xs font-bold no-underline hover:underline">
            {app.longName}
          </Link>
        </div>
        <div>
          <Link href="/" className="text-xl font-black no-underline" style={{ fontFamily: 'Roboto' }}>
            {app.shortName.replace(/[A-Za-z]/g, (c) => String.fromCharCode(c.charCodeAt(0) + 0xfee0))}
          </Link>
        </div>
      </div>
    </footer>
  );
}
