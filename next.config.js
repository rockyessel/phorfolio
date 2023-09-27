/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'esselr.vercel.app',
      'hackernoon.imgix.net',
      'images.unsplash.com',
      'cdn.sanity.io',
      'avatars.githubusercontent.com',
      'robohash.org',
      'cdn.jsdelivr.net',
    ],
  },
};

module.exports = nextConfig;
