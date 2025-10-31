// // components/ServiceCard.tsx
// import React, { ReactElement, isValidElement } from "react";

// type ServiceCardProps = {
// 	title: string;
// 	description: string;
// 	icon: ReactElement; // Plus strict : attend un élément React valide
// 	iconSize?: number;
// };

// const ServiceCard = ({
// 	title,
// 	description,
// 	icon,
// 	iconSize = 130,
// }: ServiceCardProps) => {
// 	// Vérifie que l'icône est bien un élément valide avant de la cloner
// 	const resizedIcon = isValidElement(icon)
// 		? React.cloneElement(icon, {
// 				width: iconSize,
// 				height: iconSize,
// 			})
// 		: null;

// 	return (
// 		<div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
// 			<div className="text-blue-600 mb-2 flex justify-center">
// 				{resizedIcon}
// 			</div>
// 			<h3 className="text-xl font-bold text-gray-900 mb-1 flex justify-center">
// 				{title}
// 			</h3>
// 			<p className="text-sm text-gray-600">{description}</p>
// 		</div>
// 	);
// };

// export default ServiceCard;

// components/ServiceCard.tsx

// components/ServiceCard.tsx
import React, { ReactElement, isValidElement } from "react";

type ServiceCardProps = {
	title: string;
	description: string;
	icon: ReactElement;
	iconSize?: number;
	onClick?: () => void; // rendu optionnel
};

const ServiceCard = ({
	title,
	description,
	icon,
	iconSize = 130,
	onClick,
}: ServiceCardProps) => {
	// Vérifie que l'icône est bien un élément valide avant de la cloner
	const resizedIcon = isValidElement(icon)
		? React.cloneElement(icon as ReactElement<React.SVGProps<SVGSVGElement>>, {
				width: iconSize,
				height: iconSize,
			})
		: null;

	return (
		<div
			className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 cursor-pointer"
			onClick={onClick} // Ne posera plus d'erreur si undefined
		>
			<div className="text-blue-600 mb-2 flex justify-center">
				{resizedIcon}
			</div>
			<h3 className="text-xl font-bold text-gray-900 mb-1 flex justify-center">
				{title}
			</h3>
			<p className="text-sm text-gray-600">{description}</p>
		</div>
	);
};

export default ServiceCard;
