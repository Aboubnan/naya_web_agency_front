// app/blog/page.tsx
import BlogList from "@/components/BlogList";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Blog - Naya Web",
	description:
		"Découvrez nos articles et conseils sur le développement web et la transformation digitale.",
};

async function getArticles() {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/api/articles?populate=*`,
		{
			next: { revalidate: 10 },
		},
	);

	if (!res.ok) throw new Error("Erreur récupération articles");

	const data = await res.json();
	return data.data;
}

export default async function BlogPage() {
	const articles = await getArticles();

	return (
		<>
			<div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-center mt-20 mb-20  bg-gray-100 py-10">
				<div className="md:w-1/2 text-center md:text-left ">
					<h1 className="text-center text-5xl md:text-4xl font-extrabold text-gray-800 leading-tight mb-4">
						Notre Blog
					</h1>
					<p className="text-xl md:text-1xl text-gray-600 max-w-4xl mx-auto md:mx-0 mb-8">
						Dernières tendances, conseils d'experts et tout ce qu'il faut savoir
						sur le développement, le design et le marketing digital pour
						optimiser votre présence en ligne
					</p>
				</div>
			</div>
			<section className="container mx-auto px-4 py-16 max-w-5xl">
				<BlogList articles={articles} />
			</section>
		</>
	);
}
