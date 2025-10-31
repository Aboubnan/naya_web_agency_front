// pages/index.tsx
import Head from "next/head";
import Header from "@/components/Header";
// app/page.tsx
import Hero from "@/components/Hero";
import ServicesOverview from "@/components/ServicesOverview";
import PortfolioOverview from "@/components/PortfolioOverview";
import WhyChooseUs from "@/components/WhyChooseUs";
import CTA from "@/components/CTA";

export default function Home() {
	return (
		<>
			<Hero />
			<ServicesOverview />
			<PortfolioOverview />
			<WhyChooseUs />
			<CTA />
		</>
	);
}
