"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Shield, 
  Users, 
  Phone, 
  MessageSquare,
  FileText,
  Clock,
  Eye,
  Edit3,
  Plus,
  BarChart3,
  TrendingUp,
  Award,
  CheckCircle,
  Star,
  HeartHandshake,
  HelpCircle,
  AlertCircle
} from "lucide-react";

interface PelayananStats {
  id: number;
  nama_pelayanan: string;
  deskripsi: string;
  total_layanan: number;
  layanan_selesai: number;
  layanan_proses: number;
  layanan_pending: number;
  waktu_respon_rata: number; // dalam jam
  tingkat_kepuasan: number; // dalam persen
  status: 'aktif' | 'non-aktif';
  icon: any;
  color: string;
  href: string;
}

export default function AdminPelayananOverviewPage() {
  const [pelayananData] = useState<PelayananStats[]>([
    {
      id: 1,
      nama_pelayanan: "Pengaduan Masyarakat",
      deskripsi: "Layanan pengaduan lingkungan hidup dari masyarakat",
      total_layanan: 234,
      layanan_selesai: 198,
      layanan_proses: 28,
      layanan_pending: 8,
      waktu_respon_rata: 4,
      tingkat_kepuasan: 92,
      status: "aktif",
      icon: MessageSquare,
      color: "red",
      href: "/admin/pelayanan/pengaduan"
    },
    {
      id: 2,
      nama_pelayanan: "Konsultasi Lingkungan",
      deskripsi: "Layanan konsultasi dan bimbingan teknis lingkungan",
      total_layanan: 156,
      layanan_selesai: 142,
      layanan_proses: 12,
      layanan_pending: 2,
      waktu_respon_rata: 2,
      tingkat_kepuasan: 96,
      status: "aktif",
      icon: HelpCircle,
      color: "blue",
      href: "/admin/pelayanan/konsultasi"
    },
    {
      id: 3,
      nama_pelayanan: "Informasi Publik",
      deskripsi: "Layanan permintaan informasi publik sesuai UU KIP",
      total_layanan: 89,
      layanan_selesai: 81,
      layanan_proses: 6,
      layanan_pending: 2,
      waktu_respon_rata: 6,
      tingkat_kepuasan: 88,
      status: "aktif",
      icon: FileText,
      color: "green",
      href: "/admin/pelayanan/informasi-publik"
    },
    {
      id: 4,
      nama_pelayanan: "Layanan Terpadu",
      deskripsi: "One-stop service untuk semua layanan DLH",
      total_layanan: 312,
      layanan_selesai: 287,
      layanan_proses: 20,
      layanan_pending: 5,
      waktu_respon_rata: 3,
      tingkat_kepuasan: 94,
      status: "aktif",
      icon: Shield,
      color: "purple",
      href: "/admin/pelayanan/terpadu"
    }
  ]);

  const totalLayanan = pelayananData.reduce((sum, item) => sum + item.total_layanan, 0);
  const totalSelesai = pelayananData.reduce((sum, item) => sum + item.layanan_selesai, 0);
  const totalProses = pelayananData.reduce((sum, item) => sum + item.layanan_proses, 0);
  const totalPending = pelayananData.reduce((sum, item) => sum + item.layanan_pending, 0);

  const rataKepuasan = Math.round(
    pelayananData.reduce((sum, item) => sum + item.tingkat_kepuasan, 0) / pelayananData.length
  );

  const getColorClasses = (color: string) => {
    const colorMap = {
      red: {
        bg: 'from-red-500 to-red-600',
        card: 'border-red-200 dark:border-red-700',
        text: 'text-red-600 dark:text-red-400',
        button: 'bg-red-600 hover:bg-red-700'
      },
      blue: {
        bg: 'from-blue-500 to-blue-600',
        card: 'border-blue-200 dark:border-blue-700',
        text: 'text-blue-600 dark:text-blue-400',
        button: 'bg-blue-600 hover:bg-blue-700'
      },
      green: {
        bg: 'from-green-500 to-green-600',
        card: 'border-green-200 dark:border-green-700',
        text: 'text-green-600 dark:text-green-400',
        button: 'bg-green-600 hover:bg-green-700'
      },
      purple: {
        bg: 'from-purple-500 to-purple-600',
        card: 'border-purple-200 dark:border-purple-700',
        text: 'text-purple-600 dark:text-purple-400',
        button: 'bg-purple-600 hover:bg-purple-700'
      }
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
          <Shield className="w-8 h-8 text-blue-600" />
          Overview Pelayanan
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Dashboard manajemen semua jenis pelayanan publik DLH Kota Tasikmalaya
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg p-6 border border-blue-200 dark:border-blue-700">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300">Total Layanan</h3>
          </div>
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{totalLayanan}</div>
          <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">Semua Jenis Pelayanan</p>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg p-6 border border-green-200 dark:border-green-700">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
            <h3 className="text-lg font-semibold text-green-800 dark:text-green-300">Selesai</h3>
          </div>
          <div className="text-3xl font-bold text-green-600 dark:text-green-400">{totalSelesai}</div>
          <p className="text-sm text-green-700 dark:text-green-300 mt-1">{Math.round((totalSelesai/totalLayanan)*100)}% dari Total</p>
        </div>

        <div className="bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-lg p-6 border border-orange-200 dark:border-orange-700">
          <div className="flex items-center gap-3 mb-4">
            <Clock className="w-8 h-8 text-orange-600 dark:text-orange-400" />
            <h3 className="text-lg font-semibold text-orange-800 dark:text-orange-300">Proses</h3>
          </div>
          <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">{totalProses}</div>
          <p className="text-sm text-orange-700 dark:text-orange-300 mt-1">Sedang Diproses</p>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg p-6 border border-purple-200 dark:border-purple-700">
          <div className="flex items-center gap-3 mb-4">
            <Star className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-300">Kepuasan</h3>
          </div>
          <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">{rataKepuasan}%</div>
          <p className="text-sm text-purple-700 dark:text-purple-300 mt-1">Rata-rata Kepuasan</p>
        </div>
      </div>

      {/* Pelayanan Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {pelayananData.map((pelayanan) => {
          const IconComponent = pelayanan.icon;
          const colors = getColorClasses(pelayanan.color);
          const tingkatSelesai = Math.round((pelayanan.layanan_selesai / pelayanan.total_layanan) * 100);
          
          return (
            <div 
              key={pelayanan.id} 
              className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg border-2 ${colors.card} overflow-hidden`}
            >
              {/* Header */}
              <div className={`bg-gradient-to-r ${colors.bg} text-white p-6`}>
                <div className="flex items-center gap-4">
                  <div className="bg-white/20 p-3 rounded-full">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold">{pelayanan.nama_pelayanan}</h3>
                    <p className="text-white/90 text-sm">{pelayanan.deskripsi}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="w-5 h-5 text-white" />
                    <span className="text-sm font-medium capitalize">{pelayanan.status}</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Main Statistics */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${colors.text}`}>{pelayanan.total_layanan}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Total</div>
                  </div>
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${colors.text}`}>{tingkatSelesai}%</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Selesai</div>
                  </div>
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${colors.text}`}>{pelayanan.tingkat_kepuasan}%</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Puas</div>
                  </div>
                </div>

                {/* Detailed Statistics */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Selesai</span>
                    </div>
                    <span className="font-bold text-green-600">{pelayanan.layanan_selesai}</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-orange-600" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Proses</span>
                    </div>
                    <span className="font-bold text-orange-600">{pelayanan.layanan_proses}</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-red-600" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Pending</span>
                    </div>
                    <span className="font-bold text-red-600">{pelayanan.layanan_pending}</span>
                  </div>
                </div>

                {/* Response Time */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-300">Waktu Respon Rata-rata</span>
                    <span className={`font-bold ${colors.text}`}>{pelayanan.waktu_respon_rata} jam</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <Link 
                    href={pelayanan.href}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 ${colors.button} text-white rounded-lg transition-colors duration-200`}
                  >
                    <Edit3 className="w-4 h-4" />
                    Kelola
                  </Link>
                  <Link 
                    href={`${pelayanan.href}?tab=preview`}
                    className="flex items-center justify-center px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors duration-200"
                  >
                    <Eye className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Response Time Comparison */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-600" />
            Waktu Respon Pelayanan
          </h3>
          <div className="space-y-4">
            {pelayananData.map((pelayanan) => {
              const colors = getColorClasses(pelayanan.color);
              const IconComponent = pelayanan.icon;
              
              return (
                <div key={pelayanan.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full bg-gradient-to-r ${colors.bg}`}>
                      <IconComponent className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-medium text-gray-900 dark:text-white">{pelayanan.nama_pelayanan}</span>
                  </div>
                  <div className="text-right">
                    <div className={`text-lg font-bold ${colors.text}`}>{pelayanan.waktu_respon_rata}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-300">jam</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Satisfaction Ratings */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-600" />
            Tingkat Kepuasan
          </h3>
          <div className="space-y-4">
            {pelayananData.map((pelayanan) => {
              const colors = getColorClasses(pelayanan.color);
              const IconComponent = pelayanan.icon;
              
              return (
                <div key={pelayanan.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full bg-gradient-to-r ${colors.bg}`}>
                      <IconComponent className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-medium text-gray-900 dark:text-white">{pelayanan.nama_pelayanan}</span>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1">
                      <div className={`text-lg font-bold ${colors.text}`}>{pelayanan.tingkat_kepuasan}%</div>
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Aksi Cepat
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link 
            href="/admin/pelayanan/pengaduan/baru"
            className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors duration-200"
          >
            <Plus className="w-6 h-6 text-red-600 dark:text-red-400" />
            <div>
              <div className="font-medium text-gray-900 dark:text-white">Pengaduan Baru</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Input pengaduan</div>
            </div>
          </Link>

          <Link 
            href="/admin/pelayanan/konsultasi/jadwal"
            className="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors duration-200"
          >
            <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <div>
              <div className="font-medium text-gray-900 dark:text-white">Jadwal Konsultasi</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Atur jadwal</div>
            </div>
          </Link>

          <Link 
            href="/admin/pelayanan/laporan"
            className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors duration-200"
          >
            <BarChart3 className="w-6 h-6 text-green-600 dark:text-green-400" />
            <div>
              <div className="font-medium text-gray-900 dark:text-white">Laporan Pelayanan</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Generate laporan</div>
            </div>
          </Link>

          <Link 
            href="/admin/pelayanan/feedback"
            className="flex items-center gap-3 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors duration-200"
          >
            <HeartHandshake className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            <div>
              <div className="font-medium text-gray-900 dark:text-white">Feedback</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Kelola feedback</div>
            </div>
          </Link>
        </div>
      </div>

      {/* Monthly Trends */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-green-600" />
          Tren Pelayanan Bulanan
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">+18%</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Pertumbuhan layanan</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">3.5 jam</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Rata-rata respon</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">92%</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Tingkat kepuasan</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">98%</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Tingkat penyelesaian</div>
          </div>
        </div>
      </div>
    </div>
  );
}
