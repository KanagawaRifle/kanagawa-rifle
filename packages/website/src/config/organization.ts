import { app } from './app';
import { env } from './env';
import { seoIds } from './seo';
import { social } from './social';

/** Published office details shared by the visible page and search metadata. */
export const office = {
  telephone: '080-1190-3911',
  fax: '046-833-6990',
  email: 'kraofficial@yahoo.co.jp',
  postalCode: '239-0832',
  region: '神奈川県',
  locality: '横須賀市',
  street: '神明町1番地',
  building: 'くりはま花の国エアライフル射撃場内',
};

export const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SportsOrganization',
  '@id': seoIds.organization,
  name: app.name,
  legalName: app.longName,
  alternateName: [app.longName, app.shortName],
  description: app.description,
  url: env.APP_URL,
  logo: new URL('/web-app-manifest-512x512.png', env.APP_URL).toString(),
  sameAs: Object.values(social).map(({ url }) => url),
  telephone: office.telephone,
  faxNumber: office.fax,
  email: office.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: `${office.street} ${office.building}`,
    addressLocality: office.locality,
    addressRegion: office.region,
    postalCode: office.postalCode,
    addressCountry: 'JP',
  },
  sport: 'ライフル射撃',
  areaServed: { '@type': 'AdministrativeArea', name: office.region },
};
