"use client";

import React, { useState, useEffect } from "react";
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Save, 
  X, 
  FileSpreadsheet,
  Download,
  Upload,
  FileText,
  CheckCircle,
  Clock,
  AlertCircle,
  Eye,
  EyeOff
} from "lucide-react";

interface PermitGuide {
  id: string;
  title: string;
  category: string;
  description: string;
  requirements: string[];
  steps: PermitStep[];
  documents: RequiredDocument[];
  fees: Fee[];
  processingTime: string;
  isActive: boolean;
  downloadCount: number;
  lastUpdated: string;
}

interface PermitStep {
  id: string;
  stepNumber: number;
  title: string;
  description: string;
  estimatedTime: string;
  isRequired: boolean;
}

interface RequiredDocument {
  id: string;
  name: string;
  description: string;
  format: string;
  isRequired: boolean;
  template?: string;
}

interface Fee {
  id: string;
  name: string;
  amount: number;
  description: string;
  isOptional: boolean;
}

export default function AdminPanduanPerizinan() {
  const [guides, setGuides] = useState<PermitGuide[]>([]);
  const [filteredGuides, setFilteredGuides] = useState<PermitGuide[]>([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingGuide, setEditingGuide] = useState<PermitGuide | null>(null);
  const [activeTab, setActiveTab] = useState<"info" | "steps" | "documents" | "fees">("info");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    requirements: [""],
    processingTime: "",
    isActive: true
  });

  const [steps, setSteps] = useState<PermitStep[]>([]);
  const [documents, setDocuments] = useState<RequiredDocument[]>([]);
  const [fees, setFees] = useState<Fee[]>([]);

  const categories = [
    "AMDAL",
    "IPLC (Izin Pembuangan Limbah Cair)",
    "SPPL (Surat Pernyataan Pengelolaan Lingkungan)",
    "UKL-UPL",
    "Perizinan Lingkungan Umum",
    "Pengelolaan Sampah",
    "Pengendalian Pencemaran"
  ];

  // Mock data
  useEffect(() => {
    const mockGuides: PermitGuide[] = [
      {
        id: "1",
        title: "Panduan Perizinan AMDAL",
        category: "AMDAL",
        description: "Panduan lengkap untuk mendapatkan izin Analisis Mengenai Dampak Lingkungan (AMDAL)",
        requirements: [
          "Dokumen rencana usaha/kegiatan",
          "Peta lokasi skala 1:10.000",
          "Surat keterangan dari kelurahan",
          "Izin lokasi dari dinas terkait"
        ],
        steps: [
          {
            id: "s1",
            stepNumber: 1,
            title: "Pengajuan Permohonan",
            description: "Mengajukan permohonan AMDAL ke Dinas Lingkungan Hidup",
            estimatedTime: "1-2 hari",
            isRequired: true
          },
          {
            id: "s2",
            stepNumber: 2,
            title: "Verifikasi Dokumen",
            description: "Tim teknis melakukan verifikasi kelengkapan dokumen",
            estimatedTime: "3-5 hari",
            isRequired: true
          },
          {
            id: "s3",
            stepNumber: 3,
            title: "Survei Lapangan",
            description: "Survei lapangan oleh tim teknis untuk penilaian dampak lingkungan",
            estimatedTime: "7-14 hari",
            isRequired: true
          },
          {
            id: "s4",
            stepNumber: 4,
            title: "Penyusunan Dokumen AMDAL",
            description: "Penyusunan dokumen AMDAL berdasarkan hasil survei",
            estimatedTime: "30-45 hari",
            isRequired: true
          }
        ],
        documents: [
          {
            id: "d1",
            name: "Formulir Permohonan AMDAL",
            description: "Formulir standar permohonan izin AMDAL",
            format: "PDF",
            isRequired: true,
            template: "/templates/amdal-form.pdf"
          },
          {
            id: "d2",
            name: "Dokumen Rencana Usaha",
            description: "Dokumen detail rencana usaha atau kegiatan",
            format: "PDF/DOC",
            isRequired: true
          },
          {
            id: "d3",
            name: "Peta Lokasi",
            description: "Peta lokasi kegiatan skala 1:10.000",
            format: "PDF/JPG",
            isRequired: true
          }
        ],
        fees: [
          {
            id: "f1",
            name: "Biaya Administrasi",
            amount: 500000,
            description: "Biaya administrasi pengajuan AMDAL",
            isOptional: false
          },
          {
            id: "f2",
            name: "Biaya Survei Lapangan",
            amount: 2000000,
            description: "Biaya survei dan assessment lapangan",
            isOptional: false
          },
          {
            id: "f3",
            name: "Biaya Konsultasi Teknis",
            amount: 1000000,
            description: "Biaya konsultasi teknis dengan ahli lingkungan",
            isOptional: true
          }
        ],
        processingTime: "60-90 hari kerja",
        isActive: true,
        downloadCount: 234,
        lastUpdated: "2024-08-20"
      },
      {
        id: "2",
        title: "Panduan Perizinan IPLC",
        category: "IPLC (Izin Pembuangan Limbah Cair)",
        description: "Panduan untuk mendapatkan Izin Pembuangan Limbah Cair ke badan air",
        requirements: [
          "Data karakteristik limbah cair",
          "Rancangan sistem pengolahan limbah",
          "Hasil uji laboratorium",
          "Surat pernyataan kesanggupan"
        ],
        steps: [
          {
            id: "s1",
            stepNumber: 1,
            title: "Pengajuan Permohonan",
            description: "Mengajukan permohonan IPLC ke Dinas Lingkungan Hidup",
            estimatedTime: "1 hari",
            isRequired: true
          },
          {
            id: "s2",
            stepNumber: 2,
            title: "Verifikasi Teknis",
            description: "Verifikasi teknis sistem pengolahan limbah",
            estimatedTime: "5-7 hari",
            isRequired: true
          },
          {
            id: "s3",
            stepNumber: 3,
            title: "Inspeksi Lapangan",
            description: "Inspeksi sistem pengolahan limbah di lapangan",
            estimatedTime: "3-5 hari",
            isRequired: true
          }
        ],
        documents: [
          {
            id: "d1",
            name: "Formulir Permohonan IPLC",
            description: "Formulir standar permohonan IPLC",
            format: "PDF",
            isRequired: true,
            template: "/templates/iplc-form.pdf"
          },
          {
            id: "d2",
            name: "Data Karakteristik Limbah",
            description: "Data lengkap karakteristik limbah cair",
            format: "Excel/PDF",
            isRequired: true
          }
        ],
        fees: [
          {
            id: "f1",
            name: "Biaya Administrasi",
            amount: 300000,
            description: "Biaya administrasi pengajuan IPLC",
            isOptional: false
          },
          {
            id: "f2",
            name: "Biaya Inspeksi",
            amount: 800000,
            description: "Biaya inspeksi sistem pengolahan limbah",
            isOptional: false
          }
        ],
        processingTime: "30-45 hari kerja",
        isActive: true,
        downloadCount: 156,
        lastUpdated: "2024-08-18"
      }
    ];

    setGuides(mockGuides);
    setFilteredGuides(mockGuides);
  }, []);

  // Filter guides
  useEffect(() => {
    let filtered = guides;

    if (searchTerm) {
      filtered = filtered.filter(guide => 
        guide.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        guide.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        guide.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(guide => guide.category === selectedCategory);
    }

    setFilteredGuides(filtered);
  }, [searchTerm, selectedCategory, guides]);

  const handleEditGuide = (guide: PermitGuide) => {
    setEditingGuide(guide);
    setFormData({
      title: guide.title,
      category: guide.category,
      description: guide.description,
      requirements: guide.requirements,
      processingTime: guide.processingTime,
      isActive: guide.isActive
    });
    setSteps(guide.steps);
    setDocuments(guide.documents);
    setFees(guide.fees);
    setShowModal(true);
  };

  const handleAddGuide = () => {
    setEditingGuide(null);
    setFormData({
      title: "",
      category: categories[0],
      description: "",
      requirements: [""],
      processingTime: "",
      isActive: true
    });
    setSteps([]);
    setDocuments([]);
    setFees([]);
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newGuide: PermitGuide = {
        id: editingGuide?.id || Date.now().toString(),
        ...formData,
        steps,
        documents,
        fees,
        downloadCount: editingGuide?.downloadCount || 0,
        lastUpdated: new Date().toISOString().split('T')[0]
      };

      if (editingGuide) {
        setGuides(prev => prev.map(g => g.id === editingGuide.id ? newGuide : g));
      } else {
        setGuides(prev => [...prev, newGuide]);
      }

      setShowModal(false);
      setEditingGuide(null);
    } catch (error) {
      console.error('Error saving guide:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus panduan ini?')) return;
    
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setGuides(prev => prev.filter(g => g.id !== id));
    } catch (error) {
      console.error('Error deleting guide:', error);
    } finally {
      setLoading(false);
    }
  };

  const addRequirement = () => {
    setFormData(prev => ({
      ...prev,
      requirements: [...prev.requirements, ""]
    }));
  };

  const removeRequirement = (index: number) => {
    setFormData(prev => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== index)
    }));
  };

  const updateRequirement = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      requirements: prev.requirements.map((req, i) => i === index ? value : req)
    }));
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          Panduan Perizinan
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Kelola panduan dan prosedur perizinan lingkungan hidup
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          <div className="relative">
            <input
              type="text"
              placeholder="Cari panduan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-4 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white w-64"
            />
          </div>
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="">Semua Kategori</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleAddGuide}
          className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2"
        >
          <Plus size={16} />
          Tambah Panduan
        </button>
      </div>

      {/* Guides Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredGuides.map((guide) => (
          <div key={guide.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <FileSpreadsheet className="w-5 h-5 text-green-600" />
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                    {guide.title}
                  </h3>
                </div>
                <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full mb-2">
                  {guide.category}
                </span>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                  {guide.description}
                </p>
              </div>
              
              <div className="flex items-center gap-1 ml-4">
                {guide.isActive ? (
                  <Eye size={16} className="text-green-500" />
                ) : (
                  <EyeOff size={16} className="text-gray-400" />
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-500" />
                <span className="text-gray-600 dark:text-gray-400">
                  {guide.processingTime}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Download className="w-4 h-4 text-gray-500" />
                <span className="text-gray-600 dark:text-gray-400">
                  {guide.downloadCount} unduhan
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mb-4">
              <span>{guide.steps.length} langkah</span>
              <span>•</span>
              <span>{guide.documents.length} dokumen</span>
              <span>•</span>
              <span>Update: {guide.lastUpdated}</span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleEditGuide(guide)}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1"
              >
                <Edit3 size={14} />
                Edit
              </button>
              <button
                onClick={() => handleDelete(guide.id)}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1"
              >
                <Trash2 size={14} />
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                {editingGuide ? "Edit Panduan" : "Tambah Panduan"}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X size={20} />
              </button>
            </div>

            {/* Tabs */}
            <div className="mb-6">
              <div className="border-b border-gray-200 dark:border-gray-700">
                <nav className="-mb-px flex space-x-8">
                  {[
                    { id: "info", label: "Info Dasar", icon: FileText },
                    { id: "steps", label: "Langkah-langkah", icon: CheckCircle },
                    { id: "documents", label: "Dokumen", icon: FileSpreadsheet },
                    { id: "fees", label: "Biaya", icon: AlertCircle }
                  ].map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                          activeTab === tab.id
                            ? "border-green-500 text-green-600 dark:text-green-400"
                            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        {tab.label}
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Info Tab */}
              {activeTab === "info" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Judul Panduan
                      </label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                        placeholder="Contoh: Panduan Perizinan AMDAL"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Kategori
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                        required
                      >
                        {categories.map(category => (
                          <option key={category} value={category}>
                            {category}
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
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Deskripsi panduan perizinan"
                      rows={3}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Waktu Pemrosesan
                    </label>
                    <input
                      type="text"
                      value={formData.processingTime}
                      onChange={(e) => setFormData(prev => ({ ...prev, processingTime: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Contoh: 30-45 hari kerja"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Persyaratan Umum
                    </label>
                    <div className="space-y-2">
                      {formData.requirements.map((req, index) => (
                        <div key={index} className="flex gap-2">
                          <input
                            type="text"
                            value={req}
                            onChange={(e) => updateRequirement(index, e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                            placeholder="Persyaratan..."
                          />
                          <button
                            type="button"
                            onClick={() => removeRequirement(index)}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={addRequirement}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-md transition-colors flex items-center gap-1"
                      >
                        <Plus size={16} />
                        Tambah Persyaratan
                      </button>
                    </div>
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
                      Aktifkan panduan
                    </label>
                  </div>
                </div>
              )}

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
