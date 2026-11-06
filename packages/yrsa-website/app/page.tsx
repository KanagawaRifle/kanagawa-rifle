import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { getOpengraphImageUrl } from '@/lib/server';

import heroImage from './_assets/hero.gif';
import rifleShootingImage from './_assets/rifle-shooting.jpg';
import { GoogleCalendar } from './_components';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'ライフル射撃・射撃場なら横須賀市ライフル射撃協会【神奈川県】',
  description:
    '神奈川県横須賀市のライフル射撃団体。くりはま花の国エアライフル射撃場で射撃体験・競技会を開催。初心者向け射撃教室あり。エアライフル・ビームライフルの練習が可能。',
  keywords: [
    'ライフル射撃',
    '射撃',
    '射撃場',
    '神奈川県',
    '横須賀市',
    'エアライフル',
    'ビームライフル',
    '射撃体験',
    '射撃教室',
    'くりはま花の国',
    '横須賀市ライフル射撃協会',
    '月例会',
    '競技会',
  ],
  openGraph: {
    title: 'ライフル射撃・射撃場なら横須賀市ライフル射撃協会',
    description: '神奈川県横須賀市のライフル射撃団体。射撃体験・競技会開催中。初心者歓迎。',
    images: [
      {
        url: getOpengraphImageUrl({
          title: '横須賀市ライフル射撃協会',
          subtitle: '神奈川県の射撃団体',
          theme: 'default',
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
        {/* 営業再開のお知らせ */}
        <section aria-labelledby="closure-notice-title" className="mb-6 border-4 border-red-700 bg-yellow-50 shadow-lg">
          <h2
            id="closure-notice-title"
            className="bg-red-700 px-4 py-3 text-center text-xl font-bold text-white md:text-2xl"
          >
            【重要】射撃場営業再開のお知らせ
          </h2>
          <div className="space-y-4 p-4 text-center text-red-950 md:p-6">
            <p className="leading-relaxed">
              休場していたくりはま花の国エアライフル射撃場は、2026年10月17日（土）から営業を再開いたします。
            </p>
            <div className="border-2 border-red-700 bg-white p-3">
              <p className="font-bold">営業再開日</p>
              <p className="mt-1 text-2xl font-bold text-red-800 md:text-3xl">
                <time dateTime="2026-10-17">2026年10月17日（土）</time>
              </p>
            </div>
            <p className="leading-relaxed font-bold">
              <time dateTime="2026-10-24">10月24日（土）</time>の月例会は、通常通り開催予定です。
            </p>
            <p className="text-sm leading-relaxed">
              休場期間中はご不便をおかけしました。皆さまのご利用をお待ちしております。
            </p>
          </div>
        </section>

        {/* ウェルカムヘッダー */}
        <div className="mb-6 border-4 border-double border-purple-600 bg-gradient-to-r from-pink-200 via-yellow-100 to-cyan-200 p-4 text-center shadow-lg">
          <h1
            className="mb-2 text-2xl font-bold text-purple-800 md:text-3xl"
            style={{ fontFamily: 'Comic Sans MS, cursive' }}
          >
            神奈川県のライフル射撃・射撃場
          </h1>
          <p className="text-xl text-pink-600" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
            ★☆★ 横須賀市ライフル射撃協会へようこそ ★☆★
          </p>
          <p className="mt-2 text-sm text-purple-700">神奈川県横須賀市のくりはま花の国エアライフル射撃場を拠点に活動</p>
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
            <span className="mx-4 text-red-600" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
              📢 重要：くりはま花の国エアライフル射撃場は、2026年10月17日（土）から営業を再開いたします。 📢
            </span>
          </div>
        </div>

        {/* 故 岡田榮三元会長をしのぶ会のご案内 */}
        <section
          aria-labelledby="memorial-gathering-notice-title"
          className="mb-6 border-4 border-gray-600 bg-white shadow-lg"
        >
          <h2
            id="memorial-gathering-notice-title"
            className="bg-gray-700 px-4 py-2 text-center text-lg font-bold text-white md:text-xl"
          >
            故 岡田榮三元会長をしのぶ会のご案内
          </h2>
          <div className="space-y-3 p-4 text-sm leading-relaxed text-gray-900 md:p-6">
            <p className="text-right">令和8年10月31日</p>
            <p>関係者各位</p>
            <p className="text-right">
              発起人代表
              <br />
              群馬県ライフル射撃協会 有志一同
              <br />
              神奈川県ライフル射撃協会 廣田眞作
            </p>
            <p>謹啓 秋冷の候、皆様におかれましてはご健勝のことと拝察申し上げます。</p>
            <p className="indent-4">
              さて、群馬県ライフル射撃協会会長として長年にわたりご尽力され、関東ブロックをはじめライフル射撃競技の発展に多大なご貢献をされた岡田榮三様が、令和8年5月31日、73歳でご逝去されました。
            </p>
            <p className="indent-4">
              ご葬儀はご家族のご意向により、会員の皆様にはご参列いただく機会がございませんでした。つきましては、故
              岡田榮三元会長をしのび、そのご功績に感謝するとともに、皆様と故人の思い出を語り合う会を下記のとおり開催いたします。
            </p>
            <p className="indent-4">ご多用のところ恐縮ではございますが、ご出席賜りますようお願い申し上げます。</p>
            <p className="indent-4">
              なお、お食事および献花の準備の都合上、ご出席の際は必ず事前にお申し込みくださいますようお願いいたします。
            </p>
            <p className="text-right">謹白</p>
            <p className="text-center font-bold">記</p>
            <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1">
              <dt className="font-bold">日時</dt>
              <dd>
                <time dateTime="2026-12-06">令和8年12月6日（日）</time> 午前11時から
              </dd>
              <dt className="font-bold">会場</dt>
              <dd>群馬県ライフル射撃場</dd>
              <dt className="font-bold">所在地</dt>
              <dd>〒370-3505 群馬県北群馬郡榛東村大字上野原字吾妻山2番17</dd>
              <dt className="font-bold">会費</dt>
              <dd>5,000円</dd>
              <dt className="font-bold">申込締切</dt>
              <dd>
                <time dateTime="2026-11-20">令和8年11月20日（金）</time>
              </dd>
              <dt className="font-bold">申込先</dt>
              <dd>
                神奈川県ライフル射撃協会・横須賀市ライフル射撃協会
                <br />
                E-mail：
                <a href="mailto:yokosukarifle@gmail.com" className="text-blue-600 underline hover:text-red-600">
                  yokosukarifle@gmail.com
                </a>
                <br />
                TEL／FAX：046-833-6990
              </dd>
            </dl>
            <h3 className="border-b-2 border-gray-600 pt-2 font-bold">会費振込先</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <h4 className="font-bold">ゆうちょ銀行からお振り込みの場合</h4>
                <dl className="mt-1 grid grid-cols-[auto_1fr] gap-x-1">
                  <dt>記号：</dt>
                  <dd>10280</dd>
                  <dt>番号：</dt>
                  <dd>79647111</dd>
                  <dt>口座名義：</dt>
                  <dd>特定非営利活動法人 神奈川県ライフル射撃協会</dd>
                </dl>
              </div>
              <div>
                <h4 className="font-bold">他の金融機関からお振り込みの場合</h4>
                <dl className="mt-1 grid grid-cols-[auto_1fr] gap-x-1">
                  <dt>銀行名：</dt>
                  <dd>ゆうちょ銀行</dd>
                  <dt>店名：</dt>
                  <dd>〇二八店（ゼロニハチ店）</dd>
                  <dt>口座番号：</dt>
                  <dd>7964711</dd>
                  <dt>口座名義：</dt>
                  <dd>トクヒ）カナガワケンライフルシヤゲキキョウカイ</dd>
                </dl>
              </div>
            </div>
            <p className="text-right">以上</p>
          </div>
        </section>

        {/* 2カラムレイアウト */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* 左カラム */}
          <div className="space-y-4">
            {/* メールアドレス変更のお知らせ */}
            <section className="border-4 border-red-500 bg-yellow-50 shadow-lg">
              <h2
                className="bg-gradient-to-r from-red-500 to-pink-500 px-3 py-2 text-center font-bold text-white"
                style={{ fontFamily: 'Comic Sans MS, cursive' }}
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

            {/* 講習会のお知らせ */}
            <section className="border-4 border-green-400 bg-green-50">
              <h2
                className="bg-gradient-to-r from-green-400 to-green-600 px-3 py-1 font-bold text-white"
                style={{ fontFamily: 'Comic Sans MS, cursive' }}
              >
                📖 射撃講習会のお知らせ 📖
              </h2>
              <div className="p-3 text-sm">
                <p>
                  <strong className="underline">月例会参加者限定</strong>
                  で、下記の講習会を毎月開催しております（受講料3,000円）。
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
              <h2
                className="bg-gradient-to-r from-pink-400 to-pink-600 px-3 py-1 font-bold text-white"
                style={{ fontFamily: 'Comic Sans MS, cursive' }}
              >
                🎯 【募集中】ライフル射撃教室 🎯
              </h2>
              <div className="p-3 text-sm">
                <p className="font-bold">💕 初心者から丁寧に教えます ✨</p>
                <p className="mt-2 font-bold">毎週火曜日・木曜日1時間程度 (17:00～20:00の間)</p>
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
                  <dd className="ml-4">
                    横須賀市在住・在学の小学5年生～中学1年生の方は補助が出ますので別途お問い合わせください。
                  </dd>
                </dl>
              </div>
            </section>

            {/* 三県大口径長瀞大会 */}
            <section className="border-4 border-orange-400 bg-orange-50">
              <h2
                className="bg-gradient-to-r from-orange-400 to-orange-600 px-3 py-1 font-bold text-white"
                style={{ fontFamily: 'Comic Sans MS, cursive' }}
              >
                🔫 三県大口径長瀞大会のご案内 🔫
              </h2>
              <div className="p-3 text-sm">
                <ul className="space-y-1">
                  <li>
                    <span className="font-bold">日時：</span>令和８年９月５日 (土) 午前８時集合
                  </li>
                  <li>
                    <span className="font-bold">会場：</span>埼玉県長瀞総合射撃場（0494-66-1111）
                  </li>
                  <li>
                    <span className="font-bold">種目：</span>60発伏射・40発ベンチレスト・クラウンマッチ
                  </li>
                  <li>
                    <span className="font-bold">参加費：</span>
                    60発伏射：7,500円・40発ベンチレスト：7,000円・クラウンマッチ：7,000円
                  </li>
                  <li>
                    <span className="font-bold">その他：</span>弁当・参加賞付き
                  </li>
                  <li>
                    <span className="font-bold">申込先：</span>横須賀市ライフル射撃協会 (yokosukarifle@gmail.com)
                  </li>
                  <li>
                    <span className="font-bold">申込締切：</span>8月26日 (水)
                  </li>
                </ul>
              </div>
            </section>

            {/* 工事中バナー */}
            <div className="flex items-center justify-center gap-2 border-2 border-yellow-600 bg-yellow-200 p-2">
              <span className="text-2xl">🚧</span>
              <span
                className="animate-pulse font-bold text-yellow-800"
                style={{ fontFamily: 'Comic Sans MS, cursive' }}
              >
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
                <h2
                  className="bg-gradient-to-r from-cyan-400 to-cyan-600 px-3 py-1 font-bold text-white"
                  style={{ fontFamily: 'Comic Sans MS, cursive' }}
                >
                  🎯 神奈川県の射撃場案内 🎯
                </h2>
                <div className="p-2">
                  <Image
                    src={rifleShootingImage}
                    alt="神奈川県横須賀市の射撃場 - くりはま花の国エアライフル射撃場"
                    sizes="(max-width: 768px) 280px, 300px"
                    className="mx-auto border-2 border-white shadow"
                  />
                  <p className="mt-2 text-center text-sm">▶ クリックして詳細を見る ◀</p>
                </div>
              </Link>
            </section>

            {/* カレンダー */}
            <section className="border-4 border-lime-400 bg-lime-50">
              <h2
                className="bg-gradient-to-r from-lime-400 to-lime-600 px-3 py-1 font-bold text-white"
                style={{ fontFamily: 'Comic Sans MS, cursive' }}
              >
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
          <p style={{ fontFamily: 'Comic Sans MS, cursive' }} className="text-purple-700">
            ～ご意見・ご感想お待ちしています～
          </p>
          <p className="mt-1 text-sm">
            📧{' '}
            <a href="mailto:yokosukarifle@gmail.com" className="text-blue-600 underline hover:text-red-600">
              yokosukarifle@gmail.com
            </a>
          </p>
          <p className="mt-2 text-xs text-gray-600">Since 1957 / Last Update: 2026.11.06</p>
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
