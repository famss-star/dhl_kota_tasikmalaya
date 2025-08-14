import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET: Ambil semua settings atau setting tertentu
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const key = searchParams.get('key');

    if (key) {
      // Ambil setting tertentu
      const setting = await prisma.siteSetting.findUnique({
        where: { key }
      });

      if (!setting) {
        return NextResponse.json(
          { success: false, error: 'Setting not found' },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        data: setting
      });
    } else {
      // Ambil semua settings
      const settings = await prisma.siteSetting.findMany({
        orderBy: { key: 'asc' }
      });

      return NextResponse.json({
        success: true,
        data: settings
      });
    }
  } catch (error) {
    console.error('Get settings error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch settings' },
      { status: 500 }
    );
  }
}

// POST: Buat setting baru
export async function POST(request: NextRequest) {
  try {
    const { key, value, type = 'STRING', label, description } = await request.json();

    if (!key || !value || !label) {
      return NextResponse.json(
        { success: false, error: 'Key, value, and label are required' },
        { status: 400 }
      );
    }

    const setting = await prisma.siteSetting.create({
      data: {
        key,
        value,
        type,
        label,
        description
      }
    });

    return NextResponse.json({
      success: true,
      data: setting
    });
  } catch (error: any) {
    console.error('Create setting error:', error);
    
    if (error.code === 'P2002') {
      return NextResponse.json(
        { success: false, error: 'Setting key already exists' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Failed to create setting' },
      { status: 500 }
    );
  }
}

// PUT: Update setting
export async function PUT(request: NextRequest) {
  try {
    const { key, value, label, description } = await request.json();

    if (!key || !value) {
      return NextResponse.json(
        { success: false, error: 'Key and value are required' },
        { status: 400 }
      );
    }

    const setting = await prisma.siteSetting.update({
      where: { key },
      data: {
        value,
        ...(label && { label }),
        ...(description !== undefined && { description })
      }
    });

    return NextResponse.json({
      success: true,
      data: setting
    });
  } catch (error: any) {
    console.error('Update setting error:', error);
    
    if (error.code === 'P2025') {
      return NextResponse.json(
        { success: false, error: 'Setting not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Failed to update setting' },
      { status: 500 }
    );
  }
}

// DELETE: Hapus setting
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const key = searchParams.get('key');

    if (!key) {
      return NextResponse.json(
        { success: false, error: 'Key is required' },
        { status: 400 }
      );
    }

    await prisma.siteSetting.delete({
      where: { key }
    });

    return NextResponse.json({
      success: true,
      message: 'Setting deleted successfully'
    });
  } catch (error: any) {
    console.error('Delete setting error:', error);
    
    if (error.code === 'P2025') {
      return NextResponse.json(
        { success: false, error: 'Setting not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Failed to delete setting' },
      { status: 500 }
    );
  }
}
