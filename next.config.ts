// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    // Liste des domaines autorisés pour les images
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.nayaweb.fr', // ton Strapi exposé via Nginx
      },
    ],
  },
};

module.exports = nextConfig;