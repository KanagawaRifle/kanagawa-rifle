import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import { getOpengraphImageUrl } from "@/lib/server";
import { Win95Window, Win95Button } from "../../_components";

export const metadata: Metadata = {
  title: "市民大会結果 | 横須賀市ライフル射撃協会",
  description: "横須賀市民大会 兼 防衛大学対抗戦の結果一覧。2014年〜2017年の全結果を掲載。",
  openGraph: {
    images: [
      {
        url: getOpengraphImageUrl({
          title: "市民大会結果",
          subtitle: "横須賀市民大会結果一覧",
          theme: "win95",
        }),
        width: 1200,
        height: 630,
      },
    ],
  },
};

interface Result {
  rank: number;
  relay: string;
  name: string;
  affiliation: string;
  scores: number[];
  total: number;
  xCount: number;
  note: string;
}

interface EventData {
  event: string;
  results: Result[];
}

interface YearData {
  year: number;
  date: string;
  events: EventData[];
}

function parseCSV(csvContent: string): YearData[] {
  const lines = csvContent.trim().split("\n");
  const dataLines = lines.slice(1);

  const grouped: Map<string, Map<string, Result[]>> = new Map();

  for (const line of dataLines) {
    const cols = line.split(",");
    if (cols.length < 14) continue;

    const [, date, event, rankStr, relay, name, affiliation,
           s1, s2, s3, s4, totalStr, xCountStr, note] = cols;

    if (!date || !event) continue;

    if (!grouped.has(date)) {
      grouped.set(date, new Map());
    }
    const dateMap = grouped.get(date)!;
    if (!dateMap.has(event)) {
      dateMap.set(event, []);
    }

    const scores = [parseFloat(s1), parseFloat(s2), parseFloat(s3), parseFloat(s4)]
      .filter(s => s > 0);

    dateMap.get(event)!.push({
      rank: parseInt(rankStr, 10),
      relay,
      name,
      affiliation,
      scores,
      total: parseFloat(totalStr) || 0,
      xCount: parseInt(xCountStr, 10) || 0,
      note: note || "",
    });
  }

  const result: YearData[] = [];

  for (const [date, eventsMap] of grouped) {
    const match = date.match(/(\d{4})年/);
    const year = match ? parseInt(match[1], 10) : 2017;

    const events: EventData[] = [];
    for (const [event, results] of eventsMap) {
      events.push({
        event,
        results: results.sort((a, b) => a.rank - b.rank),
      });
    }

    // Sort events: ARS first, then others, then Hunting
    events.sort((a, b) => {
      const order = (e: string) => {
        if (e.includes("ARS")) return 1;
        if (e.includes("AP")) return 2;
        if (e.includes("50m")) return 3;
        if (e.includes("ハンティング")) return 4;
        return 3;
      };
      return order(a.event) - order(b.event);
    });

    result.push({ year, date, events });
  }

  result.sort((a, b) => b.year - a.year);
  return result;
}

function loadData(): YearData[] {
  const csvPath = path.join(process.cwd(), "app/competitions/citizens/results/_data/results.csv");
  const csvContent = fs.readFileSync(csvPath, "utf-8");
  return parseCSV(csvContent);
}

function getEventDisplayName(event: string): string {
  const names: Record<string, string> = {
    "ARS60": "ARS60の部",
    "ARS40": "ARS40の部",
    "AP60": "AP60の部",
    "50mP": "50mPの部",
    "50mP60": "50mP60の部",
    "50m3x20": "50m3x20の部",
    "ハンティング": "ハンティングの部",
    "ハンティング40": "ハンティング40の部",
  };
  return names[event] || event;
}

function hasSeriesScores(event: string): boolean {
  return event.includes("ARS") || event.includes("AP") || event.includes("50m");
}

