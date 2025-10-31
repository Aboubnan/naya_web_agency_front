"use client";

// components/Header.tsx
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const Header = () => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const toggleMobileMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen);
	};

	return (
		<header className="bg-white shadow-md p-4 sticky top-0 z-50">
			<div className="container mx-auto flex justify-between items-center">
				{/* Le logo */}
				<Link href="/">
					<Image
						src="/logoNW.png"
						alt="Logo de l'agence"
						width={150}
						height={50}
						className="rounded-full"
					/>
				</Link>

				{/* Le bouton du menu burger visible uniquement jusqu'à 1280px */}
				<div className="xl:hidden">
					<button
						onClick={toggleMobileMenu}
						className="text-gray-600 hover:text-blue-600 focus:outline-none transition-colors"
						aria-label="Toggle mobile menu"
					>
						{/* Icône de hamburger */}
						<svg
							className="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M4 6h16M4 12h16M4 18h16"
							/>
						</svg>
					</button>
				</div>

				{/* La navigation pour les grands écrans (visible à partir de 1280px) */}
				<nav className="hidden xl:block">
					<ul className="flex space-x-6">
						<li>
							<Link
								href="/"
								className="text-gray-600 hover:text-blue-600 font-medium"
							>
								Accueil
							</Link>
						</li>
						<li>
							<Link
								href="/services"
								className="text-gray-600 hover:text-blue-600 font-medium"
							>
								Services
							</Link>
						</li>
						<li>
							<Link
								href="/portfolio"
								className="text-gray-600 hover:text-blue-600 font-medium"
							>
								Portfolio
							</Link>
						</li>
						<li>
							<Link
								href="/a-propos"
								className="text-gray-600 hover:text-blue-600 font-medium"
							>
								À propos
							</Link>
						</li>
						<li>
							<Link
								href="/temoignages"
								className="text-gray-600 hover:text-blue-600 font-medium"
							>
								Témoignages
							</Link>
						</li>
						<li>
							<Link
								href="/contact"
								className="text-gray-600 hover:text-blue-600 font-medium"
							>
								Contact
							</Link>
						</li>
						<li>
							<Link
								href="/blog"
								className="text-gray-600 hover:text-blue-600 font-medium"
							>
								Blog
							</Link>
						</li>
					</ul>
				</nav>

				{/* Bouton de contact pour les grands écrans */}
				<div className="hidden xl:block">
					<Link
						href="/contact"
						className="bg-blue-600 text-white py-2 px-6 rounded-full font-bold hover:bg-blue-700 transition-colors"
					>
						Contactez-nous
					</Link>
				</div>
			</div>

			{/* Le menu mobile qui s'affiche ou se cache */}
			{isMobileMenuOpen && (
				<div className="xl:hidden mt-4">
					<nav>
						<ul className="flex flex-col space-y-4 items-center">
							<li>
								<Link
									href="/"
									className="block text-gray-800 hover:text-blue-600 font-medium text-lg"
									onClick={toggleMobileMenu}
								>
									Accueil
								</Link>
							</li>
							<li>
								<Link
									href="/services"
									className="block text-gray-800 hover:text-blue-600 font-medium text-lg"
									onClick={toggleMobileMenu}
								>
									Services
								</Link>
							</li>
							<li>
								<Link
									href="/portfolio"
									className="block text-gray-800 hover:text-blue-600 font-medium text-lg"
									onClick={toggleMobileMenu}
								>
									Portfolio
								</Link>
							</li>
							<li>
								<Link
									href="/a-propos"
									className="block text-gray-800 hover:text-blue-600 font-medium text-lg"
									onClick={toggleMobileMenu}
								>
									À propos
								</Link>
							</li>
							<li>
								<Link
									href="/temoignages"
									className="block text-gray-800 hover:text-blue-600 font-medium text-lg"
									onClick={toggleMobileMenu}
								>
									Témoignages
								</Link>
							</li>
							<li>
								<Link
									href="/contact"
									className="block text-gray-800 hover:text-blue-600 font-medium text-lg"
									onClick={toggleMobileMenu}
								>
									Contact
								</Link>
							</li>
							<li>
								<Link
									href="/blog"
									className="block text-gray-800 hover:text-blue-600 font-medium text-lg"
									onClick={toggleMobileMenu}
								>
									Blog
								</Link>
							</li>
							<li>
								<Link
									href="/contact"
									className="block bg-blue-600 text-white py-2 px-6 rounded-full font-bold hover:bg-blue-700 transition-colors mt-4"
									onClick={toggleMobileMenu}
								>
									Contactez-nous
								</Link>
							</li>
						</ul>
					</nav>
				</div>
			)}
		</header>
	);
};

export default Header;
