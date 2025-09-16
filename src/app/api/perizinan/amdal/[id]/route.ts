import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/perizinan/amdal/[id] - Get AMDAL by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const amdal = await prisma.amdal.findUnique({
      where: {
        id
      }
    });

    if (!amdal) {
      return NextResponse.json({
        success: false,
        error: "AMDAL tidak ditemukan"
      }, { status: 404 });
    }

    // Format response
    const formattedAmdal = {
      ...amdal,
      nilai_investasi: Number(amdal.nilai_investasi),
      luas_area: Number(amdal.luas_area),
      tanggal_pengajuan: amdal.tanggal_pengajuan.toISOString().split('T')[0],
      tanggal_terbit: amdal.tanggal_terbit?.toISOString().split('T')[0] || null,
      masa_berlaku: amdal.masa_berlaku?.toISOString().split('T')[0] || null,
    };

    return NextResponse.json({
      success: true,
      data: formattedAmdal,
      message: "Data AMDAL berhasil diambil"
    });
  } catch (error) {
    console.error('GET AMDAL by ID error:', error);
    return NextResponse.json({
      success: false,
      error: "Terjadi kesalahan saat mengambil data AMDAL"
    }, { status: 500 });
  }
}

// PUT /api/perizinan/amdal/[id] - Update AMDAL
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const body = await request.json();

    // Check if AMDAL exists
    const existingAmdal = await prisma.amdal.findUnique({
      where: { id }
    });

    if (!existingAmdal) {
      return NextResponse.json({
        success: false,
        error: "AMDAL tidak ditemukan"
      }, { status: 404 });
    }

    const updatedAmdal = await prisma.amdal.update({
      where: {
        id
      },
      data: {
        nomor_surat: body.nomor_surat,
        pemohon: body.pemohon,
        nama_rencana_kegiatan: body.nama_rencana_kegiatan,
        jenis_rencana_kegiatan: body.jenis_rencana_kegiatan,
        skala_kegiatan: body.skala_kegiatan || 'menengah',
        lokasi: body.lokasi,
        deskripsi_kegiatan: body.deskripsi_kegiatan,
        tanggal_pengajuan: body.tanggal_pengajuan ? new Date(body.tanggal_pengajuan) : existingAmdal.tanggal_pengajuan,
        tanggal_terbit: body.tanggal_terbit ? new Date(body.tanggal_terbit) : null,
        masa_berlaku: body.masa_berlaku ? new Date(body.masa_berlaku) : null,
        status: body.status || 'pending',
        nilai_investasi: body.nilai_investasi ? parseFloat(body.nilai_investasi) : existingAmdal.nilai_investasi,
        luas_area: body.luas_area ? parseFloat(body.luas_area) : existingAmdal.luas_area,
        rona_lingkungan_hidup: body.rona_lingkungan_hidup,
        prakiraan_dampak: body.prakiraan_dampak,
        evaluasi_dampak: body.evaluasi_dampak,
        rencana_pengelolaan: body.rencana_pengelolaan,
        rencana_pemantauan: body.rencana_pemantauan,
        persyaratan_terpenuhi: body.persyaratan_terpenuhi !== undefined ? Boolean(body.persyaratan_terpenuhi) : existingAmdal.persyaratan_terpenuhi,
        catatan: body.catatan !== undefined ? body.catatan : existingAmdal.catatan,
        dokumen_pendukung: body.dokumen_pendukung || existingAmdal.dokumen_pendukung
      }
    });

    // Format response
    const formattedAmdal = {
      ...updatedAmdal,
      nilai_investasi: Number(updatedAmdal.nilai_investasi),
      luas_area: Number(updatedAmdal.luas_area),
      tanggal_pengajuan: updatedAmdal.tanggal_pengajuan.toISOString().split('T')[0],
      tanggal_terbit: updatedAmdal.tanggal_terbit?.toISOString().split('T')[0] || null,
      masa_berlaku: updatedAmdal.masa_berlaku?.toISOString().split('T')[0] || null,
    };

    return NextResponse.json({
      success: true,
      data: formattedAmdal,
      message: "AMDAL berhasil diperbarui"
    });
  } catch (error: any) {
    console.error('PUT AMDAL error:', error);

    if (error.code === 'P2002') {
      return NextResponse.json({
        success: false,
        error: "Nomor surat sudah digunakan"
      }, { status: 400 });
    }

    return NextResponse.json({
      success: false,
      error: "Terjadi kesalahan saat memperbarui AMDAL"
    }, { status: 500 });
  }
}

// DELETE /api/perizinan/amdal/[id] - Delete AMDAL
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    // Check if AMDAL exists
    const existingAmdal = await prisma.amdal.findUnique({
      where: { id }
    });

    if (!existingAmdal) {
      return NextResponse.json({
        success: false,
        error: "AMDAL tidak ditemukan"
      }, { status: 404 });
    }

    await prisma.amdal.delete({
      where: {
        id
      }
    });

    return NextResponse.json({
      success: true,
      message: "AMDAL berhasil dihapus"
    });
  } catch (error) {
    console.error('DELETE AMDAL error:', error);
    return NextResponse.json({
      success: false,
      error: "Terjadi kesalahan saat menghapus AMDAL"
    }, { status: 500 });
  }
}
