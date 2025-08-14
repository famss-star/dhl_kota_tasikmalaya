"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Settings, ShieldCheck, Newspaper, FileText, Calendar, ImageIcon, Users, FileDown, Gavel, FileCog, BarChart3 } from "lucide-react";

interface Article {
  id: string;
  title: string;
  createdAt: string;
}

interface News {
  id: string;
  title: string;
  createdAt: string;
}

interface DashboardStats {
  totalArticles: number;
  totalNews: number;
  totalUsers: number;
  totalComplaints: number;
  totalDocuments: number;
  totalGalleryItems: number;
  totalPermits: number;
  recentArticles: Article[];
  recentNews: News[];
}

export default function AdminPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const response = await fetch('/api/dashboard/stats');
      const data = await response.json();
      
      if (data.success) {
        setStats(data.data);
      }
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

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

      {/* Statistics Cards */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {loading ? (
            // Loading skeleton
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg animate-pulse">
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-4"></div>
                <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded"></div>
              </div>
            ))
          ) : (
            <>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-blue-200 dark:border-blue-700">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900">
                    <FileText className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Artikel</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats?.totalArticles || 0}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-yellow-200 dark:border-yellow-700">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900">
                    <Newspaper className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Berita</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats?.totalNews || 0}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-green-200 dark:border-green-700">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-green-100 dark:bg-green-900">
                    <Users className="w-8 h-8 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Users</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats?.totalUsers || 0}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-red-200 dark:border-red-700">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-red-100 dark:bg-red-900">
                    <BarChart3 className="w-8 h-8 text-red-600 dark:text-red-400" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Pengaduan</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats?.totalComplaints || 0}</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-12">
        <div className="max-w-8xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 md:p-12 border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-8 flex items-center justify-center gap-2">
            <ShieldCheck className="w-7 h-7 text-green-600 dark:text-green-400" />
            Panel Admin
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {/* Manajemen Konten */}
            <Link href="/admin/berita" className="group bg-gray-50 dark:bg-gray-700 rounded-lg p-6 flex flex-col items-center shadow hover:shadow-lg transition border border-gray-200 dark:border-gray-600 hover:bg-yellow-50 dark:hover:bg-yellow-900/30">
              <Newspaper className="w-10 h-10 text-yellow-600 dark:text-yellow-400 mb-3 group-hover:scale-110 transition" />
              <span className="font-semibold text-gray-800 dark:text-white mb-2">Manajemen Berita</span>
              <span className="text-gray-600 dark:text-gray-300 text-sm text-center">Kelola berita dan info lingkungan</span>
            </Link>

            <Link href="/admin/artikel" className="group bg-gray-50 dark:bg-gray-700 rounded-lg p-6 flex flex-col items-center shadow hover:shadow-lg transition border border-gray-200 dark:border-gray-600 hover:bg-purple-50 dark:hover:bg-purple-900/30">
              <FileText className="w-10 h-10 text-purple-600 dark:text-purple-400 mb-3 group-hover:scale-110 transition" />
              <span className="font-semibold text-gray-800 dark:text-white mb-2">Manajemen Artikel</span>
              <span className="text-gray-600 dark:text-gray-300 text-sm text-center">Kelola artikel edukasi lingkungan</span>
            </Link>

            <Link href="/admin/agenda" className="group bg-gray-50 dark:bg-gray-700 rounded-lg p-6 flex flex-col items-center shadow hover:shadow-lg transition border border-gray-200 dark:border-gray-600 hover:bg-blue-50 dark:hover:bg-blue-900/30">
              <Calendar className="w-10 h-10 text-blue-600 dark:text-blue-400 mb-3 group-hover:scale-110 transition" />
              <span className="font-semibold text-gray-800 dark:text-white mb-2">Manajemen Agenda</span>
              <span className="text-gray-600 dark:text-gray-300 text-sm text-center">Kelola agenda & event DLH</span>
            </Link>

            <Link href="/admin/galeri" className="group bg-gray-50 dark:bg-gray-700 rounded-lg p-6 flex flex-col items-center shadow hover:shadow-lg transition border border-gray-200 dark:border-gray-600 hover:bg-pink-50 dark:hover:bg-pink-900/30">
              <ImageIcon className="w-10 h-10 text-pink-600 dark:text-pink-400 mb-3 group-hover:scale-110 transition" />
              <span className="font-semibold text-gray-800 dark:text-white mb-2">Manajemen Galeri</span>
              <span className="text-gray-600 dark:text-gray-300 text-sm text-center">Kelola foto & dokumentasi</span>
            </Link>

            <Link href="/admin/galeri-video" className="group bg-gray-50 dark:bg-gray-700 rounded-lg p-6 flex flex-col items-center shadow hover:shadow-lg transition border border-gray-200 dark:border-gray-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30">
              <FileText className="w-10 h-10 text-indigo-600 dark:text-indigo-400 mb-3 group-hover:scale-110 transition" />
              <span className="font-semibold text-gray-800 dark:text-white mb-2">Galeri Video</span>
              <span className="text-gray-600 dark:text-gray-300 text-sm text-center">Kelola video kegiatan DLH</span>
            </Link>

            {/* Manajemen Dokumen */}
            <Link href="/admin/dokumen" className="group bg-gray-50 dark:bg-gray-700 rounded-lg p-6 flex flex-col items-center shadow hover:shadow-lg transition border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600">
              <FileText className="w-10 h-10 text-gray-600 dark:text-gray-400 mb-3 group-hover:scale-110 transition" />
              <span className="font-semibold text-gray-800 dark:text-white mb-2">Dokumen Umum</span>
              <span className="text-gray-600 dark:text-gray-300 text-sm text-center">Kelola dokumen umum</span>
            </Link>

            <Link href="/admin/peraturan" className="group bg-gray-50 dark:bg-gray-700 rounded-lg p-6 flex flex-col items-center shadow hover:shadow-lg transition border border-gray-200 dark:border-gray-600 hover:bg-red-50 dark:hover:bg-red-900/30">
              <Gavel className="w-10 h-10 text-red-600 dark:text-red-400 mb-3 group-hover:scale-110 transition" />
              <span className="font-semibold text-gray-800 dark:text-white mb-2">Peraturan</span>
              <span className="text-gray-600 dark:text-gray-300 text-sm text-center">Kelola peraturan walikota</span>
            </Link>

            <Link href="/admin/sop-ipal" className="group bg-gray-50 dark:bg-gray-700 rounded-lg p-6 flex flex-col items-center shadow hover:shadow-lg transition border border-gray-200 dark:border-gray-600 hover:bg-cyan-50 dark:hover:bg-cyan-900/30">
              <FileCog className="w-10 h-10 text-cyan-600 dark:text-cyan-400 mb-3 group-hover:scale-110 transition" />
              <span className="font-semibold text-gray-800 dark:text-white mb-2">SOP IPAL</span>
              <span className="text-gray-600 dark:text-gray-300 text-sm text-center">SOP Instalasi Pengolahan Air Limbah</span>
            </Link>

            <Link href="/admin/sop-emisi" className="group bg-gray-50 dark:bg-gray-700 rounded-lg p-6 flex flex-col items-center shadow hover:shadow-lg transition border border-gray-200 dark:border-gray-600 hover:bg-orange-50 dark:hover:bg-orange-900/30">
              <FileCog className="w-10 h-10 text-orange-600 dark:text-orange-400 mb-3 group-hover:scale-110 transition" />
              <span className="font-semibold text-gray-800 dark:text-white mb-2">SOP Emisi</span>
              <span className="text-gray-600 dark:text-gray-300 text-sm text-center">SOP Pengendali Emisi</span>
            </Link>

            <Link href="/admin/file-download" className="group bg-gray-50 dark:bg-gray-700 rounded-lg p-6 flex flex-col items-center shadow hover:shadow-lg transition border border-gray-200 dark:border-gray-600 hover:bg-teal-50 dark:hover:bg-teal-900/30">
              <FileDown className="w-10 h-10 text-teal-600 dark:text-teal-400 mb-3 group-hover:scale-110 transition" />
              <span className="font-semibold text-gray-800 dark:text-white mb-2">File Download</span>
              <span className="text-gray-600 dark:text-gray-300 text-sm text-center">Kelola file untuk diunduh</span>
            </Link>

            <Link href="/admin/panduan-umk" className="group bg-gray-50 dark:bg-gray-700 rounded-lg p-6 flex flex-col items-center shadow hover:shadow-lg transition border border-gray-200 dark:border-gray-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/30">
              <FileText className="w-10 h-10 text-emerald-600 dark:text-emerald-400 mb-3 group-hover:scale-110 transition" />
              <span className="font-semibold text-gray-800 dark:text-white mb-2">Panduan UMK</span>
              <span className="text-gray-600 dark:text-gray-300 text-sm text-center">Panduan perizinan UMK</span>
            </Link>

            {/* Manajemen Layanan */}
            <Link href="/admin/pengaduan" className="group bg-gray-50 dark:bg-gray-700 rounded-lg p-6 flex flex-col items-center shadow hover:shadow-lg transition border border-gray-200 dark:border-gray-600 hover:bg-yellow-50 dark:hover:bg-yellow-900/30">
              <FileText className="w-10 h-10 text-yellow-600 dark:text-yellow-400 mb-3 group-hover:scale-110 transition" />
              <span className="font-semibold text-gray-800 dark:text-white mb-2">Pengaduan</span>
              <span className="text-gray-600 dark:text-gray-300 text-sm text-center">Kelola pengaduan masyarakat</span>
            </Link>

            <Link href="/admin/perizinan-umum" className="group bg-gray-50 dark:bg-gray-700 rounded-lg p-6 flex flex-col items-center shadow hover:shadow-lg transition border border-gray-200 dark:border-gray-600 hover:bg-blue-50 dark:hover:bg-blue-900/30">
              <FileText className="w-10 h-10 text-blue-600 dark:text-blue-400 mb-3 group-hover:scale-110 transition" />
              <span className="font-semibold text-gray-800 dark:text-white mb-2">Perizinan Umum</span>
              <span className="text-gray-600 dark:text-gray-300 text-sm text-center">Kelola perizinan umum</span>
            </Link>

            <Link href="/admin/perizinan-amdal" className="group bg-gray-50 dark:bg-gray-700 rounded-lg p-6 flex flex-col items-center shadow hover:shadow-lg transition border border-gray-200 dark:border-gray-600 hover:bg-green-50 dark:hover:bg-green-900/30">
              <FileText className="w-10 h-10 text-green-600 dark:text-green-400 mb-3 group-hover:scale-110 transition" />
              <span className="font-semibold text-gray-800 dark:text-white mb-2">Perizinan AMDAL</span>
              <span className="text-gray-600 dark:text-gray-300 text-sm text-center">Kelola perizinan AMDAL</span>
            </Link>

            <Link href="/admin/perizinan-iplc" className="group bg-gray-50 dark:bg-gray-700 rounded-lg p-6 flex flex-col items-center shadow hover:shadow-lg transition border border-gray-200 dark:border-gray-600 hover:bg-purple-50 dark:hover:bg-purple-900/30">
              <FileText className="w-10 h-10 text-purple-600 dark:text-purple-400 mb-3 group-hover:scale-110 transition" />
              <span className="font-semibold text-gray-800 dark:text-white mb-2">Perizinan IPLC</span>
              <span className="text-gray-600 dark:text-gray-300 text-sm text-center">Kelola perizinan IPLC</span>
            </Link>

            <Link href="/admin/perizinan-sppl" className="group bg-gray-50 dark:bg-gray-700 rounded-lg p-6 flex flex-col items-center shadow hover:shadow-lg transition border border-gray-200 dark:border-gray-600 hover:bg-pink-50 dark:hover:bg-pink-900/30">
              <FileText className="w-10 h-10 text-pink-600 dark:text-pink-400 mb-3 group-hover:scale-110 transition" />
              <span className="font-semibold text-gray-800 dark:text-white mb-2">Perizinan SPPL</span>
              <span className="text-gray-600 dark:text-gray-300 text-sm text-center">Kelola perizinan SPPL</span>
            </Link>

            <Link href="/admin/perizinan-ukl-upl" className="group bg-gray-50 dark:bg-gray-700 rounded-lg p-6 flex flex-col items-center shadow hover:shadow-lg transition border border-gray-200 dark:border-gray-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30">
              <FileText className="w-10 h-10 text-indigo-600 dark:text-indigo-400 mb-3 group-hover:scale-110 transition" />
              <span className="font-semibold text-gray-800 dark:text-white mb-2">Perizinan UKL-UPL</span>
              <span className="text-gray-600 dark:text-gray-300 text-sm text-center">Kelola perizinan UKL-UPL</span>
            </Link>

            {/* Manajemen Profil & Organisasi */}
            <Link href="/admin/pimpinan" className="group bg-gray-50 dark:bg-gray-700 rounded-lg p-6 flex flex-col items-center shadow hover:shadow-lg transition border border-gray-200 dark:border-gray-600 hover:bg-blue-50 dark:hover:bg-blue-900/30">
              <Users className="w-10 h-10 text-blue-600 dark:text-blue-400 mb-3 group-hover:scale-110 transition" />
              <span className="font-semibold text-gray-800 dark:text-white mb-2">Profil Pimpinan</span>
              <span className="text-gray-600 dark:text-gray-300 text-sm text-center">Kelola profil pimpinan</span>
            </Link>

            {/* Pengaturan Website */}
            <Link href="/admin/pengaturan" className="group bg-gray-50 dark:bg-gray-700 rounded-lg p-6 flex flex-col items-center shadow hover:shadow-lg transition border border-gray-200 dark:border-gray-600 hover:bg-green-50 dark:hover:bg-green-900/30">
              <Settings className="w-10 h-10 text-green-600 dark:text-green-400 mb-3 group-hover:scale-110 transition" />
              <span className="font-semibold text-gray-800 dark:text-white mb-2">Pengaturan Website</span>
              <span className="text-gray-600 dark:text-gray-300 text-sm text-center">Logo, profil, kontak, dsb</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
