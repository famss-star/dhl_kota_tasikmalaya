"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { CalendarDays, Newspaper, FileText, BarChart2, Megaphone, BookOpen, Loader2 } from 'lucide-react';

interface InformasiPage {
  id: string;
  title: string;
  description: string;
  icon: string;
  link: string;
  color: string;
  order: number;
}

export default function Informasi() {
  const [informasiPages, setInformasiPages] = useState<InformasiPage[]>([]);
  const [loading, setLoading] = useState(true);

  // Fallback hardcoded data
  const fallbackPages: InformasiPage[] = [
    {
      id: 'agenda',
      title: 'Agenda Kegiatan',
      description: 'Lihat jadwal kegiatan dan acara DLH Kota Tasikmalaya',
      icon: 'CalendarDays',
      link: '/informasi/agenda',
      color: 'green',
      order: 1
    },
    {
      id: 'berita',
      title: 'Berita Terbaru',
      description: 'Update berita dan informasi lingkungan hidup terkini',
      icon: 'Newspaper',
      link: '/informasi/berita',
      color: 'blue',
      order: 2
    },
    {
      id: 'artikel',
      title: 'Artikel',
      description: 'Artikel edukatif tentang lingkungan hidup',
      icon: 'FileText',
      link: '/informasi/artikel',
      color: 'yellow',
      order: 3
    },
    {
      id: 'panduan-umk',
      title: 'Panduan UMK',
      description: 'Panduan lengkap untuk memahami dan menerapkan Upaya Manajemen Keselamatan dalam pengelolaan lingkungan hidup',
      icon: 'BookOpen',
      link: '/informasi/panduan-umk',
      color: 'teal',
      order: 4
    }
  ];

  useEffect(() => {
    fetchInformasiPages();
  }, []);

  const fetchInformasiPages = async () => {
    try {
      const response = await fetch('/api/informasi-pages');
      if (response.ok) {
        const result = await response.json();
        if (result.success && result.data.length > 0) {
          setInformasiPages(result.data);
        } else {
          setInformasiPages(fallbackPages);
        }
      } else {
        setInformasiPages(fallbackPages);
      }
    } catch (error) {
      console.error('Error fetching informasi pages:', error);
      setInformasiPages(fallbackPages);
    } finally {
      setLoading(false);
    }
  };

  const getIconComponent = (iconName: string) => {
    const icons: { [key: string]: any } = {
      CalendarDays,
      Newspaper,
      FileText,
      BookOpen,
      BarChart2,
      Megaphone
    };
    return icons[iconName] || CalendarDays;
  };

  const getColorClasses = (color: string) => {
    const colorMap: { [key: string]: any } = {
      green: {
        bg: 'bg-green-100 dark:bg-green-900',
        text: 'text-green-600 dark:text-green-400',
        hover: 'group-hover:text-green-600 dark:group-hover:text-green-400',
        button: 'bg-green-600 hover:bg-green-700'
      },
      blue: {
        bg: 'bg-blue-100 dark:bg-blue-900',
        text: 'text-blue-600 dark:text-blue-400',
        hover: 'group-hover:text-blue-600 dark:group-hover:text-blue-400',
        button: 'bg-blue-600 hover:bg-blue-700'
      },
      yellow: {
        bg: 'bg-yellow-100 dark:bg-yellow-900',
        text: 'text-yellow-600 dark:text-yellow-400',
        hover: 'group-hover:text-yellow-600 dark:group-hover:text-yellow-400',
        button: 'bg-yellow-600 hover:bg-yellow-700'
      },
      teal: {
        bg: 'bg-teal-100 dark:bg-teal-900',
        text: 'text-teal-600 dark:text-teal-400',
        hover: 'group-hover:text-teal-600 dark:group-hover:text-teal-400',
        button: 'bg-teal-600 hover:bg-teal-700'
      }
    };
    return colorMap[color] || colorMap.blue;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-green-600" />
          <p className="text-gray-600 dark:text-gray-300">
            Memuat halaman informasi...
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-teal-600 to-green-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center min-h-[120px] flex flex-col justify-center">
            <div className="flex flex-col items-center justify-center mb-4">
              <h1 className="text-3xl md:text-5xl font-bold text-center leading-tight">
                Informasi & Berita
              </h1>
            </div>
            <p className="text-lg opacity-90 max-w-3xl mx-auto">
              Berita terkini dan informasi penting DLH Kota Tasikmalaya
            </p>
          </div>
        </div>
      </section>
            
      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          
          {/* Available Features */}
          <section className="mb-12">
            <div className="grid md:grid-cols-2 gap-8">
              {informasiPages.map((page) => {
                const IconComponent = getIconComponent(page.icon);
                const colors = getColorClasses(page.color);
                
                return (
                  <Link key={page.id} href={page.link} className="group">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700 group-hover:shadow-2xl transition duration-300 transform group-hover:scale-105 min-h-[320px] flex flex-col justify-between">
                      <div className={`${colors.bg} ${colors.text} rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6`}>
                        <IconComponent className="w-8 h-8" />
                      </div>
                      <h3 className={`text-2xl font-bold text-gray-800 dark:text-white mb-4 text-center ${colors.hover}`}>
                        {page.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
                        {page.description}
                      </p>
                      <div className="text-center mt-auto">
                        <span className={`inline-block ${colors.button} text-white font-semibold py-2 px-6 rounded-lg transition duration-300`}>
                          Lihat {page.title}
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* Coming Soon Features */}
          <section>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 text-center">
                Fitur yang Akan Datang
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <BarChart2 className="w-8 h-8 mx-auto mb-3 text-blue-500 dark:text-blue-400" />
                  <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Data & Statistik</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">Data lingkungan hidup Kota Tasikmalaya</p>
                </div>
                <div className="text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <Megaphone className="w-8 h-8 mx-auto mb-3 text-amber-500 dark:text-amber-400" />
                  <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Pengumuman</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">Pengumuman resmi dan pemberitahuan penting</p>
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
