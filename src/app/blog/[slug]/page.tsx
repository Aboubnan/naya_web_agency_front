// src/app/blog/[slug]/page.tsx

import { notFound } from "next/navigation";
import { Metadata } from "next";

// --- Types pour Sequelize ---
interface ArticleData {
	id: number;
	slug: string;
	title: string;
	createdAt: string;
	content: string;
}

// ----------------------------
// Fonction pour générer les métadonnées dynamiques
export async function generateMetadata({
	params,
}: { params: { slug: string } }): Promise<Metadata> {
	const article = await getArticle(params.slug);

	if (!article) {
		return {
			title: "Article non trouvé",
			description: "Cet article n'existe plus ou n'a jamais existé.",
		};
	}

	return {
		title: article.title,
		description: article.content.substring(0, 150) + "...",
	};
}

// ----------------------------
// Récupération des slugs pour build statique
export async function generateStaticParams() {
	try {
		const apiUrl = process.env.NEXT_PUBLIC_API_URL;
		if (!apiUrl) throw new Error("NEXT_PUBLIC_API_URL n'est pas définie.");

		const res = await fetch(`${apiUrl}/api/articles`, {
			next: { revalidate: 3600 },
		});

		if (!res.ok) {
			console.error("Erreur de récupération des slugs:", res.status);
			return [];
		}

		const data: ArticleData[] = await res.json();

		if (!Array.isArray(data)) return [];

		return data.map((item) => ({
			slug: item.slug,
		}));
	} catch (error) {
		console.error("Erreur dans generateStaticParams:", error);
		return [];
	}
}

// ----------------------------
// Récupération d'un article par SLUG
async function getArticle(slug: string): Promise<ArticleData | null> {
	try {
		const apiUrl = process.env.NEXT_PUBLIC_API_URL;
		if (!apiUrl) throw new Error("NEXT_PUBLIC_API_URL n'est pas définie.");

		const res = await fetch(`${apiUrl}/api/articles/slug/${slug}`, {
			next: { revalidate: 10 },
		});

		if (!res.ok) return null;

		const data = await res.json();
		return data as ArticleData;
	} catch (error) {
		console.error("Erreur fetch article:", error);
		return null;
	}
}

// ----------------------------
// Composant principal
export default async function ArticlePage({
	params,
}: { params: { slug: string } }) {
	const { slug } = params;

	if (!slug) notFound();

	const article = await getArticle(slug);
	if (!article) notFound();

	const { title, createdAt, content } = article;

	return (
		<section className="py-16 bg-gray-100">
			<div className="container mx-auto px-4 max-w-5xl">
				<h1 className="text-5xl font-bold text-center text-gray-800 mb-12">
					{title}
				</h1>

				{createdAt && (
					<p className="text-center mb-8 text-gray-600">
						Publié le : {new Date(createdAt).toLocaleDateString("fr-FR")}
					</p>
				)}

				<div className="bg-white p-8 rounded-lg shadow-xl">
					<div className="prose max-w-none">
						<div dangerouslySetInnerHTML={{ __html: content }} />
					</div>
				</div>
			</div>
		</section>
	);
}
