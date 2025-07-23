"use client";
import React from "react";
import Carousel from "@/components/Carousel";
import PimpinanSection from "@/components/PimpinanSection";
import BeritaSection from "@/components/BeritaSection";
import LayananSection from "@/components/LayananSection";
import AgendaSection from "@/components/AgendaSection";

export default function Home() {
	return (
		<div className="min-h-screen bg-white dark:bg-gray-900 pt-0 py-8 px-4">
			<Carousel />
			<PimpinanSection />
			<BeritaSection />
			<LayananSection />
			<AgendaSection />
		</div>
	);
}
