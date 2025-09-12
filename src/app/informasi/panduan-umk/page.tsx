"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";

interface PanduanItem {
  id: string;
  title: string;
  description: string;
  content?: string;
  order: number;
}

interface PanduanCategory {
  [category: string]: PanduanItem[];
}

const PanduanUMKPage = () => {
  const [panduanData, setPanduanData] = useState<PanduanCategory>({});
  const [loading, setLoading] = useState(true);

  // Fallback hardcoded data
  const fallbackData: PanduanCategory = {
    "Dasar-dasar UMK": [
      {
        id: "pengertian-umk",
        title: "Pengertian UMK",
        description: "Penjelasan mengenai konsep dasar Upaya Manajemen Keselamatan",
        order: 1
      },
      {
        id: "tujuan-manfaat",
        title: "Tujuan dan Manfaat",
        description: "Tujuan penerapan UMK dan manfaatnya bagi lingkungan",
        order: 2
      },
      {
        id: "landasan-hukum",
        title: "Landasan Hukum",
        description: "Peraturan dan regulasi terkait UMK",
        order: 3
      }
    ],
    "Implementasi UMK": [
      {
        id: "identifikasi-risiko",
        title: "Identifikasi Risiko",
        description: "Cara mengidentifikasi potensi bahaya lingkungan",
        order: 4
      },
      {
        id: "penilaian-dampak",
        title: "Penilaian Dampak",
        description: "Metode penilaian dampak lingkungan",
        order: 5
      },
      {
        id: "rencana-pengendalian",
        title: "Rencana Pengendalian",
        description: "Penyusunan rencana pengendalian dampak lingkungan",
        order: 6
      }
    ],
    "Monitoring dan Evaluasi": [
      {
        id: "program-pemantauan",
        title: "Program Pemantauan",
        description: "Panduan pemantauan implementasi UMK",
        order: 7
      },
      {
        id: "evaluasi-kinerja",
        title: "Evaluasi Kinerja",
        description: "Metode evaluasi efektivitas UMK",
        order: 8
      },
      {
        id: "pelaporan",
        title: "Pelaporan",
        description: "Format dan prosedur pelaporan UMK",
        order: 9
      }
    ]
  };

  useEffect(() => {
    fetchPanduanData();
  }, []);

  const fetchPanduanData = async () => {
    try {
      const response = await fetch('/api/panduan-umk');
      if (response.ok) {
        const result = await response.json();
        if (result.success && Object.keys(result.data).length > 0) {
          setPanduanData(result.data);
        } else {
          // Use fallback data if API returns empty
          setPanduanData(fallbackData);
        }
      } else {
        // Use fallback data if API fails
        setPanduanData(fallbackData);
      }
    } catch (error) {
      console.error('Error fetching panduan data:', error);
      // Use fallback data on error
      setPanduanData(fallbackData);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-green-600" />
          <p className="text-gray-600 dark:text-gray-300">
            Memuat panduan UMK...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-teal-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center min-h-[120px] flex flex-col justify-center">
            <div className="flex flex-col items-center justify-center mb-4">
              <h1 className="text-3xl md:text-5xl font-bold text-center leading-tight">
                Panduan UMK
              </h1>
            </div>
            <p className="text-lg opacity-90 max-w-3xl mx-auto">
              Pedoman lengkap untuk memahami dan menerapkan Upaya Manajemen 
              Keselamatan dalam pengelolaan lingkungan hidup
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">

        {/* Overview Section */}
        <section className="max-w-6xl mx-auto mb-12">
          <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              Tentang Panduan UMK
            </h2>
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 indent-8">
                Panduan UMK ini disusun untuk membantu pemahaman dan implementasi 
                Upaya Manajemen Keselamatan dalam pengelolaan lingkungan hidup. 
                Dokumen ini mencakup aspek-aspek penting mulai dari konsep dasar, 
                implementasi, hingga monitoring dan evaluasi pelaksanaan UMK.
              </p>
            </div>
          </div>
        </section>

        {/* Categories */}
        {Object.entries(panduanData).map(([category, items]) => (
          <section key={category} className="max-w-6xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
              {category}
            </h2>
            <div className="grid gap-6">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-6 hover:shadow-2xl transition-shadow"
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {item.description}
                      </p>
                    </div>
                    <Link
                      href={`#${item.id}`}
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