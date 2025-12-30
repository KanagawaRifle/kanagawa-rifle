import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.baseUrl),
  title: {
    default: "横須賀市ライフル射撃協会 | 神奈川県の射撃団体",
    template: "%s | 横須賀市ライフル射撃協会",
  },
  description:
    "横須賀市ライフル射撃協会は、神奈川県横須賀市を拠点とするライフル射撃の団体です。くりはま花の国エアライフル射撃場を運営しています。",
  keywords: [
    "ライフル射撃",
    "横須賀市",
    "神奈川県",
    "射撃場",
    "エアライフル",
    "射撃協会",
    "くりはま花の国",
    "射撃教室",
    "月例会",
  ],
  authors: [{ name: "横須賀市ライフル射撃協会" }],
  manifest: "/manifest.json",
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
    title: "横須賀市ライフル射撃協会 | 神奈川県の射撃団体",
    description:
      "横須賀市ライフル射撃協会は、神奈川県横須賀市を拠点とするライフル射撃の団体です。くりはま花の国エアライフル射撃場を運営しています。",
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
    title: "横須賀市ライフル射撃協会 | 神奈川県の射撃団体",
    description:
      "横須賀市ライフル射撃協会は、神奈川県横須賀市を拠点とするライフル射撃の団体です。",
    images: ["/images/og-cover.jpg"],
  },
  alternates: {
    canonical: siteConfig.baseUrl,
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
    postalCode: siteConfig.postalCode,
    addressCountry: "JP",
  },
  areaServed: {
    "@type": "City",
    name: "横須賀市",
    containedInPlace: {
      "@type": "State",
      name: "神奈川県",
    },
  },
  memberOf: [
    {
      "@type": "SportsOrganization",
      name: "神奈川県ライフル射撃協会",
      url: "https://kraofficial.web.fc2.com/",
    },
    {
      "@type": "SportsOrganization",
      name: "日本ライフル射撃協会",
      url: "https://www.riflesports.jp/",
    },
  ],
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
