"use client";

import React from "react";

const PelayananAmdalPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-teal-500 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Pelayanan AMDAL
            </h1>
            <p className="text-lg opacity-90 max-w-3xl mx-auto">
              Analisis Mengenai Dampak Lingkungan (AMDAL) untuk pembangunan 
              berkelanjutan di Kota Tasikmalaya
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Informasi Umum Section */}
        <section className="max-w-6xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">
            Tentang AMDAL
          </h2>
          <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8">
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 mb-6 indent-8">
                <span className="font-bold">AMDAL</span> adalah kajian mengenai dampak besar dan penting suatu usaha dan/atau kegiatan yang direncanakan pada lingkungan hidup yang diperlukan bagi proses pengambilan keputusan tentang penyelenggaraan usaha dan/atau kegiatan di Indonesia.
              </p>
            </div>
          </div>
        </section>

        {/* Informasi Umum Section */}
        <section className="max-w-6xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">
            Dasar Hukum
          </h2>
          <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8">
            <div className="prose dark:prose-invert max-w-none">
              <ul className="list-decimal pl-6 space-y-3 text-gray-700 dark:text-gray-300">
                <li>Undang-Undang No.32 Tahun 2009 tentang perlindungan dan pengelolaan Lingkungan Hidup.</li>
                <li>Peraturan Pemerintah No.27 Tahun 2012 tentang izin lingkungan.</li>
                <li>Peraturan Menteri lingkungan Hidup No.5 Tahun 2012 Tentang jenis rencana usaha dan/atau kegiatan yang wajib memiliki AMDAL.</li>
                <li>Peraturan Menteri lingkungan Hidup No.8 Tahun 2013 Tentang Laksana penilaian dan pemeriksaan Dokumen Lingkungan Hidup serta penerbitan Izin Lingkungan.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* u can delete from here */}
        <section className="max-w-6xl mx-auto mb-12">
          <h1 className="text-6xl font-bold text-gray-800 dark:text-white mb-8 text-center">
            Dumy teks
          </h1>
        </section>        
        {/* Prosedur Section */}
        <section className="max-w-6xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">
            Prosedur Pengajuan
          </h2>
          <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
                  Persyaratan Dokumen
                </h3>
                <ul className="list-disc pl-6 space-y-3 text-gray-700 dark:text-gray-300">
                  <li>Formulir permohonan yang telah diisi lengkap</li>
                  <li>Profil usaha/kegiatan yang direncanakan</li>
                  <li>Dokumen studi kelayakan teknis dan ekonomis</li>
                  <li>Peta lokasi dengan skala yang memadai</li>
                  <li>Bukti formal badan usaha/badan hukum</li>
                  <li>Dokumen rencana pengelolaan lingkungan</li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
                  Tahapan Proses
                </h3>
                <ul className="list-decimal pl-6 space-y-3 text-gray-700 dark:text-gray-300">
                  <li>Pengajuan permohonan dan kelengkapan dokumen</li>
                  <li>Pemeriksaan administrasi</li>
                  <li>Penyusunan Kerangka Acuan (KA)</li>
                  <li>Penyusunan ANDAL, RKL, dan RPL</li>
                  <li>Penilaian oleh Komisi Penilai AMDAL</li>
                  <li>Penerbitan Keputusan Kelayakan Lingkungan</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Biaya dan Waktu Section */}
        <section className="max-w-6xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">
            Biaya dan Waktu Layanan
          </h2>
          <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
                  Biaya Layanan
                </h3>
                <div className="space-y-3 text-gray-700 dark:text-gray-300">
                  <p>Biaya layanan AMDAL terdiri dari:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Biaya administrasi: Rp xxx.xxx</li>
                    <li>Biaya penilaian dokumen: Rp x.xxx.xxx</li>
                    <li>Biaya sidang teknis: Rp x.xxx.xxx</li>
                    <li>Biaya pemantauan: Rp xxx.xxx</li>
                  </ul>
                  <p className="text-sm italic mt-4">
                    *Biaya dapat berubah sesuai dengan kompleksitas proyek
                  </p>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
                  Waktu Penyelesaian
                </h3>
                <div className="space-y-3 text-gray-700 dark:text-gray-300">
                  <p>Estimasi waktu proses:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Pemeriksaan administrasi: 7 hari kerja</li>
                    <li>Penilaian KA: 30 hari kerja</li>
                    <li>Penilaian ANDAL, RKL-RPL: 75 hari kerja</li>
                    <li>Penerbitan Keputusan: 10 hari kerja</li>
                  </ul>
                  <p className="text-sm italic mt-4">
                    *Waktu dapat berbeda tergantung kelengkapan dokumen
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Kontak Section */}
        <section className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">
            Kontak Layanan AMDAL
          </h2>
          <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
                  Lokasi Pelayanan
                </h3>
                <div className="space-y-2 text-gray-700 dark:text-gray-300">
                  <p>Kantor DLH Kota Tasikmalaya</p>
                  <p>Gedung Pelayanan Terpadu Lt. 2</p>
                  <p>Jl. Lingkungan Hidup No. 123</p>
                  <p>Kota Tasikmalaya, Jawa Barat 46111</p>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
                  Informasi Kontak
                </h3>
                <div className="space-y-2 text-gray-700 dark:text-gray-300">
                  <p>Email: amdal@dhl-tasikmalaya.go.id</p>
                  <p>Telepon: (0265) 123456 ext. 789</p>
                  <p>WhatsApp: 0812-3456-7890</p>
                  <p>Jam Layanan: Senin-Jumat, 08.00-16.00 WIB</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* u can delete to here */}
      </div>
    </div>
  );
};

export default PelayananAmdalPage;