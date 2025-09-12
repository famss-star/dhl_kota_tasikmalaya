import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET - Get all informasi pages
export async function GET() {
  try {
    const pages = await prisma.informasiPage.findMany({
      where: {
        isActive: true
      },
      orderBy: {
        order: 'asc'
      }
    });

    return NextResponse.json({
      success: true,
      data: pages
    });
  } catch (error) {
    console.error('Error fetching informasi pages:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch informasi pages' },
      { status: 500 }
    );
  }
}

// POST - Create new informasi page
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, icon, link, color, order } = body;

    // Validate required fields
    if (!title || !description || !icon || !link) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: title, description, icon, link' },
        { status: 400 }
      );
    }

    const newPage = await prisma.informasiPage.create({
      data: {
        title,
        description,
        icon,
        link,
        color: color || 'blue',
        order: order || 0
      }
    });

    return NextResponse.json({
      success: true,
      data: newPage
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating informasi page:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create informasi page' },
      { status: 500 }
    );
  }
}
