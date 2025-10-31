// components/ServicesOverview.tsx
import Link from "next/link";
import ServiceCard from "@/components/ServiceCard";
import {
	CodeBracketIcon,
	ServerStackIcon,
	SwatchIcon,
} from "@heroicons/react/24/outline";

const services = [
	{
		title: "Création de sites web",
		description:
			"Nous concevons et développons des sites web uniques, du design à la mise en ligne.",
		icon: <CodeBracketIcon />,
	},
	{
		title: "Développement d'applications",
		description:
			"Des applications métier aux plateformes e-commerce, nous créons des solutions robustes.",
		icon: <ServerStackIcon />,
	},
	{
		title: "Identité Visuelle",
		description:
			"Nous construisons une identité visuelle forte et mémorable avec logos et chartes graphiques.",
		icon: <SwatchIcon />,
	},
];

const ServicesOverview = () => {
	return (
		<section className="py-20 bg-white">
			<div className="container mx-auto px-4 text-center">
				<h2 className="text-4xl font-bold text-gray-800 mb-4">
					Notre savoir-faire au service de vos ambitions.
				</h2>
				<p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
					De la conception à la réalisation, nous vous accompagnons dans toutes
					les étapes de votre projet.
				</p>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
					{services.map((service, index) => (
						<ServiceCard
							key={index}
							title={service.title}
							description={service.description}
							icon={service.icon}
							iconSize={32}
						/>
					))}
				</div>
				<Link
					href="/services"
					className="bg-gray-200 text-gray-800 py-3 px-8 rounded-full font-bold text-lg hover:bg-gray-300 transition duration-300"
				>
					Voir tous nos services
				</Link>
			</div>
		</section>
	);
};

export default ServicesOverview;
