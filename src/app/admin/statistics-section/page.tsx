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
  BarChart3,
  TrendingUp,
  Award,
  Users
} from "lucide-react";

interface StatisticItem {
  id: string;
  value: string;
  label: string;
  order: number;
  isActive: boolean;
}

interface StatisticSection {
  id: string;
  title: string;
  subtitle: string;
  isActive: boolean;
  items: StatisticItem[];
}

export default function AdminStatisticsSection() {
  const [sections, setSections] = useState<StatisticSection[]>([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showItemModal, setShowItemModal] = useState(false);
  const [editingSection, setEditingSection] = useState<StatisticSection | null>(null);
  const [editingItem, setEditingItem] = useState<StatisticItem | null>(null);
  const [currentSectionId, setCurrentSectionId] = useState<string>("");
  const [sectionFormData, setSectionFormData] = useState({
    title: "",
    subtitle: "",
    isActive: true
  });
  const [itemFormData, setItemFormData] = useState({
    value: "",
    label: "",
    order: 1,
    isActive: true
  });

  // Mock data for statistics sections
  useEffect(() => {
    const mockData: StatisticSection[] = [
      {
        id: "1",
        title: "Indeks Kepuasan Masyarakat (IKM)",
        subtitle: "Hasil survei kepuasan masyarakat terhadap pelayanan DLH Kota Tasikmalaya tahun 2024",
        isActive: true,
        items: [
          {
            id: "1",
            value: "88,7",
            label: "IKM DLH Kota Tasikmalaya 2024",
            order: 1,
            isActive: true
          },
          {
            id: "2", 
            value: "A",
            label: "Kategori Mutu Pelayanan",
            order: 2,
            isActive: true
          },
          {
            id: "3",
            value: "Sangat Baik",
            label: "Keterangan",
            order: 3,
            isActive: true
          },
          {
            id: "4",
            value: "> 500",
            label: "Responden",
            order: 4,
            isActive: true
          }
        ]
      },
      {
        id: "2",
        title: "Statistik Lingkungan 2024",
        subtitle: "Data pencapaian program dan kegiatan lingkungan hidup",
        isActive: false,
        items: [
          {
            id: "5",
            value: "95%",
            label: "Tingkat Pengelolaan Sampah",
            order: 1,
            isActive: true
          },
          {
            id: "6",
            value: "78",
            label: "Indeks Kualitas Udara",
            order: 2,
            isActive: true
          },
          {
            id: "7",
            value: "120",
            label: "Program Edukasi Dilaksanakan",
            order: 3,
            isActive: true
          }
        ]
      }
    ];

    setSections(mockData);
  }, []);

  const handleEditSection = (section: StatisticSection) => {
    setEditingSection(section);
    setSectionFormData({
      title: section.title,
      subtitle: section.subtitle,
      isActive: section.isActive
    });
    setShowModal(true);
  };

  const handleAddSection = () => {
    setEditingSection(null);
    setSectionFormData({
      title: "",
      subtitle: "",
      isActive: true
    });
    setShowModal(true);
  };

  const handleEditItem = (sectionId: string, item: StatisticItem) => {
    setCurrentSectionId(sectionId);
    setEditingItem(item);
    setItemFormData({
      value: item.value,
      label: item.label,
      order: item.order,
      isActive: item.isActive
    });
    setShowItemModal(true);
  };

  const handleAddItem = (sectionId: string) => {
    setCurrentSectionId(sectionId);
    setEditingItem(null);
    const section = sections.find(s => s.id === sectionId);
    const nextOrder = section ? section.items.length + 1 : 1;
    setItemFormData({
      value: "",
      label: "",
      order: nextOrder,
      isActive: true
    });
    setShowItemModal(true);
  };

  const handleSubmitSection = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (editingSection) {
        setSections(prev => prev.map(section => 
          section.id === editingSection.id 
            ? { ...section, ...sectionFormData }
            : section
        ));
      } else {
        const newSection: StatisticSection = {
          id: Date.now().toString(),
          ...sectionFormData,
          items: []
        };
        setSections(prev => [...prev, newSection]);
      }

      setShowModal(false);
      setEditingSection(null);
    } catch (error) {
      console.error('Error saving section:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitItem = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSections(prev => prev.map(section => {
        if (section.id === currentSectionId) {
          if (editingItem) {
            return {
              ...section,
              items: section.items.map(item => 
                item.id === editingItem.id 
                  ? { ...item, ...itemFormData }
                  : item
              )
            };
          } else {
            const newItem: StatisticItem = {
              id: Date.now().toString(),
              ...itemFormData
            };
            return {
              ...section,
              items: [...section.items, newItem]
            };
          }
        }
        return section;
      }));

      setShowItemModal(false);
      setEditingItem(null);
      setCurrentSectionId("");
    } catch (error) {
      console.error('Error saving item:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSection = async (id: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus section ini beserta semua itemnya?')) return;
    
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setSections(prev => prev.filter(section => section.id !== id));
    } catch (error) {
      console.error('Error deleting section:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteItem = async (sectionId: string, itemId: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus item ini?')) return;
    
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setSections(prev => prev.map(section => 
        section.id === sectionId 
          ? { ...section, items: section.items.filter(item => item.id !== itemId) }
          : section
      ));
    } catch (error) {
      console.error('Error deleting item:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          Manajemen Statistik Section
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Kelola section statistik seperti IKM dan data lainnya pada homepage
        </p>
      </div>

      {/* Add Section Button */}
      <div className="mb-6">
        <button
          onClick={handleAddSection}
          className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2"
        >
          <Plus size={20} />
          Tambah Section
        </button>
      </div>

      {/* Statistics Sections */}
      <div className="space-y-6">
        {sections.map((section) => (
          <div key={section.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            {/* Section Header */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <BarChart3 className="w-6 h-6 text-green-600" />
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                      {section.title}
                    </h3>
                    {section.isActive ? (
                      <Eye size={18} className="text-green-500" />
                    ) : (
                      <EyeOff size={18} className="text-gray-400" />
                    )}
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {section.subtitle}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditSection(section)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1"
                  >
                    <Edit3 size={14} />
                    Edit Section
                  </button>
                  <button
                    onClick={() => handleDeleteSection(section.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1"
                  >
                    <Trash2 size={14} />
                    Hapus
                  </button>
                </div>
              </div>
            </div>

            {/* Section Items */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium text-gray-800 dark:text-white">
                  Item Statistik ({section.items.length})
                </h4>
                <button
                  onClick={() => handleAddItem(section.id)}
                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1"
                >
                  <Plus size={14} />
                  Tambah Item
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {section.items.map((item) => (
                  <div key={item.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                    <div className="flex items-start justify-between mb-3">
                      <div className="text-center flex-1">
                        <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">
                          {item.value}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {item.label}
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        {item.isActive ? (
                          <Eye size={14} className="text-green-500" />
                        ) : (
                          <EyeOff size={14} className="text-gray-400" />
                        )}
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <button
                        onClick={() => handleEditItem(section.id, item)}
                        className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium transition-colors flex items-center justify-center gap-1"
                      >
                        <Edit3 size={10} />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteItem(section.id, item.id)}
                        className="flex-1 bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs font-medium transition-colors flex items-center justify-center gap-1"
                      >
                        <Trash2 size={10} />
                        Hapus
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Section Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                {editingSection ? "Edit Section" : "Tambah Section"}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmitSection}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Judul Section
                  </label>
                  <input
                    type="text"
                    value={sectionFormData.title}
                    onChange={(e) => setSectionFormData(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Contoh: Indeks Kepuasan Masyarakat (IKM)"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Subtitle/Deskripsi
                  </label>
                  <textarea
                    value={sectionFormData.subtitle}
                    onChange={(e) => setSectionFormData(prev => ({ ...prev, subtitle: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Deskripsi singkat tentang section ini"
                    rows={3}
                    required
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="sectionActive"
                    checked={sectionFormData.isActive}
                    onChange={(e) => setSectionFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <label htmlFor="sectionActive" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
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

      {/* Item Modal */}
      {showItemModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                {editingItem ? "Edit Item" : "Tambah Item"}
              </h3>
              <button
                onClick={() => setShowItemModal(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmitItem}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Nilai/Angka
                  </label>
                  <input
                    type="text"
                    value={itemFormData.value}
                    onChange={(e) => setItemFormData(prev => ({ ...prev, value: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Contoh: 88,7 atau A atau > 500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Label/Keterangan
                  </label>
                  <input
                    type="text"
                    value={itemFormData.label}
                    onChange={(e) => setItemFormData(prev => ({ ...prev, label: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Contoh: IKM DLH Kota Tasikmalaya 2024"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Urutan
                  </label>
                  <input
                    type="number"
                    value={itemFormData.order}
                    onChange={(e) => setItemFormData(prev => ({ ...prev, order: parseInt(e.target.value) }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                    min="1"
                    required
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="itemActive"
                    checked={itemFormData.isActive}
                    onChange={(e) => setItemFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <label htmlFor="itemActive" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                    Tampilkan item ini
                  </label>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowItemModal(false)}
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
