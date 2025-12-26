import type { Metadata } from "next";
import { Win95Window, Win95Button } from "../../_components";

export const metadata: Metadata = {
  title: "狩猟銃射撃大会結果 | 横須賀市ライフル射撃協会",
  description: "狩猟銃射撃大会の結果一覧。",
};

// 平成28年度 第6回（3月7日～12日）の結果
const round6Results = [
  {
    rank: 1,
    name: "I.T",
    gun: "",
    caliber: "",
    itaku: 103.6,
    hiji: 95.7,
    ritsu: 85.8,
    total: 285.1,
  },
  {
    rank: 2,
    name: "N.K",
    gun: "",
    caliber: "4.5",
    itaku: 102.9,
    hiji: 93.2,
    ritsu: 85.1,
    total: 281.2,
  },
  {
    rank: 3,
    name: "N.C",
    gun: "エース",
    caliber: "",
    itaku: 99.8,
    hiji: 89.8,
    ritsu: 88.3,
    total: 277.9,
  },
  {
    rank: 4,
    name: "T.K",
    gun: "ホーワ",
    caliber: "4.5",
    itaku: 99.8,
    hiji: 92.6,
    ritsu: 79.6,
    total: 272.0,
  },
  {
    rank: 5,
    name: "K.M",
    gun: "エース",
    caliber: "5.5",
    itaku: 93.6,
    hiji: 82.8,
    ritsu: 79.1,
    total: 255.5,
  },
];

// 平成28年度 第5回（1月11日～17日）の結果
const round5Results = [
  {
    rank: 1,
    name: "S.S",
    gun: "",
    caliber: "5.5",
    itaku: 99.2,
    hiji: 94.3,
    ritsu: 88.3,
    total: 281.8,
  },
  {
    rank: 2,
    name: "T.K",
    gun: "ホーワ",
    caliber: "4.5",
    itaku: 100.2,
    hiji: 93.4,
    ritsu: 79.9,
    total: 273.5,
  },
  {
    rank: 3,
    name: "N.C",
    gun: "エース",
    caliber: "",
    itaku: 100.0,
    hiji: 88.2,
    ritsu: 83.6,
    total: 271.8,
  },
];

