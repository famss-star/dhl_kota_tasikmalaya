import { FileText } from "lucide-react";

export default function ArtikelBlog() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <FileText className="w-12 h-12 text-green-200 drop-shadow-md" />
              <h1 className="text-4xl md:text-5xl font-bold">Artikel & Blog</h1>
            </div>
            <p className="text-xl md:text-2xl opacity-90 max-w-2xl mx-auto">
              Kumpulan artikel edukatif, tips, dan blog seputar lingkungan hidup Kota Tasikmalaya.
            </p>
          </div>
        </div>
      </div>

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
