import type { Metadata } from 'next';

import { env } from '@/config/env';

export function createPageMetadata({ title, description }: { title: string; description?: string }): Metadata {
  const image = new URL('/api/og', env.APP_URL);
  image.searchParams.set('title', title);

  return {
    title,
    description,
    openGraph: { images: image },
    twitter: { images: image },
  };
}
