import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET - Get page content by page type
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ page: string }> }
) {
  try {
    const { page } = await params;

    const pageContents = await prisma.pageContent.findMany({
      where: {
        page: page,
        isActive: true
      },
      orderBy: {
        order: 'asc'
      },
      select: {
        id: true,
        section: true,
        title: true,
        content: true,
        order: true
      }
    });

    return NextResponse.json({
      success: true,
      data: pageContents,
      message: `Konten halaman ${page} berhasil diambil`
    });

  } catch (error) {
    console.error('Error fetching page content:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Gagal mengambil konten halaman' 
      }, 
      { status: 500 }
    );
  }
}
