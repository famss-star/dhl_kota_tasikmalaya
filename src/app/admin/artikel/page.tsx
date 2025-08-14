"use client";

import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, FileText, Eye, Loader2 } from "lucide-react";

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
    name: string;
  };
  category?: {
    name: string;
  };
}

export default function AdminArtikel() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch articles from database
  const fetchArticles = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/articles');
      const data = await response.json();
      
      if (data.success) {
        setArticles(data.data);
      } else {
        setError(data.error || 'Gagal mengambil data artikel');
      }
    } catch (err) {
      setError('Terjadi kesalahan saat mengambil data');
      console.error('Fetch articles error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Delete article
  const handleDelete = async (id: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus artikel ini?')) return;
    
    try {
      const response = await fetch(`/api/articles/${id}?admin=true`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        setArticles(articles.filter(article => article.id !== id));
        alert('Artikel berhasil dihapus');
      } else {
        alert('Gagal menghapus artikel');
      }
    } catch (err) {
      alert('Terjadi kesalahan saat menghapus artikel');
      console.error('Delete error:', err);
    }
  };

  // Toggle publish status
  const togglePublish = async (id: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/articles/${id}?admin=true`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          isPublished: !currentStatus
        })
      });
      
      if (response.ok) {
        setArticles(articles.map(article => 
          article.id === id 
            ? { ...article, isPublished: !currentStatus }
            : article
        ));
      }
    } catch (err) {
      console.error('Toggle publish error:', err);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-gradient-to-r from-pink-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-3">
              <FileText className="w-9 h-9 text-white" />
              Manajemen Artikel
            </h1>
            <p className="text-xl md:text-2xl opacity-90">Kelola data artikel untuk website DLH Kota Tasikmalaya</p>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-8xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 md:p-12 border border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
              <FileText className="w-7 h-7 text-pink-600 dark:text-pink-400" />
              Daftar Artikel ({articles.length})
            </h2>
            <button 
              onClick={() => window.location.href = '/admin/artikel/create'}
              className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
            >
              <Plus className="w-5 h-5" />
              Tambah Artikel
            </button>
          </div>
          
          {error && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}
          
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
              <span className="ml-2 text-gray-600 dark:text-gray-300">Memuat data artikel...</span>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-700">
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">Judul</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">Tanggal</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">Penulis</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">Tags</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">Aksi</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {articles.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                        Belum ada artikel yang tersedia
                      </td>
                    </tr>
                  ) : (
                    articles.map((article) => (
                      <tr key={article.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="px-4 py-3 font-medium text-gray-900 dark:text-white max-w-xs">
                          <div>
                            <div className="truncate">{article.title}</div>
                            {article.excerpt && (
                              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                                {article.excerpt}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                          <div className="text-sm">
                            {new Date(article.createdAt).toLocaleDateString('id-ID')}
                          </div>
                          <div className="text-xs text-gray-500">
                            {new Date(article.createdAt).toLocaleTimeString('id-ID', { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                          <div>{article.author.name}</div>
                          {article.category && (
                            <div className="text-xs text-gray-500">{article.category.name}</div>
                          )}
                        </td>
                        <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                          {article.tags && article.tags.length > 0 ? (
                            <div className="flex flex-wrap gap-1">
                              {article.tags.map((tag, index) => (
                                <span 
                                  key={index}
                                  className="inline-block bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 text-xs px-2 py-1 rounded-full"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <span className="text-xs text-gray-400 italic">Tidak ada tags</span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => togglePublish(article.id, article.isPublished)}
                            className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                              article.isPublished 
                                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 hover:bg-green-200' 
                                : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 hover:bg-yellow-200'
                            }`}
                          >
                            {article.isPublished ? 'Published' : 'Draft'}
                          </button>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            <button 
                              onClick={() => window.location.href = `/admin/artikel/view/${article.id}`}
                              className="inline-flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded transition text-xs"
                            >
                              <Eye className="w-4 h-4" /> 
                              Lihat
                            </button>
                            <button 
                              onClick={() => window.location.href = `/admin/artikel/edit/${article.id}`}
                              className="inline-flex items-center gap-1 bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded transition text-xs"
                            >
                              <Edit className="w-4 h-4" /> 
                              Edit
                            </button>
                            <button 
                              onClick={() => handleDelete(article.id)} 
                              className="inline-flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded transition text-xs"
                            >
                              <Trash2 className="w-4 h-4" /> 
                              Hapus
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
