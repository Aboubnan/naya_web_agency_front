// src/app/blog/page.tsx
import BlogList from "@/components/BlogList";
import { Metadata } from "next";

// --- Définition du type Article ---
interface Article {
	id: number;
	title: string;
	content: string;
	createdAt: string;
	slug: string;
}

// ----------------------------------------------------
// Fonction pour récupérer tous les articles depuis l'API
async function getArticles(): Promise<Article[]> {
	const apiUrl = process.env.NEXT_PUBLIC_API_URL;
	if (!apiUrl) throw new Error("NEXT_PUBLIC_API_URL n'est pas définie.");

	try {
		const res = await fetch(`${apiUrl}/api/articles`, {
			next: { revalidate: 3600 },
		});

		if (!res.ok) {
			console.error("Erreur récupération articles:", res.status);
			return [];
		}

		const data = await res.json();

		if (!Array.isArray(data)) return [];

		// Uniformisation des champs
		return data.map((item: any) => ({
			id: item.id,
			title: item.title,
			content: item.content,
			createdAt: item.createdAt,
			slug: item.slug,
		}));
	} catch (error) {
		console.error("Erreur fetch articles:", error);
		return [];
	}
}

// ----------------------------------------------------
// Métadonnées de la page blog
export const metadata: Metadata = {
	title: "Blog - Naya Web",
	description:
		"Découvrez nos articles et conseils sur le développement web et la transformation digitale.",
};

// ----------------------------------------------------
// Composant de la page blog
export default async function BlogPage() {
	const articles = await getArticles();

	if (articles.length === 0) {
		return (
			<section className="container mx-auto px-4 py-16 max-w-5xl text-center">
				<h2 className="text-3xl font-bold text-gray-700">
					Aucun article n'a été publié pour le moment.
				</h2>
			</section>
		);
	}

	return (
		<>
			<div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-center mt-20 mb-20 bg-gray-100 py-10">
				<div className="md:w-1/2 text-center md:text-left">
					<h1 className="text-center text-5xl md:text-4xl font-extrabold text-gray-800 leading-tight mb-4">
						Notre Blog
					</h1>
					<p className="text-xl md:text-1xl text-gray-600 max-w-4xl mx-auto md:mx-0 mb-8">
						Dernières tendances, conseils d'experts et tout ce qu'il faut savoir
						sur le développement, le design et le marketing digital pour
						optimiser votre présence en ligne.
					</p>
				</div>
			</div>

			<section className="container mx-auto px-4 py-16 max-w-5xl">
				<BlogList articles={articles} />
			</section>
		</>
	);
}
