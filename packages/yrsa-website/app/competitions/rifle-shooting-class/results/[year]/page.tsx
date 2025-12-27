import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Win95Window, Win95Button } from "../../../_components";
import {
  getRifleClassResults,
  getRifleClassFiscalYears,
  groupRifleClassResultsByDateAndEvent,
  formatDateJapanese,
  type ResultRecord,
} from "@/lib/rifle-shooting-class";

interface PageProps {
  params: Promise<{ year: string }>;
}

// 西暦から和暦に変換
function toJapaneseEra(year: number): string {
  // 令和: 2019年〜 (2019 = 令和元年)
  // 平成: 〜2018年 (2018 = 平成30年)
  if (year >= 2019) {
    const eraYear = year - 2018;
    return `令和${eraYear === 1 ? "元" : eraYear}`;
  } else {
    const eraYear = year - 1988;
    return `平成${eraYear}`;
  }
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { year } = await params;
  const japaneseEra = toJapaneseEra(parseInt(year));
  return {
    title: `${japaneseEra}年度 ライフル射撃教室 大会結果 | 横須賀市ライフル射撃協会`,
    description: `${japaneseEra}年度のライフル射撃教室大会結果一覧。`,
  };
}

// Generate static params for all fiscal years
export async function generateStaticParams() {
  const fiscalYears = await getRifleClassFiscalYears();
  return fiscalYears.map((fy) => ({
    year: fy.year.toString(),
  }));
}

function ResultsTable({ results }: { results: ResultRecord[] }) {
  const maxSeries = Math.max(...results.map((r) => r.series.length));

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[500px] text-xs">
        <thead>
          <tr className="bg-[#000080] text-white">
            <th className="w-12 border border-[#808080] p-1 text-center">
              順位
            </th>
            <th className="w-28 border border-[#808080] p-1 text-left">氏名</th>
            {Array.from({ length: maxSeries }, (_, i) => (
              <th
                key={i}
                className="w-12 border border-[#808080] p-1 text-center"
              >
                {i + 1}
              </th>
            ))}
            <th className="w-14 border border-[#808080] p-1 text-center">
              合計
            </th>
            <th className="w-16 border border-[#808080] p-1 text-left">備考</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result, idx) => (
            <tr
              key={`${result.name}-${result.rank}-${idx}`}
              className={idx % 2 === 0 ? "bg-white" : "bg-[#f0f0f0]"}
            >
              <td className="border border-[#808080] p-1 text-center">
                {result.rank}
              </td>
              <td className="border border-[#808080] p-1">{result.name}</td>
              {result.series.map((score, i) => (
                <td
                  key={i}
                  className="border border-[#808080] p-1 text-center"
                >
                  {score}
                </td>
              ))}
              {Array.from(
                { length: maxSeries - result.series.length },
                (_, i) => (
                  <td
                    key={`empty-${i}`}
                    className="border border-[#808080] p-1 text-center"
                  >
                    -
                  </td>
                )
              )}
              <td className="border border-[#808080] p-1 text-center font-bold">
                {result.total}
              </td>
              <td className="border border-[#808080] p-1">{result.remarks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default async function FiscalYearResultsPage({ params }: PageProps) {
  const { year } = await params;
  const fiscalYear = parseInt(year);

  if (isNaN(fiscalYear)) {
    notFound();
  }

  const results = await getRifleClassResults({ year: fiscalYear });

  if (results.length === 0) {
    notFound();
  }

  const groupedResults = groupRifleClassResultsByDateAndEvent(results);
  const dateEntries = Array.from(groupedResults.entries());

  // Convert fiscal year to Japanese era
  const japaneseEra = toJapaneseEra(fiscalYear);

  return (
    <div className="min-h-screen bg-[#008080] p-4">
      <Win95Window
        title={`${japaneseEra}年度 ライフル射撃教室 大会結果 - 横須賀市ライフル射撃協会`}
        icon="📊"
        className="mx-auto max-w-4xl"
      >
        <div className="border-2 border-b-white border-l-[#808080] border-r-white border-t-[#808080] bg-[#c0c0c0] p-2">
          {/* Back button */}
          <div className="mb-2">
            <Win95Button href="/competitions/rifle-shooting-class/results">
              ← 年度一覧に戻る
            </Win95Button>
          </div>

          {/* Header */}
          <div className="mb-4 flex flex-col items-center gap-2 border-2 border-b-white border-l-[#808080] border-r-white border-t-[#808080] bg-white p-4">
            <Image
              src="/images/icon-shooting-class.gif"
              alt="ライフル射撃教室"
              width={155}
              height={46}
            />
            <div className="mt-2 border-2 border-b-white border-l-[#808080] border-r-white border-t-[#808080] bg-[#000080] px-4 py-1">
              <span className="text-sm font-bold text-white">
                📊 {japaneseEra}年度 大会結果
              </span>
            </div>
          </div>

          {/* Results by date */}
          {dateEntries.map(([dateStr, eventGroups]) => (
            <div
              key={dateStr}
              className="mb-4 border-2 border-b-white border-l-[#808080] border-r-white border-t-[#808080] bg-white"
            >
              {/* Date header */}
              <div className="flex items-center gap-2 bg-gradient-to-r from-[#000080] to-[#1084d0] px-3 py-2">
                <span className="text-sm font-bold text-white">
                  📅 {formatDateJapanese(dateStr)}
                </span>
              </div>

              {/* Events for this date */}
              <div className="p-3">
                {Array.from(eventGroups.entries()).map(
                  ([eventName, eventResults], eventIdx) => (
                    <div key={eventName} className={eventIdx > 0 ? "mt-4" : ""}>
                      {/* Event name header */}
                      <div className="mb-2 flex items-center gap-2">
                        <div className="border-2 border-b-white border-l-[#808080] border-r-white border-t-[#808080] bg-[#c0c0c0] px-2 py-0.5">
                          <span className="text-xs font-bold">
                            🎯 10m {eventName}
                          </span>
                        </div>
                      </div>
                      {/* Results table */}
                      <ResultsTable results={eventResults} />
                    </div>
                  )
                )}
              </div>
            </div>
          ))}

          {/* Info box */}
          <div className="mt-4 border-2 border-b-white border-l-[#808080] border-r-white border-t-[#808080] bg-[#ffffcc] p-3">
            <p className="text-xs">
              <span className="font-bold">💡 ヒント:</span>{" "}
              テーブルは横スクロールできます。
            </p>
          </div>

          {/* Status bar */}
          <div className="mt-4 flex border-2 border-b-white border-l-[#808080] border-r-white border-t-[#808080] bg-[#c0c0c0]">
            <div className="flex-1 border-r border-[#808080] px-2 py-1 text-xs">
              {japaneseEra}年度: {dateEntries.length}回開催
            </div>
            <div className="px-2 py-1 text-xs">横須賀市ライフル射撃協会</div>
          </div>
        </div>
      </Win95Window>
    </div>
  );
}
