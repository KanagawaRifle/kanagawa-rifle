// packages/website/src/components/Frame.tsx

import React from 'react';

import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';

export type FrameProps = {
  children: React.ReactNode;
};

export function Frame({ children }: FrameProps) {
  return (
    <>
      {/* スキップリンク（キーボードナビゲーション用） */}
      <a
        href="#main-content"
        className="focus:text-primary focus:ring-primary focus:bg-background sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:rounded focus:px-4 focus:py-2 focus:shadow-lg focus:ring-2 focus:outline-none"
      >
        メインコンテンツへスキップ
      </a>
      <Header />
      {children}
      <Footer />
    </>
  );
}
