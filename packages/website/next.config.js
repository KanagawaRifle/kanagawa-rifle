/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  trailingSlash: true,
  images: {
    domains: ['static.kanagawa-rifle.org'],
    unoptimized: true,
  },
};

module.exports = nextConfig;
