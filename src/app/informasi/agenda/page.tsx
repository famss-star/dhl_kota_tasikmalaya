'use client';

import { useState } from 'react';
import Link from 'next/link';

// Type definitions
interface AgendaItem {
  id: number;
  title: string;
  time: string;
  location: string;
  status: string;
  description: string;
}

type AgendaData = {
  [key: string]: AgendaItem[];
};

// Sample agenda data
const agendaData: AgendaData = {
  '2025-07-16': [
    {
      id: 1,
      title: 'Cimahi Hepi Run 2025',
      time: '06:00 - 10:00 WIB',
      location: 'Lapangan Kota Cimahi',
      status: 'Belum Dimulai',
      description: 'Event lari marathon tahunan untuk memperingati hari jadi Kota Cimahi'
    }
  ],
  '2025-07-18': [
    {
      id: 2,
      title: 'Rapat Koordinasi Lingkungan',
      time: '09:00 - 11:00 WIB',
      location: 'Ruang Rapat DLH',
      status: 'Belum Dimulai',
      description: 'Koordinasi program kebersihan lingkungan bulan Juli'
    }
  ],
  '2025-07-20': [
    {
      id: 3,
      title: 'Sosialisasi Program Hijau',
      time: '13:00 - 15:00 WIB',
      location: 'Aula Kecamatan',
      status: 'Belum Dimulai',
      description: 'Sosialisasi program penghijauan kepada masyarakat'
    }
  ],
  '2025-07-22': [
    {
      id: 4,
      title: 'Workshop Pengelolaan Sampah',
      time: '08:00 - 12:00 WIB',
      location: 'Gedung Serbaguna',
      status: 'Belum Dimulai',
      description: 'Pelatihan pengelolaan sampah untuk RT/RW'
    }
  ],
  '2025-07-15': [
    {
      id: 5,
      title: 'Pembersihan Sungai Citanduy',
      time: '07:00 - 11:00 WIB',
      location: 'Sungai Citanduy',
      status: 'Telah Selesai',
      description: 'Kegiatan gotong royong pembersihan sungai bersama masyarakat'
    }
  ]
};

const monthNames = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

