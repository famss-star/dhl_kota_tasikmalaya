"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  ArrowLeft,
  Edit,
  Trash2,
  Calendar,
  User,
  Eye,
  Globe,
  ChevronLeft,
  FileText,
  MapPin,
  Building,
  DollarSign,
  Clock,
  CheckCircle,
  AlertTriangle,
  XCircle,
} from "lucide-react";

interface PerizinanUmumData {
  id: string;
  nomor_surat: string;
  pemohon: string;
  jenis_usaha: string;
  nama_kegiatan: string;
  lokasi: string;
  tanggal_pengajuan: string;
  tanggal_terbit?: string;
  masa_berlaku?: string;
  status: "pending" | "approved" | "rejected" | "review";
  nilai_investasi: number;
  luas_area: number;
  persyaratan_terpenuhi: boolean;
  catatan: string;
  dokumen_pendukung: string[];
  createdAt: string;
  updatedAt: string;
}

export default function ViewPerizinanUmum() {
  const router = useRouter();
  const params = useParams();
  const perizinanId = params.id as string;

  const [perizinan, setPerizinan] = useState<PerizinanUmumData | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch perizinan data
  const fetchPerizinan = async () => {
    try {
      const response = await fetch(`/api/perizinan/umum/${perizinanId}`);
      const data = await response.json();

      if (data.success) {
        setPerizinan(data.data);
      } else {
        console.error("Error fetching perizinan:", data.error);
        alert("Gagal memuat data perizinan");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      alert("Terjadi kesalahan saat memuat data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (perizinanId) {
      fetchPerizinan();
    }
  }, [perizinanId]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <span className="flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 rounded-full font-medium">
            <CheckCircle className="w-5 h-5" />
            Disetujui
          </span>
        );
      case "pending":
        return (
          <span className="flex items-center gap-2 px-4 py-2 bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300 rounded-full font-medium">
            <Clock className="w-5 h-5" />
            Menunggu
          </span>
        );
      case "review":
        return (
          <span className="flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded-full font-medium">
            <Eye className="w-5 h-5" />
            Review
          </span>
        );
      case "rejected":
        return (
          <span className="flex items-center gap-2 px-4 py-2 bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300 rounded-full font-medium">
            <XCircle className="w-5 h-5" />
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
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const handleDelete = async () => {
    if (!confirm("Apakah Anda yakin ingin menghapus perizinan ini?")) {
      return;
    }

    try {
      const response = await fetch(`/api/perizinan/umum/${perizinanId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        alert("Perizinan berhasil dihapus");
        router.push("/admin/perizinan/umum");
      } else {
        alert(data.error || "Gagal menghapus perizinan");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Terjadi kesalahan saat menghapus perizinan");
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        {/* Header Loading */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="animate-pulse">
                <div className="h-12 bg-white/20 rounded mb-4 mx-auto w-64"></div>
                <div className="h-6 bg-white/20 rounded mx-auto w-48"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Header Loading */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div className="animate-pulse">
              <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-20"></div>
            </div>
            <div className="flex items-center gap-4 animate-pulse">
              <div className="h-10 bg-gray-300 dark:bg-gray-600 rounded w-16"></div>
              <div className="h-10 bg-gray-300 dark:bg-gray-600 rounded w-16"></div>
            </div>
          </div>
        </div>

        {/* Content Loading */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="p-8">
            <div className="animate-pulse space-y-6">
              {Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="h-6 bg-gray-300 dark:bg-gray-600 rounded"
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!perizinan) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-3">
                <FileText className="w-9 h-9 text-white" />
                Perizinan Umum
              </h1>
              <p className="text-xl md:text-2xl opacity-90">
                Data tidak ditemukan
              </p>
            </div>
          </div>
        </div>

        {/* Action Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.back()}
                className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
                Kembali
              </button>
            </div>
            <div className="flex items-center gap-4">
              {/* Empty space for consistency */}
            </div>
          </div>
        </div>

        {/* Error Content */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="p-12 text-center">
            <FileText className="w-24 h-24 text-gray-400 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Perizinan tidak ditemukan
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
              Perizinan yang Anda cari mungkin telah dihapus atau tidak ada. Silakan periksa kembali atau hubungi administrator.
            </p>
            <button
              onClick={() => router.push("/admin/perizinan/umum")}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Kembali ke Daftar Perizinan
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
              <FileText className="w-9 h-9 text-white" />
              Perizinan Umum
            </h1>
            <p className="text-xl md:text-2xl opacity-90">
              {perizinan.nomor_surat}
            </p>{" "}
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-gray-699 hover:text-white transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() =>
                router.push(`/admin/perizinan/umum/edit/${perizinan.id}`)
              }
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition-colors text-white"
            >
              <Edit className="w-4 h-4" />
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors text-white"
            >
              <Trash2 className="w-4 h-4" />
              Hapus
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        {/* Status and Basic Info */}
        <div className="p-8 border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              {getStatusBadge(perizinan.status)}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-2 mb-1">
                <Calendar className="w-4 h-4" />
                Dibuat: {formatDate(perizinan.createdAt)}
              </div>
              {perizinan.updatedAt !== perizinan.createdAt && (
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Diperbarui: {formatDate(perizinan.updatedAt)}
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Informasi Pemohon
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Pemohon
                    </p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {perizinan.pemohon}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Building className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Jenis Usaha
                    </p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {perizinan.jenis_usaha}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Detail Kegiatan
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Nama Kegiatan
                  </p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {perizinan.nama_kegiatan}
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Lokasi
                    </p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {perizinan.lokasi}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Details */}
        <div className="p-8 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Detail Teknis
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Nilai Investasi
              </p>
              <p className="text-lg font-bold text-gray-900 dark:text-white">
                {formatCurrency(perizinan.nilai_investasi)}
              </p>
            </div>
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <Building className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Luas Area
              </p>
              <p className="text-lg font-bold text-gray-900 dark:text-white">
                {perizinan.luas_area.toLocaleString()} m²
              </p>
            </div>
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <CheckCircle
                className={`w-8 h-8 mx-auto mb-2 ${
                  perizinan.persyaratan_terpenuhi
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              />
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Persyaratan
              </p>
              <p
                className={`text-lg font-bold ${
                  perizinan.persyaratan_terpenuhi
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {perizinan.persyaratan_terpenuhi
                  ? "Terpenuhi"
                  : "Belum Terpenuhi"}
              </p>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="p-8 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Timeline
          </h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Calendar className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Tanggal Pengajuan
                </p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {formatDate(perizinan.tanggal_pengajuan)}
                </p>
              </div>
            </div>
            {perizinan.tanggal_terbit && (
              <div className="flex items-center gap-4">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Tanggal Terbit
                  </p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {formatDate(perizinan.tanggal_terbit)}
                  </p>
                </div>
              </div>
            )}
            {perizinan.masa_berlaku && (
              <div className="flex items-center gap-4">
                <Clock className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Masa Berlaku
                  </p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {formatDate(perizinan.masa_berlaku)}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Documents */}
        {perizinan.dokumen_pendukung.length > 0 && (
          <div className="p-8 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              Dokumen Pendukung
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {perizinan.dokumen_pendukung.map((doc, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <FileText className="w-6 h-6 text-blue-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {doc.split("/").pop() || `Dokumen ${index + 1}`}
                    </p>
                    <a
                      href={doc}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      Lihat dokumen
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Notes */}
        {perizinan.catatan && (
          <div className="p-8">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Catatan
            </h3>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <p className="text-gray-900 dark:text-white whitespace-pre-wrap">
                {perizinan.catatan}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
