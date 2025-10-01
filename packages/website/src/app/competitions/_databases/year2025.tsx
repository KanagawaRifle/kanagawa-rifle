import React from 'react';

import { paths } from '@/config';

import { Event } from '../_types/';

export const year2025: Event[] = [
  {
    name: '第6回秋季神奈川オープン 兼 県選手権大会',
    grade: 'G3',
    actions: [
      { name: '申込', href: 'https://forms.gle/G8t7vH7DsRERi5Vx6' },
      {
        name: '要項',
        href: paths.cdn.getHref('/competitions/2025/2025-12-14-autumn-kanagawa-open-championship-details.pdf'),
      },
      {
        name: '射座',
        href: paths.cdn.getHref('/competitions/2025/2025-12-14-autumn-kanagawa-open-championship-start-lists.pdf'),
        disabled: true,
      },
      {
        name: '成績',
        href: paths.cdn.getHref('/competitions/2025/2025-12-14-autumn-kanagawa-open-championship-results'),
        disabled: true,
      },
    ],
    date: (
      <>
        12月14日（日）← <del>11月2日（日）</del>
      </>
    ),
    deadline: new Date('2025/11/26'),
    venue: { name: '神奈川県立伊勢原射撃場', href: 'https://www.isehara-shooting.jp' },
  },
  {
    name: '第62回全関東ライフル射撃競技選手権大会',
    grade: 'G3',
    actions: [{ name: '大会ページ', href: 'https://sites.google.com/meiwakenoh.ed.jp/kanto-block-rifletournament/' }],
    date: { from: new Date('2025/8/15'), to: new Date('2025/8/17') },
    venue: { name: '埼玉県長瀞射撃場', href: 'https://www.nagatoro-shooting.jp/' },
  },
  {
    name: '第55回東日本ライフル射撃競技選手権大会',
    grade: 'G2',
    actions: [
      { name: '申込', href: 'https://forms.gle/G8t7vH7DsRERi5Vx6' },
      { name: '要項', href: paths.cdn.getHref('/competitions/2025/2025-06-19-eastern-japan-details.pdf') },
      { name: '射座', href: paths.cdn.getHref('/competitions/2025/2025-06-19-eastern-japan-start-lists.pdf') },
      { name: '成績', href: paths.cdn.getHref('/competitions/2025/2025-06-19-eastern-japan-results.pdf') },
    ],
    date: { from: new Date('2025/6/19'), to: new Date('2025/6/22') },
    pet: new Date('2025/6/19'),
    deadline: new Date('2025/5/14'),
    venue: { name: '神奈川県立伊勢原射撃場', href: 'https://www.isehara-shooting.jp' },
  },
  {
    name: '第1回春季神奈川オープン 兼 国スポ最終予選会 兼 全関東選手権予選会',
    grade: 'G3',
    actions: [
      { name: '申込', href: 'https://forms.gle/7LsDy9e64x5XbV8C9' },
      {
        name: '要項',
        href: paths.cdn.getHref(
          'https://static.kanagawa-rifle.org/website/competitions/2025/2025-05-25-spring-kanagawa-open-championship-details.pdf',
        ),
      },
      {
        name: '射座',
        href: paths.cdn.getHref(
          'https://static.kanagawa-rifle.org/website/competitions/2025/2025-05-25-spring-kanagawa-open-championship-start-lists.pdf',
        ),
      },
      {
        name: '成績',
        href: paths.cdn.getHref(
          'https://static.kanagawa-rifle.org/website/competitions/2025/2025-05-25-spring-kanagawa-open-championship-results.pdf',
        ),
      },
    ],
    date: new Date('2025/5/25'),
    deadline: new Date('2025/5/7'),
    venue: { name: '神奈川県立伊勢原射撃場', href: 'https://www.isehara-shooting.jp' },
  },
  {
    name: '国スポ一次予選会 兼 東日本選手権予選会',
    grade: 'G4',
    actions: [
      {
        name: '射座',
        href: paths.cdn.getHref(
          'https://static.kanagawa-rifle.org/website/competitions/2025/2025-04-27-kokuspo-trials-1st-start-lists.pdf',
        ),
      },
      {
        name: '成績',
        href: paths.cdn.getHref(
          'https://static.kanagawa-rifle.org/website/competitions/2025/2025-04-27-kokuspo-trials-1st-results.pdf',
        ),
      },
    ],
    date: new Date('2025/4/27'),
    deadline: new Date('2025/4/19'),
    venue: { name: '神奈川県立伊勢原射撃場', href: 'https://www.isehara-shooting.jp' },
  },
];
