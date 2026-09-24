import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { MembershipFees } from '../components/MembershipFees';

describe('published membership fees', () => {
  it('preserves all published amounts and their row and column associations', () => {
    render(<MembershipFees />);
    const expected = [
      { name: '一般の方の会費', amounts: ['30,000円', '20,000円', '25,500円', '15,000円', '10,000円', '―'] },
      {
        name: '学生（大学・専門学校）の方の会費',
        amounts: ['8,000円', '6,000円', '7,500円', '4,000円', '3,000円', '―'],
      },
      { name: '生徒（高校生以下）の方の会費', amounts: ['5,500円', '4,000円', '5,500円', '4,000円', '3,000円', '―'] },
      { name: '新大学生（4月1日～）', amounts: ['6,500円', '3,000円', '7,500円'] },
      { name: '新社会人（4月1日～）', amounts: ['20,500円', '20,500円', '25,500円'] },
      {
        name: '入会金・年会費一覧',
        amounts: [
          '5,000円',
          '1,000円',
          '500円',
          '5,000円',
          '1,000円',
          '1,000円',
          '10,000円',
          '3,000円',
          '1,000円',
          '10,000円',
          '3,000円',
          '3,000円',
          '500円',
          '500円',
          '500円',
        ],
      },
    ];
    for (const { name, amounts } of expected) {
      const table = screen.getByRole('table', { name });
      expect(Array.from(table.querySelectorAll('tbody td'), (cell) => cell.textContent)).toEqual(amounts);
      expect(
        within(table)
          .getAllByRole('rowheader')
          .every((header) => header.getAttribute('scope') === 'row'),
      ).toBe(true);
    }
    const headers = within(screen.getByRole('table', { name: '一般の方の会費' })).getAllByRole('columnheader');
    expect(headers.map((header) => header.querySelector('span')?.textContent)).toEqual(['新規', '更新', '移籍']);
    expect(screen.getByText('ご入会時に学生証等所属を証明できる書類をお送りください。')).toBeInTheDocument();
  });
});
