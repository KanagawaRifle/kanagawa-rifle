import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { PageLayout } from '../PageLayout';

describe('PageLayout', () => {
  describe('Structure', () => {
    it('main 要素をレンダリングする', () => {
      render(<PageLayout>Content</PageLayout>);
      expect(screen.getByRole('main')).toBeInTheDocument();
    });

    it('children をレンダリングする', () => {
      render(<PageLayout>Test Content</PageLayout>);
      expect(screen.getByText('Test Content')).toBeInTheDocument();
    });
  });

  describe('Title', () => {
    it('title が指定された場合に h1 をレンダリングする', () => {
      render(<PageLayout title="Test Title">Content</PageLayout>);
      expect(screen.getByRole('heading', { level: 1, name: 'Test Title' })).toBeInTheDocument();
    });

    it('title が指定されない場合に h1 をレンダリングしない', () => {
      render(<PageLayout>Content</PageLayout>);
      expect(screen.queryByRole('heading', { level: 1 })).not.toBeInTheDocument();
    });
  });

  describe('Description', () => {
    it('description が指定された場合に説明文をレンダリングする', () => {
      render(<PageLayout description="Test Description">Content</PageLayout>);
      expect(screen.getByText('Test Description')).toBeInTheDocument();
    });

    it('description が指定されない場合に説明文をレンダリングしない', () => {
      render(<PageLayout>Content</PageLayout>);
      expect(screen.queryByText(/description/i)).not.toBeInTheDocument();
    });
  });

  describe('Breadcrumbs', () => {
    const breadcrumbs = [
      { name: 'ホーム', path: '/' },
      { name: 'テスト', path: '/test' },
    ];

    it('breadcrumbs が指定された場合にパンくずリストをレンダリングする', () => {
      render(<PageLayout breadcrumbs={breadcrumbs}>Content</PageLayout>);
      expect(screen.getByRole('navigation', { name: 'パンくずリスト' })).toBeInTheDocument();
      expect(screen.getAllByRole('navigation')).toHaveLength(1);
    });

    it('breadcrumbs のリンクをレンダリングする', () => {
      render(<PageLayout breadcrumbs={breadcrumbs}>Content</PageLayout>);
      expect(screen.getByRole('link', { name: 'ホーム' })).toBeInTheDocument();
      expect(screen.getByText('テスト')).toBeInTheDocument();
    });

    it('最後のパンくずに aria-current="page" を設定する', () => {
      render(<PageLayout breadcrumbs={breadcrumbs}>Content</PageLayout>);
      const lastBreadcrumb = screen.getByText('テスト');
      expect(lastBreadcrumb).toHaveAttribute('aria-current', 'page');
    });

    it('JSON-LD スクリプトをレンダリングする', () => {
      render(<PageLayout breadcrumbs={breadcrumbs}>Content</PageLayout>);
      const script = document.querySelector('script[type="application/ld+json"]');
      expect(script).toBeInTheDocument();
    });
  });

  describe('withStack', () => {
    it('withStack が true（デフォルト）の場合にコンテンツをレンダリングする', () => {
      render(
        <PageLayout>
          <p>Item 1</p>
          <p>Item 2</p>
        </PageLayout>,
      );
      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.getByText('Item 2')).toBeInTheDocument();
    });

    it('withStack が false の場合にコンテンツをレンダリングする', () => {
      render(
        <PageLayout withStack={false}>
          <p>Item 1</p>
          <p>Item 2</p>
        </PageLayout>,
      );
      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.getByText('Item 2')).toBeInTheDocument();
    });
  });
});
