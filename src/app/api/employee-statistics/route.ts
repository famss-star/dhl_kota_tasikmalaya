import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

interface EmployeeStatistic {
  id: string;
  category: string;
  subcategory: string;
  count: number;
  description: string | null;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// GET - Ambil statistik pegawai
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    if (category) {
      // Ambil statistik berdasarkan kategori tertentu
      const statistics = await prisma.employeeStatistic.findMany({
        where: { 
          category,
          isActive: true 
        },
        orderBy: { order: 'asc' }
      });

      return NextResponse.json({
        success: true,
        data: statistics
      });
    } else {
      // Ambil semua statistik yang dikelompokkan berdasarkan kategori
      const statistics = await prisma.employeeStatistic.findMany({
        where: { isActive: true },
        orderBy: [
          { category: 'asc' },
          { order: 'asc' }
        ]
      });

      // Kelompokkan berdasarkan kategori
      const groupedData = statistics.reduce((acc: Record<string, EmployeeStatistic[]>, stat: EmployeeStatistic) => {
        if (!acc[stat.category]) {
          acc[stat.category] = [];
        }
        acc[stat.category].push(stat);
        return acc;
      }, {} as Record<string, EmployeeStatistic[]>);

      return NextResponse.json({
        success: true,
        data: groupedData
      });
    }
  } catch (error) {
    console.error('Error fetching employee statistics:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch employee statistics' },
      { status: 500 }
    );
  }
}

// POST - Buat atau update statistik pegawai
export async function POST(request: NextRequest) {
  try {
    const { category, subcategory, count, description, order } = await request.json();

    if (!category || !subcategory || count === undefined) {
      return NextResponse.json(
        { success: false, error: 'Category, subcategory, and count are required' },
        { status: 400 }
      );
    }

    const statistic = await prisma.employeeStatistic.upsert({
      where: {
        category_subcategory: {
          category,
          subcategory
        }
      },
      update: {
        count,
        description,
        order: order || 0
      },
      create: {
        category,
        subcategory,
        count,
        description,
        order: order || 0
      }
    });

    return NextResponse.json({
      success: true,
      data: statistic
    });
  } catch (error) {
    console.error('Error creating/updating employee statistic:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to save employee statistic' },
      { status: 500 }
    );
  }
}

// PUT - Update statistik pegawai
export async function PUT(request: NextRequest) {
  try {
    const { id, category, subcategory, count, description, order, isActive } = await request.json();

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'ID is required' },
        { status: 400 }
      );
    }

    const statistic = await prisma.employeeStatistic.update({
      where: { id },
      data: {
        ...(category && { category }),
        ...(subcategory && { subcategory }),
        ...(count !== undefined && { count }),
        ...(description !== undefined && { description }),
        ...(order !== undefined && { order }),
        ...(isActive !== undefined && { isActive })
      }
    });

    return NextResponse.json({
      success: true,
      data: statistic
    });
  } catch (error) {
    console.error('Error updating employee statistic:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update employee statistic' },
      { status: 500 }
    );
  }
}

// DELETE - Hapus statistik pegawai
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'ID is required' },
        { status: 400 }
      );
    }

    await prisma.employeeStatistic.delete({
      where: { id }
    });

    return NextResponse.json({
      success: true,
      message: 'Employee statistic deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting employee statistic:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete employee statistic' },
      { status: 500 }
    );
  }
}
