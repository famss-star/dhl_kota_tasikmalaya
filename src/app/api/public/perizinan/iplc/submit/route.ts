import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = [
      'pemohon', 'nama_kegiatan', 'jenis_kegiatan', 'kategori_usaha', 
      'lokasi', 'deskripsi_kegiatan', 'upaya_pengelolaan', 'upaya_pemantauan',
      'nilai_investasi', 'luas_area'
    ];
    
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { 
            success: false, 
            error: `Field ${field} wajib diisi` 
          }, 
          { status: 400 }
        );
      }
    }

    // Create new IPLC application
    const newIplc = await prisma.iplc.create({
      data: {
        nomor_surat: `IPLC/PUB/${Date.now()}`, // Generate temporary number
        pemohon: body.pemohon,
        nama_kegiatan: body.nama_kegiatan,
        jenis_kegiatan: body.jenis_kegiatan,
        kategori_usaha: body.kategori_usaha,
        lokasi: body.lokasi,
        deskripsi_kegiatan: body.deskripsi_kegiatan,
        upaya_pengelolaan: body.upaya_pengelolaan,
        upaya_pemantauan: body.upaya_pemantauan,
        tanggal_pengajuan: new Date(),
        status: 'pending',
        nilai_investasi: parseFloat(body.nilai_investasi),
        luas_area: parseFloat(body.luas_area),
        dampak_lingkungan: 'Akan dianalisis lebih lanjut',
        komitmen_lingkungan: 'Berkomitmen untuk mengelola limbah sesuai peraturan',
        persyaratan_terpenuhi: false,
        catatan: 'Pengajuan dari portal publik'
      }
    });

    return NextResponse.json({
      success: true,
      data: newIplc,
      message: 'Pengajuan IPLC berhasil dikirim'
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating IPLC application:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Gagal mengirim pengajuan IPLC' 
      }, 
      { status: 500 }
    );
  }
}
