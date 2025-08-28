import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Function to auto-update employee statistics (same as in route.ts)
async function updateEmployeeStatistics() {
  try {
    const staffMembers = await prisma.staffMember.findMany({
      where: { isActive: true }
    });

    // Calculate status statistics
    const statusCounts = {
      PNS: staffMembers.filter((s: any) => s.employmentStatus === 'PNS').length,
      PPPK: staffMembers.filter((s: any) => s.employmentStatus === 'PPPK').length,
      HONORER: staffMembers.filter((s: any) => s.employmentStatus === 'HONORER').length,
    };

    // Calculate education statistics
    const educationCounts = {
      S2: staffMembers.filter((s: any) => s.education === 'S2').length,
      S1: staffMembers.filter((s: any) => s.education === 'S1').length,
      Diploma: staffMembers.filter((s: any) => s.education === 'DIPLOMA').length,
      'SMA/SMK': staffMembers.filter((s: any) => s.education === 'SMA_SMK').length,
    };

    // Calculate rank statistics
    const rankIVCounts = {
      'IV/e': staffMembers.filter((s: any) => s.rank === 'IV/e').length,
      'IV/d': staffMembers.filter((s: any) => s.rank === 'IV/d').length,
      'IV/c': staffMembers.filter((s: any) => s.rank === 'IV/c').length,
      'IV/b': staffMembers.filter((s: any) => s.rank === 'IV/b').length,
      'IV/a': staffMembers.filter((s: any) => s.rank === 'IV/a').length,
    };

    const rankOtherCounts = {
      'III/d': staffMembers.filter((s: any) => s.rank === 'III/d').length,
      'III/c': staffMembers.filter((s: any) => s.rank === 'III/c').length,
      'III/b': staffMembers.filter((s: any) => s.rank === 'III/b').length,
      'III/a': staffMembers.filter((s: any) => s.rank === 'III/a').length,
      'II/c,II/b,II/a': staffMembers.filter((s: any) => ['II/c', 'II/b', 'II/a'].includes(s.rank || '')).length,
    };

    // Calculate age statistics
    const currentYear = new Date().getFullYear();
    const ageCounts = {
      '20-35': staffMembers.filter((s: any) => {
        if (!s.birthDate) return false;
        const age = currentYear - new Date(s.birthDate).getFullYear();
        return age >= 20 && age <= 35;
      }).length,
      '36-50': staffMembers.filter((s: any) => {
        if (!s.birthDate) return false;
        const age = currentYear - new Date(s.birthDate).getFullYear();
        return age >= 36 && age <= 50;
      }).length,
      '51+': staffMembers.filter((s: any) => {
        if (!s.birthDate) return false;
        const age = currentYear - new Date(s.birthDate).getFullYear();
        return age >= 51;
      }).length,
    };

    // Update database
    const updates = [
      // Status updates
      { category: 'status', subcategory: 'PNS', count: statusCounts.PNS },
      { category: 'status', subcategory: 'PPPK', count: statusCounts.PPPK },
      { category: 'status', subcategory: 'Honorer', count: statusCounts.HONORER },
      
      // Education updates
      { category: 'education', subcategory: 'S2', count: educationCounts.S2 },
      { category: 'education', subcategory: 'S1', count: educationCounts.S1 },
      { category: 'education', subcategory: 'Diploma', count: educationCounts.Diploma },
      { category: 'education', subcategory: 'SMA/SMK', count: educationCounts['SMA/SMK'] },
      
      // Rank IV updates
      { category: 'rank_iv', subcategory: 'IV/e', count: rankIVCounts['IV/e'] },
      { category: 'rank_iv', subcategory: 'IV/d', count: rankIVCounts['IV/d'] },
      { category: 'rank_iv', subcategory: 'IV/c', count: rankIVCounts['IV/c'] },
      { category: 'rank_iv', subcategory: 'IV/b', count: rankIVCounts['IV/b'] },
      { category: 'rank_iv', subcategory: 'IV/a', count: rankIVCounts['IV/a'] },
      
      // Rank Other updates
      { category: 'rank_other', subcategory: 'III/d', count: rankOtherCounts['III/d'] },
      { category: 'rank_other', subcategory: 'III/c', count: rankOtherCounts['III/c'] },
      { category: 'rank_other', subcategory: 'III/b', count: rankOtherCounts['III/b'] },
      { category: 'rank_other', subcategory: 'III/a', count: rankOtherCounts['III/a'] },
      { category: 'rank_other', subcategory: 'II/c,II/b,II/a', count: rankOtherCounts['II/c,II/b,II/a'] },
      
      // Age updates
      { category: 'age', subcategory: '20-35', count: ageCounts['20-35'] },
      { category: 'age', subcategory: '36-50', count: ageCounts['36-50'] },
      { category: 'age', subcategory: '51+', count: ageCounts['51+'] },
    ];

    for (const update of updates) {
      await prisma.employeeStatistic.updateMany({
        where: {
          category: update.category,
          subcategory: update.subcategory
        },
        data: {
          count: update.count
        }
      });
    }
  } catch (error) {
    console.error('Error updating employee statistics:', error);
  }
}

