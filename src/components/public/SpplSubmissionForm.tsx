'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Send, FileText, User, MapPin, DollarSign, BarChart3 } from 'lucide-react';

interface SpplFormData {
  pemohon: string;
  nama_kegiatan: string;
  jenis_usaha: string;
  lokasi: string;
  nilai_investasi: string;
  luas_area: string;
  kategori_dampak: string;
  upaya_pengelolaan_sppl: string;
  catatan: string;
}

const SpplSubmissionForm = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{
    success: boolean;
    message: string;
    data?: any;
  } | null>(null);

  const [formData, setFormData] = useState<SpplFormData>({
    pemohon: '',
    nama_kegiatan: '',
    jenis_usaha: '',
    lokasi: '',
    nilai_investasi: '',
    luas_area: '',
    kategori_dampak: 'kecil',
    upaya_pengelolaan_sppl: '',
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
      const response = await fetch('/api/public/perizinan/sppl/submit', {
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
          nama_kegiatan: '',
          jenis_usaha: '',
          lokasi: '',
          nilai_investasi: '',
          luas_area: '',
          kategori_dampak: 'kecil',
          upaya_pengelolaan_sppl: '',
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
            Pengajuan SPPL Berhasil Dikirim!
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
          Formulir Pengajuan SPPL
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Silakan lengkapi formulir di bawah ini untuk mengajukan Surat Pernyataan Pengelolaan Lingkungan (SPPL)
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

        {/* Section: Informasi Kegiatan */}
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Informasi Kegiatan/Usaha
          </h3>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Nama Kegiatan/Usaha *
              </label>
              <input
                type="text"
                name="nama_kegiatan"
                value={formData.nama_kegiatan}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="Contoh: Usaha Warung Makan"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Jenis Usaha *
                </label>
                <select
                  name="jenis_usaha"
                  value={formData.jenis_usaha}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                >
                  <option value="">Pilih Jenis Usaha</option>
                  <option value="Perdagangan">Perdagangan</option>
                  <option value="Jasa">Jasa</option>
                  <option value="Industri">Industri</option>
                  <option value="Pertanian">Pertanian</option>
                  <option value="Perikanan">Perikanan</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Kategori Dampak
                </label>
                <select
                  name="kategori_dampak"
                  value={formData.kategori_dampak}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                >
                  <option value="kecil">Kecil</option>
                  <option value="sedang">Sedang</option>
                  <option value="besar">Besar</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Section: Lokasi dan Data Teknis */}
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Lokasi dan Data Teknis
          </h3>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Lokasi Usaha *
              </label>
              <textarea
                name="lokasi"
                value={formData.lokasi}
                onChange={handleInputChange}
                required
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="Alamat lengkap lokasi usaha..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-1">
                  <DollarSign className="w-4 h-4" />
                  Nilai Investasi (Rp)
                </label>
                <input
                  type="number"
                  name="nilai_investasi"
                  value={formData.nilai_investasi}
                  onChange={handleInputChange}
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="Contoh: 50000000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-1">
                  <BarChart3 className="w-4 h-4" />
                  Luas Area (m²)
                </label>
                <input
                  type="number"
                  name="luas_area"
                  value={formData.luas_area}
                  onChange={handleInputChange}
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="Contoh: 100"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section: Upaya Pengelolaan */}
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Upaya Pengelolaan Lingkungan
          </h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Upaya Pengelolaan Lingkungan yang Akan Dilakukan
            </label>
            <textarea
              name="upaya_pengelolaan_sppl"
              value={formData.upaya_pengelolaan_sppl}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              placeholder="Deskripsikan langkah-langkah pengelolaan lingkungan yang akan diterapkan, seperti pengelolaan limbah, penggunaan bahan ramah lingkungan, dll."
            />
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

        {/* Pernyataan */}
        <div className="border border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-3">
            Pernyataan Kesanggupan
          </h3>
          <p className="text-sm text-yellow-700 dark:text-yellow-300 mb-4">
            Dengan mengajukan SPPL ini, saya menyatakan sanggup untuk:
          </p>
          <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1 list-disc list-inside">
            <li>Melakukan pengelolaan dan pemantauan lingkungan hidup</li>
            <li>Mematuhi peraturan perundang-undangan di bidang lingkungan hidup</li>
            <li>Membuat laporan pelaksanaan SPPL secara berkala</li>
            <li>Bertanggung jawab atas dampak lingkungan yang ditimbulkan</li>
          </ul>
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

export default SpplSubmissionForm;
