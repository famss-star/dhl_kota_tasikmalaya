import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET - Fetch single gallery photo
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const photo = await prisma.galleryPhoto.findUnique({
      where: { id }
    });

    if (!photo) {
      return NextResponse.json(
        { success: false, error: 'Photo not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: photo
    });
  } catch (error) {
    console.error('Error fetching gallery photo:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch photo' },
      { status: 500 }
    );
  }
}

// PUT - Update gallery photo
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { title, description, isPublished } = body;

    const photo = await prisma.galleryPhoto.update({
      where: { id },
      data: {
        title,
        description,
        isPublished,
        updatedAt: new Date()
      }
    });

    return NextResponse.json({
      success: true,
      data: photo
    });
  } catch (error) {
    console.error('Error updating gallery photo:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update photo' },
      { status: 500 }
    );
  }
}

// DELETE - Delete gallery photo
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.galleryPhoto.delete({
      where: { id }
    });

    return NextResponse.json({
      success: true,
      message: 'Photo deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting gallery photo:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete photo' },
      { status: 500 }
    );
  }
}
