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
  CheckCircle,
} from "lucide-react";

interface BidangStats {
  id: string;
  slug: string;
  name: string;
  kepala_bidang?: string;
  jumlah_pegawai?: number;
  jumlah_tugas: number;
  jumlah_fungsi: number;
  status: "aktif" | "non-aktif";
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
      setError(null);

      const response = await fetch("/api/bidang");
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: Failed to fetch bidang data`);
      }

      const result = await response.json();
      console.log("API Response:", result); // Debug log

      // Check if API response has the expected structure
      if (!result.success) {
        throw new Error(result.error || "API returned unsuccessful response");
      }

      if (!Array.isArray(result.data)) {
        throw new Error(
          "Expected array of bidang data, got: " + typeof result.data
        );
      }

      // Transform API data to match our interface
      const transformedData: BidangStats[] = result.data.map((bidang: any) => {
        // Handle JSON fields safely
        let tugasPokok: any[] = [];
        let fungsi: any[] = [];

        try {
          if (Array.isArray(bidang.tugasPokok)) {
            tugasPokok = bidang.tugasPokok;
          } else if (typeof bidang.tugasPokok === "string") {
            tugasPokok = JSON.parse(bidang.tugasPokok || "[]");
          } else if (
            bidang.tugasPokok &&
            typeof bidang.tugasPokok === "object"
          ) {
            tugasPokok = [bidang.tugasPokok];
          }
        } catch (e) {
          console.warn("Error parsing tugasPokok for bidang", bidang.slug, e);
          tugasPokok = [];
        }

        try {
          if (Array.isArray(bidang.fungsi)) {
            fungsi = bidang.fungsi;
          } else if (typeof bidang.fungsi === "string") {
            fungsi = JSON.parse(bidang.fungsi || "[]");
          } else if (bidang.fungsi && typeof bidang.fungsi === "object") {
            fungsi = [bidang.fungsi];
          }
        } catch (e) {
          console.warn("Error parsing fungsi for bidang", bidang.slug, e);
          fungsi = [];
        }

        let icon, color;
        switch (bidang.slug) {
          case "tata-lingkungan":
            icon = TreePine;
            color = "green";
            break;
          case "pengendalian-pencemaran":
            icon = AlertTriangle;
            color = "red";
            break;
          case "pengelolaan-sampah":
            icon = Recycle;
            color = "emerald";
            break;
          default:
            icon = Building2;
            color = "blue";
        }

        return {
          id: bidang.id,
          slug: bidang.slug,
          name: bidang.name,
          kepala_bidang: getKepalaBidang(bidang.slug),
          jumlah_pegawai: getJumlahPegawai(bidang.slug),
          jumlah_tugas: tugasPokok.length,
          jumlah_fungsi: fungsi.length,
          status: bidang.isActive ? "aktif" : "non-aktif",
          icon,
          color,
          href: `/admin/bidang/${bidang.slug}`,
        };
      });

      setBidangData(transformedData);

      // If no data, log for debugging
      if (transformedData.length === 0) {
        console.log("No bidang data found. Database might be empty.");
      }
    } catch (err) {
      console.error("Error in fetchBidangData:", err);
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Helper functions for mock data that's not in API yet
  const getKepalaBidang = (slug: string) => {
    const kepala = {
      "tata-lingkungan": "Ir. Bambang Hermawan, M.T",
      "pengendalian-pencemaran": "Dr. Rina Kartika, S.Si, M.Env",
      "pengelolaan-sampah": "Ir. Dedi Supriadi, M.T",
    };
    return kepala[slug as keyof typeof kepala] || "Belum ditentukan";
  };

  const getJumlahPegawai = (slug: string) => {
    const pegawai = {
      "tata-lingkungan": 10,
      "pengendalian-pencemaran": 8,
      "pengelolaan-sampah": 15,
    };
    return pegawai[slug as keyof typeof pegawai] || 0;
  };

  const totalPegawai = bidangData.reduce(
    (sum, bidang) => sum + (bidang.jumlah_pegawai || 0),
    0
  );
  const totalTugas = bidangData.reduce(
    (sum, bidang) => sum + bidang.jumlah_tugas,
    0
  );
  const totalFungsi = bidangData.reduce(
    (sum, bidang) => sum + bidang.jumlah_fungsi,
    0
  );

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
            <div
              key={i}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700"
            >
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
              <h3 className="text-lg font-semibold text-red-800 dark:text-red-300">
                Error Loading Data
              </h3>
              <p className="text-red-700 dark:text-red-400">{error}</p>
              <p className="text-sm text-red-600 dark:text-red-400 mt-2">
                Check browser console for more details.
              </p>
            </div>
          </div>
          <button
            onClick={fetchBidangData}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  // If no data but no error, show empty state
  if (bidangData.length === 0) {
    return (
      <div className="space-y-6">
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg p-6">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-6 h-6 text-yellow-600" />
            <div>
              <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-300">
                No Data Found
              </h3>
              <p className="text-yellow-700 dark:text-yellow-400">
                Tidak ada data bidang ditemukan. Database mungkin masih kosong.
              </p>
              <p className="text-sm text-yellow-600 dark:text-yellow-400 mt-2">
                Silakan tambah data bidang terlebih dahulu atau periksa koneksi
                database.
              </p>
            </div>
          </div>
          <button
            onClick={fetchBidangData}
            className="mt-4 px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition-colors"
          >
            Refresh
          </button>
        </div>
      </div>
    );
  }

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: {
        bg: "from-blue-500 to-blue-600",
        card: "border-blue-200 dark:border-blue-700",
        text: "text-blue-600 dark:text-blue-400",
        button: "bg-blue-600 hover:bg-blue-700",
      },
      green: {
        bg: "from-green-500 to-green-600",
        card: "border-green-200 dark:border-green-700",
        text: "text-green-600 dark:text-green-400",
        button: "bg-green-600 hover:bg-green-700",
      },
      red: {
        bg: "from-red-500 to-red-600",
        card: "border-red-200 dark:border-red-700",
        text: "text-red-600 dark:text-red-400",
        button: "bg-red-600 hover:bg-red-700",
      },
      emerald: {
        bg: "from-emerald-500 to-emerald-600",
        card: "border-emerald-200 dark:border-emerald-700",
        text: "text-emerald-600 dark:text-emerald-400",
        button: "bg-emerald-600 hover:bg-emerald-700",
      },
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-3">
              <Building2 className="w-9 h-9 text-white" />
              Manajemen Bidang Kerja
            </h1>
            <p className="text-xl md:text-2xl opacity-90">
              Kelola semua bidang kerja di DLH Kota Tasikmalaya
            </p>
          </div>
        </div>
      </div>

      <div className="py-12">
        <div className="max-w-8xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 md:p-12 border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-8 flex items-center gap-2">
            <Building2 className="w-6 h-6 text-green-600" />
            Ringkasan Semua Bidang
          </h2>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg p-6 border border-green-200 dark:border-green-700">
              <div className="flex items-center gap-3 mb-4">
                <Building2 className="w-8 h-8 text-green-600 dark:text-green-400" />
                <h3 className="text-lg font-semibold text-green-800 dark:text-green-300">
                  Total Bidang
                </h3>
              </div>
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                {bidangData.length}
              </div>
              <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                Bidang Aktif
              </p>
            </div>

            <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 rounded-lg p-6 border border-emerald-200 dark:border-emerald-700">
              <div className="flex items-center gap-3 mb-4">
                <Users className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                <h3 className="text-lg font-semibold text-emerald-800 dark:text-emerald-300">
                  Total Pegawai
                </h3>
              </div>
              <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                {totalPegawai}
              </div>
              <p className="text-sm text-emerald-700 dark:text-emerald-300 mt-1">
                Semua Bidang
              </p>
            </div>

            <div className="bg-gradient-to-r from-teal-50 to-teal-100 dark:from-teal-900/20 dark:to-teal-800/20 rounded-lg p-6 border border-teal-200 dark:border-teal-700">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="w-8 h-8 text-teal-600 dark:text-teal-400" />
                <h3 className="text-lg font-semibold text-teal-800 dark:text-teal-300">
                  Total Tugas
                </h3>
              </div>
              <div className="text-3xl font-bold text-teal-600 dark:text-teal-400">
                {totalTugas}
              </div>
              <p className="text-sm text-teal-700 dark:text-teal-300 mt-1">
                Tugas Pokok
              </p>
            </div>

            <div className="bg-gradient-to-r from-cyan-50 to-cyan-100 dark:from-cyan-900/20 dark:to-cyan-800/20 rounded-lg p-6 border border-cyan-200 dark:border-cyan-700">
              <div className="flex items-center gap-3 mb-4">
                <Award className="w-8 h-8 text-cyan-600 dark:text-cyan-400" />
                <h3 className="text-lg font-semibold text-cyan-800 dark:text-cyan-300">
                  Total Fungsi
                </h3>
              </div>
              <div className="text-3xl font-bold text-cyan-600 dark:text-cyan-400">
                {totalFungsi}
              </div>
              <p className="text-sm text-cyan-700 dark:text-cyan-300 mt-1">
                Fungsi Bidang
              </p>
            </div>
          </div>

          {/* Bidang Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {bidangData.map((bidang) => {
              const IconComponent = bidang.icon;
              const colors = getColorClasses(bidang.color);

              return (
                <div
                  key={bidang.id}
                  className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg border-2 ${colors.card} overflow-hidden`}
                >
                  {/* Header */}
                  <div
                    className={`bg-gradient-to-r ${colors.bg} text-white p-6`}
                  >
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
                        <span className="text-sm font-medium capitalize">
                          {bidang.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Statistics */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="text-center">
                        <div className={`text-2xl font-bold ${colors.text}`}>
                          {bidang.jumlah_pegawai}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">
                          Pegawai
                        </div>
                      </div>
                      <div className="text-center">
                        <div className={`text-2xl font-bold ${colors.text}`}>
                          {bidang.jumlah_tugas}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">
                          Tugas
                        </div>
                      </div>
                      <div className="text-center">
                        <div className={`text-2xl font-bold ${colors.text}`}>
                          {bidang.jumlah_fungsi}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">
                          Fungsi
                        </div>
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
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700/50 dark:to-gray-600/50 rounded-lg p-8 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-green-600" />
              Aksi Cepat
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link
                href="/admin/profil/struktur-organisasi"
                className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20 border border-gray-200 dark:border-gray-600 hover:border-green-300 dark:hover:border-green-600 transition-colors duration-200"
              >
                <Building2 className="w-6 h-6 text-green-600 dark:text-green-400" />
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">
                    Struktur Organisasi
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    Kelola bagan organisasi
                  </div>
                </div>
              </Link>

              <Link
                href="/admin/profil/pegawai"
                className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/20 border border-gray-200 dark:border-gray-600 hover:border-emerald-300 dark:hover:border-emerald-600 transition-colors duration-200"
              >
                <Users className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">
                    Manajemen Pegawai
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    Kelola data pegawai
                  </div>
                </div>
              </Link>

              <Link
                href="/admin/profil/statistik-pegawai"
                className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-lg hover:bg-teal-50 dark:hover:bg-teal-900/20 border border-gray-200 dark:border-gray-600 hover:border-teal-300 dark:hover:border-teal-600 transition-colors duration-200"
              >
                <BarChart3 className="w-6 h-6 text-teal-600 dark:text-teal-400" />
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">
                    Statistik Pegawai
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    Kelola data statistik
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* Performance Overview */}
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700/50 dark:to-gray-600/50 rounded-lg p-8">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-green-600" />
              Ringkasan Kinerja Bidang
            </h3>
            <div className="space-y-4">
              {bidangData.map((bidang) => {
                const colors = getColorClasses(bidang.color);
                const IconComponent = bidang.icon;
                const efficiency = Math.round(
                  ((bidang.jumlah_pegawai || 0) /
                    (bidang.jumlah_tugas + bidang.jumlah_fungsi)) *
                    100
                );

                return (
                  <div
                    key={bidang.id}
                    className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`p-3 rounded-full bg-gradient-to-r ${colors.bg}`}
                      >
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">
                          {bidang.name}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">
                          {bidang.kepala_bidang}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-xl font-bold ${colors.text}`}>
                        {efficiency}%
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">
                        Efisiensi SDM
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
