// packages/website/src/components/Frame.tsx

import React from 'react';

import { Header, Footer } from '@/components';

export type FrameProps = {
  children: React.ReactNode;
};

export function Frame({ children }: FrameProps) {
  return (
    <>
      {/* スキップリンク（キーボードナビゲーション用） */}
      <a
        href="#main-content"
        className="focus:text-primary focus:ring-primary sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded focus:bg-white focus:px-4 focus:py-2 focus:shadow-lg focus:ring-2 focus:outline-none"
      >
        メインコンテンツへスキップ
      </a>
      <Header />
      <main id="main-content" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <Footer />
    </>
  );
}
