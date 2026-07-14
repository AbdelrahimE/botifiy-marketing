/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['192.168.1.8'],
  experimental: {
    optimizePackageImports: ['lucide-react']
  },
  images: {
    unoptimized: false,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'botifiy.com',
        pathname: '/images/**',
      },
    ]
  },
  trailingSlash: false,
  poweredByHeader: false,
  // إضافة تحسينات للإنتاج
  compress: true
}

module.exports = nextConfig
