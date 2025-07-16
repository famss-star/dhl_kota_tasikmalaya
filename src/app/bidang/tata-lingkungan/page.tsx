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
        {/* Tugas dan Fungsi Section */}
        <section className="max-w-6xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">
            Tugas dan Fungsi
          </h2>
          <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8">
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Tugas Pokok</h3>
              <ul className="list-disc pl-6 space-y-3 text-gray-700 dark:text-gray-300">
                <li>Perencanaan dan pelaksanaan kajian dampak lingkungan</li>
                <li>Pengembangan sistem pengendalian pencemaran lingkungan</li>
                <li>Pemantauan kualitas lingkungan dan daya dukung alam</li>
                <li>Koordinasi pelaksanaan kebijakan lingkungan hidup</li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Fungsi</h3>
              <ul className="list-disc pl-6 space-y-3 text-gray-700 dark:text-gray-300">
                <li>Penyusunan kebijakan teknis bidang tata lingkungan</li>
                <li>Pelaksanaan inventarisasi data dan informasi sumber daya alam</li>
                <li>Penyusunan dokumen RPPLH dan KLHS</li>
                <li>Pelaksanaan pemantauan kualitas air, udara, dan tanah</li>
                <li>Pengembangan sistem informasi lingkungan hidup</li>
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
                <li>Pemantauan rutin kualitas lingkungan</li>
                <li>Evaluasi dokumen lingkungan hidup</li>
                <li>Pengembangan basis data lingkungan</li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8">
              <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
                Program Jangka Panjang
              </h3>
              <ul className="list-disc pl-6 space-y-3 text-gray-700 dark:text-gray-300">
                <li>Pengembangan sistem informasi lingkungan terintegrasi</li>
                <li>Peningkatan kapasitas laboratorium lingkungan</li>
                <li>Implementasi kebijakan pembangunan berkelanjutan</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Kontak Section */}
        <section className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">
            Kontak
          </h2>
          <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
                  Alamat Kantor
                </h3>
                <div className="space-y-2 text-gray-700 dark:text-gray-300">
                  <p>Jl. Lingkungan Hidup No. 123</p>
                  <p>Kota Tasikmalaya</p>
                  <p>Jawa Barat 46111</p>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
                  Informasi Kontak
                </h3>
                <div className="space-y-2 text-gray-700 dark:text-gray-300">
                  <p>Email: tatalingkungan@dhl-tasikmalaya.go.id</p>
                  <p>Telepon: (0265) 123456</p>
                  <p>Fax: (0265) 654321</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default BidangTataLingkunganPage;
