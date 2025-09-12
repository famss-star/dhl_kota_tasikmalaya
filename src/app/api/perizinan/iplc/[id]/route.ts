import { NextRequest, NextResponse } from 'next/server';

// Mock data IPLC (same as in route.ts)
const mockIplcData = [
  {
    id: "1",
    nomor_surat: "IPLC/001/2025",
    pemohon: "UD. Sari Rasa Nusantara",
    nama_kegiatan: "Usaha Rumah Makan Padang",
    jenis_kegiatan: "Usaha Makanan dan Minuman",
    kategori_usaha: "wajib_iplc",
    lokasi: "Jl. Ahmad Yani No. 45, Kelurahan Cipedes, Kecamatan Cipedes, Kota Tasikmalaya",
    deskripsi_kegiatan: "Usaha rumah makan dengan kapasitas 50 tempat duduk, menyajikan masakan Padang dengan sistem prasmanan dan ala carte. Dilengkapi dengan dapur, ruang makan, dan fasilitas cuci tangan.",
    tanggal_pengajuan: "2025-02-01",
    tanggal_terbit: "2025-02-15",
    masa_berlaku: "2028-02-15",
    status: "approved",
    nilai_investasi: 150000000,
    luas_area: 200,
    dampak_lingkungan: "Dampak yang mungkin timbul adalah: 1) Timbulan limbah cair dari kegiatan pencucian dan masak, 2) Timbulan limbah padat berupa sampah organik dan anorganik, 3) Potensi bau dari kegiatan memasak, 4) Peningkatan kebisingan dari aktivitas operasional",
    upaya_pengelolaan: "1) Pemasangan grease trap untuk pengolahan limbah cair dapur, 2) Pemilahan sampah organik dan anorganik dengan tempat sampah terpisah, 3) Pemasangan exhaust fan dan sistem ventilasi yang baik, 4) Pengaturan jam operasional sesuai ketentuan daerah, 5) Perawatan rutin peralatan untuk mengurangi kebisingan",
    upaya_pemantauan: "1) Pemantauan kualitas limbah cair setiap 3 bulan, 2) Monitoring volume dan jenis sampah harian, 3) Pengukuran kualitas udara dalam ruangan bulanan, 4) Pengukuran tingkat kebisingan setiap 6 bulan, 5) Evaluasi sistem pengelolaan limbah setiap bulan",
    komitmen_lingkungan: "Berkomitmen untuk: 1) Mengoperasikan grease trap secara optimal, 2) Melakukan pemilahan sampah dengan benar, 3) Menjaga kebersihan lingkungan sekitar, 4) Menggunakan bahan bakar ramah lingkungan, 5) Melaporkan kegiatan pemantauan lingkungan secara berkala",
    persyaratan_terpenuhi: true,
    catatan: "Usaha telah beroperasi dengan baik, masyarakat sekitar tidak ada yang komplain. Pengelolaan limbah sudah sesuai standar.",
    dokumen_pendukung: ["iplc-doc-1.pdf", "layout-usaha.pdf", "izin-sanitasi.pdf"]
  },
  {
    id: "2",
    nomor_surat: "IPLC/002/2025",
    pemohon: "CV. Konveksi Mandiri",
    nama_kegiatan: "Usaha Konveksi Pakaian",
    jenis_kegiatan: "Industri Konveksi",
    kategori_usaha: "wajib_iplc",
    lokasi: "Jl. Industri Raya No. 12, Kelurahan Tugujaya, Kecamatan Cihideung, Kota Tasikmalaya",
    deskripsi_kegiatan: "Usaha konveksi pakaian dengan 20 mesin jahit, memproduksi pakaian jadi seperti kemeja, celana, dan seragam. Kapasitas produksi 500 potong per hari.",
    tanggal_pengajuan: "2025-01-25",
    status: "review",
    nilai_investasi: 500000000,
    luas_area: 400,
    dampak_lingkungan: "1) Timbulan limbah cair dari proses pencucian dan pewarnaan, 2) Limbah padat berupa potongan kain dan benang, 3) Kebisingan dari mesin jahit dan obras, 4) Debu dari proses pemotongan kain",
    upaya_pengelolaan: "1) Pengolahan limbah cair dengan sistem sedimentasi sebelum dibuang, 2) Pengumpulan dan pemanfaatan limbah kain untuk kerajinan, 3) Pemasangan peredam suara dan pengaturan jam kerja, 4) Sistem ventilasi dan masker untuk pekerja",
    upaya_pemantauan: "1) Monitoring kualitas limbah cair bulanan, 2) Pencatatan volume limbah padat harian, 3) Pengukuran kebisingan mingguan, 4) Monitoring kualitas udara dalam ruangan bulanan",
    komitmen_lingkungan: "Berkomitmen melakukan pengelolaan limbah yang bertanggung jawab, menjaga kenyamanan lingkungan sekitar, dan melibatkan masyarakat dalam pemanfaatan limbah kain.",
    persyaratan_terpenuhi: false,
    catatan: "Masih dalam tahap review kelengkapan dokumen sistem pengolahan limbah cair.",
    dokumen_pendukung: ["proposal-usaha.pdf", "denah-lokasi.pdf"]
  }
];

