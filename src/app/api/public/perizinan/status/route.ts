import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/public/perizinan/status?nomor_surat=xxx - Check status of submission
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const nomor_surat = searchParams.get('nomor_surat');

    if (!nomor_surat) {
      return NextResponse.json({
        success: false,
        error: "Parameter nomor_surat diperlukan"
      }, { status: 400 });
    }

    // Search in all perizinan tables
    const [amdal, iplc, sppl, uklUpl] = await Promise.all([
      prisma.amdal.findFirst({
        where: { nomor_surat },
        select: {
          id: true,
          nomor_surat: true,
          pemohon: true,
          nama_rencana_kegiatan: true,
          status: true,
          tanggal_pengajuan: true,
          tanggal_terbit: true,
          masa_berlaku: true,
          catatan: true,
        }
      }),
      prisma.iplc.findFirst({
        where: { nomor_surat },
        select: {
          id: true,
          nomor_surat: true,
          pemohon: true,
          nama_kegiatan: true,
          status: true,
          tanggal_pengajuan: true,
          tanggal_terbit: true,
          masa_berlaku: true,
          catatan: true,
        }
      }),
      prisma.sppl.findFirst({
        where: { nomor_surat },
        select: {
          id: true,
          nomor_surat: true,
          pemohon: true,
          nama_kegiatan: true,
          status: true,
          tanggal_pengajuan: true,
          tanggal_terbit: true,
          masa_berlaku: true,
          catatan: true,
        }
      }),
      prisma.uklUpl.findFirst({
        where: { nomor_surat },
        select: {
          id: true,
          nomor_surat: true,
          pemohon: true,
          nama_kegiatan: true,
          status: true,
          tanggal_pengajuan: true,
          tanggal_terbit: true,
          masa_berlaku: true,
          catatan: true,
        }
      }),
    ]);

    let result = null;
    let type = '';

    if (amdal) {
      result = { ...amdal, nama_kegiatan: amdal.nama_rencana_kegiatan };
      type = 'AMDAL';
    } else if (iplc) {
      result = iplc;
      type = 'IPLC';
    } else if (sppl) {
      result = sppl;
      type = 'SPPL';
    } else if (uklUpl) {
      result = uklUpl;
      type = 'UKL-UPL';
    }

    if (!result) {
      return NextResponse.json({
        success: false,
        error: "Nomor surat tidak ditemukan"
      }, { status: 404 });
    }

    // Format dates
    const formattedResult = {
      ...result,
      jenis_perizinan: type,
      tanggal_pengajuan: result.tanggal_pengajuan.toISOString().split('T')[0],
      tanggal_terbit: result.tanggal_terbit?.toISOString().split('T')[0] || null,
      masa_berlaku: result.masa_berlaku?.toISOString().split('T')[0] || null,
    };

    return NextResponse.json({
      success: true,
      data: formattedResult,
      message: "Status pengajuan berhasil ditemukan"
    });

  } catch (error) {
    console.error('GET Status error:', error);
    return NextResponse.json({
      success: false,
      error: "Terjadi kesalahan saat mengecek status pengajuan"
    }, { status: 500 });
  }
}
