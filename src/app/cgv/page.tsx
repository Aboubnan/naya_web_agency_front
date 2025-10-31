// src/app/cgv/page.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Conditions Générales de Vente - Naya Web",
	description:
		"Conditions Générales de Vente de l'agence Naya Web pour la vente de services web.",
};

const CgvPage = () => {
	return (
		<section className="py-16 bg-gray-100">
			<div className="container mx-auto px-4 max-w-4xl">
				<h1 className="text-5xl font-bold text-center text-gray-800 mb-4">
					Conditions Générales de Vente
				</h1>
				<p className="text-xl text-center text-gray-600 mb-12">
					Applicables à l'ensemble des prestations de services proposées par
					Naya web.
				</p>

				<div className="bg-white p-8 rounded-lg shadow-lg space-y-6">
					<div className="space-y-2">
						<h2 className="text-2xl font-bold text-gray-800">
							Article 1 : Objet et champ d'application
						</h2>
						<p>
							Les présentes Conditions Générales de Vente (CGV) ont pour objet
							de définir les conditions dans lesquelles Naya web fournit des
							prestations de création de sites web et de services digitaux à ses
							clients.
						</p>
					</div>

					<hr className="border-gray-300" />

					<div className="space-y-2">
						<h2 className="text-2xl font-bold text-gray-800">
							Article 2 : Devis et commandes
						</h2>
						<p>
							Toute commande de prestations doit être formalisée par un devis
							signé par le client. Le devis a une durée de validité de 30 jours
							à compter de son émission.
						</p>
					</div>

					<hr className="border-gray-300" />

					<div className="space-y-2">
						<h2 className="text-2xl font-bold text-gray-800">
							Article 3 : Prix et modalités de paiement
						</h2>
						<p>
							Les prix des prestations sont ceux figurant sur le devis. Les
							paiements s'effectuent par virement bancaire. Un acompte de 30%
							peut être demandé à la signature du devis.
						</p>
					</div>

					<hr className="border-gray-300" />

					<div className="space-y-2">
						<h2 className="text-2xl font-bold text-gray-800">
							Article 4 : Délais de réalisation
						</h2>
						<p>
							Naya web s'engage à tout mettre en œuvre pour respecter les délais
							convenus. Cependant, tout retard de la part du client (fourniture
							de contenu, validation, etc.) peut entraîner un report des délais.
						</p>
					</div>

					<hr className="border-gray-300" />

					<div className="space-y-2">
						<h2 className="text-2xl font-bold text-gray-800">
							Article 5 : Propriété intellectuelle
						</h2>
						<p>
							Sauf mention contraire, Naya web conserve les droits de propriété
							intellectuelle sur les éléments graphiques et le code source du
							projet jusqu'au paiement intégral de la prestation.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default CgvPage;
