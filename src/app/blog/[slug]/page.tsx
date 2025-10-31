import { BlocksRenderer } from "@strapi/blocks-react-renderer";
// CORRECTION : Le type PageProps n'est souvent pas un export direct du module 'next'.
// La solution la plus simple est de décomposer les props.

// 1. DÉFINIR LE TYPE DE PROPS DE VOTRE PAGE
interface ArticlePageProps {
	params: {
		slug: string;
	};
	// Inclure le searchParams pour être pleinement compatible avec le type PageProps standard
	searchParams?: { [key: string]: string | string[] | undefined };
}

// --- Définitions de types pour une meilleure robustesse (comme précédemment) ---
// Note: Assurez-vous que cette structure reflète EXACTEMENT ce que Strapi retourne.
interface StrapiImage {
	url: string;
}

interface ArticleData {
	title: string;
	publishedDate: string;
	content: any;
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
			// J'ai corrigé le populate, assurez-vous qu'il est correct selon votre API
			`${process.env.NEXT_PUBLIC_API_URL}/api/articles?filters[slug][$eq]=${slug}&populate=coverImage`,
			{ next: { revalidate: 10 } },
		);

		if (!res.ok) throw new Error("Impossible de récupérer l'article");

		const data = await res.json();

		// Retourne les attributs si l'article existe
		return data.data[0] ? data.data[0].attributes : null;
	} catch (error) {
		console.error("Erreur fetch article:", error);
		return null;
	}
}

// 2. UTILISER L'INTERFACE ArticlePageProps DIRECTEMENT
// En général, Next.js est plus tolérant lorsque vous définissez l'interface complète
// (params et searchParams optionnel) que lorsque vous essayez d'importer le type générique.
export default async function ArticlePage({ params }: ArticlePageProps) {
	const { slug } = params;

	if (!slug) return <div>Slug manquant dans l'URL</div>;

	const article = await getArticle(slug);

	if (!article) return <div>Article introuvable pour le slug : {slug}</div>;

	const { title, publishedDate, content, coverImage } = article;

	// L'image de Strapi V4 est dans coverImage.data.attributes.url (à vérifier)
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
						{/* Remarque : utilisez le composant <Image> de Next.js pour l'optimisation */}
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
