// packages/website/src/lib/logger.ts
// サーバーサイド用ロガー（Axiom + Sentry 統合）

// The CommonJS barrel also registers client-side Web Vitals components.
import { Logger } from 'next-axiom/dist/logger';

// シングルトンロガーインスタンス
let loggerInstance: Logger | null = null;

function getLogger(): Logger | null {
  try {
    if (!loggerInstance) {
      loggerInstance = new Logger();
    }
    return loggerInstance;
  } catch {
    // ビルド時や初期化エラー時は null を返す
    return null;
  }
}

const isDev = process.env.NODE_ENV === 'development';

export const logger = {
  debug: (message: string, context?: Record<string, unknown>) => {
    getLogger()?.debug(message, context);
  },
  info: (message: string, context?: Record<string, unknown>) => {
    getLogger()?.info(message, context);
  },
  warn: (message: string, context?: Record<string, unknown>) => {
    getLogger()?.warn(message, context);
    // 開発環境のみコンソール出力（Lighthouse Best Practices 対応）
    if (isDev) console.warn(message, context);
  },
  error: (message: string, context?: Record<string, unknown>) => {
    // Axiom に送信（利用可能な場合）
    getLogger()?.error(message, context);
    // 開発環境のみコンソール出力（Lighthouse Best Practices 対応）
    // Sentry は captureException で別途送信
    if (isDev) console.error(message, context);
  },
  flush: async () => {
    await getLogger()?.flush();
  },
};
