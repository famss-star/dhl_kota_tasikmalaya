'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Info,
  ArrowLeft,
  Phone,
  Mail,
  Globe,
  Share2,
  CheckCircle,
  XCircle,
  AlertCircle,
  PlayCircle
} from 'lucide-react';

// Type definitions
interface AgendaDetail {
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
  contact?: string;
  email?: string;
  website?: string;
  requirements?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export default function AgendaDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [agenda, setAgenda] = useState<AgendaDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAgendaDetail();
  }, [params.id]);

  const fetchAgendaDetail = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/agenda/${params.id}`);
      const data = await response.json();

      if (data.success) {
        setAgenda(data.data);
      } else {
        setError(data.error || 'Agenda tidak ditemukan');
      }
    } catch (error) {
      console.error('Error fetching agenda detail:', error);
      setError('Gagal memuat detail agenda');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      UPCOMING: {
        label: 'Akan Datang',
        class: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
        icon: <AlertCircle className="w-4 h-4" />
      },
      ONGOING: {
        label: 'Berlangsung',
        class: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
        icon: <PlayCircle className="w-4 h-4" />
      },
      COMPLETED: {
        label: 'Selesai',
        class: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
        icon: <CheckCircle className="w-4 h-4" />
      },
      CANCELLED: {
        label: 'Dibatalkan',
        class: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
        icon: <XCircle className="w-4 h-4" />
      }
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${config.class}`}>
        {config.icon}
        {config.label}
      </span>
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString: string) => {
    if (!timeString) return '';
    return timeString.substring(0, 5);
  };

  const handleShare = async () => {
    if (navigator.share && agenda) {
      try {
        await navigator.share({
          title: agenda.title,
          text: agenda.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link berhasil disalin ke clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-6 w-3/4"></div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !agenda) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-12">
              <XCircle className="w-24 h-24 text-red-500 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Agenda Tidak Ditemukan
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {error || 'Agenda yang Anda cari tidak dapat ditemukan.'}
              </p>
              <Link
                href="/informasi/agenda"
                className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                Kembali ke Daftar Agenda
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-700 to-green-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-3">
              <Calendar className="w-9 h-9 text-white" />
              Detail Agenda
            </h1>
            <p className="text-xl md:text-2xl opacity-90">Informasi lengkap kegiatan DLH</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-8xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
          {/* Header */}
          <div className="p-8 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <Link
                href="/informasi/agenda"
                className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                Kembali
              </Link>
              
              <div className="flex gap-2">
                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  Bagikan
                </button>
              </div>
            </div>

            {/* Status Badge */}
            <div className="flex items-center gap-4 mb-4">
              {getStatusBadge(agenda.status)}
            </div>

            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
              {agenda.title}
            </h2>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4" />
                <span>{agenda.organizer}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(agenda.startDate)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                <span>/informasi/agenda/{agenda.id}</span>
              </div>
            </div>
          </div>
          {/* Info Agenda Section */}
          <div className="p-8 border-b border-gray-200 dark:border-gray-700">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                <Info className="w-5 h-5 text-green-600" />
                Informasi Agenda
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="flex items-center gap-3">
                  <Calendar className="w-6 h-6 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Tanggal</p>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {formatDate(agenda.startDate)}
                      {agenda.endDate !== agenda.startDate && (
                        <span className="block text-sm text-gray-600">
                          s/d {formatDate(agenda.endDate)}
                        </span>
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="w-6 h-6 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Waktu</p>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {formatTime(agenda.startTime)}
                      {agenda.endTime && ` - ${formatTime(agenda.endTime)}`} WIB
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="w-6 h-6 text-red-600" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Lokasi</p>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {agenda.location}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Users className="w-6 h-6 text-purple-600" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Peserta</p>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {agenda.participants} orang
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 md:col-span-2">
                  <Info className="w-6 h-6 text-orange-600" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Penyelenggara</p>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {agenda.organizer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Deskripsi */}
          <div className="p-8 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Deskripsi Kegiatan</h3>
            <div className="prose dark:prose-invert max-w-none">
              <div className="whitespace-pre-wrap text-gray-700 dark:text-gray-300 leading-relaxed">
                {agenda.description}
              </div>
            </div>
          </div>

          {/* Additional Info */}
          {(agenda.requirements || agenda.notes) && (
            <div className="p-8 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Informasi Tambahan</h3>
              {agenda.requirements && (
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Persyaratan:</h4>
                  <div className="whitespace-pre-line text-gray-700 dark:text-gray-300 leading-relaxed">
                    {agenda.requirements}
                  </div>
                </div>
              )}
              {agenda.notes && (
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Catatan:</h4>
                  <div className="whitespace-pre-line text-gray-700 dark:text-gray-300 leading-relaxed">
                    {agenda.notes}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Contact Info */}
          {(agenda.contact || agenda.email || agenda.website) && (
            <div className="p-8 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Informasi Kontak</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {agenda.contact && (
                  <div className="flex items-center gap-3">
                    <Phone className="w-6 h-6 text-green-600" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Telepon</p>
                      <a
                        href={`tel:${agenda.contact}`}
                        className="font-semibold text-green-600 hover:text-green-700 dark:text-green-400"
                      >
                        {agenda.contact}
                      </a>
                    </div>
                  </div>
                )}

                {agenda.email && (
                  <div className="flex items-center gap-3">
                    <Mail className="w-6 h-6 text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Email</p>
                      <a
                        href={`mailto:${agenda.email}`}
                        className="font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 break-all"
                      >
                        {agenda.email}
                      </a>
                    </div>
                  </div>
                )}

                {agenda.website && (
                  <div className="flex items-center gap-3">
                    <Globe className="w-6 h-6 text-purple-600" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Website</p>
                      <a
                        href={agenda.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-purple-600 hover:text-purple-700 dark:text-purple-400 break-all"
                      >
                        {agenda.website}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Metadata Footer */}
          <div className="p-8">
            <div className="flex flex-wrap justify-between items-center text-sm text-gray-500 dark:text-gray-400">
              <div>
                <strong>Dibuat:</strong> {formatDate(agenda.createdAt)}
              </div>
              {agenda.updatedAt !== agenda.createdAt && (
                <div>
                  <strong>Diperbarui:</strong> {formatDate(agenda.updatedAt)}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
