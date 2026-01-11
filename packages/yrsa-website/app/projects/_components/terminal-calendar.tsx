"use client";

import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import listPlugin from "@fullcalendar/list";
import googleCalendarPlugin from "@fullcalendar/google-calendar";
import jaLocale from "@fullcalendar/core/locales/ja";
import { env } from "@/lib/env";
import styles from "./terminal-calendar.module.css";

interface EventDetail {
  title: string;
  start: Date | null;
  end: Date | null;
  allDay: boolean;
  location: string;
  description: string;
  url: string;
}

function formatDate(date: Date | null, allDay: boolean): string {
  if (!date) return "";
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "short",
  };
  if (!allDay) {
    options.hour = "2-digit";
    options.minute = "2-digit";
  }
  return date.toLocaleDateString("ja-JP", options);
}

function formatDateRange(
  start: Date | null,
  end: Date | null,
  allDay: boolean
): string {
  if (!start) return "";
  const startStr = formatDate(start, allDay);
  if (!end || start.getTime() === end.getTime()) {
    return startStr;
  }
  if (allDay) {
    const adjustedEnd = new Date(end);
    adjustedEnd.setDate(adjustedEnd.getDate() - 1);
    if (start.getTime() === adjustedEnd.getTime()) {
      return startStr;
    }
    return `${startStr} ~ ${formatDate(adjustedEnd, allDay)}`;
  }
  if (start.toDateString() === end.toDateString()) {
    return `${startStr} ~ ${end.toLocaleTimeString("ja-JP", { hour: "2-digit", minute: "2-digit" })}`;
  }
  return `${startStr} ~ ${formatDate(end, allDay)}`;
}

function getFiscalYearRange(year: number) {
  return {
    start: new Date(year, 3, 1), // 4月1日
    end: new Date(year + 1, 3, 1), // 翌年4月1日（validRangeはendを含まないため）
    fiscalYear: year,
  };
}

function getCurrentFiscalYear() {
  const today = new Date();
  return today.getMonth() < 3 ? today.getFullYear() - 1 : today.getFullYear();
}

