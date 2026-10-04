import type { Metadata } from 'next';
import type { StaticImageData } from 'next/image';
import Image from 'next/image';
import Link from 'next/link';

import { getOpengraphImageUrl } from '@/lib/server';

import headerDecorationImage from './_assets/header-decoration.gif';
import iconBigBoreImage from './_assets/icon-big-bore.gif';
import iconCitizensImage from './_assets/icon-citizens.gif';
import iconGpFinalImage from './_assets/icon-gp-final.gif';
import iconHuntingImage from './_assets/icon-hunting.gif';
import iconMonthlyImage from './_assets/icon-monthly.gif';
import iconRankListImage from './_assets/icon-rank-list.gif';
import iconShootingClassImage from './_assets/icon-shooting-class.gif';
import iconYoungStarImage from './_assets/icon-young-star.gif';
import { Win95Window, Win95Button } from './_components';

export const metadata: Metadata = {
  title: '競技会・大会 | 横須賀市ライフル射撃協会',
  description:
    '横須賀市ライフル射撃協会が主催・共催する競技会一覧。月例会（G4）、冬季ランクリスト、大口径射撃大会、狩猟銃射撃大会、ライフル射撃教室など。',
  keywords: [
    'ライフル射撃大会',
    '月例会',
    '競技会',
    'エアライフル',
    'エアピストル',
    '横須賀',
    '神奈川県',
    '射撃教室',
    'ビームライフル',
    'ランクリスト',
  ],
  openGraph: {
    title: '競技会・大会',
    description: '月例会、ランクリスト、大口径、狩猟銃、射撃教室など競技会情報。',
    images: [
      {
        url: getOpengraphImageUrl({
          title: '競技会・大会',
          subtitle: '主催・共催競技会一覧',
          theme: 'win95',
        }),
        width: 1200,
        height: 630,
      },
    ],
  },
};

interface CompetitionCardProps {
  icon: StaticImageData;
  title: string;
  description: string;
  infoHref?: string;
  guidelinesHref?: string;
  resultsHref?: string;
  startListsHref?: string;
}

function CompetitionCard({
  icon,
  title,
  description,
  infoHref,
  guidelinesHref,
  resultsHref,
  startListsHref,
}: CompetitionCardProps) {
  return (
    <div className="flex flex-col border-2 border-t-white border-r-[#808080] border-b-[#808080] border-l-white bg-[#c0c0c0] [box-shadow:inset_-1px_-1px_0_0_#000000,inset_1px_1px_0_0_#dfdfdf]">
      {/* Title bar */}
      <div className="flex items-center gap-1 bg-gradient-to-r from-[#000080] to-[#1084d0] px-2 py-1">
        <Image src={icon} alt="" width={16} height={16} className="h-4 w-4" />
        <span className="text-xs font-bold text-white">{title}</span>
      </div>
      {/* Content */}
      <div className="flex flex-1 flex-col p-2">
        <div className="mb-2 flex justify-center border-2 border-t-[#808080] border-r-white border-b-white border-l-[#808080] bg-white p-2">
          <Image src={icon} alt={title} width={200} height={50} className="block" />
        </div>
        {description && (
          <div className="flex-1 border-2 border-t-[#808080] border-r-white border-b-white border-l-[#808080] bg-white p-2">
            <p className="text-xs leading-relaxed text-black">{description}</p>
          </div>
        )}
        {(infoHref || guidelinesHref || startListsHref || resultsHref) && (
          <div className="mt-2 flex gap-2">
            {infoHref && (
              <Win95Button href={infoHref} variant="primary">
                大会情報
              </Win95Button>
            )}
            {guidelinesHref && (
              <Win95Button href={guidelinesHref} variant="primary">
                要項
              </Win95Button>
            )}
            {startListsHref && <Win95Button href={startListsHref}>射座</Win95Button>}
            {resultsHref && <Win95Button href={resultsHref}>結果</Win95Button>}
          </div>
        )}
      </div>
    </div>
  );
}

