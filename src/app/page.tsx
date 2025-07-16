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

function Carousel() {
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
						{/* Gradient Masking */}
						<div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70"></div>
					</div>
				))}
				
				{/* Overlay Cards */}
				<div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6">
					{/* Hero Text */}
					<div className="text-center mb-8 max-w-4xl">
						<h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 drop-shadow-lg">
							Dinas Lingkungan Hidup Kota Tasikmalaya
						</h1>
						<p className="text-sm sm:text-base lg:text-lg text-white/90 max-w-2xl mx-auto drop-shadow-md">
							Portal resmi informasi, layanan, dan edukasi lingkungan hidup Kota
							Tasikmalaya. Temukan berita, agenda, dokumen, dan layanan publik
							terkait pengelolaan lingkungan di kota kami.
						</p>
					</div>
					
					{/* Service Cards */}
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
							<Link 
								href="/pelayanan" 
								className="inline-flex items-center text-sm font-semibold hover:underline"
							>
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
							<Link 
								href="/informasi" 
								className="inline-flex items-center text-sm font-semibold hover:underline"
							>
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

export default function Home() {
	// State untuk navigasi kalender bulan agenda - default ke Juli 2025
	const [currentAgendaDate, setCurrentAgendaDate] = useState(new Date(2025, 6, 16)); // July 16, 2025
	
	const agendaMonthNames = [
		'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
		'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
	];

	// Navigate agenda months
	const navigateAgendaMonth = (direction: 'prev' | 'next') => {
		const newDate = new Date(currentAgendaDate);
		if (direction === 'prev') {
			newDate.setMonth(currentAgendaDate.getMonth() - 1);
		} else {
			newDate.setMonth(currentAgendaDate.getMonth() + 1);
		}
		setCurrentAgendaDate(newDate);
	};

	// Get current agenda month and year
	const currentAgendaMonth = currentAgendaDate.getMonth();
	const currentAgendaYear = currentAgendaDate.getFullYear();

	// Generate calendar days for agenda
	const generateAgendaDays = () => {
		const firstDay = new Date(currentAgendaYear, currentAgendaMonth, 1);
		const lastDay = new Date(currentAgendaYear, currentAgendaMonth + 1, 0);
		const firstDayWeekday = firstDay.getDay(); // 0 = Sunday, 1 = Monday, etc.
		const daysInMonth = lastDay.getDate();
		
		const calendarDays = [];
		
		// Add empty cells for days before month starts
		for (let i = 0; i < firstDayWeekday; i++) {
			calendarDays.push(null);
		}
		
		// Add days of the month
		for (let day = 1; day <= daysInMonth; day++) {
			calendarDays.push(day);
		}
		
		return calendarDays;
	};

	// Sample agenda dates for different months
	const getAgendaDatesForMonth = (month: number, year: number) => {
		const monthKey = `${year}-${(month + 1).toString().padStart(2, '0')}`;
		
		const agendaByMonth: { [key: string]: number[] } = {
			'2025-07': [15, 16, 22, 25, 28], // Juli 2025
			'2025-08': [5, 12, 18, 24, 30], // Agustus 2025
			'2025-06': [8, 15, 20, 27], // Juni 2025
			'2025-09': [3, 10, 17, 25], // September 2025
		};
		
		return agendaByMonth[monthKey] || [];
	};

	// Get agenda events for current month
	const getAgendaEventsForMonth = (month: number, year: number) => {
		const monthKey = `${year}-${(month + 1).toString().padStart(2, '0')}`;
		
		const eventsByMonth: { [key: string]: Array<{ date: number, title: string, color: string }> } = {
			'2025-07': [
				{ date: 15, title: 'Pelatihan Bank Sampah', color: 'green' },
				{ date: 16, title: 'Cimahi Hepi Run 2025', color: 'blue' },
				{ date: 22, title: 'Workshop Kompos', color: 'green' },
				{ date: 25, title: 'Sosialisasi AMDAL', color: 'blue' },
				{ date: 28, title: 'Monitoring Air Sungai', color: 'purple' }
			],
			'2025-08': [
				{ date: 5, title: 'Pembersihan Pantai', color: 'green' },
				{ date: 12, title: 'Seminar Energi Terbarukan', color: 'blue' },
				{ date: 18, title: 'Penanaman Mangrove', color: 'green' },
				{ date: 24, title: 'Workshop Daur Ulang', color: 'purple' },
				{ date: 30, title: 'Monitoring Udara', color: 'blue' }
			],
			'2025-06': [
				{ date: 8, title: 'Hari Lingkungan Hidup', color: 'green' },
				{ date: 15, title: 'Sosialisasi UKL-UPL', color: 'blue' },
				{ date: 20, title: 'Bersih-bersih Sungai', color: 'green' },
				{ date: 27, title: 'Edukasi Sampah Plastik', color: 'purple' }
			],
			'2025-09': [
				{ date: 3, title: 'Kampanye Hemat Energi', color: 'green' },
				{ date: 10, title: 'Pameran Teknologi Hijau', color: 'blue' },
				{ date: 17, title: 'Workshop Biogas', color: 'purple' },
				{ date: 25, title: 'Gerakan Tanam Pohon', color: 'green' }
			]
		};
		
		return eventsByMonth[monthKey] || [];
	};

	const agendaDays = generateAgendaDays();
	const agendaDatesWithEvents = getAgendaDatesForMonth(currentAgendaMonth, currentAgendaYear);
	const agendaEvents = getAgendaEventsForMonth(currentAgendaMonth, currentAgendaYear);

	// Check if date is today (July 16, 2025)
	const isToday = (day: number) => {
		const today = new Date(2025, 6, 16); // July 16, 2025
		return today.getDate() === day && 
			   today.getMonth() === currentAgendaMonth && 
			   today.getFullYear() === currentAgendaYear;
	};

	return (
		<div className="min-h-screen bg-white dark:bg-gray-900 pt-0 py-8 px-4">
			<Carousel />

			{/* News Section - Positioned separately with consistent spacing */}
			<div className="relative -mt-16 mb-16 z-10">
				<div className="max-w-6xl mx-auto px-4">
					<div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-6">
						<div className="flex items-center justify-between mb-4">
							<h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center">
								<svg className="w-6 h-6 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
								</svg>
								Berita Terbaru
							</h2>
							<Link href="/informasi/berita" className="text-green-600 hover:text-green-700 font-medium text-sm flex items-center">
								Lihat Semua
								<svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
								</svg>
							</Link>
						</div>
						<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
							{/* Kolom Kiri - Card Berita (2/3 width) */}
							<div className="lg:col-span-2">
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									{/* News Item 1 */}
									<div className="group cursor-pointer">
										<div className="bg-gray-100 dark:bg-gray-700 rounded-lg aspect-[16/9] mb-3 relative overflow-hidden">
											<div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
											<div className="absolute bottom-2 left-2">
												<span className="text-xs text-white bg-green-600 px-2 py-1 rounded">Lingkungan</span>
											</div>
										</div>
										<h3 className="font-medium text-gray-800 dark:text-white group-hover:text-green-600 transition-colors line-clamp-2">
											Program Penanaman 1000 Pohon di Kota Tasikmalaya
										</h3>
										<p className="text-sm text-gray-600 dark:text-gray-400 mt-1">15 Juli 2025</p>
									</div>
									
									{/* News Item 2 */}
									<div className="group cursor-pointer">
										<div className="bg-gray-100 dark:bg-gray-700 rounded-lg aspect-[16/9] mb-3 relative overflow-hidden">
											<div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
											<div className="absolute bottom-2 left-2">
												<span className="text-xs text-white bg-blue-600 px-2 py-1 rounded">Perizinan</span>
											</div>
										</div>
										<h3 className="font-medium text-gray-800 dark:text-white group-hover:text-green-600 transition-colors line-clamp-2">
											Kemudahan Akses Perizinan AMDAL Online
										</h3>
										<p className="text-sm text-gray-600 dark:text-gray-400 mt-1">14 Juli 2025</p>
									</div>
									
									{/* News Item 3 */}
									<div className="group cursor-pointer">
										<div className="bg-gray-100 dark:bg-gray-700 rounded-lg aspect-[16/9] mb-3 relative overflow-hidden">
											<div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
											<div className="absolute bottom-2 left-2">
												<span className="text-xs text-white bg-purple-600 px-2 py-1 rounded">Edukasi</span>
											</div>
										</div>
										<h3 className="font-medium text-gray-800 dark:text-white group-hover:text-green-600 transition-colors line-clamp-2">
											Workshop Pengelolaan Sampah Rumah Tangga
										</h3>
										<p className="text-sm text-gray-600 dark:text-gray-400 mt-1">13 Juli 2025</p>
									</div>
									
									{/* News Item 4 */}
									<div className="group cursor-pointer">
										<div className="bg-gray-100 dark:bg-gray-700 rounded-lg aspect-[16/9] mb-3 relative overflow-hidden">
											<div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
											<div className="absolute bottom-2 left-2">
												<span className="text-xs text-white bg-orange-600 px-2 py-1 rounded">Sosialisasi</span>
											</div>
										</div>
										<h3 className="font-medium text-gray-800 dark:text-white group-hover:text-green-600 transition-colors line-clamp-2">
											Sosialisasi Penggunaan Energi Terbarukan
										</h3>
										<p className="text-sm text-gray-600 dark:text-gray-400 mt-1">12 Juli 2025</p>
									</div>
								</div>
							</div>
							
							{/* Kolom Kanan (1/3 width) */}
							<div className="space-y-6">
								{/* Baris 1 - Berita Terbaru/Terpopuler */}
								<div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
									<div className="flex items-center justify-between mb-3">
										<h3 className="font-semibold text-gray-800 dark:text-white text-sm">Terbaru</h3>
										<button className="text-xs text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300">Terpopuler</button>
									</div>
									<div className="group cursor-pointer">
										<div className="bg-gray-200 dark:bg-gray-600 rounded-lg aspect-[16/9] mb-2 relative overflow-hidden">
											<div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
											<div className="absolute bottom-1 left-1">
												<span className="text-xs text-white bg-red-600 px-1.5 py-0.5 rounded text-[10px]">Breaking</span>
											</div>
										</div>
										<h4 className="font-medium text-sm text-gray-800 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors line-clamp-2 leading-tight">
											Kota Tasikmalaya Raih Penghargaan Adipura 2025
										</h4>
										<p className="text-xs text-gray-600 dark:text-gray-400 mt-1">16 Juli 2025</p>
									</div>
								</div>
								
								{/* Baris 2 - List Berita */}
								<div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
									<h3 className="font-semibold text-gray-800 dark:text-white text-sm mb-3">Berita Lainnya</h3>
									<div className="space-y-3">
										{/* List Item 1 */}
										<div className="group cursor-pointer flex gap-3">
											<div className="w-16 h-12 bg-gray-200 dark:bg-gray-600 rounded flex-shrink-0 relative overflow-hidden">
												<div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-600 to-blue-600"></div>
											</div>
											<div className="flex-1 min-w-0">
												<h4 className="text-xs font-medium text-gray-800 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors line-clamp-2 leading-tight">
													Monitoring Kualitas Air Sungai Citanduy
												</h4>
												<p className="text-xs text-gray-500 dark:text-gray-400 mt-1">11 Juli 2025</p>
											</div>
										</div>
										
										{/* List Item 2 */}
										<div className="group cursor-pointer flex gap-3">
											<div className="w-16 h-12 bg-gray-200 dark:bg-gray-600 rounded flex-shrink-0 relative overflow-hidden">
												<div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 to-pink-600"></div>
											</div>
											<div className="flex-1 min-w-0">
												<h4 className="text-xs font-medium text-gray-800 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors line-clamp-2 leading-tight">
													Program Bank Sampah Kelurahan Sukabungah
												</h4>
												<p className="text-xs text-gray-500 dark:text-gray-400 mt-1">10 Juli 2025</p>
											</div>
										</div>
										
										{/* List Item 3 */}
										<div className="group cursor-pointer flex gap-3">
											<div className="w-16 h-12 bg-gray-200 dark:bg-gray-600 rounded flex-shrink-0 relative overflow-hidden">
												<div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-600 to-orange-600"></div>
											</div>
											<div className="flex-1 min-w-0">
												<h4 className="text-xs font-medium text-gray-800 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors line-clamp-2 leading-tight">
													Pemeriksaan Dokumen Lingkungan Industri
												</h4>
												<p className="text-xs text-gray-500 dark:text-gray-400 mt-1">9 Juli 2025</p>
											</div>
										</div>
										
										{/* List Item 4 */}
										<div className="group cursor-pointer flex gap-3">
											<div className="w-16 h-12 bg-gray-200 dark:bg-gray-600 rounded flex-shrink-0 relative overflow-hidden">
												<div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-600 to-cyan-600"></div>
											</div>
											<div className="flex-1 min-w-0">
												<h4 className="text-xs font-medium text-gray-800 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors line-clamp-2 leading-tight">
													Edukasi Pengolahan Limbah Rumah Tangga
												</h4>
												<p className="text-xs text-gray-500 dark:text-gray-400 mt-1">8 Juli 2025</p>
											</div>
										</div>
									</div>
									<Link href="/informasi/berita" className="block text-center text-xs text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 font-medium mt-3 pt-2 border-t border-gray-200 dark:border-gray-600">
										Lihat Semua Berita
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Layanan Terpopuler Section */}
			<div className="max-w-6xl mx-auto px-4 mb-16">
				<div className="text-center mb-8">
					<h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
						Layanan Terpopuler
					</h2>
					<p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
						Akses mudah dan cepat untuk berbagai layanan lingkungan hidup sesuai kebutuhan Anda
					</p>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* Untuk Warga */}
					<div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300">
						<div className="bg-gradient-to-r from-green-500 to-green-600 p-6">
							<div className="flex items-center justify-between">
								<div>
									<h3 className="text-xl font-bold text-white mb-2">Untuk Warga</h3>
									<p className="text-green-100 text-sm">Layanan masyarakat umum</p>
								</div>
								<div className="bg-white/20 rounded-full p-3">
									<svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
									</svg>
								</div>
							</div>
						</div>
						<div className="p-6 space-y-4">
							<Link href="/pengaduan" className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group">
								<div className="flex items-center">
									<div className="bg-red-100 dark:bg-red-900/50 rounded-lg p-2 mr-3">
										<svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.314 18.5c-.77.833.192 2.5 1.732 2.5z" />
										</svg>
									</div>
									<div>
										<p className="font-medium text-gray-800 dark:text-white">Pengaduan Lingkungan</p>
										<p className="text-sm text-gray-600 dark:text-gray-400">Laporkan masalah lingkungan</p>
									</div>
								</div>
								<svg className="w-5 h-5 text-gray-400 group-hover:text-green-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
								</svg>
							</Link>

							<Link href="/informasi/edukasi" className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group">
								<div className="flex items-center">
									<div className="bg-blue-100 dark:bg-blue-900/50 rounded-lg p-2 mr-3">
										<svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
										</svg>
									</div>
									<div>
										<p className="font-medium text-gray-800 dark:text-white">Edukasi Lingkungan</p>
										<p className="text-sm text-gray-600 dark:text-gray-400">Panduan dan tips ramah lingkungan</p>
									</div>
								</div>
								<svg className="w-5 h-5 text-gray-400 group-hover:text-green-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
								</svg>
							</Link>

							<Link href="/layanan/bank-sampah" className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group">
								<div className="flex items-center">
									<div className="bg-green-100 dark:bg-green-900/50 rounded-lg p-2 mr-3">
										<svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
										</svg>
									</div>
									<div>
										<p className="font-medium text-gray-800 dark:text-white">Bank Sampah</p>
										<p className="text-sm text-gray-600 dark:text-gray-400">Informasi bank sampah terdekat</p>
									</div>
								</div>
								<svg className="w-5 h-5 text-gray-400 group-hover:text-green-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
								</svg>
							</Link>
						</div>
					</div>

					{/* Untuk Usaha */}
					<div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300">
						<div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6">
							<div className="flex items-center justify-between">
								<div>
									<h3 className="text-xl font-bold text-white mb-2">Untuk Usaha</h3>
									<p className="text-blue-100 text-sm">Perizinan dan layanan bisnis</p>
								</div>
								<div className="bg-white/20 rounded-full p-3">
									<svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
									</svg>
								</div>
							</div>
						</div>
						<div className="p-6 space-y-4">
							<Link href="/pelayanan/amdal" className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group">
								<div className="flex items-center">
									<div className="bg-purple-100 dark:bg-purple-900/50 rounded-lg p-2 mr-3">
										<svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
										</svg>
									</div>
									<div>
										<p className="font-medium text-gray-800 dark:text-white">Perizinan AMDAL</p>
										<p className="text-sm text-gray-600 dark:text-gray-400">Analisis mengenai dampak lingkungan</p>
									</div>
								</div>
								<svg className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
								</svg>
							</Link>

							<Link href="/pelayanan/ukl-upl" className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group">
								<div className="flex items-center">
									<div className="bg-orange-100 dark:bg-orange-900/50 rounded-lg p-2 mr-3">
										<svg className="w-5 h-5 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v6a2 2 0 002 2h2m0 0h10a2 2 0 002-2V7a2 2 0 00-2-2H9m0 0V3m0 4h10v10a2 2 0 01-2 2H9" />
										</svg>
									</div>
									<div>
										<p className="font-medium text-gray-800 dark:text-white">UKL-UPL</p>
										<p className="text-sm text-gray-600 dark:text-gray-400">Upaya kelola & pemantauan lingkungan</p>
									</div>
								</div>
								<svg className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
								</svg>
							</Link>

							<Link href="/pelayanan/sppl" className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group">
								<div className="flex items-center">
									<div className="bg-teal-100 dark:bg-teal-900/50 rounded-lg p-2 mr-3">
										<svg className="w-5 h-5 text-teal-600 dark:text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
										</svg>
									</div>
									<div>
										<p className="font-medium text-gray-800 dark:text-white">SPPL</p>
										<p className="text-sm text-gray-600 dark:text-gray-400">Surat pernyataan pengelolaan lingkungan</p>
									</div>
								</div>
								<svg className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
								</svg>
							</Link>
						</div>
					</div>

					{/* Untuk Peneliti/Akademisi */}
					<div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300">
						<div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6">
							<div className="flex items-center justify-between">
								<div>
									<h3 className="text-xl font-bold text-white mb-2">Untuk Peneliti</h3>
									<p className="text-purple-100 text-sm">Data dan riset lingkungan</p>
								</div>
								<div className="bg-white/20 rounded-full p-3">
									<svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
									</svg>
								</div>
							</div>
						</div>
						<div className="p-6 space-y-4">
							<Link href="/data/kualitas-udara" className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group">
								<div className="flex items-center">
									<div className="bg-cyan-100 dark:bg-cyan-900/50 rounded-lg p-2 mr-3">
										<svg className="w-5 h-5 text-cyan-600 dark:text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
										</svg>
									</div>
									<div>
										<p className="font-medium text-gray-800 dark:text-white">Data Kualitas Udara</p>
										<p className="text-sm text-gray-600 dark:text-gray-400">Monitoring real-time udara kota</p>
									</div>
								</div>
								<svg className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
								</svg>
							</Link>

							<Link href="/data/limbah" className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group">
								<div className="flex items-center">
									<div className="bg-indigo-100 dark:bg-indigo-900/50 rounded-lg p-2 mr-3">
										<svg className="w-5 h-5 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
										</svg>
									</div>
									<div>
										<p className="font-medium text-gray-800 dark:text-white">Data Pengelolaan Limbah</p>
										<p className="text-sm text-gray-600 dark:text-gray-400">Statistik dan laporan limbah</p>
									</div>
								</div>
								<svg className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
								</svg>
							</Link>

							<Link href="/penelitian/kolaborasi" className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group">
								<div className="flex items-center">
									<div className="bg-pink-100 dark:bg-pink-900/50 rounded-lg p-2 mr-3">
										<svg className="w-5 h-5 text-pink-600 dark:text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
										</svg>
									</div>
									<div>
										<p className="font-medium text-gray-800 dark:text-white">Kolaborasi Penelitian</p>
										<p className="text-sm text-gray-600 dark:text-gray-400">Kerjasama riset lingkungan</p>
									</div>
								</div>
								<svg className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
								</svg>
							</Link>
						</div>
					</div>
				</div>
			</div>

			{/* Agenda Section */}
			<div className="max-w-6xl mx-auto px-4 mb-16">
				<div className="text-center mb-8">
					<h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
						Agenda Kegiatan
					</h2>
					<p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
						Jadwal kegiatan, acara, dan program lingkungan hidup di Kota Tasikmalaya
					</p>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
					{/* Kolom Kiri - Agenda Terbaru */}
					<div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
						<div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4">
							<h3 className="text-lg font-bold text-white flex items-center">
								<svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
								</svg>
								Agenda Terbaru
							</h3>
						</div>
						<div className="p-6 space-y-4">
							{/* Agenda Item 1 */}
							<div className="group cursor-pointer border-l-4 border-green-500 pl-4 hover:bg-gray-50 dark:hover:bg-gray-700 p-3 rounded-r-lg transition-colors">
								<div className="flex items-start justify-between">
									<div className="flex-1">
										<h4 className="font-medium text-gray-800 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
											Workshop Pengelolaan Sampah Organik
										</h4>
										<p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
											Pelatihan pembuatan kompos dan pengelolaan sampah organik untuk masyarakat.
										</p>
										<div className="flex items-center mt-2 text-xs text-gray-500 dark:text-gray-400">
											<svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
											</svg>
											22 Juli 2025
											<svg className="w-4 h-4 ml-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
											</svg>
											08:00 - 12:00
										</div>
									</div>
									<span className="text-xs bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 px-2 py-1 rounded-full ml-3 flex-shrink-0">
										Mendatang
									</span>
								</div>
							</div>

							{/* Agenda Item 2 */}
							<div className="group cursor-pointer border-l-4 border-blue-500 pl-4 hover:bg-gray-50 dark:hover:bg-gray-700 p-3 rounded-r-lg transition-colors">
								<div className="flex items-start justify-between">
									<div className="flex-1">
										<h4 className="font-medium text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
											Sosialisasi AMDAL untuk Industri
										</h4>
										<p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
											Sosialisasi prosedur dan persyaratan AMDAL untuk pelaku industri di Tasikmalaya.
										</p>
										<div className="flex items-center mt-2 text-xs text-gray-500 dark:text-gray-400">
											<svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
											</svg>
											25 Juli 2025
											<svg className="w-4 h-4 ml-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
											</svg>
											13:00 - 16:00
										</div>
									</div>
									<span className="text-xs bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full ml-3 flex-shrink-0">
										Mendatang
									</span>
								</div>
							</div>

							{/* Agenda Item 3 */}
							<div className="group cursor-pointer border-l-4 border-purple-500 pl-4 hover:bg-gray-50 dark:hover:bg-gray-700 p-3 rounded-r-lg transition-colors">
								<div className="flex items-start justify-between">
									<div className="flex-1">
										<h4 className="font-medium text-gray-800 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
											Monitoring Kualitas Air Sungai
										</h4>
										<p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
											Pemantauan rutin kualitas air sungai-sungai utama di Kota Tasikmalaya.
										</p>
										<div className="flex items-center mt-2 text-xs text-gray-500 dark:text-gray-400">
											<svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
											</svg>
											28 Juli 2025
											<svg className="w-4 h-4 ml-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
											</svg>
											07:00 - 11:00
										</div>
									</div>
									<span className="text-xs bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 px-2 py-1 rounded-full ml-3 flex-shrink-0">
										Mendatang
									</span>
								</div>
							</div>

							{/* Link Lihat Semua */}
							<div className="pt-4 border-t border-gray-200 dark:border-gray-600">
								<Link href="/informasi/agenda" className="text-center block text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium">
									Lihat Semua Agenda →
								</Link>
							</div>
						</div>
					</div>

					{/* Kolom Kanan - Agenda Bulan Ini */}
					<div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
						<div className="bg-gradient-to-r from-green-500 to-green-600 p-4">
							<div className="flex items-center justify-between">
								<h3 className="text-lg font-bold text-white flex items-center">
									<svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
									</svg>
									{agendaMonthNames[currentAgendaMonth]} {currentAgendaYear}
								</h3>
								<div className="flex space-x-1">
									<button
										onClick={() => navigateAgendaMonth('prev')}
										className="p-1.5 rounded-md bg-white/20 hover:bg-white/30 text-white transition-colors"
										title="Bulan Sebelumnya"
									>
										<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
										</svg>
									</button>
									<button
										onClick={() => navigateAgendaMonth('next')}
										className="p-1.5 rounded-md bg-white/20 hover:bg-white/30 text-white transition-colors"
										title="Bulan Selanjutnya"
									>
										<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
										</svg>
									</button>
								</div>
							</div>
						</div>
						<div className="p-6">
							{/* Calendar Mini */}
							<div className="grid grid-cols-7 gap-1 mb-4">
								{/* Header Hari */}
								{['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map((day) => (
									<div key={day} className="text-center text-xs font-medium text-gray-500 dark:text-gray-400 p-2">
										{day}
									</div>
								))}
								
								{/* Tanggal */}
								{agendaDays.map((date, index) => (
									<div key={index} className="aspect-square">
										{date ? (
											<div 
												className={`w-full h-full flex items-center justify-center text-sm rounded cursor-pointer transition-colors ${
													isToday(date)
														? 'bg-blue-500 text-white font-bold shadow-lg'
														: agendaDatesWithEvents.includes(date) 
														? 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 font-semibold hover:bg-green-200 dark:hover:bg-green-800' 
														: 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
												}`}
												title={
													isToday(date) 
														? 'Hari ini' 
														: agendaDatesWithEvents.includes(date) 
														? 'Ada agenda pada tanggal ini' 
														: ''
												}
											>
												{date}
											</div>
										) : (
											<div></div>
										)}
									</div>
								))}
							</div>

							{/* Agenda Ringkas */}
							<div className="space-y-3">
								<h4 className="font-semibold text-gray-800 dark:text-white text-sm border-b border-gray-200 dark:border-gray-600 pb-2">
									Kegiatan {agendaMonthNames[currentAgendaMonth]} {currentAgendaYear}
								</h4>
								
								{agendaEvents.length > 0 ? (
									<div className="space-y-2">
										{agendaEvents.map((event, index) => (
											<div key={index} className="flex items-center text-sm">
												<div className={`w-2 h-2 rounded-full mr-2 flex-shrink-0 ${
													event.color === 'green' ? 'bg-green-500' :
													event.color === 'blue' ? 'bg-blue-500' :
													event.color === 'purple' ? 'bg-purple-500' : 'bg-gray-500'
												}`}></div>
												<span className="text-gray-600 dark:text-gray-400 text-xs mr-2">
													{event.date} {agendaMonthNames[currentAgendaMonth].substring(0, 3)}
												</span>
												<span className="text-gray-800 dark:text-white">{event.title}</span>
											</div>
										))}
									</div>
								) : (
									<div className="text-center py-4">
										<div className="text-gray-400 text-sm">
											📅 Tidak ada kegiatan untuk bulan ini
										</div>
									</div>
								)}

								{/* Summary */}
								<div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 mt-4">
									<div className="text-center">
										<p className="text-2xl font-bold text-green-600 dark:text-green-400">
											{agendaEvents.length}
										</p>
										<p className="text-xs text-gray-600 dark:text-gray-400">
											Total Kegiatan {agendaMonthNames[currentAgendaMonth]}
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
