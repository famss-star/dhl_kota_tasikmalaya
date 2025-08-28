import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const category = searchParams.get('category');
    const published = searchParams.get('published') === 'true';

    const skip = (page - 1) * limit;

    const where: any = {};
    if (category) {
      where.category = category;
    }
    if (published !== undefined) {
      where.published = published;
    }

    // Mock data for gallery
    const galleryItems = [
      {
        id: 'gallery-1',
        title: 'Pembersihan Sungai Ciliwung',
        description: 'Kegiatan pembersihan sungai yang melibatkan masyarakat',
        image: '/uploads/gallery/pembersihan-sungai-1.jpg',
        category: 'Kegiatan',
        published: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 'gallery-2',
        title: 'Sosialisasi Pengelolaan Sampah',
        description: 'Program edukasi pengelolaan sampah di sekolah-sekolah',
        image: '/uploads/gallery/sosialisasi-sampah-1.jpg',
        category: 'Edukasi',
        published: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 'gallery-3',
        title: 'Monitoring Kualitas Udara',
        description: 'Pemantauan kualitas udara di berbagai titik kota',
        image: '/uploads/gallery/monitoring-udara-1.jpg',
        category: 'Monitoring',
        published: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 'gallery-4',
        title: 'Program Tanam Pohon',
        description: 'Aksi penanaman pohon di area perkotaan',
        image: '/uploads/gallery/tanam-pohon-1.jpg',
        category: 'Konservasi',
        published: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];

    let filteredItems = galleryItems;
    
    if (category) {
      filteredItems = galleryItems.filter(item => 
        item.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (published !== undefined) {
      filteredItems = filteredItems.filter(item => item.published === published);
    }

    const total = filteredItems.length;
    const paginatedItems = filteredItems.slice(skip, skip + limit);

    return NextResponse.json({
      success: true,
      data: paginatedItems,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Gallery API error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to fetch gallery data' 
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const newItem = {
      id: `gallery-${Date.now()}`,
      title: body.title,
      description: body.description || '',
      image: body.image,
      category: body.category || 'Umum',
      published: body.published ?? true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    return NextResponse.json({
      success: true,
      data: newItem,
      message: 'Gallery item created successfully'
    }, { status: 201 });

  } catch (error) {
    console.error('Gallery creation error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to create gallery item' 
    }, { status: 500 });
  }
}
