import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import { Win95Window, Win95Button } from "../../_components";

export const metadata: Metadata = {
  title: "狩猟銃射撃大会結果 | 横須賀市ライフル射撃協会",
  description: "狩猟銃射撃大会の結果一覧。平成25年度〜平成28年度の全結果を掲載。",
};

interface Result {
  rank: number;
  name: string;
  gun: string;
  caliber: string;
  itaku: number;
  hiji: number;
  ritsu: number;
  total: number;
}

interface Round {
  round: number;
  dateRange: string;
  scoringType: "ring" | "point";
  results: Result[];
}

interface FiscalYearData {
  fiscalYear: string;
  westernYear: number;
  rounds: Round[];
}

function parseCSV(csvContent: string): FiscalYearData[] {
  const lines = csvContent.trim().split("\n");
  const dataLines = lines.slice(1); // Skip header

  // Group by fiscal year and round
  const grouped: Map<string, Map<number, { dateRange: string; scoringType: "ring" | "point"; results: Result[] }>> = new Map();

  for (const line of dataLines) {
    const cols = line.split(",");
    if (cols.length < 12) continue;

    const [fiscalYear, roundStr, dateRange, rankStr, name, gun, caliber, itakuStr, hijiStr, ritsuStr, totalStr, scoringType] = cols;

    if (!grouped.has(fiscalYear)) {
      grouped.set(fiscalYear, new Map());
    }
    const fyMap = grouped.get(fiscalYear)!;
    const roundNum = parseInt(roundStr, 10);

    if (!fyMap.has(roundNum)) {
      fyMap.set(roundNum, {
        dateRange: dateRange || "",
        scoringType: scoringType as "ring" | "point",
        results: [],
      });
    }

    fyMap.get(roundNum)!.results.push({
      rank: parseInt(rankStr, 10),
      name,
      gun: gun || "",
      caliber: caliber || "",
      itaku: parseFloat(itakuStr) || 0,
      hiji: parseFloat(hijiStr) || 0,
      ritsu: parseFloat(ritsuStr) || 0,
      total: parseFloat(totalStr) || 0,
    });
  }

  // Convert to array and sort
  const result: FiscalYearData[] = [];

  for (const [fiscalYear, roundsMap] of grouped) {
    const match = fiscalYear.match(/平成(\d+)年度/);
    const heiseiYear = match ? parseInt(match[1], 10) : 28;
    const westernYear = 1988 + heiseiYear;

    const rounds: Round[] = [];
    for (const [roundNum, data] of roundsMap) {
      rounds.push({
        round: roundNum,
        dateRange: data.dateRange,
        scoringType: data.scoringType,
        results: data.results.sort((a, b) => a.rank - b.rank),
      });
    }
    rounds.sort((a, b) => b.round - a.round); // Sort rounds descending

    result.push({
      fiscalYear,
      westernYear,
      rounds,
    });
  }

  // Sort fiscal years descending
  result.sort((a, b) => b.westernYear - a.westernYear);

  return result;
}

function loadData(): FiscalYearData[] {
  const csvPath = path.join(process.cwd(), "app/competitions/hunting/results/_data/results.csv");
  const csvContent = fs.readFileSync(csvPath, "utf-8");
  return parseCSV(csvContent);
}

