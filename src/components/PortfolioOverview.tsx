// src/components/PortfolioOverview.tsx
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const PortfolioOverview = () => {
	const [projects, setProjects] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchProjects = async () => {
			try {
				// Modification de l'URL pour limiter l'affichage à deux projets
				const response = await fetch(
					"http://localhost:1337/api/projects?populate=*&pagination[limit]=2",
				);
				if (!response.ok) {
					throw new Error("La récupération des projets a échoué");
				}
				const data = await response.json();
				setProjects(data.data);
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
				<p className="text-xl text-gray-600">Chargement des projets...</p>
			</section>
		);
	}

	return (
		<section className="py-20 bg-gray-100">
			<div className="container mx-auto px-4 text-center">
				<h2 className="text-4xl font-bold text-gray-800 mb-4">
					Quelques-unes de nos réalisations
				</h2>
				<p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
					Découvrez notre expertise à travers des projets concrets.
				</p>

				{projects.length > 0 ? (
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
						{projects.map((project: any) => {
							// On sécurise l'accès à l'URL de l'image
							// On vérifie le chemin d'accès le plus courant de Strapi v4
							const imageUrl =
								project.image?.data?.attributes?.url || project.image?.url;
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
											src={`http://localhost:1337${imageUrl}`}
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
					<p>Aucun projet trouvé.</p>
				)}
				<Link
					href="/portfolio"
					className="bg-blue-600 text-white py-3 px-8 rounded-full font-bold text-lg hover:bg-blue-700 transition duration-300 mt-12 inline-block"
				>
					Voir tout notre portfolio
				</Link>
			</div>
		</section>
	);
};

export default PortfolioOverview;
