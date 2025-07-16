"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const BeritaPage = () => {
  const [activeCategory, setActiveCategory] = useState("Semua");
  
  const categories = [
    "Semua",
    "Lingkungan",
    "Program",
    "Kegiatan",
    "Pengumuman"
  ];

  const beritaList = [
    {
      id: 1,
      title: "Program Pengurangan Sampah Plastik Berhasil Turunkan 30% Sampah di TPA",
      category: "Program",
      date: "2025-07-15",
      image: "/images/news/sampah-plastik.jpg",
      excerpt: "Program inovatif pengurangan sampah plastik yang diinisiasi DLH Kota Tasikmalaya menunjukkan hasil positif dengan penurunan volume sampah plastik sebesar 30% di TPA...",
      author: "Tim Redaksi DLH"
    },
    {
      id: 2,
      title: "DLH Gelar Pelatihan Pengelolaan Bank Sampah untuk Karang Taruna",
      category: "Kegiatan",
      date: "2025-07-14",
      image: "/images/news/bank-sampah.jpg",
      excerpt: "Sebagai upaya pemberdayaan masyarakat dalam pengelolaan sampah, DLH mengadakan pelatihan pengelolaan bank sampah yang diikuti oleh 50 karang taruna...",
      author: "Tim Redaksi DLH"
    },
    {
      id: 3,
      title: "Kualitas Udara Kota Tasikmalaya Membaik Selama Pandemi",
      category: "Lingkungan",
      date: "2025-07-13",
      image: "/images/news/kualitas-udara.jpg",
      excerpt: "Hasil pemantauan kualitas udara menunjukkan peningkatan signifikan selama masa pandemi. Parameter PM2.5 dan CO mengalami penurunan hingga 40%...",
      author: "Tim Redaksi DLH"
    },
    {
      id: 4,
      title: "Pengumuman: Jadwal Pengambilan Sampah Selama Libur Lebaran",
      category: "Pengumuman",
      date: "2025-07-12",
      image: "/images/news/jadwal-sampah.jpg",
      excerpt: "Masyarakat dimohon memperhatikan perubahan jadwal pengambilan sampah selama libur Lebaran. Berikut adalah jadwal lengkap pengambilan sampah...",
      author: "Tim Redaksi DLH"
    },
    {
      id: 5,
      title: "DLH Resmikan IPAL Komunal di 5 Kelurahan",
      category: "Program",
      date: "2025-07-11",
      image: "/images/news/ipal-komunal.jpg",
      excerpt: "Dalam upaya meningkatkan kualitas air limbah domestik, DLH meresmikan 5 unit IPAL Komunal yang tersebar di berbagai kelurahan...",
      author: "Tim Redaksi DLH"
    },
    {
      id: 6,
      title: "Lomba Kampung Hijau 2025 Resmi Dibuka",
      category: "Kegiatan",
      date: "2025-07-10",
      image: "/images/news/kampung-hijau.jpg",
      excerpt: "Program tahunan Lomba Kampung Hijau 2025 resmi dibuka. Tahun ini mengusung tema 'Kampungku Hijau, Kotaku Lestari' dengan total hadiah 100 juta rupiah...",
      author: "Tim Redaksi DLH"
    }
  ];

  const filteredBerita = activeCategory === "Semua" 
    ? beritaList 
    : beritaList.filter(berita => berita.category === activeCategory);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Berita & Informasi
            </h1>
            <p className="text-lg opacity-90 max-w-3xl mx-auto">
              Informasi terkini seputar lingkungan hidup dan kegiatan 
              Dinas Lingkungan Hidup Kota Tasikmalaya
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Category Filter */}
        <div className="max-w-6xl mx-auto mb-8">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors
                  ${activeCategory === category
                    ? "bg-blue-600 text-white"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700"
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* News Grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBerita.map((berita) => (
            <article
              key={berita.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden hover:shadow-2xl transition-shadow"
            >
              <div className="relative h-48">
                <Image
                  src={berita.image}
                  alt={berita.title}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-blue-600 text-white text-sm rounded-full">
                    {berita.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                  <span>{new Date(berita.date).toLocaleDateString()}</span>
                  <span className="mx-2">•</span>
                  <span>{berita.author}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                  {berita.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {berita.excerpt}
                </p>
                <Link
                  href={`/informasi/berita/${berita.id}`}
                  className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Baca selengkapnya
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Pagination */}
        <div className="max-w-6xl mx-auto mt-12 flex justify-center">
          <nav className="flex items-center gap-2">
            <button className="p-2 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="flex gap-1">
              {[1, 2, 3].map((page) => (
                <button
                  key={page}
                  className={`w-10 h-10 rounded-lg text-sm font-medium
                    ${page === 1
                      ? "bg-blue-600 text-white"
                      : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                >
                  {page}
                </button>
              ))}
            </div>
            <button className="p-2 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default BeritaPage;
