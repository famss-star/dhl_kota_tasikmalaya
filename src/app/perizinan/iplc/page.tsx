"use client";

import React, { useState } from "react";
import IplcSubmissionForm from "@/components/public/IplcSubmissionForm";
import RecentPerizinan from "@/components/public/RecentPerizinan";
import PageContentSection from "@/components/PageContentSection";

const PelayananIplcPage = () => {
  const [showForm, setShowForm] = useState(false);

  if (showForm) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Header */}
        <section className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-8">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-2xl md:text-3xl font-bold">
                Pengajuan IPLC Online
              </h1>
              <p className="text-lg opacity-90 mt-2">
                Formulir Pengajuan Izin Perlindungan dan Pengelolaan Lingkungan Hidup
              </p>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-8">
          <IplcSubmissionForm />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center min-h-[120px] flex flex-col justify-center">
            <div className="flex flex-col items-center justify-center mb-4">
              <h1 className="text-3xl md:text-5xl font-bold text-center leading-tight">
                Pelayanan IPLC
              </h1>
            </div>
            <p className="text-lg opacity-90 max-w-3xl mx-auto">
              Izin Perlindungan dan Pengelolaan Lingkungan Hidup untuk Usaha dan/atau Kegiatan
              sebagai prasyarat izin usaha
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        
        {/* Informasi Umum Section */}
        <section className="max-w-6xl mx-auto mb-12">
          <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8">
            <PageContentSection page="iplc" section="about" />
          </div>
        </section>

        {/* Dasar Hukum Section */}
        <section className="max-w-6xl mx-auto mb-12">
          <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8">
            <PageContentSection page="iplc" section="legal" />
          </div>
        </section>

        {/* Prosedur Section */}
        <section className="max-w-6xl mx-auto mb-12">
          <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8">
            <PageContentSection page="iplc" section="procedure" />
          </div>
        </section>

        {/* Biaya dan Waktu Section */}
        <section className="max-w-6xl mx-auto mb-12">
          <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8">
            <PageContentSection page="iplc" section="cost" />
          </div>
        </section>

        {/* Kontak Section */}
        <section className="max-w-6xl mx-auto mb-12">
          <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8">
            <PageContentSection page="iplc" section="contact" />
          </div>
        </section>
        
        {/* Recent IPLC Section */}
        <RecentPerizinan 
          type="iplc"
          title="IPLC"
          description="Daftar IPLC yang telah disetujui dan diterbitkan oleh Dinas Lingkungan Hidup Kota Tasikmalaya"
        />

        {/* Back to Profile */}
        <section>
          <div className="text-center space-y-4">
            <button
              onClick={() => setShowForm(true)}
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 mr-4"
            >
              📝 Ajukan IPLC Online
            </button>
            <a 
              href="/perizinan" 
              className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Kembali ke Halaman Pelayanan
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PelayananIplcPage;
