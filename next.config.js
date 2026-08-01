/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: [
      "@phosphor-icons/react",
      "@phosphor-icons/react/dist/ssr",
      "lucide-react",
      "@radix-ui/react-icons",
    ],
    // Keystatic's reader loads content/** from disk at runtime, so Next's
    // static import tracing never sees these files and leaves them out of the
    // serverless bundle. Without this, ISR revalidation on Vercel re-renders
    // pages against an empty content dir and silently drops every entry.
    outputFileTracingIncludes: {
      '/**/*': ['./content/**/*'],
    },
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  compress: true,
  swcMinify: true,
  reactStrictMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

module.exports = nextConfig;
