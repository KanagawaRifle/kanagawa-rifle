import type { Metadata } from "next";
import Image from "next/image";
import { Win95Window, Win95Button } from "./_components";

export const metadata: Metadata = {
  title: "競技会・大会 | 横須賀市ライフル射撃協会",
  description: "競技会・大会。神奈川県、横須賀市ライフル射撃協会の公式サイト。",
};

interface CompetitionCardProps {
  iconSrc: string;
  title: string;
  description: string;
  guidelinesHref?: string;
  resultsHref?: string;
}

function CompetitionCard({
  iconSrc,
  title,
  description,
  guidelinesHref,
  resultsHref,
}: CompetitionCardProps) {
  return (
    <div className="flex flex-col border-2 border-b-[#808080] border-l-white border-r-[#808080] border-t-white bg-[#c0c0c0] [box-shadow:inset_-1px_-1px_0_0_#000000,inset_1px_1px_0_0_#dfdfdf]">
      {/* Title bar */}
      <div className="flex items-center gap-1 bg-gradient-to-r from-[#000080] to-[#1084d0] px-2 py-1">
        <Image src={iconSrc} alt="" width={16} height={16} className="h-4 w-4" />
        <span className="text-xs font-bold text-white">{title}</span>
      </div>
      {/* Content */}
      <div className="flex flex-1 flex-col p-2">
        <div className="mb-2 flex justify-center border-2 border-b-white border-l-[#808080] border-r-white border-t-[#808080] bg-white p-2">
          <Image src={iconSrc} alt={title} width={200} height={50} className="block" />
        </div>
        {description && (
          <div className="flex-1 border-2 border-b-white border-l-[#808080] border-r-white border-t-[#808080] bg-white p-2">
            <p className="text-xs leading-relaxed text-black">{description}</p>
          </div>
        )}
        {(guidelinesHref || resultsHref) && (
          <div className="mt-2 flex gap-2">
            {guidelinesHref && (
              <Win95Button href={guidelinesHref} variant="primary">
                要項
              </Win95Button>
            )}
            {resultsHref && (
              <Win95Button href={resultsHref}>結果</Win95Button>
            )}
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
        <div className="border-2 border-b-white border-l-[#808080] border-r-white border-t-[#808080] bg-[#c0c0c0] p-2">
          {/* Header section */}
          <div className="mb-4 flex flex-col items-center gap-4 border-2 border-b-white border-l-[#808080] border-r-white border-t-[#808080] bg-white p-4 md:flex-row">
            <Image
              src="/images/2.jpg"
              width={150}
              height={150}
              alt="横須賀市ライフル射撃協会"
              className="border-2 border-b-white border-l-[#808080] border-r-white border-t-[#808080]"
            />
            <div className="text-center md:text-left">
              <Image
                alt="競技・狩猟・大口径"
                src="/images/anim33.gif"
                width={344}
                height={59}
              />
              <p className="mt-2 text-sm text-[#000080]">
                ★ 横須賀市ライフル射撃協会が主催・共催する競技会一覧 ★
              </p>
            </div>
          </div>

          {/* Competition cards grid */}
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
            <CompetitionCard
              iconSrc="/images/button9.gif"
              title="月例会（G4）"
              description="久里浜花の国射撃場にて月１回行われている射撃大会です。参加をご希望の方は、要項をご確認のうえエントリーしてください。"
              guidelinesHref="/competitions/monthly"
              resultsHref="/competitions/monthly/results"
            />

            <CompetitionCard
              iconSrc="/images/button221.gif"
              title="冬季ランクリスト（G3）"
              description="毎年、１２月・１月・２月、計６回全国の射撃場において、ＡＲピストル・ＡＲライフルのランキング大会を行っています。ランキング大会は「公認競技会の格付規定」に基づいて日本ライフル射撃協会の会員内で競い合います。"
              guidelinesHref="/competitions/rank-list"
              resultsHref="https://static.kanagawa-rifle.org/website/competitions/2024/2024-12-07-winter-ar-ap-rank-list-results.pdf"
            />

            <CompetitionCard
              iconSrc="/images/button321.gif"
              title="大口径射撃大会"
              description="横須賀ライフル射撃協会では、主に年4～5回の割合で埼玉県長瀞総合射撃場の300ｍを借りて大会を行っております。全日本や国際大会のように堅苦しい競技大会ではなくみんなで集まって楽しく鉄砲をぶっ放すという大会です。"
              guidelinesHref="/competitions/big-bore"
              resultsHref="/competitions/big-bore/results"
            />

            <CompetitionCard
              iconSrc="/images/button17.gif"
              title="狩猟銃射撃大会"
              description="空気銃狩猟の安全思想の啓発と銃の安全な取り扱いの習熟と、射撃技術の向上を目的としています。"
              guidelinesHref="/competitions/hunting"
              resultsHref="/competitions/hunting/results"
            />

            <CompetitionCard
              iconSrc="/images/button55.gif"
              title="ヤングスターファイナル（G3）"
              description="毎年2月に開催される小中学生大会です。"
              guidelinesHref="https://static.kanagawa-rifle.org/website/competitions/2025/2026-02-06-young-star-final-details.pdf"
            />

            <CompetitionCard
              iconSrc="/images/button222.gif"
              title="ライフル射撃教室"
              description="ビームライフル射撃は、年齢制限や男女問わず、どなたでも体験できますが、「キッズ大会は」中学２年年生まで出場資格が取れます。練習はいつでも出来ますので、どうぞ射撃場へいらしてみてください。"
              guidelinesHref="/competitions/rifle-shooting-class"
              resultsHref="/competitions/rifle-shooting-class/results"
            />

            <CompetitionCard
              iconSrc="/images/button7.gif"
              title="横須賀市民体育大会"
              description="毎年２月上旬頃に、横須賀市民大会 兼 防衛大学対抗戦として射撃大会を行っています。"
              resultsHref="/competitions/citizens/results"
            />

            <CompetitionCard
              iconSrc="/images/button316.gif"
              title="GPファイナル"
              description="年間の月例会成績上位者によるファイナル形式の大会です。"
              guidelinesHref="/competitions/gp-final"
              resultsHref="/competitions/gp-final/results"
            />
          </div>

          {/* Status bar */}
          <div className="mt-4 flex border-2 border-b-white border-l-[#808080] border-r-white border-t-[#808080] bg-[#c0c0c0]">
            <div className="flex-1 border-r border-[#808080] px-2 py-1 text-xs">
              競技会: 8件
            </div>
            <div className="px-2 py-1 text-xs">
              横須賀市ライフル射撃協会
            </div>
          </div>
        </div>
      </Win95Window>
    </div>
  );
}
