// src/app/portfolio/[slug]/page.tsx
// AUCUN "use client" ici. Ce composant est un Server Component.

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const API_BASE_URL =
	process.env.NEXT_PUBLIC_API_URL || "http://37.59.98.118:3001";

// Interface alignée sur votre JSON
interface ProjectDetail {
	title: string;
	fullDescription: string;
	externalUrl: string;
	imageUrl?: string;
	imageAlt?: string;
	technologies: string[];
}

/**
 * Fonction asynchrone pour récupérer les données du projet
 * (Exécutée côté serveur)
 */
async function getProjectBySlug(slug: string): Promise<ProjectDetail | null> {
	try {
		const response = await fetch(`${API_BASE_URL}/api/v1/projects/${slug}`, {
			// Revalidation pour s'assurer que les données ne sont pas trop anciennes
			next: { revalidate: 60 },
		});

		if (!response.ok) {
			console.error(
				`API Error for slug ${slug}: ${response.status} ${response.statusText}`,
			);
			return null;
		}

		// Le JSON est directement l'objet ProjectDetail (comme vous l'avez montré)
		const json = await response.json();
		return json as ProjectDetail;
	} catch (error) {
		console.error("Erreur de récupération du projet par slug:", error);
		return null;
	}
}

/**
 * Le Server Component principal
 * Il reçoit le slug via les params de Next.js, sans hook.
 */
export default async function ProjectDetailPage({
	params,
}: { params: { slug: string } }) {
	const project = await getProjectBySlug(params.slug);

	if (!project) {
		// Renvoie la page 404 native si le projet n'est pas trouvé
		notFound();
	}

	// Logique pour construire l'URL de l'image (si relative)
	const rawImageUrl = project.imageUrl;
	let fullImageUrl = rawImageUrl;

	if (rawImageUrl && !rawImageUrl.startsWith("http")) {
		fullImageUrl = `${API_BASE_URL}${rawImageUrl}`;
	}

	const imageAltText = project.imageAlt || project.title;

	return (
		<article className="py-12 md:py-20 bg-gray-50">
			<div className="container mx-auto px-4 max-w-5xl">
				<Link
					href="/portfolio"
					className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-6 font-medium"
				>
					<ArrowLeft className="w-5 h-5 mr-2" />
					Retour au Portfolio
				</Link>

				<h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 border-b pb-4">
					{project.title}
				</h1>

				<div className="relative w-full h-96 mb-8 rounded-lg overflow-hidden shadow-xl">
					<Image
						src={fullImageUrl}
						alt={imageAltText}
						fill
						sizes="100vw"
						className="object-cover"
						unoptimized
					/>
				</div>

				<h2 className="text-2xl font-bold text-gray-800 mb-3">
					Description Complète
				</h2>
				<div className="text-lg text-gray-700 space-y-4 whitespace-pre-line mb-8">
					{project.fullDescription}
				</div>

				<h2 className="text-2xl font-bold text-gray-800 mb-3">
					Technologies Utilisées
				</h2>
				<div className="flex flex-wrap gap-3 mb-8">
					{project.technologies.map((tech, index) => (
						<span
							key={index}
							className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-full shadow-md"
						>
							{tech}
						</span>
					))}
				</div>

				<div className="mt-8 text-center">
					<a
						href={project.externalUrl}
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center px-8 py-3 text-lg bg-green-600 text-white font-bold rounded-full hover:bg-green-700 transition-all duration-300 shadow-xl"
					>
						Visiter le site
					</a>
				</div>
			</div>
		</article>
	);
}

// Composant d'erreur 404 personnalisé si besoin
// export function generateNotFoundMetadata() { return { title: 'Projet Introuvable' } }
