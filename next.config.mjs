/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.tiktokcdn.com" },
    ],
  },
};

export default nextConfig;
