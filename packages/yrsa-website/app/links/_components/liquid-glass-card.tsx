import type { ReactNode } from "react";
import Image from "next/image";

interface LiquidGlassCardProps {
  href: string;
  image: string;
  title: string;
  description?: string;
  children?: ReactNode;
}

export function LiquidGlassCard({
  href,
  image,
  title,
  description,
  children,
}: LiquidGlassCardProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative overflow-hidden rounded-[22px] transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-0.5 hover:scale-[1.01]"
    >
      {/* Shadow layer - creates floating depth */}
      <div className="pointer-events-none absolute inset-0 translate-y-2 rounded-[22px] bg-black/10 blur-xl transition-all duration-500 group-hover:translate-y-3 group-hover:bg-black/15 group-hover:blur-2xl" />

      {/* Main glass container */}
      <div className="relative overflow-hidden rounded-[22px] border border-white/40 bg-white/35 shadow-[0_4px_24px_rgba(0,0,0,0.06),inset_0_1px_1px_rgba(255,255,255,0.6)] backdrop-blur-xl backdrop-saturate-150 transition-all duration-500 group-hover:border-white/60 group-hover:bg-white/50">
        {/* Top specular arc - Apple's curved light reflection */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white/70 via-white/30 to-transparent" />

        {/* Diagonal highlight - simulates 3D glass curvature */}
        <div className="pointer-events-none absolute -right-16 -top-16 h-32 w-32 rotate-45 bg-gradient-to-br from-white/50 to-transparent blur-sm" />

        {/* Edge inner glow */}
        <div className="pointer-events-none absolute inset-0 rounded-[22px] ring-1 ring-inset ring-white/40" />

        {/* Image container */}
        <div className="relative overflow-hidden">
          <Image
            src={image}
            alt={`${title}のサムネイル画像`}
            width={400}
            height={300}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
            loading="lazy"
            className="block aspect-video w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.02]"
          />
          {/* Frosted overlay - bottom fade */}
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white/80 via-white/40 to-transparent backdrop-blur-[2px]" />
        </div>

        {/* Content area */}
        <div className="relative p-4">
          <h2 className="text-[15px] font-semibold tracking-tight text-slate-800 transition-colors duration-300 group-hover:text-blue-600">
            {title}
            <span className="sr-only">（外部サイト、新しいタブで開きます）</span>
          </h2>
          {description && (
            <p className="mt-1 text-[13px] leading-relaxed text-slate-500 transition-colors duration-300 group-hover:text-slate-600">
              {description}
            </p>
          )}

          {children || (
            <div className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-slate-200/60 bg-slate-50/80 px-2.5 py-1 text-[11px] font-medium text-slate-400 backdrop-blur-sm transition-all duration-300 group-hover:border-blue-200/60 group-hover:bg-blue-50/80 group-hover:text-blue-500">
              <svg
                className="h-2.5 w-2.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
              <span>外部サイト</span>
            </div>
          )}
        </div>

        {/* Bottom edge reflection line */}
        <div className="pointer-events-none absolute inset-x-4 bottom-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />
      </div>
    </a>
  );
}
