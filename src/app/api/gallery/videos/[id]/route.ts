import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET - Fetch single gallery video
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const video = await prisma.galleryVideo.findUnique({
      where: { id }
    });

    if (!video) {
      return NextResponse.json(
        { success: false, error: 'Video not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: video
    });
  } catch (error) {
    console.error('Error fetching gallery video:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch video' },
      { status: 500 }
    );
  }
}

// PUT - Update gallery video
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { title, description, videoUrl, thumbnail, duration, isPublished } = body;

    const video = await prisma.galleryVideo.update({
      where: { id },
      data: {
        title,
        description,
        videoUrl,
        thumbnail,
        duration,
        isPublished,
        updatedAt: new Date()
      }
    });

    return NextResponse.json({
      success: true,
      data: video
    });
  } catch (error) {
    console.error('Error updating gallery video:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update video' },
      { status: 500 }
    );
  }
}

// DELETE - Delete gallery video
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.galleryVideo.delete({
      where: { id }
    });

    return NextResponse.json({
      success: true,
      message: 'Video deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting gallery video:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete video' },
      { status: 500 }
    );
  }
}
