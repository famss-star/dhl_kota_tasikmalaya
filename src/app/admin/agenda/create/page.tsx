"use client";

import { useState } from "react";
import { Calendar, Save, MapPin, Clock, Users, FileText, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface AgendaForm {
  title: string;
  description: string;
  location: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  organizer: string;
  participants: number;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
}

export default function CreateAgenda() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<AgendaForm>({
    title: '',
    description: '',
    location: '',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    organizer: '',
    participants: 0,
    status: 'upcoming'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value) || 0 : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validasi form
    if (!form.title || !form.description || !form.location || !form.startDate || !form.startTime || !form.organizer) {
      alert('Mohon lengkapi semua field yang wajib diisi!');
      return;
    }

    // Set endDate sama dengan startDate jika tidak diisi
    const submitData = {
      ...form,
      endDate: form.endDate || form.startDate
    };

    setLoading(true);
    
    try {
      const response = await fetch('/api/agenda', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      });

      const data = await response.json();

      if (data.success) {
        alert('Agenda berhasil dibuat!');
        router.push('/admin/agenda');
      } else {
        alert('Gagal membuat agenda: ' + data.error);
      }
    } catch (error) {
      console.error('Error creating agenda:', error);
      alert('Terjadi kesalahan saat membuat agenda');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-700 to-green-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-3">
              <Calendar className="w-9 h-9 text-white" />
              Buat Agenda Baru
            </h1>
            <p className="text-xl md:text-2xl opacity-90">Tambahkan agenda baru untuk website DLH</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
          
          {/* Back Button and Title */}
          <div className="flex items-center gap-4 mb-8">
            <Link
              href="/admin/agenda"
              className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </Link>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Form Agenda Baru</h2>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Basic Information */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Informasi Dasar
              </h3>
              
              <div className="grid gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Judul Agenda *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-600 dark:text-white"
                    placeholder="Contoh: Rapat Koordinasi Bulanan"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Deskripsi *
                  </label>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-600 dark:text-white"
                    placeholder="Jelaskan detail agenda atau kegiatan..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Status
                  </label>
                  <select
                    name="status"
                    value={form.status}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-600 dark:text-white"
                  >
                    <option value="upcoming">Akan Datang</option>
                    <option value="ongoing">Berlangsung</option>
                    <option value="completed">Selesai</option>
                    <option value="cancelled">Dibatalkan</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Date & Time */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Waktu & Tanggal
              </h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Tanggal Mulai *
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    value={form.startDate}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-600 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Tanggal Selesai
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    value={form.endDate}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-600 dark:text-white"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Kosongkan jika sama dengan tanggal mulai
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Waktu Mulai *
                  </label>
                  <input
                    type="time"
                    name="startTime"
                    value={form.startTime}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-600 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Waktu Selesai
                  </label>
                  <input
                    type="time"
                    name="endTime"
                    value={form.endTime}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-600 dark:text-white"
                  />
                </div>
              </div>
            </div>

            {/* Location & Organizer */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Lokasi & Penyelenggara
              </h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Lokasi *
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={form.location}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-600 dark:text-white"
                    placeholder="Contoh: Ruang Rapat DLH Kota Tasikmalaya"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Penyelenggara *
                  </label>
                  <input
                    type="text"
                    name="organizer"
                    value={form.organizer}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-600 dark:text-white"
                    placeholder="Contoh: DLH Kota Tasikmalaya"
                  />
                </div>
              </div>
            </div>

            {/* Participants */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Users className="w-5 h-5" />
                Peserta
              </h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Jumlah Peserta (Estimasi)
                </label>
                <input
                  type="number"
                  name="participants"
                  value={form.participants}
                  onChange={handleInputChange}
                  min="0"
                  className="w-full md:w-48 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-600 dark:text-white"
                  placeholder="0"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Kosongkan atau isi 0 jika belum diketahui
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4 pt-6">
              <Link
                href="/admin/agenda"
                className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Batal
              </Link>
              
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 px-6 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-md transition-colors"
              >
                <Save className="w-5 h-5" />
                {loading ? 'Menyimpan...' : 'Buat Agenda'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
