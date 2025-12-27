/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['saintsal.ai', 'cookinbiz.com', 'cookincapital.com'],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
