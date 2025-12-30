import type { Metadata } from "next";
import Image from "next/image";
import { getOpengraphImageUrl } from "@/lib/server";
import { Win95Window, Win95Button } from "../_components";
import iconShootingClassImage from "../_assets/icon-shooting-class.gif";

export const metadata: Metadata = {
  title: "ライフル射撃教室 | 横須賀市ライフル射撃協会",
  description: "ライフル射撃教室・キッズ大会のご案内。中学2年生まで参加可能。",
  openGraph: {
    images: [
      {
        url: getOpengraphImageUrl({
          title: "ライフル射撃教室",
          subtitle: "キッズ大会のご案内",
          theme: "win95",
        }),
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function RifleShootingClassPage() {
  return (
    <div className="min-h-screen bg-[#008080] p-4">
      <Win95Window
        title="ライフル射撃教室 - 横須賀市ライフル射撃協会"
        icon="🎯"
        className="mx-auto max-w-4xl"
      >
        <div className="border-2 border-b-white border-l-[#808080] border-r-white border-t-[#808080] bg-[#c0c0c0] p-2">
          {/* Back button */}
          <div className="mb-2">
            <Win95Button href="/competitions">← 戻る</Win95Button>
          </div>

          {/* Header */}
          <div className="mb-4 flex justify-center border-2 border-b-white border-l-[#808080] border-r-white border-t-[#808080] bg-white p-4">
            <Image
              src={iconShootingClassImage}
              alt="ライフル射撃教室"
            />
          </div>

          {/* Main message */}
          <div className="mb-4 border-2 border-b-white border-l-[#808080] border-r-white border-t-[#808080] bg-[#ffffcc] p-4 text-center">
            <p className="text-lg font-bold text-[#800080]">
              国体選手・オリンピック選手を目指しましょう!!
            </p>
          </div>

          {/* Description */}
          <div className="mb-4 border-2 border-b-white border-l-[#808080] border-r-white border-t-[#808080] bg-white p-4">
            <p className="mb-3 text-sm leading-relaxed">
              ビームライフル射撃は、年齢制限や男女問わず、どなたでも体験できます。
            </p>
            <p className="mb-3 text-sm leading-relaxed">
              「キッズ大会」は中学2年生まで出場資格があります。
              練習はいつでも出来ますので、どうぞ射撃場へいらしてみてください。
            </p>
            <div className="mt-4 border-2 border-b-white border-l-[#808080] border-r-white border-t-[#808080] bg-[#e0ffe0] p-3">
              <p className="text-sm font-bold text-[#008000]">
                ※ビームライフルはお貸ししますので、お気軽にご参加ください。
              </p>
              <p className="mt-2 text-sm font-bold text-[#008000]">
                ※市外、県外の方も参加できます。
              </p>
            </div>
          </div>

          {/* Competition info table */}
          <div className="mb-4 border-2 border-b-white border-l-[#808080] border-r-white border-t-[#808080] bg-white">
            <div className="bg-gradient-to-r from-[#000080] to-[#1084d0] px-3 py-2">
              <span className="text-sm font-bold text-white">
                📋 キッズライフル射撃競技会について
              </span>
            </div>
            <table className="w-full text-sm">
              <tbody>
                <tr>
                  <th className="w-1/4 border border-[#808080] bg-[#c0c0c0] p-2 text-left font-bold">
                    目的
                  </th>
                  <td className="border border-[#808080] p-2">
                    射撃競技の裾野拡大を図るとともに、未来のオリンピックメダリストを発掘する。
                  </td>
                </tr>
                <tr>
                  <th className="border border-[#808080] bg-[#c0c0c0] p-2 text-left font-bold">
                    主催
                  </th>
                  <td className="border border-[#808080] p-2">
                    横須賀市ライフル射撃協会
                  </td>
                </tr>
                <tr>
                  <th className="border border-[#808080] bg-[#c0c0c0] p-2 text-left font-bold">
                    対象
                  </th>
                  <td className="border border-[#808080] p-2">
                    ライフル射撃に興味のある中学2年生まで
                  </td>
                </tr>
                <tr>
                  <th className="border border-[#808080] bg-[#c0c0c0] p-2 text-left font-bold">
                    会場
                  </th>
                  <td className="border border-[#808080] p-2">
                    くりはま花の国エアライフル射撃場
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Contact info */}
          <div className="mb-4 border-2 border-b-white border-l-[#808080] border-r-white border-t-[#808080] bg-[#ffffcc] p-4 text-center">
            <p className="mb-2 font-bold text-[#000080]">
              お問い合わせ・お申し込み
            </p>
            <div className="border-2 border-b-white border-l-[#808080] border-r-white border-t-[#808080] bg-white p-3">
              <p className="font-bold text-[#008000]">
                くりはま花の国射撃場
              </p>
              <p className="mt-2 font-bold text-[#008000]">
                TEL／FAX：046-833-6990
              </p>
              <p className="mt-1 font-bold text-[#008000]">
                メール：
                <a
                  href="mailto:yokosukarifle@yahoo.co.jp"
                  className="text-[#0000ff] underline hover:text-[#ff0000]"
                >
                  yokosukarifle@yahoo.co.jp
                </a>
              </p>
            </div>
          </div>

          {/* Results link */}
          <div className="mb-4 flex flex-col items-center border-2 border-b-white border-l-[#808080] border-r-white border-t-[#808080] bg-white p-4">
            <div className="mb-2 text-4xl">🏆</div>
            <Win95Button
              href="/competitions/rifle-shooting-class/results"
              variant="primary"
            >
              📊 大会結果を見る
            </Win95Button>
          </div>

          {/* Status bar */}
          <div className="mt-4 flex border-2 border-b-white border-l-[#808080] border-r-white border-t-[#808080] bg-[#c0c0c0]">
            <div className="flex-1 border-r border-[#808080] px-2 py-1 text-xs">
              ライフル射撃教室
            </div>
            <div className="px-2 py-1 text-xs">横須賀市ライフル射撃協会</div>
          </div>
        </div>
      </Win95Window>
    </div>
  );
}
