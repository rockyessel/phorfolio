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
      'lh3.googleusercontent.com',
      'upload.wikimedia.org',
      'flowbite.com',
      'img.freepik.com',
    ],
  },
  async headers() {
    return [
      {
        source: '/',
        headers: [
          // {
          //   key: 'X-DNS-Prefetch-Control',
          //   value: 'on',
          // },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          // {
          //   key: 'X-Frame-Options',
          //   value: 'SAMEORIGIN',
          // },
          // {
          //   key: 'Permissions-Policy',
          //   value: 'camera=(), microphone=(), geolocation=()',
          // },
          // {
          //   key: 'X-Content-Type-Options',
          //   value: 'nosniff',
          // },
          // {
          //   key: 'Referrer-Policy',
          //   value: 'origin-when-cross-origin',
          // },
          // {
          //   key: 'Content-Security-Policy',
          //   value:
          //     "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' fonts.googleapis.com; img-src 'self' data: images.unsplash.com plus.unsplash.com;",
          // },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
