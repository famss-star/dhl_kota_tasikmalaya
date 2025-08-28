import { NextRequest, NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: NextRequest) {
  try {
    // Check environment
    const isProduction = process.env.NODE_ENV === 'production';
    const token = process.env.BLOB_READ_WRITE_TOKEN;
    
    console.log('Environment check:', {
      hasToken: !!token,
      tokenLength: token ? token.length : 0,
      nodeEnv: process.env.NODE_ENV,
      isProduction
    });

    const data = await request.formData();
    const file: File | null = (data.get('image') || data.get('file')) as unknown as File;
    const type = (data.get('type') as string) || 'articles'; // Get type from form data
    const folder = type || 'articles'; // Use type as folder name

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

    let imageUrl: string;
    let finalFileName: string;

    if (isProduction && token) {
      // Production: Use Vercel Blob
      try {
        const blob = await put(uniqueFileName, file, {
          access: 'public',
          token: token,
        });
        imageUrl = blob.url;
        finalFileName = uniqueFileName;
      } catch (blobError) {
        console.error('Vercel Blob error:', blobError);
        return NextResponse.json(
          { success: false, error: 'Cloud storage error' },
          { status: 500 }
        );
      }
    } else {
      // Development: Use local file system
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Create upload directory if it doesn't exist
      const uploadDir = join(process.cwd(), 'public', 'uploads', folder);
      await mkdir(uploadDir, { recursive: true });

      // Save file locally
      const localFileName = `${uuidv4()}.${fileExtension}`;
      const filePath = join(uploadDir, localFileName);
      await writeFile(filePath, buffer);

      // Return local URL
      imageUrl = `/uploads/${folder}/${localFileName}`;
      finalFileName = localFileName;
    }

    return NextResponse.json({
      success: true,
      data: {
        url: imageUrl,
        fileName: finalFileName,
        size: file.size,
        type: file.type
      }
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { success: false, error: 'Upload failed' },
      { status: 500 }
    );
  }
}
