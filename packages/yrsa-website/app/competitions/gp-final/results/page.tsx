import type { Metadata } from 'next';

import { getOpengraphImageUrl } from '@/lib/server';

import { Win95Window, Win95Button } from '../../_components';

export const metadata: Metadata = {
  title: 'GPファイナル結果 | 横須賀市ライフル射撃協会',
  description: 'グランプリファイナル（市民大会 兼 防衛大学対抗戦）の結果一覧。',
  openGraph: {
    images: [
      {
        url: getOpengraphImageUrl({
          title: 'GPファイナル結果',
          subtitle: '大会結果一覧',
          theme: 'win95',
        }),
        width: 1200,
        height: 630,
      },
    ],
  },
};

// 2017年2月12日 ARS60の部
const ars60Results = [
  { rank: 1, relay: '1-1', name: '鈴木　啓子', affiliation: '', scores: [83, 87, 89, 84], total: 343, x: 0 },
];

// 2017年2月12日 ハンティングの部
const huntingResults = [
  { rank: 1, relay: '1-5', name: '浅羽　雅仁', affiliation: '', scores: [340, 0, 0, 0], total: 340, x: 0, note: '' },
  { rank: 2, relay: '1-9', name: '仁禮　正美', affiliation: '', scores: [330, 0, 0, 0], total: 330, x: 0, note: '' },
  { rank: 3, relay: '1-3', name: '岩間　隆', affiliation: '', scores: [320, 0, 0, 0], total: 320, x: 0, note: '' },
  { rank: 4, relay: '1-10', name: '坂本　俊介', affiliation: '', scores: [240, 0, 0, 0], total: 240, x: 0, note: '' },
  { rank: 5, relay: '1-8', name: '鈴木　秀一', affiliation: '', scores: [230, 0, 0, 0], total: 230, x: 0, note: '' },
  { rank: 6, relay: '1-6', name: '成田　耕二', affiliation: '', scores: [220, 0, 0, 0], total: 220, x: 0, note: '' },
  { rank: 7, relay: '1-1', name: '柴田　正一', affiliation: '', scores: [0, 0, 0, 0], total: 0, x: 0, note: 'DNS' },
  { rank: 7, relay: '1-2', name: '細澤　幸司', affiliation: '', scores: [0, 0, 0, 0], total: 0, x: 0, note: 'DNS' },
  { rank: 7, relay: '1-4', name: '鈴木　康平', affiliation: '', scores: [0, 0, 0, 0], total: 0, x: 0, note: 'DNS' },
  { rank: 7, relay: '1-7', name: '森　唯一', affiliation: '', scores: [0, 0, 0, 0], total: 0, x: 0, note: 'DNS' },
];

