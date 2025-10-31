"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image"; // 🚨 AJOUTEZ CETTE LIGNE !

type Article = {
	id: string;
	title: string;
	slug: string;
	publishedDate?: string;
	excerpt?: string;
	description?: string;
	category?: string;
	coverImage?: {
		id: number;
		url: string;
		formats?: {
			small?: { url: string; width: number; height: number };
			medium?: { url: string; width: number; height: number };
		};
	};
};

type BlogListProps = {
	articles: Article[];
};

export default function BlogList({ articles }: BlogListProps) {
	const [searchTerm, setSearchTerm] = useState("");
	const [filterCategory, setFilterCategory] = useState("");

	const filteredArticles = useMemo(() => {
		return [...articles]
			.sort((a, b) => {
				const dateA = a.publishedDate ? new Date(a.publishedDate).getTime() : 0;
				const dateB = b.publishedDate ? new Date(b.publishedDate).getTime() : 0;
				return dateB - dateA;
			})
			.filter((article) => {
				const articleCategoryLower = article.category?.toLowerCase();
				const filterCategoryLower = filterCategory.toLowerCase();

				const matchesCategory = filterCategory
					? articleCategoryLower === filterCategoryLower
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
			<div className="mb-6 flex flex-col md:flex-row gap-4 justify-center">
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

				<input
					type="text"
					placeholder="Recherche en temps réel..."
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className="border rounded px-3 py-2 flex-grow"
				/>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				{filteredArticles.length === 0 ? (
					<p>Aucun article ne correspond aux critères.</p>
				) : (
					filteredArticles.map(
						({
							id,
							slug,
							title,
							publishedDate,
							excerpt,
							category,
							coverImage,
						}) => (
							<Link href={`/blog/${slug}`} key={id}>
								<div className="block h-full bg-white shadow-lg rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl">
									{coverImage?.url && (
										<div className="relative h-48 w-full">
											<Image
												src={
													coverImage.url.startsWith("http")
														? coverImage.url
														: `${process.env.NEXT_PUBLIC_API_URL}${coverImage.url}`
												}
												alt={title}
												fill
												style={{ objectFit: "cover" }}
												sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
												className="rounded-t-lg"
											/>
										</div>
									)}

									<div className="p-6">
										<h2 className="text-xl font-semibold text-gray-800 mb-2 text-center">
											{title}
										</h2>
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
