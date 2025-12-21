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
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-white focus:px-4 focus:py-2 focus:text-primary focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary"
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
