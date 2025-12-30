"use client";

import { useEffect } from "react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * Error boundary for the application
 * Catches runtime errors and displays a user-friendly message
 */
export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center bg-gradient-to-b from-purple-100 to-pink-100 p-8">
      <div className="max-w-md rounded-lg border-4 border-red-400 bg-white p-8 shadow-lg">
        {/* Error icon */}
        <div className="mb-4 text-center text-6xl">⚠️</div>

        <h2
          className="mb-4 text-center text-2xl font-bold text-red-600"
          style={{ fontFamily: "Comic Sans MS, cursive" }}
        >
          エラーが発生しました
        </h2>

        <p className="mb-6 text-center text-gray-600">
          申し訳ございません。ページの読み込み中にエラーが発生しました。
        </p>

        {/* Error details (only in development) */}
        {process.env.NODE_ENV === "development" && (
          <details className="mb-4 rounded border border-gray-300 bg-gray-50 p-2">
            <summary className="cursor-pointer text-sm text-gray-500">
              エラー詳細（開発環境のみ表示）
            </summary>
            <pre className="mt-2 overflow-auto text-xs text-red-600">
              {error.message}
            </pre>
            {error.digest && (
              <p className="mt-1 text-xs text-gray-400">
                Digest: {error.digest}
              </p>
            )}
          </details>
        )}

        <div className="flex flex-col gap-3">
          <button
            onClick={reset}
            className="w-full rounded bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 font-bold text-white shadow transition-all hover:scale-105 hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2"
            style={{ fontFamily: "Comic Sans MS, cursive" }}
          >
            🔄 もう一度試す
          </button>

          <a
            href="/"
            className="w-full rounded border-2 border-purple-400 bg-white px-6 py-3 text-center font-bold text-purple-600 shadow transition-all hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2"
            style={{ fontFamily: "Comic Sans MS, cursive" }}
          >
            🏠 トップページへ戻る
          </a>
        </div>
      </div>
    </div>
  );
}
