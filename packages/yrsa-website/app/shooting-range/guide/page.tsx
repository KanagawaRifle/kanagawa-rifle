import type { Metadata } from "next";
import { Clock, Banknote, AlertCircle, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "利用案内 | くりはま花の国エアライフル射撃場",
  description:
    "くりはま花の国エアライフル射撃場の営業時間、料金、利用方法をご案内します。",
};

export default function ShootingRangeGuidePage() {
  return (
    <div className="space-y-8">
      {/* 営業時間 */}
      <section>
        <div className="mb-4 flex items-center gap-2">
          <Clock className="h-6 w-6 text-emerald-700" />
          <h2 className="text-xl font-bold text-gray-800">営業時間</h2>
        </div>
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white ">
          <table className="w-full">
            <tbody className="divide-y divide-gray-200">
              <tr>
                <th className="w-1/3 bg-gray-50 px-4 py-3 text-left text-sm font-medium text-gray-700">
                  開場時間
                </th>
                <td className="px-4 py-3 text-sm text-gray-800">
                  8:30～21:00
                  <span className="ml-2 text-gray-500">
                    （最終受付 20:00）
                  </span>
                </td>
              </tr>
              <tr>
                <th className="bg-gray-50 px-4 py-3 text-left text-sm font-medium text-gray-700">
                  ビームライフル受付
                </th>
                <td className="px-4 py-3 text-sm text-gray-800">
                  9:00～15:00
                  <span className="ml-2 text-gray-500">
                    （小学5年生以上）
                  </span>
                </td>
              </tr>
              <tr>
                <th className="bg-gray-50 px-4 py-3 text-left text-sm font-medium text-gray-700">
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
        <p className="mt-2 text-sm text-gray-500">
          ※大会等により利用できない日がございます。下記カレンダーでご確認ください。
        </p>
      </section>

      {/* カレンダー */}
      <section>
        <h2 className="mb-4 border-l-4 border-emerald-600 pl-3 text-xl font-bold text-gray-800">
          スケジュール
        </h2>
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white ">
          <div className="relative h-0 w-full" style={{ paddingTop: "75%" }}>
            <iframe
              className="absolute left-0 top-0 h-full w-full"
              src="https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23ffffff&ctz=Asia%2FTokyo&showTitle=0&src=MGVkNzRmNjkyY2M2ODY4OGIwZGZiYWU4MjNiMzlkNzQ5NDFjZTRjYjBmNzEyMjBhOTQ0YWRlMTNmMzVlZWMzZkBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&color=%23059669"
              title="射撃場スケジュール"
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </section>

      {/* 利用料金 */}
      <section>
        <div className="mb-4 flex items-center gap-2">
          <Banknote className="h-6 w-6 text-emerald-700" />
          <h2 className="text-xl font-bold text-gray-800">利用料金</h2>
        </div>
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white ">
          <table className="w-full">
            <thead>
              <tr className="bg-emerald-700 text-white">
                <th className="px-4 py-3 text-left text-sm font-medium">
                  区分
                </th>
                <th className="px-4 py-3 text-center text-sm font-medium">
                  市内
                </th>
                <th className="px-4 py-3 text-center text-sm font-medium">
                  市外
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-4 py-3 text-sm font-medium text-gray-800">
                  大人（1時間）
                </td>
                <td className="px-4 py-3 text-center text-sm text-gray-800">
                  260円
                </td>
                <td className="px-4 py-3 text-center text-sm text-gray-800">
                  520円
                </td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-4 py-3 text-sm font-medium text-gray-800">
                  小中高生（1時間）
                </td>
                <td className="px-4 py-3 text-center text-sm text-gray-800">
                  160円
                </td>
                <td className="px-4 py-3 text-center text-sm text-gray-800">
                  360円
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-medium text-gray-800">
                  ビームライフルレンタル
                </td>
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
        <p className="mt-2 text-sm text-gray-500">
          ※横須賀市内在住・在勤・在学の方は市内料金が適用されます。
        </p>
      </section>

      {/* ご利用の流れ */}
      <section>
        <h2 className="mb-4 border-l-4 border-emerald-600 pl-3 text-xl font-bold text-gray-800">
          ご利用の流れ
        </h2>
        <div className="space-y-4">
          <div className="flex gap-4 rounded-lg border border-gray-200 bg-white p-4 ">
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white">
              1
            </div>
            <div>
              <h3 className="font-medium text-gray-800">利用券のご購入</h3>
              <p className="mt-1 text-sm text-gray-600">
                アーチェリー場手前の事務所に券売機がございます。ご利用時間等に応じて利用券をお求めください。
              </p>
            </div>
          </div>
          <div className="flex gap-4 rounded-lg border border-gray-200 bg-white p-4 ">
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white">
              2
            </div>
            <div>
              <h3 className="font-medium text-gray-800">受付</h3>
              <p className="mt-1 text-sm text-gray-600">
                エアライフル場はアーチェリー場を抜けた先にございます。場内に入りましたら受付で購入した利用券をお渡しください。
              </p>
            </div>
          </div>
          <div className="flex gap-4 rounded-lg border border-gray-200 bg-white p-4 ">
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white">
              3
            </div>
            <div>
              <h3 className="font-medium text-gray-800">お帰りの際</h3>
              <p className="mt-1 text-sm text-gray-600">
                お預かりした利用券にご利用時間を記載しお返しいたします。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 注意事項 */}
      <section>
        <div className="mb-4 flex items-center gap-2">
          <AlertCircle className="h-6 w-6 text-emerald-700" />
          <h2 className="text-xl font-bold text-gray-800">ご利用上の注意</h2>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-4 ">
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-600" />
              <span className="text-sm text-gray-700">
                当射撃場は銃刀法による空気銃の射撃場です。BB弾を使用するトイガン（玩具）の射撃場ではございません。
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-600" />
              <span className="text-sm text-gray-700">
                銃刀法による銃所持者でなくても楽しめるビームライフルをご用意しています。
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-600" />
              <span className="text-sm text-gray-700">
                係員の指示に従い、安全にご利用ください。
              </span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
