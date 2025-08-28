"use client";

import React from 'react';
import { FileCheck, CheckCircle, Clock, Building, AlertCircle, Download, Phone, Mail, ArrowRight } from 'lucide-react';

export default function SPPLPage() {
  const applicableBusinesses = [
    "Usaha Mikro dan Kecil (UMK)",
    "Kegiatan yang tidak wajib AMDAL dan UKL-UPL",
    "Usaha perdagangan dan jasa skala kecil",
    "Industri rumah tangga",
    "Kegiatan dengan risiko lingkungan rendah"
  ];

  const requirements = [
    "Formulir permohonan SPPL",
    "Fotocopy identitas pemohon",
    "Fotocopy izin usaha (jika ada)",
    "Denah lokasi dan layout usaha",
    "Deskripsi kegiatan usaha",
    "Rencana pengelolaan lingkungan sederhana"
  ];

  const processFlow = [
    {
      step: 1,
      title: "Pengajuan Berkas",
      description: "Pemohon menyerahkan formulir SPPL dan dokumen pendukung",
      duration: "1 hari",
      icon: <FileCheck className="w-6 h-6" />
    },
    {
      step: 2,
      title: "Verifikasi Administratif",
      description: "Pengecekan kelengkapan berkas oleh petugas",
      duration: "2 hari",
      icon: <CheckCircle className="w-6 h-6" />
    },
    {
      step: 3,
      title: "Evaluasi Dokumen",
      description: "Penilaian kesesuaian dengan kriteria SPPL",
      duration: "3 hari",
      icon: <Building className="w-6 h-6" />
    },
    {
      step: 4,
      title: "Penerbitan SPPL",
      description: "Persetujuan SPPL diterbitkan dan dapat diambil",
      duration: "1 hari",
      icon: <Download className="w-6 h-6" />
    }
  ];

  const obligations = [
    "Melaksanakan kegiatan sesuai dengan yang dinyatakan dalam SPPL",
    "Menerapkan upaya pengelolaan lingkungan yang telah direncanakan",
    "Melakukan pemantauan lingkungan secara berkala",
    "Melaporkan pelaksanaan pengelolaan lingkungan setiap 6 bulan",
    "Menyimpan dokumen SPPL dan dapat dipresentasikan saat diperlukan"
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <FileCheck className="w-16 h-16 mx-auto mb-4 text-white" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Persetujuan SPPL
            </h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
              Surat Pernyataan Pengelolaan Lingkungan untuk usaha mikro, kecil, dan kegiatan berisiko rendah
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
                Tentang SPPL
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Surat Pernyataan Pengelolaan Lingkungan (SPPL) adalah dokumen yang berisi pernyataan 
                kesanggupan dari penanggung jawab usaha untuk melakukan pengelolaan lingkungan hidup. 
                SPPL diperlukan untuk usaha atau kegiatan yang tidak wajib memiliki AMDAL atau UKL-UPL.
              </p>
              <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-400 p-4 rounded">
                <h3 className="font-semibold text-green-800 dark:text-green-200 mb-2">Keunggulan SPPL:</h3>
                <ul className="text-green-700 dark:text-green-300 space-y-1">
                  <li>• Proses lebih cepat dan sederhana</li>
                  <li>• Biaya terjangkau untuk UMK</li>
                  <li>• Syarat mudah dipenuhi</li>
                  <li>• Mendukung legalitas usaha</li>
                </ul>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                Usaha yang Memerlukan SPPL
              </h3>
              <ul className="space-y-3">
                {applicableBusinesses.map((business, index) => (
                  <li key={index} className="flex items-start">
                    <ArrowRight className="w-5 h-5 text-purple-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{business}</span>
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
            Alur Proses Persetujuan SPPL
          </h2>
          <div className="max-w-4xl mx-auto">
            {processFlow.map((process, index) => (
              <div key={index} className="flex items-center mb-8 last:mb-0">
                <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center mr-6 flex-shrink-0">
                  {process.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <span className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-2 py-1 rounded text-sm font-medium mr-3">
                      Langkah {process.step}
                    </span>
                    <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium">
                      {process.duration}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                    {process.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {process.description}
                  </p>
                </div>
                {index < processFlow.length - 1 && (
                  <div className="w-px h-12 bg-gray-300 dark:bg-gray-600 ml-8 mr-6"></div>
                )}
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
                Persyaratan Dokumen
              </h2>
              <div className="space-y-3">
                {requirements.map((req, index) => (
                  <div key={index} className="flex items-center bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                    <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{req}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                  <Clock className="w-12 h-12 text-purple-600 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-gray-800 dark:text-white">7 Hari</div>
                  <div className="text-gray-600 dark:text-gray-300">Total Waktu Proses</div>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                Kewajiban Setelah Memperoleh SPPL
              </h2>
              <div className="space-y-3">
                {obligations.map((obligation, index) => (
                  <div key={index} className="flex items-start bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                    <AlertCircle className="w-6 h-6 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{obligation}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-purple-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">
            Ajukan Permohonan SPPL
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Proses cepat dan mudah untuk mendukung legalitas usaha Anda
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:(0265)331-816"
              className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300 flex items-center justify-center"
            >
              <Phone className="w-5 h-5 mr-2" />
              Konsultasi Langsung
            </a>
            <a
              href="mailto:dlh@tasikmalayakota.go.id"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors duration-300 flex items-center justify-center"
            >
              <Mail className="w-5 h-5 mr-2" />
              Download Formulir
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
