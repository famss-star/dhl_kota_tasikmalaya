import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET - Get recent approved AMDAL for public display
export async function GET() {
  try {
    const recentAmdal = await prisma.amdal.findMany({
      where: {
        status: 'disetujui'
      },
      orderBy: {
        tanggal_terbit: 'desc'
      },
      take: 6, // Show latest 6 applications
      select: {
        id: true,
        nomor_surat: true,
        pemohon: true,
        nama_rencana_kegiatan: true,
        jenis_rencana_kegiatan: true,
        lokasi: true,
        tanggal_terbit: true,
        masa_berlaku: true,
        status: true,
        skala_kegiatan: true
      }
    });

    return NextResponse.json({
      success: true,
      data: recentAmdal,
      message: 'Data AMDAL terbaru berhasil diambil'
    });

  } catch (error) {
    console.error('Error fetching recent AMDAL:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Gagal mengambil data AMDAL terbaru' 
      }, 
      { status: 500 }
    );
  }
}
