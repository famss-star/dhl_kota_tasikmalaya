'use client';

import React from 'react';
import Link from 'next/link';

export default function Profil() {
  const handleCardClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const card = e.currentTarget.querySelector('.card-content') as HTMLElement;
    if (card) {
      card.classList.add('animate-pulse');
      setTimeout(() => {
        card.classList.remove('animate-pulse');
      }, 300);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Dinas Lingkungan Hidup 
            </h1>
            <p className="text-xl md:text-4xl opacity-90 mb-8">
              Kota Tasikmalaya
            </p>
            <p className="text-lg opacity-80 max-w-3xl mx-auto">
              Mengenal lebih dekat organisasi yang berkomitmen untuk mewujudkan 
              lingkungan hidup yang lestari, bersih, dan sehat di Kota Tasikmalaya
            </p>
          </div>
        </div>
      </div>

      {/* Quick Overview */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          
          {/* Overview Cards */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
                Tentang Kami
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Dinas Lingkungan Hidup Kota Tasikmalaya merupakan unsur pelaksana urusan 
                pemerintahan di bidang lingkungan hidup yang berkomitmen memberikan pelayanan 
                terbaik kepada masyarakat.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Visi */}
              <Link href="/profil/tentang#visi" className="group" onClick={handleCardClick}>
                <div className="card-content bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center transform hover:scale-105 transition-all duration-500 ease-in-out border border-gray-200 dark:border-gray-700 group-hover:border-green-300 dark:group-hover:border-green-600 cursor-pointer group-hover:shadow-2xl group-hover:shadow-green-500/20 active:scale-95 active:shadow-lg">
                  <div className="bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                    <svg className="w-8 h-8 transition-all duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-300">Visi</h3>
                  <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300 group-hover:text-gray-700 dark:group-hover:text-gray-200">
                    Lingkungan hidup yang lestari, bersih, dan sehat untuk mendukung 
                    Kota Tasikmalaya yang maju dan berkelanjutan
                  </p>
                </div>
              </Link>

              {/* Misi */}
              <Link href="/profil/tentang#misi" className="group" onClick={handleCardClick}>
                <div className="card-content bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center transform hover:scale-105 transition-all duration-500 ease-in-out border border-gray-200 dark:border-gray-700 group-hover:border-blue-300 dark:group-hover:border-blue-600 cursor-pointer group-hover:shadow-2xl group-hover:shadow-blue-500/20 active:scale-95 active:shadow-lg">
                  <div className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                    <svg className="w-8 h-8 transition-all duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">Misi</h3>
                  <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300 group-hover:text-gray-700 dark:group-hover:text-gray-200">
                    4 misi utama dalam pengendalian pencemaran, kesadaran masyarakat, 
                    pengelolaan sampah, dan peningkatan kapasitas aparatur
                  </p>
                </div>
              </Link>

              {/* Tupoksi */}
              <Link href="/profil/tentang#tupoksi" className="group" onClick={handleCardClick}>
                <div className="card-content bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center transform hover:scale-105 transition-all duration-500 ease-in-out border border-gray-200 dark:border-gray-700 group-hover:border-purple-300 dark:group-hover:border-purple-600 cursor-pointer group-hover:shadow-2xl group-hover:shadow-purple-500/20 active:scale-95 active:shadow-lg">
                  <div className="bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                    <svg className="w-8 h-8 transition-all duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">TUPOKSI</h3>
                  <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300 group-hover:text-gray-700 dark:group-hover:text-gray-200">
                    Tugas pokok dan fungsi dalam melaksanakan urusan pemerintahan 
                    daerah di bidang lingkungan hidup
                  </p>
                  <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-purple-600 dark:text-purple-400 text-sm font-medium">
                      Klik untuk melihat detail →
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          </section>

          {/* Main Navigation */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
                Jelajahi Profil Kami
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Pelajari lebih lanjut tentang organisasi, struktur, dan kepemimpinan DLH Kota Tasikmalaya
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Tentang DLH */}
              <Link href="/profil/tentang" className="group">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center transform group-hover:scale-105 transition duration-300 border-2 border-transparent group-hover:border-green-300 dark:border-gray-700 dark:group-hover:border-green-600">
                  <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 group-hover:text-green-600 dark:group-hover:text-green-400">
                    Tentang DLH
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Visi, misi, TUPOKSI, dan maklumat pelayanan DLH Kota Tasikmalaya
                  </p>
                  <span className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300">
                    Selengkapnya →
                  </span>
                </div>
              </Link>

              {/* Struktur Organisasi */}
              <Link href="/profil/struktur-organisasi" className="group">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center transform group-hover:scale-105 transition duration-300 border-2 border-transparent group-hover:border-blue-300 dark:border-gray-700 dark:group-hover:border-blue-600">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    Struktur Organisasi
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Bagan organisasi lengkap dan deskripsi tugas setiap bidang
                  </p>
                  <span className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300">
                    Lihat Struktur →
                  </span>
                </div>
              </Link>

              {/* Profil Pimpinan */}
              <Link href="/profil/pimpinan" className="group">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center transform group-hover:scale-105 transition duration-300 border-2 border-transparent group-hover:border-purple-300 dark:border-gray-700 dark:group-hover:border-purple-600">
                  <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 group-hover:text-purple-600 dark:group-hover:text-purple-400">
                    Profil Pimpinan
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Profil kepala dinas, sekretaris, dan para kepala bidang
                  </p>
                  <span className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300">
                    Lihat Profil →
                  </span>
                </div>
              </Link>

              {/* Bidang Kerja */}
              <Link href="/bidang" className="group">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center transform group-hover:scale-105 transition duration-300 border-2 border-transparent group-hover:border-teal-300 dark:border-gray-700 dark:group-hover:border-teal-600">
                  <div className="bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 group-hover:text-teal-600 dark:group-hover:text-teal-400">
                    Bidang Kerja
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    4 bidang utama: Tata Lingkungan, Pencemaran, Sampah, dan Penegakan
                  </p>
                  <span className="inline-block bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300">
                    Jelajahi Bidang →
                  </span>
                </div>
              </Link>
            </div>
          </section>

          {/* Statistics */}
          <section className="mb-16">
            <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl text-white p-12">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">DLH Kota Tasikmalaya dalam Angka</h2>
                <p className="text-xl opacity-90">Komitmen nyata untuk lingkungan yang berkelanjutan</p>
              </div>
              
              <div className="grid md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-4xl font-bold mb-2">4</div>
                  <div className="text-lg opacity-90">Bidang Utama</div>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2">8</div>
                  <div className="text-lg opacity-90">Seksi Operasional</div>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2">50+</div>
                  <div className="text-lg opacity-90">ASN Kompeten</div>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2">24/7</div>
                  <div className="text-lg opacity-90">Monitoring Lingkungan</div>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Info
          <section>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center border border-gray-200 dark:border-gray-700">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                Hubungi Kami
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <div className="bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Alamat</h3>
                  <p className="text-gray-600 dark:text-gray-300">Jl. Ir. H. Juanda No. 277<br/>Kota Tasikmalaya</p>
                </div>
                
                <div>
                  <div className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Telepon</h3>
                  <p className="text-gray-600 dark:text-gray-300">(0265) xxx-xxxx<br/>Fax: (0265) xxx-xxxx</p>
                </div>
                
                <div>
                  <div className="bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Email</h3>
                  <p className="text-gray-600 dark:text-gray-300">info@dlh.tasikmalayakota.go.id<br/>dlh@tasikmalayakota.go.id</p>
                </div>
              </div>
            </div>
          </section> */}

        </div>
      </div>
    </div>
  );
}
