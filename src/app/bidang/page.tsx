import Link from 'next/link';

export default function Bidang() {
  const bidangData = [
    {
      id: 1,
      name: 'Bidang Tata Lingkungan',
      description: 'Menangani penataan ruang dan pengendalian dampak lingkungan',
      icon: '🌍',
      color: 'green',
      features: [
        'Analisis Mengenai Dampak Lingkungan (AMDAL)',
        'Penataan Ruang Terbuka Hijau',
        'Monitoring Kualitas Lingkungan',
        'Penyusunan Dokumen Lingkungan'
      ]
    },
    {
      id: 2,
      name: 'Bidang Pengendalian Pencemaran',
      description: 'Mengawasi dan mengendalikan pencemaran air, udara, dan tanah',
      icon: '🛡️',
      color: 'blue',
      features: [
        'Monitoring Kualitas Air',
        'Pengawasan Emisi Gas Buang',
        'Pengendalian Limbah B3',
        'Pengujian Kualitas Udara'
      ]
    },
    {
      id: 3,
      name: 'Bidang Pengelolaan Sampah',
      description: 'Mengelola sistem persampahan kota secara terintegrasi',
      icon: '♻️',
      color: 'teal',
      features: [
        'Pengumpulan dan Pengangkutan Sampah',
        'Pengelolaan TPA Regional',
        'Program 3R (Reduce, Reuse, Recycle)',
        'Bank Sampah dan Komposter'
      ]
    },
    {
      id: 4,
      name: 'Bidang Penegakan Hukum',
      description: 'Melakukan pengawasan dan penegakan hukum lingkungan',
      icon: '⚖️',
      color: 'red',
      features: [
        'Pengawasan Perizinan Lingkungan',
        'Penindakan Pelanggaran',
        'Mediasi Sengketa Lingkungan',
        'Penyidikan Tindak Pidana Lingkungan'
      ]
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      green: {
        bg: 'bg-green-100 dark:bg-green-900',
        text: 'text-green-600 dark:text-green-400',
        hover: 'hover:border-green-300 dark:hover:border-green-600',
        button: 'bg-green-600 hover:bg-green-700'
      },
      blue: {
        bg: 'bg-blue-100 dark:bg-blue-900',
        text: 'text-blue-600 dark:text-blue-400',
        hover: 'hover:border-blue-300 dark:hover:border-blue-600',
        button: 'bg-blue-600 hover:bg-blue-700'
      },
      teal: {
        bg: 'bg-teal-100 dark:bg-teal-900',
        text: 'text-teal-600 dark:text-teal-400',
        hover: 'hover:border-teal-300 dark:hover:border-teal-600',
        button: 'bg-teal-600 hover:bg-teal-700'
      },
      red: {
        bg: 'bg-red-100 dark:bg-red-900',
        text: 'text-red-600 dark:text-red-400',
        hover: 'hover:border-red-300 dark:hover:border-red-600',
        button: 'bg-red-600 hover:bg-red-700'
      }
    };
    return colorMap[color as keyof typeof colorMap];
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              🏢 Bidang Kerja
            </h1>
            <p className="text-xl md:text-2xl opacity-90">
              Struktur Organisasi Dinas Lingkungan Hidup Kota Tasikmalaya
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          
          {/* Overview */}
          <section className="mb-12">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 text-center">
                Struktur Bidang DLH
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 text-center max-w-4xl mx-auto">
                Dinas Lingkungan Hidup Kota Tasikmalaya memiliki 4 bidang utama yang bekerja secara sinergis 
                untuk mewujudkan lingkungan hidup yang lestari, bersih, dan sehat.
              </p>
            </div>
          </section>

          {/* Bidang Cards */}
          <section className="mb-12">
            <div className="grid md:grid-cols-2 gap-8">
              {bidangData.map((bidang) => {
                const colors = getColorClasses(bidang.color);
                return (
                  <div 
                    key={bidang.id}
                    className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700 ${colors.hover} transition duration-300 transform hover:scale-105`}
                  >
                    <div className="text-center mb-6">
                      <div className={`${colors.bg} ${colors.text} rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 text-3xl`}>
                        {bidang.icon}
                      </div>
                      <h3 className={`text-2xl font-bold ${colors.text} mb-3`}>
                        {bidang.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {bidang.description}
                      </p>
                    </div>

                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                        Tugas & Fungsi:
                      </h4>
                      <ul className="space-y-2">
                        {bidang.features.map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <span className={`${colors.text} mr-3 mt-1`}>•</span>
                            <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="text-center">
                      <button className={`${colors.button} text-white px-6 py-3 rounded-lg font-semibold transition duration-300 transform hover:scale-105`}>
                        Pelajari Lebih Lanjut
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Statistics */}
          <section className="mb-12">
            <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl text-white p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Pencapaian Kinerja 2025</h2>
                <p className="text-xl opacity-90">Komitmen nyata untuk lingkungan berkelanjutan</p>
              </div>
              
              <div className="grid md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-4xl font-bold mb-2">95%</div>
                  <div className="text-lg opacity-90">Pelayanan Perizinan</div>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2">100+</div>
                  <div className="text-lg opacity-90">Pengawasan Rutin</div>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2">80%</div>
                  <div className="text-lg opacity-90">Cakupan Sampah</div>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2">50+</div>
                  <div className="text-lg opacity-90">Penegakan Hukum</div>
                </div>
              </div>
            </div>
          </section>

          {/* Navigation */}
          <section>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
                Jelajahi Lebih Lanjut
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <Link href="/profil/struktur-organisasi" className="group">
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 text-center group-hover:bg-gray-100 dark:group-hover:bg-gray-600 transition duration-300">
                    <div className="text-3xl mb-3">📊</div>
                    <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Struktur Organisasi</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">Lihat bagan organisasi lengkap</p>
                  </div>
                </Link>
                
                <Link href="/profil/pimpinan" className="group">
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 text-center group-hover:bg-gray-100 dark:group-hover:bg-gray-600 transition duration-300">
                    <div className="text-3xl mb-3">👥</div>
                    <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Profil Pimpinan</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">Kenali para pemimpin kami</p>
                  </div>
                </Link>
                
                <Link href="/kontak" className="group">
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 text-center group-hover:bg-gray-100 dark:group-hover:bg-gray-600 transition duration-300">
                    <div className="text-3xl mb-3">📞</div>
                    <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Hubungi Kami</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">Informasi kontak lengkap</p>
                  </div>
                </Link>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
