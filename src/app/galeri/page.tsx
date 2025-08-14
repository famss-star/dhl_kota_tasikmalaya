'use client';

import { useState } from 'react';
import Image from 'next/image';

// Data galeri
const galleryItems = [
  {
    id: 1,
    title: 'Kegiatan Penanaman Pohon',
    description: 'Program penghijauan di kawasan perkotaan Tasikmalaya',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500&h=300&fit=crop',
    category: 'Penghijauan',
    date: '2025-07-10'
  },
  {
    id: 2,
    title: 'Sosialisasi Sampah Organik',
    description: 'Edukasi masyarakat tentang pengelolaan sampah organik',
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=500&h=300&fit=crop',
    category: 'Edukasi',
    date: '2025-07-08'
  },
  {
    id: 3,
    title: 'Pembersihan Sungai',
    description: 'Aksi bersih-bersih sungai bersama masyarakat',
    image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=500&h=300&fit=crop',
    category: 'Pembersihan',
    date: '2025-07-05'
  },
  {
    id: 4,
    title: 'Workshop Kompos',
    description: 'Pelatihan pembuatan kompos dari sampah organik',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500&h=300&fit=crop',
    category: 'Pelatihan',
    date: '2025-07-03'
  },
  {
    id: 5,
    title: 'Monitoring Kualitas Udara',
    description: 'Pengukuran kualitas udara di berbagai titik kota',
    image: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=500&h=300&fit=crop',
    category: 'Monitoring',
    date: '2025-07-01'
  },
  {
    id: 6,
    title: 'Festival Lingkungan',
    description: 'Festival tahunan peduli lingkungan hidup',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=500&h=300&fit=crop',
    category: 'Event',
    date: '2025-06-28'
  }
];

const categories = ['Semua', 'Penghijauan', 'Edukasi', 'Pembersihan', 'Pelatihan', 'Monitoring', 'Event'];

export default function Galeri() {
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [selectedImage, setSelectedImage] = useState<(typeof galleryItems)[0] | null>(null);

  const filteredItems = selectedCategory === 'Semua' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center min-h-[120px] flex flex-col justify-center">
            <div className="flex flex-col items-center justify-center mb-4">
              <h1 className="text-3xl md:text-5xl font-bold text-center leading-tight">
                Galeri Kegiatan
              </h1>
            </div>
            <p className="text-lg opacity-90 max-w-3xl mx-auto">
                Dokumentasi kegiatan Dinas Lingkungan Hidup Kota Tasikmalaya
            </p>
          </div>
        </div>
      </section> 

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          
          {/* Filter Categories */}
          <section className="mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Filter Kategori</h2>
              <div className="flex flex-wrap gap-3">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg font-medium transition duration-300 ${
                      selectedCategory === category
                        ? 'bg-green-600 text-white shadow-lg'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Gallery Grid */}
          <section>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredItems.map((item) => (
                <div 
                  key={item.id}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition duration-300 cursor-pointer transform hover:scale-105"
                  onClick={() => setSelectedImage(item)}
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition duration-300 hover:scale-110"
                    />
                    <div className="absolute top-4 right-4">
                      <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                        {item.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3 line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                      {item.description}
                    </p>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500 dark:text-gray-400">
                        📅 {item.date}
                      </span>
                      <button className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-medium">
                        Lihat Detail →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Statistics */}
          <section className="mt-12">
            <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl text-white p-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-4">Dokumentasi Kegiatan</h2>
                <div className="grid md:grid-cols-4 gap-6">
                  <div>
                    <div className="text-3xl font-bold mb-2">150+</div>
                    <div className="text-lg opacity-90">Total Foto</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold mb-2">25+</div>
                    <div className="text-lg opacity-90">Kegiatan Terdokumentasi</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold mb-2">6</div>
                    <div className="text-lg opacity-90">Kategori Kegiatan</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold mb-2">2025</div>
                    <div className="text-lg opacity-90">Tahun Aktif</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>

      {/* Modal for Image Detail */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="relative">
              <Image
                src={selectedImage.image}
                alt={selectedImage.title}
                width={800}
                height={400}
                className="w-full h-64 md:h-96 object-cover"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 bg-black bg-opacity-50 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-75 transition"
              >
                ✕
              </button>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {selectedImage.category}
                </span>
                <span className="text-gray-500 dark:text-gray-400 text-sm">
                  📅 {selectedImage.date}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                {selectedImage.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {selectedImage.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
