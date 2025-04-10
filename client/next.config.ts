import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https", // Assuming the images are served over HTTPS
        hostname: "img.freepik.com",
        pathname: "**", // Allows any path under this hostname
      },
      // Add other allowed hostnames here if needed
    ],
  },
};

export default nextConfig;
