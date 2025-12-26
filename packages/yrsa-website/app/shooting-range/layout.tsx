import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";

export default function ShootingRangeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 mt-4">
      {/* ヘッダーバナー */}
      <div className="bg-gradient-to-r from-emerald-700 to-emerald-600">
        <div className="container mx-auto max-w-4xl px-4 py-6">
          <p className="text-sm text-emerald-100">横須賀市</p>
          <h1 className="mt-1 text-lg font-bold text-white sm:text-2xl md:text-3xl">
            くりはま花の国エアライフル射撃場
          </h1>
          <p className="mt-2 text-sm text-emerald-100">
            神奈川県公安委員会・日本ライフル射撃協会公認射撃場
          </p>
        </div>
      </div>

      {/* ナビゲーション */}
      <nav className="border-b border-gray-200 bg-white">
        <div className="container mx-auto max-w-4xl px-4">
          <ul className="flex">
            <NavLink href="/shooting-range">施設概要</NavLink>
            <NavLink href="/shooting-range/guide">利用案内</NavLink>
            <NavLink href="/shooting-range/access">アクセス</NavLink>
          </ul>
        </div>
      </nav>

      {/* メインコンテンツ */}
      <div className="container mx-auto max-w-4xl px-4 py-8">{children}</div>

      {/* お問い合わせバー */}
      <div className="border-t border-gray-200 bg-white">
        <div className="container mx-auto max-w-4xl px-4 py-6">
          <h2 className="mb-4 text-lg font-bold text-gray-800">お問い合わせ</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-600" />
              <div className="text-sm">
                <p className="font-medium text-gray-800">所在地</p>
                <p className="text-gray-600">
                  〒239-0832
                  <br />
                  神奈川県横須賀市神明町1番地
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-600" />
              <div className="text-sm">
                <p className="font-medium text-gray-800">電話・FAX</p>
                <p className="text-gray-600">046-833-6990</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-600" />
              <div className="text-sm">
                <p className="font-medium text-gray-800">メール</p>
                <p className="text-gray-600">yokosukarifle@yahoo.co.jp</p>
              </div>
            </div>
          </div>
        </div>
      </div>
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
  return (
    <li>
      <Link
        href={href}
        className="inline-block border-b-2 border-transparent px-4 py-3 text-sm font-medium text-gray-600 transition-colors hover:border-emerald-500 hover:text-emerald-600"
      >
        {children}
      </Link>
    </li>
  );
}
