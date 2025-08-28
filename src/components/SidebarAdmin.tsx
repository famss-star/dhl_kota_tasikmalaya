"use client";

import Link from "next/link";
import { useState } from "react";
import {
  User2, Info, Users, BookOpen, FileText, FileCog, Gavel, FileDown,
  Newspaper, CalendarDays, FileImage, FileVideo, Folder, ChevronDown, ChevronUp, UserCog,
  LogOut, User, Home, Settings, Shield, Building2, TreePine, Recycle, Droplets, Scale, 
  FileCheck, AlertTriangle, Phone, HelpCircle, Archive, FileSpreadsheet, BarChart3, Grid3X3, Languages
} from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { useAuth } from "@/context/AuthContext";

const sidebarMenu = [
  {
    label: "Profil & Tentang",
    icon: Info,
    children: [
      { label: "Overview Profil", href: "/admin/profil", icon: BarChart3 },
      { label: "Tentang, Visi & Misi", href: "/admin/profil/tentang", icon: Info },
    ],
  },
  {
    label: "SDM & Organisasi",
    icon: Building2,
    children: [
      { label: "Staff & Pimpinan", href: "/admin/sdm-organisasi/staff", icon: User2 },
      { label: "Statistik & Analisis", href: "/admin/sdm-organisasi/statistik", icon: BarChart3 },
    ],
  },
  {
    label: "Bidang Kerja",
    icon: TreePine,
    children: [
      { label: "Overview Bidang", href: "/admin/bidang", icon: BarChart3 },
      { label: "Bidang Umum", href: "/admin/bidang/umum", icon: Building2 },
      { label: "Bidang Tata Lingkungan", href: "/admin/bidang/tata-lingkungan", icon: TreePine },
      { label: "Bidang Pengendalian Pencemaran", href: "/admin/bidang/pengendalian-pencemaran", icon: AlertTriangle },
      { label: "Bidang Pengelolaan Sampah", href: "/admin/bidang/pengelolaan-sampah", icon: Recycle },
    ],
  },
  {
    label: "Perizinan",
    icon: FileCheck,
    children: [
      { label: "Overview Perizinan", href: "/admin/perizinan", icon: BarChart3 },
      { label: "Perizinan Umum", href: "/admin/perizinan/umum", icon: FileText },
      { label: "Perizinan AMDAL", href: "/admin/perizinan/amdal", icon: Scale },
      { label: "Perizinan IPLC", href: "/admin/perizinan/iplc", icon: Droplets },
      { label: "Perizinan SPPL", href: "/admin/perizinan/sppl", icon: FileCheck },
      { label: "Perizinan UKL-UPL", href: "/admin/perizinan/ukl-upl", icon: Shield },
    ],
  },
  {
    label: "Pengaduan & Bantuan",
    icon: AlertTriangle,
    children: [
      { label: "Overview", href: "/admin/pengaduan/overview", icon: BarChart3 },
      { label: "Kelola Pengaduan", href: "/admin/pengaduan", icon: AlertTriangle },
      { label: "Sistem Bantuan", href: "/admin/pengaduan/bantuan", icon: HelpCircle },
      { label: "Laporan & Analisis", href: "/admin/pengaduan/laporan", icon: BarChart3 },
      { label: "Pengaturan Sistem", href: "/admin/pengaduan/pengaturan", icon: Settings },
    ],
  },
  {
    label: "Pelayanan",
    icon: HelpCircle,
    children: [
      { label: "Overview Pelayanan", href: "/admin/pelayanan", icon: BarChart3 },
      { label: "Pengaduan", href: "/admin/pelayanan/pengaduan", icon: AlertTriangle },
      { label: "Konsultasi", href: "/admin/pelayanan/konsultasi", icon: HelpCircle },
      { label: "Informasi Publik", href: "/admin/pelayanan/informasi-publik", icon: Info },
      { label: "Layanan Terpadu", href: "/admin/pelayanan/terpadu", icon: Shield },
    ],
  },
  {
    label: "Konten & Media",
    icon: Newspaper,
    children: [
      { label: "Pengaturan Homepage", href: "/admin/homepage-settings", icon: Settings },
      { label: "Carousel Homepage", href: "/admin/carousel", icon: FileImage },
      { label: "Layanan Section", href: "/admin/layanan-section", icon: Grid3X3 },
      { label: "Statistik Section", href: "/admin/statistics-section", icon: BarChart3 },
      { label: "Social Media Gallery", href: "/admin/social-media-gallery", icon: FileVideo },
      { label: "Berita", href: "/admin/berita", icon: Newspaper },
      { label: "Artikel", href: "/admin/artikel", icon: FileText },
      { label: "Agenda", href: "/admin/agenda", icon: CalendarDays },
      { label: "Galeri Foto", href: "/admin/galeri", icon: FileImage },
      { label: "Galeri Video", href: "/admin/galeri-video", icon: FileVideo },
    ],
  },
  {
    label: "Dokumen & Files",
    icon: Archive,
    children: [
      { label: "Dokumen", href: "/admin/dokumen", icon: FileText },
      { label: "File Download", href: "/admin/file-download", icon: FileDown },
      { label: "Peraturan", href: "/admin/peraturan", icon: Gavel },
      { label: "SOP IPAL", href: "/admin/sop-ipal", icon: FileCog },
      { label: "SOP Emisi", href: "/admin/sop-emisi", icon: FileCog },
    ],
  },
  {
    label: "Panduan & Bantuan",
    icon: HelpCircle,
    children: [
      { label: "Panduan UMK", href: "/admin/panduan-umk", icon: BookOpen },
      { label: "Panduan Perizinan", href: "/admin/panduan/perizinan", icon: FileSpreadsheet },
      { label: "FAQ", href: "/admin/panduan/faq", icon: HelpCircle },
      { label: "Kontak", href: "/admin/kontak", icon: Phone },
    ],
  },
];

