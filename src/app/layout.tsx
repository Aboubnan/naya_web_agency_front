import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Importez vos composants
import Header from "@/components/Header";
import Footer from "@/components/Footer";
// NOTE IMPORTANTE : La dépendance à l'authentification (AuthProvider) est supprimée ici
// pour corriger l'erreur de build 'ReferenceError: AuthButton is not defined',
// car nous traitons ceci comme un site vitrine statique.

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Naya web",
	description:
		"Développeurs passionnés en React, Next.js et Node.js pour des solutions web sur mesure.",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	// Le AuthProvider est retiré du wrapper pour éliminer l'erreur de référence.
	// Ajout de classes flex pour s'assurer que le Footer reste en bas de la page (bonne pratique Tailwind).
	return (
		<html lang="fr">
			<body className={inter.className}>
				<div id="root" className="flex flex-col min-h-screen">
					<Header />
					{/* Le 'main' prend l'espace restant, poussant le Footer vers le bas */}
					<main className="flex-grow">{children}</main>
					<Footer />
				</div>
			</body>
		</html>
	);
}
