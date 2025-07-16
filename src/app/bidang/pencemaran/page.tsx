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
        {/* Tugas dan Fungsi Section */}
        <section className="max-w-6xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">
            Tugas dan Fungsi
          </h2>
          <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8">
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Tugas Pokok</h3>
              <ul className="list-disc pl-6 space-y-3 text-gray-700 dark:text-gray-300">
                <li>Melaksanakan pemantauan kualitas lingkungan</li>
                <li>Mengendalikan pencemaran air, udara, dan tanah</li>
                <li>Melakukan pengawasan pembuangan limbah industri</li>
                <li>Mengevaluasi dampak kerusakan lingkungan</li>
                <li>Melaksanakan pencegahan dan penanggulangan pencemaran</li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Fungsi</h3>
              <ul className="list-disc pl-6 space-y-3 text-gray-700 dark:text-gray-300">
                <li>Perumusan kebijakan teknis pengendalian pencemaran lingkungan</li>
                <li>Pelaksanaan pemantauan kualitas air, udara, dan tanah</li>
                <li>Pengelolaan pengaduan masyarakat terkait pencemaran</li>
                <li>Pemberian rekomendasi teknis izin pembuangan limbah</li>
                <li>Koordinasi penanganan kasus pencemaran lingkungan</li>
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
                <li>Monitoring kualitas air sungai secara berkala</li>
                <li>Pengawasan pembuangan limbah industri</li>
                <li>Penanganan pengaduan pencemaran lingkungan</li>
                <li>Sosialisasi pengelolaan limbah industri</li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8">
              <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
                Program Jangka Panjang
              </h3>
              <ul className="list-disc pl-6 space-y-3 text-gray-700 dark:text-gray-300">
                <li>Pengembangan sistem pemantauan pencemaran terintegrasi</li>
                <li>Pembangunan laboratorium lingkungan standar nasional</li>
                <li>Rehabilitasi kawasan tercemar dan rusak</li>
                <li>Penguatan sistem pengawasan industri</li>
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
                  Pengaduan Pencemaran
                </h3>
                <div className="space-y-3 text-gray-700 dark:text-gray-300">
                  <p>Masyarakat dapat melaporkan kasus pencemaran lingkungan melalui:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Pelaporan langsung ke kantor DLH</li>
                    <li>Hotline Pengaduan: (0265) 123-456</li>
                    <li>Email: pengaduan@dhl-tasikmalaya.go.id</li>
                    <li>Aplikasi mobile DLH Tasik</li>
                  </ul>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
                  Rekomendasi Teknis
                </h3>
                <div className="space-y-3 text-gray-700 dark:text-gray-300">
                  <p>Layanan yang disediakan:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Rekomendasi izin pembuangan limbah cair</li>
                    <li>Evaluasi dokumen pengelolaan limbah</li>
                    <li>Konsultasi teknis pengelolaan limbah</li>
                    <li>Pemantauan kualitas lingkungan</li>
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

export default BidangPencemaranPage;
