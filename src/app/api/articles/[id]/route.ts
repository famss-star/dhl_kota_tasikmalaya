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

// GET - Get single article by id or slug
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const isAdmin = searchParams.get('admin') === 'true';
    
    // Try to find by ID first, then by slug
    let article = await prisma.article.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        category: {
          select: {
            id: true,
            name: true,
            slug: true
          }
        }
      }
    });

    // If not found by ID, try by slug
    if (!article) {
      article = await prisma.article.findUnique({
        where: { slug: id }, // id parameter actually contains slug in this case
        include: {
          author: {
            select: {
              id: true,
              name: true,
              email: true
            }
          },
          category: {
            select: {
              id: true,
              name: true,
              slug: true
            }
          }
        }
      });
    }

    if (!article) {
      return NextResponse.json(
        { success: false, error: 'Article not found' },
        { status: 404 }
      );
    }

    // If not admin and article is not published, don't return it
    if (!isAdmin && !article.isPublished) {
      return NextResponse.json(
        { success: false, error: 'Article not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: article
    });

  } catch (error) {
    console.error('Get article error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch article' },
      { status: 500 }
    );
  }
}

// PATCH - Update article
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { title, content, excerpt, thumbnail, isPublished } = body;

    // Check if article exists by ID first, then by slug
    let existingArticle = await prisma.article.findUnique({
      where: { id }
    });

    if (!existingArticle) {
      existingArticle = await prisma.article.findUnique({
        where: { slug: id }
      });
    }

    if (!existingArticle) {
      return NextResponse.json(
        { success: false, error: 'Article not found' },
        { status: 404 }
      );
    }

    let newSlug = existingArticle.slug;
    
    // If title changed, generate new slug
    if (title && title !== existingArticle.title) {
      const baseSlug = generateSlug(title);
      newSlug = baseSlug;
      let counter = 1;

      // Check if new slug already exists (excluding current article)
      const existingWithSlug = await prisma.article.findFirst({
        where: { 
          slug: newSlug,
          id: { not: existingArticle.id }
        }
      });

      if (existingWithSlug) {
        newSlug = `${baseSlug}-${counter}`;
        counter++;
      }
    }

    // Update article using the actual ID
    const updatedArticle = await prisma.article.update({
      where: { id: existingArticle.id },
      data: {
        ...(title && { title }),
        ...(newSlug !== existingArticle.slug && { slug: newSlug }),
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
        },
        category: {
          select: {
            id: true,
            name: true,
            slug: true
          }
        }
      }
    });

    return NextResponse.json({
      success: true,
      data: updatedArticle,
      message: 'Article updated successfully'
    });

  } catch (error) {
    console.error('Update article error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update article' },
      { status: 500 }
    );
  }
}

// DELETE - Delete article
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Check if article exists by ID first, then by slug
    let existingArticle = await prisma.article.findUnique({
      where: { id }
    });

    if (!existingArticle) {
      existingArticle = await prisma.article.findUnique({
        where: { slug: id }
      });
    }

    if (!existingArticle) {
      return NextResponse.json(
        { success: false, error: 'Article not found' },
        { status: 404 }
      );
    }

    await prisma.article.delete({
      where: { id: existingArticle.id }
    });

    return NextResponse.json({
      success: true,
      message: 'Article deleted successfully'
    });

  } catch (error) {
    console.error('Delete article error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete article' },
      { status: 500 }
    );
  }
}
