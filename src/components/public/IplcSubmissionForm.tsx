'use client';

import React, { useState } from 'react';
import { FileText, Send, ArrowLeft } from 'lucide-react';

interface IplcFormData {
  pemohon: string;
  nama_kegiatan: string;
  jenis_kegiatan: string;
  kategori_usaha: string;
  lokasi: string;
  deskripsi_kegiatan: string;
  upaya_pengelolaan: string;
  upaya_pemantauan: string;
  nilai_investasi: number;
  luas_area: number;
}

const IplcSubmissionForm = () => {
  const [formData, setFormData] = useState<IplcFormData>({
    pemohon: '',
    nama_kegiatan: '',
    jenis_kegiatan: '',
    kategori_usaha: '',
    lokasi: '',
    deskripsi_kegiatan: '',
    upaya_pengelolaan: '',
    upaya_pemantauan: '',
    nilai_investasi: 0,
    luas_area: 0,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
    nomorSurat?: string;
  }>({ type: null, message: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'nilai_investasi' || name === 'luas_area' 
        ? parseFloat(value) || 0 
        : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const response = await fetch('/api/public/perizinan/iplc/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus({
          type: 'success',
          message: 'Pengajuan IPLC berhasil dikirim!',
          nomorSurat: result.data.nomor_surat
        });
        // Reset form
        setFormData({
          pemohon: '',
          nama_kegiatan: '',
          jenis_kegiatan: '',
          kategori_usaha: '',
          lokasi: '',
          deskripsi_kegiatan: '',
          upaya_pengelolaan: '',
          upaya_pemantauan: '',
          nilai_investasi: 0,
          luas_area: 0,
        });
      } else {
        setSubmitStatus({
          type: 'error',
          message: result.error || 'Terjadi kesalahan saat mengirim pengajuan'
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Terjadi kesalahan jaringan. Silakan coba lagi.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus.type === 'success') {
    return (
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
            <FileText className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Pengajuan IPLC Berhasil Dikirim!
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Nomor Surat: <strong>{submitStatus.nomorSurat}</strong>
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            Pengajuan Anda telah diterima dan akan diproses. Anda dapat memantau status pengajuan melalui nomor surat di atas.
          </p>
          <div className="space-y-3">
            <button
              onClick={() => window.open('/perizinan/status', '_blank')}
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Cek Status Pengajuan
            </button>
            <button
              onClick={() => setSubmitStatus({ type: null, message: '' })}
              className="w-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              Buat Pengajuan Baru
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <div className="p-8">
        <div className="flex items-center mb-6">
          <FileText className="h-8 w-8 text-blue-600 mr-3" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Formulir Pengajuan IPLC
          </h2>
        </div>

        {submitStatus.type === 'error' && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-red-600 dark:text-red-400">{submitStatus.message}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="pemohon" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Nama Pemohon *
              </label>
              <input
                type="text"
                id="pemohon"
                name="pemohon"
                value={formData.pemohon}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Masukkan nama pemohon"
              />
            </div>

            <div>
              <label htmlFor="jenis_kegiatan" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Jenis Kegiatan *
              </label>
              <select
                id="jenis_kegiatan"
                name="jenis_kegiatan"
                value={formData.jenis_kegiatan}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="">Pilih Jenis Kegiatan</option>
                <option value="Industri Makanan dan Minuman">Industri Makanan dan Minuman</option>
                <option value="Industri Tekstil">Industri Tekstil</option>
                <option value="Industri Kimia">Industri Kimia</option>
                <option value="Industri Logam">Industri Logam</option>
                <option value="Rumah Sakit">Rumah Sakit</option>
                <option value="Hotel dan Restoran">Hotel dan Restoran</option>
                <option value="Perkantoran">Perkantoran</option>
                <option value="Perumahan">Perumahan</option>
                <option value="Lainnya">Lainnya</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="nama_kegiatan" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Nama Kegiatan *
              </label>
              <input
                type="text"
                id="nama_kegiatan"
                name="nama_kegiatan"
                value={formData.nama_kegiatan}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Contoh: Pembangunan Pabrik Tekstil"
              />
            </div>

            <div>
              <label htmlFor="kategori_usaha" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Kategori Usaha *
              </label>
              <select
                id="kategori_usaha"
                name="kategori_usaha"
                value={formData.kategori_usaha}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="">Pilih Kategori Usaha</option>
                <option value="Kecil">Kecil</option>
                <option value="Menengah">Menengah</option>
                <option value="Besar">Besar</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="lokasi" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Lokasi Kegiatan *
            </label>
            <input
              type="text"
              id="lokasi"
              name="lokasi"
              value={formData.lokasi}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Alamat lengkap lokasi kegiatan"
            />
          </div>

          <div>
            <label htmlFor="deskripsi_kegiatan" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Deskripsi Kegiatan *
            </label>
            <textarea
              id="deskripsi_kegiatan"
              name="deskripsi_kegiatan"
              value={formData.deskripsi_kegiatan}
              onChange={handleInputChange}
              required
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Jelaskan detail kegiatan yang akan dilakukan..."
            />
          </div>

          <div>
            <label htmlFor="upaya_pengelolaan" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Upaya Pengelolaan Limbah Cair *
            </label>
            <textarea
              id="upaya_pengelolaan"
              name="upaya_pengelolaan"
              value={formData.upaya_pengelolaan}
              onChange={handleInputChange}
              required
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Jelaskan upaya pengelolaan limbah cair yang akan dilakukan..."
            />
          </div>

          <div>
            <label htmlFor="upaya_pemantauan" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Upaya Pemantauan *
            </label>
            <textarea
              id="upaya_pemantauan"
              name="upaya_pemantauan"
              value={formData.upaya_pemantauan}
              onChange={handleInputChange}
              required
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Jelaskan upaya pemantauan yang akan dilakukan..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="nilai_investasi" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Nilai Investasi (Rp) *
              </label>
              <input
                type="number"
                id="nilai_investasi"
                name="nilai_investasi"
                value={formData.nilai_investasi}
                onChange={handleInputChange}
                required
                min="0"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Contoh: 1000000000"
              />
            </div>

            <div>
              <label htmlFor="luas_area" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Luas Area (m²) *
              </label>
              <input
                type="number"
                id="luas_area"
                name="luas_area"
                value={formData.luas_area}
                onChange={handleInputChange}
                required
                min="0"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Contoh: 5000"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="flex items-center gap-2 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Kembali
            </button>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 transition-colors flex-1 justify-center"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Mengirim...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Kirim Pengajuan
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default IplcSubmissionForm;
