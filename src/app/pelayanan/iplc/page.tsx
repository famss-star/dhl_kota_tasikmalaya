"use client";

import React from "react";

const PelayananIplcPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center min-h-[120px] flex flex-col justify-center">
            <div className="flex flex-col items-center justify-center mb-4">
              <h1 className="text-3xl md:text-5xl font-bold text-center leading-tight">
                Pelayanan IPLC
              </h1>
            </div>
            <p className="text-lg opacity-90 max-w-3xl mx-auto">
              Izin Pembuangan Limbah Cair untuk pengelolaan limbah yang 
              bertanggung jawab dan ramah lingkungan
            </p>
          </div>
        </div>
      </section>      

      <div className="container mx-auto px-4 py-12">
        
        {/* Perizinan pembuangan air limbah cair Section */}
        <section className="max-w-6xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">
            Perizinan pembuangan air limbah cair
          </h2>
          <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8">
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 mb-6 indent-8">
                <span className="font-bold">Perizinan pembuangan air limbah cair</span> merupakan Upaya pembatasan beban limbah cair yang dibuang ke perairan umum/sumber air. Tujuannya adalah agar air yang ada pada sumber air tidak tercemar dan dapat dimanfaatkan secara berkelanjutan untuk memenuhi bebagai kebutuhan sesuai dengan peruntukannya.
              </p>
            </div>
          </div>
        </section>

        {/* Dasar Hukum Section */}
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
            Tentang IPLC
          </h2>
          <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8">
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                Izin Pembuangan Limbah Cair (IPLC) adalah izin yang diberikan kepada 
                perusahaan atau kegiatan usaha untuk melakukan pembuangan limbah cair 
                ke lingkungan dengan standar baku mutu yang telah ditetapkan.
              </p>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
                Dasar Hukum
              </h3>
              <ul className="list-disc pl-6 space-y-3 text-gray-700 dark:text-gray-300">
                <li>Peraturan Pemerintah No. 82 Tahun 2001 tentang Pengelolaan Kualitas Air dan Pengendalian Pencemaran Air</li>
                <li>Peraturan Daerah Kota Tasikmalaya tentang Pengelolaan Limbah Cair</li>
                <li>Peraturan Walikota tentang Petunjuk Pelaksanaan Pengelolaan Limbah</li>
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
                  <li>Formulir permohonan IPLC</li>
                  <li>Dokumen lingkungan yang telah disetujui</li>
                  <li>Data karakteristik limbah cair</li>
                  <li>Diagram alir proses pengolahan limbah</li>
                  <li>Izin usaha atau kegiatan yang sah</li>
                  <li>Hasil uji laboratorium kualitas air limbah</li>
                  <li>Dokumen SOP pengolahan limbah</li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
                  Alur Proses
                </h3>
                <ol className="list-decimal pl-6 space-y-3 text-gray-700 dark:text-gray-300">
                  <li>Pengajuan berkas permohonan</li>
                  <li>Verifikasi kelengkapan administrasi</li>
                  <li>Pemeriksaan teknis dan observasi lapangan</li>
                  <li>Evaluasi hasil uji laboratorium</li>
                  <li>Penilaian kelayakan teknis</li>
                  <li>Penerbitan izin IPLC</li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* Standar dan Ketentuan Section */}
        <section className="max-w-6xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">
            Standar dan Ketentuan
          </h2>
          <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
                  Parameter Teknis
                </h3>
                <div className="space-y-3 text-gray-700 dark:text-gray-300">
                  <p>Standar baku mutu yang harus dipenuhi:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>pH: 6,0 - 9,0</li>
                    <li>BOD₅: maksimal 50 mg/L</li>
                    <li>COD: maksimal 100 mg/L</li>
                    <li>TSS: maksimal 200 mg/L</li>
                    <li>Minyak dan lemak: maksimal 10 mg/L</li>
                  </ul>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
                  Kewajiban Pemegang Izin
                </h3>
                <ul className="list-disc pl-6 space-y-3 text-gray-700 dark:text-gray-300">
                  <li>Melakukan pengujian kualitas air limbah secara berkala</li>
                  <li>Menyampaikan laporan hasil pemantauan</li>
                  <li>Memelihara instalasi pengolahan air limbah</li>
                  <li>Memiliki logbook pengolahan limbah</li>
                  <li>Memasang alat ukur debit limbah</li>
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
                    <li>Biaya administrasi: Rp 500.000</li>
                    <li>Biaya verifikasi teknis: Rp 2.500.000</li>
                    <li>Biaya pengujian lab: Sesuai parameter</li>
                  </ul>
                  <p className="font-semibold mt-4">Waktu Penyelesaian:</p>
                  <p>14 hari kerja (bila dokumen lengkap)</p>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
                  Kontak dan Lokasi
                </h3>
                <div className="space-y-2 text-gray-700 dark:text-gray-300">
                  <p>Bidang Pencemaran DLH Kota Tasikmalaya</p>
                  <p>Gedung Pelayanan Terpadu Lt. 2</p>
                  <p>Jl. Lingkungan Hidup No. 123</p>
                  <p>Email: iplc@dhl-tasikmalaya.go.id</p>
                  <p>Telepon: (0265) 123456 ext. 789</p>
                  <p>Jam Layanan: Senin-Jumat, 08.00-16.00 WIB</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* u can delete to here */}

        {/* Back to Profile */}
        <section>
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

export default PelayananIplcPage;