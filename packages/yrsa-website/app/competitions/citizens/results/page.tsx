import type { Metadata } from "next";
import { Win95Window, Win95Button } from "../../_components";

export const metadata: Metadata = {
  title: "市民大会結果 | 横須賀市ライフル射撃協会",
  description: "横須賀市民大会 兼 防衛大学対抗戦の結果一覧。",
};

// 2017年2月12日 ARS60の部
const ars60Results2017 = [
  { rank: 1, relay: "1-1", name: "鈴木　啓子", affiliation: "", scores: [83, 87, 89, 84], total: 343, x: 0 },
];

// 2017年2月12日 ハンティングの部
const huntingResults2017 = [
  { rank: 1, relay: "1-5", name: "浅羽　雅仁", affiliation: "", total: 340, note: "" },
  { rank: 2, relay: "1-9", name: "仁禮　正美", affiliation: "", total: 330, note: "" },
  { rank: 3, relay: "1-3", name: "岩間　隆", affiliation: "", total: 320, note: "" },
  { rank: 4, relay: "1-10", name: "坂本　俊介", affiliation: "", total: 240, note: "" },
  { rank: 5, relay: "1-8", name: "鈴木　秀一", affiliation: "", total: 230, note: "" },
  { rank: 6, relay: "1-6", name: "成田　耕二", affiliation: "", total: 220, note: "" },
  { rank: 7, relay: "1-1", name: "柴田　正一", affiliation: "", total: 0, note: "DNS" },
  { rank: 7, relay: "1-2", name: "細澤　幸司", affiliation: "", total: 0, note: "DNS" },
  { rank: 7, relay: "1-4", name: "鈴木　康平", affiliation: "", total: 0, note: "DNS" },
  { rank: 7, relay: "1-7", name: "森　唯一", affiliation: "", total: 0, note: "DNS" },
];

// 2016年2月11日 ARS60の部
const ars60Results2016 = [
  { rank: 1, relay: "1-9", name: "仁禮　正美", affiliation: "", total: 576.8 },
  { rank: 2, relay: "1-6", name: "鈴木　康平", affiliation: "", total: 570.2 },
  { rank: 3, relay: "2-11", name: "岩間　隆", affiliation: "", total: 566.9 },
  { rank: 4, relay: "1-11", name: "鈴木　秀一", affiliation: "", total: 554.1 },
  { rank: 5, relay: "1-12", name: "鈴木　芳郎", affiliation: "", total: 0, note: "DNS" },
];

// 2016年2月11日 ハンティングの部
const huntingResults2016 = [
  { rank: 1, relay: "1-2", name: "岩間隆", affiliation: "", total: 75 },
  { rank: 2, relay: "1-3", name: "仁禮正美", affiliation: "", total: 73 },
];

// 2015年2月1日 ARS60の部
const ars60Results2015 = [
  { rank: 1, relay: "", name: "鈴木秀一", affiliation: "", total: 582.7 },
  { rank: 2, relay: "", name: "鈴木啓子", affiliation: "", total: 573.7 },
];

// 2015年2月1日 ハンティングの部
const huntingResults2015 = [
  { rank: 1, relay: "", name: "仁禮正美", affiliation: "", total: 78 },
  { rank: 2, relay: "", name: "鈴木秀一", affiliation: "", total: 75 },
  { rank: 3, relay: "", name: "鈴木康平", affiliation: "", total: 71 },
];

// 2014年2月15日 ハンティング40
const hunting40Results2014 = [
  { rank: 1, relay: "", name: "鈴木康平", affiliation: "", total: 38 },
];

