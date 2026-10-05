import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import BigBore from './big-bore/results/page';
import Citizens from './citizens/results/page';
import Final from './gp-final/results/page';
import Hunting from './hunting/results/page';
import MonthlyYear, { generateStaticParams as monthlyParams } from './monthly/results/[year]/page';
import Monthly from './monthly/results/page';
import RifleYear, { generateStaticParams as rifleParams } from './rifle-shooting-class/results/[year]/page';
import Rifle from './rifle-shooting-class/results/page';

vi.mock('next/image', () => ({ default: ({ alt }: { alt: string }) => <span role="img" aria-label={alt} /> }));
vi.mock('next/navigation', () => ({
  notFound: () => {
    throw new Error('not found');
  },
}));

describe('published competition results', () => {
  it.each([
    { Page: BigBore, title: '長瀞大会結果発表' },
    { Page: Citizens, title: '横須賀市民大会' },
    { Page: Final, title: '横須賀市民大会' },
    { Page: Hunting, title: '狩猟銃射撃大会結果' },
  ])('renders $title with populated result tables and navigation', ({ Page, title }) => {
    render(<Page />);
    expect(screen.getByRole('heading', { level: 1, name: title })).toBeVisible();
    expect(screen.getAllByRole('row').length).toBeGreaterThan(2);
    expect(screen.getAllByRole('columnheader', { name: '順位' }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole('link').length).toBeGreaterThan(0);
  });

  it.each([
    { label: 'monthly', Page: Monthly, Year: MonthlyYear, params: monthlyParams },
    { label: 'rifle class', Page: Rifle, Year: RifleYear, params: rifleParams },
  ])('links the $label year index to populated result pages', async ({ Page, Year, params }) => {
    const available = await params();
    expect(available.length).toBeGreaterThan(0);
    const first = available[0]!;
    const { unmount } = render(await Page());
    expect(
      screen.getAllByRole('link').some((link) => link.getAttribute('href')?.endsWith(`/results/${first.year}`)),
    ).toBe(true);
    unmount();
    render(await Year({ params: Promise.resolve(first) }));
    expect(screen.getAllByRole('row').length).toBeGreaterThan(2);
    expect(screen.getAllByRole('columnheader', { name: '氏名' }).length).toBeGreaterThan(0);
    await expect(Year({ params: Promise.resolve({ year: 'invalid' }) })).rejects.toThrow('not found');
    await expect(Year({ params: Promise.resolve({ year: '1900' }) })).rejects.toThrow('not found');
  });
});
