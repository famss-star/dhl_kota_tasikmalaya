"use client";
import React from "react";
import Carousel from "@/components/Carousel";
import StatisticsSection from "@/components/StatisticsSection";
import PimpinanSection from "@/components/PimpinanSection";
import BeritaSection from "@/components/BeritaSection";
import LayananSection from "@/components/LayananSection";
import AgendaSection from "@/components/AgendaSection";
import SocialMediaGallery from "@/components/SocialMediaGallery";

export default function Home() {
  // Data statistik IKM
  const ikmStats = [
	{ value: "88,7", label: "IKM DLH Kota Tasikmalaya 2024" },
	{ value: "A", label: "Kategori Mutu Pelayanan" },
	{ value: "Sangat Baik", label: "Keterangan" },
	{ value: "> 500", label: "Responden" },
  ];

  return (
	<div className="min-h-screen bg-white dark:bg-gray-900 pt-0 py-8">
	  <Carousel />
	  <PimpinanSection />
	  <BeritaSection />
	  <LayananSection />
	  <AgendaSection />
	  {/* Statistik IKM */}
	  <div className="max-w-6xl mx-auto px-4">
		<StatisticsSection
		  title="Indeks Kepuasan Masyarakat (IKM)"
		  subtitle="Hasil survei kepuasan masyarakat terhadap pelayanan DLH Kota Tasikmalaya tahun 2024"
		  items={ikmStats}
		/>
	  </div>
	  <div className="max-w-6xl mx-auto px-4">
	  <SocialMediaGallery
		cards={[
		  { platform: "tiktok", title: "Video Tiktok DLH", url: "https://www.tiktok.com/@ceritasiaki/video/7514670466817068344" },
		  { platform: "instagram", title: "Instagram Reel DLH", url: "https://www.instagram.com/p/DMO7ayCu0Q4/" },
		  { platform: "youtube", title: "YouTube DLH", url: "https://www.youtube.com/watch?v=SXySxLgCV-8" },
		]}
	  />
	  </div>
	</div>
  );
}
