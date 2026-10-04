import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'ページが見つかりません | 横須賀市ライフル射撃協会',
  description: 'お探しのページは見つかりませんでした。',
};

/**
 * Custom 404 page
 * Displayed when a page is not found
 */
export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center bg-gradient-to-b from-cyan-100 to-purple-100 p-8">
      <div className="max-w-lg text-center">
        {/* 404 Illustration */}
        <div className="mb-6 text-8xl" aria-hidden="true">
          🎯❓
        </div>

        {/* Error code */}
        <p className="mb-2 text-6xl font-bold text-purple-600" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
          404
        </p>

        <h1 className="mb-4 text-2xl font-bold text-purple-800" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
          ページが見つかりません
        </h1>

        <p className="mb-8 text-gray-600">
          お探しのページは移動または削除された可能性があります。
          <br />
          URLが正しいかご確認ください。
        </p>

        {/* Navigation links */}
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-block rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-3 font-bold text-white shadow-lg transition-all hover:scale-105 hover:from-purple-600 hover:to-pink-600 focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:outline-none"
            style={{ fontFamily: 'Comic Sans MS, cursive' }}
          >
            🏠 トップページへ
          </Link>

          <Link
            href="/shooting-range"
            className="inline-block rounded-lg border-2 border-purple-400 bg-white px-8 py-3 font-bold text-purple-600 shadow transition-all hover:bg-purple-50 focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:outline-none"
            style={{ fontFamily: 'Comic Sans MS, cursive' }}
          >
            🎯 射撃場案内
          </Link>
        </div>

        {/* Helpful links */}
        <div className="mt-10 border-t border-purple-200 pt-6">
          <p className="mb-4 text-sm text-gray-500">お探しの情報は以下にあるかもしれません：</p>
          <ul className="flex flex-wrap justify-center gap-4 text-sm">
            <li>
              <Link href="/competitions" className="text-blue-600 underline hover:text-blue-800">
                競技会・大会
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-blue-600 underline hover:text-blue-800">
                協会について
              </Link>
            </li>
            <li>
              <Link href="/projects" className="text-blue-600 underline hover:text-blue-800">
                年間予定
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
