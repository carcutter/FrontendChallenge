/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        destination: 'http://dummy.restapiexample.com/api/v1/:path*',
      },
    ]
  },
}

module.exports = nextConfig
