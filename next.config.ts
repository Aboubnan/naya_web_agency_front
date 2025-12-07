// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
    // Garder ceci pour le moment si vous avez des erreurs de build
    typescript: {
        ignoreBuildErrors: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    images: {
        remotePatterns: [
            // 🛑 CORRECTION : AJOUT DU DOMAINE DE PLACEHOLDER MANQUANT
            {
                protocol: 'https',
                hostname: 'placehold.co',
            },
            {
                protocol: 'https',
                // Le hostname de votre API de production
                hostname: 'api.nayaweb.fr', 
            },
            // Autorisation pour le développement local
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '3001',
            },
        ],
    },
};

module.exports = nextConfig;