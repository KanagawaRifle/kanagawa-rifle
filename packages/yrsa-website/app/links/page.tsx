import type { Metadata } from "next";
import {
  LiquidGlassBackground,
  LiquidGlassPanel,
  LiquidGlassCard,
  LiquidGlassPill,
} from "./_components";

export const metadata: Metadata = {
  title: "リンクのページ | 横須賀市ライフル射撃協会",
  description:
    "リンクのページ。神奈川県、横須賀市ライフル射撃協会の公式サイト。",
};

const links = [
  {
    href: "http://yokosuka-sports.jp/",
    image: "/images/links/yokosuka-sports.jp.png",
    title: "横須賀市スポーツ協会",
    description: "横須賀市スポーツ協会です",
  },
  {
    href: "https://www.nagatoro-shooting.jp/",
    image: "/images/links/nagatoro-shooting.jp.png",
    title: "埼玉県長瀞総合射撃場",
    description: "大口径射撃大会でお世話になっている射撃場です",
  },
  {
    href: "http://www.isehara-shooting.jp/",
    image: "/images/links/isehara-shooting.jp.png",
    title: "神奈川県立伊勢原射撃場",
    description: "４月に再オープンした伊勢原射撃場",
  },
  {
    href: "https://kraofficial.web.fc2.com/",
    image: "/images/links/kanagawa-rifle.org.png",
    title: "神奈川県ライフル射撃協会",
    description: "神奈川県のライフル射撃協会",
  },
  {
    href: "http://www.riflesports.jp/",
    image: "/images/links/riflesports.jp.png",
    title: "日本ライフル射撃協会",
    description: "日本ライフル射撃協会",
  },
  {
    href: "http://www.mastersrifle.npo-jp.net/",
    image: "/images/links/mastersrifle.npo-jp.net.png",
    title: "日本マスターズライフル射撃連合",
    description: "35歳以上なら誰でも入れます",
  },
  {
    href: "http://www.cra1964.sakura.ne.jp/",
    image: "/images/links/cra1964.sakura.ne.jp.png",
    title: "千葉県ライフル射撃協会",
    description: "千葉県のライフル射撃協会",
  },
  {
    href: "https://www.rifle-aichi.org/",
    image: "/images/links/rifle-aichi.org.png",
    title: "愛知県ライフル射撃協会",
    description: "愛知県のライフル射撃協会",
  },
  {
    href: "https://jpssf.com/",
    image: "/images/links/jpssf.com.png",
    title: "日本障害者スポーツ射撃連盟",
    description: "",
  },
  {
    href: "https://www.tokyo-rifle.org/",
    image: "/images/links/tokyo-rifle.org.png",
    title: "東京都ライフル射撃協会",
    description: "東京都のライフル射撃協会",
  },
  {
    href: "http://web.thn.jp/s-rifle/",
    image: "/images/links/web.thn.jp.s-rifle.png",
    title: "静岡県ライフル射撃協会",
    description: "静岡県のライフル射撃協会",
  },
  {
    href: "https://www.rs-ennis.com/",
    image: "/images/links/rs-ennis.com.png",
    title: "ライフルショップエニス",
    description: "恵比寿にある銃砲店です",
  },
  {
    href: "http://www.ginzagun.com/",
    image: "/images/links/ginzagun.com.png",
    title: "銀座鉄砲店",
    description: "東銀座にある銃砲店です",
  },
  {
    href: "http://www.kunitomogs.co.jp/index.php",
    image: "/images/links/kunitomogs.co.jp.png",
    title: "国友銃砲火薬店",
    description: "京都市にある火薬店です",
  },
];

export default function LinksPage() {
  return (
    <LiquidGlassBackground>
      {/* Header */}
      <div className="mb-10 text-center">
        <LiquidGlassPanel>
          <h1 className="bg-gradient-to-b from-slate-800 via-slate-700 to-slate-600 bg-clip-text text-3xl font-semibold tracking-tight text-transparent md:text-4xl">
            リンクのページ
          </h1>
          <p className="mt-3 text-sm font-medium text-slate-600">
            関連団体・施設へのリンク集
          </p>
        </LiquidGlassPanel>
      </div>

      {/* Links Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {links.map((link) => (
          <LiquidGlassCard
            key={link.href}
            href={link.href}
            image={link.image}
            title={link.title}
            description={link.description}
          />
        ))}
      </div>

      {/* Footer */}
      <div className="mt-14 text-center">
        <LiquidGlassPill>横須賀市ライフル射撃協会</LiquidGlassPill>
      </div>
    </LiquidGlassBackground>
  );
}
