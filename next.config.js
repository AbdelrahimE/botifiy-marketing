/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['lucide-react']
  },
  images: {
    domains: ['localhost'],
    unoptimized: false
  },
  trailingSlash: false,
  poweredByHeader: false
}

module.exports = nextConfig 