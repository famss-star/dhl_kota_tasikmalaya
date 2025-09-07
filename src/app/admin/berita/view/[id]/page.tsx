"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  ArrowLeft,
  Edit,
  Trash2,
  Calendar,
  User,
  Eye,
  Globe,
  ChevronLeft,
} from "lucide-react";
import Image from "next/image";

interface News {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  thumbnail?: string;
  isPublished: boolean;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
  author: {
    id: string;
    name: string;
    email: string;
  };
}

export default function ViewBerita() {
  const router = useRouter();
  const params = useParams();
  const newsId = params.id as string;

  const [news, setNews] = useState<News | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch news data
  const fetchNews = async () => {
    try {
      const response = await fetch(`/api/news/${newsId}?admin=true`);
      const data = await response.json();

      if (data.success) {
        setNews(data.data);
      } else {
        alert(data.error || "Berita tidak ditemukan");
        router.push("/admin/berita");
      }
    } catch (error) {
      console.error("Fetch news error:", error);
      alert("Terjadi kesalahan saat memuat berita");
      router.push("/admin/berita");
    } finally {
      setLoading(false);
    }
  };

  // Delete confirmation modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Delete news
  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/news/${newsId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        alert("Berita berhasil dihapus!");
        router.push("/admin/berita");
      } else {
        alert(data.error || "Gagal menghapus berita");
      }
    } catch (error) {
      console.error("Delete news error:", error);
      alert("Terjadi kesalahan saat menghapus berita");
    } finally {
      setShowDeleteModal(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  useEffect(() => {
    if (newsId) {
      fetchNews();
    }
  }, [newsId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Memuat berita...
          </p>
        </div>
      </div>
    );
  }

  if (!news) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            Berita tidak ditemukan
          </h2>
          <button
            onClick={() => router.push("/admin/berita")}
            className="text-green-600 hover:text-green-800 underline"
          >
            Kembali ke daftar berita
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-3">
              <Eye className="w-9 h-9 text-white" />
              Detail Berita
            </h1>
            <p className="text-xl md:text-2xl opacity-90">
              Preview berita untuk website DLH
            </p>
          </div>
        </div>
      </div>

      <div className="py-12">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
          {/* Header */}
          <div className="p-8 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => router.back()}
                className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex gap-2">
                <button
                  onClick={() => router.push(`/admin/berita/edit/${news.slug}`)}
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  Hapus
                </button>
              </div>
            </div>

            {/* Status Badge */}
            <div className="flex items-center gap-4 mb-4">
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  news.isPublished
                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                    : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                }`}
              >
                {news.isPublished ? "Dipublikasi" : "Draf"}
              </span>
            </div>

            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
              {news.title}
            </h2>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{news.author.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Dibuat: {formatDate(news.createdAt)}</span>
              </div>
              {news.publishedAt && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Dipublish: {formatDate(news.publishedAt)}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                <span>/{news.slug}</span>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          {news.thumbnail && (
            <div className="p-8">
              <Image
                src={news.thumbnail}
                alt={news.title}
                width={800}
                height={400}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          )}

          {/* Excerpt Section */}
          {news.excerpt && (
            <div className="p-8 border-b border-gray-200 dark:border-gray-700">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                  Ringkasan
                </h3>
                <p className="text-gray-600 dark:text-gray-300 italic leading-relaxed">
                  {news.excerpt}
                </p>
              </div>
            </div>
          )}

          {/* Content */}
          <div className="p-8 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              Konten
            </h3>
            <div className="prose dark:prose-invert max-w-none">
              <div className="whitespace-pre-wrap text-gray-700 dark:text-gray-300 leading-relaxed">
                {news.content}
              </div>
            </div>
          </div>

          {/* Metadata Footer */}
          <div className="p-8">
            <div className="flex flex-wrap justify-between items-center text-sm text-gray-500 dark:text-gray-400">
              <div>
                <strong>Dibuat:</strong> {formatDate(news.createdAt)}
              </div>
              {news.updatedAt !== news.createdAt && (
                <div>
                  <strong>Diperbarui:</strong> {formatDate(news.updatedAt)}
                </div>
              )}
              {news.publishedAt && (
                <div>
                  <strong>Dipublikasi:</strong> {formatDate(news.publishedAt)}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              Konfirmasi Hapus
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Apakah Anda yakin ingin menghapus berita ini? Tindakan ini tidak
              dapat dibatalkan.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
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
