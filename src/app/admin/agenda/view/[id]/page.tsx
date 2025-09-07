"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  User,
  ChevronLeft,
  Edit,
  AlertCircle,
  Calendar as CalendarIcon,
  Timer,
  Trash2,
} from "lucide-react";
import Link from "next/link";

interface Agenda {
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
  status: "UPCOMING" | "ONGOING" | "COMPLETED" | "CANCELLED";
  createdAt: string;
  updatedAt: string;
}

export default function AdminAgendaView() {
  const params = useParams();
  const router = useRouter();
  const [agenda, setAgenda] = useState<Agenda | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (params.id) {
      fetchAgenda();
    }
  }, [params.id]);

  const fetchAgenda = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/agenda/${params.id}`);
      const data = await response.json();

      if (data.success) {
        setAgenda(data.data);
      } else {
        console.error("Agenda tidak ditemukan");
      }
    } catch (error) {
      console.error("Error fetching agenda:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Apakah Anda yakin ingin menghapus agenda ini?")) {
      return;
    }

    setDeleting(true);
    try {
      const response = await fetch(`/api/agenda/${params.id}`, {
        method: "DELETE",
      });

      const data = await response.json();
      if (data.success) {
        router.push("/admin/agenda");
      } else {
        alert(data.error || "Gagal menghapus agenda");
      }
    } catch (error) {
      console.error("Error deleting agenda:", error);
      alert("Gagal menghapus agenda");
    } finally {
      setDeleting(false);
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formatDateTime = (dateStr: string, timeStr: string) => {
    const date = new Date(dateStr);
    return `${date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })} ${timeStr}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Memuat agenda...
          </p>
        </div>
      </div>
    );
  }

  if (!agenda) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            Agenda tidak ditemukan
          </h2>
          <button
            onClick={() => router.push("/admin/agenda")}
            className="text-green-600 hover:text-green-800 underline"
          >
            Kembali ke daftar agenda
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-gradient-to-r from-gray-700 to-green-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-3">
              <Calendar className="w-9 h-9 text-white" />
              Detail Agenda
            </h1>
            <p className="text-xl md:text-2xl opacity-90">
              Preview agenda untuk website DLH
            </p>
          </div>
        </div>
      </div>

      <div className="py-12">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 md:p-12 border border-gray-200 dark:border-gray-700">
          {/* Back Button and Action Buttons */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Link
                href="/admin/agenda"
                className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </Link>
              <h2 className="text-2xl text-left font-bold text-gray-800 dark:text-white">
                Preview Agenda
              </h2>
            </div>
            <div className="flex gap-2">
              <Link
                href={`/admin/agenda/edit/${agenda.id}`}
                className="flex items-center gap-2 bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <Edit className="w-4 h-4" />
                Edit
              </Link>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
              >
                <Trash2 className="w-4 h-4" />
                {deleting ? "Menghapus..." : "Hapus"}
              </button>
            </div>
          </div>

          {/* Title and Status */}
          <div className="mb-8">
            {/* Status Badge */}
            <div className="mb-4">
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  agenda.status === "UPCOMING"
                    ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                    : agenda.status === "ONGOING"
                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                    : agenda.status === "COMPLETED"
                    ? "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300"
                    : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                }`}
              >
                {agenda.status === "UPCOMING"
                  ? "Akan Datang"
                  : agenda.status === "ONGOING"
                  ? "Berlangsung"
                  : agenda.status === "COMPLETED"
                  ? "Selesai"
                  : "Dibatalkan"}
              </span>
            </div>

            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
              {agenda.title}
            </h2>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{agenda.organizer}</span>
              </div>
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-4 h-4" />
                <span>Dibuat: {formatDate(agenda.createdAt)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Timer className="w-4 h-4" />
                <span>Diperbarui: {formatDate(agenda.updatedAt)}</span>
              </div>
            </div>
          </div>

          {/* Agenda Details Section */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-green-600" />
              Informasi Agenda
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-red-600" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Lokasi
                  </p>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {agenda.location}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-purple-600" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Peserta
                  </p>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {agenda.participants} orang
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Waktu Mulai
                  </p>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {formatDateTime(agenda.startDate, agenda.startTime)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-orange-600" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Waktu Selesai
                  </p>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {formatDateTime(agenda.endDate, agenda.endTime)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              Deskripsi
            </h3>
            <div className="prose dark:prose-invert max-w-none">
              <div className="whitespace-pre-wrap text-gray-700 dark:text-gray-300 leading-relaxed bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                {agenda.description}
              </div>
            </div>
          </div>

          {/* Metadata Footer */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <div className="flex flex-wrap justify-between items-center text-sm text-gray-500 dark:text-gray-400">
              <div>
                <strong>Dibuat:</strong> {formatDate(agenda.createdAt)}
              </div>
              <div>
                <strong>Diperbarui:</strong> {formatDate(agenda.updatedAt)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
