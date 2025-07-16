import React from 'react';

const StrukturOrganisasi: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Struktur Organisasi
            </h1>
            <p className="text-xl md:text-2xl opacity-90">
              Dinas Lingkungan Hidup Kota Tasikmalaya
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          
          {/* Bagan Organisasi */}
          <section className="mb-12">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center border-b-4 border-green-500 pb-4">
                Bagan Struktur Organisasi
              </h2>
              
              {/* Kepala Dinas */}
              <div className="flex justify-center mb-8">
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg p-6 text-center shadow-lg">
                  <h3 className="text-xl font-bold mb-2">KEPALA DINAS</h3>
                  <p className="text-sm opacity-90">Dinas Lingkungan Hidup</p>
                </div>
              </div>

              {/* Sekretaris */}
              <div className="flex justify-center mb-8">
                <div className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg p-4 text-center shadow-lg">
                  <h3 className="text-lg font-bold mb-1">SEKRETARIS</h3>
                </div>
              </div>

              {/* Sub Bagian */}
              <div className="grid md:grid-cols-3 gap-4 mb-12">
                <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-lg p-4 text-center shadow-lg">
                  <h4 className="font-semibold mb-1">Sub Bagian</h4>
                  <p className="text-sm">Perencanaan & Keuangan</p>
                </div>
                <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-lg p-4 text-center shadow-lg">
                  <h4 className="font-semibold mb-1">Sub Bagian</h4>
                  <p className="text-sm">Umum & Kepegawaian</p>
                </div>
                <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-lg p-4 text-center shadow-lg">
                  <h4 className="font-semibold mb-1">Sub Bagian</h4>
                  <p className="text-sm">Evaluasi & Pelaporan</p>
                </div>
              </div>

              {/* Bidang-Bidang */}
              <div className="grid md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg p-4 text-center shadow-lg">
                  <h4 className="font-semibold mb-2">BIDANG</h4>
                  <p className="text-sm mb-2">Tata Lingkungan</p>
                  <div className="text-xs space-y-1">
                    <div className="bg-purple-800 bg-opacity-50 rounded p-1">Seksi Tata Ruang</div>
                    <div className="bg-purple-800 bg-opacity-50 rounded p-1">Seksi AMDAL</div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg p-4 text-center shadow-lg">
                  <h4 className="font-semibold mb-2">BIDANG</h4>
                  <p className="text-sm mb-2">Pengendalian Pencemaran</p>
                  <div className="text-xs space-y-1">
                    <div className="bg-red-800 bg-opacity-50 rounded p-1">Seksi Air & Tanah</div>
                    <div className="bg-red-800 bg-opacity-50 rounded p-1">Seksi Udara & B3</div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-lg p-4 text-center shadow-lg">
                  <h4 className="font-semibold mb-2">BIDANG</h4>
                  <p className="text-sm mb-2">Pengelolaan Sampah</p>
                  <div className="text-xs space-y-1">
                    <div className="bg-teal-800 bg-opacity-50 rounded p-1">Seksi Pengurangan</div>
                    <div className="bg-teal-800 bg-opacity-50 rounded p-1">Seksi Penanganan</div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-lg p-4 text-center shadow-lg">
                  <h4 className="font-semibold mb-2">BIDANG</h4>
                  <p className="text-sm mb-2">Penataan & Penegakan</p>
                  <div className="text-xs space-y-1">
                    <div className="bg-indigo-800 bg-opacity-50 rounded p-1">Seksi Penataan</div>
                    <div className="bg-indigo-800 bg-opacity-50 rounded p-1">Seksi Penegakan</div>
                  </div>
                </div>
              </div>

              {/* UPT */}
              <div className="mt-8 flex justify-center">
                <div className="bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-lg p-4 text-center shadow-lg">
                  <h4 className="font-semibold mb-1">UPT</h4>
                  <p className="text-sm">Unit Pelaksana Teknis</p>
                </div>
              </div>
            </div>
          </section>

          {/* Deskripsi Tugas */}
          <section className="mb-12">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 border-b-4 border-green-500 pb-2">
                Deskripsi Tugas Masing-Masing Bidang
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="border-l-4 border-purple-500 pl-4">
                    <h3 className="text-xl font-semibold text-purple-600 mb-2">Bidang Tata Lingkungan</h3>
                    <p className="text-gray-700 dark:text-gray-300">Melaksanakan penyusunan baku mutu lingkungan hidup, analisis mengenai dampak lingkungan, dan tata ruang berbasis lingkungan hidup.</p>
                  </div>
                  
                  <div className="border-l-4 border-red-500 pl-4">
                    <h3 className="text-xl font-semibold text-red-600 mb-2">Bidang Pengendalian Pencemaran</h3>
                    <p className="text-gray-700 dark:text-gray-300">Melaksanakan pencegahan dan penanggulangan pencemaran air, udara, tanah, serta pengelolaan bahan berbahaya dan beracun (B3).</p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="border-l-4 border-teal-500 pl-4">
                    <h3 className="text-xl font-semibold text-teal-600 mb-2">Bidang Pengelolaan Sampah</h3>
                    <p className="text-gray-700 dark:text-gray-300">Melaksanakan pengurangan dan penanganan sampah, termasuk pengembangan teknologi ramah lingkungan dan pemberdayaan masyarakat.</p>
                  </div>
                  
                  <div className="border-l-4 border-indigo-500 pl-4">
                    <h3 className="text-xl font-semibold text-indigo-600 mb-2">Bidang Penataan & Penegakan</h3>
                    <p className="text-gray-700 dark:text-gray-300">Melaksanakan penataan hukum lingkungan, pengawasan, dan penegakan hukum terhadap pelanggaran lingkungan hidup.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Back to Profile */}
          <section>
            <div className="text-center">
              <a 
                href="/profil/tentang" 
                className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Kembali ke Halaman Tentang
              </a>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default StrukturOrganisasi;
