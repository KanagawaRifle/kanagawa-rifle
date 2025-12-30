import type { Metadata } from "next";
import "./globals.css";
import { Header, Footer, GoogleAnalytics } from "@/components";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.baseUrl),
  title: {
    default: "ライフル射撃・射撃場なら横須賀市ライフル射撃協会【神奈川県】",
    template: "%s | 横須賀市ライフル射撃協会",
  },
  description:
    "神奈川県横須賀市のライフル射撃団体。くりはま花の国エアライフル射撃場で射撃体験・競技会を開催。初心者向け射撃教室あり。",
  keywords: [
    "ライフル射撃",
    "射撃",
    "射撃場",
    "神奈川県",
    "横須賀市",
    "エアライフル",
    "ビームライフル",
    "射撃体験",
    "射撃教室",
    "くりはま花の国",
    "射撃協会",
    "月例会",
    "競技会",
  ],
  authors: [{ name: "横須賀市ライフル射撃協会" }],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "横須賀射撃協会",
  },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: siteConfig.baseUrl,
    siteName: "横須賀市ライフル射撃協会",
    title: "ライフル射撃・射撃場なら横須賀市ライフル射撃協会【神奈川県】",
    description:
      "神奈川県横須賀市のライフル射撃団体。くりはま花の国エアライフル射撃場で射撃体験・競技会を開催中。",
    images: [
      {
        url: "/images/og-cover.jpg",
        width: 1200,
        height: 630,
        alt: "横須賀市ライフル射撃協会 - くりはま花の国エアライフル射撃場",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ライフル射撃・射撃場なら横須賀市ライフル射撃協会【神奈川県】",
    description:
      "神奈川県のライフル射撃・射撃場なら横須賀市ライフル射撃協会へ。射撃体験・競技会開催中。",
    images: ["/images/og-cover.jpg"],
  },
  alternates: {
    canonical: siteConfig.baseUrl,
    types: {
      "application/rss+xml": `${siteConfig.baseUrl}/feed.xml`,
    },
  },
};

// Organization and WebSite structured data (JSON-LD)
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "SportsOrganization",
  "@id": `${siteConfig.baseUrl}/#organization`,
  name: siteConfig.name,
  alternateName: siteConfig.shortName,
  url: siteConfig.baseUrl,
  telephone: siteConfig.telephone,
  email: siteConfig.email,
  foundingDate: "1957",
  sport: "ライフル射撃",
  address: {
    "@type": "PostalAddress",
    streetAddress: "神明町1番地",
    addressLocality: "横須賀市",
    addressRegion: "神奈川県",
    postalCode: "239-0832",
    addressCountry: "JP",
  },
  areaServed: [
    {
      "@type": "City",
      name: "横須賀市",
      containedInPlace: {
        "@type": "State",
        name: "神奈川県",
      },
    },
    {
      "@type": "State",
      name: "神奈川県",
      containedInPlace: {
        "@type": "Country",
        name: "日本",
      },
    },
  ],
  location: {
    "@type": "SportsActivityLocation",
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
    telephone: "046-833-6990",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "08:30",
        closes: "21:00",
      },
    ],
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteConfig.baseUrl}/#website`,
  url: siteConfig.baseUrl,
  name: siteConfig.name,
  description:
    "横須賀市ライフル射撃協会の公式ウェブサイト。射撃場案内、競技会情報、活動内容を掲載。",
  publisher: {
    "@id": `${siteConfig.baseUrl}/#organization`,
  },
  inLanguage: "ja",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <GoogleAnalytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([organizationSchema, websiteSchema]),
          }}
        />
      </head>
      <body className="antialiased">
        {/* スキップリンク - キーボードユーザーがナビゲーションをスキップできる */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-purple-600 focus:px-4 focus:py-2 focus:text-white focus:outline-none"
        >
          メインコンテンツへスキップ
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
