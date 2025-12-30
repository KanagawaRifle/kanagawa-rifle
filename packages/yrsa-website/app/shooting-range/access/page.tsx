import type { Metadata } from "next";
import { MapPin } from "lucide-react";
import { getOpengraphImageUrl } from "@/lib/server";

export const metadata: Metadata = {
  title: "アクセス | くりはま花の国エアライフル射撃場",
  description:
    "くりはま花の国エアライフル射撃場へのアクセス方法をご案内します。",
  openGraph: {
    images: [
      {
        url: getOpengraphImageUrl({
          title: "アクセス",
          subtitle: "交通案内・駐車場",
          theme: "modern",
        }),
        width: 1200,
        height: 630,
      },
    ],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "アクセス | くりはま花の国エアライフル射撃場",
  description: "くりはま花の国エアライフル射撃場へのアクセス方法をご案内します。",
  url: "https://yokosuka-rifle.jp/shooting-range/access",
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "ホーム",
        item: "https://yokosuka-rifle.jp/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "射撃場",
        item: "https://yokosuka-rifle.jp/shooting-range",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "アクセス",
        item: "https://yokosuka-rifle.jp/shooting-range/access",
      },
    ],
  },
  mainEntity: {
    "@type": "Place",
    name: "くりはま花の国エアライフル射撃場",
    address: {
      "@type": "PostalAddress",
      streetAddress: "神明町1番地",
      addressLocality: "横須賀市",
      addressRegion: "神奈川県",
      postalCode: "239-0832",
      addressCountry: "JP",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 35.221668,
      longitude: 139.70727,
    },
    hasMap: "https://www.google.com/maps?q=35.221668,139.70727",
    publicAccess: true,
    parkingFacility: {
      "@type": "ParkingFacility",
      name: "第2駐車場",
      isAccessibleForFree: true,
      totalSpaces: 8,
    },
  },
};

export default function ShootingRangeAccessPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="space-y-8">
      {/* 地図 */}
      <section>
        <h2 className="mb-4 border-l-4 border-emerald-600 pl-3 text-xl font-bold text-gray-800">
          所在地
        </h2>
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white ">
          <div className="relative h-0 w-full overflow-hidden rounded-t-lg" style={{ paddingTop: "56.25%" }}>
            <iframe
              className="absolute left-0 top-0 h-full w-full rounded-t-lg"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3259.3896962305!2d139.70727!3d35.221668!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6018160a9d95ef45%3A0xee17e2df6fda3bcb!2z44GP44KK44Gv44G-6Iqx44Gu5Zu944Ko44Ki44Op44Kk44OV44Or5bCE5pKD5aC0!5e0!3m2!1sja!2sjp!4v1705050269951!5m2!1sja!2sjp"
              title="くりはま花の国エアライフル射撃場の地図"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              style={{ border: 0 }}
            ></iframe>
          </div>
          <div className="flex items-center gap-2 border-t border-gray-200 bg-gray-50 px-4 py-3">
            <MapPin aria-hidden="true" className="h-4 w-4 text-emerald-600" />
            <address className="not-italic text-sm text-gray-700">
              〒239-0832 神奈川県横須賀市神明町1番地
            </address>
          </div>
        </div>
      </section>

      {/* 自動車 */}
      <section>
        <h2 className="mb-4 border-l-4 border-emerald-600 pl-3 text-xl font-bold text-gray-800">
          お車でお越しの場合
        </h2>
        <div className="rounded-lg border border-gray-200 bg-white ">
          <div className="p-4">
            <div className="space-y-0">
              {/* ルート */}
              <RouteStep
                title="佐原IC（横浜横須賀道路）"
                description="県道27号を久里浜方面へ"
                duration="約1分"
              />
              <RouteStep
                title="佐原交差点を右折"
                description="久里浜港方面へ直進"
                duration="約10〜15分"
              />
              <RouteStep
                title="「くりはま花の国」の看板を右折"
                description="海側に近い方の交差点"
                duration=""
              />
              <RouteStep
                title="くりはま花の国エアライフル射撃場"
                description="右折してすぐ右側"
                duration=""
                isLast
              />
            </div>
          </div>
          <div className="border-t border-gray-200 bg-gray-50 px-4 py-3">
            <p className="text-sm text-gray-600">
              <span className="font-medium">駐車場：</span>
              普通車用7台・障害者用1台（無料）
            </p>
          </div>
        </div>
      </section>

      {/* 公共交通機関 */}
      <section>
        <h2 className="mb-4 border-l-4 border-emerald-600 pl-3 text-xl font-bold text-gray-800">
          公共交通機関でお越しの場合
        </h2>
        <div className="rounded-lg border border-gray-200 bg-white p-4 ">
          <div className="space-y-0">
            <RouteStep
              title="京急久里浜駅"
              description="京浜急行電鉄久里浜線"
              duration="徒歩1分"
              icon="train"
            />
            <RouteStep
              title="京急久里浜駅バス停（2番乗り場）"
              description="久7系統 東京湾フェリー行き"
              duration="約5分"
              icon="bus"
            />
            <RouteStep
              title="JVCケンウッド前バス停"
              description="下車"
              duration="徒歩6分"
              icon="bus"
            />
            <RouteStep
              title="くりはま花の国エアライフル射撃場"
              description=""
              duration=""
              isLast
            />
          </div>
        </div>
      </section>

      {/* 補足情報 */}
      <section className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
        <h3 className="mb-2 font-medium text-emerald-800">ご来場の際のお願い</h3>
        <ul className="list-disc space-y-1 pl-5 text-sm text-emerald-700">
          <li>くりはま花の国は広い公園です。射撃場へは第2駐車場が便利です。</li>
          <li>公共交通機関をご利用の場合、時刻表を事前にご確認ください。</li>
        </ul>
      </section>
      </div>
    </>
  );
}

function RouteStep({
  title,
  description,
  duration,
  isLast = false,
}: {
  title: string;
  description: string;
  duration: string;
  icon?: "train" | "bus";
  isLast?: boolean;
}) {
  return (
    <div className="relative flex gap-3 pb-6 last:pb-0">
      {/* 縦線 */}
      {!isLast && (
        <div aria-hidden="true" className="absolute left-[11px] top-6 h-[calc(100%-12px)] w-0.5 bg-emerald-300" />
      )}
      {/* 丸印 */}
      <div aria-hidden="true" className="relative z-10 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border-2 border-emerald-600 bg-white">
        <div className="h-2 w-2 rounded-full bg-emerald-600" />
      </div>
      {/* コンテンツ */}
      <div className="flex-1 pt-0.5">
        <p className="font-medium text-gray-800">{title}</p>
        {description && <p className="text-sm text-gray-600">{description}</p>}
        {duration && (
          <span className="mt-1 inline-block rounded bg-emerald-100 px-2 py-0.5 text-xs text-emerald-700">
            {duration}
          </span>
        )}
      </div>
    </div>
  );
}
