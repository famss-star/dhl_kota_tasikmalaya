import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET - Get bidang by slug
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const bidang = await prisma.bidang.findUnique({
      where: {
        slug: slug,
        isActive: true
      }
    });

    if (!bidang) {
      return NextResponse.json(
        { success: false, error: 'Bidang not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: bidang
    });
  } catch (error) {
    console.error('Error fetching bidang:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch bidang' },
      { status: 500 }
    );
  }
}

// PUT - Update bidang by slug
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const body = await request.json();
    const { name, aboutTitle, aboutDescription, tugasPokokTitle, tugasPokok, fungsiTitle, fungsi } = body;

    // Check if bidang exists
    const existingBidang = await prisma.bidang.findUnique({
      where: { slug }
    });

    if (!existingBidang) {
      return NextResponse.json(
        { success: false, error: 'Bidang not found' },
        { status: 404 }
      );
    }

    const updatedBidang = await prisma.bidang.update({
      where: { slug },
      data: {
        name: name || existingBidang.name,
        aboutTitle: aboutTitle || existingBidang.aboutTitle,
        aboutDescription: aboutDescription || existingBidang.aboutDescription,
        tugasPokokTitle: tugasPokokTitle || existingBidang.tugasPokokTitle,
        tugasPokok: tugasPokok || existingBidang.tugasPokok,
        fungsiTitle: fungsiTitle || existingBidang.fungsiTitle,
        fungsi: fungsi || existingBidang.fungsi,
        updatedAt: new Date()
      }
    });

    return NextResponse.json({
      success: true,
      data: updatedBidang
    });
  } catch (error) {
    console.error('Error updating bidang:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update bidang' },
      { status: 500 }
    );
  }
}

// DELETE - Delete bidang by slug (soft delete)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    // Check if bidang exists
    const existingBidang = await prisma.bidang.findUnique({
      where: { slug }
    });

    if (!existingBidang) {
      return NextResponse.json(
        { success: false, error: 'Bidang not found' },
        { status: 404 }
      );
    }

    // Soft delete by setting isActive to false
    await prisma.bidang.update({
      where: { slug },
      data: {
        isActive: false,
        updatedAt: new Date()
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Bidang deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting bidang:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete bidang' },
      { status: 500 }
    );
  }
}
