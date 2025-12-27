import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // API ルートを動的に動作させるため output: "export" は使用しない
  // ページは generateStaticParams で静的生成される
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
