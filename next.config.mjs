import { PHASE_DEVELOPMENT_SERVER } from 'next/constants.js';

/** @type {(phase: string) => import('next').NextConfig} */
const nextConfig = (phase) => ({
  reactStrictMode: true,
  distDir: phase === PHASE_DEVELOPMENT_SERVER ? '.next-dev' : '.next',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  webpack: (config, { dev }) => {
    if (dev) {
      // Avoid stale PackFileCacheStrategy ModuleNotFoundError after file moves/renames
      config.cache = { type: 'memory' };
    }
    return config;
  },
});

export default nextConfig;
