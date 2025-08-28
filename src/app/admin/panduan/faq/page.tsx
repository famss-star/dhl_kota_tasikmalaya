"use client";

import React, { useState, useEffect } from "react";
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Save, 
  X, 
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Search,
  Filter,
  Eye,
  EyeOff,
  MessageCircle
} from "lucide-react";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  tags: string[];
  isPublished: boolean;
  viewCount: number;
  order: number;
  lastUpdated: string;
  createdBy: string;
}

interface FAQCategory {
  id: string;
  name: string;
  description: string;
  faqCount: number;
  isActive: boolean;
}

export default function AdminFAQ() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [categories, setCategories] = useState<FAQCategory[]>([]);
  const [filteredFaqs, setFilteredFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FAQ | null>(null);
  const [editingCategory, setEditingCategory] = useState<FAQCategory | null>(null);
  const [activeTab, setActiveTab] = useState<"faqs" | "categories">("faqs");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  const [faqFormData, setFaqFormData] = useState({
    question: "",
    answer: "",
    category: "",
    tags: [""],
    isPublished: true,
    order: 1
  });

  const [categoryFormData, setCategoryFormData] = useState({
    name: "",
    description: "",
    isActive: true
  });

  // Mock data
  useEffect(() => {
    const mockCategories: FAQCategory[] = [
      {
        id: "1",
        name: "Perizinan Umum",
        description: "Pertanyaan umum tentang perizinan lingkungan",
        faqCount: 8,
        isActive: true
      },
      {
        id: "2",
        name: "AMDAL",
        description: "Pertanyaan seputar Analisis Mengenai Dampak Lingkungan",
        faqCount: 6,
        isActive: true
      },
      {
        id: "3",
        name: "Limbah & Pencemaran",
        description: "Pertanyaan tentang pengelolaan limbah dan pencemaran",
        faqCount: 5,
        isActive: true
      },
      {
        id: "4",
        name: "Pelayanan Publik",
        description: "Pertanyaan tentang layanan dan prosedur",
        faqCount: 4,
        isActive: true
      }
    ];

    const mockFaqs: FAQ[] = [
      {
        id: "1",
        question: "Apa itu AMDAL dan siapa yang wajib memilikinya?",
        answer: "AMDAL (Analisis Mengenai Dampak Lingkungan) adalah kajian mengenai dampak penting suatu usaha dan/atau kegiatan yang direncanakan pada lingkungan hidup. AMDAL wajib dimiliki oleh setiap usaha dan/atau kegiatan yang menimbulkan dampak penting terhadap lingkungan hidup, meliputi: kegiatan yang mengubah bentang alam dan ekosistem, eksploitasi sumber daya alam, proses yang menimbulkan limbah, dan kegiatan yang berpotensi menimbulkan pencemaran lingkungan.",
        category: "AMDAL",
        tags: ["AMDAL", "perizinan", "dampak lingkungan"],
        isPublished: true,
        viewCount: 1234,
        order: 1,
        lastUpdated: "2024-08-20",
        createdBy: "Admin DLH"
      },
      {
        id: "2",
        question: "Berapa lama waktu pengurusan izin AMDAL?",
        answer: "Waktu pengurusan izin AMDAL bervariasi tergantung kompleksitas kegiatan. Secara umum: Penyusunan KA-ANDAL: 75 hari, Penyusunan ANDAL-RKL-RPL: 75 hari, Evaluasi AMDAL: 75 hari. Total waktu dapat mencapai 6-12 bulan tergantung kelengkapan dokumen dan kompleksitas proyek.",
        category: "AMDAL",
        tags: ["AMDAL", "waktu", "proses"],
        isPublished: true,
        viewCount: 987,
        order: 2,
        lastUpdated: "2024-08-19",
        createdBy: "Admin DLH"
      },
      {
        id: "3",
        question: "Apa perbedaan antara UKL-UPL dan AMDAL?",
        answer: "UKL-UPL (Upaya Kelola Lingkungan-Upaya Pemantauan Lingkungan) adalah pengelolaan dan pemantauan lingkungan untuk kegiatan yang tidak wajib AMDAL. Perbedaan utama: UKL-UPL untuk kegiatan dengan dampak penting yang tidak mendasar, prosesnya lebih sederhana dan cepat (30-45 hari), sementara AMDAL untuk kegiatan dengan dampak penting yang mendasar, prosesnya lebih kompleks dan memerlukan waktu lebih lama.",
        category: "Perizinan Umum",
        tags: ["UKL-UPL", "AMDAL", "perbedaan"],
        isPublished: true,
        viewCount: 756,
        order: 3,
        lastUpdated: "2024-08-18",
        createdBy: "Admin DLH"
      },
      {
        id: "4",
        question: "Bagaimana cara mengajukan izin pembuangan limbah cair?",
        answer: "Untuk mengajukan izin pembuangan limbah cair (IPLC): 1) Siapkan dokumen persyaratan lengkap, 2) Isi formulir permohonan IPLC, 3) Lampirkan hasil uji laboratorium limbah, 4) Sertakan rancangan sistem pengolahan limbah, 5) Ajukan ke Dinas Lingkungan Hidup, 6) Bayar retribusi sesuai tarif, 7) Tunggu proses verifikasi dan inspeksi lapangan, 8) Izin akan diterbitkan jika memenuhi persyaratan.",
        category: "Limbah & Pencemaran",
        tags: ["IPLC", "limbah cair", "prosedur"],
        isPublished: true,
        viewCount: 543,
        order: 4,
        lastUpdated: "2024-08-17",
        createdBy: "Admin DLH"
      },
      {
        id: "5",
        question: "Apa saja dokumen yang diperlukan untuk perizinan lingkungan?",
        answer: "Dokumen umum yang diperlukan: 1) Formulir permohonan yang telah diisi lengkap, 2) Fotokopi KTP pemohon, 3) Fotokopi akta pendirian perusahaan, 4) Fotokopi NPWP, 5) Surat izin lokasi/HGB, 6) Peta lokasi dan tata letak, 7) Dokumen lingkungan (AMDAL/UKL-UPL/SPPL), 8) Surat pernyataan kesanggupan. Dokumen spesifik dapat berbeda tergantung jenis perizinan.",
        category: "Perizinan Umum",
        tags: ["dokumen", "persyaratan", "perizinan"],
        isPublished: true,
        viewCount: 432,
        order: 5,
        lastUpdated: "2024-08-16",
        createdBy: "Admin DLH"
      },
      {
        id: "6",
        question: "Bagaimana cara melaporkan pencemaran lingkungan?",
        answer: "Untuk melaporkan pencemaran lingkungan: 1) Hubungi hotline DLH Kota Tasikmalaya di (0265) 123456, 2) Kirim laporan melalui website resmi DLH, 3) Datang langsung ke kantor DLH dengan membawa bukti (foto/video), 4) Laporkan melalui aplikasi mobile 'Pengaduan DLH', 5) Kirim email ke pengaduan@dlh.tasikmalayakota.go.id. Tim akan segera menindaklanjuti laporan Anda dalam 1x24 jam.",
        category: "Pelayanan Publik",
        tags: ["pengaduan", "pencemaran", "pelaporan"],
        isPublished: true,
        viewCount: 321,
        order: 6,
        lastUpdated: "2024-08-15",
        createdBy: "Admin DLH"
      }
    ];

    setCategories(mockCategories);
    setFaqs(mockFaqs);
    setFilteredFaqs(mockFaqs);
  }, []);

  // Filter FAQs
  useEffect(() => {
    let filtered = faqs;

    if (searchTerm) {
      filtered = filtered.filter(faq => 
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(faq => faq.category === selectedCategory);
    }

    setFilteredFaqs(filtered.sort((a, b) => a.order - b.order));
  }, [searchTerm, selectedCategory, faqs]);

  const handleEditFaq = (faq: FAQ) => {
    setEditingFaq(faq);
    setFaqFormData({
      question: faq.question,
      answer: faq.answer,
      category: faq.category,
      tags: faq.tags,
      isPublished: faq.isPublished,
      order: faq.order
    });
    setShowModal(true);
  };

  const handleAddFaq = () => {
    setEditingFaq(null);
    setFaqFormData({
      question: "",
      answer: "",
      category: categories[0]?.name || "",
      tags: [""],
      isPublished: true,
      order: faqs.length + 1
    });
    setShowModal(true);
  };

  const handleSubmitFaq = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newFaq: FAQ = {
        id: editingFaq?.id || Date.now().toString(),
        ...faqFormData,
        tags: faqFormData.tags.filter(tag => tag.trim() !== ""),
        viewCount: editingFaq?.viewCount || 0,
        lastUpdated: new Date().toISOString().split('T')[0],
        createdBy: "Admin DLH"
      };

      if (editingFaq) {
        setFaqs(prev => prev.map(f => f.id === editingFaq.id ? newFaq : f));
      } else {
        setFaqs(prev => [...prev, newFaq]);
      }

      setShowModal(false);
      setEditingFaq(null);
    } catch (error) {
      console.error('Error saving FAQ:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteFaq = async (id: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus FAQ ini?')) return;
    
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setFaqs(prev => prev.filter(f => f.id !== id));
    } catch (error) {
      console.error('Error deleting FAQ:', error);
    } finally {
      setLoading(false);
    }
  };

  const addTag = () => {
    setFaqFormData(prev => ({
      ...prev,
      tags: [...prev.tags, ""]
    }));
  };

  const removeTag = (index: number) => {
    setFaqFormData(prev => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index)
    }));
  };

  const updateTag = (index: number, value: string) => {
    setFaqFormData(prev => ({
      ...prev,
      tags: prev.tags.map((tag, i) => i === index ? value : tag)
    }));
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          FAQ Management
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Kelola Frequently Asked Questions untuk website DLH
        </p>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab("faqs")}
              className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                activeTab === "faqs"
                  ? "border-green-500 text-green-600 dark:text-green-400"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              FAQ Items
            </button>
            <button
              onClick={() => setActiveTab("categories")}
              className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                activeTab === "categories"
                  ? "border-green-500 text-green-600 dark:text-green-400"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
              }`}
            >
              <MessageCircle className="w-4 h-4" />
              Kategori FAQ
            </button>
          </nav>
        </div>
      </div>

      {/* FAQs Tab */}
      {activeTab === "faqs" && (
        <div className="space-y-6">
          {/* Controls */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Cari FAQ..."
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

            <button
              onClick={handleAddFaq}
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2"
            >
              <Plus size={16} />
              Tambah FAQ
            </button>
          </div>

          {/* FAQ List */}
          <div className="space-y-4">
            {filteredFaqs.map((faq) => (
              <div key={faq.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full">
                          {faq.category}
                        </span>
                        {faq.isPublished ? (
                          <Eye size={16} className="text-green-500" />
                        ) : (
                          <EyeOff size={16} className="text-gray-400" />
                        )}
                      </div>
                      <button
                        onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                        className="text-left w-full"
                      >
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 hover:text-green-600 dark:hover:text-green-400 transition-colors">
                          {faq.question}
                        </h3>
                      </button>
                      
                      {expandedFaq === faq.id && (
                        <div className="mt-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <p className="text-gray-700 dark:text-gray-300 mb-3">
                            {faq.answer}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {faq.tags.map((tag, index) => (
                              <span
                                key={index}
                                className="inline-block px-2 py-1 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 text-xs rounded"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2 ml-4">
                      <button
                        onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                      >
                        {expandedFaq === faq.id ? (
                          <ChevronUp size={20} />
                        ) : (
                          <ChevronDown size={20} />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <div className="flex items-center gap-4">
                      <span>{faq.viewCount} views</span>
                      <span>Order: {faq.order}</span>
                      <span>Update: {faq.lastUpdated}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditFaq(faq)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1"
                    >
                      <Edit3 size={14} />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteFaq(faq.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1"
                    >
                      <Trash2 size={14} />
                      Hapus
                    </button>
                  </div>
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
              Kategori FAQ
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
                      {category.faqCount} FAQ items
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

      {/* FAQ Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                {editingFaq ? "Edit FAQ" : "Tambah FAQ"}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmitFaq}>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Kategori
                    </label>
                    <select
                      value={faqFormData.category}
                      onChange={(e) => setFaqFormData(prev => ({ ...prev, category: e.target.value }))}
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
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Urutan
                    </label>
                    <input
                      type="number"
                      value={faqFormData.order}
                      onChange={(e) => setFaqFormData(prev => ({ ...prev, order: parseInt(e.target.value) }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                      min="1"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Pertanyaan
                  </label>
                  <input
                    type="text"
                    value={faqFormData.question}
                    onChange={(e) => setFaqFormData(prev => ({ ...prev, question: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Tulis pertanyaan FAQ..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Jawaban
                  </label>
                  <textarea
                    value={faqFormData.answer}
                    onChange={(e) => setFaqFormData(prev => ({ ...prev, answer: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Tulis jawaban lengkap..."
                    rows={6}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Tags
                  </label>
                  <div className="space-y-2">
                    {faqFormData.tags.map((tag, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="text"
                          value={tag}
                          onChange={(e) => updateTag(index, e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                          placeholder="Tag..."
                        />
                        <button
                          type="button"
                          onClick={() => removeTag(index)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addTag}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-md transition-colors flex items-center gap-1"
                    >
                      <Plus size={16} />
                      Tambah Tag
                    </button>
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isPublished"
                    checked={faqFormData.isPublished}
                    onChange={(e) => setFaqFormData(prev => ({ ...prev, isPublished: e.target.checked }))}
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <label htmlFor="isPublished" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                    Publikasikan FAQ
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
