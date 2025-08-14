import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET: Ambil semua kategori artikel
export async function GET() {
  try {
    const categories = await prisma.articleCategory.findMany({
      include: {
        _count: {
          select: {
            articles: true
          }
        }
      },
      orderBy: { name: 'asc' }
    });

    return NextResponse.json({
      success: true,
      data: categories
    });

  } catch (error) {
    console.error('Get categories error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Terjadi kesalahan saat mengambil kategori' 
      },
      { status: 500 }
    );
  }
}

// POST: Buat kategori baru
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description } = body;

    // Validasi input
    if (!name) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Nama kategori wajib diisi' 
        },
        { status: 400 }
      );
    }

    // Buat slug dari name
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .trim();

    // Cek apakah kategori sudah ada
    const existingCategory = await prisma.articleCategory.findFirst({
      where: {
        OR: [
          { name },
          { slug }
        ]
      }
    });

    if (existingCategory) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Kategori dengan nama tersebut sudah ada' 
        },
        { status: 400 }
      );
    }

    // Buat kategori baru
    const category = await prisma.articleCategory.create({
      data: {
        name,
        slug,
        description
      }
    });

    return NextResponse.json({
      success: true,
      data: category,
      message: 'Kategori berhasil dibuat'
    }, { status: 201 });

  } catch (error) {
    console.error('Create category error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Terjadi kesalahan saat membuat kategori' 
      },
      { status: 500 }
    );
  }
}
