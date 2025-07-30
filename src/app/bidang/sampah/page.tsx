"use client";

import React, { useState, useRef, useEffect } from "react";
import { Trash2 } from "lucide-react";


const BidangSampahPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-emerald-500 to-teal-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex flex-col items-center justify-center mb-4">
              <div className="flex items-center justify-center gap-4 mb-2">
                <Trash2 className="w-14 h-14 md:w-16 md:h-16 text-teal-200 drop-shadow-md" />
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-center leading-tight">
                Bidang Pengelolaan Sampah
              </h1>
            </div>
            <p className="text-lg opacity-90 max-w-3xl mx-auto">
              Mewujudkan Kota Tasikmalaya yang bersih dan sehat melalui pengelolaan 
              sampah yang terpadu dan berkelanjutan
            </p>
          </div>
        </div>
      </section>


      <div className="container mx-auto px-4 py-12">
        {/* Deskripsi Bidang Pengelolaan Sampah */}
        <section className="max-w-6xl mx-auto mb-8">
          <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8">
            <div className="prose dark:prose-invert max-w-none">
              <h2 className="text-3xl text-center font-bold text-gray-800 dark:text-white mb-6 border-b-4 border-green-500 pb-2">Tentang Bidang Pengelolaan Sampah</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-0 indent-8">
                <span className="font-bold">Bidang Pengelolaan Sampah</span> mempunyai tugas pokok mengoordinasikan perumusan kebijakan dan penyelenggaraan kebijakan pengelolaan sampah dan kemitraan lingkungan hidup.
              </p>
            </div>
          </div>
        </section>

        {/* Rincian Tugas Bidang Tata Lingkungan */}
        <section className="max-w-6xl mx-auto mb-12">
          <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8">
            <div className="prose dark:prose-invert max-w-none">
              <h3 className="text-3xl text-center font-bold text-gray-800 dark:text-white mb-6 border-b-4 border-green-500 pb-2">Rincian tugas Bidang Pengelolaan Sampah:</h3>
              {(() => {
                const tugas = [
                  "Menyelenggarakan penyusunan rencana program kerja dan target kinerja Bidang Pengelolaan Sampah sesuai perjanjian kinerja;",
                  "Melaksanakan perumusan strategi pelaksanaan pencapaian target kinerja termasuk di dalamnya pembentukan tim kerja dan pelibatan jabatanjabatan yang diperlukan dalam pencapaian target kinerja;",
                  "Menyelenggarakan perumusan kebijakan teknis bidang pengelolaan sampah dan kemitraan lingkungan hidup;",
                  "Mengoordinasikan perencanaan, penyediaan dan pemeliharaan sarana prasarana pengelolaan persampahan;",
                  "Mengoordinasikan penyelenggaraan penanganan dan pengurangan sampah;",
                  "Mengoordinasikan pelayanan retribusi pelayanan persampahan;",
                  "Mengoordinasikan upaya pemberdayaan dan peningkatan peran serta masyarakat serta kerjasama dalam pengelolaan lingkungan hidup termasuk pengelolaan sampah;",
                  "Menyelenggarakan pemberian penghargaan lingkungan hidup;",
                  "Mengoordinasikan fasilitasi dan pengawasan pemenuhan ketentuan di Bidang Pengelolaan Sampah;",
                  "Menyelenggarakan sosialisasi dan pembinaan pengembangan sumber daya manusia di bidang lingkungan hidup;",
                  "Melaksanakan pemantauan, evaluasi dan laporan yang berkaitan dengan tugas Bidang Pengelolaan Sampah;",
                  "Melaksanakan pembinaan kinerja jabatan fungsional dan jabatan pelaksana yang ditempatkan di Bidang Pengelolaan Sampah;",
                  "Melaksanakan penyediaan sarana dan prasarana, tata kelola serta sumber daya dalam rangka pencapaian target kinerja oleh jabatan fungsional dan jabatan pelaksana yang berada di bawahnya;",
                  "Melaksanakan koordinasi dengan unit kerja terkait; dan",
                  "Melaksanakan tugas kedinasan lain sesuai dengan tugas dan fungsinya."
                ];
                const [showAll, setShowAll] = useState(false);
                const [height, setHeight] = useState(0);
                const contentRef = useRef<HTMLUListElement>(null);
                const tugasPendek = tugas.slice(0, 5);
                useEffect(() => {
                  if (showAll && contentRef.current) {
                    setHeight(contentRef.current.scrollHeight);
                  } else {
                    setHeight(0);
                  }
                }, [showAll]);
                return (
                  <>
                    <div
                      style={{
                        height: showAll ? height : 0,
                        overflow: 'hidden',
                        transition: 'height 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                      }}
                      aria-hidden={!showAll}
                    >
                      <ul
                        ref={contentRef}
                        className={
                          (showAll ? 'opacity-100 transition-opacity duration-500' : 'opacity-0 transition-opacity duration-300') +
                          ' list-decimal pl-6 space-y-3 text-gray-700 dark:text-gray-300'
                        }
                      >
                        {showAll && tugas.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    {!showAll && (
                      <ul className="list-decimal pl-6 space-y-3 text-gray-700 dark:text-gray-300">
                        {tugasPendek.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    )}
                    <div className="text-center mt-6">
                      <button
                        className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition duration-300"
                        onClick={() => setShowAll((v) => !v)}
                      >
                        {showAll ? 'Sembunyikan' : 'Lihat Selengkapnya'}
                      </button>
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        </section>
        {/* Back to Bidang */}
        <section>
          <div className="text-center">
            <a href="/bidang" className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">Kembali ke Halaman Bidang Kerja</a>
          </div>
        </section>        
      </div>
    </div>
  );
};

export default BidangSampahPage;