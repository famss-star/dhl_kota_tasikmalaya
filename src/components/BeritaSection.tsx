"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  featuredImage?: string;
  isPublished: boolean;
  publishedAt?: string;
  createdAt: string;
  author: {
    id: string;
    name: string;
    email: string;
  };
  category: {
    id: string;
    name: string;
    slug: string;
  };
}

interface News {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  thumbnail?: string;
  isPublished: boolean;
  publishedAt?: string;
  createdAt: string;
  author: {
    id: string;
    name: string;
    email: string;
  };
}

export default function BeritaSection() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch articles
      const articlesResponse = await fetch('/api/articles?published=true&limit=3');
      const articlesData = await articlesResponse.json();
      
      // Fetch news
      const newsResponse = await fetch('/api/news?published=true&limit=4');
      const newsData = await newsResponse.json();
      
      if (articlesData.success) {
        setArticles(articlesData.data);
      }
      
      if (newsData.success) {
        setNews(newsData.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };
 return (
 <div className="relative mb-16 z-10">
			<div className="max-w-6xl mx-auto px-4">
				<div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-6">
					<div className="flex items-center justify-between mb-4">
						<h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center">
							<svg className="w-6 h-6 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
							</svg>
							Berita Terbaru
						</h2>
						<Link href="/informasi/berita" className="text-green-600 hover:text-green-700 font-medium text-sm flex items-center">
							Lihat Semua
							<svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
							</svg>
						</Link>
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
						{/* Kolom utama berita */}
						<div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
							{loading ? (
								// Loading skeleton
								Array.from({ length: 4 }).map((_, index) => (
									<div key={index} className="animate-pulse">
										<div className="bg-gray-200 dark:bg-gray-600 rounded-lg aspect-[16/9] mb-3"></div>
										<div className="h-4 bg-gray-200 dark:bg-gray-600 rounded mb-2"></div>
										<div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-1/3"></div>
									</div>
								))
							) : news.length > 0 ? (
								news.slice(0, 4).map((item) => (
									<Link key={item.id} href={`/informasi/berita/${item.slug}`} className="group cursor-pointer">
										<div className="bg-gray-100 dark:bg-gray-700 rounded-lg aspect-[16/9] mb-3 relative overflow-hidden">
											{item.thumbnail ? (
												<Image
													src={item.thumbnail}
													alt={item.title}
													fill
													sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
													className="object-cover transition-transform group-hover:scale-105"
												/>
											) : (
												<div className="w-full h-full bg-gradient-to-br from-blue-100 to-green-100 dark:from-blue-900 dark:to-green-900 flex items-center justify-center">
													<svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
														<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
													</svg>
												</div>
											)}
											<div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
											<div className="absolute bottom-2 left-2">
												<span className="text-xs text-white bg-green-600 px-2 py-1 rounded">Berita</span>
											</div>
										</div>
										<h3 className="font-medium text-gray-800 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-300 transition-colors line-clamp-2">
											{item.title}
										</h3>
										<p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
											{formatDate(item.publishedAt || item.createdAt)}
										</p>
									</Link>
								))
							) : (
								// Empty state
								<div className="col-span-2 text-center py-8">
									<p className="text-gray-500 dark:text-gray-400">Belum ada berita yang dipublikasikan</p>
								</div>
							)}
						</div>

						{/* Sidebar: artikel & berita singkat */}
						<div className="flex flex-col gap-4 h-full min-h-[400px]">
							{/* Artikel */}
							<div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 flex-1 flex flex-col">
								<h3 className="font-semibold text-gray-800 dark:text-white text-sm mb-3">Artikel</h3>
								<div className="space-y-3 overflow-y-auto max-h-56">
									{loading ? (
										// Loading skeleton for articles
										Array.from({ length: 3 }).map((_, idx) => (
											<div key={idx} className="animate-pulse flex gap-3">
												<div className="w-16 h-12 bg-gray-300 dark:bg-gray-600 rounded"></div>
												<div className="flex-1">
													<div className="h-3 bg-gray-300 dark:bg-gray-600 rounded mb-1"></div>
													<div className="h-2 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
												</div>
											</div>
										))
									) : articles.length > 0 ? (
										articles.map((article) => (
											<Link key={article.id} href={`/informasi/artikel/${article.slug}`} className="group cursor-pointer flex gap-3">
												<div className="w-16 h-12 bg-gray-300 dark:bg-gray-600 rounded overflow-hidden flex-shrink-0">
													{article.featuredImage ? (
														<Image
															src={article.featuredImage}
															alt={article.title}
															width={64}
															height={48}
															className="w-full h-full object-cover"
														/>
													) : (
														<div className="w-full h-full bg-gradient-to-br from-blue-100 to-green-100 dark:from-blue-900 dark:to-green-900 flex items-center justify-center">
															<svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
																<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
															</svg>
														</div>
													)}
												</div>
												<div className="flex-1 min-w-0">
													<h4 className="text-xs font-medium text-gray-800 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-300 transition line-clamp-2">
														{article.title}
													</h4>
													<p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
														{formatDate(article.publishedAt || article.createdAt)}
													</p>
												</div>
											</Link>
										))
									) : (
										<p className="text-xs text-gray-500 dark:text-gray-400 text-center py-4">
											Belum ada artikel
										</p>
									)}
								</div>
								<Link href="/informasi/artikel" className="block text-center text-xs text-green-600 mt-3 pt-2 border-t border-gray-300 dark:border-gray-600 font-medium hover:text-green-700 transition-colors">
									Lihat Semua Artikel
								</Link>
							</div>

							{/* Berita Singkat */}
							<div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 flex-1 flex flex-col">
								<h3 className="font-semibold text-gray-800 dark:text-white text-sm mb-3">Berita Terbaru</h3>
								<div className="space-y-3 overflow-y-auto max-h-56">
									{loading ? (
										// Loading skeleton for news
										Array.from({ length: 3 }).map((_, idx) => (
											<div key={idx} className="animate-pulse flex gap-3">
												<div className="w-16 h-12 bg-gray-300 dark:bg-gray-600 rounded"></div>
												<div className="flex-1">
													<div className="h-3 bg-gray-300 dark:bg-gray-600 rounded mb-1"></div>
													<div className="h-2 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
												</div>
											</div>
										))
									) : news.length > 0 ? (
										news.slice(0, 3).map((newsItem) => (
											<Link key={newsItem.id} href={`/informasi/berita/${newsItem.slug}`} className="group cursor-pointer flex gap-3">
												<div className="w-16 h-12 bg-gray-300 dark:bg-gray-600 rounded overflow-hidden flex-shrink-0">
													{newsItem.thumbnail ? (
														<Image
															src={newsItem.thumbnail}
															alt={newsItem.title}
															width={64}
															height={48}
															className="w-full h-full object-cover"
														/>
													) : (
														<div className="w-full h-full bg-gradient-to-br from-blue-100 to-green-100 dark:from-blue-900 dark:to-green-900 flex items-center justify-center">
															<svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
																<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
															</svg>
														</div>
													)}
												</div>
												<div className="flex-1 min-w-0">
													<h4 className="text-xs font-medium text-gray-800 dark:text-white group-hover:text-green-600 transition line-clamp-2">
														{newsItem.title}
													</h4>
													<p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
														{formatDate(newsItem.publishedAt || newsItem.createdAt)}
													</p>
												</div>
											</Link>
										))
									) : (
										<p className="text-xs text-gray-500 dark:text-gray-400 text-center py-4">
											Belum ada berita
										</p>
									)}
								</div>
								<Link href="/informasi/berita" className="block text-center text-xs text-green-600 mt-3 pt-2 border-t border-gray-300 dark:border-gray-600 font-medium hover:text-green-700 transition-colors">
									Lihat Semua Berita
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