// GET - Ambil staff member berdasarkan ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const staffMember = await prisma.staffMember.findUnique({
      where: { id },
      include: {
        careerHistory: {
          orderBy: { startDate: 'desc' }
        }
      }
    });

    if (!staffMember) {
      return NextResponse.json(
        { error: 'Staff member tidak ditemukan' },
        { status: 404 }
      );
    }

    return NextResponse.json(staffMember);
  } catch (error) {
    console.error('Error fetching staff member:', error);
    return NextResponse.json(
      { error: 'Gagal mengambil data staff member' },
      { status: 500 }
    );
  }
}

// PUT - Update staff member
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await request.json();
    const { 
      name, 
      position, 
      photo, 
      type, 
      employmentStatus, 
      education, 
      rank, 
      birthDate 
    } = data;

    // Get current staff member to check if type is changing
    const currentStaffMember = await prisma.staffMember.findUnique({
      where: { id }
    });

    if (!currentStaffMember) {
      return NextResponse.json(
        { error: 'Staff member tidak ditemukan' },
        { status: 404 }
      );
    }

    // If type is changing, check quota limits
    if (currentStaffMember.type !== type) {
      const quotaLimits = {
        KEPALA_DINAS: 1,
        WAKIL: 1,
        SEKRETARIS: 1,
        KABID: 5,
        STAFF: null // unlimited
      };

      // Check quota if new type has a limit
      if (quotaLimits[type as keyof typeof quotaLimits] !== null) {
        const currentCount = await prisma.staffMember.count({
          where: { 
            type: type,
            isActive: true,
            id: { not: id } // exclude current record
          }
        });

        const maxAllowed = quotaLimits[type as keyof typeof quotaLimits];
        if (currentCount >= maxAllowed!) {
          return NextResponse.json(
            { error: `Maksimal ${maxAllowed} orang untuk posisi ${type}` },
            { status: 400 }
          );
        }
      }
    }

    const staffMember = await prisma.staffMember.update({
      where: { id },
      data: {
        name,
        position,
        photo,
        type,
        employmentStatus,
        education,
        rank,
        birthDate: birthDate ? new Date(birthDate) : null
      }
    });

    // Auto-update employee statistics
    await updateEmployeeStatistics();

    return NextResponse.json(staffMember);
  } catch (error) {
    console.error('Error updating staff member:', error);
    return NextResponse.json(
      { error: 'Gagal mengupdate staff member' },
      { status: 500 }
    );
  }
}

// DELETE - Hapus staff member
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // Delete related career history first
    await prisma.careerHistory.deleteMany({
      where: { staffMemberId: id }
    });

    // Then delete the staff member
    await prisma.staffMember.delete({
      where: { id }
    });

    // Auto-update employee statistics
    await updateEmployeeStatistics();

    return NextResponse.json({ message: 'Staff member berhasil dihapus' });
  } catch (error) {
    console.error('Error deleting staff member:', error);
    return NextResponse.json(
      { error: 'Gagal menghapus staff member' },
      { status: 500 }
    );
  }
}
