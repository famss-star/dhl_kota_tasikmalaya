"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FileCheck,
  FileText,
  Scale,
  Droplets,
  Users,
  Eye,
  Edit3,
  Plus,
  BarChart3,
  TrendingUp,
  Award,
  CheckCircle,
  Clock,
  AlertCircle,
  XCircle,
} from "lucide-react";

interface PerizinanStats {
  id: number;
  nama_perizinan: string;
  deskripsi: string;
  total_permohonan: number;
  permohonan_disetujui: number;
  permohonan_pending: number;
  permohonan_ditolak: number;
  waktu_proses_rata: number; // dalam hari
  status: "aktif" | "non-aktif";
  icon: any;
  color: string;
  href: string;
}

export default function AdminPerizinanOverviewPage() {
  const [perizinanData] = useState<PerizinanStats[]>([
    {
      id: 1,
      nama_perizinan: "Perizinan Umum",
      deskripsi: "Perizinan umum dan surat keterangan lingkungan",
      total_permohonan: 145,
      permohonan_disetujui: 120,
      permohonan_pending: 18,
      permohonan_ditolak: 7,
      waktu_proses_rata: 5,
      status: "aktif",
      icon: FileText,
      color: "blue",
      href: "/admin/perizinan/umum",
    },
    {
      id: 2,
      nama_perizinan: "Perizinan AMDAL",
      deskripsi: "Analisis Mengenai Dampak Lingkungan Hidup",
      total_permohonan: 32,
      permohonan_disetujui: 25,
      permohonan_pending: 5,
      permohonan_ditolak: 2,
      waktu_proses_rata: 45,
      status: "aktif",
      icon: Scale,
      color: "green",
      href: "/admin/perizinan/amdal",
    },
    {
      id: 3,
      nama_perizinan: "Perizinan IPLC",
      deskripsi: "Izin Pembuangan Limbah Cair",
      total_permohonan: 87,
      permohonan_disetujui: 72,
      permohonan_pending: 12,
      permohonan_ditolak: 3,
      waktu_proses_rata: 14,
      status: "aktif",
      icon: Droplets,
      color: "cyan",
      href: "/admin/perizinan/iplc",
    },
  ]);

  const totalPermohonan = perizinanData.reduce(
    (sum, item) => sum + item.total_permohonan,
    0
  );
  const totalDisetujui = perizinanData.reduce(
    (sum, item) => sum + item.permohonan_disetujui,
    0
  );
  const totalPending = perizinanData.reduce(
    (sum, item) => sum + item.permohonan_pending,
    0
  );
  const totalDitolak = perizinanData.reduce(
    (sum, item) => sum + item.permohonan_ditolak,
    0
  );

  const tingkatPersetujuan = Math.round(
    (totalDisetujui / totalPermohonan) * 100
  );

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
      cyan: {
        bg: "from-cyan-500 to-cyan-600",
        card: "border-cyan-200 dark:border-cyan-700",
        text: "text-cyan-600 dark:text-cyan-400",
        button: "bg-cyan-600 hover:bg-cyan-700",
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
              <FileCheck className="w-9 h-9 text-white" />
              Overview Perizinan
            </h1>
            <p className="text-xl md:text-2xl opacity-90">
              Dashboard manajemen semua jenis perizinan DLH Kota Tasikmalaya
            </p>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg p-6 border border-blue-200 dark:border-blue-700">
          <div className="flex items-center gap-3 mb-4">
            <FileCheck className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300">
              Total Permohonan
            </h3>
          </div>
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            {totalPermohonan}
          </div>
          <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
            Semua Jenis Perizinan
          </p>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg p-6 border border-green-200 dark:border-green-700">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
            <h3 className="text-lg font-semibold text-green-800 dark:text-green-300">
              Disetujui
            </h3>
          </div>
          <div className="text-3xl font-bold text-green-600 dark:text-green-400">
            {totalDisetujui}
          </div>
          <p className="text-sm text-green-700 dark:text-green-300 mt-1">
            {tingkatPersetujuan}% Tingkat Persetujuan
          </p>
        </div>

        <div className="bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-lg p-6 border border-orange-200 dark:border-orange-700">
          <div className="flex items-center gap-3 mb-4">
            <Clock className="w-8 h-8 text-orange-600 dark:text-orange-400" />
            <h3 className="text-lg font-semibold text-orange-800 dark:text-orange-300">
              Pending
            </h3>
          </div>
          <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">
            {totalPending}
          </div>
          <p className="text-sm text-orange-700 dark:text-orange-300 mt-1">
            Menunggu Proses
          </p>
        </div>

        <div className="bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-lg p-6 border border-red-200 dark:border-red-700">
          <div className="flex items-center gap-3 mb-4">
            <XCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
            <h3 className="text-lg font-semibold text-red-800 dark:text-red-300">
              Ditolak
            </h3>
          </div>
          <div className="text-3xl font-bold text-red-600 dark:text-red-400">
            {totalDitolak}
          </div>
          <p className="text-sm text-red-700 dark:text-red-300 mt-1">
            Permohonan Ditolak
          </p>
        </div>
      </div>

      {/* Perizinan Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {perizinanData.map((perizinan) => {
          const IconComponent = perizinan.icon;
          const colors = getColorClasses(perizinan.color);
          const tingkatSetuju = Math.round(
            (perizinan.permohonan_disetujui / perizinan.total_permohonan) * 100
          );

          return (
            <div
              key={perizinan.id}
              className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg border-2 ${colors.card} overflow-hidden`}
            >
              {/* Header */}
              <div className={`bg-gradient-to-r ${colors.bg} text-white p-6`}>
                <div className="flex items-center gap-4">
                  <div className="bg-white/20 p-3 rounded-full">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold">
                      {perizinan.nama_perizinan}
                    </h3>
                    <p className="text-white/90 text-sm">
                      {perizinan.deskripsi}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="w-5 h-5 text-white" />
                    <span className="text-sm font-medium capitalize">
                      {perizinan.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Main Statistics */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${colors.text}`}>
                      {perizinan.total_permohonan}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      Total Permohonan
                    </div>
                  </div>
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${colors.text}`}>
                      {tingkatSetuju}%
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      Tingkat Persetujuan
                    </div>
                  </div>
                </div>

                {/* Detailed Statistics */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        Disetujui
                      </span>
                    </div>
                    <span className="font-bold text-green-600">
                      {perizinan.permohonan_disetujui}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-orange-600" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        Pending
                      </span>
                    </div>
                    <span className="font-bold text-orange-600">
                      {perizinan.permohonan_pending}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <div className="flex items-center gap-2">
                      <XCircle className="w-4 h-4 text-red-600" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        Ditolak
                      </span>
                    </div>
                    <span className="font-bold text-red-600">
                      {perizinan.permohonan_ditolak}
                    </span>
                  </div>
                </div>

                {/* Processing Time */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      Waktu Proses Rata-rata
                    </span>
                    <span className={`font-bold ${colors.text}`}>
                      {perizinan.waktu_proses_rata} hari
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <Link
                    href={perizinan.href}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 ${colors.button} text-white rounded-lg transition-colors duration-200`}
                  >
                    <Edit3 className="w-4 h-4" />
                    Kelola
                  </Link>
                  <Link
                    href={`${perizinan.href}?tab=preview`}
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
        {/* Processing Time Comparison */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            Waktu Proses Perizinan
          </h3>
          <div className="space-y-4">
            {perizinanData.map((perizinan) => {
              const colors = getColorClasses(perizinan.color);
              const IconComponent = perizinan.icon;

              return (
                <div
                  key={perizinan.id}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-full bg-gradient-to-r ${colors.bg}`}
                    >
                      <IconComponent className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {perizinan.nama_perizinan}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className={`text-lg font-bold ${colors.text}`}>
                      {perizinan.waktu_proses_rata}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-300">
                      hari
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Aksi Cepat
          </h3>
          <div className="space-y-4">
            <Link
              href="/admin/perizinan/permohonan-baru"
              className="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors duration-200"
            >
              <Plus className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <div>
                <div className="font-medium text-gray-900 dark:text-white">
                  Permohonan Baru
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  Tambah permohonan perizinan
                </div>
              </div>
            </Link>

            <Link
              href="/admin/perizinan/pending"
              className="flex items-center gap-3 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors duration-200"
            >
              <Clock className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              <div>
                <div className="font-medium text-gray-900 dark:text-white">
                  Review Pending
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  Tinjau permohonan pending
                </div>
              </div>
            </Link>

            <Link
              href="/admin/perizinan/laporan"
              className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors duration-200"
            >
              <BarChart3 className="w-6 h-6 text-green-600 dark:text-green-400" />
              <div>
                <div className="font-medium text-gray-900 dark:text-white">
                  Laporan Perizinan
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  Generate laporan
                </div>
              </div>
            </Link>

            <Link
              href="/admin/perizinan/template"
              className="flex items-center gap-3 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors duration-200"
            >
              <FileText className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              <div>
                <div className="font-medium text-gray-900 dark:text-white">
                  Template & Format
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  Kelola template perizinan
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Monthly Trends */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-purple-600" />
          Tren Permohonan Bulanan
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              +15%
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Pertumbuhan bulan ini
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              18 hari
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Rata-rata proses
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              94%
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Kepuasan pemohon
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
