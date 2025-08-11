"use client";

import React from "react";

const PelayananSpplPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-teal-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center min-h-[120px] flex flex-col justify-center">
            <div className="flex flex-col items-center justify-center mb-4">
              <h1 className="text-3xl md:text-5xl font-bold text-center leading-tight">
                Pelayanan SPPL
              </h1>
            </div>
            <p className="text-lg opacity-90 max-w-3xl mx-auto">
              Surat Pernyataan Kesanggupan Pengelolaan dan Pemantauan Lingkungan Hidup 
              untuk usaha dan/atau kegiatan yang tidak wajib AMDAL atau UKL-UPL
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">

        {/* Perizinan SPPL Section */}
        <section className="max-w-6xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">
            Perizinan SPPL
          </h2>
          <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8">
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 mb-6 indent-8">
                <span className="font-bold">SPPL</span> (Surat Pernyataan Pengelolaan Lingkungan) adalah kesanggupan dari penanggung jawab usaha dan/ atau kegiatan untuk melakukan pengelolaan dan pemantauan lingkungan hidup atas dampak lingkungan hidup dari usaha dan/ atau kegiatannya di luar Usaha dan/atau kegiatan yang wajib amdal atau UKL-UPL
              </p>
            </div>
          </div>
        </section>

        {/* Dasar Hukum Section
        <section className="max-w-6xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">
            Dasar Hukum
          </h2>
          <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8">
            <div className="prose dark:prose-invert max-w-none">
              <ul className="list-decimal pl-6 space-y-3 text-gray-700 dark:text-gray-300">
                <li>UU No.32 Tahun 2009 tentang tentang Perlindungan dan Pengelolaan Lingkungan Hidup sebagai pengganti UU No. 23 Tahun 1997 tentang pengelolaan Lingkungan Hidup</li>
                <li>Surat Keputusan Menteri Negara Lingkungan Hidup No.111 Tahun 2003 tentang pedoman mengenai syarat Tata Cara Perizinan serta Pedoman Kajian Pembuangan Buih Air Limbah ke air atau sumber air</li>
              </ul>
            </div>
          </div>
        </section>    */}

        {/* u can delete from here */}
        <section className="max-w-6xl mx-auto mb-12">
          <h1 className="text-6xl font-bold text-gray-800 dark:text-white mb-8 text-center">
            Dumy teks
          </h1>
        </section>
        {/* Informasi Umum Section */}
        <section className="max-w-6xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">
            Tentang SPPL
          </h2>
          <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8">
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                SPPL adalah pernyataan kesanggupan dari penanggung jawab usaha untuk melakukan 
                pengelolaan dan pemantauan lingkungan hidup atas dampak lingkungan dari usaha 
                dan/atau kegiatannya di luar usaha yang wajib AMDAL atau UKL-UPL.
              </p>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
                Kriteria Usaha yang Memerlukan SPPL
              </h3>
              <ul className="list-disc pl-6 space-y-3 text-gray-700 dark:text-gray-300">
                <li>Usaha mikro dan kecil yang tidak termasuk wajib UKL-UPL</li>
                <li>Kegiatan usaha yang dampak lingkungannya dapat dikelola dengan standar prosedur</li>
                <li>Usaha yang berlokasi di luar kawasan yang dilindungi</li>
                <li>Kegiatan usaha yang tidak menghasilkan limbah B3</li>
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
                  Persyaratan Dokumen
                </h3>
                <ul className="list-disc pl-6 space-y-3 text-gray-700 dark:text-gray-300">
                  <li>Formulir SPPL yang telah diisi lengkap</li>
                  <li>Fotokopi KTP penanggung jawab usaha</li>
                  <li>Profil usaha/kegiatan</li>
                  <li>Izin usaha atau surat keterangan usaha</li>
                  <li>Bukti kepemilikan/penguasaan lahan</li>
                  <li>Foto lokasi dan bangunan usaha</li>
                  <li>Denah lokasi dan layout usaha</li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
                  Tahapan Proses
                </h3>
                <ol className="list-decimal pl-6 space-y-3 text-gray-700 dark:text-gray-300">
                  <li>Mengisi formulir permohonan SPPL</li>
                  <li>Melengkapi dokumen persyaratan</li>
                  <li>Pemeriksaan kelengkapan administrasi</li>
                  <li>Verifikasi lokasi usaha (jika diperlukan)</li>
                  <li>Penerbitan SPPL</li>
                </ol>
                <div className="mt-6">
                  <h4 className="font-semibold mb-2 text-gray-800 dark:text-gray-100">
                    Waktu Penyelesaian:
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300">
                    3-5 hari kerja sejak berkas dinyatakan lengkap
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Format SPPL Section */}
        <section className="max-w-6xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">
            Format dan Isi SPPL
          </h2>
          <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
                  Komponen SPPL
                </h3>
                <ul className="list-disc pl-6 space-y-3 text-gray-700 dark:text-gray-300">
                  <li>Identitas penanggung jawab usaha</li>
                  <li>Informasi detail kegiatan usaha</li>
                  <li>Dampak lingkungan yang ditimbulkan</li>
                  <li>Program pengelolaan lingkungan</li>
                  <li>Program pemantauan lingkungan</li>
                  <li>Pernyataan kesanggupan</li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
                  Pernyataan Kesanggupan
                </h3>
                <ul className="list-disc pl-6 space-y-3 text-gray-700 dark:text-gray-300">
                  <li>Melakukan pengelolaan limbah</li>
                  <li>Menjaga kebersihan lingkungan</li>
                  <li>Melakukan pemantauan berkala</li>
                  <li>Membuat laporan secara periodik</li>
                  <li>Mematuhi peraturan lingkungan</li>
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
                  Lokasi Pelayanan
                </h3>
                <div className="space-y-2 text-gray-700 dark:text-gray-300">
                  <p>Bidang Tata Lingkungan</p>
                  <p>Dinas Lingkungan Hidup Kota Tasikmalaya</p>
                  <p>Jl. Lingkungan Hidup No. 123</p>
                  <p>Kota Tasikmalaya, Jawa Barat 46111</p>
                  <p className="mt-4">Jam Layanan:</p>
                  <p>Senin-Jumat: 08.00-16.00 WIB</p>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
                  Kontak Informasi
                </h3>
                <div className="space-y-2 text-gray-700 dark:text-gray-300">
                  <p>Email: sppl@dhl-tasikmalaya.go.id</p>
                  <p>Telepon: (0265) 123456</p>
                  <p>WhatsApp: 0812-3456-7890</p>
                  <p>Website: www.dhl-tasikmalaya.go.id</p>
                  <p className="mt-4">Biaya:</p>
                  <p className="font-semibold">GRATIS / Rp 0,-</p>
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

export default PelayananSpplPage;