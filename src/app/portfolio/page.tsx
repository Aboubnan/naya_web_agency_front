import { Metadata } from "next";
import PortfolioClient from "./PortfolioClient";

export const metadata: Metadata = {
	title: "Portfolio - Naya Web",
	description:
		"Découvrez nos projets récents et comment nous avons aidé nos clients à réussir.",
};

export default function PortfolioPage() {
	return <PortfolioClient />;
}
