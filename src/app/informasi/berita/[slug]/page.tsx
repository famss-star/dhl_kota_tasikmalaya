"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Calendar, User, Eye, Share2, Loader2, ChevronLeft } from "lucide-react";

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

const BeritaDetailPage = () => {
  const params = useParams();
  const slug = params?.slug as string;
  
  const [news, setNews] = useState<News | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (slug) {
      fetchNewsDetail();
    }
  }, [slug]);

  const fetchNewsDetail = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`/api/news/${slug}`);
      const data = await response.json();
      
      if (data.success) {
        setNews(data.data);
      } else {
        setError(data.error || 'Berita tidak ditemukan');
      }
    } catch (error) {
      console.error('Fetch news detail error:', error);
      setError('Network error occurred');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatContent = (content: string) => {
    // Convert line breaks to paragraphs
    return content.split('\n').map((paragraph, index) => {
      if (paragraph.trim() === '') return null;
      return (
        <p key={index} className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed text-justify">
          {paragraph.trim()}
        </p>
      );
    }).filter(Boolean);
  };

  const handleShare = async () => {
    if (navigator.share && news) {
      try {
        await navigator.share({
          title: news.title,
          text: news.excerpt || '',
          url: window.location.href,
        });
      } catch (error) {
        console.log('Share canceled or failed');
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link berhasil disalin ke clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-300">Memuat berita...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-2">
              Oops! Ada Kesalahan
            </h2>
            <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
            <div className="space-y-2">
              <button
                onClick={fetchNewsDetail}
                className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Coba Lagi
              </button>
              <Link
                href="/informasi/berita"
                className="block w-full bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors text-center"
              >
                Kembali ke Daftar Berita
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!news) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
            Berita tidak ditemukan
          </h2>
          <Link
            href="/informasi/berita"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Kembali ke Daftar Berita
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 pt-6 pb-3">
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md p-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300">
              Beranda
            </Link>
            <span className="text-gray-400">/</span>
            <Link href="/informasi/berita" className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300">
              Berita
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600 dark:text-gray-300 truncate max-w-xs">
              {news.title}
            </span>
          </nav>
        </div>
      </div>

      {/* Navigation Bar - Floating/Sticky */}
      <div className="sticky top-20">
        <div className="container mx-auto px-4 py-3">
          <Link
            href="/informasi/berita"
            className="inline-flex items-center text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-medium transition-all duration-200 bg-white/80 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2 shadow-sm hover:shadow-md hover:scale-105"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Kembali ke Daftar Berita
          </Link>
        </div>
      </div>

      {/* Article Content */}
      <article className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Article Header */}
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            {news.title}
          </h1>
          
          {/* Article Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-6">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              <span>{formatDate(news.publishedAt || news.createdAt)}</span>
            </div>
            <div className="flex items-center">
              <User className="w-4 h-4 mr-2" />
              <span>Oleh: {news.author.name}</span>
            </div>
            <div className="flex items-center">
              <Eye className="w-4 h-4 mr-2" />
              <span>Dinas Lingkungan Hidup</span>
            </div>
          </div>

          {/* Share Button */}
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={handleShare}
              className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Bagikan
            </button>
          </div>

          {/* Featured Image */}
          {news.thumbnail && (
            <div className="mb-8">
              <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden shadow-lg">
                <Image
                  src={news.thumbnail}
                  alt={news.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          )}
        </header>

        {/* Article Body */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 md:p-8">
          {/* Excerpt */}
          {news.excerpt && (
            <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 mb-6">
              <p className="text-lg text-blue-900 dark:text-blue-100 font-medium italic">
                {news.excerpt}
              </p>
            </div>
          )}

          {/* Content */}
          <div className="prose prose-lg max-w-none dark:prose-invert">
            {formatContent(news.content)}
          </div>

          {/* Article Footer */}
          <footer className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                <p>Terakhir diperbarui: {formatDate(news.updatedAt)}</p>
                <p>Kategori: Berita Lingkungan Hidup</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleShare}
                  className="inline-flex items-center px-3 py-1.5 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-md transition-colors text-sm"
                >
                  <Share2 className="w-4 h-4 mr-1" />
                  Bagikan
                </button>
              </div>
            </div>
          </footer>
        </div>

        {/* Related Articles Section */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Berita Terkait
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <p className="text-gray-600 dark:text-gray-400 text-center py-8">
              Fitur berita terkait akan segera hadir.
            </p>
          </div>
        </section>
      </article>
    </div>
  );
};

export default BeritaDetailPage;
