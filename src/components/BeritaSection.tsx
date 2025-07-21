"use client";
import React from "react";
import Link from "next/link";

export default function BeritaSection() {
	return (
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
						{/* Kolom utama berita */}
						<div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
							{["Program Penanaman 1000 Pohon", "Kemudahan Akses Perizinan AMDAL", "Workshop Pengelolaan Sampah", "Sosialisasi Energi Terbarukan"].map((title, index) => (
								<div key={index} className="group cursor-pointer">
									<div className="bg-gray-100 dark:bg-gray-700 rounded-lg aspect-[16/9] mb-3 relative overflow-hidden">
										<div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
										<div className="absolute bottom-2 left-2">
											<span className="text-xs text-white bg-green-600 px-2 py-1 rounded">Kategori</span>
										</div>
									</div>
									<h3 className="font-medium text-gray-800 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-300 transition-colors line-clamp-2">
									{title}
									</h3>
									<p className="text-sm text-gray-600 dark:text-gray-400 mt-1">15 Juli 2025</p>
								</div>
							))}
						</div>

						{/* Sidebar: artikel & berita singkat */}
						<div className="flex flex-col gap-4 h-full min-h-[400px]">
							{/* Artikel */}
							<div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 flex-1 flex flex-col">
								<h3 className="font-semibold text-gray-800 dark:text-white text-sm mb-3">Artikel</h3>
								<div className="space-y-3 overflow-y-auto max-h-56">
									{["Pentingnya Edukasi Lingkungan", "Inovasi Pengelolaan Sampah", "Peran Komunitas"].map((title, idx) => (
										<div key={idx} className="group cursor-pointer flex gap-3">
											<div className="w-16 h-12 bg-gray-300 dark:bg-gray-600 rounded"></div>
											<div className="flex-1">
												<h4 className="text-xs font-medium text-gray-800 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-300 transition line-clamp-2">
												{title}
												</h4>
												<p className="text-xs text-gray-500 dark:text-gray-400 mt-1">13 Juli 2025</p>
											</div>
										</div>
									))}
								</div>
								<Link href="/informasi/artikel" className="block text-center text-xs text-green-600 mt-3 pt-2 border-t border-gray-300 dark:border-gray-600 font-medium">
									Lihat Semua Artikel
								</Link>
							</div>

							{/* Berita Singkat */}
							<div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 flex-1 flex flex-col">
								<h3 className="font-semibold text-gray-800 dark:text-white text-sm mb-3">Berita</h3>
								<div className="space-y-3 overflow-y-auto max-h-56">
									{["Monitoring Air Citanduy", "Program Bank Sampah", "Pemeriksaan Dokumen Industri"].map((title, idx) => (
										<div key={idx} className="group cursor-pointer flex gap-3">
											<div className="w-16 h-12 bg-gray-300 dark:bg-gray-600 rounded"></div>
											<div className="flex-1">
												<h4 className="text-xs font-medium text-gray-800 dark:text-white group-hover:text-green-600 transition line-clamp-2">
													{title}
												</h4>
												<p className="text-xs text-gray-500 dark:text-gray-400 mt-1">12 Juli 2025</p>
											</div>
										</div>
									))}
								</div>
								<Link href="/informasi/berita" className="block text-center text-xs text-green-600 mt-3 pt-2 border-t border-gray-300 dark:border-gray-600 font-medium">
									Lihat Semua Berita
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
