"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { User2, FileText, Info, Newspaper, BookOpen, CalendarDays, FileDown, Gavel, FileCog, Users, FileVideo, FileImage, Folder, Network, Trees, Factory, Trash2, Contact, Building, Files } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import ThemeToggle from "./ThemeToggle";
// Icon mapping for submenu items
	const submenuIcons: Record<string, React.ReactNode> = new Proxy({
		// Profil
		"Profil": <User2 className="w-4 h-4 mr-2 text-green-700 inline" />, 
		"Tentang DLH Kota Tasikmalaya": <Info className="w-4 h-4 mr-2 text-green-700 inline" />, 
		"Tugas Pokok & Fungsi": <Users className="w-4 h-4 mr-2 text-green-700 inline" />, 
		"Visi & Misi": <BookOpen className="w-4 h-4 mr-2 text-green-700 inline" />, 
		"Struktur Organisasi": <Network className="w-4 h-4 mr-2 text-green-700 inline" />, 
		"Bidang Umum": <Building className="w-4 h-4 mr-2 text-green-700 inline" />, 
		"Bidang Tata Lingkungan": <Trees className="w-4 h-4 mr-2 text-green-700 inline" />, 
		"Bidang Pengendalian Pencemaran dan Penataan Lingkungan Hidup": <Factory className="w-4 h-4 mr-2 text-green-700 inline" />, 
		"Bidang Pengelolaan Sampah": <Trash2 className="w-4 h-4 mr-2 text-green-700 inline" />, 
		// Layanan Publik
		"Perizinan Umum": <Folder className="w-4 h-4 mr-2 text-green-700 inline" />, 
		"Perizinan AMDAL": <FileText className="w-4 h-4 mr-2 text-green-700 inline" />, 
		"Perizinan IPLC": <FileText className="w-4 h-4 mr-2 text-green-700 inline" />, 
		"Perizinan SPPL": <FileText className="w-4 h-4 mr-2 text-green-700 inline" />, 
		"Perizinan UKL-UPL": <FileText className="w-4 h-4 mr-2 text-green-700 inline" />, 
		"Pengaduan": <Info className="w-4 h-4 mr-2 text-green-700 inline" />, 
		"Kontak": <Contact className="w-4 h-4 mr-2 text-green-700 inline" />, 
		// Informasi & Dokumen
		"Informasi": <Info className="w-4 h-4 mr-2 text-green-700 inline" />, 
		"Berita": <Newspaper className="w-4 h-4 mr-2 text-green-700 inline" />, 
		"Artikel": <BookOpen className="w-4 h-4 mr-2 text-green-700 inline" />, 
		"Agenda Kegiatan": <CalendarDays className="w-4 h-4 mr-2 text-green-700 inline" />, 
		"Panduan Perizinan Berusaha (UMK)": <BookOpen className="w-4 h-4 mr-2 text-green-700 inline" />, 
		"Dokumen": <Files className="w-4 h-4 mr-2 text-green-700 inline" />, 
		"Peraturan Walikota": <Gavel className="w-4 h-4 mr-2 text-green-700 inline" />, 
		"SOP Pengendali Emisi": <FileCog className="w-4 h-4 mr-2 text-green-700 inline" />, 
		"SOP Instalasi Pengolahan Air Limbah": <FileCog className="w-4 h-4 mr-2 text-green-700 inline" />, 
		"File Download": <FileDown className="w-4 h-4 mr-2 text-green-700 inline" />, 
		"Galeri": <Folder className="w-4 h-4 mr-2 text-green-700 inline" />, 
		"Galeri Foto": <FileImage className="w-4 h-4 mr-2 text-green-700 inline" />, 
		"Galeri Video": <FileVideo className="w-4 h-4 mr-2 text-green-700 inline" />, 
	}, {
			get: (target, name) =>
				name in target
					? target[name as keyof typeof target]
					: <FileText className="w-4 h-4 mr-2 text-green-700 inline" />
	});

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const [mounted, setMounted] = useState(false);
  
  // --- NAV ITEMS ---
  const navItems = [
	{ name: t('navbar.home'), href: "/" },
	{
	  name: t('navbar.profile'),
	  submenu: [
		{ name: t('navbar.profile'), href: "/profil" },
		{ name: t('navbar.about'), href: "/profil/tentang" },
		{ name: "Tugas Pokok & Fungsi", href: "/profil/tentang#tupoksi" },
		{ name: t('navbar.vision_mission'), href: "/profil/tentang#visi" },
		{ name: t('navbar.organizational_structure'), href: "/profil/struktur-organisasi" },
		{ name: t('navbar.departments'), href: "/bidang" },
		{ name: t('dept.environmental_planning'), href: "/bidang/tata-lingkungan" },
		{ name: t('dept.pollution_control'), href: "/bidang/pencemaran" },
		{ name: t('dept.waste_management'), href: "/bidang/sampah" },
	  ],
	},
	{
	  name: t('navbar.services'),
	  submenu: [
		{ name: t('navbar.general_permit'), href: "/pelayanan" },
		{ name: t('navbar.amdal_permit'), href: "/pelayanan/amdal" },
		{ name: t('navbar.iplc_permit'), href: "/pelayanan/iplc" },
		{ name: t('navbar.sppl_permit'), href: "/pelayanan/sppl" },
		{ name: t('navbar.ukl_upl_permit'), href: "/pelayanan/ukl-upl" },
		{ name: t('navbar.complaints'), href: "/pengaduan" },
		{ name: t('navbar.contact'), href: "#footer" },
	  ],
	},
	{
	  name: t('navbar.information') + " & " + t('navbar.documents'),
	  submenu: [
		{ name: t('navbar.information'), href: "/informasi" },
		{ name: t('navbar.news'), href: "/informasi/berita" },
		{ name: t('navbar.articles'), href: "/informasi/artikel" },
		{ name: t('navbar.agenda'), href: "/informasi/agenda" },
		{ name: t('navbar.umk_guidelines'), href: "/informasi/panduan-umk" },
		{ name: t('navbar.documents'), href: "/dokumen" },
		{ name: t('navbar.regulations'), href: "/dokumen/peraturan" },
		{ name: t('navbar.wwtp_sop'), href: "/dokumen/sop-ipal" },
		{ name: t('navbar.emission_sop'), href: "/dokumen/sop-emisi" },
		{ name: t('navbar.file_downloads'), href: "/file-download" },
		{ name: t('navbar.gallery'), href: "/galeri" },
		{ name: t('navbar.photo_gallery'), href: "/galeri/foto" },
		{ name: t('navbar.video_gallery'), href: "/galeri/video" },
	  ],
	},
  ];

  // --- STATE ---
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [submenuHighlight, setSubmenuHighlight] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

	useEffect(() => {
		// Sync language from localStorage
		if (typeof window !== "undefined") {
			const savedLang = localStorage.getItem("lang");
			if (savedLang && (savedLang === "id" || savedLang === "en")) setLanguage(savedLang);
		}
	}, [setLanguage]);

	// Set mounted state for hydration
	useEffect(() => {
		setMounted(true);
	}, []);

	// Close mobile menu when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as Element;
			const navbar = document.querySelector('nav');
			
			if (mobileMenuOpen && navbar && !navbar.contains(target)) {
				setMobileMenuOpen(false);
				setOpenDropdown(null);
			}
		};

		if (mobileMenuOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [mobileMenuOpen]);


  // --- HIGHLIGHT LOGIC ---
  function layananPublikHighlight(name: string) {
	switch (name) {
	  case "Perizinan Umum": 
		return "Layanan perizinan umum untuk masyarakat dan pelaku usaha.";
	  case "Perizinan AMDAL": 
		return "Layanan perizinan Analisis Mengenai Dampak Lingkungan (AMDAL).";
	  case "Perizinan IPLC": 
		return "Layanan perizinan Instalasi Pengolahan Limbah Cair (IPLC).";
	  case "Perizinan SPPL": 
		return "Layanan perizinan Surat Pernyataan Pengelolaan Lingkungan (SPPL).";
	  case "Perizinan UKL-UPL": 
		return "Layanan perizinan Upaya Pengelolaan Lingkungan dan Upaya Pemantauan Lingkungan (UKL-UPL).";
	  case "Pengaduan": 
		return "Layanan pengaduan masyarakat terkait lingkungan hidup.";
	  case "Kontak": 
		return "Informasi kontak Dinas Lingkungan Hidup Kota Tasikmalaya.";
	  default: 
		return name;
	}
  }

  function informasiDokumenHighlight(name: string) {
	switch (name) {
	  case "Informasi":
		return "Akses berbagai informasi umum terkait lingkungan hidup.";
	  case "Berita":
		return "Berita seputar kegiatan dan isu lingkungan.";
	  case "Artikel":
		return "Artikel-artikel edukatif tentang lingkungan hidup.";
	  case "Agenda":
		return "Agenda kegiatan Dinas Lingkungan Hidup Kota Tasikmalaya.";
	  case "Panduan":
		return "Panduan Perizinan Berusaha Untuk Usaha Mikro Dan Kecil (UMK) Risiko Rendah Dan Badan Usaha.";
	  case "Dokumen":
		return "Dokumen-dokumen penting terkait lingkungan hidup.";
	  case "Peraturan":
		return "Peraturan Walikota terkait lingkungan hidup.";
	  case "SOP":
		return "Standar Operasional Prosedur (SOP) lingkungan hidup.";
	  case "Galeri":
		return "Galeri foto dan video kegiatan DLH Kota Tasikmalaya.";
	  case "Download":
		return "Download file dan dokumen lingkungan hidup.";
	  default:
		return name;
	}
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
		return "Mengelola administrasi dan tata usaha DLH.";
	  case "Bidang Tata Lingkungan":
		return "Mengelola tata lingkungan hidup di Kota Tasikmalaya.";
	  case "Bidang Pengendalian Pencemaran & Penataan Hukum":
		return "Mengendalikan pencemaran dan penataan hukum lingkungan.";
	  case "Bidang Pengelolaan Sampah":
		return "Mengelola persampahan dan limbah di Kota Tasikmalaya.";
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
							<Image
								src="https://portal.tasikmalayakota.go.id/assets/uploads/logo-dlh.png"
								alt="DLH Kota Tasikmalaya"
								width={60}
								height={60}
								className="h-[60px] w-[60px] object-contain transition-transform duration-300 ease-in-out group-hover:scale-110"
								priority
							/>
							<span className="font-bold text-lg sr-only">DLH Kota Tasikmalaya</span>
						</Link>
					</div>

					{/* Tengah: Menu utama */}
					<div className="flex-1 flex items-center min-w-0 justify-center">
						{/* Burger menu button */}
						<button
							className="xl:hidden block text-gray-800 dark:text-white focus:outline-none ml-auto transition-all duration-200 hover:scale-110"
							onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
							aria-label="Toggle menu"
						>
							<svg width="32" height="32" fill="none" viewBox="0 0 24 24" className="transition-all duration-300">
								<path
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
									d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
									className="transition-all duration-300"
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
											className={`px-2 py-1 rounded flex items-center gap-1 cursor-pointer transition-all duration-200 hover:scale-105 ${
												isScrolled
													? 'hover:bg-green-900 dark:hover:bg-green-800'
													: 'hover:bg-green-100 dark:hover:bg-green-900/30'
											}`}
											onClick={() => openDropdown === item.name ? closeMenu() : openMenu(item.name)}
											aria-haspopup="true"
											aria-expanded={openDropdown === item.name}
										>
											<span className="transition-all flex items-center">
												{item.name}
											</span>
											<svg
												className={`ml-1 w-4 h-4 transition-all duration-300 ${openDropdown === item.name ? 'rotate-180 text-green-600' : 'rotate-0'}`}
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
											className={`px-2 py-1 rounded transition-all duration-200 flex items-center hover:scale-105 ${
												isScrolled
													? 'hover:bg-green-900 dark:hover:bg-green-800'
													: 'hover:bg-green-100 dark:hover:bg-green-900/30'
											}`}
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
											className="fixed left-0 top-[calc(100%+1px)] w-screen bg-white/90 dark:bg-gray-800/95 backdrop-blur-xl text-black dark:text-white shadow-2xl border-b border-gray-200/30 dark:border-gray-700/30 z-50 py-8 transition-all duration-300 ease-in-out transform animate-in slide-in-from-top-4 fade-in"
											style={{}}
											onMouseLeave={scheduleCloseMenu}
											onMouseEnter={cancelCloseMenu}
										>
											<div className="container mx-auto px-8">
												<div className="flex flex-col md:flex-row gap-8 items-start">
													{/* Kolom kiri: highlight/preview */}
													<div className="mb-6 md:mb-0 md:w-1/4 transform transition-all duration-500 ease-out animate-in slide-in-from-left-8 fade-in">
														{/* Animasi transisi judul dan deskripsi Profil */}
														{item.name === "Profil" && openDropdown === "Profil" ? (
															<>
																<div
																	key={profilAnimKey}
																	className="font-bold text-2xl mb-2 text-green-700 dark:text-green-300 transition-all duration-500 ease-out animate-in slide-in-from-bottom-4 fade-in"
																	style={{willChange: 'opacity, transform'}}
																>
																	{profilCurrent.title}
																</div>
																<div
																	key={profilAnimKey + 1000}
																	className="text-gray-600 dark:text-gray-300 text-base min-h-[60px] transition-all duration-500 ease-out animate-in slide-in-from-bottom-4 fade-in"
																	style={{willChange: 'opacity, transform', animationDelay: '100ms'}}
																>
																	{profilCurrent.desc}
																</div>
															</>
														) : item.name === "Layanan Publik" && openDropdown === "Layanan Publik" ? (
															<>
																<div
																	key={"layanan-title-" + layananAnimKey}
																	className="font-bold text-2xl mb-2 text-green-700 dark:text-green-300 transition-all duration-500 ease-out animate-in slide-in-from-bottom-4 fade-in"
																	style={{willChange: 'opacity, transform'}}
																>
																	{submenuHighlight || "Layanan Publik"}
																</div>
																<div
																	key={"layanan-desc-" + layananAnimKey}
																	className="text-gray-600 dark:text-gray-300 text-base min-h-[60px] transition-all duration-500 ease-out animate-in slide-in-from-bottom-4 fade-in"
																	style={{willChange: 'opacity, transform', animationDelay: '100ms'}}
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
																	className="font-bold text-2xl mb-2 text-green-700 dark:text-green-300 transition-all duration-500 ease-out animate-in slide-in-from-bottom-4 fade-in"
																	style={{willChange: 'opacity, transform'}}
																>
																	{submenuHighlight || "Informasi & Dokumen"}
																</div>
																<div
																	key={"info-desc-" + infoAnimKey}
																	className="text-gray-600 dark:text-gray-300 text-base min-h-[60px] transition-all duration-500 ease-out animate-in slide-in-from-bottom-4 fade-in"
																	style={{willChange: 'opacity, transform', animationDelay: '100ms'}}
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
																	className="font-bold text-2xl mb-2 text-green-700 dark:text-green-300 transition-all duration-500 ease-out animate-in slide-in-from-bottom-4 fade-in"
																>
																	{item.name}
																</div>
																<div
																	key={item.name + "-desc-" + (submenuHighlight || "default")}
																	className="text-gray-600 dark:text-gray-300 text-base min-h-[60px] transition-all duration-500 ease-out animate-in slide-in-from-bottom-4 fade-in"
																	style={{animationDelay: '100ms'}}
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
														<div className="grid grid-cols-2 gap-6 md:w-3/4 transform transition-all duration-500 ease-out animate-in slide-in-from-right-8 fade-in">
															{/* Kolom 1: Profil */}
															<div className="transform transition-all duration-300 ease-out animate-in slide-in-from-bottom-4 fade-in" style={{animationDelay: '150ms'}}>
																<div className="font-semibold text-green-700 dark:text-green-300 mb-2">Profil</div>
																<div className="flex flex-col gap-2">
																	{item.submenu.filter(sub => ["Profil", "Tentang DLH Kota Tasikmalaya", "Tugas Pokok & Fungsi", "Visi & Misi", "Struktur Organisasi"].includes(sub.name)).map((sub, index) => (
																		<Link
																			key={sub.name}
																			href={sub.href}
																			className="block px-4 py-2 font-medium text-base hover:bg-green-600/30 dark:hover:bg-green-900/60 rounded-lg transition-all duration-300 ease-out flex items-center hover:translate-x-3 hover:scale-[1.02] transform hover:shadow-md group"
																			style={{ 
																				animationDelay: `${(index + 3) * 75}ms` 
																			}}
																			onClick={() => setOpenDropdown(null)}
																			onMouseEnter={() => setSubmenuHighlight(sub.name)}
																			onFocus={() => setSubmenuHighlight(sub.name)}
																			onMouseLeave={() => setSubmenuHighlight(openDropdown === "Profil" ? null : submenuHighlight)}
																			onBlur={() => setSubmenuHighlight(openDropdown === "Profil" ? null : submenuHighlight)}
																		>
																			<span className="group-hover:scale-110 transition-transform duration-200">{submenuIcons[sub.name]}</span>
																			<span className="transition-colors duration-200">{sub.name}</span>
																		</Link>
																	))}
																</div>
															</div>
															{/* Kolom 2: Bidang */}
															<div className="transform transition-all duration-300 ease-out animate-in slide-in-from-bottom-4 fade-in" style={{animationDelay: '200ms'}}>
																<div className="font-semibold text-green-700 dark:text-green-300 mb-2">Bidang</div>
																<div className="flex flex-col gap-2">
																	{item.submenu.filter(sub => sub.name.startsWith("Bidang")).map((sub, index) => (
																		<Link
																			key={sub.name}
																			href={sub.href}
																			className="block px-4 py-2 font-medium text-base hover:bg-green-600/30 dark:hover:bg-green-900/60 rounded-lg transition-all duration-300 ease-out flex items-center hover:translate-x-3 hover:scale-[1.02] transform hover:shadow-md group"
																			style={{ 
																				animationDelay: `${(index + 8) * 75}ms` 
																			}}
																			onClick={() => setOpenDropdown(null)}
																			onMouseEnter={() => setSubmenuHighlight(sub.name)}
																			onFocus={() => setSubmenuHighlight(sub.name)}
																			onMouseLeave={() => setSubmenuHighlight(openDropdown === "Profil" ? null : submenuHighlight)}
																			onBlur={() => setSubmenuHighlight(openDropdown === "Profil" ? null : submenuHighlight)}
																		>
																			<span className="group-hover:scale-110 transition-transform duration-200">{submenuIcons[sub.name]}</span>
																			<span className="transition-colors duration-200">{sub.name}</span>
																		</Link>
																	))}
																</div>
															</div>
														</div>
													) : item.name === "Layanan Publik" ? (
														<div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:w-3/4 transform transition-all duration-500 ease-out animate-in slide-in-from-right-8 fade-in">
															{/* Kolom 1: Perizinan */}
															<div className="transform transition-all duration-300 ease-out animate-in slide-in-from-bottom-4 fade-in" style={{animationDelay: '150ms'}}>
																<div className="font-semibold text-green-700 dark:text-green-300 mb-2">Perizinan</div>
																<div className="flex flex-col gap-2">
																	{item.submenu.filter(sub => sub.name.includes("Perizinan")).map((sub, index) => (
																		<Link
																			key={sub.name}
																			href={sub.href}
																			className="block px-4 py-2 font-medium text-base hover:bg-green-600/30 dark:hover:bg-green-900/60 rounded-lg transition-all duration-300 ease-out flex items-center hover:translate-x-3 hover:scale-[1.02] transform hover:shadow-md group"
																			style={{ 
																				animationDelay: `${(index + 3) * 75}ms` 
																			}}
																			onClick={() => setOpenDropdown(null)}
																			onMouseEnter={() => setSubmenuHighlight(sub.name)}
																			onFocus={() => setSubmenuHighlight(sub.name)}
																			onMouseLeave={() => setSubmenuHighlight("Perizinan Umum")}
																			onBlur={() => setSubmenuHighlight("Perizinan Umum")}
																		>
																			<span className="group-hover:scale-110 transition-transform duration-200">{submenuIcons[sub.name]}</span>
																			<span className="transition-colors duration-200">{sub.name}</span>
																		</Link>
																	))}
																</div>
															</div>
															{/* Kolom 2: Layanan Publik Lainnya */}
															<div className="transform transition-all duration-300 ease-out animate-in slide-in-from-bottom-4 fade-in" style={{animationDelay: '200ms'}}>
																<div className="font-semibold text-green-700 dark:text-green-300 mb-2">Layanan Lainnya</div>
																<div className="flex flex-col gap-2">
																	{item.submenu.filter(sub => !sub.name.includes("Perizinan")).map((sub, index) => (
																		<Link
																			key={sub.name}
																			href={sub.href}
																			className="block px-4 py-2 font-medium text-base hover:bg-green-600/30 dark:hover:bg-green-900/60 rounded-lg transition-all duration-300 ease-out flex items-center hover:translate-x-3 hover:scale-[1.02] transform hover:shadow-md group"
																			style={{ 
																				animationDelay: `${(index + 8) * 75}ms` 
																			}}
																			onClick={() => setOpenDropdown(null)}
																			onMouseEnter={() => setSubmenuHighlight(sub.name)}
																			onFocus={() => setSubmenuHighlight(sub.name)}
																			onMouseLeave={() => setSubmenuHighlight("Perizinan Umum")}
																			onBlur={() => setSubmenuHighlight("Perizinan Umum")}
																		>
																			<span className="group-hover:scale-110 transition-transform duration-200">{submenuIcons[sub.name]}</span>
																			<span className="transition-colors duration-200">{sub.name}</span>
																		</Link>
																	))}
																</div>
															</div>
														</div>
													) : item.name === "Informasi & Dokumen" ? (
														<div className="grid grid-cols-3 gap-6 md:w-3/4 transform transition-all duration-500 ease-out animate-in slide-in-from-right-8 fade-in">
															{/* Kolom 1: Informasi */}
															<div className="transform transition-all duration-300 ease-out animate-in slide-in-from-bottom-4 fade-in" style={{animationDelay: '150ms'}}>
																<div className="font-semibold text-green-700 dark:text-green-300 mb-2">Informasi</div>
																<div className="flex flex-col gap-2">
																	{item.submenu.filter(sub =>
																		sub.name.includes("Informasi") ||
																		sub.name.includes("Berita") ||
																		sub.name.includes("Agenda") ||
																		sub.name.includes("Panduan") ||
																		sub.name.includes("Artikel") ||
																		sub.name.includes("Blog")
																	).map((sub, index) => (
																		<Link
																			key={sub.name}
																			href={sub.href}
																			className="block px-4 py-2 font-medium text-base hover:bg-green-600/30 dark:hover:bg-green-900/60 rounded-lg transition-all duration-300 ease-out flex items-center hover:translate-x-3 hover:scale-[1.02] transform hover:shadow-md group"
																			style={{ 
																				animationDelay: `${(index + 3) * 75}ms` 
																			}}
																			onClick={() => setOpenDropdown(null)}
																			onMouseEnter={() => setSubmenuHighlight(sub.name)}
																			onFocus={() => setSubmenuHighlight(sub.name)}
																			onMouseLeave={() => setSubmenuHighlight("Informasi Umum")}
																			onBlur={() => setSubmenuHighlight("Informasi Umum")}
																		>
																			<span className="group-hover:scale-110 transition-transform duration-200">{submenuIcons[sub.name]}</span>
																			<span className="transition-colors duration-200">{sub.name}</span>
																		</Link>
																	))}
																</div>
															</div>
															{/* Kolom 2: Dokumen */}
															<div className="transform transition-all duration-300 ease-out animate-in slide-in-from-bottom-4 fade-in" style={{animationDelay: '200ms'}}>
																<div className="font-semibold text-green-700 dark:text-green-300 mb-2">Dokumen</div>
																<div className="flex flex-col gap-2">
																	{item.submenu.filter(sub => sub.name.includes("Dokumen") || sub.name.includes("Peraturan") || sub.name.includes("SOP")).map((sub, index) => (
																		<Link
																			key={sub.name}
																			href={sub.href}
																			className="block px-4 py-2 font-medium text-base hover:bg-green-600/30 dark:hover:bg-green-900/60 rounded-lg transition-all duration-300 ease-out flex items-center hover:translate-x-3 hover:scale-[1.02] transform hover:shadow-md group"
																			style={{ 
																				animationDelay: `${(index + 9) * 75}ms` 
																			}}
																			onClick={() => setOpenDropdown(null)}
																			onMouseEnter={() => setSubmenuHighlight(sub.name)}
																			onFocus={() => setSubmenuHighlight(sub.name)}
																			onMouseLeave={() => setSubmenuHighlight("Informasi Umum")}
																			onBlur={() => setSubmenuHighlight("Informasi Umum")}
																		>
																			<span className="group-hover:scale-110 transition-transform duration-200">{submenuIcons[sub.name]}</span>
																			<span className="transition-colors duration-200">{sub.name}</span>
																		</Link>
																	))}
																</div>
															</div>
															{/* Kolom 3: Galeri */}
															<div className="transform transition-all duration-300 ease-out animate-in slide-in-from-bottom-4 fade-in" style={{animationDelay: '250ms'}}>
																<div className="font-semibold text-green-700 dark:text-green-300 mb-2">Galeri</div>
																<div className="flex flex-col gap-2">
																	{item.submenu.filter(sub => sub.name.includes("Galeri") || sub.name.includes("Download")).map((sub, index) => (
																		<Link
																			key={sub.name}
																			href={sub.href}
																			className="block px-4 py-2 font-medium text-base hover:bg-green-600/30 dark:hover:bg-green-900/60 rounded-lg transition-all duration-300 ease-out flex items-center hover:translate-x-3 hover:scale-[1.02] transform hover:shadow-md group"
																			style={{ 
																				animationDelay: `${(index + 12) * 75}ms` 
																			}}
																			onClick={() => setOpenDropdown(null)}
																			onMouseEnter={() => setSubmenuHighlight(sub.name)}
																			onFocus={() => setSubmenuHighlight(sub.name)}
																			onMouseLeave={() => setSubmenuHighlight("Informasi Umum")}
																			onBlur={() => setSubmenuHighlight("Informasi Umum")}
																		>
																			<span className="group-hover:scale-110 transition-transform duration-200">{submenuIcons[sub.name]}</span>
																			<span className="transition-colors duration-200">{sub.name}</span>
																		</Link>
																	))}
																</div>
															</div>
														</div>
													) : (
														<div className="flex flex-col gap-2 md:w-3/4 transform transition-all duration-300 ease-in-out animate-in slide-in-from-right">
															{item.submenu.map((sub, index) => (
																<div key={sub.name}>
																	{sub.href ? (
																		<Link
																			href={sub.href}
																			className="block px-4 py-3 font-medium text-base hover:bg-green-100/80 dark:hover:bg-green-900/60 rounded-lg transition-all duration-200 hover:translate-x-2 hover:scale-105 transform"
																			style={{ 
																				animationDelay: `${index * 50}ms` 
																			}}
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
									className="w-64 px-4 py-2 pr-10 text-gray-800 bg-white/90 backdrop-blur-sm border border-gray/30 rounded-full focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-200 focus:scale-105 focus:shadow-lg"
								/>
								<button
									type="submit"
									className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600 hover:text-green-600 transition-all duration-200 hover:scale-110"
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
							{mounted && <ThemeToggle size="md" />}
							<div className="relative">
								<button
								className={`flex items-center gap-2 ${isScrolled ? 'bg-gray-200/50 text-black' : 'bg-gray-200/50 text-black'} dark:bg-green-900 dark:text-white rounded-full px-4 py-1 focus:outline-none hover:bg-gray-300/70 dark:hover:bg-green-600 transition-all duration-200 hover:scale-105 hover:shadow-lg`}
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
								<div className={`absolute right-0 mt-7 w-32 rounded-lg shadow-lg z-50 dark:transform transition-all duration-200 ease-out animate-in slide-in-from-top-2 fade-in ${isScrolled ? 'bg-green-700' : 'bg-white'} dark:bg-green-900`}>
									<button
									className={`flex items-center gap-2 w-full px-4 py-2 text-left text-lg hover:bg-green-600 dark:hover:bg-green-800 rounded-lg transition-all duration-200 hover:translate-x-1 ${language === "id" ? "font-bold" : ""} ${isScrolled ? 'bg-green-700 text-white' : ''}`}
									onClick={() => { setLanguage("id"); setShowLangDropdown(false); }}
									>
									<span className="text-xl">🇮🇩</span> <span>Indonesia</span>
									</button>
									<button
									className={`flex items-center gap-2 w-full px-4 py-2 text-left text-lg hover:bg-green-600 dark:hover:bg-green-800 rounded-lg transition-all duration-200 hover:translate-x-1 ${language === "en" ? "font-bold" : ""} ${isScrolled ? 'bg-green-700 text-white' : ''}`}
									onClick={() => { setLanguage("en"); setShowLangDropdown(false); }}
									>
									<span className="text-xl">🇬🇧</span> <span>English</span>
									</button>
								</div>
								)}
							</div>
						</div>
					</div>
				</div>

				{/* Mobile menu */}
				<div className={`xl:hidden overflow-hidden transition-all duration-300 ease-in-out ${
					mobileMenuOpen 
						? 'max-h-screen opacity-100' 
						: 'max-h-0 opacity-0'
				}`}>
					<div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl border-t border-gray-200/30 dark:border-gray-700/30">
						<div className="container mx-auto px-4 py-4">
							<ul className="space-y-2">
								{navItems.map((item, index) => (
									<li 
										key={item.name}
										className={`transform transition-all duration-300 ease-in-out ${
											mobileMenuOpen 
												? 'translate-x-0 opacity-100' 
												: '-translate-x-4 opacity-0'
										}`}
										style={{ 
											transitionDelay: mobileMenuOpen ? `${index * 50}ms` : '0ms' 
										}}
									>
										{item.submenu ? (
											<div>
												<button
													className="w-full text-left px-4 py-2 text-gray-800 dark:text-white hover:bg-green-100 dark:hover:bg-green-900/30 rounded-lg transition-all duration-200 flex items-center justify-between group"
													onClick={() => setOpenDropdown(openDropdown === item.name ? null : item.name)}
												>
													<span className="group-hover:translate-x-1 transition-transform duration-200">{item.name}</span>
													<svg
														className={`w-4 h-4 transition-all duration-300 ${openDropdown === item.name ? 'rotate-180 text-green-600' : 'rotate-0'}`}
														fill="none"
														viewBox="0 0 24 24"
														stroke="currentColor"
													>
														<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
													</svg>
												</button>
												<div className={`ml-4 mt-2 space-y-1 overflow-hidden transition-all duration-300 ease-in-out ${
													openDropdown === item.name 
														? 'max-h-96 opacity-100' 
														: 'max-h-0 opacity-0'
												}`}>
													{item.submenu.map((sub, subIndex) => (
														<Link
															key={sub.name}
															href={sub.href}
															className={`block px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-all duration-200 hover:translate-x-1 transform ${
																openDropdown === item.name 
																	? 'translate-x-0 opacity-100' 
																	: '-translate-x-2 opacity-0'
															}`}
															style={{ 
																transitionDelay: openDropdown === item.name ? `${subIndex * 30}ms` : '0ms' 
															}}
															onClick={() => {
																setMobileMenuOpen(false);
																setOpenDropdown(null);
															}}
														>
															{sub.name}
														</Link>
													))}
												</div>
											</div>
										) : (
											<Link
												href={item.href}
												className="block px-4 py-2 text-gray-800 dark:text-white hover:bg-green-100 dark:hover:bg-green-900/30 rounded-lg transition-all duration-200 hover:translate-x-1 transform"
												onClick={() => setMobileMenuOpen(false)}
											>
												{item.name}
											</Link>
										)}
									</li>
								))}
							</ul>
							
							{/* Mobile search */}
							<form 
								onSubmit={handleSearch} 
								className={`mt-4 transform transition-all duration-300 ease-in-out ${
									mobileMenuOpen 
										? 'translate-y-0 opacity-100' 
										: 'translate-y-4 opacity-0'
								}`}
								style={{ 
									transitionDelay: mobileMenuOpen ? '200ms' : '0ms' 
								}}
							>
								<div className="relative">
									<input
										type="text"
										placeholder="Cari informasi..."
										value={searchQuery}
										onChange={(e) => setSearchQuery(e.target.value)}
										className="w-full px-4 py-2 pr-10 text-gray-800 bg-white/90 backdrop-blur-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-200 focus:scale-105"
									/>
									<button
										type="submit"
										className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600 hover:text-green-600 transition-all duration-200 hover:scale-110"
										aria-label="Search"
									>
										<svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
										</svg>
									</button>
								</div>
							</form>

							{/* Mobile theme toggle and language */}
							<div 
								className={`flex items-center justify-between mt-4 transform transition-all duration-300 ease-in-out ${
									mobileMenuOpen 
										? 'translate-y-0 opacity-100' 
										: 'translate-y-4 opacity-0'
								}`}
								style={{ 
									transitionDelay: mobileMenuOpen ? '250ms' : '0ms' 
								}}
							>
								{mounted && <ThemeToggle size="sm" />}
								
								<div className="relative">
								<button
								className={`flex items-center gap-2 ${isScrolled ? 'bg-green-700 text-white' : 'bg-gray-200/50 text-black'} dark:bg-green-900 dark:text-white rounded-full px-4 py-1 focus:outline-none hover:bg-gray-300/70 dark:hover:bg-green-600 transition-all duration-200 hover:scale-105`}
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
										<div className="absolute right-0 mt-2 w-32 bg-white dark:bg-green-900 rounded-lg shadow-lg z-50 border border-gray-200 dark:border-green-700 transform transition-all duration-200 ease-out animate-in slide-in-from-top-2 fade-in">
											<button
												className={`flex items-center gap-2 w-full px-4 py-2 text-left text-lg hover:bg-green-100 dark:hover:bg-green-800 rounded-lg transition-all duration-200 hover:translate-x-1 ${language === "id" ? "font-bold" : ""}`}
												onClick={() => { setLanguage("id"); setShowLangDropdown(false); }}
											>
												<span className="text-xl">🇮🇩</span> <span>Indonesia</span>
											</button>
											<button
												className={`flex items-center gap-2 w-full px-4 py-2 text-left text-lg hover:bg-green-100 dark:hover:bg-green-800 rounded-lg transition-all duration-200 hover:translate-x-1 ${language === "en" ? "font-bold" : ""}`}
												onClick={() => { setLanguage("en"); setShowLangDropdown(false); }}
											>
												<span className="text-xl">🇬🇧</span> <span>English</span>
											</button>
										</div>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</nav>
		</>
	);
}