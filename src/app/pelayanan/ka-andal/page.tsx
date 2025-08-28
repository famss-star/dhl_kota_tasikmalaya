"use client";

import React from 'react';
import { FileCheck, CheckCircle, Clock, Users, AlertCircle, Download, Phone, Mail } from 'lucide-react';

export default function KAANDALPage() {
  const requirements = [
    "Dokumen Kerangka Acuan (KA)",
    "Surat permohonan yang ditandatangani",
    "Profil perusahaan/pemohon",
    "Peta lokasi dan layout kegiatan",
    "Data baseline lingkungan",
    "Rencana pengelolaan dan pemantauan lingkungan"
  ];

  const process = [
    {
      step: 1,
      title: "Pengajuan Permohonan",
      description: "Pemohon mengajukan permohonan lengkap dengan dokumen pendukung",
      duration: "1 hari"
    },
    {
      step: 2,
      title: "Verifikasi Administratif",
      description: "Tim teknis melakukan verifikasi kelengkapan dokumen",
      duration: "3 hari"
    },
    {
      step: 3,
      title: "Evaluasi Teknis",
      description: "Evaluasi mendalam terhadap Kerangka Acuan ANDAL",
      duration: "14 hari"
    },
    {
      step: 4,
      title: "Rekomendasi",
      description: "Penerbitan rekomendasi persetujuan atau perbaikan",
      duration: "3 hari"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <FileCheck className="w-16 h-16 mx-auto mb-4 text-white" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Rekomendasi Persetujuan KA-ANDAL
            </h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
              Memberikan rekomendasi untuk persetujuan Kerangka Acuan Analisis Dampak Lingkungan (KA-ANDAL)
            </p>
          </div>
        </div>
      </div>

      {/* Overview Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                Tentang Layanan KA-ANDAL
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Kerangka Acuan Analisis Dampak Lingkungan (KA-ANDAL) adalah dokumen yang memuat ruang lingkup 
                serta kedalaman kajian ANDAL. Layanan ini memberikan rekomendasi persetujuan untuk memastikan 
                kualitas dan kesesuaian KA-ANDAL dengan peraturan yang berlaku.
              </p>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                  <Clock className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <div className="font-semibold text-gray-800 dark:text-white">21 Hari</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Waktu Proses</div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                  <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="font-semibold text-gray-800 dark:text-white">Tim Ahli</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Evaluator</div>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                Persyaratan Dokumen
              </h3>
              <ul className="space-y-3">
                {requirements.map((req, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Process Section */}
      <div className="bg-gray-100 dark:bg-gray-800 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-12">
            Alur Proses Evaluasi
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {process.map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-2">
                  {item.description}
                </p>
                <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm font-medium inline-block">
                  {item.duration}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Important Notes */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-6 rounded-lg">
            <div className="flex items-start">
              <AlertCircle className="w-6 h-6 text-yellow-600 mr-3 mt-0.5" />
              <div>
                <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                  Catatan Penting
                </h3>
                <ul className="text-yellow-700 dark:text-yellow-300 space-y-1">
                  <li>• KA-ANDAL harus disusun sesuai dengan Peraturan Menteri LHK yang berlaku</li>
                  <li>• Dokumen harus lengkap dan sesuai dengan format yang ditentukan</li>
                  <li>• Konsultasi awal dapat dilakukan sebelum pengajuan formal</li>
                  <li>• Rekomendasi berlaku untuk proses penyusunan ANDAL selanjutnya</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-green-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">
            Butuh Konsultasi?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Tim ahli kami siap membantu proses evaluasi KA-ANDAL Anda
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:(0265)331-816"
              className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300 flex items-center justify-center"
            >
              <Phone className="w-5 h-5 mr-2" />
              Hubungi Kami
            </a>
            <a
              href="mailto:dlh@tasikmalayakota.go.id"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors duration-300 flex items-center justify-center"
            >
              <Mail className="w-5 h-5 mr-2" />
              Kirim Email
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
