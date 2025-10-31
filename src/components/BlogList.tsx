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
	category: string;
};

type BlogListProps = {
	articles: Article[];
};

export default function BlogList({ articles }: BlogListProps) {
	const [searchTerm, setSearchTerm] = useState("");
	const [filterCategory, setFilterCategory] = useState("");

	// Tri, filtrage et recherche combinés
	const filteredArticles = useMemo(() => {
		return [...articles] // on clone pour éviter de modifier la prop
			.sort((a, b) => {
				const dateA = a.publishedDate ? new Date(a.publishedDate).getTime() : 0;
				const dateB = b.publishedDate ? new Date(b.publishedDate).getTime() : 0;
				return dateB - dateA; // du plus récent au plus ancien
			})
			.filter((article) => {
				const matchesCategory = filterCategory
					? article.category.toLowerCase() === filterCategory.toLowerCase()
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
						({ id, slug, title, publishedDate, excerpt }) => (
							<Link href={`/blog/${slug}`} key={id}>
								<div className="block h-full bg-white shadow-lg rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl">
									<div className="p-6">
										<h2 className="text-xl font-semibold text-gray-800 mb-2 text-center">
											{title}
										</h2>
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
