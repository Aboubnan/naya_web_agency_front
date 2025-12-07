"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

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
	const { slug } = useParams();
	const [project, setProject] = useState<Project | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchProject = async () => {
			try {
				const apiUrl = process.env.NEXT_PUBLIC_API_URL;
				if (!apiUrl) throw new Error("NEXT_PUBLIC_API_URL non défini.");

				const res = await fetch(`${apiUrl}/api/v1/projects/${slug}`);
				if (!res.ok) throw new Error("Projet non trouvé");

				const data: Project = await res.json();
				setProject(data);
			} catch (err) {
				console.error(err);
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

			<div className="relative w-full h-96 mb-6">
				<Image
					src={project.imageUrl}
					alt={project.imageAlt || project.title}
					fill
					className="object-cover rounded-lg"
				/>
			</div>

			<p className="mb-6">{project.fullDescription}</p>

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
