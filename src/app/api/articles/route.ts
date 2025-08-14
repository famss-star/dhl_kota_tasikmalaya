import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET: Ambil semua artikel dengan pagination
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || '';
    const published = searchParams.get('published');

    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {};
    
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { content: { contains: search, mode: 'insensitive' } }
      ];
    }

    if (category) {
      where.categoryId = category;
    }

    // Filter by published status untuk halaman publik
    if (published === 'true') {
      where.isPublished = true;
    }

    // Get articles with category info
    const [articles, total] = await Promise.all([
      prisma.article.findMany({
        where,
        include: {
          category: true,
          author: {
            select: {
              id: true,
              name: true,
              email: true
            }
          }
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit
      }),
      prisma.article.count({ where })
    ]);

    return NextResponse.json({
      success: true,
      data: articles,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Get articles error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Terjadi kesalahan saat mengambil artikel' 
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// POST: Buat artikel baru
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, content, excerpt, categoryId, authorId, featuredImage, tags, isPublished } = body;

    // Validasi input
    if (!title || !content || !authorId || !categoryId) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Title, content, author, dan category wajib diisi' 
        },
        { status: 400 }
      );
    }

    // Buat slug dari title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .trim();

    // Cek apakah slug sudah ada
    const existingArticle = await prisma.article.findUnique({
      where: { slug }
    });

    if (existingArticle) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Artikel dengan judul serupa sudah ada' 
        },
        { status: 400 }
      );
    }

    // Buat artikel baru dengan mapping field yang benar
    const article = await prisma.article.create({
      data: {
        title,
        slug,
        content,
        excerpt,
        categoryId,
        authorId,
        thumbnail: featuredImage, // Map featuredImage ke thumbnail
        tags: Array.isArray(tags) ? tags : (tags ? tags.split(',').map((tag: string) => tag.trim()).filter((tag: string) => tag.length > 0) : []),
        isPublished: isPublished || false
      },
      include: {
        category: true,
        author: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    return NextResponse.json({
      success: true,
      data: article,
      message: 'Artikel berhasil dibuat'
    }, { status: 201 });

  } catch (error) {
    console.error('Create article error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Terjadi kesalahan saat membuat artikel' 
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
