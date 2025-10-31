import { BlocksRenderer } from "@strapi/blocks-react-renderer";

type ArticlePageProps = {
	params: {
		slug: string;
	};
};

async function getArticle(slug: string) {
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/api/articles?filters[slug][$eq]=${slug}&populate=*`,
			{ next: { revalidate: 10 } },
		);

		if (!res.ok) throw new Error("Impossible de récupérer l'article");

		const data = await res.json();
		return data.data[0] || null;
	} catch (error) {
		console.error("Erreur fetch article:", error);
		return null;
	}
}

export default async function ArticlePage({ params }: ArticlePageProps) {
	const { slug } = params; // ✅ pas de Promise ici

	if (!slug) return <div>Slug manquant dans l'URL</div>;

	const article = await getArticle(slug);

	if (!article) return <div>Article introuvable pour le slug : {slug}</div>;

	const { title, publishedDate, content, coverImage } = article;

	const imageUrl = coverImage?.url
		? coverImage.url.startsWith("http")
			? coverImage.url
			: `${process.env.NEXT_PUBLIC_API_URL}${coverImage.url}`
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
