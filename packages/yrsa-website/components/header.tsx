import Link from "next/link";

const navItems = [
  {
    href: "/shooting-range",
    label: "🏠 射撃場",
    gradient: "from-orange-300 to-orange-500",
    hoverGradient: "hover:from-orange-400 hover:to-orange-600",
  },
  {
    href: "/about",
    label: "📖 協会紹介",
    gradient: "from-green-300 to-green-500",
    hoverGradient: "hover:from-green-400 hover:to-green-600",
  },
  {
    href: "/competitions",
    label: "🏆 競技会",
    gradient: "from-blue-300 to-blue-500",
    hoverGradient: "hover:from-blue-400 hover:to-blue-600",
  },
  {
    href: "/projects",
    label: "📅 年間予定",
    gradient: "from-yellow-300 to-yellow-500",
    hoverGradient: "hover:from-yellow-400 hover:to-yellow-600",
  },
  {
    href: "/links",
    label: "🔗 リンク",
    gradient: "from-purple-300 to-purple-500",
    hoverGradient: "hover:from-purple-400 hover:to-purple-600",
  },
];

export function Header() {
  return (
    <header
      id="AppHeader"
      style={{
        background: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='10' cy='10' r='2'/%3E%3C/g%3E%3C/svg%3E"), linear-gradient(to right, #ffccff, #ffffcc, #ccffff)`,
      }}
    >
      {/* キラキラ装飾 - motion-safe で条件付きアニメーション */}
      <div className="flex justify-center gap-2 py-1" aria-hidden="true">
        <span className="text-lg motion-safe:animate-pulse">✧</span>
        <span className="text-lg motion-safe:animate-bounce">☆</span>
        <span className="text-lg motion-safe:animate-pulse">✧</span>
        <span className="text-lg motion-safe:animate-bounce">☆</span>
        <span className="text-lg motion-safe:animate-pulse">✧</span>
      </div>

      {/* ロゴ */}
      <div className="border-y-4 border-double border-purple-400 bg-gradient-to-r from-pink-100 via-white to-cyan-100 py-3">
        <h1 className="text-center">
          <Link href="/" className="inline-block">
            <div className="border-4 border-purple-500 bg-gradient-to-r from-purple-200 via-pink-100 to-cyan-200 px-6 py-2 shadow-lg">
              <div className="flex items-center justify-center gap-2">
                <span className="text-2xl motion-safe:animate-spin" aria-hidden="true">🎯</span>
                <span className="font-retro text-xl font-bold text-purple-800 text-shadow-sm md:text-2xl">
                  ★横須賀市ライフル射撃協会★
                </span>
                <span className="text-2xl motion-safe:animate-spin" aria-hidden="true">🎯</span>
              </div>
              <p className="font-retro mt-1 text-sm text-pink-600">
                ～Welcome to our COOL website!～
              </p>
            </div>
          </Link>
        </h1>
      </div>

      {/* ナビゲーション */}
      <nav
        className="border-b-4 border-double border-cyan-400 bg-gradient-to-r from-cyan-100 via-yellow-50 to-pink-100 py-3"
        aria-label="メインナビゲーション"
      >
        <ul className="mx-auto flex flex-wrap justify-center gap-2 px-2">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`font-retro inline-block rounded bg-gradient-to-b ${item.gradient} ${item.hoverGradient} px-3 py-1.5 text-sm font-bold text-white text-shadow-sm shadow transition-all motion-safe:hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-600 md:px-4 md:py-2 md:text-base`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* マーキー風お知らせバー */}
      <div
        className="overflow-hidden border-b-2 border-red-300 bg-yellow-100 py-1"
        role="region"
        aria-label="お知らせ"
      >
        <p className="font-retro whitespace-nowrap text-center text-sm text-red-600">
          📢 最新情報をチェックしてね！ 📢 月例会 参加者募集中☆ 📢
        </p>
      </div>
    </header>
  );
}
