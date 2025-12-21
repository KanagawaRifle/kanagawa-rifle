import { paths } from '@/config';

import { Event } from '../_types/';

export const year2022: Event[] = [
  {
    name: '神奈川オープン兼県ライフル射撃競技選手権大会',
    grade: 'G4',
    actions: [
      {
        name: '要項',
        href: paths.cdn.getHref('/competitions/2022/2022-11-06-kanagawa-open-championship-details.pdf'),
      },
      {
        name: '射座割',
        href: paths.cdn.getHref('/competitions/2022/2022-11-06-kanagawa-open-championship-start-lists.pdf'),
      },
      {
        name: '成績',
        href: paths.cdn.getHref('/competitions/2022/2022-11-06-kanagawa-open-championship-results.pdf'),
      },
    ],
  },
  {
    name: '国体最終予選兼全関東予選会',
    grade: 'G4',
    actions: [
      {
        name: '射座割',
        href: paths.cdn.getHref('/competitions/2022/2022-05-22-kokutai-trials-2nd-start-lists.pdf'),
      },
      {
        name: '成績',
        href: paths.cdn.getHref('/competitions/2022/2022-05-22-kokutai-trials-2nd-results.pdf'),
      },
    ],
  },
  {
    name: '国体一次予選兼東日本予選会',
    grade: 'G4',
    actions: [
      {
        name: '射座割',
        href: paths.cdn.getHref('/competitions/2022/2022-04-24-kokutai-trials-1st-start-lists.pdf'),
      },
      {
        name: '成績',
        href: paths.cdn.getHref('/competitions/2022/2022-04-24-kokutai-trials-1st-results.pdf'),
      },
    ],
  },
];
