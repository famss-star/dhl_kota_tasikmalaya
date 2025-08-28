'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Info, MapPin, Clock, Users, Eye } from 'lucide-react';
import Link from 'next/link';

// Type definitions
interface AgendaItem {
  id: number;
  title: string;
  description: string;
  location: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  organizer: string;
  participants: number;
  status: 'UPCOMING' | 'ONGOING' | 'COMPLETED' | 'CANCELLED';
  createdAt: string;
  updatedAt: string;
}

export default function InformasiAgenda() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [agenda, setAgenda] = useState<AgendaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('UPCOMING');

  useEffect(() => {
    fetchAgenda();
  }, [statusFilter]);

  const fetchAgenda = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: '1',
        limit: '20',
        search: searchTerm,
        status: statusFilter === 'all' ? '' : statusFilter
      });

      const response = await fetch(`/api/agenda?${params}`);
      const data = await response.json();

      if (data.success) {
        setAgenda(data.data.agenda);
      } else {
        console.error('Error fetching agenda:', data.error);
        setAgenda([]);
      }
    } catch (error) {
      console.error('Error fetching agenda:', error);
      setAgenda([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchAgenda();
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      UPCOMING: { color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200', label: 'Akan Datang' },
      ONGOING: { color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200', label: 'Berlangsung' },
      COMPLETED: { color: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200', label: 'Selesai' },
      CANCELLED: { color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200', label: 'Dibatalkan' }
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const formatTime = (timeString: string) => {
    return timeString.slice(0, 5); // Format HH:MM
  };

  const filteredAgenda = agenda.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-700 to-green-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-3">
              <Calendar className="w-9 h-9 text-white" />
              Agenda & Kegiatan
            </h1>
            <p className="text-xl md:text-2xl opacity-90">
              Jadwal kegiatan dan agenda Dinas Lingkungan Hidup Kota Tasikmalaya
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          
          {/* Search and Filter */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8 border border-gray-200 dark:border-gray-700">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Cari Agenda
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Cari agenda atau kegiatan..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  />
                  <button
                    onClick={handleSearch}
                    className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                  >
                    Cari
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Filter Status
                </label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                >
                  <option value="UPCOMING">Akan Datang</option>
                  <option value="ONGOING">Berlangsung</option>
                  <option value="COMPLETED">Selesai</option>
                  <option value="all">Semua Status</option>
                </select>
              </div>
            </div>
          </div>

          {/* Agenda List */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            {loading ? (
              <div className="p-8">
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="bg-gray-200 dark:bg-gray-700 h-32 rounded-lg"></div>
                    </div>
                  ))}
                </div>
              </div>
            ) : filteredAgenda.length > 0 ? (
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredAgenda.map((item) => (
                  <div key={item.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            {item.title}
                          </h3>
                          {getStatusBadge(item.status)}
                        </div>
                        
                        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                          {item.description}
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-sm text-gray-600 dark:text-gray-300">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-green-600" />
                            <span>
                              {formatDate(item.startDate)}
                              {item.endDate !== item.startDate && ` - ${formatDate(item.endDate)}`}
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-blue-600" />
                            <span>
                              {formatTime(item.startTime)}
                              {item.endTime && ` - ${formatTime(item.endTime)}`} WIB
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-red-600" />
                            <span>{item.location}</span>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-purple-600" />
                            <span>{item.participants} peserta</span>
                          </div>
                          
                          <div className="flex items-center gap-2 md:col-span-2 lg:col-span-2">
                            <Info className="w-4 h-4 text-orange-600" />
                            <span>Penyelenggara: {item.organizer}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 mt-4 lg:mt-0">
                        <Link
                          href={`/informasi/agenda/${item.id}`}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm"
                        >
                          <Eye className="w-4 h-4" />
                          Lihat Detail
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Calendar className="w-24 h-24 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Tidak ada agenda
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {searchTerm ? 'Tidak ditemukan agenda yang sesuai dengan pencarian' : 'Belum ada agenda untuk periode ini'}
                </p>
              </div>
            )}
          </div>

          {/* Info Box */}
          <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
            <div className="flex items-start gap-3">
              <Info className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">
                  Informasi Agenda
                </h4>
                <ul className="text-sm text-blue-800 dark:text-blue-300 space-y-1">
                  <li>• Agenda dapat berubah sewaktu-waktu sesuai kondisi dan kebutuhan</li>
                  <li>• Untuk informasi lebih lanjut, silakan hubungi sekretariat DLH Kota Tasikmalaya</li>
                  <li>• Kegiatan yang bersifat terbuka untuk umum akan dicantumkan keterangan khusus</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

