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

// GET - Get single news by id
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const isAdmin = searchParams.get('admin') === 'true';
    
    const news = await prisma.news.findUnique({
      where: { id },
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

    if (!news) {
      return NextResponse.json(
        { success: false, error: 'News not found' },
        { status: 404 }
      );
    }

    // If not admin and news is not published, don't return it
    if (!isAdmin && !news.isPublished) {
      return NextResponse.json(
        { success: false, error: 'News not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: news
    });

  } catch (error) {
    console.error('Get news error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch news' },
      { status: 500 }
    );
  }
}

// PATCH - Update news
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { title, content, excerpt, thumbnail, isPublished } = body;

    // Check if news exists
    const existingNews = await prisma.news.findUnique({
      where: { id }
    });

    if (!existingNews) {
      return NextResponse.json(
        { success: false, error: 'News not found' },
        { status: 404 }
      );
    }

    let newSlug = existingNews.slug;
    
    // If title changed, generate new slug
    if (title && title !== existingNews.title) {
      const baseSlug = generateSlug(title);
      newSlug = baseSlug;
      let counter = 1;

      // Check if new slug already exists (excluding current news)
      const existingWithSlug = await prisma.news.findFirst({
        where: { 
          slug: newSlug,
          id: { not: existingNews.id }
        }
      });

      if (existingWithSlug) {
        newSlug = `${baseSlug}-${counter}`;
        counter++;
      }
    }

    // Update news
    const updatedNews = await prisma.news.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(newSlug !== existingNews.slug && { slug: newSlug }),
        ...(content && { content }),
        ...(excerpt !== undefined && { excerpt }),
        ...(thumbnail !== undefined && { thumbnail }),
        ...(isPublished !== undefined && { 
          isPublished,
          publishedAt: isPublished ? new Date() : null
        })
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
      data: updatedNews,
      message: 'News updated successfully'
    });

  } catch (error) {
    console.error('Update news error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update news' },
      { status: 500 }
    );
  }
}

// DELETE - Delete news
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const existingNews = await prisma.news.findUnique({
      where: { id }
    });

    if (!existingNews) {
      return NextResponse.json(
        { success: false, error: 'News not found' },
        { status: 404 }
      );
    }

    await prisma.news.delete({
      where: { id }
    });

    return NextResponse.json({
      success: true,
      message: 'News deleted successfully'
    });

  } catch (error) {
    console.error('Delete news error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete news' },
      { status: 500 }
    );
  }
}
