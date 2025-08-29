"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Settings, ShieldCheck, Newspaper, FileText, Calendar, ImageIcon, Users, FileDown, Gavel, FileCog, BarChart3, TrendingUp, Eye, Download, ArrowUp, ArrowDown } from "lucide-react";

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
  counts: {
    totalArticles: number;
    totalNews: number;
    totalUsers: number;
    publishedArticles: number;
    publishedNews: number;
    totalViews: number;
    monthlyViews: number;
    totalDownloads: number;
  };
  recent: {
    articles: Article[];
    news: News[];
  };
  analytics: {
    viewsThisMonth: number[];
    articlesThisMonth: number[];
    newsThisMonth: number[];
    popularContent: {
      title: string;
      views: number;
      type: 'article' | 'news';
    }[];
  };
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

  // Mini Chart Component
  const MiniChart = ({ data, color, height = 32 }: { data: number[], color: string, height?: number }) => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;
    
    return (
      <div className="flex items-end gap-0.5" style={{ height }}>
        {data.map((value, index) => {
          const heightPercent = ((value - min) / range) * 100;
          return (
            <div
              key={index}
              className={`w-1 rounded-t-sm transition-all duration-300 ${color}`}
              style={{ height: `${Math.max(heightPercent, 10)}%` }}
            />
          );
        })}
      </div>
    );
  };

  // Trend Calculator
  const calculateTrend = (current: number, previous: number) => {
    if (previous === 0) return { percentage: 0, isUp: true };
    const percentage = ((current - previous) / previous) * 100;
    return { percentage: Math.abs(percentage), isUp: percentage >= 0 };
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
                <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
                <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded"></div>
              </div>
            ))
          ) : (
            <>
              {/* Total Articles Card */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-blue-200 dark:border-blue-700 hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Artikel</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats?.counts?.totalArticles || 0}</p>
                  </div>
                  <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900">
                    <FileText className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <ArrowUp className="w-3 h-3 text-green-600" />
                      <span className="text-xs text-green-600 font-medium">+12%</span>
                    </div>
                    <span className="text-xs text-gray-500">vs bulan lalu</span>
                  </div>
                  <MiniChart 
                    data={stats?.analytics?.articlesThisMonth || [5, 7, 3, 8, 12, 9, 15]} 
                    color="bg-blue-400" 
                  />
                </div>
              </div>

              {/* Total News Card */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-yellow-200 dark:border-yellow-700 hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Berita</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats?.counts?.totalNews || 0}</p>
                  </div>
                  <div className="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900">
                    <Newspaper className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <ArrowUp className="w-3 h-3 text-green-600" />
                      <span className="text-xs text-green-600 font-medium">+8%</span>
                    </div>
                    <span className="text-xs text-gray-500">vs bulan lalu</span>
                  </div>
                  <MiniChart 
                    data={stats?.analytics?.newsThisMonth || [3, 5, 2, 6, 8, 4, 10]} 
                    color="bg-yellow-400" 
                  />
                </div>
              </div>

              {/* Total Views Card */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-green-200 dark:border-green-700 hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Views</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{(stats?.counts?.totalViews || 15420).toLocaleString()}</p>
                  </div>
                  <div className="p-3 rounded-full bg-green-100 dark:bg-green-900">
                    <Eye className="w-8 h-8 text-green-600 dark:text-green-400" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <ArrowUp className="w-3 h-3 text-green-600" />
                      <span className="text-xs text-green-600 font-medium">+24%</span>
                    </div>
                    <span className="text-xs text-gray-500">bulan ini</span>
                  </div>
                  <MiniChart 
                    data={stats?.analytics?.viewsThisMonth || [120, 150, 98, 180, 220, 165, 280]} 
                    color="bg-green-400" 
                  />
                </div>
              </div>

              {/* Total Downloads Card */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-purple-200 dark:border-purple-700 hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Downloads</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{(stats?.counts?.totalDownloads || 2840).toLocaleString()}</p>
                  </div>
                  <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900">
                    <Download className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <ArrowUp className="w-3 h-3 text-green-600" />
                      <span className="text-xs text-green-600 font-medium">+15%</span>
                    </div>
                    <span className="text-xs text-gray-500">vs bulan lalu</span>
                  </div>
                  <MiniChart 
                    data={[25, 30, 18, 35, 42, 28, 50]} 
                    color="bg-purple-400" 
                  />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Detailed Analytics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Monthly Views Chart */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                Views Trends (30 Hari Terakhir)
              </h3>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                  <span className="text-xs text-gray-600 dark:text-gray-400">Artikel</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <span className="text-xs text-gray-600 dark:text-gray-400">Berita</span>
                </div>
              </div>
            </div>
            
            {/* Large Chart */}
            <div className="flex items-end justify-between h-32 gap-1">
              {(stats?.analytics?.viewsThisMonth || Array.from({length: 30}, (_, i) => Math.floor(Math.random() * 100) + 50)).map((value, index) => {
                const maxValue = 200;
                const heightPercent = (value / maxValue) * 100;
                return (
                  <div key={index} className="flex flex-col items-center gap-1 flex-1">
                    <div 
                      className="w-full bg-gradient-to-t from-blue-400 to-blue-300 rounded-t-sm transition-all duration-300 hover:from-blue-500 hover:to-blue-400"
                      style={{ height: `${Math.max(heightPercent, 5)}%` }}
                      title={`Day ${index + 1}: ${value} views`}
                    />
                  </div>
                );
              })}
            </div>
            
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
              <span>1 Agt</span>
              <span>15 Agt</span>
              <span>30 Agt</span>
            </div>
          </div>

          {/* Popular Content */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-green-600 dark:text-green-400" />
              Konten Terpopuler
            </h3>
            <div className="space-y-3">
              {(stats?.analytics?.popularContent || [
                { title: "Panduan Pengelolaan Sampah", views: 1250, type: 'article' as const },
                { title: "Program Reboisasi 2025", views: 980, type: 'news' as const },
                { title: "Tips Hemat Air", views: 760, type: 'article' as const },
                { title: "Sosialisasi Lingkungan", views: 640, type: 'news' as const },
              ]).map((content, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800 dark:text-white truncate">
                      {content.title}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        content.type === 'article' 
                          ? 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200'
                          : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                      }`}>
                        {content.type === 'article' ? 'Artikel' : 'Berita'}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {content.views.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions Section */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
            <div className="w-1 h-6 bg-gradient-to-b from-green-500 to-blue-500 rounded-full"></div>
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/admin/berita" className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg p-4 flex items-center gap-3 hover:shadow-lg transition group">
              <Newspaper className="w-6 h-6 group-hover:scale-110 transition" />
              <span className="font-medium">Buat Berita</span>
            </Link>
            <Link href="/admin/artikel" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg p-4 flex items-center gap-3 hover:shadow-lg transition group">
              <FileText className="w-6 h-6 group-hover:scale-110 transition" />
              <span className="font-medium">Buat Artikel</span>
            </Link>
            <Link href="/admin/galeri" className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg p-4 flex items-center gap-3 hover:shadow-lg transition group">
              <ImageIcon className="w-6 h-6 group-hover:scale-110 transition" />
              <span className="font-medium">Upload Foto</span>
            </Link>
            <Link href="/admin/pengaturan" className="bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-lg p-4 flex items-center gap-3 hover:shadow-lg transition group">
              <Settings className="w-6 h-6 group-hover:scale-110 transition" />
              <span className="font-medium">Pengaturan</span>
            </Link>
          </div>
        </div>

        {/* Recent Activity & System Status */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Recent Activity */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              Aktivitas Terbaru
            </h3>
            <div className="space-y-3">
              {stats?.recent?.articles?.slice(0, 3).map((article, index) => (
                <div key={article.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                  <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                    <FileText className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800 dark:text-white truncate">{article.title}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{new Date(article.createdAt).toLocaleDateString('id-ID')}</p>
                  </div>
                </div>
              )) || (
                <div className="text-center py-4">
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Belum ada aktivitas terbaru</p>
                </div>
              )}
            </div>
          </div>

          {/* System Status */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              Status Sistem
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-2 rounded-lg bg-green-50 dark:bg-green-900/20">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Website Status</span>
                <span className="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded-full">Online</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Database</span>
                <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full">Connected</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-yellow-50 dark:bg-yellow-900/20">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Storage Usage</span>
                <span className="text-xs bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-2 py-1 rounded-full">65%</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-purple-50 dark:bg-purple-900/20">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Last Backup</span>
                <span className="text-xs bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-2 py-1 rounded-full">2 jam lalu</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-12">
        <div className="max-w-8xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 md:p-12 border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-8 flex items-center justify-center gap-2">
            <ShieldCheck className="w-7 h-7 text-green-600 dark:text-green-400" />
            Panel Admin
          </h2>

          {/* Content Management Section */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-8 bg-gradient-to-b from-yellow-500 to-orange-500 rounded-full"></div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Manajemen Konten</h3>
              <div className="flex-1 h-px bg-gradient-to-r from-gray-300 to-transparent dark:from-gray-600"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <Link href="/admin/berita" className="group bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/30 dark:to-orange-900/30 rounded-lg p-6 flex flex-col items-center shadow hover:shadow-lg transition border border-yellow-200 dark:border-yellow-700 hover:scale-105">
                <Newspaper className="w-10 h-10 text-yellow-600 dark:text-yellow-400 mb-3 group-hover:scale-110 transition" />
                <span className="font-semibold text-gray-800 dark:text-white mb-2">Manajemen Berita</span>
                <span className="text-gray-600 dark:text-gray-300 text-sm text-center">Kelola berita dan info lingkungan</span>
              </Link>

              <Link href="/admin/artikel" className="group bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-lg p-6 flex flex-col items-center shadow hover:shadow-lg transition border border-purple-200 dark:border-purple-700 hover:scale-105">
                <FileText className="w-10 h-10 text-purple-600 dark:text-purple-400 mb-3 group-hover:scale-110 transition" />
                <span className="font-semibold text-gray-800 dark:text-white mb-2">Manajemen Artikel</span>
                <span className="text-gray-600 dark:text-gray-300 text-sm text-center">Kelola artikel edukasi lingkungan</span>
              </Link>

              <Link href="/admin/agenda" className="group bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-lg p-6 flex flex-col items-center shadow hover:shadow-lg transition border border-blue-200 dark:border-blue-700 hover:scale-105">
                <Calendar className="w-10 h-10 text-blue-600 dark:text-blue-400 mb-3 group-hover:scale-110 transition" />
                <span className="font-semibold text-gray-800 dark:text-white mb-2">Manajemen Agenda</span>
                <span className="text-gray-600 dark:text-gray-300 text-sm text-center">Kelola agenda & event DLH</span>
              </Link>

              <Link href="/admin/galeri" className="group bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-900/30 dark:to-rose-900/30 rounded-lg p-6 flex flex-col items-center shadow hover:shadow-lg transition border border-pink-200 dark:border-pink-700 hover:scale-105">
                <ImageIcon className="w-10 h-10 text-pink-600 dark:text-pink-400 mb-3 group-hover:scale-110 transition" />
                <span className="font-semibold text-gray-800 dark:text-white mb-2">Manajemen Galeri</span>
                <span className="text-gray-600 dark:text-gray-300 text-sm text-center">Kelola foto & dokumentasi</span>
              </Link>
            </div>
          </div>

          {/* Document Management Section */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Manajemen Dokumen</h3>
              <div className="flex-1 h-px bg-gradient-to-r from-gray-300 to-transparent dark:from-gray-600"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <Link href="/admin/dokumen" className="group bg-gradient-to-br from-gray-50 to-slate-50 dark:from-gray-700 dark:to-slate-700 rounded-lg p-6 flex flex-col items-center shadow hover:shadow-lg transition border border-gray-200 dark:border-gray-600 hover:scale-105">
                <FileText className="w-10 h-10 text-gray-600 dark:text-gray-400 mb-3 group-hover:scale-110 transition" />
                <span className="font-semibold text-gray-800 dark:text-white mb-2">Dokumen Umum</span>
                <span className="text-gray-600 dark:text-gray-300 text-sm text-center">Kelola dokumen umum</span>
              </Link>

              <Link href="/admin/peraturan" className="group bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/30 dark:to-orange-900/30 rounded-lg p-6 flex flex-col items-center shadow hover:shadow-lg transition border border-red-200 dark:border-red-700 hover:scale-105">
                <Gavel className="w-10 h-10 text-red-600 dark:text-red-400 mb-3 group-hover:scale-110 transition" />
                <span className="font-semibold text-gray-800 dark:text-white mb-2">Peraturan</span>
                <span className="text-gray-600 dark:text-gray-300 text-sm text-center">Kelola peraturan walikota</span>
              </Link>

              <Link href="/admin/file-download" className="group bg-gradient-to-br from-teal-50 to-green-50 dark:from-teal-900/30 dark:to-green-900/30 rounded-lg p-6 flex flex-col items-center shadow hover:shadow-lg transition border border-teal-200 dark:border-teal-700 hover:scale-105">
                <FileDown className="w-10 h-10 text-teal-600 dark:text-teal-400 mb-3 group-hover:scale-110 transition" />
                <span className="font-semibold text-gray-800 dark:text-white mb-2">File Download</span>
                <span className="text-gray-600 dark:text-gray-300 text-sm text-center">Kelola file untuk diunduh</span>
              </Link>

              <Link href="/admin/panduan-umk" className="group bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/30 dark:to-teal-900/30 rounded-lg p-6 flex flex-col items-center shadow hover:shadow-lg transition border border-emerald-200 dark:border-emerald-700 hover:scale-105">
                <FileText className="w-10 h-10 text-emerald-600 dark:text-emerald-400 mb-3 group-hover:scale-110 transition" />
                <span className="font-semibold text-gray-800 dark:text-white mb-2">Panduan UMK</span>
                <span className="text-gray-600 dark:text-gray-300 text-sm text-center">Panduan perizinan UMK</span>
              </Link>
            </div>
          </div>

          {/* Service Management Section */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-8 bg-gradient-to-b from-green-500 to-teal-500 rounded-full"></div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Manajemen Layanan</h3>
              <div className="flex-1 h-px bg-gradient-to-r from-gray-300 to-transparent dark:from-gray-600"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <Link href="/admin/pengaduan" className="group bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-900/30 dark:to-amber-900/30 rounded-lg p-6 flex flex-col items-center shadow hover:shadow-lg transition border border-yellow-200 dark:border-yellow-700 hover:scale-105">
                <FileText className="w-10 h-10 text-yellow-600 dark:text-yellow-400 mb-3 group-hover:scale-110 transition" />
                <span className="font-semibold text-gray-800 dark:text-white mb-2">Pengaduan & Bantuan</span>
                <span className="text-gray-600 dark:text-gray-300 text-sm text-center">Kelola pengaduan masyarakat</span>
              </Link>

              <Link href="/admin/pelayanan" className="group bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/30 dark:to-blue-900/30 rounded-lg p-6 flex flex-col items-center shadow hover:shadow-lg transition border border-cyan-200 dark:border-cyan-700 hover:scale-105">
                <Users className="w-10 h-10 text-cyan-600 dark:text-cyan-400 mb-3 group-hover:scale-110 transition" />
                <span className="font-semibold text-gray-800 dark:text-white mb-2">Pelayanan</span>
                <span className="text-gray-600 dark:text-gray-300 text-sm text-center">Kelola layanan masyarakat</span>
              </Link>

              <Link href="/admin/perizinan" className="group bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-lg p-6 flex flex-col items-center shadow hover:shadow-lg transition border border-blue-200 dark:border-blue-700 hover:scale-105">
                <FileText className="w-10 h-10 text-blue-600 dark:text-blue-400 mb-3 group-hover:scale-110 transition" />
                <span className="font-semibold text-gray-800 dark:text-white mb-2">Perizinan</span>
                <span className="text-gray-600 dark:text-gray-300 text-sm text-center">Kelola perizinan lingkungan</span>
              </Link>

              <Link href="/admin/bidang" className="group bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-lg p-6 flex flex-col items-center shadow hover:shadow-lg transition border border-green-200 dark:border-green-700 hover:scale-105">
                <Users className="w-10 h-10 text-green-600 dark:text-green-400 mb-3 group-hover:scale-110 transition" />
                <span className="font-semibold text-gray-800 dark:text-white mb-2">Bidang Kerja</span>
                <span className="text-gray-600 dark:text-gray-300 text-sm text-center">Kelola bidang kerja DLH</span>
              </Link>
            </div>
          </div>

          {/* Profile & Settings Section */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-8 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Profil & Pengaturan</h3>
              <div className="flex-1 h-px bg-gradient-to-r from-gray-300 to-transparent dark:from-gray-600"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <Link href="/admin/profil" className="group bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/30 dark:to-violet-900/30 rounded-lg p-6 flex flex-col items-center shadow hover:shadow-lg transition border border-purple-200 dark:border-purple-700 hover:scale-105">
                <Users className="w-10 h-10 text-purple-600 dark:text-purple-400 mb-3 group-hover:scale-110 transition" />
                <span className="font-semibold text-gray-800 dark:text-white mb-2">Profil & Organisasi</span>
                <span className="text-gray-600 dark:text-gray-300 text-sm text-center">Kelola profil organisasi</span>
              </Link>

              <Link href="/admin/sdm-organisasi/staff" className="group bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-lg p-6 flex flex-col items-center shadow hover:shadow-lg transition border border-blue-200 dark:border-blue-700 hover:scale-105">
                <Users className="w-10 h-10 text-blue-600 dark:text-blue-400 mb-3 group-hover:scale-110 transition" />
                <span className="font-semibold text-gray-800 dark:text-white mb-2">Staff & Pimpinan</span>
                <span className="text-gray-600 dark:text-gray-300 text-sm text-center">Kelola staff dan pimpinan</span>
              </Link>

              <Link href="/admin/pengaturan" className="group bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/30 dark:to-teal-900/30 rounded-lg p-6 flex flex-col items-center shadow hover:shadow-lg transition border border-green-200 dark:border-green-700 hover:scale-105 ring-2 ring-green-300 dark:ring-green-600">
                <Settings className="w-10 h-10 text-green-600 dark:text-green-400 mb-3 group-hover:scale-110 transition" />
                <span className="font-semibold text-gray-800 dark:text-white mb-2">Pengaturan Website</span>
                <span className="text-gray-600 dark:text-gray-300 text-sm text-center">Logo, SEO, social media, dsb</span>
                <div className="mt-2">
                  <span className="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded-full">Updated</span>
                </div>
              </Link>

              <Link href="/admin/kontak" className="group bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/30 dark:to-red-900/30 rounded-lg p-6 flex flex-col items-center shadow hover:shadow-lg transition border border-orange-200 dark:border-orange-700 hover:scale-105">
                <Users className="w-10 h-10 text-orange-600 dark:text-orange-400 mb-3 group-hover:scale-110 transition" />
                <span className="font-semibold text-gray-800 dark:text-white mb-2">Kontak</span>
                <span className="text-gray-600 dark:text-gray-300 text-sm text-center">Kelola info kontak & lokasi</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
