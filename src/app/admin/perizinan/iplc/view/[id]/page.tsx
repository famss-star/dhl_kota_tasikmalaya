"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  ArrowLeft,
  FileText,
  Shield,
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
  ChevronLeft,
} from "lucide-react";

interface IplcData {
  id: string;
  nomor_surat: string;
  pemohon: string;
  nama_kegiatan: string;
  jenis_kegiatan: string;
  kategori_usaha: string;
  lokasi: string;
  deskripsi_kegiatan: string;
  tanggal_pengajuan: string;
  tanggal_terbit?: string;
  masa_berlaku?: string;
  status: "pending" | "approved" | "rejected" | "review";
  nilai_investasi: number;
  luas_area: number;
  dampak_lingkungan: string;
  upaya_pengelolaan: string;
  upaya_pemantauan: string;
  komitmen_lingkungan: string;
  persyaratan_terpenuhi: boolean;
  catatan?: string;
  dokumen_pendukung?: string[];
}

export default function ViewIplcPage() {
  const router = useRouter();
  const params = useParams();
  const [iplcData, setIplcData] = useState<IplcData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (params.id) {
      fetchIplcData(params.id as string);
    }
  }, [params.id]);

  const fetchIplcData = async (id: string) => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/perizinan/iplc/${id}`);
      const result = await response.json();

      if (result.success) {
        setIplcData(result.data);
      } else {
        setError(result.error || "Gagal mengambil data IPLC");
      }
    } catch (error) {
      console.error("Error fetching IPLC data:", error);
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
    if (!iplcData) return;

    if (confirm("Apakah Anda yakin ingin menghapus IPLC ini?")) {
      try {
        const response = await fetch(`/api/perizinan/iplc/${iplcData.id}`, {
          method: "DELETE",
        });

        const result = await response.json();

        if (result.success) {
          alert("IPLC berhasil dihapus");
          router.push("/admin/perizinan/iplc");
        } else {
          alert(result.error || "Gagal menghapus IPLC");
        }
      } catch (error) {
        console.error("Delete error:", error);
        alert("Terjadi kesalahan saat menghapus IPLC");
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="animate-pulse space-y-6">
              <div className="h-6 bg-gray-300 rounded w-1/4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              <div className="space-y-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="h-16 bg-gray-300 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !iplcData) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center">
            <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {error || "Data tidak ditemukan"}
            </h2>
            <button
              onClick={() => router.back()}
              className="text-blue-600 hover:text-blue-800"
            >
              Kembali
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
              <Shield className="w-9 h-9 text-white" />
              Detail IPLC
            </h1>
            <p className="text-xl md:text-2xl opacity-90">
              Analisis Mengenai Dampak Lingkungan
            </p>
            <p className="mt-2 text-green-100">{iplcData.nomor_surat}</p>
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
                router.push(
                  `/admin/perizinan/iplc/edit/${iplcData.nomor_surat}`
                )
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
                {iplcData.pemohon}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                Status
              </label>
              <div>{getStatusBadge(iplcData.status)}</div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                Jenis Kegiatan
              </label>
              <p className="text-gray-900 dark:text-white">
                {iplcData.jenis_kegiatan}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                Kategori Usaha
              </label>
              <p className="text-gray-900 dark:text-white capitalize">
                {iplcData.kategori_usaha.replace("_", " ")}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
              Nama Kegiatan
            </label>
            <p className="text-gray-900 dark:text-white font-medium">
              {iplcData.nama_kegiatan}
            </p>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
              Deskripsi Kegiatan
            </label>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <p className="text-gray-900 dark:text-white whitespace-pre-line">
                {iplcData.deskripsi_kegiatan}
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
                {iplcData.lokasi}
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
                    {formatCurrency(iplcData.nilai_investasi)}
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
                    {iplcData.luas_area.toLocaleString()} m²
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
                  {formatDate(iplcData.tanggal_pengajuan)}
                </p>
              </div>

              {iplcData.tanggal_terbit && (
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                    Tanggal Terbit
                  </label>
                  <p className="text-gray-900 dark:text-white">
                    {formatDate(iplcData.tanggal_terbit)}
                  </p>
                </div>
              )}

              {iplcData.masa_berlaku && (
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                    Masa Berlaku
                  </label>
                  <p className="text-gray-900 dark:text-white">
                    {formatDate(iplcData.masa_berlaku)}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Pengelolaan Lingkungan */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <Shield className="w-5 h-5 text-blue-600" />
          Pengelolaan Lingkungan Hidup
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              Identifikasi Dampak Lingkungan
            </label>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 h-32 overflow-y-auto">
              <p className="text-gray-900 dark:text-white text-sm whitespace-pre-line">
                {iplcData.dampak_lingkungan}
              </p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              Upaya Pengelolaan Lingkungan (UKL)
            </label>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 h-32 overflow-y-auto">
              <p className="text-gray-900 dark:text-white text-sm whitespace-pre-line">
                {iplcData.upaya_pengelolaan}
              </p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              Upaya Pemantauan Lingkungan (UPL)
            </label>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 h-32 overflow-y-auto">
              <p className="text-gray-900 dark:text-white text-sm whitespace-pre-line">
                {iplcData.upaya_pemantauan}
              </p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              Komitmen Pengelolaan Lingkungan
            </label>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 h-32 overflow-y-auto">
              <p className="text-gray-900 dark:text-white text-sm whitespace-pre-line">
                {iplcData.komitmen_lingkungan}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Dokumen dan Catatan */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Dokumen Pendukung */}
        {iplcData.dokumen_pendukung &&
          iplcData.dokumen_pendukung.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Dokumen Pendukung
              </h3>

              <div className="space-y-2">
                {iplcData.dokumen_pendukung.map((doc, index) => (
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
        {iplcData.catatan && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Catatan
            </h3>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <p className="text-gray-900 dark:text-white whitespace-pre-line">
                {iplcData.catatan}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Persyaratan Status */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="flex items-center gap-3">
          {iplcData.persyaratan_terpenuhi ? (
            <CheckCircle className="w-6 h-6 text-green-600" />
          ) : (
            <XCircle className="w-6 h-6 text-red-600" />
          )}
          <span
            className={`font-medium ${
              iplcData.persyaratan_terpenuhi
                ? "text-green-600 dark:text-green-400"
                : "text-red-600 dark:text-red-400"
            }`}
          >
            {iplcData.persyaratan_terpenuhi
              ? "Persyaratan IPLC telah terpenuhi"
              : "Persyaratan IPLC belum terpenuhi"}
          </span>
        </div>
      </div>
    </div>
  );
}