function ResultTable({
  title,
  headers,
  children,
}: {
  title: string;
  headers: string[];
  children: React.ReactNode;
}) {
  return (
    <div className="mb-4 border-2 border-b-white border-l-[#808080] border-r-white border-t-[#808080] bg-white">
      <div className="flex items-center gap-2 bg-gradient-to-r from-[#000080] to-[#1084d0] px-3 py-2">
        <span className="text-sm font-bold text-white">{title}</span>
      </div>
      <div className="overflow-x-auto p-3">
        <table className="w-full min-w-[400px] text-xs">
          <thead>
            <tr className="bg-[#000080] text-white">
              {headers.map((header, idx) => (
                <th
                  key={idx}
                  className="border border-[#808080] p-1 text-center"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </table>
      </div>
    </div>
  );
}

export default function CitizensResultsPage() {
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
            <h1 className="text-lg font-bold text-[#000080]">
              横須賀市民大会
            </h1>
            <p className="text-sm text-[#000080]">兼 防衛大学対抗戦</p>
            <p className="mt-2 text-sm">成績発表</p>
          </div>

          {/* 2017年 */}
          <div className="mb-6">
            <div className="mb-2 border-2 border-b-white border-l-[#808080] border-r-white border-t-[#808080] bg-[#000080] px-4 py-2 text-center">
              <span className="text-lg font-bold text-white">
                2017年2月12日
              </span>
            </div>

            <ResultTable
              title="ARS60の部"
              headers={["順位", "射群", "氏名", "所属", "1", "2", "3", "4", "合計", "X"]}
            >
              {ars60Results2017.map((result, idx) => (
                <tr
                  key={`ars60-2017-${idx}`}
                  className={idx % 2 === 0 ? "bg-white" : "bg-[#f0f0f0]"}
                >
                  <td className="border border-[#808080] p-1 text-center">
                    {result.rank}
                  </td>
                  <td className="border border-[#808080] p-1 text-center">
                    {result.relay}
                  </td>
                  <td className="border border-[#808080] p-1 text-center">
                    {result.name}
                  </td>
                  <td className="border border-[#808080] p-1 text-center">
                    {result.affiliation || "-"}
                  </td>
                  {result.scores.map((score, i) => (
                    <td
                      key={i}
                      className="border border-[#808080] p-1 text-center"
                    >
                      {score}
                    </td>
                  ))}
                  <td className="border border-[#808080] p-1 text-center font-bold">
                    {result.total}
                  </td>
                  <td className="border border-[#808080] p-1 text-center">
                    {result.x}
                  </td>
                </tr>
              ))}
            </ResultTable>

            <ResultTable
              title="ハンティングの部"
              headers={["順位", "射群", "氏名", "所属", "合計", "備考"]}
            >
              {huntingResults2017.map((result, idx) => (
                <tr
                  key={`hunting-2017-${idx}`}
                  className={idx % 2 === 0 ? "bg-white" : "bg-[#f0f0f0]"}
                >
                  <td className="border border-[#808080] p-1 text-center">
                    {result.rank}
                  </td>
                  <td className="border border-[#808080] p-1 text-center">
                    {result.relay}
                  </td>
                  <td className="border border-[#808080] p-1 text-center">
                    {result.name}
                  </td>
                  <td className="border border-[#808080] p-1 text-center">
                    {result.affiliation || "-"}
                  </td>
                  <td className="border border-[#808080] p-1 text-center font-bold">
                    {result.total}
                  </td>
                  <td className="border border-[#808080] p-1 text-center text-[#ff0000]">
                    {result.note}
                  </td>
                </tr>
              ))}
            </ResultTable>
          </div>

          {/* 2016年 */}
          <div className="mb-6">
            <div className="mb-2 border-2 border-b-white border-l-[#808080] border-r-white border-t-[#808080] bg-[#000080] px-4 py-2 text-center">
              <span className="text-lg font-bold text-white">
                2016年2月11日
              </span>
            </div>

            <ResultTable
              title="ARS60の部"
              headers={["順位", "射群", "氏名", "所属", "合計"]}
            >
              {ars60Results2016.map((result, idx) => (
                <tr
                  key={`ars60-2016-${idx}`}
                  className={idx % 2 === 0 ? "bg-white" : "bg-[#f0f0f0]"}
                >
                  <td className="border border-[#808080] p-1 text-center">
                    {result.rank}
                  </td>
                  <td className="border border-[#808080] p-1 text-center">
                    {result.relay}
                  </td>
                  <td className="border border-[#808080] p-1 text-center">
                    {result.name}
                  </td>
                  <td className="border border-[#808080] p-1 text-center">
                    {result.affiliation || "-"}
                  </td>
                  <td className="border border-[#808080] p-1 text-center font-bold">
                    {result.total}
                  </td>
                </tr>
              ))}
            </ResultTable>

            <ResultTable
              title="ハンティングの部"
              headers={["順位", "射群", "氏名", "所属", "合計"]}
            >
              {huntingResults2016.map((result, idx) => (
                <tr
                  key={`hunting-2016-${idx}`}
                  className={idx % 2 === 0 ? "bg-white" : "bg-[#f0f0f0]"}
                >
                  <td className="border border-[#808080] p-1 text-center">
                    {result.rank}
                  </td>
                  <td className="border border-[#808080] p-1 text-center">
                    {result.relay || "-"}
                  </td>
                  <td className="border border-[#808080] p-1 text-center">
                    {result.name}
                  </td>
                  <td className="border border-[#808080] p-1 text-center">
                    {result.affiliation || "-"}
                  </td>
                  <td className="border border-[#808080] p-1 text-center font-bold">
                    {result.total}
                  </td>
                </tr>
              ))}
            </ResultTable>
          </div>

          {/* 2015年 */}
          <div className="mb-6">
            <div className="mb-2 border-2 border-b-white border-l-[#808080] border-r-white border-t-[#808080] bg-[#000080] px-4 py-2 text-center">
              <span className="text-lg font-bold text-white">2015年2月1日</span>
            </div>

            <ResultTable
              title="ARS60の部"
              headers={["順位", "氏名", "所属", "合計"]}
            >
              {ars60Results2015.map((result, idx) => (
                <tr
                  key={`ars60-2015-${idx}`}
                  className={idx % 2 === 0 ? "bg-white" : "bg-[#f0f0f0]"}
                >
                  <td className="border border-[#808080] p-1 text-center">
                    {result.rank}
                  </td>
                  <td className="border border-[#808080] p-1 text-center">
                    {result.name}
                  </td>
                  <td className="border border-[#808080] p-1 text-center">
                    {result.affiliation || "-"}
                  </td>
                  <td className="border border-[#808080] p-1 text-center font-bold">
                    {result.total}
                  </td>
                </tr>
              ))}
            </ResultTable>

            <ResultTable
              title="ハンティングの部"
              headers={["順位", "氏名", "所属", "合計"]}
            >
              {huntingResults2015.map((result, idx) => (
                <tr
                  key={`hunting-2015-${idx}`}
                  className={idx % 2 === 0 ? "bg-white" : "bg-[#f0f0f0]"}
                >
                  <td className="border border-[#808080] p-1 text-center">
                    {result.rank}
                  </td>
                  <td className="border border-[#808080] p-1 text-center">
                    {result.name}
                  </td>
                  <td className="border border-[#808080] p-1 text-center">
                    {result.affiliation || "-"}
                  </td>
                  <td className="border border-[#808080] p-1 text-center font-bold">
                    {result.total}
                  </td>
                </tr>
              ))}
            </ResultTable>
          </div>

          {/* 2014年 */}
          <div className="mb-6">
            <div className="mb-2 border-2 border-b-white border-l-[#808080] border-r-white border-t-[#808080] bg-[#000080] px-4 py-2 text-center">
              <span className="text-lg font-bold text-white">
                2014年2月15日
              </span>
            </div>

            <ResultTable
              title="ハンティング40"
              headers={["順位", "氏名", "所属", "合計"]}
            >
              {hunting40Results2014.map((result, idx) => (
                <tr
                  key={`hunting40-2014-${idx}`}
                  className={idx % 2 === 0 ? "bg-white" : "bg-[#f0f0f0]"}
                >
                  <td className="border border-[#808080] p-1 text-center">
                    {result.rank}
                  </td>
                  <td className="border border-[#808080] p-1 text-center">
                    {result.name}
                  </td>
                  <td className="border border-[#808080] p-1 text-center">
                    {result.affiliation || "-"}
                  </td>
                  <td className="border border-[#808080] p-1 text-center font-bold">
                    {result.total}
                  </td>
                </tr>
              ))}
            </ResultTable>
          </div>

          {/* Legend */}
          <div className="mb-4 border-2 border-b-white border-l-[#808080] border-r-white border-t-[#808080] bg-[#ffffcc] p-3">
            <p className="text-xs">
              <span className="font-bold">DNS:</span> Did Not Start（棄権）
            </p>
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
