"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  ArrowLeft,
  Edit,
  Trash2,
  Download,
  Share,
  Calendar,
  FileText,
  Eye,
  EyeOff,
  ImageIcon,
  ChevronLeft,
} from "lucide-react";

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

export default function AdminPhotoViewPage() {
  const router = useRouter();
  const params = useParams();
  const [photo, setPhoto] = useState<Photo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchPhoto();
  }, [params.id]);

  const fetchPhoto = async () => {
    try {
      const response = await fetch(`/api/gallery/photos/${params.id}`);
      const result = await response.json();

      if (result.success) {
        setPhoto(result.data);
      } else {
        alert("Error loading photo");
        router.back();
      }
    } catch (error) {
      console.error("Error loading photo:", error);
      alert("Error loading photo");
      router.back();
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!photo) return;

    if (!confirm(`Apakah Anda yakin ingin menghapus foto "${photo.title}"?`)) {
      return;
    }

    try {
      setIsDeleting(true);
      const response = await fetch(`/api/gallery/photos/${photo.id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (result.success) {
        alert("Foto berhasil dihapus!");
        router.push("/admin/galeri");
      } else {
        alert("Error deleting photo: " + result.error);
      }
    } catch (error) {
      console.error("Error deleting photo:", error);
      alert("Error deleting photo");
    } finally {
      setIsDeleting(false);
    }
  };

  const togglePublishStatus = async () => {
    if (!photo) return;

    try {
      const response = await fetch(`/api/gallery/photos/${photo.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...photo,
          isPublished: !photo.isPublished,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setPhoto({ ...photo, isPublished: !photo.isPublished });
        alert(
          `Foto ${!photo.isPublished ? "dipublikasikan" : "disembunyikan"}!`
        );
      } else {
        alert("Error updating photo status");
      }
    } catch (error) {
      console.error("Error updating photo status:", error);
      alert("Error updating photo status");
    }
  };

  const handleDownload = () => {
    if (!photo) return;
    const link = document.createElement("a");
    link.href = photo.filepath;
    link.download = photo.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Memuat foto...</p>
        </div>
      </div>
    );
  }

  if (!photo) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <ImageIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">
            Foto tidak ditemukan
          </p>
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
              <Eye className="w-9 h-9 text-white" />
              Detail Foto
            </h1>
            <p className="text-xl md:text-2xl opacity-90">
              Preview foto untuk website DLH
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
                photo.isPublished
                  ? "bg-yellow-600 hover:bg-yellow-700 text-white"
                  : "bg-green-600 hover:bg-green-700 text-white"
              }`}
            >
              {photo.isPublished ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
              {photo.isPublished ? "Sembunyikan" : "Publikasikan"}
            </button>
            <button
              onClick={() => router.push(`/admin/galeri/edit/${photo.id}`)}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Edit className="w-4 h-4" />
              Edit
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              {isDeleting ? "Menghapus..." : "Hapus"}
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Photo Display */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <div className="aspect-square bg-gray-100 dark:bg-gray-700">
                <img
                  src={photo.filepath}
                  alt={photo.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Quick Actions */}
              <div className="p-4 border-t border-gray-200 dark:border-gray-600">
                <div className="flex gap-3">
                  <button
                    onClick={handleDownload}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </button>

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      alert("Link berhasil disalin!");
                    }}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                  >
                    <Share className="w-4 h-4" />
                    Copy Link
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Photo Information */}
          <div className="space-y-6">
            {/* Basic Info */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Informasi Foto
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                    Judul
                  </label>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {photo.title}
                  </p>
                </div>

                {photo.description && (
                  <div>
                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                      Deskripsi
                    </label>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {photo.description}
                    </p>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                    Status
                  </label>
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      photo.isPublished
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                    }`}
                  >
                    {photo.isPublished ? "Dipublikasikan" : "Draft"}
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
                  <span className="text-gray-900 dark:text-white font-mono">
                    {photo.id}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Nama File:
                  </span>
                  <span className="text-gray-900 dark:text-white font-mono break-all">
                    {photo.filename}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Ukuran File:
                  </span>
                  <span className="text-gray-900 dark:text-white">
                    {(photo.filesize / 1024 / 1024).toFixed(2)} MB
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Path:
                  </span>
                  <span className="text-gray-900 dark:text-white font-mono text-xs break-all">
                    {photo.filepath}
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
                      {new Date(photo.createdAt).toLocaleDateString("id-ID", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
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
                      {new Date(photo.updatedAt).toLocaleDateString("id-ID", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
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
