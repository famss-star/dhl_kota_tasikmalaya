import { NextRequest, NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: NextRequest) {
  try {
    // Check if token is available
    const token = process.env.BLOB_READ_WRITE_TOKEN;
    console.log('Environment check:', {
      hasToken: !!token,
      tokenLength: token ? token.length : 0,
      nodeEnv: process.env.NODE_ENV
    });
    
    if (!token) {
      console.error('BLOB_READ_WRITE_TOKEN not found in environment variables');
      return NextResponse.json(
        { success: false, error: 'Server configuration error: Storage token missing' },
        { status: 500 }
      );
    }

    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;
    const folder = (data.get('folder') as string) || 'articles'; // Default ke articles

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file uploaded' },
        { status: 400 }
      );
    }

    // Validasi tipe file
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { success: false, error: 'Invalid file type. Only JPEG, PNG, JPG, and WebP are allowed' },
        { status: 400 }
      );
    }

    // Validasi ukuran file (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { success: false, error: 'File size too large. Maximum 5MB allowed' },
        { status: 400 }
      );
    }

    // Generate unique filename dengan folder path
    const fileExtension = file.name.split('.').pop();
    const uniqueFileName = `${folder}/${uuidv4()}.${fileExtension}`;

    // Upload ke Vercel Blob dengan explicit token
    const blob = await put(uniqueFileName, file, {
      access: 'public',
      token: token, // Explicitly pass the token
    });

    // Return URL dari Vercel Blob
    const imageUrl = blob.url;

    return NextResponse.json({
      success: true,
      imageUrl: imageUrl,
      fileName: uniqueFileName,
      size: file.size,
      type: file.type
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { success: false, error: 'Upload failed' },
      { status: 500 }
    );
  }
}
