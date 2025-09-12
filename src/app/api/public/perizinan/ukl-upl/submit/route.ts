import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// POST /api/public/perizinan/ukl-upl/submit - Public UKL-UPL submission
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Create new UKL-UPL submission with default values for public submission
    const newUklUpl = await prisma.uklUpl.create({
      data: {
        nomor_surat: `UKL-UPL/PUB/${Date.now()}`, // Generate temporary number
        pemohon: body.pemohon,
        nama_kegiatan: body.nama_kegiatan,
        jenis_usaha: body.jenis_usaha || 'Lainnya',
        lokasi: body.lokasi,
        tanggal_pengajuan: new Date(),
        status: 'pending', // Public submissions always start as pending
        nilai_investasi: parseFloat(body.nilai_investasi) || 0,
        luas_area: parseFloat(body.luas_area) || 0,
        skala_usaha: body.skala_usaha || 'kecil',
        upaya_pengelolaan_ukl: body.upaya_pengelolaan_ukl || '',
        upaya_pemantauan_upl: body.upaya_pemantauan_upl || '',
        dokumen_lengkap: false, // Will be verified by admin
        catatan: body.catatan || 'Pengajuan dari portal publik',
        dokumen_pendukung: body.dokumen_pendukung || null
      }
    });

    // Format response
    const formattedUklUpl = {
      ...newUklUpl,
      nilai_investasi: Number(newUklUpl.nilai_investasi),
      luas_area: Number(newUklUpl.luas_area),
      tanggal_pengajuan: newUklUpl.tanggal_pengajuan.toISOString().split('T')[0],
      tanggal_terbit: null,
      masa_berlaku: null,
    };

    return NextResponse.json({
      success: true,
      data: formattedUklUpl,
      message: "Pengajuan UKL-UPL berhasil dikirim. Nomor referensi: " + newUklUpl.nomor_surat
    }, { status: 201 });

  } catch (error: any) {
    console.error('POST Public UKL-UPL error:', error);

    if (error.code === 'P2002') {
      return NextResponse.json({
        success: false,
        error: "Data duplikat terdeteksi"
      }, { status: 400 });
    }

    return NextResponse.json({
      success: false,
      error: "Terjadi kesalahan saat menyimpan pengajuan UKL-UPL"
    }, { status: 500 });
  }
}
