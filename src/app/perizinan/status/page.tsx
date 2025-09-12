'use client';

import React, { useState } from 'react';
import { Search, FileText, Calendar, CheckCircle, Clock, XCircle, AlertCircle } from 'lucide-react';

interface StatusData {
  id: string;
  nomor_surat: string;
  pemohon: string;
  nama_kegiatan: string;
  jenis_perizinan: string;
  status: string;
  tanggal_pengajuan: string;
  tanggal_terbit: string | null;
  masa_berlaku: string | null;
  catatan: string | null;
}

const StatusPengajuan = () => {
  const [nomorSurat, setNomorSurat] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [statusData, setStatusData] = useState<StatusData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nomorSurat.trim()) {
      setError('Silakan masukkan nomor surat');
      return;
    }

    setIsSearching(true);
    setError(null);
    setStatusData(null);

    try {
      const response = await fetch(`/api/public/perizinan/status?nomor_surat=${encodeURIComponent(nomorSurat.trim())}`);
      const result = await response.json();

      if (result.success) {
        setStatusData(result.data);
      } else {
        setError(result.error || 'Data tidak ditemukan');
      }
    } catch (error) {
      console.error('Search error:', error);
      setError('Terjadi kesalahan saat mencari data. Silakan coba lagi.');
    } finally {
      setIsSearching(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case 'pending':
        return <Clock className="w-6 h-6 text-yellow-500" />;
      case 'review':
        return <AlertCircle className="w-6 h-6 text-blue-500" />;
      case 'rejected':
        return <XCircle className="w-6 h-6 text-red-500" />;
      default:
        return <Clock className="w-6 h-6 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Disetujui</span>;
      case 'pending':
        return <span className="px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">Menunggu Review</span>;
      case 'review':
        return <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">Sedang Ditinjau</span>;
      case 'rejected':
        return <span className="px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">Ditolak</span>;
      default:
        return <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200">Status Tidak Diketahui</span>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-3">
              <Search className="w-10 h-10" />
              Cek Status Pengajuan
            </h1>
            <p className="text-lg opacity-90">
              Pantau status pengajuan perizinan lingkungan Anda
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Search Form */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <FileText className="w-6 h-6" />
              Masukkan Nomor Surat Pengajuan
            </h2>
            
            <form onSubmit={handleSearch} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Nomor Surat
                </label>
                <input
                  type="text"
                  value={nomorSurat}
                  onChange={(e) => setNomorSurat(e.target.value)}
                  placeholder="Contoh: AMDAL/PUB/1757521334372 atau SPPL/001/2025"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Masukkan nomor surat pengajuan yang Anda terima saat mengajukan perizinan
                </p>
              </div>

              <button
                type="submit"
                disabled={isSearching}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-medium py-3 px-6 rounded-lg transition duration-300 flex items-center justify-center gap-2"
              >
                {isSearching ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Mencari...
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    Cari Status
                  </>
                )}
              </button>
            </form>

            {error && (
              <div className="mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative">
                <strong className="font-bold">Error: </strong>
                <span>{error}</span>
              </div>
            )}
          </div>

          {/* Status Result */}
          {statusData && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8">
              <div className="flex items-center gap-3 mb-6">
                {getStatusIcon(statusData.status)}
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Status Pengajuan {statusData.jenis_perizinan}
                </h3>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                      Nomor Surat
                    </label>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      {statusData.nomor_surat}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                      Pemohon
                    </label>
                    <p className="text-gray-900 dark:text-white">
                      {statusData.pemohon}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                      Nama Kegiatan
                    </label>
                    <p className="text-gray-900 dark:text-white">
                      {statusData.nama_kegiatan}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                      Jenis Perizinan
                    </label>
                    <p className="text-gray-900 dark:text-white font-medium">
                      {statusData.jenis_perizinan}
                    </p>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                      Status Saat Ini
                    </label>
                    <div className="mt-2">
                      {getStatusBadge(statusData.status)}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1 flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        Tanggal Pengajuan
                      </label>
                      <p className="text-gray-900 dark:text-white">
                        {statusData.tanggal_pengajuan}
                      </p>
                    </div>

                    {statusData.tanggal_terbit && (
                      <div>
                        <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1 flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          Tanggal Terbit
                        </label>
                        <p className="text-gray-900 dark:text-white">
                          {statusData.tanggal_terbit}
                        </p>
                      </div>
                    )}

                    {statusData.masa_berlaku && (
                      <div>
                        <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1 flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          Masa Berlaku
                        </label>
                        <p className="text-gray-900 dark:text-white">
                          {statusData.masa_berlaku}
                        </p>
                      </div>
                    )}
                  </div>

                  {statusData.catatan && (
                    <div>
                      <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                        Catatan
                      </label>
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                        <p className="text-gray-900 dark:text-white text-sm">
                          {statusData.catatan}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Status Information */}
              <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Informasi Status
                </h4>
                {statusData.status === 'pending' && (
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                    <p className="text-yellow-800 dark:text-yellow-200">
                      <strong>Menunggu Review:</strong> Pengajuan Anda sedang dalam antrian untuk ditinjau oleh tim teknis. 
                      Proses review biasanya memakan waktu 3-7 hari kerja.
                    </p>
                  </div>
                )}
                {statusData.status === 'review' && (
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                    <p className="text-blue-800 dark:text-blue-200">
                      <strong>Sedang Ditinjau:</strong> Tim teknis sedang melakukan evaluasi terhadap dokumen pengajuan Anda. 
                      Kami akan menghubungi Anda jika memerlukan informasi tambahan.
                    </p>
                  </div>
                )}
                {statusData.status === 'approved' && (
                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                    <p className="text-green-800 dark:text-green-200">
                      <strong>Disetujui:</strong> Selamat! Pengajuan Anda telah disetujui. 
                      Silakan kunjungi kantor kami untuk mengambil dokumen resmi.
                    </p>
                  </div>
                )}
                {statusData.status === 'rejected' && (
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                    <p className="text-red-800 dark:text-red-200">
                      <strong>Ditolak:</strong> Pengajuan Anda tidak dapat disetujui. 
                      Silakan periksa catatan di atas dan hubungi kami untuk informasi lebih lanjut.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Information Section */}
          <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-200 mb-4">
              Informasi Penting
            </h3>
            <ul className="text-blue-800 dark:text-blue-300 space-y-2 text-sm">
              <li>• Simpan nomor surat pengajuan Anda untuk keperluan pengecekan status</li>
              <li>• Status akan diperbarui secara otomatis ketika ada perkembangan</li>
              <li>• Untuk informasi lebih lanjut, hubungi DLH Kota Tasikmalaya</li>
              <li>• Jam layanan: Senin-Jumat, 08.00-16.00 WIB</li>
            </ul>
          </div>

          <div className="mt-8 text-center">
            <a
              href="/perizinan"
              className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
            >
              Kembali ke Halaman Perizinan
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusPengajuan;
