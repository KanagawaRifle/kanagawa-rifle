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
      {/* キラキラ装飾 */}
      <div
        className="flex justify-center gap-2 border-t-4 border-double border-purple-400 py-2"
        aria-hidden="true"
      >
        <span className="animate-pulse">💫</span>
        <span className="animate-bounce">⭐</span>
        <span className="animate-pulse">💫</span>
        <span className="animate-bounce">⭐</span>
        <span className="animate-pulse">💫</span>
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
                className="font-bold text-white"
                style={{ fontFamily: "Comic Sans MS, cursive" }}
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
                className="font-bold text-white"
                style={{ fontFamily: "Comic Sans MS, cursive" }}
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
                    href="mailto:yokosukarifle@yahoo.co.jp"
                    className="text-blue-600 underline hover:text-red-600"
                  >
                    yokosukarifle@yahoo.co.jp
                  </a>
                </dd>
              </div>
            </dl>
          </section>
        </div>
      </div>

      {/* コピーライト */}
      <div className="border-y-4 border-double border-purple-400 bg-gradient-to-r from-pink-200 via-yellow-100 to-cyan-200 py-3 text-center">
        <p
          className="text-purple-700"
          style={{ fontFamily: "Comic Sans MS, cursive" }}
        >
          ～ご意見・ご感想お待ちしています～
        </p>
        <p className="mt-2 text-sm text-gray-600">
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
        className="block bg-gradient-to-b from-orange-300 to-orange-500 py-2 text-center font-bold text-white transition-all hover:from-orange-400 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
        aria-label="ページの先頭へ戻る"
        style={{ fontFamily: "Comic Sans MS, cursive" }}
      >
        <ChevronUp className="inline-block animate-bounce" aria-hidden="true" />
        <span className="ml-1">↑↑↑ トップへGO！ ↑↑↑</span>
        <ChevronUp className="inline-block animate-bounce" aria-hidden="true" />
      </a>
    </footer>
  );
}
