"use client";

import { useState } from "react";
import ServiceCard from "@/components/ServiceCard";
import Modal from "@/components/Modal";
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

// Tableau des services avec icônes et descriptions
const services: Service[] = [
	{
		title: "Création de sites web sur mesure",
		description:
			"Nous concevons et développons des sites web uniques et performants, du design à la mise en ligne.",
		details:
			"Chaque site est construit sur mesure en utilisant des technologies modernes comme Next.js ou React, assurant rapidité, sécurité et une excellente expérience utilisateur. Nous gérons l'intégration de contenu et le déploiement.",
		icon: <CodeBracketIcon />,
	},
	{
		title: "Développement d'applications web",
		description:
			"Des applications métier complexes aux plateformes e-commerce, nous créons des solutions robustes avec les dernières technologies.",
		details:
			"Nous utilisons des frameworks back-end (comme Node.js/Express, Python/Django) et des bases de données modernes (PostgreSQL, MongoDB) pour garantir évolutivité et fiabilité. Focus sur l'API RESTful et GraphQL.",
		icon: <ServerStackIcon />,
	},
	{
		title: "Stratégie digitale",
		description:
			"Nous vous aidons à construire une présence en ligne forte, de la définition de votre cible à l'optimisation de votre parcours client.",
		details:
			"Analyse de marché, définition des objectifs, planification de contenu et mise en place d'indicateurs de performance (KPIs) pour maximiser votre retour sur investissement numérique.",
		icon: <ChartBarSquareIcon />,
	},
	{
		title: "Audit Technique & SEO",
		description:
			"Nous analysons en profondeur votre site web pour identifier les axes d'amélioration et optimiser votre référencement.",
		details:
			"Audit de vitesse, accessibilité (WCAG), structure des données, et optimisation du contenu pour améliorer votre classement dans les moteurs de recherche (Google, Bing).",
		icon: <MagnifyingGlassIcon />,
	},
	{
		title: "Community Management",
		description:
			"Nous gérons votre présence sur les réseaux sociaux et interagissons avec votre communauté pour renforcer votre image de marque.",
		details:
			"Création de calendriers éditoriaux, modération, campagnes publicitaires ciblées et analyse de l'engagement pour développer votre audience sur les plateformes pertinentes.",
		icon: <UserGroupIcon />,
	},
	{
		title: "Identité Visuelle & Branding",
		description:
			"De la création de logos à la charte graphique, nous construisons une identité visuelle forte et mémorable.",
		details:
			"Travail sur la typographie, la palette de couleurs, le ton de la marque et les supports graphiques pour garantir une cohérence et une reconnaissance immédiate.",
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
		// Ouvre la modale seulement si des détails sont disponibles
		if (service.details) {
			setSelectedService(service);
			setIsModalOpen(true);
		}
	};

	// 4. Fonction pour gérer la fermeture de la modale
	const handleCloseModal = () => {
		setIsModalOpen(false);
		setSelectedService(null);
	};

	return (
		<main className="flex-grow min-h-screen pt-20 bg-gray-50">
			<div className="container mx-auto px-4 py-12">
				{/* Section d'Introduction */}
				<div className="text-center mb-12">
					<h1 className="text-5xl font-extrabold text-gray-800 leading-tight mb-4">
						Nos Services
					</h1>
					<p className="text-xl text-gray-600 max-w-4xl mx-auto">
						Nous transformons vos idées en solutions numériques performantes et
						sur mesure. Voici comment nous pouvons vous aider à réussir. Cliquez
						sur une carte pour en savoir plus.
					</p>
				</div>

				{/* Grille des Cartes de Services */}
				<section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
					{services.map((service, index) => (
						<ServiceCard
							key={index}
							title={service.title}
							description={service.description}
							icon={service.icon}
							// Passer la fonction de clic
							onClick={() => handleCardClick(service)}
						/>
					))}
				</section>
			</div>

			{/* Intégration de la modale */}
			<Modal
				isOpen={isModalOpen}
				onClose={handleCloseModal}
				service={selectedService}
			/>
		</main>
	);
};

export default ServicesPage;
