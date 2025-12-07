// src/app/portfolio/[slug]/page.tsx
"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";

// 💡 L'API_BASE_URL doit être réutilisée pour construire l'URL de l'image
const API_BASE_URL =
	process.env.NEXT_PUBLIC_API_URL || "http://37.59.98.118:3001";

interface Project {
	id: number;
	title: string;
	fullDescription: string;
	technologies: string[];
	imageUrl: string;
	imageAlt?: string;
	externalUrl?: string;
}

const ProjectDetailPage = () => {
	// useParams est utilisé pour récupérer la partie dynamique de l'URL
	const params = useParams();
	const slug = params?.slug as string | undefined;

	const [project, setProject] = useState<Project | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const fetchProject = useCallback(async () => {
		if (!slug) return;

		try {
			const apiUrl = API_BASE_URL;
			if (!apiUrl) throw new Error("NEXT_PUBLIC_API_URL non défini.");

			// 💡 L'appel API utilise le slug
			const res = await fetch(`${apiUrl}/api/v1/projects/${slug}`);

			if (!res.ok) {
				// Si l'API renvoie 404, on gère l'erreur
				throw new Error("Projet non trouvé sur l'API");
			}

			const json = await res.json();

			// 🛑 CORRECTION 2 : On suppose que l'API renvoie l'objet directement
			// Si l'API renvoie { project: {...} }, utilisez setProject(json.project);
			setProject(json);
		} catch (err) {
			console.error(err);
			setError("Impossible de charger les détails du projet.");
		} finally {
			setIsLoading(false);
		}
	}, [slug]);

	useEffect(() => {
		fetchProject();
	}, [fetchProject]);

	// --- Rendu des états ---
	if (isLoading) {
		return (
			<section className="py-20 text-center flex items-center justify-center">
				<Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
			</section>
		);
	}

	if (error || !project) {
		return (
			<section className="py-20 text-center">
				<p className="text-xl text-red-500 mb-4">
					{error || "Projet introuvable."}
				</p>
				<Link href="/portfolio" className="text-indigo-600 hover:underline">
					Retour au Portfolio
				</Link>
			</section>
		);
	}

	// 🛑 CORRECTION 1 : Construction de l'URL d'image complète (si elle est relative)
	const rawImageUrl = project.imageUrl;
	let fullImageUrl = rawImageUrl;

	if (rawImageUrl && !rawImageUrl.startsWith("http")) {
		// Ajout de l'URL de base s'il s'agit d'un chemin relatif (/uploads/...)
		fullImageUrl = `${API_BASE_URL}${rawImageUrl}`;
	}

	return (
		<section className="container mx-auto px-4 py-16 max-w-5xl">
			<Link
				href="/portfolio"
				className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-6 font-medium"
			>
				<ArrowLeft className="w-5 h-5 mr-2" />
				Retour au Portfolio
			</Link>

			<h1 className="text-4xl font-extrabold text-gray-900 mb-6 border-b pb-4">
				{project.title}
			</h1>

			<div className="relative w-full h-96 mb-6 rounded-lg overflow-hidden shadow-xl">
				<Image
					// 💡 Utilisation de l'URL complète
					src={fullImageUrl}
					alt={project.imageAlt || project.title}
					fill
					sizes="(max-width: 768px) 100vw, 800px"
					className="object-cover rounded-lg"
					unoptimized
				/>
			</div>

			<h2 className="text-2xl font-bold text-gray-800 mb-3">
				Description du Projet
			</h2>
			<p className="text-gray-700 whitespace-pre-line mb-6">
				{project.fullDescription}
			</p>

			{/* ... (Reste du composant technologies, externalUrl, etc.) ... */}

			{project.technologies?.length > 0 && (
				<div className="mb-6">
					<h3 className="font-bold mb-3 text-xl text-gray-800">
						Technologies utilisées :
					</h3>
					<ul className="flex flex-wrap gap-2">
						{project.technologies.map((tech) => (
							<li
								key={tech}
								className="bg-indigo-100 text-indigo-800 px-3 py-1 text-sm rounded-full font-medium"
							>
								{tech}
							</li>
						))}
					</ul>
				</div>
			)}

			{project.externalUrl && (
				<a
					href={project.externalUrl}
					target="_blank"
					rel="noopener noreferrer"
					className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition font-semibold mt-4 shadow-md"
				>
					Voir le projet en ligne
				</a>
			)}
		</section>
	);
};

export default ProjectDetailPage;
