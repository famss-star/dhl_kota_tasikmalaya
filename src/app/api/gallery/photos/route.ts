import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET - Fetch all gallery photos
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const isPublished = searchParams.get('published');
    
    const photos = await prisma.galleryPhoto.findMany({
      where: isPublished ? { isPublished: true } : undefined,
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({
      success: true,
      data: photos
    });
  } catch (error) {
    console.error('Error fetching gallery photos:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch photos' },
      { status: 500 }
    );
  }
}

// POST - Create new gallery photo
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, filename, filepath, filesize, isPublished = true } = body;

    if (!title || !filename || !filepath) {
      return NextResponse.json(
        { success: false, error: 'Title, filename, and filepath are required' },
        { status: 400 }
      );
    }

    const photo = await prisma.galleryPhoto.create({
      data: {
        title,
        description: description || '',
        filename,
        filepath,
        filesize: filesize || 0,
        isPublished
      }
    });

    return NextResponse.json({
      success: true,
      data: photo
    });
  } catch (error) {
    console.error('Error creating gallery photo:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create photo' },
      { status: 500 }
    );
  }
}
