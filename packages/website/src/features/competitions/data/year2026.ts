import 'server-only';

import { getStaticFileUrl } from '@/config/assets';

import { competitionSchema } from '../schema';

export const year2026 = competitionSchema.array().parse([
  {
    name: '第2回冬季神奈川オープン（県記録会）',
    grade: 'G3',
    actions: [{ name: '申込', href: 'https://forms.gle/bUYNL49X9wRotKC4A' }],
    date: { kind: 'date', date: '2027-03-28' },
    deadline: '2027-03-10',
    venue: { name: '神奈川県立伊勢原射撃場', href: 'https://www.isehara-shooting.jp' },
  },
  {
    name: '第26回冬季AR・APランクリスト競技会',
    homeNotice: { published: true, title: '第26回冬季AR・APランクリスト競技会' },
    grade: 'G3',
    actions: [
      { name: '申込', href: 'https://forms.gle/E1pTSoqR4feEPApH8' },
      {
        name: '要項',
        href: getStaticFileUrl('/competitions/2026/2026-12-05-winter-10m-rank-list-details.pdf'),
      },
    ],
    date: {
      kind: 'description',
      lines: [
        '12月大会 2026年12月5日（土）～6日（日）',
        '1月大会 2027年1月9日（土）～10日（日）',
        '2月大会 2027年2月13日（土）～14日（日）',
      ],
    },
    venue: { name: 'くりはま花の国エアライフル射撃場', href: 'https://yokosukarifle.web.fc2.com/shooting-range/' },
  },
  {
    name: '第7回秋季神奈川オープン（県選手権大会）',
    homeNotice: { published: true, title: '第7回秋季神奈川オープン（県選手権大会）' },
    grade: 'G3',
    actions: [
      { name: '申込', href: 'https://forms.gle/n8tbVCZAfUqZUsxz6' },
      {
        name: '要項',
        href: getStaticFileUrl('/competitions/2026/2026-11-29-autumn-kanagawa-open-championship-details.pdf'),
      },
    ],
    date: { kind: 'date', date: '2026-11-29' },
    deadline: '2026-11-11',
    venue: { name: '神奈川県立伊勢原射撃場', href: 'https://www.isehara-shooting.jp' },
  },
  {
    name: '第56回東日本ライフル射撃競技選手権大会',
    grade: 'G2',
    actions: [
      { name: '申込', href: 'https://forms.gle/peGYBRiyjR6xqYEi8' },
      {
        name: '要項',
        href: getStaticFileUrl('/competitions/2026/2026-06-18-eastern-japan-details.pdf'),
      },
      {
        name: '射座',
        homeLabel: '射座割',
        href: getStaticFileUrl('/competitions/2026/2026-06-18-eastern-japan-start-lists.pdf'),
      },
      {
        name: '成績',
        homeLabel: '速報',
        href: getStaticFileUrl('/competitions/2026/2026-06-18-eastern-japan-results.pdf'),
      },
    ],
    date: { kind: 'range', from: '2026-06-18', to: '2026-06-21' },
    pet: { kind: 'date', date: '2026-06-18' },
    venue: { name: '神奈川県立伊勢原射撃場', href: 'https://www.isehara-shooting.jp' },
  },
  {
    name: '第2回春季神奈川オープン（国スポ最終予選会・全関東選手権予選会）',
    grade: 'G3',
    actions: [
      { name: '申込', href: 'https://forms.gle/wD1AJVLZvuteDWN29' },
      {
        name: '要項',
        href: getStaticFileUrl('/competitions/2026/2026-04-26-spring-kanagawa-open-championship-details.pdf'),
      },
      {
        name: '射座',
        href: getStaticFileUrl('/competitions/2026/2026-04-26-spring-kanagawa-open-championship-start-lists.pdf'),
      },
      {
        name: '成績',
        href: getStaticFileUrl('/competitions/2026/2026-04-26-spring-kanagawa-open-championship-results.pdf'),
      },
    ],
    date: { kind: 'date', date: '2026-04-26' },
    deadline: '2026-04-08',
    venue: { name: '神奈川県立伊勢原射撃場', href: 'https://www.isehara-shooting.jp' },
  },
]);
