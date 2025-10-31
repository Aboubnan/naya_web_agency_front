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
			const response = await fetch(
				"http://localhost:1337/api/contact-messages/send",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(formData),
				},
			);

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(
					errorData.message || "Erreur lors de l'envoi du message.",
				);
			}

			setStatus("Message envoyé avec succès !");
			setFormData({ name: "", firstName: "", email: "", message: "" });
		} catch (error: any) {
			setStatus(`Erreur : ${error.message}`);
			console.error(error);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<section className="py-20">
			<div className="container mx-auto px-4 text-center">
				<div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-center  bg-gray-100 py-10">
					<div className="md:w-1/2 text-center md:text-left">
						<h1 className="text-center text-5xl md:text-4xl font-extrabold text-gray-800 leading-tight mb-4">
							Contactez-nous
						</h1>
						<p className="text-xl md:text-1xl text-gray-600 max-w-4xl mx-auto md:mx-0 mb-8">
							Nous serions ravis de discuter de votre projet. Laissez-nous un
							message et nous vous recontacterons rapidement.
						</p>
					</div>
				</div>

				<form
					onSubmit={handleSubmit}
					className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-lg mt-20"
				>
					<div className="mb-4">
						<label
							htmlFor="name"
							className="block text-left text-gray-700 font-medium mb-2"
						>
							Nom
						</label>
						<input
							type="text"
							id="name"
							name="name"
							value={formData.name}
							onChange={handleChange}
							required
							className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
						/>
					</div>
					<div className="mb-4">
						<label
							htmlFor="first-name"
							className="block text-left text-gray-700 font-medium mb-2"
						>
							Prenom
						</label>
						<input
							type="text"
							id="firstName"
							name="firstName"
							value={formData.firstName}
							onChange={handleChange}
							required
							className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
						/>
					</div>
					<div className="mb-4">
						<label
							htmlFor="email"
							className="block text-left text-gray-700 font-medium mb-2"
						>
							E-mail
						</label>
						<input
							type="email"
							id="email"
							name="email"
							value={formData.email}
							onChange={handleChange}
							required
							className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
						/>
					</div>
					<div className="mb-6">
						<label
							htmlFor="message"
							className="block text-left text-gray-700 font-medium mb-2"
						>
							Message
						</label>
						<textarea
							id="message"
							name="message"
							value={formData.message}
							onChange={handleChange}
							required
							rows={4}
							className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
						/>
					</div>
					<button
						type="submit"
						disabled={isSubmitting}
						className="w-full bg-blue-600 text-white py-3 rounded-md font-bold hover:bg-blue-700 transition duration-300 disabled:bg-gray-400"
					>
						{isSubmitting ? "Envoi..." : "Envoyer le message"}
					</button>
					{status && (
						<p
							className={`mt-4 text-sm ${status.startsWith("Erreur") ? "text-red-500" : "text-green-500"}`}
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
