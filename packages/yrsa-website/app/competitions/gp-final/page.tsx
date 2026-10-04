import type { Metadata } from 'next';

import { getOpengraphImageUrl } from '@/lib/server';

import { Win95Window, Win95Button } from '../_components';

export const metadata: Metadata = {
  title: 'GPファイナル | 横須賀市ライフル射撃協会',
  description: 'グランプリファイナルの情報ページ。年間の月例会成績上位者によるファイナル形式の大会です。',
  openGraph: {
    images: [
      {
        url: getOpengraphImageUrl({
          title: 'GPファイナル',
          subtitle: '月例会成績上位者によるファイナル',
          theme: 'win95',
        }),
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function GPFinalPage() {
  return (
    <div className="min-h-screen bg-[#008080] p-4">
      <Win95Window title="GPファイナル - 横須賀市ライフル射撃協会" icon="🏆" className="mx-auto max-w-4xl">
        <div className="border-2 border-t-[#808080] border-r-white border-b-white border-l-[#808080] bg-[#c0c0c0] p-2">
          {/* Navigation */}
          <div className="mb-2">
            <Win95Button href="/competitions">← 戻る</Win95Button>
          </div>

          {/* Header */}
          <div className="mb-4 flex flex-col items-center gap-2 border-2 border-t-[#808080] border-r-white border-b-white border-l-[#808080] bg-white p-4">
            <h1 className="text-xl font-bold text-[#000080]">グランプリファイナル</h1>
          </div>

          {/* Qualification Section */}
          <div className="mb-4 border-2 border-t-[#808080] border-r-white border-b-white border-l-[#808080] bg-white">
            <div className="flex items-center gap-2 bg-gradient-to-r from-[#800080] to-[#d010a0] px-3 py-2">
              <span className="text-sm font-bold text-white">ファイナル参加資格について</span>
            </div>
            <div className="p-3">
              <ul className="space-y-2 text-sm text-[#806000]">
                <li className="flex items-start gap-2">
                  <span className="text-[#ffa500]">★</span>
                  <span>本年度定例会12回のうち4回以上の参加であること</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#ffa500]">★</span>
                  <span>参加ポイントとして一回の参加につき3ポイントつく</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Competition Info Table */}
          <div className="mb-4 border-2 border-t-[#808080] border-r-white border-b-white border-l-[#808080] bg-white">
            <div className="flex items-center gap-2 bg-gradient-to-r from-[#000080] to-[#1084d0] px-3 py-2">
              <span className="text-sm font-bold text-white">大会概要</span>
            </div>
            <div className="overflow-x-auto p-3">
              <table className="w-full text-xs">
                <tbody>
                  <tr className="border-b border-[#c0c0c0]">
                    <td className="w-28 bg-[#e0e0e0] p-2 font-bold">大会名</td>
                    <td className="p-2">グランプリファイナル</td>
                  </tr>
                  <tr className="border-b border-[#c0c0c0]">
                    <td className="bg-[#e0e0e0] p-2 font-bold">主催</td>
                    <td className="p-2">横須賀市ライフル射撃協会</td>
                  </tr>
                  <tr className="border-b border-[#c0c0c0]">
                    <td className="bg-[#e0e0e0] p-2 font-bold">会場</td>
                    <td className="p-2">くりはま花の国エアライフル射撃場（神奈川県横須賀市）</td>
                  </tr>
                  <tr className="border-b border-[#c0c0c0]">
                    <td className="bg-[#e0e0e0] p-2 font-bold">競技方法</td>
                    <td className="p-2">現行ルールによるファイナル形式で行う</td>
                  </tr>
                  <tr>
                    <td className="bg-[#e0e0e0] p-2 font-bold">使用標的</td>
                    <td className="p-2">公認電子標的（Meyton社製）</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Qualification Details */}
          <div className="mb-4 border-2 border-t-[#808080] border-r-white border-b-white border-l-[#808080] bg-white">
            <div className="flex items-center gap-2 bg-gradient-to-r from-[#000080] to-[#1084d0] px-3 py-2">
              <span className="text-sm font-bold text-white">参加資格</span>
            </div>
            <div className="p-3 text-xs">
              <ol className="list-inside list-decimal space-y-2">
                <li>本年度山梨県・千葉県・横須賀市対抗ライフル射撃競技会に出場し、各月のチャンピオンになった選手</li>
                <li>
                  上記該当者が各種目8名未満、または8名以上になった場合は、以下に定める方法により出場選手を決定する：
                  <ul className="mt-2 ml-6 list-disc space-y-1">
                    <li>各月の1位から順にポイントを付し、年間のポイント合計が上位の者から選出する</li>
                    <li>ポイントは1位8点、2位7点、3位6点、4位5点、5位4点、6位3点、7位2点、8位1点、9位以下0点とする</li>
                  </ul>
                </li>
              </ol>
            </div>
          </div>

          {/* Application */}
          <div className="mb-4 border-2 border-t-[#808080] border-r-white border-b-white border-l-[#808080] bg-[#ffffcc] p-3">
            <div className="mb-2 border-b border-[#808080] pb-1">
              <span className="text-sm font-bold text-[#0000ff]">申込方法</span>
            </div>
            <p className="text-xs">出場権獲得者には大会実行委員会から直接ご連絡いたします。</p>
          </div>

          {/* Results link */}
          <div className="mt-4 border-2 border-t-[#808080] border-r-white border-b-white border-l-[#808080] bg-[#e0ffe0] p-3">
            <p className="mb-2 font-bold text-[#008000]">過去の大会結果</p>
            <Win95Button href="/competitions/gp-final/results" variant="primary">
              結果を見る
            </Win95Button>
          </div>

          {/* Status bar */}
          <div className="mt-4 flex border-2 border-t-[#808080] border-r-white border-b-white border-l-[#808080] bg-[#c0c0c0]">
            <div className="flex-1 border-r border-[#808080] px-2 py-1 text-xs">
              10m エアライフル競技 ファイナル形式
            </div>
            <div className="px-2 py-1 text-xs">横須賀市ライフル射撃協会</div>
          </div>
        </div>
      </Win95Window>
    </div>
  );
}
