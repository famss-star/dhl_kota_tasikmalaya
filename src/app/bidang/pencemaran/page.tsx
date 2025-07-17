"use client";

import React from "react";

const BidangPencemaranPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-600 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Bidang Pencemaran dan Kerusakan Lingkungan
            </h1>
            <p className="text-lg opacity-90 max-w-3xl mx-auto">
              Melaksanakan pengendalian pencemaran dan kerusakan lingkungan untuk 
              mewujudkan kualitas lingkungan hidup yang lebih baik di Kota Tasikmalaya
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <section className="max-w-6xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
            Bidang Pencemaran dan Kerusakan Lingkungan
          </h2>
          <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8">
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 mb-6 indent-8">
                Bidang Pengendalian Pencemaran dan Penaatan Lingkungan Hidup mempunyai tugas pokok menyelenggarakan perumusan kebijakan teknis serta penyelenggaraan kebijakan di bidang pengendalian pencemaran dan/atau kerusakan lingkungan hidup serta pengawasan dan penyelesaian pengaduan masyarakat dalam bidang perlindungan dan pengelolaan lingkungan hidup.
              </p>
              
              <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Rincian tugas Bidang Tata Lingkungan:</h3>
              <ul className="list-decimal pl-6 space-y-3 text-gray-700 dark:text-gray-300">
                <li>Bidang Pengendalian Pencemaran dan Penaatan Lingkungan Hidup mempunyai tugas pokok menyelenggarakan perumusan kebijakan teknis serta penyelenggaraan kebijakan di bidang pengendalian pencemaran dan/atau kerusakan lingkungan hidup serta pengawasan dan penyelesaian pengaduan masyarakat dalam bidang perlindungan dan pengelolaan lingkungan hidup.</li>
                <li>Rincian tugas Bidang Pengendalian Pencemaran dan Penaatan Lingkungan Hidup, sebagai berikut :</li>
                <li>Menyelenggarakan penyusunan rencana program kerja dan target kinerja Bidang Pengendalian Pencemaran dan Penataan Lingkungan Hidup sesuai perjanjian kinerja;</li>
                <li>Melaksanakan perumusan strategi pelaksanaan pencapaian target kinerja termasuk di dalamnya pembentukan tim kerja dan pelibatan jabatanjabatan yang diperlukan dalam pencapaian target kinerja;</li>
                <li>Menyelenggarakan perumusan bahan kebijakan dan petunjuk teknis pengendalian pencemaran lingkungan yang meliputi pencegahan pencemaran dan/atau kerusakan lingkungan hidup, penanggulangan pencemaran dan/atau kerusakan lingkungan hidup dan pemulihan pencemaran dan/atau kerusakan lingkungan hidup;</li>
                <li>Menyelenggarakan perumusan bahan kebijakan dan petunjuk teknis penaatan hukum lingkungan yang meliputi pembinaan dan pengawasan terhadap usaha dan/atau kegiatan penyelesaian pengaduan masyarakat di bidang perlindungan dan pengelolaan lingkungan hidup;</li>
                <li>Mengoordinasikan penyelenggaraan pengendalian pencemaran dan/atau kerusakan lingkungan hidup;</li>
                <li>Mengoordinasikan penyelenggaraan penanggulangan dan pemulihan pencemaran dan/atau kerusakan lingkungan hidup;</li>
                <li>Menyelenggarakan pembinaan dan pengawasan terhadap usaha dan/atau kegiatan yang berkaitan dengan penaatan perlindungan dan pengelolaan lingkungan hidup;</li>
                <li>Mengoordinasikan penanganan pengaduan masyarakat di bidang perlindungan dan pengelolaan lingkungan hidup serta penerapan sanksi administrasi, penyelesaian sengketa dan/atau penyidikan lingkungan hidup di luar pengadilan atau melalui pengadilan; i</li>
                <li>Menyelenggarakan pengelolaan laboratorium lingkungan hidup;</li>
                <li>Melaksanakan pemantauan, evaluasi dan laporan yang berkaitan dengan tugas Bidang Pengendalian Pencemaran dan Penaatan Lingkungan Hidup;</li>
                <li>Melaksanakan pembinaan kinerja jabatan fungsional dan jabatan pelaksana yang ditempatkan di Bidang Pengendalian Pencemaran dan Penaatan Lingkungan Hidup; l</li>
                <li>Melaksanakan penyediaan sarana dan prasarana, tata kelola serta sumber daya dalam rangka pencapaian target kinerja oleh jabatan fungsional dan jabatan pelaksana yang berada di bawahnya;</li>
                <li>Melaksanakan koordinasi dengan unit kerja terkait; dan</li>
                <li>Melaksanakan tugas kedinasan lain sesuai dengan tugas dan fungsinya.</li>
              </ul>
            </div>
          </div>
        </section>
        {/* Back to Bidang */}
        <section>
          <div className="text-center">
            <a href="/bidang" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">Kembali ke Halaman Bidang Kerja</a>
          </div>
        </section>   
      </div>
    </div>
  );
};

export default BidangPencemaranPage;
