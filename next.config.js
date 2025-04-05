/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '',
  images: {
    unoptimized: true,
  },
  // Add trailing slashes to URLs
  trailingSlash: true,
  // For GitHub Pages deployment
  assetPrefix: process.env.NODE_ENV === 'production' ? '/' : '',
  // Disable ESLint during build - remove this if you want ESLint checking during build
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig;
