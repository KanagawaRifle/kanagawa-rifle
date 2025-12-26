import type { ReactNode } from "react";

interface LiquidGlassPillProps {
  children: ReactNode;
  className?: string;
}

export function LiquidGlassPill({
  children,
  className = "",
}: LiquidGlassPillProps) {
  return (
    <div className={`relative inline-block ${className}`}>
      {/* Shadow layer */}
      <div className="absolute inset-0 translate-y-2 rounded-full bg-black/10 blur-lg" />
      {/* Glass pill */}
      <div className="relative overflow-hidden rounded-full border border-white/40 bg-white/35 px-6 py-3 text-sm font-medium text-slate-700 shadow-[0_4px_16px_rgba(0,0,0,0.06)] backdrop-blur-xl backdrop-saturate-150">
        {/* Specular highlight */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/60 to-transparent" />
        <span className="relative">{children}</span>
      </div>
    </div>
  );
}
