"use client";

import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import googleCalendarPlugin from "@fullcalendar/google-calendar";
import jaLocale from "@fullcalendar/core/locales/ja";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import styles from "./google-calendar.module.css";
import { env } from "@/lib/env";
import { sanitizeHtml } from "@/lib/sanitize";

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
    return `${startStr} 〜 ${formatDate(adjustedEnd, allDay)}`;
  }
  if (start.toDateString() === end.toDateString()) {
    return `${startStr} 〜 ${end.toLocaleTimeString("ja-JP", { hour: "2-digit", minute: "2-digit" })}`;
  }
  return `${startStr} 〜 ${formatDate(end, allDay)}`;
}

export function GoogleCalendar() {
  const [selectedEvent, setSelectedEvent] = useState<EventDetail | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className={styles.wrapper}>
      <FullCalendar
        plugins={[dayGridPlugin, googleCalendarPlugin]}
        initialView="dayGridMonth"
        googleCalendarApiKey={env.GOOGLE_CALENDAR_API_KEY}
        eventSources={[
          {
            googleCalendarId: env.GOOGLE_CALENDAR_ID_MAIN,
          },
          {
            googleCalendarId: env.GOOGLE_CALENDAR_ID_ANNUAL,
          },
        ]}
        locale={jaLocale}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth",
        }}
        height="auto"
        contentHeight="auto"
        aspectRatio={1.5}
        dayMaxEvents={3}
        eventDisplay="block"
        eventTimeFormat={{
          hour: "2-digit",
          minute: "2-digit",
          meridiem: false,
          hour12: false,
        }}
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
      />

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent
          className="max-w-md border-4 border-[#808080] bg-[#c0c0c0] p-0 shadow-[inset_-1px_-1px_#0a0a0a,inset_1px_1px_#ffffff,inset_-2px_-2px_#808080,inset_2px_2px_#dfdfdf] sm:rounded-none"
          style={{ fontFamily: "Comic Sans MS, cursive, sans-serif" }}
        >
          {/* タイトルバー */}
          <div className="flex items-center justify-between bg-gradient-to-r from-[#000080] to-[#1084d0] px-2 py-1">
            <DialogTitle className="flex items-center gap-1 text-sm font-bold text-white">
              <span>📅</span>
              <span className="truncate">{selectedEvent?.title}</span>
            </DialogTitle>
          </div>

          <DialogDescription asChild>
            <div className="space-y-3 p-4 text-sm text-black">
              {selectedEvent?.start && (
                <div className="flex items-start gap-2">
                  <span className="shrink-0">🗓️</span>
                  <span className="font-bold">
                    {formatDateRange(
                      selectedEvent.start,
                      selectedEvent.end,
                      selectedEvent.allDay
                    )}
                  </span>
                </div>
              )}

              {selectedEvent?.location && (
                <div className="flex items-start gap-2">
                  <span className="shrink-0">📍</span>
                  <span>{selectedEvent.location}</span>
                </div>
              )}

              {selectedEvent?.description && (
                <div
                  className="mt-3 border-2 border-[#808080] bg-white p-3 shadow-[inset_1px_1px_#0a0a0a,inset_-1px_-1px_#ffffff] [&_a]:text-[#0000ff] [&_a]:underline [&_a:hover]:text-[#ff0000] [&_ul]:list-disc [&_ul]:pl-4 [&_li]:my-1"
                  // Sanitize HTML to prevent XSS attacks from calendar event descriptions
                  dangerouslySetInnerHTML={{
                    __html: sanitizeHtml(selectedEvent.description),
                  }}
                />
              )}

              {selectedEvent?.url && (
                <div className="mt-4 flex justify-center gap-2">
                  <a
                    href={selectedEvent.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-2 border-[#808080] bg-gradient-to-b from-[#e0e0e0] to-[#c0c0c0] px-4 py-1 font-bold text-black shadow-[inset_-1px_-1px_#0a0a0a,inset_1px_1px_#ffffff] hover:from-[#f0f0f0] hover:to-[#d0d0d0] active:shadow-[inset_1px_1px_#0a0a0a,inset_-1px_-1px_#ffffff]"
                  >
                    📎 Google カレンダーで開く
                  </a>
                </div>
              )}

              <div className="mt-4 flex justify-center">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="border-2 border-[#808080] bg-gradient-to-b from-[#e0e0e0] to-[#c0c0c0] px-6 py-1 font-bold text-black shadow-[inset_-1px_-1px_#0a0a0a,inset_1px_1px_#ffffff] hover:from-[#f0f0f0] hover:to-[#d0d0d0] active:shadow-[inset_1px_1px_#0a0a0a,inset_-1px_-1px_#ffffff]"
                >
                  閉じる
                </button>
              </div>
            </div>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  );
}
