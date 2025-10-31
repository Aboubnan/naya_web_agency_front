// src/app/temoignages/page.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Témoignages - Naya Web",
	description:
		"Découvrez ce que nos clients disent de notre travail et de notre agence.",
};

const TestimonialsPage = () => {
	const testimonials = [
		{
			quote:
				"Naya Web a transformé notre site web. La qualité du travail, le respect des délais et la communication ont été exceptionnels. Nous recommandons vivement !",
			author: "Marie Dupont",
			company: "Entreprise Alpha",
		},
		{
			quote:
				"Professionnalisme, écoute et créativité. Le site créé par Naya Web est exactement ce dont nous avions besoin, performant et facile à gérer.",
			author: "Jean-Pierre Martin",
			company: "Projets Innovants",
		},
		{
			quote:
				"Un accompagnement sur mesure du début à la fin. Les conseils techniques ont été précieux et le résultat final est bien au-delà de nos attentes.",
			author: "Sophie Bernard",
			company: "Concept Design",
		},
	];

	return (
		<section className="py-16">
			<div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-center  bg-gray-100 py-10">
				<div className="md:w-1/2 text-center md:text-left">
					<h1 className="text-center text-5xl md:text-4xl font-extrabold text-gray-800 leading-tight mb-4">
						Témoignages de nos clients
					</h1>
					<p className="text-xl md:text-1xl text-gray-600 max-w-4xl mx-auto md:mx-0 mb-8">
						La satisfaction de nos clients est notre plus grande fierté.
					</p>
				</div>
			</div>
			<div className="container mx-auto px-4 max-w-4xl mt-20">
				<div className="space-y-8">
					{testimonials.map((testimonial, index) => (
						<div key={index} className="bg-white p-8 rounded-lg shadow-lg">
							<blockquote className="text-xl text-gray-700 italic mb-4">
								"{testimonial.quote}"
							</blockquote>
							<p className="text-lg font-bold text-gray-800">
								{testimonial.author}
							</p>
							<p className="text-md text-gray-500">{testimonial.company}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default TestimonialsPage;
