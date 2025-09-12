import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// POST /api/public/perizinan/sppl/submit - Public SPPL submission
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Create new SPPL submission with default values for public submission
    const newSppl = await prisma.sppl.create({
      data: {
        nomor_surat: `SPPL/PUB/${Date.now()}`, // Generate temporary number
        pemohon: body.pemohon,
        nama_kegiatan: body.nama_kegiatan,
        jenis_usaha: body.jenis_usaha || 'Lainnya',
        lokasi: body.lokasi,
        tanggal_pengajuan: new Date(),
        status: 'pending', // Public submissions always start as pending
        nilai_investasi: parseFloat(body.nilai_investasi) || 0,
        luas_area: parseFloat(body.luas_area) || 0,
        kategori_dampak: body.kategori_dampak || 'kecil',
        upaya_pengelolaan_sppl: body.upaya_pengelolaan_sppl || '',
        persyaratan_terpenuhi: false, // Will be verified by admin
        catatan: body.catatan || 'Pengajuan dari portal publik',
        dokumen_pendukung: body.dokumen_pendukung || null
      }
    });

    // Format response
    const formattedSppl = {
      ...newSppl,
      nilai_investasi: Number(newSppl.nilai_investasi),
      luas_area: Number(newSppl.luas_area),
      tanggal_pengajuan: newSppl.tanggal_pengajuan.toISOString().split('T')[0],
      tanggal_terbit: null,
      masa_berlaku: null,
    };

    return NextResponse.json({
      success: true,
      data: formattedSppl,
      message: "Pengajuan SPPL berhasil dikirim. Nomor referensi: " + newSppl.nomor_surat
    }, { status: 201 });

  } catch (error: any) {
    console.error('POST Public SPPL error:', error);

    if (error.code === 'P2002') {
      return NextResponse.json({
        success: false,
        error: "Data duplikat terdeteksi"
      }, { status: 400 });
    }

    return NextResponse.json({
      success: false,
      error: "Terjadi kesalahan saat menyimpan pengajuan SPPL"
    }, { status: 500 });
  }
}
