import Link from "next/link";
import { ChevronUp } from "lucide-react";

export function Footer() {
  return (
    <footer
      id="AppFooter"
      role="contentinfo"
      aria-label="サイトフッター"
      style={{
        background: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='10' cy='10' r='2'/%3E%3C/g%3E%3C/svg%3E"), linear-gradient(to right, #ccffff, #ffffcc, #ffccff)`,
      }}
    >
      {/* キラキラ装飾 - motion-safe で条件付きアニメーション */}
      <div
        className="flex justify-center gap-2 border-t-4 border-double border-purple-400 py-2"
        aria-hidden="true"
      >
        <span className="motion-safe:animate-pulse">💫</span>
        <span className="motion-safe:animate-bounce">⭐</span>
        <span className="motion-safe:animate-pulse">💫</span>
        <span className="motion-safe:animate-bounce">⭐</span>
        <span className="motion-safe:animate-pulse">💫</span>
      </div>

      {/* 連絡先セクション */}
      <div className="mx-auto max-w-4xl px-4 py-4">
        <div className="grid gap-4 md:grid-cols-2">
          {/* 事務局 */}
          <section
            className="border-4 border-pink-400 bg-pink-50"
            aria-labelledby="office-info"
          >
            <div className="bg-gradient-to-r from-pink-400 to-pink-600 px-3 py-1">
              <h2
                id="office-info"
                className="font-retro font-bold text-white"
              >
                ✉ 事務局 ✉
              </h2>
            </div>
            <dl className="p-3 text-sm">
              <div className="mb-1">
                <dt className="sr-only">郵便番号</dt>
                <dd>〒238-0042</dd>
              </div>
              <div className="mb-1">
                <dt className="sr-only">住所</dt>
                <dd>神奈川県横須賀市汐入町2-2 サンロク商事内</dd>
              </div>
              <div className="mb-1">
                <dt className="sr-only">電話番号</dt>
                <dd>
                  TEL:{" "}
                  <a
                    href="tel:046-823-0617"
                    className="text-blue-600 underline hover:text-red-600"
                  >
                    046-823-0617
                  </a>
                </dd>
              </div>
              <div>
                <dt className="sr-only">ファックス番号</dt>
                <dd>FAX: 046-823-1148</dd>
              </div>
            </dl>
          </section>

          {/* 射撃場 */}
          <section
            className="border-4 border-cyan-400 bg-cyan-50"
            aria-labelledby="range-info"
          >
            <div className="bg-gradient-to-r from-cyan-400 to-cyan-600 px-3 py-1">
              <h2
                id="range-info"
                className="font-retro font-bold text-white"
              >
                🎯 射撃場 🎯
              </h2>
            </div>
            <dl className="p-3 text-sm">
              <div className="mb-1">
                <dt className="sr-only">郵便番号</dt>
                <dd>〒239-0832</dd>
              </div>
              <div className="mb-1">
                <dt className="sr-only">住所</dt>
                <dd>神奈川県横須賀市神明町1番地</dd>
              </div>
              <div className="mb-1">
                <dt className="sr-only">電話番号</dt>
                <dd>
                  TEL/FAX:{" "}
                  <a
                    href="tel:046-833-6990"
                    className="text-blue-600 underline hover:text-red-600"
                  >
                    046-833-6990
                  </a>
                </dd>
              </div>
              <div>
                <dt className="sr-only">メールアドレス</dt>
                <dd>
                  📧{" "}
                  <a
                    href="mailto:yokosukarifle@gmail.com"
                    className="text-blue-600 underline hover:text-red-600"
                  >
                    yokosukarifle@gmail.com
                  </a>
                </dd>
              </div>
            </dl>
          </section>
        </div>
      </div>

      {/* サイトナビゲーション */}
      <nav className="mx-auto max-w-4xl px-4 py-4" aria-label="フッターナビゲーション">
        <div className="grid gap-4 text-center text-sm md:grid-cols-3">
          <div>
            <h3 className="mb-2 font-bold text-purple-700">射撃場のご案内</h3>
            <ul className="space-y-1">
              <li>
                <Link href="/shooting-range" className="text-blue-600 underline hover:text-red-600">
                  神奈川県横須賀市の射撃場
                </Link>
              </li>
              <li>
                <Link href="/shooting-range/guide" className="text-blue-600 underline hover:text-red-600">
                  射撃場の利用案内・料金
                </Link>
              </li>
              <li>
                <Link href="/shooting-range/access" className="text-blue-600 underline hover:text-red-600">
                  射撃場へのアクセス
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-2 font-bold text-purple-700">ライフル射撃競技会</h3>
            <ul className="space-y-1">
              <li>
                <Link href="/competitions" className="text-blue-600 underline hover:text-red-600">
                  競技会一覧
                </Link>
              </li>
              <li>
                <Link href="/competitions/monthly" className="text-blue-600 underline hover:text-red-600">
                  月例射撃大会
                </Link>
              </li>
              <li>
                <Link href="/competitions/rifle-shooting-class" className="text-blue-600 underline hover:text-red-600">
                  ライフル射撃教室
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-2 font-bold text-purple-700">協会について</h3>
            <ul className="space-y-1">
              <li>
                <Link href="/about" className="text-blue-600 underline hover:text-red-600">
                  横須賀市ライフル射撃協会
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-blue-600 underline hover:text-red-600">
                  年間活動計画
                </Link>
              </li>
              <li>
                <Link href="/links" className="text-blue-600 underline hover:text-red-600">
                  関連団体リンク
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* コピーライト */}
      <div className="border-y-4 border-double border-purple-400 bg-gradient-to-r from-pink-200 via-yellow-100 to-cyan-200 py-3 text-center">
        <p className="font-retro text-purple-700">
          ～ご意見・ご感想お待ちしています～
        </p>
        <p className="mt-2 text-xs text-gray-600">
          神奈川県横須賀市のライフル射撃・射撃場なら横須賀市ライフル射撃協会
        </p>
        <p className="mt-1 text-sm text-gray-600">
          Since 1957 / ©2025 横須賀市ライフル射撃協会
        </p>
        <div className="mt-2 flex justify-center gap-1" aria-hidden="true">
          <span className="text-lg">🌸</span>
          <span className="text-lg">🌺</span>
          <span className="text-lg">🌷</span>
          <span className="text-lg">🌻</span>
          <span className="text-lg">🌼</span>
        </div>
      </div>

      {/* トップへ戻るボタン */}
      <a
        href="#AppHeader"
        className="font-retro block bg-gradient-to-b from-orange-300 to-orange-500 py-2 text-center font-bold text-white text-shadow-sm transition-all hover:from-orange-400 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
        aria-label="ページの先頭へ戻る"
      >
        <ChevronUp className="inline-block motion-safe:animate-bounce" aria-hidden="true" />
        <span className="ml-1">↑↑↑ トップへGO！ ↑↑↑</span>
        <ChevronUp className="inline-block motion-safe:animate-bounce" aria-hidden="true" />
      </a>
    </footer>
  );
}
