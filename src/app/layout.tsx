// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Importez vos composants
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Naya web",
	description:
		"Développeurs passionnés en React, Next.js et Node.js pour des solutions web sur mesure.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="fr">
			<body className={inter.className}>
				<div className="flex flex-col min-h-screen">
					<Header />
					<main className="flex-grow">{children}</main>
					<Footer />
				</div>
			</body>
		</html>
	);
}
