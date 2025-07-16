export default function Link() {
  const links = [
    {
      name: 'Kementerian Lingkungan Hidup dan Kehutanan',
      url: 'https://www.menlhk.go.id',
      description: 'Portal resmi Kementerian LHK Republik Indonesia',
      icon: '🏛️'
    },
    {
      name: 'Pemerintah Kota Tasikmalaya',
      url: 'https://tasikmalayakota.go.id',
      description: 'Website resmi Pemerintah Kota Tasikmalaya',
      icon: '🏢'
    },
    {
      name: 'KLHK Database',
      url: 'https://database.menlhk.go.id',
      description: 'Database lingkungan hidup nasional',
      icon: '📊'
    },
    {
      name: 'SIPPN (Sistem Informasi Pengelolaan Persampahan Nasional)',
      url: 'https://sippn.menlhk.go.id',
      description: 'Sistem informasi pengelolaan sampah nasional',
      icon: '🗑️'
    },
    {
      name: 'SIMBA (Sistem Informasi Monitoring dan Evaluasi)',
      url: '#',
      description: 'Platform monitoring lingkungan hidup',
      icon: '📈'
    },
    {
      name: 'E-Perizinan KLHK',
      url: 'https://oss.menlhk.go.id',
      description: 'Layanan perizinan online bidang lingkungan',
      icon: '📋'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              🔗 Link Terkait
            </h1>
            <p className="text-xl md:text-2xl opacity-90">
              Portal dan layanan terkait lingkungan hidup
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          
          {/* Links Grid */}
          <section>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {links.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700 group-hover:shadow-2xl transition duration-300 transform group-hover:scale-105 h-full">
                    <div className="text-center">
                      <div className="bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 text-2xl group-hover:scale-110 transition duration-300">
                        {link.icon}
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition duration-300">
                        {link.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-3">
                        {link.description}
                      </p>
                      <div className="flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-medium group-hover:text-indigo-700 dark:group-hover:text-indigo-300">
                        <span>Kunjungi</span>
                        <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </section>

          {/* Additional Info */}
          <section className="mt-12">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
                Informasi Tambahan
              </h2>
              <div className="text-center">
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Untuk informasi lebih lanjut atau jika ada link yang tidak dapat diakses, 
                  silakan hubungi tim IT DLH Kota Tasikmalaya.
                </p>
                <a 
                  href="/kontak" 
                  className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
                >
                  Hubungi Kami
                </a>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
