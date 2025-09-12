import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const spplData = await prisma.sppl.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Convert Decimal to number for JSON serialization
    const formattedData = spplData.map((item: any) => ({
      ...item,
      nilai_investasi: Number(item.nilai_investasi),
      luas_area: item.luas_area ? Number(item.luas_area) : null,
      tanggal_pengajuan: item.tanggal_pengajuan.toISOString().split('T')[0],
      tanggal_terbit: item.tanggal_terbit?.toISOString().split('T')[0] || null,
      masa_berlaku: item.masa_berlaku?.toISOString().split('T')[0] || null,
    }));

    return NextResponse.json({
      success: true,
      data: formattedData,
      message: 'SPPL data retrieved successfully'
    });
  } catch (error) {
    console.error('Error fetching SPPL data:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch SPPL data',
      message: 'Gagal mengambil data SPPL'
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validasi field wajib
    const requiredFields = [
      'nomor_surat', 'pemohon', 'nama_kegiatan', 'jenis_usaha', 
      'lokasi', 'tanggal_pengajuan', 'kategori_dampak', 'upaya_pengelolaan_sppl'
    ];
    
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json({
          success: false,
          error: `Field ${field} wajib diisi`
        }, { status: 400 });
      }
    }

    const newSppl = await prisma.sppl.create({
      data: {
        nomor_surat: body.nomor_surat,
        pemohon: body.pemohon,
        nama_kegiatan: body.nama_kegiatan,
        jenis_usaha: body.jenis_usaha,
        lokasi: body.lokasi,
        tanggal_pengajuan: new Date(body.tanggal_pengajuan),
        tanggal_terbit: body.tanggal_terbit ? new Date(body.tanggal_terbit) : null,
        masa_berlaku: body.masa_berlaku ? new Date(body.masa_berlaku) : null,
        status: body.status || 'pending',
        nilai_investasi: parseFloat(body.nilai_investasi) || 0,
        luas_area: body.luas_area ? parseFloat(body.luas_area) : null,
        kategori_dampak: body.kategori_dampak,
        upaya_pengelolaan_sppl: body.upaya_pengelolaan_sppl,
        persyaratan_terpenuhi: Boolean(body.persyaratan_terpenuhi),
        catatan: body.catatan || null,
        dokumen_pendukung: body.dokumen_pendukung || null
      }
    });

    // Format response
    const formattedSppl = {
      ...newSppl,
      nilai_investasi: Number(newSppl.nilai_investasi),
      luas_area: newSppl.luas_area ? Number(newSppl.luas_area) : null,
      tanggal_pengajuan: newSppl.tanggal_pengajuan.toISOString().split('T')[0],
      tanggal_terbit: newSppl.tanggal_terbit?.toISOString().split('T')[0] || null,
      masa_berlaku: newSppl.masa_berlaku?.toISOString().split('T')[0] || null,
    };

    return NextResponse.json({
      success: true,
      data: formattedSppl,
      message: 'SPPL berhasil dibuat'
    });
  } catch (error: any) {
    console.error('Create SPPL error:', error);
    
    if (error.code === 'P2002') {
      return NextResponse.json({
        success: false,
        error: "Nomor surat sudah digunakan"
      }, { status: 400 });
    }
    
    return NextResponse.json({
      success: false,
      error: 'Gagal membuat SPPL'
    }, { status: 500 });
  }
}
