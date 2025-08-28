import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/agenda - Get all agenda with pagination and filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || '';
    const month = searchParams.get('month');
    const year = searchParams.get('year');

    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {};
    
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { location: { contains: search, mode: 'insensitive' } },
        { organizer: { contains: search, mode: 'insensitive' } }
      ];
    }

    if (status) {
      where.status = status;
    }

    // Filter by month and year if provided
    if (month && year) {
      const monthNum = parseInt(month);
      const yearNum = parseInt(year);
      
      // Create date range for the specific month
      const startOfMonth = new Date(yearNum, monthNum - 1, 1);
      const endOfMonth = new Date(yearNum, monthNum, 0);
      
      where.startDate = {
        gte: startOfMonth.toISOString(),
        lte: endOfMonth.toISOString()
      };
    }

    // Get total count
    const total = await prisma.agenda.count({ where });

    // Get agenda with pagination
    const agenda = await prisma.agenda.findMany({
      where,
      orderBy: [
        { startDate: 'desc' },
        { startTime: 'desc' }
      ],
      skip,
      take: limit,
    });

    return NextResponse.json({
      success: true,
      data: {
        agenda,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching agenda:', error);
    return NextResponse.json(
      { success: false, error: 'Gagal mengambil data agenda' },
      { status: 500 }
    );
  }
}

// POST /api/agenda - Create new agenda
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      title,
      description,
      location,
      startDate,
      endDate,
      startTime,
      endTime,
      organizer,
      participants,
      tags,
      status
    } = body;

    // Validation
    if (!title || !description || !location || !startDate || !startTime || !organizer) {
      return NextResponse.json(
        { success: false, error: 'Field wajib tidak boleh kosong' },
        { status: 400 }
      );
    }

    // Create agenda
    const agenda = await prisma.agenda.create({
      data: {
        title,
        description,
        location,
        startDate: new Date(startDate),
        endDate: new Date(endDate || startDate),
        startTime,
        endTime: endTime || startTime,
        organizer,
        participants: participants || 0,
        tags: Array.isArray(tags) ? tags.join(', ') : (tags || ''),
        status: status === 'upcoming' ? 'UPCOMING' : 
                status === 'ongoing' ? 'ONGOING' :
                status === 'completed' ? 'COMPLETED' :
                status === 'cancelled' ? 'CANCELLED' : 'UPCOMING'
      }
    });

    return NextResponse.json({
      success: true,
      data: agenda,
      message: 'Agenda berhasil dibuat'
    });
  } catch (error) {
    console.error('Error creating agenda:', error);
    return NextResponse.json(
      { success: false, error: 'Gagal membuat agenda' },
      { status: 500 }
    );
  }
}
