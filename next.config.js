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
  images: {
    domains: [process.env.S3_BUCKET]
  }
};

module.exports = nextConfig
