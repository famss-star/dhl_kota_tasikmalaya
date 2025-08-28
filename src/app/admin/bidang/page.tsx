"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Building2, 
  TreePine, 
  AlertTriangle, 
  Recycle,
  Users,
  Eye,
  Edit3,
  BarChart3,
  TrendingUp,
  Award,
  CheckCircle
} from "lucide-react";

interface BidangStats {
  id: number;
  slug: string;
  name: string;
  kepala_bidang?: string;
  jumlah_pegawai?: number;
  jumlah_tugas: number;
  jumlah_fungsi: number;
  status: 'aktif' | 'non-aktif';
  icon: any;
  color: string;
  href: string;
}

export default function AdminBidangOverviewPage() {
  const [bidangData, setBidangData] = useState<BidangStats[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBidangData();
  }, []);

  const fetchBidangData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/bidang');
      if (!response.ok) {
        throw new Error('Failed to fetch bidang data');
      }
      const data = await response.json();
      
      // Transform API data to match our interface
      const transformedData: BidangStats[] = data.map((bidang: any) => {
        const tugasPokok = JSON.parse(bidang.tugasPokok || '[]');
        const fungsi = JSON.parse(bidang.fungsi || '[]');
        
        let icon, color;
        switch (bidang.slug) {
          case 'tata-lingkungan':
            icon = TreePine;
            color = 'green';
            break;
          case 'pengendalian-pencemaran':
            icon = AlertTriangle;
            color = 'red';
            break;
          case 'pengelolaan-sampah':
            icon = Recycle;
            color = 'emerald';
            break;
          default:
            icon = Building2;
            color = 'blue';
        }

        return {
          id: bidang.id,
          slug: bidang.slug,
          name: bidang.name,
          kepala_bidang: getKepalaBidang(bidang.slug),
          jumlah_pegawai: getJumlahPegawai(bidang.slug),
          jumlah_tugas: tugasPokok.length,
          jumlah_fungsi: fungsi.length,
          status: bidang.active ? 'aktif' : 'non-aktif' as 'aktif' | 'non-aktif',
          icon,
          color,
          href: `/admin/bidang/${bidang.slug}`
        };
      });
      
      setBidangData(transformedData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  // Helper functions for mock data that's not in API yet
  const getKepalaBidang = (slug: string) => {
    const kepala = {
      'tata-lingkungan': 'Ir. Bambang Hermawan, M.T',
      'pengendalian-pencemaran': 'Dr. Rina Kartika, S.Si, M.Env',
      'pengelolaan-sampah': 'Ir. Dedi Supriadi, M.T'
    };
    return kepala[slug as keyof typeof kepala] || 'Belum ditentukan';
  };

  const getJumlahPegawai = (slug: string) => {
    const pegawai = {
      'tata-lingkungan': 10,
      'pengendalian-pencemaran': 8,
      'pengelolaan-sampah': 15
    };
    return pegawai[slug as keyof typeof pegawai] || 0;
  };

  const totalPegawai = bidangData.reduce((sum, bidang) => sum + (bidang.jumlah_pegawai || 0), 0);
  const totalTugas = bidangData.reduce((sum, bidang) => sum + bidang.jumlah_tugas, 0);
  const totalFungsi = bidangData.reduce((sum, bidang) => sum + bidang.jumlah_fungsi, 0);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/3 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-2/3"></div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
              <div className="animate-pulse">
                <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
                <div className="h-8 bg-gray-300 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg p-6">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-6 h-6 text-red-600" />
            <div>
              <h3 className="text-lg font-semibold text-red-800 dark:text-red-300">Error</h3>
              <p className="text-red-700 dark:text-red-400">{error}</p>
            </div>
          </div>
          <button 
            onClick={fetchBidangData}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  const getColorClasses = (color: string) => {
    const colorMap = {
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
      red: {
        bg: 'from-red-500 to-red-600',
        card: 'border-red-200 dark:border-red-700',
        text: 'text-red-600 dark:text-red-400',
        button: 'bg-red-600 hover:bg-red-700'
      },
      emerald: {
        bg: 'from-emerald-500 to-emerald-600',
        card: 'border-emerald-200 dark:border-emerald-700',
        text: 'text-emerald-600 dark:text-emerald-400',
        button: 'bg-emerald-600 hover:bg-emerald-700'
      }
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
          <Building2 className="w-8 h-8 text-blue-600" />
          Overview Bidang Kerja
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Ringkasan semua bidang kerja di DLH Kota Tasikmalaya
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg p-6 border border-blue-200 dark:border-blue-700">
          <div className="flex items-center gap-3 mb-4">
            <Building2 className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300">Total Bidang</h3>
          </div>
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{bidangData.length}</div>
          <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">Bidang Aktif</p>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg p-6 border border-green-200 dark:border-green-700">
          <div className="flex items-center gap-3 mb-4">
            <Users className="w-8 h-8 text-green-600 dark:text-green-400" />
            <h3 className="text-lg font-semibold text-green-800 dark:text-green-300">Total Pegawai</h3>
          </div>
          <div className="text-3xl font-bold text-green-600 dark:text-green-400">{totalPegawai}</div>
          <p className="text-sm text-green-700 dark:text-green-300 mt-1">Semua Bidang</p>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg p-6 border border-purple-200 dark:border-purple-700">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-300">Total Tugas</h3>
          </div>
          <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">{totalTugas}</div>
          <p className="text-sm text-purple-700 dark:text-purple-300 mt-1">Tugas Pokok</p>
        </div>

        <div className="bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-lg p-6 border border-orange-200 dark:border-orange-700">
          <div className="flex items-center gap-3 mb-4">
            <Award className="w-8 h-8 text-orange-600 dark:text-orange-400" />
            <h3 className="text-lg font-semibold text-orange-800 dark:text-orange-300">Total Fungsi</h3>
          </div>
          <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">{totalFungsi}</div>
          <p className="text-sm text-orange-700 dark:text-orange-300 mt-1">Fungsi Bidang</p>
        </div>
      </div>

      {/* Bidang Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {bidangData.map((bidang) => {
          const IconComponent = bidang.icon;
          const colors = getColorClasses(bidang.color);
          
          return (
            <div 
              key={bidang.id} 
              className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg border-2 ${colors.card} overflow-hidden`}
            >
              {/* Header */}
              <div className={`bg-gradient-to-r ${colors.bg} text-white p-6`}>
                <div className="flex items-center gap-4">
                  <div className="bg-white/20 p-3 rounded-full">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold">{bidang.name}</h3>
                    <p className="text-white/90">{bidang.kepala_bidang}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="w-5 h-5 text-white" />
                    <span className="text-sm font-medium capitalize">{bidang.status}</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Statistics */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${colors.text}`}>{bidang.jumlah_pegawai}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Pegawai</div>
                  </div>
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${colors.text}`}>{bidang.jumlah_tugas}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Tugas</div>
                  </div>
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${colors.text}`}>{bidang.jumlah_fungsi}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Fungsi</div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <Link 
                    href={bidang.href}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 ${colors.button} text-white rounded-lg transition-colors duration-200`}
                  >
                    <Edit3 className="w-4 h-4" />
                    Kelola Bidang
                  </Link>
                  <Link 
                    href={`${bidang.href}?tab=preview`}
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

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Aksi Cepat
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link 
            href="/admin/profil/struktur-organisasi"
            className="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors duration-200"
          >
            <Building2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <div>
              <div className="font-medium text-gray-900 dark:text-white">Struktur Organisasi</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Kelola bagan organisasi</div>
            </div>
          </Link>

          <Link 
            href="/admin/profil/pegawai"
            className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors duration-200"
          >
            <Users className="w-6 h-6 text-green-600 dark:text-green-400" />
            <div>
              <div className="font-medium text-gray-900 dark:text-white">Manajemen Pegawai</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Kelola data pegawai</div>
            </div>
          </Link>

          <Link 
            href="/admin/profil/statistik-pegawai"
            className="flex items-center gap-3 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors duration-200"
          >
            <BarChart3 className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            <div>
              <div className="font-medium text-gray-900 dark:text-white">Statistik Pegawai</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Kelola data statistik</div>
            </div>
          </Link>
        </div>
      </div>

      {/* Performance Overview */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Ringkasan Kinerja Bidang
        </h3>
        <div className="space-y-4">
          {bidangData.map((bidang) => {
            const colors = getColorClasses(bidang.color);
            const IconComponent = bidang.icon;
            const efficiency = Math.round(((bidang.jumlah_pegawai || 0) / (bidang.jumlah_tugas + bidang.jumlah_fungsi)) * 100);
            
            return (
              <div key={bidang.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-full bg-gradient-to-r ${colors.bg}`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">{bidang.name}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">{bidang.kepala_bidang}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-xl font-bold ${colors.text}`}>{efficiency}%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Efisiensi SDM</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
