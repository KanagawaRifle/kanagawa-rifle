import type { Metadata } from "next";
import Image from "next/image";
import { getOpengraphImageUrl } from "@/lib/server";
import { Win95Window, Win95Button } from "../../_components";
import iconBigBoreImage from "../../_assets/icon-big-bore.gif";

export const metadata: Metadata = {
  title: "長瀞大会結果 | 横須賀市ライフル射撃協会",
  description: "大口径大会（長瀞大会）の結果一覧。",
  openGraph: {
    images: [
      {
        url: getOpengraphImageUrl({
          title: "長瀞大会結果",
          subtitle: "大口径大会結果一覧",
          theme: "win95",
        }),
        width: 1200,
        height: 630,
      },
    ],
  },
};

// P60 results (300m Prone 60 shots, 6 series)
const p60Results = [
  { rank: 1, name: "M.H", prefecture: "神奈川", series: [100, 97, 96, 94, 97, 99], total: 583 },
  { rank: 2, name: "T.T", prefecture: "千葉", series: [97, 98, 95, 96, 95, 97], total: 578 },
  { rank: 3, name: "S.T", prefecture: "千葉", series: [96, 96, 97, 95, 94, 98], total: 576 },
  { rank: 4, name: "K.K", prefecture: "神奈川", series: [93, 97, 93, 95, 93, 95], total: 566 },
  { rank: 5, name: "E.S", prefecture: "千葉", series: [92, 96, 95, 93, 95, 93], total: 564 },
  { rank: 6, name: "N.K", prefecture: "神奈川", series: [93, 88, 94, 94, 92, 96], total: 557 },
  { rank: 7, name: "N.A", prefecture: "山梨", series: [93, 94, 91, 93, 92, 93], total: 556 },
  { rank: 8, name: "S.T", prefecture: "神奈川", series: [92, 94, 89, 97, 93, 91], total: 556 },
  { rank: 9, name: "T.H", prefecture: "神奈川", series: [94, 91, 86, 90, 95, 95], total: 551 },
  { rank: 10, name: "T.M", prefecture: "千葉", series: [91, 89, 92, 92, 88, 89], total: 541 },
  { rank: 11, name: "M.M", prefecture: "千葉", series: [88, 92, 91, 91, 79, 88], total: 529 },
  { rank: 12, name: "M.K", prefecture: "神奈川", series: [92, 91, 71, 87, 87, 88], total: 516 },
  { rank: 13, name: "M.Y", prefecture: "神奈川", series: [82, 89, 82, 87, 92, 83], total: 515 },
];

// CM40 results (300m Centimeter 40 shots, total only)
const cm40Results = [
  { rank: 1, name: "M.K", prefecture: "千葉", total: 98 },
  { rank: 1, name: "I.K", prefecture: "千葉", total: 98 },
  { rank: 3, name: "H.S", prefecture: "神奈川", total: 97 },
  { rank: 4, name: "H.T", prefecture: "千葉", total: 95 },
  { rank: 5, name: "M.H", prefecture: "神奈川", total: 95 },
  { rank: 6, name: "A.Z", prefecture: "山梨", total: 94 },
  { rank: 7, name: "N.A", prefecture: "山梨", total: 92 },
  { rank: 8, name: "Y.T", prefecture: "千葉", total: 84 },
  { rank: 9, name: "O.A", prefecture: "千葉", total: 84 },
  { rank: 10, name: "S.K", prefecture: "神奈川", total: 75 },
];

