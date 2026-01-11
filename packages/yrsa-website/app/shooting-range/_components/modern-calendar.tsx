"use client";

import jaLocale from "@fullcalendar/core/locales/ja";
import dayGridPlugin from "@fullcalendar/daygrid";
import googleCalendarPlugin from "@fullcalendar/google-calendar";
import FullCalendar from "@fullcalendar/react";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { env } from "@/lib/env";
import { sanitizeHtml } from "@/lib/sanitize";

import styles from "./modern-calendar.module.css";

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

export function ModernCalendar() {
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
        <DialogContent className="max-w-md rounded-lg border border-gray-200 bg-white p-0 shadow-lg">
          {/* ヘッダー */}
          <div className="rounded-t-lg bg-emerald-700 px-4 py-3">
            <DialogTitle className="flex items-center gap-2 text-base font-semibold text-white">
              <span aria-hidden="true">📅</span>
              <span className="truncate">{selectedEvent?.title}</span>
            </DialogTitle>
          </div>

          <DialogDescription asChild>
            <div className="space-y-3 p-4 text-sm text-gray-700">
              {selectedEvent?.start && (
                <div className="flex items-start gap-2">
                  <span className="shrink-0" aria-hidden="true">🗓️</span>
                  <div>
                    <p className="font-semibold text-gray-800">
                      {formatDateRange(
                        selectedEvent.start,
                        selectedEvent.end,
                        selectedEvent.allDay
                      )}
                    </p>
                  </div>
                </div>
              )}

              {selectedEvent?.location && (
                <div className="flex items-start gap-2">
                  <span className="shrink-0" aria-hidden="true">📍</span>
                  <p className="text-gray-700">{selectedEvent.location}</p>
                </div>
              )}

              {selectedEvent?.description && (
                <div
                  className="mt-3 rounded border border-gray-200 bg-gray-50 p-3 text-sm leading-relaxed [&_a]:text-emerald-600 [&_a]:underline [&_a:hover]:text-emerald-800 [&_ul]:list-disc [&_ul]:pl-4 [&_li]:my-1"
                  // Sanitize HTML to prevent XSS attacks from calendar event descriptions
                  dangerouslySetInnerHTML={{
                    __html: sanitizeHtml(selectedEvent.description),
                  }}
                />
              )}

              <div className="mt-4 flex justify-end gap-2">
                {selectedEvent?.url && (
                  <a
                    href={selectedEvent.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-md border border-emerald-600 bg-white px-4 py-2 text-sm font-medium text-emerald-600 transition-colors hover:bg-emerald-50"
                  >
                    Google カレンダーで開く
                  </a>
                )}
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-700"
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
