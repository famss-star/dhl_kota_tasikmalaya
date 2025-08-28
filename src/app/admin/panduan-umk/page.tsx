"use client";

import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, BookOpen, Eye, X, Save } from "lucide-react";

interface UMKGuide {
  id: string;
  title: string;
  content: string;
  category: string;
  order: number;
  isPublished: boolean;
  date: string;
  author: string;
}

export default function PanduanUMKPage() {
  const [guides, setGuides] = useState<UMKGuide[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGuide, setEditingGuide] = useState<UMKGuide | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "pengelolaan-limbah",
    order: 1,
    isPublished: true
  });
  const [selectedCategory, setSelectedCategory] = useState("semua");

  const categories = [
    { value: "semua", label: "Semua Kategori" },
    { value: "pengelolaan-limbah", label: "Pengelolaan Limbah" },
    { value: "izin-lingkungan", label: "Izin Lingkungan" },
    { value: "amdal", label: "AMDAL" },
    { value: "ukl-upl", label: "UKL-UPL" },
    { value: "pencemaran", label: "Pencemaran" },
    { value: "konservasi", label: "Konservasi" },
  ];

  useEffect(() => {
    fetchGuides();
  }, []);

  const fetchGuides = async () => {
    try {
      // TODO: Replace with actual API call
      const mockData: UMKGuide[] = [
        {
          id: "1",
          title: "Cara Mengelola Limbah B3 untuk UMK",
          content: `
            <h2>Pengelolaan Limbah Bahan Berbahaya dan Beracun (B3) untuk Usaha Mikro Kecil</h2>
            <p>Limbah B3 adalah sisa suatu usaha dan/atau kegiatan yang mengandung bahan berbahaya dan beracun yang karena sifat dan/atau konsentrasinya dan/atau jumlahnya, baik secara langsung maupun tidak langsung, dapat mencemarkan dan/atau merusak lingkungan hidup.</p>
            
            <h3>Langkah-langkah Pengelolaan:</h3>
            <ol>
              <li><strong>Identifikasi Limbah B3</strong> - Kenali jenis limbah yang dihasilkan dari kegiatan usaha Anda</li>
              <li><strong>Pewadahan</strong> - Gunakan wadah khusus yang sesuai dengan karakteristik limbah</li>
              <li><strong>Pelabelan</strong> - Beri label yang jelas pada setiap wadah limbah B3</li>
              <li><strong>Penyimpanan Sementara</strong> - Simpan di tempat yang aman dan sesuai standar</li>
              <li><strong>Pengangkutan</strong> - Gunakan jasa pengangkut limbah B3 yang berizin</li>
            </ol>
            
            <h3>Persyaratan Dokumen:</h3>
            <ul>
              <li>Manifest limbah B3</li>
              <li>Surat izin dari transporter</li>
              <li>Dokumen pengelolaan limbah</li>
            </ul>
          `,
          category: "pengelolaan-limbah",
          order: 1,
          isPublished: true,
          date: "2024-08-20",
          author: "Tim DLH Kota Tasikmalaya"
        },
        {
          id: "2",
          title: "Prosedur Pengajuan Izin Lingkungan UMK",
          content: `
            <h2>Prosedur Pengajuan Izin Lingkungan untuk Usaha Mikro Kecil</h2>
            <p>Izin Lingkungan adalah izin yang diberikan kepada setiap orang yang melakukan usaha dan/atau kegiatan yang wajib amdal atau UKL-UPL dalam rangka perlindungan dan pengelolaan lingkungan hidup sebagai prasyarat memperoleh izin usaha dan/atau kegiatan.</p>
            
            <h3>Persyaratan:</h3>
            <ol>
              <li>Formulir permohonan izin lingkungan</li>
              <li>Dokumen UKL-UPL atau AMDAL</li>
              <li>Surat pernyataan kesanggupan melaksanakan UKL-UPL</li>
              <li>Dokumen pendukung lainnya</li>
            </ol>
            
            <h3>Tahapan Proses:</h3>
            <ul>
              <li>Pengajuan dokumen lengkap</li>
              <li>Verifikasi kelengkapan dokumen</li>
              <li>Evaluasi dokumen UKL-UPL</li>
              <li>Penerbitan izin lingkungan</li>
            </ul>
          `,
          category: "izin-lingkungan",
          order: 1,
          isPublished: true,
          date: "2024-08-19",
          author: "Tim DLH Kota Tasikmalaya"
        }
      ];
      setGuides(mockData);
    } catch (error) {
      console.error("Error fetching guides:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingGuide) {
        console.log("Updating guide:", formData);
      } else {
        console.log("Creating guide:", formData);
      }
      
      setIsModalOpen(false);
      setEditingGuide(null);
      setFormData({ title: "", content: "", category: "pengelolaan-limbah", order: 1, isPublished: true });
      fetchGuides();
    } catch (error) {
      console.error("Error saving guide:", error);
    }
  };

  const handleEdit = (guide: UMKGuide) => {
    setEditingGuide(guide);
    setFormData({
      title: guide.title,
      content: guide.content,
      category: guide.category,
      order: guide.order,
      isPublished: guide.isPublished
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus panduan ini?")) {
      try {
        console.log("Deleting guide:", id);
        fetchGuides();
      } catch (error) {
        console.error("Error deleting guide:", error);
      }
    }
  };

  const openCreateModal = () => {
    setEditingGuide(null);
    setFormData({ title: "", content: "", category: "pengelolaan-limbah", order: 1, isPublished: true });
    setIsModalOpen(true);
  };

  const filteredGuides = selectedCategory === "semua" 
    ? guides 
    : guides.filter(guide => guide.category === selectedCategory);

  const sortedGuides = filteredGuides.sort((a, b) => a.order - b.order);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Panduan UMK
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Kelola panduan lingkungan hidup untuk Usaha Mikro Kecil
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <button
          onClick={openCreateModal}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
        >
          <Plus className="w-4 h-4" />
          Tambah Panduan
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

      {/* Guides List */}
      <div className="space-y-4">
        {sortedGuides.map((guide) => (
          <div
            key={guide.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {guide.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
                      <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 px-2 py-1 rounded text-xs">
                        {categories.find(cat => cat.value === guide.category)?.label}
                      </span>
                      <span>Urutan: {guide.order}</span>
                      <span>By: {guide.author}</span>
                      <span>{new Date(guide.date).toLocaleDateString('id-ID')}</span>
                    </div>
                  </div>
                </div>
                
                <div 
                  className="text-gray-600 dark:text-gray-300 mb-3 line-clamp-3"
                  dangerouslySetInnerHTML={{ 
                    __html: guide.content.replace(/<[^>]*>/g, '').substring(0, 200) + '...' 
                  }}
                />

                <div className="flex items-center gap-3">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    guide.isPublished 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
                  }`}>
                    {guide.isPublished ? 'Published' : 'Draft'}
                  </span>
                </div>
              </div>

              <div className="flex gap-2 ml-4">
                <button
                  onClick={() => handleEdit(guide)}
                  className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition"
                  title="Edit"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(guide.id)}
                  className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition"
                  title="Hapus"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {sortedGuides.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-24 h-24 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400">
            Belum ada panduan dalam kategori ini
          </p>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                {editingGuide ? "Edit Panduan" : "Tambah Panduan"}
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
                    Judul Panduan
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
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

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Urutan
                    </label>
                    <input
                      type="number"
                      value={formData.order}
                      onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                      min="1"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Konten Panduan
                  </label>
                  <textarea
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    rows={15}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white font-mono text-sm"
                    placeholder="Gunakan HTML untuk formatting. Contoh: <h2>Judul</h2>, <p>Paragraf</p>, <ul><li>List item</li></ul>"
                    required
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Tip: Gunakan tag HTML untuk formatting seperti &lt;h2&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;ol&gt;, &lt;strong&gt;, dll.
                  </p>
                </div>

                <div className="flex items-center">
                  <input
                    id="isPublished"
                    type="checkbox"
                    checked={formData.isPublished}
                    onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <label htmlFor="isPublished" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                    Publikasikan panduan
                  </label>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  type="submit"
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md flex items-center justify-center gap-2 transition"
                >
                  <Save className="w-4 h-4" />
                  {editingGuide ? "Update" : "Simpan"}
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
