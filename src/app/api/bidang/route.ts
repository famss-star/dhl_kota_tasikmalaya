import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET - Get all bidang
export async function GET() {
  try {
    const bidang = await prisma.bidang.findMany({
      where: {
        isActive: true
      },
      orderBy: {
        name: 'asc'
      }
    });

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

// POST - Create new bidang
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { slug, name, aboutTitle, aboutDescription, tugasPokokTitle, tugasPokok, fungsiTitle, fungsi } = body;

    // Validate required fields
    if (!slug || !name || !aboutTitle || !aboutDescription) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if slug already exists
    const existingBidang = await prisma.bidang.findUnique({
      where: { slug }
    });

    if (existingBidang) {
      return NextResponse.json(
        { success: false, error: 'Slug already exists' },
        { status: 400 }
      );
    }

    const newBidang = await prisma.bidang.create({
      data: {
        slug,
        name,
        aboutTitle,
        aboutDescription,
        tugasPokokTitle: tugasPokokTitle || 'Tugas Pokok',
        tugasPokok: JSON.stringify(tugasPokok || []),
        fungsiTitle: fungsiTitle || 'Fungsi',
        fungsi: JSON.stringify(fungsi || [])
      }
    });

    return NextResponse.json({
      success: true,
      data: newBidang
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating bidang:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create bidang' },
      { status: 500 }
    );
  }
}
