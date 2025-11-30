// src/app/blog/[slug]/page.tsx

import { notFound } from "next/navigation";
import { Metadata } from "next"; // Ajout de Metadata pour la génération dynamique
// Importez les modules nécessaires ici (pas d'Image nécessaire si vous n'affichez pas la cover)

// --- Définitions de types pour Sequelize ---

interface ArticleData {
	id: number;
	slug: string;
	title: string;
	createdAt: string; // 💡 UNIFORMISE : Utiliser 'createdAt' (champ standard de Sequelize)
	content: string;
	// Si votre API supporte une image de couverture, vous devrez ajouter 'coverImage: string;' ou similaire
}

// ----------------------------------------------------
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
		description: article.content.substring(0, 150) + "...", // Utilisation d'un extrait du contenu
	};
}

// REMARQUE : La fonction generateStaticParams DOIT renvoyer un tableau de SLUGs.
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

		// 💡 CONFORME : L'API Node.js renvoie directement le tableau d'articles
		if (!Array.isArray(data)) {
			return [];
		}

		return data.map((item) => ({
			slug: item.slug,
		}));
	} catch (error) {
		console.error("Erreur dans generateStaticParams:", error);
		return [];
	}
}

// ----------------------------
// Fonction de récupération pour un seul article par SLUG
async function getArticle(slug: string): Promise<ArticleData | null> {
	try {
		const apiUrl = process.env.NEXT_PUBLIC_API_URL;
		if (!apiUrl) throw new Error("NEXT_PUBLIC_API_URL n'est pas définie.");

		// 💡 CONFORME : Utilisation de l'endpoint par SLUG
		const res = await fetch(`${apiUrl}/api/articles/slug/${slug}`, {
			next: { revalidate: 10 },
		});

		if (!res.ok) return null;

		const data = await res.json();

		// 💡 CONFORME : La réponse est l'objet article direct
		return data as ArticleData;
	} catch (error) {
		console.error("Erreur fetch article:", error);
		return null;
	}
}

export default async function ArticlePage({
	params,
}: { params: { slug: string } }) {
	const { slug } = params;

	if (!slug) notFound();

	const article = await getArticle(slug);

	if (!article) notFound();

	// 💡 CORRIGÉ : Utilisation de 'createdAt' pour la date
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
						{/* 💡 CORRIGÉ : Utilisation du div wrapper avec dangerouslySetInnerHTML */}
						<div dangerouslySetInnerHTML={{ __html: content }} />
					</div>
				</div>
			</div>
		</section>
	);
}
