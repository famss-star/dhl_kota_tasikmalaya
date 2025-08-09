"use client";

import { useState } from "react";
import { Plus, Edit, Trash2, Newspaper } from "lucide-react";

// Dummy data berita/artikel
const initialBerita = [
  {
    id: 1,
    judul: "DLH Tasikmalaya Gelar Aksi Bersih Sungai",
    tanggal: "2025-07-20",
    penulis: "Admin DLH",
    status: "Publish",
    ringkasan: "Aksi bersih sungai melibatkan masyarakat dan komunitas lingkungan."
  },
  {
    id: 2,
    judul: "Sosialisasi Pengelolaan Sampah di Sekolah",
    tanggal: "2025-07-15",
    penulis: "Admin DLH",
    status: "Draft",
    ringkasan: "DLH mengadakan sosialisasi pengelolaan sampah di beberapa sekolah dasar."
  }
];

export default function AdminBerita() {
  const [berita, setBerita] = useState(initialBerita);

  // Handler dummy
  const handleDelete = (id: number) => {
    setBerita(berita.filter((b) => b.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-gradient-to-r from-yellow-600 to-green-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-3">
              <Newspaper className="w-9 h-9 text-white" />
              Manajemen Berita
            </h1>
            <p className="text-xl md:text-2xl opacity-90">Kelola data berita untuk website DLH Kota Tasikmalaya</p>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-8xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 md:p-12 border border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
              <Newspaper className="w-7 h-7 text-yellow-600 dark:text-yellow-400" />
              Daftar Berita
            </h2>
            <button className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300">
              <Plus className="w-5 h-5" />
              Tambah Berita
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700">
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">Judul</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">Tanggal</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">Penulis</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {berita.map((b) => (
                  <tr key={b.id}>
                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-white max-w-xs whitespace-normal">{b.judul}</td>
                    <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{new Date(b.tanggal).toLocaleDateString('id-ID')}</td>
                    <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{b.penulis}</td>
                    <td className="px-4 py-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${b.status === 'Publish' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'}`}>{b.status}</span>
                    </td>
                    <td className="px-4 py-3 flex gap-2">
                      <button className="inline-flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded transition text-xs">
                        <Edit className="w-4 h-4" /> Edit
                      </button>
                      <button onClick={() => handleDelete(b.id)} className="inline-flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded transition text-xs">
                        <Trash2 className="w-4 h-4" /> Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
