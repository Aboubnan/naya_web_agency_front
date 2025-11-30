// app/services/page.tsx

"use client";

import { useState } from "react"; // <--- NOUVEAU
import ServiceCard from "@/components/ServiceCard";
import Modal from "@/components/Modal"; // <--- NOUVEAU
import {
	CodeBracketIcon,
	ServerStackIcon,
	ChartBarSquareIcon,
	MagnifyingGlassIcon,
	UserGroupIcon,
	SwatchIcon,
} from "@heroicons/react/24/outline";

// Définition d'un type pour les services (bonne pratique)
type Service = {
	title: string;
	description: string;
	icon: React.ReactElement;
	details?: string; // Ajout d'un champ pour les détails longs de la modale
};

// Mettre à jour l'array 'services' avec des détails supplémentaires si vous le souhaitez
const services: Service[] = [
	{
		title: "Création de sites web sur mesure",
		description:
			"Nous concevons et développons des sites web uniques et performants, du design à la mise en ligne.",
		details:
			"Chaque site est construit sur mesure en utilisant des technologies modernes comme Next.js ou React, assurant rapidité, sécurité et une excellente expérience utilisateur. Nous gérons l'intégration de contenu et le déploiement.", // Exemple de détail
		icon: <CodeBracketIcon />,
	},
	{
		title: "Développement d'applications web",
		description:
			"Des applications métier complexes aux plateformes e-commerce, nous créons des solutions robustes avec les dernières technologies.",
		icon: <ServerStackIcon />,
	},
	{
		title: "Stratégie digitale",
		description:
			"Nous vous aidons à construire une présence en ligne forte, de la définition de votre cible à l'optimisation de votre parcours client.",
		icon: <ChartBarSquareIcon />,
	},
	{
		title: "Audit Technique & SEO",
		description:
			"Nous analysons en profondeur votre site web pour identifier les axes d'amélioration et optimiser votre référencement.",
		icon: <MagnifyingGlassIcon />,
	},
	{
		title: "Community Management",
		description:
			"Nous gérons votre présence sur les réseaux sociaux et interagissons avec votre communauté pour renforcer votre image de marque.",
		icon: <UserGroupIcon />,
	},
	{
		title: "Identité Visuelle & Branding",
		description:
			"De la création de logos à la charte graphique, nous construisons une identité visuelle forte et mémorable.",
		icon: <SwatchIcon />,
	},
];

const ServicesPage = () => {
	// 1. État pour la modale
	const [isModalOpen, setIsModalOpen] = useState(false);
	// 2. État pour stocker les données du service sélectionné
	const [selectedService, setSelectedService] = useState<Service | null>(null);

	// 3. Fonction pour gérer l'ouverture de la modale
	const handleCardClick = (service: Service) => {
		setSelectedService(service);
		setIsModalOpen(true);
	};

	// 4. Fonction pour gérer la fermeture de la modale
	const handleCloseModal = () => {
		setIsModalOpen(false);
		setSelectedService(null); // Optionnel: effacer les données à la fermeture
	};

	return (
		<main className="flex-grow container mx-auto px-4 py-16">
			<div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-center bg-gray-100 py-10">
				<div className="md:w-1/2 text-center md:text-left">
					<h1 className="text-center text-5xl md:text-4xl font-extrabold text-gray-800 leading-tight mb-4">
						Nos Services
					</h1>
					<p className="text-xl md:text-1xl text-gray-600 max-w-4xl mx-auto md:mx-0 mb-8">
						Nous transformons vos idées en solutions numériques performantes et
						sur mesure. Voici comment nous pouvons vous aider à réussir.
					</p>
				</div>
			</div>
			<section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
				{services.map((service, index) => (
					<ServiceCard
						key={index}
						title={service.title}
						description={service.description}
						icon={service.icon}
						// 5. Passer la fonction de clic
						onClick={() => handleCardClick(service)} // <--- NOUVEAU
					/>
				))}
			</section>

			{/* 6. Intégration de la modale */}
			<Modal
				isOpen={isModalOpen}
				onClose={handleCloseModal}
				service={selectedService}
			/>
		</main>
	);
};

// Assurez-vous d'avoir 'use client' si vous êtes dans l'App Router de Next.js
// et que le composant utilise des hooks d'état (useState)
// Ajoutez cette ligne au tout début du fichier si elle n'y est pas :
// 'use client';

export default ServicesPage;
