import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// PUT - Update career history
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json();
    const { position, institution, startDate, endDate, description, isActive, isPublished } = data;

    // Get the current career history to know the person
    const currentCareer = await prisma.careerHistory.findUnique({
      where: { id: params.id }
    });

    if (!currentCareer) {
      return NextResponse.json(
        { error: 'Riwayat jabatan tidak ditemukan' },
        { status: 404 }
      );
    }

    // If setting this as active, deactivate others for the same person
    if (isActive) {
      if (currentCareer.leaderId) {
        await prisma.careerHistory.updateMany({
          where: { 
            leaderId: currentCareer.leaderId, 
            isActive: true,
            NOT: { id: params.id }
          },
          data: { isActive: false }
        });
      }
      if (currentCareer.staffMemberId) {
        await prisma.careerHistory.updateMany({
          where: { 
            staffMemberId: currentCareer.staffMemberId, 
            isActive: true,
            NOT: { id: params.id }
          },
          data: { isActive: false }
        });
      }
    }

    const updatedCareer = await prisma.careerHistory.update({
      where: { id: params.id },
      data: {
        position,
        institution,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        description,
        isActive,
        isPublished
      }
    });

    return NextResponse.json(updatedCareer);
  } catch (error) {
    console.error('Error updating career history:', error);
    return NextResponse.json(
      { error: 'Gagal mengupdate riwayat jabatan' },
      { status: 500 }
    );
  }
}

// DELETE - Delete career history
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.careerHistory.delete({
      where: { id: params.id }
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Riwayat jabatan berhasil dihapus' 
    });
  } catch (error) {
    console.error('Error deleting career history:', error);
    return NextResponse.json(
      { error: 'Gagal menghapus riwayat jabatan' },
      { status: 500 }
    );
  }
}
