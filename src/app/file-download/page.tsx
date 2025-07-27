import Link from "next/link";
export default function FileDownload() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              📥 Download File
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
          
          {/* Coming Soon */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-12 border border-gray-200 dark:border-gray-700 text-center">
            <div className="text-6xl mb-6">📂</div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
              Halaman Dalam Pengembangan
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Fitur download file sedang dalam tahap pengembangan. 
              Repository dokumen dan formulir akan segera tersedia.
            </p>
            
            {/* Preview Features */}
            <div className="grid md:grid-cols-3 gap-6 mt-8 mb-8">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                <div className="text-3xl mb-3">📋</div>
                <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Formulir Perizinan</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Download formulir aplikasi perizinan lingkungan</p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                <div className="text-3xl mb-3">📊</div>
                <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Laporan Tahunan</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Akses laporan kinerja dan data lingkungan</p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                <div className="text-3xl mb-3">📄</div>
                <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Dokumen Kebijakan</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Download peraturan dan kebijakan lingkungan</p>
              </div>
            </div>

            <Link
              href="/"
              className="inline-block bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
            >
              Kembali ke Beranda
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
