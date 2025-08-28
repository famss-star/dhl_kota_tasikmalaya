import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET - Ambil data kepala dinas yang aktif
export async function GET() {
  try {
    const leader = await prisma.leader.findFirst({
      where: {
        isActive: true
      },
      include: {
        careerHistory: {
          where: {
            isPublished: true // Hanya ambil riwayat jabatan yang sudah dipublikasi
          },
          orderBy: {
            startDate: 'desc' // Urutkan dari yang terbaru
          }
        }
      }
    });

    if (!leader) {
      // Return default data jika belum ada data
      return NextResponse.json({
        success: true,
        data: {
          id: null,
          name: "Drs. Nama Pimpinan",
          position: "Kepala Dinas Lingkungan Hidup",
          greeting: "Selamat datang di portal Dinas Lingkungan Hidup Kota Tasikmalaya. Kami berkomitmen untuk mewujudkan lingkungan yang bersih, sehat, dan lestari melalui kolaborasi dengan masyarakat. Mari bersama menjaga dan mencintai lingkungan demi masa depan yang lebih baik.",
          photo: "/pemimpin-placeholder.svg",
          isActive: true
        }
      });
    }

    return NextResponse.json({
      success: true,
      data: leader
    });
  } catch (error) {
    console.error('Error fetching leader:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch leader data' },
      { status: 500 }
    );
  }
}

// POST - Buat atau update data kepala dinas
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, position, greeting, photo } = body;

    if (!name || !position || !greeting) {
      return NextResponse.json(
        { success: false, error: 'Name, position, and greeting are required' },
        { status: 400 }
      );
    }

    // Nonaktifkan leader yang lama
    await prisma.leader.updateMany({
      where: { isActive: true },
      data: { isActive: false }
    });

    // Buat leader baru
    const leader = await prisma.leader.create({
      data: {
        name,
        position,
        greeting,
        photo: photo || "/pemimpin-placeholder.svg",
        isActive: true
      }
    });

    return NextResponse.json({
      success: true,
      data: leader
    });
  } catch (error) {
    console.error('Error creating leader:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create leader data' },
      { status: 500 }
    );
  }
}

// PUT - Update data kepala dinas yang aktif
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, position, greeting, photo } = body;

    if (!name || !position || !greeting) {
      return NextResponse.json(
        { success: false, error: 'Name, position, and greeting are required' },
        { status: 400 }
      );
    }

    // Cari leader yang aktif
    const activeLeader = await prisma.leader.findFirst({
      where: { isActive: true }
    });

    let leader;
    if (activeLeader) {
      // Update leader yang sudah ada
      leader = await prisma.leader.update({
        where: { id: activeLeader.id },
        data: {
          name,
          position,
          greeting,
          photo: photo || activeLeader.photo
        }
      });
    } else {
      // Buat leader baru jika belum ada
      leader = await prisma.leader.create({
        data: {
          name,
          position,
          greeting,
          photo: photo || "/pemimpin-placeholder.svg",
          isActive: true
        }
      });
    }

    return NextResponse.json({
      success: true,
      data: leader
    });
  } catch (error) {
    console.error('Error updating leader:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update leader data' },
      { status: 500 }
    );
  }
}
