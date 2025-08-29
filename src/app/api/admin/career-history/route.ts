import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET - Ambil riwayat jabatan berdasarkan leader atau staff
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const leaderId = searchParams.get('leaderId');
    const staffMemberId = searchParams.get('staffMemberId');

    if (leaderId) {
      // leaderId is not part of CareerHistory model, only staffMemberId exists
      return NextResponse.json([]);
    }

    if (staffMemberId) {
      const careerHistory = await prisma.careerHistory.findMany({
        where: { staffMemberId },
        orderBy: { startDate: 'desc' }
      });
      return NextResponse.json(careerHistory);
    }

    // Jika tidak ada parameter, return semua riwayat
    const allCareerHistory = await prisma.careerHistory.findMany({
      include: {
        staffMember: true
      },
      orderBy: { startDate: 'desc' }
    });

    return NextResponse.json(allCareerHistory);
  } catch (error) {
    console.error('Error fetching career history:', error);
    return NextResponse.json(
      { error: 'Gagal mengambil data riwayat jabatan' },
      { status: 500 }
    );
  }
}

// POST - Tambah riwayat jabatan baru
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { 
      position, 
      institution, 
      startDate, 
      endDate, 
      description, 
      isActive,
      isPublished = false, // Default ke false jika tidak disertakan
      staffMemberId 
    } = data;

    // Validasi: harus ada staffMemberId
    if (!staffMemberId) {
      return NextResponse.json(
        { error: 'Harus disertakan staffMemberId' },
        { status: 400 }
      );
    }

    // Jika isActive true, set semua riwayat lain menjadi false untuk person yang sama
    if (isActive) {
      await prisma.careerHistory.updateMany({
        where: { staffMemberId, isActive: true },
        data: { isActive: false }
      });
    }

    const careerHistory = await prisma.careerHistory.create({
      data: {
        position,
        institution,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        description,
        isActive,
        isPublished,
        staffMemberId
      }
    });

    return NextResponse.json(careerHistory, { status: 201 });
  } catch (error) {
    console.error('Error creating career history:', error);
    return NextResponse.json(
      { error: 'Gagal menambahkan riwayat jabatan' },
      { status: 500 }
    );
  }
}
