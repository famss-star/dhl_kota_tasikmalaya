import Link from "next/link";
import { FileText, Download } from "lucide-react";

const dokumenList = [
  {
    title: "Peraturan Walikota No. 12 Tahun 2024",
    desc: "Tentang Pengelolaan Sampah Rumah Tangga dan Sampah Sejenis Sampah Rumah Tangga.",
    url: "#",
    date: "2024-03-10"
  },
  {
    title: "Laporan Kinerja DLH 2023",
    desc: "Laporan tahunan kinerja Dinas Lingkungan Hidup Kota Tasikmalaya tahun 2023.",
    url: "#",
    date: "2024-01-15"
  },
  {
    title: "Panduan Pengajuan Izin Lingkungan",
    desc: "Panduan lengkap proses pengajuan izin lingkungan untuk pelaku usaha dan masyarakat.",
    url: "#",
    date: "2023-11-20"
  },
  {
    title: "Brosur Program Bank Sampah",
    desc: "Informasi dan tata cara partisipasi dalam program bank sampah DLH.",
    url: "#",
    date: "2023-09-05"
  }
];

export default function Dokumen() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center min-h-[120px] flex flex-col justify-center">
            <div className="flex flex-col items-center justify-center mb-4">
              <h1 className="text-3xl md:text-5xl font-bold text-center leading-tight">
                Dokumen & Publikasi
              </h1>
            </div>
            <p className="text-lg opacity-90 max-w-3xl mx-auto">
                Akses dokumen resmi DLH Kota Tasikmalaya
            </p>
          </div>
        </div>
      </section>      

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 md:p-12 border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-8 text-center flex items-center justify-center gap-2">
              <FileText className="w-7 h-7 text-purple-600 dark:text-purple-400" />
              Daftar Dokumen & Publikasi
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {dokumenList.map((doc, idx) => (
                <div key={idx} className="flex flex-col md:flex-row items-center md:items-start bg-gray-50 dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
                  <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                    <FileText className="w-10 h-10 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">{doc.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{doc.desc}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">Diterbitkan: {new Date(doc.date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    <a
                      href={doc.url}
                      className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
                      download
                    >
                      <Download className="w-5 h-5" />
                      Download
                    </a>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10 text-center">
              <Link
                href="/"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
              >
                Kembali ke Beranda
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
