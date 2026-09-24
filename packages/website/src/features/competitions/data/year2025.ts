import 'server-only';

import { getStaticFileUrl } from '@/config/assets';

import { competitionSchema } from '../schema';

export const year2025 = competitionSchema.array().parse([
  {
    name: '第1回冬季神奈川オープン（国スポ一次予選会・東日本選手権予選会）',
    grade: 'G3',
    actions: [
      { name: '申込', href: 'https://forms.gle/fPPscqHUS5ptUVzh8' },
      {
        name: '要項',
        href: getStaticFileUrl('/competitions/2025/2026-03-29-winter-kanagawa-open-championship-details.pdf'),
      },
      {
        name: '射座',
        href: getStaticFileUrl('/competitions/2025/2026-03-29-winter-kanagawa-open-championship-start-lists.pdf'),
      },
      {
        name: '成績',
        href: getStaticFileUrl('/competitions/2025/2026-03-29-winter-kanagawa-open-championship-results.pdf'),
      },
    ],
    date: { kind: 'date', date: '2026-03-29' },
    deadline: '2026-03-11',
    venue: { name: '神奈川県立伊勢原射撃場', href: 'https://www.isehara-shooting.jp' },
  },
  {
    name: '神奈川県ジュニアライフル射撃競技選手権大会',
    grade: 'G4',
    actions: [
      {
        name: '要項',
        href: getStaticFileUrl('/competitions/2025/2026-02-21-kanagawa-junior-championship-details.pdf'),
      },
      {
        name: '射座',
        href: getStaticFileUrl('/competitions/2025/2026-02-21-kanagawa-junior-championship-start-lists.pdf'),
      },
      {
        name: '成績',
        href: getStaticFileUrl('/competitions/2025/2026-02-21-kanagawa-junior-championship-results.pdf'),
      },
    ],
    date: { kind: 'range', from: '2026-02-21', to: '2026-02-22' },
    deadline: '2026-02-04',
    venue: { name: '神奈川県立伊勢原射撃場', href: 'https://www.isehara-shooting.jp' },
  },
  {
    name: '第6回秋季神奈川オープン 兼 県選手権大会',
    grade: 'G3',
    actions: [
      { name: '申込', href: 'https://forms.gle/G8t7vH7DsRERi5Vx6' },
      {
        name: '要項',
        href: getStaticFileUrl('/competitions/2025/2025-12-14-autumn-kanagawa-open-championship-details.pdf'),
      },
      {
        name: '射座',
        href: getStaticFileUrl('/competitions/2025/2025-12-14-autumn-kanagawa-open-championship-start-lists.pdf'),
      },
      {
        name: '成績',
        href: getStaticFileUrl('/competitions/2025/2025-12-14-autumn-kanagawa-open-championship-results.pdf'),
      },
    ],
    date: { kind: 'rescheduled', date: '2025-12-14', previousDate: '2025-11-02' },
    deadline: '2025-11-26',
    venue: { name: '神奈川県立伊勢原射撃場', href: 'https://www.isehara-shooting.jp' },
  },

  {
    name: '第25回冬季ＡＲ･ＡＰランクリスト競技会',
    grade: 'G3',
    actions: [
      { name: '申込', href: 'https://forms.gle/E1pTSoqR4feEPApH8' },
      {
        name: '要項',
        href: getStaticFileUrl('/competitions/2025/2025-12-06-winter-10m-rank-list-details.pdf'),
      },
      {
        name: '射座',
        href: getStaticFileUrl('/competitions/2025/2025-12-06-winter-10m-rank-list-start-lists.pdf'),
      },
      {
        name: '成績',
        href: getStaticFileUrl('/competitions/2025/2025-12-06-winter-10m-rank-list-results.pdf'),
      },
    ],
    date: {
      kind: 'description',
      lines: [
        '12月大会 12月6日（土）― 7日（日）',
        '1月大会 1月10日（土）― 11日（日）',
        '2月大会 2月15日（土）― 15日（日）',
      ],
    },
    venue: { name: 'くりはま花の国射撃場', href: 'https://yokosukarifle.web.fc2.com/shooting-range/' },
  },

  {
    name: '新人大会兼関東選抜大会県予選',
    grade: 'G4',
    actions: [{ name: '成績', href: getStaticFileUrl('/competitions/2025/2025-10-18-rookie-competition-results.pdf') }],
    date: { kind: 'range', from: '2025-10-18', to: '2025-10-19' },
    venue: { name: '神奈川県立伊勢原射撃場', href: 'https://www.isehara-shooting.jp' },
  },

  {
    name: '第62回全関東ライフル射撃競技選手権大会',
    grade: 'G3',
    actions: [{ name: '大会ページ', href: 'https://sites.google.com/meiwakenoh.ed.jp/kanto-block-rifletournament/' }],
    date: { kind: 'range', from: '2025-08-15', to: '2025-08-17' },
    venue: { name: '埼玉県長瀞射撃場', href: 'https://www.nagatoro-shooting.jp/' },
  },
  {
    name: '第55回東日本ライフル射撃競技選手権大会',
    grade: 'G2',
    actions: [
      { name: '申込', href: 'https://forms.gle/G8t7vH7DsRERi5Vx6' },
      { name: '要項', href: getStaticFileUrl('/competitions/2025/2025-06-19-eastern-japan-details.pdf') },
      { name: '射座', href: getStaticFileUrl('/competitions/2025/2025-06-19-eastern-japan-start-lists.pdf') },
      { name: '成績', href: getStaticFileUrl('/competitions/2025/2025-06-19-eastern-japan-results.pdf') },
    ],
    date: { kind: 'range', from: '2025-06-19', to: '2025-06-22' },
    pet: { kind: 'date', date: '2025-06-19' },
    deadline: '2025-05-14',
    venue: { name: '神奈川県立伊勢原射撃場', href: 'https://www.isehara-shooting.jp' },
  },
  {
    name: '第1回春季神奈川オープン 兼 国スポ最終予選会 兼 全関東選手権予選会',
    grade: 'G3',
    actions: [
      { name: '申込', href: 'https://forms.gle/7LsDy9e64x5XbV8C9' },
      {
        name: '要項',
        href: getStaticFileUrl(
          'https://static.kanagawa-rifle.org/website/competitions/2025/2025-05-25-spring-kanagawa-open-championship-details.pdf',
        ),
      },
      {
        name: '射座',
        href: getStaticFileUrl(
          'https://static.kanagawa-rifle.org/website/competitions/2025/2025-05-25-spring-kanagawa-open-championship-start-lists.pdf',
        ),
      },
      {
        name: '成績',
        href: getStaticFileUrl(
          'https://static.kanagawa-rifle.org/website/competitions/2025/2025-05-25-spring-kanagawa-open-championship-results.pdf',
        ),
      },
    ],
    date: { kind: 'date', date: '2025-05-25' },
    deadline: '2025-05-07',
    venue: { name: '神奈川県立伊勢原射撃場', href: 'https://www.isehara-shooting.jp' },
  },
  {
    name: '国スポ一次予選会 兼 東日本選手権予選会',
    grade: 'G4',
    actions: [
      {
        name: '射座',
        href: getStaticFileUrl(
          'https://static.kanagawa-rifle.org/website/competitions/2025/2025-04-27-kokuspo-trials-1st-start-lists.pdf',
        ),
      },
      {
        name: '成績',
        href: getStaticFileUrl(
          'https://static.kanagawa-rifle.org/website/competitions/2025/2025-04-27-kokuspo-trials-1st-results.pdf',
        ),
      },
    ],
    date: { kind: 'date', date: '2025-04-27' },
    deadline: '2025-04-19',
    venue: { name: '神奈川県立伊勢原射撃場', href: 'https://www.isehara-shooting.jp' },
  },
]);
