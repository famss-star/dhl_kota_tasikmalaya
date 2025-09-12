import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET - Fetch specific contact setting
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const contactSetting = await prisma.contactSetting.findUnique({
      where: { id: params.id }
    });

    if (!contactSetting) {
      return NextResponse.json(
        { success: false, error: 'Contact setting not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: contactSetting,
      message: 'Contact setting retrieved successfully'
    });
  } catch (error) {
    console.error('Error fetching contact setting:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT - Update specific contact setting
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    
    const updatedContactSetting = await prisma.contactSetting.update({
      where: { id: params.id },
      data: {
        ...body,
        updatedAt: new Date()
      }
    });

    return NextResponse.json({
      success: true,
      data: updatedContactSetting,
      message: 'Contact setting updated successfully'
    });
  } catch (error) {
    console.error('Error updating contact setting:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE - Delete specific contact setting
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.contactSetting.delete({
      where: { id: params.id }
    });

    return NextResponse.json({
      success: true,
      message: 'Contact setting deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting contact setting:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
