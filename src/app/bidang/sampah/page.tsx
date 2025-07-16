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
        {/* Tugas dan Fungsi Section */}
        <section className="max-w-6xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">
            Tugas dan Fungsi
          </h2>
          <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8">
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Tugas Pokok</h3>
              <ul className="list-disc pl-6 space-y-3 text-gray-700 dark:text-gray-300">
                <li>Pengelolaan dan pengangkutan sampah dari sumber ke TPA</li>
                <li>Pengembangan sistem pengelolaan sampah terpadu</li>
                <li>Pembinaan dan pengawasan pengelolaan sampah</li>
                <li>Pengelolaan TPA dan TPS</li>
                <li>Pelaksanaan program 3R (Reduce, Reuse, Recycle)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Fungsi</h3>
              <ul className="list-disc pl-6 space-y-3 text-gray-700 dark:text-gray-300">
                <li>Perumusan kebijakan teknis pengelolaan sampah</li>
                <li>Pelaksanaan operasional pengangkutan sampah</li>
                <li>Pengembangan sistem informasi pengelolaan sampah</li>
                <li>Pembinaan Bank Sampah dan pengomposan</li>
                <li>Koordinasi dengan stakeholder terkait pengelolaan sampah</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Program Kerja Section */}
        <section className="max-w-6xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">
            Program Kerja
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8">
              <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
                Program Jangka Pendek
              </h3>
              <ul className="list-disc pl-6 space-y-3 text-gray-700 dark:text-gray-300">
                <li>Optimalisasi pengangkutan sampah harian</li>
                <li>Pembentukan Bank Sampah di setiap kelurahan</li>
                <li>Peningkatan layanan pengangkutan sampah</li>
                <li>Sosialisasi pemilahan sampah dari sumber</li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8">
              <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
                Program Jangka Panjang
              </h3>
              <ul className="list-disc pl-6 space-y-3 text-gray-700 dark:text-gray-300">
                <li>Pengembangan TPA dengan sistem sanitary landfill</li>
                <li>Pembangunan fasilitas pengolahan sampah terpadu</li>
                <li>Modernisasi armada pengangkutan sampah</li>
                <li>Pengembangan sistem waste to energy</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Layanan Section */}
        <section className="max-w-6xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">
            Layanan
          </h2>
          <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
                  Pengangkutan Sampah
                </h3>
                <div className="space-y-3 text-gray-700 dark:text-gray-300">
                  <p>Layanan pengangkutan sampah rutin:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Pengangkutan sampah rumah tangga</li>
                    <li>Pengangkutan sampah komersial</li>
                    <li>Penanganan sampah khusus</li>
                    <li>Layanan kontainer sampah</li>
                  </ul>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
                  Bank Sampah
                </h3>
                <div className="space-y-3 text-gray-700 dark:text-gray-300">
                  <p>Program Bank Sampah meliputi:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Penimbangan dan pencatatan sampah</li>
                    <li>Penjualan sampah daur ulang</li>
                    <li>Pelatihan daur ulang sampah</li>
                    <li>Pembinaan nasabah Bank Sampah</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default BidangSampahPage;
