import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// GET - Get all news
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
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
    
    if (published === 'true') {
      where.isPublished = true;
    } else if (published === 'false') {
      where.isPublished = false;
    }

    // Get news with author info
    const [news, total] = await Promise.all([
      prisma.news.findMany({
        where,
        include: {
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
      prisma.news.count({ where })
    ]);

    return NextResponse.json({
      success: true,
      data: news,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get news error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch news' },
      { status: 500 }
    );
  }
}

// POST - Create new news
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, content, excerpt, thumbnail, tags, isPublished, authorId } = body;

    // Validation
    if (!title || !content || !authorId) {
      return NextResponse.json(
        { success: false, error: 'Title, content, and authorId are required' },
        { status: 400 }
      );
    }

    // Generate slug
    const baseSlug = generateSlug(title);
    let slug = baseSlug;
    let counter = 1;

    // Check if slug already exists
    const existingNews = await prisma.news.findUnique({
      where: { slug }
    });

    if (existingNews) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    // Create news
    const news = await prisma.news.create({
      data: {
        title,
        slug,
        content,
        excerpt,
        thumbnail,
        tags: Array.isArray(tags) ? tags.join(', ') : (tags || ''), // Convert array to string
        isPublished: isPublished || false,
        publishedAt: isPublished ? new Date() : null,
        authorId
      },
      include: {
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
      data: news,
      message: 'News created successfully'
    }, { status: 201 });

  } catch (error) {
    console.error('Create news error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create news' },
      { status: 500 }
    );
  }
}
