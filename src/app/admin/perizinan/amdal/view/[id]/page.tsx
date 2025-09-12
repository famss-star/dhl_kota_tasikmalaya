"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  ArrowLeft,
  FileText,
  Leaf,
  Calendar,
  MapPin,
  Building,
  DollarSign,
  BarChart3,
  CheckCircle,
  Clock,
  XCircle,
  AlertTriangle,
  Download,
  Edit3,
  Trash2,
  Scale,
  ChevronLeft,
} from "lucide-react";

interface AmdalData {
  id: string;
  nomor_surat: string;
  pemohon: string;
  nama_rencana_kegiatan: string;
  jenis_rencana_kegiatan: string;
  skala_kegiatan: string;
  lokasi: string;
  deskripsi_kegiatan: string;
  tanggal_pengajuan: string;
  tanggal_terbit?: string;
  masa_berlaku?: string;
  status: "pending" | "approved" | "rejected" | "review";
  nilai_investasi: number;
  luas_area: number;
  dampak_lingkungan: string;
  rona_lingkungan_hidup: string;
  prakiraan_dampak: string;
  evaluasi_dampak: string;
  rencana_pengelolaan: string;
  rencana_pemantauan: string;
  persyaratan_terpenuhi: boolean;
  catatan?: string;
  dokumen_pendukung?: string[];
}

