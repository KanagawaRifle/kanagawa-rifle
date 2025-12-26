import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "横須賀市ライフル射撃協会 | 神奈川県の射撃団体",
  description:
    "横須賀市ライフル射撃協会は、神奈川県横須賀市を拠点とするライフル射撃の団体です。くりはま花の国エアライフル射撃場を運営しています。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
