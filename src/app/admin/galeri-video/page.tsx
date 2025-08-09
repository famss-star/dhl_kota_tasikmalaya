"use client";

import { FileVideo } from "lucide-react";

export default function AdminGaleriVideo() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-3">
              <FileVideo className="w-9 h-9 text-white" />
              Manajemen Galeri Video
            </h1>
            <p className="text-xl md:text-2xl opacity-90">Kelola galeri video untuk website DLH Kota Tasikmalaya</p>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-8xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 md:p-12 border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-8 flex items-center gap-2">
            <FileVideo className="w-7 h-7 text-green-600 dark:text-green-400" />
            Daftar Galeri Video
          </h2>
          <div className="text-gray-600 dark:text-gray-300">(Dummy data galeri video di sini)</div>
        </div>
      </div>
    </div>
  );
}
