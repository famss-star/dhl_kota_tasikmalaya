import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcryptjs'

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

  // 2. Create sample perizinan data
  console.log('📋 Creating sample perizinan data...')
  
  // Sample AMDAL data
  const amdalData = [
    {
      nomor_surat: 'AMDAL/001/2024',
      pemohon: 'PT. Pembangunan Berkelanjutan',
      nama_rencana_kegiatan: 'Pembangunan Kawasan Industri Ramah Lingkungan',
      jenis_rencana_kegiatan: 'Industri Manufaktur',
      skala_kegiatan: 'besar',
      lokasi: 'Kawasan Industri Tasikmalaya, Jawa Barat',
      deskripsi_kegiatan: 'Pengembangan kawasan industri dengan konsep ramah lingkungan dan berkelanjutan seluas 50 hektar untuk industri tekstil dan kerajinan.',
      tanggal_pengajuan: new Date('2024-01-15'),
      tanggal_terbit: new Date('2024-03-20'),
      masa_berlaku: new Date('2029-03-20'),
      status: 'disetujui',
      nilai_investasi: 50000000000,
      luas_area: 50.5,
      rona_lingkungan_hidup: 'Kondisi lingkungan hidup awal menunjukkan kualitas udara dan air dalam batas normal dengan vegetasi yang cukup baik.',
      prakiraan_dampak: 'Peningkatan aktivitas industri dapat menimbulkan dampak terhadap kualitas udara dan air serta kebisingan.',
      evaluasi_dampak: 'Dampak dapat dikelola dengan baik melalui teknologi bersih dan sistem pengelolaan lingkungan yang tepat.',
      rencana_pengelolaan: 'Implementasi ISO 14001, penggunaan teknologi bersih, dan program CSR lingkungan.',
      rencana_pemantauan: 'Monitoring kualitas udara dan air secara berkala, serta evaluasi dampak sosial ekonomi.',
      persyaratan_terpenuhi: true,
      catatan: 'Sudah memenuhi persyaratan teknis dan administratif.',
      dokumen_pendukung: JSON.stringify(['feasibility_study.pdf', 'environmental_impact.pdf'])
    },
    {
      nomor_surat: 'AMDAL/002/2024',
      pemohon: 'CV. Agro Mandiri Sejahtera',
      nama_rencana_kegiatan: 'Pengembangan Perkebunan Kelapa Sawit Berkelanjutan',
      jenis_rencana_kegiatan: 'Perkebunan',
      skala_kegiatan: 'menengah',
      lokasi: 'Desa Sukamaju, Kecamatan Cibeureum',
      deskripsi_kegiatan: 'Pengembangan perkebunan kelapa sawit dengan sistem agroforestri dan pengelolaan ramah lingkungan seluas 25 hektar.',
      tanggal_pengajuan: new Date('2024-02-10'),
      status: 'dalam_review',
      nilai_investasi: 15000000000,
      luas_area: 25.0,
      rona_lingkungan_hidup: 'Area bekas hutan sekunder dengan keanekaragaman hayati yang masih terjaga.',
      prakiraan_dampak: 'Perubahan tutupan lahan dan potensi dampak terhadap keanekaragaman hayati lokal.',
      evaluasi_dampak: 'Perlu penerapan sistem agroforestri untuk meminimalkan dampak ekologi.',
      rencana_pengelolaan: 'Penerapan sertifikasi RSPO dan sistem agroforestri dengan tanaman endemik.',
      rencana_pemantauan: 'Monitoring keanekaragaman hayati dan kualitas tanah secara berkala.',
      persyaratan_terpenuhi: false,
      catatan: 'Masih dalam proses review dokumen teknis.',
      dokumen_pendukung: JSON.stringify(['plantation_plan.pdf', 'biodiversity_study.pdf'])
    }
  ];

  for (const amdal of amdalData) {
    await prisma.amdal.upsert({
      where: { nomor_surat: amdal.nomor_surat },
      update: {},
      create: amdal
    });
  }

  // Sample IPLC data
  const iplcData = [
    {
      nomor_surat: 'IPLC/001/2024',
      pemohon: 'PT. Maju Bersama',
      nama_kegiatan: 'Pembangunan Gedung Perkantoran',
      jenis_kegiatan: 'Konstruksi',
      kategori_usaha: 'wajib_iplc',
      lokasi: 'Jl. Ahmad Yani No. 123, Tasikmalaya',
      deskripsi_kegiatan: 'Pembangunan gedung perkantoran 15 lantai dengan luas bangunan 5000 m2.',
      tanggal_pengajuan: new Date('2024-02-01'),
      tanggal_terbit: new Date('2024-03-15'),
      masa_berlaku: new Date('2027-03-15'),
      status: 'disetujui',
      nilai_investasi: 75000000000,
      luas_area: 2.5,
      dampak_lingkungan: 'Kebisingan konstruksi, debu, limbah konstruksi, dan peningkatan lalu lintas.',
      upaya_pengelolaan: 'Penjadwalan kerja sesuai jam operasional, penyiraman area kerja, pengelolaan limbah konstruksi.',
      upaya_pemantauan: 'Monitoring kebisingan harian, kualitas udara mingguan, dan pengelolaan limbah.',
      komitmen_lingkungan: 'Komitmen menerapkan green building concept dan pengelolaan konstruksi berkelanjutan.',
      persyaratan_terpenuhi: true,
      catatan: 'Memenuhi persyaratan teknis dan administratif.',
      dokumen_pendukung: JSON.stringify(['building_plan.pdf', 'construction_method.pdf'])
    }
  ];

  for (const iplc of iplcData) {
    await prisma.iplc.upsert({
      where: { nomor_surat: iplc.nomor_surat },
      update: {},
      create: iplc
    });
  }

  // 3. Create page content data
  console.log('📄 Creating page content data...')
  
  const amdalPageContent = [
    {
      page: 'amdal',
      section: 'about',
      title: 'Apa itu AMDAL?',
      content: 'AMDAL (Analisis Mengenai Dampak Lingkungan) adalah kajian mengenai dampak penting suatu usaha dan/atau kegiatan yang direncanakan pada lingkungan hidup yang diperlukan bagi proses pengambilan keputusan tentang penyelenggaraan usaha dan/atau kegiatan.',
      order: 1,
      isActive: true
    },
    {
      page: 'amdal',
      section: 'legal',
      title: 'Dasar Hukum',
      content: 'Peraturan Pemerintah Republik Indonesia Nomor 22 Tahun 2021 tentang Penyelenggaraan Perlindungan dan Pengelolaan Lingkungan Hidup. Peraturan Menteri Lingkungan Hidup dan Kehutanan Nomor 4 Tahun 2021 tentang Daftar Usaha dan/atau Kegiatan Wajib Memiliki Analisis Mengenai Dampak Lingkungan Hidup.',
      order: 2,
      isActive: true
    },
    {
      page: 'amdal',
      section: 'procedure',
      title: 'Prosedur Pengajuan',
      content: '1. Persiapan dokumen persyaratan\n2. Pengajuan permohonan ke Dinas Lingkungan Hidup\n3. Verifikasi kelengkapan dokumen\n4. Penilaian teknis dan administratif\n5. Konsultasi publik (jika diperlukan)\n6. Keputusan kelayakan lingkungan hidup\n7. Penerbitan izin AMDAL',
      order: 3,
      isActive: true
    },
    {
      page: 'amdal',
      section: 'cost',
      title: 'Biaya dan Waktu',
      content: 'Biaya retribusi sesuai Perda Kota Tasikmalaya tentang Retribusi Perizinan Tertentu. Waktu proses: 75 hari kerja setelah dokumen dinyatakan lengkap dan benar.',
      order: 4,
      isActive: true
    },
    {
      page: 'amdal',
      section: 'contact',
      title: 'Informasi Kontak',
      content: 'Seksi Penilaian Dampak Lingkungan\nDinas Lingkungan Hidup Kota Tasikmalaya\nJl. Letjend Mashudi No. 1, Tasikmalaya\nTelp: (0265) 334455\nEmail: amdal@dlhtasik.go.id\nJam Pelayanan: Senin-Jumat 08:00-15:00 WIB',
      order: 5,
      isActive: true
    }
  ];

  for (const content of amdalPageContent) {
    await prisma.pageContent.upsert({
      where: {
        page_section: {
          page: content.page,
          section: content.section
        }
      },
      update: {},
      create: content
    });
  }

  const spplPageContent = [
    {
      page: 'sppl',
      section: 'about',
      title: 'Apa itu SPPL?',
      content: 'SPPL (Surat Pernyataan Kesanggupan Pengelolaan dan Pemantauan Lingkungan Hidup) adalah surat pernyataan kesanggupan dari penanggung jawab usaha dan/atau kegiatan untuk melakukan pengelolaan dan pemantauan lingkungan hidup atas dampak lingkungan hidup dari usaha dan/atau kegiatannya.',
      order: 1,
      isActive: true
    },
    {
      page: 'sppl',
      section: 'legal',
      title: 'Dasar Hukum',
      content: 'Peraturan Pemerintah Republik Indonesia Nomor 22 Tahun 2021 tentang Penyelenggaraan Perlindungan dan Pengelolaan Lingkungan Hidup. Peraturan Menteri Lingkungan Hidup dan Kehutanan Nomor 5 Tahun 2021 tentang Tata Cara Penerbitan Persetujuan Teknis dan Surat Pernyataan Kesanggupan Pengelolaan dan Pemantauan Lingkungan Hidup.',
      order: 2,
      isActive: true
    },
    {
      page: 'sppl',
      section: 'procedure',
      title: 'Prosedur Pengajuan',
      content: '1. Pengisian formulir SPPL online\n2. Upload dokumen persyaratan\n3. Verifikasi data dan dokumen\n4. Pemeriksaan teknis lokasi\n5. Evaluasi kelengkapan\n6. Penerbitan SPPL\n7. Pemantauan berkala',
      order: 3,
      isActive: true
    },
    {
      page: 'sppl',
      section: 'cost',
      title: 'Biaya dan Waktu',
      content: 'Layanan SPPL tidak dikenakan biaya retribusi (gratis). Waktu proses: 5 hari kerja setelah dokumen dinyatakan lengkap dan benar.',
      order: 4,
      isActive: true
    },
    {
      page: 'sppl',
      section: 'contact',
      title: 'Informasi Kontak',
      content: 'Seksi Pengelolaan Limbah B3\nDinas Lingkungan Hidup Kota Tasikmalaya\nJl. Letjend Mashudi No. 1, Tasikmalaya\nTelp: (0265) 334455 ext. 102\nEmail: sppl@dlhtasik.go.id\nJam Pelayanan: Senin-Jumat 08:00-15:00 WIB',
      order: 5,
      isActive: true
    }
  ];

  for (const content of spplPageContent) {
    await prisma.pageContent.upsert({
      where: {
        page_section: {
          page: content.page,
          section: content.section
        }
      },
      update: {},
      create: content
    });
  }

  const uklUplPageContent = [
    {
      page: 'ukl-upl',
      section: 'about',
      title: 'Apa itu UKL-UPL?',
      content: 'UKL-UPL (Upaya Pengelolaan Lingkungan Hidup dan Upaya Pemantauan Lingkungan Hidup) adalah upaya yang dilakukan dalam pengelolaan dan pemantauan lingkungan hidup oleh penanggung jawab usaha dan/atau kegiatan yang tidak wajib melakukan AMDAL.',
      order: 1,
      isActive: true
    },
    {
      page: 'ukl-upl',
      section: 'legal',
      title: 'Dasar Hukum',
      content: 'Peraturan Pemerintah Republik Indonesia Nomor 22 Tahun 2021 tentang Penyelenggaraan Perlindungan dan Pengelolaan Lingkungan Hidup. Peraturan Menteri Lingkungan Hidup dan Kehutanan Nomor 2 Tahun 2022 tentang Pedoman Penyelenggaraan Upaya Pengelolaan Lingkungan Hidup dan Upaya Pemantauan Lingkungan Hidup.',
      order: 2,
      isActive: true
    },
    {
      page: 'ukl-upl',
      section: 'procedure',
      title: 'Prosedur Pengajuan',
      content: '1. Persiapan dokumen UKL-UPL\n2. Pengajuan permohonan persetujuan UKL-UPL\n3. Pemeriksaan kelengkapan dokumen\n4. Evaluasi dokumen UKL-UPL\n5. Konsultasi dan perbaikan (jika diperlukan)\n6. Penerbitan persetujuan UKL-UPL\n7. Implementasi dan pemantauan',
      order: 3,
      isActive: true
    },
    {
      page: 'ukl-upl',
      section: 'cost',
      title: 'Biaya dan Waktu',
      content: 'Biaya retribusi sesuai Perda Kota Tasikmalaya tentang Retribusi Perizinan Tertentu. Waktu proses: 30 hari kerja setelah dokumen dinyatakan lengkap dan benar.',
      order: 4,
      isActive: true
    },
    {
      page: 'ukl-upl',
      section: 'contact',
      title: 'Informasi Kontak',
      content: 'Seksi Pengendalian Pencemaran Lingkungan\nDinas Lingkungan Hidup Kota Tasikmalaya\nJl. Letjend Mashudi No. 1, Tasikmalaya\nTelp: (0265) 334455 ext. 103\nEmail: uklupl@dlhtasik.go.id\nJam Pelayanan: Senin-Jumat 08:00-15:00 WIB',
      order: 5,
      isActive: true
    }
  ];

  for (const content of uklUplPageContent) {
    await prisma.pageContent.upsert({
      where: {
        page_section: {
          page: content.page,
          section: content.section
        }
      },
      update: {},
      create: content
    });
  }

  const iplcPageContent = [
    {
      page: 'iplc',
      section: 'about',
      title: 'Apa itu IPLC?',
      content: 'IPLC (Izin Perlindungan dan Pengelolaan Lingkungan Hidup untuk Usaha dan/atau Kegiatan) adalah izin yang diberikan kepada setiap orang yang melakukan usaha dan/atau kegiatan yang wajib UKL-UPL atau SPPL dalam rangka perlindungan dan pengelolaan lingkungan hidup sebagai prasyarat memperoleh izin usaha dan/atau kegiatan.',
      order: 1,
      isActive: true
    },
    {
      page: 'iplc',
      section: 'legal',
      title: 'Dasar Hukum',
      content: 'Peraturan Pemerintah Republik Indonesia Nomor 22 Tahun 2021 tentang Penyelenggaraan Perlindungan dan Pengelolaan Lingkungan Hidup. Peraturan Menteri Lingkungan Hidup dan Kehutanan Nomor 4 Tahun 2021 tentang Perubahan atas Peraturan Menteri Lingkungan Hidup dan Kehutanan Nomor P.5/MENLHK/SETJEN/KUM.1/3/2021.',
      order: 2,
      isActive: true
    },
    {
      page: 'iplc',
      section: 'procedure',
      title: 'Prosedur Pengajuan',
      content: '1. Persiapan dokumen persyaratan IPLC\n2. Pengajuan permohonan IPLC secara online\n3. Verifikasi kelengkapan dokumen\n4. Penilaian teknis dan administratif\n5. Inspeksi lapangan (jika diperlukan)\n6. Keputusan persetujuan IPLC\n7. Penerbitan surat izin IPLC',
      order: 3,
      isActive: true
    },
    {
      page: 'iplc',
      section: 'cost',
      title: 'Biaya dan Waktu',
      content: 'Biaya retribusi sesuai Perda Kota Tasikmalaya tentang Retribusi Perizinan Tertentu. Waktu proses: 7 hari kerja untuk kegiatan berisiko rendah, 15 hari kerja untuk kegiatan berisiko menengah tinggi setelah dokumen dinyatakan lengkap dan benar.',
      order: 4,
      isActive: true
    },
    {
      page: 'iplc',
      section: 'contact',
      title: 'Informasi Kontak',
      content: 'Seksi Penilaian dan Perizinan Lingkungan\nDinas Lingkungan Hidup Kota Tasikmalaya\nJl. Letjend Mashudi No. 1, Tasikmalaya\nTelp: (0265) 334455 ext. 104\nEmail: iplc@dlhtasik.go.id\nJam Pelayanan: Senin-Jumat 08:00-15:00 WIB',
      order: 5,
      isActive: true
    }
  ];

  for (const content of iplcPageContent) {
    await prisma.pageContent.upsert({
      where: {
        page_section: {
          page: content.page,
          section: content.section
        }
      },
      update: {},
      create: content
    });
  }

  console.log('✅ Database seeded successfully!')
  console.log(`👤 Admin user: ${admin.email} (password: admin123)`)
  console.log(`📋 AMDAL samples: ${amdalData.length} created`)
  console.log(`📋 IPLC samples: ${iplcData.length} created`)
  console.log(`📄 AMDAL page content: ${amdalPageContent.length} sections created`)
  console.log(`📄 SPPL page content: ${spplPageContent.length} sections created`)
  console.log(`📄 UKL-UPL page content: ${uklUplPageContent.length} sections created`)
  console.log(`📄 IPLC page content: ${iplcPageContent.length} sections created`)

  // 📞 Contact Settings
  console.log('📞 Creating contact settings...')
  const contactSettings = [
    // Office Info
    await prisma.contactSetting.upsert({
      where: { id: 'office-name' },
      create: {
        id: 'office-name',
        type: 'contact',
        label: 'Nama Instansi',
        value: 'Dinas Lingkungan Hidup Kota Tasikmalaya',
        order: 1,
        isActive: true
      },
      update: { updatedAt: new Date() }
    }),
    await prisma.contactSetting.upsert({
      where: { id: 'office-address' },
      create: {
        id: 'office-address',
        type: 'contact',
        label: 'Alamat',
        value: 'Jl. RE Martadinata No.1\nKota Tasikmalaya, Jawa Barat\n46116',
        order: 2,
        isActive: true
      },
      update: { updatedAt: new Date() }
    }),
    // Phone Info
    await prisma.contactSetting.upsert({
      where: { id: 'office-phone' },
      create: {
        id: 'office-phone',
        type: 'contact',
        label: 'Telepon',
        value: '(0265) 321234',
        order: 3,
        isActive: true
      },
      update: { updatedAt: new Date() }
    }),
    await prisma.contactSetting.upsert({
      where: { id: 'office-fax' },
      create: {
        id: 'office-fax',
        type: 'contact',
        label: 'Fax',
        value: '(0265) 321235',
        order: 4,
        isActive: true
      },
      update: { updatedAt: new Date() }
    }),
    await prisma.contactSetting.upsert({
      where: { id: 'office-whatsapp' },
      create: {
        id: 'office-whatsapp',
        type: 'contact',
        label: 'WhatsApp',
        value: '0812-3456-7890',
        order: 5,
        isActive: true
      },
      update: { updatedAt: new Date() }
    }),
    // Email Info
    await prisma.contactSetting.upsert({
      where: { id: 'office-email-primary' },
      create: {
        id: 'office-email-primary',
        type: 'contact',
        label: 'Email Utama',
        value: 'info@dlh.tasikmalayakota.go.id',
        order: 6,
        isActive: true
      },
      update: { updatedAt: new Date() }
    }),
    await prisma.contactSetting.upsert({
      where: { id: 'office-email' },
      create: {
        id: 'office-email',
        type: 'contact',
        label: 'Email',
        value: 'dlh@tasikmalayakota.go.id',
        order: 7,
        isActive: true
      },
      update: { updatedAt: new Date() }
    }),
    await prisma.contactSetting.upsert({
      where: { id: 'office-email-complaint' },
      create: {
        id: 'office-email-complaint',
        type: 'contact',
        label: 'Email Pengaduan',
        value: 'pengaduan@dlh.tasikmalayakota.go.id',
        order: 8,
        isActive: true
      },
      update: { updatedAt: new Date() }
    }),
    // Operating Hours
    await prisma.contactSetting.upsert({
      where: { id: 'hours-monday-thursday' },
      create: {
        id: 'hours-monday-thursday',
        type: 'hours',
        label: 'Senin - Kamis',
        value: '08:00 - 16:00 WIB',
        order: 9,
        isActive: true
      },
      update: { updatedAt: new Date() }
    }),
    await prisma.contactSetting.upsert({
      where: { id: 'hours-friday' },
      create: {
        id: 'hours-friday',
        type: 'hours',
        label: 'Jumat',
        value: '08:00 - 11:30 WIB',
        order: 10,
        isActive: true
      },
      update: { updatedAt: new Date() }
    }),
    await prisma.contactSetting.upsert({
      where: { id: 'hours-weekend' },
      create: {
        id: 'hours-weekend',
        type: 'hours',
        label: 'Sabtu - Minggu',
        value: 'Tutup',
        order: 11,
        isActive: true
      },
      update: { updatedAt: new Date() }
    }),
    await prisma.contactSetting.upsert({
      where: { id: 'hours-holiday' },
      create: {
        id: 'hours-holiday',
        type: 'hours',
        label: 'Hari Libur',
        value: 'Tutup',
        order: 12,
        isActive: true
      },
      update: { updatedAt: new Date() }
    }),
    // Social Media
    await prisma.contactSetting.upsert({
      where: { id: 'social-facebook' },
      create: {
        id: 'social-facebook',
        type: 'social',
        label: 'Facebook',
        value: 'DLH Kota Tasikmalaya',
        url: 'https://facebook.com/dlh.kotatasikmalaya',
        order: 13,
        isActive: true
      },
      update: { updatedAt: new Date() }
    }),
    await prisma.contactSetting.upsert({
      where: { id: 'social-twitter' },
      create: {
        id: 'social-twitter',
        type: 'social',
        label: 'Twitter',
        value: '@DLH_Tasikmalaya',
        url: 'https://twitter.com/dlh_tasikmalaya',
        order: 14,
        isActive: true
      },
      update: { updatedAt: new Date() }
    }),
    await prisma.contactSetting.upsert({
      where: { id: 'social-instagram' },
      create: {
        id: 'social-instagram',
        type: 'social',
        label: 'Instagram',
        value: 'DLH Tasikmalaya',
        url: 'https://instagram.com/dlh.kotatasikmalaya',
        order: 15,
        isActive: true
      },
      update: { updatedAt: new Date() }
    }),
    await prisma.contactSetting.upsert({
      where: { id: 'social-youtube' },
      create: {
        id: 'social-youtube',
        type: 'social',
        label: 'YouTube',
        value: 'DLH Tasikmalaya',
        url: 'https://youtube.com/c/dlhtasikmalaya',
        order: 16,
        isActive: true
      },
      update: { updatedAt: new Date() }
    })
  ]

    console.log(`📞 Contact settings: ${contactSettings.length} items created`)

  // 🏢 Organization Profile (Visi, Misi, Tentang)
  console.log('🏢 Creating organization profile data...')
  const profileSettings = [
    // Visi
    await prisma.siteSetting.upsert({
      where: { key: 'visi' },
      create: {
        key: 'visi',
        value: 'Menjadi pelopor dalam mewujudkan Kota Tasikmalaya yang bersih, sehat, dan berkelanjutan melalui pengelolaan lingkungan hidup yang inovatif dan partisipatif.',
        label: 'Visi Organisasi',
        description: 'Visi Dinas Lingkungan Hidup Kota Tasikmalaya'
      },
      update: { updatedAt: new Date() }
    }),

    // Misi
    await prisma.siteSetting.upsert({
      where: { key: 'misi_1' },
      create: {
        key: 'misi_1',
        value: 'Meningkatkan kualitas lingkungan hidup melalui pengawasan, pengendalian, dan penegakan hukum lingkungan.',
        label: 'Misi 1',
        description: 'Misi pertama DLH Kota Tasikmalaya'
      },
      update: { updatedAt: new Date() }
    }),
    await prisma.siteSetting.upsert({
      where: { key: 'misi_2' },
      create: {
        key: 'misi_2',
        value: 'Mengembangkan sistem pengelolaan persampahan yang terintegrasi dan berkelanjutan.',
        label: 'Misi 2',
        description: 'Misi kedua DLH Kota Tasikmalaya'
      },
      update: { updatedAt: new Date() }
    }),
    await prisma.siteSetting.upsert({
      where: { key: 'misi_3' },
      create: {
        key: 'misi_3',
        value: 'Meningkatkan kesadaran masyarakat tentang pentingnya pelestarian lingkungan hidup.',
        label: 'Misi 3',
        description: 'Misi ketiga DLH Kota Tasikmalaya'
      },
      update: { updatedAt: new Date() }
    }),
    await prisma.siteSetting.upsert({
      where: { key: 'misi_4' },
      create: {
        key: 'misi_4',
        value: 'Mengoptimalkan pemanfaatan teknologi ramah lingkungan dalam pengelolaan lingkungan hidup.',
        label: 'Misi 4',
        description: 'Misi keempat DLH Kota Tasikmalaya'
      },
      update: { updatedAt: new Date() }
    }),
    await prisma.siteSetting.upsert({
      where: { key: 'misi_5' },
      create: {
        key: 'misi_5',
        value: 'Membangun kemitraan strategis dengan berbagai pihak dalam upaya pelestarian lingkungan hidup.',
        label: 'Misi 5',
        description: 'Misi kelima DLH Kota Tasikmalaya'
      },
      update: { updatedAt: new Date() }
    }),

    // Tentang Kami
    await prisma.siteSetting.upsert({
      where: { key: 'tentang_kami' },
      create: {
        key: 'tentang_kami',
        value: 'Dinas Lingkungan Hidup Kota Tasikmalaya adalah instansi pemerintah yang bertanggung jawab dalam pengelolaan, pengawasan, dan perlindungan lingkungan hidup di wilayah Kota Tasikmalaya. Dengan komitmen tinggi terhadap kelestarian lingkungan, kami berupaya menciptakan lingkungan yang bersih, sehat, dan berkelanjutan untuk generasi masa depan.',
        label: 'Tentang Kami',
        description: 'Deskripsi tentang DLH Kota Tasikmalaya'
      },
      update: { updatedAt: new Date() }
    }),

    // Tugas Pokok
    await prisma.siteSetting.upsert({
      where: { key: 'tugas_pokok' },
      create: {
        key: 'tugas_pokok',
        value: 'Melaksanakan urusan pemerintahan daerah bidang lingkungan hidup berdasarkan asas otonomi dan tugas pembantuan.',
        label: 'Tugas Pokok',
        description: 'Tugas pokok DLH Kota Tasikmalaya'
      },
      update: { updatedAt: new Date() }
    }),

    // Tupoksi Kepala Dinas
    await prisma.siteSetting.upsert({
      where: { key: 'tupoksi_kepala_dinas_desc' },
      create: {
        key: 'tupoksi_kepala_dinas_desc',
        value: 'Kepala Dinas mempunyai tugas memimpin pelaksanaan urusan pemerintahan yang menjadi kewenangan daerah di bidang lingkungan hidup.',
        label: 'Tupoksi Kepala Dinas',
        description: 'Deskripsi tupoksi kepala dinas'
      },
      update: { updatedAt: new Date() }
    }),
    await prisma.siteSetting.upsert({
      where: { key: 'tupoksi_kepala_dinas_tugas_1' },
      create: {
        key: 'tupoksi_kepala_dinas_tugas_1',
        value: 'Merumuskan kebijakan teknis di bidang lingkungan hidup',
        label: 'Tugas Kepala Dinas 1',
        description: 'Tugas pertama kepala dinas'
      },
      update: { updatedAt: new Date() }
    }),
    await prisma.siteSetting.upsert({
      where: { key: 'tupoksi_kepala_dinas_tugas_2' },
      create: {
        key: 'tupoksi_kepala_dinas_tugas_2',
        value: 'Menyelenggarakan urusan pemerintahan dan pelayanan umum di bidang lingkungan hidup',
        label: 'Tugas Kepala Dinas 2',
        description: 'Tugas kedua kepala dinas'
      },
      update: { updatedAt: new Date() }
    }),
    await prisma.siteSetting.upsert({
      where: { key: 'tupoksi_kepala_dinas_tugas_3' },
      create: {
        key: 'tupoksi_kepala_dinas_tugas_3',
        value: 'Membina dan melaksanakan koordinasi dengan instansi terkait',
        label: 'Tugas Kepala Dinas 3',
        description: 'Tugas ketiga kepala dinas'
      },
      update: { updatedAt: new Date() }
    }),

    // Tupoksi Sekretariat
    await prisma.siteSetting.upsert({
      where: { key: 'tupoksi_sekretariat_desc' },
      create: {
        key: 'tupoksi_sekretariat_desc',
        value: 'Sekretariat mempunyai tugas menyelenggarakan koordinasi pelaksanaan tugas, pembinaan, dan pemberian dukungan administrasi kepada seluruh unit organisasi di lingkungan Dinas.',
        label: 'Tupoksi Sekretariat',
        description: 'Deskripsi tupoksi sekretariat'
      },
      update: { updatedAt: new Date() }
    }),
    await prisma.siteSetting.upsert({
      where: { key: 'tupoksi_sekretariat_tugas_1' },
      create: {
        key: 'tupoksi_sekretariat_tugas_1',
        value: 'Menyelenggarakan koordinasi perencanaan, penganggaran, dan evaluasi program',
        label: 'Tugas Sekretariat 1',
        description: 'Tugas pertama sekretariat'
      },
      update: { updatedAt: new Date() }
    }),
    await prisma.siteSetting.upsert({
      where: { key: 'tupoksi_sekretariat_tugas_2' },
      create: {
        key: 'tupoksi_sekretariat_tugas_2',
        value: 'Menyelenggarakan administrasi keuangan, kepegawaian, dan umum',
        label: 'Tugas Sekretariat 2',
        description: 'Tugas kedua sekretariat'
      },
      update: { updatedAt: new Date() }
    }),

    // Tupoksi Sub Bagian Umum
    await prisma.siteSetting.upsert({
      where: { key: 'tupoksi_sub_umum_desc' },
      create: {
        key: 'tupoksi_sub_umum_desc',
        value: 'Sub Bagian Umum dan Kepegawaian mempunyai tugas melaksanakan urusan ketatausahaan, kepegawaian, kehumasan, dan rumah tangga.',
        label: 'Tupoksi Sub Umum',
        description: 'Deskripsi tupoksi sub bagian umum'
      },
      update: { updatedAt: new Date() }
    }),
    await prisma.siteSetting.upsert({
      where: { key: 'tupoksi_sub_umum_tugas_1' },
      create: {
        key: 'tupoksi_sub_umum_tugas_1',
        value: 'Melaksanakan pengelolaan administrasi umum dan ketatausahaan',
        label: 'Tugas Sub Umum 1',
        description: 'Tugas pertama sub bagian umum'
      },
      update: { updatedAt: new Date() }
    }),
    await prisma.siteSetting.upsert({
      where: { key: 'tupoksi_sub_umum_tugas_2' },
      create: {
        key: 'tupoksi_sub_umum_tugas_2',
        value: 'Melaksanakan administrasi kepegawaian dan pengembangan SDM',
        label: 'Tugas Sub Umum 2',
        description: 'Tugas kedua sub bagian umum'
      },
      update: { updatedAt: new Date() }
    }),

    // Tupoksi Sub Bagian Keuangan
    await prisma.siteSetting.upsert({
      where: { key: 'tupoksi_sub_keuangan_desc' },
      create: {
        key: 'tupoksi_sub_keuangan_desc',
        value: 'Sub Bagian Keuangan mempunyai tugas melaksanakan pengelolaan administrasi keuangan, perlengkapan, dan aset.',
        label: 'Tupoksi Sub Keuangan',
        description: 'Deskripsi tupoksi sub bagian keuangan'
      },
      update: { updatedAt: new Date() }
    }),
    await prisma.siteSetting.upsert({
      where: { key: 'tupoksi_sub_keuangan_tugas_1' },
      create: {
        key: 'tupoksi_sub_keuangan_tugas_1',
        value: 'Melaksanakan pengelolaan anggaran dan administrasi keuangan',
        label: 'Tugas Sub Keuangan 1',
        description: 'Tugas pertama sub bagian keuangan'
      },
      update: { updatedAt: new Date() }
    }),
    await prisma.siteSetting.upsert({
      where: { key: 'tupoksi_sub_keuangan_tugas_2' },
      create: {
        key: 'tupoksi_sub_keuangan_tugas_2',
        value: 'Melaksanakan pengelolaan barang milik daerah dan perlengkapan',
        label: 'Tugas Sub Keuangan 2',
        description: 'Tugas kedua sub bagian keuangan'
      },
      update: { updatedAt: new Date() }
    })
  ]

  console.log(`🏢 Organization profile: ${profileSettings.length} settings created`)

  // �️ Bidang Data
  console.log('🏛️ Creating bidang data...')
  const bidangData = [
    await prisma.bidang.upsert({
      where: { slug: 'tata-lingkungan' },
      create: {
        slug: 'tata-lingkungan',
        name: 'Bidang Tata Lingkungan',
        aboutTitle: 'Tentang Bidang Tata Lingkungan',
        aboutDescription: 'Bidang Tata Lingkungan mempunyai tugas pokok menyelenggarakan perumusan kebijakan teknis dan pengoordinasian penyelenggaraan kebijakan perencanaan lingkungan hidup, pengelolaan keanekaragaman hayati dan pengelolaan ruang terbuka hijau (RTH).',
        tugasPokokTitle: 'Tugas Pokok',
        tugasPokok: JSON.stringify([
          'Penyusunan dan penetapan RPPLH dan dokumen daya dukung dan daya tampung',
          'Penyusunan Kajian Lingkungan Hidup Strategis (KLHS)',
          'Pemeriksaan UKL-UPL dan fasilitasi penilaian AMDAL',
          'Pengelolaan keanekaragaman hayati dan ruang terbuka hijau',
          'Pengelolaan sarana prasarana keanekaragaman hayati dan RTH',
          'Pengembangan kapasitas kelembagaan dan SDM'
        ]),
        fungsiTitle: 'Fungsi',
        fungsi: JSON.stringify([
          'Perumusan kebijakan teknis perencanaan lingkungan hidup',
          'Pengoordinasian penyelenggaraan kebijakan perencanaan lingkungan hidup',
          'Pengelolaan keanekaragaman hayati',
          'Pengelolaan ruang terbuka hijau (RTH)'
        ]),
        seksi: JSON.stringify([
          { name: 'Seksi Tata Ruang', description: 'Menangani penataan ruang dan perencanaan lingkungan' },
          { name: 'Seksi AMDAL', description: 'Menangani analisis mengenai dampak lingkungan hidup' }
        ]),
        isActive: true
      },
      update: { updatedAt: new Date() }
    }),

    await prisma.bidang.upsert({
      where: { slug: 'pengendalian-pencemaran' },
      create: {
        slug: 'pengendalian-pencemaran',
        name: 'Bidang Pengendalian Pencemaran',
        aboutTitle: 'Tentang Bidang Pengendalian Pencemaran',
        aboutDescription: 'Bidang Pengendalian Pencemaran bertugas mengawasi dan mengendalikan pencemaran air, udara, dan tanah untuk menjaga kualitas lingkungan hidup di Kota Tasikmalaya.',
        tugasPokokTitle: 'Tugas Pokok',
        tugasPokok: JSON.stringify([
          'Monitoring Kualitas Air',
          'Pengawasan Emisi Gas Buang',
          'Pengendalian Limbah B3',
          'Pengujian Kualitas Udara',
          'Penegakan hukum lingkungan',
          'Koordinasi dengan industri dan UMKM'
        ]),
        fungsiTitle: 'Fungsi',
        fungsi: JSON.stringify([
          'Pelaksanaan pengawasan dan pengendalian pencemaran lingkungan hidup',
          'Pelaksanaan monitoring kualitas lingkungan hidup',
          'Pelaksanaan penegakan hukum lingkungan hidup',
          'Pelaksanaan koordinasi pengendalian pencemaran lintas sektoral'
        ]),
        seksi: JSON.stringify([
          { name: 'Seksi Air & Tanah', description: 'Pengendalian pencemaran air dan tanah' },
          { name: 'Seksi Udara & B3', description: 'Pengendalian pencemaran udara dan limbah B3' }
        ]),
        isActive: true
      },
      update: { updatedAt: new Date() }
    }),

    await prisma.bidang.upsert({
      where: { slug: 'pengelolaan-sampah' },
      create: {
        slug: 'pengelolaan-sampah',
        name: 'Bidang Pengelolaan Sampah',
        aboutTitle: 'Tentang Bidang Pengelolaan Sampah',
        aboutDescription: 'Bidang Pengelolaan Sampah mengelola sistem persampahan kota secara terintegrasi untuk menciptakan Kota Tasikmalaya yang bersih dan sehat.',
        tugasPokokTitle: 'Tugas Pokok',
        tugasPokok: JSON.stringify([
          'Pengumpulan dan Pengangkutan Sampah',
          'Pengelolaan TPA Regional',
          'Program 3R (Reduce, Reuse, Recycle)',
          'Bank Sampah dan Komposter',
          'Edukasi pengelolaan sampah masyarakat',
          'Koordinasi dengan stakeholder persampahan'
        ]),
        fungsiTitle: 'Fungsi',
        fungsi: JSON.stringify([
          'Pelaksanaan pengelolaan sampah rumah tangga dan sejenis sampah rumah tangga',
          'Pelaksanaan pengurangan sampah',
          'Pelaksanaan penanganan sampah',
          'Pelaksanaan koordinasi pengelolaan sampah antar daerah'
        ]),
        seksi: JSON.stringify([
          { name: 'Seksi Pengurangan', description: 'Program pengurangan dan daur ulang sampah' },
          { name: 'Seksi Penanganan', description: 'Pengumpulan, pengangkutan dan pengelolaan sampah' }
        ]),
        isActive: true
      },
      update: { updatedAt: new Date() }
    })
  ]

  console.log(`🏛️ Bidang data: ${bidangData.length} bidang created`)

  // 📚 Panduan UMK Data
  console.log('📚 Creating panduan UMK data...')
  const panduanUMKData = [
    // Dasar-dasar UMK
    await prisma.panduanUMK.upsert({
      where: { id: 'panduan-umk-pengertian' },
      create: {
        id: 'panduan-umk-pengertian',
        category: 'Dasar-dasar UMK',
        title: 'Pengertian UMK',
        description: 'Penjelasan mengenai konsep dasar Upaya Manajemen Keselamatan dalam pengelolaan lingkungan hidup',
        content: 'UMK (Upaya Manajemen Keselamatan) adalah sistem manajemen yang dirancang untuk mengelola risiko keselamatan dan kesehatan kerja serta lingkungan hidup...',
        order: 1,
        isActive: true
      },
      update: { updatedAt: new Date() }
    }),

    await prisma.panduanUMK.upsert({
      where: { id: 'panduan-umk-tujuan' },
      create: {
        id: 'panduan-umk-tujuan',
        category: 'Dasar-dasar UMK',
        title: 'Tujuan dan Manfaat',
        description: 'Tujuan penerapan UMK dan manfaatnya bagi lingkungan hidup dan masyarakat',
        content: 'Tujuan UMK meliputi pencegahan kecelakaan kerja, perlindungan lingkungan, dan peningkatan produktivitas...',
        order: 2,
        isActive: true
      },
      update: { updatedAt: new Date() }
    }),

    await prisma.panduanUMK.upsert({
      where: { id: 'panduan-umk-landasan' },
      create: {
        id: 'panduan-umk-landasan',
        category: 'Dasar-dasar UMK',
        title: 'Landasan Hukum',
        description: 'Peraturan dan regulasi yang menjadi dasar implementasi UMK',
        content: 'Landasan hukum UMK berdasarkan UU No. 32 Tahun 2009 tentang Perlindungan dan Pengelolaan Lingkungan Hidup...',
        order: 3,
        isActive: true
      },
      update: { updatedAt: new Date() }
    }),

    // Implementasi UMK
    await prisma.panduanUMK.upsert({
      where: { id: 'panduan-umk-identifikasi' },
      create: {
        id: 'panduan-umk-identifikasi',
        category: 'Implementasi UMK',
        title: 'Identifikasi Risiko',
        description: 'Cara mengidentifikasi potensi bahaya dan risiko lingkungan hidup',
        content: 'Proses identifikasi risiko meliputi pemetaan bahaya, analisis dampak, dan penilaian tingkat risiko...',
        order: 4,
        isActive: true
      },
      update: { updatedAt: new Date() }
    }),

    await prisma.panduanUMK.upsert({
      where: { id: 'panduan-umk-penilaian' },
      create: {
        id: 'panduan-umk-penilaian',
        category: 'Implementasi UMK',
        title: 'Penilaian Dampak',
        description: 'Metode penilaian dampak lingkungan hidup dalam implementasi UMK',
        content: 'Penilaian dampak dilakukan melalui studi AMDAL, UKL-UPL, dan monitoring berkelanjutan...',
        order: 5,
        isActive: true
      },
      update: { updatedAt: new Date() }
    }),

    await prisma.panduanUMK.upsert({
      where: { id: 'panduan-umk-pengendalian' },
      create: {
        id: 'panduan-umk-pengendalian',
        category: 'Implementasi UMK',
        title: 'Rencana Pengendalian',
        description: 'Penyusunan rencana pengendalian dampak lingkungan hidup',
        content: 'Rencana pengendalian mencakup mitigasi, adaptasi, dan tindakan korektif untuk mengurangi dampak negatif...',
        order: 6,
        isActive: true
      },
      update: { updatedAt: new Date() }
    }),

    // Monitoring dan Evaluasi
    await prisma.panduanUMK.upsert({
      where: { id: 'panduan-umk-pemantauan' },
      create: {
        id: 'panduan-umk-pemantauan',
        category: 'Monitoring dan Evaluasi',
        title: 'Program Pemantauan',
        description: 'Panduan pemantauan implementasi UMK secara berkelanjutan',
        content: 'Program pemantauan meliputi pengukuran parameter lingkungan, audit internal, dan evaluasi berkala...',
        order: 7,
        isActive: true
      },
      update: { updatedAt: new Date() }
    }),

    await prisma.panduanUMK.upsert({
      where: { id: 'panduan-umk-evaluasi' },
      create: {
        id: 'panduan-umk-evaluasi',
        category: 'Monitoring dan Evaluasi',
        title: 'Evaluasi Kinerja',
        description: 'Metode evaluasi efektivitas implementasi UMK',
        content: 'Evaluasi kinerja dilakukan melalui KPI lingkungan, analisis tren, dan benchmarking...',
        order: 8,
        isActive: true
      },
      update: { updatedAt: new Date() }
    }),

    await prisma.panduanUMK.upsert({
      where: { id: 'panduan-umk-pelaporan' },
      create: {
        id: 'panduan-umk-pelaporan',
        category: 'Monitoring dan Evaluasi',
        title: 'Pelaporan',
        description: 'Format dan prosedur pelaporan implementasi UMK',
        content: 'Pelaporan UMK meliputi laporan berkala, laporan insiden, dan laporan compliance terhadap regulasi...',
        order: 9,
        isActive: true
      },
      update: { updatedAt: new Date() }
    })
  ]

  console.log(`📚 Panduan UMK: ${panduanUMKData.length} items created`)

  // 📋 Informasi Pages Data  
  console.log('📋 Creating informasi pages data...')
  const informasiPagesData = [
    await prisma.informasiPage.upsert({
      where: { id: 'info-agenda' },
      create: {
        id: 'info-agenda',
        title: 'Agenda Kegiatan',
        description: 'Lihat jadwal kegiatan dan acara DLH Kota Tasikmalaya',
        icon: 'CalendarDays',
        link: '/informasi/agenda',
        color: 'green',
        order: 1,
        isActive: true
      },
      update: { updatedAt: new Date() }
    }),

    await prisma.informasiPage.upsert({
      where: { id: 'info-berita' },
      create: {
        id: 'info-berita',
        title: 'Berita Terbaru',
        description: 'Update berita dan informasi lingkungan hidup terkini',
        icon: 'Newspaper',
        link: '/informasi/berita',
        color: 'blue',
        order: 2,
        isActive: true
      },
      update: { updatedAt: new Date() }
    }),

    await prisma.informasiPage.upsert({
      where: { id: 'info-artikel' },
      create: {
        id: 'info-artikel',
        title: 'Artikel',
        description: 'Artikel edukatif tentang lingkungan hidup dan keberlanjutan',
        icon: 'FileText',
        link: '/informasi/artikel',
        color: 'yellow',
        order: 3,
        isActive: true
      },
      update: { updatedAt: new Date() }
    }),

    await prisma.informasiPage.upsert({
      where: { id: 'info-panduan-umk' },
      create: {
        id: 'info-panduan-umk',
        title: 'Panduan UMK',
        description: 'Panduan lengkap untuk memahami dan menerapkan Upaya Manajemen Keselamatan dalam pengelolaan lingkungan hidup',
        icon: 'BookOpen',
        link: '/informasi/panduan-umk',
        color: 'teal',
        order: 4,
        isActive: true
      },
      update: { updatedAt: new Date() }
    })
  ]

  console.log(`📋 Informasi pages: ${informasiPagesData.length} pages created`)

  // �🏠 Homepage Content
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
