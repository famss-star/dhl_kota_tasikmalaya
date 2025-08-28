"use client";

import React, { useState, useRef, useEffect } from "react";
import { Shield, Award } from "lucide-react";

interface BidangData {
  id: string;
  name: string;
  slug: string;
  aboutTitle: string;
  aboutDescription: string;
  tugasPokokTitle: string;
  tugasPokok: string[];
  fungsiTitle: string;
  fungsi: string[];
}

const BidangPengendalianPencemaranPage = () => {
  const [showAll, setShowAll] = useState(false);
  const [height, setHeight] = useState(0);
  const contentRef = useRef<HTMLUListElement>(null);
  const [bidangData, setBidangData] = useState<BidangData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch bidang data from API
  useEffect(() => {
    const fetchBidangData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/bidang/pengendalian-pencemaran');
        if (!response.ok) {
          throw new Error('Failed to fetch bidang data');
        }
        const result = await response.json();
        
        // Extract data from API response and parse JSON strings
        const data = result.data;
        const processedData = {
          ...data,
          tugasPokok: typeof data.tugasPokok === 'string' ? JSON.parse(data.tugasPokok) : data.tugasPokok,
          fungsi: typeof data.fungsi === 'string' ? JSON.parse(data.fungsi) : data.fungsi
        };
        setBidangData(processedData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchBidangData();
  }, []);

  useEffect(() => {
    if (showAll && contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    } else {
      setHeight(0);
    }
  }, [showAll, bidangData]);

  return (
    <>
      {/* Loading State */}
      {loading && (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-600 dark:text-red-400">Error: {error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Coba Lagi
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      {!loading && !error && bidangData && (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          {/* Hero Section */}
          <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center min-h-[120px] flex flex-col justify-center">
                <div className="flex flex-col items-center justify-center mb-4">
                  <h1 className="text-3xl md:text-5xl font-bold text-center leading-tight">
                    {bidangData.name}
                  </h1>
                </div>
                <p className="text-lg opacity-90 max-w-3xl mx-auto">
                  Dinas Lingkungan Hidup Kota Tasikmalaya
                </p>
              </div>
            </div>
          </section>

          <div className="container mx-auto px-4 py-12">
            {/* Deskripsi Bidang Pengendalian Pencemaran */}
            <section className="max-w-6xl mx-auto mb-8">
              <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8">
                <div className="prose dark:prose-invert max-w-none">
                  <h2 className="text-3xl text-center font-bold text-gray-800 dark:text-white mb-6 border-b-4 border-blue-500 pb-2">
                    {bidangData.aboutTitle}
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-0 indent-8">
                    <span className="font-bold">{bidangData.name}</span> {bidangData.aboutDescription}
                  </p>
                </div>
              </div>
            </section>

            {/* Rincian Tugas Bidang Pengendalian Pencemaran */}
            <section className="max-w-6xl mx-auto mb-12">
              <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8">
                <h3 className="text-3xl text-center flex items-center justify-center gap-3 font-bold text-gray-800 dark:text-white mb-6 border-b-4 border-blue-500 pb-2">
                  <div className="flex items-center justify-center">
                    <Shield className="w-6 h-6 text-blue-600" />
                  </div>
                  {bidangData.tugasPokokTitle}
                </h3>
                
                {/* Content with fade effect when collapsed */}
                <div className="relative">
                  <div
                    style={{
                      height: showAll ? height : '250px',
                      overflow: 'hidden',
                      transition: 'height 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                  >
                    <ul 
                      ref={contentRef}
                      className="list-decimal pl-6 space-y-3 text-gray-700 dark:text-gray-300"
                    >
                      {bidangData?.tugasPokok?.map((item: string, idx: number) => (
                        <li 
                          key={idx}
                          className={`transform transition-all duration-500 ease-out ${
                            showAll 
                              ? 'opacity-100 translate-y-0 scale-100' 
                              : idx < 3
                                ? 'opacity-100 translate-y-0 scale-100' 
                                : 'opacity-60 translate-y-0 scale-100'
                          }`}
                          style={{
                            transitionDelay: `${idx * 30}ms`
                          }}
                        >
                          {item}
                        </li>
                      )) || []}
                    </ul>
                  </div>
                  
                  {/* Fade overlay when collapsed */}
                  <div 
                    className={`absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-gray-800 dark:via-gray-800/80 dark:to-transparent pointer-events-none transition-all duration-700 ease-in-out ${
                      showAll ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
                    }`}
                  ></div>
                </div>
                <div className="text-center mt-6">
                  <button
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-300"
                    onClick={() => setShowAll((v) => !v)}
                  >
                    {showAll ? "Tampilkan Lebih Sedikit" : "Tampilkan Semua"}
                  </button>
                </div>
              </div>
            </section>

            {/* Fungsi */}
            <section className="max-w-6xl mx-auto mb-12">
              <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8">
                <h3 className="text-3xl text-center flex items-center justify-center gap-3 font-bold text-gray-800 dark:text-white mb-6 border-b-4 border-blue-500 pb-2">
                  <div className="flex items-center justify-center">
                    <Award className="w-6 h-6 text-blue-600" />
                  </div>
                  {bidangData.fungsiTitle}
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {bidangData?.fungsi?.map((fungsiItem: string, index: number) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full min-w-[1.5rem] min-h-[1.5rem] flex items-center justify-center text-xs font-bold mt-0.5">
                        {index + 1}
                      </span>
                      <span className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                        {fungsiItem}
                      </span>
                    </div>
                  )) || []}
                </div>
              </div>
            </section>

            {/* Back to Bidang */}
            <section>
              <div className="text-center">
                <a href="/bidang" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                  Kembali ke Daftar Bidang
                </a>
              </div>
            </section>        
          </div>
        </div>
      )}
    </>
  );
};

export default BidangPengendalianPencemaranPage;
