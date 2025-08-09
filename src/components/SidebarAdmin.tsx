"use client";


import Link from "next/link";
import { useState } from "react";
import {
  User2, Info, Users, BookOpen, FileText, FileCog, Gavel, FileDown,
  Newspaper, CalendarDays, FileImage, FileVideo, Folder, ChevronDown, ChevronUp, UserCog
} from "lucide-react";

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
      { label: "Struktur Organisasi", href: "/admin/pengaturan#struktur", icon: Users },
      { label: "Tugas & Fungsi", href: "/admin/pengaturan#tupoksi", icon: BookOpen },
      { label: "Visi & Misi", href: "/admin/pengaturan#visi", icon: BookOpen },
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
      { label: "Manajemen Kontak", href: "/admin/pengaturan#kontak", icon: Info },
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
    ],
  },
];

export default function SidebarAdmin() {
  const [open, setOpen] = useState<string | null>(null);

  const handleToggle = (label: string) => {
    setOpen(open === label ? null : label);
  };

  return (
    <aside className="w-full md:w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4 rounded-xl md:rounded-none md:rounded-l-xl shadow md:shadow-none mb-6 md:mb-0 overflow-y-auto max-h-[90vh]">
      <nav className="flex flex-col gap-2">
        {sidebarMenu.map((item) => {
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
          // No direct links for items without href in new admin-only sidebar
          return null;
        })}
      </nav>
    </aside>
  );
}
