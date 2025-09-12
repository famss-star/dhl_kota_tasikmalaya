"use client";

import React, { useState } from "react";
import AmdalSubmissionForm from "@/components/public/AmdalSubmissionForm";
import RecentPerizinan from "@/components/public/RecentPerizinan";
import PageContentSection from "@/components/PageContentSection";

const PelayananAmdalPage = () => {
  const [showForm, setShowForm] = useState(false);

  if (showForm) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Header */}
        <section className="bg-gradient-to-r from-blue-600 to-teal-600 text-white py-8">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-2xl md:text-3xl font-bold">
                Pengajuan AMDAL Online
              </h1>
              <p className="text-lg opacity-90 mt-2">
                Formulir Pengajuan Analisis Mengenai Dampak Lingkungan
              </p>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-8">
          <AmdalSubmissionForm />
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-teal-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center min-h-[120px] flex flex-col justify-center">
            <div className="flex flex-col items-center justify-center mb-4">
              <h1 className="text-3xl md:text-5xl font-bold text-center leading-tight">
                Pelayanan AMDAL
              </h1>
            </div>
            <p className="text-lg opacity-90 max-w-3xl mx-auto">
              Analisis Mengenai Dampak Lingkungan (AMDAL) untuk pembangunan 
              berkelanjutan di Kota Tasikmalaya
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        
        {/* Informasi Umum Section */}
        <section className="max-w-6xl mx-auto mb-12">
          <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8">
            <PageContentSection page="amdal" section="about" />
          </div>
        </section>

        {/* Dasar Hukum Section */}
        <section className="max-w-6xl mx-auto mb-12">
          <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8">
            <PageContentSection page="amdal" section="legal" />
          </div>
        </section>

        {/* Prosedur Section */}
        <section className="max-w-6xl mx-auto mb-12">
          <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8">
            <PageContentSection page="amdal" section="procedure" />
          </div>
        </section>

        {/* Biaya dan Waktu Section */}
        <section className="max-w-6xl mx-auto mb-12">
          <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8">
            <PageContentSection page="amdal" section="cost" />
          </div>
        </section>

        {/* Kontak Section */}
        <section className="max-w-6xl mx-auto mb-12">
          <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8">
            <PageContentSection page="amdal" section="contact" />
          </div>
        </section>
        
        {/* Recent AMDAL Section */}
        <RecentPerizinan 
          type="amdal"
          title="AMDAL"
          description="Daftar AMDAL yang telah disetujui dan diterbitkan oleh Dinas Lingkungan Hidup Kota Tasikmalaya"
        />

        {/* Back to Profile */}
        <section>
          <div className="text-center space-y-4">
            <button
              onClick={() => setShowForm(true)}
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 mr-4"
            >
              📝 Ajukan AMDAL Online
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

export default PelayananAmdalPage;