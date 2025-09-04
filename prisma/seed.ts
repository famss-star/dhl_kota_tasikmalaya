import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🚀 Starting database seeding...')

  // 1. Create admin user
  console.log('👤 Creating admin user...')
  const hashedPassword = await bcrypt.hash('admin123', 10)
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@dlhtasik.go.id' },
    update: {},
    create: {
      email: 'admin@dlhtasik.go.id',
      name: 'Administrator DLH',
      password: hashedPassword,
      role: 'ADMIN',
      isActive: true,
    },
  })

  // 2. Create article categories
  console.log('📂 Creating article categories...')
  const categories = [
    { name: 'Lingkungan Hidup', slug: 'lingkungan-hidup', description: 'Artikel tentang lingkungan hidup dan konservasi' },
    { name: 'Kebijakan', slug: 'kebijakan', description: 'Artikel tentang kebijakan dan regulasi lingkungan' },
    { name: 'Edukasi', slug: 'edukasi', description: 'Artikel edukasi dan sosialisasi lingkungan' },
    { name: 'Program', slug: 'program', description: 'Artikel tentang program dan kegiatan DLH' },
  ]

  const createdCategories = []
  for (const category of categories) {
    const created = await prisma.articleCategory.upsert({
      where: { slug: category.slug },
      update: {},
      create: category,
    })
    createdCategories.push(created)
  }

  // 3. Create sample articles
  console.log('📝 Creating sample articles...')
  const articles = [
    {
      title: "Pengelolaan Sampah Berbasis Masyarakat di Kota Tasikmalaya",
      slug: "pengelolaan-sampah-berbasis-masyarakat",
      content: `<h2>Pendahuluan</h2><p>Pengelolaan sampah berbasis masyarakat merupakan strategi penting dalam menjaga kebersihan lingkungan di Kota Tasikmalaya.</p><h2>Strategi Pengelolaan</h2><ul><li>Pemilahan sampah dari sumber</li><li>Pengomposan sampah organik</li><li>Daur ulang sampah anorganik</li><li>Edukasi masyarakat</li></ul>`,
      excerpt: "Strategi pengelolaan sampah yang melibatkan partisipasi aktif masyarakat untuk menciptakan lingkungan yang bersih dan berkelanjutan.",
      categoryId: createdCategories[0].id
    },
    {
      title: "Program Kali Bersih untuk Restorasi Sungai",
      slug: "program-kali-bersih-restorasi-sungai",
      content: `<h2>Program Kali Bersih</h2><p>Program restorasi sungai-sungai di Kota Tasikmalaya melalui partisipasi masyarakat dan koordinasi lintas sektor.</p><h2>Tahapan Program</h2><ol><li>Pembersihan sungai dari sampah</li><li>Penanaman vegetasi riparian</li><li>Pengawasan kualitas air</li><li>Pemberdayaan masyarakat</li></ol>`,
      excerpt: "Program komprehensif untuk memulihkan kondisi sungai-sungai di Kota Tasikmalaya melalui pendekatan terpadu.",
      categoryId: createdCategories[3].id
    }
  ]

  for (const articleData of articles) {
    await prisma.article.upsert({
      where: { slug: articleData.slug },
      update: {},
      create: {
        ...articleData,
        isPublished: true,
        publishedAt: new Date(),
        authorId: admin.id,
      }
    })
  }

  // 4. Create sample news
  console.log('📰 Creating sample news...')
  const news = [
    {
      title: "DLH Kota Tasikmalaya Raih Penghargaan Adipura 2024",
      slug: "dlh-tasikmalaya-raih-adipura-2024",
      content: `<p>Dinas Lingkungan Hidup Kota Tasikmalaya berhasil meraih penghargaan Adipura 2024 atas komitmen dalam menjaga kebersihan dan keindahan kota.</p><p>Penghargaan ini merupakan hasil kerja keras seluruh stakeholder dalam menjaga lingkungan hidup kota.</p>`,
      excerpt: "DLH Kota Tasikmalaya meraih penghargaan Adipura 2024 atas komitmen menjaga kebersihan kota.",
    },
    {
      title: "Sosialisasi Program Bank Sampah di 15 Kelurahan",
      slug: "sosialisasi-bank-sampah-15-kelurahan",
      content: `<p>DLH Kota Tasikmalaya menggelar sosialisasi program bank sampah di 15 kelurahan untuk meningkatkan kesadaran masyarakat tentang pengelolaan sampah.</p><p>Program ini diharapkan dapat mengurangi volume sampah dan meningkatkan ekonomi masyarakat.</p>`,
      excerpt: "Sosialisasi bank sampah dilakukan di 15 kelurahan untuk meningkatkan kesadaran pengelolaan sampah.",
    },
    {
      title: "Monitoring Kualitas Air Sungai Periode Januari 2024",
      slug: "monitoring-kualitas-air-januari-2024",
      content: `<p>DLH melakukan monitoring rutin kualitas air sungai-sungai utama di Kota Tasikmalaya periode Januari 2024.</p><p>Hasil monitoring menunjukkan peningkatan kualitas air di beberapa titik pemantauan.</p>`,
      excerpt: "Hasil monitoring kualitas air sungai menunjukkan peningkatan di beberapa titik pemantauan.",
    }
  ]

  for (const newsData of news) {
    await prisma.news.upsert({
      where: { slug: newsData.slug },
      update: {},
      create: {
        ...newsData,
        isPublished: true,
        publishedAt: new Date(),
        authorId: admin.id,
      }
    })
  }

  // 5. Create site settings
  console.log('⚙️ Creating site settings...')
  const settings = [
    { key: 'logo_header', value: 'https://portal.tasikmalayakota.go.id/assets/uploads/logo-dlh.png', type: 'STRING' as const, label: 'Logo Header', description: 'Logo untuk header website (rasio 1:1)' },
    { key: 'logo_footer', value: 'https://portal.tasikmalayakota.go.id/assets/uploads/logo-dlh.png', type: 'STRING' as const, label: 'Logo Footer', description: 'Logo untuk footer website' },
    { key: 'site_name', value: 'Dinas Lingkungan Hidup Kota Tasikmalaya', type: 'STRING' as const, label: 'Nama Situs', description: 'Nama resmi website' },
    { key: 'site_description', value: 'Portal resmi Dinas Lingkungan Hidup Kota Tasikmalaya untuk informasi dan layanan lingkungan hidup', type: 'STRING' as const, label: 'Deskripsi Situs', description: 'Deskripsi singkat website' },
    { key: 'contact_email', value: 'info@dlhtasik.go.id', type: 'STRING' as const, label: 'Email Kontak', description: 'Email resmi untuk kontak' },
    { key: 'contact_phone', value: '(0265) 334987', type: 'STRING' as const, label: 'Telepon Kontak', description: 'Nomor telepon resmi' },
    { key: 'office_address', value: 'Jl. Noenoeng Tisnasapoetra No.5, Empangsari, Kec. Tawang, Kota Tasikmalaya, Jawa Barat', type: 'STRING' as const, label: 'Alamat Kantor', description: 'Alamat lengkap kantor DLH' },
  ]

  for (const setting of settings) {
    await prisma.siteSetting.upsert({
      where: { key: setting.key },
      update: {},
      create: setting,
    })
  }

  // 6. Create leader as staff member
  console.log('👑 Creating leader as staff member...')
  await prisma.staffMember.upsert({
    where: { id: 'default-leader' },
    update: {},
    create: {
      id: 'default-leader',
      name: 'Dr. H. Ahmad Suherman, M.Si',
      position: 'Kepala Dinas Lingkungan Hidup Kota Tasikmalaya',
      type: 'KEPALA_DINAS',
      employmentStatus: 'PNS',
      education: 'S2',
      greeting: 'Selamat datang di portal resmi Dinas Lingkungan Hidup Kota Tasikmalaya. Kami berkomitmen untuk menjaga kelestarian lingkungan hidup demi masa depan yang berkelanjutan bagi generasi mendatang.',
      photo: '/pemimpin-placeholder.svg',
      isActive: true,
    }
  })

  // 7. Create bidang data
  console.log('🏢 Creating bidang data...')
  const bidangData = [
    {
      slug: 'tata-lingkungan',
      name: 'Bidang Tata Lingkungan',
      aboutTitle: 'Tentang Bidang Tata Lingkungan',
      aboutDescription: 'Bidang Tata Lingkungan bertanggung jawab dalam penyusunan kebijakan, perencanaan, dan pelaksanaan program tata lingkungan, konservasi sumber daya alam, serta pengelolaan ruang terbuka hijau di Kota Tasikmalaya.',
      tugasPokokTitle: 'Tugas Pokok',
      tugasPokok: [
        'Melaksanakan penyusunan rencana tata ruang berbasis lingkungan hidup',
        'Menyelenggarakan inventarisasi dan pemetaan sumber daya alam',
        'Melaksanakan konservasi sumber daya alam dan keanekaragaman hayati',
        'Mengelola dan mengembangkan ruang terbuka hijau (RTH)',
        'Melaksanakan rehabilitasi dan pemulihan ekosistem yang rusak',
        'Menyelenggarakan program penghijauan dan reboisasi'
      ],
      fungsiTitle: 'Fungsi',
      fungsi: [
        'Perumusan kebijakan teknis tata lingkungan dan RTH',
        'Pelaksanaan inventarisasi sumber daya alam',
        'Pengelolaan kawasan konservasi dan perlindungan lingkungan',
        'Pengembangan dan pemeliharaan ruang terbuka hijau',
        'Monitoring dan evaluasi kualitas lingkungan hidup',
        'Koordinasi program konservasi dengan stakeholder'
      ]
    },
    {
      slug: 'pengendalian-pencemaran',
      name: 'Bidang Pengendalian Pencemaran',
      aboutTitle: 'Tentang Bidang Pengendalian Pencemaran',
      aboutDescription: 'Bidang Pengendalian Pencemaran bertugas dalam pengendalian dan pengawasan pencemaran lingkungan, monitoring kualitas air, udara, dan tanah, serta penanganan dampak lingkungan di Kota Tasikmalaya.',
      tugasPokokTitle: 'Tugas Pokok',
      tugasPokok: [
        'Melaksanakan pengendalian pencemaran air, udara, dan tanah',
        'Menyelenggarakan monitoring dan pengukuran kualitas lingkungan',
        'Melaksanakan pengawasan dan penegakan hukum lingkungan',
        'Menangani pengaduan dan keluhan pencemaran lingkungan',
        'Melaksanakan AMDAL dan UKL-UPL',
        'Menyelenggarakan program pengendalian dampak lingkungan'
      ],
      fungsiTitle: 'Fungsi',
      fungsi: [
        'Pengawasan dan pengendalian pencemaran industri',
        'Monitoring kualitas air, udara, dan tanah',
        'Penanganan limbah B3 dan non-B3',
        'Penegakan hukum lingkungan',
        'Evaluasi dokumen lingkungan (AMDAL, UKL-UPL)',
        'Koordinasi penanganan darurat pencemaran'
      ]
    },
    {
      slug: 'pengelolaan-sampah',
      name: 'Bidang Pengelolaan Sampah',
      aboutTitle: 'Tentang Bidang Pengelolaan Sampah',
      aboutDescription: 'Bidang Pengelolaan Sampah bertanggung jawab dalam melaksanakan pengurangan dan penanganan sampah, termasuk pengembangan teknologi ramah lingkungan dan pemberdayaan masyarakat dalam pengelolaan sampah di Kota Tasikmalaya.',
      tugasPokokTitle: 'Tugas Pokok',
      tugasPokok: [
        'Melaksanakan pengurangan sampah di sumbernya',
        'Menyelenggarakan penanganan sampah yang ramah lingkungan',
        'Melaksanakan pengembangan teknologi pengelolaan sampah',
        'Melaksanakan pemberdayaan masyarakat dalam pengelolaan sampah',
        'Menyelenggarakan pengelolaan TPS dan TPA',
        'Melaksanakan program daur ulang dan 3R (Reduce, Reuse, Recycle)'
      ],
      fungsiTitle: 'Fungsi',
      fungsi: [
        'Penyusunan kebijakan teknis pengelolaan sampah',
        'Pelaksanaan sistem pengumpulan dan pengangkutan sampah',
        'Pengelolaan tempat pengelolaan sampah terpadu (TPST)',
        'Pengembangan teknologi pengolahan sampah',
        'Pemberdayaan masyarakat dalam pengelolaan sampah',
        'Monitoring dan evaluasi pengelolaan sampah'
      ]
    }
  ];

  for (const bidang of bidangData) {
    await prisma.bidang.upsert({
      where: { slug: bidang.slug },
      update: {},
      create: bidang
    });
  }

  // 8. Create Employee Statistics
  console.log('📊 Creating employee statistics...');
  const employeeStats = [
    // Status Kepegawaian
    { category: 'status', subcategory: 'PNS', count: 38, description: 'Pegawai Negeri Sipil', order: 1 },
    { category: 'status', subcategory: 'PPPK', count: 5, description: 'Pegawai Pemerintah dengan Perjanjian Kerja', order: 2 },
    { category: 'status', subcategory: 'Honorer', count: 2, description: 'Pegawai Honorer', order: 3 },
    
    // Pendidikan
    { category: 'education', subcategory: 'S2', count: 8, description: 'Magister', order: 1 },
    { category: 'education', subcategory: 'S1', count: 22, description: 'Sarjana', order: 2 },
    { category: 'education', subcategory: 'Diploma', count: 7, description: 'Diploma', order: 3 },
    { category: 'education', subcategory: 'SMA/SMK', count: 6, description: 'SMA/SMK', order: 4 },
    { category: 'education', subcategory: 'SMP', count: 2, description: 'SMP', order: 5 },
    
    // Golongan IV
    { category: 'rank_iv', subcategory: 'IV/e', count: 1, description: 'Pembina Utama Madya', order: 1 },
    { category: 'rank_iv', subcategory: 'IV/d', count: 2, description: 'Pembina Utama Muda', order: 2 },
    { category: 'rank_iv', subcategory: 'IV/c', count: 3, description: 'Pembina Tk. I', order: 3 },
    { category: 'rank_iv', subcategory: 'IV/b', count: 4, description: 'Pembina', order: 4 },
    { category: 'rank_iv', subcategory: 'IV/a', count: 6, description: 'Pembina', order: 5 },
    
    // Golongan III & II
    { category: 'rank_other', subcategory: 'III/d', count: 8, description: 'Penata Tk. I', order: 1 },
    { category: 'rank_other', subcategory: 'III/c', count: 7, description: 'Penata', order: 2 },
    { category: 'rank_other', subcategory: 'III/b', count: 5, description: 'Penata Muda Tk. I', order: 3 },
    { category: 'rank_other', subcategory: 'III/a', count: 4, description: 'Penata Muda', order: 4 },
    { category: 'rank_other', subcategory: 'II/c,II/b,II/a', count: 5, description: 'Pengatur', order: 5 },
    
    // Usia
    { category: 'age', subcategory: '20-35', count: 12, description: 'Muda (20-35 tahun)', order: 1 },
    { category: 'age', subcategory: '36-50', count: 22, description: 'Produktif (36-50 tahun)', order: 2 },
    { category: 'age', subcategory: '51+', count: 11, description: 'Senior (51+ tahun)', order: 3 },
  ];

  for (const stat of employeeStats) {
    await prisma.employeeStatistic.upsert({
      where: {
        category_subcategory: {
          category: stat.category,
          subcategory: stat.subcategory
        }
      },
      update: {
        count: stat.count,
        description: stat.description,
        order: stat.order
      },
      create: stat
    });
  }

  // 9. Create sample staff members
  console.log('👥 Creating sample staff members...')
  const sampleStaff = [
    // Kepala Dinas
    {
      name: 'Dr. H. Asep Supriatna, S.T., M.Si',
      position: 'Kepala Dinas Lingkungan Hidup',
      type: 'KEPALA_DINAS' as const,
      employmentStatus: 'PNS' as const,
      education: 'S3' as const,
      rank: 'IV/d',
      birthDate: new Date('1970-04-10'),
      photo: '/pemimpin-placeholder.svg',
      isActive: true,
      isPublished: true
    },
    // Wakil Kepala Dinas
    {
      name: 'Drs. H. Muhammad Ridwan, M.Si',
      position: 'Wakil Kepala Dinas Lingkungan Hidup',
      type: 'WAKIL' as const,
      employmentStatus: 'PNS' as const,
      education: 'S2' as const,
      rank: 'IV/c',
      birthDate: new Date('1975-05-12'),
      photo: '/pemimpin-placeholder.svg',
      isActive: true,
      isPublished: true
    },
    // Sekretaris
    {
      name: 'Ir. Siti Aminah, M.T',
      position: 'Sekretaris Dinas',
      type: 'SEKRETARIS' as const,
      employmentStatus: 'PNS' as const,
      education: 'S2' as const,
      rank: 'IV/b',
      birthDate: new Date('1978-08-22'),
      photo: '/pemimpin-placeholder.svg',
      isActive: true,
      isPublished: true
    },
    // Kepala Bidang
    {
      name: 'Dr. Ir. Ahmad Fauzi, M.Sc',
      position: 'Kepala Bidang Tata Lingkungan',
      type: 'KABID' as const,
      employmentStatus: 'PNS' as const,
      education: 'S3' as const,
      rank: 'IV/a',
      birthDate: new Date('1980-03-15'),
      photo: '/pemimpin-placeholder.svg',
      isActive: true,
      isPublished: true
    },
    {
      name: 'Ir. Rina Kartika, M.T',
      position: 'Kepala Bidang Pengendalian Pencemaran',
      type: 'KABID' as const,
      employmentStatus: 'PNS' as const,
      education: 'S2' as const,
      rank: 'IV/a',
      birthDate: new Date('1982-11-08'),
      photo: '/pemimpin-placeholder.svg',
      isActive: true,
      isPublished: true
    },
    {
      name: 'Drs. Bambang Sutrisno, M.Si',
      position: 'Kepala Bidang Penataan Lingkungan',
      type: 'KABID' as const,
      employmentStatus: 'PNS' as const,
      education: 'S2' as const,
      rank: 'III/d',
      birthDate: new Date('1979-06-25'),
      photo: '/pemimpin-placeholder.svg',
      isActive: true,
      isPublished: true
    },
    // Staff
    {
      name: 'Andi Kurniawan, S.T',
      position: 'Staf Teknis Bidang Tata Lingkungan',
      type: 'STAFF' as const,
      employmentStatus: 'PNS' as const,
      education: 'S1' as const,
      rank: 'III/b',
      birthDate: new Date('1985-12-03'),
      photo: '/pemimpin-placeholder.svg',
      isActive: true,
      isPublished: true
    },
    {
      name: 'Maya Sari, S.Si',
      position: 'Staf Laboratorium Lingkungan',
      type: 'STAFF' as const,
      employmentStatus: 'PNS' as const,
      education: 'S1' as const,
      rank: 'III/a',
      birthDate: new Date('1987-07-18'),
      photo: '/pemimpin-placeholder.svg',
      isActive: true,
      isPublished: true
    },
    {
      name: 'Rudi Hermawan, S.H',
      position: 'Staf Bidang Hukum dan Administrasi',
      type: 'STAFF' as const,
      employmentStatus: 'PNS' as const,
      education: 'S1' as const,
      rank: 'II/c',
      birthDate: new Date('1990-02-14'),
      photo: '/pemimpin-placeholder.svg',
      isActive: true,
      isPublished: true
    },
    {
      name: 'Desi Rahmawati, A.Md',
      position: 'Staf Administrasi',
      type: 'STAFF' as const,
      employmentStatus: 'PPPK' as const,
      education: 'DIPLOMA' as const,
      rank: 'II/a',
      birthDate: new Date('1992-09-28'),
      photo: '/pemimpin-placeholder.svg',
      isActive: true,
      isPublished: true
    },
    {
      name: 'Budi Santoso',
      position: 'Staf Kebersihan',
      type: 'STAFF' as const,
      employmentStatus: 'HONORER' as const,
      education: 'SMA_SMK' as const,
      rank: '',
      birthDate: new Date('1988-11-15'),
      photo: '/pemimpin-placeholder.svg',
      isActive: true,
      isPublished: true
    }
  ];

  for (const staff of sampleStaff) {
    await prisma.staffMember.create({
      data: staff
    });
  }

  console.log('✅ Database seeded successfully!')
  console.log(`👤 Admin user: ${admin.email} (password: admin123)`)
  console.log(`📂 Categories: ${createdCategories.length} created`)
  console.log(`📝 Articles: ${articles.length} created`)
  console.log(`📰 News: ${news.length} created`)
  console.log(`⚙️ Settings: ${settings.length} created`)
  console.log(`👑 Leader staff member created`)
  console.log(`🏢 Bidang: ${bidangData.length} created`)
  console.log(`� Sample staff: ${sampleStaff.length} created`)
  console.log(`�📊 Employee statistics: ${employeeStats.length} created`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('❌ Seeding failed:', e)
    await prisma.$disconnect()
    process.exit(1)
  })
