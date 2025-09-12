
'use client';

import Link from "next/link";
import { FileText, FileSignature, CircleHelp, CircleCheck } from "lucide-react";
import { useState } from "react";


export default function Pelayanan() {
  const [hoveredDropdownItem, setHoveredDropdownItem] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const getDropdownDescription = () => {
    switch (hoveredDropdownItem) {
      case 'AMDAL':
        return 'Analisis Mengenai Dampak Lingkungan untuk kegiatan usaha berskala besar.';
      case 'UKL-UPL':
        return 'Upaya Pengelolaan dan Pemantauan Lingkungan untuk kegiatan usaha skala kecil-menengah.';
      case 'SPPL':
        return 'Surat Pernyataan Pengelolaan Lingkungan untuk kegiatan usaha skala kecil.';
      default:
        return 'Pengajuan dan informasi terkait dokumen perizinan lingkungan hidup.';
    }
  };

  const handleDropdownHover = (item: string | null) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setHoveredDropdownItem(item);
      setIsTransitioning(false);
    }, 150);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center min-h-[120px] flex flex-col justify-center">
            <div className="flex flex-col items-center justify-center mb-4">
              <h1 className="text-3xl md:text-5xl font-bold text-center leading-tight">
                Pelayanan Publik
              </h1>
            </div>
            <p className="text-lg opacity-90 max-w-3xl mx-auto">
              Pelayanan Dinas Lingkungan Hidup Kota Tasikmalaya
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Quick Status Check */}
          <section className="bg-gradient-to-r from-blue-100 to-green-100 dark:from-blue-900 dark:to-green-900 rounded-xl shadow-lg p-8 mb-12 border border-blue-200 dark:border-blue-700">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-blue-900 dark:text-blue-200 mb-4">
                🔍 Cek Status Pengajuan Anda
              </h2>
              <p className="text-blue-800 dark:text-blue-300 mb-6">
                Pantau perkembangan pengajuan perizinan lingkungan yang sudah Anda kirim
              </p>
              <a
                href="/perizinan/status"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Cek Status Pengajuan
              </a>
            </div>
          </section>

          <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-12 border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-8 text-center">
              Daftar Perizinan Publik DLH
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-4 gap-6">
              {/* Baris 1 */}
              <div className="md:row-span-1 bg-gradient-to-br from-green-100 to-green-300 dark:from-green-900 dark:to-green-700 rounded-2xl p-8 flex flex-col justify-between shadow-lg">
                <h3 className="text-xl font-bold text-green-900 dark:text-green-200 mb-2">Perizinan Lingkungan (AMDAL, UKL-UPL, SPPL)</h3>
                <div className="mb-4 min-h-[3rem] flex items-center">
                  <p className={`text-gray-800 dark:text-gray-100 transition-all duration-300 ease-in-out transform ${
                    isTransitioning 
                      ? 'opacity-0 scale-95 translate-y-2' 
                      : 'opacity-100 scale-100 translate-y-0'
                  }`}>
                    {getDropdownDescription()}
                  </p>
                </div>
                {/* Dropdown untuk perizinan lingkungan */}
                <div className="relative inline-block text-left w-full">
                  <details className="w-full group">
                    <summary className="inline-block w-full bg-green-600 hover:bg-green-800 text-white font-semibold py-2 px-4 transition-all duration-300 cursor-pointer select-none rounded-lg group-open:rounded-t-lg group-open:rounded-b-none list-none">
                      <span className="flex justify-between items-center">
                        Pilih Jenis Perizinan
                        <span className="transform transition-transform duration-300 group-open:rotate-180">▼</span>
                      </span>
                    </summary>
                    <div className="bg-green-700 dark:bg-gray-800 rounded-b-lg shadow-lg absolute z-10 w-full max-h-0 overflow-hidden group-open:max-h-40 transition-[max-height] duration-800 ease-out">
                      <Link 
                        href="/perizinan/amdal" 
                        className="block px-4 py-2 text-white dark:text-gray-200 hover:bg-green-800 dark:hover:bg-green-900 transition duration-200"
                        onMouseEnter={() => handleDropdownHover('AMDAL')}
                        onMouseLeave={() => handleDropdownHover(null)}
                      >
                        AMDAL
                      </Link>
                      <Link 
                        href="/perizinan/ukl-upl" 
                        className="block px-4 py-2 text-white dark:text-gray-200 hover:bg-green-800 dark:hover:bg-green-900 transition duration-200"
                        onMouseEnter={() => handleDropdownHover('UKL-UPL')}
                        onMouseLeave={() => handleDropdownHover(null)}
                      >
                        UKL-UPL
                      </Link>
                      <Link 
                        href="/perizinan/sppl" 
                        className="block px-4 py-2 text-white dark:text-gray-200 hover:bg-green-800 dark:hover:bg-green-900 rounded-b-lg transition duration-200"
                        onMouseEnter={() => handleDropdownHover('SPPL')}
                        onMouseLeave={() => handleDropdownHover(null)}
                      >
                        SPPL
                      </Link>
                    </div>
                  </details>
                </div>
              </div>
              <div className="md:row-span-1 bg-gradient-to-br from-blue-100 to-blue-300 dark:from-blue-900 dark:to-blue-700 rounded-2xl p-8 flex flex-col justify-between shadow-lg">
                <h3 className="text-xl font-bold text-blue-900 dark:text-blue-200 mb-2">Pelayanan Pengelolaan Limbah Cair (IPLC)</h3>
                <p className="text-gray-800 dark:text-gray-100 mb-4">Layanan pengelolaan limbah cair domestik dan industri.</p>
                  <Link href="/pelayanan/iplc" className="inline-block bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded-lg transition duration-300">Lihat Detail</Link>
              </div>
              <div className="md:col-span-1 md:row-span-3 bg-gradient-to-br from-yellow-100 to-yellow-300 dark:from-yellow-900 dark:to-yellow-700 rounded-2xl p-8 flex flex-col justify-between shadow-lg">
                <h3 className="text-xl font-bold text-yellow-900 dark:text-yellow-200 mb-2">Pelayanan Pengelolaan Sampah</h3>
                <p className="text-gray-800 dark:text-gray-100 mb-4">Informasi dan permohonan layanan pengangkutan sampah.</p>
              </div>
              {/* Baris 2-3: persegi panjang lebar */}
              <div className="md:col-span-2 md:row-span-2 bg-gradient-to-br from-pink-100 to-pink-300 dark:from-pink-900 dark:to-pink-700 rounded-2xl p-8 flex flex-col justify-between shadow-lg">
                <h3 className="text-xl font-bold text-pink-900 dark:text-pink-200 mb-2">Pengaduan Lingkungan</h3>
                <p className="text-gray-800 dark:text-gray-100 mb-4">Layanan pelaporan masalah lingkungan hidup di Kota Tasikmalaya.</p>
                <Link href="/pelayanan/pengaduan-lingkungan" className="inline-block bg-pink-700 hover:bg-pink-800 text-white font-semibold py-2 px-4 rounded-lg transition duration-300">Lihat Detail</Link>
              </div>
              {/* Baris 4: persegi panjang lebar */}
              <div className="md:col-span-3 md:row-span-1 bg-gradient-to-br from-purple-100 to-purple-300 dark:from-purple-900 dark:to-purple-700 rounded-2xl p-8 flex flex-col justify-between shadow-lg">
                <h3 className="text-xl font-bold text-purple-900 dark:text-purple-200 mb-2">Permohonan Informasi Publik</h3>
                <p className="text-gray-800 dark:text-gray-100 mb-4">Layanan permohonan Akses dokumen, data dan informasi publik di Kota Tasikmalaya.</p>
                <Link href="/pelayanan/ppid" className="inline-block bg-purple-700 hover:bg-purple-800 text-white font-semibold py-2 px-4 rounded-lg transition duration-300">Lihat Detail</Link>
              </div>
            </div>
          </section>

        {/* Section: FAQ singkat */}
        <section className="mt-12">
          <div className="bg-gray-100 dark:bg-gray-900 rounded-xl px-8 pt-5 pb-8 shadow border border-gray-200 dark:border-gray-700 w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-6">
              
              <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300">FAQ</h2>
            </div>
            <ul className="space-y-8 text-gray-700 dark:text-gray-200 text-base">
              <li>
                <div className="flex items-center gap-2 mb-1">
                  <CircleHelp className="text-blue-700 dark:text-blue-300" size={24} />
                  <span className="font-semibold">Bagaimana cara mengajukan izin lingkungan?</span>
                </div>

                <span className="flex items-center gap-2 mt-1">
                  <CircleCheck className="text-green-600 dark:text-green-400" size={24} />
                  Silakan klik layanan &quot;Perizinan Lingkungan&quot; lalu ikuti petunjuk dan unggah dokumen yang diperlukan.
                </span>
              </li>
              <li>
                <div className="flex items-center gap-2 mb-1">
                  <CircleHelp className="text-blue-700 dark:text-blue-300" size={24} />
                  <span className="font-semibold">Apakah pengaduan bisa dilakukan online?</span>
                </div>

                <span className="flex items-center gap-2 mt-1">
                  <CircleCheck className="text-green-600 dark:text-green-400" size={24} />
                  Ya, gunakan menu &quot;Pengaduan Lingkungan&quot; untuk melaporkan masalah secara online.
                </span>
              </li>
            </ul>
          </div>
        </section>

          {/* Navigation */}
          <section>
            <div className="mt-12 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
                Dokumen & Formulir Terkait
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Link href="/dokumen" className="group">
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 text-center group-hover:bg-gray-100 dark:group-hover:bg-gray-600 transition duration-300">
                    <FileText className="mx-auto mb-3 text-blue-600 dark:text-blue-300" size={40} />
                    <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Lihat Daftar Dokumen</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">Akses dokumen, regulasi, dan SOP DLH Kota Tasikmalaya</p>
                  </div>
                </Link>

                <Link href="/dokumen/formulir-pengajuan.pdf" className="group" target="_blank" rel="noopener">
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 text-center group-hover:bg-gray-100 dark:group-hover:bg-gray-600 transition duration-300">
                    <FileSignature className="mx-auto mb-3 text-green-600 dark:text-green-300" size={40} />
                    <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Unduh Formulir Pengajuan</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">Download formulir pengajuan layanan publik DLH</p>
                  </div>
                </Link>
                
              </div>
            </div>
          </section>
          
          </div>
        </div>
      </div>
  );
}
