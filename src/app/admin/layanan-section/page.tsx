'use client';

import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Save, 
  X, 
  Eye, 
  EyeOff,
  Settings,
  Users,
  Building2,
  Globe,
  ArrowUpDown
} from 'lucide-react';

interface LayananCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  iconColor: string;
  bgColor: string;
  url: string;
  order: number;
  isActive: boolean;
  category: 'warga' | 'usaha' | 'umum';
}

interface LayananCategory {
  id: string;
  name: string;
  description: string;
  gradient: string;
  icon: string;
  order: number;
  isActive: boolean;
}

export default function AdminLayananSection() {
  const [activeTab, setActiveTab] = useState<'categories' | 'cards'>('categories');
  const [categories, setCategories] = useState<LayananCategory[]>([]);
  const [cards, setCards] = useState<LayananCard[]>([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<LayananCategory | LayananCard | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});

  // Mock data for categories
  useEffect(() => {
    const mockCategories: LayananCategory[] = [
      {
        id: '1',
        name: 'Untuk Warga',
        description: 'Layanan masyarakat umum',
        gradient: 'from-green-500 to-green-600',
        icon: 'users',
        order: 1,
        isActive: true
      },
      {
        id: '2', 
        name: 'Untuk Usaha',
        description: 'Perizinan dan layanan bisnis',
        gradient: 'from-blue-500 to-blue-600',
        icon: 'building',
        order: 2,
        isActive: true
      },
      {
        id: '3',
        name: 'Untuk Umum',
        description: 'Informasi dan layanan publik',
        gradient: 'from-purple-500 to-purple-600', 
        icon: 'globe',
        order: 3,
        isActive: true
      }
    ];

    const mockCards: LayananCard[] = [
      {
        id: '1',
        title: 'Pengaduan Lingkungan',
        description: 'Laporkan masalah lingkungan',
        icon: 'alert-triangle',
        iconColor: 'text-red-600 dark:text-red-400',
        bgColor: 'bg-red-100 dark:bg-red-900/50',
        url: '/pengaduan',
        order: 1,
        isActive: true,
        category: 'warga'
      },
      {
        id: '2',
        title: 'Edukasi Lingkungan', 
        description: 'Panduan dan tips ramah lingkungan',
        icon: 'book-open',
        iconColor: 'text-blue-600 dark:text-blue-400',
        bgColor: 'bg-blue-100 dark:bg-blue-900/50',
        url: '/informasi/edukasi',
        order: 2,
        isActive: true,
        category: 'warga'
      },
      {
        id: '3',
        title: 'Perizinan Lingkungan',
        description: 'Pengajuan izin usaha dan lingkungan',
        icon: 'file-text',
        iconColor: 'text-purple-600 dark:text-purple-400',
        bgColor: 'bg-purple-100 dark:bg-purple-900/50', 
        url: '/perizinan',
        order: 1,
        isActive: true,
        category: 'usaha'
      }
    ];

    setCategories(mockCategories);
    setCards(mockCards);
  }, []);

  const handleSave = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (activeTab === 'categories') {
        if (editingItem) {
          setCategories(prev => prev.map(item => 
            item.id === editingItem.id ? { ...item, ...formData } : item
          ));
        } else {
          const newCategory: LayananCategory = {
            id: Date.now().toString(),
            name: formData.name || '',
            description: formData.description || '',
            gradient: formData.gradient || 'from-gray-500 to-gray-600',
            icon: formData.icon || 'circle',
            order: formData.order || 1,
            isActive: formData.isActive ?? true
          };
          setCategories(prev => [...prev, newCategory]);
        }
      } else {
        if (editingItem) {
          setCards(prev => prev.map(item => 
            item.id === editingItem.id ? { ...item, ...formData } : item
          ));
        } else {
          const newCard: LayananCard = {
            id: Date.now().toString(),
            title: formData.title || '',
            description: formData.description || '',
            icon: formData.icon || 'circle',
            iconColor: formData.iconColor || 'text-gray-600',
            bgColor: formData.bgColor || 'bg-gray-100',
            url: formData.url || '#',
            order: formData.order || 1,
            isActive: formData.isActive ?? true,
            category: (formData.category as 'warga' | 'usaha' | 'umum') || 'warga'
          };
          setCards(prev => [...prev, newCard]);
        }
      }

      setShowModal(false);
      setEditingItem(null);
      setFormData({});
    } catch (error) {
      console.error('Error saving:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus item ini?')) return;
    
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (activeTab === 'categories') {
        setCategories(prev => prev.filter(item => item.id !== id));
      } else {
        setCards(prev => prev.filter(item => item.id !== id));
      }
    } catch (error) {
      console.error('Error deleting:', error);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (item?: LayananCategory | LayananCard) => {
    setEditingItem(item || null);
    setFormData(item || {});
    setShowModal(true);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Kelola Layanan Section
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Kelola kategori dan kartu layanan yang ditampilkan di halaman utama
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="mb-6">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('categories')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'categories'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              <Settings className="w-4 h-4 inline mr-2" />
              Kategori Layanan
            </button>
            <button
              onClick={() => setActiveTab('cards')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'cards'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              <Users className="w-4 h-4 inline mr-2" />
              Kartu Layanan
            </button>
          </nav>
        </div>
      </div>

      {/* Add Button */}
      <div className="mb-6">
        <button
          onClick={() => openModal()}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Tambah {activeTab === 'categories' ? 'Kategori' : 'Kartu'}
        </button>
      </div>

      {/* Content */}
      {activeTab === 'categories' ? (
        <div className="grid gap-4">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${category.gradient} flex items-center justify-center`}>
                    {category.icon === 'users' && <Users className="w-6 h-6 text-white" />}
                    {category.icon === 'building' && <Building2 className="w-6 h-6 text-white" />}
                    {category.icon === 'globe' && <Globe className="w-6 h-6 text-white" />}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {category.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {category.description}
                    </p>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                      <span>Urutan: {category.order}</span>
                      <span className={`px-2 py-1 rounded ${
                        category.isActive 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                      }`}>
                        {category.isActive ? 'Aktif' : 'Nonaktif'}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => openModal(category)}
                    className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(category.id)}
                    className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid gap-4">
          {cards.map((card) => (
            <div
              key={card.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-lg ${card.bgColor} flex items-center justify-center`}>
                    <div className={`w-6 h-6 ${card.iconColor}`}>📄</div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {card.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {card.description}
                    </p>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                      <span>Kategori: {card.category}</span>
                      <span>Urutan: {card.order}</span>
                      <span className={`px-2 py-1 rounded ${
                        card.isActive 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                      }`}>
                        {card.isActive ? 'Aktif' : 'Nonaktif'}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => openModal(card)}
                    className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(card.id)}
                    className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {editingItem ? 'Edit' : 'Tambah'} {activeTab === 'categories' ? 'Kategori' : 'Kartu'}
              </h3>

              <div className="space-y-4">
                {activeTab === 'categories' ? (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Nama Kategori
                      </label>
                      <input
                        type="text"
                        value={formData.name || ''}
                        onChange={(e) => setFormData((prev: Record<string, any>) => ({ ...prev, name: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        placeholder="Contoh: Untuk Warga"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Deskripsi
                      </label>
                      <textarea
                        value={formData.description || ''}
                        onChange={(e) => setFormData((prev: Record<string, any>) => ({ ...prev, description: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        rows={3}
                        placeholder="Deskripsi kategori"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Gradient
                      </label>
                      <select
                        value={formData.gradient || ''}
                        onChange={(e) => setFormData((prev: Record<string, any>) => ({ ...prev, gradient: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      >
                        <option value="from-green-500 to-green-600">Hijau</option>
                        <option value="from-blue-500 to-blue-600">Biru</option>
                        <option value="from-purple-500 to-purple-600">Ungu</option>
                        <option value="from-red-500 to-red-600">Merah</option>
                        <option value="from-yellow-500 to-yellow-600">Kuning</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Icon
                      </label>
                      <select
                        value={formData.icon || ''}
                        onChange={(e) => setFormData((prev: Record<string, any>) => ({ ...prev, icon: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      >
                        <option value="users">Users</option>
                        <option value="building">Building</option>
                        <option value="globe">Globe</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Urutan
                      </label>
                      <input
                        type="number"
                        value={formData.order || 1}
                        onChange={(e) => setFormData((prev: Record<string, any>) => ({ ...prev, order: parseInt(e.target.value) }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        min="1"
                      />
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.isActive ?? true}
                        onChange={(e) => setFormData((prev: Record<string, any>) => ({ ...prev, isActive: e.target.checked }))}
                        className="mr-2"
                      />
                      <label className="text-sm text-gray-700 dark:text-gray-300">
                        Aktif
                      </label>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Judul Kartu
                      </label>
                      <input
                        type="text"
                        value={formData.title || ''}
                        onChange={(e) => setFormData((prev: Record<string, any>) => ({ ...prev, title: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        placeholder="Contoh: Pengaduan Lingkungan"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Deskripsi
                      </label>
                      <textarea
                        value={formData.description || ''}
                        onChange={(e) => setFormData((prev: Record<string, any>) => ({ ...prev, description: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        rows={3}
                        placeholder="Deskripsi layanan"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        URL
                      </label>
                      <input
                        type="text"
                        value={formData.url || ''}
                        onChange={(e) => setFormData((prev: Record<string, any>) => ({ ...prev, url: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        placeholder="Contoh: /pengaduan"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Kategori
                      </label>
                      <select
                        value={formData.category || 'warga'}
                        onChange={(e) => setFormData((prev: Record<string, any>) => ({ ...prev, category: e.target.value as 'warga' | 'usaha' | 'umum' }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      >
                        <option value="warga">Untuk Warga</option>
                        <option value="usaha">Untuk Usaha</option>
                        <option value="umum">Untuk Umum</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Urutan
                      </label>
                      <input
                        type="number"
                        value={formData.order || 1}
                        onChange={(e) => setFormData((prev: Record<string, any>) => ({ ...prev, order: parseInt(e.target.value) }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        min="1"
                      />
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.isActive ?? true}
                        onChange={(e) => setFormData((prev: Record<string, any>) => ({ ...prev, isActive: e.target.checked }))}
                        className="mr-2"
                      />
                      <label className="text-sm text-gray-700 dark:text-gray-300">
                        Aktif
                      </label>
                    </div>
                  </>
                )}
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => {
                    setShowModal(false);
                    setEditingItem(null);
                    setFormData({});
                  }}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <X className="w-4 h-4 inline mr-2" />
                  Batal
                </button>
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
                >
                  <Save className="w-4 h-4 inline mr-2" />
                  {loading ? 'Menyimpan...' : 'Simpan'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
