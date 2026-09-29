import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
  allowedDevOrigins: [
    'ais-dev-2xvt4fesakdnmeftrerr2z-814876491024.asia-east1.run.app',
    'ais-pre-2xvt4fesakdnmeftrerr2z-814876491024.asia-east1.run.app',
    'ais-shared-2xvt4fesakdnmeftrerr2z-814876491024.asia-east1.run.app',
    'ais-mob-2xvt4fesakdnmeftrerr2z-814876491024.asia-east1.run.app',
    'jnetwork.ai.studio',
    'localhost:3000',
    '127.0.0.1:3000',
  ],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },
};

export default nextConfig;
