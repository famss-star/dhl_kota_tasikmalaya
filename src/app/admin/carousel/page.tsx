"use client";

import { useState, useEffect } from "react";
import {
  Plus,
  Edit,
  Trash2,
  Upload,
  Eye,
  EyeOff,
  Save,
  X,
  Image as ImageIcon,
} from "lucide-react";

interface CarouselItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  linkUrl?: string;
  linkText?: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function CarouselAdmin() {
  const [carouselItems, setCarouselItems] = useState<CarouselItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<CarouselItem | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
    imageUrl: "",
    linkUrl: "",
    linkText: "",
    order: 1,
    isActive: true,
  });

  useEffect(() => {
    // Mock data untuk demonstrasi UI
    const mockData: CarouselItem[] = [
      {
        id: "1",
        title: "Selamat Datang di DLH Kota Tasikmalaya",
        subtitle: "Dinas Lingkungan Hidup",
        description:
          "Melayani masyarakat dengan profesional dalam bidang lingkungan hidup",
        imageUrl: "/banner1.jpg",
        linkUrl: "/profil",
        linkText: "Lihat Profil",
        order: 1,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "2",
        title: "Perizinan Lingkungan Online",
        subtitle: "Layanan Digital",
        description:
          "Ajukan perizinan lingkungan secara online dengan mudah dan cepat",
        imageUrl: "/banner2.png",
        linkUrl: "/perizinan",
        linkText: "Ajukan Perizinan",
        order: 2,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "3",
        title: "Program Bank Sampah",
        subtitle: "Edukasi Lingkungan",
        description:
          "Mari bersama-sama menjaga lingkungan melalui program bank sampah",
        imageUrl: "/banner3.png",
        linkUrl: "/layanan",
        linkText: "Pelajari Lebih Lanjut",
        order: 3,
        isActive: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];

    setCarouselItems(mockData);
    setLoading(false);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulasi API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (editingItem) {
        // Update existing item
        setCarouselItems((prev) =>
          prev.map((item) =>
            item.id === editingItem.id
              ? { ...item, ...formData, updatedAt: new Date().toISOString() }
              : item
          )
        );
      } else {
        // Add new item
        const newItem: CarouselItem = {
          id: Date.now().toString(),
          ...formData,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        setCarouselItems((prev) => [...prev, newItem]);
      }

      setShowModal(false);
      setEditingItem(null);
      setFormData({
        title: "",
        subtitle: "",
        description: "",
        imageUrl: "",
        linkUrl: "",
        linkText: "",
        order: 1,
        isActive: true,
      });
    } catch (error) {
      console.error("Error saving carousel item:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item: CarouselItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      subtitle: item.subtitle,
      description: item.description,
      imageUrl: item.imageUrl,
      linkUrl: item.linkUrl || "",
      linkText: item.linkText || "",
      order: item.order,
      isActive: item.isActive,
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus item carousel ini?"))
      return;

    try {
      // Simulasi API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      setCarouselItems((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting carousel item:", error);
    }
  };

  const toggleActive = async (id: string, isActive: boolean) => {
    try {
      // Simulasi API call
      await new Promise((resolve) => setTimeout(resolve, 300));
      setCarouselItems((prev) =>
        prev.map((item) =>
          item.id === id
            ? {
                ...item,
                isActive: !isActive,
                updatedAt: new Date().toISOString(),
              }
            : item
        )
      );
    } catch (error) {
      console.error("Error toggling carousel item status:", error);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Simulasi upload - dalam implementasi nyata akan upload ke server
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setFormData((prev) => ({ ...prev, imageUrl: result }));
    };
    reader.readAsDataURL(file);
  };

  if (loading && carouselItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-emerald-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Memuat data carousel...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-3">
              <ImageIcon className="w-9 h-9 text-white" />
              Kelola Carousel Homepage
            </h1>
            <p className="text-xl md:text-2xl opacity-90">
              Atur banner dan slide utama website DLH Kota Tasikmalaya
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-8xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 md:p-12 border border-gray-200 dark:border-gray-700">
        {/* Toolbar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Daftar Carousel Items ({carouselItems.length})
          </h2>
          <button
            onClick={() => {
              setEditingItem(null);
              setFormData({
                title: "",
                subtitle: "",
                description: "",
                imageUrl: "",
                linkUrl: "",
                linkText: "",
                order: carouselItems.length + 1,
                isActive: true,
              });
              setShowModal(true);
            }}
            className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-green-700 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <Plus className="w-5 h-5" />
            Tambah Carousel
          </button>
        </div>

        {/* Carousel Items Grid */}
        {carouselItems.length === 0 ? (
          <div className="text-center py-12">
            <ImageIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Belum ada carousel item
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Mulai dengan menambahkan carousel item pertama untuk homepage
            </p>
            <button
              onClick={() => {
                setEditingItem(null);
                setFormData({
                  title: "",
                  subtitle: "",
                  description: "",
                  imageUrl: "",
                  linkUrl: "",
                  linkText: "",
                  order: 1,
                  isActive: true,
                });
                setShowModal(true);
              }}
              className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-green-700 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg mx-auto"
            >
              <Plus className="w-5 h-5" />
              Tambah Carousel Pertama
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {carouselItems
              .sort((a, b) => a.order - b.order)
              .map((item) => (
                <div
                  key={item.id}
                  className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 border border-gray-200 dark:border-gray-600"
                >
                  {/* Image Preview */}
                  <div className="relative mb-4">
                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-40 object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-full h-40 bg-gray-200 dark:bg-gray-600 rounded-lg flex items-center justify-center">
                        <ImageIcon className="w-12 h-12 text-gray-400" />
                      </div>
                    )}
                    <div className="absolute top-2 right-2 flex gap-2">
                      <button
                        onClick={() => toggleActive(item.id, item.isActive)}
                        className={`p-2 rounded-full ${
                          item.isActive
                            ? "bg-green-500 text-white"
                            : "bg-gray-500 text-white"
                        }`}
                      >
                        {item.isActive ? (
                          <Eye className="w-4 h-4" />
                        ) : (
                          <EyeOff className="w-4 h-4" />
                        )}
                      </button>
                      <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs">
                        #{item.order}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2 line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-blue-600 dark:text-blue-400 mb-1">
                    {item.subtitle}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                    {item.description}
                  </p>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center gap-2"
                    >
                      <Edit className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-200 flex items-center justify-center"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {editingItem ? "Edit Carousel Item" : "Tambah Carousel Item"}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Judul Utama
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Subtitle
                  </label>
                  <input
                    type="text"
                    value={formData.subtitle}
                    onChange={(e) =>
                      setFormData({ ...formData, subtitle: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Deskripsi
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        description: e.target.value,
                      })
                    }
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Gambar
                  </label>
                  <div className="space-y-4">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                    {formData.imageUrl && (
                      <img
                        src={formData.imageUrl}
                        alt="Preview"
                        className="w-full h-40 object-cover rounded-lg"
                      />
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Link URL (Opsional)
                  </label>
                  <input
                    type="url"
                    value={formData.linkUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, linkUrl: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Teks Link (Opsional)
                  </label>
                  <input
                    type="text"
                    value={formData.linkText}
                    onChange={(e) =>
                      setFormData({ ...formData, linkText: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Urutan
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.order}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        order: parseInt(e.target.value),
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.isActive}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          isActive: e.target.checked,
                        })
                      }
                      className="mr-2"
                    />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Tampilkan di website
                    </span>
                  </label>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-green-700 hover:to-blue-700 transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  {loading ? "Menyimpan..." : "Simpan"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
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
