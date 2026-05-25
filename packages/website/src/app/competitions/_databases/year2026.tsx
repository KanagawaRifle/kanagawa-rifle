import { paths } from '@/config';

import { Event } from '../_types/';

export const year2026: Event[] = [
  {
    name: '第2回冬季神奈川オープン（県記録会）',
    grade: 'G3',
    actions: [{ name: '申込', href: 'https://forms.gle/bUYNL49X9wRotKC4A' }],
    date: new Date('2027/3/28'),
    deadline: new Date('2027/3/10'),
    venue: { name: '神奈川県立伊勢原射撃場', href: 'https://www.isehara-shooting.jp' },
  },
  {
    name: '第7回秋季神奈川オープン（県選手権大会）',
    grade: 'G3',
    actions: [{ name: '申込', href: 'https://forms.gle/dUpxXztiLDH7uR4X6' }],
    date: new Date('2026/11/29'),
    deadline: new Date('2026/11/11'),
    venue: { name: '神奈川県立伊勢原射撃場', href: 'https://www.isehara-shooting.jp' },
  },
  {
    name: '第56回東日本ライフル射撃競技選手権大会',
    grade: 'G2',
    actions: [
      { name: '申込', href: 'https://forms.gle/peGYBRiyjR6xqYEi8' },
      {
        name: '要項',
        href: paths.cdn.getHref('/competitions/2026/2026-06-18-eastern-japan-details.pdf'),
      },
      {
        name: '射座',
        href: paths.cdn.getHref('/competitions/2026/2026-06-18-eastern-japan-start-lists.pdf'),
      },
      {
        name: '成績',
        href: paths.cdn.getHref('/competitions/2026/2026-06-18-eastern-japan-results.pdf'),
        disabled: true,
      },
    ],
    date: { from: new Date('2026/6/18'), to: new Date('2026/6/21') },
    pet: new Date('2026/6/18'),
    venue: { name: '神奈川県立伊勢原射撃場', href: 'https://www.isehara-shooting.jp' },
  },
  {
    name: '第2回春季神奈川オープン（国スポ最終予選会・全関東選手権予選会）',
    grade: 'G3',
    actions: [
      { name: '申込', href: 'https://forms.gle/wD1AJVLZvuteDWN29' },
      {
        name: '要項',
        href: paths.cdn.getHref('/competitions/2026/2026-04-26-spring-kanagawa-open-championship-details.pdf'),
      },
      {
        name: '射座',
        href: paths.cdn.getHref('/competitions/2026/2026-04-26-spring-kanagawa-open-championship-start-lists.pdf'),
      },
      {
        name: '成績',
        href: paths.cdn.getHref('/competitions/2026/2026-04-26-spring-kanagawa-open-championship-results.pdf'),
      },
    ],
    date: new Date('2026/4/26'),
    deadline: new Date('2026/4/8'),
    venue: { name: '神奈川県立伊勢原射撃場', href: 'https://www.isehara-shooting.jp' },
  },
];
