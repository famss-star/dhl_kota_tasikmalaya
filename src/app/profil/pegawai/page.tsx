import React from 'react';

const DataPegawai: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-yellow-600 to-amber-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Profil Pegawai
            </h1>
            <p className="text-xl md:text-2xl opacity-90">
              Sumber Daya Manusia Dinas Lingkungan Hidup Kota Tasikmalaya
            </p>
          </div>
        </div>
      </div>

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

          {/* Informasi Kontak HR */}
          <section className="mb-12">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 border-b-4 border-amber-500 pb-2">
                Informasi Kepegawaian
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-amber-600 dark:text-amber-400 mb-4">Kontak Bagian Kepegawaian:</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-amber-600 dark:text-amber-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                      <span className="text-gray-700 dark:text-gray-300">kepegawaian@dlh.tasikmalayakota.go.id</span>
                    </div>
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-amber-600 dark:text-amber-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                      <span className="text-gray-700 dark:text-gray-300">(0265) 123-4567 ext. 102</span>
                    </div>
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-amber-600 dark:text-amber-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700 dark:text-gray-300">Jl. RE Martadinata No. 1, Tasikmalaya</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-amber-600 dark:text-amber-400 mb-4">Jam Pelayanan:</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <span className="text-gray-700 dark:text-gray-300 font-medium">Senin - Kamis</span>
                      <span className="text-gray-600 dark:text-gray-400">08:00 - 16:00 WIB</span>
                    </div>
                    <div className="flex justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <span className="text-gray-700 dark:text-gray-300 font-medium">Jumat</span>
                      <span className="text-gray-600 dark:text-gray-400">08:00 - 11:30 WIB</span>
                    </div>
                    <div className="flex justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                      <span className="text-gray-700 dark:text-gray-300 font-medium">Sabtu - Minggu</span>
                      <span className="text-red-600 dark:text-red-400 font-medium">Tutup</span>
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
