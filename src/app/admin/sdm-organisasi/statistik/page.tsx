"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BarChart3,
  Users,
  TrendingUp,
  Calendar,
  Download,
  ArrowLeft,
  Award,
  Building,
  Target,
  Clock,
} from "lucide-react";

export default function AdminStatistikPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("2024");
  const [selectedBidang, setSelectedBidang] = useState("all");

  // Mock data untuk statistik
  const statistikData = {
    totalPegawai: 145,
    pegawaiAktif: 138,
    pegawaiNonAktif: 7,
    jabatanKosong: 3,
    distribusiBidang: [
      { bidang: "Umum", jumlah: 25, persentase: 17.2 },
      { bidang: "Tata Lingkungan", jumlah: 45, persentase: 31.0 },
      { bidang: "Pengendalian Pencemaran", jumlah: 40, persentase: 27.6 },
      { bidang: "Pengelolaan Sampah", jumlah: 35, persentase: 24.1 },
    ],
    distribusiPendidikan: [
      { tingkat: "S3", jumlah: 8, persentase: 5.5 },
      { tingkat: "S2", jumlah: 35, persentase: 24.1 },
      { tingkat: "S1", jumlah: 65, persentase: 44.8 },
      { tingkat: "D3", jumlah: 25, persentase: 17.2 },
      { tingkat: "SMA/SMK", jumlah: 12, persentase: 8.3 },
    ],
    rasioJabatan: [
      { level: "Eselon II", terisi: 1, total: 1, persentase: 100 },
      { level: "Eselon III", terisi: 4, total: 4, persentase: 100 },
      { level: "Eselon IV", terisi: 12, total: 15, persentase: 80 },
      { level: "Fungsional", terisi: 85, total: 90, persentase: 94.4 },
      { level: "Pelaksana", terisi: 36, total: 40, persentase: 90 },
    ],
  };

  const generateReport = () => {
    // Mock function untuk generate report
    alert("Laporan sedang diproses...");
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-3">
              <BarChart3 className="w-9 h-9 text-white" />
              Statistik & Analisis SDM
            </h1>
            <p className="text-xl md:text-2xl opacity-90">
              Analisis komprehensif data kepegawaian dan struktur organisasi
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Filter Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="flex flex-col md:flex-row gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  Periode
                </label>
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                >
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Building className="w-4 h-4 inline mr-1" />
                  Bidang
                </label>
                <select
                  value={selectedBidang}
                  onChange={(e) => setSelectedBidang(e.target.value)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                >
                  <option value="all">Semua Bidang</option>
                  <option value="umum">Umum</option>
                  <option value="tata-lingkungan">Tata Lingkungan</option>
                  <option value="pengendalian">Pengendalian Pencemaran</option>
                  <option value="sampah">Pengelolaan Sampah</option>
                </select>
              </div>
            </div>

            <button
              onClick={generateReport}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
            >
              <Download className="w-4 h-4" />
              Export Laporan
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total Pegawai
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {statistikData.totalPegawai}
                </p>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600 dark:text-green-400">
                +2.5% dari tahun lalu
              </span>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Pegawai Aktif
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {statistikData.pegawaiAktif}
                </p>
              </div>
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <Target className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <div className="mt-4">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {(
                  (statistikData.pegawaiAktif / statistikData.totalPegawai) *
                  100
                ).toFixed(1)}
                % dari total
              </span>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Jabatan Kosong
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {statistikData.jabatanKosong}
                </p>
              </div>
              <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                <Clock className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
            <div className="mt-4">
              <span className="text-sm text-orange-600 dark:text-orange-400">
                Perlu segera diisi
              </span>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Rata-rata Masa Kerja
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  8.5 Tahun
                </p>
              </div>
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <Award className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <div className="mt-4">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Pengalaman rata-rata
              </span>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Distribusi Bidang */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Distribusi Pegawai per Bidang
            </h3>
            <div className="space-y-4">
              {statistikData.distribusiBidang.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {item.bidang}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {item.jumlah} orang ({item.persentase}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${item.persentase}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Distribusi Pendidikan */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Distribusi Tingkat Pendidikan
            </h3>
            <div className="space-y-4">
              {statistikData.distribusiPendidikan.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {item.tingkat}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {item.jumlah} orang ({item.persentase}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${item.persentase}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Rasio Jabatan */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Rasio Pengisian Jabatan
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Level Jabatan
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Terisi
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Persentase
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {statistikData.rasioJabatan.map((item, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {item.level}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {item.terisi}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {item.total}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mr-2">
                          <div
                            className={`h-2 rounded-full ${
                              item.persentase >= 90
                                ? "bg-green-600"
                                : item.persentase >= 70
                                ? "bg-yellow-600"
                                : "bg-red-600"
                            }`}
                            style={{ width: `${item.persentase}%` }}
                          ></div>
                        </div>
                        <span>{item.persentase}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          item.persentase >= 90
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                            : item.persentase >= 70
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                            : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                        }`}
                      >
                        {item.persentase >= 90
                          ? "Optimal"
                          : item.persentase >= 70
                          ? "Baik"
                          : "Perlu Perhatian"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Trend Analysis */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Analisis Trend & Rekomendasi
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h4 className="font-medium text-blue-900 dark:text-blue-300 mb-2">
                Pertumbuhan Positif
              </h4>
              <p className="text-sm text-blue-700 dark:text-blue-400">
                Jumlah pegawai meningkat 2.5% dari tahun sebelumnya, menunjukkan
                ekspansi organisasi yang sehat.
              </p>
            </div>
            <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
              <h4 className="font-medium text-orange-900 dark:text-orange-300 mb-2">
                Area Perhatian
              </h4>
              <p className="text-sm text-orange-700 dark:text-orange-400">
                Terdapat 3 jabatan kosong yang perlu segera diisi untuk menjaga
                kelancaran operasional.
              </p>
            </div>
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <h4 className="font-medium text-green-900 dark:text-green-300 mb-2">
                Kualifikasi Baik
              </h4>
              <p className="text-sm text-green-700 dark:text-green-400">
                69% pegawai memiliki pendidikan S1 ke atas, menunjukkan kualitas
                SDM yang baik.
              </p>
            </div>
            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <h4 className="font-medium text-purple-900 dark:text-purple-300 mb-2">
                Distribusi Seimbang
              </h4>
              <p className="text-sm text-purple-700 dark:text-purple-400">
                Distribusi pegawai antar bidang cukup seimbang dengan Tata
                Lingkungan sebagai bidang terbesar.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
