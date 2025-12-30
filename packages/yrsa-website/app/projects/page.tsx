import type { Metadata } from "next";
import Link from "next/link";
import { getOpengraphImageUrl } from "@/lib/server";
import { TerminalCalendar } from "./_components";
import styles from "./terminal.module.css";

export const metadata: Metadata = {
  title: "事業計画 | 横須賀市ライフル射撃協会",
  description: "横須賀市ライフル射撃協会の年間事業計画と予定表。",
  openGraph: {
    images: [
      {
        url: getOpengraphImageUrl({
          title: "事業計画",
          subtitle: "年間事業計画と予定表",
          theme: "terminal",
        }),
        width: 1200,
        height: 630,
      },
    ],
  },
};

function Prompt({ path = "~" }: { path?: string }) {
  return (
    <span className={styles.prompt}>
      <span className={styles.promptUser}>yrsa</span>
      <span className={styles.promptAt}>@</span>
      <span className={styles.promptHost}>rifle</span>
      <span className="text-gray-600">:</span>
      <span className={styles.promptPath}>{path}</span>
      <span className={styles.promptGit}>(main)</span>
      <span className={styles.promptSymbol}>$</span>
    </span>
  );
}

export default function ProjectsPage() {
  const currentYear = new Date().getFullYear();

  return (
    <div
      className="min-h-screen p-2 sm:p-4"
      style={{
        backgroundColor: "#0d1117",
        fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
      }}
    >
      {/* ターミナルウィンドウ */}
      <div className="mx-auto max-w-5xl">
        {/* ターミナルタイトルバー */}
        <div className="flex items-center gap-2 rounded-t-lg bg-[#1c2128] px-3 py-2 sm:px-4">
          <div className="flex gap-2">
            <span className="h-3 w-3 rounded-full bg-[#ff5f56] shadow-[0_0_8px_#ff5f56]"></span>
            <span className="h-3 w-3 rounded-full bg-[#ffbd2e] shadow-[0_0_8px_#ffbd2e]"></span>
            <span className="h-3 w-3 rounded-full bg-[#27c93f] shadow-[0_0_8px_#27c93f]"></span>
          </div>
          <div className="flex-1 text-center">
            <span className="text-xs text-gray-400 sm:text-sm">
              yrsa@rifle: ~/projects
            </span>
          </div>
          <div className="w-14"></div>
        </div>

        {/* ターミナル本体 */}
        <div
          className={`${styles.terminal} relative rounded-b-lg border border-[#30363d] p-3 sm:p-5`}
          style={{ backgroundColor: "#0d1117" }}
        >
          {/* neofetch風システム情報 */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:gap-8">
            {/* ASCII Logo */}
            <div className="flex-shrink-0">
              {/* モバイル用 */}
              <pre className={`${styles.asciiArt} block text-[10px] leading-none sm:hidden`}>
{`╭─────────────╮
│  Y R S A    │
│  ▀▀▀▀▀▀▀▀   │
│  TERMINAL   │
╰─────────────╯`}
              </pre>
              {/* デスクトップ用 */}
              <pre className={`${styles.asciiArt} hidden text-xs leading-none sm:block`}>
{`    ██╗   ██╗██████╗ ███████╗ █████╗
    ╚██╗ ██╔╝██╔══██╗██╔════╝██╔══██╗
     ╚████╔╝ ██████╔╝███████╗███████║
      ╚██╔╝  ██╔══██╗╚════██║██╔══██║
       ██║   ██║  ██║███████║██║  ██║
       ╚═╝   ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝`}
              </pre>
            </div>

            {/* システム情報 */}
            <div className={`${styles.systemInfo} text-xs sm:text-sm`}>
              <span className={styles.systemInfoLabel}>OS</span>
              <span className={styles.systemInfoValue}>YRSA Linux x86_64</span>
              <span className={styles.systemInfoLabel}>Host</span>
              <span className={styles.systemInfoValue}>横須賀市ライフル射撃協会</span>
              <span className={styles.systemInfoLabel}>Uptime</span>
              <span className={styles.systemInfoValue}>since 1957</span>
              <span className={styles.systemInfoLabel}>Shell</span>
              <span className={styles.systemInfoValue}>bash 5.2.15</span>
              <span className={styles.systemInfoLabel}>Terminal</span>
              <span className={styles.systemInfoValue}>yrsa-term</span>
              <span className={styles.systemInfoLabel}>Location</span>
              <span className={styles.systemInfoValue}>神奈川県横須賀市</span>
            </div>
          </div>

          <div className={styles.sectionDivider}></div>

          {/* コマンド: ナビゲーション */}
          <div className="mb-6">
            <div className="flex items-center gap-2 text-xs sm:text-sm">
              <Prompt path="~/projects" />
              <span className="text-white">ls -la ../</span>
            </div>
            <div className={`${styles.outputBox} mt-3 overflow-x-auto p-3 sm:p-4`}>
              <div className="text-xs text-gray-500 sm:text-sm">
                total 4
              </div>
              <div className="mt-2 space-y-1 text-xs sm:text-sm">
                <div className="flex gap-2">
                  <span className="w-20 text-gray-500 sm:w-24">drwxr-xr-x</span>
                  <span className={styles.dirIcon}>📁</span>
                  <Link href="/" className={styles.terminalLink}>
                    home/
                  </Link>
                </div>
                <div className="flex gap-2">
                  <span className="w-20 text-gray-500 sm:w-24">drwxr-xr-x</span>
                  <span className={styles.dirIcon}>📁</span>
                  <Link href="/shooting-range" className={styles.terminalLink}>
                    shooting-range/
                  </Link>
                </div>
                <div className="flex gap-2">
                  <span className="w-20 text-gray-500 sm:w-24">drwxr-xr-x</span>
                  <span className={styles.dirIcon}>📁</span>
                  <Link href="/about" className={styles.terminalLink}>
                    about/
                  </Link>
                </div>
                <div className="flex gap-2">
                  <span className="w-20 text-gray-500 sm:w-24">drwxr-xr-x</span>
                  <span className={styles.dirIcon}>📁</span>
                  <Link href="/competitions" className={styles.terminalLink}>
                    competitions/
                  </Link>
                </div>
                <div className="flex gap-2">
                  <span className="w-20 text-gray-500 sm:w-24">drwxr-xr-x</span>
                  <span className={styles.dirIcon}>📁</span>
                  <Link href="/links" className={styles.terminalLink}>
                    links/
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* コマンド: 事業計画 */}
          <div className="mb-6">
            <div className="flex items-center gap-2 text-xs sm:text-sm">
              <Prompt path="~/projects" />
              <span className="text-white">cat project_{currentYear}.txt</span>
            </div>
            <div className={`${styles.outputBox} mt-3 p-3 sm:p-4`}>
              <div className="mb-3 flex items-center gap-2">
                <span className={`${styles.fileIcon} text-lg`}>📄</span>
                <span className="font-bold text-yellow-400">
                  令和{currentYear - 2018}年度 ({currentYear}) 事業計画書
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                <a
                  href="/static/projects/project_2025.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded border border-[#238636] bg-[#238636]/20 px-3 py-1.5 text-xs text-[#3fb950] transition-all hover:bg-[#238636]/40 hover:shadow-[0_0_10px_#238636] sm:text-sm"
                >
                  <span>⬇</span>
                  <span>Download PDF</span>
                  <span className="sr-only">（新しいタブで開きます）</span>
                </a>
              </div>
            </div>
          </div>

          {/* コマンド: カレンダー */}
          <div className="mb-6">
            <div className="flex items-center gap-2 text-xs sm:text-sm">
              <Prompt path="~/projects" />
              <span className="text-white">./calendar --view=year</span>
            </div>
            <div className={`${styles.outputBox} mt-3 p-3 sm:p-4`}>
              <div className="mb-3 flex items-center gap-2">
                <span className={`${styles.execIcon} text-lg`}>📅</span>
                <span className="font-bold text-cyan-400">
                  年間スケジュール
                </span>
                <span className="text-xs text-gray-500">
                  (Google Calendar)
                </span>
              </div>
              <TerminalCalendar />
            </div>
          </div>

          <div className={styles.sectionDivider}></div>

          {/* 入力待ちプロンプト */}
          <div className="flex items-center gap-2 text-xs sm:text-sm">
            <Prompt path="~/projects" />
            <span className={styles.cursor}></span>
          </div>
        </div>

        {/* ターミナルフッター */}
        <div className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[10px] text-gray-600 sm:text-xs">
          <span>bash 5.2.15</span>
          <span>•</span>
          <span>UTF-8</span>
          <span>•</span>
          <span>LF</span>
          <span>•</span>
          <span>© {currentYear} YRSA</span>
        </div>
      </div>
    </div>
  );
}
