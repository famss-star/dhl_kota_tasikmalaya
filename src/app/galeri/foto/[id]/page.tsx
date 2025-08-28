"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Calendar, FileImage, Eye, ArrowLeft, Share2, Download } from "lucide-react";
import Image from "next/image";

interface Photo {
  id: string;
  title: string;
  description: string;
  filename: string;
  filepath: string;
  filesize: number;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function PhotoDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [photo, setPhoto] = useState<Photo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    if (params.id) {
      fetchPhoto(params.id as string);
      setShareUrl(window.location.href);
    }
  }, [params.id]);

  const fetchPhoto = async (id: string) => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/gallery/photos/${id}`);
      const result = await response.json();
      
      if (result.success) {
        setPhoto(result.data);
      } else {
        console.error('Error fetching photo:', result.error);
        router.push('/galeri/foto');
      }
    } catch (error) {
      console.error("Error fetching photo:", error);
      router.push('/galeri/foto');
    } finally {
      setIsLoading(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleShare = async () => {
    if (navigator.share && photo) {
      try {
        await navigator.share({
          title: photo.title,
          text: photo.description,
          url: shareUrl,
        });
      } catch (error) {
        // Fallback to copying URL
        copyToClipboard();
      }
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      alert('Link berhasil disalin!');
    });
  };

  const handleDownload = () => {
    if (photo?.filepath) {
      const link = document.createElement('a');
      link.href = photo.filepath;
      link.download = photo.filename;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Memuat foto...</p>
        </div>
      </div>
    );
  }

  if (!photo) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <FileImage className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Foto Tidak Ditemukan
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Foto yang Anda cari tidak dapat ditemukan.
          </p>
          <button
            onClick={() => router.push('/galeri/foto')}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition"
          >
            Kembali ke Galeri
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Navigation */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition"
          >
            <ArrowLeft className="w-5 h-5" />
            Kembali
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Photo Display */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                <div className="relative aspect-video bg-gray-200 dark:bg-gray-700">
                  {!imageLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                    </div>
                  )}
                  <img
                    src={photo.filepath}
                    alt={photo.title}
                    className={`w-full h-full object-contain transition-opacity duration-300 ${
                      imageLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                    onLoad={() => setImageLoaded(true)}
                  />
                </div>
                
                {/* Action Buttons */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={handleShare}
                      className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                    >
                      <Share2 className="w-4 h-4" />
                      Bagikan
                    </button>
                    <button
                      onClick={handleDownload}
                      className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
                    >
                      <Download className="w-4 h-4" />
                      Unduh
                    </button>
                    <a
                      href={photo.filepath}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition"
                    >
                      <Eye className="w-4 h-4" />
                      Lihat Penuh
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Photo Info */}
            <div className="space-y-6">
              {/* Basic Info */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {photo.title}
                </h1>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Deskripsi
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {photo.description || 'Tidak ada deskripsi.'}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600 dark:text-gray-300">
                        Diunggah: {new Date(photo.createdAt).toLocaleDateString('id-ID', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <FileImage className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600 dark:text-gray-300">
                        Ukuran: {formatFileSize(photo.filesize)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <Eye className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600 dark:text-gray-300">
                        Status: {photo.isPublished ? 'Dipublikasikan' : 'Draft'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Technical Info */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Informasi Teknis
                </h3>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Nama File:</span>
                    <span className="text-gray-900 dark:text-white font-mono">
                      {photo.filename}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">ID Foto:</span>
                    <span className="text-gray-900 dark:text-white font-mono text-xs">
                      {photo.id}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Terakhir Diperbarui:</span>
                    <span className="text-gray-900 dark:text-white">
                      {new Date(photo.updatedAt).toLocaleDateString('id-ID')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Navigasi
                </h3>
                
                <div className="space-y-3">
                  <button
                    onClick={() => router.push('/galeri/foto')}
                    className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
                  >
                    Kembali ke Galeri Foto
                  </button>
                  
                  <button
                    onClick={() => router.push('/galeri/video')}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                  >
                    Lihat Galeri Video
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
