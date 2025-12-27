import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import { GoogleCalendar } from "./_components";

export default function HomePage() {
  return (
    <div
      className="min-h-screen"
      style={{
        background: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239C92AC' fill-opacity='0.15'%3E%3Cpath d='M0 0h20v20H0zM20 20h20v20H20z'/%3E%3C/g%3E%3C/svg%3E"), linear-gradient(to bottom, #ffccff, #ccffff)`,
      }}
    >
      {/* キラキラ装飾（上部） */}
      <div className="flex justify-center gap-2 py-2" aria-hidden="true">
        <span className="animate-pulse text-2xl">✧</span>
        <span className="animate-bounce text-2xl">☆</span>
        <span className="animate-pulse text-2xl">✧</span>
        <span className="animate-bounce text-2xl">☆</span>
        <span className="animate-pulse text-2xl">✧</span>
      </div>

      {/* メインコンテナ */}
      <div className="mx-auto max-w-4xl p-4">
        {/* ウェルカムヘッダー */}
        <div className="mb-6 border-4 border-double border-purple-600 bg-gradient-to-r from-pink-200 via-yellow-100 to-cyan-200 p-4 text-center shadow-lg">
          <h1
            className="mb-2 text-3xl font-bold text-purple-800 md:text-4xl"
            style={{ fontFamily: "Comic Sans MS, cursive" }}
          >
            ようこそ♪♪♪
          </h1>
          <p
            className="text-xl text-pink-600"
            style={{ fontFamily: "Comic Sans MS, cursive" }}
          >
            ★☆★ 横須賀市ライフル射撃協会へ ★☆★
          </p>
          <div className="mt-2 flex justify-center gap-1" aria-hidden="true">
            <span className="inline-block animate-spin">🎯</span>
            <span className="inline-block animate-bounce">🔫</span>
            <span className="inline-block animate-spin">🎯</span>
          </div>
        </div>

        {/* Hero Banner */}
        <div className="mb-6 border-4 border-blue-400 bg-white p-2">
          <Image
            src="/images/hero-1280.gif"
            width={1280}
            height={233}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 90vw, 896px"
            className="mx-auto h-auto w-full"
            alt="横須賀市ライフル射撃協会のホームページへようこそ！"
            priority
          />
        </div>

        {/* マーキー */}
        <div className="mb-6 overflow-hidden border-2 border-red-400 bg-yellow-100 py-2">
          <div className={`whitespace-nowrap ${styles.marquee}`}>
            <span className="mx-4 text-red-600" style={{ fontFamily: "Comic Sans MS, cursive" }}>
              📢 お知らせ：ランクリスト競技会開催中！！ 📢 射撃教室 生徒募集中☆ 📢 月例会参加者募集！ 📢
            </span>
          </div>
        </div>

        {/* メニューリンク */}
        <div className="mb-6 flex flex-wrap justify-center gap-2 border-2 border-dashed border-orange-400 bg-orange-50 p-4">
          <Link href="/shooting-range" className="rounded bg-gradient-to-b from-orange-300 to-orange-500 px-4 py-2 font-bold text-white shadow hover:from-orange-400 hover:to-orange-600">
            🏠 射撃場
          </Link>
          <Link href="/about" className="rounded bg-gradient-to-b from-green-300 to-green-500 px-4 py-2 font-bold text-white shadow hover:from-green-400 hover:to-green-600">
            📖 協会について
          </Link>
          <Link href="/competitions" className="rounded bg-gradient-to-b from-blue-300 to-blue-500 px-4 py-2 font-bold text-white shadow hover:from-blue-400 hover:to-blue-600">
            🏆 競技会
          </Link>
          <Link href="/links" className="rounded bg-gradient-to-b from-purple-300 to-purple-500 px-4 py-2 font-bold text-white shadow hover:from-purple-400 hover:to-purple-600">
            🔗 リンク
          </Link>
        </div>

        {/* 2カラムレイアウト */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* 左カラム */}
          <div className="space-y-4">
            {/* ランクリスト競技会 */}
            <div className="border-4 border-blue-400 bg-blue-50">
              <div className="bg-gradient-to-r from-blue-400 to-blue-600 px-3 py-1">
                <span className="font-bold text-white" style={{ fontFamily: "Comic Sans MS, cursive" }}>
                  📢 ランクリスト競技会のご案内 📢
                </span>
              </div>
              <div className="flex flex-wrap gap-2 p-3">
                <a
                  href="https://static.kanagawa-rifle.org/website/competitions/2025/2025-12-06-winter-10m-rank-list-details.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded border-2 border-indigo-500 bg-white px-4 py-2 font-bold text-indigo-700 hover:bg-indigo-100"
                >
                  要項
                  <span className="sr-only">（PDF、新しいタブで開きます）</span>
                </a>
                <a
                  href="https://static.kanagawa-rifle.org/website/competitions/2025/2025-12-06-winter-10m-rank-list-start-lists.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded border-2 border-indigo-500 bg-white px-4 py-2 font-bold text-indigo-700 hover:bg-indigo-100"
                >
                  射座
                  <span className="sr-only">（PDF、新しいタブで開きます）</span>
                </a>
                <a
                  href="https://static.kanagawa-rifle.org/website/competitions/2025/2025-12-06-winter-10m-rank-list-results.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded border-2 border-indigo-500 bg-white px-4 py-2 font-bold text-indigo-700 hover:bg-indigo-100"
                >
                  成績
                  <span className="sr-only">（PDF、新しいタブで開きます）</span>
                </a>
              </div>
            </div>

            {/* 講習会のお知らせ */}
            <div className="border-4 border-green-400 bg-green-50">
              <div className="bg-gradient-to-r from-green-400 to-green-600 px-3 py-1">
                <span className="font-bold text-white" style={{ fontFamily: "Comic Sans MS, cursive" }}>
                  📖 講習会のお知らせ 📖
                </span>
              </div>
              <div className="p-3 text-sm">
                <p>
                  <strong className="underline">月例会参加者限定</strong>で、下記の講習会を毎月開催しております（受講料3,000円）。
                </p>
                <p className="mt-1">
                  受講を希望される方は、月例会のお申込みと併せて開催日の<strong>1週間前まで</strong>にお申込ください。
                </p>
                <ul className="mt-2 list-inside list-disc">
                  <li>📚 インテグリティ講習会</li>
                  <li>📚 ライフル射撃に関する講習会</li>
                </ul>
              </div>
            </div>

            {/* 射撃教室 */}
            <div className="border-4 border-pink-400 bg-pink-50">
              <div className="bg-gradient-to-r from-pink-400 to-pink-600 px-3 py-1">
                <span className="font-bold text-white" style={{ fontFamily: "Comic Sans MS, cursive" }}>
                  🎯 【募集中！！】射撃教室【ライフル】 🎯
                </span>
              </div>
              <div className="p-3 text-sm">
                <p className="font-bold">
                  💕 初心者から丁寧に教えます ✨
                </p>
                <p className="mt-2 font-bold">
                  毎週火曜日・木曜日1時間程度 (17:00～20:00の間)
                </p>
                <dl className="mt-2">
                  <dt className="font-bold">対象：</dt>
                  <dd className="ml-4">小学4年生～中学3年生</dd>
                </dl>
                <dl className="mt-2">
                  <dt className="font-bold">お問い合わせ：</dt>
                  <dd className="ml-4">
                    Ｅメール：
                    <a href="mailto:yokosukarifle@yahoo.co.jp" className="text-blue-600 underline hover:text-red-600">
                      yokosukarifle@yahoo.co.jp
                    </a>
                  </dd>
                  <dd className="ml-4">電話：046-833-6990</dd>
                </dl>
                <dl className="mt-2">
                  <dt className="font-bold">その他：</dt>
                  <dd className="ml-4">横須賀市在住・在学の小学5年生～中学1年生の方は補助が出ますので別途お問い合わせください。</dd>
                </dl>
              </div>
            </div>

            {/* 三県大口径古敷谷大会 */}
            <div className="border-4 border-orange-400 bg-orange-50">
              <div className="bg-gradient-to-r from-orange-400 to-orange-600 px-3 py-1">
                <span className="font-bold text-white" style={{ fontFamily: "Comic Sans MS, cursive" }}>
                  🔫 [会員の皆様へ] 三県大口径古敷谷大会のご案内 🔫
                </span>
              </div>
              <div className="p-3 text-sm">
                <ul className="space-y-1">
                  <li><span className="font-bold">日時：</span>令和7年12月7日 (日) 8時集合</li>
                  <li><span className="font-bold">会場：</span>千葉県射撃場（市原市古敷谷2620・043-698-0314）</li>
                  <li><span className="font-bold">種目：</span>40発伏射・40発ベンチレスト・クラウンマッチ</li>
                  <li><span className="font-bold">参加費：</span>6,000円</li>
                  <li><span className="font-bold">その他：</span>弁当・参加賞付き</li>
                  <li><span className="font-bold">申込先：</span>横須賀市ライフル射撃協会 (yokosukarifle@yahoo.co.jp)</li>
                  <li><span className="font-bold">申込締切：</span>11月26日 (水)</li>
                </ul>
              </div>
            </div>

            {/* 工事中バナー */}
            <div className="flex items-center justify-center gap-2 border-2 border-yellow-600 bg-yellow-200 p-2">
              <span className="text-2xl">🚧</span>
              <span className="animate-pulse font-bold text-yellow-800" style={{ fontFamily: "Comic Sans MS, cursive" }}>
                ＊サイトリニューアル中＊
              </span>
              <span className="text-2xl">🚧</span>
            </div>
          </div>

          {/* 右カラム */}
          <div className="space-y-4">
            {/* 射撃場リンク */}
            <Link href="/shooting-range" className="block border-4 border-cyan-400 bg-cyan-50 transition-transform hover:scale-105">
              <div className="bg-gradient-to-r from-cyan-400 to-cyan-600 px-3 py-1">
                <span className="font-bold text-white" style={{ fontFamily: "Comic Sans MS, cursive" }}>
                  🎯 射撃場のご案内 🎯
                </span>
              </div>
              <div className="p-2">
                <Image
                  src="/images/011.jpg"
                  alt="くりはま花の国エアライフル射撃場"
                  width={300}
                  height={200}
                  sizes="(max-width: 768px) 280px, 300px"
                  loading="lazy"
                  className="mx-auto border-2 border-white shadow"
                />
                <p className="mt-2 text-center text-sm">
                  ▶ クリックして詳細を見る ◀
                </p>
              </div>
            </Link>

            {/* カレンダー */}
            <div className="border-4 border-lime-400 bg-lime-50">
              <div className="bg-gradient-to-r from-lime-400 to-lime-600 px-3 py-1">
                <span className="font-bold text-white" style={{ fontFamily: "Comic Sans MS, cursive" }}>
                  📅 予定表 📅
                </span>
              </div>
              <div className="bg-white p-2">
                <GoogleCalendar />
              </div>
            </div>
          </div>
        </div>

        {/* フッター */}
        <div className="mt-8 border-t-4 border-double border-purple-400 pt-4 text-center">
          <div className="mb-2 flex justify-center gap-2">
            <span className="animate-pulse">💫</span>
            <span className="animate-bounce">⭐</span>
            <span className="animate-pulse">💫</span>
          </div>
          <p style={{ fontFamily: "Comic Sans MS, cursive" }} className="text-purple-700">
            ～ご意見・ご感想お待ちしています～
          </p>
          <p className="mt-1 text-sm">
            📧{" "}
            <a href="mailto:yokosukarifle@yahoo.co.jp" className="text-blue-600 underline hover:text-red-600">
              yokosukarifle@yahoo.co.jp
            </a>
          </p>
          <p className="mt-2 text-xs text-gray-600">
            Since 1957 / Last Update: 2025.12.26
          </p>
          <div className="mt-2 inline-block border border-gray-400 bg-white px-3 py-1 text-xs">
            <span>あなたは</span>
            <span className="mx-1 font-mono font-bold text-red-600">000,000</span>
            <span>人目の訪問者です！</span>
          </div>
          <div className="mt-4 flex justify-center gap-1">
            <span className="text-lg">🌸</span>
            <span className="text-lg">🌺</span>
            <span className="text-lg">🌷</span>
            <span className="text-lg">🌻</span>
            <span className="text-lg">🌼</span>
          </div>
        </div>
      </div>
    </div>
  );
}
