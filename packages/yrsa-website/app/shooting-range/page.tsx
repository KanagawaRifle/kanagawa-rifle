import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Clock, Calendar, ChevronRight } from "lucide-react";
import { getOpengraphImageUrl } from "@/lib/server";

export const metadata: Metadata = {
  title: "くりはま花の国エアライフル射撃場 | 神奈川県横須賀市の射撃場",
  description:
    "くりはま花の国エアライフル射撃場は、神奈川県横須賀市に所在する横須賀市営のエアライフル射撃場です。",
  openGraph: {
    images: [
      {
        url: getOpengraphImageUrl({
          title: "射撃場案内",
          subtitle: "くりはま花の国エアライフル射撃場",
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
  "@type": "SportsActivityLocation",
  name: "くりはま花の国エアライフル射撃場",
  description:
    "神奈川県横須賀市に所在する横須賀市営のエアライフル射撃場。日本ライフル射撃協会公認射撃場。",
  url: "https://yokosuka-rifle.jp/shooting-range",
  telephone: "046-833-6990",
  email: "yokosukarifle@yahoo.co.jp",
  address: {
    "@type": "PostalAddress",
    streetAddress: "神明町1番地",
    addressLocality: "横須賀市",
    addressRegion: "神奈川県",
    postalCode: "239-0832",
    addressCountry: "JP",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 35.221668,
    longitude: 139.70727,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "08:30",
      closes: "21:00",
    },
  ],
  amenityFeature: [
    {
      "@type": "LocationFeatureSpecification",
      name: "駐車場",
      value: "普通車用7台・障害者用1台（無料）",
    },
    {
      "@type": "LocationFeatureSpecification",
      name: "射座数",
      value: "8射座",
    },
    {
      "@type": "LocationFeatureSpecification",
      name: "射撃距離",
      value: "10m",
    },
  ],
  isAccessibleForFree: false,
  publicAccess: true,
};

export default function ShootingRangePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="space-y-8">
        {/* ヒーロー画像 */}
        <div className="overflow-hidden rounded-lg border border-gray-200">
        <picture>
          <source
            srcSet="/images/shooting-range/hero.webp, /images/shooting-range/hero-2x.webp 2x"
            type="image/webp"
          />
          <Image
            src="/images/shooting-range/hero.jpg"
            alt="くりはま花の国エアライフル射撃場の外観"
            width={800}
            height={450}
            className="w-full object-cover"
            priority
          />
        </picture>
      </div>

      {/* お知らせ */}
      <section className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
        <div className="flex items-center gap-2">
          <span className="flex-shrink-0 whitespace-nowrap rounded bg-emerald-600 px-2 py-0.5 text-xs font-bold text-white">
            お知らせ
          </span>
          <p className="text-sm text-gray-700">
            大会等で利用できない日がございます。ご来場前にスケジュールをご確認ください。
          </p>
        </div>
      </section>

      {/* クイック情報 */}
      <section aria-labelledby="quick-info-heading">
        <h2 id="quick-info-heading" className="sr-only">基本情報</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex items-center gap-4 rounded-lg border border-gray-200 bg-white p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
              <Clock aria-hidden="true" className="h-6 w-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">開場時間</p>
              <p className="text-lg font-bold text-gray-800">8:30 - 21:00</p>
              <p className="text-xs text-gray-600">最終受付 20:00</p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-lg border border-gray-200 bg-white p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
              <Calendar aria-hidden="true" className="h-6 w-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">休場日</p>
              <p className="text-lg font-bold text-gray-800">毎週月曜日</p>
              <p className="text-xs text-gray-600">祝日の場合は翌日</p>
            </div>
          </div>
        </div>
      </section>

      {/* 施設概要 */}
      <section>
        <h2 className="mb-4 border-l-4 border-emerald-600 pl-3 text-xl font-bold text-gray-800">
          施設概要
        </h2>
        <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
          <table className="w-full min-w-[320px]">
            <caption className="sr-only">射撃場の施設情報</caption>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <th scope="row" className="w-1/3 bg-gray-50 px-4 py-3 text-left text-sm font-medium text-gray-700">
                  射座数
                </th>
                <td className="px-4 py-3 text-sm text-gray-800">8射座</td>
              </tr>
              <tr>
                <th scope="row" className="bg-gray-50 px-4 py-3 text-left text-sm font-medium text-gray-700">
                  射撃距離
                </th>
                <td className="px-4 py-3 text-sm text-gray-800">10m</td>
              </tr>
              <tr>
                <th scope="row" className="bg-gray-50 px-4 py-3 text-left text-sm font-medium text-gray-700">
                  標的
                </th>
                <td className="px-4 py-3 text-sm text-gray-800">
                  電子標的（Meyton）
                  <br />
                  ビーム標的（興東電子）
                </td>
              </tr>
              <tr>
                <th scope="row" className="bg-gray-50 px-4 py-3 text-left text-sm font-medium text-gray-700">
                  使用可能な銃
                </th>
                <td className="px-4 py-3 text-sm text-gray-800">空気銃</td>
              </tr>
              <tr>
                <th scope="row" className="bg-gray-50 px-4 py-3 text-left text-sm font-medium text-gray-700">
                  形式
                </th>
                <td className="px-4 py-3 text-sm text-gray-800">覆道式</td>
              </tr>
              <tr>
                <th scope="row" className="bg-gray-50 px-4 py-3 text-left text-sm font-medium text-gray-700">
                  駐車場
                </th>
                <td className="px-4 py-3 text-sm text-gray-800">
                  普通車用7台・障害者用1台
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 公認情報 */}
      <section>
        <h2 className="mb-4 border-l-4 border-emerald-600 pl-3 text-xl font-bold text-gray-800">
          公認・指定
        </h2>
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <span aria-hidden="true" className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-600"></span>
              <span className="text-sm text-gray-700">
                神奈川県公安委員会指令第10号（平成11年5月2日）
              </span>
            </li>
            <li className="flex items-center gap-2">
              <span aria-hidden="true" className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-600"></span>
              <span className="text-sm text-gray-700">
                日本ライフル射撃協会公認射撃場 第305号（平成12年2月19日）
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* 関連リンク */}
      <section>
        <h2 className="mb-4 border-l-4 border-emerald-600 pl-3 text-xl font-bold text-gray-800">
          ご利用にあたって
        </h2>
        <div className="grid gap-3 md:grid-cols-2">
          <Link
            href="/shooting-range/guide"
            className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4 transition-all hover:border-emerald-300 hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          >
            <div>
              <p className="font-medium text-gray-800">利用案内</p>
              <p className="text-sm text-gray-600">
                料金・営業時間・ご利用方法
              </p>
            </div>
            <ChevronRight aria-hidden="true" className="h-5 w-5 text-gray-400" />
          </Link>
          <Link
            href="/shooting-range/access"
            className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4 transition-all hover:border-emerald-300 hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          >
            <div>
              <p className="font-medium text-gray-800">アクセス</p>
              <p className="text-sm text-gray-600">交通案内・駐車場</p>
            </div>
            <ChevronRight aria-hidden="true" className="h-5 w-5 text-gray-400" />
          </Link>
        </div>
      </section>
      </div>
    </>
  );
}
