"use client";

import Link from "next/link";
import { useState } from "react";
import {
  User2, Info, Users, BookOpen, FileText, FileCog, Gavel, FileDown,
  Newspaper, CalendarDays, FileImage, FileVideo, Folder, ChevronDown, ChevronUp, UserCog,
  LogOut, User
} from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { useAuth } from "@/context/AuthContext";

const sidebarMenu = [
  {
    label: "Beranda",
    icon: Folder,
    children: [
      { label: "Dashboard Admin", href: "/admin", icon: Folder },
    ],
  },
  {
    label: "Profil",
    icon: Users,
    children: [
      { label: "Profil Instansi", href: "/admin/pengaturan#profil", icon: User2 },
      { label: "Logo", href: "/admin/pengaturan#logo", icon: FileImage },
      { label: "Kepala Dinas", href: "/admin/pengaturan#kepala-dinas", icon: User },
      { label: "Struktur Organisasi", href: "/admin/pengaturan#struktur", icon: Users },
      { label: "Tugas & Fungsi", href: "/admin/pengaturan#tupoksi", icon: BookOpen },
      { label: "Visi & Misi", href: "/admin/pengaturan#visi", icon: BookOpen },
      { label: "Kontak & Alamat", href: "/admin/pengaturan#kontak", icon: Info },
      { label: "Manajemen Pimpinan", href: "/admin/pimpinan", icon: UserCog },
    ],
  },
  {
    label: "Layanan Publik",
    icon: FileText,
    children: [
      { label: "Manajemen Perizinan Umum", href: "/admin/perizinan-umum", icon: FileText },
      { label: "Manajemen AMDAL", href: "/admin/perizinan-amdal", icon: FileText },
      { label: "Manajemen IPLC", href: "/admin/perizinan-iplc", icon: FileText },
      { label: "Manajemen SPPL", href: "/admin/perizinan-sppl", icon: FileText },
      { label: "Manajemen UKL-UPL", href: "/admin/perizinan-ukl-upl", icon: FileText },
      { label: "Manajemen Pengaduan", href: "/admin/pengaduan", icon: Info },
    ],
  },
  {
    label: "Informasi & Dokumen",
    icon: Folder,
    children: [
      { label: "Manajemen Berita", href: "/admin/berita", icon: Newspaper },
      { label: "Manajemen Artikel", href: "/admin/artikel", icon: FileText },
      { label: "Manajemen Agenda", href: "/admin/agenda", icon: CalendarDays },
      { label: "Panduan UMK", href: "/admin/panduan-umk", icon: BookOpen },
      { label: "Manajemen Dokumen", href: "/admin/dokumen", icon: FileText },
      { label: "Manajemen Peraturan", href: "/admin/peraturan", icon: Gavel },
      { label: "Manajemen SOP IPAL", href: "/admin/sop-ipal", icon: FileCog },
      { label: "Manajemen SOP Emisi", href: "/admin/sop-emisi", icon: FileCog },
      { label: "Manajemen File", href: "/admin/file-download", icon: FileDown },
      { label: "Manajemen Galeri Foto", href: "/admin/galeri", icon: FileImage },
      { label: "Manajemen Galeri Video", href: "/admin/galeri-video", icon: FileVideo },
      { label: "Pengaturan Umum", href: "/admin/pengaturan", icon: FileCog },
    ],
  },
];

export default function SidebarAdmin() {
  const [open, setOpen] = useState<string | null>(null);
  const [userDropdown, setUserDropdown] = useState(false);
  const { logout } = useAuth();

  const handleToggle = (label: string) => {
    setOpen(open === label ? null : label);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <aside className="fixed top-4 left-4 bottom-4 w-72 bg-white dark:bg-gray-800 shadow-2xl rounded-2xl border border-gray-200 dark:border-gray-700 flex flex-col z-50 backdrop-blur-sm bg-white/95 dark:bg-gray-800/95">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 rounded-t-2xl bg-gradient-to-r from-green-600 to-blue-600">
        <h2 className="text-lg font-bold text-white">Admin Panel</h2>
        <p className="text-sm text-green-100">DLH Kota Tasikmalaya</p>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* User Profile Section */}
        <div className="mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
          <div className="relative">
            <button
              className="flex items-center w-full gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              onClick={() => setUserDropdown(!userDropdown)}
            >
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <User2 className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 text-left">
                <div className="text-sm font-medium text-gray-900 dark:text-white">Administrator</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">DLH Kota Tasikmalaya</div>
            </div>
            {userDropdown ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          
          {userDropdown && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10">
              <button
                onClick={handleLogout}
                className="flex items-center w-full gap-2 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex flex-col gap-2 flex-1">
        {/* Beranda langsung tombol, bukan dropdown */}
        <Link
          href="/admin"
          className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-green-100 dark:hover:bg-green-900/30 font-medium transition"
        >
          <Folder className="w-5 h-5" />
          Dashboard
        </Link>
        {/* Menu lain tetap dropdown */}
        {sidebarMenu.filter(item => item.label !== "Beranda").map((item) => {
          const Icon = item.icon;
          if (item.children) {
            return (
              <div key={item.label}>
                <button
                  className="flex items-center w-full gap-3 px-4 py-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-green-100 dark:hover:bg-green-900/30 font-medium transition justify-between"
                  onClick={() => handleToggle(item.label)}
                  aria-expanded={open === item.label}
                >
                  <span className="flex items-center gap-3">
                    <Icon className="w-5 h-5" />
                    {item.label}
                  </span>
                  {open === item.label ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {open === item.label && (
                  <div className="ml-7 mt-1 flex flex-col gap-1 border-l border-green-200 dark:border-green-800 pl-3">
                    {item.children.map((sub) => {
                      const SubIcon = sub.icon;
                      return (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          className="flex items-center gap-2 px-2 py-1 rounded text-gray-600 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-900/40 text-sm transition"
                        >
                          <SubIcon className="w-4 h-4" />
                          {sub.label}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          }
          return null;
        })}
      </nav>

        {/* Theme Toggle at Bottom */}
        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-end px-3 py-2">
            <ThemeToggle size="sm" />
          </div>
        </div>
      </div>
    </aside>
  );
}
