"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Edit, Trash2, Eye, Calendar, User, Tag, Globe } from "lucide-react";

interface Article {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage?: string;
  tags?: string[];
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  author: {
    id: string;
    name: string;
    email: string;
  };
  category: {
    id: string;
    name: string;
    slug: string;
    description: string;
    createdAt: string;
    updatedAt: string;
  };
}

export default function ViewArtikel() {
  const router = useRouter();
  const params = useParams();
  const articleId = params.id as string;
  
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch article data
  const fetchArticle = async () => {
    try {
      const response = await fetch(`/api/articles/${articleId}?admin=true`);
      const data = await response.json();
      
      if (response.ok && data.success) {
        setArticle(data.data);
      } else {
        alert('Artikel tidak ditemukan');
        router.push('/admin/artikel');
      }
    } catch (error) {
      console.error('Error fetching article:', error);
      alert('Gagal mengambil data artikel');
    } finally {
      setLoading(false);
    }
  };

  // Delete article
  const handleDelete = async () => {
    if (!confirm('Apakah Anda yakin ingin menghapus artikel ini?')) return;
    
    try {
      const response = await fetch(`/api/articles/${articleId}?admin=true`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        alert('Artikel berhasil dihapus');
        router.push('/admin/artikel');
      } else {
        alert('Gagal menghapus artikel');
      }
    } catch (err) {
      alert('Terjadi kesalahan saat menghapus artikel');
      console.error('Delete error:', err);
    }
  };

  useEffect(() => {
    if (articleId) {
      fetchArticle();
    }
  }, [articleId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Memuat data artikel...</p>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Artikel tidak ditemukan</h2>
          <button
            onClick={() => router.push('/admin/artikel')}
            className="text-purple-600 hover:text-purple-800 underline"
          >
            Kembali ke daftar artikel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-3">
              <Eye className="w-9 h-9 text-white" />
              Detail Artikel
            </h1>
            <p className="text-xl md:text-2xl opacity-90">Preview artikel untuk website DLH</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
          {/* Header */}
          <div className="p-8 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => router.back()}
                className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                Kembali
              </button>
              
              <div className="flex gap-2">
                <button
                  onClick={() => router.push(`/admin/artikel/edit/${article.id}`)}
                  className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  Hapus
                </button>
              </div>
            </div>

            {/* Status Badge */}
            <div className="flex items-center gap-4 mb-4">
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                article.isPublished 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                  : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
              }`}>
                {article.isPublished ? 'Published' : 'Draft'}
              </span>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 rounded-full text-sm font-semibold">
                {article.category?.name || 'Tidak ada kategori'}
              </span>
            </div>

            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
              {article.title}
            </h2>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{article.author?.name || 'Admin'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(article.createdAt).toLocaleDateString('id-ID', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                <span>/{article.slug}</span>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          {article.featuredImage && (
            <div className="p-8 border-b border-gray-200 dark:border-gray-700">
              <img
                src={article.featuredImage}
                alt={article.title}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          )}

          {/* Excerpt */}
          {article.excerpt && (
            <div className="p-8 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Ringkasan</h3>
              <p className="text-gray-600 dark:text-gray-300 italic">
                {article.excerpt}
              </p>
            </div>
          )}

          {/* Content */}
          <div className="p-8 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Konten</h3>
            <div className="prose dark:prose-invert max-w-none">
              <div className="whitespace-pre-wrap text-gray-700 dark:text-gray-300 leading-relaxed">
                {article.content}
              </div>
            </div>
          </div>

          {/* Tags */}
          {article.tags && Array.isArray(article.tags) && article.tags.length > 0 && (
            <div className="p-8">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                <Tag className="w-5 h-5" />
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
