import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET: Ambil setting berdasarkan key
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) {
  try {
    const { key } = await params;

    const setting = await prisma.siteSetting.findUnique({
      where: { key }
    });

    if (!setting) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Setting tidak ditemukan' 
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: setting
    });

  } catch (error) {
    console.error('Get setting error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Terjadi kesalahan saat mengambil setting' 
      },
      { status: 500 }
    );
  }
}

// PUT: Update setting berdasarkan key
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) {
  try {
    const { key } = await params;
    const body = await request.json();

    // Cek apakah setting exists
    const existingSetting = await prisma.siteSetting.findUnique({
      where: { key }
    });

    if (!existingSetting) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Setting tidak ditemukan' 
        },
        { status: 404 }
      );
    }

    // Update setting
    const updatedSetting = await prisma.siteSetting.update({
      where: { key },
      data: {
        value: body.value || existingSetting.value,
        description: body.description || existingSetting.description,
        updatedAt: new Date()
      }
    });

    return NextResponse.json({
      success: true,
      data: updatedSetting,
      message: 'Setting berhasil diperbarui'
    });

  } catch (error) {
    console.error('Update setting error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Terjadi kesalahan saat memperbarui setting' 
      },
      { status: 500 }
    );
  }
}

// DELETE: Hapus setting berdasarkan key
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) {
  try {
    const { key } = await params;

    // Cek apakah setting exists
    const existingSetting = await prisma.siteSetting.findUnique({
      where: { key }
    });

    if (!existingSetting) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Setting tidak ditemukan' 
        },
        { status: 404 }
      );
    }

    // Hapus setting
    await prisma.siteSetting.delete({
      where: { key }
    });

    return NextResponse.json({
      success: true,
      message: 'Setting berhasil dihapus'
    });

  } catch (error) {
    console.error('Delete setting error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Terjadi kesalahan saat menghapus setting' 
      },
      { status: 500 }
    );
  }
}
