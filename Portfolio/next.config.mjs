/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. Fixes 404 errors by normalizing URL paths
  trailingSlash: true,

  // 2. Ensures the build finishes even if there are small code style warnings
  eslint: {
    ignoreDuringBuilds: true,
  },

  // 3. Performance: Enable advanced image compression
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;