function ResultTable({ eventData }: { eventData: EventData }) {
  const showSeries = hasSeriesScores(eventData.event);
  const showXCount = eventData.results.some(r => r.xCount > 0);
  const showNote = eventData.results.some(r => r.note);

  return (
    <div className="mb-4 border-2 border-b-white border-l-[#808080] border-r-white border-t-[#808080] bg-white">
      <div className="flex items-center gap-2 bg-gradient-to-r from-[#000080] to-[#1084d0] px-3 py-2">
        <span className="text-sm font-bold text-white">
          {getEventDisplayName(eventData.event)}
        </span>
      </div>
      <div className="overflow-x-auto p-3">
        <table className="w-full min-w-[400px] text-xs">
          <thead>
            <tr className="bg-[#000080] text-white">
              <th className="w-12 border border-[#808080] p-1 text-center">順位</th>
              <th className="w-14 border border-[#808080] p-1 text-center">射群</th>
              <th className="border border-[#808080] p-1 text-center">氏名</th>
              <th className="w-16 border border-[#808080] p-1 text-center">所属</th>
              {showSeries && (
                <>
                  <th className="w-12 border border-[#808080] p-1 text-center">1</th>
                  <th className="w-12 border border-[#808080] p-1 text-center">2</th>
                  <th className="w-12 border border-[#808080] p-1 text-center">3</th>
                  <th className="w-12 border border-[#808080] p-1 text-center">4</th>
                </>
              )}
              <th className="w-14 border border-[#808080] p-1 text-center">合計</th>
              {showXCount && (
                <th className="w-10 border border-[#808080] p-1 text-center">X</th>
              )}
              {showNote && (
                <th className="w-14 border border-[#808080] p-1 text-center">備考</th>
              )}
            </tr>
          </thead>
          <tbody>
            {eventData.results.map((result, idx) => (
              <tr
                key={`${result.rank}-${idx}`}
                className={idx % 2 === 0 ? "bg-white" : "bg-[#f0f0f0]"}
              >
                <td className="border border-[#808080] p-1 text-center">{result.rank}</td>
                <td className="border border-[#808080] p-1 text-center">{result.relay || "-"}</td>
                <td className="border border-[#808080] p-1 text-center">{result.name}</td>
                <td className="border border-[#808080] p-1 text-center">{result.affiliation || "-"}</td>
                {showSeries && (
                  <>
                    <td className="border border-[#808080] p-1 text-center">
                      {result.scores[0] || "-"}
                    </td>
                    <td className="border border-[#808080] p-1 text-center">
                      {result.scores[1] || "-"}
                    </td>
                    <td className="border border-[#808080] p-1 text-center">
                      {result.scores[2] || "-"}
                    </td>
                    <td className="border border-[#808080] p-1 text-center">
                      {result.scores[3] || "-"}
                    </td>
                  </>
                )}
                <td className="border border-[#808080] p-1 text-center font-bold">
                  {result.total || "-"}
                </td>
                {showXCount && (
                  <td className="border border-[#808080] p-1 text-center">{result.xCount}</td>
                )}
                {showNote && (
                  <td className="border border-[#808080] p-1 text-center text-[#ff0000]">
                    {result.note}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function CitizensResultsPage() {
  const data = loadData();

  return (
    <div className="min-h-screen bg-[#008080] p-4">
      <Win95Window
        title="市民大会結果 - 横須賀市ライフル射撃協会"
        icon="🏆"
        className="mx-auto max-w-4xl"
      >
        <div className="border-2 border-b-white border-l-[#808080] border-r-white border-t-[#808080] bg-[#c0c0c0] p-2">
          {/* Navigation */}
          <div className="mb-2">
            <Win95Button href="/competitions">← 戻る</Win95Button>
          </div>

          {/* Header */}
          <div className="mb-4 flex flex-col items-center gap-2 border-2 border-b-white border-l-[#808080] border-r-white border-t-[#808080] bg-white p-4">
            <h1 className="text-lg font-bold text-[#000080]">横須賀市民大会</h1>
            <p className="text-sm text-[#000080]">兼 防衛大学対抗戦</p>
            <p className="mt-2 text-sm">成績発表</p>
            <p className="text-xs text-gray-600">2014年〜2017年 全79名分の成績</p>
          </div>

          {/* Results by Year */}
          {data.map((yearData) => (
            <div key={yearData.date} className="mb-6">
              <div className="mb-2 border-2 border-b-white border-l-[#808080] border-r-white border-t-[#808080] bg-[#000080] px-4 py-2 text-center">
                <span className="text-lg font-bold text-white">{yearData.date}</span>
              </div>

              {yearData.events.map((eventData) => (
                <ResultTable key={eventData.event} eventData={eventData} />
              ))}
            </div>
          ))}

          {/* Legend */}
          <div className="mb-4 border-2 border-b-white border-l-[#808080] border-r-white border-t-[#808080] bg-[#ffffcc] p-3">
            <p className="mb-1 text-xs font-bold">凡例：</p>
            <ul className="list-inside list-disc text-xs">
              <li><span className="text-[#ff0000]">DNS</span>: Did Not Start（棄権）</li>
              <li>X: 10点圏（インナーテン）の数</li>
            </ul>
          </div>

          {/* Status bar */}
          <div className="mt-4 flex border-2 border-b-white border-l-[#808080] border-r-white border-t-[#808080] bg-[#c0c0c0]">
            <div className="flex-1 border-r border-[#808080] px-2 py-1 text-xs">
              横須賀市民大会 兼 防衛大学対抗戦
            </div>
            <div className="px-2 py-1 text-xs">横須賀市ライフル射撃協会</div>
          </div>
        </div>
      </Win95Window>
    </div>
  );
}
