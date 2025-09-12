import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const uklUplData = await prisma.uklUpl.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Convert Decimal to number for JSON serialization
    const formattedData = uklUplData.map((item: any) => ({
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
      total: formattedData.length
    });
  } catch (error) {
    console.error('Get UKL-UPL error:', error);
    return NextResponse.json({
      success: false,
      error: 'Gagal mengambil data UKL-UPL'
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validasi field wajib
    const requiredFields = [
      'nomor_surat', 'pemohon', 'nama_kegiatan', 'jenis_usaha', 
      'lokasi', 'tanggal_pengajuan', 'skala_usaha', 
      'upaya_pengelolaan_ukl', 'upaya_pemantauan_upl'
    ];
    
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json({
          success: false,
          error: `Field ${field} wajib diisi`
        }, { status: 400 });
      }
    }

    const newUklUpl = await prisma.uklUpl.create({
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
        luas_area: parseFloat(body.luas_area) || 0,
        skala_usaha: body.skala_usaha,
        upaya_pengelolaan_ukl: body.upaya_pengelolaan_ukl,
        upaya_pemantauan_upl: body.upaya_pemantauan_upl,
        dokumen_lengkap: Boolean(body.dokumen_lengkap),
        catatan: body.catatan || null,
        dokumen_pendukung: body.dokumen_pendukung || null
      }
    });

    // Format response
    const formattedUklUpl = {
      ...newUklUpl,
      nilai_investasi: Number(newUklUpl.nilai_investasi),
      luas_area: Number(newUklUpl.luas_area),
      tanggal_pengajuan: newUklUpl.tanggal_pengajuan.toISOString().split('T')[0],
      tanggal_terbit: newUklUpl.tanggal_terbit?.toISOString().split('T')[0] || null,
      masa_berlaku: newUklUpl.masa_berlaku?.toISOString().split('T')[0] || null,
    };

    return NextResponse.json({
      success: true,
      data: formattedUklUpl,
      message: 'UKL-UPL berhasil dibuat'
    });
  } catch (error: any) {
    console.error('Create UKL-UPL error:', error);
    
    if (error.code === 'P2002') {
      return NextResponse.json({
        success: false,
        error: "Nomor surat sudah digunakan"
      }, { status: 400 });
    }
    
    return NextResponse.json({
      success: false,
      error: 'Gagal membuat UKL-UPL'
    }, { status: 500 });
  }
}
