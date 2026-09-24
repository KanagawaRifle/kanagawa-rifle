// SPDX-License-Identifier: MIT
import shared from '@acme/lighthouse-config';

const config = {
  ...shared,
  profiles: { mobile: shared.profiles.mobile, desktop: shared.profiles.desktop },
  pages: {
    home: '/',
    about: '/about',
    competitions: '/competitions',
    news: '/news',
    newsDetail: '/news/2026-09-24-01',
    forms: '/forms',
    join: '/join',
    links: '/links',
    projects: '/projects',
    recommendation: '/recommendation',
  },
};

export default config;
