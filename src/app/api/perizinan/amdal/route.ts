import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/perizinan/amdal - Get all AMDAL
export async function GET() {
  try {
    const amdalData = await prisma.amdal.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Convert Decimal to number for JSON serialization
    const formattedData = amdalData.map((item: any) => ({
      ...item,
      nilai_investasi: Number(item.nilai_investasi),
      luas_area: Number(item.luas_area),
      tanggal_pengajuan: item.tanggal_pengajuan.toISOString().split('T')[0],
      tanggal_terbit: item.tanggal_terbit?.toISOString().split('T')[0] || null,
      masa_berlaku: item.masa_berlaku?.toISOString().split('T')[0] || null,
    }));

    return NextResponse.json({
      success: true,
      data: formattedData,
      message: "Data AMDAL berhasil diambil"
    });
  } catch (error) {
    console.error('GET AMDAL error:', error);
    return NextResponse.json({
      success: false,
      error: "Terjadi kesalahan saat mengambil data AMDAL"
    }, { status: 500 });
  }
}

// POST /api/perizinan/amdal - Create new AMDAL
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validasi field wajib
    const requiredFields = [
      'nomor_surat', 'pemohon', 'nama_rencana_kegiatan', 'jenis_rencana_kegiatan', 
      'lokasi', 'deskripsi_kegiatan', 'tanggal_pengajuan', 'rona_lingkungan_hidup',
      'prakiraan_dampak', 'evaluasi_dampak', 'rencana_pengelolaan', 'rencana_pemantauan'
    ];
    
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json({
          success: false,
          error: `Field ${field} wajib diisi`
        }, { status: 400 });
      }
    }

    const newAmdal = await prisma.amdal.create({
      data: {
        nomor_surat: body.nomor_surat,
        pemohon: body.pemohon,
        nama_rencana_kegiatan: body.nama_rencana_kegiatan,
        jenis_rencana_kegiatan: body.jenis_rencana_kegiatan,
        skala_kegiatan: body.skala_kegiatan || 'menengah',
        lokasi: body.lokasi,
        deskripsi_kegiatan: body.deskripsi_kegiatan,
        tanggal_pengajuan: new Date(body.tanggal_pengajuan),
        tanggal_terbit: body.tanggal_terbit ? new Date(body.tanggal_terbit) : null,
        masa_berlaku: body.masa_berlaku ? new Date(body.masa_berlaku) : null,
        status: body.status || 'pending',
        nilai_investasi: parseFloat(body.nilai_investasi) || 0,
        luas_area: parseFloat(body.luas_area) || 0,
        rona_lingkungan_hidup: body.rona_lingkungan_hidup,
        prakiraan_dampak: body.prakiraan_dampak,
        evaluasi_dampak: body.evaluasi_dampak,
        rencana_pengelolaan: body.rencana_pengelolaan,
        rencana_pemantauan: body.rencana_pemantauan,
        persyaratan_terpenuhi: Boolean(body.persyaratan_terpenuhi),
        catatan: body.catatan || null,
        dokumen_pendukung: body.dokumen_pendukung || null
      }
    });

    // Format response
    const formattedAmdal = {
      ...newAmdal,
      nilai_investasi: Number(newAmdal.nilai_investasi),
      luas_area: Number(newAmdal.luas_area),
      tanggal_pengajuan: newAmdal.tanggal_pengajuan.toISOString().split('T')[0],
      tanggal_terbit: newAmdal.tanggal_terbit?.toISOString().split('T')[0] || null,
      masa_berlaku: newAmdal.masa_berlaku?.toISOString().split('T')[0] || null,
    };

    return NextResponse.json({
      success: true,
      data: formattedAmdal,
      message: "AMDAL berhasil dibuat"
    }, { status: 201 });

  } catch (error: any) {
    console.error('POST AMDAL error:', error);
    
    if (error.code === 'P2002') {
      return NextResponse.json({
        success: false,
        error: "Nomor surat sudah digunakan"
      }, { status: 400 });
    }
    
    return NextResponse.json({
      success: false,
      error: "Terjadi kesalahan saat membuat AMDAL"
    }, { status: 500 });
  }
}
