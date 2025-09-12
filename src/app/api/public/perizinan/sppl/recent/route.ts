import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET - Get recent approved SPPL for public display
export async function GET() {
  try {
    const recentSppl = await prisma.sppl.findMany({
      where: {
        status: 'disetujui'
      },
      orderBy: {
        tanggal_terbit: 'desc'
      },
      take: 6,
      select: {
        id: true,
        nomor_surat: true,
        pemohon: true,
        nama_kegiatan: true,
        jenis_usaha: true,
        lokasi: true,
        tanggal_terbit: true,
        masa_berlaku: true,
        status: true,
        kategori_dampak: true
      }
    });

    return NextResponse.json({
      success: true,
      data: recentSppl,
      message: 'Data SPPL terbaru berhasil diambil'
    });

  } catch (error) {
    console.error('Error fetching recent SPPL:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Gagal mengambil data SPPL terbaru' 
      }, 
      { status: 500 }
    );
  }
}
