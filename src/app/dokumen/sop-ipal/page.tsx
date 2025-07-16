"use client";

import React from "react";
import Link from "next/link";

const SopIpalPage = () => {
  const sopCategories = [
    {
      title: "SOP Pengoperasian IPAL",
      items: [
        {
          name: "Prosedur Start-up IPAL",
          description: "Langkah-langkah memulai operasi IPAL dari kondisi mati",
          documentLink: "#",
          lastUpdated: "2025-06-01"
        },
        {
          name: "Prosedur Operasi Normal",
          description: "Panduan pengoperasian IPAL dalam kondisi normal",
          documentLink: "#",
          lastUpdated: "2025-06-01"
        },
        {
          name: "Prosedur Shutdown",
          description: "Langkah-langkah menghentikan operasi IPAL dengan aman",
          documentLink: "#",
          lastUpdated: "2025-06-01"
        }
      ]
    },
    {
      title: "SOP Pemeliharaan IPAL",
      items: [
        {
          name: "Pemeliharaan Harian",
          description: "Checklist dan prosedur pemeliharaan rutin harian",
          documentLink: "#",
          lastUpdated: "2025-06-01"
        },
        {
          name: "Pemeliharaan Mingguan",
          description: "Jadwal dan prosedur pemeliharaan mingguan",
          documentLink: "#",
          lastUpdated: "2025-06-01"
        },
        {
          name: "Pemeliharaan Bulanan",
          description: "Program pemeliharaan preventif bulanan",
          documentLink: "#",
          lastUpdated: "2025-06-01"
        }
      ]
    },
    {
      title: "SOP Monitoring dan Pengujian",
      items: [
        {
          name: "Pengambilan Sampel",
          description: "Prosedur pengambilan sampel air limbah",
          documentLink: "#",
          lastUpdated: "2025-06-01"
        },
        {
          name: "Pengujian Parameter",
          description: "Metode pengujian parameter kualitas air limbah",
          documentLink: "#",
          lastUpdated: "2025-06-01"
        },
        {
          name: "Pelaporan Hasil",
          description: "Format dan prosedur pelaporan hasil pengujian",
          documentLink: "#",
          lastUpdated: "2025-06-01"
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-teal-600 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              SOP IPAL
            </h1>
            <p className="text-lg opacity-90 max-w-3xl mx-auto">
              Standar Operasional Prosedur Instalasi Pengolahan Air Limbah untuk 
              pengelolaan limbah yang efektif dan aman
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Pengantar Section */}
        <section className="max-w-6xl mx-auto mb-12">
          <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              Tentang SOP IPAL
            </h2>
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300">
                Dokumen SOP IPAL ini berisi panduan lengkap mengenai pengoperasian, 
                pemeliharaan, dan monitoring Instalasi Pengolahan Air Limbah. SOP ini 
                disusun untuk memastikan pengelolaan air limbah yang efektif dan 
                memenuhi standar baku mutu yang ditetapkan.
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
                        className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm"
                      >
                        Unduh PDF
                      </Link>
                      <Link
                        href={`/dokumen/sop-ipal/detail/${item.name.toLowerCase().replace(/ /g, "-")}`}
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
                  Panduan Penggunaan
                </h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                  <li>Download dokumen SOP dalam format PDF</li>
                  <li>Pastikan memiliki software pembaca PDF</li>
                  <li>Ikuti prosedur sesuai urutan yang tertera</li>
                  <li>Catat setiap pelaksanaan prosedur di logbook</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
                  Kontak Bantuan
                </h3>
                <div className="space-y-2 text-gray-700 dark:text-gray-300">
                  <p>Email: ipal@dhl-tasikmalaya.go.id</p>
                  <p>Telepon: (0265) 123456 ext. 789</p>
                  <p>WhatsApp: 0812-3456-7890</p>
                  <p>Jam Operasional: 08.00 - 16.00 WIB</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SopIpalPage;
