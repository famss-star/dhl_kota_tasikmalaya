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
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Scale,
  ChevronLeft,
} from "lucide-react";

interface SpplData {
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
  kategori_dampak: string;
  upaya_pengelolaan_sppl: string;
  persyaratan_terpenuhi: boolean;
  catatan: string;
  dokumen_pendukung: string[];
  createdAt: string;
  updatedAt: string;
}

export default function ViewPerizinanSppl() {
  const params = useParams();
  const [spplData, setSpplData] = useState<SpplData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSppl();
  }, []);

  const fetchSppl = async () => {
    try {
      const response = await fetch(`/api/perizinan/sppl/${params.id}`);
      const data = await response.json();

      if (data.success) {
        setSpplData(data.data);
      } else {
        alert(data.error || "Gagal memuat data SPPL");
      }
    } catch (error) {
      console.error("Fetch SPPL error:", error);
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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Memuat data SPPL...
          </p>
        </div>
      </div>
    );
  }

  if (!spplData) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            Data Tidak Ditemukan
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Data SPPL yang Anda cari tidak dapat ditemukan.
          </p>
          <Link
            href="/admin/perizinan/sppl"
            className="inline-flex items-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Daftar SPPL
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
              <Scale className="w-9 h-9 text-white" />
              Detail SPPL
            </h1>
            <p className="text-xl md:text-2xl opacity-90">
              Surat Pernyataan Pengelolaan Lingkungan
            </p>
            <p className="mt-2 text-green-100">{spplData.nomor_surat}</p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="p-8">
          <div className="flex items-center justify-between">
            <Link
              href="/admin/perizinan/sppl"
              className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </Link>
            <Link
              href={`/admin/perizinan/sppl/edit/${spplData.id}`}
              className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors"
            >
              Edit SPPL
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="p-8">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                {spplData.nomor_surat}
              </h2>
              {getStatusBadge(spplData.status)}
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              {spplData.nama_kegiatan}
            </p>
          </div>

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
                      {spplData.pemohon}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                      Jenis Usaha
                    </label>
                    <p className="text-gray-800 dark:text-white">
                      {spplData.jenis_usaha}
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
                      {spplData.lokasi}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                      Luas Area
                    </label>
                    <p className="text-gray-800 dark:text-white">
                      {spplData.luas_area.toLocaleString()} m²
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
                      {formatDate(spplData.tanggal_pengajuan)}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                      Tanggal Terbit
                    </label>
                    <p className="text-gray-800 dark:text-white">
                      {formatDate(spplData.tanggal_terbit)}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                      Masa Berlaku
                    </label>
                    <p className="text-gray-800 dark:text-white">
                      {formatDate(spplData.masa_berlaku)}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                  <Building className="w-5 h-5" />
                  Informasi Investasi
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                      Nilai Investasi
                    </label>
                    <p className="text-gray-800 dark:text-white">
                      {formatCurrency(spplData.nilai_investasi)}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                      Kategori Dampak
                    </label>
                    <span
                      className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                        spplData.kategori_dampak === "kecil"
                          ? "bg-green-100 text-green-800"
                          : spplData.kategori_dampak === "sedang"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {spplData.kategori_dampak.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                Upaya Pengelolaan SPPL
              </h3>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <p className="text-gray-800 dark:text-white whitespace-pre-wrap">
                  {spplData.upaya_pengelolaan_sppl}
                </p>
              </div>
            </div>

            {spplData.catatan && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                  Catatan
                </h3>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <p className="text-gray-800 dark:text-white">
                    {spplData.catatan}
                  </p>
                </div>
              </div>
            )}

            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                Status Persyaratan
              </h3>
              <div className="flex items-center gap-2">
                {spplData.persyaratan_terpenuhi ? (
                  <>
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-green-600 font-medium">
                      Persyaratan SPPL telah terpenuhi
                    </span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-red-600" />
                    <span className="text-red-600 font-medium">
                      Persyaratan SPPL belum terpenuhi
                    </span>
                  </>
                )}
              </div>
            </div>

            {spplData.dokumen_pendukung.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                  Dokumen Pendukung
                </h3>
                <div className="space-y-2">
                  {spplData.dokumen_pendukung.map((doc, index) => (
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
