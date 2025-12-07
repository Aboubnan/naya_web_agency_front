"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

interface Project {
	id: number;
	title: string;
	description?: string;
	shortDescription?: string;
	technologies?: string[];
	imageUrl?: string;
	imageAlt?: string;
	externalUrl?: string;
}

const API_BASE_URL =
	process.env.NEXT_PUBLIC_API_URL || "http://37.59.98.118:3001";

const ProjectDetailPage = () => {
	const { slug } = useParams();
	const [project, setProject] = useState<Project | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchProject = async () => {
			try {
				const res = await fetch(`${API_BASE_URL}/api/v1/projects/${slug}`);

				if (!res.ok) throw new Error("Projet non trouvé");

				const data: Project = await res.json();
				console.log("🔍 DATA API =", data);

				// 🔥 Correction : gestion de l'URL d’image
				let fullImageUrl = data.imageUrl;
				if (fullImageUrl) {
					if (!fullImageUrl.startsWith("http")) {
						fullImageUrl = `${API_BASE_URL}${fullImageUrl}`;
					}
				}

				setProject({
					...data,
					imageUrl: fullImageUrl,
					description: data.description ?? data.shortDescription,
				});
			} catch (err) {
				console.error(err);
				setProject(null);
			} finally {
				setIsLoading(false);
			}
		};

		fetchProject();
	}, [slug]);

	if (isLoading) {
		return <p className="text-center py-20">Chargement du projet...</p>;
	}

	if (!project) {
		return (
			<p className="text-center py-20 text-red-500">Projet introuvable.</p>
		);
	}

	return (
		<section className="container mx-auto px-4 py-16">
			<h1 className="text-4xl font-bold mb-6">{project.title}</h1>

			{project.imageUrl && (
				<div className="relative w-full h-96 mb-6">
					<Image
						src={project.imageUrl}
						alt={project.imageAlt || project.title}
						fill
						className="object-cover rounded-lg"
						unoptimized
					/>
				</div>
			)}

			<p className="mb-6">{project.description}</p>

			{project.technologies?.length > 0 && (
				<div className="mb-6">
					<h3 className="font-bold mb-2">Technologies utilisées :</h3>
					<ul className="flex flex-wrap gap-2">
						{project.technologies.map((tech) => (
							<li key={tech} className="bg-gray-200 px-3 py-1 rounded">
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
					className="inline-block bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition"
				>
					Voir le projet en ligne
				</a>
			)}
		</section>
	);
};

export default ProjectDetailPage;
