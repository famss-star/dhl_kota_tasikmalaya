"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  // --- NAV ITEMS ---
  const navItems = [
	{ name: "Beranda", href: "/" },
	{
	  name: "Profil",
	  submenu: [
		{ name: "Profil", href: "/profil" },
		{ name: "Tentang DLH Kota Tasikmalaya", href: "/profil/tentang" },
		{ name: "Tugas Pokok & Fungsi", href: "/profil/tentang#tupoksi" },
		{ name: "Visi & Misi", href: "/profil/tentang#visi" },
		{ name: "Struktur Organisasi", href: "/profil/struktur-organisasi" },
		{ name: "Bidang Umum", href: "/bidang" },
		{ name: "Bidang Tata Lingkungan", href: "/bidang/tata-lingkungan" },
		{ name: "Bidang Pengendalian Pencemaran & Penataan Hukum", href: "/bidang/pencemaran" },
		{ name: "Bidang Pengelolaan Sampah", href: "/bidang/sampah" },
	  ],
	},
	{
	  name: "Layanan Publik",
	  submenu: [
		{ name: "Perizinan Umum", href: "/pelayanan" },
		{ name: "Perizinan AMDAL", href: "/pelayanan/amdal" },
		{ name: "Perizinan IPLC", href: "/pelayanan/iplc" },
		{ name: "Perizinan SPPL", href: "/pelayanan/sppl" },
		{ name: "Perizinan UKL-UPL", href: "/pelayanan/ukl-upl" },
		{ name: "Pengaduan", href: "/pengaduan" },
		{ name: "Kontak", href: "#footer" },
	  ],
	},
	{
	  name: "Informasi & Dokumen",
	  submenu: [
		{ name: "Informasi Umum", href: "/informasi" },
		{ name: "Berita & Artikel", href: "/informasi/berita" },
		{ name: "Agenda Kegiatan", href: "/informasi/agenda" },
		{ name: "Panduan Perizinan Berusaha Untuk Usaha Mikro Dan Kecil (UMK) Risiko Rendah Dan Badan Usaha", href: "/informasi/panduan-umk" },
		{ name: "Dokumen Umum", href: "/dokumen" },
		{ name: "Peraturan Walikota", href: "/dokumen/peraturan" },
		{ name: "SOP Instalasi Pengolahan Air Limbah", href: "/dokumen/sop-ipal" },
		{ name: "SOP Pengendali Emisi", href: "/dokumen/sop-emisi" },
		{ name: "Download File", href: "/file-download" },
		{ name: "Galeri Umum", href: "/galeri" },
		{ name: "Galeri Foto", href: "/galeri/foto" },
		{ name: "Galeri Video", href: "/galeri/video" },
	  ],
	},
  ];

  // --- STATE ---
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [submenuHighlight, setSubmenuHighlight] = useState<string | null>(null);

  // Set default highlight for Layanan Publik & Informasi & Dokumen
  useEffect(() => {
	if (openDropdown === "Layanan Publik") {
	  setSubmenuHighlight("Perizinan Umum");
	} else if (openDropdown === "Informasi & Dokumen") {
	  setSubmenuHighlight("Informasi Umum");
	} else if (openDropdown === "Profil") {
	  setSubmenuHighlight(null); // Profil handled by its own effect
	} else {
	  setSubmenuHighlight(null);
	}
  }, [openDropdown]);

  // Untuk animasi transisi highlight preview Profil
  const [profilAnimKey, setProfilAnimKey] = useState(0);
  const [profilCurrent, setProfilCurrent] = useState<{title: string, desc: string}>({title: "Profil", desc: profilHighlight("Profil")});
  useEffect(() => {
	if (openDropdown === "Profil") {
	  const title = submenuHighlight || "Profil";
	  const desc = profilHighlight(title);
	  setProfilCurrent({title, desc});
	  setProfilAnimKey(prev => prev + 1); // trigger animasi
	}
  }, [submenuHighlight, openDropdown]);

  // Untuk animasi transisi highlight preview Layanan Publik
  const [layananAnimKey, setLayananAnimKey] = useState(0);
  useEffect(() => {
	if (openDropdown === "Layanan Publik") {
	  setLayananAnimKey(prev => prev + 1);
	}
  }, [submenuHighlight, openDropdown]);

  // Untuk animasi transisi highlight preview Informasi & Dokumen
  const [infoAnimKey, setInfoAnimKey] = useState(0);
  useEffect(() => {
	if (openDropdown === "Informasi & Dokumen") {
	  setInfoAnimKey(prev => prev + 1);
	}
  }, [submenuHighlight, openDropdown]);
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


  // --- HIGHLIGHT LOGIC ---
  function layananPublikHighlight(name: string) {
	switch (name) {
	  case "Perizinan Umum": return "Layanan perizinan umum untuk masyarakat dan pelaku usaha.";
	  case "Perizinan AMDAL": return "Layanan perizinan Analisis Mengenai Dampak Lingkungan (AMDAL).";
	  case "Perizinan IPLC": return "Layanan perizinan Instalasi Pengolahan Limbah Cair (IPLC).";
	  case "Perizinan SPPL": return "Layanan perizinan Surat Pernyataan Pengelolaan Lingkungan (SPPL).";
	  case "Perizinan UKL-UPL": return "Layanan perizinan Upaya Pengelolaan Lingkungan dan Upaya Pemantauan Lingkungan (UKL-UPL).";
	  case "Pengaduan": return "Layanan pengaduan masyarakat terkait lingkungan hidup.";
	  case "Kontak": return "Informasi kontak Dinas Lingkungan Hidup Kota Tasikmalaya.";
	  default: return name;
	}
  }

  function informasiDokumenHighlight(name: string) {
	if (name.includes("Informasi")) return "Akses berbagai informasi umum terkait lingkungan hidup.";
	if (name.includes("Berita")) return "Berita dan artikel seputar kegiatan dan isu lingkungan.";
	if (name.includes("Agenda")) return "Agenda kegiatan Dinas Lingkungan Hidup Kota Tasikmalaya.";
	if (name.includes("Panduan")) return "Panduan perizinan usaha mikro dan kecil.";
	if (name.includes("Dokumen")) return "Dokumen-dokumen penting terkait lingkungan hidup.";
	if (name.includes("Peraturan")) return "Peraturan Walikota terkait lingkungan hidup.";
	if (name.includes("SOP")) return "Standar Operasional Prosedur (SOP) lingkungan hidup.";
	if (name.includes("Galeri")) return "Galeri foto dan video kegiatan DLH Kota Tasikmalaya.";
	if (name.includes("Download")) return "Download file dan dokumen lingkungan hidup.";
	return name;
  }

  function profilHighlight(name: string) {
	switch (name) {
	  case "Profil":
		return "Profil singkat Dinas Lingkungan Hidup Kota Tasikmalaya.";
	  case "Tentang DLH Kota Tasikmalaya":
		return "Informasi tentang DLH Kota Tasikmalaya, visi, misi, dan sejarah.";
	  case "Tugas Pokok & Fungsi":
		return "Penjelasan tugas pokok dan fungsi DLH Kota Tasikmalaya.";
	  case "Visi & Misi":
		return "Visi dan misi DLH Kota Tasikmalaya.";
	  case "Struktur Organisasi":
		return "Struktur organisasi DLH Kota Tasikmalaya.";
	  case "Bidang Umum":
		return "Bidang Umum: Mengelola administrasi dan tata usaha DLH.";
	  case "Bidang Tata Lingkungan":
		return "Bidang Tata Lingkungan: Mengelola tata lingkungan hidup di Kota Tasikmalaya.";
	  case "Bidang Pengendalian Pencemaran & Penataan Hukum":
		return "Bidang Pengendalian Pencemaran & Penataan Hukum: Mengendalikan pencemaran dan penataan hukum lingkungan.";
	  case "Bidang Pengelolaan Sampah":
		return "Bidang Pengelolaan Sampah: Mengelola persampahan dan limbah di Kota Tasikmalaya.";
	  default:
		return "Dinas Lingkungan Hidup Kota Tasikmalaya merupakan unsur pelaksana urusan pemerintahan di bidang lingkungan hidup yang berkomitmen memberikan pelayanan terbaik kepada masyarakat.";
	}
  }

  // --- DROPDOWN LOGIC ---
  const openMenu = (name: string) => {
	if (closeDropdownTimeout.current) {
	  clearTimeout(closeDropdownTimeout.current);
	  closeDropdownTimeout.current = null;
	}
	setOpenDropdown(name);
  };

  const closeMenu = () => {
	setOpenDropdown(null);
  };

  const scheduleCloseMenu = () => {
	closeDropdownTimeout.current = setTimeout(() => {
	  setOpenDropdown(null);
	}, 400);
  };

  const cancelCloseMenu = () => {
	if (closeDropdownTimeout.current) {
	  clearTimeout(closeDropdownTimeout.current);
	  closeDropdownTimeout.current = null;
	}
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
				<div className="container mx-auto flex items-center justify-between relative min-w-0">
					{/* Kiri: Logo */}
					<div className="flex items-center min-w-0">
						<Link 
							href="/" 
							className="flex items-center gap-2 group min-w-0"
							>
							<img
								src="https://portal.tasikmalayakota.go.id/assets/uploads/logo-dlh.png"
								alt="DLH Kota Tasikmalaya"
								className="h-[60px] w-[60px] object-contain transition-transform duration-300 ease-in-out group-hover:scale-110"
							/>
							<span className="font-bold text-lg sr-only">DLH Kota Tasikmalaya</span>
						</Link>
					</div>

					{/* Tengah: Menu utama */}
					<div className="flex-1 flex items-center min-w-0 justify-center">
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
						<ul className="xl:flex gap-4 flex-wrap hidden min-w-0">
							{navItems.map((item) => (
								<li
									key={item.name}
									className="relative group"
									onMouseEnter={() => item.submenu && openMenu(item.name)}
								>
									{item.submenu ? (
										<button
											className="px-2 py-1 rounded flex items-center gap-1 cursor-pointer"
											onClick={() => openDropdown === item.name ? closeMenu() : openMenu(item.name)}
											aria-haspopup="true"
											aria-expanded={openDropdown === item.name}
										>
											<span className="transition-all">
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
											className="px-2 py-1 rounded transition-all flex items-center"
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
									{openDropdown === item.name && item.submenu && (
										<div
											className="fixed left-0 top-[calc(100%+1px)] w-screen bg-white/90 dark:bg-gray-800/95 backdrop-blur-xl text-gray-800 dark:text-white shadow-2xl border-b border-gray-200/30 dark:border-gray-700/30 z-50 py-8 transition-all duration-300 ease-in-out"
											style={{}}
											onMouseLeave={scheduleCloseMenu}
											onMouseEnter={cancelCloseMenu}
										>
											<div className="container mx-auto px-8">
												<div className="flex flex-col md:flex-row gap-8 items-start">
													{/* Kolom kiri: highlight/preview */}
													<div className="mb-6 md:mb-0 md:w-1/4">
														{/* Animasi transisi judul dan deskripsi Profil */}
														{item.name === "Profil" && openDropdown === "Profil" ? (
															<>
																<div
																	key={profilAnimKey}
																	className="font-bold text-2xl mb-2 text-green-700 dark:text-green-300 transition-all duration-300 ease-in-out animate-fadein"
																	style={{willChange: 'opacity, transform'}}
																>
																	{profilCurrent.title}
																</div>
																<div
																	key={profilAnimKey + 1000}
																	className="text-gray-600 dark:text-gray-300 text-base min-h-[60px] transition-all duration-300 ease-in-out animate-fadein"
																	style={{willChange: 'opacity, transform'}}
																>
																	{profilCurrent.desc}
																</div>
															</>
														) : item.name === "Layanan Publik" && openDropdown === "Layanan Publik" ? (
															<>
																<div
																	key={"layanan-title-" + layananAnimKey}
																	className="font-bold text-2xl mb-2 text-green-700 dark:text-green-300 transition-all duration-300 ease-in-out animate-fadein"
																	style={{willChange: 'opacity, transform'}}
																>
																	{submenuHighlight || "Layanan Publik"}
																</div>
																<div
																	key={"layanan-desc-" + layananAnimKey}
																	className="text-gray-600 dark:text-gray-300 text-base min-h-[60px] transition-all duration-300 ease-in-out animate-fadein"
																	style={{willChange: 'opacity, transform'}}
																>
																	{submenuHighlight
																	? layananPublikHighlight(submenuHighlight)
																	: "Layanan perizinan, pengaduan, dan kontak publik DLH Kota Tasikmalaya."}
																</div>
															</>
														) : item.name === "Informasi & Dokumen" && openDropdown === "Informasi & Dokumen" ? (
															<>
																<div
																	key={"info-title-" + infoAnimKey}
																	className="font-bold text-2xl mb-2 text-green-700 dark:text-green-300 transition-all duration-300 ease-in-out animate-fadein"
																	style={{willChange: 'opacity, transform'}}
																>
																	{submenuHighlight || "Informasi & Dokumen"}
																</div>
																<div
																	key={"info-desc-" + infoAnimKey}
																	className="text-gray-600 dark:text-gray-300 text-base min-h-[60px] transition-all duration-300 ease-in-out animate-fadein"
																	style={{willChange: 'opacity, transform'}}
																>
																	{submenuHighlight
																	? informasiDokumenHighlight(submenuHighlight)
																	: "Akses informasi, dokumen, dan galeri kegiatan DLH Kota Tasikmalaya."}
																</div>
															</>
														) : (
															<>
																<div
																	key={item.name + "-title-" + (submenuHighlight || "default")}
																	className="font-bold text-2xl mb-2 text-green-700 dark:text-green-300"
																>
																	{item.name}
																</div>
																<div
																	key={item.name + "-desc-" + (submenuHighlight || "default")}
																	className="text-gray-600 dark:text-gray-300 text-base min-h-[60px]"
																>
																	{item.name === "Beranda"
																	? "Kembali ke halaman utama DLH Kota Tasikmalaya."
																	: null}
																</div>
															</>
														)}

													</div>
													{/* Kolom kanan: submenu dinamis */}
													{item.name === "Profil" ? (
														<div className="grid grid-cols-2 gap-6 md:w-3/4">
															{/* Kolom 1: Profil */}
															<div>
																<div className="font-semibold text-green-700 dark:text-green-300 mb-2">Profil</div>
																<div className="flex flex-col gap-2">
																	{item.submenu.filter(sub => ["Profil", "Tentang DLH Kota Tasikmalaya", "Tugas Pokok & Fungsi", "Visi & Misi", "Struktur Organisasi"].includes(sub.name)).map((sub) => (
																		<Link
																			key={sub.name}
																			href={sub.href}
																			className="block px-4 py-2 font-medium text-base hover:bg-green-600/30 dark:hover:bg-green-900/60 rounded-lg transition-colors"
																			onClick={() => setOpenDropdown(null)}
																			onMouseEnter={() => setSubmenuHighlight(sub.name)}
																			onFocus={() => setSubmenuHighlight(sub.name)}
																			onMouseLeave={() => setSubmenuHighlight(openDropdown === "Profil" ? null : submenuHighlight)}
																			onBlur={() => setSubmenuHighlight(openDropdown === "Profil" ? null : submenuHighlight)}
																		>
																			{sub.name}
																		</Link>
																	))}
																</div>
															</div>
															{/* Kolom 2: Bidang */}
															<div>
																<div className="font-semibold text-green-700 dark:text-green-300 mb-2">Bidang</div>
																<div className="flex flex-col gap-2">
																	{item.submenu.filter(sub => sub.name.startsWith("Bidang")).map((sub) => (
																		<Link
																			key={sub.name}
																			href={sub.href}
																			className="block px-4 py-2 font-medium text-base hover:bg-green-600/30 dark:hover:bg-green-900/60 rounded-lg transition-colors"
																			onClick={() => setOpenDropdown(null)}
																			onMouseEnter={() => setSubmenuHighlight(sub.name)}
																			onFocus={() => setSubmenuHighlight(sub.name)}
																			onMouseLeave={() => setSubmenuHighlight(openDropdown === "Profil" ? null : submenuHighlight)}
																			onBlur={() => setSubmenuHighlight(openDropdown === "Profil" ? null : submenuHighlight)}
																		>
																			{sub.name}
																		</Link>
																	))}
																</div>
															</div>
														</div>
													) : item.name === "Layanan Publik" ? (
														<div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:w-3/4">
															{/* Kolom 1: Perizinan */}
															<div>
																<div className="font-semibold text-green-700 dark:text-green-300 mb-2">Perizinan</div>
																<div className="flex flex-col gap-2">
																	{item.submenu.filter(sub => sub.name.includes("Perizinan")).map((sub) => (
																		<Link
																			key={sub.name}
																			href={sub.href}
																			className="block px-4 py-2 font-medium text-base hover:bg-green-600/30 dark:hover:bg-green-900/60 rounded-lg transition-colors"
																			onClick={() => setOpenDropdown(null)}
																			onMouseEnter={() => setSubmenuHighlight(sub.name)}
																			onFocus={() => setSubmenuHighlight(sub.name)}
																			onMouseLeave={() => setSubmenuHighlight("Perizinan Umum")}
																			onBlur={() => setSubmenuHighlight("Perizinan Umum")}
																		>
																			{sub.name}
																		</Link>
																	))}
																</div>
															</div>
															{/* Kolom 2: Layanan Publik Lainnya */}
															<div>
																<div className="font-semibold text-green-700 dark:text-green-300 mb-2">Layanan Lainnya</div>
																<div className="flex flex-col gap-2">
																	{item.submenu.filter(sub => !sub.name.includes("Perizinan")).map((sub) => (
																		<Link
																			key={sub.name}
																			href={sub.href}
																			className="block px-4 py-2 font-medium text-base hover:bg-green-600/30 dark:hover:bg-green-900/60 rounded-lg transition-colors"
																			onClick={() => setOpenDropdown(null)}
																			onMouseEnter={() => setSubmenuHighlight(sub.name)}
																			onFocus={() => setSubmenuHighlight(sub.name)}
																			onMouseLeave={() => setSubmenuHighlight("Perizinan Umum")}
																			onBlur={() => setSubmenuHighlight("Perizinan Umum")}
																		>
																			{sub.name}
																		</Link>
																	))}
																</div>
															</div>
														</div>
													) : item.name === "Informasi & Dokumen" ? (
														<div className="grid grid-cols-3 gap-6 md:w-3/4">
															{/* Kolom 1: Informasi */}
															<div>
																<div className="font-semibold text-green-700 dark:text-green-300 mb-2">Informasi</div>
																<div className="flex flex-col gap-2">
																	{item.submenu.filter(sub => sub.name.includes("Informasi") || sub.name.includes("Berita") || sub.name.includes("Agenda") || sub.name.includes("Panduan")).map((sub) => (
																		<Link
																			key={sub.name}
																			href={sub.href}
																			className="block px-4 py-2 font-medium text-base hover:bg-green-600/30 dark:hover:bg-green-900/60 rounded-lg transition-colors"
																			onClick={() => setOpenDropdown(null)}
																			onMouseEnter={() => setSubmenuHighlight(sub.name)}
																			onFocus={() => setSubmenuHighlight(sub.name)}
																			onMouseLeave={() => setSubmenuHighlight("Informasi Umum")}
																			onBlur={() => setSubmenuHighlight("Informasi Umum")}
																		>
																			{sub.name}
																		</Link>
																	))}
																</div>
															</div>
															{/* Kolom 2: Dokumen */}
															<div>
																<div className="font-semibold text-green-700 dark:text-green-300 mb-2">Dokumen</div>
																<div className="flex flex-col gap-2">
																	{item.submenu.filter(sub => sub.name.includes("Dokumen") || sub.name.includes("Peraturan") || sub.name.includes("SOP")).map((sub) => (
																		<Link
																			key={sub.name}
																			href={sub.href}
																			className="block px-4 py-2 font-medium text-base hover:bg-green-600/30 dark:hover:bg-green-900/60 rounded-lg transition-colors"
																			onClick={() => setOpenDropdown(null)}
																			onMouseEnter={() => setSubmenuHighlight(sub.name)}
																			onFocus={() => setSubmenuHighlight(sub.name)}
																			onMouseLeave={() => setSubmenuHighlight("Informasi Umum")}
																			onBlur={() => setSubmenuHighlight("Informasi Umum")}
																		>
																			{sub.name}
																		</Link>
																	))}
																</div>
															</div>
															{/* Kolom 3: Galeri */}
															<div>
																<div className="font-semibold text-green-700 dark:text-green-300 mb-2">Galeri</div>
																<div className="flex flex-col gap-2">
																	{item.submenu.filter(sub => sub.name.includes("Galeri") || sub.name.includes("Download")).map((sub) => (
																		<Link
																			key={sub.name}
																			href={sub.href}
																			className="block px-4 py-2 font-medium text-base hover:bg-green-600/30 dark:hover:bg-green-900/60 rounded-lg transition-colors"
																			onClick={() => setOpenDropdown(null)}
																			onMouseEnter={() => setSubmenuHighlight(sub.name)}
																			onFocus={() => setSubmenuHighlight(sub.name)}
																			onMouseLeave={() => setSubmenuHighlight("Informasi Umum")}
																			onBlur={() => setSubmenuHighlight("Informasi Umum")}
																		>
																			{sub.name}
																		</Link>
																	))}
																</div>
															</div>
														</div>
													) : (
														<div className="flex flex-col gap-2 md:w-3/4">
															{item.submenu.map((sub) => (
																<div key={sub.name}>
																	{sub.href ? (
																		<Link
																			href={sub.href}
																			className="block px-4 py-3 font-medium text-base hover:bg-green-100/80 dark:hover:bg-green-900/60 rounded-lg transition-colors"
																			onClick={() => setOpenDropdown(null)}
																		>
																			{sub.name}
																		</Link>
																	) : null}
																</div>
															))}
														</div>
													)}
												</div>
											</div>
										</div>
									)}
								</li>
							))}
						</ul>
					</div>

					{/* Kanan: Searchbar dan tombol */}
					<div className="flex items-center gap-4 ml-4 min-w-0">
						{/* Search Bar - Desktop */}
						<form onSubmit={handleSearch} className="hidden lg:flex items-center">
							<div className="relative">
								<input
									type="text"
									placeholder="Cari informasi..."
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
									className="w-64 px-4 py-2 pr-10 text-gray-800 bg-white/90 backdrop-blur-sm border border-gray/30 rounded-full focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all"
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
						<div className="items-center gap-4 hidden lg:flex">
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
							<div className="relative">
								<button
								className="flex items-center gap-2 bg-gray-200/50 dark:bg-green-900 text-gray-800 dark:text-white rounded-full px-4 py-1 focus:outline-none hover:bg-gray-300/70 dark:hover:bg-green-600 transition-colors"
								aria-label="Pilih bahasa"
								onClick={() => setShowLangDropdown((prev) => !prev)}
								type="button"
								>
								<span className="text-xl">
									{language === "id" ? "🇮🇩" : "🇬🇧"}
								</span>
								<svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
								</svg>
								</button>
								{showLangDropdown && (
								<div className="absolute right-0 mt-2 w-32 bg-white dark:bg-green-900 rounded-lg shadow-lg z-50 border border-gray-200 dark:border-green-700">
									<button
									className={`flex items-center gap-2 w-full px-4 py-2 text-left text-lg hover:bg-green-100 dark:hover:bg-green-800 rounded-lg transition-colors ${language === "id" ? "font-bold" : ""}`}
									onClick={() => { setLanguage("id"); if (typeof window !== "undefined") localStorage.setItem("lang", "id"); setShowLangDropdown(false); }}
									>
									<span className="text-xl">🇮🇩</span> <span>Indonesia</span>
									</button>
									<button
									className={`flex items-center gap-2 w-full px-4 py-2 text-left text-lg hover:bg-green-100 dark:hover:bg-green-800 rounded-lg transition-colors ${language === "en" ? "font-bold" : ""}`}
									onClick={() => { setLanguage("en"); if (typeof window !== "undefined") localStorage.setItem("lang", "en"); setShowLangDropdown(false); }}
									>
									<span className="text-xl">🇬🇧</span> <span>English</span>
									</button>
								</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</nav>
		</>
	);
}