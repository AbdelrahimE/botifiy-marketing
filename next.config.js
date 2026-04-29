/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['lucide-react']
  },
  images: {
    unoptimized: false,
    // إضافة دعم أفضل للصور في الإنتاج
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      }
    ]
  },
  trailingSlash: false,
  poweredByHeader: false,
  // إضافة تحسينات للإنتاج
  compress: true
}

module.exports = nextConfig 