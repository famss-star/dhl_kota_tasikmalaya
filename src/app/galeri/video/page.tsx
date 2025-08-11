"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const VideoGalleryPage = () => {
  const [activeCategory, setActiveCategory] = useState("Semua");

  const categories = [
    "Semua",
    "Dokumentasi",
    "Edukasi",
    "Sosialisasi",
    "Kegiatan"
  ];

  const videos = [
    {
      id: 1,
      title: "Sosialisasi Program Bank Sampah",
      category: "Sosialisasi",
      date: "2025-07-10",
      duration: "05:23",
      thumbnail: "https://img.youtube.com/vi/YOUTUBE_ID_1/maxresdefault.jpg",
      videoUrl: "https://www.youtube.com/watch?v=YOUTUBE_ID_1",
      views: 1250
    },
    {
      id: 2,
      title: "Tutorial Pemilahan Sampah Rumah Tangga",
      category: "Edukasi",
      date: "2025-07-08",
      duration: "08:15",
      thumbnail: "https://img.youtube.com/vi/YOUTUBE_ID_2/maxresdefault.jpg",
      videoUrl: "https://www.youtube.com/watch?v=YOUTUBE_ID_2",
      views: 2100
    },
    {
      id: 3,
      title: "Dokumentasi Penanaman 1000 Pohon",
      category: "Dokumentasi",
      date: "2025-07-05",
      duration: "12:30",
      thumbnail: "https://img.youtube.com/vi/YOUTUBE_ID_3/maxresdefault.jpg",
      videoUrl: "https://www.youtube.com/watch?v=YOUTUBE_ID_3",
      views: 875
    },
    {
      id: 4,
      title: "Cara Membuat Kompos dari Sampah Organik",
      category: "Edukasi",
      date: "2025-07-03",
      duration: "15:45",
      thumbnail: "https://img.youtube.com/vi/YOUTUBE_ID_4/maxresdefault.jpg",
      videoUrl: "https://www.youtube.com/watch?v=YOUTUBE_ID_4",
      views: 1830
    },
    {
      id: 5,
      title: "Kegiatan Bersih-bersih Sungai Citanduy",
      category: "Kegiatan",
      date: "2025-07-01",
      duration: "07:20",
      thumbnail: "https://img.youtube.com/vi/YOUTUBE_ID_5/maxresdefault.jpg",
      videoUrl: "https://www.youtube.com/watch?v=YOUTUBE_ID_5",
      views: 950
    },
    {
      id: 6,
      title: "Sosialisasi Pengurangan Plastik Sekali Pakai",
      category: "Sosialisasi",
      date: "2025-06-28",
      duration: "10:15",
      thumbnail: "https://img.youtube.com/vi/YOUTUBE_ID_6/maxresdefault.jpg",
      videoUrl: "https://www.youtube.com/watch?v=YOUTUBE_ID_6",
      views: 1540
    }
  ];

  const filteredVideos = activeCategory === "Semua"
    ? videos
    : videos.filter(video => video.category === activeCategory);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center min-h-[120px] flex flex-col justify-center">
            <div className="flex flex-col items-center justify-center mb-4">
              <h1 className="text-3xl md:text-5xl font-bold text-center leading-tight">
                Galeri Video
              </h1>
            </div>
            <p className="text-lg opacity-90 max-w-3xl mx-auto">
              Kumpulan video dokumentasi, edukasi, dan sosialisasi program 
              Dinas Lingkungan Hidup Kota Tasikmalaya
            </p>
          </div>
        </div>
      </section> 

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
                    ? "bg-purple-600 text-white"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-purple-50 dark:hover:bg-gray-700"
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Video Grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVideos.map((video) => (
            <div
              key={video.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden hover:shadow-2xl transition-shadow"
            >
              <Link href={video.videoUrl} target="_blank" className="block relative group">
                <div className="relative aspect-video">
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={false}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <svg
                      className="w-16 h-16 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 text-sm rounded">
                    {video.duration}
                  </div>
                </div>
              </Link>
              <div className="p-6">
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-2">
                  <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 rounded-full">
                    {video.category}
                  </span>
                  <span>{new Date(video.date).toLocaleDateString()}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">
                  {video.title}
                </h3>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  {video.views.toLocaleString()} tayangan
                </div>
              </div>
            </div>
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
                      ? "bg-purple-600 text-white"
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

export default VideoGalleryPage;