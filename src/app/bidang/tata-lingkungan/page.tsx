"use client";

import React, { useState, useRef, useEffect } from "react";
import { useLanguage } from "../../../context/LanguageContext";

const BidangTataLingkunganPage = () => {
  const { t } = useLanguage();
  const [showAll, setShowAll] = useState(false);
  const [height, setHeight] = useState(0);
  const contentRef = useRef<HTMLUListElement>(null);

  const tugas = [
    "Menyelenggarakan penyusunan rencana program kerja dan target kinerja Bidang Tata Lingkungan sesuai perjanjian kinerja;",
    "Melaksanakan perumusan strategi pelaksanaan pencapaian target kinerja termasuk di dalamnya pembentukan tim kerja dan pelibatan jabatanjabatan yang diperlukan dalam pencapaian target kinerja;",
    "Menyelenggarakan perumusan bahan kebijakan dan petunjuk teknis penataan ruang yang berkaitan dengan lingkungan hidup;",
    "Menyelenggarakan perumusan bahan kebijakan dan petunjuk teknis pengendalian dampak lingkungan yang meliputi Analisis Mengenai Dampak Lingkungan (AMDAL), Upaya Pengelolaan Lingkungan dan Upaya Pemantauan Lingkungan (UKL-UPL), Surat Pernyataan Pengelolaan Lingkungan (SPPL) dan sejenisnya;",
    "Mengoordinasikan penyelenggaraan penataan ruang yang berkaitan dengan lingkungan hidup;",
    "Mengoordinasikan penyelenggaraan pengendalian dampak lingkungan;",
    "Mengoordinasikan pembinaan dan pengawasan terhadap usaha dan/atau kegiatan yang berkaitan dengan izin lingkungan;",
    "Menyelenggarakan inventarisasi dan identifikasi sumber daya alam beserta kondisi lingkungan hidup;",
    "Menyelenggarakan penetapan daya dukung dan daya tampung lingkungan hidup;",
    "Menyelenggarakan pengkajian lingkungan hidup strategis;",
    "Melaksanakan pemantauan, evaluasi dan laporan yang berkaitan dengan tugas Bidang Tata Lingkungan;",
    "Melaksanakan pembinaan kinerja jabatan fungsional dan jabatan pelaksana yang ditempatkan di Bidang Tata Lingkungan;",
    "Melaksanakan penyediaan sarana dan prasarana, tata kelola serta sumber daya dalam rangka pencapaian target kinerja oleh jabatan fungsional dan jabatan pelaksana yang berada di bawahnya;",
    "Melaksanakan koordinasi dengan unit kerja terkait; dan",
    "Melaksanakan tugas kedinasan lain sesuai dengan tugas dan fungsinya."
  ];

  useEffect(() => {
    if (showAll && contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    } else {
      setHeight(0);
    }
  }, [showAll]);
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-500 to-green-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center min-h-[120px] flex flex-col justify-center">
            <div className="flex flex-col items-center justify-center mb-4">
              <h1 className="text-3xl md:text-5xl font-bold text-center leading-tight">
                {t('dept.environmental_planning')}
              </h1>
            </div>
            <p className="text-lg opacity-90 max-w-3xl mx-auto">
              {t('dept.environmental_planning.desc')}
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Deskripsi Bidang Tata Lingkungan */}
        <section className="max-w-6xl mx-auto mb-8">
          <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8">
            <div className="prose dark:prose-invert max-w-none">
              <h2 className="text-3xl text-center font-bold text-gray-800 dark:text-white mb-6 border-b-4 border-green-500 pb-2">{t('common.about')} {t('dept.environmental_planning')}</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-0 indent-8">
                <span className="font-bold">{t('dept.environmental_planning')}</span> {t('dept.environmental_planning.about')}
              </p>
            </div>
          </div>
        </section>

        {/* Rincian Tugas Bidang Tata Lingkungan */}
        <section className="max-w-6xl mx-auto mb-12">
          <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8">
            <div className="prose dark:prose-invert max-w-none">
              <h3 className="text-3xl text-center font-bold text-gray-800 dark:text-white mb-6 border-b-4 border-green-500 pb-2">{t('title.task_details_environmental')}</h3>
              <>
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
                      {tugas.map((item, idx) => (
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
                      ))}
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
                    className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition duration-300"
                    onClick={() => setShowAll((v) => !v)}
                  >
                    {showAll ? t('button.hide') : t('button.read_more')}
                  </button>
                </div>
              </>
            </div>
          </div>
        </section>
        {/* Back to Bidang */}
        <section>
          <div className="text-center">
            <a href="/bidang" className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">{t('button.back_to_departments')}</a>
          </div>
        </section>        
      </div>
    </div>
  );
};

export default BidangTataLingkunganPage;