"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://37.59.98.118:3001";

interface Project {
	id: number;
	title: string;
	shortDescription: string;
	fullDescription: string;
	technologies: string[];
	imageUrl: string;
	imageAlt?: string;
	externalUrl?: string;
}

export default function ProjectDetailPage() {
	const { slug } = useParams();
	const [project, setProject] = useState<Project | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (!slug) return;

		const fetchProject = async () => {
			try {
				const res = await fetch(
					`${API_URL}/api/v1/projects?filters[slug][$eq]=${slug}`,
				);

				if (!res.ok) throw new Error("Erreur API");

				const data = await res.json();

				// Strapi renvoie un tableau
				const p = data[0];
				if (!p) throw new Error("Projet inexistant");

				// Fix URL image
				const fixedUrl = p.imageUrl?.startsWith("/")
					? `${API_URL}${p.imageUrl}`
					: p.imageUrl;

				setProject({
					id: p.id,
					title: p.title,
					shortDescription: p.shortDescription,
					fullDescription: p.fullDescription,
					technologies: p.technologies || [],
					imageUrl: fixedUrl,
					imageAlt: p.imageAlt,
					externalUrl: p.externalUrl,
				});
			} catch (err) {
				console.error(err);
				setProject(null);
			} finally {
				setLoading(false);
			}
		};

		fetchProject();
	}, [slug]);

	if (loading) return <p className="text-center py-20">Chargement...</p>;
	if (!project)
		return (
			<p className="text-center py-20 text-red-500">Projet introuvable.</p>
		);

	return (
		<section className="container mx-auto px-6 py-16">
			<h1 className="text-4xl font-bold mb-6">{project.title}</h1>

			{project.imageUrl && (
				<div className="relative w-full h-96 mb-6">
					<Image
						src={project.imageUrl}
						alt={project.imageAlt || project.title}
						fill
						className="object-cover rounded-xl"
						unoptimized
					/>
				</div>
			)}

			<p className="text-lg mb-8 whitespace-pre-line">
				{project.fullDescription}
			</p>

			{project.technologies.length > 0 && (
				<div className="mb-8">
					<h3 className="font-semibold mb-2">Technologies :</h3>
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
					href={
						project.externalUrl.startsWith("http")
							? project.externalUrl
							: "https://" + project.externalUrl
					}
					target="_blank"
					className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
				>
					Voir le projet
				</a>
			)}
		</section>
	);
}
