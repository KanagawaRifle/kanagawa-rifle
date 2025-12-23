// packages/website/src/lib/logger.ts
// サーバーサイド用ロガー（Axiom + Sentry 統合）

import { Logger } from 'next-axiom';

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

export const logger = {
  debug: (message: string, context?: Record<string, unknown>) => {
    getLogger()?.debug(message, context);
  },
  info: (message: string, context?: Record<string, unknown>) => {
    getLogger()?.info(message, context);
  },
  warn: (message: string, context?: Record<string, unknown>) => {
    getLogger()?.warn(message, context);
    console.warn(message, context);
  },
  error: (message: string, context?: Record<string, unknown>) => {
    // Axiom に送信（利用可能な場合）
    getLogger()?.error(message, context);
    // Sentry にも送信（captureConsoleIntegration 経由）
    console.error(message, context);
  },
  flush: async () => {
    await getLogger()?.flush();
  },
};
