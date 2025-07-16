"use client";

import React from "react";
import Link from "next/link";

const SopEmisiPage = () => {
  const sopCategories = [
    {
      title: "SOP Pengujian Emisi Kendaraan",
      items: [
        {
          name: "Persiapan Pengujian",
          description: "Langkah-langkah persiapan sebelum melakukan pengujian emisi kendaraan",
          documentLink: "#",
          lastUpdated: "2025-06-01"
        },
        {
          name: "Prosedur Pengukuran",
          description: "Tahapan pengukuran emisi gas buang kendaraan bermotor",
          documentLink: "#",
          lastUpdated: "2025-06-01"
        },
        {
          name: "Evaluasi Hasil",
          description: "Cara mengevaluasi dan menginterpretasi hasil pengujian emisi",
          documentLink: "#",
          lastUpdated: "2025-06-01"
        }
      ]
    },
    {
      title: "SOP Pengujian Emisi Industri",
      items: [
        {
          name: "Sampling Cerobong",
          description: "Prosedur pengambilan sampel emisi dari cerobong industri",
          documentLink: "#",
          lastUpdated: "2025-06-01"
        },
        {
          name: "Analisis Parameter",
          description: "Metode analisis parameter kualitas udara emisi industri",
          documentLink: "#",
          lastUpdated: "2025-06-01"
        },
        {
          name: "Pelaporan Data",
          description: "Format dan prosedur pelaporan hasil pengujian emisi industri",
          documentLink: "#",
          lastUpdated: "2025-06-01"
        }
      ]
    },
    {
      title: "SOP Pemantauan Kualitas Udara Ambien",
      items: [
        {
          name: "Pengoperasian Alat",
          description: "Panduan pengoperasian alat pemantau kualitas udara",
          documentLink: "#",
          lastUpdated: "2025-06-01"
        },
        {
          name: "Kalibrasi Peralatan",
          description: "Prosedur kalibrasi alat pengukur kualitas udara",
          documentLink: "#",
          lastUpdated: "2025-06-01"
        },
        {
          name: "Pengolahan Data",
          description: "Metode pengolahan dan analisis data kualitas udara",
          documentLink: "#",
          lastUpdated: "2025-06-01"
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              SOP Pengujian Emisi
            </h1>
            <p className="text-lg opacity-90 max-w-3xl mx-auto">
              Standar Operasional Prosedur untuk pengujian dan pemantauan emisi 
              kendaraan, industri, dan kualitas udara ambien
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Pengantar Section */}
        <section className="max-w-6xl mx-auto mb-12">
          <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              Tentang SOP Pengujian Emisi
            </h2>
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300">
                Dokumen SOP ini menyediakan panduan komprehensif untuk melakukan 
                pengujian emisi, baik untuk kendaraan bermotor maupun industri, 
                serta pemantauan kualitas udara ambien. Prosedur ini disusun 
                berdasarkan standar nasional dan internasional untuk memastikan 
                akurasi dan konsistensi dalam pengujian.
              </p>
            </div>
          </div>
        </section>

        {/* SOP Categories */}
        {sopCategories.map((category, index) => (
          <section key={index} className="max-w-6xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
              {category.title}
            </h2>
            <div className="grid gap-6">
              {category.items.map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-6 hover:shadow-2xl transition-shadow"
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                        {item.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-2">
                        {item.description}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Terakhir diperbarui: {new Date(item.lastUpdated).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <Link
                        href={item.documentLink}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                      >
                        Unduh PDF
                      </Link>
                      <Link
                        href={`/dokumen/sop-emisi/detail/${item.name.toLowerCase().replace(/ /g, "-")}`}
                        className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm"
                      >
                        Lihat Detail
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* Informasi Tambahan */}
        <section className="max-w-6xl mx-auto">
          <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
              Informasi Tambahan
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
                  Standar dan Regulasi
                </h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                  <li>Peraturan Menteri LHK tentang Baku Mutu Emisi</li>
                  <li>SNI ISO/IEC 17025 tentang Laboratorium Pengujian</li>
                  <li>Standar Metode Pengujian EPA</li>
                  <li>Peraturan Daerah tentang Pengendalian Pencemaran Udara</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
                  Kontak Laboratorium
                </h3>
                <div className="space-y-2 text-gray-700 dark:text-gray-300">
                  <p>Email: lab.udara@dhl-tasikmalaya.go.id</p>
                  <p>Telepon: (0265) 123456 ext. 456</p>
                  <p>WhatsApp: 0812-3456-7890</p>
                  <p>Jam Layanan: 08.00 - 16.00 WIB</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SopEmisiPage;
