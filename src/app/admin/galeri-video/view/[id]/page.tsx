"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Edit, Trash2, Share, Calendar, FileText, Eye, EyeOff, Video, ExternalLink, Play, ChevronLeft } from "lucide-react";

interface VideoItem {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnail: string;
  duration: number;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function AdminVideoViewPage() {
  const router = useRouter();
  const params = useParams();
  const [video, setVideo] = useState<VideoItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchVideo();
  }, [params.id]);

  const fetchVideo = async () => {
    try {
      const response = await fetch(`/api/gallery/videos/${params.id}`);
      const result = await response.json();
      
      if (result.success) {
        setVideo(result.data);
      } else {
        alert('Error loading video');
        router.back();
      }
    } catch (error) {
      console.error('Error loading video:', error);
      alert('Error loading video');
      router.back();
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!video) return;
    
    if (!confirm(`Apakah Anda yakin ingin menghapus video "${video.title}"?`)) {
      return;
    }

    try {
      setIsDeleting(true);
      const response = await fetch(`/api/gallery/videos/${video.id}`, {
        method: 'DELETE',
      });

      const result = await response.json();
      
      if (result.success) {
        alert('Video berhasil dihapus!');
        router.push('/admin/galeri-video');
      } else {
        alert('Error deleting video: ' + result.error);
      }
    } catch (error) {
      console.error('Error deleting video:', error);
      alert('Error deleting video');
    } finally {
      setIsDeleting(false);
    }
  };

  const togglePublishStatus = async () => {
    if (!video) return;

    try {
      const response = await fetch(`/api/gallery/videos/${video.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...video,
          isPublished: !video.isPublished
        }),
      });

      const result = await response.json();
      
      if (result.success) {
        setVideo({ ...video, isPublished: !video.isPublished });
        alert(`Video ${!video.isPublished ? 'dipublikasikan' : 'disembunyikan'}!`);
      } else {
        alert('Error updating video status');
      }
    } catch (error) {
      console.error('Error updating video status:', error);
      alert('Error updating video status');
    }
  };

  const extractVideoId = (url: string | null | undefined) => {
    if (!url || typeof url !== 'string') return null;
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const getEmbedUrl = (url: string | null | undefined) => {
    if (!url) return null;
    const videoId = extractVideoId(url);
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Memuat video...</p>
        </div>
      </div>
    );
  }

  if (!video) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Video className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Video tidak ditemukan</p>
        </div>
      </div>
    );
  }

  const embedUrl = getEmbedUrl(video.videoUrl);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-3">
              <Eye className="w-9 h-9 text-white" />
              Detail Video
            </h1>
            <p className="text-xl md:text-2xl opacity-90">
              Preview video untuk website DLH
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="container mx-auto py-8">
        <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4 flex items-center justify-between mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            Kembali
          </button>

          <div className="flex gap-2">
            
            <button
              onClick={togglePublishStatus}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                video.isPublished 
                  ? 'bg-yellow-600 hover:bg-yellow-700 text-white' 
                  : 'bg-green-600 hover:bg-green-700 text-white'
              }`}
            >
              {video.isPublished ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              {video.isPublished ? 'Sembunyikan' : 'Publikasikan'}
            </button>
            
            <button
              onClick={() => router.push(`/admin/galeri-video/edit/${video.id}`)}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Edit className="w-4 h-4" />
              Edit
            </button>
            
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              {isDeleting ? 'Menghapus...' : 'Hapus'}
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Video Display */}
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                <div className="aspect-video bg-gray-100 dark:bg-gray-700">
                  {embedUrl ? (
                    <iframe
                      src={embedUrl}
                      title={video.title}
                      className="w-full h-full"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center">
                        <Video className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                        <p className="text-gray-500 dark:text-gray-400">
                          Video tidak dapat dimuat
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Quick Actions */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-600">
                  <div className="flex gap-3">
                    <a
                      href={video.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Buka di YouTube
                    </a>
                    
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(window.location.href);
                        alert('Link berhasil disalin!');
                      }}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                    >
                      <Share className="w-4 h-4" />
                      Copy Link
                    </button>
                  </div>
                </div>
              </div>

              {/* Thumbnail */}
              {video.thumbnail && (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Thumbnail
                  </h3>
                  <div className="aspect-video bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                    <img
                      src={video.thumbnail}
                      alt={`${video.title} thumbnail`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Video Information */}
            <div className="space-y-6">
              {/* Basic Info */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Informasi Video
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                      Judul
                    </label>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      {video.title}
                    </p>
                  </div>
                  
                  {video.description && (
                    <div>
                      <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                        Deskripsi
                      </label>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {video.description}
                      </p>
                    </div>
                  )}
                  
                  {video.duration && (
                    <div>
                      <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                        Durasi
                      </label>
                      <p className="text-gray-900 dark:text-white">
                        {typeof video.duration === 'number' 
                          ? `${Math.floor(video.duration / 60)}:${(video.duration % 60).toString().padStart(2, '0')}`
                          : video.duration
                        }
                      </p>
                    </div>
                  )}
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                      Status
                    </label>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      video.isPublished 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    }`}>
                      {video.isPublished ? 'Dipublikasikan' : 'Draft'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Technical Info */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Informasi Teknis
                </h3>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">ID:</span>
                    <span className="text-gray-900 dark:text-white font-mono">{video.id}</span>
                  </div>
                  
                  <div className="flex justify-between items-start">
                    <span className="text-gray-600 dark:text-gray-400">YouTube URL:</span>
                    <a 
                      href={video.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 font-mono text-xs break-all text-right max-w-xs"
                    >
                      {video.videoUrl}
                    </a>
                  </div>
                  
                  {video.thumbnail && (
                    <div className="flex justify-between items-start">
                      <span className="text-gray-600 dark:text-gray-400">Thumbnail URL:</span>
                      <span className="text-gray-900 dark:text-white font-mono text-xs break-all text-right max-w-xs">
                        {video.thumbnail}
                      </span>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Video ID:</span>
                    <span className="text-gray-900 dark:text-white font-mono">
                      {extractVideoId(video.videoUrl) || 'N/A'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Timeline
                </h3>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        Dibuat
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {new Date(video.createdAt).toLocaleDateString('id-ID', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        Terakhir Diperbarui
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {new Date(video.updatedAt).toLocaleDateString('id-ID', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
