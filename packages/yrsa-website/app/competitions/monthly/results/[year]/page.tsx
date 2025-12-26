import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { promises as fs } from "fs";
import path from "path";
import { Win95Window } from "@/components/win95-window";

interface PageProps {
  params: Promise<{ year: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { year } = await params;
  return {
    title: `${year}年度 月例会（G4）結果 | 横須賀市ライフル射撃協会`,
    description: `${year}年度の月例会（G4）大会結果一覧。`,
  };
}

// Generate static params for all fiscal years
export async function generateStaticParams() {
  const csvPath = path.join(
    process.cwd(),
    "data/competitions/monthly/results.csv"
  );
  const csvText = await fs.readFile(csvPath, "utf-8");
  const lines = csvText.split(/\r?\n/);

  const fiscalYears = new Set<number>();

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const dateStr = line.split(",")[0];
    if (!dateStr) continue;

    const fiscalYear = getFiscalYear(dateStr);
    fiscalYears.add(fiscalYear);
  }

  return Array.from(fiscalYears).map((year) => ({
    year: year.toString(),
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

// Record type for competition results
interface ResultRecord {
  date: string;
  event: string;
  rank: number;
  name: string;
  series: number[];
  total: number;
  remarks: string;
}

// Event display order
const EVENT_ORDER = ["AR60S", "AP60", "HR40", "BR60S", "BR40FR", "BP60"];

// Get fiscal year from date (April = start of fiscal year)
function getFiscalYear(dateStr: string): number {
  const date = new Date(dateStr);
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return month >= 4 ? year : year - 1;
}

// Parse CSV line handling quoted values
function parseCSVLine(line: string): string[] {
  const values: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === "," && !inQuotes) {
      values.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }
  values.push(current.trim());
  return values;
}

// Parse CSV text to records
function parseCSV(csvText: string): ResultRecord[] {
  const lines = csvText.split(/\r?\n/);
  const records: ResultRecord[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const values = parseCSVLine(line);
    if (values.length < 6) continue;

    const seriesStr = values[4];
    const series = seriesStr.split("|").map((s) => parseFloat(s.trim()));

    records.push({
      date: values[0],
      event: values[1],
      rank: parseInt(values[2]),
      name: values[3],
      series,
      total: parseFloat(values[5]),
      remarks: values[6] || "",
    });
  }

  return records;
}

// Sort events by defined order
function sortEvents(events: string[]): string[] {
  return events.sort((a, b) => {
    const indexA = EVENT_ORDER.indexOf(a);
    const indexB = EVENT_ORDER.indexOf(b);

    if (indexA !== -1 && indexB !== -1) return indexA - indexB;
    if (indexA !== -1) return -1;
    if (indexB !== -1) return 1;
    return a.localeCompare(b);
  });
}

// Format date to Japanese display format
function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const weekdays = ["日", "月", "火", "水", "木", "金", "土"];
  return `${date.getMonth() + 1}月${date.getDate()}日 (${weekdays[date.getDay()]})`;
}

// Load results data for a specific fiscal year
async function getResultsForYear(
  fiscalYear: number
): Promise<Map<string, Map<string, ResultRecord[]>> | null> {
  const csvPath = path.join(
    process.cwd(),
    "data/competitions/monthly/results.csv"
  );
  const csvText = await fs.readFile(csvPath, "utf-8");
  const allRecords = parseCSV(csvText);

  // Filter by fiscal year
  const records = allRecords.filter(
    (record) => getFiscalYear(record.date) === fiscalYear
  );

  if (records.length === 0) {
    return null;
  }

  // Group by date
  const dateGroups = new Map<string, ResultRecord[]>();
  records.forEach((record) => {
    const existing = dateGroups.get(record.date) || [];
    existing.push(record);
    dateGroups.set(record.date, existing);
  });

  // Sort dates descending and group by event within each date
  const sortedDates = Array.from(dateGroups.keys()).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime()
  );

  const result = new Map<string, Map<string, ResultRecord[]>>();

  sortedDates.forEach((dateStr) => {
    const eventGroups = new Map<string, ResultRecord[]>();
    const dayRecords = dateGroups.get(dateStr) || [];

    dayRecords.forEach((record) => {
      const existing = eventGroups.get(record.event) || [];
      existing.push(record);
      eventGroups.set(record.event, existing);
    });

    // Sort events within each date
    const sortedEventGroups = new Map<string, ResultRecord[]>();
    const sortedEventNames = sortEvents(Array.from(eventGroups.keys()));
    sortedEventNames.forEach((eventName) => {
      const eventRecords = eventGroups.get(eventName) || [];
      eventRecords.sort((a, b) => a.rank - b.rank);
      sortedEventGroups.set(eventName, eventRecords);
    });

    result.set(dateStr, sortedEventGroups);
  });

  return result;
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

  const results = await getResultsForYear(fiscalYear);

  if (!results) {
    notFound();
  }

  const dateEntries = Array.from(results.entries());

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
                  📅 {formatDate(dateStr)}
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
