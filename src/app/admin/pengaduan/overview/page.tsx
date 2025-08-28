"use client";

import { useState } from "react";
import { 
  MessageSquare, 
  Plus, 
  Eye, 
  Search,
  Filter,
  AlertTriangle,
  CheckCircle,
  Clock,
  Users,
  Phone,
  Mail,
  MapPin,
  Calendar,
  TrendingUp,
  FileText,
  User,
  HelpCircle,
  Settings
} from "lucide-react";
import Link from "next/link";

interface PengaduanStats {
  total_pengaduan: number;
  pengaduan_baru: number;
  dalam_proses: number;
  selesai: number;
  ditolak: number;
  rata_rata_penyelesaian: number; // hari
  tingkat_kepuasan: number; // persen
  trend_bulanan: number; // persen perubahan
}

interface BantuanStats {
  total_bantuan: number;
  bantuan_aktif: number;
  bantuan_selesai: number;
  konsultasi_hari_ini: number;
  waktu_respon_rata: number; // jam
  tingkat_solusi: number; // persen
}

interface KategoriPengaduan {
  kategori: string;
  jumlah: number;
  persentase: number;
  trend: 'naik' | 'turun' | 'stabil';
  warna: string;
}

interface ChannelKomunikasi {
  channel: string;
  jumlah_pengaduan: number;
  response_time: number; // jam
  satisfaction: number; // persen
  icon: any;
  warna: string;
}

