'use client';

import { useState } from 'react';

export default function Pengaduan() {
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    telepon: '',
    alamat: '',
    kategori: '',
    judul: '',
    deskripsi: '',
    lokasi: '',
    file: null
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    alert('Pengaduan Anda telah berhasil dikirim!');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              📝 Layanan Pengaduan
            </h1>
            <p className="text-xl md:text-2xl opacity-90">
              Sampaikan keluhan dan saran Anda untuk lingkungan yang lebih baik
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          
          {/* Info Cards */}
          <section className="mb-12">
            <div className="grid md:grid-cols-3 gap-6">
              
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center border border-gray-200 dark:border-gray-700">
                <div className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">Respons Cepat</h3>
                <p className="text-gray-600 dark:text-gray-300">Pengaduan ditanggapi maksimal 3x24 jam</p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center border border-gray-200 dark:border-gray-700">
                <div className="bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">Terpercaya</h3>
                <p className="text-gray-600 dark:text-gray-300">Data Anda aman dan terjaga kerahasiaannya</p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center border border-gray-200 dark:border-gray-700">
                <div className="bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">Tindak Lanjut</h3>
                <p className="text-gray-600 dark:text-gray-300">Setiap pengaduan akan ditindaklanjuti</p>
              </div>
            </div>
          </section>

          {/* Form Pengaduan */}
          <section>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                Form Pengaduan
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Data Pelapor */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
                    Data Pelapor
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Nama Lengkap *
                      </label>
                      <input
                        type="text"
                        name="nama"
                        required
                        value={formData.nama}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="Masukkan nama lengkap"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="contoh@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Nomor Telepon *
                      </label>
                      <input
                        type="tel"
                        name="telepon"
                        required
                        value={formData.telepon}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="08xxxxxxxxxx"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Alamat
                      </label>
                      <input
                        type="text"
                        name="alamat"
                        value={formData.alamat}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="Alamat lengkap"
                      />
                    </div>
                  </div>
                </div>

                {/* Detail Pengaduan */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
                    Detail Pengaduan
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Kategori Pengaduan *
                      </label>
                      <select
                        name="kategori"
                        required
                        value={formData.kategori}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      >
                        <option value="">Pilih kategori</option>
                        <option value="pencemaran-air">Pencemaran Air</option>
                        <option value="pencemaran-udara">Pencemaran Udara</option>
                        <option value="sampah">Pengelolaan Sampah</option>
                        <option value="kebisingan">Kebisingan</option>
                        <option value="limbah">Limbah Industri</option>
                        <option value="lainnya">Lainnya</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Judul Pengaduan *
                      </label>
                      <input
                        type="text"
                        name="judul"
                        required
                        value={formData.judul}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="Ringkasan masalah yang dilaporkan"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Lokasi Kejadian *
                      </label>
                      <input
                        type="text"
                        name="lokasi"
                        required
                        value={formData.lokasi}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="Alamat/lokasi tempat kejadian"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Deskripsi Pengaduan *
                      </label>
                      <textarea
                        name="deskripsi"
                        required
                        rows={5}
                        value={formData.deskripsi}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="Jelaskan secara detail masalah yang Anda alami/temukan..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Upload Foto Bukti (Opsional)
                      </label>
                      <input
                        type="file"
                        name="file"
                        accept="image/*"
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                      />
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Format: JPG, PNG. Maksimal 5MB
                      </p>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:from-green-700 hover:to-blue-700 transform hover:scale-105 transition duration-300 shadow-lg"
                  >
                    📤 Kirim Pengaduan
                  </button>
                  <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-4">
                    Dengan mengirim pengaduan, Anda menyetujui bahwa data yang disampaikan adalah benar dan dapat dipertanggungjawabkan.
                  </p>
                </div>
              </form>
            </div>
          </section>

          {/* Contact Info */}
          <section className="mt-12">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
                Kontak Alternatif
              </h3>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                    📞
                  </div>
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Telepon</h4>
                  <p className="text-gray-600 dark:text-gray-300">(0265) 321234</p>
                </div>
                <div>
                  <div className="bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                    📧
                  </div>
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Email</h4>
                  <p className="text-gray-600 dark:text-gray-300">pengaduan@dlh.tasikmalayakota.go.id</p>
                </div>
                <div>
                  <div className="bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                    💬
                  </div>
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-2">WhatsApp</h4>
                  <p className="text-gray-600 dark:text-gray-300">0812-3456-7890</p>
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
