import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET - Get recent approved IPLC for public display
export async function GET() {
  try {
    const recentIplc = await prisma.iplc.findMany({
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
        jenis_kegiatan: true,
        lokasi: true,
        tanggal_terbit: true,
        masa_berlaku: true,
        status: true,
        kategori_usaha: true
      }
    });

    return NextResponse.json({
      success: true,
      data: recentIplc,
      message: 'Data IPLC terbaru berhasil diambil'
    });

  } catch (error) {
    console.error('Error fetching recent IPLC:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Gagal mengambil data IPLC terbaru' 
      }, 
      { status: 500 }
    );
  }
}
