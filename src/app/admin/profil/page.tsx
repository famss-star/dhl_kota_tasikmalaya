"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Building, 
  Users, 
  BarChart3, 
  Info,
  Eye,
  Edit3,
  Plus,
  TrendingUp,
  Award,
  CheckCircle,
  UserCheck,
  Network,
  FileText,
  PieChart
} from "lucide-react";

interface ProfilStats {
  id: number;
  nama_modul: string;
  deskripsi: string;
  total_data: number;
  status: 'aktif' | 'non-aktif';
  icon: any;
  color: string;
  href: string;
  detail_stats?: {
    label: string;
    value: number;
  }[];
}

export default function AdminProfilOverviewPage() {
  const [profilData] = useState<ProfilStats[]>([
    {
      id: 1,
      nama_modul: "Tentang DLH",
      deskripsi: "Kelola informasi tentang Dinas Lingkungan Hidup",
      total_data: 1,
      status: "aktif",
      icon: Info,
      color: "blue",
      href: "/admin/profil/tentang",
      detail_stats: [
        { label: "Profil Dinas", value: 1 },
        { label: "Visi & Misi", value: 1 },
        { label: "Sejarah", value: 1 }
      ]
    }
  ]);

  const getColorClasses = (color: string) => {
    const colors = {
      blue: {
        bg: "bg-blue-500",
        hover: "hover:bg-blue-50 dark:hover:bg-blue-900/30",
        text: "text-blue-600 dark:text-blue-400",
        border: "border-blue-200 dark:border-blue-700"
      }
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg p-6">
        <div className="flex items-center gap-4">
          <div className="bg-white/20 p-3 rounded-full">
            <Building className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">Profil Dinas</h1>
            <p className="text-blue-100">Kelola informasi profil dan identitas DLH Kota Tasikmalaya</p>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            <span>Sistem Aktif</span>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-blue-100 dark:bg-blue-900/20 p-3 rounded-full">
              <Info className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Profil Dinas</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Informasi dasar</p>
            </div>
          </div>
          <div className="text-3xl font-bold text-blue-600 mb-2">1</div>
          <div className="text-sm text-gray-600 dark:text-gray-300">Profil lengkap</div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-green-100 dark:bg-green-900/20 p-3 rounded-full">
              <FileText className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Visi & Misi</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Tujuan organisasi</p>
            </div>
          </div>
          <div className="text-3xl font-bold text-green-600 mb-2">3</div>
          <div className="text-sm text-gray-600 dark:text-gray-300">Komponen utama</div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-purple-100 dark:bg-purple-900/20 p-3 rounded-full">
              <Award className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Sejarah</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Perjalanan dinas</p>
            </div>
          </div>
          <div className="text-3xl font-bold text-purple-600 mb-2">1</div>
          <div className="text-sm text-gray-600 dark:text-gray-300">Timeline lengkap</div>
        </div>
      </div>

      {/* Modul Profil */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="border-b border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Modul Profil Dinas</h2>
          <p className="text-gray-600 dark:text-gray-300 mt-1">Kelola informasi identitas dan profil DLH</p>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 gap-6">
            {profilData.map((modul) => {
              const IconComponent = modul.icon;
              const colorClasses = getColorClasses(modul.color);
              
              return (
                <div key={modul.id} className={`bg-gray-50 dark:bg-gray-700 rounded-lg p-6 border ${colorClasses.border} ${colorClasses.hover} transition-colors duration-200`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`${colorClasses.bg} p-3 rounded-full`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{modul.nama_modul}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{modul.deskripsi}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-medium capitalize ${
                      modul.status === 'aktif' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
                        : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300'
                    }`}>
                      {modul.status}
                    </span>
                  </div>

                  <div className="mb-4">
                    <div className={`text-3xl font-bold text-center py-4 text-gray-900 bg-white rounded-xl border ${colorClasses.border} dark:text-white mb-2 dark:bg-gray-800`}>
                      {modul.total_data}
                    </div>
                    {modul.detail_stats && (
                      <div className="grid grid-cols-3 gap-2 text-sm">
                        {modul.detail_stats.map((stat, index) => (
                          <div key={index} className="text-center">
                            <div className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</div>
                            <div className={`font-semibold ${colorClasses.text}`}>{stat.value}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <Link
                      href={modul.href}
                      className={`flex items-center gap-2 px-4 py-2 ${colorClasses.bg} text-white rounded-lg hover:opacity-90 transition-opacity duration-200`}
                    >
                      <Edit3 className="w-4 h-4" />
                      Kelola
                    </Link>
                    <Link
                      href={modul.href}
                      className={`flex items-center gap-2 px-4 py-2 border ${colorClasses.border} ${colorClasses.text} rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200`}
                    >
                      <Eye className="w-4 h-4" />
                      Lihat
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Quick Action */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Aksi Cepat</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href="/admin/profil/tentang"
            className="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors duration-200"
          >
            <Info className="w-5 h-5 text-blue-600" />
            <div>
              <div className="font-medium text-blue-900 dark:text-blue-100">Edit Profil</div>
              <div className="text-sm text-blue-600 dark:text-blue-300">Update info DLH</div>
            </div>
          </Link>

          <Link
            href="/admin/sdm-organisasi"
            className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors duration-200"
          >
            <Users className="w-5 h-5 text-green-600" />
            <div>
              <div className="font-medium text-green-900 dark:text-green-100">SDM & Organisasi</div>
              <div className="text-sm text-green-600 dark:text-green-300">Kelola pegawai & struktur</div>
            </div>
          </Link>
        </div>
      </div>

      {/* Summary Information */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Ringkasan Profil</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Status Sistem</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-300">Profil Dinas</span>
                <span className="text-sm text-green-600 dark:text-green-400 font-medium">Aktif</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-300">Info Lengkap</span>
                <span className="text-sm text-green-600 dark:text-green-400 font-medium">✓ Tersedia</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Last Update</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-300">Profil</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">2 hari lalu</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-300">Visi & Misi</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">1 minggu lalu</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Rekomendasi</h4>
            <div className="space-y-2">
              <div className="text-sm text-blue-600 dark:text-blue-400">
                • Update foto profil dinas
              </div>
              <div className="text-sm text-blue-600 dark:text-blue-400">
                • Review konten sejarah
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
