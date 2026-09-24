import 'server-only';

import { getStaticFileUrl } from '@/config/assets';

import { competitionSchema } from '../schema';

export const year2024 = competitionSchema.array().parse([
  {
    name: '県ジュニアライフル射撃競技選手権大会',
    grade: 'G4',
    actions: [
      {
        name: '要項',
        href: getStaticFileUrl('/competitions/2024/2025-02-22-kanagawa-junior-championship-details.pdf'),
      },
      {
        name: '射座割',
        href: getStaticFileUrl('/competitions/2024/2025-02-22-kanagawa-junior-championship-start-lists.pdf'),
      },
      {
        name: '成績',
        href: getStaticFileUrl('/competitions/2024/2025-02-22-kanagawa-junior-championship-results.pdf'),
      },
    ],
  },
  {
    name: '全関東マスターズライフル射撃競技大会',
    grade: 'G3',
    actions: [
      {
        name: '要項',
        href: getStaticFileUrl('/competitions/2024/2024-11-03-zenkanto-masters-details.pdf'),
      },
    ],
  },
  {
    name: '全関東ＡＰ・ＨＲ射撃競技大会',
    grade: 'G3',
    actions: [
      {
        name: '要項',
        href: getStaticFileUrl('/competitions/2024/2024-11-03-zenkanto-ap-hr-details.pdf'),
      },
    ],
  },
  {
    name: '神奈川オープン兼県ライフル射撃競技選手権大会',
    grade: 'G4',
    actions: [
      {
        name: '要項',
        href: getStaticFileUrl('/competitions/2024/2024-10-27-kanagawa-open-championship-details.pdf'),
      },
      {
        name: '射座割',
        href: getStaticFileUrl('/competitions/2024/2024-10-27-kanagawa-open-championship-start-lists.pdf'),
      },
      {
        name: '成績',
        href: getStaticFileUrl('/competitions/2024/2024-10-27-kanagawa-open-championship-results.pdf'),
      },
    ],
  },
  {
    name: '第61回全関東ライフル射撃競技選手権大会',
    grade: 'G3',
    actions: [
      {
        name: '要項',
        href: getStaticFileUrl('/competitions/2024/2024-08-16-zenkanto-championship-details.pdf'),
      },
      {
        name: '射座割',
        href: getStaticFileUrl('/competitions/2024/2024-08-16-zenkanto-championship-start-lists.pdf'),
      },
      {
        name: '成績',
        href: getStaticFileUrl('/competitions/2024/2024-08-16-zenkanto-championship-results.pdf'),
      },
    ],
  },
  {
    name: '第54回東日本ライフル射撃競技選手権大会',
    grade: 'G2',
    actions: [
      {
        name: '要項',
        href: getStaticFileUrl('/competitions/2024/2024-06-21-eastern-japan-championship-details.pdf'),
      },
      {
        name: '射座割',
        href: getStaticFileUrl('/competitions/2024/2024-06-21-eastern-japan-championship-start-lists.pdf'),
      },
      {
        name: '成績',
        href: getStaticFileUrl('/competitions/2024/2024-06-21-eastern-japan-championship-results.pdf'),
      },
    ],
  },
  {
    name: '国スポ最終予選兼全関東予選会',
    grade: 'G4',
    actions: [
      {
        name: '射座割',
        href: getStaticFileUrl('/competitions/2024/2024-05-26-kokuspo-trials-2nd-start-lists.pdf'),
      },
      {
        name: '成績',
        href: getStaticFileUrl('/competitions/2024/2024-05-26-kokuspo-trials-2nd-results.pdf'),
      },
    ],
  },
  {
    name: '国スポ一次予選兼東日本予選会',
    grade: 'G4',
    actions: [
      {
        name: '射座割',
        href: getStaticFileUrl('/competitions/2024/2024-04-21-kokuspo-trials-1st-start-lists.pdf'),
      },
      {
        name: '成績',
        href: getStaticFileUrl('/competitions/2024/2024-04-21-kokuspo-trials-1st-results.pdf'),
      },
    ],
  },
]);
