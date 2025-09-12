// Base interface untuk semua jenis perizinan
export interface BasePerizinanData {
  id: string;
  nomor_surat: string;
  pemohon: string;
  lokasi: string;
  tanggal_pengajuan: string;
  tanggal_terbit?: string;
  masa_berlaku?: string;
  status: "pending" | "approved" | "rejected" | "review" | "expired";
  nilai_investasi: number;
  luas_area: number;
  dokumen_pendukung?: string[];
  catatan?: string;
  createdAt?: string;
  updatedAt?: string;
}

// AMDAL specific interface
export interface AMDALData extends BasePerizinanData {
  nama_rencana_kegiatan: string;
  jenis_rencana_kegiatan: string;
  skala_kegiatan: "besar" | "menengah" | "kecil";
  deskripsi_kegiatan: string;
  tahap_amdal: "kerangka_acuan" | "andal" | "rencana" | "selesai";
  dampak_potensial: string[];
  konsultan: string;
  komisi_amdal: string[];
  rona_lingkungan_hidup?: string;
  prakiraan_dampak?: string;
  evaluasi_dampak?: string;
  rencana_pengelolaan?: string;
  rencana_pemantauan?: string;
  persyaratan_terpenuhi?: boolean;
}

// IPLC specific interface  
export interface IPLCData extends BasePerizinanData {
  nama_kegiatan: string;
  jenis_kegiatan: string;
  kategori_usaha: "wajib_iplc" | "tidak_wajib_iplc";
  deskripsi_kegiatan?: string;
  konsultan: string;
  dampak_lingkungan?: string;
  upaya_pengelolaan?: string;
  upaya_pemantauan?: string;
  komitmen_lingkungan?: string;
  persyaratan_terpenuhi?: boolean;
}

// SPPL specific interface
export interface SPPLData extends BasePerizinanData {
  nama_kegiatan: string;
  jenis_usaha: string;
  deskripsi_kegiatan?: string;
  kategori_dampak: "kecil" | "sedang" | "besar";
  dampak_lingkungan?: string;
  upaya_pengelolaan_sppl?: string;
  komitmen_lingkungan?: string;
  persyaratan_terpenuhi?: boolean;
}

// UKL-UPL specific interface
export interface UKLUPLData extends BasePerizinanData {
  nama_kegiatan: string;
  jenis_kegiatan: string;
  skala_usaha: "kecil" | "menengah" | "besar";
  deskripsi_kegiatan?: string;
  dampak_lingkungan: string[];
  upaya_pengelolaan: string[];
  upaya_pemantauan: string[];
  upaya_pengelolaan_ukl?: string;
  upaya_pemantauan_upl?: string;
  komitmen_lingkungan?: string;
  persyaratan_terpenuhi?: boolean;
}

// Form data interfaces untuk create/edit
export interface AMDALFormData {
  nomor_surat: string;
  pemohon: string;
  nama_rencana_kegiatan: string;
  jenis_rencana_kegiatan: string;
  skala_kegiatan: "besar" | "menengah" | "kecil";
  lokasi: string;
  deskripsi_kegiatan: string;
  tanggal_pengajuan: string;
  tanggal_terbit: string;
  masa_berlaku: string;
  status: "pending" | "approved" | "rejected" | "review";
  nilai_investasi: number;
  luas_area: number;
  dampak_lingkungan: string;
  rona_lingkungan_hidup: string;
  prakiraan_dampak: string;
  evaluasi_dampak: string;
  rencana_pengelolaan: string;
  rencana_pemantauan: string;
  persyaratan_terpenuhi: boolean;
  catatan: string;
  dokumen_pendukung: string[];
}

export interface IPLCFormData {
  nomor_surat: string;
  pemohon: string;
  nama_kegiatan: string;
  jenis_kegiatan: string;
  kategori_usaha: "wajib_iplc" | "tidak_wajib_iplc";
  lokasi: string;
  deskripsi_kegiatan: string;
  tanggal_pengajuan: string;
  tanggal_terbit: string;
  masa_berlaku: string;
  status: "pending" | "approved" | "rejected" | "review";
  nilai_investasi: number;
  luas_area: number;
  dampak_lingkungan: string;
  upaya_pengelolaan: string;
  upaya_pemantauan: string;
  komitmen_lingkungan: string;
  persyaratan_terpenuhi: boolean;
  catatan: string;
  dokumen_pendukung: string[];
}

export interface SPPLFormData {
  nomor_surat: string;
  pemohon: string;
  nama_kegiatan: string;
  jenis_usaha: string;
  lokasi: string;
  deskripsi_kegiatan: string;
  tanggal_pengajuan: string;
  tanggal_terbit: string;
  masa_berlaku: string;
  status: "pending" | "approved" | "rejected" | "review";
  nilai_investasi: number;
  luas_area: number;
  kategori_dampak: "kecil" | "sedang" | "besar";
  dampak_lingkungan: string;
  upaya_pengelolaan_sppl: string;
  komitmen_lingkungan: string;
  persyaratan_terpenuhi: boolean;
  catatan: string;
  dokumen_pendukung: string[];
}

export interface UKLUPLFormData {
  nomor_surat: string;
  pemohon: string;
  nama_kegiatan: string;
  jenis_usaha: string;
  lokasi: string;
  deskripsi_kegiatan: string;
  tanggal_pengajuan: string;
  tanggal_terbit: string;
  masa_berlaku: string;
  status: "pending" | "approved" | "rejected" | "review";
  nilai_investasi: number;
  luas_area: number;
  skala_usaha: "kecil" | "menengah" | "besar";
  dampak_lingkungan: string;
  upaya_pengelolaan_ukl: string;
  upaya_pemantauan_upl: string;
  komitmen_lingkungan: string;
  persyaratan_terpenuhi: boolean;
  catatan: string;
  dokumen_pendukung: string[];
}

// Statistics interface
export interface PerizinanStats {
  total: number;
  approved: number;
  pending: number;
  review: number;
  rejected: number;
  expired?: number;
}

// Filter interfaces
export interface BaseFilters {
  searchTerm: string;
  statusFilter: string;
}

export interface AMDALFilters extends BaseFilters {
  tahapFilter: string;
}

export interface UKLUPLFilters extends BaseFilters {
  skalaFilter: string;
}
