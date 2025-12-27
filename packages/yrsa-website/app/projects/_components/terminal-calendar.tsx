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

export function TerminalCalendar() {
  const [selectedEvent, setSelectedEvent] = useState<EventDetail | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className={styles.wrapper}>
      <FullCalendar
        plugins={[listPlugin, googleCalendarPlugin]}
        initialView="listYear"
        googleCalendarApiKey={env.GOOGLE_CALENDAR_API_KEY}
        eventSources={[
          {
            googleCalendarId: env.GOOGLE_CALENDAR_ID,
          },
        ]}
        locale={jaLocale}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "",
        }}
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-2 sm:p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-lg border border-gray-600"
            style={{ backgroundColor: "#161b22" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* ターミナルタイトルバー */}
            <div className="sticky top-0 flex items-center justify-between rounded-t-lg bg-gradient-to-b from-gray-700 to-gray-800 px-3 py-2 sm:px-4">
              <div className="flex gap-1.5 sm:gap-2">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="h-2.5 w-2.5 rounded-full bg-red-500 hover:bg-red-400 sm:h-3 sm:w-3"
                  aria-label="閉じる"
                />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-500 sm:h-3 sm:w-3"></span>
                <span className="h-2.5 w-2.5 rounded-full bg-green-500 sm:h-3 sm:w-3"></span>
              </div>
              <span className="text-xs text-gray-300">event_details.sh</span>
              <div className="w-10 sm:w-12"></div>
            </div>

            {/* ターミナル本体 */}
            <div className="p-3 font-mono text-xs sm:p-4 sm:text-sm">
              <p className="truncate text-green-400">
                <span className="text-blue-400">yrsa</span>
                <span className="text-gray-500">:</span>
                <span className="text-purple-400">~</span>
                <span className="text-gray-500">$</span>
                <span className="ml-2 text-white">./show_event.sh</span>
              </p>

              <div className="mt-3 space-y-2 border-l-2 border-cyan-600 pl-3 sm:mt-4 sm:pl-4">
                <div className="rounded border border-cyan-600 bg-cyan-900/20 p-2 sm:p-3">
                  <p className="font-bold text-yellow-300 break-words">
                    {selectedEvent.title}
                  </p>
                </div>

                <p className="mt-3 text-gray-300 break-words">
                  <span className="text-green-400">📅 日時:</span>{" "}
                  {formatDateRange(
                    selectedEvent.start,
                    selectedEvent.end,
                    selectedEvent.allDay
                  )}
                </p>

                {selectedEvent.location && (
                  <p className="text-gray-300 break-words">
                    <span className="text-green-400">📍 場所:</span>{" "}
                    {selectedEvent.location}
                  </p>
                )}

                {selectedEvent.description && (
                  <div className="mt-3">
                    <p className="text-green-400">📝 詳細:</p>
                    <div
                      className="mt-1 overflow-x-auto rounded border border-gray-600 bg-black/30 p-2 text-gray-300 sm:p-3 [&_a]:text-cyan-400 [&_a]:underline [&_a]:break-all [&_a:hover]:text-cyan-300 [&_ul]:list-disc [&_ul]:pl-4 [&_li]:my-1"
                      dangerouslySetInnerHTML={{ __html: selectedEvent.description }}
                    />
                  </div>
                )}

                {selectedEvent.url && (
                  <p className="mt-3">
                    <a
                      href={selectedEvent.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block rounded border border-green-500 bg-green-900/30 px-3 py-1 text-xs text-green-400 transition-colors hover:bg-green-800/50 hover:text-green-300 sm:text-sm"
                    >
                      🔗 Google カレンダー
                    </a>
                  </p>
                )}
              </div>

              <div className="mt-4 flex justify-end sm:mt-6">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="rounded border border-gray-500 bg-gray-700/50 px-3 py-1 text-xs text-gray-300 transition-colors hover:bg-gray-600/50 hover:text-white sm:px-4 sm:text-sm"
                >
                  [ 閉じる ]
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