function ResultTable({ results, scoringType }: { results: Result[]; scoringType: "ring" | "point" }) {
  const isRing = scoringType === "ring";

  return (
    <div className="overflow-x-auto p-3">
      <table className="w-full min-w-[500px] text-xs">
        <thead>
          <tr className="bg-[#000080] text-white">
            <th className="w-12 border border-[#808080] p-1 text-center">順位</th>
            <th className="border border-[#808080] p-1 text-center">氏名</th>
            <th className="w-20 border border-[#808080] p-1 text-center">使用銃</th>
            <th className="w-12 border border-[#808080] p-1 text-center">口径</th>
            <th className="w-14 border border-[#808080] p-1 text-center">依託</th>
            <th className="w-14 border border-[#808080] p-1 text-center">肘射</th>
            <th className="w-14 border border-[#808080] p-1 text-center">立射</th>
            <th className="w-16 border border-[#808080] p-1 text-center">合計</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result, idx) => (
            <tr
              key={`${result.rank}-${idx}`}
              className={idx % 2 === 0 ? "bg-white" : "bg-[#f0f0f0]"}
            >
              <td className="border border-[#808080] p-1 text-center">{result.rank}</td>
              <td className="border border-[#808080] p-1 text-center">{result.name}</td>
              <td className="border border-[#808080] p-1 text-center">{result.gun || "-"}</td>
              <td className="border border-[#808080] p-1 text-center">{result.caliber || "-"}</td>
              <td className="border border-[#808080] p-1 text-center">
                {isRing ? result.itaku.toFixed(1) : result.itaku}
              </td>
              <td className="border border-[#808080] p-1 text-center">
                {isRing ? result.hiji.toFixed(1) : result.hiji}
              </td>
              <td className="border border-[#808080] p-1 text-center">
                {isRing ? result.ritsu.toFixed(1) : result.ritsu}
              </td>
              <td className="border border-[#808080] p-1 text-center font-bold">
                {isRing ? result.total.toFixed(1) : result.total}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ScoringExplanation({ scoringType }: { scoringType: "ring" | "point" }) {
  if (scoringType === "ring") {
    return (
      <div className="mb-2 border-2 border-b-white border-l-[#808080] border-r-white border-t-[#808080] bg-[#e0ffe0] p-2">
        <p className="mb-1 text-xs font-bold">採点方法（環点制）：</p>
        <ul className="list-inside list-disc text-xs">
          <li>依託：110点満点（11発×10点）</li>
          <li>肘射：100点満点（10発×10点）</li>
          <li>立射：90点満点（9発×10点）</li>
          <li>合計300点満点</li>
        </ul>
      </div>
    );
  }

  return (
    <div className="mb-2 border-2 border-b-white border-l-[#808080] border-r-white border-t-[#808080] bg-[#ffffcc] p-2">
      <p className="mb-1 text-xs font-bold">採点方法（点数制）：</p>
      <ul className="list-inside list-disc text-xs">
        <li>依託：10点圏3点、9点圏2点、8点圏1点（30点満点）</li>
        <li>肘射：9点圏3点、7点圏2点、5点圏1点（30点満点）</li>
        <li>立射：8〜10点圏3点、6〜7点圏2点、4〜5点圏1点（30点満点）</li>
        <li>合計90点満点</li>
      </ul>
    </div>
  );
}

export default function HuntingResultsPage() {
  const data = loadData();

  return (
    <div className="min-h-screen bg-[#008080] p-4">
      <Win95Window
        title="狩猟銃射撃大会結果 - 横須賀市ライフル射撃協会"
        icon="🏆"
        className="mx-auto max-w-4xl"
      >
        <div className="border-2 border-b-white border-l-[#808080] border-r-white border-t-[#808080] bg-[#c0c0c0] p-2">
          {/* Navigation */}
          <div className="mb-2">
            <Win95Button href="/competitions/hunting">← 戻る</Win95Button>
          </div>

          {/* Header */}
          <div className="mb-4 flex flex-col items-center gap-2 border-2 border-b-white border-l-[#808080] border-r-white border-t-[#808080] bg-white p-4">
            <h1 className="text-xl font-bold text-[#000080]">
              狩猟銃射撃大会結果
            </h1>
            <p className="text-sm text-gray-600">
              平成25年度〜平成28年度 全21回分の成績
            </p>
          </div>

          {/* Results by Fiscal Year */}
          {data.map((fy) => (
            <div key={fy.fiscalYear} className="mb-6">
              {/* Fiscal Year Header */}
              <div className="mb-3 flex items-center gap-2 border-2 border-b-white border-l-[#808080] border-r-white border-t-[#808080] bg-[#000080] px-4 py-2">
                <span className="text-lg font-bold text-white">
                  {fy.fiscalYear}（{fy.westernYear}年度）
                </span>
              </div>

              {/* Rounds */}
              {fy.rounds.map((round) => (
                <div
                  key={`${fy.fiscalYear}-${round.round}`}
                  className="mb-4 border-2 border-b-white border-l-[#808080] border-r-white border-t-[#808080] bg-white"
                >
                  <div className="flex items-center justify-between bg-gradient-to-r from-[#000080] to-[#1084d0] px-3 py-2">
                    <span className="text-sm font-bold text-white">
                      第{round.round}回 {round.dateRange && `（${round.dateRange}）`}
                    </span>
                    <span className={`rounded px-2 py-0.5 text-xs font-bold ${
                      round.scoringType === "ring"
                        ? "bg-green-200 text-green-800"
                        : "bg-yellow-200 text-yellow-800"
                    }`}>
                      {round.scoringType === "ring" ? "環点制" : "点数制"}
                    </span>
                  </div>
                  <ScoringExplanation scoringType={round.scoringType} />
                  <ResultTable results={round.results} scoringType={round.scoringType} />
                </div>
              ))}
            </div>
          ))}

          {/* Status bar */}
          <div className="mt-4 flex border-2 border-b-white border-l-[#808080] border-r-white border-t-[#808080] bg-[#c0c0c0]">
            <div className="flex-1 border-r border-[#808080] px-2 py-1 text-xs">
              10m 狩猟銃射撃競技
            </div>
            <div className="px-2 py-1 text-xs">横須賀市ライフル射撃協会</div>
          </div>
        </div>
      </Win95Window>
    </div>
  );
}
