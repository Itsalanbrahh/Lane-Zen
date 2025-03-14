/** @type {import('next').NextConfig} */

// Load environment based on command line arguments
const loadEnvironment = () => {
  const envArg = process.argv.find(arg => arg.startsWith('--env='));
  if (envArg) {
    return envArg.replace('--env=', '');
  }
  return process.env.NODE_ENV; // default to NODE_ENV
};

const environment = loadEnvironment();
console.log(`Building for environment: ${environment}`);

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    NEXT_PUBLIC_ENVIRONMENT: environment
  },
  // Enable image optimization
  images: {
    domains: ['images.unsplash.com'],
  },
  // Allow importing SVG as React components
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  // API rewrites
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: process.env.NEXT_PUBLIC_API_URL + '/:path*',
      },
    ];
  },
};

module.exports = nextConfig; 