// GET /api/perizinan/iplc/[id] - Get specific IPLC by ID
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const iplc = mockIplcData.find(item => item.id === id);

    if (!iplc) {
      return NextResponse.json({
        success: false,
        error: "Data IPLC tidak ditemukan"
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: iplc,
      message: "Data IPLC berhasil diambil"
    });

  } catch (error) {
    console.error('GET IPLC by ID error:', error);
    return NextResponse.json({
      success: false,
      error: "Terjadi kesalahan saat mengambil data IPLC"
    }, { status: 500 });
  }
}

// PUT /api/perizinan/iplc/[id] - Update specific IPLC
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const body = await request.json();

    const iplcIndex = mockIplcData.findIndex(item => item.id === id);
    if (iplcIndex === -1) {
      return NextResponse.json({
        success: false,
        error: "Data IPLC tidak ditemukan"
      }, { status: 404 });
    }

    // Update data
    const updatedIplc = {
      ...mockIplcData[iplcIndex],
      nomor_surat: body.nomor_surat || mockIplcData[iplcIndex].nomor_surat,
      pemohon: body.pemohon || mockIplcData[iplcIndex].pemohon,
      nama_kegiatan: body.nama_kegiatan || mockIplcData[iplcIndex].nama_kegiatan,
      jenis_kegiatan: body.jenis_kegiatan || mockIplcData[iplcIndex].jenis_kegiatan,
      kategori_usaha: body.kategori_usaha || mockIplcData[iplcIndex].kategori_usaha,
      lokasi: body.lokasi || mockIplcData[iplcIndex].lokasi,
      deskripsi_kegiatan: body.deskripsi_kegiatan || mockIplcData[iplcIndex].deskripsi_kegiatan,
      tanggal_pengajuan: body.tanggal_pengajuan || mockIplcData[iplcIndex].tanggal_pengajuan,
      tanggal_terbit: body.tanggal_terbit || mockIplcData[iplcIndex].tanggal_terbit,
      masa_berlaku: body.masa_berlaku || mockIplcData[iplcIndex].masa_berlaku,
      status: body.status || mockIplcData[iplcIndex].status,
      nilai_investasi: body.nilai_investasi !== undefined ? parseFloat(body.nilai_investasi) : mockIplcData[iplcIndex].nilai_investasi,
      luas_area: body.luas_area !== undefined ? parseFloat(body.luas_area) : mockIplcData[iplcIndex].luas_area,
      dampak_lingkungan: body.dampak_lingkungan || mockIplcData[iplcIndex].dampak_lingkungan,
      upaya_pengelolaan: body.upaya_pengelolaan || mockIplcData[iplcIndex].upaya_pengelolaan,
      upaya_pemantauan: body.upaya_pemantauan || mockIplcData[iplcIndex].upaya_pemantauan,
      komitmen_lingkungan: body.komitmen_lingkungan || mockIplcData[iplcIndex].komitmen_lingkungan,
      persyaratan_terpenuhi: body.persyaratan_terpenuhi !== undefined ? Boolean(body.persyaratan_terpenuhi) : mockIplcData[iplcIndex].persyaratan_terpenuhi,
      catatan: body.catatan !== undefined ? body.catatan : mockIplcData[iplcIndex].catatan,
      dokumen_pendukung: body.dokumen_pendukung || mockIplcData[iplcIndex].dokumen_pendukung
    };

    mockIplcData[iplcIndex] = updatedIplc;

    return NextResponse.json({
      success: true,
      data: updatedIplc,
      message: "Data IPLC berhasil diperbarui"
    });

  } catch (error) {
    console.error('PUT IPLC error:', error);
    return NextResponse.json({
      success: false,
      error: "Terjadi kesalahan saat memperbarui data IPLC"
    }, { status: 500 });
  }
}

// DELETE /api/perizinan/iplc/[id] - Delete specific IPLC
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    
    const iplcIndex = mockIplcData.findIndex(item => item.id === id);
    if (iplcIndex === -1) {
      return NextResponse.json({
        success: false,
        error: "Data IPLC tidak ditemukan"
      }, { status: 404 });
    }

    const deletedIplc = mockIplcData.splice(iplcIndex, 1)[0];

    return NextResponse.json({
      success: true,
      data: deletedIplc,
      message: "Data IPLC berhasil dihapus"
    });

  } catch (error) {
    console.error('DELETE IPLC error:', error);
    return NextResponse.json({
      success: false,
      error: "Terjadi kesalahan saat menghapus data IPLC"
    }, { status: 500 });
  }
}
