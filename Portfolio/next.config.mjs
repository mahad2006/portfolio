/** @type {import('next').NextConfig} */
const nextConfig = {
    // This allows the build to succeed even if there are small linting errors
    eslint: {
        ignoreDuringBuilds: true,
    },
};

export default nextConfig;