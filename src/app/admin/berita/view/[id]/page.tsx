"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Edit, Trash2, Calendar, User, Eye } from "lucide-react";
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
        alert(data.error || 'Berita tidak ditemukan');
        router.push('/admin/berita');
      }
    } catch (error) {
      console.error('Fetch news error:', error);
      alert('Terjadi kesalahan saat memuat berita');
      router.push('/admin/berita');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (newsId) {
      fetchNews();
    }
  }, [newsId]);

  const handleDelete = async () => {
    if (!confirm('Apakah Anda yakin ingin menghapus berita ini?')) return;

    try {
      const response = await fetch(`/api/news/${newsId}`, {
        method: 'DELETE'
      });
      
      const data = await response.json();
      
      if (data.success) {
        alert('Berita berhasil dihapus!');
        router.push('/admin/berita');
      } else {
        alert(data.error || 'Gagal menghapus berita');
      }
    } catch (error) {
      console.error('Delete news error:', error);
      alert('Terjadi kesalahan saat menghapus berita');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-600"></div>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Memuat berita...</p>
        </div>
      </div>
    );
  }

  if (!news) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400">Berita tidak ditemukan</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-gradient-to-r from-yellow-600 to-green-600 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-white hover:text-yellow-200 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Kembali
            </button>
            <h1 className="text-2xl md:text-3xl font-bold">View Berita</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header Card */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6 border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  {news.title}
                </h1>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{news.author.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(news.createdAt)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      news.isPublished 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                    }`}>
                      {news.isPublished ? 'Published' : 'Draft'}
                    </span>
                  </div>
                </div>

                {news.excerpt && (
                  <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Ringkasan:</h3>
                    <p className="text-gray-700 dark:text-gray-300">{news.excerpt}</p>
                  </div>
                )}
              </div>

              <div className="flex gap-2 ml-4">
                <button
                  onClick={() => router.push(`/admin/berita/edit/${news.slug}`)}
                  className="flex items-center gap-2 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-colors"
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  Hapus
                </button>
              </div>
            </div>
          </div>

          {/* Content Card */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            {/* Featured Image */}
            {news.thumbnail && (
              <div className="mb-6">
                <Image
                  src={news.thumbnail}
                  alt={news.title}
                  width={800}
                  height={400}
                  className="w-full h-64 md:h-80 object-cover rounded-lg border border-gray-200 dark:border-gray-600"
                />
              </div>
            )}

            {/* Content */}
            <div className="prose prose-lg max-w-none dark:prose-invert">
              <div className="text-gray-900 dark:text-gray-100 leading-relaxed whitespace-pre-line">
                {news.content}
              </div>
            </div>

            {/* Metadata Footer */}
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-600">
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

          {/* Actions */}
          <div className="mt-6 text-center">
            <button
              onClick={() => router.push('/admin/berita')}
              className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
            >
              Kembali ke Daftar Berita
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
