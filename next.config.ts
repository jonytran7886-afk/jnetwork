import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Standalone output keeps the production Docker image small: only the
  // files required to run `node server.js` are copied (see docker/Dockerfile).
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
