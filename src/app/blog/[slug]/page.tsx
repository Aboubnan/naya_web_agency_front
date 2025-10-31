import { BlocksRenderer } from "@strapi/blocks-react-renderer";
// 1. IMPORTER LE TYPE PageProps depuis 'next'
import { type PageProps } from "next";

// --- Définitions de types pour une meilleure robustesse ---

// 2. Définir l'interface pour les paramètres (params) de la page dynamique
type ArticlePageParams = {
	slug: string;
};

// (Optionnel) Définir les types des données Strapi (à ajuster selon votre schéma réel)
interface StrapiImage {
	url: string;
}

interface ArticleData {
	title: string;
	publishedDate: string;
	content: any; // Type exact de BlocksRenderer. Si c'est JSON, laissez 'any' ou ajustez.
	coverImage: {
		data: {
			attributes: StrapiImage;
		};
	} | null;
}

// -----------------------------------------------------------

async function getArticle(slug: string): Promise<ArticleData | null> {
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/api/articles?filters[slug][$eq]=${slug}&populate=coverImage`, // populate le coverImage pour le data.data[0].attributes
			{ next: { revalidate: 10 } },
		);

		if (!res.ok) throw new Error("Impossible de récupérer l'article");

		const data = await res.json();

		// 🚨 IMPORTANT : Les données Strapi sont souvent dans data.data[0].attributes
		// Assurez-vous d'accéder au bon chemin. Si votre article est plat, continuez.
		// Si vous utilisez la structure API V4 de Strapi, l'article réel est dans .attributes
		return data.data[0] ? data.data[0].attributes : null;
	} catch (error) {
		console.error("Erreur fetch article:", error);
		return null;
	}
}

// 3. UTILISER PageProps pour typer le composant de page
// PageProps prend un type générique pour la structure des 'params'
export default async function ArticlePage({
	params,
}: PageProps<ArticlePageParams>) {
	// Le code à l'intérieur du composant est correct.
	const { slug } = params;

	if (!slug) return <div>Slug manquant dans l'URL</div>;

	const article = await getArticle(slug);

	if (!article) return <div>Article introuvable pour le slug : {slug}</div>;

	// Déstructuration : on utilise les types ArticleData définis ci-dessus
	const { title, publishedDate, content, coverImage } = article;

	// L'image de Strapi V4 est dans coverImage.data.attributes.url
	const imageUrl = coverImage?.data?.attributes?.url
		? coverImage.data.attributes.url.startsWith("http")
			? coverImage.data.attributes.url
			: `${process.env.NEXT_PUBLIC_API_URL}${coverImage.data.attributes.url}`
		: null;

	return (
		<section className="py-16 bg-gray-100">
			<div className="container mx-auto px-4 max-w-5xl">
				<h1 className="text-5xl font-bold text-center text-gray-800 mb-12">
					{title}
				</h1>

				{publishedDate ? (
					<p className="text-center mb-8 text-gray-600">
						Publié le : {new Date(publishedDate).toLocaleDateString()}
					</p>
				) : (
					<p className="text-center mb-8 text-gray-600">
						Date de publication non disponible
					</p>
				)}

				{imageUrl && (
					<div className="flex justify-center mb-8">
						{/* ⚠️ Attention : L'utilisation de l'élément <img> directement 
                           est déconseillée dans Next.js. Utilisez le composant <Image> de 'next/image'. */}
						<img
							src={imageUrl}
							alt={title}
							width={800}
							height={400}
							className="object-cover rounded mb-8"
						/>
					</div>
				)}

				<div className="prose max-w-none">
					<BlocksRenderer content={content} />
				</div>
			</div>
		</section>
	);
}
