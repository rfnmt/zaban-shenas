// const withPWA = require("@ducanh2912/next-pwa").default({
//   dest: "public",
// });

/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "academy-staging.res.zabanshenas.ir",
      },
      {
        protocol: "https",
        hostname: "academy.res.zabanshenas.ir",
      },
      {
        protocol: "https",
        hostname: "academy-strapi.staging.zabanshenas.com",
      },
      {
        protocol: "https",
        hostname: "academy-strapi.zabanshenas.com",
      },
      {
        protocol: "https",
        hostname: "wallpapergram.ir",
      },
    ],
  },

  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // compiler: { emotion: true },
};

// module.exports = withPWA(nextConfig);
module.exports = nextConfig;
