import type { Metadata } from "next";
import Image from "next/image";
import { Win95Window, Win95Button } from "../../_components";

export const metadata: Metadata = {
  title: "ライフル射撃教室 大会結果 | 横須賀市ライフル射撃協会",
  description: "ライフル射撃教室の大会結果一覧。",
};

interface ResultRecord {
  name: string;
  series: (number | null)[];
  total: number;
  remarks?: string;
}

interface DateResults {
  date: string;
  dayOfWeek: string;
  events: {
    name: string;
    results: ResultRecord[];
  }[];
}

// 令和6年度 results data
const fiscalYear2024Results: DateResults[] = [
  {
    date: "9月26日",
    dayOfWeek: "木",
    events: [
      {
        name: "10m BR40BR",
        results: [
          { name: "市川 武", series: [101.8, 102.6, 103.9, 102.8], total: 411.1 },
          { name: "市川 結絹", series: [105.3, 105.5, 105.1, 106.1], total: 422.0 },
          { name: "大畠 凛太郎", series: [102.2, 102.6, 104.2, 100.2], total: 409.2 },
          { name: "田村 愛來", series: [106.3, 105.3, 104.8, 105.4], total: 421.8 },
          { name: "矢作 航輝", series: [95.5, 87.5, 87.6, 85.6], total: 356.2 },
          { name: "吉川 剛正", series: [98.6, 101.1, 101.6, 97.8], total: 399.1 },
          { name: "吉川 武志", series: [97.0, 96.5, 100.7, 100.2], total: 394.4 },
        ],
      },
    ],
  },
  {
    date: "8月22日",
    dayOfWeek: "土",
    events: [
      {
        name: "10m BR40BR",
        results: [
          { name: "市川 武", series: [103.2, 103.6, 100.8, 97.8], total: 405.4 },
          { name: "市川 結絹", series: [103.7, 104.1, 105.3, 103.3], total: 416.4 },
          { name: "大畠 凛太郎", series: [102.9, 101.9, 103.2, 100.3], total: 408.3 },
          { name: "田村 愛來", series: [104.5, 102.9, 104.9, 105.4], total: 417.7 },
          { name: "矢作 航輝", series: [84.3, 83.0, 74.9, 80.8], total: 323.0 },
        ],
      },
    ],
  },
  {
    date: "7月25日",
    dayOfWeek: "土",
    events: [
      {
        name: "10m BR40BR",
        results: [
          { name: "田村 愛來", series: [103.6, 103.2, 104.7, 104.4], total: 415.9 },
          { name: "矢作 航輝", series: [77.2, 72.8, 77.4, 84.5], total: 311.9 },
        ],
      },
    ],
  },
  {
    date: "6月27日",
    dayOfWeek: "土",
    events: [
      {
        name: "10m BR40BR",
        results: [
          { name: "市川 武", series: [101.3, 105.4, 103.6, 104.3], total: 414.6 },
          { name: "市川 結絹", series: [96.6, 102.9, 103.3, 99.0], total: 401.8 },
          { name: "大畠 凛太郎", series: [93.9, 88.8, 90.0, 89.9], total: 362.6 },
          { name: "小室 美栄子", series: [99.2, 102.4, 102.6, 101.7], total: 405.9 },
          { name: "田村 愛來", series: [103.6, 103.7, 103.9, 102.6], total: 413.8 },
          { name: "矢作 航輝", series: [83.9, 88.0, 89.0, 88.7], total: 349.6 },
        ],
      },
    ],
  },
];

function ResultsTable({ results }: { results: ResultRecord[] }) {
  const maxSeries = Math.max(...results.map((r) => r.series.length));

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[500px] text-xs">
        <thead>
          <tr className="bg-[#000080] text-white">
            <th className="w-28 border border-[#808080] p-1 text-left">氏名</th>
            {Array.from({ length: maxSeries }, (_, i) => (
              <th key={i} className="w-12 border border-[#808080] p-1 text-center">
                {i + 1}
              </th>
            ))}
            <th className="w-14 border border-[#808080] p-1 text-center">合計</th>
            <th className="w-16 border border-[#808080] p-1 text-left">備考</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result, idx) => (
            <tr
              key={`${result.name}-${idx}`}
              className={idx % 2 === 0 ? "bg-white" : "bg-[#f0f0f0]"}
            >
              <td className="border border-[#808080] p-1">{result.name}</td>
              {result.series.map((score, i) => (
                <td key={i} className="border border-[#808080] p-1 text-center">
                  {score ?? "-"}
                </td>
              ))}
              {Array.from({ length: maxSeries - result.series.length }, (_, i) => (
                <td key={`empty-${i}`} className="border border-[#808080] p-1 text-center">
                  -
                </td>
              ))}
              <td className="border border-[#808080] p-1 text-center font-bold">
                {result.total}
              </td>
              <td className="border border-[#808080] p-1">{result.remarks ?? ""}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function RifleShootingClassResultsPage() {
  return (
    <div className="min-h-screen bg-[#008080] p-4">
      <Win95Window
        title="ライフル射撃教室 大会結果 - 横須賀市ライフル射撃協会"
        icon="📊"
        className="mx-auto max-w-4xl"
      >
        <div className="border-2 border-b-white border-l-[#808080] border-r-white border-t-[#808080] bg-[#c0c0c0] p-2">
          {/* Back button */}
          <div className="mb-2">
            <Win95Button href="/competitions">← 戻る</Win95Button>
          </div>

          {/* Header */}
          <div className="mb-4 flex flex-col items-center gap-2 border-2 border-b-white border-l-[#808080] border-r-white border-t-[#808080] bg-white p-4">
            <Image
              src="/images/button222.gif"
              alt="ライフル射撃教室"
              width={155}
              height={46}
            />
            <div className="mt-2 flex items-center gap-2">
              <div className="border-2 border-b-white border-l-[#808080] border-r-white border-t-[#808080] bg-[#000080] px-4 py-1">
                <span className="text-sm font-bold text-white">
                  📊 令和6年度 大会結果
                </span>
              </div>
            </div>
          </div>

          {/* Results by date */}
          {fiscalYear2024Results.map((dateResult) => (
            <div
              key={dateResult.date}
              className="mb-4 border-2 border-b-white border-l-[#808080] border-r-white border-t-[#808080] bg-white"
            >
              {/* Date header */}
              <div className="flex items-center gap-2 bg-gradient-to-r from-[#000080] to-[#1084d0] px-3 py-2">
                <span className="text-sm font-bold text-white">
                  📅 {dateResult.date} ({dateResult.dayOfWeek})
                </span>
              </div>

              {/* Events for this date */}
              <div className="p-3">
                {dateResult.events.map((event, eventIdx) => (
                  <div key={event.name} className={eventIdx > 0 ? "mt-4" : ""}>
                    {/* Event name header */}
                    <div className="mb-2 flex items-center gap-2">
                      <div className="border-2 border-b-white border-l-[#808080] border-r-white border-t-[#808080] bg-[#c0c0c0] px-2 py-0.5">
                        <span className="text-xs font-bold">🎯 {event.name}</span>
                      </div>
                    </div>
                    {/* Results table */}
                    <ResultsTable results={event.results} />
                  </div>
                ))}
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
              令和6年度: {fiscalYear2024Results.length}回開催
            </div>
            <div className="px-2 py-1 text-xs">横須賀市ライフル射撃協会</div>
          </div>
        </div>
      </Win95Window>
    </div>
  );
}
