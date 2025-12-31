// packages/website/src/config/cache.ts
// キャッシュ設定の中央管理

/**
 * ISR (Incremental Static Regeneration) の revalidate 設定
 * 単位: 秒
 */
export const REVALIDATE = {
  /** ニュース一覧: 5分 */
  NEWS_LIST: 5 * 60,
  /** ニュース詳細: 5分（一覧と統一） */
  NEWS_ITEM: 5 * 60,
  /** 大会情報: 1時間 */
  COMPETITIONS: 60 * 60,
  /** 静的コンテンツ: 1日 */
  STATIC: 24 * 60 * 60,
} as const;

/**
 * React Query のキャッシュ設定
 * 単位: ミリ秒
 */
export const QUERY_CACHE = {
  /** staleTime: データが古いと見なされるまでの時間 */
  STALE_TIME: 5 * 60 * 1000,
  /** gcTime: 未使用データがガベージコレクションされるまでの時間 */
  GC_TIME: 10 * 60 * 1000,
} as const;
