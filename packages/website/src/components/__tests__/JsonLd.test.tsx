import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';

import { JsonLd } from '../JsonLd';
import { PageLayout } from '../PageLayout';

describe('structured data serialization', () => {
  it('round-trips editorial text without allowing it to terminate the script element', () => {
    const data = { '@type': 'Article', headline: '</script><script>alert("test")</script> & 大会' };
    const html = renderToStaticMarkup(<JsonLd data={data} />);
    const document = new DOMParser().parseFromString(html, 'text/html');
    expect(document.querySelectorAll('script')).toHaveLength(1);
    expect(JSON.parse(document.querySelector('script')!.textContent!)).toEqual(data);
    expect(html).not.toContain('<script>alert');
  });

  it('protects article titles when they also appear in breadcrumb structured data', () => {
    const title = '</script><img src=x onerror=alert(1)>';
    const html = renderToStaticMarkup(
      <PageLayout breadcrumbs={[{ name: title, path: '/news/2026-01-01-01' }]}>本文</PageLayout>,
    );
    const document = new DOMParser().parseFromString(html, 'text/html');
    expect(document.querySelector('img')).toBeNull();
    expect(JSON.parse(document.querySelector('script')!.textContent!).itemListElement[0].name).toBe(title);
  });
});
