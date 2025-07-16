export default function Dokumen() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              📄 Dokumen & Publikasi
            </h1>
            <p className="text-xl md:text-2xl opacity-90">
              Akses dokumen resmi DLH Kota Tasikmalaya
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-12 border border-gray-200 dark:border-gray-700 text-center">
            <div className="text-6xl mb-6">📚</div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
              Halaman Dalam Pengembangan
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Halaman dokumen dan publikasi sedang dalam tahap pengembangan. 
              Fitur download dokumen akan segera tersedia.
            </p>
            <a 
              href="/" 
              className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
            >
              Kembali ke Beranda
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
