import Link from "next/link";
import { FileText, ClipboardList, BarChart2, FileCheck, Download } from "lucide-react";

const fileList = [
  {
    title: "Formulir Permohonan Izin Lingkungan",
    desc: "Formulir resmi pengajuan izin lingkungan untuk pelaku usaha dan masyarakat.",
    url: "#",
    icon: ClipboardList,
    color: "text-cyan-600 dark:text-cyan-400"
  },
  {
    title: "Laporan Kinerja DLH 2023",
    desc: "Laporan tahunan kinerja Dinas Lingkungan Hidup Kota Tasikmalaya tahun 2023.",
    url: "#",
    icon: BarChart2,
    color: "text-blue-600 dark:text-blue-400"
  },
  {
    title: "Peraturan Walikota No. 12 Tahun 2024",
    desc: "Peraturan tentang pengelolaan sampah rumah tangga dan sejenisnya.",
    url: "#",
    icon: FileCheck,
    color: "text-green-600 dark:text-green-400"
  },
  {
    title: "Panduan Pengajuan Izin Lingkungan",
    desc: "Panduan lengkap proses pengajuan izin lingkungan.",
    url: "#",
    icon: FileText,
    color: "text-purple-600 dark:text-purple-400"
  }
];

export default function FileDownload() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-3">
              <Download className="w-9 h-9 text-white" />
              Download File
            </h1>
            <p className="text-xl md:text-2xl opacity-90">
              Unduh dokumen dan formulir DLH Kota Tasikmalaya
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 md:p-12 border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-8 text-center flex items-center justify-center gap-2">
              <Download className="w-7 h-7 text-cyan-600 dark:text-cyan-400" />
              Daftar File Download
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {fileList.map((file, idx) => {
                const Icon = file.icon;
                return (
                  <div key={idx} className="flex flex-col md:flex-row items-center md:items-start bg-gray-50 dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
                    <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                      <Icon className={`w-10 h-10 ${file.color}`} />
                    </div>
                    <div className="flex-1 text-center md:text-left">
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">{file.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{file.desc}</p>
                      <a
                        href={file.url}
                        className="inline-flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
                        download
                      >
                        <Download className="w-5 h-5" />
                        Download
                      </a>
                    </div>
                  </div>
                );
              })}
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
