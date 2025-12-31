// packages/website/src/components/Header.tsx

'use client';

import { EllipsisVertical, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { ThemeToggle } from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { paths } from '@/config';
import { cn } from '@/lib/utils';

// ロゴコンポーネント
function Logo() {
  return (
    <Link
      href="/"
      className="text-center text-xl font-black tracking-wider no-underline"
      style={{ fontFamily: 'Roboto' }}
      aria-label="神奈川県ライフル射撃協会 トップページへ"
    >
      <span className="text-primary">K</span>
      <span className="text-secondary">R</span>
      <span className="text-accent">A</span>
    </Link>
  );
}

// ドロワーコンテンツコンポーネント
function DrawerContent({ onClose }: { onClose: () => void }) {
  return (
    <div className="w-full" role="presentation" onClick={onClose}>
      <nav aria-label="メインナビゲーション">
        <ul className="py-2">
          {Object.entries(paths.main).map(([key, obj]) => (
            <li key={key}>
              <Link href={obj.getHref()} className="block px-4 py-2 hover:bg-muted">
                {obj.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <nav aria-label="サブナビゲーション" className="border-t border-border">
        <ul className="py-2">
          {Object.entries(paths.sub).map(([key, obj]) => (
            <li key={key}>
              <Link href={obj.getHref()} className="block px-4 py-2 text-muted-foreground hover:bg-muted">
                {obj.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

function NavigationTabs() {
  const pathname = usePathname() ?? '/';
  const matchedPath = Object.values(paths.main).find((obj) => pathname.startsWith(obj.getHref()))?.getHref();

  return (
    <nav className="hidden flex-grow md:flex" aria-label="メインナビゲーション">
      <ul className="flex w-full">
        {Object.entries(paths.main).map(([key, obj]) => {
          const isActive = obj.getHref() === matchedPath;
          return (
            <li key={key} className="flex-1">
              <Link
                href={obj.getHref()}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'block whitespace-nowrap px-4 py-3 text-center text-sm font-bold uppercase transition-colors',
                  isActive ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground hover:text-primary'
                )}
              >
                {obj.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

// その他メニューコンポーネント
function MoreMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="その他のメニューを開く" title="各種書式・リンク集">
          <EllipsisVertical className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {Object.entries(paths.sub).map(([key, obj]) => (
          <DropdownMenuItem key={key} asChild>
            <Link href={obj.getHref()}>{obj.name}</Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// メインコンポーネント
export function Header() {
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background">
      <div className="mx-auto flex h-12 w-full max-w-screen-md items-center px-2">
        {/* モバイルメニューボタン */}
        <div className="flex md:hidden">
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="メニューを開く">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <SheetHeader className="flex flex-row items-center gap-2 border-b border-border px-4 py-3">
                <Button variant="ghost" size="icon" onClick={() => setSheetOpen(false)} aria-label="メニューを閉じる">
                  <X className="h-5 w-5" />
                </Button>
                <SheetTitle className="sr-only">ナビゲーションメニュー</SheetTitle>
                <Logo />
              </SheetHeader>
              <DrawerContent onClose={() => setSheetOpen(false)} />
            </SheetContent>
          </Sheet>
        </div>

        {/* ロゴ */}
        <div className="mr-4 flex-grow md:flex-grow-0">
          <Logo />
        </div>

        {/* デスクトップナビゲーション */}
        <NavigationTabs />

        {/* テーマ切り替え */}
        <ThemeToggle />

        {/* その他メニュー */}
        <MoreMenu />
      </div>
    </header>
  );
}
