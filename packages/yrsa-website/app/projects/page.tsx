import type { Metadata } from "next";
import Link from "next/link";
import { TerminalCalendar } from "./_components";

export const metadata: Metadata = {
  title: "事業計画 | 横須賀市ライフル射撃協会",
  description: "横須賀市ライフル射撃協会の年間事業計画と予定表。",
};

export default function ProjectsPage() {
  return (
    <div
      className="min-h-screen p-4"
      style={{
        backgroundColor: "#0d1117",
        fontFamily: "'Courier New', 'Monaco', 'Consolas', monospace",
      }}
    >
      {/* ターミナルウィンドウ */}
      <div className="mx-auto max-w-5xl">
        {/* ターミナルタイトルバー */}
        <div className="flex items-center justify-between rounded-t-lg bg-gradient-to-b from-gray-700 to-gray-800 px-3 py-2 sm:px-4">
          <div className="flex gap-1.5 sm:gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500 sm:h-3 sm:w-3"></span>
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500 sm:h-3 sm:w-3"></span>
            <span className="h-2.5 w-2.5 rounded-full bg-green-500 sm:h-3 sm:w-3"></span>
          </div>
          <span className="text-xs text-gray-300 sm:text-sm">
            <span className="hidden sm:inline">yrsa@yokosuka-rifle:</span>~/projects
          </span>
          <div className="w-12 sm:w-16"></div>
        </div>

        {/* ターミナル本体 */}
        <div
          className="rounded-b-lg border border-gray-700 p-3 sm:p-6"
          style={{ backgroundColor: "#161b22" }}
        >
          {/* ウェルカムメッセージ */}
          <div className="mb-6 text-green-400">
            {/* モバイル用シンプル版 */}
            <div className="block sm:hidden">
              <p className="text-lg font-bold">YRSA Terminal</p>
              <p className="text-xs text-gray-500">Yokosuka Rifle Shooting Association</p>
            </div>
            {/* デスクトップ用ASCII */}
            <pre className="hidden overflow-x-auto text-xs leading-tight sm:block sm:text-sm">
{`
 __   __                             _            ____  _  __ _
 \\ \\ / /__  | | ___   ___  ___ _   _| | ____ _   |  _ \\(_)/ _| | ___
  \\ V / _ \\ | |/ / | | / __| | | | |/ / _\` |  | |_) | | |_| |/ _ \\
   | | (_) ||   <| |_| \\__ \\ |_| |   < (_| |  |  _ <| |  _| |  __/
   |_|\\___/ |_|\\_\\\\__,_|___/\\__,_|_|\\_\\__,_|  |_| \\_\\_|_| |_|\\___|

`}
            </pre>
            <p className="mt-2 text-xs sm:text-sm">
              <span className="text-gray-500">Last login:</span> {new Date().toLocaleString("ja-JP")} on ttys000
            </p>
          </div>

          {/* コマンドライン: 事業計画 */}
          <div className="mb-6 overflow-hidden">
            <p className="truncate text-green-400 text-xs sm:text-sm">
              <span className="text-blue-400">yrsa</span>
              <span className="text-gray-500">:</span>
              <span className="text-purple-400">~/projects</span>
              <span className="text-gray-500">$</span>
              <span className="ml-2 text-white">cat project_2025.txt</span>
            </p>
            <div className="mt-3 border-l-2 border-green-600 pl-4">
              <div className="rounded border border-yellow-600 bg-yellow-900/20 p-3">
                <p className="text-center text-sm font-bold text-yellow-300 sm:text-base">
                  令和7年度 (2025) 事業計画書
                </p>
              </div>
              <div className="mt-4">
                <a
                  href="/static/projects/project_2025.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block rounded border border-green-500 bg-green-900/30 px-3 py-2 text-sm text-green-400 transition-colors hover:bg-green-800/50 hover:text-green-300"
                >
                  📄 ダウンロード
                  <span className="sr-only">（PDF、新しいタブで開きます）</span>
                </a>
              </div>
            </div>
          </div>

          {/* コマンドライン: 予定表 */}
          <div className="mb-6 overflow-hidden">
            <p className="truncate text-green-400 text-xs sm:text-sm">
              <span className="text-blue-400">yrsa</span>
              <span className="text-gray-500">:</span>
              <span className="text-purple-400">~/projects</span>
              <span className="text-gray-500">$</span>
              <span className="ml-2 text-white">./show_calendar.sh</span>
            </p>
            <div className="mt-3 border-l-2 border-cyan-600 pl-4">
              <div className="rounded border border-cyan-600 bg-cyan-900/20 p-3">
                <p className="text-center text-sm font-bold text-cyan-300 sm:text-base">
                  📅 年間予定表 (Google Calendar)
                </p>
              </div>
              <div className="mt-4">
                <TerminalCalendar />
              </div>
            </div>
          </div>

          {/* コマンドライン: リンク */}
          <div className="mb-6 overflow-hidden">
            <p className="truncate text-green-400 text-xs sm:text-sm">
              <span className="text-blue-400">yrsa</span>
              <span className="text-gray-500">:</span>
              <span className="text-purple-400">~/projects</span>
              <span className="text-gray-500">$</span>
              <span className="ml-2 text-white">ls ./links/</span>
            </p>
            <div className="mt-3 border-l-2 border-purple-600 pl-4">
              {/* モバイル: シンプルリスト */}
              <div className="block space-y-2 sm:hidden">
                <Link href="/" className="block text-cyan-400 hover:underline">
                  📁 home/
                </Link>
                <Link href="/shooting-range" className="block text-cyan-400 hover:underline">
                  📁 shooting-range/
                </Link>
                <Link href="/competitions" className="block text-cyan-400 hover:underline">
                  📁 competitions/
                </Link>
              </div>
              {/* デスクトップ: テーブル */}
              <table className="hidden text-sm sm:table">
                <tbody className="text-gray-300">
                  <tr>
                    <td className="pr-4 text-blue-400">drwxr-xr-x</td>
                    <td className="pr-4">yrsa</td>
                    <td className="pr-4">staff</td>
                    <td className="pr-4 text-gray-500">Dec 26</td>
                    <td>
                      <Link href="/" className="text-cyan-400 hover:underline">
                        ../home
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td className="pr-4 text-blue-400">drwxr-xr-x</td>
                    <td className="pr-4">yrsa</td>
                    <td className="pr-4">staff</td>
                    <td className="pr-4 text-gray-500">Dec 26</td>
                    <td>
                      <Link href="/shooting-range" className="text-cyan-400 hover:underline">
                        ../shooting-range
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td className="pr-4 text-blue-400">drwxr-xr-x</td>
                    <td className="pr-4">yrsa</td>
                    <td className="pr-4">staff</td>
                    <td className="pr-4 text-gray-500">Dec 26</td>
                    <td>
                      <Link href="/competitions" className="text-cyan-400 hover:underline">
                        ../competitions
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 入力待ちカーソル */}
          <div className="text-green-400 text-xs sm:text-sm">
            <span className="text-blue-400">yrsa</span>
            <span className="text-gray-500">:</span>
            <span className="text-purple-400">~</span>
            <span className="text-gray-500">$</span>
            <span className="ml-2 inline-block h-4 w-2 animate-pulse bg-green-400 sm:h-5"></span>
          </div>
        </div>

        {/* ターミナルフッター */}
        <div className="mt-4 text-center text-xs text-gray-500">
          <p>GNU bash, version 5.2.15(1)-release (x86_64-pc-linux-gnu)</p>
          <p className="mt-1">
            Copyright (C) 2025 横須賀市ライフル射撃協会. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
