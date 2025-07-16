"use client";

import React from "react";
import Link from "next/link";

const PanduanUMKPage = () => {
  const panduanCategories = [
    {
      title: "Dasar-dasar UMK",
      items: [
        {
          name: "Pengertian UMK",
          description: "Penjelasan mengenai konsep dasar Upaya Manajemen Keselamatan",
          link: "#pengertian-umk"
        },
        {
          name: "Tujuan dan Manfaat",
          description: "Tujuan penerapan UMK dan manfaatnya bagi lingkungan",
          link: "#tujuan-manfaat"
        },
        {
          name: "Landasan Hukum",
          description: "Peraturan dan regulasi terkait UMK",
          link: "#landasan-hukum"
        }
      ]
    },
    {
      title: "Implementasi UMK",
      items: [
        {
          name: "Identifikasi Risiko",
          description: "Cara mengidentifikasi potensi bahaya lingkungan",
          link: "#identifikasi-risiko"
        },
        {
          name: "Penilaian Dampak",
          description: "Metode penilaian dampak lingkungan",
          link: "#penilaian-dampak"
        },
        {
          name: "Rencana Pengendalian",
          description: "Penyusunan rencana pengendalian dampak lingkungan",
          link: "#rencana-pengendalian"
        }
      ]
    },
    {
      title: "Monitoring dan Evaluasi",
      items: [
        {
          name: "Program Pemantauan",
          description: "Panduan pemantauan implementasi UMK",
          link: "#program-pemantauan"
        },
        {
          name: "Evaluasi Kinerja",
          description: "Metode evaluasi efektivitas UMK",
          link: "#evaluasi-kinerja"
        },
        {
          name: "Pelaporan",
          description: "Format dan prosedur pelaporan UMK",
          link: "#pelaporan"
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Panduan UMK
            </h1>
            <p className="text-lg opacity-90 max-w-3xl mx-auto">
              Pedoman lengkap untuk memahami dan menerapkan Upaya Manajemen 
              Keselamatan dalam pengelolaan lingkungan hidup
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Overview Section */}
        <section className="max-w-6xl mx-auto mb-12">
          <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              Tentang Panduan UMK
            </h2>
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300">
                Panduan UMK ini disusun untuk membantu pemahaman dan implementasi 
                Upaya Manajemen Keselamatan dalam pengelolaan lingkungan hidup. 
                Dokumen ini mencakup aspek-aspek penting mulai dari konsep dasar, 
                implementasi, hingga monitoring dan evaluasi pelaksanaan UMK.
              </p>
            </div>
          </div>
        </section>

        {/* Categories */}
        {panduanCategories.map((category, index) => (
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
                      <p className="text-gray-600 dark:text-gray-300">
                        {item.description}
                      </p>
                    </div>
                    <Link
                      href={item.link}
                      className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Baca Selengkapnya
                    </Link>
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
                  Unduh Dokumen Terkait
                </h3>
                <ul className="space-y-3">
                  <li>
                    <Link 
                      href="#"
                      className="flex items-center text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Template Dokumen UMK
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="#"
                      className="flex items-center text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Checklist Implementasi
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="#"
                      className="flex items-center text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Format Laporan UMK
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
                  Bantuan dan Konsultasi
                </h3>
                <div className="space-y-2 text-gray-700 dark:text-gray-300">
                  <p>Email: umk@dhl-tasikmalaya.go.id</p>
                  <p>Telepon: (0265) 123456 ext. 234</p>
                  <p>WhatsApp: 0812-3456-7890</p>
                  <p>Jam Konsultasi: Senin-Jumat, 09.00 - 15.00 WIB</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PanduanUMKPage;
