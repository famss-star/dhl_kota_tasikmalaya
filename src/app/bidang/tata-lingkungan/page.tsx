"use client";

import React from "react";

const BidangTataLingkunganPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Bidang Tata Lingkungan
            </h1>
            <p className="text-lg opacity-90 max-w-3xl mx-auto">
              Mewujudkan tata kelola lingkungan yang berkelanjutan melalui perencanaan, 
              pengawasan, dan pengendalian lingkungan di Kota Tasikmalaya
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <section className="max-w-6xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
            Bidang Tata Lingkungan
          </h2>
          <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8">
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 mb-6 indent-8">
                Bidang Tata Lingkungan mempunyai tugas pokok menyelenggarakan perumusan kebijakan teknis dan pengoordinasian penyelenggaraan kebijakan perencanaan lingkungan hidup, pengelolaan keanekaragaman hayati dan pengelolaan ruang terbuka hijau (RTH).
              </p>
              
              <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Rincian tugas Bidang Tata Lingkungan:</h3>
              <ul className="list-decimal pl-6 space-y-3 text-gray-700 dark:text-gray-300">
                <li>Menyelenggarakan penyusunan rencana program kerja dan target kinerja Bidang Tata Lingkungan sesuai perjanjian kinerja</li>
                <li>Melaksanakan perumusan strategi pelaksanaan pencapaian target kinerja termasuk di dalamnya pembentukan tim kerja dan pelibatan jabatan-jabatan yang diperlukan dalam pencapaian target kinerja</li>
                <li>Menyelenggarakan perumusan kebijakan teknis di bidang perencanaan lingkungan hidup, pengelolaan keanekaragaman hayati dan pengelolaan ruang terbuka hijau (RTH)</li>
                <li>Menyelenggarakan penyusunan dan penetapan Rencana Perlindungan dan Pengelolaan Lingkungan Hidup (RPPLH) serta dokumen daya dukung dan daya tampung</li>
                <li>Menyelenggarakan penyusunan Kajian Lingkungan Hidup Strategis (KLHS) meliputi KLHS Rencana Tata Ruang Wilayah, KLHS Rencana Detail Tata Ruang (RDTR), KLHS Rencana Pembangunan Jangka Panjang Daerah dan Rencana Pembangunan Jangka Menengah Daerah serta KLHS untuk Kebijakan, Rencana dan Program (KRP) yang berpotensi menimbulkan dampak/resiko lingkungan hidup</li>
                <li>Mengoordinasikan pelaksanaaan pemeriksaan formulir Upaya Pengelolaan Lingkungan-Upaya Pemantauan Lingkungan (UKL-UPL)</li>
                <li>Menyelenggarakan fasilitasi penilaian dokumen Analisis Mengenai Dampak Lingkungan (AMDAL)</li>
                <li>Menyelenggarakan pelayanan penerbitan persetujuan lingkungan</li>
                <li>Menyelenggarakan penyusunan Dokumen Informasi Kinerja Pengelolaan Lingkungan Hidup Daerah (DIKPLHD)</li>
                <li>Menyelenggarakan pengelolaan keanekaragaman hayati</li>
                <li>Menyelenggarakan pengelolaan ruang terbuka hijau yang meliputi pertamanan, pemakaman dan bukit resapan air yang menjadi kewenangan pemerintah</li>
                <li>Menyelenggarakan pengelolaan sarana dan prasarana keanekaragaman hayati dan ruang terbuka hijau</li>
                <li>Menyelenggarakan pengendalian pelaksanaan RPPLH</li>
                <li>Menyelenggarakan kerjasama dan pengembangan kapasitas kelembagaan serta sumber daya manusia dalam pengelolaan keanekaragaman hayati</li>
                <li>Melaksanakan pemantauan, evaluasi dan laporan yang berkaitan dengan tugas Bidang Tata Lingkungan</li>
                <li>Melaksanakan pembinaan kinerja jabatan fungsional dan jabatan pelaksana yang ditempatkan di Bidang Tata Lingkungan</li>
                <li>Melaksanakan penyediaan sarana dan prasarana, tata kelola serta sumber daya dalam rangka pencapaian target kinerja oleh jabatan fungsional dan jabatan pelaksana yang berada di bawahnya</li>
                <li>Melaksanakan koordinasi dengan Unit kerja terkait</li>
                <li>Melaksanakan tugas kedinasan lain sesuai dengan tugas dan fungsinya</li>
              </ul>
            </div>
          </div>
        </section>
        {/* Back to Bidang */}
        <section>
          <div className="text-center">
            <a href="/bidang" className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">Kembali ke Halaman Bidang Kerja</a>
          </div>
        </section>        
      </div>
    </div>
  );
};

export default BidangTataLingkunganPage;