import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { usePathname } from 'next/navigation';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { Header } from '../Header';

// Next.js のナビゲーションをモック
vi.mock('next/navigation', () => ({
  usePathname: vi.fn(() => '/'),
}));

// ThemeToggle をモック
vi.mock('@/components/ThemeToggle', () => ({
  ThemeToggle: () => <button data-testid="theme-toggle">Theme</button>,
}));

describe('Header', () => {
  beforeEach(() => vi.mocked(usePathname).mockReturnValue('/'));

  it.each([
    ['/news/2026-01-01-01', 'お知らせ'],
    ['/competitions/2026', '大会'],
    ['/newsletter', undefined],
  ])('matches complete navigation path segments for %s', (pathname, name) => {
    expect.assertions(1);
    vi.mocked(usePathname).mockReturnValue(pathname);
    render(<Header />);
    const current = screen.queryByRole('link', { current: 'page' });
    if (name) expect(current).toHaveAccessibleName(name);
    else expect(current).toBeNull();
  });
  describe('Structure', () => {
    it('header 要素をレンダリングする', () => {
      render(<Header />);
      expect(screen.getByRole('banner')).toBeInTheDocument();
    });

    it('ロゴをレンダリングする', () => {
      render(<Header />);
      expect(screen.getByRole('link', { name: /トップページへ/i })).toBeInTheDocument();
    });

    it('ロゴが KRA を表示する', () => {
      render(<Header />);
      const logo = screen.getByRole('link', { name: /トップページへ/i });
      expect(logo).toHaveTextContent('K');
      expect(logo).toHaveTextContent('R');
      expect(logo).toHaveTextContent('A');
    });

    it('ロゴがトップページにリンクする', () => {
      render(<Header />);
      const logo = screen.getByRole('link', { name: /トップページへ/i });
      expect(logo).toHaveAttribute('href', '/');
    });
  });

  describe('Desktop Navigation', () => {
    it('デスクトップナビゲーションをレンダリングする', () => {
      render(<Header />);
      expect(screen.getByRole('navigation', { name: 'メインナビゲーション' })).toBeInTheDocument();
    });

    it('メインナビゲーションリンクを表示する', () => {
      render(<Header />);
      expect(screen.getByRole('link', { name: /協会について/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /大会/i })).toBeInTheDocument();
    });

    it('ナビゲーションリンクが正しいクラスを持つ', () => {
      render(<Header />);
      const navLink = screen.getByRole('link', { name: /協会について/i });
      expect(navLink).toHaveClass('text-sm', 'font-bold', 'uppercase');
    });
  });

  describe('Mobile Menu Button', () => {
    it('モバイルメニューボタンをレンダリングする', () => {
      render(<Header />);
      expect(screen.getByRole('button', { name: 'メニューを開く' })).toBeInTheDocument();
    });

    it('メニューボタンをクリックするとシートが開く', async () => {
      const user = userEvent.setup();
      render(<Header />);

      const menuButton = screen.getByRole('button', { name: 'メニューを開く' });
      await user.click(menuButton);

      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });
  });

  describe('More Menu', () => {
    it('その他メニューボタンをレンダリングする', () => {
      render(<Header />);
      expect(screen.getByRole('button', { name: 'その他のメニューを開く' })).toBeInTheDocument();
    });
  });

  describe('Theme Toggle', () => {
    it('テーマ切り替えボタンをレンダリングする', () => {
      render(<Header />);
      expect(screen.getByTestId('theme-toggle')).toBeInTheDocument();
    });
  });

  describe('Styling', () => {
    it('sticky ヘッダーのスタイルを適用する', () => {
      render(<Header />);
      const header = screen.getByRole('banner');
      expect(header).toHaveClass('sticky', 'top-0', 'z-50');
    });
  });
});
