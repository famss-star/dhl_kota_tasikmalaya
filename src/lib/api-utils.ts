import { NextResponse } from 'next/server';

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export const handleApiError = (error: Error | unknown, defaultMessage: string = "Internal server error") => {
  console.error("API Error:", error);
  
  return NextResponse.json(
    {
      success: false,
      error: error instanceof Error ? error.message : defaultMessage,
    } as ApiResponse,
    { status: (error as { status?: number })?.status || 500 }
  );
};

export const handleApiSuccess = <T>(data: T, message?: string) => {
  return NextResponse.json({
    success: true,
    data,
    message,
  } as ApiResponse<T>);
};

export const validateRequiredFields = (data: Record<string, unknown>, requiredFields: string[]) => {
  const missingFields = requiredFields.filter(field => !data[field] || String(data[field]).trim() === '');
  
  if (missingFields.length > 0) {
    throw {
      message: `Field berikut wajib diisi: ${missingFields.join(', ')}`,
      status: 400
    };
  }
};

// Validation schemas untuk setiap jenis perizinan
export const ValidationSchemas = {
  amdal: [
    'nomor_surat', 
    'pemohon', 
    'nama_rencana_kegiatan', 
    'jenis_rencana_kegiatan', 
    'lokasi', 
    'tanggal_pengajuan'
  ],
  iplc: [
    'nomor_surat', 
    'pemohon', 
    'nama_kegiatan', 
    'jenis_kegiatan', 
    'lokasi', 
    'tanggal_pengajuan'
  ],
  sppl: [
    'nomor_surat', 
    'pemohon', 
    'nama_kegiatan', 
    'jenis_usaha', 
    'lokasi', 
    'tanggal_pengajuan'
  ],
  uklUpl: [
    'nomor_surat', 
    'pemohon', 
    'nama_kegiatan', 
    'jenis_usaha', 
    'lokasi', 
    'tanggal_pengajuan'
  ]
};
