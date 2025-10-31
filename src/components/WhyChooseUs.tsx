// components/WhyChooseUs.tsx
import {
	RocketLaunchIcon,
	HandRaisedIcon,
	PaintBrushIcon,
} from "@heroicons/react/24/outline";

const features = [
	{
		title: "Technologies modernes",
		description:
			"Expertise en React, Next.js, Node.js pour des solutions durables et performantes.",
		icon: <RocketLaunchIcon />,
	},
	{
		title: "Accompagnement sur mesure",
		description:
			"Nous sommes un partenaire à l'écoute de vos besoins, du début à la fin de votre projet.",
		icon: <HandRaisedIcon />,
	},
	{
		title: "Design élégant et fonctionnel",
		description:
			"Une interface utilisateur qui allie esthétisme et performance pour vos utilisateurs.",
		icon: <PaintBrushIcon />,
	},
];

const WhyChooseUs = () => {
	return (
		<section className="py-20 bg-white">
			<div className="container mx-auto px-4 text-center">
				<h2 className="text-4xl font-bold text-gray-800 mb-4">
					Pourquoi travailler avec nous ?
				</h2>
				<p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
					Nous créons des solutions qui font la différence.
				</p>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{features.map((feature, index) => (
						<div
							key={index}
							className="flex flex-col items-center p-6 bg-gray-50 rounded-lg shadow-sm"
						>
							<div className="text-blue-600 mb-4 text-4xl">{feature.icon}</div>
							<h3 className="text-2xl font-bold text-gray-800 mb-2">
								{feature.title}
							</h3>
							<p className="text-gray-600">{feature.description}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default WhyChooseUs;
