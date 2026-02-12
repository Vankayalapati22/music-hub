import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/music-hub",//navigation (my app is Not running at root / It is running inside a folder )
  assetPrefix: "/music-hub/", //(Load CSS,JS,Images from this folder)
  images: {
    unoptimized: true,
  },


};
module.exports = nextConfig;
