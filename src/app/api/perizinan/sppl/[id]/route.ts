import { NextRequest, NextResponse } from 'next/server';

// Mock data untuk SPPL (same as in route.ts)
let spplData = [
  {
    id: '1',
    nomor_surat: 'SPPL/001/2025',
    pemohon: 'PT Lingkungan Sehat',
    nama_kegiatan: 'Industri Pengolahan Makanan',
    jenis_usaha: 'Industri',
    lokasi: 'Jl. Industri No. 15, Kota Tasikmalaya',
    tanggal_pengajuan: '2025-01-10',
    tanggal_terbit: '2025-01-15',
    masa_berlaku: '2028-01-15',
    status: 'approved',
    nilai_investasi: 500000000,
    luas_area: 2000,
    kategori_dampak: 'sedang',
    upaya_pengelolaan_sppl: 'Pengelolaan limbah cair dengan instalasi WWTP, pengelolaan limbah padat dengan 3R, monitoring emisi udara berkala',
    persyaratan_terpenuhi: true,
    catatan: 'Dokumen lengkap dan sesuai ketentuan',
    dokumen_pendukung: ['sppl-form.pdf', 'site-plan.pdf', 'limbah-analysis.pdf'],
    createdAt: new Date('2025-01-10').toISOString(),
    updatedAt: new Date('2025-01-15').toISOString()
  },
  {
    id: '2',
    nomor_surat: 'SPPL/002/2025',
    pemohon: 'CV Daur Ulang Mandiri',
    nama_kegiatan: 'Unit Pengolahan Limbah B3',
    jenis_usaha: 'Jasa',
    lokasi: 'Kawasan Industri Tasikmalaya, Blok C-15',
    tanggal_pengajuan: '2025-01-08',
    tanggal_terbit: '',
    masa_berlaku: '',
    status: 'review',
    nilai_investasi: 750000000,
    luas_area: 1500,
    kategori_dampak: 'besar',
    upaya_pengelolaan_sppl: 'Sistem pengolahan limbah B3 dengan teknologi incinerator, monitoring kontinyu parameter emisi',
    persyaratan_terpenuhi: false,
    catatan: 'Perlu tambahan dokumen AMDAL untuk kegiatan pengelolaan limbah B3',
    dokumen_pendukung: ['sppl-form.pdf', 'feasibility-study.pdf'],
    createdAt: new Date('2025-01-08').toISOString(),
    updatedAt: new Date('2025-01-12').toISOString()
  }
];

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const sppl = spplData.find(item => item.id === params.id);
    
    if (!sppl) {
      return NextResponse.json({
        success: false,
        error: 'Data SPPL tidak ditemukan'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: sppl
    });
  } catch (error) {
    console.error('Get SPPL by ID error:', error);
    return NextResponse.json({
      success: false,
      error: 'Gagal mengambil data SPPL'
    }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const spplIndex = spplData.findIndex(item => item.id === params.id);
    
    if (spplIndex === -1) {
      return NextResponse.json({
        success: false,
        error: 'Data SPPL tidak ditemukan'
      }, { status: 404 });
    }

    spplData[spplIndex] = {
      ...spplData[spplIndex],
      ...body,
      id: params.id,
      updatedAt: new Date().toISOString()
    };

    return NextResponse.json({
      success: true,
      data: spplData[spplIndex],
      message: 'SPPL berhasil diperbarui'
    });
  } catch (error) {
    console.error('Update SPPL error:', error);
    return NextResponse.json({
      success: false,
      error: 'Gagal memperbarui SPPL'
    }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const spplIndex = spplData.findIndex(item => item.id === params.id);
    
    if (spplIndex === -1) {
      return NextResponse.json({
        success: false,
        error: 'Data SPPL tidak ditemukan'
      }, { status: 404 });
    }

    const deletedSppl = spplData.splice(spplIndex, 1)[0];

    return NextResponse.json({
      success: true,
      data: deletedSppl,
      message: 'SPPL berhasil dihapus'
    });
  } catch (error) {
    console.error('Delete SPPL error:', error);
    return NextResponse.json({
      success: false,
      error: 'Gagal menghapus SPPL'
    }, { status: 500 });
  }
}
