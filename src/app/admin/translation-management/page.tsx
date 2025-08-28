"use client";

import React, { useState, useEffect } from "react";
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Save, 
  X, 
  Globe,
  Languages,
  FileText,
  Search,
  Filter,
  Download,
  Upload,
  RefreshCw
} from "lucide-react";

interface TranslationEntry {
  id: string;
  key: string;
  category: string;
  description: string;
  translations: {
    [languageCode: string]: string;
  };
  isEditable: boolean;
  lastUpdated: string;
}

interface Language {
  code: string;
  name: string;
  nativeName: string;
  isActive: boolean;
  isDefault: boolean;
  flag: string;
}

interface TranslationCategory {
  id: string;
  name: string;
  description: string;
  entryCount: number;
  isActive: boolean;
}

export default function AdminTranslationManagement() {
  const [languages, setLanguages] = useState<Language[]>([]);
  const [categories, setCategories] = useState<TranslationCategory[]>([]);
  const [translations, setTranslations] = useState<TranslationEntry[]>([]);
  const [filteredTranslations, setFilteredTranslations] = useState<TranslationEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"translations" | "languages" | "categories">("translations");
  
  // Modals and forms
  const [showTranslationModal, setShowTranslationModal] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [editingTranslation, setEditingTranslation] = useState<TranslationEntry | null>(null);
  const [editingLanguage, setEditingLanguage] = useState<Language | null>(null);
  const [editingCategory, setEditingCategory] = useState<TranslationCategory | null>(null);
  
  // Filters and search
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");

  const [translationFormData, setTranslationFormData] = useState({
    key: "",
    category: "",
    description: "",
    translations: {} as { [key: string]: string }
  });

  const [languageFormData, setLanguageFormData] = useState({
    code: "",
    name: "",
    nativeName: "",
    isActive: true,
    isDefault: false,
    flag: ""
  });

  const [categoryFormData, setCategoryFormData] = useState({
    name: "",
    description: "",
    isActive: true
  });

  // Mock data initialization
  useEffect(() => {
    const mockLanguages: Language[] = [
      {
        code: "id",
        name: "Indonesian",
        nativeName: "Bahasa Indonesia",
        isActive: true,
        isDefault: true,
        flag: "🇮🇩"
      },
      {
        code: "en",
        name: "English",
        nativeName: "English",
        isActive: true,
        isDefault: false,
        flag: "🇺🇸"
      },
      {
        code: "su",
        name: "Sundanese",
        nativeName: "Basa Sunda",
        isActive: false,
        isDefault: false,
        flag: "🏴"
      }
    ];

    const mockCategories: TranslationCategory[] = [
      {
        id: "1",
        name: "Navigation",
        description: "Menu navigasi dan link",
        entryCount: 15,
        isActive: true
      },
      {
        id: "2",
        name: "Common",
        description: "Teks umum yang sering digunakan",
        entryCount: 32,
        isActive: true
      },
      {
        id: "3",
        name: "Forms",
        description: "Label form dan pesan validasi",
        entryCount: 28,
        isActive: true
      },
      {
        id: "4",
        name: "Messages",
        description: "Pesan sistem dan notifikasi",
        entryCount: 19,
        isActive: true
      },
      {
        id: "5",
        name: "Footer",
        description: "Konten footer website",
        entryCount: 8,
        isActive: true
      }
    ];

    const mockTranslations: TranslationEntry[] = [
      {
        id: "1",
        key: "nav.home",
        category: "Navigation",
        description: "Label menu beranda",
        translations: {
          id: "Beranda",
          en: "Home",
          su: "Imah"
        },
        isEditable: true,
        lastUpdated: "2024-01-15"
      },
      {
        id: "2",
        key: "nav.profile",
        category: "Navigation",
        description: "Label menu profil",
        translations: {
          id: "Profil",
          en: "Profile",
          su: "Profil"
        },
        isEditable: true,
        lastUpdated: "2024-01-15"
      },
      {
        id: "3",
        key: "nav.services",
        category: "Navigation",
        description: "Label menu layanan",
        translations: {
          id: "Layanan",
          en: "Services",
          su: "Layanan"
        },
        isEditable: true,
        lastUpdated: "2024-01-15"
      },
      {
        id: "4",
        key: "common.save",
        category: "Common",
        description: "Tombol simpan",
        translations: {
          id: "Simpan",
          en: "Save",
          su: "Simpen"
        },
        isEditable: true,
        lastUpdated: "2024-01-15"
      },
      {
        id: "5",
        key: "common.cancel",
        category: "Common",
        description: "Tombol batal",
        translations: {
          id: "Batal",
          en: "Cancel",
          su: "Batalkeun"
        },
        isEditable: true,
        lastUpdated: "2024-01-15"
      },
      {
        id: "6",
        key: "form.name.required",
        category: "Forms",
        description: "Pesan validasi nama wajib diisi",
        translations: {
          id: "Nama wajib diisi",
          en: "Name is required",
          su: "Nami kedah dieusian"
        },
        isEditable: true,
        lastUpdated: "2024-01-15"
      },
      {
        id: "7",
        key: "message.success.save",
        category: "Messages",
        description: "Pesan berhasil menyimpan",
        translations: {
          id: "Data berhasil disimpan",
          en: "Data successfully saved",
          su: "Data hasil disimpen"
        },
        isEditable: true,
        lastUpdated: "2024-01-15"
      },
      {
        id: "8",
        key: "footer.contact.title",
        category: "Footer",
        description: "Judul kontak di footer",
        translations: {
          id: "Hubungi Kami",
          en: "Contact Us",
          su: "Kontak Kami"
        },
        isEditable: true,
        lastUpdated: "2024-01-15"
      }
    ];

    setLanguages(mockLanguages);
    setCategories(mockCategories);
    setTranslations(mockTranslations);
    setFilteredTranslations(mockTranslations);

    // Initialize translation form with all active languages
    const initialTranslations: { [key: string]: string } = {};
    mockLanguages.filter(lang => lang.isActive).forEach(lang => {
      initialTranslations[lang.code] = "";
    });
    setTranslationFormData(prev => ({ ...prev, translations: initialTranslations }));
  }, []);

  // Filter translations based on search and filters
  useEffect(() => {
    let filtered = translations;

    if (searchTerm) {
      filtered = filtered.filter(t => 
        t.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        Object.values(t.translations).some(trans => 
          trans.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(t => t.category === selectedCategory);
    }

    setFilteredTranslations(filtered);
  }, [searchTerm, selectedCategory, translations]);

  const handleEditTranslation = (translation: TranslationEntry) => {
    setEditingTranslation(translation);
    setTranslationFormData({
      key: translation.key,
      category: translation.category,
      description: translation.description,
      translations: { ...translation.translations }
    });
    setShowTranslationModal(true);
  };

  const handleAddTranslation = () => {
    setEditingTranslation(null);
    const initialTranslations: { [key: string]: string } = {};
    languages.filter(lang => lang.isActive).forEach(lang => {
      initialTranslations[lang.code] = "";
    });
    setTranslationFormData({
      key: "",
      category: categories[0]?.name || "",
      description: "",
      translations: initialTranslations
    });
    setShowTranslationModal(true);
  };

  const handleSubmitTranslation = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (editingTranslation) {
        setTranslations(prev => prev.map(t => 
          t.id === editingTranslation.id 
            ? { 
                ...t, 
                ...translationFormData, 
                lastUpdated: new Date().toISOString().split('T')[0] 
              }
            : t
        ));
      } else {
        const newTranslation: TranslationEntry = {
          id: Date.now().toString(),
          ...translationFormData,
          isEditable: true,
          lastUpdated: new Date().toISOString().split('T')[0]
        };
        setTranslations(prev => [...prev, newTranslation]);
      }

      setShowTranslationModal(false);
      setEditingTranslation(null);
    } catch (error) {
      console.error('Error saving translation:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTranslation = async (id: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus terjemahan ini?')) return;
    
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setTranslations(prev => prev.filter(t => t.id !== id));
    } catch (error) {
      console.error('Error deleting translation:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleExportTranslations = () => {
    const dataStr = JSON.stringify(translations, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'translations.json';
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          Manajemen Terjemahan
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Kelola terjemahan multi-bahasa untuk seluruh website
        </p>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab("translations")}
              className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                activeTab === "translations"
                  ? "border-green-500 text-green-600 dark:text-green-400"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
              }`}
            >
              <FileText className="w-4 h-4" />
              Terjemahan
            </button>
            <button
              onClick={() => setActiveTab("languages")}
              className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                activeTab === "languages"
                  ? "border-green-500 text-green-600 dark:text-green-400"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
              }`}
            >
              <Languages className="w-4 h-4" />
              Bahasa
            </button>
            <button
              onClick={() => setActiveTab("categories")}
              className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                activeTab === "categories"
                  ? "border-green-500 text-green-600 dark:text-green-400"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
              }`}
            >
              <Globe className="w-4 h-4" />
              Kategori
            </button>
          </nav>
        </div>
      </div>

      {/* Translations Tab */}
      {activeTab === "translations" && (
        <div className="space-y-6">
          {/* Controls */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Cari terjemahan..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white w-64"
                />
              </div>
              
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="">Semua Kategori</option>
                {categories.filter(c => c.isActive).map(category => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleExportTranslations}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                <Download size={16} />
                Export
              </button>
              <button
                onClick={handleAddTranslation}
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2"
              >
                <Plus size={16} />
                Tambah Terjemahan
              </button>
            </div>
          </div>

          {/* Translations Table */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Key
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Kategori
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Deskripsi
                    </th>
                    {languages.filter(lang => lang.isActive).map(lang => (
                      <th key={lang.code} className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        {lang.flag} {lang.code.toUpperCase()}
                      </th>
                    ))}
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredTranslations.map((translation) => (
                    <tr key={translation.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {translation.key}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                          {translation.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 dark:text-white max-w-xs truncate">
                          {translation.description}
                        </div>
                      </td>
                      {languages.filter(lang => lang.isActive).map(lang => (
                        <td key={lang.code} className="px-6 py-4">
                          <div className="text-sm text-gray-900 dark:text-white max-w-xs truncate">
                            {translation.translations[lang.code] || "-"}
                          </div>
                        </td>
                      ))}
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleEditTranslation(translation)}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm font-medium transition-colors flex items-center gap-1"
                          >
                            <Edit3 size={12} />
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteTranslation(translation.id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm font-medium transition-colors flex items-center gap-1"
                          >
                            <Trash2 size={12} />
                            Hapus
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Languages Tab */}
      {activeTab === "languages" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              Pengaturan Bahasa
            </h3>
            <button
              onClick={() => {
                setEditingLanguage(null);
                setLanguageFormData({
                  code: "",
                  name: "",
                  nativeName: "",
                  isActive: true,
                  isDefault: false,
                  flag: ""
                });
                setShowLanguageModal(true);
              }}
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2"
            >
              <Plus size={16} />
              Tambah Bahasa
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {languages.map((language) => (
              <div key={language.code} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{language.flag}</span>
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-white">
                        {language.name}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {language.nativeName}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500">
                        Code: {language.code}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 mb-4">
                  {language.isActive && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                      Aktif
                    </span>
                  )}
                  {language.isDefault && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                      Default
                    </span>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditingLanguage(language);
                      setLanguageFormData(language);
                      setShowLanguageModal(true);
                    }}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1"
                  >
                    <Edit3 size={14} />
                    Edit
                  </button>
                  {!language.isDefault && (
                    <button
                      onClick={async () => {
                        if (!confirm('Apakah Anda yakin ingin menghapus bahasa ini?')) return;
                        setLanguages(prev => prev.filter(l => l.code !== language.code));
                      }}
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1"
                    >
                      <Trash2 size={14} />
                      Hapus
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Categories Tab */}
      {activeTab === "categories" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              Kategori Terjemahan
            </h3>
            <button
              onClick={() => {
                setEditingCategory(null);
                setCategoryFormData({
                  name: "",
                  description: "",
                  isActive: true
                });
                setShowCategoryModal(true);
              }}
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2"
            >
              <Plus size={16} />
              Tambah Kategori
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categories.map((category) => (
              <div key={category.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-white">
                      {category.name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {category.description}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                      {category.entryCount} entri terjemahan
                    </p>
                  </div>
                  {category.isActive && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                      Aktif
                    </span>
                  )}
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditingCategory(category);
                      setCategoryFormData({
                        name: category.name,
                        description: category.description,
                        isActive: category.isActive
                      });
                      setShowCategoryModal(true);
                    }}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1"
                  >
                    <Edit3 size={14} />
                    Edit
                  </button>
                  <button
                    onClick={async () => {
                      if (!confirm('Apakah Anda yakin ingin menghapus kategori ini?')) return;
                      setCategories(prev => prev.filter(c => c.id !== category.id));
                    }}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1"
                  >
                    <Trash2 size={14} />
                    Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Translation Modal */}
      {showTranslationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                {editingTranslation ? "Edit Terjemahan" : "Tambah Terjemahan"}
              </h3>
              <button
                onClick={() => setShowTranslationModal(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmitTranslation}>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Translation Key
                    </label>
                    <input
                      type="text"
                      value={translationFormData.key}
                      onChange={(e) => setTranslationFormData(prev => ({ ...prev, key: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Contoh: nav.home"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Kategori
                    </label>
                    <select
                      value={translationFormData.category}
                      onChange={(e) => setTranslationFormData(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                      required
                    >
                      {categories.filter(c => c.isActive).map(category => (
                        <option key={category.id} value={category.name}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Deskripsi
                  </label>
                  <textarea
                    value={translationFormData.description}
                    onChange={(e) => setTranslationFormData(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Deskripsi penggunaan terjemahan ini"
                    rows={2}
                    required
                  />
                </div>

                <div>
                  <h4 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Terjemahan per Bahasa
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {languages.filter(lang => lang.isActive).map(lang => (
                      <div key={lang.code}>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          {lang.flag} {lang.name} ({lang.code})
                          {lang.isDefault && (
                            <span className="ml-2 text-xs text-blue-600 dark:text-blue-400">(Default)</span>
                          )}
                        </label>
                        <input
                          type="text"
                          value={translationFormData.translations[lang.code] || ""}
                          onChange={(e) => setTranslationFormData(prev => ({
                            ...prev,
                            translations: {
                              ...prev.translations,
                              [lang.code]: e.target.value
                            }
                          }))}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                          placeholder={`Terjemahan dalam ${lang.name}`}
                          required={lang.isDefault}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowTranslationModal(false)}
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
