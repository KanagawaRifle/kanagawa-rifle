import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "事業計画 | 横須賀市ライフル射撃協会",
  description: "神奈川県、横須賀市ライフル射撃協会の公式サイト。",
};

export default function ProjectsPage() {
  return (
    <div className="container mx-auto flex max-w-7xl flex-col p-2 sm:flex-row">
      <a
        href="/static/projects/project_2025.pdf"
        className="w-64 rounded-full border-4 border-yellow-300 bg-gradient-to-b from-orange-400 via-orange-500 to-orange-600 px-6 py-3 text-center font-bold text-white shadow-2xl hover:from-orange-500 hover:to-orange-700 active:translate-y-1"
      >
        ★ダウンロード★
      </a>
    </div>
  );
}
