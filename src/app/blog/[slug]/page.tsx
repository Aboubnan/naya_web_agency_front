import { BlocksRenderer } from "@strapi/blocks-react-renderer";
// CORRECTION CLÉ : Import de PageProps depuis 'next/types' (ou 'next')
import { type PageProps } from "next/types";
import Image from "next/image"; // Import pour la bonne pratique

// --- Définitions de types ---

type ArticlePageParams = {
	slug: string;
};

interface StrapiImageAttributes {
	url: string;
	width: number;
	height: number;
}

interface StrapiCoverImage {
	data: {
		attributes: StrapiImageAttributes;
	} | null;
}

interface ArticleData {
	title: string;
	publishedDate: string;
	content: any;
	coverImage: StrapiCoverImage | null;
}
// ----------------------------

async function getArticle(slug: string): Promise<ArticleData | null> {
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/api/articles?filters[slug][$eq]=${slug}&populate=coverImage`,
			{ next: { revalidate: 10 } },
		);

		if (!res.ok) throw new Error("Impossible de récupérer l'article");

		const data = await res.json();

		// Accès aux attributs Strapi
		return data.data[0] ? (data.data[0].attributes as ArticleData) : null;
	} catch (error) {
		console.error("Erreur fetch article:", error);
		return null;
	}
}

export default async function ArticlePage({
	params,
}: PageProps<ArticlePageParams>) {
	const { slug } = params;

	if (!slug) return <div>Slug manquant dans l'URL</div>;

	const article = await getArticle(slug);

	if (!article) return <div>Article introuvable pour le slug : {slug}</div>;

	const { title, publishedDate, content, coverImage } = article;

	const imageAttrs = coverImage?.data?.attributes;

	const imageUrl = imageAttrs?.url
		? imageAttrs.url.startsWith("http")
			? imageAttrs.url
			: `${process.env.NEXT_PUBLIC_API_URL}${imageAttrs.url}`
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

				{imageUrl && imageAttrs && (
					<div className="flex justify-center mb-8">
						<Image
							src={imageUrl}
							alt={title}
							width={imageAttrs.width || 800}
							height={imageAttrs.height || 400}
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
