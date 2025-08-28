"use client";

import React from 'react';
import { AlertTriangle, Phone, Mail, MessageSquare, Clock, Shield, CheckCircle, FileText, Camera, MapPin } from 'lucide-react';

export default function PengaduanPencemaranPage() {
  const complaintTypes = [
    {
      title: "Pencemaran Air",
      description: "Pencemaran sungai, danau, atau sumber air lainnya",
      icon: <div className="w-8 h-8 bg-blue-500 rounded-full"></div>,
      examples: ["Pembuangan limbah ke sungai", "Air berubah warna/bau", "Kematian ikan secara massal"]
    },
    {
      title: "Pencemaran Udara",
      description: "Pencemaran yang mengakibatkan penurunan kualitas udara",
      icon: <div className="w-8 h-8 bg-gray-500 rounded-full"></div>,
      examples: ["Asap dari cerobong industri", "Bau menyengat", "Debu berlebihan"]
    },
    {
      title: "Pencemaran Tanah",
      description: "Pencemaran atau kerusakan kondisi tanah",
      icon: <div className="w-8 h-8 bg-yellow-600 rounded-full"></div>,
      examples: ["Pembuangan limbah B3", "Tumpahan bahan kimia", "Kerusakan lahan"]
    },
    {
      title: "Pencemaran Suara",
      description: "Kebisingan yang mengganggu kenyamanan lingkungan",
      icon: <div className="w-8 h-8 bg-red-500 rounded-full"></div>,
      examples: ["Kebisingan industri", "Suara mesin berlebihan", "Gangguan aktivitas"]
    }
  ];

  const reportingChannels = [
    {
      channel: "Telepon",
      contact: "(0265) 331-816",
      description: "Lapor langsung via telepon pada jam kerja",
      icon: <Phone className="w-6 h-6" />,
      availability: "Senin - Jumat, 08:00 - 16:00 WIB"
    },
    {
      channel: "Email",
      contact: "pengaduan@dlh.tasikmalayakota.go.id",
      description: "Kirim laporan lengkap dengan dokumentasi",
      icon: <Mail className="w-6 h-6" />,
      availability: "24 jam (respon 1x24 jam)"
    },
    {
      channel: "WhatsApp",
      contact: "+62 821 XXXX XXXX",
      description: "Lapor cepat dengan foto dan lokasi",
      icon: <MessageSquare className="w-6 h-6" />,
      availability: "24 jam (respon prioritas)"
    },
    {
      channel: "Datang Langsung",
      contact: "Jl. Yudanegara No. 25",
      description: "Kunjungi kantor DLH untuk laporan kompleks",
      icon: <MapPin className="w-6 h-6" />,
      availability: "Senin - Jumat, 08:00 - 15:00 WIB"
    }
  ];

  const requiredInfo = [
    "Identitas pelapor (nama, alamat, no. telepon)",
    "Lokasi kejadian yang detail",
    "Waktu kejadian (kapan dimulai/terdeteksi)",
    "Deskripsi kejadian yang lengkap",
    "Foto atau video sebagai bukti",
    "Pihak yang diduga bertanggung jawab (jika diketahui)"
  ];

  const processSteps = [
    {
      step: 1,
      title: "Penerimaan Laporan",
      description: "Laporan diterima dan dicatat dalam sistem",
      duration: "Segera",
      icon: <FileText className="w-6 h-6" />
    },
    {
      step: 2,
      title: "Verifikasi Awal",
      description: "Pengecekan kelengkapan informasi dan validitas",
      duration: "1-2 hari",
      icon: <CheckCircle className="w-6 h-6" />
    },
    {
      step: 3,
      title: "Investigasi Lapangan",
      description: "Tim teknis melakukan pengecekan di lokasi",
      duration: "3-7 hari",
      icon: <Camera className="w-6 h-6" />
    },
    {
      step: 4,
      title: "Tindak Lanjut",
      description: "Pengambilan tindakan sesuai hasil investigasi",
      duration: "Sesuai kasus",
      icon: <Shield className="w-6 h-6" />
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <AlertTriangle className="w-16 h-16 mx-auto mb-4 text-white" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Pengaduan Pencemaran Lingkungan
            </h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
              Laporkan dugaan pencemaran dan kerusakan lingkungan hidup di Kota Tasikmalaya
            </p>
          </div>
        </div>
      </div>

      {/* Emergency Alert */}
      <div className="bg-red-100 dark:bg-red-900/20 border-l-4 border-red-500 p-4">
        <div className="container mx-auto">
          <div className="flex items-center">
            <AlertTriangle className="w-6 h-6 text-red-600 mr-3" />
            <div>
              <span className="font-semibold text-red-800 dark:text-red-200">Pengaduan Darurat:</span>
              <span className="text-red-700 dark:text-red-300 ml-2">
                Untuk kasus pencemaran akut yang mengancam kesehatan, segera hubungi: 
                <a href="tel:(0265)331-816" className="font-bold underline ml-1">(0265) 331-816</a>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Types of Complaints */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-12">
            Jenis Pencemaran yang Dapat Dilaporkan
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {complaintTypes.map((type, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-4">
                  {type.icon}
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white ml-3">
                    {type.title}
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {type.description}
                </p>
                <div>
                  <h4 className="font-medium text-gray-800 dark:text-white mb-2">Contoh:</h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                    {type.examples.map((example, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="w-1 h-1 bg-gray-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                        {example}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reporting Channels */}
      <div className="bg-gray-100 dark:bg-gray-800 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-12">
            Cara Melaporkan
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {reportingChannels.map((channel, index) => (
              <div key={index} className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    {channel.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                      {channel.channel}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-2">
                      {channel.description}
                    </p>
                    <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded">
                      <div className="font-semibold text-orange-800 dark:text-orange-200">
                        {channel.contact}
                      </div>
                      <div className="text-sm text-orange-700 dark:text-orange-300">
                        {channel.availability}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Required Information */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                Informasi yang Diperlukan
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Untuk mempercepat proses penanganan, pastikan Anda menyertakan informasi berikut:
              </p>
              <div className="space-y-3">
                {requiredInfo.map((info, index) => (
                  <div key={index} className="flex items-start bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{info}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                Proses Penanganan
              </h2>
              <div className="space-y-6">
                {processSteps.map((step, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      {step.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mr-3">
                          {step.title}
                        </h3>
                        <span className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 px-2 py-1 rounded text-sm font-medium">
                          {step.duration}
                        </span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-red-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">
            Lindungi Lingkungan Bersama
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Partisipasi Anda sangat penting untuk menjaga kelestarian lingkungan Kota Tasikmalaya
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:(0265)331-816"
              className="bg-white text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300 flex items-center justify-center"
            >
              <Phone className="w-5 h-5 mr-2" />
              Lapor Sekarang
            </a>
            <a
              href="mailto:pengaduan@dlh.tasikmalayakota.go.id"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-red-600 transition-colors duration-300 flex items-center justify-center"
            >
              <Mail className="w-5 h-5 mr-2" />
              Kirim Laporan Detail
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