export default function SidebarAdmin() {
  const [openSections, setOpenSections] = useState<string[]>([]);
  const [userDropdown, setUserDropdown] = useState(false);
  const { logout } = useAuth();

  const handleToggle = (label: string) => {
    setOpenSections(prev => 
      prev.includes(label) 
        ? prev.filter(item => item !== label)
        : [...prev, label]
    );
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <aside className="fixed top-4 left-4 bottom-4 w-72 bg-white dark:bg-gray-800 shadow-2xl rounded-2xl border border-gray-200 dark:border-gray-700 flex flex-col z-50 backdrop-blur-sm bg-white/95 dark:bg-gray-800/95 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-green-600 to-blue-600 flex-shrink-0">
        <h2 className="text-lg font-bold text-white">Admin Panel</h2>
        <p className="text-sm text-green-100">DLH Kota Tasikmalaya</p>
      </div>

      {/* User Profile Section */}
      <div className="px-4 py-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
        <div className="relative">
          <button
            className="flex items-center w-full gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            onClick={() => setUserDropdown(!userDropdown)}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center shadow-md">
              <User2 className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 text-left">
              <div className="text-sm font-semibold text-gray-900 dark:text-white">Administrator</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">DLH Kota Tasikmalaya</div>
            </div>
            <div className="transform transition-transform duration-200" style={{ transform: userDropdown ? 'rotate(180deg)' : 'rotate(0deg)' }}>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>
          </button>
          
          {userDropdown && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10 animate-in slide-in-from-top-2 duration-200">
              <button
                onClick={handleLogout}
                className="flex items-center w-full gap-2 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors duration-200"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
        <nav className="p-4 space-y-2">
          {/* Dashboard Link */}
          <Link
            href="/admin"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gradient-to-r hover:from-green-50 hover:to-blue-50 dark:hover:from-green-900/20 dark:hover:to-blue-900/20 font-medium transition-all duration-200 group border border-transparent hover:border-green-200 dark:hover:border-green-700 text-left"
          >
            <Home className="w-5 h-5 text-green-600 group-hover:text-green-700 transition-colors duration-200 flex-shrink-0" />
            <span className="flex-1">Dashboard</span>
          </Link>

          {/* Menu Sections */}
          {sidebarMenu.map((item) => {
            const Icon = item.icon;
            const isOpen = openSections.includes(item.label);
            
            return (
              <div key={item.label} className="space-y-1">
                <button
                  className="flex items-center w-full gap-3 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gradient-to-r hover:from-green-50 hover:to-blue-50 dark:hover:from-green-900/20 dark:hover:to-blue-900/20 font-medium transition-all duration-200 justify-between group border border-transparent hover:border-green-200 dark:hover:border-green-700 text-left"
                  onClick={() => handleToggle(item.label)}
                  aria-expanded={isOpen}
                >
                  <span className="flex items-center gap-3 flex-1 text-left">
                    <Icon className="w-5 h-5 text-green-600 group-hover:text-green-700 transition-colors duration-200 flex-shrink-0" />
                    <span className="flex-1">{item.label}</span>
                  </span>
                  <div className="transform transition-transform duration-200 flex-shrink-0" style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                    <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300" />
                  </div>
                </button>
                
                {isOpen && (
                  <div className="ml-6 pl-4 border-l-2 border-green-200 dark:border-green-800 space-y-1 animate-in slide-in-from-top-2 duration-200">
                    {item.children.map((sub) => {
                      const SubIcon = sub.icon;
                      return (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-900/20 hover:text-green-700 dark:hover:text-green-300 text-sm transition-all duration-200 group text-left"
                        >
                          <SubIcon className="w-4 h-4 text-gray-400 group-hover:text-green-600 transition-colors duration-200 flex-shrink-0" />
                          <span className="flex-1 text-left">{sub.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}

          {/* Kontak & Website Settings Link */}
          <Link
            href="/admin/kontak"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gradient-to-r hover:from-green-50 hover:to-blue-50 dark:hover:from-green-900/20 dark:hover:to-blue-900/20 font-medium transition-all duration-200 group border border-transparent hover:border-green-200 dark:hover:border-green-700 text-left"
          >
            <Phone className="w-5 h-5 text-green-600 group-hover:text-green-700 transition-colors duration-200 flex-shrink-0" />
            <span className="flex-1">Kontak & Website</span>
          </Link>

          {/* General Settings Link */}
          <Link
            href="/admin/pengaturan"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gradient-to-r hover:from-green-50 hover:to-blue-50 dark:hover:from-green-900/20 dark:hover:to-blue-900/20 font-medium transition-all duration-200 group border border-transparent hover:border-green-200 dark:hover:border-green-700 text-left"
          >
            <Settings className="w-5 h-5 text-green-600 group-hover:text-green-700 transition-colors duration-200 flex-shrink-0" />
            <span className="flex-1">Pengaturan Umum</span>
          </Link>
        </nav>
      </div>

      {/* Footer with Theme Toggle */}
      <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between flex-shrink-0">
        <div className="text-xs text-gray-500 dark:text-gray-400">
          v1.0.0
        </div>
        <ThemeToggle size="sm" />
      </div>
    </aside>
  );
}
