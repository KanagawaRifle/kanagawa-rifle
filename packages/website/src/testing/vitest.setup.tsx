// packages/website/src/testing/vitest.setup.tsx
import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import type { ImageProps } from 'next/image';
import { afterEach, vi } from 'vitest';

vi.mock('server-only', () => ({}));

// 各テスト後にクリーンアップ
afterEach(() => {
  cleanup();
});

// Next.js の router をモック
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
    pathname: '/',
    query: {},
    asPath: '/',
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}));

// Next.js の Image をモック
vi.mock('next/image', () => ({
  default: ({ fill: _fill, priority: _priority, alt, ...props }: ImageProps) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img alt={alt} {...props} src={typeof props.src === 'string' ? props.src : undefined} />;
  },
}));

// window.matchMedia をモック
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// IntersectionObserver をモック
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
  unobserve() {}
} as unknown as {
  new (callback: IntersectionObserverCallback, options?: IntersectionObserverInit): IntersectionObserver;
  prototype: IntersectionObserver;
};
