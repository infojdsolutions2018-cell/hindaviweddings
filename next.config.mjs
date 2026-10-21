/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Disable ESLint errors blocking production builds/deployments
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Prevent unhandled type warnings from halting production builds
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
