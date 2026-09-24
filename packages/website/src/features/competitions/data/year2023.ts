import 'server-only';

import { getStaticFileUrl } from '@/config/assets';

import { competitionSchema } from '../schema';

export const year2023 = competitionSchema.array().parse([
  {
    name: '県ジュニアライフル射撃競技選手権大会',
    grade: 'G4',
    actions: [
      {
        name: '要項',
        href: getStaticFileUrl('/competitions/2023/2024-02-24-kanagawa-junior-championship-details.pdf'),
      },
      {
        name: '射座割',
        href: getStaticFileUrl('/competitions/2023/2024-02-24-kanagawa-junior-championship-start-lists.pdf'),
      },
      {
        name: '成績',
        href: getStaticFileUrl('/competitions/2023/2024-02-24-kanagawa-junior-championship-results.pdf'),
      },
    ],
  },
  {
    name: '神奈川オープン兼県ライフル射撃競技選手権大会',
    grade: 'G4',
    actions: [
      {
        name: '要項',
        href: getStaticFileUrl('/competitions/2023/2023-11-05-kanagawa-open-championship-details.pdf'),
      },
      {
        name: '射座割',
        href: getStaticFileUrl('/competitions/2023/2023-11-05-kanagawa-open-championship-start-lists.pdf'),
      },
      {
        name: '成績',
        href: getStaticFileUrl('/competitions/2023/2023-11-05-kanagawa-open-championship-results.pdf'),
      },
    ],
  },
  {
    name: '第60回全関東ライフル射撃競技選手権大会',
    grade: 'G3',
    actions: [
      {
        name: '要項',
        href: getStaticFileUrl('/competitions/2023/2023-08-18-zen-kanto-details.pdf'),
      },
      {
        name: '射座割',
        href: getStaticFileUrl('/competitions/2023/2023-08-18-zen-kanto-start-lists.pdf'),
      },
    ],
  },
  {
    name: '国体最終予選兼全関東予選会',
    grade: 'G4',
    actions: [
      {
        name: '射座割',
        href: getStaticFileUrl('/competitions/2023/2023-05-21-kokutai-trials-2nd-start-lists.pdf'),
      },
      {
        name: '成績',
        href: getStaticFileUrl('/competitions/2023/2023-05-21-kokutai-trials-2nd-results.pdf'),
      },
    ],
  },
  {
    name: '国体一次予選兼東日本予選会',
    grade: 'G4',
    actions: [
      {
        name: '射座割',
        href: getStaticFileUrl('/competitions/2023/2023-04-23-kokutai-trials-1st-start-lists.pdf'),
      },
      {
        name: '成績',
        href: getStaticFileUrl('/competitions/2023/2023-04-23-kokutai-trials-1st-results.pdf'),
      },
    ],
  },
]);
