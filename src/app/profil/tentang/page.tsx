
"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Users, Landmark, Network } from 'lucide-react';

const TentangDLH: React.FC = () => {
  const [showFullTupoksi, setShowFullTupoksi] = useState(false);
  const [height, setHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showFullTupoksi && contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    } else {
      setHeight(0);
    }
  }, [showFullTupoksi]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center min-h-[120px] flex flex-col justify-center">
            <div className="flex flex-col items-center justify-center mb-4">
              <h1 className="text-3xl md:text-5xl font-bold text-center leading-tight">
                Tentang Dinas Lingkungan Hidup
              </h1>
            </div>
            <p className="text-lg opacity-90 max-w-3xl mx-auto">
              Kota Tasikmalaya
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          
          {/* Tentang Kami */}
          <section className="mb-8">
            <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8">
              <div className="prose dark:prose-invert max-w-none">
                <h2 className="text-3xl text-center font-bold text-gray-800 dark:text-white mb-6 border-b-4 border-green-500 pb-2">
                  Tentang Kami
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4 indent-8">
                  <span className="font-bold">Dinas Lingkungan Hidup Kota Tasikmalaya</span> sebagai unit kerja teknis lingkungan yang menjalankan tugas, fungsi, kewenangan serta tanggung jawab koordinasi di bidang lingkungan hidup diperlukan kehadirannya untuk menunjang keberhasilan pembangunan daerah.
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-0 indent-8">
                  Dengan deskripsi tugas yang demikian penting, maka diperlukan dukungan aparatur yang memadai baik dari segi kualitas maupun kuantitas untuk mendukung pencapaian sasaran dan prioritas pembangunan daerah. <span className="font-bold">DLH Kota Tasikmalaya</span> memiliki kantor yang berlokasi di  Jl. Noenoeng Tisnasapoetra No.5 Kota Tasikmalaya.
                </p>
              </div>
            </div>
          </section>

          {/* Visi Misi */}
          <section id="visi-misi" className="mb-12 scroll-mt-20">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Visi */}
              <div
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700 target:ring-4 target:ring-green-500/50 target:border-green-500 target:scale-105 transition-all duration-700 ease-in-out scroll-mt-24 flex flex-col items-center justify-center"
              >
                <h2 className="text-3xl font-bold text-green-600 dark:text-green-400 mb-6 text-center">
                  VISI
                </h2>
                <div className="text-center max-w-xl">
                  <p className="text-lg text-gray-700 dark:text-gray-300 italic font-medium leading-relaxed">
                    &quot;TASIKMALAYA SEBAGAI KOTA INDUSTRI, JASA DAN PERDAGANGAN YANG RELIGIUS, INOVATIF, MAJU DAN BERKELANJUTAN&quot;
                  </p>
                </div>
              </div>

              {/* Misi */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700 target:ring-4 target:ring-blue-500/50 target:border-blue-500 target:scale-105 transition-all duration-700 ease-in-out scroll-mt-24">
                <h2 className="text-3xl font-bold text-blue-600 dark:text-sky-600 mb-6 text-center">
                  MISI
                </h2>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full min-w-[2rem] min-h-[2rem] flex items-center justify-center text-base font-bold mr-3 mt-0.5">1</span>
                    <span className="text-gray-700 dark:text-gray-300">Mewujudkan Sumber Daya Manusia Yang Berkualitas Dan Kehidupan Sosial Masyarakat Yang Religius Dan Berbudaya</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full min-w-[2rem] min-h-[2rem] flex items-center justify-center text-base font-bold mr-3 mt-0.5">2</span>
                    <span className="text-gray-700 dark:text-gray-300">Mewujudkan Ekonomi Daerah Yang Berkeadilan, Kuat Dan Berdaya Saing Berbasis Industri, Jasa Dan Perdagangan</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full min-w-[2rem] min-h-[2rem] flex items-center justify-center text-base font-bold mr-3 mt-0.5">3</span>
                    <span className="text-gray-700 dark:text-gray-300">Mewujudkan Tata Kelola Pemerintahan Yang Baik Dan Bersih</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full min-w-[2rem] min-h-[2rem] flex items-center justify-center text-base font-bold mr-3 mt-0.5">4</span>
                    <span className="text-gray-700 dark:text-gray-300">Mewujudkan Infrastruktur Daerah Yang Berkualitas Dan Merata</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full min-w-[2rem] min-h-[2rem] flex items-center justify-center text-base font-bold mr-3 mt-0.5">5</span>
                    <span className="text-gray-700 dark:text-gray-300">Mewujudkan Pembangunan Yang Berkelanjutan</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Tugas Pokok dan Fungsi (Tupoksi) */}
          <section id="tupoksi" className="mb-8 scroll-mt-20">
            <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8">
              <div className="prose dark:prose-invert max-w-none">
                <h2 className="text-3xl text-center font-bold text-gray-800 dark:text-white mb-6 border-b-4 border-green-500 pb-2">
                  Tugas Pokok dan Fungsi
                </h2>

                <h3 className="text-xl font-semibold text-blue-600 dark:text-sky-500 mb-4">Tugas Pokok:</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4 indent-8">
                  <span className="font-bold">Dinas Lingkungan Hidup Daerah</span> mempunyai tugas melaksanakan penyusunan dan pelaksanaan kebijakan daerah di bidang pengelolaan dan perlindungan lingkungan hidup daerah.
                </p>

                {/* Content with fade effect when collapsed */}
                <div className="relative">
                  <div
                    style={{
                      height: showFullTupoksi ? height : '200px',
                      overflow: 'hidden',
                      transition: 'height 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                  >
                    <div ref={contentRef} className={showFullTupoksi ? 'opacity-100 transition-opacity duration-500' : 'opacity-100 transition-opacity duration-300'}>
                      <h3 className="text-xl font-semibold text-green-600 dark:text-green-400 mb-4">Rincian Tugas Unit:</h3>
                      <h4 className="font-bold mt-6 mb-2">Kepala Dinas</h4>
                      <ul className="list-decimal ml-6 mb-4 space-y-2 text-gray-700 dark:text-gray-300">
                        <li>Menyelenggarakan penyusunan rencana program kerja Dinas;</li>
                        <li>Merumuskan dan menetapkan rencana strategis dan program kerja Dinas untuk mendukung visi dan misi Daerah;</li>
                        <li>Merumuskan kebijakan pengelolaan lingkungan hidup Daerah;</li>
                        <li>Menyelenggarakan pembinaan dan pengendalian penyelenggaraan kebijakan pengelolaan lingkungan hidup;</li>
                        <li>Menyelenggarakan pengoordinasian pelaksanaan kegiatan Dinas meliputi perencanaan lingkungan hidup, pengendalian pencemaran dan kerusakan lingkungan hidup, pengelolaan keanekaragaman hayati, pengendalian bahan dan limbah berbahaya dan beracun, pembinaaan dan pengawasan terhadap izin bidang lingkungan, penanganan pengaduan lingkungan hidup, peningkatan pendidikan, pelatihan dan penyuluhan lingkungan hidup, penghargaan lingkungan hidup untuk masyarakat serta pengelolaan persampahan;</li>
                        <li>Menyelenggarakan pembinaan dan mengarahkan semua kegiatan Unit;</li>
                        <li>Melaksanakan koordinasi dengan organisasi perangkat daerah atau unit kerja lain yang terkait untuk kelancaran pelaksanaan tugas Dinas;</li>
                        <li>Memberikan saran dan pertimbangan kepada Walikota dalam penyelenggaraan tugas pembangunan dan tugas umum pemerintahan di bidang lingkungan hidup;</li>
                        <li>Melaksanakan monitoring, evaluasi dan pelaporan hasil pelaksanaan tugas kepada Wali Kota melalui Sekretaris Daerah; dan</li>
                        <li>Melaksanakan tugas kedinasan lain yang diberikan oleh Wali Kota sesuai dengan bidang tugasnya.</li>
                      </ul>
                      
                      {showFullTupoksi && (
                        <>
                          <h4 className="font-bold mt-6 mb-2">Sekretariat</h4>
                          <p className="mb-2 indent-8 text-gray-700 dark:text-gray-300">Sekretariat mempunyai tugas pokok memberikan pelayanan administratif, koordinasi dan pengendalian dalam pelaksanaan kegiatan kesekretariatan yang meliputi perencanaan, pengelolaan kepegawaian, pengelolaan keuangan dan barang milik daerah, penataan organisasi dan administrasi umum.</p>
                          <ul className="list-decimal ml-6 mb-4 space-y-2 text-gray-700 dark:text-gray-300">
                            <li>Menyelenggarakan penyusunan rencana program kerja dan target kinerja Sekretariat sesuai perjanjian kinerja;</li>
                            <li>Melaksanakan perumusan strategi pelaksanaan pencapaian target kinerja termasuk di dalamnya pembentukan tim kerja dan pelibatan jabatan-jabatan yang diperlukan dalam pencapaian target kinerja;</li>
                            <li>Menyelenggarakan dan mengoordinasikan penyusunan perencanaan serta penganggaran Dinas;</li>
                            <li>Menyelenggarakan dan mengoordinasikan pengelolaan administrasi dan pembinaan kepegawaian;</li>
                            <li>Menyelenggarakan dan mengoordinasikan pengelolaan administrasi keuangan pada Dinas;</li>
                            <li>Menyelenggarakan dan mengoordinasikan pengelolaan administrasi barang milik daerah pada Dinas;</li>
                            <li>Menyelenggarakan dan mengoordinasikan pengelolaan administrasi umum meliputi ketatausahaan dan kerumahtanggaan Dinas;</li>
                            <li>Menyelenggarakan penataan organisasi meliputi pembinaan dan pengembangan kelembagaan, pelayanan publik dan ketatalaksanaan, peningkatan kinerja serta reformasi birokrasi di lingkungan Dinas;</li>
                            <li>Mengoordinasikan penyiapan rancangan peraturan dan ketentuan lainnya di bidang lingkungan hidup;</li>
                            <li>Menyelenggarakan pengelolaan data statistik di bidang lingkungan hidup;</li>
                            <li>Menyelenggarakan dan mengoordinasikan penyusunan evaluasi dan pelaporan kinerja Dinas;</li>
                            <li>Melaksanakan pemantauan, evaluasi dan laporan yang berkaitan dengan tugas Sekretariat;</li>
                            <li>Melaksanakan pembinaan kinerja jabatan pengawas, jabatan fungsional dan jabatan pelaksana yang ditempatkan di Sekretariat;</li>
                            <li>Melaksanakan penyediaan sarana dan prasarana, tata kelola serta sumber daya dalam rangka pencapaian target kinerja oleh jabatan pengawas, jabatan fungsional dan jabatan pelaksana yang berada di bawahnya;</li>
                            <li>Melaksanakan koordinasi dengan unit kerja terkait; dan</li>
                            <li>Melaksanakan tugas kedinasan lain sesuai dengan tugas dan fungsinya.</li>
                          </ul>
                          <h4 className="font-bold mt-6 mb-2">Sub Bagian Umum dan Kepegawaian</h4>
                          <p className="mb-2 indent-8 text-gray-700 dark:text-gray-300">Sub Bagian Umum dan Kepegawaian mempunyai tugas pokok melaksanakan pengelolaan urusan umum, pengelolaan administrasi kepegawaian, pengelolaan barang milik daerah serta pengelolaan kelembagaan, ketatalaksanaan, pelayanan publik dan reformasi birokrasi di lingkup Dinas.</p>
                          <ul className="list-decimal ml-6 mb-4 space-y-2 text-gray-700 dark:text-gray-300">
                            <li>Melaksanakan penyusunan rencana kerja Sub Bagian Umum dan Kepegawaian;</li>
                            <li>Melaksanakan kegiatan ketatausahaan di lingkungan Dinas;</li>
                            <li>Melaksanakan pengelolaan perlengkapan dan kerumahtanggaan Dinas;</li>
                            <li>Melaksanakan pengelolaan barang milik daerah di lingkungan Dinas;</li>
                            <li>Melaksanakan pengelolaan administrasi dan pembinaan kepegawaian di lingkungan Dinas;</li>
                            <li>Melaksanakan pengelolaan dan penyiapan bahan pembinaan kelembagaan, ketatalaksanaan dan pelayanan publik di lingkungan Dinas;</li>
                            <li>Melaksanakan pengelolaan reformasi birokrasi di lingkungan Dinas;</li>
                            <li>Melaksanakan pemantauan, evaluasi dan laporan yang berkaitan dengan tugas Sub Bagian Umum dan Kepegawaian;</li>
                            <li>Melaksanakan koordinasi dengan unit kerja terkait; dan</li>
                            <li>Melaksanakan tugas kedinasan lain sesuai dengan tugas dan fungsinya</li>
                          </ul>
                          <h4 className="font-bold mt-6 mb-2">Sub Bagian Keuangan</h4>
                          <p className="mb-2 indent-8 text-gray-700 dark:text-gray-300">Sub Bagian Keuangan mempunyai tugas pokok melaksanakan pengelolaan administrasi keuangan di lingkup Dinas.</p>
                          <ul className="list-decimal ml-6 mb-4 space-y-2 text-gray-700 dark:text-gray-300">
                            <li>Melaksanakan penyusunan rencana kerja Sub Bagian Keuangan;</li>
                            <li>Melaksanakan penatausahaan dan pengujian/verifikasi keuangan Dinas;</li>
                            <li>Melaksanakan pembinaan penatausahaan keuangan di lingkungan Dinas;</li>
                            <li>Melaksanakan akuntansi dan penyusunan laporan keuangan Dinas;</li>
                            <li>Melaksanakan pengelolaan dan penyiapan bahan tanggapan pemeriksaan;</li>
                            <li>Melaksanakan pemantauan, evaluasi dan laporan yang berkaitan dengan tugas Sub Bagian Keuangan;</li>
                            <li>Melaksanakan koordinasi dengan Unit kerja terkait; dan</li>
                            <li>Melaksanakan tugas kedinasan lain sesuai dengan tugas dan fungsinya.</li>
                          </ul>
                        </>
                      )}
                    </div>
                  </div>
                  
                  {/* Fade overlay when collapsed */}
                  <div 
                    className={`absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-gray-800 dark:via-gray-800/80 dark:to-transparent pointer-events-none transition-all duration-700 ease-in-out ${
                      showFullTupoksi ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
                    }`}
                  ></div>
                </div>

                {/* Tombol expand/collapse */}
                <div className="text-center mt-6">
                  <button
                    onClick={() => setShowFullTupoksi(!showFullTupoksi)}
                    className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition duration-300"
                  >
                    {showFullTupoksi ? 'Sembunyikan' : 'Lihat Selengkapnya'}
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Navigation Links */}
          <section className="mb-8">
            <div className="grid md:grid-cols-3 gap-6">
              {/* Struktur Organisasi */}
              <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg p-8 text-center border border-gray-200 dark:border-gray-700 flex flex-col shadow-lg">
                <Network size={40} className="mx-auto mb-3 text-green-600 dark:text-green-400" />
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
              {/* Profil Pimpinan */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-8 text-center border border-gray-200 dark:border-gray-700 flex flex-col shadow-lg">
                <Landmark size={40} className="mx-auto mb-3 text-blue-600 dark:text-blue-400" />
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
              {/* Profil Pegawai */}
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-amber-400/20 dark:to-amber-900/20 rounded-lg p-8 text-center border border-gray-200 dark:border-gray-700 flex flex-col shadow-lg">
                <Users size={40} className="mx-auto mb-3 text-amber-600 dark:text-amber-400" />
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