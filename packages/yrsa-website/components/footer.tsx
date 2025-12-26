import { ChevronUp } from "lucide-react";

export function Footer() {
  return (
    <footer id="AppFooter" role="contentinfo" aria-label="サイトフッター">
      <div className="border-8 border-dashed border-purple-600 bg-gradient-to-r from-yellow-300 via-pink-400 to-cyan-300 p-2 text-left text-black">
        <div className="container mx-auto flex max-w-7xl flex-col sm:flex-row">
          <section
            className="m-2 flex-1 rotate-1 border-4 border-orange-500 bg-lime-200 p-2 shadow-2xl"
            aria-labelledby="office-info"
          >
            <dl>
              <dt
                id="office-info"
                className="animate-pulse text-lg font-bold text-red-600 underline"
              >
                ★★★横須賀市ライフル射撃協会事務局★★★
              </dt>
              <dd className="pl-2 pt-2 text-blue-800">
                <span className="sr-only">郵便番号</span>〒238-0042
              </dd>
              <dd className="pl-2 pt-2 text-green-700">
                <span className="sr-only">住所</span>
                神奈川県横須賀市汐入町2-2 サンロク商事内
              </dd>
              <dd className="pl-2 pt-2 font-bold text-purple-600">
                <span className="sr-only">電話番号</span>TEL:{" "}
                <a
                  href="tel:046-823-0617"
                  className="text-purple-600 hover:underline"
                >
                  046-823-0617
                </a>
              </dd>
              <dd className="pl-2 pt-2 italic text-pink-600">
                <span className="sr-only">ファックス番号</span>FAX: 046-823-1148
              </dd>
            </dl>
          </section>

          <section
            className="m-2 flex-1 -rotate-1 border-4 border-red-500 bg-yellow-100 p-2 shadow-2xl"
            aria-labelledby="range-info"
          >
            <dl>
              <dt
                id="range-info"
                className="animate-pulse text-lg font-bold text-green-600 underline"
              >
                ✿✿✿くりはま花の国 AR 射撃場✿✿✿
              </dt>
              <dd className="pl-2 pt-2 text-indigo-700">
                <span className="sr-only">郵便番号</span>〒239-0832
              </dd>
              <dd className="pl-2 pt-2 text-red-600">
                <span className="sr-only">住所</span>
                神奈川県横須賀市神明町1番地
              </dd>
              <dd className="pl-2 pt-2 font-bold text-orange-600">
                <span className="sr-only">電話番号</span>TEL:{" "}
                <a
                  href="tel:046-833-6990"
                  className="text-orange-600 hover:underline"
                >
                  046-833-6990
                </a>
              </dd>
              <dd className="pl-2 pt-2 text-teal-600">
                <span className="sr-only">ファックス番号</span>FAX: 046-833-6990
              </dd>
              <dd className="pl-2 pt-2 text-purple-700 underline">
                <a
                  href="mailto:yokosukarifle@yahoo.co.jp"
                  className="text-purple-700 hover:no-underline"
                >
                  <span className="sr-only">メールアドレス: </span>
                  yokosukarifle@yahoo.co.jp
                </a>
              </dd>
            </dl>
          </section>
        </div>
      </div>

      <div
        className="border-t-8 border-double border-yellow-400 bg-gradient-to-r from-red-500 via-purple-600 to-blue-500 p-2 text-center text-yellow-300"
        role="contentinfo"
      >
        <small className="animate-pulse text-xl font-bold">
          <span aria-hidden="true">🎉🎉🎉</span>
          <span className="sr-only">コピーライト</span>©2025{" "}
          <a
            href="https://yokosukarifle.web.fc2.com/"
            className="text-yellow-300 underline drop-shadow-lg hover:no-underline"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="横須賀市ライフル射撃協会の公式サイト（新しいタブで開きます）"
          >
            横須賀市ライフル射撃協会
          </a>
          <span aria-hidden="true">🎉🎉🎉</span>
        </small>
      </div>

      <a
        href="#"
        className="block border-4 border-yellow-300 bg-gradient-to-b from-orange-500 to-red-600 p-2 text-center text-white transition-colors hover:from-orange-600 hover:to-red-700 focus:outline-none focus:ring-4 focus:ring-yellow-400"
        aria-label="ページの先頭へ戻る"
      >
        <ChevronUp
          className="inline-block animate-bounce text-2xl"
          aria-hidden="true"
        />
        <span className="ml-2 inline-block" aria-hidden="true">
          ↑↑↑ トップへGO！ ↑↑↑
        </span>
      </a>
    </footer>
  );
}
