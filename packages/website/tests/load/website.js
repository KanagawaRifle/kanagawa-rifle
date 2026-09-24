// SPDX-License-Identifier: MIT
/* global __ENV */
import { check, sleep } from 'k6';
import http from 'k6/http';

export const options = JSON.parse(__ENV.WEBSITE_LOAD_OPTIONS);
const baseUrl = __ENV.WEBSITE_LOAD_BASE_URL.replace(/\/$/, '');
const headers = { Accept: 'application/json' };
if (__ENV.WEBSITE_LOAD_AUTHORIZATION) headers.Authorization = __ENV.WEBSITE_LOAD_AUTHORIZATION;

export default function readNews() {
  const news = http.get(`${baseUrl}/api/news?size=1`, { headers, tags: { name: 'news' } });
  const valid = check(news, {
    'news returns 200': (response) => response.status === 200,
    'news contains an article': (response) => {
      try {
        return /^\d{4}-\d{2}-\d{2}-\d{2}$/.test(response.json().data.data[0].slug);
      } catch {
        return false;
      }
    },
  });
  if (valid) {
    const slug = news.json().data.data[0].slug;
    const detail = http.get(`${baseUrl}/api/news/${slug}`, { headers, tags: { name: 'detail' } });
    check(detail, {
      'detail returns 200': (response) => response.status === 200,
      'detail contains the requested article': (response) => {
        try {
          const article = response.json().data;
          return article.slug === slug && article.content.length > 0;
        } catch {
          return false;
        }
      },
    });
  }
  if (__ENV.WEBSITE_LOAD_PROFILE === 'smoke') sleep(1);
}
