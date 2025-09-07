"use client";

import React from "react";
import Link from "next/link";
import {
  Eye,
  CheckCircle2,
  FileText,
  Info,
  Network,
  Landmark,
  Building,
  Users,
  Loader2,
} from "lucide-react";
import { useProfil } from "@/hooks/useProfil";
import { useTentang } from "@/hooks/useTentang";

export default function Profil() {
  const {
    data: profilData,
    loading: profilLoading,
    error: profilError,
  } = useProfil();
  const {
    data: tentangData,
    loading: tentangLoading,
    error: tentangError,
  } = useTentang();

  const loading = profilLoading || tentangLoading;
  const error = profilError || tentangError;

  const handleCardClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const card = e.currentTarget.querySelector(".card-content") as HTMLElement;
    if (card) {
      card.classList.add("animate-pulse");
      setTimeout(() => {
        card.classList.remove("animate-pulse");
      }, 300);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-green-600" />
          <p className="text-gray-600 dark:text-gray-300">
            Memuat data profil...
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Gagal Memuat Data
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              {profilData?.siteName?.split(" ").slice(0, 3).join(" ") ||
                "Dinas Lingkungan Hidup"}
            </h1>
            <p className="text-xl md:text-4xl opacity-90 mb-8">
              {profilData?.siteName?.split(" ").slice(3).join(" ") ||
                "Kota Tasikmalaya"}
            </p>
            <p className="text-lg opacity-80 max-w-3xl mx-auto">
              {profilData?.siteDescription ||
                "Mengenal lebih dekat organisasi yang berkomitmen untuk mewujudkan lingkungan hidup yang lestari, bersih, dan sehat di Kota Tasikmalaya"}
            </p>
          </div>
        </div>
      </div>

      {/* Quick Overview */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* About Us Section */}
          <section className="mb-16">
            <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8">
              <div className="prose dark:prose-invert max-w-none">
                <h2 className="text-3xl text-center font-bold text-gray-800 dark:text-white mb-6 border-b-4 border-green-500 pb-2">
                  Tentang Kami
                </h2>
                {loading ? (
                  <div className="animate-pulse">
                    <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
                  </div>
                ) : (
                  <div className="text-gray-700 dark:text-gray-300">
                    {(tentangData?.tentangKami || profilData?.tentangKami)
                      ?.split("\n")
                      .map((paragraph, index) => (
                        <p key={index} className="mb-4 indent-8">
                          {index === 0 && (
                            <span className="font-bold">
                              Dinas Lingkungan Hidup Kota Tasikmalaya{" "}
                            </span>
                          )}
                          {paragraph}
                        </p>
                      ))}
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Vision, Mission, TUPOKSI Section */}
          <section className="mb-16">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Visi */}
              <Link
                href="/profil/tentang#visi"
                className="group flex flex-col"
                onClick={handleCardClick}
              >
                <div className="card-content h-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center flex flex-col justify-between transform hover:scale-105 transition-all duration-500 ease-in-out border border-gray-200 dark:border-gray-700 group-hover:border-green-300 dark:group-hover:border-green-600 cursor-pointer group-hover:shadow-2xl group-hover:shadow-green-500/20 active:scale-95 active:shadow-lg">
                  <div className="bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                    <Eye className="w-8 h-8 transition-all duration-300 group-hover:scale-110" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-300">
                    Visi
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300 group-hover:text-gray-700 dark:group-hover:text-gray-200">
                    {tentangData?.visi || profilData?.visi}
                  </p>
                  <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-green-600 dark:text-green-400 text-sm font-medium">
                      Klik untuk melihat detail
                    </span>
                  </div>
                </div>
              </Link>

              {/* Misi */}
              <Link
                href="/profil/tentang#misi"
                className="group flex flex-col"
                onClick={handleCardClick}
              >
                <div className="card-content h-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center flex flex-col justify-between transform hover:scale-105 transition-all duration-500 ease-in-out border border-gray-200 dark:border-gray-700 group-hover:border-blue-300 dark:group-hover:border-blue-600 cursor-pointer group-hover:shadow-2xl group-hover:shadow-blue-500/20 active:scale-95 active:shadow-lg">
                  <div className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                    <CheckCircle2 className="w-8 h-8 transition-all duration-300 group-hover:scale-110" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    Misi
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300 group-hover:text-gray-700 dark:group-hover:text-gray-200">
                    {tentangData?.misi?.length
                      ? `${tentangData.misi.length} misi utama dalam pengendalian pencemaran, kesadaran masyarakat, pengelolaan sampah, dan peningkatan kapasitas aparatur`
                      : null}
                  </p>
                  <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-blue-600 dark:text-blue-400 text-sm font-medium">
                      Klik untuk melihat detail
                    </span>
                  </div>
                </div>
              </Link>

              {/* Tupoksi */}
              <Link
                href="/profil/tentang#tupoksi"
                className="group flex flex-col"
                onClick={handleCardClick}
              >
                <div className="card-content h-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center flex flex-col justify-between transform hover:scale-105 transition-all duration-500 ease-in-out border border-gray-200 dark:border-gray-700 group-hover:border-purple-300 dark:group-hover:border-purple-600 cursor-pointer group-hover:shadow-2xl group-hover:shadow-purple-500/20 active:scale-95 active:shadow-lg">
                  <div className="bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                    <FileText className="w-8 h-8 transition-all duration-300 group-hover:scale-110" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                    TUPOKSI
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300 group-hover:text-gray-700 dark:group-hover:text-gray-200">
                    {tentangData?.tupoksi?.tugasPokok}
                  </p>
                  <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-purple-600 dark:text-purple-400 text-sm font-medium">
                      Klik untuk melihat detail
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
                Pelajari lebih lanjut tentang organisasi, struktur, dan
                kepemimpinan DLH Kota Tasikmalaya
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 lg:grid-rows-2 gap-8">
              {/* Bento Layout */}
              <div className="lg:col-span-2 lg:row-span-2 flex">
                <Link href="/profil/tentang" className="group w-full flex">
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center flex flex-col justify-between w-full transform group-hover:scale-105 transition duration-300 border-2 border-transparent group-hover:border-green-300 dark:border-gray-700 dark:group-hover:border-green-600">
                    <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                      <Info className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-300">
                      Tentang DLH
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      Visi, Misi, TUPOKSI, dan maklumat pelayanan DLH Kota
                      Tasikmalaya
                    </p>
                    <span className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300">
                      Selengkapnya
                    </span>
                  </div>
                </Link>
              </div>
              <div className="lg:col-span-2 lg:row-span-1 grid grid-cols-2 gap-8">
                <Link href="/profil/struktur-organisasi" className="group flex">
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center flex flex-col justify-between w-full transform group-hover:scale-105 transition duration-300 border-2 border-transparent group-hover:border-blue-300 dark:border-gray-700 dark:group-hover:border-blue-600">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                      <Landmark className="w-10 h-10" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                      Struktur Organisasi
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      Bagan organisasi lengkap dan deskripsi tugas setiap bidang
                    </p>
                    <span className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300">
                      Lihat Struktur
                    </span>
                  </div>
                </Link>
                <Link href="/profil/pegawai" className="group flex">
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center flex flex-col justify-between w-full transform group-hover:scale-105 transition duration-300 border-2 border-transparent group-hover:border-purple-300 dark:border-gray-700 dark:group-hover:border-purple-600">
                    <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                      <Users className="w-10 h-10" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                      Profil Pegawai
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      Profil lengkap sumber daya manusia dan komposisi
                      kepegawaian DLH Kota Tasikmalaya
                    </p>
                    <span className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300">
                      Lihat Profil
                    </span>
                  </div>
                </Link>
              </div>
              <div className="lg:col-span-2 lg:row-span-1 flex">
                <Link href="/bidang" className="group w-full flex">
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center flex flex-col justify-between w-full transform group-hover:scale-105 transition duration-300 border-2 border-transparent group-hover:border-teal-300 dark:border-gray-700 dark:group-hover:border-teal-600">
                    <div className="bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                      <Network className="w-10 h-10" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors duration-300">
                      Bidang Kerja
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      3 bidang utama: Tata Lingkungan, Pencemaran, dan Sampah
                    </p>
                    <span className="inline-block bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300">
                      Jelajahi Bidang
                    </span>
                  </div>
                </Link>
              </div>
            </div>
          </section>

          {/* Statistics */}
          <section className="mb-16">
            <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl text-white p-12">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">
                  DLH Kota Tasikmalaya dalam Angka
                </h2>
                <p className="text-xl opacity-90">
                  Komitmen nyata untuk lingkungan yang berkelanjutan
                </p>
              </div>

              <div className="grid md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-4xl font-bold mb-2">
                    {profilData?.summary?.bidangUtama || 3}
                  </div>
                  <div className="text-lg opacity-90">Bidang Utama</div>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2">
                    {profilData?.summary?.seksiOperasional || 8}
                  </div>
                  <div className="text-lg opacity-90">Seksi Operasional</div>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2">
                    {profilData?.summary?.asnKompeten ||
                      profilData?.totalStaff ||
                      "50+"}
                  </div>
                  <div className="text-lg opacity-90">ASN Kompeten</div>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2">
                    {profilData?.summary?.monitoringLingkungan || "24/7"}
                  </div>
                  <div className="text-lg opacity-90">
                    Monitoring Lingkungan
                  </div>
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
