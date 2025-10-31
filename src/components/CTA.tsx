// components/CTA.tsx
import Link from "next/link";

const CTA = () => {
	return (
		<section className="bg-blue-600 text-white py-20 text-center">
			<div className="container mx-auto px-4">
				<h2 className="text-4xl md:text-5xl font-extrabold mb-4">
					Prêt à démarrer votre projet ?
				</h2>
				<p className="text-xl max-w-3xl mx-auto mb-8">
					Contactez-nous pour échanger sur vos besoins et obtenir un devis
					gratuit et personnalisé.
				</p>
				<Link
					href="/contact"
					className="bg-white text-blue-600 py-3 px-8 rounded-full font-bold text-lg hover:bg-gray-100 transition duration-300"
				>
					Demander un devis
				</Link>
			</div>
		</section>
	);
};

export default CTA;
