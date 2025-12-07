import Link from "next/link";

const Footer = () => {
	return (
		<footer className="w-full bg-gray-800 text-white p-6 ">
			<div className="flex items-center justify-between w-full max-w-none px-6">
				{/* Réseaux sociaux empilés verticalement à gauche */}
				<div className="flex flex-col space-y-4">
					<a
						href="https://linkedin.com/company/naya-web"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="LinkedIn"
						className="hover:text-blue-600"
					>
						{/* Icône LinkedIn */}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="currentColor"
							viewBox="0 0 24 24"
							className="w-6 h-6"
						>
							<title>LinkedIn</title>
							<path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11.334 20h-3.333v-10h3.333v10zm-1.667-11.25c-1.07 0-1.933-.863-1.933-1.933 0-1.07.863-1.933 1.933-1.933s1.933.863 1.933 1.933c0 1.07-.863 1.933-1.933 1.933zm13 11.25h-3.333v-5.25c0-1.253-.023-2.865-1.746-2.865-1.747 0-2.016 1.367-2.016 2.78v5.335h-3.334v-10h3.2v1.367h.045c.446-.847 1.537-1.746 3.166-1.746 3.388 0 4.013 2.229 4.013 5.123v5.256z" />
						</svg>
					</a>

					<a
						href="https://instagram.com/nayaweb.dev"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="Instagram"
						className="hover:text-pink-500"
					>
						{/* Icône Instagram */}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							viewBox="0 0 24 24"
							className="w-6 h-6"
						>
							<title>Instagram</title>
							<rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
							<path d="M16 11.37A4 4 0 1 1 9.63 8 4 4 0 0 1 16 11.37z" />
							<line x1="17.5" y1="6.5" x2="17.5" y2="6.5" />
						</svg>
					</a>
				</div>

				{/* Copyright centré */}
				<div className="text-center text-sm flex-grow">
					© {new Date().getFullYear()} Naya web. Tous droits réservés.
				</div>

				{/* Liens empilés verticalement à droite */}
				<div className="flex flex-col space-y-2 text-sm text-right">
					<Link href="/mentions-legales" className="hover:underline">
						Mentions Légales
					</Link>
					<Link
						href="/politique-de-confidentialite"
						className="hover:underline"
					>
						Politique de Confidentialité
					</Link>
					<Link href="/cgv" className="hover:underline">
						Conditions Générales d'Utilisation
					</Link>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
