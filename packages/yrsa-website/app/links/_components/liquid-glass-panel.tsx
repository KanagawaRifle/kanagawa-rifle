import type { ReactNode } from "react";

interface LiquidGlassPanelProps {
  children: ReactNode;
  className?: string;
}

export function LiquidGlassPanel({
  children,
  className = "",
}: LiquidGlassPanelProps) {
  return (
    <div className={`relative inline-block ${className}`}>
      {/* Layer 1: Shadow/depth layer */}
      <div className="absolute inset-0 translate-y-3 rounded-[28px] bg-black/10 blur-2xl" />
      {/* Layer 2: Main glass body */}
      <div className="relative overflow-hidden rounded-[28px] border border-white/50 bg-white/40 px-10 py-8 shadow-[0_8px_32px_rgba(0,0,0,0.08)] backdrop-blur-xl backdrop-saturate-150">
        {/* Layer 3: Specular highlight - curved light reflection */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/80 via-white/20 to-transparent" />
        {/* Edge highlight - simulating light bending at edges */}
        <div className="pointer-events-none absolute inset-0 rounded-[28px] bg-gradient-to-br from-white/30 via-transparent to-white/10" />
        <div className="relative">{children}</div>
      </div>
    </div>
  );
}
