/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "dlhkotatasikmalaya.or.id", 
      "portal.tasikmalayakota.go.id", 
      "www.dlh.tasikmalayakota.go.id",
      "images.unsplash.com"
    ,"img.youtube.com"
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
    ],
  },
};

module.exports = nextConfig;
