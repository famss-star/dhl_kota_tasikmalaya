"use client";

import { useState } from "react";
import { Plus, Edit, Trash2, FileText } from "lucide-react";

// Dummy data artikel
const initialArtikel = [
  {
    id: 1,
    judul: "Tips Mengurangi Sampah Plastik di Rumah",
    tanggal: "2025-07-10",
    penulis: "DLH Kota Tasikmalaya",
    status: "Publish",
    ringkasan: "Langkah-langkah sederhana untuk mengurangi sampah plastik sehari-hari."
  },
  {
    id: 2,
    judul: "Manfaat Menanam Pohon di Lingkungan Sekitar",
    tanggal: "2025-06-28",
    penulis: "DLH Kota Tasikmalaya",
    status: "Draft",
    ringkasan: "Pentingnya menanam pohon untuk kualitas udara dan lingkungan."
  }
];

export default function AdminArtikel() {
  const [artikel, setArtikel] = useState(initialArtikel);

  // Handler dummy
  const handleDelete = (id: number) => {
    setArtikel(artikel.filter((a) => a.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-gradient-to-r from-pink-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-3">
              <FileText className="w-9 h-9 text-white" />
              Manajemen Artikel
            </h1>
            <p className="text-xl md:text-2xl opacity-90">Kelola data artikel untuk website DLH Kota Tasikmalaya</p>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 md:p-12 border border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
              <FileText className="w-7 h-7 text-pink-600 dark:text-pink-400" />
              Daftar Artikel
            </h2>
            <button className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300">
              <Plus className="w-5 h-5" />
              Tambah Artikel
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
                {artikel.map((a) => (
                  <tr key={a.id}>
                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-white max-w-xs whitespace-normal">{a.judul}</td>
                    <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{new Date(a.tanggal).toLocaleDateString('id-ID')}</td>
                    <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{a.penulis}</td>
                    <td className="px-4 py-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${a.status === 'Publish' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'}`}>{a.status}</span>
                    </td>
                    <td className="px-4 py-3 flex gap-2">
                      <button className="inline-flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded transition text-xs">
                        <Edit className="w-4 h-4" /> Edit
                      </button>
                      <button onClick={() => handleDelete(a.id)} className="inline-flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded transition text-xs">
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
