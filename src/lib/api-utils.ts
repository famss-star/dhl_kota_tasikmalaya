import { NextResponse } from 'next/server';

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export const handleApiError = (error: any, defaultMessage: string = "Internal server error") => {
  console.error("API Error:", error);
  
  return NextResponse.json(
    {
      success: false,
      error: error.message || defaultMessage,
    } as ApiResponse,
    { status: error.status || 500 }
  );
};

export const handleApiSuccess = <T>(data: T, message?: string) => {
  return NextResponse.json({
    success: true,
    data,
    message,
  } as ApiResponse<T>);
};

export const validateRequiredFields = (data: Record<string, any>, requiredFields: string[]) => {
  const missingFields = requiredFields.filter(field => !data[field] || data[field].toString().trim() === '');
  
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
