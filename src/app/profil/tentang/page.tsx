import React from 'react';

const TentangDLH: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Tentang Dinas Lingkungan Hidup
            </h1>
            <p className="text-xl md:text-2xl opacity-90">
              Kota Tasikmalaya
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          
          {/* Tentang Kami */}
          <section className="mb-12">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 border-b-4 border-green-500 pb-2">
                Tentang Kami
              </h2>
              <div className="prose prose-lg max-w-none text-gray-700 dark:text-gray-300">
                <p className="mb-4">
                  Dinas Lingkungan Hidup Kota Tasikmalaya merupakan unsur pelaksana urusan pemerintahan 
                  yang menjadi kewenangan daerah di bidang lingkungan hidup. Kami berkomitmen untuk 
                  mewujudkan lingkungan hidup yang lestari, bersih, dan sehat untuk mendukung 
                  pembangunan berkelanjutan di Kota Tasikmalaya.
                </p>
                <p className="mb-4">
                  Sebagai institusi yang bertanggung jawab terhadap pengelolaan lingkungan hidup, 
                  kami berupaya memberikan pelayanan terbaik kepada masyarakat dalam bidang 
                  perlindungan dan pengelolaan lingkungan hidup, pengendalian pencemaran, 
                  serta pembinaan dan pengawasan kegiatan yang berpotensi mempengaruhi kualitas lingkungan.
                </p>
                <p className="mb-4">
                  Dengan dukungan SDM yang kompeten dan teknologi yang memadai, DLH Kota Tasikmalaya 
                  terus berinovasi dalam memberikan pelayanan publik yang prima dan berkelanjutan.
                </p>
              </div>
            </div>
          </section>

          {/* Visi Misi */}
          <section id="visi-misi" className="mb-12 scroll-mt-20">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Visi */}
              <div id="visi" className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700 target:ring-4 target:ring-green-500/50 target:border-green-500 target:scale-105 transition-all duration-700 ease-in-out scroll-mt-24">
                <h2 className="text-3xl font-bold text-green-600 dark:text-green-400 mb-6 text-center">
                  VISI
                </h2>
                <div className="text-center">
                  <p className="text-lg text-gray-700 dark:text-gray-300 italic font-medium leading-relaxed">
                    "Terwujudnya Lingkungan Hidup yang Lestari, Bersih, dan Sehat 
                    untuk Mendukung Kota Tasikmalaya yang Maju dan Berkelanjutan"
                  </p>
                </div>
              </div>

              {/* Misi */}
              <div id="misi" className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700 target:ring-4 target:ring-blue-500/50 target:border-blue-500 target:scale-105 transition-all duration-700 ease-in-out scroll-mt-24">
                <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-6 text-center">
                  MISI
                </h2>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">1</span>
                    <span className="text-gray-700 dark:text-gray-300">Meningkatkan kualitas lingkungan hidup melalui pengendalian pencemaran dan kerusakan lingkungan</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">2</span>
                    <span className="text-gray-700 dark:text-gray-300">Meningkatkan kesadaran masyarakat terhadap pentingnya menjaga kelestarian lingkungan hidup</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">3</span>
                    <span className="text-gray-700 dark:text-gray-300">Mengembangkan sistem pengelolaan persampahan yang ramah lingkungan</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">4</span>
                    <span className="text-gray-700 dark:text-gray-300">Meningkatkan kapasitas aparatur dalam pengelolaan lingkungan hidup</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Tugas Pokok dan Fungsi (Tupoksi) */}
          <section id="tupoksi" className="mb-12 scroll-mt-20">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700 target:ring-4 target:ring-purple-500/50 target:border-purple-500 target:scale-105 transition-all duration-700 ease-in-out">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 border-b-4 border-green-500 pb-2">
                Tugas Pokok dan Fungsi (TUPOKSI)
              </h2>
              
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-green-600 dark:text-green-400 mb-4">Tugas Pokok:</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Melaksanakan urusan pemerintahan daerah di bidang lingkungan hidup berdasarkan 
                  asas otonomi dan tugas pembantuan.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-green-600 dark:text-green-400 mb-4">Fungsi:</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-green-500 dark:text-green-400 mr-3">•</span>
                      <span className="text-gray-700 dark:text-gray-300">Perumusan kebijakan teknis di bidang lingkungan hidup</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 dark:text-green-400 mr-3">•</span>
                      <span className="text-gray-700 dark:text-gray-300">Penyelenggaraan urusan pemerintahan dan pelayanan umum</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 dark:text-green-400 mr-3">•</span>
                      <span className="text-gray-700 dark:text-gray-300">Pembinaan dan pelaksanaan tugas bidang lingkungan hidup</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 dark:text-green-400 mr-3">•</span>
                      <span className="text-gray-700 dark:text-gray-300">Pengendalian pencemaran dan kerusakan lingkungan hidup</span>
                    </li>
                  </ul>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-green-500 dark:text-green-400 mr-3">•</span>
                      <span className="text-gray-700 dark:text-gray-300">Pengawasan dan penegakan hukum lingkungan</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 dark:text-green-400 mr-3">•</span>
                      <span className="text-gray-700 dark:text-gray-300">Pengelolaan informasi lingkungan hidup</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 dark:text-green-400 mr-3">•</span>
                      <span className="text-gray-700 dark:text-gray-300">Pemberdayaan masyarakat di bidang lingkungan hidup</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 dark:text-green-400 mr-3">•</span>
                      <span className="text-gray-700 dark:text-gray-300">Pelaksanaan tugas lain yang diberikan oleh Walikota</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Maklumat Pelayanan */}
          <section className="mb-12">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 border-b-4 border-green-500 pb-2">
                Maklumat Pelayanan
              </h2>
              <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 rounded-lg p-6 mb-6">
                <p className="text-lg text-gray-700 dark:text-gray-300 text-center font-medium italic">
                  "Dengan ini kami menyatakan sanggup menyelenggarakan pelayanan sesuai dengan standar pelayanan yang telah ditetapkan dan apabila tidak menepati janji ini, kami siap menerima sanksi sesuai dengan peraturan perundang-undangan yang berlaku"
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-4">Komitmen Pelayanan:</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-blue-500 dark:text-blue-400 mr-3">✓</span>
                      <span className="text-gray-700 dark:text-gray-300">Memberikan pelayanan yang cepat, tepat, dan akurat</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 dark:text-blue-400 mr-3">✓</span>
                      <span className="text-gray-700 dark:text-gray-300">Melayani dengan sikap ramah, sopan, dan profesional</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 dark:text-blue-400 mr-3">✓</span>
                      <span className="text-gray-700 dark:text-gray-300">Memberikan informasi yang jelas dan mudah dipahami</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 dark:text-blue-400 mr-3">✓</span>
                      <span className="text-gray-700 dark:text-gray-300">Menyelesaikan pelayanan sesuai waktu yang ditetapkan</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-green-600 dark:text-green-400 mb-4">Standar Pelayanan:</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-green-500 dark:text-green-400 mr-3">•</span>
                      <span className="text-gray-700 dark:text-gray-300">Persyaratan pelayanan yang jelas dan tidak berbelit-belit</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 dark:text-green-400 mr-3">•</span>
                      <span className="text-gray-700 dark:text-gray-300">Prosedur pelayanan yang sederhana dan mudah diikuti</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 dark:text-green-400 mr-3">•</span>
                      <span className="text-gray-700 dark:text-gray-300">Waktu penyelesaian yang pasti dan dapat diprediksi</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 dark:text-green-400 mr-3">•</span>
                      <span className="text-gray-700 dark:text-gray-300">Biaya pelayanan yang transparan dan terjangkau</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Navigation Links */}
          <section>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg p-8 text-center border border-gray-200 dark:border-gray-700 flex flex-col">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                  Struktur Organisasi
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Lihat struktur organisasi lengkap DLH Kota Tasikmalaya
                </p>
                <a 
                  href="/profil/struktur-organisasi" 
                  className="mt-auto inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Lihat Struktur Organisasi
                </a>
              </div>
              
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-8 text-center border border-gray-200 dark:border-gray-700 flex flex-col">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                  Profil Pimpinan
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Profil lengkap pimpinan DLH Kota Tasikmalaya
                </p>
                <a 
                  href="/profil/pimpinan" 
                  className="mt-auto inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Lihat Profil Pimpinan
                </a>
              </div>

              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-amber-400/20 dark:to-amber-900/20 rounded-lg p-8 text-center border border-gray-200 dark:border-gray-700 flex flex-col">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                  Profil Pegawai
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Profil lengkap sumber daya manusia dan komposisi kepegawaian DLH Kota Tasikmalaya
                </p>
                <a 
                  href="/profil/pegawai" 
                  className="mt-auto inline-block bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Lihat Profil Pegawai
                </a>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default TentangDLH;
