import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// POST /api/public/perizinan/amdal/submit - Public AMDAL submission
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Create new AMDAL submission with default values for public submission
    const newAmdal = await prisma.amdal.create({
      data: {
        nomor_surat: `AMDAL/PUB/${Date.now()}`, // Generate temporary number, will be updated by admin
        pemohon: body.pemohon,
        nama_rencana_kegiatan: body.nama_rencana_kegiatan,
        jenis_rencana_kegiatan: body.jenis_rencana_kegiatan,
        skala_kegiatan: body.skala_kegiatan || 'menengah',
        lokasi: body.lokasi,
        deskripsi_kegiatan: body.deskripsi_kegiatan,
        tanggal_pengajuan: new Date(),
        status: 'pending', // Public submissions always start as pending
        nilai_investasi: parseFloat(body.nilai_investasi) || 0,
        luas_area: parseFloat(body.luas_area) || 0,
        rona_lingkungan_hidup: body.rona_lingkungan_hidup || '',
        prakiraan_dampak: body.prakiraan_dampak || '',
        evaluasi_dampak: body.evaluasi_dampak || '',
        rencana_pengelolaan: body.rencana_pengelolaan || '',
        rencana_pemantauan: body.rencana_pemantauan || '',
        persyaratan_terpenuhi: false, // Will be verified by admin
        catatan: body.catatan || 'Pengajuan dari portal publik',
        dokumen_pendukung: body.dokumen_pendukung || null
      }
    });

    // Format response
    const formattedAmdal = {
      ...newAmdal,
      nilai_investasi: Number(newAmdal.nilai_investasi),
      luas_area: Number(newAmdal.luas_area),
      tanggal_pengajuan: newAmdal.tanggal_pengajuan.toISOString().split('T')[0],
      tanggal_terbit: null,
      masa_berlaku: null,
    };

    return NextResponse.json({
      success: true,
      data: formattedAmdal,
      message: "Pengajuan AMDAL berhasil dikirim. Nomor referensi: " + newAmdal.nomor_surat
    }, { status: 201 });

  } catch (error: any) {
    console.error('POST Public AMDAL error:', error);

    if (error.code === 'P2002') {
      return NextResponse.json({
        success: false,
        error: "Data duplikat terdeteksi"
      }, { status: 400 });
    }

    return NextResponse.json({
      success: false,
      error: "Terjadi kesalahan saat menyimpan pengajuan AMDAL"
    }, { status: 500 });
  }
}
