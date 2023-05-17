/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
      enforce: 'pre'
    });
    return config;
  },
  staticPageGenerationTimeout: 50000,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.NEXT_PUBLIC_S3_BUCKET,
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.sephora.ae',
        port: '',
        pathname: '/**'
      },
    ],
  },
};

module.exports = nextConfig
