import Link from 'next/link';

export default function Informasi() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-teal-600 to-green-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Informasi & Berita
            </h1>
            <p className="text-xl md:text-2xl opacity-90">
              Berita terkini dan informasi penting DLH Kota Tasikmalaya
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          
          {/* Available Features */}
          <section className="mb-12">
            <div className="grid md:grid-cols-2 gap-8">
              <Link href="/informasi/agenda" className="group">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700 group-hover:shadow-2xl transition duration-300 transform group-hover:scale-105">
                  <div className="bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 text-2xl">
                    📅
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 text-center group-hover:text-green-600 dark:group-hover:text-green-400">
                    Agenda Kegiatan
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
                    Lihat jadwal kegiatan dan acara DLH Kota Tasikmalaya
                  </p>
                  <div className="text-center">
                    <span className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300">
                      Lihat Agenda →
                    </span>
                  </div>
                </div>
              </Link>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
                <div className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 text-2xl">
                  📰
                </div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 text-center">
                  Berita Terbaru
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
                  Update berita dan informasi lingkungan hidup terkini
                </p>
                <div className="text-center">
                  <span className="inline-block bg-gray-400 text-white font-semibold py-2 px-6 rounded-lg">
                    Segera Hadir
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Coming Soon Features */}
          <section>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 text-center">
                Fitur yang Akan Datang
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="text-3xl mb-3">📝</div>
                  <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Artikel & Blog</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">Artikel edukatif tentang lingkungan hidup</p>
                </div>
                
                <div className="text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="text-3xl mb-3">📊</div>
                  <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Data & Statistik</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">Data lingkungan hidup Kota Tasikmalaya</p>
                </div>
                
                <div className="text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="text-3xl mb-3">📢</div>
                  <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Pengumuman</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">Pengumuman resmi dan pemberitahuan penting</p>
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
