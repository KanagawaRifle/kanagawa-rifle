// packages/website/src/testing/vitest.setup.tsx
import '@testing-library/jest-dom';
import { cleanup, configure } from '@testing-library/react';
import { afterEach, vi, beforeAll } from 'vitest';

// ★ Testing Library のエラー出力をカスタマイズ
configure({
  getElementError: (message: string | null) => {
    // エラーメッセージからHTML部分を削除
    if (message) {
      // "Here are the accessible roles:" 以降をすべて削除
      const parts = message.split('Here are the accessible roles:');
      const simplifiedMessage = (parts[0] ?? message).trim();
      const error = new Error(simplifiedMessage);
      error.name = 'TestingLibraryElementError';
      return error;
    }
    return new Error('Element not found');
  },
});

// ★ console.error をオーバーライドしてHTML出力を抑制
const originalConsoleError = console.error;
beforeAll(() => {
  console.error = (...args: unknown[]) => {
    const message = args[0];

    // Testing Library のHTML出力を完全にフィルタリング
    if (typeof message === 'string') {
      // "Here are the accessible roles:" を含む場合はスキップ
      if (message.includes('Here are the accessible roles:')) {
        return;
      }
      // HTML タグを含む長いメッセージはスキップ
      if (message.includes('<body>') || message.includes('<div')) {
        return;
      }
      // "Ignored nodes:" を含む場合はスキップ
      if (message.includes('Ignored nodes:')) {
        return;
      }
    }

    // それ以外は通常通り出力
    originalConsoleError(...args);
  };
});

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
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img alt="" {...props} />;
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
