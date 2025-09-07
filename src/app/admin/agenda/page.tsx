"use client";

import { useState, useEffect } from "react";
import {
  Calendar,
  Plus,
  Trash2,
  Search,
  Filter,
  MapPin,
  Clock,
  Users,
  Eye,
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

export default function AdminAgenda() {
  const [agendaList, setAgendaList] = useState<Agenda[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const itemsPerPage = 10;

  useEffect(() => {
    fetchAgenda();
  }, [currentPage, searchTerm, statusFilter]);

  const fetchAgenda = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: itemsPerPage.toString(),
        search: searchTerm,
        status: statusFilter === "all" ? "" : statusFilter,
      });

      const response = await fetch(`/api/agenda?${params}`);
      const data = await response.json();

      if (data.success) {
        setAgendaList(data.data.agenda);
        setTotalPages(Math.ceil(data.data.total / itemsPerPage));
      } else {
        console.error("Error fetching agenda:", data.error);
        setAgendaList([]);
      }
    } catch (error) {
      console.error("Error fetching agenda:", error);
      setAgendaList([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/agenda/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        setAgendaList((prev) => prev.filter((item) => item.id !== id));
        setShowDeleteModal(false);
        setDeleteId(null);
        alert("Agenda berhasil dihapus!");
      } else {
        alert("Gagal menghapus agenda: " + data.error);
      }
    } catch (error) {
      console.error("Error deleting agenda:", error);
      alert("Terjadi kesalahan saat menghapus agenda");
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      UPCOMING: {
        color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
        label: "Akan Datang",
      },
      ONGOING: {
        color:
          "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
        label: "Berlangsung",
      },
      COMPLETED: {
        color: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
        label: "Selesai",
      },
      CANCELLED: {
        color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
        label: "Dibatalkan",
      },
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}
      >
        {config.label}
      </span>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formatTime = (timeString: string) => {
    return timeString.slice(0, 5); // Format HH:MM
  };

  const filteredAgenda = agendaList.filter((agenda) => {
    const matchesSearch =
      agenda.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agenda.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agenda.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || agenda.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-700 to-green-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-3">
              <Calendar className="w-9 h-9 text-white" />
              Manajemen Agenda
            </h1>
            <p className="text-xl md:text-2xl opacity-90">
              Kelola semua agenda dan kegiatan DLH Kota Tasikmalaya
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="py-12">
        <div className="max-w-8xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 md:p-12 border border-gray-200 dark:border-gray-700">
          {/* Controls */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Cari agenda..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="pl-10 pr-8 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white appearance-none bg-white"
                >
                  <option value="all">Semua Status</option>
                  <option value="UPCOMING">Akan Datang</option>
                  <option value="ONGOING">Berlangsung</option>
                  <option value="COMPLETED">Selesai</option>
                  <option value="CANCELLED">Dibatalkan</option>
                </select>
              </div>

              <Link
                href="/admin/agenda/create"
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
              >
                <Plus className="w-5 h-5" />
                Tambah Agenda
              </Link>
            </div>
          </div>

          {/* Agenda List */}
          {loading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 dark:bg-gray-700 h-32 rounded-lg"></div>
                </div>
              ))}
            </div>
          ) : filteredAgenda.length > 0 ? (
            <div className="space-y-4">
              {filteredAgenda.map((agenda) => (
                <div
                  key={agenda.id}
                  className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 border border-gray-200 dark:border-gray-600 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {agenda.title}
                        </h3>
                        {getStatusBadge(agenda.status)}
                      </div>

                      <p className="text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                        {agenda.description}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-sm text-gray-600 dark:text-gray-300">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-green-600" />
                          <span>
                            {formatDate(agenda.startDate)}
                            {agenda.endDate !== agenda.startDate &&
                              ` - ${formatDate(agenda.endDate)}`}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-blue-600" />
                          <span>
                            {formatTime(agenda.startTime)}
                            {agenda.endTime &&
                              ` - ${formatTime(agenda.endTime)}`}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-red-600" />
                          <span>{agenda.location}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-purple-600" />
                          <span>{agenda.participants} peserta</span>
                        </div>
                      </div>

                      <div className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                        <span>Penyelenggara: {agenda.organizer}</span>
                      </div>
                    </div>

                    <div className="flex flex-row lg:flex-col gap-2">
                      <Link
                        href={`/admin/agenda/view/${agenda.id}`}
                        className="inline-flex items-center gap-1 px-3 py-1 text-sm bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-md transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                        Detail
                      </Link>

                      <button
                        onClick={() => {
                          setDeleteId(agenda.id);
                          setShowDeleteModal(true);
                        }}
                        className="inline-flex items-center gap-1 px-3 py-1 text-sm bg-red-100 hover:bg-red-200 text-red-700 rounded-md transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                        Hapus
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Calendar className="w-24 h-24 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Belum ada agenda
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Mulai dengan menambahkan agenda pertama Anda
              </p>
              <Link
                href="/admin/agenda/create"
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
              >
                <Plus className="w-5 h-5" />
                Tambah Agenda
              </Link>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8">
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Previous
                </button>

                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-3 py-2 border rounded-md ${
                      currentPage === i + 1
                        ? "bg-green-600 text-white border-green-600"
                        : "border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Konfirmasi Hapus Agenda
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Apakah Anda yakin ingin menghapus agenda ini? Tindakan ini tidak
              dapat dibatalkan.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeleteId(null);
                }}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Batal
              </button>
              <button
                onClick={() => deleteId && handleDelete(deleteId)}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