export function TerminalCalendar() {
  const [selectedEvent, setSelectedEvent] = useState<EventDetail | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fiscalYear, setFiscalYear] = useState(getCurrentFiscalYear());

  const fiscalYearRange = getFiscalYearRange(fiscalYear);

  return (
    <div className={styles.wrapper}>
      <FullCalendar
        key={fiscalYear}
        plugins={[listPlugin, googleCalendarPlugin]}
        initialView="list"
        views={{
          list: {
            type: 'list',
            duration: { months: 12 },
          },
        }}
        googleCalendarApiKey={env.GOOGLE_CALENDAR_API_KEY}
        eventSources={[
          {
            googleCalendarId: env.GOOGLE_CALENDAR_ID_ANNUAL,
          },
        ]}
        locale={jaLocale}
        customButtons={{
          prevFiscalYear: {
            text: "前年度",
            click: () => setFiscalYear((prev) => prev - 1),
          },
          nextFiscalYear: {
            text: "次年度",
            click: () => setFiscalYear((prev) => prev + 1),
          },
          currentFiscalYear: {
            text: "今年度",
            click: () => setFiscalYear(getCurrentFiscalYear()),
          },
        }}
        headerToolbar={{
          left: "prevFiscalYear,nextFiscalYear currentFiscalYear",
          center: "title",
          right: "",
        }}
        visibleRange={{
          start: fiscalYearRange.start,
          end: fiscalYearRange.end,
        }}
        validRange={{
          start: fiscalYearRange.start,
          end: fiscalYearRange.end,
        }}
        initialDate={fiscalYearRange.start}
        titleFormat={() => `${fiscalYearRange.fiscalYear}年度`}
        height="auto"
        eventClick={(info) => {
          info.jsEvent.preventDefault();
          const event = info.event;
          setSelectedEvent({
            title: event.title,
            start: event.start,
            end: event.end,
            allDay: event.allDay,
            location: event.extendedProps.location || "",
            description: event.extendedProps.description || "",
            url: event.url || "",
          });
          setIsModalOpen(true);
        }}
        noEventsContent="予定されているイベントはありません"
      />

      {/* ターミナル風モーダル */}
      {isModalOpen && selectedEvent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-2 backdrop-blur-sm sm:p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-lg border border-[#30363d] shadow-[0_0_30px_rgba(56,139,253,0.15)]"
            style={{ backgroundColor: "#0d1117" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* ターミナルタイトルバー */}
            <div className="sticky top-0 z-10 flex items-center gap-2 rounded-t-lg bg-[#1c2128] px-3 py-2 sm:px-4">
              <div className="flex gap-2">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="h-3 w-3 rounded-full bg-[#ff5f56] shadow-[0_0_8px_#ff5f56] transition-transform hover:scale-110"
                  aria-label="閉じる"
                />
                <span className="h-3 w-3 rounded-full bg-[#ffbd2e] shadow-[0_0_8px_#ffbd2e]"></span>
                <span className="h-3 w-3 rounded-full bg-[#27c93f] shadow-[0_0_8px_#27c93f]"></span>
              </div>
              <div className="flex-1 text-center">
                <span className="text-xs text-gray-400">event --show</span>
              </div>
              <div className="w-14"></div>
            </div>

            {/* ターミナル本体 */}
            <div className="p-3 text-xs sm:p-4 sm:text-sm" style={{ fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}>
              {/* プロンプト */}
              <div className="flex items-center gap-1 text-xs sm:text-sm">
                <span className="text-[#58a6ff]">yrsa</span>
                <span className="text-gray-600">@</span>
                <span className="text-[#f0883e]">rifle</span>
                <span className="text-gray-600">:</span>
                <span className="text-[#a371f7]">~</span>
                <span className="text-[#3fb950]">$</span>
                <span className="ml-2 text-white">event --show</span>
              </div>

              {/* 出力ボックス */}
              <div className="mt-3 rounded border border-[#30363d] bg-[#161b22]/50 p-3 sm:mt-4 sm:p-4">
                {/* タイトル */}
                <h3 className="break-words font-bold text-[#f0883e]">
                  {selectedEvent.title}
                </h3>

                <div className="mt-3 space-y-2">
                  {/* 日時 */}
                  <div className="flex gap-2">
                    <span className="text-[#3fb950]">date:</span>
                    <span className="text-[#c9d1d9]">
                      {formatDateRange(selectedEvent.start, selectedEvent.end, selectedEvent.allDay)}
                    </span>
                  </div>

                  {/* 場所 */}
                  {selectedEvent.location && (
                    <div className="flex gap-2">
                      <span className="text-[#3fb950]">location:</span>
                      <span className="break-words text-[#c9d1d9]">{selectedEvent.location}</span>
                    </div>
                  )}

                  {/* 詳細 */}
                  {selectedEvent.description && (
                    <div className="mt-3">
                      <span className="text-[#3fb950]">description:</span>
                      <div
                        className="mt-2 overflow-x-auto rounded border border-[#30363d] bg-[#0d1117] p-2 text-[#c9d1d9] sm:p-3 [&_a]:text-[#58a6ff] [&_a]:underline [&_a]:break-all [&_a:hover]:text-[#79c0ff] [&_ul]:list-disc [&_ul]:pl-4 [&_li]:my-1"
                        dangerouslySetInnerHTML={{ __html: selectedEvent.description }}
                      />
                    </div>
                  )}
                </div>

                {/* アクション */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {selectedEvent.url && (
                    <a
                      href={selectedEvent.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded border border-[#238636] bg-[#238636]/20 px-3 py-1.5 text-xs text-[#3fb950] transition-all hover:bg-[#238636]/40 hover:shadow-[0_0_10px_#238636]"
                    >
                      <span>↗</span>
                      <span>Open in Calendar</span>
                    </a>
                  )}
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="rounded border border-[#30363d] bg-[#21262d] px-3 py-1.5 text-xs text-[#c9d1d9] transition-all hover:border-[#8b949e] hover:bg-[#30363d]"
                  >
                    Close [Esc]
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
