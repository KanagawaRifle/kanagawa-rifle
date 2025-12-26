import Link from "next/link";
import { Heart, Calendar, BookOpen, Trophy, Star } from "lucide-react";

const navItems = [
  {
    href: "/about",
    label: "協会紹介",
    icon: Heart,
    colors: "from-red-100 to-red-300 border-red-400 text-red-500 text-red-800",
  },
  {
    href: "/shooting-range",
    label: "射撃場",
    icon: Calendar,
    colors:
      "from-cyan-100 to-cyan-300 border-cyan-400 text-cyan-600 text-cyan-800",
  },
  {
    href: "/competitions",
    label: "大会",
    icon: Trophy,
    colors:
      "from-purple-100 to-purple-300 border-purple-400 text-purple-500 text-purple-800",
  },
  {
    href: "/projects",
    label: "年間予定",
    icon: Star,
    colors:
      "from-yellow-100 to-yellow-300 border-yellow-400 text-yellow-600 text-yellow-800",
  },
  {
    href: "/links",
    label: "リンク",
    icon: BookOpen,
    colors:
      "from-green-100 to-green-300 border-green-400 text-green-600 text-green-800",
  },
];

export function Header() {
  return (
    <header id="AppHeader">
      <div className="h-2 bg-indigo-600 text-center text-xs text-white"></div>
      <h1 className="my-2 flex justify-center">
        <Link href="/">
          <svg
            width="360"
            height="64"
            viewBox="0 0 400 56"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient
                id="metalGrad"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" style={{ stopColor: "#e5e7eb" }} />
                <stop offset="25%" style={{ stopColor: "#ffffff" }} />
                <stop offset="50%" style={{ stopColor: "#d1d5db" }} />
                <stop offset="75%" style={{ stopColor: "#ffffff" }} />
                <stop offset="100%" style={{ stopColor: "#9ca3af" }} />
              </linearGradient>
              <linearGradient
                id="blueShiny"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" style={{ stopColor: "#60a5fa" }} />
                <stop offset="50%" style={{ stopColor: "#1d4ed8" }} />
                <stop offset="100%" style={{ stopColor: "#1e40af" }} />
              </linearGradient>
              <filter
                id="bevel"
                x="-50%"
                y="-50%"
                width="200%"
                height="200%"
              >
                <feGaussianBlur in="SourceAlpha" stdDeviation="1" />
                <feSpecularLighting
                  result="specOut"
                  in="blur"
                  specularConstant="1.5"
                  specularExponent="20"
                  lightingColor="white"
                >
                  <fePointLight x="-5" y="-10" z="20" />
                </feSpecularLighting>
                <feComposite
                  in="specOut"
                  in2="SourceAlpha"
                  operator="in"
                  result="specOut2"
                />
                <feComposite
                  in="SourceGraphic"
                  in2="specOut2"
                  operator="arithmetic"
                  k1="0"
                  k2="1"
                  k3="1"
                  k4="0"
                />
              </filter>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <rect
              width="400"
              height="56"
              fill="url(#metalGrad)"
              stroke="#6b7280"
              strokeWidth="2"
              rx="8"
              filter="url(#bevel)"
            />
            <rect
              x="4"
              y="4"
              width="392"
              height="48"
              fill="none"
              stroke="#374151"
              strokeWidth="1"
              rx="6"
            />
            <g transform="translate(28, 28)">
              <circle r="18" fill="url(#blueShiny)" filter="url(#bevel)" />
              <circle r="14" fill="#ff0000" opacity="0.8" />
              <circle r="10" fill="#ffff00" opacity="0.9" />
              <circle r="6" fill="#00ff00" opacity="0.8" />
              <circle r="3" fill="#ffffff" filter="url(#glow)" />
              <circle r="1" fill="#000000" />
            </g>
            <g fill="#ffff00" opacity="0.7">
              <polygon
                points="15,8 16,10 18,9 16,11 15,13 14,11 12,9 14,10"
                filter="url(#glow)"
              />
              <polygon
                points="35,15 36,17 38,16 36,18 35,20 34,18 32,16 34,17"
                filter="url(#glow)"
              />
            </g>
            <text
              x="60"
              y="24"
              fontFamily="Times New Roman, serif"
              fontSize="16"
              fontWeight="bold"
              fill="url(#blueShiny)"
              stroke="#000080"
              strokeWidth="0.5"
              filter="url(#bevel)"
            >
              ★横須賀市ライフル射撃協会★
            </text>
            <text
              x="60"
              y="44"
              fontFamily="Comic Sans MS, cursive"
              fontSize="10"
              fill="#ff6600"
              filter="url(#glow)"
            >
              Welcome to our COOL website! ～射撃の世界へようこそ～
            </text>
            <circle cx="380" cy="12" r="3" fill="#ff0000">
              <animate
                attributeName="opacity"
                values="1;0;1"
                dur="1s"
                repeatCount="indefinite"
              />
            </circle>
            <rect
              x="350"
              y="42"
              width="45"
              height="10"
              fill="#ffff00"
              stroke="#ff0000"
              strokeWidth="1"
              opacity="0.8"
            />
            <text
              x="352"
              y="50"
              fontFamily="Arial"
              fontSize="6"
              fill="#ff0000"
              fontWeight="bold"
            >
              UNDER CONSTRUCTION
            </text>
          </svg>
        </Link>
      </h1>
      <nav>
        <div className="mx-auto grid w-fit grid-cols-5 justify-center gap-2">
          {navItems.map((item) => {
            const colorClasses = item.colors.split(" ");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative flex h-16 w-16 transform cursor-pointer flex-col items-center justify-center rounded border-2 bg-gradient-to-b shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl ${colorClasses[0]} ${colorClasses[1]} ${colorClasses[2]}`}
              >
                <item.icon
                  className={`mb-0.5 h-8 w-8 ${colorClasses[3]}`}
                />
                <span
                  className={`text-xs font-bold leading-none ${colorClasses[4]}`}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
