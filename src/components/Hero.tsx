// components/Hero.tsx
import Link from "next/link";

const Hero = () => {
	return (
		<section className="bg-gray-100 py-24">
			<div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-center">
				<div className="md:w-1/2 mb-8 md:mb-0 md:mr-8">
					<img
						src="/hero1.jpg"
						alt="image d'une agence web"
						className="rounded-lg shadow-lg"
					/>
				</div>
				<div className="md:w-1/2 text-center md:text-left">
					<h1 className="text-center text-5xl md:text-4xl font-extrabold text-gray-800 leading-tight mb-4">
						Naya Web : l'expertise au service de votre projet digital.
					</h1>
					<p className="text-xl md:text-1xl text-gray-600 max-w-4xl mx-auto md:mx-0 mb-8">
						Nous concevons et développons des sites web sur mesure, propulsés
						par les technologies les plus modernes pour garantir votre succès en
						ligne.
					</p>
					<div className="flex justify-center">
						<Link
							href="/services"
							className="bg-blue-600 text-white py-3 px-8 rounded-full font-bold text-lg hover:bg-blue-700 transition duration-300"
						>
							Découvrir nos services
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Hero;
