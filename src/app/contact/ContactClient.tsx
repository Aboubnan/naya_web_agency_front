"use client";
import { useState } from "react";

const ContactPage = () => {
	const [formData, setFormData] = useState({
		name: "",
		firstName: "",
		email: "",
		message: "",
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [status, setStatus] = useState("");

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({ ...prevData, [name]: value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		setStatus("Envoi en cours...");

		try {
			const apiUrl = process.env.NEXT_PUBLIC_API_URL;
			if (!apiUrl) throw new Error("NEXT_PUBLIC_API_URL n'est pas définie.");

			const response = await fetch(`${apiUrl}/api/v1/contact`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formData),
			});

			if (!response.ok) {
				const errorData = await response.json().catch(() => null);
				console.error("Erreur API détaillée :", errorData);

				// Affiche le message d'erreur de l'API si disponible
				const apiMessage =
					errorData?.error?.message ||
					errorData?.message ||
					response.statusText;

				throw new Error(`Erreur serveur (${response.status}) : ${apiMessage}`);
			}

			setStatus("✅ Message envoyé avec succès !");
			setFormData({ name: "", firstName: "", email: "", message: "" });
		} catch (error: any) {
			setStatus(`❌ ${error.message}`);
			console.error("Erreur d'envoi du formulaire :", error);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<section className="py-20">
			<div className="container mx-auto px-4 text-center">
				<h1 className="text-4xl font-bold mb-6">Contactez-nous</h1>
				<p className="mb-10 text-gray-600 max-w-xl mx-auto">
					Laissez-nous un message et nous vous recontacterons rapidement.
				</p>

				<form
					onSubmit={handleSubmit}
					className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-lg"
				>
					{/* Nom */}
					<input
						type="text"
						name="name"
						placeholder="Nom"
						value={formData.name}
						onChange={handleChange}
						required
						className="w-full mb-4 p-3 border rounded-md"
					/>
					{/* Prénom */}
					<input
						type="text"
						name="firstName"
						placeholder="Prénom"
						value={formData.firstName}
						onChange={handleChange}
						required
						className="w-full mb-4 p-3 border rounded-md"
					/>
					{/* Email */}
					<input
						type="email"
						name="email"
						placeholder="Email"
						value={formData.email}
						onChange={handleChange}
						required
						className="w-full mb-4 p-3 border rounded-md"
					/>
					{/* Message */}
					<textarea
						name="message"
						placeholder="Votre message..."
						value={formData.message}
						onChange={handleChange}
						required
						rows={5}
						className="w-full mb-4 p-3 border rounded-md"
					/>

					<button
						type="submit"
						disabled={isSubmitting}
						className="w-full bg-blue-600 text-white p-3 rounded-md font-bold hover:bg-blue-700 transition disabled:bg-gray-400"
					>
						{isSubmitting ? "Envoi..." : "Envoyer le message"}
					</button>

					{status && (
						<p
							className={`mt-4 text-sm ${
								status.startsWith("❌") ? "text-red-500" : "text-green-500"
							}`}
						>
							{status}
						</p>
					)}
				</form>
			</div>
		</section>
	);
};

export default ContactPage;
