import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { getOpengraphImageUrl } from "@/lib/server";
import { FAQSchema, Breadcrumb } from "@/components";

export const metadata: Metadata = {
  title: "利用案内 | 神奈川県横須賀市の射撃場【くりはま花の国】",
  description:
    "神奈川県横須賀市の射撃場「くりはま花の国エアライフル射撃場」の営業時間・料金・利用方法。ビームライフル体験可能、初心者歓迎。",
  openGraph: {
    images: [
      {
        url: getOpengraphImageUrl({
          title: "利用案内",
          subtitle: "営業時間・料金・利用方法",
          theme: "modern",
        }),
        width: 1200,
        height: 630,
      },
    ],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "利用案内 | くりはま花の国エアライフル射撃場",
  description: "くりはま花の国エアライフル射撃場の営業時間、料金、利用方法をご案内します。",
  url: "https://yokosuka-rifle.jp/shooting-range/guide",
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "ホーム",
        item: "https://yokosuka-rifle.jp/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "射撃場",
        item: "https://yokosuka-rifle.jp/shooting-range",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "利用案内",
        item: "https://yokosuka-rifle.jp/shooting-range/guide",
      },
    ],
  },
  mainEntity: {
    "@type": "Service",
    name: "エアライフル射撃場利用",
    provider: {
      "@type": "SportsActivityLocation",
      name: "くりはま花の国エアライフル射撃場",
    },
    offers: [
      {
        "@type": "Offer",
        name: "大人（1時間・市内）",
        price: "260",
        priceCurrency: "JPY",
      },
      {
        "@type": "Offer",
        name: "大人（1時間・市外）",
        price: "520",
        priceCurrency: "JPY",
      },
      {
        "@type": "Offer",
        name: "小中高生（1時間・市内）",
        price: "160",
        priceCurrency: "JPY",
      },
      {
        "@type": "Offer",
        name: "小中高生（1時間・市外）",
        price: "360",
        priceCurrency: "JPY",
      },
      {
        "@type": "Offer",
        name: "ビームライフルレンタル",
        price: "760",
        priceCurrency: "JPY",
      },
    ],
  },
};

// よくある質問
const faqItems = [
  {
    question: "営業時間は何時から何時までですか？",
    answer: "8:30から21:00まで営業しています。最終受付は20:00です。ビームライフルの受付は9:00から15:00までです。",
  },
  {
    question: "休場日はいつですか？",
    answer: "毎週月曜日が休場日です。祝日の場合は翌日が休場日となります。また、年末年始（12月29日〜1月3日）も休場です。",
  },
  {
    question: "利用料金はいくらですか？",
    answer: "大人は1時間260円（市内）または520円（市外）です。小中高生は1時間160円（市内）または360円（市外）です。ビームライフルレンタルは760円です。",
  },
  {
    question: "銃を持っていなくても利用できますか？",
    answer: "はい、ビームライフル（光線銃）をレンタルできます。小学5年生以上の方がご利用いただけます。銃刀法の許可は不要です。",
  },
  {
    question: "予約は必要ですか？",
    answer: "通常のご利用には予約は不要です。ただし、大会等で利用できない日がありますので、事前にスケジュールをご確認ください。",
  },
  {
    question: "初心者でも射撃体験はできますか？",
    answer: "はい、初心者の方でもビームライフルで射撃体験ができます。係員が丁寧に指導いたしますので、初めての方も安心してご利用いただけます。",
  },
  {
    question: "神奈川県内で射撃場を探しています。どこにありますか？",
    answer: "くりはま花の国エアライフル射撃場は神奈川県横須賀市神明町1番地にあります。京急久里浜駅からバスで約5分です。無料駐車場も完備しています。",
  },
];