export default function HuntingResultsPage() {
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
            <div className="mt-2 border-2 border-b-white border-l-[#808080] border-r-white border-t-[#808080] bg-[#000080] px-4 py-1">
              <span className="text-sm font-bold text-white">
                平成28年度（2016年度）
              </span>
            </div>
          </div>

          {/* Round 6 Results */}
          <div className="mb-4 border-2 border-b-white border-l-[#808080] border-r-white border-t-[#808080] bg-white">
            <div className="flex items-center gap-2 bg-gradient-to-r from-[#000080] to-[#1084d0] px-3 py-2">
              <span className="text-sm font-bold text-white">
                第6回 3月7日～12日
              </span>
            </div>
            <div className="overflow-x-auto p-3">
              <table className="w-full min-w-[500px] text-xs">
                <thead>
                  <tr className="bg-[#000080] text-white">
                    <th className="w-12 border border-[#808080] p-1 text-center">
                      順位
                    </th>
                    <th className="w-16 border border-[#808080] p-1 text-center">
                      氏名
                    </th>
                    <th className="w-16 border border-[#808080] p-1 text-center">
                      使用銃
                    </th>
                    <th className="w-12 border border-[#808080] p-1 text-center">
                      口径
                    </th>
                    <th className="w-14 border border-[#808080] p-1 text-center">
                      依託
                    </th>
                    <th className="w-14 border border-[#808080] p-1 text-center">
                      肘射
                    </th>
                    <th className="w-14 border border-[#808080] p-1 text-center">
                      立射
                    </th>
                    <th className="w-14 border border-[#808080] p-1 text-center">
                      合計
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {round6Results.map((result, idx) => (
                    <tr
                      key={`r6-${idx}`}
                      className={idx % 2 === 0 ? "bg-white" : "bg-[#f0f0f0]"}
                    >
                      <td className="border border-[#808080] p-1 text-center">
                        {result.rank}
                      </td>
                      <td className="border border-[#808080] p-1 text-center">
                        {result.name}
                      </td>
                      <td className="border border-[#808080] p-1 text-center">
                        {result.gun || "-"}
                      </td>
                      <td className="border border-[#808080] p-1 text-center">
                        {result.caliber || "-"}
                      </td>
                      <td className="border border-[#808080] p-1 text-center">
                        {result.itaku}
                      </td>
                      <td className="border border-[#808080] p-1 text-center">
                        {result.hiji}
                      </td>
                      <td className="border border-[#808080] p-1 text-center">
                        {result.ritsu}
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

          {/* Round 5 Results */}
          <div className="mb-4 border-2 border-b-white border-l-[#808080] border-r-white border-t-[#808080] bg-white">
            <div className="flex items-center gap-2 bg-gradient-to-r from-[#000080] to-[#1084d0] px-3 py-2">
              <span className="text-sm font-bold text-white">
                第5回 1月11日～17日
              </span>
            </div>
            <div className="overflow-x-auto p-3">
              <table className="w-full min-w-[500px] text-xs">
                <thead>
                  <tr className="bg-[#000080] text-white">
                    <th className="w-12 border border-[#808080] p-1 text-center">
                      順位
                    </th>
                    <th className="w-16 border border-[#808080] p-1 text-center">
                      氏名
                    </th>
                    <th className="w-16 border border-[#808080] p-1 text-center">
                      使用銃
                    </th>
                    <th className="w-12 border border-[#808080] p-1 text-center">
                      口径
                    </th>
                    <th className="w-14 border border-[#808080] p-1 text-center">
                      依託
                    </th>
                    <th className="w-14 border border-[#808080] p-1 text-center">
                      肘射
                    </th>
                    <th className="w-14 border border-[#808080] p-1 text-center">
                      立射
                    </th>
                    <th className="w-14 border border-[#808080] p-1 text-center">
                      合計
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {round5Results.map((result, idx) => (
                    <tr
                      key={`r5-${idx}`}
                      className={idx % 2 === 0 ? "bg-white" : "bg-[#f0f0f0]"}
                    >
                      <td className="border border-[#808080] p-1 text-center">
                        {result.rank}
                      </td>
                      <td className="border border-[#808080] p-1 text-center">
                        {result.name}
                      </td>
                      <td className="border border-[#808080] p-1 text-center">
                        {result.gun || "-"}
                      </td>
                      <td className="border border-[#808080] p-1 text-center">
                        {result.caliber || "-"}
                      </td>
                      <td className="border border-[#808080] p-1 text-center">
                        {result.itaku}
                      </td>
                      <td className="border border-[#808080] p-1 text-center">
                        {result.hiji}
                      </td>
                      <td className="border border-[#808080] p-1 text-center">
                        {result.ritsu}
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

          {/* Scoring explanation */}
          <div className="mb-4 border-2 border-b-white border-l-[#808080] border-r-white border-t-[#808080] bg-[#ffffcc] p-3">
            <p className="mb-1 text-xs font-bold">採点方法：</p>
            <ul className="list-inside list-disc text-xs">
              <li>依託：10点圏3点、9点圏2点、8点圏1点（30点満点）</li>
              <li>肘射：9点圏3点、7点圏2点、5点圏1点（30点満点）</li>
              <li>
                立射：8〜10点圏3点、6〜7点圏2点、4〜5点圏1点（30点満点）
              </li>
              <li>合計90点満点</li>
            </ul>
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
              10m 狩猟銃射撃競技
            </div>
            <div className="px-2 py-1 text-xs">横須賀市ライフル射撃協会</div>
          </div>
        </div>
      </Win95Window>
    </div>
  );
}
