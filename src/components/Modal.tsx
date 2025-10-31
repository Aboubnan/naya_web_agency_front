// components/Modal.tsx
import React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

// Définissez le type pour les détails du service si nécessaire
type ServiceDetails = {
	title: string;
	description: string;
	icon: React.ReactElement;
	// Ajoutez ici des champs supplémentaires pour les détails
	details?: string; // Par exemple, un champ de détails plus long
};

type ModalProps = {
	isOpen: boolean;
	onClose: () => void;
	service: ServiceDetails | null; // Les données du service à afficher
};

const Modal = ({ isOpen, onClose, service }: ModalProps) => {
	if (!isOpen || !service) return null;

	// Redimensionner l'icône dans la modale (optionnel, on peut la rendre plus grande)
	const resizedIcon = React.isValidElement(service.icon)
		? React.cloneElement(service.icon as React.ReactElement<any>, {
				className: "w-16 h-16 text-blue-600",
			})
		: null;

	// Contenu de la modale plus détaillé (utilisez le champ 'details' si vous l'ajoutez aux données)
	const detailedContent =
		service.details ||
		service.description + " Pour plus d'informations, veuillez nous contacter.";

	return (
		// Overlay (fond sombre semi-transparent)
		<div
			className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4"
			onClick={onClose} // Fermer en cliquant sur l'overlay
		>
			{/* Conteneur de la modale */}
			<div
				className="bg-white rounded-lg shadow-2xl max-w-lg w-full p-6 relative overflow-y-auto max-h-[90vh]"
				onClick={(e) => e.stopPropagation()} // Empêcher la fermeture si on clique dans la modale
			>
				{/* Bouton de fermeture */}
				<button
					className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 transition"
					onClick={onClose}
					aria-label="Fermer la modale"
				>
					<XMarkIcon className="w-6 h-6" />
				</button>

				{/* Contenu */}
				<div className="flex flex-col items-center text-center">
					<div className="mb-4">{resizedIcon}</div>
					<h2 className="text-3xl font-bold text-gray-900 mb-4">
						{service.title}
					</h2>
					<p className="text-gray-700 text-lg mb-6">{detailedContent}</p>
					{/* Vous pouvez ajouter ici plus de détails, des listes, ou un bouton de contact */}
					<button
						className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
						onClick={onClose} // Action typique: rediriger ou ouvrir un formulaire de contact
					>
						Demander un devis
					</button>
				</div>
			</div>
		</div>
	);
};

export default Modal;
