'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Send, FileText, User, MapPin, DollarSign, BarChart3 } from 'lucide-react';

interface AmdalFormData {
  pemohon: string;
  nama_rencana_kegiatan: string;
  jenis_rencana_kegiatan: string;
  skala_kegiatan: string;
  lokasi: string;
  deskripsi_kegiatan: string;
  nilai_investasi: string;
  luas_area: string;
  rona_lingkungan_hidup: string;
  prakiraan_dampak: string;
  evaluasi_dampak: string;
  rencana_pengelolaan: string;
  rencana_pemantauan: string;
  catatan: string;
}

const AmdalSubmissionForm = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{
    success: boolean;
    message: string;
    data?: any;
  } | null>(null);

  const [formData, setFormData] = useState<AmdalFormData>({
    pemohon: '',
    nama_rencana_kegiatan: '',
    jenis_rencana_kegiatan: '',
    skala_kegiatan: 'menengah',
    lokasi: '',
    deskripsi_kegiatan: '',
    nilai_investasi: '',
    luas_area: '',
    rona_lingkungan_hidup: '',
    prakiraan_dampak: '',
    evaluasi_dampak: '',
    rencana_pengelolaan: '',
    rencana_pemantauan: '',
    catatan: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitResult(null);

    try {
      const response = await fetch('/api/public/perizinan/amdal/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitResult({
          success: true,
          message: result.message,
          data: result.data
        });
        // Reset form
        setFormData({
          pemohon: '',
          nama_rencana_kegiatan: '',
          jenis_rencana_kegiatan: '',
          skala_kegiatan: 'menengah',
          lokasi: '',
          deskripsi_kegiatan: '',
          nilai_investasi: '',
          luas_area: '',
          rona_lingkungan_hidup: '',
          prakiraan_dampak: '',
          evaluasi_dampak: '',
          rencana_pengelolaan: '',
          rencana_pemantauan: '',
          catatan: ''
        });
      } else {
        setSubmitResult({
          success: false,
          message: result.error || 'Terjadi kesalahan saat mengirim pengajuan'
        });
      }
    } catch (error) {
      console.error('Submit error:', error);
      setSubmitResult({
        success: false,
        message: 'Terjadi kesalahan koneksi. Silakan coba lagi.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitResult?.success) {
    return (
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow p-8">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <FileText className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Pengajuan AMDAL Berhasil Dikirim!
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {submitResult.message}
          </p>
          {submitResult.data && (
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                <strong>Nomor Referensi:</strong> {submitResult.data.nomor_surat}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                <strong>Tanggal Pengajuan:</strong> {submitResult.data.tanggal_pengajuan}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                <strong>Status:</strong> <span className="text-yellow-600 font-medium">Pending Review</span>
              </p>
            </div>
          )}
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => setSubmitResult(null)}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition duration-300"
            >
              Kirim Pengajuan Lain
            </button>
            <button
              onClick={() => router.push('/perizinan')}
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition duration-300"
            >
              Kembali ke Halaman Perizinan
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
          <FileText className="w-8 h-8 text-green-600" />
          Formulir Pengajuan AMDAL
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Silakan lengkapi formulir di bawah ini untuk mengajukan Analisis Mengenai Dampak Lingkungan (AMDAL)
        </p>
      </div>

      {submitResult && !submitResult.success && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative">
          <strong className="font-bold">Error: </strong>
          <span>{submitResult.message}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Section: Informasi Pemohon */}
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <User className="w-5 h-5" />
            Informasi Pemohon
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Nama Pemohon/Perusahaan *
              </label>
              <input
                type="text"
                name="pemohon"
                value={formData.pemohon}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="Masukkan nama pemohon atau perusahaan"
              />
            </div>
          </div>
        </div>

        {/* Section: Informasi Kegiatan */}
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Informasi Kegiatan
          </h3>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Nama Rencana Kegiatan *
              </label>
              <input
                type="text"
                name="nama_rencana_kegiatan"
                value={formData.nama_rencana_kegiatan}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="Contoh: Pembangunan Pabrik Pengolahan..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Jenis Rencana Kegiatan *
                </label>
                <input
                  type="text"
                  name="jenis_rencana_kegiatan"
                  value={formData.jenis_rencana_kegiatan}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="Contoh: Industri Kimia"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Skala Kegiatan *
                </label>
                <select
                  name="skala_kegiatan"
                  value={formData.skala_kegiatan}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                >
                  <option value="kecil">Kecil</option>
                  <option value="menengah">Menengah</option>
                  <option value="besar">Besar</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Deskripsi Kegiatan *
              </label>
              <textarea
                name="deskripsi_kegiatan"
                value={formData.deskripsi_kegiatan}
                onChange={handleInputChange}
                required
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="Jelaskan secara detail kegiatan yang akan dilakukan..."
              />
            </div>
          </div>
        </div>

        {/* Section: Lokasi dan Teknis */}
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Lokasi dan Data Teknis
          </h3>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Lokasi Kegiatan *
              </label>
              <textarea
                name="lokasi"
                value={formData.lokasi}
                onChange={handleInputChange}
                required
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="Alamat lengkap lokasi kegiatan..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-1">
                  <DollarSign className="w-4 h-4" />
                  Nilai Investasi (Rp) *
                </label>
                <input
                  type="number"
                  name="nilai_investasi"
                  value={formData.nilai_investasi}
                  onChange={handleInputChange}
                  required
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="Contoh: 1000000000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-1">
                  <BarChart3 className="w-4 h-4" />
                  Luas Area (m²) *
                </label>
                <input
                  type="number"
                  name="luas_area"
                  value={formData.luas_area}
                  onChange={handleInputChange}
                  required
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="Contoh: 5000"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section: Analisis Lingkungan */}
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Analisis Dampak Lingkungan
          </h3>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Rona Lingkungan Hidup
              </label>
              <textarea
                name="rona_lingkungan_hidup"
                value={formData.rona_lingkungan_hidup}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="Deskripsikan kondisi lingkungan saat ini..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Prakiraan Dampak Penting
              </label>
              <textarea
                name="prakiraan_dampak"
                value={formData.prakiraan_dampak}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="Dampak yang mungkin ditimbulkan oleh kegiatan..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Rencana Pengelolaan Lingkungan (RKL)
              </label>
              <textarea
                name="rencana_pengelolaan"
                value={formData.rencana_pengelolaan}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="Rencana untuk mengelola dampak lingkungan..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Rencana Pemantauan Lingkungan (RPL)
              </label>
              <textarea
                name="rencana_pemantauan"
                value={formData.rencana_pemantauan}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="Rencana pemantauan dampak lingkungan..."
              />
            </div>
          </div>
        </div>

        {/* Section: Catatan */}
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Catatan Tambahan
          </h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Catatan atau Informasi Tambahan
            </label>
            <textarea
              name="catatan"
              value={formData.catatan}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              placeholder="Informasi tambahan yang perlu disampaikan..."
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex gap-4 justify-end">
          <button
            type="button"
            onClick={() => router.back()}
            className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-3 px-6 rounded-lg transition duration-300"
          >
            Batal
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-medium py-3 px-8 rounded-lg transition duration-300 flex items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Mengirim...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Kirim Pengajuan
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AmdalSubmissionForm;
