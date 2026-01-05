/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. Fixes 404 errors by normalizing URL paths
  trailingSlash: true,

  // 2. Ensures the build finishes even if there are small code style warnings
  // Note: 'eslint' config moved to root in newer Next.js versions, but we can use ignoreDuringBuilds in some contexts.
  // Removing the unsupported key to fix build warnings.

  // 3. Performance: Enable advanced image compression
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;