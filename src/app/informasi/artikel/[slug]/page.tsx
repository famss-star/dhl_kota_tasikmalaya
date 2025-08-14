'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string | null; // Ubah dari thumbnail ke featuredImage
  tags?: string[];
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  author: {
    id: string;
    name: string;
  };
  category: {
    id: string;
    name: string;
    slug: string;
  };
}

export default function ArtikelDetail() {
  const params = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (params.slug) {
      fetchArticle(params.slug as string);
    }
  }, [params.slug]);

  const fetchArticle = async (slug: string) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/articles/${slug}`);
      if (!response.ok) {
        throw new Error('Artikel tidak ditemukan');
      }
      const data = await response.json();
      
      // Cek response structure dan artikel published
      if (!data.success || !data.data) {
        throw new Error('Artikel tidak ditemukan');
      }
      
      if (!data.data.isPublished) {
        throw new Error('Artikel tidak tersedia');
      }
      
      setArticle(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">Memuat artikel...</p>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Artikel Tidak Ditemukan
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            {error || 'Artikel yang Anda cari tidak tersedia'}
          </p>
          <Link
            href="/informasi/artikel"
            className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Kembali ke Artikel
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Breadcrumb */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300">
              Beranda
            </Link>
            <span className="text-gray-400">/</span>
            <Link href="/informasi/artikel" className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300">
              Artikel & Blog
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600 dark:text-gray-300 truncate max-w-xs">
              {article.title}
            </span>
          </nav>
        </div>
      </div>

      {/* Article Content */}
      <article className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Article Header */}
          <header className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-block bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-sm px-3 py-1 rounded-full">
                {article.category.name}
              </span>
              <span className="text-gray-500 dark:text-gray-400 text-sm">
                {formatDate(article.createdAt)}
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
              {article.title}
            </h1>
            
            {article.excerpt && (
              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                {article.excerpt}
              </p>
            )}
            
            <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
              <span>Oleh {article.author.name}</span>
              <span className="mx-2">•</span>
              <span>Diperbarui {formatDate(article.updatedAt)}</span>
            </div>
          </header>

          {/* Featured Image */}
          {article.featuredImage && (
            <div className="relative h-64 md:h-96 mb-8 rounded-xl overflow-hidden bg-gray-200 dark:bg-gray-700">
              <Image
                src={article.featuredImage}
                alt={article.title}
                fill
                className="object-cover"
                onError={(e) => {
                  console.log('Image failed to load:', article.featuredImage);
                  e.currentTarget.style.display = 'none';
                }}
                unoptimized={article.featuredImage?.startsWith('http')}
              />
            </div>
          )}

          {/* Article Body */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
            <div 
              className="prose prose-lg max-w-none dark:prose-invert prose-green prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-a:text-green-600 dark:prose-a:text-green-400 prose-strong:text-gray-900 dark:prose-strong:text-white"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
            
            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Tags:</h3>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="inline-block bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 text-sm px-3 py-1 rounded-full font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <Link
              href="/informasi/artikel"
              className="inline-flex items-center text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-medium transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Kembali ke Artikel & Blog
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
