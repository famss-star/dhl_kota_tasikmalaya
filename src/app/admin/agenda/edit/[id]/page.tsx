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
  Save,
  ArrowLeft,
  AlertCircle,
  CheckCircle,
  Calendar as CalendarIcon,
  FileText,
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

interface FormData {
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
}

export default function AdminAgendaEdit() {
  const params = useParams();
  const router = useRouter();
  const [agenda, setAgenda] = useState<Agenda | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    location: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    organizer: "",
    participants: 0,
    status: "UPCOMING",
  });

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
        const agendaData = data.data;
        setAgenda(agendaData);

        // Set form data
        setFormData({
          title: agendaData.title,
          description: agendaData.description,
          location: agendaData.location,
          startDate: agendaData.startDate.split("T")[0],
          endDate: agendaData.endDate.split("T")[0],
          startTime: agendaData.startTime,
          endTime: agendaData.endTime,
          organizer: agendaData.organizer,
          participants: agendaData.participants,
          status: agendaData.status,
        });
      } else {
        setMessage({
          type: "error",
          text: data.error || "Agenda tidak ditemukan",
        });
      }
    } catch (error) {
      console.error("Error fetching agenda:", error);
      setMessage({ type: "error", text: "Gagal memuat data agenda" });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage({ type: "", text: "" });

    // Validation
    if (
      !formData.title ||
      !formData.description ||
      !formData.location ||
      !formData.startDate ||
      !formData.startTime ||
      !formData.organizer
    ) {
      setMessage({ type: "error", text: "Semua field wajib harus diisi" });
      setSaving(false);
      return;
    }

    try {
      const response = await fetch(`/api/agenda/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setMessage({ type: "success", text: "Agenda berhasil diperbarui" });
        // Redirect after 1 second
        setTimeout(() => {
          router.push(`/admin/agenda/view/${params.id}`);
        }, 1000);
      } else {
        setMessage({
          type: "error",
          text: data.error || "Gagal memperbarui agenda",
        });
      }
    } catch (error) {
      console.error("Error updating agenda:", error);
      setMessage({ type: "error", text: "Gagal memperbarui agenda" });
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "participants" ? parseInt(value) || 0 : value,
    }));
  };

  if (loading) {
    return (
      <div className="p-6 bg-white dark:bg-gray-900">
        <div className="animate-pulse">
          <div className="flex items-center justify-between mb-6">
            <div className="h-8 w-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
          <div className="space-y-4">
            <div className="h-12 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-24 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-12 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!agenda) {
    return (
      <div className="p-6 bg-white dark:bg-gray-900">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <AlertCircle className="h-16 w-16 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Agenda Tidak Ditemukan
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Agenda yang Anda cari tidak dapat ditemukan atau telah dihapus.
            </p>
            <Link
              href="/admin/agenda"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Kembali ke Daftar Agenda
            </Link>
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
              Edit Agenda
            </h1>
            <p className="text-xl md:text-2xl opacity-90">
              Edit agenda untuk website DLH
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="py-12">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 md:p-12 border border-gray-200 dark:border-gray-700">
          {/* Back Button and Title */}
          <div className="flex items-center gap-4 mb-8">
            <Link
              href="/admin/agenda"
              className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </Link>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              Edit Agenda
            </h2>
          </div>

          {/* Message Alert */}
          {message.text && (
            <div
              className={`mb-6 p-4 rounded-lg border ${
                message.type === "success"
                  ? "bg-green-50 border-green-200 text-green-700 dark:bg-green-900 dark:border-green-700 dark:text-green-200"
                  : "bg-red-50 border-red-200 text-red-700 dark:bg-red-900 dark:border-red-700 dark:text-red-200"
              }`}
            >
              <div className="flex items-center">
                {message.type === "success" ? (
                  <CheckCircle className="h-5 w-5 mr-2" />
                ) : (
                  <AlertCircle className="h-5 w-5 mr-2" />
                )}
                {message.text}
              </div>
            </div>
          )}

          {/* Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSave();
            }}
            className="space-y-6"
          >
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
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-600 dark:text-white"
                    placeholder="Contoh: Rapat Koordinasi Bulanan"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Deskripsi *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-600 dark:text-white"
                    placeholder="Jelaskan detail agenda atau kegiatan..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-600 dark:text-white"
                  >
                    <option value="UPCOMING">Akan Datang</option>
                    <option value="ONGOING">Berlangsung</option>
                    <option value="COMPLETED">Selesai</option>
                    <option value="CANCELLED">Dibatalkan</option>
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
                    value={formData.startDate}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-600 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Tanggal Selesai
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-600 dark:text-white"
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
                    value={formData.startTime}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-600 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Waktu Selesai
                  </label>
                  <input
                    type="time"
                    name="endTime"
                    value={formData.endTime}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-600 dark:text-white"
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
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-600 dark:text-white"
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
                    value={formData.organizer}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-600 dark:text-white"
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
                  value={formData.participants}
                  onChange={handleInputChange}
                  min="0"
                  className="w-full md:w-48 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-600 dark:text-white"
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
                disabled={saving}
                className="flex items-center gap-2 px-6 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-md transition-colors"
              >
                <Save className="w-5 h-5" />
                {saving ? "Menyimpan..." : "Simpan Perubahan"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
