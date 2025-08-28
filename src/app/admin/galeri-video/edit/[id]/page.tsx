"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Save, Video, ExternalLink, Eye, ChevronLeft } from "lucide-react";

export default function EditVideoPage() {
  const router = useRouter();
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    youtubeUrl: "",
    thumbnailUrl: "",
    duration: "",
    isPublished: true
  });
  const [videoPreview, setVideoPreview] = useState("");
  const [originalData, setOriginalData] = useState<any>(null);

  useEffect(() => {
    fetchVideoData();
  }, [params.id]);

  const fetchVideoData = async () => {
    try {
      const response = await fetch(`/api/gallery/videos/${params.id}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      
      console.log('API Response:', result); // Debug log
      
      if (result.success && result.data) {
        const video = result.data;
        console.log('Video data:', video); // Debug log
        setFormData({
          title: video.title || "",
          description: video.description || "",
          youtubeUrl: video.youtubeUrl || "",
          thumbnailUrl: video.thumbnailUrl || "",
          duration: video.duration || "",
          isPublished: video.isPublished || true
        });
        
        if (video.youtubeUrl) {
          const videoId = extractVideoId(video.youtubeUrl);
          if (videoId) {
            setVideoPreview(`https://www.youtube.com/embed/${videoId}`);
          }
        }
        
        setOriginalData(video);
      } else {
        console.error('API Error:', result.error || 'Unknown error');
        alert(`Error loading video data: ${result.error || 'Video not found'}`);
        router.back();
      }
    } catch (error) {
      console.error('Network Error loading video:', error);
      alert(`Error loading video data: ${error instanceof Error ? error.message : 'Network error'}`);
      router.back();
    } finally {
      setLoadingData(false);
    }
  };

  const extractVideoId = (url: string | null | undefined) => {
    if (!url || typeof url !== 'string') {
      return null;
    }
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const handleYouTubeUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setFormData({ ...formData, youtubeUrl: url });
    
    if (url) {
      const videoId = extractVideoId(url);
      if (videoId) {
        const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
        setFormData({
          ...formData,
          youtubeUrl: url,
          thumbnailUrl: thumbnailUrl
        });
        setVideoPreview(`https://www.youtube.com/embed/${videoId}`);
      } else {
        setVideoPreview("");
      }
    } else {
      setVideoPreview("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.youtubeUrl) {
      alert('Please enter a YouTube URL');
      return;
    }

    if (!extractVideoId(formData.youtubeUrl)) {
      alert('Please enter a valid YouTube URL');
      return;
    }

    try {
      setIsLoading(true);
      
      const response = await fetch(`/api/gallery/videos/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      
      if (result.success) {
        alert('Video berhasil diperbarui!');
        router.push('/admin/galeri-video');
      } else {
        alert('Error updating video: ' + result.error);
      }
    } catch (error) {
      console.error('Error updating video:', error);
      alert('Error updating video');
    } finally {
      setIsLoading(false);
    }
  };

  if (loadingData) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Memuat data video...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-3">
              <Video className="w-9 h-9 text-white" />
              Edit Video
            </h1>
            <p className="text-xl md:text-2xl opacity-90">
              Perbarui informasi video galeri DLH Kota Tasikmalaya
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="container mx-auto py-8">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            Kembali
          </button>
          
          <button
            onClick={() => router.push(`/galeri/video/${params.id}`)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <Eye className="w-4 h-4" />
            Lihat Detail
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Form Fields */}
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Informasi Video
                </h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Judul Video *
                      </label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                        placeholder="Masukkan judul video"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        URL YouTube *
                      </label>
                      <input
                        type="url"
                        value={formData.youtubeUrl}
                        onChange={handleYouTubeUrlChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                        placeholder="https://www.youtube.com/watch?v=..."
                        required
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Masukkan URL video YouTube. Thumbnail akan otomatis ter-generate.
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Deskripsi
                      </label>
                      <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                        placeholder="Masukkan deskripsi video (opsional)"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Durasi (opsional)
                      </label>
                      <input
                        type="text"
                        value={formData.duration}
                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                        placeholder="contoh: 5:30"
                      />
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
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                  <div className="flex gap-4">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition font-semibold"
                    >
                      <Save className="w-5 h-5" />
                      {isLoading ? 'Menyimpan...' : 'Simpan Perubahan'}
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => router.back()}
                      className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition font-semibold"
                    >
                      Batal
                    </button>
                  </div>
                </div>
              </div>

              {/* Preview */}
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Preview Video
                  </h2>
                  
                  <div className="aspect-video bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                    {videoPreview ? (
                      <iframe
                        src={videoPreview}
                        title="Video Preview"
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
                            Masukkan URL YouTube untuk melihat preview
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {videoPreview && formData.youtubeUrl && (
                    <div className="mt-4">
                      <a
                        href={formData.youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Buka di YouTube
                      </a>
                    </div>
                  )}
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Informasi Video
                  </h3>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">URL:</span>
                      <span className="text-gray-900 dark:text-white font-mono text-xs break-all">
                        {formData.youtubeUrl}
                      </span>
                    </div>
                    
                    {formData.duration && (
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Durasi:</span>
                        <span className="text-gray-900 dark:text-white">
                          {formData.duration}
                        </span>
                      </div>
                    )}
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Status:</span>
                      <span className={`font-medium ${
                        formData.isPublished 
                          ? 'text-green-600 dark:text-green-400' 
                          : 'text-yellow-600 dark:text-yellow-400'
                      }`}>
                        {formData.isPublished ? 'Dipublikasikan' : 'Draft'}
                      </span>
                    </div>

                    {originalData && (
                      <div className="pt-2 border-t border-gray-200 dark:border-gray-600 mt-4">
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Dibuat:</span>
                          <span className="text-gray-900 dark:text-white">
                            {new Date(originalData.createdAt).toLocaleDateString('id-ID')}
                          </span>
                        </div>
                        
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Diperbarui:</span>
                          <span className="text-gray-900 dark:text-white">
                            {new Date(originalData.updatedAt).toLocaleDateString('id-ID')}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
