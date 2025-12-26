import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Win95Card } from "@/components/win95-card";

export const metadata: Metadata = {
  title: "競技会・大会 | 横須賀市ライフル射撃協会",
  description: "競技会・大会。神奈川県、横須賀市ライフル射撃協会の公式サイト。",
};

interface CompetitionCardProps {
  iconSrc: string;
  title?: string;
  description: string;
  guidelinesHref?: string;
  resultsHref?: string;
}

function CompetitionCard({
  iconSrc,
  description,
  guidelinesHref,
  resultsHref,
}: CompetitionCardProps) {
  return (
    <div className="flex flex-col rounded border border-slate-300 bg-slate-100 p-4">
      <Image
        src={iconSrc}
        alt=""
        width={200}
        height={50}
        className="mb-4 block"
      />
      <p className="flex-1 text-sm">{description}</p>
      <div className="mt-4 flex gap-2">
        {guidelinesHref && (
          <Link
            href={guidelinesHref}
            className="rounded bg-indigo-600 px-4 py-2 text-sm text-white hover:bg-indigo-700"
          >
            要項
          </Link>
        )}
        {resultsHref && (
          <Link
            href={resultsHref}
            className="rounded bg-slate-600 px-4 py-2 text-sm text-white hover:bg-slate-700"
          >
            結果
          </Link>
        )}
      </div>
    </div>
  );
}

export default function CompetitionsPage() {
  return (
    <div className="container mx-auto grid max-w-7xl grid-cols-1 gap-4 p-4 md:grid-cols-3">
      <div>
        <div className="my-4 flex justify-center">
          <Image
            src="/images/2.jpg"
            width={227}
            height={227}
            alt="横須賀市ライフル射撃協会"
          />
        </div>
        <h2 className="mt-4 flex justify-center">
          <Image
            alt="競技・狩猟・大口径"
            src="/images/anim33.gif"
            width={344}
            height={59}
          />
        </h2>
      </div>

      <CompetitionCard
        iconSrc="/images/button9.gif"
        description="久里浜花の国射撃場にて月１回行われている射撃大会です。参加をご希望の方は、要項をご確認のうえエントリーしてください。"
        guidelinesHref="/competitions/monthly"
        resultsHref="/competitions/monthly/results"
      />

      <CompetitionCard
        iconSrc="/images/button221.gif"
        description="毎年、１２月・１月・２月、計６回全国の射撃場において、ＡＲピストル・ＡＲライフルのランキング大会を行っています。ランキング大会は「公認競技会の格付規定」に基づいて日本ライフル射撃協会の会員内で競い合います。"
        guidelinesHref="/competitions/rank-list"
        resultsHref="https://static.kanagawa-rifle.org/website/competitions/2024/2024-12-07-winter-ar-ap-rank-list-results.pdf"
      />

      <CompetitionCard
        iconSrc="/images/button321.gif"
        description="横須賀ライフル射撃協会では、主に年4～5回の割合で埼玉県長瀞総合射撃場の300ｍを借りて大会を行っております。全日本や国際大会のように堅苦しい競技大会ではなくみんなで集まって楽しく鉄砲をぶっ放すという大会です。"
      />

      <CompetitionCard
        iconSrc="/images/button17.gif"
        description="空気銃狩猟の安全思想の啓発と銃の安全な取り扱いの習熟と、射撃技術の向上を目的としています。"
      />

      <CompetitionCard
        iconSrc="/images/button55.gif"
        description="毎年2月に開催される小中学生大会です。"
        guidelinesHref="https://static.kanagawa-rifle.org/website/competitions/2025/2026-02-06-young-star-final-details.pdf"
      />

      <CompetitionCard
        iconSrc="/images/button222.gif"
        description="ビームライフル射撃は、年齢制限や男女問わず、どなたでも体験できますが、「キッズ大会は」中学２年年生まで出場資格が取れます。練習はいつでも出来ますので、どうぞ射撃場へいらしてみてください。"
        resultsHref="/competitions/rifle-shooting-class/results"
      />

      <CompetitionCard
        iconSrc="/images/button7.gif"
        description="毎年２月上旬頃に、射撃大会を行っています。"
      />

      <CompetitionCard
        iconSrc="/images/button316.gif"
        description=""
        guidelinesHref="/competitions/gp-final"
      />
    </div>
  );
}
