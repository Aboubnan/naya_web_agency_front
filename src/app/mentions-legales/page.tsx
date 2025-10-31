// src/app/mentions-legales/page.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Mentions Légales - Naya Web",
	description: "Informations légales de l'entreprise Naya Web.",
};

const MentionsLegalesPage = () => {
	return (
		<section className="py-16 bg-gray-100">
			<div className="container mx-auto px-4 max-w-4xl">
				<h1 className="text-5xl font-bold text-center text-gray-800 mb-4">
					Mentions Légales
				</h1>
				<p className="text-xl text-center text-gray-600 mb-12">
					Conformément aux dispositions de la loi n° 2004-575 du 21 juin 2004
					pour la confiance en l'économie numérique.
				</p>

				<div className="bg-white p-8 rounded-lg shadow-lg space-y-6">
					<div className="space-y-2">
						<h2 className="text-2xl font-bold text-gray-800">
							1. Informations sur l'entreprise
						</h2>
						<p>
							<strong>Nom de l'entreprise :</strong> Naya web
						</p>
						<p>
							<strong>Forme juridique :</strong> EI
						</p>
						<p>
							<strong>Adresse du siège social :</strong> Vernouillet 28500
						</p>
						<p>
							<strong>Capital social :</strong> Non concerné
						</p>
						<p>
							<strong>Numéro SIRET :</strong> 943209668 00012
						</p>
						<p>
							<strong>E-mail :</strong> a.boubnan.dev@outlook.com
						</p>
					</div>

					<hr className="border-gray-300" />

					<div className="space-y-2">
						<h2 className="text-2xl font-bold text-gray-800">
							2. Directeur de la publication
						</h2>
						<p>
							<strong>Nom du Directeur :</strong> Boubnan Abderrehman
						</p>
					</div>

					<hr className="border-gray-300" />

					<div className="space-y-2">
						<h2 className="text-2xl font-bold text-gray-800">
							3. Hébergement du site
						</h2>
						<p>
							<strong>Nom de l'hébergeur :</strong> OVHcloud
						</p>
						<p>
							<strong>Adresse de l'hébergeur :</strong> 2 Rue Kellermann, 59100
							Roubaix, France
						</p>
					</div>

					<hr className="border-gray-300" />

					<div className="space-y-2">
						<h2 className="text-2xl font-bold text-gray-800">
							4. Propriété intellectuelle
						</h2>
						<p>
							L'intégralité du site est la propriété exclusive de Naya web.
							Aucune reproduction ou représentation, même partielle, ne peut
							être faite sans le consentement écrit et préalable de [Ton nom
							d'entreprise].
						</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default MentionsLegalesPage;
