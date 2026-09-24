import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { RecommendationBulletins } from '../components/RecommendationBulletins';
import { RecommendationFees } from '../components/RecommendationFees';

describe('published recommendation information', () => {
  it('preserves the amounts, free applications and effective-date notice', () => {
    render(<RecommendationFees />);
    const rows = screen.getAllByRole('listitem');
    const fees = [
      ['ライフル銃 (小口径)', '6,000円'],
      ['ライフル銃 (大口径)', '10,000円'],
      ['けん銃', '10,000円'],
      ['空気けん銃', '6,000円'],
      ['低年者空気銃', '無料'],
      ['低年者空気けん銃', '4,000円'],
      ['低年者ライフル銃 (小口径)', '6,000円'],
      ['技能講習免除', '6,000円'],
      ['再発行', '2,000円'],
    ];
    expect(rows).toHaveLength(fees.length);
    rows.forEach((row, index) => {
      expect(row).toHaveTextContent(fees[index]![0]!);
      expect(within(row).getByText(fees[index]![1]!)).toBeInTheDocument();
    });
    expect(screen.getByText('※2025年10月度推薦より')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '当協会の指定口座' })).toHaveAttribute('href', '/about');
  });

  it('preserves published bulletin order and download targets', () => {
    render(<RecommendationBulletins />);
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(5);
    [57, 56, 55, 51, 49].forEach((number, index) => {
      expect(links[index]).toHaveTextContent(`推薦ブレッテン no.${number}`);
      expect(links[index]?.getAttribute('href')).toMatch(
        new RegExp(`/recommendation/Recommendation_Bulletin_no_${number}\\.pdf$`),
      );
      expect(links[index]).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });
});
