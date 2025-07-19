"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const carouselImages = [
	{
		src: "https://www.dlh.tasikmalayakota.go.id/images/slide/hidroponik_882020222.jpg",
		alt: "DLH Kota Tasikmalaya 1",
	},
	{
		src: "https://www.dlh.tasikmalayakota.go.id/images/slide/survey-perizinan-amdal_178200356.jpg",
		alt: "DLH Kota Tasikmalaya 2",
	},
	{
		src: "https://www.dlh.tasikmalayakota.go.id/images/slide/karnaval-budaya-lingkungan-hidup_776888217.jpg",
		alt: "DLH Kota Tasikmalaya 3",
	},
];

export default function Carousel() {
	const [current, setCurrent] = useState(0);

	useEffect(() => {
		const timer = setInterval(() => {
			setCurrent((prev) => (prev + 1) % carouselImages.length);
		}, 3500);
		return () => clearInterval(timer);
	}, []);

	return (
		<div className="relative w-full mx-auto mb-8 aspect-[16/9]">
			<div className="overflow-hidden rounded-lg shadow-lg w-full h-full relative">
				{carouselImages.map((img, idx) => (
					<div
						key={img.src}
						className={`transition-opacity brightness-50 duration-700 absolute inset-0 w-full h-full flex items-center justify-center ${
							idx === current ? "opacity-100 z-10" : "opacity-0 z-0"
						}`}
					>
						<Image
							src={img.src}
							alt={img.alt}
							fill
							className="w-full h-full object-cover"
							priority={idx === 0}
						/>
						<div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70"></div>
					</div>
				))}

				<div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6">
					<div className="text-center mb-8 max-w-4xl">
						<h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 drop-shadow-lg">
							Dinas Lingkungan Hidup Kota Tasikmalaya
						</h1>
						<p className="text-sm sm:text-base lg:text-lg text-white/90 max-w-2xl mx-auto drop-shadow-md">
							Portal resmi informasi, layanan, dan edukasi lingkungan hidup Kota Tasikmalaya. Temukan berita, agenda, dokumen, dan layanan publik terkait pengelolaan lingkungan di kota kami.
						</p>
					</div>

					<div className="grid grid-cols-2 gap-6 w-full max-w-4xl">
						{/* Card 1 */}
						<div className="bg-black/20 backdrop-blur-md border border-white/30 rounded-xl p-6 text-white shadow-xl hover:bg-green-900 transition-all duration-300">
							<div className="flex items-center mb-4">
								<div className="bg-green-500/80 rounded-full p-3 mr-4">
									<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
									</svg>
								</div>
								<h3 className="text-xl font-bold">Layanan Online</h3>
							</div>
							<p className="text-sm opacity-90 mb-4">
								Akses mudah untuk perizinan AMDAL, IPLC, SPPL, dan UKL-UPL secara online 24/7.
							</p>
							<Link href="/pelayanan" className="inline-flex items-center text-sm font-semibold hover:underline">
								Akses Layanan
								<svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
								</svg>
							</Link>
						</div>

						{/* Card 2 */}
						<div className="bg-black/20 backdrop-blur-md border border-white/30 rounded-xl p-6 text-white shadow-xl hover:bg-green-900 transition-all duration-300">
							<div className="flex items-center mb-4">
								<div className="bg-blue-500/80 rounded-full p-3 mr-4">
									<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
									</svg>
								</div>
								<h3 className="text-xl font-bold">Informasi & Edukasi</h3>
							</div>
							<p className="text-sm opacity-90 mb-4">
								Dapatkan berita terbaru, artikel edukasi, dan panduan lingkungan hidup.
							</p>
							<Link href="/informasi" className="inline-flex items-center text-sm font-semibold hover:underline">
								Baca Informasi
								<svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
								</svg>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
