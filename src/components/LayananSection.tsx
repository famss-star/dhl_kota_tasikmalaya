"use client";
import React from "react";
import Link from "next/link";

export default function LayananSection() {
	return (
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
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
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
						<Link href="/perizinan/amdal" className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group">
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

						<Link href="/perizinan/ukl-upl" className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group">
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

						<Link href="/perizinan/sppl" className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group">
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
	);
}
