"use client";

import Link from "next/link";
import { Settings, ShieldCheck, Newspaper, FileText, Calendar, Image } from "lucide-react";

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-gray-800 to-green-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-3">
              <Settings className="w-9 h-9 text-white" />
              Admin Dashboard
            </h1>
            <p className="text-xl md:text-2xl opacity-90">Selamat datang di halaman admin DLH Kota Tasikmalaya</p>
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-8xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 md:p-12 border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-8 flex items-center justify-center gap-2">
            <ShieldCheck className="w-7 h-7 text-green-600 dark:text-green-400" />
            Panel Admin
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <Link href="/admin/berita" className="group bg-gray-50 dark:bg-gray-700 rounded-lg p-6 flex flex-col items-center shadow hover:shadow-lg transition border border-gray-200 dark:border-gray-600 hover:bg-green-50 dark:hover:bg-green-900/30">
              <Newspaper className="w-10 h-10 text-yellow-600 dark:text-yellow-400 mb-2 group-hover:scale-110 transition" />
              <span className="font-semibold text-gray-800 dark:text-white mb-1">Manajemen Berita</span>
              <span className="text-gray-600 dark:text-gray-300 text-sm text-center">Kelola berita dan info lingkungan</span>
            </Link>
            <Link href="/admin/artikel" className="group bg-gray-50 dark:bg-gray-700 rounded-lg p-6 flex flex-col items-center shadow hover:shadow-lg transition border border-gray-200 dark:border-gray-600 hover:bg-purple-50 dark:hover:bg-purple-900/30">
              <FileText className="w-10 h-10 text-purple-600 dark:text-purple-400 mb-2 group-hover:scale-110 transition" />
              <span className="font-semibold text-gray-800 dark:text-white mb-1">Manajemen Artikel</span>
              <span className="text-gray-600 dark:text-gray-300 text-sm text-center">Kelola artikel edukasi lingkungan</span>
            </Link>
            <Link href="/admin/agenda" className="group bg-gray-50 dark:bg-gray-700 rounded-lg p-6 flex flex-col items-center shadow hover:shadow-lg transition border border-gray-200 dark:border-gray-600 hover:bg-blue-50 dark:hover:bg-blue-900/30">
              <Calendar className="w-10 h-10 text-blue-600 dark:text-blue-400 mb-2 group-hover:scale-110 transition" />
              <span className="font-semibold text-gray-800 dark:text-white mb-1">Manajemen Agenda</span>
              <span className="text-gray-600 dark:text-gray-300 text-sm text-center">Kelola agenda & event DLH</span>
            </Link>
            <Link href="/admin/galeri" className="group bg-gray-50 dark:bg-gray-700 rounded-lg p-6 flex flex-col items-center shadow hover:shadow-lg transition border border-gray-200 dark:border-gray-600 hover:bg-pink-50 dark:hover:bg-pink-900/30">
              {/* eslint-disable-next-line jsx-a11y/alt-text */}
              <Image className="w-10 h-10 text-pink-600 dark:text-pink-400 mb-2 group-hover:scale-110 transition" aria-hidden="true" focusable="false" />
              <span className="font-semibold text-gray-800 dark:text-white mb-1">Manajemen Galeri</span>
              <span className="text-gray-600 dark:text-gray-300 text-sm text-center">Kelola foto & dokumentasi</span>
            </Link>
            <Link href="/admin/pengaturan" className="group bg-gray-50 dark:bg-gray-700 rounded-lg p-6 flex flex-col items-center shadow hover:shadow-lg transition border border-gray-200 dark:border-gray-600 hover:bg-green-50 dark:hover:bg-green-900/30">
              <Settings className="w-10 h-10 text-green-600 dark:text-green-400 mb-2 group-hover:scale-110 transition" />
              <span className="font-semibold text-gray-800 dark:text-white mb-1">Pengaturan Website</span>
              <span className="text-gray-600 dark:text-gray-300 text-sm text-center">Profil, kontak, dsb</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
