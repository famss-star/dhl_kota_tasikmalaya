"use client";

import React, { useState } from "react";
import Image from "next/image";

interface Photo {
  id: number;
  title: string;
  category: string;
  date: string;
  image: string;
  description: string;
}

const PhotoGalleryPage = () => {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const categories = [
    "Semua",
    "Kegiatan",
    "Event",
    "Dokumentasi",
    "Fasilitas"
  ];

  const photos: Photo[] = [
    {
      id: 1,
      title: "Penanaman Pohon di Taman Kota",
      category: "Kegiatan",
      date: "2025-07-15",
      image: "/images/gallery/penanaman-pohon.jpg",
      description: "Kegiatan penanaman 1000 pohon dalam rangka penghijauan kota"
    },
    {
      id: 2,
      title: "Bank Sampah Berseri",
      category: "Fasilitas",
      date: "2025-07-14",
      image: "/images/gallery/bank-sampah.jpg",
      description: "Fasilitas bank sampah yang dikelola masyarakat"
    },
    {
      id: 3,
      title: "Sosialisasi 3R di Sekolah",
      category: "Event",
      date: "2025-07-13",
      image: "/images/gallery/sosialisasi-3r.jpg",
      description: "Sosialisasi Reduce, Reuse, Recycle di SDN 1 Tasikmalaya"
    },
    {
      id: 4,
      title: "IPAL Komunal",
      category: "Fasilitas",
      date: "2025-07-12",
      image: "/images/gallery/ipal-komunal.jpg",
      description: "Instalasi Pengolahan Air Limbah Komunal di Kelurahan Tugujaya"
    },
    {
      id: 5,
      title: "Pelatihan Komposting",
      category: "Kegiatan",
      date: "2025-07-11",
      image: "/images/gallery/komposting.jpg",
      description: "Pelatihan pembuatan kompos dari sampah organik"
    },
    {
      id: 6,
      title: "Monitoring Kualitas Udara",
      category: "Dokumentasi",
      date: "2025-07-10",
      image: "/images/gallery/monitoring-udara.jpg",
      description: "Kegiatan monitoring kualitas udara di pusat kota"
    },
    {
      id: 7,
      title: "Pembersihan Sungai",
      category: "Kegiatan",
      date: "2025-07-09",
      image: "/images/gallery/bersih-sungai.jpg",
      description: "Aksi bersih sungai bersama komunitas peduli lingkungan"
    },
    {
      id: 8,
      title: "TPA Ramah Lingkungan",
      category: "Fasilitas",
      date: "2025-07-08",
      image: "/images/gallery/tpa.jpg",
      description: "Tempat Pemrosesan Akhir dengan sistem sanitary landfill"
    },
    {
      id: 9,
      title: "Lomba Kebersihan RT",
      category: "Event",
      date: "2025-07-07",
      image: "/images/gallery/lomba-rt.jpg",
      description: "Penilaian lomba kebersihan antar RT se-Kota Tasikmalaya"
    }
  ];

  const filteredPhotos = activeCategory === "Semua"
    ? photos
    : photos.filter(photo => photo.category === activeCategory);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Galeri Foto
            </h1>
            <p className="text-lg opacity-90 max-w-3xl mx-auto">
              Dokumentasi visual kegiatan dan program Dinas Lingkungan 
              Hidup Kota Tasikmalaya
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
                    ? "bg-indigo-600 text-white"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-gray-700"
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Photo Grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              className="group relative bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden hover:shadow-2xl transition-shadow cursor-pointer"
              onClick={() => setSelectedPhoto(photo)}
            >
              <div className="relative aspect-square">
                <img
                  src={photo.image}
                  alt={photo.title}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <svg
                    className="w-12 h-12 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 rounded-full text-sm">
                    {photo.category}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(photo.date).toLocaleDateString()}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {photo.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for enlarged photo */}
        {selectedPhoto && (
          <div
            className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedPhoto(null)}
          >
            <div className="relative max-w-4xl w-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
              <button
                className="absolute top-4 right-4 text-white z-10 hover:text-gray-300"
                onClick={() => setSelectedPhoto(null)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="relative aspect-[4/3]">
                <img
                  src={selectedPhoto.image}
                  alt={selectedPhoto.title}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                  {selectedPhoto.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-2">
                  {selectedPhoto.description}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                  <span>{selectedPhoto.category}</span>
                  <span>{new Date(selectedPhoto.date).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        )}

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
                      ? "bg-indigo-600 text-white"
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

export default PhotoGalleryPage;
