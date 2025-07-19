"use client";

import React from "react";

const BidangSampahPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-700 to-emerald-500 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Bidang Pengelolaan Sampah
            </h1>
            <p className="text-lg opacity-90 max-w-3xl mx-auto">
              Mewujudkan Kota Tasikmalaya yang bersih dan sehat melalui pengelolaan 
              sampah yang terpadu dan berkelanjutan
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <section className="max-w-6xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
            Bidang Pengelolaan Sampah
          </h2>
          <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8">
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 mb-6 indent-8">
                <span className="font-bold">Bidang Pengelolaan Sampah</span> mempunyai tugas pokok mengoordinasikan perumusan kebijakan dan penyelenggaraan kebijakan pengelolaan sampah dan kemitraan lingkungan hidup.
              </p>        
              <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Rincian tugas Bidang Tata Lingkungan:</h3>
              <ul className="list-decimal pl-6 space-y-3 text-gray-700 dark:text-gray-300">
                <li>Menyelenggarakan penyusunan rencana program kerja dan target kinerja Bidang Pengelolaan Sampah sesuai perjanjian kinerja;</li>
                <li>Melaksanakan perumusan strategi pelaksanaan pencapaian target kinerja termasuk di dalamnya pembentukan tim kerja dan pelibatan jabatanjabatan yang diperlukan dalam pencapaian target kinerja;</li>
                <li>Menyelenggarakan perumusan kebijakan teknis bidang pengelolaan sampah dan kemitraan lingkungan hidup;</li>
                <li>Mengoordinasikan perencanaan, penyediaan dan pemeliharaan sarana prasarana pengelolaan persampahan;</li>
                <li>Mengoordinasikan penyelenggaraan penanganan dan pengurangan sampah;</li>
                <li>Mengoordinasikan pelayanan retribusi pelayanan persampahan;</li>
                <li>Mengoordinasikan upaya pemberdayaan dan peningkatan peran serta masyarakat serta kerjasama dalam pengelolaan lingkungan hidup termasuk pengelolaan sampah;</li>
                <li>Menyelenggarakan pemberian penghargaan lingkungan hidup;</li>
                <li>Mengoordinasikan fasilitasi dan pengawasan pemenuhan ketentuan di Bidang Pengelolaan Sampah;</li>
                <li>Menyelenggarakan sosialisasi dan pembinaan pengembangan sumber daya manusia di bidang lingkungan hidup;</li>
                <li>Melaksanakan pemantauan, evaluasi dan laporan yang berkaitan dengan tugas Bidang Pengelolaan Sampah;</li>
                <li>Melaksanakan pembinaan kinerja jabatan fungsional dan jabatan pelaksana yang ditempatkan di Bidang Pengelolaan Sampah;</li>
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
            <a href="/bidang" className="inline-block bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">Kembali ke Halaman Bidang Kerja</a>
          </div>
        </section>         
      </div>
    </div>
  );
};

export default BidangSampahPage;