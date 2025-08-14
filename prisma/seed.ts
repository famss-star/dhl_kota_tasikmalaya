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

  // 6. Create leader profile
  console.log('👑 Creating leader profile...')
  await prisma.leader.upsert({
    where: { id: 'default-leader' },
    update: {},
    create: {
      id: 'default-leader',
      name: 'Dr. H. Ahmad Suherman, M.Si',
      position: 'Kepala Dinas Lingkungan Hidup Kota Tasikmalaya',
      greeting: 'Selamat datang di portal resmi Dinas Lingkungan Hidup Kota Tasikmalaya. Kami berkomitmen untuk menjaga kelestarian lingkungan hidup demi masa depan yang berkelanjutan bagi generasi mendatang.',
      photo: 'https://portal.tasikmalayakota.go.id/assets/uploads/kepala-dlh.jpg',
      isActive: true,
    }
  })

  console.log('✅ Database seeded successfully!')
  console.log(`👤 Admin user: ${admin.email} (password: admin123)`)
  console.log(`📂 Categories: ${createdCategories.length} created`)
  console.log(`📝 Articles: ${articles.length} created`)
  console.log(`📰 News: ${news.length} created`)
  console.log(`⚙️ Settings: ${settings.length} created`)
  console.log(`👑 Leader profile created`)
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
