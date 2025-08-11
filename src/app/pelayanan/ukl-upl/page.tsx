"use client";

import React from "react";

const PelayananUklUplPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center min-h-[120px] flex flex-col justify-center">
            <div className="flex flex-col items-center justify-center mb-4">
              <h1 className="text-3xl md:text-5xl font-bold text-center leading-tight">
                Pelayanan UKL-UPL
              </h1>
            </div>
            <p className="text-lg opacity-90 max-w-3xl mx-auto">
              Upaya Pengelolaan Lingkungan Hidup dan Upaya Pemantauan Lingkungan Hidup 
              untuk kegiatan usaha yang tidak wajib AMDAL
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">

        {/* Perizinan UKL-UPL Section */}
        <section className="max-w-6xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">
            Perizinan UKL-UPL
          </h2>
          <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8">
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 mb-6 indent-8">
                <span className="font-bold">UKL-UPL</span> (Upaya Pengelolaan Lingkungan Hidup dan Upaya Pemantauan Lingkungan Hidup) merupakan dokumen pengelolaan lingkungan hidup bagi rencana usaha dan atau kegiatan yang tidak wajib AMDAL
              </p>
            </div>
          </div>
        </section>

        {/* u can delete from here */}
        <section className="max-w-6xl mx-auto mb-12">
          <h1 className="text-6xl font-bold text-gray-800 dark:text-white mb-8 text-center">
            Dumy teks
          </h1>
        </section>

        {/* Informasi Umum Section */}
        <section className="max-w-6xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">
            Tentang UKL-UPL
          </h2>
          <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8">
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                UKL-UPL adalah dokumen pengelolaan lingkungan hidup yang wajib dimiliki oleh 
                pelaku usaha yang kegiatannya tidak wajib AMDAL namun berpotensi menimbulkan 
                dampak terhadap lingkungan.
              </p>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
                Kriteria Kegiatan yang Memerlukan UKL-UPL
              </h3>
              <ul className="list-disc pl-6 space-y-3 text-gray-700 dark:text-gray-300">
                <li>Usaha menengah yang tidak masuk kriteria wajib AMDAL</li>
                <li>Kegiatan yang berlokasi di luar kawasan lindung</li>
                <li>Usaha yang memiliki dampak lingkungan yang dapat dikelola</li>
                <li>Kegiatan yang memerlukan izin lingkungan</li>
              </ul>
            </div>
          </div>
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
                  Dokumen Persyaratan
                </h3>
                <ul className="list-disc pl-6 space-y-3 text-gray-700 dark:text-gray-300">
                  <li>Formulir UKL-UPL yang telah diisi</li>
                  <li>Profil usaha/kegiatan</li>
                  <li>Rencana detail kegiatan</li>
                  <li>Peta lokasi dengan skala yang memadai</li>
                  <li>Izin-izin yang telah dimiliki</li>
                  <li>Layout dan denah kegiatan</li>
                  <li>Dokumentasi rona lingkungan</li>
                  <li>Bukti konsultasi masyarakat</li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
                  Tahapan Proses
                </h3>
                <ol className="list-decimal pl-6 space-y-3 text-gray-700 dark:text-gray-300">
                  <li>Pengajuan formulir UKL-UPL</li>
                  <li>Pemeriksaan administrasi</li>
                  <li>Pemeriksaan teknis dokumen</li>
                  <li>Peninjauan lokasi</li>
                  <li>Rapat pembahasan teknis</li>
                  <li>Perbaikan dokumen (jika diperlukan)</li>
                  <li>Penerbitan Rekomendasi UKL-UPL</li>
                  <li>Penerbitan Izin Lingkungan</li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* Materi UKL-UPL Section */}
        <section className="max-w-6xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">
            Materi UKL-UPL
          </h2>
          <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
                  Upaya Pengelolaan Lingkungan (UKL)
                </h3>
                <ul className="list-disc pl-6 space-y-3 text-gray-700 dark:text-gray-300">
                  <li>Identifikasi sumber dampak</li>
                  <li>Pengelolaan limbah dan emisi</li>
                  <li>Pengendalian dampak penting</li>
                  <li>Pengelolaan kualitas lingkungan</li>
                  <li>Program keselamatan lingkungan</li>
                  <li>Rencana tanggap darurat</li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
                  Upaya Pemantauan Lingkungan (UPL)
                </h3>
                <ul className="list-disc pl-6 space-y-3 text-gray-700 dark:text-gray-300">
                  <li>Pemantauan kualitas air</li>
                  <li>Pemantauan kualitas udara</li>
                  <li>Pemantauan tingkat kebisingan</li>
                  <li>Pemantauan pengelolaan limbah</li>
                  <li>Monitoring dampak sosial</li>
                  <li>Pelaporan hasil pemantauan</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Informasi Layanan Section */}
        <section className="max-w-6xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">
            Informasi Layanan
          </h2>
          <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
                  Biaya dan Waktu
                </h3>
                <div className="space-y-2 text-gray-700 dark:text-gray-300">
                  <p className="font-semibold">Biaya Layanan:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Biaya administrasi: Rp 1.000.000</li>
                    <li>Biaya verifikasi teknis: Rp 3.000.000</li>
                    <li>Biaya rapat pembahasan: Rp 2.000.000</li>
                  </ul>
                  <p className="font-semibold mt-4">Waktu Penyelesaian:</p>
                  <p>30 hari kerja (jika dokumen lengkap)</p>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
                  Kontak dan Lokasi
                </h3>
                <div className="space-y-2 text-gray-700 dark:text-gray-300">
                  <p>Bidang Tata Lingkungan</p>
                  <p>DLH Kota Tasikmalaya</p>
                  <p>Jl. Lingkungan Hidup No. 123</p>
                  <p>Email: ukl-upl@dhl-tasikmalaya.go.id</p>
                  <p>Telepon: (0265) 123456 ext. 789</p>
                  <p>WhatsApp: 0812-3456-7890</p>
                  <p className="mt-4">Jam Layanan:</p>
                  <p>Senin-Jumat: 08.00-16.00 WIB</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* u can delete to here */}

        {/* Back to Profile */}
        <section className="max-w-6xl mx-auto mb-12">
          <div className="text-center">
            <a
              href="/pelayanan"
              className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Kembali ke Halaman Pelayanan
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PelayananUklUplPage;