import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET - Fetch all gallery videos
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const isPublished = searchParams.get('published');
    
    const videos = await prisma.galleryVideo.findMany({
      where: isPublished ? { isPublished: true } : undefined,
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({
      success: true,
      data: videos
    });
  } catch (error) {
    console.error('Error fetching gallery videos:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch videos' },
      { status: 500 }
    );
  }
}

// POST - Create new gallery video
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, videoUrl, thumbnail, duration, isPublished = true } = body;

    if (!title || !videoUrl) {
      return NextResponse.json(
        { success: false, error: 'Title and video URL are required' },
        { status: 400 }
      );
    }

    const video = await prisma.galleryVideo.create({
      data: {
        title,
        description: description || '',
        videoUrl,
        thumbnail,
        duration,
        isPublished
      }
    });

    return NextResponse.json({
      success: true,
      data: video
    });
  } catch (error) {
    console.error('Error creating gallery video:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create video' },
      { status: 500 }
    );
  }
}
