import { notFound } from "next/navigation";
import { Metadata, PageProps } from "next";

interface ArticleData {
	id: number;
	slug: string;
	title: string;
	createdAt: string;
	content: string;
}

export async function generateMetadata({
	params,
}: PageProps<{ slug: string }>): Promise<Metadata> {
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

export async function generateStaticParams() {
	const apiUrl = process.env.NEXT_PUBLIC_API_URL;
	if (!apiUrl) throw new Error("NEXT_PUBLIC_API_URL n'est pas définie.");

	const res = await fetch(`${apiUrl}/api/articles`, {
		next: { revalidate: 3600 },
	});

	if (!res.ok) return [];

	const data: ArticleData[] = await res.json();

	return data.map((item) => ({
		slug: item.slug,
	}));
}

async function getArticle(slug: string): Promise<ArticleData | null> {
	const apiUrl = process.env.NEXT_PUBLIC_API_URL;
	if (!apiUrl) throw new Error("NEXT_PUBLIC_API_URL n'est pas définie.");

	const res = await fetch(`${apiUrl}/api/articles/slug/${slug}`, {
		next: { revalidate: 10 },
	});

	if (!res.ok) return null;

	return (await res.json()) as ArticleData;
}

export default async function ArticlePage({
	params,
}: PageProps<{ slug: string }>) {
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
