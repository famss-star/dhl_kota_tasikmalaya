"use client";

import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Save, X, Settings, BarChart3, Users, Globe, FileText } from "lucide-react";

interface HomepageSetting {
  id: string;
  key: string;
  value: string;
  type: string;
  category: string;
  description?: string;
  order: number;
  isActive: boolean;
}

interface LayananCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  linkUrl: string;
  category: string;
  color: string;
  order: number;
  isActive: boolean;
}

const CATEGORY_ICONS = {
  general: Settings,
  ikm: BarChart3,
  social_media: Users,
  layanan: Globe,
  contact: Users,
};

const CATEGORY_LABELS = {
  general: "Pengaturan Umum",
  ikm: "Statistik IKM",
  social_media: "Social Media",
  layanan: "Layanan Cards",
  contact: "Kontak & Footer",
};

export default function HomepageSettingsAdmin() {
  const [settings, setSettings] = useState<HomepageSetting[]>([]);
  const [layananCards, setLayananCards] = useState<LayananCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("settings");
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<"setting" | "layanan">("setting");
  const [editingItem, setEditingItem] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    // Mock data untuk demonstrasi UI
    const mockSettings: HomepageSetting[] = [
      {
        id: "1",
        key: "ikm_score",
        value: "88.7",
        type: "number",
        category: "ikm",
        description: "Nilai IKM DLH Kota Tasikmalaya 2024",
        order: 1,
        isActive: true,
      },
      {
        id: "2", 
        key: "ikm_category",
        value: "A",
        type: "text",
        category: "ikm",
        description: "Kategori mutu pelayanan IKM",
        order: 2,
        isActive: true,
      },
      {
        id: "3",
        key: "ikm_status",
        value: "Sangat Baik",
        type: "text", 
        category: "ikm",
        description: "Keterangan status IKM",
        order: 3,
        isActive: true,
      },
      {
        id: "4",
        key: "facebook_url",
        value: "https://facebook.com/dlhkotatasikmalaya",
        type: "text",
        category: "social_media",
        description: "URL Facebook DLH",
        order: 1,
        isActive: true,
      },
      {
        id: "5",
        key: "instagram_url", 
        value: "https://instagram.com/dlhkotatasikmalaya",
        type: "text",
        category: "social_media",
        description: "URL Instagram DLH",
        order: 2,
        isActive: true,
      }
    ];

    const mockLayanan: LayananCard[] = [
      {
        id: "1",
        title: "Pengaduan Lingkungan",
        description: "Sampaikan keluhan atau laporan masalah lingkungan",
        icon: "AlertTriangle",
        linkUrl: "/pengaduan",
        category: "layanan",
        color: "red",
        order: 1,
        isActive: true,
      },
      {
        id: "2", 
        title: "Perizinan AMDAL",
        description: "Ajukan perizinan AMDAL untuk kegiatan usaha",
        icon: "FileCheck",
        linkUrl: "/perizinan/amdal",
        category: "perizinan",
        color: "green",
        order: 2,
        isActive: true,
      },
      {
        id: "3",
        title: "Bank Sampah",
        description: "Program edukasi pengelolaan sampah berkelanjutan",
        icon: "Recycle",
        linkUrl: "/layanan/bank-sampah",
        category: "edukasi",
        color: "blue",
        order: 3,
        isActive: true,
      },
      {
        id: "4",
        title: "IPLC Online", 
        description: "Permohonan Izin Perlindungan dan Pengelolaan Lingkungan Hidup",
        icon: "Shield",
        linkUrl: "/perizinan/iplc",
        category: "perizinan",
        color: "purple",
        order: 4,
        isActive: false,
      }
    ];
    
    setSettings(mockSettings);
    setLayananCards(mockLayanan);
    setLoading(false);
  }, []);

  const handleSubmitSetting = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulasi API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (editingItem) {
        // Update existing setting
        setSettings(prev => prev.map(item => 
          item.id === editingItem.id 
            ? { ...item, ...formData }
            : item
        ));
      } else {
        // Add new setting
        const newSetting: HomepageSetting = {
          id: Date.now().toString(),
          ...formData,
        };
        setSettings(prev => [...prev, newSetting]);
      }
      
      setShowModal(false);
      setEditingItem(null);
      setFormData({});
    } catch (error) {
      console.error('Error saving setting:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitLayanan = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulasi API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (editingItem) {
        // Update existing layanan
        setLayananCards(prev => prev.map(item => 
          item.id === editingItem.id 
            ? { ...item, ...formData }
            : item
        ));
      } else {
        // Add new layanan
        const newLayanan: LayananCard = {
          id: Date.now().toString(),
          ...formData,
        };
        setLayananCards(prev => [...prev, newLayanan]);
      }
      
      setShowModal(false);
      setEditingItem(null);
      setFormData({});
    } catch (error) {
      console.error('Error saving layanan card:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (type: "setting" | "layanan", id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus item ini?")) return;

    try {
      // Simulasi API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (type === "setting") {
        setSettings(prev => prev.filter(item => item.id !== id));
      } else {
        setLayananCards(prev => prev.filter(item => item.id !== id));
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const openSettingModal = (setting?: HomepageSetting) => {
    setModalType("setting");
    setEditingItem(setting || null);
    setFormData(setting ? {
      key: setting.key,
      value: setting.value,
      type: setting.type,
      category: setting.category,
      description: setting.description || "",
      order: setting.order,
      isActive: setting.isActive,
    } : {
      key: "",
      value: "",
      type: "text",
      category: "general",
      description: "",
      order: 1,
      isActive: true,
    });
    setShowModal(true);
  };

  const openLayananModal = (layanan?: LayananCard) => {
    setModalType("layanan");
    setEditingItem(layanan || null);
    setFormData(layanan ? {
      title: layanan.title,
      description: layanan.description,
      icon: layanan.icon,
      linkUrl: layanan.linkUrl,
      category: layanan.category,
      color: layanan.color,
      order: layanan.order,
      isActive: layanan.isActive,
    } : {
      title: "",
      description: "",
      icon: "FileText",
      linkUrl: "",
      category: "perizinan",
      color: "green",
      order: layananCards.length + 1,
      isActive: true,
    });
    setShowModal(true);
  };

  const groupedSettings = settings.reduce((acc, setting) => {
    if (!acc[setting.category]) acc[setting.category] = [];
    acc[setting.category].push(setting);
    return acc;
  }, {} as Record<string, HomepageSetting[]>);

  if (loading && settings.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-emerald-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Memuat pengaturan homepage...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-emerald-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-3">
            <Settings className="text-green-600" />
            <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Pengaturan Homepage
            </span>
          </h1>
          <p className="text-xl md:text-2xl opacity-90">Kelola konten dan pengaturan halaman utama website</p>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setActiveTab("settings")}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                activeTab === "settings"
                  ? "bg-gradient-to-r from-green-600 to-blue-600 text-white shadow-lg"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
            >
              <Settings className="w-5 h-5 inline mr-2" />
              Pengaturan Umum
            </button>
            <button
              onClick={() => setActiveTab("layanan")}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                activeTab === "layanan"
                  ? "bg-gradient-to-r from-green-600 to-blue-600 text-white shadow-lg"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
            >
              <Globe className="w-5 h-5 inline mr-2" />
              Layanan Cards
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 md:p-12 border border-gray-200 dark:border-gray-700">
          {activeTab === "settings" && (
            <div>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Pengaturan Website
                </h2>
                <button
                  onClick={() => openSettingModal()}
                  className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-green-700 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  <Plus className="w-5 h-5" />
                  Tambah Setting
                </button>
              </div>

              {Object.keys(groupedSettings).length === 0 ? (
                <div className="text-center py-12">
                  <Settings className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Belum ada pengaturan
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Mulai dengan menambahkan pengaturan untuk homepage
                  </p>
                </div>
              ) : (
                <div className="space-y-8">
                  {Object.entries(groupedSettings).map(([category, categorySettings]) => {
                    const CategoryIcon = CATEGORY_ICONS[category as keyof typeof CATEGORY_ICONS] || Settings;
                    return (
                      <div key={category} className="border border-gray-200 dark:border-gray-600 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                          <CategoryIcon className="w-5 h-5 text-green-600" />
                          {CATEGORY_LABELS[category as keyof typeof CATEGORY_LABELS] || category}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {categorySettings.map((setting) => (
                            <div
                              key={setting.id}
                              className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600"
                            >
                              <div className="flex justify-between items-start mb-2">
                                <h4 className="font-medium text-gray-900 dark:text-white">{setting.key}</h4>
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => openSettingModal(setting)}
                                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                                  >
                                    <Edit className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => handleDelete("setting", setting.id)}
                                    className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                                {setting.description}
                              </p>
                              <div className="text-sm">
                                <span className="font-medium">Value:</span>
                                <span className="ml-2 text-gray-600 dark:text-gray-400">
                                  {setting.value.length > 50 ? `${setting.value.substring(0, 50)}...` : setting.value}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 mt-2">
                                <span className={`inline-block w-2 h-2 rounded-full ${
                                  setting.isActive ? 'bg-green-500' : 'bg-gray-400'
                                }`}></span>
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                  {setting.isActive ? 'Aktif' : 'Nonaktif'}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {activeTab === "layanan" && (
            <div>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Layanan Cards ({layananCards.length})
                </h2>
                <button
                  onClick={() => openLayananModal()}
                  className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-green-700 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  <Plus className="w-5 h-5" />
                  Tambah Layanan Card
                </button>
              </div>

              {layananCards.length === 0 ? (
                <div className="text-center py-12">
                  <Globe className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Belum ada layanan card
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Mulai dengan menambahkan card layanan untuk homepage
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {layananCards
                    .sort((a, b) => a.order - b.order)
                    .map((card) => (
                      <div
                        key={card.id}
                        className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 border border-gray-200 dark:border-gray-600"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div className={`w-12 h-12 bg-${card.color}-500 rounded-lg flex items-center justify-center`}>
                            <FileText className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => openLayananModal(card)}
                              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete("layanan", card.id)}
                              className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">
                          {card.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                          {card.description}
                        </p>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          <p>Category: {card.category}</p>
                          <p>Order: #{card.order}</p>
                          <p>Status: {card.isActive ? 'Aktif' : 'Nonaktif'}</p>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {modalType === "setting" 
                    ? (editingItem ? "Edit Setting" : "Tambah Setting")
                    : (editingItem ? "Edit Layanan Card" : "Tambah Layanan Card")
                  }
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={modalType === "setting" ? handleSubmitSetting : handleSubmitLayanan} className="space-y-6">
                {modalType === "setting" ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Key
                      </label>
                      <input
                        type="text"
                        value={formData.key || ""}
                        onChange={(e) => setFormData({ ...formData, key: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Type
                      </label>
                      <select
                        value={formData.type || "text"}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      >
                        <option value="text">Text</option>
                        <option value="number">Number</option>
                        <option value="boolean">Boolean</option>
                        <option value="json">JSON</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Category
                      </label>
                      <select
                        value={formData.category || "general"}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      >
                        <option value="general">General</option>
                        <option value="ikm">IKM Statistics</option>
                        <option value="social_media">Social Media</option>
                        <option value="contact">Contact & Footer</option>
                      </select>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Value
                      </label>
                      {formData.type === "boolean" ? (
                        <select
                          value={formData.value || "true"}
                          onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        >
                          <option value="true">True</option>
                          <option value="false">False</option>
                        </select>
                      ) : formData.type === "json" ? (
                        <textarea
                          value={formData.value || ""}
                          onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                          rows={4}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                          placeholder='{"key": "value"}'
                          required
                        />
                      ) : (
                        <input
                          type={formData.type === "number" ? "number" : "text"}
                          value={formData.value || ""}
                          onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                          required
                        />
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Description
                      </label>
                      <textarea
                        value={formData.description || ""}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        rows={2}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Order
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={formData.order || 1}
                        onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        required
                      />
                    </div>

                    <div>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.isActive ?? true}
                          onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                          className="mr-2"
                        />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Aktif
                        </span>
                      </label>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Title
                      </label>
                      <input
                        type="text"
                        value={formData.title || ""}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        required
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Description
                      </label>
                      <textarea
                        value={formData.description || ""}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Icon
                      </label>
                      <input
                        type="text"
                        value={formData.icon || ""}
                        onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                        placeholder="e.g. FileText, Users, Globe"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Link URL
                      </label>
                      <input
                        type="url"
                        value={formData.linkUrl || ""}
                        onChange={(e) => setFormData({ ...formData, linkUrl: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Category
                      </label>
                      <select
                        value={formData.category || "perizinan"}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      >
                        <option value="perizinan">Perizinan</option>
                        <option value="edukasi">Edukasi</option>
                        <option value="layanan">Layanan</option>
                        <option value="informasi">Informasi</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Color
                      </label>
                      <select
                        value={formData.color || "green"}
                        onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      >
                        <option value="green">Green</option>
                        <option value="blue">Blue</option>
                        <option value="yellow">Yellow</option>
                        <option value="red">Red</option>
                        <option value="purple">Purple</option>
                        <option value="indigo">Indigo</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Order
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={formData.order || 1}
                        onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        required
                      />
                    </div>

                    <div>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.isActive ?? true}
                          onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                          className="mr-2"
                        />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Aktif
                        </span>
                      </label>
                    </div>
                  </div>
                )}

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
    </div>
  );
}
