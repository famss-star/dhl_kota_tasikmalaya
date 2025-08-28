import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET - Ambil staff members yang aktif untuk publik
export async function GET() {
  try {
    const staffMembers = await prisma.staffMember.findMany({
      where: {
        isActive: true, // Hanya ambil staff yang aktif
        isPublished: true, // Hanya ambil staff yang sudah dipublikasikan
      },
      include: {
        careerHistory: {
          where: {
            isPublished: true, // Hanya ambil riwayat jabatan yang sudah dipublikasi
            isActive: true
          },
          orderBy: { startDate: 'desc' }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(staffMembers);
  } catch (error) {
    console.error('Error fetching public staff members:', error);
    return NextResponse.json(
      { error: 'Gagal mengambil data staff' },
      { status: 500 }
    );
  }
}
