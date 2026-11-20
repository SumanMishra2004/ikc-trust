import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "www.ikc.org.in",
      },
      // Sanity CDN — for optimised images served from Sanity's image pipeline
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },

  // Required for Sanity Studio to work correctly inside Next.js App Router.
  // Sanity's UI package uses styled-components which needs transpilation.
  transpilePackages: ["@sanity/ui", "@sanity/icons", "sanity"],
};

export default nextConfig;
