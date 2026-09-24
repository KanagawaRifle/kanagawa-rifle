export const CACHE_HEADERS = {
  NO_CACHE: {
    'Cache-Control': 'private, no-store, no-cache, must-revalidate',
  },
  LIST: {
    'Cache-Control': 'public, max-age=300, s-maxage=300, stale-while-revalidate=3600',
  },
  DETAIL: {
    'Cache-Control': 'public, max-age=600, s-maxage=600, stale-while-revalidate=3600',
  },
} as const;
