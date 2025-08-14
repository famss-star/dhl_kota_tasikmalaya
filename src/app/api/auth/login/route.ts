import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';

// Interface untuk request body
interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body: LoginRequest = await request.json();
    const { email, password } = body;

    // Validasi input
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email dan password wajib diisi' },
        { status: 400 }
      );
    }

    // Cari user di database
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        password: true,
        isActive: true
      }
    });

    // Cek apakah user ada
    if (!user) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Email atau password salah' 
        },
        { status: 401 }
      );
    }

    // Cek apakah user aktif
    if (!user.isActive) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Akun Anda tidak aktif. Hubungi administrator.' 
        },
        { status: 401 }
      );
    }

    // Verifikasi password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Email atau password salah' 
        },
        { status: 401 }
      );
    }

    // Login berhasil - hapus password dari response
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json({
      success: true,
      user: userWithoutPassword,
      message: 'Login berhasil'
    });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Terjadi kesalahan server' 
      },
      { status: 500 }
    );
  }
}
