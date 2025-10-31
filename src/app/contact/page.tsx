import { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
	title: "Contact - Naya Web",
	description:
		"Contactez-nous pour discuter de votre projet et découvrir comment nous pouvons vous aider.",
};

export default function ContactPage() {
	return <ContactClient />;
}
