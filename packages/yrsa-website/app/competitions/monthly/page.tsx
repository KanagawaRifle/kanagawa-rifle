import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Win95Window } from "@/components/win95-window";

export const metadata: Metadata = {
  title: "月例会（G4） | 横須賀市ライフル射撃協会",
  description: "月例会（G4）の大会要項。くりはま花の国エアライフル射撃場にて毎月開催。",
};

function Win95Button({
  href,
  children,
  variant = "default",
  external = false,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "default" | "primary";
  external?: boolean;
}) {
  const baseClasses =
    "inline-block px-4 py-1 text-sm font-bold border-2 border-t-white border-l-white border-r-[#808080] border-b-[#808080] [box-shadow:inset_-1px_-1px_0_0_#000000,inset_1px_1px_0_0_#dfdfdf] active:border-t-[#808080] active:border-l-[#808080] active:border-r-white active:border-b-white";
  const variantClasses =
    variant === "primary"
      ? "bg-[#000080] text-white hover:bg-[#0000aa]"
      : "bg-[#c0c0c0] text-black hover:bg-[#d4d4d4]";

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${baseClasses} ${variantClasses}`}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={`${baseClasses} ${variantClasses}`}>
      {children}
    </Link>
  );
}

export default function MonthlyCompetitionPage() {
  return (
    <div className="min-h-screen bg-[#008080] p-4">
      <Win95Window title="月例会（G4） - 横須賀市ライフル射撃協会" icon="🎯" className="mx-auto max-w-4xl">
        <div className="border-2 border-b-white border-l-[#808080] border-r-white border-t-[#808080] bg-[#c0c0c0] p-2">
          {/* Back button */}
          <div className="mb-2">
            <Win95Button href="/competitions">← 戻る</Win95Button>
          </div>

          {/* Header */}
          <div className="mb-4 flex justify-center border-2 border-b-white border-l-[#808080] border-r-white border-t-[#808080] bg-white p-4">
            <Image
              src="/images/button9.gif"
              alt="月例会"
              width={155}
              height={46}
            />
          </div>

          {/* Application buttons */}
          <div className="mb-4 flex flex-wrap justify-center gap-2 border-2 border-b-white border-l-[#808080] border-r-white border-t-[#808080] bg-[#ffffcc] p-3">
            <Win95Button
              href="https://forms.gle/PMy9ES3DSEY1Yuso6"
              variant="primary"
              external
            >
              📝 申込フォーム
            </Win95Button>
            <Win95Button
              href="https://docs.google.com/spreadsheets/d/e/2PACX-1vS5ieJThK2GHfOjQS6aTpQzBDDbZ1u6FEGSakUCDr2pd1AUvfOTh_sLfKdaypOb_QcVpwdkQG97GHgo/pubhtml"
              external
            >
              📋 参加者名簿
            </Win95Button>
          </div>

          {/* Main table */}
          <div className="border-2 border-b-white border-l-[#808080] border-r-white border-t-[#808080] bg-white">
            <table className="w-full text-sm">
              <tbody>
                <tr>
                  <th className="w-1/4 border border-[#808080] bg-[#c0c0c0] p-2 text-left font-bold">
                    お申込
                  </th>
                  <td className="border border-[#808080] p-2" colSpan={2}>
                    <p>
                      電話、FAX、Eメール、またはお申込フォームにて開催日の3日前までに横須賀市ライフル射撃協会までお申込ください。
                    </p>
                    <p className="mt-2 font-bold text-[#008000]">
                      電話・FAX：046-833-6990
                    </p>
                    <p className="font-bold text-[#008000]">
                      Eメール：yokosukarifle@yahoo.co.jp
                    </p>
                  </td>
                </tr>
                <tr>
                  <th className="border border-[#808080] bg-[#c0c0c0] p-2 text-left font-bold">
                    大会名
                  </th>
                  <td className="border border-[#808080] p-2" colSpan={2}>
                    《G4》月例会／山梨県・千葉県・神奈川県・横須賀市対抗戦
                  </td>
                </tr>
                <tr>
                  <th className="border border-[#808080] bg-[#c0c0c0] p-2 text-left font-bold">
                    会場
                  </th>
                  <td className="border border-[#808080] p-2" colSpan={2}>
                    くりはま花の国エアライフル射撃場 (神奈川県横須賀市)
                  </td>
                </tr>
                <tr>
                  <th className="border border-[#808080] bg-[#c0c0c0] p-2 text-left font-bold">
                    期日
                  </th>
                  <td className="border border-[#808080] p-2" colSpan={2}>
                    毎月第4土曜日
                    <br />
                    <span className="text-xs text-[#808080]">
                      ※第4ではない場合もありますので詳細は予定表をご確認ください。
                    </span>
                  </td>
                </tr>
                <tr>
                  <th className="border border-[#808080] bg-[#c0c0c0] p-2 text-left font-bold">
                    使用標的
                  </th>
                  <td className="border border-[#808080] p-2" colSpan={2}>
                    BR・BP公認標的装置（興東電子社製）
                    <br />
                    公認電子標的（Meyton社製）
                  </td>
                </tr>
                <tr>
                  <th className="border border-[#808080] bg-[#c0c0c0] p-2 text-left font-bold">
                    参加資格
                  </th>
                  <td className="border border-[#808080] p-2" colSpan={2}>
                    特になし
                  </td>
                </tr>
                <tr>
                  <th
                    className="border border-[#808080] bg-[#c0c0c0] p-2 text-left font-bold"
                    rowSpan={5}
                  >
                    種目
                    <br />
                    10m競技
                  </th>
                  <td className="border border-[#808080] p-2" colSpan={2}>
                    AR 60S M/W/MJ/WJ
                  </td>
                </tr>
                <tr>
                  <td className="border border-[#808080] p-2" colSpan={2}>
                    AP 60 M/W/MJ/WJ
                  </td>
                </tr>
                <tr>
                  <td className="border border-[#808080] p-2" colSpan={2}>
                    BR 60S M/W/MJ/WJ
                  </td>
                </tr>
                <tr>
                  <td className="border border-[#808080] p-2" colSpan={2}>
                    BP 60 M/W/MJ/WJ
                  </td>
                </tr>
                <tr>
                  <td className="border border-[#808080] p-2" colSpan={2}>
                    HR 40
                  </td>
                </tr>
                <tr>
                  <th
                    className="border border-[#808080] bg-[#c0c0c0] p-2 text-left font-bold"
                    rowSpan={5}
                  >
                    射群
                  </th>
                  <td className="border border-[#808080] p-2">第1射群</td>
                  <td className="border border-[#808080] p-2">
                    9:00～ (8:35射座入り)
                  </td>
                </tr>
                <tr>
                  <td className="border border-[#808080] p-2">第2射群</td>
                  <td className="border border-[#808080] p-2">
                    11:00～ (10:35射座入り)
                  </td>
                </tr>
                <tr>
                  <td className="border border-[#808080] p-2">第3射群</td>
                  <td className="border border-[#808080] p-2">
                    13:00～ (12:35射座入り)
                  </td>
                </tr>
                <tr>
                  <td className="border border-[#808080] p-2">第4射群</td>
                  <td className="border border-[#808080] p-2">
                    15:00～ (14:35射座入り)
                  </td>
                </tr>
                <tr>
                  <td className="border border-[#808080] p-2">第5射群</td>
                  <td className="border border-[#808080] p-2">
                    17:00～ (16:35射座入り)
                  </td>
                </tr>
                <tr>
                  <th
                    className="border border-[#808080] bg-[#c0c0c0] p-2 text-left font-bold"
                    rowSpan={4}
                  >
                    参加料
                  </th>
                  <td className="border border-[#808080] p-2" rowSpan={2}>
                    AR/AP/HR 種目
                  </td>
                  <td className="border border-[#808080] p-2">一般　3,500円</td>
                </tr>
                <tr>
                  <td className="border border-[#808080] p-2">
                    <span className="text-xs">
                      山梨県・千葉県・横須賀市
                      <br />
                      ライフル射撃協会会員
                    </span>
                    　3,000円
                  </td>
                </tr>
                <tr>
                  <td className="border border-[#808080] p-2" rowSpan={2}>
                    BR/BP 種目
                  </td>
                  <td className="border border-[#808080] p-2">
                    一般　AR/AP種目と同様
                  </td>
                </tr>
                <tr>
                  <td className="border border-[#808080] p-2">
                    高校生以下　2,000円 (会員: 1,500円)
                  </td>
                </tr>
                <tr>
                  <th className="border border-[#808080] bg-[#c0c0c0] p-2 text-left font-bold">
                    その他
                  </th>
                  <td className="border border-[#808080] p-2" colSpan={2}>
                    <ul className="list-inside list-disc text-xs">
                      <li>出場者多数の場合は随時射群を増やします。</li>
                      <li>
                        段級受験者は受験料・登録料が必要です。競技が始まるまでに受付にてお申込ください。
                      </li>
                      <li>参加料・受験料・登録料は当日お支払いください。</li>
                      <li>銃の所持許可証・会員証・射手手帳を携帯してください。</li>
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Results link */}
          <div className="mt-4 flex flex-col items-center border-2 border-b-white border-l-[#808080] border-r-white border-t-[#808080] bg-white p-4">
            <div className="mb-2 text-4xl">🏆</div>
            <Win95Button href="/competitions/monthly/results" variant="primary">
              📊 大会結果を見る
            </Win95Button>
          </div>

          {/* Status bar */}
          <div className="mt-4 flex border-2 border-b-white border-l-[#808080] border-r-white border-t-[#808080] bg-[#c0c0c0]">
            <div className="flex-1 border-r border-[#808080] px-2 py-1 text-xs">
              月例会（G4）要項
            </div>
            <div className="px-2 py-1 text-xs">横須賀市ライフル射撃協会</div>
          </div>
        </div>
      </Win95Window>
    </div>
  );
}
