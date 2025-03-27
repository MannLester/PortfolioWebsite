import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: 'standalone',
    images: {
        unoptimized: true, // This is recommended for static exports
        domains: [], // Add any external image domains here if needed
    },
    reactStrictMode: true,
    swcMinify: true,
};

export default nextConfig;
