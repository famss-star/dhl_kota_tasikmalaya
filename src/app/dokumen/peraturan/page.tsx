"use client";

import React from "react";
import Link from "next/link";

const DokumenPeraturanPage = () => {
  const peraturanList = [
    {
      kategori: "Undang-Undang",
      items: [
        {
          judul: "UU No. 32 Tahun 2009",
          deskripsi: "Tentang Perlindungan dan Pengelolaan Lingkungan Hidup",
          link: "#",
          tahun: "2009"
        },
        {
          judul: "UU No. 18 Tahun 2008",
          deskripsi: "Tentang Pengelolaan Sampah",
          link: "#",
          tahun: "2008"
        }
      ]
    },
    {
      kategori: "Peraturan Pemerintah",
      items: [
        {
          judul: "PP No. 22 Tahun 2021",
          deskripsi: "Tentang Penyelenggaraan Perlindungan dan Pengelolaan Lingkungan Hidup",
          link: "#",
          tahun: "2021"
        },
        {
          judul: "PP No. 81 Tahun 2012",
          deskripsi: "Tentang Pengelolaan Sampah Rumah Tangga dan Sampah Sejenis Sampah Rumah Tangga",
          link: "#",
          tahun: "2012"
        }
      ]
    },
    {
      kategori: "Peraturan Daerah",
      items: [
        {
          judul: "Perda Kota Tasikmalaya No. 4 Tahun 2020",
          deskripsi: "Tentang Pengelolaan Sampah",
          link: "#",
          tahun: "2020"
        },
        {
          judul: "Perda Kota Tasikmalaya No. 7 Tahun 2019",
          deskripsi: "Tentang Perlindungan dan Pengelolaan Lingkungan Hidup",
          link: "#",
          tahun: "2019"
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-800 to-indigo-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Dokumen Peraturan
            </h1>
            <p className="text-lg opacity-90 max-w-3xl mx-auto">
              Kumpulan peraturan perundang-undangan terkait lingkungan hidup dari tingkat 
              nasional hingga daerah
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Search Section */}
        <section className="max-w-6xl mx-auto mb-12">
          <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                placeholder="Cari peraturan..."
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Cari
              </button>
            </div>
          </div>
        </section>

        {/* Peraturan List Section */}
        {peraturanList.map((kategori, index) => (
          <section key={index} className="max-w-6xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
              {kategori.kategori}
            </h2>
            <div className="grid gap-6">
              {kategori.items.map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-6 hover:shadow-2xl transition-shadow"
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                        {item.judul}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-2">
                        {item.deskripsi}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Tahun: {item.tahun}
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <Link
                        href={item.link}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                      >
                        Unduh PDF
                      </Link>
                      <Link
                        href={`/dokumen/peraturan/detail/${item.judul.toLowerCase().replace(/ /g, "-")}`}
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

        {/* Informasi Section */}
        <section className="max-w-6xl mx-auto">
          <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
              Informasi Tambahan
            </h2>
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Dokumen peraturan di atas merupakan rujukan utama dalam pengelolaan 
                lingkungan hidup di Kota Tasikmalaya. Untuk informasi lebih lanjut atau 
                konsultasi terkait peraturan, silakan hubungi:
              </p>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">
                    Kontak
                  </h3>
                  <div className="space-y-2 text-gray-700 dark:text-gray-300">
                    <p>Bidang Tata Lingkungan</p>
                    <p>Email: regulasi@dhl-tasikmalaya.go.id</p>
                    <p>Telepon: (0265) 123456 ext. 789</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">
                    Jam Layanan
                  </h3>
                  <div className="space-y-2 text-gray-700 dark:text-gray-300">
                    <p>Senin - Jumat</p>
                    <p>08.00 - 16.00 WIB</p>
                    <p>Kecuali hari libur nasional</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DokumenPeraturanPage;
