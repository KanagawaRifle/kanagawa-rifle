// SPDX-License-Identifier: MIT
// cspell:ignore longtask
import { chromium } from '@playwright/test';

const baseURL = process.argv[2] ?? 'http://127.0.0.1:3000';
const runs = Number(process.argv[3] ?? 3);
if (!Number.isInteger(runs) || runs < 1 || runs > 10) throw new Error('Runs must be an integer from 1 to 10');
const routes = ['/', '/news', '/competitions'];
const browser = await chromium.launch();
const measurements = [];
try {
  for (const route of routes) {
    for (let run = 1; run <= runs; run++) {
      // Each run has an empty browser cache. The server image cache can remain warm.
      const context = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 });
      const page = await context.newPage();
      await page.addInitScript(() => {
        window.websitePerformance = { lcp: 0, cls: 0, longTasks: [] };
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) window.websitePerformance.lcp = entry.startTime;
        }).observe({ type: 'largest-contentful-paint', buffered: true });
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!entry.hadRecentInput) window.websitePerformance.cls += entry.value;
          }
        }).observe({ type: 'layout-shift', buffered: true });
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) window.websitePerformance.longTasks.push(entry.duration);
        }).observe({ type: 'longtask', buffered: true });
      });
      await page.goto(new URL(route, baseURL).href);
      await page.waitForLoadState('networkidle');
      const initial = await page.evaluate(() => ({
        ...window.websitePerformance,
        resources: performance.getEntriesByType('resource').map((entry) => ({
          path: new URL(entry.name).pathname,
          type: entry.initiatorType,
          bytes: entry.encodedBodySize,
        })),
      }));
      const sum = (resources) => resources.reduce((total, resource) => total + resource.bytes, 0);
      const images = initial.resources.filter((resource) => /\.(png|jpg|webp)$|\/_next\/image/.test(resource.path));
      measurements.push({
        route,
        run,
        lcpMs: initial.lcp,
        cls: initial.cls,
        // Resource bodies after HTTP compression; excludes the navigation HTML and headers.
        resourceBytes: sum(initial.resources),
        scriptBytes: sum(initial.resources.filter((resource) => resource.type === 'script')),
        imageBytes: sum(images),
        imageRequests: images.length,
        initialLongTasksMs: initial.longTasks,
      });
      await context.close();
    }
  }
} finally {
  await browser.close();
}
console.log(JSON.stringify({ baseURL, browser: browser.version(), viewport: '390x844@1x', measurements }, null, 2));
