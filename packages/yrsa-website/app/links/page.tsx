import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "リンクのページ | 横須賀市ライフル射撃協会",
  description:
    "リンクのページ。神奈川県、横須賀市ライフル射撃協会の公式サイト。",
};

const links = [
  {
    href: "http://yokosuka-sports.jp/",
    image: "yokosuka-sports.jp.png",
    title: "横須賀市スポーツ協会",
    description: "横須賀市スポーツ協会です",
  },
  {
    href: "https://www.nagatoro-shooting.jp/",
    image: "nagatoro-shooting.jp.png",
    title: "埼玉県長瀞総合射撃場",
    description: "大口径射撃大会でお世話になっている射撃場です",
  },
  {
    href: "http://www.isehara-shooting.jp/",
    image: "isehara-shooting.jp.png",
    title: "神奈川県立伊勢原射撃場",
    description: "４月に再オープンした伊勢原射撃場",
  },
  {
    href: "https://kraofficial.web.fc2.com/",
    image: "kanagawa-rifle.org.png",
    title: "神奈川県ライフル射撃協会",
    description: "神奈川県のライフル射撃協会",
  },
  {
    href: "http://www.riflesports.jp/",
    image: "riflesports.jp.png",
    title: "日本ライフル射撃協会",
    description: "日本ライフル射撃協会",
  },
  {
    href: "http://www.mastersrifle.npo-jp.net/",
    image: "mastersrifle.npo-jp.net.png",
    title: "日本マスターズライフル射撃連合",
    description: "35歳以上なら誰でも入れます",
  },
  {
    href: "http://www.cra1964.sakura.ne.jp/",
    image: "cra1964.sakura.ne.jp.png",
    title: "千葉県ライフル射撃協会",
    description: "千葉県のライフル射撃協会",
  },
  {
    href: "https://www.rifle-aichi.org/",
    image: "rifle-aichi.org.png",
    title: "愛知県ライフル射撃協会",
    description: "愛知県のライフル射撃協会",
  },
  {
    href: "https://jpssf.com/",
    image: "jpssf.com.png",
    title: "日本障害者スポーツ射撃連盟",
    description: "",
  },
  {
    href: "https://www.tokyo-rifle.org/",
    image: "tokyo-rifle.org.png",
    title: "東京都ライフル射撃協会",
    description: "東京都のライフル射撃協会",
  },
  {
    href: "http://web.thn.jp/s-rifle/",
    image: "web.thn.jp.s-rifle.png",
    title: "静岡県ライフル射撃協会",
    description: "静岡県のライフル射撃協会",
  },
  {
    href: "https://www.rs-ennis.com/",
    image: "rs-ennis.com.png",
    title: "ライフルショップエニス",
    description: "恵比寿にある銃砲店です",
  },
  {
    href: "http://www.ginzagun.com/",
    image: "ginzagun.com.png",
    title: "銀座鉄砲店",
    description: "東銀座にある銃砲店です",
  },
  {
    href: "http://www.kunitomogs.co.jp/index.php",
    image: "kunitomogs.co.jp.png",
    title: "国友銃砲火薬店",
    description: "京都市にある火薬店です",
  },
];

export default function LinksPage() {
  return (
    <div className="container mx-auto grid max-w-7xl grid-cols-1 gap-4 p-4 md:grid-cols-3">
      <div>
        <h1>
          <Image
            src="/images/anim2.gif"
            width={486}
            height={57}
            alt="リンクのページ"
            className="block"
          />
        </h1>
      </div>

      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="block rounded border border-slate-300 bg-slate-200 hover:bg-slate-300"
        >
          <Image
            src={`/images/links/${link.image}`}
            alt=""
            width={400}
            height={300}
            className="block w-full overflow-clip"
          />
          <div className="m-4 font-bold">{link.title}</div>
          {link.description && <div className="m-4">{link.description}</div>}
        </a>
      ))}
    </div>
  );
}
