"use client";

import React from 'react';
import { Users, FileText, Phone, Mail, MapPin, Clock, CheckCircle } from 'lucide-react';

export default function PelayananUmumPage() {
  const services = [
    {
      title: "Konsultasi Lingkungan",
      description: "Layanan konsultasi terkait masalah lingkungan hidup",
      icon: <Users className="w-8 h-8 text-green-600" />,
      features: ["Konsultasi gratis", "Nasihat ahli", "Solusi tepat"]
    },
    {
      title: "Informasi Peraturan",
      description: "Akses informasi peraturan lingkungan hidup terbaru",
      icon: <FileText className="w-8 h-8 text-green-600" />,
      features: ["Peraturan terbaru", "Panduan lengkap", "Update berkala"]
    },
    {
      title: "Layanan Pengaduan",
      description: "Sampaikan pengaduan terkait lingkungan hidup",
      icon: <Phone className="w-8 h-8 text-green-600" />,
      features: ["Respon cepat", "Follow-up berkala", "Solusi tepat"]
    }
  ];

  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6 text-green-600" />,
      title: "Telepon",
      value: "(0265) 331-816"
    },
    {
      icon: <Mail className="w-6 h-6 text-green-600" />,
      title: "Email",
      value: "dlh@tasikmalayakota.go.id"
    },
    {
      icon: <MapPin className="w-6 h-6 text-green-600" />,
      title: "Alamat",
      value: "Jl. Yudanegara No. 25, Kota Tasikmalaya"
    },
    {
      icon: <Clock className="w-6 h-6 text-green-600" />,
      title: "Jam Layanan",
      value: "Senin - Jumat: 08:00 - 16:00 WIB"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Pelayanan Umum
            </h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
              Dinas Lingkungan Hidup Kota Tasikmalaya menyediakan berbagai layanan umum untuk masyarakat
            </p>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
              Layanan Kami
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Kami berkomitmen memberikan pelayanan terbaik untuk masyarakat Kota Tasikmalaya
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  {service.icon}
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white ml-3">
                    {service.title}
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-green-50 dark:bg-gray-800 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
              Informasi Kontak
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Hubungi kami untuk mendapatkan pelayanan yang Anda butuhkan
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <div key={index} className="bg-white dark:bg-gray-700 rounded-lg p-6 text-center hover:shadow-lg transition-shadow duration-300">
                <div className="flex justify-center mb-4">
                  {info.icon}
                </div>
                <h3 className="font-semibold text-gray-800 dark:text-white mb-2">
                  {info.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {info.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How to Get Service Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
              Cara Mendapatkan Layanan
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Ikuti langkah-langkah berikut untuk mendapatkan layanan dari kami
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600 dark:text-green-400">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                Hubungi Kami
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Hubungi kami melalui telepon, email, atau datang langsung ke kantor
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600 dark:text-green-400">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                Konsultasi
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Sampaikan kebutuhan Anda dan dapatkan konsultasi dari petugas kami
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600 dark:text-green-400">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                Dapatkan Layanan
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Dapatkan layanan sesuai dengan kebutuhan dan panduan yang diberikan
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Butuh Bantuan?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Tim kami siap membantu Anda dengan pelayanan terbaik
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:(0265)331-816"
              className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300"
            >
              Hubungi Sekarang
            </a>
            <a
              href="/pengaduan"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors duration-300"
            >
              Sampaikan Pengaduan
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
