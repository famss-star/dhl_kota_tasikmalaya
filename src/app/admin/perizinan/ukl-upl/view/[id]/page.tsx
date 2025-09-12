"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  FileText,
  Calendar,
  MapPin,
  User,
  Building,
  Shield,
  CheckCircle,
  XCircle,
  Clock,
  ChevronLeft,
} from "lucide-react";

interface UklUplData {
  id: string;
  nomor_surat: string;
  pemohon: string;
  nama_kegiatan: string;
  jenis_usaha: string;
  lokasi: string;
  tanggal_pengajuan: string;
  tanggal_terbit: string;
  masa_berlaku: string;
  status: string;
  nilai_investasi: number;
  luas_area: number;
  skala_usaha: string;
  upaya_pengelolaan_ukl: string;
  upaya_pemantauan_upl: string;
  dokumen_lengkap: boolean;
  catatan: string;
  dokumen_pendukung: string[];
  createdAt: string;
  updatedAt: string;
}

export default function ViewPerizinanUklUpl() {
  const params = useParams();
  const [uklUplData, setUklUplData] = useState<UklUplData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUklUpl();
  }, []);

  const fetchUklUpl = async () => {
    try {
      const response = await fetch(`/api/perizinan/ukl-upl/${params.id}`);
      const data = await response.json();

      if (data.success) {
        setUklUplData(data.data);
      } else {
        alert(data.error || "Gagal memuat data UKL-UPL");
      }
    } catch (error) {
      console.error("Fetch UKL-UPL error:", error);
      alert("Terjadi kesalahan saat memuat data");
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: {
        label: "Menunggu",
        color: "bg-yellow-100 text-yellow-800 border-yellow-200",
        icon: Clock,
      },
      review: {
        label: "Review",
        color: "bg-blue-100 text-blue-800 border-blue-200",
        icon: FileText,
      },
      approved: {
        label: "Disetujui",
        color: "bg-green-100 text-green-800 border-green-200",
        icon: CheckCircle,
      },
      rejected: {
        label: "Ditolak",
        color: "bg-red-100 text-red-800 border-red-200",
        icon: XCircle,
      },
    };

    const config =
      statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    const IconComponent = config.icon;

    return (
      <span
        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${config.color}`}
      >
        <IconComponent className="w-3 h-3" />
        {config.label}
      </span>
    );
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Memuat data UKL-UPL...
          </p>
        </div>
      </div>
    );
  }

  if (!uklUplData) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Shield className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            Data Tidak Ditemukan
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Data UKL-UPL yang Anda cari tidak dapat ditemukan.
          </p>
          <Link
            href="/admin/perizinan/ukl-upl"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Daftar UKL-UPL
          </Link>
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
              Detail AMDAL
            </h1>
            <p className="text-xl md:text-2xl opacity-90">
              Analisis Mengenai Dampak Lingkungan
            </p>
            <p className="mt-2 text-green-100">{uklUplData.nomor_surat}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="p-8">
          <div className="flex items-center justify-between">
            <Link
              href="/admin/perizinan/ukl-upl"
              className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </Link>
            <Link
              href={`/admin/perizinan/ukl-upl/edit/${uklUplData.id}`}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Edit UKL-UPL
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="p-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              {uklUplData.nomor_surat}
            </h2>
            {getStatusBadge(uklUplData.status)}
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            {uklUplData.nama_kegiatan}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Informasi Pemohon
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                      Nama Pemohon
                    </label>
                    <p className="text-gray-800 dark:text-white">
                      {uklUplData.pemohon}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                      Jenis Usaha
                    </label>
                    <p className="text-gray-800 dark:text-white">
                      {uklUplData.jenis_usaha}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Lokasi & Area
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                      Alamat Lokasi
                    </label>
                    <p className="text-gray-800 dark:text-white">
                      {uklUplData.lokasi}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                      Luas Area
                    </label>
                    <p className="text-gray-800 dark:text-white">
                      {uklUplData.luas_area.toLocaleString()} m²
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Informasi Tanggal
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                      Tanggal Pengajuan
                    </label>
                    <p className="text-gray-800 dark:text-white">
                      {formatDate(uklUplData.tanggal_pengajuan)}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                      Tanggal Terbit
                    </label>
                    <p className="text-gray-800 dark:text-white">
                      {formatDate(uklUplData.tanggal_terbit)}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                      Masa Berlaku
                    </label>
                    <p className="text-gray-800 dark:text-white">
                      {formatDate(uklUplData.masa_berlaku)}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                  <Building className="w-5 h-5" />
                  Informasi Usaha
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                      Nilai Investasi
                    </label>
                    <p className="text-gray-800 dark:text-white">
                      {formatCurrency(uklUplData.nilai_investasi)}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                      Skala Usaha
                    </label>
                    <span
                      className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                        uklUplData.skala_usaha === "kecil"
                          ? "bg-green-100 text-green-800"
                          : uklUplData.skala_usaha === "menengah"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {uklUplData.skala_usaha.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                Upaya Kelola Lingkungan (UKL)
              </h3>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <p className="text-gray-800 dark:text-white whitespace-pre-wrap">
                  {uklUplData.upaya_pengelolaan_ukl}
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                Upaya Pemantauan Lingkungan (UPL)
              </h3>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <p className="text-gray-800 dark:text-white whitespace-pre-wrap">
                  {uklUplData.upaya_pemantauan_upl}
                </p>
              </div>
            </div>

            {uklUplData.catatan && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                  Catatan
                </h3>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <p className="text-gray-800 dark:text-white">
                    {uklUplData.catatan}
                  </p>
                </div>
              </div>
            )}

            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                Status Dokumen
              </h3>
              <div className="flex items-center gap-2">
                {uklUplData.dokumen_lengkap ? (
                  <>
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-green-600 font-medium">
                      Dokumen UKL-UPL telah lengkap
                    </span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-red-600" />
                    <span className="text-red-600 font-medium">
                      Dokumen UKL-UPL belum lengkap
                    </span>
                  </>
                )}
              </div>
            </div>

            {uklUplData.dokumen_pendukung.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                  Dokumen Pendukung
                </h3>
                <div className="space-y-2">
                  {uklUplData.dokumen_pendukung.map((doc, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                    >
                      <FileText className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-800 dark:text-white">
                        {doc}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
