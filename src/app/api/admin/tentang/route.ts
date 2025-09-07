import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET - Ambil data visi, misi, dan tentang kami untuk admin
export async function GET() {
  try {
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

    // Susun data tupoksi kepala dinas
    const tupoksiKepalaDinasKeys = Object.keys(data)
      .filter(key => key.startsWith('tupoksi_kepala_dinas_tugas_'))
      .sort((a, b) => {
        const numA = parseInt(a.split('_').pop() || '0');
        const numB = parseInt(b.split('_').pop() || '0');
        return numA - numB;
      });
    
    const kepalaDinasData = tupoksiKepalaDinasKeys.map(key => data[key]).filter(Boolean);

    // Susun data tupoksi sekretariat
    const tupoksiSekretariatKeys = Object.keys(data)
      .filter(key => key.startsWith('tupoksi_sekretariat_tugas_'))
      .sort((a, b) => {
        const numA = parseInt(a.split('_').pop() || '0');
        const numB = parseInt(b.split('_').pop() || '0');
        return numA - numB;
      });
    
    const sekretariatTugasData = tupoksiSekretariatKeys.map(key => data[key]).filter(Boolean);

    // Susun data tupoksi sub umum
    const tupoksiSubUmumKeys = Object.keys(data)
      .filter(key => key.startsWith('tupoksi_sub_umum_tugas_'))
      .sort((a, b) => {
        const numA = parseInt(a.split('_').pop() || '0');
        const numB = parseInt(b.split('_').pop() || '0');
        return numA - numB;
      });
    
    const subUmumTugasData = tupoksiSubUmumKeys.map(key => data[key]).filter(Boolean);

    // Susun data tupoksi sub keuangan
    const tupoksiSubKeuanganKeys = Object.keys(data)
      .filter(key => key.startsWith('tupoksi_sub_keuangan_tugas_'))
      .sort((a, b) => {
        const numA = parseInt(a.split('_').pop() || '0');
        const numB = parseInt(b.split('_').pop() || '0');
        return numA - numB;
      });
    
    const subKeuanganTugasData = tupoksiSubKeuanganKeys.map(key => data[key]).filter(Boolean);

    const tupoksiData = {
      tugasPokok: data.tugas_pokok || '',
      kepalaDinas: {
        deskripsi: data.tupoksi_kepala_dinas_desc || '',
        tugas: kepalaDinasData.length > 0 ? kepalaDinasData : []
      },
      sekretariat: {
        deskripsi: data.tupoksi_sekretariat_desc || '',
        tugas: sekretariatTugasData.length > 0 ? sekretariatTugasData : []
      },
      subUmum: {
        deskripsi: data.tupoksi_sub_umum_desc || '',
        tugas: subUmumTugasData.length > 0 ? subUmumTugasData : []
      },
      subKeuangan: {
        deskripsi: data.tupoksi_sub_keuangan_desc || '',
        tugas: subKeuanganTugasData.length > 0 ? subKeuanganTugasData : []
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
      { error: 'Gagal mengambil data tentang organisasi' },
      { status: 500 }
    );
  }
}

// PUT - Update data visi, misi, dan tentang kami
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { visi, misi, tentangKami, tupoksi } = body;

    // Update atau create data
    const updates = [];

    // Update Visi
    if (visi !== undefined) {
      updates.push(
        prisma.siteSetting.upsert({
          where: { key: 'visi' },
          update: { value: visi, updatedAt: new Date() },
          create: {
            key: 'visi',
            value: visi,
            type: 'STRING',
            label: 'Visi Kota Tasikmalaya',
            description: 'Visi pembangunan Kota Tasikmalaya'
          }
        })
      );
    }

    // Update Misi (hapus yang lama, buat yang baru)
    if (misi && Array.isArray(misi)) {
      // Hapus semua misi yang ada
      const existingMisi = await prisma.siteSetting.findMany({
        where: { key: { startsWith: 'misi_' } },
        select: { key: true }
      });

      if (existingMisi.length > 0) {
        const misiKeys = existingMisi.map(item => item.key);
        updates.push(
          prisma.siteSetting.deleteMany({
            where: {
              key: {
                in: misiKeys
              }
            }
          })
        );
      }

      // Buat misi baru
      const misiFiltered = misi.filter((m: string) => m && m.trim() !== '');
      misiFiltered.forEach((misiItem: string, index: number) => {
        updates.push(
          prisma.siteSetting.create({
            data: {
              key: `misi_${index + 1}`,
              value: misiItem.trim(),
              type: 'STRING',
              label: `Misi ${index + 1}`,
              description: `Misi ke-${index + 1} Kota Tasikmalaya`
            }
          })
        );
      });
    }

    // Update Tentang Kami
    if (tentangKami !== undefined) {
      updates.push(
        prisma.siteSetting.upsert({
          where: { key: 'tentang_kami' },
          update: { value: tentangKami, updatedAt: new Date() },
          create: {
            key: 'tentang_kami',
            value: tentangKami,
            type: 'STRING',
            label: 'Tentang Kami',
            description: 'Deskripsi tentang organisasi'
          }
        })
      );
    }

    // Update Tupoksi
    if (tupoksi) {
      // Update Tugas Pokok
      if (tupoksi.tugasPokok !== undefined) {
        updates.push(
          prisma.siteSetting.upsert({
            where: { key: 'tugas_pokok' },
            update: { value: tupoksi.tugasPokok, updatedAt: new Date() },
            create: {
              key: 'tugas_pokok',
              value: tupoksi.tugasPokok,
              type: 'STRING',
              label: 'Tugas Pokok',
              description: 'Tugas pokok DLH Kota Tasikmalaya'
            }
          })
        );
      }

      // Delete existing tugas entries before creating new ones
      const existingTugasKeys = await prisma.siteSetting.findMany({
        where: {
          OR: [
            { key: { startsWith: 'tupoksi_kepala_dinas_tugas_' } },
            { key: { startsWith: 'tupoksi_sekretariat_tugas_' } },
            { key: { startsWith: 'tupoksi_sub_umum_tugas_' } },
            { key: { startsWith: 'tupoksi_sub_keuangan_tugas_' } }
          ]
        },
        select: { key: true }
      });

      if (existingTugasKeys.length > 0) {
        const keysToDelete = existingTugasKeys.map(item => item.key);
        updates.push(
          prisma.siteSetting.deleteMany({
            where: {
              key: {
                in: keysToDelete
              }
            }
          })
        );
      }

      // Update Kepala Dinas
      if (tupoksi.kepalaDinas) {
        if (tupoksi.kepalaDinas.deskripsi !== undefined) {
          updates.push(
            prisma.siteSetting.upsert({
              where: { key: 'tupoksi_kepala_dinas_desc' },
              update: { value: tupoksi.kepalaDinas.deskripsi, updatedAt: new Date() },
              create: {
                key: 'tupoksi_kepala_dinas_desc',
                value: tupoksi.kepalaDinas.deskripsi,
                type: 'STRING',
                label: 'Deskripsi Kepala Dinas',
                description: 'Deskripsi tugas pokok Kepala Dinas'
              }
            })
          );
        }

        if (tupoksi.kepalaDinas.tugas && Array.isArray(tupoksi.kepalaDinas.tugas)) {
          const tugasFiltered = tupoksi.kepalaDinas.tugas.filter((k: string) => k && k.trim() !== '');
          tugasFiltered.forEach((tugas: string, index: number) => {
            updates.push(
              prisma.siteSetting.create({
                data: {
                  key: `tupoksi_kepala_dinas_tugas_${index + 1}`,
                  value: tugas.trim(),
                  type: 'STRING',
                  label: `Tugas Kepala Dinas ${index + 1}`,
                  description: `Tugas ke-${index + 1} Kepala Dinas`
                }
              })
            );
          });
        }
      }

      // Update Sekretariat
      if (tupoksi.sekretariat) {
        if (tupoksi.sekretariat.deskripsi !== undefined) {
          updates.push(
            prisma.siteSetting.upsert({
              where: { key: 'tupoksi_sekretariat_desc' },
              update: { value: tupoksi.sekretariat.deskripsi, updatedAt: new Date() },
              create: {
                key: 'tupoksi_sekretariat_desc',
                value: tupoksi.sekretariat.deskripsi,
                type: 'STRING',
                label: 'Deskripsi Sekretariat',
                description: 'Deskripsi tugas pokok Sekretariat'
              }
            })
          );
        }

        if (tupoksi.sekretariat.tugas && Array.isArray(tupoksi.sekretariat.tugas)) {
          const tugasFiltered = tupoksi.sekretariat.tugas.filter((t: string) => t && t.trim() !== '');
          tugasFiltered.forEach((tugas: string, index: number) => {
            updates.push(
              prisma.siteSetting.create({
                data: {
                  key: `tupoksi_sekretariat_tugas_${index + 1}`,
                  value: tugas.trim(),
                  type: 'STRING',
                  label: `Tugas Sekretariat ${index + 1}`,
                  description: `Tugas ke-${index + 1} Sekretariat`
                }
              })
            );
          });
        }
      }

      // Update Sub Bagian Umum
      if (tupoksi.subUmum) {
        if (tupoksi.subUmum.deskripsi !== undefined) {
          updates.push(
            prisma.siteSetting.upsert({
              where: { key: 'tupoksi_sub_umum_desc' },
              update: { value: tupoksi.subUmum.deskripsi, updatedAt: new Date() },
              create: {
                key: 'tupoksi_sub_umum_desc',
                value: tupoksi.subUmum.deskripsi,
                type: 'STRING',
                label: 'Deskripsi Sub Bagian Umum',
                description: 'Deskripsi tugas pokok Sub Bagian Umum dan Kepegawaian'
              }
            })
          );
        }

        if (tupoksi.subUmum.tugas && Array.isArray(tupoksi.subUmum.tugas)) {
          const tugasFiltered = tupoksi.subUmum.tugas.filter((t: string) => t && t.trim() !== '');
          tugasFiltered.forEach((tugas: string, index: number) => {
            updates.push(
              prisma.siteSetting.create({
                data: {
                  key: `tupoksi_sub_umum_tugas_${index + 1}`,
                  value: tugas.trim(),
                  type: 'STRING',
                  label: `Tugas Sub Bagian Umum ${index + 1}`,
                  description: `Tugas ke-${index + 1} Sub Bagian Umum dan Kepegawaian`
                }
              })
            );
          });
        }
      }

      // Update Sub Bagian Keuangan
      if (tupoksi.subKeuangan) {
        if (tupoksi.subKeuangan.deskripsi !== undefined) {
          updates.push(
            prisma.siteSetting.upsert({
              where: { key: 'tupoksi_sub_keuangan_desc' },
              update: { value: tupoksi.subKeuangan.deskripsi, updatedAt: new Date() },
              create: {
                key: 'tupoksi_sub_keuangan_desc',
                value: tupoksi.subKeuangan.deskripsi,
                type: 'STRING',
                label: 'Deskripsi Sub Bagian Keuangan',
                description: 'Deskripsi tugas pokok Sub Bagian Keuangan'
              }
            })
          );
        }

        if (tupoksi.subKeuangan.tugas && Array.isArray(tupoksi.subKeuangan.tugas)) {
          const tugasFiltered = tupoksi.subKeuangan.tugas.filter((t: string) => t && t.trim() !== '');
          tugasFiltered.forEach((tugas: string, index: number) => {
            updates.push(
              prisma.siteSetting.create({
                data: {
                  key: `tupoksi_sub_keuangan_tugas_${index + 1}`,
                  value: tugas.trim(),
                  type: 'STRING',
                  label: `Tugas Sub Bagian Keuangan ${index + 1}`,
                  description: `Tugas ke-${index + 1} Sub Bagian Keuangan`
                }
              })
            );
          });
        }
      }
    }

    // Eksekusi semua update
    await Promise.all(updates);

    return NextResponse.json({ 
      message: 'Data berhasil diperbarui',
      success: true
    });

  } catch (error) {
    console.error('Error updating about data:', error);
    return NextResponse.json(
      { error: 'Gagal memperbarui data tentang organisasi' },
      { status: 500 }
    );
  }
}
