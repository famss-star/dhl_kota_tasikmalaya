"use client";

import React from 'react';
import { Shield, CheckCircle, Clock, Users, AlertTriangle, FileSearch, Phone, Mail } from 'lucide-react';

export default function KelayakanLingkunganPage() {
  const criteria = [
    {
      title: "Aspek Teknis",
      items: ["Teknologi yang digunakan", "Proses produksi", "Efisiensi operasional"]
    },
    {
      title: "Aspek Lingkungan",
      items: ["Dampak terhadap air", "Dampak terhadap udara", "Dampak terhadap tanah"]
    },
    {
      title: "Aspek Sosial",
      items: ["Dampak terhadap masyarakat", "Kesehatan masyarakat", "Ekonomi lokal"]
    }
  ];

  const documents = [
    "Studi kelayakan lingkungan",
    "Rencana pengelolaan lingkungan",
    "Rencana pemantauan lingkungan",
    "Analisis risiko lingkungan",
    "Data baseline lingkungan",
    "Konsultasi publik (jika diperlukan)"
  ];

  const processSteps = [
    {
      step: 1,
      title: "Pengajuan Dokumen",
      description: "Pemohon menyerahkan dokumen kelayakan lingkungan",
      duration: "1 hari"
    },
    {
      step: 2,
      title: "Verifikasi Dokumen",
      description: "Pengecekan kelengkapan dan format dokumen",
      duration: "3 hari"
    },
    {
      step: 3,
      title: "Evaluasi Substansi",
      description: "Penilaian mendalam aspek teknis dan lingkungan",
      duration: "10 hari"
    },
    {
      step: 4,
      title: "Site Visit",
      description: "Kunjungan lapangan untuk verifikasi (jika diperlukan)",
      duration: "2 hari"
    },
    {
      step: 5,
      title: "Penyusunan Rekomendasi",
      description: "Finalisasi rekomendasi kelayakan",
      duration: "5 hari"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <Shield className="w-16 h-16 mx-auto mb-4 text-white" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Rekomendasi Kelayakan Lingkungan
            </h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
              Menilai dan memberikan rekomendasi kelayakan lingkungan untuk kegiatan atau proyek tertentu
            </p>
          </div>
        </div>
      </div>

      {/* Overview Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
              Tentang Penilaian Kelayakan Lingkungan
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Penilaian kelayakan lingkungan merupakan evaluasi komprehensif terhadap potensi dampak 
              lingkungan dari suatu kegiatan atau proyek. Evaluasi ini mempertimbangkan aspek teknis, 
              lingkungan, dan sosial untuk memastikan keberlanjutan lingkungan.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {criteria.map((criterion, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 text-center">
                  {criterion.title}
                </h3>
                <ul className="space-y-2">
                  {criterion.items.map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Process Section */}
      <div className="bg-gray-100 dark:bg-gray-800 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-12">
            Proses Evaluasi Kelayakan
          </h2>
          <div className="max-w-4xl mx-auto">
            {processSteps.map((step, index) => (
              <div key={index} className="flex items-start mb-8 last:mb-0">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mr-6 flex-shrink-0 font-bold">
                  {step.step}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-2">
                    {step.description}
                  </p>
                  <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium">
                    {step.duration}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Requirements Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                Dokumen yang Diperlukan
              </h2>
              <div className="space-y-3">
                {documents.map((doc, index) => (
                  <div key={index} className="flex items-center bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                    <FileSearch className="w-6 h-6 text-blue-600 mr-3" />
                    <span className="text-gray-700 dark:text-gray-300">{doc}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                Informasi Penting
              </h2>
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-6 rounded-lg mb-6">
                <div className="flex items-start">
                  <AlertTriangle className="w-6 h-6 text-yellow-600 mr-3 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                      Catatan Evaluasi
                    </h3>
                    <ul className="text-yellow-700 dark:text-yellow-300 space-y-1 text-sm">
                      <li>• Evaluasi dilakukan berdasarkan standar lingkungan yang berlaku</li>
                      <li>• Rekomendasi dapat berupa layak, layak bersyarat, atau tidak layak</li>
                      <li>• Konsultasi publik mungkin diperlukan untuk proyek besar</li>
                      <li>• Hasil evaluasi berlaku untuk periode waktu tertentu</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow text-center">
                  <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="font-semibold text-gray-800 dark:text-white">21 Hari</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Maksimal Proses</div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow text-center">
                  <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <div className="font-semibold text-gray-800 dark:text-white">Tim Ahli</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Multidisiplin</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">
            Konsultasi Kelayakan Lingkungan
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Diskusikan proyek Anda dengan tim ahli lingkungan kami
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:(0265)331-816"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300 flex items-center justify-center"
            >
              <Phone className="w-5 h-5 mr-2" />
              Hubungi Sekarang
            </a>
            <a
              href="mailto:dlh@tasikmalayakota.go.id"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-300 flex items-center justify-center"
            >
              <Mail className="w-5 h-5 mr-2" />
              Konsultasi Email
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
