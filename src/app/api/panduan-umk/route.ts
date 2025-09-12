import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET - Get all panduan UMK grouped by category
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    let panduan;
    
    if (category) {
      // Get panduan by specific category
      panduan = await prisma.panduanUMK.findMany({
        where: {
          category,
          isActive: true
        },
        orderBy: {
          order: 'asc'
        }
      });
    } else {
      // Get all panduan grouped by category
      panduan = await prisma.panduanUMK.findMany({
        where: {
          isActive: true
        },
        orderBy: [
          { category: 'asc' },
          { order: 'asc' }
        ]
      });
    }

    // Group by category if getting all
    if (!category) {
      const groupedPanduan = panduan.reduce((acc: any, item) => {
        if (!acc[item.category]) {
          acc[item.category] = [];
        }
        acc[item.category].push(item);
        return acc;
      }, {});

      return NextResponse.json({
        success: true,
        data: groupedPanduan
      });
    }

    return NextResponse.json({
      success: true,
      data: panduan
    });
  } catch (error) {
    console.error('Error fetching panduan UMK:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch panduan UMK' },
      { status: 500 }
    );
  }
}

// POST - Create new panduan UMK
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { category, title, description, content, order } = body;

    // Validate required fields
    if (!category || !title || !description) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: category, title, description' },
        { status: 400 }
      );
    }

    const newPanduan = await prisma.panduanUMK.create({
      data: {
        category,
        title,
        description,
        content: content || null,
        order: order || 0
      }
    });

    return NextResponse.json({
      success: true,
      data: newPanduan
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating panduan UMK:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create panduan UMK' },
      { status: 500 }
    );
  }
}
