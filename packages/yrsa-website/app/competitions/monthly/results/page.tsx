import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { promises as fs } from "fs";
import path from "path";
import { Win95Window } from "@/components/win95-window";

export const metadata: Metadata = {
  title: "月例会（G4）結果 | 横須賀市ライフル射撃協会",
  description: "月例会（G4）の大会結果一覧。年度別に結果を閲覧できます。",
};

function Win95Button({
  href,
  children,
  variant = "default",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "default" | "primary";
}) {
  const baseClasses =
    "inline-block px-4 py-1 text-sm font-bold border-2 border-t-white border-l-white border-r-[#808080] border-b-[#808080] [box-shadow:inset_-1px_-1px_0_0_#000000,inset_1px_1px_0_0_#dfdfdf] active:border-t-[#808080] active:border-l-[#808080] active:border-r-white active:border-b-white";
  const variantClasses =
    variant === "primary"
      ? "bg-[#000080] text-white hover:bg-[#0000aa]"
      : "bg-[#c0c0c0] text-black hover:bg-[#d4d4d4]";

  return (
    <Link href={href} className={`${baseClasses} ${variantClasses}`}>
      {children}
    </Link>
  );
}

// Get fiscal year from date (April = start of fiscal year)
function getFiscalYear(dateStr: string): number {
  const date = new Date(dateStr);
  const month = date.getMonth() + 1; // 1-12
  const year = date.getFullYear();
  // April-March fiscal year: April onwards = current year, Jan-March = previous year
  return month >= 4 ? year : year - 1;
}

// Get available fiscal years from CSV
async function getFiscalYears(): Promise<
  { year: number; count: number; dateRange: string }[]
> {
  const csvPath = path.join(
    process.cwd(),
    "data/competitions/monthly/results.csv"
  );
  const csvText = await fs.readFile(csvPath, "utf-8");
  const lines = csvText.split(/\r?\n/);

  // Count events per fiscal year
  const yearCounts = new Map<number, Set<string>>();

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const dateStr = line.split(",")[0];
    if (!dateStr) continue;

    const fiscalYear = getFiscalYear(dateStr);
    if (!yearCounts.has(fiscalYear)) {
      yearCounts.set(fiscalYear, new Set());
    }
    yearCounts.get(fiscalYear)!.add(dateStr);
  }

  // Convert to array and sort descending
  const result = Array.from(yearCounts.entries())
    .map(([year, dates]) => {
      const sortedDates = Array.from(dates).sort();
      const firstDate = sortedDates[0];
      const lastDate = sortedDates[sortedDates.length - 1];
      return {
        year,
        count: dates.size,
        dateRange: `${firstDate} ～ ${lastDate}`,
      };
    })
    .sort((a, b) => b.year - a.year);

  return result;
}

export default async function MonthlyResultsPage() {
  const fiscalYears = await getFiscalYears();

  return (
    <div className="min-h-screen bg-[#008080] p-4">
      <Win95Window
        title="月例会（G4）結果 - 横須賀市ライフル射撃協会"
        icon="📊"
        className="mx-auto max-w-4xl"
      >
        <div className="border-2 border-b-white border-l-[#808080] border-r-white border-t-[#808080] bg-[#c0c0c0] p-2">
          {/* Back button */}
          <div className="mb-2">
            <Win95Button href="/competitions/monthly">← 戻る</Win95Button>
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
                {fiscalYears.map((fy, index) => (
                  <tr
                    key={fy.year}
                    className={index % 2 === 0 ? "bg-white" : "bg-[#f0f0f0]"}
                  >
                    <td className="border border-[#808080] p-2 font-bold">
                      📅 {fy.year}年度
                    </td>
                    <td className="border border-[#808080] p-2 text-center">
                      {fy.count}回
                    </td>
                    <td className="border border-[#808080] p-2 text-center text-xs">
                      {fy.dateRange}
                    </td>
                    <td className="border border-[#808080] p-2 text-center">
                      <Win95Button
                        href={`/competitions/monthly/results/${fy.year}`}
                        variant="primary"
                      >
                        📄 結果を見る
                      </Win95Button>
                    </td>
                  </tr>
                ))}
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
