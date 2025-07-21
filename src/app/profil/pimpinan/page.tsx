import React from 'react';

const ProfilPimpinan: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Profil Pimpinan
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
          
          {/* Kepala Dinas */}
          <section className="mb-12">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-6">
                <h2 className="text-3xl font-bold text-center">
                  KEPALA DINAS LINGKUNGAN HIDUP
                </h2>
              </div>
              
              <div className="p-8">
                <div className="grid md:grid-cols-3 gap-8">
                  {/* Photo Placeholder */}
                  <div className="md:col-span-1">
                    <div className="bg-gray-200 dark:bg-gray-700 rounded-lg h-80 flex items-center justify-center">
                      <div className="text-center text-gray-500 dark:text-gray-400">
                        <svg className="mx-auto h-24 w-24 mb-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        <p className="text-sm">Foto Kepala Dinas</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Profile Information */}
                  <div className="md:col-span-2">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                          [Nama Kepala Dinas]
                        </h3>
                        <p className="text-lg text-blue-600 dark:text-blue-400 font-semibold">
                          Kepala Dinas Lingkungan Hidup Kota Tasikmalaya
                        </p>
                      </div>
                                            
                      <div>
                        <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">Riwayat Jabatan:</h4>
                        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                          <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                            <li>• [Tahun] - [Tahun]: [Jabatan Sebelumnya]</li>
                            <li>• [Tahun] - [Tahun]: [Jabatan Sebelumnya]</li>
                            <li>• [Tahun] - Sekarang: Kepala Dinas Lingkungan Hidup Kota Tasikmalaya</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Sekretaris */}
          <section className="mb-12">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-green-600 to-green-700 text-white py-4">
                <h2 className="text-2xl font-bold text-center">
                  SEKRETARIS
                </h2>
              </div>
              
              <div className="p-6">
                <div className="grid md:grid-cols-4 gap-6">
                  {/* Photo Placeholder */}
                  <div className="md:col-span-1">
                    <div className="bg-gray-200 dark:bg-gray-700 rounded-lg h-48 flex items-center justify-center">
                      <div className="text-center text-gray-500 dark:text-gray-400">
                        <svg className="mx-auto h-16 w-16 mb-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        <p className="text-xs">Foto Sekretaris</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Profile Information */}
                  <div className="md:col-span-3">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-1">
                          [Nama Sekretaris]
                        </h3>
                        <p className="text-green-600 dark:text-green-400 font-semibold">
                          Sekretaris Dinas Lingkungan Hidup
                        </p>
                      </div>
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Kepala Bidang */}
          <section className="mb-12">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center border-b-4 border-blue-500 pb-4">
                KEPALA BIDANG
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                {/* Kabid Tata Lingkungan */}
                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-16 w-16 flex items-center justify-center mr-4">
                      <svg className="h-8 w-8 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-800 dark:text-white">[Nama Kabid]</h3>
                      <p className="text-purple-600 dark:text-purple-400 font-semibold">Kabid Tata Lingkungan</p>
                    </div>
                  </div>
                </div>

                {/* Kabid Pengendalian Pencemaran */}
                <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-16 w-16 flex items-center justify-center mr-4">
                      <svg className="h-8 w-8 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-800 dark:text-white">[Nama Kabid]</h3>
                      <p className="text-red-600 dark:text-red-400 font-semibold">Kabid Pengendalian Pencemaran</p>
                    </div>
                  </div>
                </div>

                {/* Kabid Pengelolaan Sampah */}
                <div className="bg-teal-50 dark:bg-teal-900/20 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-16 w-16 flex items-center justify-center mr-4">
                      <svg className="h-8 w-8 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-800 dark:text-white">[Nama Kabid]</h3>
                      <p className="text-teal-600 dark:text-teal-400 font-semibold">Kabid Pengelolaan Sampah</p>
                    </div>
                  </div>
                </div>

                {/* Kabid Penataan & Penegakan */}
                <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-16 w-16 flex items-center justify-center mr-4">
                      <svg className="h-8 w-8 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-800 dark:text-white">[Nama Kabid]</h3>
                      <p className="text-indigo-600 dark:text-indigo-400 font-semibold">Kabid Penataan & Penegakan</p>
                    </div>
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
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
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

export default ProfilPimpinan;
