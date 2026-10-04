import type { Metadata } from 'next';
import Image from 'next/image';

import { Breadcrumb, EventSchema } from '@/components';
import { getOpengraphImageUrl } from '@/lib/server';

import iconBigBoreImage from '../_assets/icon-big-bore.gif';
import { Win95Window, Win95Button } from '../_components';

export const metadata: Metadata = {
  title: '大口径大会 | 横須賀市ライフル射撃協会',
  description: '大口径大会の情報ページ。センターファイアライフル競技について、射撃姿勢やルールを紹介しています。',
  openGraph: {
    images: [
      {
        url: getOpengraphImageUrl({
          title: '大口径大会',
          subtitle: 'CFライフル競技',
          theme: 'win95',
        }),
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function BigBorePage() {
  return (
    <>
      {/* 構造化データ */}
      <EventSchema
        name="大口径射撃大会"
        description="埼玉県長瀞総合射撃場/千葉県射撃場で開催。センターファイアライフル競技。年4〜5回開催。"
        eventSchedule={{
          repeatFrequency: 'Yearly',
        }}
        location={{
          name: '長瀞総合射撃場',
          address: '埼玉県長瀞町',
        }}
        url="https://yokosuka.kanagawa-rifle.org/competitions/big-bore"
      />

      <div className="min-h-screen bg-[#008080] p-4">
        <Win95Window title="大口径大会 - 横須賀市ライフル射撃協会" icon="🎯" className="mx-auto max-w-4xl">
          <div className="border-2 border-t-[#808080] border-r-white border-b-white border-l-[#808080] bg-[#c0c0c0] p-2">
            {/* パンくずリスト */}
            <div className="mb-2 border-2 border-t-[#808080] border-r-white border-b-white border-l-[#808080] bg-white p-2">
              <Breadcrumb items={[{ name: '競技会', href: '/competitions' }]} current="大口径大会" />
            </div>

            {/* Navigation */}
            <div className="mb-2">
              <Win95Button href="/competitions">← 戻る</Win95Button>
            </div>

            {/* Header */}
            <div className="mb-4 flex flex-col items-center gap-2 border-2 border-t-[#808080] border-r-white border-b-white border-l-[#808080] bg-white p-4">
              <Image src={iconBigBoreImage} alt="大口径大会" />
            </div>

            {/* Main content */}
            <div className="border-2 border-t-[#808080] border-r-white border-b-white border-l-[#808080] bg-white p-4">
              <div className="space-y-4 text-sm leading-relaxed">
                <p>
                  射撃姿勢は委託以外ならOKです。狩猟の方は机に肘をついて撃ったり、
                  競技のための練習に来ている方はプローンで撃っています。
                </p>

                <p>
                  1枚の的に10発撃ち込みで40発または60発を撃って点数を競います。
                  狩猟メインの方は40発、競技メインの方は60発が多いです。
                </p>

                <p>尚、競技日程は年間予定表をご覧ください。</p>
              </div>
            </div>

            {/* Venue info */}
            <div className="mt-4 border-2 border-t-[#808080] border-r-white border-b-white border-l-[#808080] bg-white p-3">
              <div className="mb-2 border-b border-[#808080] pb-1">
                <span className="text-sm font-bold">開催場所</span>
              </div>
              <p className="text-sm">長瀞総合射撃場/千葉県射撃場</p>
            </div>

            {/* Results link */}
            <div className="mt-4 border-2 border-t-[#808080] border-r-white border-b-white border-l-[#808080] bg-[#e0ffe0] p-3">
              <p className="mb-2 font-bold text-[#008000]">過去の大会結果</p>
              <Win95Button href="/competitions/big-bore/results" variant="primary">
                結果を見る
              </Win95Button>
            </div>

            {/* Status bar */}
            <div className="mt-4 flex border-2 border-t-[#808080] border-r-white border-b-white border-l-[#808080] bg-[#c0c0c0]">
              <div className="flex-1 border-r border-[#808080] px-2 py-1 text-xs">大口径ライフル競技</div>
              <div className="px-2 py-1 text-xs">横須賀市ライフル射撃協会</div>
            </div>
          </div>
        </Win95Window>
      </div>
    </>
  );
}
