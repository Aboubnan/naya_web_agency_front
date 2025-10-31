// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Liste des domaines autorisés pour les images
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337', // Le port de votre serveur Strapi
      },
    ],
  },
};

module.exports = nextConfig;