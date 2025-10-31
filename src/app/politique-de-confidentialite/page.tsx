// src/app/politique-de-confidentialite/page.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Politique de Confidentialité - Naya Web",
	description:
		"Politique de confidentialité de l'agence Naya Web, conforme au RGPD.",
};

const PrivacyPolicyPage = () => {
	return (
		<section className="py-16 bg-gray-100">
			<div className="container mx-auto px-4 max-w-4xl">
				<h1 className="text-5xl font-bold text-center text-gray-800 mb-4">
					Politique de Confidentialité
				</h1>
				<p className="text-xl text-center text-gray-600 mb-12">
					Nous vous informons sur la manière dont nous collectons et traitons
					vos données personnelles.
				</p>

				<div className="bg-white p-8 rounded-lg shadow-lg space-y-6">
					<div className="space-y-2">
						<h2 className="text-2xl font-bold text-gray-800">
							1. Collecte des données personnelles
						</h2>
						<p>
							Nous collectons les données suivantes lorsque vous utilisez notre
							formulaire de contact :
							<ul>
								<li>Nom et prénom</li>
								<li>Adresse e-mail</li>
								<li>Message</li>
							</ul>
						</p>
					</div>

					<hr className="border-gray-300" />

					<div className="space-y-2">
						<h2 className="text-2xl font-bold text-gray-800">
							2. Finalité de la collecte
						</h2>
						<p>
							Les données que nous collectons sont utilisées exclusivement pour
							répondre à vos demandes de contact et vous recontacter dans le
							cadre de nos services. Elles ne sont pas utilisées à des fins de
							marketing sans votre consentement explicite.
						</p>
					</div>

					<hr className="border-gray-300" />

					<div className="space-y-2">
						<h2 className="text-2xl font-bold text-gray-800">
							3. Durée de conservation
						</h2>
						<p>
							Vos données sont conservées pendant la durée nécessaire à
							l'accomplissement des finalités pour lesquelles elles ont été
							collectées, soit 12 mois, et sont ensuite supprimées de manière
							sécurisée.
						</p>
					</div>

					<hr className="border-gray-300" />

					<div className="space-y-2">
						<h2 className="text-2xl font-bold text-gray-800">
							4. Droits des utilisateurs
						</h2>
						<p>
							Conformément au RGPD, vous disposez des droits suivants concernant
							vos données :
							<ul>
								<li>Droit d'accès et de rectification</li>
								<li>Droit à l'effacement ("droit à l'oubli")</li>
								<li>Droit de s'opposer au traitement</li>
							</ul>
							Pour exercer vos droits, vous pouvez nous contacter à l'adresse
							e-mail suivante : a.boubnan.dev@outlook.com
						</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default PrivacyPolicyPage;
