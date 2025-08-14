"use client";

import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Newspaper, Eye } from "lucide-react";
import { useRouter } from "next/navigation";

interface News {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  thumbnail?: string;
  isPublished: boolean;
  createdAt: string;
  author: {
    id: string;
    name: string;
    email: string;
  };
}

export default function AdminBerita() {
  const router = useRouter();
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  // Fetch news data
  const fetchNews = async () => {
    try {
      const response = await fetch(`/api/news?search=${search}`);
      const data = await response.json();
      
      if (data.success) {
        setNews(data.data);
      } else {
        console.error('Failed to fetch news:', data.error);
      }
    } catch (error) {
      console.error('Fetch news error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [search]);

  const handleDelete = async (id: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus berita ini?')) return;

    try {
      const response = await fetch(`/api/news/${id}`, {
        method: 'DELETE'
      });
      
      const data = await response.json();
      
      if (data.success) {
        alert('Berita berhasil dihapus!');
        fetchNews(); // Refresh data
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
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-gradient-to-r from-yellow-600 to-green-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-3">
              <Newspaper className="w-9 h-9 text-white" />
              Manajemen Berita
            </h1>
            <p className="text-xl md:text-2xl opacity-90">Kelola data berita untuk website DLH Kota Tasikmalaya</p>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-8xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 md:p-12 border border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
              <Newspaper className="w-6 h-6 text-yellow-600" />
              Daftar Berita
            </h2>
            <button
              onClick={() => router.push('/admin/berita/create')}
              className="flex items-center gap-2 bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
              Tambah Berita
            </button>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Cari berita..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          </div>

          {loading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-600"></div>
              <p className="mt-2 text-gray-600 dark:text-gray-400">Memuat berita...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow">
                <thead className="bg-yellow-50 dark:bg-yellow-900/20">
                  <tr>
                    <th className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">
                      Judul
                    </th>
                    <th className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">
                      Penulis
                    </th>
                    <th className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">
                      Tanggal
                    </th>
                    <th className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">
                      Status
                    </th>
                    <th className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center font-semibold text-gray-700 dark:text-gray-300">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {news.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="border border-gray-300 dark:border-gray-600 px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                        Belum ada berita
                      </td>
                    </tr>
                  ) : (
                    news.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-3">
                          <div>
                            <h3 className="font-medium text-gray-900 dark:text-white">{item.title}</h3>
                            {item.excerpt && (
                              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                                {item.excerpt}
                              </p>
                            )}
                          </div>
                        </td>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-gray-700 dark:text-gray-300">
                          {item.author.name}
                        </td>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-gray-700 dark:text-gray-300">
                          {formatDate(item.createdAt)}
                        </td>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-3">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            item.isPublished 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' 
                              : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                          }`}>
                            {item.isPublished ? 'Published' : 'Draft'}
                          </span>
                        </td>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => router.push(`/admin/berita/view/${item.slug}`)}
                              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                              title="Lihat"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => router.push(`/admin/berita/edit/${item.id}`)}
                              className="text-yellow-600 hover:text-yellow-800 dark:text-yellow-400 dark:hover:text-yellow-300"
                              title="Edit"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(item.id)}
                              className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                              title="Hapus"
                            >
                              <Trash2 className="w-4 h-4" />
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