export default function ViewAmdalPage() {
  const router = useRouter();
  const params = useParams();
  const [amdalData, setAmdalData] = useState<AmdalData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (params.id) {
      fetchAmdalData(params.id as string);
    }
  }, [params.id]);

  const fetchAmdalData = async (id: string) => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/perizinan/amdal/${id}`);
      const result = await response.json();

      if (result.success) {
        setAmdalData(result.data);
      } else {
        setError(result.error || "Gagal mengambil data AMDAL");
      }
    } catch (error) {
      console.error("Error fetching AMDAL data:", error);
      setError("Terjadi kesalahan saat mengambil data");
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <span className="flex items-center gap-1 px-3 py-1 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 rounded-full text-sm font-medium">
            <CheckCircle className="w-4 h-4" />
            Disetujui
          </span>
        );
      case "pending":
        return (
          <span className="flex items-center gap-1 px-3 py-1 bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300 rounded-full text-sm font-medium">
            <Clock className="w-4 h-4" />
            Menunggu
          </span>
        );
      case "review":
        return (
          <span className="flex items-center gap-1 px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium">
            <AlertTriangle className="w-4 h-4" />
            Review
          </span>
        );
      case "rejected":
        return (
          <span className="flex items-center gap-1 px-3 py-1 bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300 rounded-full text-sm font-medium">
            <XCircle className="w-4 h-4" />
            Ditolak
          </span>
        );
      default:
        return null;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const handleDelete = async () => {
    if (!amdalData) return;

    if (confirm("Apakah Anda yakin ingin menghapus AMDAL ini?")) {
      try {
        const response = await fetch(`/api/perizinan/amdal/${amdalData.id}`, {
          method: "DELETE",
        });

        const result = await response.json();

        if (result.success) {
          alert("AMDAL berhasil dihapus");
          router.push("/admin/perizinan/amdal");
        } else {
          alert(result.error || "Gagal menghapus AMDAL");
        }
      } catch (error) {
        console.error("Delete error:", error);
        alert("Terjadi kesalahan saat menghapus AMDAL");
      }
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-3">
                <Scale className="w-9 h-9 text-white" />
                Detail AMDAL
              </h1>
              <p className="text-xl md:text-2xl opacity-90">
                Analisis Mengenai Dampak Lingkungan
              </p>
              <div className="h-8 bg-white/30 rounded w-1/3 mx-auto animate-pulse"></div>
            </div>
          </div>
        </div>
        {/* Header Skeleton */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="h-10 w-10 bg-gray-300 dark:bg-gray-600 rounded-lg animate-pulse"></div>
            <div className="flex gap-2">
              <div className="h-10 w-20 bg-gray-300 dark:bg-gray-600 rounded-lg animate-pulse"></div>
              <div className="h-10 w-20 bg-gray-300 dark:bg-gray-600 rounded-lg animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Content Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content Skeleton */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-1/4 mb-4 animate-pulse"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i}>
                  <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/3 mb-2 animate-pulse"></div>
                  <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-3/4 animate-pulse"></div>
                </div>
              ))}
            </div>

            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="mt-6">
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/4 mb-2 animate-pulse"></div>
                <div className="h-20 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
              </div>
            ))}
          </div>

          {/* Sidebar Skeleton */}
          <div className="space-y-6">
            {Array.from({ length: 2 }).map((_, i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
              >
                <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-1/2 mb-4 animate-pulse"></div>
                <div className="space-y-4">
                  {Array.from({ length: 2 }).map((_, j) => (
                    <div
                      key={j}
                      className="flex items-center gap-3 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg"
                    >
                      <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
                      <div className="flex-1">
                        <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/2 mb-1 animate-pulse"></div>
                        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4 animate-pulse"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Content Skeleton */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-1/3 mb-6 animate-pulse"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i}>
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2 mb-2 animate-pulse"></div>
                <div className="h-32 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || !amdalData) {
    return (
      <div className="space-y-6">
        {/* Header Skeleton */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="flex gap-2 opacity-50">
              <div className="h-10 w-20 bg-gray-300 dark:bg-gray-600 rounded-lg"></div>
              <div className="h-10 w-20 bg-gray-300 dark:bg-gray-600 rounded-lg"></div>
            </div>
          </div>
        </div>

        {/* Error Content */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
            {error || "Data tidak ditemukan"}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Silakan coba lagi atau kembali ke halaman sebelumnya
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => router.back()}
              className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              Kembali
            </button>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Muat Ulang
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-3">
              <Scale className="w-9 h-9 text-white" />
              Detail AMDAL
            </h1>
            <p className="text-xl md:text-2xl opacity-90">
              Analisis Mengenai Dampak Lingkungan
            </p>
            <p className="mt-2 text-green-100">{amdalData.nomor_surat}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="flex gap-2">
            <button
              onClick={() =>
                router.push(`/admin/perizinan/amdal/edit/${amdalData.id}`)
              }
              className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors"
            >
              <Edit3 className="w-4 h-4" />
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Hapus
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      {/* Status dan Info Dasar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Informasi Dasar
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                Pemohon
              </label>
              <p className="text-gray-900 dark:text-white font-medium">
                {amdalData.pemohon}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                Status
              </label>
              <div>{getStatusBadge(amdalData.status)}</div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                Jenis Kegiatan
              </label>
              <p className="text-gray-900 dark:text-white">
                {amdalData.jenis_rencana_kegiatan}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                Skala Kegiatan
              </label>
              <p className="text-gray-900 dark:text-white capitalize">
                {amdalData.skala_kegiatan}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
              Nama Rencana Kegiatan
            </label>
            <p className="text-gray-900 dark:text-white font-medium">
              {amdalData.nama_rencana_kegiatan}
            </p>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
              Deskripsi Kegiatan
            </label>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <p className="text-gray-900 dark:text-white whitespace-pre-line">
                {amdalData.deskripsi_kegiatan}
              </p>
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1 flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              Lokasi
            </label>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <p className="text-gray-900 dark:text-white whitespace-pre-line">
                {amdalData.lokasi}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Statistik Singkat */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Detail Teknis
            </h3>

            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <DollarSign className="w-8 h-8 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Nilai Investasi
                  </p>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {formatCurrency(amdalData.nilai_investasi)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <BarChart3 className="w-8 h-8 text-green-600" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Luas Area
                  </p>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {amdalData.luas_area.toLocaleString()} m²
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Timeline
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                  Tanggal Pengajuan
                </label>
                <p className="text-gray-900 dark:text-white">
                  {formatDate(amdalData.tanggal_pengajuan)}
                </p>
              </div>

              {amdalData.tanggal_terbit && (
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                    Tanggal Terbit
                  </label>
                  <p className="text-gray-900 dark:text-white">
                    {formatDate(amdalData.tanggal_terbit)}
                  </p>
                </div>
              )}

              {amdalData.masa_berlaku && (
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                    Masa Berlaku
                  </label>
                  <p className="text-gray-900 dark:text-white">
                    {formatDate(amdalData.masa_berlaku)}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Analisis Dampak Lingkungan */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <Leaf className="w-5 h-5 text-green-600" />
          Analisis Dampak Lingkungan
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              Rona Lingkungan Hidup
            </label>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 h-32 overflow-y-auto">
              <p className="text-gray-900 dark:text-white text-sm whitespace-pre-line">
                {amdalData.rona_lingkungan_hidup}
              </p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              Prakiraan Dampak Penting
            </label>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 h-32 overflow-y-auto">
              <p className="text-gray-900 dark:text-white text-sm whitespace-pre-line">
                {amdalData.prakiraan_dampak}
              </p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              Evaluasi Dampak Penting
            </label>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 h-32 overflow-y-auto">
              <p className="text-gray-900 dark:text-white text-sm whitespace-pre-line">
                {amdalData.evaluasi_dampak}
              </p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              Rencana Pengelolaan Lingkungan (RKL)
            </label>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 h-32 overflow-y-auto">
              <p className="text-gray-900 dark:text-white text-sm whitespace-pre-line">
                {amdalData.rencana_pengelolaan}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
            Rencana Pemantauan Lingkungan (RPL)
          </label>
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <p className="text-gray-900 dark:text-white whitespace-pre-line">
              {amdalData.rencana_pemantauan}
            </p>
          </div>
        </div>
      </div>

      {/* Dokumen dan Catatan */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Dokumen Pendukung */}
        {amdalData.dokumen_pendukung &&
          amdalData.dokumen_pendukung.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Dokumen Pendukung
              </h3>

              <div className="space-y-2">
                {amdalData.dokumen_pendukung.map((doc, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <span className="text-sm text-gray-700 dark:text-gray-300 truncate">
                      {doc.split("/").pop() || `Dokumen ${index + 1}`}
                    </span>
                    <button
                      onClick={() => window.open(doc, "_blank")}
                      className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm"
                    >
                      <Download className="w-4 h-4" />
                      Lihat
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

        {/* Catatan */}
        {amdalData.catatan && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Catatan
            </h3>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <p className="text-gray-900 dark:text-white whitespace-pre-line">
                {amdalData.catatan}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Persyaratan Status */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="flex items-center gap-3">
          {amdalData.persyaratan_terpenuhi ? (
            <CheckCircle className="w-6 h-6 text-green-600" />
          ) : (
            <XCircle className="w-6 h-6 text-red-600" />
          )}
          <span
            className={`font-medium ${
              amdalData.persyaratan_terpenuhi
                ? "text-green-600 dark:text-green-400"
                : "text-red-600 dark:text-red-400"
            }`}
          >
            {amdalData.persyaratan_terpenuhi
              ? "Persyaratan AMDAL telah terpenuhi"
              : "Persyaratan AMDAL belum terpenuhi"}
          </span>
        </div>
      </div>
    </div>
  );
}