const dayNames = ['Ming', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

export default function AgendaPage() {
  // Set default date to current date (July 16, 2025)
  const today = new Date(2025, 6, 16); // month is 0-indexed, so 6 = July
  const [currentDate, setCurrentDate] = useState(today);
  const [selectedDate, setSelectedDate] = useState(today);

  // Get current month and year
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Get first day of month and number of days
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
  const firstDayWeekday = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();

  // Generate calendar days
  const calendarDays = [];
  
  // Add empty cells for days before month starts
  for (let i = 0; i < firstDayWeekday; i++) {
    calendarDays.push(null);
  }
  
  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  // Navigate months
  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(currentMonth - 1);
    } else {
      newDate.setMonth(currentMonth + 1);
    }
    setCurrentDate(newDate);
  };

  // Get agenda for selected date
  const formatDateKey = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const selectedDateKey = formatDateKey(selectedDate);
  const selectedAgenda = agendaData[selectedDateKey] || [];

  // Check if date has agenda
  const hasAgenda = (day: number) => {
    const dateKey = formatDateKey(new Date(currentYear, currentMonth, day));
    return agendaData[dateKey] && agendaData[dateKey].length > 0;
  };

  // Check if date is today (July 16, 2025)
  const isToday = (day: number) => {
    const today = new Date(2025, 6, 16); // July 16, 2025
    return today.getDate() === day && 
           today.getMonth() === currentMonth && 
           today.getFullYear() === currentYear;
  };

  // Check if date is selected
  const isSelected = (day: number) => {
    return selectedDate.getDate() === day &&
           selectedDate.getMonth() === currentMonth &&
           selectedDate.getFullYear() === currentYear;
  };

  // Select date
  const selectDate = (day: number) => {
    setSelectedDate(new Date(currentYear, currentMonth, day));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                📅 Agenda Kegiatan
              </h1>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Jadwal kegiatan dan acara Dinas Lingkungan Hidup Kota Tasikmalaya
              </p>
            </div>
            <Link
              href="/"
              className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              ← Kembali ke Beranda
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* 📅 Kolom Kiri: Kalender Visual & Informasi Tanggal */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  📅 Kalender {monthNames[currentMonth]} {currentYear}
                </h2>
                <div className="flex space-x-2">
                  <button
                    onClick={() => navigateMonth('prev')}
                    className="p-2 rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-400"
                  >
                    ←
                  </button>
                  <button
                    onClick={() => navigateMonth('next')}
                    className="p-2 rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-400"
                  >
                    →
                  </button>
                </div>
              </div>

              {/* Week Info */}
              <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  Minggu ke-{Math.ceil(selectedDate.getDate() / 7)} dari bulan {monthNames[currentMonth]}
                </p>
                <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                  Tanggal dipilih: {selectedDate.toLocaleDateString('id-ID', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1 mb-4">
                {/* Day headers */}
                {dayNames.map((day) => (
                  <div key={day} className="text-center py-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                    {day}
                  </div>
                ))}

                {/* Calendar days */}
                {calendarDays.map((day, index) => (
                  <div key={index} className="aspect-square">
                    {day ? (
                      <button
                        onClick={() => selectDate(day)}
                        className={`w-full h-full flex items-center justify-center text-sm rounded-md transition-colors relative ${
                          isToday(day)
                            ? 'bg-green-500 text-white font-bold'
                            : isSelected(day)
                            ? 'bg-blue-500 text-white font-semibold'
                            : hasAgenda(day)
                            ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-900/50'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                      >
                        {day}
                        {hasAgenda(day) && (
                          <div className="absolute bottom-1 right-1 w-2 h-2 bg-orange-400 rounded-full"></div>
                        )}
                      </button>
                    ) : (
                      <div></div>
                    )}
                  </div>
                ))}
              </div>

              {/* Legend */}
              <div className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span>Hari ini</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span>Tanggal dipilih</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-100 dark:bg-blue-900/30 rounded-full border border-blue-300"></div>
                  <span>Ada agenda</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  <span>Indikator agenda</span>
                </div>
              </div>
            </div>
          </div>

          {/* 📝 Kolom Kanan: Daftar Agenda / Event */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                📝 Agenda Hari Ini
              </h2>
              
              <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Menampilkan agenda untuk:
                </p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {selectedDate.toLocaleDateString('id-ID', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>

              {selectedAgenda.length > 0 ? (
                <div className="space-y-4">
                  {selectedAgenda.map((agenda: AgendaItem) => (
                    <div key={agenda.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {agenda.title}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          agenda.status === 'Belum Dimulai'
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                            : agenda.status === 'Telah Selesai'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                            : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                        }`}>
                          {agenda.status}
                        </span>
                      </div>
                      
                      <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center">
                          <span className="font-medium w-16">Waktu:</span>
                          <span>{agenda.time}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="font-medium w-16">Tempat:</span>
                          <span>{agenda.location}</span>
                        </div>
                        <div className="flex items-start">
                          <span className="font-medium w-16">Detail:</span>
                          <span className="flex-1">{agenda.description}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📅</div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    Tidak Ada Agenda
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Tidak ada kegiatan yang dijadwalkan pada tanggal ini.
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                    Pilih tanggal lain pada kalender untuk melihat agenda yang tersedia.
                  </p>
                </div>
              )}

              {/* Quick Navigation */}
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-600">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                  Navigasi Cepat
                </h4>
                <div className="flex flex-wrap gap-2">
                  {Object.keys(agendaData).map((dateKey) => {
                    const date = new Date(dateKey);
                    const day = date.getDate();
                    const isCurrentMonth = date.getMonth() === currentMonth && date.getFullYear() === currentYear;
                    
                    if (!isCurrentMonth) return null;
                    
                    return (
                      <button
                        key={dateKey}
                        onClick={() => selectDate(day)}
                        className="px-3 py-1 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full hover:bg-blue-200 dark:hover:bg-blue-900/50"
                      >
                        {day} {monthNames[currentMonth].substring(0, 3)}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Info Panel */}
        <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
          <div className="flex items-start space-x-3">
            <div className="text-2xl">ℹ️</div>
            <div>
              <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
                Panduan Penggunaan Agenda
              </h3>
              <ul className="space-y-1 text-sm text-blue-800 dark:text-blue-200">
                <li>• Klik pada tanggal di kalender untuk melihat agenda hari tersebut</li>
                <li>• Tanggal dengan titik oranye menandakan ada agenda pada hari tersebut</li>
                <li>• Gunakan tombol navigasi (← →) untuk berpindah bulan</li>
                <li>• Status agenda menunjukkan apakah kegiatan sudah selesai atau belum dimulai</li>
                <li>• Gunakan navigasi cepat di bawah untuk langsung ke tanggal yang memiliki agenda</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
