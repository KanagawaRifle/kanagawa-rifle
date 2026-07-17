import type { Metadata } from "next";
import Image from "next/image";
import { getOpengraphImageUrl } from "@/lib/server";
import Link from "next/link";
import styles from "./page.module.css";
import { GoogleCalendar } from "./_components";
import heroImage from "./_assets/hero.gif";
import rifleShootingImage from "./_assets/rifle-shooting.jpg";

export const metadata: Metadata = {
  title: "ライフル射撃・射撃場なら横須賀市ライフル射撃協会【神奈川県】",
  description:
    "神奈川県横須賀市のライフル射撃団体。くりはま花の国エアライフル射撃場で射撃体験・競技会を開催。初心者向け射撃教室あり。エアライフル・ビームライフルの練習が可能。",
  keywords: [
    "ライフル射撃",
    "射撃",
    "射撃場",
    "神奈川県",
    "横須賀市",
    "エアライフル",
    "ビームライフル",
    "射撃体験",
    "射撃教室",
    "くりはま花の国",
    "横須賀市ライフル射撃協会",
    "月例会",
    "競技会",
  ],
  openGraph: {
    title: "ライフル射撃・射撃場なら横須賀市ライフル射撃協会",
    description:
      "神奈川県横須賀市のライフル射撃団体。射撃体験・競技会開催中。初心者歓迎。",
    images: [
      {
        url: getOpengraphImageUrl({
          title: "横須賀市ライフル射撃協会",
          subtitle: "神奈川県の射撃団体",
          theme: "default",
        }),
        width: 1200,
        height: 630,
      },
    ],
  },
};

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
            className="mb-2 text-2xl font-bold text-purple-800 md:text-3xl"
            style={{ fontFamily: "Comic Sans MS, cursive" }}
          >
            神奈川県のライフル射撃・射撃場
          </h1>
          <p
            className="text-xl text-pink-600"
            style={{ fontFamily: "Comic Sans MS, cursive" }}
          >
            ★☆★ 横須賀市ライフル射撃協会へようこそ ★☆★
          </p>
          <p className="mt-2 text-sm text-purple-700">
            神奈川県横須賀市のくりはま花の国エアライフル射撃場を拠点に活動
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
            src={heroImage}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 90vw, 896px"
            className="mx-auto h-auto w-full"
            alt="神奈川県横須賀市のライフル射撃協会 - くりはま花の国エアライフル射撃場で活動"
            priority
          />
        </div>

        {/* マーキー */}
        <div className="mb-6 overflow-hidden border-2 border-red-400 bg-yellow-100 py-2">
          <div className={`whitespace-nowrap ${styles.marquee}`}>
            <span className="mx-4 text-red-600" style={{ fontFamily: "Comic Sans MS, cursive" }}>
              📢 お知らせ：三県大口径射撃大会 6/7開催！ 📢 射撃教室 生徒募集中☆ 📢 月例会参加者募集！ 📢
            </span>
          </div>
        </div>

        {/* メールアドレス変更のお知らせ */}
        <section className="mb-6 border-4 border-red-500 bg-yellow-50 shadow-lg">
          <h2
            className="bg-gradient-to-r from-red-500 to-pink-500 px-3 py-2 text-center font-bold text-white"
            style={{ fontFamily: "Comic Sans MS, cursive" }}
          >
            📧 メールアドレス変更のお知らせ 📧
          </h2>
          <div className="p-4 text-center text-sm">
            <p className="font-bold">横須賀市ライフル射撃協会のメールアドレスを変更しました。</p>
            <dl className="mx-auto mt-3 inline-grid grid-cols-[auto_1fr] gap-x-2 gap-y-1 text-left">
              <dt className="font-bold">旧：</dt>
              <dd>yokosukarifle@yahoo.co.jp</dd>
              <dt className="font-bold text-red-700">新：</dt>
              <dd>
                <a
                  href="mailto:yokosukarifle@gmail.com"
                  className="font-bold text-blue-600 underline hover:text-red-600"
                >
                  yokosukarifle@gmail.com
                </a>
              </dd>
            </dl>
            <p className="mt-3">今後のお問い合わせは、新しいメールアドレスへお願いいたします。</p>
          </div>
        </section>

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
            {/* 講習会のお知らせ */}
            <section className="border-4 border-green-400 bg-green-50">
              <h2 className="bg-gradient-to-r from-green-400 to-green-600 px-3 py-1 font-bold text-white" style={{ fontFamily: "Comic Sans MS, cursive" }}>
                📖 射撃講習会のお知らせ 📖
              </h2>
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
            </section>

            {/* 射撃教室 */}
            <section className="border-4 border-pink-400 bg-pink-50">
              <h2 className="bg-gradient-to-r from-pink-400 to-pink-600 px-3 py-1 font-bold text-white" style={{ fontFamily: "Comic Sans MS, cursive" }}>
                🎯 【募集中】ライフル射撃教室 🎯
              </h2>
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
                    <a href="mailto:yokosukarifle@gmail.com" className="text-blue-600 underline hover:text-red-600">
                      yokosukarifle@gmail.com
                    </a>
                  </dd>
                  <dd className="ml-4">電話：046-833-6990</dd>
                </dl>
                <dl className="mt-2">
                  <dt className="font-bold">その他：</dt>
                  <dd className="ml-4">横須賀市在住・在学の小学5年生～中学1年生の方は補助が出ますので別途お問い合わせください。</dd>
                </dl>
              </div>
            </section>

            {/* 三県大口径大会 */}
            <section className="border-4 border-orange-400 bg-orange-50">
              <h2 className="bg-gradient-to-r from-orange-400 to-orange-600 px-3 py-1 font-bold text-white" style={{ fontFamily: "Comic Sans MS, cursive" }}>
                🔫 三県大口径射撃大会のご案内 🔫
              </h2>
              <div className="p-3 text-sm">
                <ul className="space-y-1">
                  <li><span className="font-bold">日時：</span>令和８年６月７日 (日) 午前８時集合</li>
                  <li><span className="font-bold">会場：</span>千葉県射撃場（市原市古敷谷2620　0436-98-0314）</li>
                  <li><span className="font-bold">種目：</span>40発伏射・40発ベンチレスト・クラウンマッチ</li>
                  <li><span className="font-bold">参加費：</span>6,000円</li>
                  <li><span className="font-bold">その他：</span>弁当・参加賞付き</li>
                  <li><span className="font-bold">申込先：</span>横須賀市ライフル射撃協会 (yokosukarifle@gmail.com)</li>
                  <li><span className="font-bold">申込締切：</span>5月27日 (水)</li>
                </ul>
              </div>
            </section>

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
            <section className="border-4 border-cyan-400 bg-cyan-50 transition-transform hover:scale-105">
              <Link href="/shooting-range" className="block">
              <h2 className="bg-gradient-to-r from-cyan-400 to-cyan-600 px-3 py-1 font-bold text-white" style={{ fontFamily: "Comic Sans MS, cursive" }}>
                🎯 神奈川県の射撃場案内 🎯
              </h2>
              <div className="p-2">
                <Image
                  src={rifleShootingImage}
                  alt="神奈川県横須賀市の射撃場 - くりはま花の国エアライフル射撃場"
                  sizes="(max-width: 768px) 280px, 300px"
                  className="mx-auto border-2 border-white shadow"
                />
                <p className="mt-2 text-center text-sm">
                  ▶ クリックして詳細を見る ◀
                </p>
              </div>
              </Link>
            </section>

            {/* カレンダー */}
            <section className="border-4 border-lime-400 bg-lime-50">
              <h2 className="bg-gradient-to-r from-lime-400 to-lime-600 px-3 py-1 font-bold text-white" style={{ fontFamily: "Comic Sans MS, cursive" }}>
                📅 射撃場・競技会予定表 📅
              </h2>
              <div className="bg-white p-2">
                <GoogleCalendar />
              </div>
            </section>
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
            <a href="mailto:yokosukarifle@gmail.com" className="text-blue-600 underline hover:text-red-600">
              yokosukarifle@gmail.com
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
