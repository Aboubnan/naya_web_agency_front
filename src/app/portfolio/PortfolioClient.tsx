// src/app/portfolio/PortfolioClient.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

// Interface pour typer les projets reçus par votre API Node.js/Sequelize
interface Project {
	id: number;
	title: string;
	description: string;
	url: string; // Lien vers le projet externe
	image?: {
		url: string; // URL complète de l'image (si hébergée sur la même API)
	};
	// Vous pouvez ajuster cette structure si votre modèle Sequelize est différent
}

const PortfolioPage = () => {
	const [projects, setProjects] = useState<Project[]>([]); // Utiliser l'interface
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchProjects = async () => {
			try {
				const apiUrl = process.env.NEXT_PUBLIC_API_URL;
				if (!apiUrl) throw new Error("NEXT_PUBLIC_API_URL non défini.");

				// 💡 CORRECTION 1 & 2 : Utiliser la variable d'environnement et l'endpoint standard
				const response = await fetch(`${apiUrl}/api/projects`);

				if (!response.ok) {
					throw new Error("La récupération des projets a échoué");
				}

				const data: Project[] = await response.json();

				// 💡 CORRECTION 3 : L'API Node.js/Sequelize renvoie directement le tableau (data)
				if (Array.isArray(data)) {
					setProjects(data);
				} else {
					// Gérer le cas où la réponse n'est pas un tableau (e.g., si c'est une pagination)
					setProjects([]);
					console.warn("L'API n'a pas renvoyé un tableau de projets.");
				}
			} catch (error) {
				console.error("Erreur lors de la récupération des projets", error);
			} finally {
				setIsLoading(false);
			}
		};
		fetchProjects();
	}, []);

	if (isLoading) {
		return (
			<section className="py-20 bg-gray-100 text-center">
				<p className="text-xl text-gray-600">Chargement du portfolio...</p>
			</section>
		);
	}

	return (
		<section className="py-16">
			<div className="container mx-auto px-4">
				<div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-center bg-gray-100 py-10">
					<div className="md:w-1/2 text-center md:text-left">
						<h1 className="text-center text-5xl md:text-4xl font-extrabold text-gray-800 leading-tight mb-4">
							Notre Portfolio
						</h1>
						<p className="text-xl md:text-1xl text-gray-600 max-w-4xl mx-auto md:mx-0 mb-8">
							Découvrez l'étendue de notre expertise à travers nos plus beaux
							projets, conçus pour l'innovation et la performance.
						</p>
					</div>
				</div>

				{projects.length > 0 ? (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">
						{projects.map((project: Project) => {
							// 💡 CORRECTION 4 : Simplification de l'accès à l'URL de l'image
							// On suppose que l'API renvoie l'URL complète directement dans project.image.url
							const imageUrl = project.image?.url;
							const projectUrl = project.url;

							if (!imageUrl) {
								return null;
							}

							return (
								<Link
									key={project.id}
									href={projectUrl || "#"}
									target="_blank"
									rel="noopener noreferrer"
									className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 block h-full"
								>
									<div className="relative w-full h-64">
										<Image
											// 💡 CORRECTION 5 : Utilisation directe de l'URL (plus besoin de http://localhost:1337)
											src={imageUrl}
											alt={project.title}
											fill
											className="object-cover"
										/>
									</div>
									<div className="p-6">
										<h3 className="text-2xl font-bold text-gray-800 mb-2">
											{project.title}
										</h3>
										<p className="text-gray-600">{project.description}</p>
									</div>
								</Link>
							);
						})}
					</div>
				) : (
					<p className="text-center text-gray-600">Aucun projet trouvé.</p>
				)}
			</div>
		</section>
	);
};

export default PortfolioPage;
