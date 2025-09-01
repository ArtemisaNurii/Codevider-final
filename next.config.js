/** @type {import('next').NextConfig} */
const nextConfig = {
    // Your other configurations might be here
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'images.unsplash.com',
        },
        {
          protocol: 'https',
          hostname: 'cdn-icons-png.flaticon.com',
        },
      ],
    },
  };
  
  module.exports = nextConfig;