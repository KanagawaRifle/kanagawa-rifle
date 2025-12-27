import type { Metadata } from "next";
import Image from "next/image";
import { Win95Window, Win95Button } from "../../_components";
import { getRifleClassFiscalYears } from "@/lib/rifle-shooting-class";

export const metadata: Metadata = {
  title: "ライフル射撃教室 大会結果 | 横須賀市ライフル射撃協会",
  description: "ライフル射撃教室の大会結果一覧。年度別に結果を閲覧できます。",
};

export default async function RifleShootingClassResultsPage() {
  const fiscalYears = await getRifleClassFiscalYears();

  return (
    <div className="min-h-screen bg-[#008080] p-4">
      <Win95Window
        title="ライフル射撃教室 大会結果 - 横須賀市ライフル射撃協会"
        icon="📊"
        className="mx-auto max-w-4xl"
      >
        <div className="border-2 border-b-white border-l-[#808080] border-r-white border-t-[#808080] bg-[#c0c0c0] p-2">
          {/* Navigation */}
          <div className="mb-2">
            <Win95Button href="/competitions/rifle-shooting-class">
              ← 戻る
            </Win95Button>
          </div>

          {/* Header */}
          <div className="mb-4 flex flex-col items-center gap-2 border-2 border-b-white border-l-[#808080] border-r-white border-t-[#808080] bg-white p-4">
            <Image
              src="/images/button222.gif"
              alt="ライフル射撃教室"
              width={155}
              height={46}
            />
            <div className="mt-2 border-2 border-b-white border-l-[#808080] border-r-white border-t-[#808080] bg-[#000080] px-4 py-1">
              <span className="text-sm font-bold text-white">
                📊 大会結果一覧
              </span>
            </div>
          </div>

          {/* Fiscal year list */}
          <div className="border-2 border-b-white border-l-[#808080] border-r-white border-t-[#808080] bg-white p-2">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#000080] text-white">
                  <th className="border border-[#808080] p-2 text-left">
                    年度
                  </th>
                  <th className="border border-[#808080] p-2 text-center">
                    開催回数
                  </th>
                  <th className="border border-[#808080] p-2 text-center">
                    期間
                  </th>
                  <th className="border border-[#808080] p-2 text-center">
                    詳細
                  </th>
                </tr>
              </thead>
              <tbody>
                {fiscalYears.map((fy, index) => {
                  // 令和: 2019年〜 (2019 = 令和元年)
                  // 平成: 〜2018年 (2018 = 平成30年)
                  const isReiwa = fy.year >= 2019;
                  const eraYear = isReiwa ? fy.year - 2018 : fy.year - 1988;
                  const eraName = isReiwa ? "令和" : "平成";
                  const displayYear = isReiwa && eraYear === 1 ? "元" : eraYear;
                  return (
                    <tr
                      key={fy.year}
                      className={index % 2 === 0 ? "bg-white" : "bg-[#f0f0f0]"}
                    >
                      <td className="border border-[#808080] p-2 font-bold">
                        📅 {eraName}{displayYear}年度
                      </td>
                      <td className="border border-[#808080] p-2 text-center">
                        {fy.count}回
                      </td>
                      <td className="border border-[#808080] p-2 text-center text-xs">
                        {fy.dateRange.start} ～ {fy.dateRange.end}
                      </td>
                      <td className="border border-[#808080] p-2 text-center">
                        <Win95Button
                          href={`/competitions/rifle-shooting-class/results/${fy.year}`}
                          variant="primary"
                        >
                          📄 結果を見る
                        </Win95Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Info box */}
          <div className="mt-4 border-2 border-b-white border-l-[#808080] border-r-white border-t-[#808080] bg-[#ffffcc] p-3">
            <p className="text-xs">
              <span className="font-bold">💡 ヒント:</span>{" "}
              年度は4月から翌年3月までです。
            </p>
          </div>

          {/* Status bar */}
          <div className="mt-4 flex border-2 border-b-white border-l-[#808080] border-r-white border-t-[#808080] bg-[#c0c0c0]">
            <div className="flex-1 border-r border-[#808080] px-2 py-1 text-xs">
              年度: {fiscalYears.length}件
            </div>
            <div className="px-2 py-1 text-xs">横須賀市ライフル射撃協会</div>
          </div>
        </div>
      </Win95Window>
    </div>
  );
}
