"use client";

import React, { useState, useEffect } from "react";
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Save, 
  X, 
  Eye, 
  EyeOff,
  ExternalLink,
  Play,
  Image as ImageIcon,
  Video
} from "lucide-react";

interface SocialMediaCard {
  id: string;
  platform: "tiktok" | "instagram" | "youtube" | "facebook" | "twitter";
  title: string;
  url: string;
  thumbnailUrl?: string;
  description?: string;
  order: number;
  isActive: boolean;
  embedType: "video" | "post" | "reel";
}

export default function AdminSocialMediaGallery() {
  const [cards, setCards] = useState<SocialMediaCard[]>([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingCard, setEditingCard] = useState<SocialMediaCard | null>(null);
  const [formData, setFormData] = useState<{
    platform: "tiktok" | "instagram" | "youtube" | "facebook" | "twitter";
    title: string;
    url: string;
    thumbnailUrl: string;
    description: string;
    order: number;
    isActive: boolean;
    embedType: "video" | "post" | "reel";
  }>({
    platform: "tiktok",
    title: "",
    url: "",
    thumbnailUrl: "",
    description: "",
    order: 1,
    isActive: true,
    embedType: "video"
  });

  // Mock data for social media cards
  useEffect(() => {
    const mockCards: SocialMediaCard[] = [
      {
        id: "1",
        platform: "tiktok",
        title: "Video Tiktok DLH",
        url: "https://www.tiktok.com/@ceritasiaki/video/7514670466817068344",
        thumbnailUrl: "/foto/social-tiktok-thumb.jpg",
        description: "Video edukasi lingkungan terbaru",
        order: 1,
        isActive: true,
        embedType: "video"
      },
      {
        id: "2",
        platform: "instagram",
        title: "Instagram Reel DLH",
        url: "https://www.instagram.com/p/DMO7ayCu0Q4/",
        thumbnailUrl: "/foto/social-instagram-thumb.jpg",
        description: "Reel tentang program lingkungan",
        order: 2,
        isActive: true,
        embedType: "reel"
      },
      {
        id: "3",
        platform: "youtube",
        title: "YouTube DLH",
        url: "https://www.youtube.com/watch?v=SXySxLgCV-8",
        thumbnailUrl: "/foto/social-youtube-thumb.jpg",
        description: "Video dokumenter lingkungan",
        order: 3,
        isActive: true,
        embedType: "video"
      },
      {
        id: "4",
        platform: "facebook",
        title: "Facebook Post DLH",
        url: "https://www.facebook.com/dlhkotatasikmalaya/posts/123456789",
        thumbnailUrl: "/foto/social-facebook-thumb.jpg",
        description: "Update kegiatan terbaru",
        order: 4,
        isActive: false,
        embedType: "post"
      }
    ];

    setCards(mockCards);
  }, []);

  const handleEdit = (card: SocialMediaCard) => {
    setEditingCard(card);
    setFormData({
      platform: card.platform,
      title: card.title,
      url: card.url,
      thumbnailUrl: card.thumbnailUrl || "",
      description: card.description || "",
      order: card.order,
      isActive: card.isActive,
      embedType: card.embedType
    });
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditingCard(null);
    setFormData({
      platform: "tiktok",
      title: "",
      url: "",
      thumbnailUrl: "",
      description: "",
      order: cards.length + 1,
      isActive: true,
      embedType: "video"
    });
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (editingCard) {
        setCards(prev => prev.map(card => 
          card.id === editingCard.id 
            ? { ...card, ...formData }
            : card
        ));
      } else {
        const newCard: SocialMediaCard = {
          id: Date.now().toString(),
          ...formData
        };
        setCards(prev => [...prev, newCard]);
      }

      setShowModal(false);
      setEditingCard(null);
    } catch (error) {
      console.error('Error saving card:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus kartu ini?')) return;
    
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setCards(prev => prev.filter(card => card.id !== id));
    } catch (error) {
      console.error('Error deleting card:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Simulasi upload image
    const reader = new FileReader();
    reader.onload = (event) => {
      const imageUrl = event.target?.result as string;
      setFormData(prev => ({ ...prev, thumbnailUrl: imageUrl }));
    };
    reader.readAsDataURL(file);
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "tiktok":
        return "🎵";
      case "instagram":
        return "📷";
      case "youtube":
        return "🎥";
      case "facebook":
        return "👍";
      case "twitter":
        return "🐦";
      default:
        return "📱";
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case "tiktok":
        return "bg-pink-500";
      case "instagram":
        return "bg-purple-500";
      case "youtube":
        return "bg-red-500";
      case "facebook":
        return "bg-blue-500";
      case "twitter":
        return "bg-sky-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          Manajemen Social Media Gallery
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Kelola konten media sosial yang ditampilkan di homepage
        </p>
      </div>

      {/* Add Button */}
      <div className="mb-6">
        <button
          onClick={handleAdd}
          className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2"
        >
          <Plus size={20} />
          Tambah Konten
        </button>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => (
          <div key={card.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            {/* Thumbnail */}
            <div className="relative h-48 bg-gray-200 dark:bg-gray-700">
              {card.thumbnailUrl ? (
                <img 
                  src={card.thumbnailUrl} 
                  alt={card.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  {card.embedType === "video" ? (
                    <Video size={48} className="text-gray-400" />
                  ) : (
                    <ImageIcon size={48} className="text-gray-400" />
                  )}
                </div>
              )}
              
              {/* Platform Badge */}
              <div className={`absolute top-3 left-3 ${getPlatformColor(card.platform)} text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1`}>
                <span>{getPlatformIcon(card.platform)}</span>
                {card.platform.charAt(0).toUpperCase() + card.platform.slice(1)}
              </div>

              {/* Status Badge */}
              <div className="absolute top-3 right-3">
                {card.isActive ? (
                  <Eye size={18} className="text-green-500 bg-white rounded-full p-1" />
                ) : (
                  <EyeOff size={18} className="text-gray-400 bg-white rounded-full p-1" />
                )}
              </div>

              {/* Play Button for Videos */}
              {card.embedType === "video" && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-black bg-opacity-50 rounded-full p-3">
                    <Play size={24} className="text-white ml-1" />
                  </div>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-gray-800 dark:text-white text-sm">
                  {card.title}
                </h3>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  #{card.order}
                </span>
              </div>
              
              {card.description && (
                <p className="text-gray-600 dark:text-gray-400 text-xs mb-3 line-clamp-2">
                  {card.description}
                </p>
              )}

              <div className="flex items-center gap-2 mb-3">
                <a 
                  href={card.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-blue-500 hover:text-blue-600 text-xs"
                >
                  <ExternalLink size={12} />
                  Lihat Original
                </a>
                <span className="text-gray-300 dark:text-gray-600">•</span>
                <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                  {card.embedType}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(card)}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1"
                >
                  <Edit3 size={14} />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(card.id)}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1"
                >
                  <Trash2 size={14} />
                  Hapus
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                {editingCard ? "Edit Konten" : "Tambah Konten"}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Platform
                  </label>
                  <select
                    value={formData.platform}
                    onChange={(e) => setFormData(prev => ({ ...prev, platform: e.target.value as any }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="tiktok">TikTok</option>
                    <option value="instagram">Instagram</option>
                    <option value="youtube">YouTube</option>
                    <option value="facebook">Facebook</option>
                    <option value="twitter">Twitter</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Judul
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Contoh: Video Tiktok DLH"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    URL/Link
                  </label>
                  <input
                    type="url"
                    value={formData.url}
                    onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                    placeholder="https://..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Deskripsi (Opsional)
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Deskripsi singkat tentang konten"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Tipe Konten
                  </label>
                  <select
                    value={formData.embedType}
                    onChange={(e) => setFormData(prev => ({ ...prev, embedType: e.target.value as any }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="video">Video</option>
                    <option value="post">Post</option>
                    <option value="reel">Reel</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Thumbnail (Opsional)
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                  />
                  {formData.thumbnailUrl && (
                    <div className="mt-2">
                      <img 
                        src={formData.thumbnailUrl} 
                        alt="Preview" 
                        className="w-20 h-20 object-cover rounded-md"
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Urutan
                  </label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData(prev => ({ ...prev, order: parseInt(e.target.value) }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                    min="1"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={formData.isActive}
                    onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <label htmlFor="isActive" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                    Tampilkan di website
                  </label>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:from-gray-400 disabled:to-gray-500 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Save size={16} />
                  )}
                  {loading ? "Menyimpan..." : "Simpan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
