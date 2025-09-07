import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    // Ambil data visi, misi, tentang kami, dan tupoksi dari site_settings
    const settings = await prisma.siteSetting.findMany({
      where: {
        OR: [
          { key: 'visi' },
          { key: 'tentang_kami' },
          { key: { startsWith: 'misi_' } },
          { key: { startsWith: 'tupoksi_' } },
          { key: 'tugas_pokok' }
        ]
      },
      orderBy: {
        key: 'asc'
      }
    });

    // Format data untuk response
    const data = settings.reduce((acc, setting) => {
      acc[setting.key] = setting.value;
      return acc;
    }, {} as Record<string, string>);

    // Susun data misi dalam array (support dynamic number)
    const misiKeys = Object.keys(data)
      .filter(key => key.startsWith('misi_'))
      .sort((a, b) => {
        const numA = parseInt(a.replace('misi_', ''));
        const numB = parseInt(b.replace('misi_', ''));
        return numA - numB;
      });
    
    const misiData = misiKeys.map(key => data[key]).filter(Boolean);

    // Susun data tupoksi
    const tupoksiKepalaDinasKeys = Object.keys(data)
      .filter(key => key.startsWith('tupoksi_kepala_dinas_tugas_'))
      .sort((a, b) => {
        const numA = parseInt(a.split('_').pop() || '0');
        const numB = parseInt(b.split('_').pop() || '0');
        return numA - numB;
      });
    
    const kepalaDinasData = tupoksiKepalaDinasKeys.map(key => data[key]).filter(Boolean);

    // Susun data tupoksi sekretariat
    const sekretariatKeys = Object.keys(data)
      .filter(key => key.startsWith('tupoksi_sekretariat_tugas_'))
      .sort((a, b) => {
        const numA = parseInt(a.split('_').pop() || '0');
        const numB = parseInt(b.split('_').pop() || '0');
        return numA - numB;
      });
    
    const sekretariatData = sekretariatKeys.map(key => data[key]).filter(Boolean);

    // Susun data tupoksi sub umum
    const subUmumKeys = Object.keys(data)
      .filter(key => key.startsWith('tupoksi_sub_umum_tugas_'))
      .sort((a, b) => {
        const numA = parseInt(a.split('_').pop() || '0');
        const numB = parseInt(b.split('_').pop() || '0');
        return numA - numB;
      });
    
    const subUmumData = subUmumKeys.map(key => data[key]).filter(Boolean);

    // Susun data tupoksi sub keuangan
    const subKeuanganKeys = Object.keys(data)
      .filter(key => key.startsWith('tupoksi_sub_keuangan_tugas_'))
      .sort((a, b) => {
        const numA = parseInt(a.split('_').pop() || '0');
        const numB = parseInt(b.split('_').pop() || '0');
        return numA - numB;
      });
    
    const subKeuanganData = subKeuanganKeys.map(key => data[key]).filter(Boolean);

    const tupoksiData = {
      tugasPokok: data.tugas_pokok || '',
      kepalaDinas: {
        deskripsi: data.tupoksi_kepala_dinas_desc || '',
        tugas: kepalaDinasData
      },
      sekretariat: {
        deskripsi: data.tupoksi_sekretariat_desc || '',
        tugas: sekretariatData
      },
      subUmum: {
        deskripsi: data.tupoksi_sub_umum_desc || '',
        tugas: subUmumData
      },
      subKeuangan: {
        deskripsi: data.tupoksi_sub_keuangan_desc || '',
        tugas: subKeuanganData
      }
    };

    const response = {
      visi: data.visi || '',
      misi: misiData,
      tentangKami: data.tentang_kami || '',
      tupoksi: tupoksiData
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching about data:', error);
    return NextResponse.json(
      { error: 'Gagal mengambil data tentang organisasi', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
