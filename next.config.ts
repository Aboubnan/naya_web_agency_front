// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                // 💡 CORRECTION : Remplacer l'ancien domaine Strapi par le domaine qui sert DÉSORMAIS les images.
                // Si votre API/média est à une nouvelle adresse:
                hostname: 'api.nayaweb.fr', 
                // OU, si les images sont servies via l'API, assurez-vous que ce domaine est correct:
                // hostname: 'api.nouveaudomaine.com',
            },
            // 💡 AJOUT : Ajoutez l'autorisation pour 'localhost' si vous développez localement
            {
                protocol: 'http',
                hostname: 'localhost',
            },
        ],
    },
};

module.exports = nextConfig;