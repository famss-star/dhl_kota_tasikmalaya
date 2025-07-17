import { NextRequest, NextResponse } from 'next/server';

// Interface untuk request body
interface LoginRequest {
  username: string;
  password: string;
  rememberMe?: boolean;
}

// Dummy user data - nantinya akan diganti dengan database
const VALID_USER = {
  username: 'admin',
  password: 'admin123',
  role: 'admin'
};

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body: LoginRequest = await request.json();
    const { username, password } = body;

    // Validasi input
    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username dan password wajib diisi' },
        { status: 400 }
      );
    }

    // Cek kredensial
    // Note: Ini hanya implementasi dummy, gunakan database dan hash password di production
    if (username === VALID_USER.username && password === VALID_USER.password) {
      // Login berhasil
      const user = {
        username: VALID_USER.username,
        role: VALID_USER.role,
      };

      return NextResponse.json({
        success: true,
        user,
        message: 'Login berhasil'
      });
    }

    // Login gagal
    return NextResponse.json(
      { 
        success: false,
        error: 'Username atau password salah' 
      },
      { status: 401 }
    );

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Terjadi kesalahan pada server' 
      },
      { status: 500 }
    );
  }
}
