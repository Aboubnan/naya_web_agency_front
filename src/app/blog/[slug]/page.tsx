import { notFound } from "next/navigation";
import { Metadata } from "next";

// --- DÉFINITION DES TYPES ---

// Interface pour les données d'un article reçues de l'API
interface ArticleData {
	id: number;
	slug: string;
	title: string;
	createdAt: string;
	content: string;
}

// ----------------------------------------------------
// Fonction pour récupérer un article par slug
// ----------------------------------------------------
async function getArticle(slug: string): Promise<ArticleData | null> {
	try {
		const apiUrl = process.env.NEXT_PUBLIC_API_URL;
		if (!apiUrl) throw new Error("NEXT_PUBLIC_API_URL n'est pas définie.");

		// Assurez-vous que le chemin de l'API est correct pour récupérer par slug
		const res = await fetch(`${apiUrl}/api/articles/slug/${slug}`, {
			next: { revalidate: 10 },
		});

		if (!res.ok) {
			console.error(`Erreur API pour slug ${slug}: ${res.status}`);
			return null;
		}

		const data = await res.json();
		return data as ArticleData;
	} catch (error) {
		console.error("Erreur fetch article:", error);
		return null;
	}
}

// ----------------------------------------------------
// Génération des routes statiques pour le SSG
// ----------------------------------------------------
export async function generateStaticParams() {
	const apiUrl = process.env.NEXT_PUBLIC_API_URL;
	if (!apiUrl) return [];

	try {
		const res = await fetch(`${apiUrl}/api/articles`, {
			next: { revalidate: 3600 },
		});

		if (!res.ok) return [];

		const data: ArticleData[] = await res.json();
		if (!Array.isArray(data)) return [];

		return data.map((item) => ({ slug: item.slug }));
	} catch (error) {
		console.error("Erreur generateStaticParams:", error);
		return [];
	}
}

// ----------------------------------------------------
// Génération des métadonnées dynamiques
// ----------------------------------------------------
// Typage correct pour satisfaire le compilateur TypeScript
export async function generateMetadata({
	params,
}: { params: { slug: string } }): Promise<Metadata> {
	// 🚨 Ligne corrigée
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

// ----------------------------------------------------
// Composant de la page article
// ----------------------------------------------------
// Typage correct pour satisfaire le compilateur TypeScript
export default async function ArticlePage({
	params,
}: { params: { slug: string } }) {
	// 🚨 Ligne corrigée
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
