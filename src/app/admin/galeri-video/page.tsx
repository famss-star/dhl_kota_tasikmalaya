"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Plus, Edit, Trash2, Video, Play, X, Save, Eye } from "lucide-react";

interface VideoItem {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnail: string | null;
  duration: number | null;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function GaleriVideoPage() {
  const router = useRouter();
  const [videoItems, setVideoItems] = useState<VideoItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<VideoItem | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadingThumbnail, setUploadingThumbnail] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    videoUrl: "",
    thumbnail: "",
    duration: 0,
    isPublished: true
  });

  useEffect(() => {
    fetchVideoItems();
  }, []);

  const fetchVideoItems = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/gallery/videos');
      const result = await response.json();
      
      if (result.success) {
        setVideoItems(result.data);
      } else {
        console.error('Error fetching video items:', result.error);
      }
    } catch (error) {
      console.error("Error fetching video items:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleThumbnailUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingThumbnail(true);
      const uploadFormData = new FormData();
      uploadFormData.append('image', file);
      uploadFormData.append('type', 'video-thumbnails');

      const response = await fetch('/api/upload/image', {
        method: 'POST',
        body: uploadFormData,
      });

      const result = await response.json();
      
      if (result.success) {
        setFormData(prev => ({
          ...prev,
          thumbnail: result.data.url
        }));
      } else {
        alert('Error uploading thumbnail: ' + result.error);
      }
    } catch (error) {
      console.error('Error uploading thumbnail:', error);
      alert('Error uploading thumbnail');
    } finally {
      setUploadingThumbnail(false);
    }
  };

  const extractYouTubeVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const getYouTubeThumbnail = (url: string) => {
    const videoId = extractYouTubeVideoId(url);
    return videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : null;
  };

  const parseDuration = (durationStr: string): number => {
    const parts = durationStr.split(':');
    if (parts.length === 2) {
      return parseInt(parts[0]) * 60 + parseInt(parts[1]);
    } else if (parts.length === 3) {
      return parseInt(parts[0]) * 3600 + parseInt(parts[1]) * 60 + parseInt(parts[2]);
    }
    return 0;
  };

  const formatDuration = (seconds: number): string => {
    if (seconds < 3600) {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    } else {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const remainingSeconds = seconds % 60;
      return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      
      // Auto-generate thumbnail if not provided and it's a YouTube video
      let finalThumbnail = formData.thumbnail;
      if (!finalThumbnail && formData.videoUrl) {
        const autoThumbnail = getYouTubeThumbnail(formData.videoUrl);
        if (autoThumbnail) {
          finalThumbnail = autoThumbnail;
        }
      }
      
      if (editingItem) {
        // Update existing video
        const response = await fetch(`/api/gallery/videos/${editingItem.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: formData.title,
            description: formData.description,
            videoUrl: formData.videoUrl,
            thumbnail: finalThumbnail,
            duration: formData.duration,
            isPublished: formData.isPublished
          }),
        });

        const result = await response.json();
        if (!result.success) {
          throw new Error(result.error);
        }
      } else {
        // Create new video
        if (!formData.videoUrl) {
          alert('Please provide a video URL');
          return;
        }

        const response = await fetch('/api/gallery/videos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...formData,
            thumbnail: finalThumbnail
          }),
        });

        const result = await response.json();
        if (!result.success) {
          throw new Error(result.error);
        }
      }
      
      setIsModalOpen(false);
      setEditingItem(null);
      setFormData({ 
        title: "", 
        description: "", 
        videoUrl: "", 
        thumbnail: "", 
        duration: 0, 
        isPublished: true 
      });
      fetchVideoItems();
    } catch (error) {
      console.error("Error saving video item:", error);
      alert('Error saving video: ' + error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (item: VideoItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      description: item.description,
      videoUrl: item.videoUrl,
      thumbnail: item.thumbnail || "",
      duration: item.duration || 0,
      isPublished: item.isPublished
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus video ini?")) {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/gallery/videos/${id}`, {
          method: 'DELETE',
        });

        const result = await response.json();
        if (result.success) {
          fetchVideoItems();
        } else {
          alert('Error deleting video: ' + result.error);
        }
      } catch (error) {
        console.error("Error deleting video item:", error);
        alert('Error deleting video');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const openCreateModal = () => {
    setEditingItem(null);
    setFormData({ 
      title: "", 
      description: "", 
      videoUrl: "", 
      thumbnail: "", 
      duration: 0, 
      isPublished: true 
    });
    setIsModalOpen(true);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Galeri Video
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Kelola galeri video kegiatan DLH Kota Tasikmalaya
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <button
          onClick={() => router.push('/admin/galeri-video/create')}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
          disabled={isLoading}
        >
          <Plus className="w-4 h-4" />
          Tambah Video
        </button>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
          <p className="text-gray-600 dark:text-gray-300 mt-2">Loading...</p>
        </div>
      )}

      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videoItems.map((item) => (
          <div
            key={item.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 group"
          >
            <div className="aspect-video relative overflow-hidden bg-gray-200 dark:bg-gray-700">
              {item.thumbnail ? (
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Video className="w-12 h-12 text-gray-400" />
                </div>
              )}
              
              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-3 rounded-full transition">
                  <Play className="w-6 h-6 ml-1" />
                </button>
              </div>
              
              {/* Duration */}
              {item.duration && (
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
                  {formatDuration(item.duration)}
                </div>
              )}
              
              {/* Action Overlay */}
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex gap-2">
                  <button
                    onClick={() => router.push(`/admin/galeri-video/view/${item.id}`)}
                    className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-full transition"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => router.push(`/admin/galeri-video/edit/${item.id}`)}
                    className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-full transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 line-clamp-2">
                {item.description}
              </p>
              <div className="flex justify-between items-center text-xs">
                <span className={`px-2 py-1 rounded ${
                  item.isPublished 
                    ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300' 
                    : 'bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-300'
                }`}>
                  {item.isPublished ? 'Published' : 'Draft'}
                </span>
                <span className="text-gray-500 dark:text-gray-400">
                  {new Date(item.createdAt).toLocaleDateString('id-ID')}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {videoItems.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <Video className="w-24 h-24 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400">
            Belum ada video di galeri
          </p>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                {editingItem ? "Edit Video" : "Tambah Video"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Judul
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Deskripsi
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  URL Video
                </label>
                <input
                  type="url"
                  value={formData.videoUrl}
                  onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                  placeholder="https://youtube.com/watch?v=..."
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Durasi (menit:detik, contoh: 5:30)
                </label>
                <input
                  type="text"
                  value={formData.duration ? formatDuration(formData.duration) : ''}
                  onChange={(e) => setFormData({ ...formData, duration: parseDuration(e.target.value) })}
                  placeholder="5:30"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Custom Thumbnail (Opsional)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleThumbnailUpload}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                />
                {uploadingThumbnail && (
                  <p className="text-sm text-blue-600 mt-1">Uploading thumbnail...</p>
                )}
                <p className="text-xs text-gray-500 mt-1">Jika kosong, akan menggunakan thumbnail YouTube otomatis</p>
                {formData.thumbnail && (
                  <div className="mt-2">
                    <img
                      src={formData.thumbnail}
                      alt="Thumbnail preview"
                      className="w-full h-24 object-cover rounded-lg"
                    />
                  </div>
                )}
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isPublished"
                  checked={formData.isPublished}
                  onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label htmlFor="isPublished" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                  Publikasikan video
                </label>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={isLoading || uploadingThumbnail}
                  className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition"
                >
                  <Save className="w-4 h-4" />
                  {isLoading ? 'Menyimpan...' : 'Simpan'}
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
