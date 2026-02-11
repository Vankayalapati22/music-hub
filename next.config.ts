import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/music-hub",
  assetPrefix: "/music-hub/",
  images: {
    unoptimized: true,
  },


};
module.exports = nextConfig;
