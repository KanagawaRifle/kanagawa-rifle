'use client';

import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { HeaderLogo } from '@/components/HeaderLogo';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { paths } from '@/config/paths';

// ドロワーコンテンツコンポーネント
function DrawerContent({ onClose }: { onClose: () => void }) {
  return (
    <div className="w-full" role="presentation" onClick={onClose}>
      <nav aria-label="メインナビゲーション">
        <ul className="py-2">
          {Object.entries(paths.main).map(([key, obj]) => (
            <li key={key}>
              <Link href={obj.getHref()} className="hover:bg-muted block px-4 py-2">
                {obj.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <nav aria-label="サブナビゲーション" className="border-border border-t">
        <ul className="py-2">
          {Object.entries(paths.sub).map(([key, obj]) => (
            <li key={key}>
              <Link href={obj.getHref()} className="text-muted-foreground hover:bg-muted block px-4 py-2">
                {obj.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default function MobileMenu() {
  const [sheetOpen, setSheetOpen] = useState(true);
  return (
    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="メニューを開く">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent aria-describedby={undefined} side="left" className="w-64 p-0">
        <SheetHeader className="border-border flex flex-row items-center gap-2 border-b px-4 py-3">
          <Button variant="ghost" size="icon" onClick={() => setSheetOpen(false)} aria-label="メニューを閉じる">
            <X className="h-5 w-5" />
          </Button>
          <SheetTitle className="sr-only">ナビゲーションメニュー</SheetTitle>
          <HeaderLogo />
        </SheetHeader>
        <DrawerContent onClose={() => setSheetOpen(false)} />
      </SheetContent>
    </Sheet>
  );
}
