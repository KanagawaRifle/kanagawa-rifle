'use client';

import { EllipsisVertical, Menu } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useState } from 'react';

import { buttonVariants } from '@/components/ui/button-styles';

// Keep the trigger's dimensions and accessible name while downloading the menu.
const MobileMenu = dynamic(() => import('./MobileMenu'), {
  loading: () => (
    <button
      type="button"
      className={buttonVariants({ variant: 'ghost', size: 'icon' })}
      aria-label="メニューを開く"
      aria-busy="true"
      disabled
    >
      <Menu className="h-5 w-5" />
    </button>
  ),
});
const MoreMenu = dynamic(() => import('./MoreMenu'), {
  loading: () => (
    <button
      type="button"
      className={buttonVariants({ variant: 'ghost', size: 'icon' })}
      aria-label="その他のメニューを開く"
      aria-busy="true"
      disabled
    >
      <EllipsisVertical className="h-5 w-5" />
    </button>
  ),
});

export function MobileMenuButton() {
  const [loadMobileMenu, setLoadMobileMenu] = useState(false);
  return loadMobileMenu ? (
    <MobileMenu />
  ) : (
    <button
      type="button"
      className={buttonVariants({ variant: 'ghost', size: 'icon' })}
      aria-label="メニューを開く"
      aria-haspopup="dialog"
      onClick={() => setLoadMobileMenu(true)}
    >
      <Menu className="h-5 w-5" />
    </button>
  );
}

export function MoreMenuButton() {
  const [loadMoreMenu, setLoadMoreMenu] = useState(false);
  return loadMoreMenu ? (
    <MoreMenu />
  ) : (
    <button
      type="button"
      className={buttonVariants({ variant: 'ghost', size: 'icon' })}
      aria-label="その他のメニューを開く"
      title="各種書式・リンク集"
      aria-haspopup="menu"
      onClick={() => setLoadMoreMenu(true)}
    >
      <EllipsisVertical className="h-5 w-5" />
    </button>
  );
}
