"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MapPin, Phone, Mail } from "lucide-react";

export default function ShootingRangeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* スキップリンク */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-emerald-600 focus:px-4 focus:py-2 focus:text-white focus:outline-none"
      >
        メインコンテンツへスキップ
      </a>

      {/* ヘッダーバナー */}
      <header className="bg-gradient-to-r from-emerald-700 to-emerald-600">
        <div className="container mx-auto max-w-4xl px-4 py-6">
          <p className="text-sm text-emerald-100">横須賀市</p>
          <h1 className="mt-1 text-lg font-bold text-white sm:text-2xl md:text-3xl">
            くりはま花の国エアライフル射撃場
          </h1>
          <p className="mt-2 text-sm text-emerald-100">
            神奈川県公安委員会・日本ライフル射撃協会公認射撃場
          </p>
        </div>
      </header>

      {/* ナビゲーション */}
      <nav aria-label="射撃場ページナビゲーション" className="border-b border-gray-200 bg-white shadow-sm">
        <div className="container mx-auto max-w-4xl px-4">
          <ul className="flex" role="list">
            <NavLink href="/shooting-range">施設概要</NavLink>
            <NavLink href="/shooting-range/guide">利用案内</NavLink>
            <NavLink href="/shooting-range/access">アクセス</NavLink>
          </ul>
        </div>
      </nav>

      {/* メインコンテンツ */}
      <main id="main-content" className="container mx-auto max-w-4xl flex-1 px-4 py-8 leading-relaxed">
        {children}
      </main>

      {/* お問い合わせフッター */}
      <footer className="mt-auto border-t-4 border-emerald-600 bg-white">
        <div className="container mx-auto max-w-4xl px-4 py-6">
          <h2 className="mb-4 text-lg font-bold text-gray-800">お問い合わせ</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex items-start gap-3">
              <MapPin aria-hidden="true" className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-600" />
              <div className="text-sm">
                <p className="font-medium text-gray-800">所在地</p>
                <address className="not-italic text-gray-600">
                  〒239-0832
                  <br />
                  神奈川県横須賀市神明町1番地
                </address>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone aria-hidden="true" className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-600" />
              <div className="text-sm">
                <p className="font-medium text-gray-800">電話・FAX</p>
                <a
                  href="tel:046-833-6990"
                  className="text-gray-600 hover:text-emerald-600 hover:underline focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                >
                  046-833-6990
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail aria-hidden="true" className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-600" />
              <div className="text-sm">
                <p className="font-medium text-gray-800">メール</p>
                <a
                  href="mailto:yokosukarifle@yahoo.co.jp"
                  className="text-gray-600 hover:text-emerald-600 hover:underline focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                >
                  yokosukarifle@yahoo.co.jp
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <li>
      <Link
        href={href}
        aria-current={isActive ? "page" : undefined}
        className={`inline-block border-b-2 px-4 py-3 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald-500 ${
          isActive
            ? "border-emerald-600 text-emerald-600"
            : "border-transparent text-gray-600 hover:border-emerald-500 hover:text-emerald-600"
        }`}
      >
        {children}
      </Link>
    </li>
  );
}
