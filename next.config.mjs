/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. Fixes 404 errors by normalizing URL paths
  trailingSlash: true,

  // 2. Performance: Enable advanced image compression
  images: {
    formats: ['image/avif', 'image/webp'],
  },

  // 3. Experimental features for better performance
  experimental: {
    // Optimize package imports to reduce bundle size
    optimizePackageImports: ['framer-motion', '@heroicons/react'],
  },

  // 4. Compiler optimizations
  compiler: {
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error', 'warn'] } : false,
  },

  // 5. Target modern browsers only (reduces polyfills)
  // This is handled by browserslist in package.json
};

export default nextConfig;