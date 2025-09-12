"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  Save,
  FileText,
  ChevronLeft,
  Upload,
  Calendar,
  Leaf,
  Scale,
} from "lucide-react";

interface FormData {
  nomor_surat: string;
  pemohon: string;
  nama_rencana_kegiatan: string;
  jenis_rencana_kegiatan: string;
  skala_kegiatan: "besar" | "menengah" | "kecil";
  lokasi: string;
  deskripsi_kegiatan: string;
  tanggal_pengajuan: string;
  tanggal_terbit: string;
  masa_berlaku: string;
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
  catatan: string;
  dokumen_pendukung: string[];
}

export default function EditPerizinanAmdal() {
  const router = useRouter();
  const params = useParams();
  const amdalId = params.id as string;

  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [formData, setFormData] = useState<FormData>({
    nomor_surat: "",
    pemohon: "",
    nama_rencana_kegiatan: "",
    jenis_rencana_kegiatan: "",
    skala_kegiatan: "menengah",
    lokasi: "",
    deskripsi_kegiatan: "",
    tanggal_pengajuan: "",
    tanggal_terbit: "",
    masa_berlaku: "",
    status: "pending",
    nilai_investasi: 0,
    luas_area: 0,
    dampak_lingkungan: "",
    rona_lingkungan_hidup: "",
    prakiraan_dampak: "",
    evaluasi_dampak: "",
    rencana_pengelolaan: "",
    rencana_pemantauan: "",
    persyaratan_terpenuhi: false,
    catatan: "",
    dokumen_pendukung: [],
  });

  // Fetch existing data
  useEffect(() => {
    const fetchAmdal = async () => {
      try {
        const response = await fetch(`/api/perizinan/amdal/${amdalId}`);
        const data = await response.json();

        if (data.success) {
          const amdal = data.data;
          setFormData({
            nomor_surat: amdal.nomor_surat || "",
            pemohon: amdal.pemohon || "",
            nama_rencana_kegiatan: amdal.nama_rencana_kegiatan || "",
            jenis_rencana_kegiatan: amdal.jenis_rencana_kegiatan || "",
            skala_kegiatan: amdal.skala_kegiatan || "menengah",
            lokasi: amdal.lokasi || "",
            deskripsi_kegiatan: amdal.deskripsi_kegiatan || "",
            tanggal_pengajuan: amdal.tanggal_pengajuan
              ? amdal.tanggal_pengajuan.split("T")[0]
              : "",
            tanggal_terbit: amdal.tanggal_terbit
              ? amdal.tanggal_terbit.split("T")[0]
              : "",
            masa_berlaku: amdal.masa_berlaku
              ? amdal.masa_berlaku.split("T")[0]
              : "",
            status: amdal.status || "pending",
            nilai_investasi: amdal.nilai_investasi || 0,
            luas_area: amdal.luas_area || 0,
            dampak_lingkungan: amdal.dampak_lingkungan || "",
            rona_lingkungan_hidup: amdal.rona_lingkungan_hidup || "",
            prakiraan_dampak: amdal.prakiraan_dampak || "",
            evaluasi_dampak: amdal.evaluasi_dampak || "",
            rencana_pengelolaan: amdal.rencana_pengelolaan || "",
            rencana_pemantauan: amdal.rencana_pemantauan || "",
            persyaratan_terpenuhi: amdal.persyaratan_terpenuhi || false,
            catatan: amdal.catatan || "",
            dokumen_pendukung: amdal.dokumen_pendukung || [],
          });
        } else {
          alert("Gagal memuat data AMDAL");
          router.push("/admin/perizinan/amdal");
        }
      } catch (error) {
        console.error("Fetch error:", error);
        alert("Terjadi kesalahan saat memuat data");
        router.push("/admin/perizinan/amdal");
      } finally {
        setFetchLoading(false);
      }
    };

    if (amdalId) {
      fetchAmdal();
    }
  }, [amdalId, router]);

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

  const handleDocumentUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;
    if (!files) return;

    const uploadedDocs: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (file.size > 10 * 1024 * 1024) {
        alert(`File ${file.name} terlalu besar. Maksimal 10MB.`);
        continue;
      }

      const allowedTypes = [
        "application/pdf",
        "image/jpeg",
        "image/png",
        "image/jpg",
      ];
      if (!allowedTypes.includes(file.type)) {
        alert(
          `File ${file.name} tidak didukung. Gunakan PDF, PNG, JPG, atau JPEG.`
        );
        continue;
      }

      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", "perizinan-amdal");

        const response = await fetch("/api/upload/document", {
          method: "POST",
          body: formData,
        });

        const result = await response.json();

        if (result.success) {
          uploadedDocs.push(result.data?.url || result.documentUrl || "");
        } else {
          alert(`Gagal mengupload ${file.name}: ${result.error}`);
        }
      } catch (error) {
        console.error("Upload error:", error);
        alert(`Terjadi kesalahan saat mengupload ${file.name}`);
      }
    }

    if (uploadedDocs.length > 0) {
      setFormData((prev) => ({
        ...prev,
        dokumen_pendukung: [...prev.dokumen_pendukung, ...uploadedDocs],
      }));
      alert(`${uploadedDocs.length} dokumen berhasil diupload!`);
    }
  };

  const removeDocument = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      dokumen_pendukung: prev.dokumen_pendukung.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`/api/perizinan/amdal/${amdalId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        alert("AMDAL berhasil diperbarui!");
        router.push("/admin/perizinan/amdal");
      } else {
        alert(data.error || "Gagal memperbarui AMDAL");
      }
    } catch (error) {
      console.error("Update AMDAL error:", error);
      alert("Terjadi kesalahan saat memperbarui AMDAL");
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">
            Memuat data AMDAL...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-3">
            <Scale className="w-9 h-9 text-white" />
            Edit AMDAL
          </h1>
          <p className="text-xl md:text-2xl opacity-90">
            Perbarui data Analisis Mengenai Dampak Lingkungan
          </p>
          <p className="text-green-100">{formData.nomor_surat}</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Edit Data AMDAL
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Informasi Dasar */}
          <div className="bg-gray-50 dark:bg-gray-700/20 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Informasi Dasar
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="nomor_surat"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Nomor Surat *
                </label>
                <input
                  type="text"
                  id="nomor_surat"
                  name="nomor_surat"
                  value={formData.nomor_surat}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="Contoh: AMDAL/001/2025"
                />
              </div>

              <div>
                <label
                  htmlFor="pemohon"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Pemohon *
                </label>
                <input
                  type="text"
                  id="pemohon"
                  name="pemohon"
                  value={formData.pemohon}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="Nama pemohon atau perusahaan"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <label
                  htmlFor="jenis_rencana_kegiatan"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Jenis Rencana Kegiatan *
                </label>
                <input
                  type="text"
                  id="jenis_rencana_kegiatan"
                  name="jenis_rencana_kegiatan"
                  value={formData.jenis_rencana_kegiatan}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="Contoh: Pembangunan Pabrik"
                />
              </div>

              <div>
                <label
                  htmlFor="skala_kegiatan"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Skala Kegiatan *
                </label>
                <select
                  id="skala_kegiatan"
                  name="skala_kegiatan"
                  value={formData.skala_kegiatan}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                >
                  <option value="kecil">Kecil</option>
                  <option value="menengah">Menengah</option>
                  <option value="besar">Besar</option>
                </select>
              </div>
            </div>

            <div className="mt-6">
              <label
                htmlFor="nama_rencana_kegiatan"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Nama Rencana Kegiatan *
              </label>
              <input
                type="text"
                id="nama_rencana_kegiatan"
                name="nama_rencana_kegiatan"
                value={formData.nama_rencana_kegiatan}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="Nama rencana kegiatan yang akan dilakukan"
              />
            </div>

            <div className="mt-6">
              <label
                htmlFor="lokasi"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Lokasi *
              </label>
              <textarea
                id="lokasi"
                name="lokasi"
                value={formData.lokasi}
                onChange={handleChange}
                required
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="Alamat lengkap lokasi kegiatan"
              />
            </div>

            <div className="mt-6">
              <label
                htmlFor="deskripsi_kegiatan"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Deskripsi Kegiatan *
              </label>
              <textarea
                id="deskripsi_kegiatan"
                name="deskripsi_kegiatan"
                value={formData.deskripsi_kegiatan}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="Deskripsi detail kegiatan yang akan dilakukan"
              />
            </div>
          </div>

          {/* Analisis Dampak Lingkungan */}
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
              <Leaf className="w-5 h-5 text-green-600" />
              Analisis Dampak Lingkungan
            </h3>

            <div className="space-y-6">
              <div>
                <label
                  htmlFor="rona_lingkungan_hidup"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Rona Lingkungan Hidup *
                </label>
                <textarea
                  id="rona_lingkungan_hidup"
                  name="rona_lingkungan_hidup"
                  value={formData.rona_lingkungan_hidup}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="Deskripsi kondisi lingkungan hidup saat ini"
                />
              </div>

              <div>
                <label
                  htmlFor="prakiraan_dampak"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Prakiraan Dampak Penting *
                </label>
                <textarea
                  id="prakiraan_dampak"
                  name="prakiraan_dampak"
                  value={formData.prakiraan_dampak}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="Prakiraan dampak penting yang akan timbul"
                />
              </div>

              <div>
                <label
                  htmlFor="evaluasi_dampak"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Evaluasi Dampak Penting *
                </label>
                <textarea
                  id="evaluasi_dampak"
                  name="evaluasi_dampak"
                  value={formData.evaluasi_dampak}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="Evaluasi secara holistik terhadap dampak penting"
                />
              </div>

              <div>
                <label
                  htmlFor="rencana_pengelolaan"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Rencana Pengelolaan Lingkungan (RKL) *
                </label>
                <textarea
                  id="rencana_pengelolaan"
                  name="rencana_pengelolaan"
                  value={formData.rencana_pengelolaan}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="Rencana pengelolaan dan penanggulangan dampak"
                />
              </div>

              <div>
                <label
                  htmlFor="rencana_pemantauan"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Rencana Pemantauan Lingkungan (RPL) *
                </label>
                <textarea
                  id="rencana_pemantauan"
                  name="rencana_pemantauan"
                  value={formData.rencana_pemantauan}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="Rencana pemantauan lingkungan hidup"
                />
              </div>
            </div>
          </div>

          {/* Detail Administrasi */}
          <div className="bg-gray-50 dark:bg-gray-700/20 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              Detail Administrasi
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label
                  htmlFor="tanggal_pengajuan"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  <Calendar className="w-4 h-4 inline mr-1" />
                  Tanggal Pengajuan *
                </label>
                <input
                  type="date"
                  id="tanggal_pengajuan"
                  name="tanggal_pengajuan"
                  value={formData.tanggal_pengajuan}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label
                  htmlFor="tanggal_terbit"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  <Calendar className="w-4 h-4 inline mr-1" />
                  Tanggal Terbit
                </label>
                <input
                  type="date"
                  id="tanggal_terbit"
                  name="tanggal_terbit"
                  value={formData.tanggal_terbit}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label
                  htmlFor="masa_berlaku"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  <Calendar className="w-4 h-4 inline mr-1" />
                  Masa Berlaku
                </label>
                <input
                  type="date"
                  id="masa_berlaku"
                  name="masa_berlaku"
                  value={formData.masa_berlaku}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div>
                <label
                  htmlFor="nilai_investasi"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Nilai Investasi (Rp)
                </label>
                <input
                  type="number"
                  id="nilai_investasi"
                  name="nilai_investasi"
                  value={formData.nilai_investasi}
                  onChange={handleChange}
                  min="0"
                  step="1000"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="0"
                />
              </div>

              <div>
                <label
                  htmlFor="luas_area"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Luas Area (m²)
                </label>
                <input
                  type="number"
                  id="luas_area"
                  name="luas_area"
                  value={formData.luas_area}
                  onChange={handleChange}
                  min="0"
                  step="0.1"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="0"
                />
              </div>

              <div>
                <label
                  htmlFor="status"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                >
                  <option value="pending">Menunggu</option>
                  <option value="review">Review</option>
                  <option value="approved">Disetujui</option>
                  <option value="rejected">Ditolak</option>
                </select>
              </div>
            </div>

            <div className="mt-6">
              <label
                htmlFor="catatan"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Catatan
              </label>
              <textarea
                id="catatan"
                name="catatan"
                value={formData.catatan}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="Catatan tambahan atau keterangan"
              />
            </div>
          </div>

          {/* Upload Dokumen */}
          <div className="bg-gray-50 dark:bg-gray-700/20 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Dokumen Pendukung
            </h3>

            <div className="mb-4">
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="documentUpload"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Klik untuk upload</span>{" "}
                      dokumen AMDAL tambahan
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      PDF, PNG, JPG, JPEG (MAX. 10MB per file)
                    </p>
                  </div>
                  <input
                    id="documentUpload"
                    type="file"
                    accept="application/pdf,image/*"
                    multiple
                    onChange={handleDocumentUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {formData.dokumen_pendukung.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Dokumen yang telah diupload:
                </p>
                {formData.dokumen_pendukung.map((doc, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600"
                  >
                    <span className="text-sm text-gray-700 dark:text-gray-300 truncate">
                      {doc.split("/").pop() || `Dokumen ${index + 1}`}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeDocument(index)}
                      className="text-red-500 hover:text-red-700 ml-2 px-2 py-1 rounded"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-center mt-6">
              <input
                type="checkbox"
                id="persyaratan_terpenuhi"
                name="persyaratan_terpenuhi"
                checked={formData.persyaratan_terpenuhi}
                onChange={handleChange}
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <label
                htmlFor="persyaratan_terpenuhi"
                className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
              >
                Persyaratan AMDAL telah terpenuhi
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
              className="flex items-center gap-2 px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-4 h-4" />
              {loading ? "Menyimpan..." : "Perbarui AMDAL"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
