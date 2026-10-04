import type { Metadata } from 'next';
import Image from 'next/image';

import { getOpengraphImageUrl } from '@/lib/server';

import iconYoungStarImage from '../_assets/icon-young-star.gif';
import { Win95Window, Win95Button } from '../_components';

export const metadata: Metadata = {
  title: 'ヤングスターファイナル（G3） | 横須賀市ライフル射撃協会',
  description: 'ヤングスターファイナル（G3）の大会要項。毎年2月に開催される小中学生大会。',
  openGraph: {
    images: [
      {
        url: getOpengraphImageUrl({
          title: 'ヤングスターファイナル（G3）',
          subtitle: '大会要項',
          theme: 'win95',
        }),
        width: 1200,
        height: 630,
      },
    ],
  },
};

interface FiscalYearData {
  year: string;
  label: string;
  links: {
    details?: string;
    startLists?: string;
    results?: string;
  };
}

const fiscalYears: FiscalYearData[] = [
  {
    year: '2025',
    label: '令和7年度',
    links: {
      details: 'https://static.kanagawa-rifle.org/website/competitions/2025/2026-02-06-young-star-final-details.pdf',
      startLists:
        'https://static.kanagawa-rifle.org/website/competitions/2025/2026-02-06-young-star-final-start-lists.pdf',
      results: 'https://static.kanagawa-rifle.org/website/competitions/2025/2026-02-06-young-star-final-results.pdf',
    },
  },
];

export default function YoungStarFinalPage() {
  return (
    <div className="min-h-screen bg-[#008080] p-4">
      <Win95Window
        title="ヤングスターファイナル（G3） - 横須賀市ライフル射撃協会"
        icon="🏅"
        className="mx-auto max-w-4xl"
      >
        <div className="border-2 border-t-[#808080] border-r-white border-b-white border-l-[#808080] bg-[#c0c0c0] p-2">
          {/* Back button */}
          <div className="mb-2">
            <Win95Button href="/competitions">← 戻る</Win95Button>
          </div>

          {/* Header */}
          <div className="mb-4 flex justify-center border-2 border-t-[#808080] border-r-white border-b-white border-l-[#808080] bg-white p-4">
            <Image src={iconYoungStarImage} alt="ヤングスターファイナル" />
          </div>

          {/* Fiscal year list */}
          <div className="border-2 border-t-[#808080] border-r-white border-b-white border-l-[#808080] bg-white">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#000080] text-white">
                  <th className="border border-[#808080] p-2 text-left">年度</th>
                  <th className="border border-[#808080] p-2 text-center">要項</th>
                  <th className="border border-[#808080] p-2 text-center">射座</th>
                  <th className="border border-[#808080] p-2 text-center">成績</th>
                </tr>
              </thead>
              <tbody>
                {fiscalYears.map((fy, index) => (
                  <tr key={fy.year} className={index % 2 === 0 ? 'bg-white' : 'bg-[#f0f0f0]'}>
                    <td className="border border-[#808080] p-2 font-bold">📅 {fy.label}</td>
                    <td className="border border-[#808080] p-2 text-center">
                      {fy.links.details ? (
                        <Win95Button href={fy.links.details} external>
                          📄 要項
                        </Win95Button>
                      ) : (
                        <span className="text-[#808080]">-</span>
                      )}
                    </td>
                    <td className="border border-[#808080] p-2 text-center">
                      {fy.links.startLists ? (
                        <Win95Button href={fy.links.startLists} external>
                          🎯 射座
                        </Win95Button>
                      ) : (
                        <span className="text-[#808080]">-</span>
                      )}
                    </td>
                    <td className="border border-[#808080] p-2 text-center">
                      {fy.links.results ? (
                        <Win95Button href={fy.links.results} external>
                          🏆 成績
                        </Win95Button>
                      ) : (
                        <span className="text-[#808080]">-</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Description */}
          <div className="mt-4 border-2 border-t-[#808080] border-r-white border-b-white border-l-[#808080] bg-white p-4">
            <h3 className="mb-2 flex items-center gap-2 font-bold text-[#000080]">
              <span>📋</span> 大会概要
            </h3>
            <p className="text-sm leading-relaxed">
              毎年2月に開催される小中学生を対象としたビームライフル射撃大会です。
            </p>
          </div>

          {/* Info box */}
          <div className="mt-4 border-2 border-t-[#808080] border-r-white border-b-white border-l-[#808080] bg-[#ffffcc] p-3">
            <p className="text-xs">
              <span className="font-bold">💡 ヒント:</span> PDFファイルは新しいタブで開きます。
            </p>
          </div>

          {/* Status bar */}
          <div className="mt-4 flex border-2 border-t-[#808080] border-r-white border-b-white border-l-[#808080] bg-[#c0c0c0]">
            <div className="flex-1 border-r border-[#808080] px-2 py-1 text-xs">ヤングスターファイナル（G3）要項</div>
            <div className="px-2 py-1 text-xs">横須賀市ライフル射撃協会</div>
          </div>
        </div>
      </Win95Window>
    </div>
  );
}