export default function BigBoreResultsPage() {
  return (
    <div className="min-h-screen bg-[#008080] p-4">
      <Win95Window
        title="長瀞大会結果発表 - 横須賀市ライフル射撃協会"
        icon="🏆"
        className="mx-auto max-w-4xl"
      >
        <div className="border-2 border-b-white border-l-[#808080] border-r-white border-t-[#808080] bg-[#c0c0c0] p-2">
          {/* Navigation */}
          <div className="mb-2">
            <Win95Button href="/competitions/big-bore">← 戻る</Win95Button>
          </div>

          {/* Header */}
          <div className="mb-4 flex flex-col items-center gap-2 border-2 border-b-white border-l-[#808080] border-r-white border-t-[#808080] bg-white p-4">
            <Image
              src={iconBigBoreImage}
              alt="大口径大会"
            />
            <div className="mt-2 text-center">
              <h1 className="text-lg font-bold text-[#000080]">
                長瀞大会結果発表
              </h1>
            </div>
            <div className="mt-2 border-2 border-b-white border-l-[#808080] border-r-white border-t-[#808080] bg-[#000080] px-4 py-1">
              <span className="text-sm font-bold text-white">
                2013年10月26日（土）
              </span>
            </div>
          </div>

          {/* P60 Results */}
          <div className="mb-4 border-2 border-b-white border-l-[#808080] border-r-white border-t-[#808080] bg-white">
            <div className="flex items-center gap-2 bg-gradient-to-r from-[#000080] to-[#1084d0] px-3 py-2">
              <span className="text-sm font-bold text-white">
                300m P60（プローン60発）
              </span>
            </div>
            <div className="overflow-x-auto p-3">
              <table className="w-full min-w-[600px] text-xs">
                <thead>
                  <tr className="bg-[#000080] text-white">
                    <th className="w-12 border border-[#808080] p-1 text-center">
                      順位
                    </th>
                    <th className="w-16 border border-[#808080] p-1 text-center">
                      氏名
                    </th>
                    <th className="w-16 border border-[#808080] p-1 text-center">
                      所属
                    </th>
                    <th className="w-10 border border-[#808080] p-1 text-center">
                      1
                    </th>
                    <th className="w-10 border border-[#808080] p-1 text-center">
                      2
                    </th>
                    <th className="w-10 border border-[#808080] p-1 text-center">
                      3
                    </th>
                    <th className="w-10 border border-[#808080] p-1 text-center">
                      4
                    </th>
                    <th className="w-10 border border-[#808080] p-1 text-center">
                      5
                    </th>
                    <th className="w-10 border border-[#808080] p-1 text-center">
                      6
                    </th>
                    <th className="w-14 border border-[#808080] p-1 text-center">
                      合計
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {p60Results.map((result, idx) => (
                    <tr
                      key={`p60-${idx}`}
                      className={idx % 2 === 0 ? "bg-white" : "bg-[#f0f0f0]"}
                    >
                      <td className="border border-[#808080] p-1 text-center">
                        {result.rank}
                      </td>
                      <td className="border border-[#808080] p-1 text-center">
                        {result.name}
                      </td>
                      <td className="border border-[#808080] p-1 text-center">
                        {result.prefecture}
                      </td>
                      {result.series.map((score, i) => (
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
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* CM40 Results */}
          <div className="mb-4 border-2 border-b-white border-l-[#808080] border-r-white border-t-[#808080] bg-white">
            <div className="flex items-center gap-2 bg-gradient-to-r from-[#000080] to-[#1084d0] px-3 py-2">
              <span className="text-sm font-bold text-white">
                300m CM40（クラウンマッチ40発）
              </span>
            </div>
            <div className="overflow-x-auto p-3">
              <table className="w-full min-w-[300px] text-xs">
                <thead>
                  <tr className="bg-[#000080] text-white">
                    <th className="w-12 border border-[#808080] p-1 text-center">
                      順位
                    </th>
                    <th className="w-20 border border-[#808080] p-1 text-center">
                      氏名
                    </th>
                    <th className="w-20 border border-[#808080] p-1 text-center">
                      所属
                    </th>
                    <th className="w-16 border border-[#808080] p-1 text-center">
                      合計
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cm40Results.map((result, idx) => (
                    <tr
                      key={`cm40-${idx}`}
                      className={idx % 2 === 0 ? "bg-white" : "bg-[#f0f0f0]"}
                    >
                      <td className="border border-[#808080] p-1 text-center">
                        {result.rank}
                      </td>
                      <td className="border border-[#808080] p-1 text-center">
                        {result.name}
                      </td>
                      <td className="border border-[#808080] p-1 text-center">
                        {result.prefecture}
                      </td>
                      <td className="border border-[#808080] p-1 text-center font-bold">
                        {result.total}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Info box */}
          <div className="mt-4 border-2 border-b-white border-l-[#808080] border-r-white border-t-[#808080] bg-[#ffffcc] p-3">
            <p className="text-xs">
              <span className="font-bold">注:</span>{" "}
              プライバシー保護のため、氏名はイニシャル表記となっています。
            </p>
          </div>

          {/* Status bar */}
          <div className="mt-4 flex border-2 border-b-white border-l-[#808080] border-r-white border-t-[#808080] bg-[#c0c0c0]">
            <div className="flex-1 border-r border-[#808080] px-2 py-1 text-xs">
              長瀞総合射撃場
            </div>
            <div className="px-2 py-1 text-xs">横須賀市ライフル射撃協会</div>
          </div>
        </div>
      </Win95Window>
    </div>
  );
}
