import type { ReactNode } from "react";

interface LiquidGlassBackgroundProps {
  children: ReactNode;
}

export function LiquidGlassBackground({
  children,
}: LiquidGlassBackgroundProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-200 via-purple-100 to-pink-200">
      {/* Dynamic mesh gradient background - like Apple wallpapers */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        {/* Primary color blobs */}
        <div className="absolute -left-20 top-0 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-blue-400/70 to-cyan-300/50 blur-[80px]" />
        <div className="absolute -right-20 top-1/4 h-[600px] w-[600px] rounded-full bg-gradient-to-bl from-purple-400/60 to-pink-300/40 blur-[100px]" />
        <div className="absolute -bottom-20 left-1/4 h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-orange-300/50 to-yellow-200/40 blur-[90px]" />
        <div className="absolute bottom-1/4 right-1/3 h-[400px] w-[400px] rounded-full bg-gradient-to-tl from-teal-300/40 to-emerald-200/30 blur-[70px]" />

        {/* Subtle pattern overlay for texture */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl p-6 md:p-8">{children}</div>
    </div>
  );
}
