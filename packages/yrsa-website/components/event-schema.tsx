import { siteConfig } from "@/lib/config";

export interface EventSchemaProps {
  /** イベント名 */
  name: string;
  /** イベントの説明 */
  description?: string;
  /** 開始日時 (ISO 8601形式: YYYY-MM-DD or YYYY-MM-DDTHH:mm:ss) */
  startDate?: string;
  /** 終了日時 (ISO 8601形式) */
  endDate?: string;
  /** 定期開催の場合のスケジュール説明 */
  eventSchedule?: {
    /** 繰り返しの頻度 (Weekly, Monthly, Yearly) */
    repeatFrequency: "Weekly" | "Monthly" | "Yearly";
    /** 曜日 (Sunday, Monday, ..., Saturday) */
    byDay?: string;
    /** 開始時刻 (HH:mm) */
    startTime?: string;
    /** 終了時刻 (HH:mm) */
    endTime?: string;
  };
  /** 開催場所 */
  location: {
    name: string;
    address?: string;
  };
  /** 主催者名（デフォルト: 横須賀市ライフル射撃協会） */
  organizer?: string;
  /** イベントのURL */
  url?: string;
  /** 画像URL */
  image?: string;
  /** 参加費 */
  offers?: {
    price: number;
    priceCurrency?: string;
    name?: string;
  }[];
  /** イベントの状態 */
  eventStatus?:
    | "EventScheduled"
    | "EventCancelled"
    | "EventMovedOnline"
    | "EventPostponed"
    | "EventRescheduled";
  /** 参加方法 */
  eventAttendanceMode?: "OfflineEventAttendanceMode" | "OnlineEventAttendanceMode" | "MixedEventAttendanceMode";
}

/**
 * イベント構造化データコンポーネント（JSON-LD）
 *
 * Google検索結果にイベント情報（日時、場所、参加費）が表示されるようになります。
 *
 * @example
 * // 単発イベント
 * <EventSchema
 *   name="大口径射撃大会"
 *   startDate="2025-03-15T09:00:00"
 *   location={{ name: "長瀞総合射撃場", address: "埼玉県長瀞町" }}
 * />
 *
 * @example
 * // 定期開催イベント
 * <EventSchema
 *   name="月例会（G4）"
 *   eventSchedule={{ repeatFrequency: "Monthly", byDay: "Saturday" }}
 *   location={{ name: "くりはま花の国エアライフル射撃場" }}
 * />
 */
export function EventSchema({
  name,
  description,
  startDate,
  endDate,
  eventSchedule,
  location,
  organizer = siteConfig.name,
  url,
  image,
  offers,
  eventStatus = "EventScheduled",
  eventAttendanceMode = "OfflineEventAttendanceMode",
}: EventSchemaProps) {
  // 定期開催の場合はEventSeriesスキーマを使用
  const isRecurring = !!eventSchedule;

  const baseSchema = {
    "@context": "https://schema.org",
    "@type": isRecurring ? "EventSeries" : "SportsEvent",
    name,
    ...(description && { description }),
    ...(url && { url }),
    ...(image && { image }),
    location: {
      "@type": "Place",
      name: location.name,
      ...(location.address && {
        address: {
          "@type": "PostalAddress",
          streetAddress: location.address,
          addressCountry: "JP",
        },
      }),
    },
    organizer: {
      "@type": "SportsOrganization",
      name: organizer,
      url: siteConfig.baseUrl,
    },
    eventStatus: `https://schema.org/${eventStatus}`,
    eventAttendanceMode: `https://schema.org/${eventAttendanceMode}`,
  };

  // 単発イベントの場合
  if (!isRecurring && startDate) {
    Object.assign(baseSchema, {
      startDate,
      ...(endDate && { endDate }),
    });
  }

  // 定期開催イベントの場合
  if (isRecurring && eventSchedule) {
    Object.assign(baseSchema, {
      eventSchedule: {
        "@type": "Schedule",
        repeatFrequency: `P1${eventSchedule.repeatFrequency === "Weekly" ? "W" : eventSchedule.repeatFrequency === "Monthly" ? "M" : "Y"}`,
        ...(eventSchedule.byDay && {
          byDay: `https://schema.org/${eventSchedule.byDay}`,
        }),
        ...(eventSchedule.startTime && { startTime: eventSchedule.startTime }),
        ...(eventSchedule.endTime && { endTime: eventSchedule.endTime }),
      },
    });
  }

  // 参加費がある場合
  if (offers && offers.length > 0) {
    Object.assign(baseSchema, {
      offers: offers.map((offer) => ({
        "@type": "Offer",
        price: offer.price,
        priceCurrency: offer.priceCurrency || "JPY",
        ...(offer.name && { name: offer.name }),
        availability: "https://schema.org/InStock",
      })),
    });
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(baseSchema) }}
    />
  );
}
