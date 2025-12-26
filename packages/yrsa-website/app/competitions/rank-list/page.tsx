import type { Metadata } from "next";
import Image from "next/image";
import { Win95Window, Win95Button } from "../_components";

export const metadata: Metadata = {
  title: "冬季ランクリスト（G3） | 横須賀市ライフル射撃協会",
  description: "冬季ランクリスト競技会（G3）の大会要項。毎年12月・1月・2月に開催。",
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
    year: "2025",
    label: "令和7年度",
    links: {
      details: "https://static.kanagawa-rifle.org/website/competitions/2025/2025-12-06-winter-10m-rank-list-details.pdf",
      startLists: "https://static.kanagawa-rifle.org/website/competitions/2025/2025-12-06-winter-10m-rank-list-start-lists.pdf",
      results: "https://static.kanagawa-rifle.org/website/competitions/2025/2025-12-06-winter-10m-rank-list-results.pdf",
    },
  },
  {
    year: "2024",
    label: "令和6年度",
    links: {
      details: "https://kraofficial.web.fc2.com/static/competitions/2024/2024-12-07-winter-ar-ap-rank-list-details.pdf",
      results: "https://static.kanagawa-rifle.org/website/competitions/2024/2024-12-07-winter-ar-ap-rank-list-results.pdf",
    },
  },
  {
    year: "2023",
    label: "令和5年度",
    links: {
      details: "/static/competitions/2023/2023-12-02-winter-rank-list-details.pdf",
    },
  },
];

export default function RankListPage() {
  return (
    <div className="min-h-screen bg-[#008080] p-4">
      <Win95Window
        title="冬季ランクリスト（G3） - 横須賀市ライフル射撃協会"
        icon="🏅"
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
              src="/images/button221.gif"
              alt="冬季ランクリスト"
              width={155}
              height={46}
            />
          </div>

          {/* Contact info */}
          <div className="mb-4 border-2 border-b-white border-l-[#808080] border-r-white border-t-[#808080] bg-[#ffffcc] p-4 text-center">
            <p className="text-lg font-bold text-[#000080]">
              参加ご希望の方はくりはま花の国射撃場まで！！
            </p>
            <div className="mt-3 border-2 border-b-white border-l-[#808080] border-r-white border-t-[#808080] bg-[#e0ffe0] p-3">
              <p className="mb-2 font-bold text-[#008000]">
                📝 申込フォームからのお申し込みが便利です
              </p>
              <Win95Button
                href="https://forms.gle/PMy9ES3DSEY1Yuso6"
                variant="primary"
                external
              >
                📝 申込フォーム
              </Win95Button>
            </div>
            <div className="mt-3 border-2 border-b-white border-l-[#808080] border-r-white border-t-[#808080] bg-white p-3">
              <p className="text-xs text-[#808080]">電話・FAX・メールでもお申し込みいただけます</p>
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
            <p className="mt-3 text-xs">
              ※毎週月曜（祭日の週は翌日）は射場閉館日の為、電話での受付はできません
              <br />
              （メール及びFAXでは受付可能です）
            </p>
            <p className="mt-2 font-bold text-[#000080]">
              参加費は当日受付でお支払いください。
            </p>
            <p className="mt-2 font-bold text-[#ff0000]">
              注意： 射座入りは開始時間の25分前です。
            </p>
          </div>

          {/* Decorative image */}
          <div className="mb-4 flex justify-center">
            <Image
              src="/images/a_ilst022.gif"
              alt=""
              width={90}
              height={90}
            />
          </div>

          {/* Fiscal year list */}
          <div className="border-2 border-b-white border-l-[#808080] border-r-white border-t-[#808080] bg-white">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#000080] text-white">
                  <th className="border border-[#808080] p-2 text-left">
                    年度
                  </th>
                  <th className="border border-[#808080] p-2 text-center">
                    要項
                  </th>
                  <th className="border border-[#808080] p-2 text-center">
                    射座
                  </th>
                  <th className="border border-[#808080] p-2 text-center">
                    成績
                  </th>
                </tr>
              </thead>
              <tbody>
                {fiscalYears.map((fy, index) => (
                  <tr
                    key={fy.year}
                    className={index % 2 === 0 ? "bg-white" : "bg-[#f0f0f0]"}
                  >
                    <td className="border border-[#808080] p-2 font-bold">
                      📅 {fy.label}
                    </td>
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
          <div className="mt-4 border-2 border-b-white border-l-[#808080] border-r-white border-t-[#808080] bg-white p-4">
            <h3 className="mb-2 flex items-center gap-2 font-bold text-[#000080]">
              <span>📋</span> 大会概要
            </h3>
            <p className="text-sm leading-relaxed">
              毎年、12月・1月・2月、計6回全国の射撃場において、ARピストル・ARライフルのランキング大会を行っています。
              ランキング大会は「公認競技会の格付規定」に基づいて日本ライフル射撃協会の会員内で競い合います。
            </p>
          </div>

          {/* Info box */}
          <div className="mt-4 border-2 border-b-white border-l-[#808080] border-r-white border-t-[#808080] bg-[#ffffcc] p-3">
            <p className="text-xs">
              <span className="font-bold">💡 ヒント:</span>{" "}
              PDFファイルは新しいタブで開きます。
            </p>
          </div>

          {/* Status bar */}
          <div className="mt-4 flex border-2 border-b-white border-l-[#808080] border-r-white border-t-[#808080] bg-[#c0c0c0]">
            <div className="flex-1 border-r border-[#808080] px-2 py-1 text-xs">
              冬季ランクリスト（G3）要項
            </div>
            <div className="px-2 py-1 text-xs">横須賀市ライフル射撃協会</div>
          </div>
        </div>
      </Win95Window>
    </div>
  );
}
