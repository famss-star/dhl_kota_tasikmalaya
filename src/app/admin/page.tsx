"use client";

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-gradient-to-r from-gray-800 to-green-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Admin Dashboard</h1>
            <p className="text-xl md:text-2xl opacity-90">Selamat datang di halaman admin DLH Kota Tasikmalaya</p>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-12 border border-gray-200 dark:border-gray-700 text-center">
          <div className="text-6xl mb-6">🛠️</div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Fitur admin akan segera tersedia.</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">Silakan hubungi pengelola untuk akses lebih lanjut.</p>
        </div>
      </div>
    </div>
  );
}
