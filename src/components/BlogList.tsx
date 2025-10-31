"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";

type Article = {
	id: string;
	title: string;
	slug: string;
	publishedDate?: string;
	excerpt?: string;
	description?: string;
	category?: string; // 🚨 Rendre la catégorie OPTIONNELLE ici
	// Important : il manquait aussi la coverImage pour la liste !
	// Si vous affichez une image dans BlogList, elle doit être dans le type Article
	coverImage?: {
		id: number;
		url: string;
		// Ajoutez d'autres formats si vous les utilisez
		formats?: {
			small?: { url: string; width: number; height: number };
			medium?: { url: string; width: number; height: number };
			// ...
		};
	};
};

type BlogListProps = {
	articles: Article[];
};

export default function BlogList({ articles }: BlogListProps) {
	const [searchTerm, setSearchTerm] = useState("");
	const [filterCategory, setFilterCategory] = useState("");

	// Tri, filtrage et recherche combinés
	const filteredArticles = useMemo(() => {
		return [...articles]
			.sort((a, b) => {
				const dateA = a.publishedDate ? new Date(a.publishedDate).getTime() : 0;
				const dateB = b.publishedDate ? new Date(b.publishedDate).getTime() : 0;
				return dateB - dateA; // du plus récent au plus ancien
			})
			.filter((article) => {
				// 🚨 CORRECTION ICI : Vérifier si article.category existe
				const articleCategoryLower = article.category?.toLowerCase(); // Utiliser l'opérateur de chaînage optionnel `?.`
				const filterCategoryLower = filterCategory.toLowerCase(); // filterCategory ne sera jamais undefined ici car initialisé à ""

				const matchesCategory = filterCategory
					? articleCategoryLower === filterCategoryLower // Comparer les versions lowercase
					: true;

				const matchesSearch = article.title
					.toLowerCase()
					.includes(searchTerm.toLowerCase());
				return matchesCategory && matchesSearch;
			});
	}, [articles, filterCategory, searchTerm]);

	if (articles.length === 0) return <p>Aucun article disponible.</p>;

	return (
		<div>
			{/* Filtres */}
			<div className="mb-6 flex flex-col md:flex-row gap-4 justify-center">
				{/* Filtre catégorie */}
				<select
					value={filterCategory}
					onChange={(e) => setFilterCategory(e.target.value)}
					className="border rounded px-3 py-2"
				>
					<option value="">Toutes catégories</option>
					<option value="techno">Techno</option>
					<option value="conseil">Conseil</option>
					<option value="astuce">Astuce</option>
				</select>

				{/* Recherche */}
				<input
					type="text"
					placeholder="Recherche en temps réel..."
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className="border rounded px-3 py-2 flex-grow"
				/>
			</div>

			{/* Liste filtrée */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				{filteredArticles.length === 0 ? (
					<p>Aucun article ne correspond aux critères.</p>
				) : (
					filteredArticles.map(
						(
							{ id, slug, title, publishedDate, excerpt, category, coverImage }, // 🚨 Ajoutez category et coverImage si vous les utilisez
						) => (
							<Link href={`/blog/${slug}`} key={id}>
								<div className="block h-full bg-white shadow-lg rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl">
									{/* 🚨 Ajoutez l'affichage de l'image ici si vous en avez une ! */}
									{/* N'oubliez pas l'import de Image de 'next/image' si ce n'est pas déjà fait */}
									{/* Et le NEXT_PUBLIC_API_URL pour les chemins relatifs de Strapi */}
									{coverImage?.url && (
										<div className="relative h-48 w-full">
											<Image
												src={
													coverImage.url.startsWith("http")
														? coverImage.url
														: `${process.env.NEXT_PUBLIC_API_URL}${coverImage.url}`
												}
												alt={title}
												fill // Utilisez fill pour que l'image s'adapte au conteneur
												style={{ objectFit: "cover" }} // 'cover' pour garder le ratio
												sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Optimisation responsive
												className="rounded-t-lg"
											/>
										</div>
									)}

									<div className="p-6">
										<h2 className="text-xl font-semibold text-gray-800 mb-2 text-center">
											{title}
										</h2>
										{/* Affichage de la catégorie si elle existe */}
										{category && (
											<p className="text-sm font-medium text-indigo-600 text-center mb-2">
												{category}
											</p>
										)}
										{publishedDate && (
											<p className="text-gray-500 text-sm text-center">
												{new Date(publishedDate).toLocaleDateString("fr-FR")}
											</p>
										)}
										{excerpt && <p className="mt-4 text-gray-600">{excerpt}</p>}
									</div>
								</div>
							</Link>
						),
					)
				)}
			</div>
		</div>
	);
}
