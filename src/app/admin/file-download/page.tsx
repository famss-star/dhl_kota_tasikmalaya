"use client";

import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Download, FolderOpen, X, Save, FileIcon } from "lucide-react";

interface DownloadFile {
  id: string;
  title: string;
  description: string;
  fileName: string;
  fileUrl: string;
  fileSize: string;
  category: string;
  date: string;
  downloadCount: number;
  isPublic: boolean;
}

export default function FileDownloadPage() {
  const [downloadFiles, setDownloadFiles] = useState<DownloadFile[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFile, setEditingFile] = useState<DownloadFile | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    fileName: "",
    fileUrl: "",
    category: "formulir",
    isPublic: true
  });
  const [selectedCategory, setSelectedCategory] = useState("semua");

  const categories = [
    { value: "semua", label: "Semua Kategori" },
    { value: "formulir", label: "Formulir" },
    { value: "template", label: "Template" },
    { value: "panduan", label: "Panduan" },
    { value: "prosedur", label: "Prosedur" },
    { value: "aplikasi", label: "Aplikasi" },
  ];

  useEffect(() => {
    fetchDownloadFiles();
  }, []);

  const fetchDownloadFiles = async () => {
    try {
      // TODO: Replace with actual API call
      const mockData: DownloadFile[] = [
        {
          id: "1",
          title: "Formulir Permohonan Izin Lingkungan",
          description: "Formulir untuk pengajuan permohonan izin lingkungan bagi kegiatan usaha",
          fileName: "formulir-izin-lingkungan.pdf",
          fileUrl: "/downloads/formulir-izin-lingkungan.pdf",
          fileSize: "856 KB",
          category: "formulir",
          date: "2024-08-20",
          downloadCount: 245,
          isPublic: true
        },
        {
          id: "2",
          title: "Template Laporan AMDAL",
          description: "Template untuk penyusunan laporan Analisis Mengenai Dampak Lingkungan",
          fileName: "template-amdal.docx",
          fileUrl: "/downloads/template-amdal.docx",
          fileSize: "2.1 MB",
          category: "template",
          date: "2024-08-19",
          downloadCount: 89,
          isPublic: true
        },
        {
          id: "3",
          title: "Panduan Penggunaan Aplikasi SILH",
          description: "Panduan lengkap penggunaan Sistem Informasi Lingkungan Hidup",
          fileName: "panduan-silh.pdf",
          fileUrl: "/downloads/panduan-silh.pdf",
          fileSize: "5.2 MB",
          category: "panduan",
          date: "2024-08-18",
          downloadCount: 156,
          isPublic: true
        }
      ];
      setDownloadFiles(mockData);
    } catch (error) {
      console.error("Error fetching download files:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingFile) {
        console.log("Updating download file:", formData);
      } else {
        console.log("Creating download file:", formData);
      }
      
      setIsModalOpen(false);
      setEditingFile(null);
      setFormData({ title: "", description: "", fileName: "", fileUrl: "", category: "formulir", isPublic: true });
      fetchDownloadFiles();
    } catch (error) {
      console.error("Error saving download file:", error);
    }
  };

  const handleEdit = (file: DownloadFile) => {
    setEditingFile(file);
    setFormData({
      title: file.title,
      description: file.description,
      fileName: file.fileName,
      fileUrl: file.fileUrl,
      category: file.category,
      isPublic: file.isPublic
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus file ini?")) {
      try {
        console.log("Deleting download file:", id);
        fetchDownloadFiles();
      } catch (error) {
        console.error("Error deleting download file:", error);
      }
    }
  };

  const openCreateModal = () => {
    setEditingFile(null);
    setFormData({ title: "", description: "", fileName: "", fileUrl: "", category: "formulir", isPublic: true });
    setIsModalOpen(true);
  };

  const filteredFiles = selectedCategory === "semua" 
    ? downloadFiles 
    : downloadFiles.filter(file => file.category === selectedCategory);

  const handleDownload = (file: DownloadFile) => {
    // TODO: Implement actual download and increment counter
    console.log("Downloading:", file.fileName);
  };

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'pdf':
        return '📄';
      case 'doc':
      case 'docx':
        return '📝';
      case 'xls':
      case 'xlsx':
        return '📊';
      case 'ppt':
      case 'pptx':
        return '📋';
      case 'zip':
      case 'rar':
        return '📦';
      default:
        return '📁';
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          File Download
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Kelola file download untuk masyarakat
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <button
          onClick={openCreateModal}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
        >
          <Plus className="w-4 h-4" />
          Tambah File
        </button>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
        >
          {categories.map((category) => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>
      </div>

      {/* Files Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFiles.map((file) => (
          <div
            key={file.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="text-2xl">
                  {getFileIcon(file.fileName)}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1 line-clamp-2">
                    {file.title}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {file.fileName}
                  </p>
                </div>
              </div>
              
              <div className="flex gap-1">
                <button
                  onClick={() => handleDownload(file)}
                  className="text-green-600 hover:text-green-700 p-1"
                  title="Download"
                >
                  <Download className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleEdit(file)}
                  className="text-blue-600 hover:text-blue-700 p-1"
                  title="Edit"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(file.id)}
                  className="text-red-600 hover:text-red-700 p-1"
                  title="Hapus"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
              {file.description}
            </p>

            <div className="space-y-2 text-xs text-gray-500 dark:text-gray-400">
              <div className="flex justify-between">
                <span>Ukuran:</span>
                <span>{file.fileSize}</span>
              </div>
              <div className="flex justify-between">
                <span>Download:</span>
                <span>{file.downloadCount}x</span>
              </div>
              <div className="flex justify-between">
                <span>Tanggal:</span>
                <span>{new Date(file.date).toLocaleDateString('id-ID')}</span>
              </div>
            </div>

            <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 px-2 py-1 rounded text-xs">
                {categories.find(cat => cat.value === file.category)?.label}
              </span>
              
              <div className="flex items-center gap-2">
                {file.isPublic ? (
                  <span className="text-green-600 dark:text-green-400 text-xs">Public</span>
                ) : (
                  <span className="text-red-600 dark:text-red-400 text-xs">Private</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredFiles.length === 0 && (
        <div className="text-center py-12">
          <FolderOpen className="w-24 h-24 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400">
            Belum ada file dalam kategori ini
          </p>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                {editingFile ? "Edit File" : "Tambah File"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Judul File
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Deskripsi
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Nama File
                  </label>
                  <input
                    type="text"
                    value={formData.fileName}
                    onChange={(e) => setFormData({ ...formData, fileName: e.target.value })}
                    placeholder="contoh: formulir-izin.pdf"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    URL File
                  </label>
                  <input
                    type="url"
                    value={formData.fileUrl}
                    onChange={(e) => setFormData({ ...formData, fileUrl: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Kategori
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                    required
                  >
                    {categories.filter(cat => cat.value !== "semua").map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center">
                  <input
                    id="isPublic"
                    type="checkbox"
                    checked={formData.isPublic}
                    onChange={(e) => setFormData({ ...formData, isPublic: e.target.checked })}
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <label htmlFor="isPublic" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                    File dapat diakses publik
                  </label>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  type="submit"
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md flex items-center justify-center gap-2 transition"
                >
                  <Save className="w-4 h-4" />
                  {editingFile ? "Update" : "Simpan"}
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-md transition"
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
