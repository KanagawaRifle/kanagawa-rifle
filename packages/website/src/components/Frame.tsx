// packages/website/src/components/Frame.tsx

import React from 'react';

import { Header, Footer } from '@/components';

export type FrameProps = {
  children: React.ReactNode;
};

export function Frame({ children }: FrameProps) {
  return (
    <>
      <Header />
      <div>{children}</div>
      <Footer />
    </>
  );
}
