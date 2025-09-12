"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Save, Shield, ChevronLeft, Calendar } from "lucide-react";

interface FormData {
  nomor_surat: string;
  pemohon: string;
  nama_kegiatan: string;
  jenis_usaha: string;
  lokasi: string;
  tanggal_pengajuan: string;
  tanggal_terbit: string;
  masa_berlaku: string;
  status: "pending" | "approved" | "rejected" | "review";
  nilai_investasi: number;
  luas_area: number;
  skala_usaha: "kecil" | "menengah" | "besar";
  upaya_pengelolaan_ukl: string;
  upaya_pemantauan_upl: string;
  dokumen_lengkap: boolean;
  catatan: string;
  dokumen_pendukung: string[];
}

export default function EditPerizinanUklUpl() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [formData, setFormData] = useState<FormData>({
    nomor_surat: "",
    pemohon: "",
    nama_kegiatan: "",
    jenis_usaha: "",
    lokasi: "",
    tanggal_pengajuan: "",
    tanggal_terbit: "",
    masa_berlaku: "",
    status: "pending",
    nilai_investasi: 0,
    luas_area: 0,
    skala_usaha: "kecil",
    upaya_pengelolaan_ukl: "",
    upaya_pemantauan_upl: "",
    dokumen_lengkap: false,
    catatan: "",
    dokumen_pendukung: [],
  });

  useEffect(() => {
    fetchUklUpl();
  }, []);

  const fetchUklUpl = async () => {
    try {
      const response = await fetch(`/api/perizinan/ukl-upl/${params.id}`);
      const data = await response.json();

      if (data.success) {
        setFormData({
          ...data.data,
          dokumen_pendukung: data.data.dokumen_pendukung || [],
        });
      } else {
        alert(data.error || "Gagal memuat data UKL-UPL");
      }
    } catch (error) {
      console.error("Fetch UKL-UPL error:", error);
      alert("Terjadi kesalahan saat memuat data");
    } finally {
      setInitialLoading(false);
    }
  };

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
      const response = await fetch(`/api/perizinan/ukl-upl/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        alert("UKL-UPL berhasil diperbarui!");
        router.push("/admin/perizinan/ukl-upl");
      } else {
        alert(data.error || "Gagal memperbarui UKL-UPL");
      }
    } catch (error) {
      console.error("Update UKL-UPL error:", error);
      alert("Terjadi kesalahan saat memperbarui UKL-UPL");
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
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

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-3">
              <Shield className="w-9 h-9 text-white" />
              Edit UKL-UPL
            </h1>
            <p className="text-xl md:text-2xl opacity-90">
              Upaya Kelola Lingkungan & Upaya Pemantauan Lingkungan
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
            Edit UKL-UPL
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
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
                placeholder="Contoh: UKL-UPL/001/2025"
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
                placeholder="Nama pemohon"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

          <div>
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Nilai Investasi (IDR)
              </label>
              <input
                type="number"
                name="nilai_investasi"
                value={formData.nilai_investasi}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Luas Area (m²)
              </label>
              <input
                type="number"
                name="luas_area"
                value={formData.luas_area}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                min="0"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Skala Usaha
            </label>
            <select
              name="skala_usaha"
              value={formData.skala_usaha}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option value="kecil">Kecil</option>
              <option value="menengah">Menengah</option>
              <option value="besar">Besar</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Upaya Kelola Lingkungan (UKL) *
            </label>
            <textarea
              name="upaya_pengelolaan_ukl"
              value={formData.upaya_pengelolaan_ukl}
              onChange={handleChange}
              required
              rows={5}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              placeholder="Uraian upaya pengelolaan lingkungan yang akan dilakukan"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Upaya Pemantauan Lingkungan (UPL) *
            </label>
            <textarea
              name="upaya_pemantauan_upl"
              value={formData.upaya_pemantauan_upl}
              onChange={handleChange}
              required
              rows={5}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              placeholder="Uraian upaya pemantauan lingkungan yang akan dilakukan"
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

          <div className="flex items-center">
            <input
              type="checkbox"
              name="dokumen_lengkap"
              checked={formData.dokumen_lengkap}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
              Dokumen UKL-UPL telah lengkap
            </label>
          </div>

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
              {loading ? "Menyimpan..." : "Perbarui UKL-UPL"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
