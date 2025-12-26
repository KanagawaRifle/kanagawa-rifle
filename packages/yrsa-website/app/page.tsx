import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Clock, Calendar, ChevronRight, Info } from "lucide-react";

export const metadata: Metadata = {
  title: "くりはま花の国エアライフル射撃場 | 神奈川県横須賀市の射撃場",
  description: "くりはま花の国エアライフル射撃場は、神奈川県横須賀市に所在する横須賀市営のエアライフル射撃場です。",
};

export default function ShootingRangePage() {
  return (
    <div className="space-y-12">
      {/* ヒーロー画像 */}
      <div className="overflow-hidden rounded-xl border-4 border-white shadow-lg">
        <picture>
          <source srcSet="/images/shooting-range/hero.webp, /images/shooting-range/hero-2x.webp 2x" type="image/webp" />
          <Image src="/images/shooting-range/hero.jpg" alt="くりはま花の国エアライフル射撃場の外観" width={800} height={450} className="w-full object-cover" priority />
        </picture>
      </div>

      {/* 重要なお知らせ */}
      <section className="rounded-lg border-l-8 border-amber-500 bg-amber-50 p-5 shadow-sm">
        <div className="flex items-start gap-3">
          <Info className="mt-0.5 h-6 w-6 text-amber-600" />
          <div>
            <h3 className="font-bold text-amber-900">来場前のお願い</h3>
            <p className="mt-1 text-sm leading-relaxed text-amber-800">
              大会等で利用できない日がございます。ご来場前に必ずスケジュールをご確認ください。
            </p>
          </div>
        </div>
      </section>

      {/* 基本情報カード */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="flex items-center gap-5 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-emerald-50">
            <Clock className="h-8 w-8 text-emerald-700" />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">開場時間</p>
            <p className="text-2xl font-black text-gray-900">8:30 - 21:00</p>
            <p className="text-sm text-gray-600">最終受付 20:00</p>
          </div>
        </div>
        <div className="flex items-center gap-5 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-emerald-50">
            <Calendar className="h-8 w-8 text-emerald-700" />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">休場日</p>
            <p className="text-2xl font-black text-gray-900">毎週月曜日</p>
            <p className="text-sm text-gray-600">祝日の場合は翌日</p>
          </div>
        </div>
      </div>

      {/* 施設詳細テーブル */}
      <section>
        <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold text-gray-900">
          <span className="h-8 w-1.5 rounded-full bg-emerald-700"></span>
          施設概要
        </h2>
        <div className="overflow-hidden rounded-xl border border-gray-300 shadow-sm">
          <table className="w-full text-left border-collapse">
            <tbody className="divide-y divide-gray-200">
            {[
              { label: "射座数", value: "8射座" },
              { label: "射撃距離", value: "10m" },
              { label: "標的", value: "電子標的（Meyton）/ ビーム標的（興東電子）" },
              { label: "使用可能な銃", value: "空気銃" },
              { label: "形式", value: "覆道式" },
              { label: "駐車場", value: "普通車用7台・障害者用1台（無料）" },
            ].map((item, idx) => (
              <tr key={idx} className="group">
                <th className="w-1/3 bg-gray-50 px-6 py-4 text-sm font-bold text-gray-700 group-hover:bg-gray-100 transition-colors">
                  {item.label}
                </th>
                <td className="px-6 py-4 text-base text-gray-800 bg-white group-hover:bg-gray-50 transition-colors">
                  {item.value}
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 公認情報 */}
      <section className="rounded-xl bg-gray-100 p-6">
        <h2 className="mb-4 text-lg font-bold text-gray-800">公認・指定</h2>
        <ul className="space-y-3">
          <li className="flex items-center gap-3 text-sm text-gray-700 bg-white p-3 rounded-lg shadow-sm">
            <div className="h-2 w-2 rounded-full bg-emerald-600" />
            神奈川県公安委員会指令第10号（平成11年5月2日）
          </li>
          <li className="flex items-center gap-3 text-sm text-gray-700 bg-white p-3 rounded-lg shadow-sm">
            <div className="h-2 w-2 rounded-full bg-emerald-600" />
            日本ライフル射撃協会公認射撃場 第305号（平成12年2月19日）
          </li>
        </ul>
      </section>

      {/* リンクエリア */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Link href="/shooting-range/guide" className="group flex items-center justify-between rounded-xl border-2 border-emerald-600 bg-white p-5 transition-all hover:bg-emerald-600">
          <div>
            <p className="text-lg font-bold text-emerald-700 group-hover:text-white">利用案内を見る</p>
            <p className="text-xs text-gray-500 group-hover:text-emerald-100">料金・営業時間・利用手順</p>
          </div>
          <ChevronRight className="h-6 w-6 text-emerald-600 group-hover:text-white" />
        </Link>
        <Link href="/shooting-range/access" className="group flex items-center justify-between rounded-xl border-2 border-emerald-600 bg-white p-5 transition-all hover:bg-emerald-600">
          <div>
            <p className="text-lg font-bold text-emerald-700 group-hover:text-white">アクセスを見る</p>
            <p className="text-xs text-gray-500 group-hover:text-emerald-100">交通案内・駐車場詳細</p>
          </div>
          <ChevronRight className="h-6 w-6 text-emerald-600 group-hover:text-white" />
        </Link>
      </div>
    </div>
  );
}
