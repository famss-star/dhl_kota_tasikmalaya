import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/agenda/[id] - Get agenda by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: paramId } = await params;
    const id = parseInt(paramId);

    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, error: 'ID agenda tidak valid' },
        { status: 400 }
      );
    }

    const agenda = await prisma.agenda.findUnique({
      where: { id }
    });

    if (!agenda) {
      return NextResponse.json(
        { success: false, error: 'Agenda tidak ditemukan' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: agenda
    });
  } catch (error) {
    console.error('Error fetching agenda:', error);
    return NextResponse.json(
      { success: false, error: 'Gagal mengambil data agenda' },
      { status: 500 }
    );
  }
}

// PUT /api/agenda/[id] - Update agenda
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: paramId } = await params;
    const id = parseInt(paramId);

    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, error: 'ID agenda tidak valid' },
        { status: 400 }
      );
    }

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
      status
    } = body;

    // Check if agenda exists
    const existingAgenda = await prisma.agenda.findUnique({
      where: { id }
    });

    if (!existingAgenda) {
      return NextResponse.json(
        { success: false, error: 'Agenda tidak ditemukan' },
        { status: 404 }
      );
    }

    // Validation
    if (!title || !description || !location || !startDate || !startTime || !organizer) {
      return NextResponse.json(
        { success: false, error: 'Field wajib tidak boleh kosong' },
        { status: 400 }
      );
    }

    // Update agenda
    const updatedAgenda = await prisma.agenda.update({
      where: { id },
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
        status: status === 'upcoming' ? 'UPCOMING' : 
                status === 'ongoing' ? 'ONGOING' :
                status === 'completed' ? 'COMPLETED' :
                status === 'cancelled' ? 'CANCELLED' : 'UPCOMING'
      }
    });

    return NextResponse.json({
      success: true,
      data: updatedAgenda,
      message: 'Agenda berhasil diperbarui'
    });
  } catch (error) {
    console.error('Error updating agenda:', error);
    return NextResponse.json(
      { success: false, error: 'Gagal memperbarui agenda' },
      { status: 500 }
    );
  }
}

// DELETE /api/agenda/[id] - Delete agenda
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: paramId } = await params;
    const id = parseInt(paramId);

    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, error: 'ID agenda tidak valid' },
        { status: 400 }
      );
    }

    // Check if agenda exists
    const existingAgenda = await prisma.agenda.findUnique({
      where: { id }
    });

    if (!existingAgenda) {
      return NextResponse.json(
        { success: false, error: 'Agenda tidak ditemukan' },
        { status: 404 }
      );
    }

    // Delete agenda
    await prisma.agenda.delete({
      where: { id }
    });

    return NextResponse.json({
      success: true,
      message: 'Agenda berhasil dihapus'
    });
  } catch (error) {
    console.error('Error deleting agenda:', error);
    return NextResponse.json(
      { success: false, error: 'Gagal menghapus agenda' },
      { status: 500 }
    );
  }
}
