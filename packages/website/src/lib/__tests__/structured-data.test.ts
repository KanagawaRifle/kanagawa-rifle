import { describe, expect, it, vi } from 'vitest';

import { createWebPageJsonLd } from '../structured-data';

vi.mock('@/config/env', () => ({ env: { APP_URL: 'https://example.test' } }));

describe('page structured data', () => {
  it('connects a distinct paginated page to its website, publisher, breadcrumbs and visible list', () => {
    const list = { '@type': 'ItemList', numberOfItems: 12 };
    expect(
      createWebPageJsonLd({
        title: 'お知らせ（2ページ目）',
        description: '大会情報',
        path: '/news?page=2',
        type: 'CollectionPage',
        mainEntity: list,
        withBreadcrumbs: true,
      }),
    ).toMatchObject({
      '@type': 'CollectionPage',
      '@id': 'https://example.test/news?page=2',
      url: 'https://example.test/news?page=2',
      name: 'お知らせ（2ページ目）',
      description: '大会情報',
      inLanguage: 'ja',
      isPartOf: { '@id': 'https://example.test/#website' },
      publisher: { '@id': 'https://example.test/#organization' },
      breadcrumb: { '@id': 'https://example.test/news?page=2#breadcrumb' },
      mainEntity: list,
    });
  });

  it('keeps the home page free of nonexistent breadcrumbs and entities', () => {
    const home = createWebPageJsonLd({ title: 'ホーム', path: '/' });
    expect(home['@type']).toBe('WebPage');
    expect(home.description).toBeTruthy();
    expect(home).not.toHaveProperty('breadcrumb');
    expect(home).not.toHaveProperty('mainEntity');
  });
});
