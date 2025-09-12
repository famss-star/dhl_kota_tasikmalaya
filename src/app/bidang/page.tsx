
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import StatisticsSection, { StatisticsItem } from "@/components/StatisticsSection";
import { useLanguage } from "../../context/LanguageContext";
import { Network, Trees, Trash2, Factory, Landmark, Loader2 } from 'lucide-react';

interface BidangData {
  id: string;
  slug: string;
  name: string;
  aboutTitle: string;
  aboutDescription: string;
  tugasPokokTitle: string;
  tugasPokok: string;
  fungsiTitle: string;
  fungsi: string;
  isActive: boolean;
}

export default function Bidang() {
  const { t } = useLanguage();
  const [bidangData, setBidangData] = useState<BidangData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBidangData();
  }, []);

  const fetchBidangData = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/bidang');
      const result = await response.json();

      if (result.success) {
        setBidangData(result.data);
      } else {
        setError('Gagal memuat data bidang');
      }
    } catch (error) {
      console.error('Error fetching bidang data:', error);
      setError('Terjadi kesalahan saat memuat data');
    } finally {
      setLoading(false);
    }
  };

  const items: StatisticsItem[] = [
    { value: "95%", label: "Pelayanan Perizinan" },
    { value: "100+", label: "Pengawasan Rutin" },
    { value: "80%", label: "Cakupan Sampah" },
    { value: "50+", label: "Penegakan Hukum" },
  ];

  const getIconForBidang = (slug: string) => {
    const iconMap = {
      'tata-lingkungan': <Trees size={40} className="text-green-600 dark:text-green-400" />,
      'pengendalian-pencemaran': <Factory size={40} className="text-red-600 dark:text-red-400" />,
      'pengelolaan-sampah': <Trash2 size={40} className="text-teal-600 dark:text-teal-400" />
    };
    return iconMap[slug as keyof typeof iconMap] || <Network size={40} className="text-blue-600 dark:text-blue-400" />;
  };

  const getColorForBidang = (slug: string) => {
    const colorMap = {
      'tata-lingkungan': 'green',
      'pengendalian-pencemaran': 'red',
      'pengelolaan-sampah': 'teal'
    };
    return colorMap[slug as keyof typeof colorMap] || 'blue';
  };

  const getColorClasses = (color: string) => {
    const colorMap = {
      green: {
        bg: 'bg-green-100 dark:bg-green-900',
        text: 'text-green-600 dark:text-green-400',
        hover: 'hover:border-green-300 dark:hover:border-green-600',
        button: 'bg-green-600 hover:bg-green-700'
      },
      red: {
        bg: 'bg-red-100 dark:bg-red-900',
        text: 'text-red-600 dark:text-red-400',
        hover: 'hover:border-red-300 dark:hover:border-red-600',
        button: 'bg-red-600 hover:bg-red-700'
      },
      teal: {
        bg: 'bg-teal-100 dark:bg-teal-900',
        text: 'text-teal-600 dark:text-teal-400',
        hover: 'hover:border-teal-300 dark:hover:border-teal-600',
        button: 'bg-teal-600 hover:bg-teal-700'
      },
      blue: {
        bg: 'bg-blue-100 dark:bg-blue-900',
        text: 'text-blue-600 dark:text-blue-400',
        hover: 'hover:border-blue-300 dark:hover:border-blue-600',
        button: 'bg-blue-600 hover:bg-blue-700'
      }
    };
    return colorMap[color as keyof typeof colorMap];
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-green-600" />
          <p className="text-gray-600 dark:text-gray-300">
            Memuat data bidang...
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
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Bidang Kerja
            </h1>
            <p className="text-xl md:text-2xl opacity-90">
              Struktur Organisasi Dinas Lingkungan Hidup Kota Tasikmalaya
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          
          {/* Overview */}
          <section className="mb-12">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 text-center">
                Struktur Bidang DLH
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 text-center max-w-4xl mx-auto">
                Dinas Lingkungan Hidup Kota Tasikmalaya memiliki 3 bidang utama yang bekerja secara sinergis 
                untuk mewujudkan lingkungan hidup yang lestari, bersih, dan sehat.
              </p>
            </div>
          </section>

          {/* Bidang Cards */}
          <section className="mb-12">
            <div className="grid md:grid-cols-3 gap-8">
              {bidangData.map((bidang) => {
                const color = getColorForBidang(bidang.slug);
                const colors = getColorClasses(color);
                const icon = getIconForBidang(bidang.slug);
                const tugasPokok = JSON.parse(bidang.tugasPokok);
                
                return (
                  <div 
                    key={bidang.id}
                    className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700 ${colors.hover} transition duration-300 transform hover:scale-105 flex flex-col`}
                  >
                    <div className="text-center mb-6 flex-1">
                      <div className={`${colors.bg} ${colors.text} rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4`}>
                        {icon}
                      </div>
                      <h3 className={`text-2xl font-bold ${colors.text} mb-3`}>
                        {bidang.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        {bidang.aboutDescription}
                      </p>
                      
                      {/* Features List */}
                      <div className="text-left">
                        <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Tugas Pokok:</h4>
                        <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                          {tugasPokok.slice(0, 4).map((tugas: string, index: number) => (
                            <li key={index} className="flex items-start">
                              <span className="mr-2">•</span>
                              <span>{tugas}</span>
                            </li>
                          ))}
                          {tugasPokok.length > 4 && (
                            <li className="text-gray-500 dark:text-gray-400 italic">
                              +{tugasPokok.length - 4} tugas lainnya
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                    <div className="text-center mt-auto">
                      <Link href={`/bidang/${bidang.slug}`}>
                        <button className={`${colors.button} items-end text-white px-6 py-3 rounded-lg font-semibold transition duration-300 transform hover:scale-105`}>
                          {t('button.learn_more')}
                        </button>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Statistics */}
          <section className="mb-12">
            <StatisticsSection
              title="Pencapaian Kinerja 2025"
              subtitle="Komitmen nyata untuk lingkungan berkelanjutan"
              items={items}
            />
          </section>

        </div>
      </div>
    </div>
  );
}
