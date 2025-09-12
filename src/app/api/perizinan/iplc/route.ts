import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/perizinan/iplc - Get all IPLC
export async function GET() {
  try {
    const iplcData = await prisma.iplc.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Convert Decimal to number for JSON serialization
    const formattedData = iplcData.map((item: any) => ({
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
      message: "Data IPLC berhasil diambil"
    });
  } catch (error) {
    console.error('GET IPLC error:', error);
    return NextResponse.json({
      success: false,
      error: "Terjadi kesalahan saat mengambil data IPLC"
    }, { status: 500 });
  }
}

// POST /api/perizinan/iplc - Create new IPLC
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validasi field wajib
    const requiredFields = [
      'nomor_surat', 'pemohon', 'nama_kegiatan', 'jenis_kegiatan', 
      'lokasi', 'deskripsi_kegiatan', 'tanggal_pengajuan', 
      'dampak_lingkungan', 'upaya_pengelolaan', 'upaya_pemantauan', 'komitmen_lingkungan'
    ];
    
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json({
          success: false,
          error: `Field ${field} wajib diisi`
        }, { status: 400 });
      }
    }

    const newIplc = await prisma.iplc.create({
      data: {
        nomor_surat: body.nomor_surat,
        pemohon: body.pemohon,
        nama_kegiatan: body.nama_kegiatan,
        jenis_kegiatan: body.jenis_kegiatan,
        kategori_usaha: body.kategori_usaha || 'wajib_iplc',
        lokasi: body.lokasi,
        deskripsi_kegiatan: body.deskripsi_kegiatan,
        tanggal_pengajuan: new Date(body.tanggal_pengajuan),
        tanggal_terbit: body.tanggal_terbit ? new Date(body.tanggal_terbit) : null,
        masa_berlaku: body.masa_berlaku ? new Date(body.masa_berlaku) : null,
        status: body.status || 'pending',
        nilai_investasi: parseFloat(body.nilai_investasi) || 0,
        luas_area: parseFloat(body.luas_area) || 0,
        dampak_lingkungan: body.dampak_lingkungan,
        upaya_pengelolaan: body.upaya_pengelolaan,
        upaya_pemantauan: body.upaya_pemantauan,
        komitmen_lingkungan: body.komitmen_lingkungan,
        persyaratan_terpenuhi: Boolean(body.persyaratan_terpenuhi),
        catatan: body.catatan || null,
        dokumen_pendukung: body.dokumen_pendukung || null
      }
    });

    // Format response
    const formattedIplc = {
      ...newIplc,
      nilai_investasi: Number(newIplc.nilai_investasi),
      luas_area: Number(newIplc.luas_area),
      tanggal_pengajuan: newIplc.tanggal_pengajuan.toISOString().split('T')[0],
      tanggal_terbit: newIplc.tanggal_terbit?.toISOString().split('T')[0] || null,
      masa_berlaku: newIplc.masa_berlaku?.toISOString().split('T')[0] || null,
    };

    return NextResponse.json({
      success: true,
      data: formattedIplc,
      message: "IPLC berhasil dibuat"
    }, { status: 201 });

  } catch (error: any) {
    console.error('POST IPLC error:', error);
    
    if (error.code === 'P2002') {
      return NextResponse.json({
        success: false,
        error: "Nomor surat sudah digunakan"
      }, { status: 400 });
    }
    
    return NextResponse.json({
      success: false,
      error: "Terjadi kesalahan saat membuat IPLC"
    }, { status: 500 });
  }
}
