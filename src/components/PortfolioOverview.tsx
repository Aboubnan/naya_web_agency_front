"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Loader2, ArrowRight } from "lucide-react";

// Configuration de l'API
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
const API_ENDPOINT = `${API_BASE_URL}/api/v1/projects?pagination[limit]=2`;

// Interface de données (assurez-vous que cela correspond à votre API)
interface Project {
	id: number;
	title: string;
	slug: string;
	shortDescription?: string;
	description?: string;
	image?: {
		// <-- Structure imbriquée attendue
		url: string;
		alt?: string;
	};
	technologies?: string[];
}

// Données de démonstration (Mock Data)
const mockProjects: Project[] = [
	{
		id: 101,
		title: "Plateforme d'Analyse Financière",
		slug: "analyse-financiere",
		description:
			"Développement d'un outil SaaS pour le suivi des marchés boursiers en temps réel, optimisant les stratégies d'investissement.",
		shortDescription:
			"Développement d'un outil SaaS pour le suivi des marchés boursiers.",
		image: {
			url: "https://placehold.co/600x400/10b981/ffffff?text=Financial+App",
			alt: "Plateforme d'analyse financière",
		},
		technologies: ["React", "D3.js", "Python"],
	},
	{
		id: 102,
		title: "Réseau Social pour Animaux",
		slug: "reseau-social-animaux",
		description:
			"Création d'une communauté en ligne complète pour les propriétaires d'animaux, incluant le partage de photos et des conseils vétérinaires.",
		shortDescription:
			"Création d'une communauté en ligne pour les propriétaires d'animaux de compagnie.",
		image: {
			url: "https://placehold.co/600x400/ef4444/ffffff?text=Pet+Social",
			alt: "Réseau social pour animaux",
		},
		technologies: ["Vue.js", "Firebase", "Tailwind CSS"],
	},
];

const PortfolioOverview = () => {
	const [projects, setProjects] = useState<Project[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchProjects = async () => {
			try {
				const response = await fetch(API_ENDPOINT);
				if (!response.ok) throw new Error(`Statut ${response.status}`);

				const json = await response.json();
				const projectArray: Project[] = json.projects || json.data || json;

				if (Array.isArray(projectArray)) {
					setProjects(projectArray);
					setError(null);
				} else {
					throw new Error("Format de réponse API inattendu.");
				}
			} catch (err) {
				console.error("Erreur lors de la récupération des projets:", err);
				setError(
					"Erreur réseau ou API. Affichage des projets de démonstration.",
				);
				// Affichage des projets de démonstration en cas d'échec
				setProjects(mockProjects);
			} finally {
				setIsLoading(false);
			}
		};

		fetchProjects();
	}, []);

	if (isLoading) {
		return (
			<section className="py-20 text-center bg-gray-50 flex items-center justify-center">
				<Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
			</section>
		);
	}

	return (
		<section className="py-16 md:py-24 bg-white">
			<div className="container mx-auto px-4 max-w-7xl">
				<h2 className="text-4xl font-extrabold text-gray-900 text-center mb-4">
					Nos Dernières Réalisations
				</h2>
				<p className="text-xl text-gray-600 text-center mb-12">
					Découvrez un aperçu des projets que nous avons récemment livrés.
				</p>

				{error && (
					<div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-10 rounded-lg max-w-3xl mx-auto">
						<p className="font-bold">Avertissement (Mode Démo) :</p>
						<p className="text-sm">{error}</p>
					</div>
				)}

				{projects.length > 0 ? (
					<div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
						{projects.map((project) => {
							// 🛑 CORRECTION CLÉ : Accès à l'URL via project.image?.url
							const imageUrl = project.image?.url;
							let fullImageUrl: string;

							if (imageUrl) {
								if (imageUrl.startsWith("http")) {
									fullImageUrl = imageUrl;
								} else {
									// Utilisation de la variable API_BASE_URL (définie en haut)
									fullImageUrl = `${API_BASE_URL}${imageUrl}`;
								}
							} else {
								// Fallback/Placeholder
								fullImageUrl = `https://placehold.co/600x400/94a3b8/000000?text=${project.title.replace(/\s/g, "+")}`;
							}

							const imageAltText = project.image?.alt || project.title;

							// Un slug est nécessaire pour la navigation
							if (!project.slug) return null;

							return (
								<Link
									key={project.id}
									href={`/portfolio/${project.slug}`}
									className="bg-gray-50 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 group block"
								>
									<div className="md:flex h-full">
										<div className="relative w-full md:w-2/5 h-64 md:h-auto flex-shrink-0">
											<Image
												src={fullImageUrl} // <-- L'URL est garantie ici
												alt={imageAltText}
												fill
												sizes="(max-width: 768px) 100vw, 33vw"
												className="object-cover transition-opacity duration-500 ease-in-out group-hover:opacity-90"
												unoptimized
											/>
										</div>
										<div className="p-6 md:p-8 flex flex-col justify-between w-full">
											<div>
												<h3 className="text-3xl font-bold text-indigo-600 mb-3 group-hover:text-indigo-700">
													{project.title}
												</h3>
												<p className="text-gray-700 mb-4 line-clamp-3">
													{/* Utiliser shortDescription si description n'est pas disponible */}
													{project.description || project.shortDescription}
												</p>
												{project.technologies &&
													project.technologies.length > 0 && (
														<div className="flex flex-wrap gap-2 mb-4">
															{project.technologies.map((tech, index) => (
																<span
																	key={index}
																	className="px-3 py-1 text-xs font-medium text-gray-700 bg-gray-200 rounded-full"
																>
																	{tech}
																</span>
															))}
														</div>
													)}
											</div>

											<div className="mt-4 flex items-center text-indigo-500 font-semibold group-hover:text-indigo-600">
												<span>Détails du projet</span>
												<ArrowRight className="w-5 h-5 ml-2 transition-transform duration-200 group-hover:translate-x-1" />
											</div>
										</div>
									</div>
								</Link>
							);
						})}
					</div>
				) : (
					<div className="text-center py-10">
						<p className="text-xl text-gray-600">
							Aucun projet récent n'est disponible.
						</p>
					</div>
				)}

				<div className="text-center mt-12">
					<Link
						href="/portfolio"
						className="inline-flex items-center px-10 py-3 text-lg bg-indigo-600 text-white font-bold rounded-full hover:bg-indigo-700 transition-all duration-300 shadow-xl hover:shadow-indigo-500/50"
					>
						Voir tout le Portfolio
						<ArrowRight className="w-5 h-5 ml-3" />
					</Link>
				</div>
			</div>
		</section>
	);
};

export default PortfolioOverview;
