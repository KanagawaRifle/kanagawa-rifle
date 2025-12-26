import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Win95Window } from "@/components/win95-window";
import {
  getResults,
  getFiscalYears,
  groupResultsByDateAndEvent,
  formatDateJapanese,
  type ResultRecord,
} from "@/lib/competitions";

interface PageProps {
  params: Promise<{ year: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { year } = await params;
  return {
    title: `${year}年度 月例会（G4）結果 | 横須賀市ライフル射撃協会`,
    description: `${year}年度の月例会（G4）大会結果一覧。`,
  };
}

// Generate static params for all fiscal years
export async function generateStaticParams() {
  const fiscalYears = await getFiscalYears();
  return fiscalYears.map((fy) => ({
    year: fy.year.toString(),
  }));
}

function Win95Button({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const baseClasses =
    "inline-block px-4 py-1 text-sm font-bold border-2 border-t-white border-l-white border-r-[#808080] border-b-[#808080] bg-[#c0c0c0] [box-shadow:inset_-1px_-1px_0_0_#000000,inset_1px_1px_0_0_#dfdfdf] active:border-t-[#808080] active:border-l-[#808080] active:border-r-white active:border-b-white hover:bg-[#d4d4d4]";

  return (
    <Link href={href} className={baseClasses}>
      {children}
    </Link>
  );
}

// Results table component
function ResultsTable({ results }: { results: ResultRecord[] }) {
  const maxSeries = Math.max(...results.map((r) => r.series.length));

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[600px] text-xs">
        <thead>
          <tr className="bg-[#000080] text-white">
            <th
              rowSpan={2}
              className="w-12 border border-[#808080] p-1 text-center"
            >
              順位
            </th>
            <th
              rowSpan={2}
              className="w-28 border border-[#808080] p-1 text-left"
            >
              氏名
            </th>
            <th
              colSpan={maxSeries}
              className="border border-[#808080] p-1 text-center"
            >
              シリーズ
            </th>
            <th
              rowSpan={2}
              className="w-16 border border-[#808080] p-1 text-center"
            >
              合計
            </th>
            <th
              rowSpan={2}
              className="w-16 border border-[#808080] p-1 text-left"
            >
              備考
            </th>
          </tr>
          <tr className="bg-[#000080] text-white">
            {Array.from({ length: maxSeries }, (_, i) => (
              <th
                key={i}
                className="w-12 border border-[#808080] p-1 text-center"
              >
                {i + 1}
              </th>
            ))}
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
                    className="border border-[#808080] p-1"
                  />
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

  const results = await getResults({ year: fiscalYear });

  if (results.length === 0) {
    notFound();
  }

  const groupedResults = groupResultsByDateAndEvent(results);
  const dateEntries = Array.from(groupedResults.entries());

  return (
    <div className="min-h-screen bg-[#008080] p-4">
      <Win95Window
        title={`${fiscalYear}年度 月例会（G4）結果 - 横須賀市ライフル射撃協会`}
        icon="📊"
        className="mx-auto max-w-4xl"
      >
        <div className="border-2 border-b-white border-l-[#808080] border-r-white border-t-[#808080] bg-[#c0c0c0] p-2">
          {/* Back button */}
          <div className="mb-2">
            <Win95Button href="/competitions/monthly/results">
              ← 年度一覧に戻る
            </Win95Button>
          </div>

          {/* Header */}
          <div className="mb-4 flex flex-col items-center gap-2 border-2 border-b-white border-l-[#808080] border-r-white border-t-[#808080] bg-white p-4">
            <Image
              src="/images/button9.gif"
              alt="月例会"
              width={155}
              height={46}
            />
            <div className="mt-2 border-2 border-b-white border-l-[#808080] border-r-white border-t-[#808080] bg-[#000080] px-4 py-1">
              <span className="text-sm font-bold text-white">
                📊 {fiscalYear}年度 大会結果
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
                            🎯 {eventName}
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
              {fiscalYear}年度: {dateEntries.length}回開催
            </div>
            <div className="px-2 py-1 text-xs">横須賀市ライフル射撃協会</div>
          </div>
        </div>
      </Win95Window>
    </div>
  );
}