export default function GPFinalResultsPage() {
  return (
    <div className="min-h-screen bg-[#008080] p-4">
      <Win95Window title="GPファイナル結果 - 横須賀市ライフル射撃協会" icon="🏆" className="mx-auto max-w-4xl">
        <div className="border-2 border-t-[#808080] border-r-white border-b-white border-l-[#808080] bg-[#c0c0c0] p-2">
          {/* Navigation */}
          <div className="mb-2">
            <Win95Button href="/competitions/gp-final">← 戻る</Win95Button>
          </div>

          {/* Header */}
          <div className="mb-4 flex flex-col items-center gap-2 border-2 border-t-[#808080] border-r-white border-b-white border-l-[#808080] bg-white p-4">
            <h1 className="text-lg font-bold text-[#000080]">横須賀市民大会</h1>
            <p className="text-sm text-[#000080]">兼 防衛大学対抗戦</p>
            <div className="mt-2 border-2 border-t-[#808080] border-r-white border-b-white border-l-[#808080] bg-[#000080] px-4 py-1">
              <span className="text-sm font-bold text-white">2017年2月12日</span>
            </div>
          </div>

          {/* ARS60 Results */}
          <div className="mb-4 border-2 border-t-[#808080] border-r-white border-b-white border-l-[#808080] bg-white">
            <div className="flex items-center gap-2 bg-gradient-to-r from-[#000080] to-[#1084d0] px-3 py-2">
              <span className="text-sm font-bold text-white">ARS60の部</span>
            </div>
            <div className="overflow-x-auto p-3">
              <table className="w-full min-w-[550px] text-xs">
                <thead>
                  <tr className="bg-[#000080] text-white">
                    <th className="w-12 border border-[#808080] p-1 text-center">順位</th>
                    <th className="w-14 border border-[#808080] p-1 text-center">射群</th>
                    <th className="w-20 border border-[#808080] p-1 text-center">氏名</th>
                    <th className="w-14 border border-[#808080] p-1 text-center">所属</th>
                    <th className="w-10 border border-[#808080] p-1 text-center">1</th>
                    <th className="w-10 border border-[#808080] p-1 text-center">2</th>
                    <th className="w-10 border border-[#808080] p-1 text-center">3</th>
                    <th className="w-10 border border-[#808080] p-1 text-center">4</th>
                    <th className="w-12 border border-[#808080] p-1 text-center">合計</th>
                    <th className="w-10 border border-[#808080] p-1 text-center">X</th>
                  </tr>
                </thead>
                <tbody>
                  {ars60Results.map((result, idx) => (
                    <tr key={`ars60-${idx}`} className={idx % 2 === 0 ? 'bg-white' : 'bg-[#f0f0f0]'}>
                      <td className="border border-[#808080] p-1 text-center">{result.rank}</td>
                      <td className="border border-[#808080] p-1 text-center">{result.relay}</td>
                      <td className="border border-[#808080] p-1 text-center">{result.name}</td>
                      <td className="border border-[#808080] p-1 text-center">{result.affiliation || '-'}</td>
                      {result.scores.map((score, i) => (
                        <td key={i} className="border border-[#808080] p-1 text-center">
                          {score}
                        </td>
                      ))}
                      <td className="border border-[#808080] p-1 text-center font-bold">{result.total}</td>
                      <td className="border border-[#808080] p-1 text-center">{result.x}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Hunting Results */}
          <div className="mb-4 border-2 border-t-[#808080] border-r-white border-b-white border-l-[#808080] bg-white">
            <div className="flex items-center gap-2 bg-gradient-to-r from-[#000080] to-[#1084d0] px-3 py-2">
              <span className="text-sm font-bold text-white">ハンティングの部</span>
            </div>
            <div className="overflow-x-auto p-3">
              <table className="w-full min-w-[650px] text-xs">
                <thead>
                  <tr className="bg-[#000080] text-white">
                    <th className="w-12 border border-[#808080] p-1 text-center">順位</th>
                    <th className="w-14 border border-[#808080] p-1 text-center">射群</th>
                    <th className="w-20 border border-[#808080] p-1 text-center">氏名</th>
                    <th className="w-14 border border-[#808080] p-1 text-center">所属</th>
                    <th className="w-10 border border-[#808080] p-1 text-center">1</th>
                    <th className="w-10 border border-[#808080] p-1 text-center">2</th>
                    <th className="w-10 border border-[#808080] p-1 text-center">3</th>
                    <th className="w-10 border border-[#808080] p-1 text-center">4</th>
                    <th className="w-12 border border-[#808080] p-1 text-center">合計</th>
                    <th className="w-10 border border-[#808080] p-1 text-center">X</th>
                    <th className="w-16 border border-[#808080] p-1 text-center">備考</th>
                  </tr>
                </thead>
                <tbody>
                  {huntingResults.map((result, idx) => (
                    <tr key={`hunting-${idx}`} className={idx % 2 === 0 ? 'bg-white' : 'bg-[#f0f0f0]'}>
                      <td className="border border-[#808080] p-1 text-center">{result.rank}</td>
                      <td className="border border-[#808080] p-1 text-center">{result.relay}</td>
                      <td className="border border-[#808080] p-1 text-center">{result.name}</td>
                      <td className="border border-[#808080] p-1 text-center">{result.affiliation || '-'}</td>
                      {result.scores.map((score, i) => (
                        <td key={i} className="border border-[#808080] p-1 text-center">
                          {score}
                        </td>
                      ))}
                      <td className="border border-[#808080] p-1 text-center font-bold">{result.total}</td>
                      <td className="border border-[#808080] p-1 text-center">{result.x}</td>
                      <td className="border border-[#808080] p-1 text-center text-[#ff0000]">{result.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Legend */}
          <div className="mb-4 border-2 border-t-[#808080] border-r-white border-b-white border-l-[#808080] bg-[#ffffcc] p-3">
            <p className="text-xs">
              <span className="font-bold">DNS:</span> Did Not Start（棄権）
            </p>
          </div>

          {/* Status bar */}
          <div className="mt-4 flex border-2 border-t-[#808080] border-r-white border-b-white border-l-[#808080] bg-[#c0c0c0]">
            <div className="flex-1 border-r border-[#808080] px-2 py-1 text-xs">市民大会 兼 防衛大学対抗戦</div>
            <div className="px-2 py-1 text-xs">横須賀市ライフル射撃協会</div>
          </div>
        </div>
      </Win95Window>
    </div>
  );
}