export default function CompetitionsPage() {
  return (
    <div className="min-h-screen bg-[#008080] p-4">
      <Win95Window title="競技会・大会 - 横須賀市ライフル射撃協会" icon="🏆" className="mx-auto max-w-4xl">
        <div className="border-2 border-t-[#808080] border-r-white border-b-white border-l-[#808080] bg-[#c0c0c0] p-2">
          {/* Header section */}
          <div className="mb-4 flex flex-col items-center gap-4 border-2 border-t-[#808080] border-r-white border-b-white border-l-[#808080] bg-white p-4 md:flex-row">
            <Image
              src="/images/og-cover.jpg"
              width={150}
              height={150}
              alt="横須賀市ライフル射撃協会"
              className="border-2 border-t-[#808080] border-r-white border-b-white border-l-[#808080]"
            />
            <div className="text-center md:text-left">
              <Image alt="競技・狩猟・大口径" src={headerDecorationImage} />
              <p className="mt-2 text-sm text-[#000080]">★ 横須賀市ライフル射撃協会が主催・共催する競技会一覧 ★</p>
            </div>
          </div>

          {/* 射撃場へのリンク */}
          <div className="mb-4 border-2 border-t-[#808080] border-r-white border-b-white border-l-[#808080] bg-[#ffffc0] p-3">
            <p className="text-sm">
              📍 競技会は主に{' '}
              <Link href="/shooting-range" className="text-[#000080] underline hover:text-[#0000ff]">
                くりはま花の国エアライフル射撃場
              </Link>{' '}
              で開催されます。
              <Link href="/shooting-range/guide" className="ml-2 text-[#000080] underline hover:text-[#0000ff]">
                利用案内
              </Link>
              {' | '}
              <Link href="/shooting-range/access" className="text-[#000080] underline hover:text-[#0000ff]">
                アクセス
              </Link>
            </p>
          </div>

          {/* Competition cards grid */}
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
            <CompetitionCard
              icon={iconMonthlyImage}
              title="月例会（G4）"
              description="久里浜花の国射撃場にて月１回行われている射撃大会です。参加をご希望の方は、要項をご確認のうえエントリーしてください。"
              guidelinesHref="/competitions/monthly"
              resultsHref="/competitions/monthly/results"
            />

            <CompetitionCard
              icon={iconRankListImage}
              title="冬季ランクリスト（G3）"
              description="毎年、１２月・１月・２月、計６回全国の射撃場において、ＡＲピストル・ＡＲライフルのランキング大会を行っています。ランキング大会は「公認競技会の格付規定」に基づいて日本ライフル射撃協会の会員内で競い合います。"
              infoHref="/competitions/rank-list"
            />

            <CompetitionCard
              icon={iconBigBoreImage}
              title="大口径射撃大会"
              description="横須賀ライフル射撃協会では、主に年4～5回の割合で埼玉県長瀞総合射撃場の300ｍを借りて大会を行っております。全日本や国際大会のように堅苦しい競技大会ではなくみんなで集まって楽しく鉄砲をぶっ放すという大会です。"
              guidelinesHref="/competitions/big-bore"
              resultsHref="/competitions/big-bore/results"
            />

            <CompetitionCard
              icon={iconHuntingImage}
              title="狩猟銃射撃大会"
              description="空気銃狩猟の安全思想の啓発と銃の安全な取り扱いの習熟と、射撃技術の向上を目的としています。"
              guidelinesHref="/competitions/hunting"
              resultsHref="/competitions/hunting/results"
            />

            <CompetitionCard
              icon={iconYoungStarImage}
              title="ヤングスターファイナル（G3）"
              description="毎年2月に開催される小中学生大会です。"
              infoHref="/competitions/young-star-final"
            />

            <CompetitionCard
              icon={iconShootingClassImage}
              title="ライフル射撃教室"
              description="ビームライフル射撃は、年齢制限や男女問わず、どなたでも体験できますが、「キッズ大会は」中学２年年生まで出場資格が取れます。練習はいつでも出来ますので、どうぞ射撃場へいらしてみてください。"
              guidelinesHref="/competitions/rifle-shooting-class"
              resultsHref="/competitions/rifle-shooting-class/results"
            />

            <CompetitionCard
              icon={iconCitizensImage}
              title="横須賀市民体育大会"
              description="毎年２月上旬頃に、横須賀市民大会 兼 防衛大学対抗戦として射撃大会を行っています。"
              resultsHref="/competitions/citizens/results"
            />

            <CompetitionCard
              icon={iconGpFinalImage}
              title="GPファイナル"
              description="年間の月例会成績上位者によるファイナル形式の大会です。"
              guidelinesHref="/competitions/gp-final"
              resultsHref="/competitions/gp-final/results"
            />
          </div>

          {/* Status bar */}
          <div className="mt-4 flex border-2 border-t-[#808080] border-r-white border-b-white border-l-[#808080] bg-[#c0c0c0]">
            <div className="flex-1 border-r border-[#808080] px-2 py-1 text-xs">競技会: 8件</div>
            <div className="px-2 py-1 text-xs">横須賀市ライフル射撃協会</div>
          </div>
        </div>
      </Win95Window>
    </div>
  );
}
