import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { NewsList } from '../NewsList';

describe('crawlable news pagination', () => {
  it('links the first, last and neighboring pages, and marks the current page', () => {
    render(
      <NewsList
        news={{
          data: [],
          pagination: { current: 15, size: 12, total: 344, totalPages: 29, hasNext: true, hasPrev: true },
        }}
      />,
    );
    const pagination = within(screen.getAllByRole('navigation', { name: 'ページネーション' })[0]!);
    expect(pagination.getAllByRole('link')).toHaveLength(7);
    expect(pagination.getByRole('link', { name: '1ページ目' })).toHaveAttribute('href', '/news');
    expect(pagination.getByRole('link', { name: '29ページ目' })).toHaveAttribute('href', '/news?page=29');
    expect(pagination.getByRole('link', { name: '14ページ目' })).toHaveAttribute('href', '/news?page=14');
    expect(pagination.getByRole('link', { name: '15ページ目' })).toHaveAttribute('aria-current', 'page');
    expect(pagination.getByRole('link', { name: '次のページ' })).toHaveAttribute('href', '/news?page=16');
  });

  it('preserves alternate page sizes and exposes all pages of small lists', () => {
    render(
      <NewsList
        news={{
          data: [],
          pagination: { current: 1, size: 6, total: 18, totalPages: 3, hasNext: true, hasPrev: false },
        }}
      />,
    );
    const pagination = within(screen.getAllByRole('navigation', { name: 'ページネーション' })[0]!);
    expect(pagination.getByRole('link', { name: '1ページ目' })).toHaveAttribute('href', '/news?size=6');
    expect(pagination.getByRole('link', { name: '2ページ目' })).toHaveAttribute('href', '/news?page=2&size=6');
    expect(pagination.getByRole('link', { name: '3ページ目' })).toHaveAttribute('href', '/news?page=3&size=6');
    expect(pagination.getByRole('button', { name: '前のページ' })).toBeDisabled();
  });

  it('handles an empty inventory as a single page without invalid page zero links', () => {
    render(
      <NewsList
        news={{
          data: [],
          pagination: { current: 1, size: 12, total: 0, totalPages: 0, hasNext: false, hasPrev: false },
        }}
      />,
    );
    const pagination = within(screen.getAllByRole('navigation', { name: 'ページネーション' })[0]!);
    expect(pagination.getAllByRole('link')).toHaveLength(1);
    expect(pagination.getByRole('link', { name: '1ページ目' })).toHaveAttribute('href', '/news');
    expect(pagination.getByRole('button', { name: '次のページ' })).toBeDisabled();
  });
});