export default function AdminPengaduanBantuanOverviewPage() {
  const [activeFilter, setActiveFilter] = useState<'semua' | 'baru' | 'proses' | 'selesai'>('semua');
  const [searchTerm, setSearchTerm] = useState("");

  const pengaduanStats: PengaduanStats = {
    total_pengaduan: 1247,
    pengaduan_baru: 23,
    dalam_proses: 45,
    selesai: 1156,
    ditolak: 23,
    rata_rata_penyelesaian: 5.8,
    tingkat_kepuasan: 87,
    trend_bulanan: 12.5
  };

  const bantuanStats: BantuanStats = {
    total_bantuan: 892,
    bantuan_aktif: 34,
    bantuan_selesai: 845,
    konsultasi_hari_ini: 8,
    waktu_respon_rata: 2.3,
    tingkat_solusi: 94
  };

  const kategoriPengaduan: KategoriPengaduan[] = [
    {
      kategori: "Pencemaran Air",
      jumlah: 456,
      persentase: 36.6,
      trend: 'naik',
      warna: 'blue'
    },
    {
      kategori: "Pencemaran Udara",
      jumlah: 312,
      persentase: 25.0,
      trend: 'turun',
      warna: 'gray'
    },
    {
      kategori: "Sampah & Limbah",
      jumlah: 289,
      persentase: 23.2,
      trend: 'naik',
      warna: 'green'
    },
    {
      kategori: "Kebisingan",
      jumlah: 134,
      persentase: 10.7,
      trend: 'stabil',
      warna: 'yellow'
    },
    {
      kategori: "Lainnya",
      jumlah: 56,
      persentase: 4.5,
      trend: 'turun',
      warna: 'purple'
    }
  ];

  const channelKomunikasi: ChannelKomunikasi[] = [
    {
      channel: "Website",
      jumlah_pengaduan: 523,
      response_time: 2.1,
      satisfaction: 89,
      icon: MessageSquare,
      warna: 'blue'
    },
    {
      channel: "WhatsApp",
      jumlah_pengaduan: 398,
      response_time: 1.8,
      satisfaction: 92,
      icon: Phone,
      warna: 'green'
    },
    {
      channel: "Email",
      jumlah_pengaduan: 201,
      response_time: 4.2,
      satisfaction: 85,
      icon: Mail,
      warna: 'purple'
    },
    {
      channel: "Tatap Muka",
      jumlah_pengaduan: 125,
      response_time: 0.5,
      satisfaction: 95,
      icon: Users,
      warna: 'orange'
    }
  ];

  const getColorClasses = (warna: string, variant: 'bg' | 'text' | 'border' = 'bg') => {
    const colorMap = {
      blue: {
        bg: 'bg-blue-500',
        text: 'text-blue-600',
        border: 'border-blue-500'
      },
      green: {
        bg: 'bg-green-500',
        text: 'text-green-600',
        border: 'border-green-500'
      },
      gray: {
        bg: 'bg-gray-500',
        text: 'text-gray-600',
        border: 'border-gray-500'
      },
      yellow: {
        bg: 'bg-yellow-500',
        text: 'text-yellow-600',
        border: 'border-yellow-500'
      },
      purple: {
        bg: 'bg-purple-500',
        text: 'text-purple-600',
        border: 'border-purple-500'
      },
      orange: {
        bg: 'bg-orange-500',
        text: 'text-orange-600',
        border: 'border-orange-500'
      }
    };
    return colorMap[warna as keyof typeof colorMap]?.[variant] || colorMap.blue[variant];
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'naik':
        return <TrendingUp className="w-4 h-4 text-red-500" />;
      case 'turun':
        return <TrendingUp className="w-4 h-4 text-green-500 rotate-180" />;
      default:
        return <div className="w-4 h-4 bg-gray-400 rounded-full"></div>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-full">
              <MessageSquare className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Pengaduan & Bantuan</h1>
              <p className="text-red-100">Sistem pengelolaan pengaduan dan bantuan masyarakat</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{pengaduanStats.total_pengaduan}</div>
            <div className="text-red-100">Total Pengaduan</div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pengaduan Baru</p>
              <p className="text-2xl font-bold text-red-600">{pengaduanStats.pengaduan_baru}</p>
            </div>
            <div className="bg-red-100 dark:bg-red-900/20 p-3 rounded-full">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-600">+{pengaduanStats.trend_bulanan}%</span>
            <span className="text-gray-500 ml-1">vs bulan lalu</span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Dalam Proses</p>
              <p className="text-2xl font-bold text-yellow-600">{pengaduanStats.dalam_proses}</p>
            </div>
            <div className="bg-yellow-100 dark:bg-yellow-900/20 p-3 rounded-full">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
          <div className="mt-2 text-sm text-gray-500">
            Rata-rata {pengaduanStats.rata_rata_penyelesaian} hari
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Selesai</p>
              <p className="text-2xl font-bold text-green-600">{pengaduanStats.selesai}</p>
            </div>
            <div className="bg-green-100 dark:bg-green-900/20 p-3 rounded-full">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-2 text-sm text-gray-500">
            Kepuasan {pengaduanStats.tingkat_kepuasan}%
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Bantuan Aktif</p>
              <p className="text-2xl font-bold text-blue-600">{bantuanStats.bantuan_aktif}</p>
            </div>
            <div className="bg-blue-100 dark:bg-blue-900/20 p-3 rounded-full">
              <HelpCircle className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-2 text-sm text-gray-500">
            Respon {bantuanStats.waktu_respon_rata} jam
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Kategori Pengaduan */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Kategori Pengaduan</h3>
              <Link 
                href="/admin/pengaduan/kategori"
                className="text-red-600 hover:text-red-700 font-medium text-sm transition-colors duration-200"
              >
                Kelola Kategori
              </Link>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {kategoriPengaduan.map((kategori, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                  <div className="flex items-center gap-4 flex-1">
                    <div className={`w-4 h-4 rounded-full ${getColorClasses(kategori.warna, 'bg')}`}></div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 dark:text-white">{kategori.kategori}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{kategori.jumlah} pengaduan ({kategori.persentase}%)</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getTrendIcon(kategori.trend)}
                    <div className="w-24 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${getColorClasses(kategori.warna, 'bg')}`}
                        style={{ width: `${kategori.persentase}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Channel Komunikasi */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Channel Komunikasi</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {channelKomunikasi.map((channel, index) => {
                const IconComponent = channel.icon;
                return (
                  <div key={index} className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`p-2 rounded-lg bg-${channel.warna}-100 dark:bg-${channel.warna}-900/20`}>
                        <IconComponent className={`w-4 h-4 ${getColorClasses(channel.warna, 'text')}`} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 dark:text-white">{channel.channel}</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{channel.jumlah_pengaduan} pengaduan</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-gray-500 dark:text-gray-400">Respon:</span>
                        <div className="font-medium text-gray-900 dark:text-white">{channel.response_time} jam</div>
                      </div>
                      <div>
                        <span className="text-gray-500 dark:text-gray-400">Kepuasan:</span>
                        <div className="font-medium text-gray-900 dark:text-white">{channel.satisfaction}%</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link 
          href="/admin/pengaduan"
          className="group bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 hover:border-red-300 dark:hover:border-red-600 transition-all duration-200 hover:shadow-lg"
        >
          <div className="flex items-center gap-4">
            <div className="bg-red-100 dark:bg-red-900/20 p-3 rounded-full group-hover:bg-red-200 dark:group-hover:bg-red-900/30 transition-colors duration-200">
              <MessageSquare className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Manajemen Pengaduan</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Kelola pengaduan masuk</p>
            </div>
          </div>
        </Link>

        <Link 
          href="/admin/pengaduan/bantuan"
          className="group bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200 hover:shadow-lg"
        >
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 dark:bg-blue-900/20 p-3 rounded-full group-hover:bg-blue-200 dark:group-hover:bg-blue-900/30 transition-colors duration-200">
              <HelpCircle className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Sistem Bantuan</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Layanan bantuan masyarakat</p>
            </div>
          </div>
        </Link>

        <Link 
          href="/admin/pengaduan/laporan"
          className="group bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-600 transition-all duration-200 hover:shadow-lg"
        >
          <div className="flex items-center gap-4">
            <div className="bg-green-100 dark:bg-green-900/20 p-3 rounded-full group-hover:bg-green-200 dark:group-hover:bg-green-900/30 transition-colors duration-200">
              <FileText className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Laporan & Analisis</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Report dan statistik</p>
            </div>
          </div>
        </Link>

        <Link 
          href="/admin/pengaduan/pengaturan"
          className="group bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-200 hover:shadow-lg"
        >
          <div className="flex items-center gap-4">
            <div className="bg-purple-100 dark:bg-purple-900/20 p-3 rounded-full group-hover:bg-purple-200 dark:group-hover:bg-purple-900/30 transition-colors duration-200">
              <Settings className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Pengaturan Sistem</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Konfigurasi sistem</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Aktivitas Terbaru</h3>
            <Link 
              href="/admin/pengaduan"
              className="text-red-600 hover:text-red-700 font-medium text-sm transition-colors duration-200"
            >
              Lihat Semua
            </Link>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {[
              {
                type: "pengaduan_baru",
                message: "Pengaduan baru tentang pencemaran air dari Jl. Sukaraja",
                time: "5 menit lalu",
                icon: AlertTriangle,
                color: "red"
              },
              {
                type: "pengaduan_selesai",
                message: "Pengaduan limbah industri di Kawasan Industri telah diselesaikan",
                time: "1 jam lalu", 
                icon: CheckCircle,
                color: "green"
              },
              {
                type: "bantuan_diminta",
                message: "Permintaan bantuan konsultasi AMDAL dari PT. Sejahtera",
                time: "2 jam lalu",
                icon: HelpCircle,
                color: "blue"
              },
              {
                type: "pengaduan_proses",
                message: "Tim lapangan sedang menangani kebisingan di Jl. Merdeka",
                time: "3 jam lalu",
                icon: Clock,
                color: "yellow"
              }
            ].map((activity, index) => {
              const IconComponent = activity.icon;
              return (
                <div key={index} className="flex items-start gap-4 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200">
                  <div className={`p-2 rounded-full bg-${activity.color}-100 dark:bg-${activity.color}-900/20`}>
                    <IconComponent className={`w-4 h-4 text-${activity.color}-600`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900 dark:text-white">{activity.message}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{activity.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
