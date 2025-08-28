"use client";

import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Scale, Download, X, Save, Calendar } from "lucide-react";

interface Regulation {
  id: string;
  title: string;
  number: string;
  year: number;
  type: string;
  description: string;
  fileUrl: string;
  status: string;
  date: string;
  downloadCount: number;
}

export default function PeraturanPage() {
  const [regulations, setRegulations] = useState<Regulation[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRegulation, setEditingRegulation] = useState<Regulation | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    number: "",
    year: new Date().getFullYear(),
    type: "perda",
    description: "",
    fileUrl: "",
    status: "berlaku"
  });
  const [selectedType, setSelectedType] = useState("semua");
  const [selectedYear, setSelectedYear] = useState("semua");

  const regulationTypes = [
    { value: "semua", label: "Semua Jenis" },
    { value: "perda", label: "Peraturan Daerah" },
    { value: "perwali", label: "Peraturan Walikota" },
    { value: "peraturan-menteri", label: "Peraturan Menteri" },
    { value: "pp", label: "Peraturan Pemerintah" },
    { value: "uu", label: "Undang-Undang" },
  ];

  const statusOptions = [
    { value: "berlaku", label: "Berlaku" },
    { value: "dicabut", label: "Dicabut" },
    { value: "direvisi", label: "Direvisi" },
  ];

  const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i);

  useEffect(() => {
    fetchRegulations();
  }, []);

  const fetchRegulations = async () => {
    try {
      // TODO: Replace with actual API call
      const mockData: Regulation[] = [
        {
          id: "1",
          title: "Pengelolaan Sampah Rumah Tangga dan Sampah Sejenis Sampah Rumah Tangga",
          number: "15",
          year: 2023,
          type: "perda",
          description: "Peraturan Daerah tentang pengelolaan sampah rumah tangga dan sampah sejenis sampah rumah tangga di Kota Tasikmalaya",
          fileUrl: "/regulations/perda-15-2023.pdf",
          status: "berlaku",
          date: "2023-12-20",
          downloadCount: 156
        },
        {
          id: "2",
          title: "Perlindungan dan Pengelolaan Lingkungan Hidup",
          number: "32",
          year: 2022,
          type: "perwali",
          description: "Peraturan Walikota tentang perlindungan dan pengelolaan lingkungan hidup",
          fileUrl: "/regulations/perwali-32-2022.pdf",
          status: "berlaku",
          date: "2022-08-15",
          downloadCount: 89
        }
      ];
      setRegulations(mockData);
    } catch (error) {
      console.error("Error fetching regulations:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingRegulation) {
        console.log("Updating regulation:", formData);
      } else {
        console.log("Creating regulation:", formData);
      }
      
      setIsModalOpen(false);
      setEditingRegulation(null);
      setFormData({ 
        title: "", 
        number: "", 
        year: new Date().getFullYear(), 
        type: "perda", 
        description: "", 
        fileUrl: "", 
        status: "berlaku" 
      });
      fetchRegulations();
    } catch (error) {
      console.error("Error saving regulation:", error);
    }
  };

  const handleEdit = (regulation: Regulation) => {
    setEditingRegulation(regulation);
    setFormData({
      title: regulation.title,
      number: regulation.number,
      year: regulation.year,
      type: regulation.type,
      description: regulation.description,
      fileUrl: regulation.fileUrl,
      status: regulation.status
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus peraturan ini?")) {
      try {
        console.log("Deleting regulation:", id);
        fetchRegulations();
      } catch (error) {
        console.error("Error deleting regulation:", error);
      }
    }
  };

  const openCreateModal = () => {
    setEditingRegulation(null);
    setFormData({ 
      title: "", 
      number: "", 
      year: new Date().getFullYear(), 
      type: "perda", 
      description: "", 
      fileUrl: "", 
      status: "berlaku" 
    });
    setIsModalOpen(true);
  };

  const filteredRegulations = regulations.filter(reg => {
    const typeMatch = selectedType === "semua" || reg.type === selectedType;
    const yearMatch = selectedYear === "semua" || reg.year.toString() === selectedYear;
    return typeMatch && yearMatch;
  });

  const handleDownload = (regulation: Regulation) => {
    // TODO: Implement actual download and increment counter
    console.log("Downloading:", regulation.fileUrl);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "berlaku":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "dicabut":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      case "direvisi":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Manajemen Peraturan
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Kelola peraturan dan regulasi lingkungan hidup
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <button
          onClick={openCreateModal}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
        >
          <Plus className="w-4 h-4" />
          Tambah Peraturan
        </button>

        <div className="flex gap-4">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
          >
            {regulationTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>

          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="semua">Semua Tahun</option>
            {years.map((year) => (
              <option key={year} value={year.toString()}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Regulations List */}
      <div className="space-y-4">
        {filteredRegulations.map((regulation) => (
          <div
            key={regulation.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <Scale className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {regulation.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
                      <span className="font-medium">
                        {regulationTypes.find(type => type.value === regulation.type)?.label} No. {regulation.number} Tahun {regulation.year}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(regulation.date).toLocaleDateString('id-ID')}
                      </span>
                      <span>{regulation.downloadCount} download</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 mb-3">
                  {regulation.description}
                </p>

                <div className="flex items-center gap-3">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(regulation.status)}`}>
                    {statusOptions.find(status => status.value === regulation.status)?.label}
                  </span>
                </div>
              </div>

              <div className="flex gap-2 ml-4">
                <button
                  onClick={() => handleDownload(regulation)}
                  className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-lg transition"
                  title="Download"
                >
                  <Download className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleEdit(regulation)}
                  className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition"
                  title="Edit"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(regulation.id)}
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

      {filteredRegulations.length === 0 && (
        <div className="text-center py-12">
          <Scale className="w-24 h-24 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400">
            Belum ada peraturan yang sesuai dengan filter yang dipilih
          </p>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                {editingRegulation ? "Edit Peraturan" : "Tambah Peraturan"}
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
                    Judul Peraturan
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
                      Nomor
                    </label>
                    <input
                      type="text"
                      value={formData.number}
                      onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Tahun
                    </label>
                    <input
                      type="number"
                      value={formData.year}
                      onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                      min="2000"
                      max="2050"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Jenis Peraturan
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                    required
                  >
                    {regulationTypes.filter(type => type.value !== "semua").map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
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
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                    required
                  >
                    {statusOptions.map((status) => (
                      <option key={status.value} value={status.value}>
                        {status.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  type="submit"
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md flex items-center justify-center gap-2 transition"
                >
                  <Save className="w-4 h-4" />
                  {editingRegulation ? "Update" : "Simpan"}
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
