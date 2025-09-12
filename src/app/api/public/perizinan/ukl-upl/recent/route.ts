import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET - Get recent approved UKL-UPL for public display
export async function GET() {
  try {
    const recentUklUpl = await prisma.uklUpl.findMany({
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
        skala_usaha: true
      }
    });

    return NextResponse.json({
      success: true,
      data: recentUklUpl,
      message: 'Data UKL-UPL terbaru berhasil diambil'
    });

  } catch (error) {
    console.error('Error fetching recent UKL-UPL:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Gagal mengambil data UKL-UPL terbaru' 
      }, 
      { status: 500 }
    );
  }
}
