"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Plus, Edit, Trash2, Image, Upload, X, Save, Eye, FileImage } from "lucide-react";

interface GalleryItem {
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

export default function GaleriPage() {
  const router = useRouter();
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    filename: "",
    filepath: "",
    filesize: 0,
    isPublished: true
  });

  useEffect(() => {
    fetchGalleryItems();
  }, []);

  const fetchGalleryItems = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/gallery/photos');
      const result = await response.json();
      
      if (result.success) {
        setGalleryItems(result.data);
      } else {
        console.error('Error fetching gallery items:', result.error);
      }
    } catch (error) {
      console.error("Error fetching gallery items:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingFile(true);
      const uploadFormData = new FormData();
      uploadFormData.append('image', file);
      uploadFormData.append('type', 'gallery');

      const response = await fetch('/api/upload/image', {
        method: 'POST',
        body: uploadFormData,
      });

      const result = await response.json();
      
      if (result.success) {
        setFormData(prev => ({
          ...prev,
          filename: result.data.fileName,
          filepath: result.data.url,
          filesize: result.data.size
        }));
      } else {
        alert('Error uploading file: ' + result.error);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file');
    } finally {
      setUploadingFile(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      
      if (editingItem) {
        // Update existing photo
        const response = await fetch(`/api/gallery/photos/${editingItem.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: formData.title,
            description: formData.description,
            isPublished: formData.isPublished
          }),
        });

        const result = await response.json();
        if (!result.success) {
          throw new Error(result.error);
        }
      } else {
        // Create new photo
        if (!formData.filepath) {
          alert('Please upload an image first');
          return;
        }

        const response = await fetch('/api/gallery/photos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
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
        filename: "", 
        filepath: "", 
        filesize: 0, 
        isPublished: true 
      });
      fetchGalleryItems();
    } catch (error) {
      console.error("Error saving gallery item:", error);
      alert('Error saving photo: ' + error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (item: GalleryItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      description: item.description,
      filename: item.filename,
      filepath: item.filepath,
      filesize: item.filesize,
      isPublished: item.isPublished
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus foto ini?")) {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/gallery/photos/${id}`, {
          method: 'DELETE',
        });

        const result = await response.json();
        if (result.success) {
          fetchGalleryItems();
        } else {
          alert('Error deleting photo: ' + result.error);
        }
      } catch (error) {
        console.error("Error deleting gallery item:", error);
        alert('Error deleting photo');
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
      filename: "", 
      filepath: "", 
      filesize: 0, 
      isPublished: true 
    });
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-3">
              <FileImage className="w-9 h-9 text-white" />
              Galeri Foto
            </h1>
            <p className="text-xl md:text-2xl opacity-90">
              Kelola galeri foto kegiatan DLH Kota Tasikmalaya
            </p>
          </div>
        </div>
      </div>
      
      {/* Controls */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <button
            onClick={() => router.push('/admin/galeri/create')}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
            disabled={isLoading}
          >
            <Plus className="w-4 h-4" />
            Tambah Foto
          </button>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
            <p className="text-gray-600 dark:text-gray-300 mt-2">Loading...</p>
          </div>
        )}

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 group"
            >
              <div className="aspect-square relative overflow-hidden bg-gray-200 dark:bg-gray-700">
                {item.filepath ? (
                  <img
                    src={item.filepath}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Image className="w-12 h-12 text-gray-400" />
                  </div>
                )}
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="flex gap-2">
                    <button
                      onClick={() => router.push(`/admin/galeri/view/${item.id}`)}
                      className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-full transition"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => router.push(`/admin/galeri/edit/${item.id}`)}
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

        {galleryItems.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <Image className="w-24 h-24 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400">
              Belum ada foto di galeri
            </p>
          </div>
        )}

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {editingItem ? "Edit Foto" : "Tambah Foto"}
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

                {!editingItem && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Upload Foto
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                      required
                    />
                    {uploadingFile && (
                      <p className="text-sm text-blue-600 mt-1">Uploading...</p>
                    )}
                    {formData.filepath && (
                      <div className="mt-2">
                        <img
                          src={formData.filepath}
                          alt="Preview"
                          className="w-full h-32 object-cover rounded-lg"
                        />
                      </div>
                    )}
                  </div>
                )}

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isPublished"
                    checked={formData.isPublished}
                    onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <label htmlFor="isPublished" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                    Publikasikan foto
                  </label>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={isLoading || uploadingFile}
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
    </div>
  );
}