export default function ShootingRangeGuidePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <FAQSchema items={faqItems} />
      <div className="space-y-8">
        {/* パンくずリスト */}
        <Breadcrumb
          items={[{ name: "射撃場", href: "/shooting-range" }]}
          current="利用案内"
        />

        {/* 営業時間 */}
      <section>
        <h2 className="mb-4 border-l-4 border-emerald-600 pl-3 text-xl font-bold text-gray-800">
          営業時間
        </h2>
        <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
          <table className="w-full min-w-[320px]">
            <caption className="sr-only">営業時間の詳細</caption>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <th scope="row" className="w-1/3 bg-gray-50 px-4 py-3 text-left text-sm font-medium text-gray-700">
                  開場時間
                </th>
                <td className="px-4 py-3 text-sm text-gray-800">
                  8:30～21:00
                  <span className="ml-2 text-gray-600">
                    （最終受付 20:00）
                  </span>
                </td>
              </tr>
              <tr>
                <th scope="row" className="bg-gray-50 px-4 py-3 text-left text-sm font-medium text-gray-700">
                  ビームライフル受付
                </th>
                <td className="px-4 py-3 text-sm text-gray-800">
                  9:00～15:00
                  <span className="ml-2 text-gray-600">
                    （小学5年生以上）
                  </span>
                </td>
              </tr>
              <tr>
                <th scope="row" className="bg-gray-50 px-4 py-3 text-left text-sm font-medium text-gray-700">
                  休場日
                </th>
                <td className="px-4 py-3 text-sm text-gray-800">
                  毎週月曜日（祝日の場合は翌日）
                  <br />
                  年末年始（12月29日～1月3日）
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-sm text-gray-600">
          ※大会等により利用できない日がございます。下記カレンダーでご確認ください。
        </p>
      </section>

      {/* カレンダー */}
      <section>
        <h2 className="mb-4 border-l-4 border-emerald-600 pl-3 text-xl font-bold text-gray-800">
          スケジュール
        </h2>
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white ">
          <div className="relative h-0 w-full overflow-hidden rounded-lg" style={{ paddingTop: "75%" }}>
            <iframe
              className="absolute left-0 top-0 h-full w-full rounded-lg"
              src="https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23ffffff&ctz=Asia%2FTokyo&showTitle=0&src=MGVkNzRmNjkyY2M2ODY4OGIwZGZiYWU4MjNiMzlkNzQ5NDFjZTRjYjBmNzEyMjBhOTQ0YWRlMTNmMzVlZWMzZkBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&color=%23059669"
              title="射撃場スケジュール"
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </section>

      {/* 利用料金 */}
      <section>
        <h2 className="mb-4 border-l-4 border-emerald-600 pl-3 text-xl font-bold text-gray-800">
          利用料金
        </h2>
        <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
          <table className="w-full min-w-[320px]">
            <caption className="sr-only">利用料金表</caption>
            <thead>
              <tr className="bg-emerald-700 text-white">
                <th scope="col" className="px-4 py-3 text-left text-sm font-medium">
                  区分
                </th>
                <th scope="col" className="px-4 py-3 text-center text-sm font-medium">
                  市内
                </th>
                <th scope="col" className="px-4 py-3 text-center text-sm font-medium">
                  市外
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <th scope="row" className="px-4 py-3 text-left text-sm font-medium text-gray-800">
                  大人（1時間）
                </th>
                <td className="px-4 py-3 text-center text-sm text-gray-800">
                  260円
                </td>
                <td className="px-4 py-3 text-center text-sm text-gray-800">
                  520円
                </td>
              </tr>
              <tr className="bg-gray-50">
                <th scope="row" className="px-4 py-3 text-left text-sm font-medium text-gray-800">
                  小中高生（1時間）
                </th>
                <td className="px-4 py-3 text-center text-sm text-gray-800">
                  160円
                </td>
                <td className="px-4 py-3 text-center text-sm text-gray-800">
                  360円
                </td>
              </tr>
              <tr>
                <th scope="row" className="px-4 py-3 text-left text-sm font-medium text-gray-800">
                  ビームライフルレンタル
                </th>
                <td
                  className="px-4 py-3 text-center text-sm text-gray-800"
                  colSpan={2}
                >
                  760円
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-sm text-gray-600">
          ※横須賀市内在住・在勤・在学の方は市内料金が適用されます。
        </p>
      </section>

      {/* ご利用の流れ */}
      <section>
        <h2 className="mb-4 border-l-4 border-emerald-600 pl-3 text-xl font-bold text-gray-800">
          ご利用の流れ
        </h2>
        <ol className="space-y-4">
          <li className="flex gap-4 rounded-lg border border-gray-200 bg-white p-4">
            <div aria-hidden="true" className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white">
              1
            </div>
            <div>
              <h3 className="font-medium text-gray-800">利用券のご購入</h3>
              <p className="mt-1 text-sm text-gray-600">
                アーチェリー場手前の事務所に券売機がございます。ご利用時間等に応じて利用券をお求めください。
              </p>
            </div>
          </li>
          <li className="flex gap-4 rounded-lg border border-gray-200 bg-white p-4">
            <div aria-hidden="true" className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white">
              2
            </div>
            <div>
              <h3 className="font-medium text-gray-800">受付</h3>
              <p className="mt-1 text-sm text-gray-600">
                エアライフル場はアーチェリー場を抜けた先にございます。場内に入りましたら受付で購入した利用券をお渡しください。
              </p>
            </div>
          </li>
          <li className="flex gap-4 rounded-lg border border-gray-200 bg-white p-4">
            <div aria-hidden="true" className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white">
              3
            </div>
            <div>
              <h3 className="font-medium text-gray-800">お帰りの際</h3>
              <p className="mt-1 text-sm text-gray-600">
                お預かりした利用券にご利用時間を記載しお返しいたします。
              </p>
            </div>
          </li>
        </ol>
      </section>

      {/* 注意事項 */}
      <section>
        <h2 className="mb-4 border-l-4 border-emerald-600 pl-3 text-xl font-bold text-gray-800">
          ご利用上の注意
        </h2>
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle2 aria-hidden="true" className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-600" />
              <span className="text-sm text-gray-700">
                当射撃場は銃刀法による空気銃の射撃場です。BB弾を使用するトイガン（玩具）の射撃場ではございません。
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 aria-hidden="true" className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-600" />
              <span className="text-sm text-gray-700">
                銃刀法による銃所持者でなくても楽しめるビームライフルをご用意しています。
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 aria-hidden="true" className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-600" />
              <span className="text-sm text-gray-700">
                係員の指示に従い、安全にご利用ください。
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* ビームライフル体験 */}
      <section>
        <h2 className="mb-4 border-l-4 border-emerald-600 pl-3 text-xl font-bold text-gray-800">
          ビームライフル体験（射撃体験）
        </h2>
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <p className="mb-3 text-sm leading-relaxed text-gray-700">
            銃の所持許可がなくても、小学5年生以上の方ならどなたでもビームライフル（光線銃）を使った射撃体験ができます。
            ビームライフルは実弾を使用せず、赤外線を使用するため安全です。オリンピック競技と同じ感覚でライフル射撃を体験できます。
          </p>
          <div className="rounded border border-emerald-200 bg-emerald-50 p-3">
            <p className="text-sm font-medium text-emerald-800">ビームライフル体験のポイント</p>
            <ul className="mt-2 space-y-1 text-sm text-emerald-700">
              <li>・ 銃の所持許可不要 - どなたでも体験可能</li>
              <li>・ 小学5年生以上から参加OK</li>
              <li>・ レンタル料金：760円（時間無制限）</li>
              <li>・ 受付時間：9:00〜15:00</li>
            </ul>
          </div>
        </div>
      </section>
      </div>
    </>
  );
}
