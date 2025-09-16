'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Building2, CheckCircle, Clock } from 'lucide-react';

interface PerizinanData {
  id: string;
  nomor_surat: string;
  pemohon: string;
  nama_rencana_kegiatan?: string;
  nama_kegiatan?: string;
  jenis_rencana_kegiatan?: string;
  jenis_kegiatan?: string;
  lokasi: string;
  tanggal_terbit: string | null;
  masa_berlaku: string | null;
  status: string;
  skala_kegiatan?: string;
  tahap_amdal?: string;
  kategori_usaha?: string;
}

interface RecentPerizinanProps {
  type: 'amdal' | 'sppl' | 'iplc' | 'ukl-upl';
  title: string;
  description: string;
}

const RecentPerizinan: React.FC<RecentPerizinanProps> = ({ type, title, description }) => {
  const [data, setData] = useState<PerizinanData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/public/perizinan/${type}/recent`);
        const result = await response.json();

        if (result.success) {
          setData(result.data);
        } else {
          setError(result.error || 'Gagal mengambil data');
        }
      } catch {
        setError('Terjadi kesalahan saat mengambil data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [type]);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'text-green-600 bg-green-100 dark:bg-green-900/20 dark:text-green-400';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'review':
        return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved': return 'Disetujui';
      case 'pending': return 'Menunggu';
      case 'review': return 'Review';
      case 'rejected': return 'Ditolak';
      default: return status;
    }
  };

  if (loading) {
    return (
      <section className="max-w-6xl mx-auto mb-12">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">
          {title} Terbaru
        </h2>
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8">
          <div className="animate-pulse space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="border-b border-gray-200 dark:border-gray-700 pb-4">
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/2 mb-2"></div>
                <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="max-w-6xl mx-auto mb-12">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">
          {title} Terbaru
        </h2>
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8">
          <div className="text-center text-red-600 dark:text-red-400">
            <p>{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-6xl mx-auto mb-12">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">
        {title} yang Telah Disetujui
      </h2>
      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8">
        <p className="text-gray-600 dark:text-gray-400 mb-6 text-center">
          {description}
        </p>
        
        {data.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400 py-8">
            <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Belum ada data {title.toLowerCase()} yang disetujui</p>
          </div>
        ) : (
          <div className="space-y-6">
            {data.map((item) => (
              <div 
                key={item.id} 
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {item.nama_rencana_kegiatan || item.nama_kegiatan}
                    </h3>
                    <div className="flex items-center text-gray-600 dark:text-gray-400 mb-2">
                      <Building2 className="w-4 h-4 mr-2" />
                      <span>{item.pemohon}</span>
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-400 mb-2">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>{item.lokasi}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 md:mt-0 md:ml-6 text-right">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(item.status)} mb-2`}>
                      <CheckCircle className="w-4 h-4 mr-1" />
                      {getStatusText(item.status)}
                    </span>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center justify-end mb-1">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>Terbit: {formatDate(item.tanggal_terbit)}</span>
                      </div>
                      {item.masa_berlaku && (
                        <div className="flex items-center justify-end">
                          <Calendar className="w-4 h-4 mr-1" />
                          <span>Berlaku s/d: {formatDate(item.masa_berlaku)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 text-sm">
                  <span className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 px-2 py-1 rounded">
                    {item.nomor_surat}
                  </span>
                  {(item.jenis_rencana_kegiatan || item.jenis_kegiatan) && (
                    <span className="bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400 px-2 py-1 rounded">
                      {item.jenis_rencana_kegiatan || item.jenis_kegiatan}
                    </span>
                  )}
                  {(item.skala_kegiatan || item.kategori_usaha) && (
                    <span className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 px-2 py-1 rounded">
                      {item.skala_kegiatan || item.kategori_usaha}
                    </span>
                  )}
                  {item.tahap_amdal && (
                    <span className="bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400 px-2 py-1 rounded">
                      {item.tahap_amdal}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
        
        {data.length > 0 && (
          <div className="text-center mt-6">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Menampilkan {data.length} {title.toLowerCase()} terbaru yang telah disetujui
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default RecentPerizinan;
