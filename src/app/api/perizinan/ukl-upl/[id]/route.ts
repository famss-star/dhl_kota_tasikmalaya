import { NextRequest, NextResponse } from 'next/server';

// Mock data untuk UKL-UPL (same as in route.ts)
const uklUplData = [
  {
    id: '1',
    nomor_surat: 'UKL-UPL/001/2025',
    pemohon: 'PT Manufaktur Hijau',
    nama_kegiatan: 'Pabrik Produksi Tekstil',
    jenis_usaha: 'Industri',
    lokasi: 'Jl. Raya Industri No. 25, Kawasan Industri Tasikmalaya',
    tanggal_pengajuan: '2025-01-05',
    tanggal_terbit: '2025-01-20',
    masa_berlaku: '2030-01-20',
    status: 'approved',
    nilai_investasi: 2500000000,
    luas_area: 5000,
    skala_usaha: 'menengah',
    upaya_pengelolaan_ukl: 'Pengolahan air limbah dengan sistem biologis, pengelolaan emisi udara dengan scrubber, pengelolaan limbah B3 sesuai peraturan, program 3R untuk limbah non-B3',
    upaya_pemantauan_upl: 'Monitoring kualitas air limbah mingguan, pengukuran emisi udara bulanan, audit limbah B3 triwulanan, laporan pemantauan lingkungan semester',
    dokumen_lengkap: true,
    catatan: 'Dokumen UKL-UPL lengkap dan sesuai standar lingkungan',
    dokumen_pendukung: ['ukl-upl-form.pdf', 'layout-pabrik.pdf', 'spesifikasi-peralatan.pdf'],
    createdAt: new Date('2025-01-05').toISOString(),
    updatedAt: new Date('2025-01-20').toISOString()
  },
  {
    id: '2',
    nomor_surat: 'UKL-UPL/002/2025',
    pemohon: 'CV Pangan Sehat',
    nama_kegiatan: 'Unit Pengolahan Makanan Beku',
    jenis_usaha: 'Industri',
    lokasi: 'Kawasan Agro Industri, Blok B-8, Tasikmalaya',
    tanggal_pengajuan: '2025-01-12',
    tanggal_terbit: '',
    masa_berlaku: '',
    status: 'review',
    nilai_investasi: 800000000,
    luas_area: 1200,
    skala_usaha: 'kecil',
    upaya_pengelolaan_ukl: 'Sistem pengolahan air limbah organik, pengelolaan limbah organik dengan composting, efisiensi energi dengan teknologi ramah lingkungan',
    upaya_pemantauan_upl: 'Monitoring parameter air limbah sesuai baku mutu, pengukuran kebisingan rutin, pemantauan kualitas kompos hasil pengolahan limbah',
    dokumen_lengkap: false,
    catatan: 'Perlu perbaikan dalam upaya pemantauan parameter limbah cair',
    dokumen_pendukung: ['ukl-upl-draft.pdf', 'site-layout.pdf'],
    createdAt: new Date('2025-01-12').toISOString(),
    updatedAt: new Date('2025-01-15').toISOString()
  }
];

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const uklUpl = uklUplData.find(item => item.id === id);
    
    if (!uklUpl) {
      return NextResponse.json({
        success: false,
        error: 'Data UKL-UPL tidak ditemukan'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: uklUpl
    });
  } catch (error) {
    console.error('Get UKL-UPL by ID error:', error);
    return NextResponse.json({
      success: false,
      error: 'Gagal mengambil data UKL-UPL'
    }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const uklUplIndex = uklUplData.findIndex(item => item.id === id);
    
    if (uklUplIndex === -1) {
      return NextResponse.json({
        success: false,
        error: 'Data UKL-UPL tidak ditemukan'
      }, { status: 404 });
    }

    uklUplData[uklUplIndex] = {
      ...uklUplData[uklUplIndex],
      ...body,
      id: id,
      updatedAt: new Date().toISOString()
    };

    return NextResponse.json({
      success: true,
      data: uklUplData[uklUplIndex],
      message: 'UKL-UPL berhasil diperbarui'
    });
  } catch (error) {
    console.error('Update UKL-UPL error:', error);
    return NextResponse.json({
      success: false,
      error: 'Gagal memperbarui UKL-UPL'
    }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const uklUplIndex = uklUplData.findIndex(item => item.id === id);
    
    if (uklUplIndex === -1) {
      return NextResponse.json({
        success: false,
        error: 'Data UKL-UPL tidak ditemukan'
      }, { status: 404 });
    }

    const deletedUklUpl = uklUplData.splice(uklUplIndex, 1)[0];

    return NextResponse.json({
      success: true,
      data: deletedUklUpl,
      message: 'UKL-UPL berhasil dihapus'
    });
  } catch (error) {
    console.error('Delete UKL-UPL error:', error);
    return NextResponse.json({
      success: false,
      error: 'Gagal menghapus UKL-UPL'
    }, { status: 500 });
  }
}
