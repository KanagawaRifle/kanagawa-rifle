import type { Metadata } from "next";
import { getOpengraphImageUrl } from "@/lib/server";
import { Breadcrumb, EventSchema } from "@/components";
import { Win95Window, Win95Button } from "../_components";

export const metadata: Metadata = {
  title: "狩猟銃射撃大会 | 横須賀市ライフル射撃協会",
  description:
    "狩猟銃射撃大会の情報ページ。空気銃狩猟の安全思想の啓発と銃の安全な取り扱いの習熟と、射撃技術の向上を目的としています。",
  openGraph: {
    images: [
      {
        url: getOpengraphImageUrl({
          title: "狩猟銃射撃大会",
          subtitle: "大会要項・競技規則",
          theme: "win95",
        }),
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function HuntingPage() {
  return (
    <>
      {/* 構造化データ */}
      <EventSchema
        name="狩猟銃射撃大会"
        description="空気銃狩猟の安全思想の啓発と銃の安全な取り扱いの習熟、射撃技術の向上を目的とした大会。"
        eventSchedule={{
          repeatFrequency: "Yearly",
        }}
        location={{
          name: "くりはま花の国エアライフル射撃場",
          address: "神奈川県横須賀市",
        }}
        url="https://yokosuka.kanagawa-rifle.org/competitions/hunting"
      />

      <div className="min-h-screen bg-[#008080] p-4">
        <Win95Window
          title="狩猟銃射撃大会 - 横須賀市ライフル射撃協会"
          icon="🎯"
          className="mx-auto max-w-4xl"
        >
          <div className="border-2 border-b-white border-l-[#808080] border-r-white border-t-[#808080] bg-[#c0c0c0] p-2">
            {/* パンくずリスト */}
            <div className="mb-2 border-2 border-b-white border-l-[#808080] border-r-white border-t-[#808080] bg-white p-2">
              <Breadcrumb
                items={[{ name: "競技会", href: "/competitions" }]}
                current="狩猟銃射撃大会"
              />
            </div>

            {/* Navigation */}
            <div className="mb-2">
              <Win95Button href="/competitions">← 戻る</Win95Button>
            </div>

          {/* Header */}
          <div className="mb-4 flex flex-col items-center gap-2 border-2 border-b-white border-l-[#808080] border-r-white border-t-[#808080] bg-white p-4">
            <h1 className="text-xl font-bold text-[#000080]">狩猟銃大会</h1>
          </div>

          {/* Rules Table */}
          <div className="mb-4 border-2 border-b-white border-l-[#808080] border-r-white border-t-[#808080] bg-white">
            <div className="flex items-center gap-2 bg-gradient-to-r from-[#000080] to-[#1084d0] px-3 py-2">
              <span className="text-sm font-bold text-white">競技規則</span>
            </div>
            <div className="overflow-x-auto p-3">
              <table className="w-full text-xs">
                <tbody>
                  <tr className="border-b border-[#c0c0c0]">
                    <td className="bg-[#f0f0f0] p-2 font-bold">
                      目的
                    </td>
                    <td className="p-2">
                      空気銃狩猟の安全思想の啓発と銃の安全な取り扱いの習熟と、射撃技術の向上を目的とする。
                    </td>
                  </tr>
                  <tr className="border-b border-[#c0c0c0]">
                    <td className="bg-[#f0f0f0] p-2 font-bold">資格</td>
                    <td className="p-2">
                      横須賀市ライフル射撃協会会員であること。
                    </td>
                  </tr>
                  <tr className="border-b border-[#c0c0c0]">
                    <td className="bg-[#f0f0f0] p-2 font-bold">
                      空気銃の種類
                    </td>
                    <td className="p-2">
                      口径6.5mm以下の空気(ガス)銃で、銃刀法に適合するものであればその形式は問わないが、競技用銃の使用はできない。但し、フィールド競技用銃は認める。
                    </td>
                  </tr>
                  <tr className="border-b border-[#c0c0c0]">
                    <td className="bg-[#f0f0f0] p-2 font-bold">服装</td>
                    <td className="p-2">
                      射撃にふさわしい服装なら良い。但し、狩猟を前提とするので射撃コート及び射撃グローブは使用できない。手の保護・銃の保護のための手袋は使用できる。
                    </td>
                  </tr>
                  <tr className="border-b border-[#c0c0c0]">
                    <td className="bg-[#f0f0f0] p-2 font-bold">照準装置</td>
                    <td className="p-2">
                      特に規定しない。ライフルスコープの使用も可。
                    </td>
                  </tr>
                  <tr className="border-b border-[#c0c0c0]">
                    <td className="bg-[#f0f0f0] p-2 font-bold">
                      引き金の重さ
                    </td>
                    <td className="p-2">特に規定しない。</td>
                  </tr>
                  <tr className="border-b border-[#c0c0c0]">
                    <td className="bg-[#f0f0f0] p-2 font-bold">銃床</td>
                    <td className="p-2">特に規定しない。</td>
                  </tr>
                  <tr>
                    <td className="bg-[#f0f0f0] p-2 font-bold">スリング</td>
                    <td className="p-2">
                      銃を背負うことを主な目的にした「猟用スリング」の使用は認める。「競技用スリング」は認めない。
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Competition Format */}
          <div className="mb-4 border-2 border-b-white border-l-[#808080] border-r-white border-t-[#808080] bg-white">
            <div className="flex items-center gap-2 bg-gradient-to-r from-[#000080] to-[#1084d0] px-3 py-2">
              <span className="text-sm font-bold text-white">
                狩猟用空気銃射撃競技会の種類
              </span>
            </div>
            <div className="p-3 text-xs">
              <p className="mb-2">
                期内奇数月の最初の水曜(射場が休みの時は次の日)〜翌日曜の間、時間は射場営業時間内。
              </p>
              <p className="mb-2">
                エントリー料は横ラ会員 600円とし、追加一姿勢 200円とする。
                <br />
                フリー参加は 750円とし、追加一姿勢 250円とする。
              </p>
              <p className="mb-2">
                当日内であれば各姿勢にそれぞれ何回でも再挑戦できることとする。
              </p>
              <p className="mb-2">
                期間内の再挑戦は、全ての姿勢について行わなければならない。
                <br />
                銃を替えての挑戦も認めるが、全ての姿勢について行うこと。
              </p>
            </div>
          </div>

          {/* Positions and Scoring */}
          <div className="mb-4 border-2 border-b-white border-l-[#808080] border-r-white border-t-[#808080] bg-white">
            <div className="flex items-center gap-2 bg-gradient-to-r from-[#000080] to-[#1084d0] px-3 py-2">
              <span className="text-sm font-bold text-white">
                姿勢と採点方法
              </span>
            </div>
            <div className="overflow-x-auto p-3">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-[#000080] text-white">
                    <th className="border border-[#808080] p-1"></th>
                    <th className="border border-[#808080] p-1">姿勢</th>
                    <th className="border border-[#808080] p-1">説明</th>
                    <th className="border border-[#808080] p-1">採点</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white">
                    <td className="border border-[#808080] p-1 text-center font-bold">
                      1
                    </td>
                    <td className="border border-[#808080] p-1 text-center font-bold">
                      依託
                    </td>
                    <td className="border border-[#808080] p-1">
                      銃の引き金より前方の一箇所を銃以外の器具に依託し、それ以外の部分は身体だけで保持した状態で射撃する。両肘を射撃机もしくは標的交換機スイッチボックス及び台についてよい。依託器具に関しては、ライフルレスト、バイポット及びこれに類似する器具を使ってよい。
                    </td>
                    <td className="border border-[#808080] p-1">
                      10点圏を3点、9点圏を2点、8点圏を1点と読み替え、30点満点。1圏的1発打ち込み。
                    </td>
                  </tr>
                  <tr className="bg-[#f0f0f0]">
                    <td className="border border-[#808080] p-1 text-center font-bold">
                      2
                    </td>
                    <td className="border border-[#808080] p-1 text-center font-bold">
                      肘射
                    </td>
                    <td className="border border-[#808080] p-1">
                      片肘を射撃台に乗せて銃を保持し、射撃する。反対側の肘、腕は射撃机ほかに触ってはならない。
                    </td>
                    <td className="border border-[#808080] p-1">
                      9点圏を3点、7点圏を2点、5点圏を1点と読み替え、30点満点。1圏的2発打ち込み。
                    </td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border border-[#808080] p-1 text-center font-bold">
                      3
                    </td>
                    <td className="border border-[#808080] p-1 text-center font-bold">
                      立射
                    </td>
                    <td className="border border-[#808080] p-1">
                      引き金を引かない側の上腕部が体側に接した状態にしてはならない。いわゆる、「オフハンド」の姿勢でなければならない。
                    </td>
                    <td className="border border-[#808080] p-1">
                      8点〜10点圏を3点、6点〜7点圏を2点、4点〜5点圏を1点と読み替え、30点満点。1圏的2発打ち込み。
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="border-t border-[#c0c0c0] p-3">
              <p className="text-center text-sm font-bold text-[#ff0000]">
                合計90点満点にて競われる。
              </p>
            </div>
          </div>

          {/* Target info */}
          <div className="mb-4 border-2 border-b-white border-l-[#808080] border-r-white border-t-[#808080] bg-white p-3">
            <div className="mb-2 border-b border-[#808080] pb-1">
              <span className="text-sm font-bold">標的</span>
            </div>
            <p className="text-xs">
              10mエア・ライフル用紙製標的（9号・9号G）及びこれを加工したものを使用する。
            </p>
          </div>

          {/* Awards */}
          <div className="mb-4 border-2 border-b-white border-l-[#808080] border-r-white border-t-[#808080] bg-[#ffffcc] p-3">
            <div className="mb-2 border-b border-[#808080] pb-1">
              <span className="text-sm font-bold text-[#0000ff]">表彰</span>
            </div>
            <p className="text-xs text-[#0000ff]">
              期内6回の競技会で、最高点を出した人を優勝とし金メダルを、2位は銀メダル、3位は銅メダルを贈る。又はメダルを他の賞品に変える場合もある。尚全大会出場者には皆勤賞を贈る場合もある。
            </p>
          </div>

          {/* Results link */}
          <div className="mt-4 border-2 border-b-white border-l-[#808080] border-r-white border-t-[#808080] bg-[#e0ffe0] p-3">
            <p className="mb-2 font-bold text-[#008000]">過去の大会結果</p>
            <Win95Button href="/competitions/hunting/results" variant="primary">
              結果を見る
            </Win95Button>
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
    </>
  );
}
