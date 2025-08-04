"use client";

import { useState } from "react";
import { Plus, Edit, Trash2, Image } from "lucide-react";
import NextImage from "next/image";

const initialGaleri = [
  {
    id: 1,
    judul: "Aksi Bersih Sungai",
    tanggal: "2025-07-18",
    url: "https://via.placeholder.com/120x80?text=Foto+1",
    status: "Publish"
  },
  {
    id: 2,
    judul: "Penanaman Pohon",
    tanggal: "2025-07-10",
    url: "https://via.placeholder.com/120x80?text=Foto+2",
    status: "Draft"
  }
];

export default function AdminGaleri() {
  const [galeri, setGaleri] = useState(initialGaleri);

  const handleDelete = (id: number) => {
    setGaleri(galeri.filter((g) => g.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-gradient-to-r from-pink-600 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-3">
              {/* eslint-disable-next-line jsx-a11y/alt-text */}
              <Image className="w-9 h-9 text-white" aria-hidden="true" focusable="false" />
              Manajemen Galeri
            </h1>
            <p className="text-xl md:text-2xl opacity-90">Kelola data galeri foto untuk website DLH Kota Tasikmalaya</p>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 md:p-12 border border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
              {/* eslint-disable-next-line jsx-a11y/alt-text */}
              <Image className="w-7 h-7 text-pink-600 dark:text-pink-400" aria-hidden="true" focusable="false" />
              Daftar Galeri Foto
            </h2>
            <button className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300">
              <Plus className="w-5 h-5" />
              Tambah Foto
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700">
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">Foto</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">Judul</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">Tanggal</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {galeri.map((g) => (
                  <tr key={g.id}>
                    <td className="px-4 py-3">
                      <NextImage
                        src={g.url}
                        alt={g.judul || "Foto galeri"}
                        width={120}
                        height={80}
                        className="w-24 h-16 object-cover rounded"
                      />
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-white max-w-xs whitespace-normal">{g.judul}</td>
                    <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{new Date(g.tanggal).toLocaleDateString('id-ID')}</td>
                    <td className="px-4 py-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${g.status === 'Publish' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'}`}>{g.status}</span>
                    </td>
                    <td className="px-4 py-3 flex gap-2">
                      <button className="inline-flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded transition text-xs">
                        <Edit className="w-4 h-4" /> Edit
                      </button>
                      <button onClick={() => handleDelete(g.id)} className="inline-flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded transition text-xs">
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
