// src/app/portfolio/PortfolioClient.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Loader2 } from "lucide-react"; // Ajout pour le chargement

const API_BASE_URL =
	process.env.NEXT_PUBLIC_API_URL || "http://37.59.98.118:3001";
const API_ENDPOINT = `${API_BASE_URL}/api/v1/projects`;

// 🛑 CORRECTION 1 : L'interface est alignée sur la structure plate réelle de l'API
interface Project {
	id: number;
	title: string;
	slug: string; // Ajout du slug (nécessaire pour le Link)
	description: string;
	shortDescription?: string;
	url: string;
	imageUrl?: string; // <-- Propriété réelle de l'API
	imageAlt?: string; // Ajout pour l'accessibilité
	// L'ancienne structure imbriquée a été retirée
}

const PortfolioPage = () => {
	const [projects, setProjects] = useState<Project[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchProjects = async () => {
			try {
				const apiUrl = process.env.NEXT_PUBLIC_API_URL;
				if (!apiUrl) throw new Error("NEXT_PUBLIC_API_URL non défini.");

				const response = await fetch(API_ENDPOINT);

				if (!response.ok) {
					throw new Error("La récupération des projets a échoué");
				}

				const json = await response.json();

				// 🛑 CORRECTION 2 : Utiliser la logique flexible et correcte pour récupérer le tableau
				const projectArray: Project[] = Array.isArray(json)
					? json
					: json.projects || json.data || [];

				if (Array.isArray(projectArray)) {
					setProjects(projectArray);
				} else {
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
			<section className="py-20 bg-gray-100 flex items-center justify-center">
				<Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
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
					<div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
						{projects.map((project) => {
							// 🛑 CORRECTION 3 : Utiliser la propriété plate project.imageUrl
							const imageUrl = project.imageUrl;
							let fullImageUrl: string;

							if (imageUrl) {
								if (imageUrl.startsWith("http")) {
									fullImageUrl = imageUrl;
								} else {
									fullImageUrl = `${API_BASE_URL}${imageUrl}`;
								}
							} else {
								// Fallback / Placeholder pour éviter de retourner null
								fullImageUrl = `https://placehold.co/600x400/94a3b8/000000?text=${project.title.replace(/\s/g, "+")}`;
							}

							const imageAltText = project.imageAlt || project.title;

							return (
								<Link
									key={project.id}
									// 🛑 Assurez-vous que le projet a un slug
									href={`/portfolio/${project.slug || project.id}`}
									className="bg-gray-50 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 group block"
								>
									<div className="md:flex h-full">
										<div className="relative w-full md:w-2/5 h-64 md:h-auto flex-shrink-0">
											<Image
												src={fullImageUrl}
												alt={imageAltText}
												fill
												sizes="(max-width: 768px) 100vw, 33vw"
												className="object-cover transition-opacity duration-500 ease-in-out group-hover:opacity-90"
												unoptimized
											/>
										</div>
										<div className="p-6">
											<h3 className="text-2xl font-bold text-gray-800 mb-2">
												{project.title}
											</h3>
											<p className="text-gray-600">
												{project.shortDescription || project.description}
											</p>
										</div>
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
