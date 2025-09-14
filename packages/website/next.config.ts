import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    images: {
      domains: ['static.kanagawa-rifle.org'],
      unoptimized: true,
    },
    pageExtensions: ['md', 'mdx', 'ts', 'tsx'],
};

export default nextConfig;
