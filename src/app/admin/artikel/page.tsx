"use client";

import { useState, useEffect } from "react";
import {
  Plus,
  Edit,
  Trash2,
  FileText,
  Eye,
  Search,
  Filter,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Article {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  thumbnail?: string;
  tags?: string[];
  isPublished: boolean;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
  author: {
    id: string;
    name: string;
    email: string;
  };
  category?: {
    name: string;
  };
}

export default function AdminArtikel() {
  const router = useRouter();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const itemsPerPage = 10;

  // Fetch articles from database
  const fetchArticles = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: itemsPerPage.toString(),
        search: search,
        status: statusFilter === "all" ? "" : statusFilter,
      });

      const response = await fetch(`/api/articles?${params}`);
      const data = await response.json();

      if (data.success) {
        setArticles(data.data || []);
        setTotalPages(
          Math.ceil((data.total || data.data?.length || 0) / itemsPerPage)
        );
      } else {
        console.error("Gagal mengambil artikel:", data.error);
        setArticles([]);
      }
    } catch (error) {
      console.error("Error mengambil artikel:", error);
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  // Delete article
  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/articles/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        setArticles((prev) => prev.filter((item) => item.id !== id));
        setShowDeleteModal(false);
        setDeleteId(null);
        alert("Artikel berhasil dihapus!");
      } else {
        alert("Gagal menghapus artikel: " + (data.error || "Unknown error"));
      }
    } catch (error) {
      console.error("Error menghapus artikel:", error);
      alert("Terjadi kesalahan saat menghapus artikel");
    }
  };

  const getStatusBadge = (isPublished: boolean) => {
    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          isPublished
            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
        }`}
      >
        {isPublished ? "Dipublikasi" : "Draft"}
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

  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(search.toLowerCase()) ||
      (article.excerpt &&
        article.excerpt.toLowerCase().includes(search.toLowerCase())) ||
      (article.author?.name &&
        article.author.name.toLowerCase().includes(search.toLowerCase()));

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "published" && article.isPublished) ||
      (statusFilter === "draft" && !article.isPublished);

    return matchesSearch && matchesStatus;
  });

  useEffect(() => {
    fetchArticles();
  }, [currentPage, search, statusFilter]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-700 to-green-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-3">
              <FileText className="w-9 h-9 text-white" />
              Manajemen Artikel
            </h1>
            <p className="text-xl md:text-2xl opacity-90">
              Kelola semua artikel dan berita DLH Kota Tasikmalaya
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
                  placeholder="Cari artikel..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
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
                  <option value="published">Dipublikasi</option>
                  <option value="draft">Draft</option>
                </select>
              </div>

              <Link
                href="/admin/artikel/create"
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
              >
                <Plus className="w-5 h-5" />
                Tambah Artikel
              </Link>
            </div>
          </div>
          {/* Articles List */}
          {loading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 dark:bg-gray-700 h-32 rounded-lg"></div>
                </div>
              ))}
            </div>
          ) : filteredArticles.length > 0 ? (
            <div className="space-y-4">
              {filteredArticles.map((article) => (
                <div
                  key={article.id}
                  className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 border border-gray-200 dark:border-gray-600 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {article.title}
                        </h3>
                        {getStatusBadge(article.isPublished)}
                      </div>

                      {article.excerpt && (
                        <p className="text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                          {article.excerpt}
                        </p>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-sm text-gray-600 dark:text-gray-300">
                        <div>
                          <span className="font-medium">Penulis:</span>{" "}
                          {article.author?.name || "Admin"}
                        </div>

                        {article.category && (
                          <div>
                            <span className="font-medium">Kategori:</span>{" "}
                            {article.category.name}
                          </div>
                        )}

                        <div>
                          <span className="font-medium">Dibuat:</span>{" "}
                          {formatDate(article.createdAt)}
                        </div>
                      </div>

                      {article.tags && article.tags.length > 0 && (
                        <div className="mt-3">
                          <div className="flex flex-wrap gap-1">
                            {article.tags.slice(0, 3).map((tag, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 rounded text-xs"
                              >
                                #{tag}
                              </span>
                            ))}
                            {article.tags.length > 3 && (
                              <span className="px-2 py-1 bg-gray-100 text-gray-600 dark:bg-gray-900/30 dark:text-gray-400 rounded text-xs">
                                +{article.tags.length - 3}
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-row lg:flex-col gap-2">
                      <Link
                        href={`/admin/artikel/view/${article.id}`}
                        className="inline-flex items-center gap-1 px-3 py-1 text-sm bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-md transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                        Detail
                      </Link>

                      <Link
                        href={`/admin/artikel/edit/${article.id}`}
                        className="inline-flex items-center gap-1 px-3 py-1 text-sm bg-yellow-100 hover:bg-yellow-200 text-yellow-700 rounded-md transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                        Edit
                      </Link>

                      <button
                        onClick={() => {
                          setDeleteId(article.id);
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
              <FileText className="w-24 h-24 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Belum ada artikel
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Mulai dengan menambahkan artikel pertama Anda
              </p>
              <Link
                href="/admin/artikel/create"
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
              >
                <Plus className="w-5 h-5" />
                Tambah Artikel
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
                  Sebelumnya
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
                  Selanjutnya
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
              Konfirmasi Hapus Artikel
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Apakah Anda yakin ingin menghapus artikel ini? Tindakan ini tidak
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
