// src/app/a-propos/page.tsx
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
	title: "À propos - Naya Web",
	description:
		"Découvrez notre histoire, notre équipe et nos valeurs chez Naya Web.",
};

const AboutUsPage = () => {
	return (
		<section className="py-16">
			<div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-center bg-gray-100 py-10">
				<div className="md:w-1/2 text-center md:text-left">
					<h1 className="text-center text-5xl md:text-4xl font-extrabold text-gray-800 leading-tight mb-4">
						À propos de nous
					</h1>
					<p className="text-xl md:text-1xl text-gray-600 max-w-4xl mx-auto md:mx-0 mb-8">
						Découvrez notre histoire, nos valeurs et la passion qui nous anime.
					</p>
				</div>
			</div>
			<div className="container mx-auto px-4 max-w-5xl">
				<div className="bg-white p-8 rounded-lg shadow-lg space-y-8 mt-21">
					<div className="text-center">
						<h2 className="text-3xl font-bold text-gray-800 mb-4">
							Notre histoire
						</h2>
						<p className="text-lg text-gray-600">
							Naya Web est née d'une passion pour le développement web et d'une
							conviction profonde : la technologie doit servir la créativité. En
							tant qu'auto-entrepreneur, j'ai fondé cette agence pour offrir des
							solutions sur mesure, loin des modèles standardisés. Mon parcours
							m'a permis de maîtriser des technologies modernes comme
							JavaScript, React.js, Next.js... pour construire des sites web
							performants, élégants et faciles à gérer. Chez Naya Web, nous ne
							nous contentons pas de coder ; nous accompagnons nos clients à
							chaque étape pour transformer leur vision en une réalité digitale
							réussie.
						</p>
					</div>

					<hr className="border-gray-300" />

					<div className="text-center">
						<h2 className="text-3xl font-bold text-gray-800 mb-4">
							Nos valeurs
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
							<div>
								<h3 className="text-xl font-bold text-gray-800">Expertise</h3>
								<p className="text-gray-600">
									Nous maîtrisons les dernières technologies pour offrir des
									solutions robustes et pérennes.
								</p>
							</div>
							<div>
								<h3 className="text-xl font-bold text-gray-800">
									Transparence
								</h3>
								<p className="text-gray-600">
									Nous croyons en une communication honnête et ouverte à chaque
									étape du projet.
								</p>
							</div>
							<div>
								<h3 className="text-xl font-bold text-gray-800">Passion</h3>
								<p className="text-gray-600">
									Le développement web est notre passion, et cela se reflète
									dans la qualité de notre travail.
								</p>
							</div>
						</div>
					</div>

					<hr className="border-gray-300" />

					<div className="text-center">
						<h2 className="text-3xl font-bold text-gray-800 mb-4">
							Notre équipe
						</h2>
						<p className="text-lg text-gray-600 mb-8">
							Faisons connaissance avec les visages derrière Naya Web.
						</p>
						<div className="flex justify-center">
							<div className="w-40 h-40 rounded-full overflow-hidden shadow-lg">
								<Image
									src="/ta-photo.jpg" // Remplace par ta photo
									alt="Membre de l'équipe"
									width={160}
									height={160}
									className="object-cover w-full h-full"
								/>
							</div>
						</div>
						<h3 className="text-2xl font-bold text-gray-800 mt-4">
							A. Boubnan
						</h3>
						<p className="text-lg text-gray-600">
							Fondateur et Développeur Web
						</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default AboutUsPage;
