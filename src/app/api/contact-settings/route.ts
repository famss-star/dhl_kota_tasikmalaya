import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET - Fetch all contact settings
export async function GET() {
  try {
    const contactSettings = await prisma.contactSetting.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' }
    });

    // If no settings exist, return default structure
    if (contactSettings.length === 0) {
      return NextResponse.json({
        success: true,
        data: [],
        message: 'No contact settings found'
      });
    }

    return NextResponse.json({
      success: true,
      data: contactSettings,
      message: 'Contact settings retrieved successfully'
    });
  } catch (error) {
    console.error('Error fetching contact settings:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Create new contact setting
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const newContactSetting = await prisma.contactSetting.create({
      data: {
        ...body,
        isActive: body.isActive !== undefined ? body.isActive : true
      }
    });

    return NextResponse.json({
      success: true,
      data: newContactSetting,
      message: 'Contact setting created successfully'
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating contact setting:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT - Update multiple contact settings (for bulk updates)
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    
    if (!Array.isArray(body)) {
      return NextResponse.json(
        { success: false, error: 'Expected array of contact settings' },
        { status: 400 }
      );
    }

    const updatePromises = body.map(setting => 
      prisma.contactSetting.upsert({
        where: { id: setting.id || 'new' },
        create: {
          ...setting,
          isActive: setting.isActive !== undefined ? setting.isActive : true
        },
        update: {
          ...setting,
          updatedAt: new Date()
        }
      })
    );

    const updatedSettings = await Promise.all(updatePromises);

    return NextResponse.json({
      success: true,
      data: updatedSettings,
      message: 'Contact settings updated successfully'
    });
  } catch (error) {
    console.error('Error updating contact settings:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
