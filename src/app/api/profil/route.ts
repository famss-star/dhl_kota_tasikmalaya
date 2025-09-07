import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    // Ambil data profil dari berbagai sumber
    const [settings, totalStaff, employeeStats] = await Promise.all([
      // Ambil settings yang dibutuhkan untuk profil
      prisma.siteSetting.findMany({
        where: {
          key: {
            in: ['visi', 'misi', 'tentang_kami', 'site_name', 'site_description']
          }
        }
      }),
      
      // Hitung total staff
      prisma.staffMember.count({
        where: {
          isActive: true
        }
      }),
      
      // Ambil statistik pegawai
      prisma.employeeStatistic.findMany({
        where: {
          isActive: true
        },
        orderBy: [
          { category: 'asc' },
          { order: 'asc' }
        ]
      })
    ]);

    // Transform settings ke object
    const settingsObj = settings.reduce((acc, setting) => {
      acc[setting.key] = setting.value;
      return acc;
    }, {} as Record<string, string>);

    // Group employee statistics by category
    const statsGrouped = employeeStats.reduce((acc, stat) => {
      if (!acc[stat.category]) {
        acc[stat.category] = [];
      }
      acc[stat.category].push({
        subcategory: stat.subcategory,
        count: stat.count,
        description: stat.description
      });
      return acc;
    }, {} as Record<string, any[]>);

    return NextResponse.json({
      success: true,
      data: {
        // Basic info
        siteName: settingsObj.site_name || 'Dinas Lingkungan Hidup Kota Tasikmalaya',
        siteDescription: settingsObj.site_description || 'Portal resmi Dinas Lingkungan Hidup Kota Tasikmalaya',
        
        // Content
        visi: settingsObj.visi || 'Tasikmalaya sebagai kota industri, jasa dan perdagangan yang religius, inovatif, maju dan berkelanjutan',
        misi: settingsObj.misi || '4 misi utama dalam pengendalian pencemaran, kesadaran masyarakat, pengelolaan sampah, dan peningkatan kapasitas aparatur',
        tentangKami: settingsObj.tentang_kami || 'Dinas Lingkungan Hidup Kota Tasikmalaya merupakan unsur pelaksana urusan pemerintahan di bidang lingkungan hidup yang berkomitmen memberikan pelayanan terbaik kepada masyarakat.',
        
        // Statistics
        totalStaff,
        employeeStatistics: statsGrouped,
        
        // Summary stats for cards
        summary: {
          bidangUtama: 3,
          seksiOperasional: 8,
          asnKompeten: totalStaff,
          monitoringLingkungan: '24/7'
        }
      }
    });

  } catch (error) {
    console.error('Get profil data error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch profil data' },
      { status: 500 }
    );
  }
}

// POST: Create or update profil settings
export async function POST(request: NextRequest) {
  try {
    const { visi, misi, tentangKami } = await request.json();

    const updates = [];

    if (visi) {
      updates.push(
        prisma.siteSetting.upsert({
          where: { key: 'visi' },
          update: { value: visi },
          create: {
            key: 'visi',
            value: visi,
            type: 'STRING',
            label: 'Visi Organisasi',
            description: 'Visi Dinas Lingkungan Hidup Kota Tasikmalaya'
          }
        })
      );
    }

    if (misi) {
      updates.push(
        prisma.siteSetting.upsert({
          where: { key: 'misi' },
          update: { value: misi },
          create: {
            key: 'misi',
            value: misi,
            type: 'STRING',
            label: 'Misi Organisasi',
            description: 'Misi Dinas Lingkungan Hidup Kota Tasikmalaya'
          }
        })
      );
    }

    if (tentangKami) {
      updates.push(
        prisma.siteSetting.upsert({
          where: { key: 'tentang_kami' },
          update: { value: tentangKami },
          create: {
            key: 'tentang_kami',
            value: tentangKami,
            type: 'STRING',
            label: 'Tentang Kami',
            description: 'Deskripsi tentang Dinas Lingkungan Hidup Kota Tasikmalaya'
          }
        })
      );
    }

    const results = await Promise.all(updates);

    return NextResponse.json({
      success: true,
      data: results,
      message: 'Profil data updated successfully'
    });

  } catch (error) {
    console.error('Update profil data error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update profil data' },
      { status: 500 }
    );
  }
}