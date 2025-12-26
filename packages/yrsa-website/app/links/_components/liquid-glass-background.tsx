import type { ReactNode } from "react";

interface LiquidGlassBackgroundProps {
  children: ReactNode;
}

export function LiquidGlassBackground({
  children,
}: LiquidGlassBackgroundProps) {
  return (
    <div
      className="relative min-h-screen"
      style={{
        background: "linear-gradient(180deg, #a8e6f0 0%, #7dd3e0 25%, #5bc0d9 50%, #4aa8c7 75%, #e8a87c 100%)",
      }}
    >
      {/* iOS 9 sand dunes style wallpaper - cyan/turquoise with orange accent */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Light cyan wash - top area */}
        <div
          className="absolute -left-20 -top-20 h-[600px] w-[800px] opacity-80"
          style={{
            background: "radial-gradient(ellipse 90% 70% at 40% 30%, #b8eef5 0%, #8de4ed 30%, #5fcdd9 60%, transparent 85%)",
            filter: "blur(30px)",
          }}
        />

        {/* Turquoise main flow - center */}
        <div
          className="absolute left-1/3 top-1/4 h-[500px] w-[600px] opacity-75"
          style={{
            background: "radial-gradient(ellipse 80% 60% at 50% 50%, #7dd3e0 0%, #5bc0d9 35%, #4aadc5 60%, transparent 85%)",
            filter: "blur(40px)",
          }}
        />

        {/* Deep blue/teal depth - left side */}
        <div
          className="absolute -left-10 top-1/3 h-[450px] w-[400px] opacity-85"
          style={{
            background: "radial-gradient(ellipse 70% 80% at 30% 50%, #1a5f8a 0%, #2980b9 30%, #3498c7 55%, transparent 80%)",
            filter: "blur(35px)",
          }}
        />

        {/* Secondary teal accent */}
        <div
          className="absolute right-1/4 top-1/2 h-[350px] w-[450px] opacity-60"
          style={{
            background: "radial-gradient(ellipse at center, #4fb8d0 0%, #3aa8c2 40%, transparent 75%)",
            filter: "blur(45px)",
          }}
        />

        {/* Orange/coral warm accent - bottom */}
        <div
          className="absolute -bottom-20 left-1/4 h-[400px] w-[700px] opacity-70"
          style={{
            background: "radial-gradient(ellipse 85% 60% at 50% 70%, #f4a460 0%, #e8845c 30%, #d97753 55%, transparent 80%)",
            filter: "blur(50px)",
          }}
        />

        {/* Salmon highlight - bottom right */}
        <div
          className="absolute -bottom-10 -right-20 h-[350px] w-[450px] opacity-55"
          style={{
            background: "radial-gradient(ellipse 70% 80% at 60% 60%, #f5b895 0%, #eda07a 40%, transparent 75%)",
            filter: "blur(40px)",
          }}
        />

        {/* White/cream highlight - top scattered */}
        <div
          className="absolute right-1/3 top-10 h-[200px] w-[300px] opacity-50"
          style={{
            background: "radial-gradient(ellipse at center, #ffffff 0%, #f0f8f8 30%, transparent 65%)",
            filter: "blur(25px)",
          }}
        />

        {/* Additional cyan glow - middle right */}
        <div
          className="absolute -right-10 top-1/3 h-[300px] w-[350px] opacity-45"
          style={{
            background: "radial-gradient(ellipse at center, #8de8f0 0%, #6dd5e0 40%, transparent 70%)",
            filter: "blur(35px)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl p-6 md:p-8">{children}</div>
    </div>
  );
}
