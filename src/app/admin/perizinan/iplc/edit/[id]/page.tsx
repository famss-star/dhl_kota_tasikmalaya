"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  Save,
  FileText,
  ChevronLeft,
  Upload,
  Calendar,
  Shield,
} from "lucide-react";

interface FormData {
  nomor_surat: string;
  pemohon: string;
  nama_kegiatan: string;
  jenis_kegiatan: string;
  kategori_usaha: "wajib_iplc" | "tidak_wajib_iplc";
  lokasi: string;
  deskripsi_kegiatan: string;
  tanggal_pengajuan: string;
  tanggal_terbit: string;
  masa_berlaku: string;
  status: "pending" | "approved" | "rejected" | "review";
  nilai_investasi: number;
  luas_area: number;
  dampak_lingkungan: string;
  upaya_pengelolaan: string;
  upaya_pemantauan: string;
  komitmen_lingkungan: string;
  persyaratan_terpenuhi: boolean;
  catatan: string;
  dokumen_pendukung: string[];
}

export default function EditPerizinanIplc() {
  const router = useRouter();
  const params = useParams();
  const iplcId = params.id as string;

  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [formData, setFormData] = useState<FormData>({
    nomor_surat: "",
    pemohon: "",
    nama_kegiatan: "",
    jenis_kegiatan: "",
    kategori_usaha: "wajib_iplc",
    lokasi: "",
    deskripsi_kegiatan: "",
    tanggal_pengajuan: "",
    tanggal_terbit: "",
    masa_berlaku: "",
    status: "pending",
    nilai_investasi: 0,
    luas_area: 0,
    dampak_lingkungan: "",
    upaya_pengelolaan: "",
    upaya_pemantauan: "",
    komitmen_lingkungan: "",
    persyaratan_terpenuhi: false,
    catatan: "",
    dokumen_pendukung: [],
  });

  // Fetch existing data
  useEffect(() => {
    const fetchIplc = async () => {
      try {
        const response = await fetch(`/api/perizinan/iplc/${iplcId}`);
        const data = await response.json();

        if (data.success) {
          const iplc = data.data;
          setFormData({
            nomor_surat: iplc.nomor_surat || "",
            pemohon: iplc.pemohon || "",
            nama_kegiatan: iplc.nama_kegiatan || "",
            jenis_kegiatan: iplc.jenis_kegiatan || "",
            kategori_usaha: iplc.kategori_usaha || "wajib_iplc",
            lokasi: iplc.lokasi || "",
            deskripsi_kegiatan: iplc.deskripsi_kegiatan || "",
            tanggal_pengajuan: iplc.tanggal_pengajuan
              ? iplc.tanggal_pengajuan.split("T")[0]
              : "",
            tanggal_terbit: iplc.tanggal_terbit
              ? iplc.tanggal_terbit.split("T")[0]
              : "",
            masa_berlaku: iplc.masa_berlaku
              ? iplc.masa_berlaku.split("T")[0]
              : "",
            status: iplc.status || "pending",
            nilai_investasi: iplc.nilai_investasi || 0,
            luas_area: iplc.luas_area || 0,
            dampak_lingkungan: iplc.dampak_lingkungan || "",
            upaya_pengelolaan: iplc.upaya_pengelolaan || "",
            upaya_pemantauan: iplc.upaya_pemantauan || "",
            komitmen_lingkungan: iplc.komitmen_lingkungan || "",
            persyaratan_terpenuhi: iplc.persyaratan_terpenuhi || false,
            catatan: iplc.catatan || "",
            dokumen_pendukung: iplc.dokumen_pendukung || [],
          });
        } else {
          alert("Gagal memuat data IPLC");
          router.push("/admin/perizinan/iplc");
        }
      } catch (error) {
        console.error("Fetch error:", error);
        alert("Terjadi kesalahan saat memuat data");
        router.push("/admin/perizinan/iplc");
      } finally {
        setFetchLoading(false);
      }
    };

    if (iplcId) {
      fetchIplc();
    }
  }, [iplcId, router]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else if (type === "number") {
      setFormData((prev) => ({
        ...prev,
        [name]: parseFloat(value) || 0,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`/api/perizinan/iplc/${iplcId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        alert("IPLC berhasil diperbarui!");
        router.push("/admin/perizinan/iplc");
      } else {
        alert(data.error || "Gagal memperbarui IPLC");
      }
    } catch (error) {
      console.error("Update IPLC error:", error);
      alert("Terjadi kesalahan saat memperbarui IPLC");
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">
            Memuat data IPLC...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-3">
              <Shield className="w-9 h-9 text-white" />
              Edit IPLC
            </h1>
            <p className="text-xl md:text-2xl opacity-90">
              Perbarui data Izin Perlindungan dan Pengelolaan Lingkungan Hidup
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Edit Data IPLC
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Informasi Dasar - Simplified Form */}
          <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              Informasi Dasar
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Nomor Surat *
                </label>
                <input
                  type="text"
                  name="nomor_surat"
                  value={formData.nomor_surat}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Pemohon *
                </label>
                <input
                  type="text"
                  name="pemohon"
                  value={formData.pemohon}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Nama Kegiatan *
                </label>
                <input
                  type="text"
                  name="nama_kegiatan"
                  value={formData.nama_kegiatan}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                >
                  <option value="pending">Menunggu</option>
                  <option value="review">Review</option>
                  <option value="approved">Disetujui</option>
                  <option value="rejected">Ditolak</option>
                </select>
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Lokasi *
              </label>
              <textarea
                name="lokasi"
                value={formData.lokasi}
                onChange={handleChange}
                required
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  Tanggal Pengajuan *
                </label>
                <input
                  type="date"
                  name="tanggal_pengajuan"
                  value={formData.tanggal_pengajuan}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tanggal Terbit
                </label>
                <input
                  type="date"
                  name="tanggal_terbit"
                  value={formData.tanggal_terbit}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Masa Berlaku
                </label>
                <input
                  type="date"
                  name="masa_berlaku"
                  value={formData.masa_berlaku}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Pengelolaan Lingkungan */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              Pengelolaan Lingkungan
            </h3>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Upaya Pengelolaan Lingkungan (UKL) *
                </label>
                <textarea
                  name="upaya_pengelolaan"
                  value={formData.upaya_pengelolaan}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Upaya Pemantauan Lingkungan (UPL) *
                </label>
                <textarea
                  name="upaya_pemantauan"
                  value={formData.upaya_pemantauan}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Catatan
                </label>
                <textarea
                  name="catatan"
                  value={formData.catatan}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>

            <div className="flex items-center mt-6">
              <input
                type="checkbox"
                name="persyaratan_terpenuhi"
                checked={formData.persyaratan_terpenuhi}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                Persyaratan IPLC telah terpenuhi
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-6">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex items-center gap-2 px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-4 h-4" />
              {loading ? "Menyimpan..." : "Perbarui IPLC"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
