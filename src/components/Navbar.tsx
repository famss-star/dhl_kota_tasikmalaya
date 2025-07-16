"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
	const navItems = [
	{ name: "Beranda", href: "/" },
	{
		name: "Profil",
		href: "/profil",
		submenu: [
			{ name: "Profil", href: "/profil" },
			{ name: "Tentang DLH Kota Tasikmalaya", href: "/profil/tentang" },			
			{ name: "Tugas Pokok & Fungsi", href: "/profil/tentang#tupoksi" },
			{ name: "Visi & Misi", href: "/profil/tentang#visi" },
			{ name: "Struktur Organisasi", href: "/profil/struktur-organisasi" },
		],
	},
	{
		name: "Bidang",
		href: "/bidang",
		submenu: [
			{ name: "Bidang Tata Lingkungan", href: "/bidang/tata-lingkungan" },
			{ name: "Bidang Pengendalian Pencemaran & Penataan Hukum", href: "/bidang/pencemaran" },
			{ name: "Bidang Pengelolaan Sampah", href: "/bidang/sampah" },
		],
	},
	{
		name: "Pelayanan",
		href: "/pelayanan",
		submenu: [
			{ name: "Perizinan AMDAL", href: "/pelayanan/amdal" },
			{ name: "Perizinan IPLC", href: "/pelayanan/iplc" },
			{ name: "Perizinan SPPL", href: "/pelayanan/sppl" },
			{ name: "Perizinan UKL-UPL", href: "/pelayanan/ukl-upl" },
		],
	},
	{
		name: "Dokumen",
		href: "/dokumen",
		submenu: [
			{ name: "Peraturan Walikota", href: "/dokumen/peraturan" },
			{ name: "SOP Instalasi Pengolahan Air Limbah", href: "/dokumen/sop-ipal" },
			{ name: "SOP Pengendali Emisi", href: "/dokumen/sop-emisi" },
			{ name: "Download File", href: "/file-download" },
		],
	},
	{
		name: "Informasi",
		href: "/informasi",
		submenu: [
			{ name: "Berita & Artikel", href: "/informasi/berita" },
			{ name: "Agenda Kegiatan", href: "/informasi/agenda" },
			{ name: "Panduan Perizinan Berusaha Untuk Usaha Mikro Dan Kecil (UMK	) Risiko Rendah Dan Badan Usaha", href: "/informasi/panduan-umk" },
		],
	},
	{
		name: "Galeri",
		href: "/galeri",
		submenu: [
			{ name: "Galeri Foto", href: "/galeri/foto" },
			{ name: "Galeri Video", href: "/galeri/video" },
		],
	},
	{
		name: "Kontak",
		href: "#footer",
	},
	{ name: "Pengaduan", href: "/pengaduan" },
	];

	const [openDropdown, setOpenDropdown] = useState<string | null>(null);
	const closeDropdownTimeout = React.useRef<NodeJS.Timeout | null>(null);
	const [mobileOpen, setMobileOpen] = useState(false);
	const [theme, setTheme] = useState<string>("light");
	const [language, setLanguage] = useState<string>("id");
	const [isScrolled, setIsScrolled] = useState(false);
	const [searchQuery, setSearchQuery] = useState<string>("");

	useEffect(() => {
		const handleScroll = () => {
			const scrollTop = window.scrollY;
			// Ubah angka 300 sesuai kebutuhan (dalam pixel)
			// 300 = navbar berubah hijau setelah scroll 300px
			setIsScrolled(scrollTop > 1050);
		};
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);
	const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const value = e.target.value;
		setLanguage(value);
		if (typeof window !== "undefined") {
			localStorage.setItem("lang", value);
		}
	};

	useEffect(() => {
		// Sync theme from localStorage
		if (typeof window !== "undefined") {
			const savedTheme = localStorage.getItem("theme");
			if (savedTheme) {
				setTheme(savedTheme);
				const html = document.documentElement;
				if (savedTheme === "dark") {
					html.classList.add("dark");
				} else {
					html.classList.remove("dark");
				}
			}
			const savedLang = localStorage.getItem("lang");
			if (savedLang) setLanguage(savedLang);
		}
	}, []);

	const handleDropdown = (name: string) => {
		setOpenDropdown((prev) => (prev === name ? null : name));
	};

	const handleThemeToggle = () => {
		if (typeof window !== "undefined") {
			const html = document.documentElement;
			if (theme === "dark") {
				html.classList.remove("dark");
				setTheme("light");
				localStorage.setItem("theme", "light");
			} else {
				html.classList.add("dark");
				setTheme("dark");
				localStorage.setItem("theme", "dark");
			}
		}
	};

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		if (searchQuery.trim()) {
			// Implementasi pencarian - bisa redirect ke halaman pencarian
			console.log("Searching for:", searchQuery);
			// window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
		}
	};

	return (
		<>
			<nav className={`px-4 py-3 shadow sticky top-0 z-50 transition-all duration-300 ease-in-out ${
				isScrolled 
					? 'bg-green-700 text-white backdrop-blur-sm' 
					: 'bg-white/50 dark:bg-black/50 backdrop-blur-md text-gray-800 dark:text-white border-b border-gray-200/30 dark:border-white/20'
			}`} style={{ position: 'sticky', top: 0 }}>
				<div className="container mx-auto flex items-center justify-between relative">
					<Link href="/" className="flex items-center gap-2 group">
						<img
							src="https://portal.tasikmalayakota.go.id/assets/uploads/logo-dlh.png"
							alt="DLH Kota Tasikmalaya"
							className="h-15 w-15 object-contain transition-transform duration-300 ease-in-out group-hover:scale-110"
						/>
						<span className="font-bold text-lg sr-only">DLH Kota Tasikmalaya</span>
					</Link>

					{/* Burger menu button */}
					<button
						className="xl:hidden block text-gray-800 dark:text-white focus:outline-none ml-auto"
						onClick={() => setMobileOpen((prev) => !prev)}
						aria-label="Toggle menu"
					>
						<svg width="32" height="32" fill="none" viewBox="0 0 24 24">
							<path
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M4 6h16M4 12h16M4 18h16"
							/>
						</svg>
					</button>
					{/* Desktop menu */}
					<ul className="xl:flex gap-4 flex-wrap hidden">
						{navItems.map((item) => (
							<li key={item.name} className="relative group"
								onMouseEnter={() => {
									if (item.submenu) {
										if (closeDropdownTimeout.current) {
											clearTimeout(closeDropdownTimeout.current);
											closeDropdownTimeout.current = null;
										}
										setOpenDropdown(item.name);
									}
								}}
								onMouseLeave={() => {
									if (item.submenu) {
										closeDropdownTimeout.current = setTimeout(() => {
											setOpenDropdown(null);
										}, 400);
									}
								}}>							{item.submenu ? (
								<button
									className="px-2 py-1 rounded flex items-center gap-1 cursor-pointer"
									onClick={() => handleDropdown(item.name)}
									aria-haspopup="true"
									aria-expanded={openDropdown === item.name}
								>
									<span className="hover:font-bold transition-all">
										{item.name}
									</span>
									<svg 
										className={`ml-1 w-4 h-4 transition-transform duration-200 ${openDropdown === item.name ? 'rotate-180' : 'rotate-0'}`}
										fill="none" 
										viewBox="0 0 24 24" 
										stroke="currentColor"
									>
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
									</svg>
								</button>
							) : (
								<Link 
									href={item.href}
									className="px-2 py-1 rounded hover:font-bold transition-all flex items-center"
									onClick={item.name === "Kontak" ? (e) => {
										e.preventDefault();
										const footer = document.querySelector("footer");
										if (footer) {
											footer.scrollIntoView({ behavior: "smooth" });
										}
									} : undefined}
								>
									{item.name}
								</Link>
							)}
								{item.submenu && (
									<ul className={`absolute left-0 top-full bg-white/80 dark:bg-gray-800/90 backdrop-blur-xl text-gray-800 dark:text-white min-w-[180px] shadow-xl rounded-lg border border-gray-200/30 dark:border-gray-700/30 z-10 py-2 mt-4 transition-all duration-300 ease-in-out ${openDropdown === item.name ? 'opacity-100 translate-y-2 pointer-events-auto visible' : 'opacity-0 -translate-y-2 pointer-events-none invisible'}`}>
										{item.submenu.map((sub) => (
											<li key={sub.name}>
												{sub.href ? (
													<Link
														href={sub.href}
														className="block px-4 py-2 hover:bg-gray-100/70 dark:hover:bg-gray-700/70 rounded-md mx-1 transition-colors"
														onClick={() => setOpenDropdown(null)}
													>
														{sub.name}
													</Link>
												) : null}
											</li>
										))}
									</ul>
								)}
							</li>
						))}
					</ul>
					
					{/* Search Bar - Desktop */}
					<form onSubmit={handleSearch} className="hidden lg:flex items-center ml-4">
						<div className="relative">
							<input
								type="text"
								placeholder="Cari informasi..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className="w-64 px-4 py-2 pr-10 text-gray-800 bg-white/90 backdrop-blur-sm border border-white/30 rounded-full focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all"
							/>
							<button
								type="submit"
								className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600 hover:text-green-600 transition-colors"
								aria-label="Search"
							>
								<svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
								</svg>
							</button>
						</div>
					</form>

					{/* Tombol dark/light mode dan bahasa di paling kanan pada desktop */}
					<div className="items-center gap-4 ml-4 hidden lg:flex">
						<button
							className="text-gray-800 dark:text-white bg-gray-200/50 dark:bg-green-900 rounded-full p-2 hover:bg-gray-300/70 dark:hover:bg-green-600 transition-colors"
							aria-label="Toggle dark mode"
							onClick={handleThemeToggle}
						>
							<span className="sr-only">Toggle dark mode</span>
							<svg width="22" height="22" fill="none" viewBox="0 0 24 24">
								<path
									stroke="currentColor"
									strokeWidth="2"
									d="M12 3v1m0 16v1m8.485-8.485l-.707.707M4.222 19.778l-.707-.707M21 12h-1M4 12H3m16.263-5.263l-.707-.707M6.343 6.343l-.707-.707"
								/>
								<circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" />
							</svg>
						</button>
						<select
							className="bg-gray-200/50 dark:bg-green-900 text-gray-800 dark:text-white rounded px-2 py-1 focus:outline-none"
							aria-label="Pilih bahasa"
							value={language}
							onChange={handleLanguageChange}
						>
							<option value="id">ID</option>
							<option value="en">EN</option>
						</select>
					</div>
				</div>
			</nav>
			{/* Mobile dropdown content below navbar, pushes page down */}
			<div
				className={`xl:hidden w-full bg-green-800 text-white shadow-lg overflow-y-auto transition-all duration-300 ease-in-out origin-top ${mobileOpen ? 'scale-y-100 opacity-100 pointer-events-auto' : 'scale-y-0 opacity-0 pointer-events-none'}`}
				style={{ transform: mobileOpen ? 'scaleY(1)' : 'scaleY(0)', opacity: mobileOpen ? 1 : 0, maxHeight: mobileOpen ? '1000px' : '0px' }}
			>
				<ul className="flex flex-col gap-2 py-2 px-6">
					{/* Search Bar - Mobile */}
					<li className="mb-4">
						<form onSubmit={handleSearch} className="w-full">
							<div className="relative">
								<input
									type="text"
									placeholder="Cari informasi..."
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
									className="w-full px-4 py-2 pr-10 text-gray-800 bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-green-400 border border-gray-300"
								/>
								<button
									type="submit"
									className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600 hover:text-green-600 transition-colors"
									aria-label="Search"
								>
									<svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
									</svg>
								</button>
							</div>
						</form>
					</li>
					{navItems.map((item) => (
						<li key={item.name} className="relative">
							{item.submenu ? (
								<button
									className="w-full text-left px-2 py-2 rounded flex items-center gap-1 cursor-pointer"
									onClick={() => handleDropdown(item.name)}
									aria-haspopup="true"
									aria-expanded={openDropdown === item.name}
								>
									<span>{item.name}</span>
									<svg 
										className={`ml-1 w-4 h-4 transition-transform duration-200 ${openDropdown === item.name ? 'rotate-180' : 'rotate-0'}`}
										fill="none" 
										viewBox="0 0 24 24" 
										stroke="currentColor"
									>
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
									</svg>
								</button>
							) : (
								<Link 
									href={item.href}
									className="block w-full text-left px-2 py-2 rounded hover:bg-green-600 transition-colors"
									onClick={(e) => {
										if (item.name === "Kontak") {
											e.preventDefault();
											const footer = document.querySelector("footer");
											if (footer) {
												footer.scrollIntoView({ behavior: "smooth" });
											}
										}
										setMobileOpen(false);
									}}
								>
									{item.name}
								</Link>
							)}
							{item.submenu && openDropdown === item.name && (
								<ul className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md text-gray-800 dark:text-white rounded-lg border border-gray-200/30 dark:border-gray-700/30 mt-2 shadow-xl transition-all duration-300 ease-in-out">
									{item.submenu.map((sub) => (
										<li key={sub.name}>
											{sub.href ? (
												<Link
													href={sub.href}
													className="block px-4 py-2 hover:bg-gray-100/70 dark:hover:bg-gray-700/70 rounded-md mx-1 transition-colors"
													onClick={() => {
														setOpenDropdown(null);
														setMobileOpen(false);
													}}
												>
													{sub.name}
												</Link>
											) : null}
										</li>
									))}
								</ul>
							)}
						</li>
					))}
				</ul>
				<div className="flex flex-col items-start gap-4 mt-6 ml-2 pl-4">
					<button
						className="text-white bg-green-900 rounded-full p-2 hover:bg-green-600 transition-colors"
						aria-label="Toggle dark mode"
						onClick={handleThemeToggle}
					>
						<span className="sr-only">Toggle dark mode</span>
						<svg width="22" height="22" fill="none" viewBox="0 0 24 24">
							<path
								stroke="currentColor"
								strokeWidth="2"
								d="M12 3v1m0 16v1m8.485-8.485l-.707.707M4.222 19.778l-.707-.707M21 12h-1M4 12H3m16.263-5.263l-.707-.707M6.343 6.343l-.707-.707"
							/>
							<circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" />
						</svg>
					</button>
					<select
						className="bg-green-900 text-white rounded px-2 py-1 focus:outline-none"
						aria-label="Pilih bahasa"
						value={language}
						onChange={handleLanguageChange}
					>
						<option value="id">ID</option>
						<option value="en">EN</option>
					</select>
				</div>
			</div>
		</>
	);
}
