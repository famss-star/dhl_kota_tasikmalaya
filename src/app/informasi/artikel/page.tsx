export default function ArtikelBlog() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-teal-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center min-h-[120px] flex flex-col justify-center">
            <div className="flex flex-col items-center justify-center mb-4">
              <h1 className="text-3xl md:text-5xl font-bold text-center leading-tight">
                Artikel & Blog
              </h1>
            </div>
            <p className="text-lg opacity-90 max-w-3xl mx-auto">
              Kumpulan artikel edukatif, tips, dan blog seputar lingkungan hidup Kota Tasikmalaya
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700 text-center">
            <p className="text-gray-600 dark:text-gray-300 text-lg mb-4">
              Belum ada artikel yang tersedia saat ini.
            </p>
            <p className="text-gray-400 dark:text-gray-500 text-sm">
              Nantikan update artikel & blog terbaru dari DLH Kota Tasikmalaya di halaman ini.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
