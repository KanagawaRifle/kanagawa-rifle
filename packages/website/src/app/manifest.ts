import type { MetadataRoute } from 'next';

import { app } from '@/config/app';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: app.name,
    short_name: app.shortName,
    description: app.description,
    start_url: '/',
    display: 'browser',
    background_color: '#fff',
    theme_color: '#fff',
    icons: [
      {
        src: '/web-app-manifest-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/web-app-manifest-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
