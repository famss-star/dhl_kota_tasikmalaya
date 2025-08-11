import React from 'react';

const DataPegawai: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-yellow-600 to-amber-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center min-h-[120px] flex flex-col justify-center">
            <div className="flex flex-col items-center justify-center mb-4">
              <h1 className="text-3xl md:text-5xl font-bold text-center leading-tight">
                Profil Pegawai
              </h1>
            </div>
            <p className="text-lg opacity-90 max-w-3xl mx-auto">
              Dinas Lingkungan Hidup Kota Tasikmalaya
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          
          {/* Statistik Pegawai */}
          <section className="mb-12">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center border-b-4 border-amber-500 pb-4">
                Statistik Kepegawaian
              </h2>
              
              <div className="grid md:grid-cols-4 gap-6">
                <div className="bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 rounded-lg p-6 text-center">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">45</div>
                  <div className="text-gray-700 dark:text-gray-300 font-semibold">Total Pegawai</div>
                </div>
                
                <div className="bg-gradient-to-r from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 rounded-lg p-6 text-center">
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">38</div>
                  <div className="text-gray-700 dark:text-gray-300 font-semibold">PNS</div>
                </div>
                
                <div className="bg-gradient-to-r from-amber-100 to-amber-200 dark:from-amber-900/30 dark:to-amber-800/30 rounded-lg p-6 text-center">
                  <div className="text-3xl font-bold text-amber-600 dark:text-amber-400 mb-2">5</div>
                  <div className="text-gray-700 dark:text-gray-300 font-semibold">PPPK</div>
                </div>
                
                <div className="bg-gradient-to-r from-amber-100 to-amber-200 dark:from-amber-900/30 dark:to-amber-800/30 rounded-lg p-6 text-center">
                  <div className="text-3xl font-bold text-amber-600 dark:text-amber-400 mb-2">2</div>
                  <div className="text-gray-700 dark:text-gray-300 font-semibold">Honorer</div>
                </div>
              </div>
            </div>
          </section>

          {/* Pegawai berdasarkan Pendidikan */}
          <section className="mb-12">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 border-b-4 border-amber-500 pb-2">
                Komposisi Berdasarkan Pendidikan
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <span className="font-semibold text-gray-700 dark:text-gray-300">S2 (Magister)</span>
                    <span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full font-bold">8 orang</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <span className="font-semibold text-gray-700 dark:text-gray-300">S1 (Sarjana)</span>
                    <span className="bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 px-3 py-1 rounded-full font-bold">22 orang</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <span className="font-semibold text-gray-700 dark:text-gray-300">Diploma</span>
                    <span className="bg-amber-100 dark:bg-amber-900 text-amber-600 dark:text-amber-400 px-3 py-1 rounded-full font-bold">7 orang</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <span className="font-semibold text-gray-700 dark:text-gray-300">SMA/SMK</span>
                    <span className="bg-amber-100 dark:bg-amber-900 text-amber-600 dark:text-amber-400 px-3 py-1 rounded-full font-bold">6 orang</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <span className="font-semibold text-gray-700 dark:text-gray-300">SMP</span>
                    <span className="bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 px-3 py-1 rounded-full font-bold">2 orang</span>
                  </div>
                  
                  <div className="bg-gradient-to-r from-amber-50 to-amber-50 dark:from-amber-900/20 dark:to-amber-900/20 rounded-lg p-4 text-center">
                    <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                      Total: <span className="text-amber-600 dark:text-amber-400">45 Pegawai</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Pegawai berdasarkan Golongan */}
          <section className="mb-12">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 border-b-4 border-amber-500 pb-2">
                Komposisi Berdasarkan Golongan
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-4">Golongan IV</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <span className="text-gray-700 dark:text-gray-300">IV/e (Pembina Utama Madya)</span>
                      <span className="bg-blue-600 text-white px-2 py-1 rounded font-bold text-sm">1</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <span className="text-gray-700 dark:text-gray-300">IV/d (Pembina Utama Muda)</span>
                      <span className="bg-blue-600 text-white px-2 py-1 rounded font-bold text-sm">2</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <span className="text-gray-700 dark:text-gray-300">IV/c (Pembina Tk. I)</span>
                      <span className="bg-blue-600 text-white px-2 py-1 rounded font-bold text-sm">3</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <span className="text-gray-700 dark:text-gray-300">IV/b (Pembina)</span>
                      <span className="bg-blue-600 text-white px-2 py-1 rounded font-bold text-sm">4</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <span className="text-gray-700 dark:text-gray-300">IV/a (Pembina)</span>
                      <span className="bg-blue-600 text-white px-2 py-1 rounded font-bold text-sm">6</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-4">Golongan III & II</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <span className="text-gray-700 dark:text-gray-300">III/d (Penata Tk. I)</span>
                      <span className="bg-green-600 text-white px-2 py-1 rounded font-bold text-sm">8</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <span className="text-gray-700 dark:text-gray-300">III/c (Penata)</span>
                      <span className="bg-green-600 text-white px-2 py-1 rounded font-bold text-sm">7</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <span className="text-gray-700 dark:text-gray-300">III/b (Penata Muda Tk. I)</span>
                      <span className="bg-green-600 text-white px-2 py-1 rounded font-bold text-sm">5</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <span className="text-gray-700 dark:text-gray-300">III/a (Penata Muda)</span>
                      <span className="bg-green-600 text-white px-2 py-1 rounded font-bold text-sm">4</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                      <span className="text-gray-700 dark:text-gray-300">II/c, II/b, II/a</span>
                      <span className="bg-amber-600 text-white px-2 py-1 rounded font-bold text-sm">5</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Pegawai berdasarkan Usia */}
          <section className="mb-12">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 border-b-4 border-amber-500 pb-2">
                Komposisi Berdasarkan Usia
              </h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-lg p-6 text-center">
                  <h3 className="text-lg font-bold text-green-700 dark:text-green-400 mb-3">Muda (20-35 tahun)</h3>
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">12</div>
                  <div className="text-gray-600 dark:text-gray-400 text-sm">26.7% dari total pegawai</div>
                </div>
                
                <div className="bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-lg p-6 text-center">
                  <h3 className="text-lg font-bold text-blue-700 dark:text-blue-400 mb-3">Produktif (36-50 tahun)</h3>
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">22</div>
                  <div className="text-gray-600 dark:text-gray-400 text-sm">48.9% dari total pegawai</div>
                </div>
                
                <div className="bg-gradient-to-r from-amber-100 to-amber-100 dark:from-amber-900/30 dark:to-amber-900/30 rounded-lg p-6 text-center">
                  <h3 className="text-lg font-bold text-amber-700 dark:text-amber-400 mb-3">Senior (51+ tahun)</h3>
                  <div className="text-3xl font-bold text-amber-600 dark:text-amber-400 mb-2">11</div>
                  <div className="text-gray-600 dark:text-gray-400 text-sm">24.4% dari total pegawai</div>
                </div>
              </div>
            </div>
          </section>

          {/* Back to Profile */}
          <section>
            <div className="text-center">
              <a 
                href="/profil/tentang" 
                className="inline-block bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
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

export default DataPegawai;
