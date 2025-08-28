"use client";

import { useState } from "react";
import { FileCog, Plus, Search, Edit, Trash2, Eye, Download, Upload, Calendar, FileText, Filter, MoreVertical, CheckCircle, AlertCircle, Clock } from "lucide-react";

// Mock data untuk SOP IPAL
const mockSopIpal = [
  {
    id: 1,
    judul: "SOP Operasional IPAL Komunal Tipe A",
    kategori: "IPAL Komunal",
    status: "aktif",
    tanggalTerbit: "2024-01-15",
    versi: "2.1",
    ukuranFile: "2.5 MB",
    fileUrl: "/documents/sop-ipal-komunal-a.pdf",
    deskripsi: "Standard Operating Procedure untuk operasional dan pemeliharaan IPAL komunal tipe A dengan kapasitas 100-500 jiwa",
    penanggungjawab: "Bidang Pengendalian Pencemaran",
    lastUpdate: "2024-08-15"
  },
  {
    id: 2,
    judul: "SOP Monitoring Kualitas Air Limbah IPAL",
    kategori: "Monitoring",
    status: "aktif",
    tanggalTerbit: "2024-02-20",
    versi: "1.8",
    ukuranFile: "1.8 MB",
    fileUrl: "/documents/sop-monitoring-ipal.pdf",
    deskripsi: "Prosedur monitoring dan evaluasi kualitas air limbah yang diolah di IPAL",
    penanggungjawab: "Bidang Pengendalian Pencemaran",
    lastUpdate: "2024-07-20"
  },
  {
    id: 3,
    judul: "SOP Pemeliharaan Rutin IPAL Industri",
    kategori: "IPAL Industri",
    status: "review",
    tanggalTerbit: "2023-11-10",
    versi: "3.0",
    ukuranFile: "3.2 MB",
    fileUrl: "/documents/sop-pemeliharaan-ipal-industri.pdf",
    deskripsi: "Standard Operating Procedure untuk pemeliharaan rutin IPAL industri",
    penanggungjawab: "Bidang Pengendalian Pencemaran",
    lastUpdate: "2024-06-10"
  },
  {
    id: 4,
    judul: "SOP Pengelolaan Lumpur IPAL",
    kategori: "Pengelolaan Limbah",
    status: "draft",
    tanggalTerbit: "2024-03-05",
    versi: "1.2",
    ukuranFile: "2.1 MB",
    fileUrl: "/documents/sop-lumpur-ipal.pdf",
    deskripsi: "Prosedur pengelolaan lumpur hasil pengolahan air limbah di IPAL",
    penanggungjawab: "Bidang Pengelolaan Sampah",
    lastUpdate: "2024-08-05"
  }
];

const kategoriBadgeColors: Record<string, string> = {
  "IPAL Komunal": "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  "IPAL Industri": "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
  "Monitoring": "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  "Pengelolaan Limbah": "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
};

const statusConfig = {
  aktif: { label: "Aktif", color: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300", icon: CheckCircle },
  review: { label: "Review", color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300", icon: Clock },
  draft: { label: "Draft", color: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300", icon: AlertCircle }
};

export default function AdminSopIpal() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedKategori, setSelectedKategori] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedSop, setSelectedSop] = useState<any>(null);
  const [sopData, setSopData] = useState(mockSopIpal);

  // Filter data berdasarkan pencarian dan filter
  const filteredSopData = sopData.filter(sop => {
    const matchSearch = sop.judul.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       sop.deskripsi.toLowerCase().includes(searchTerm.toLowerCase());
    const matchKategori = selectedKategori === "" || sop.kategori === selectedKategori;
    const matchStatus = selectedStatus === "" || sop.status === selectedStatus;
    
    return matchSearch && matchKategori && matchStatus;
  });

  const kategoris = Array.from(new Set(sopData.map(sop => sop.kategori)));
  const statuses = Array.from(new Set(sopData.map(sop => sop.status)));

  const handleDelete = (id: number) => {
    if (confirm("Apakah Anda yakin ingin menghapus SOP ini?")) {
      setSopData(prev => prev.filter(sop => sop.id !== id));
    }
  };

  const handleView = (sop: any) => {
    setSelectedSop(sop);
    setShowDetailModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-3">
              <FileCog className="w-9 h-9 text-white" />
              Manajemen SOP IPAL
            </h1>
            <p className="text-xl md:text-2xl opacity-90">Kelola Standard Operating Procedure Instalasi Pengolahan Air Limbah</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-8xl mx-auto">
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{sopData.length}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total SOP</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{sopData.filter(s => s.status === 'aktif').length}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">SOP Aktif</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{sopData.filter(s => s.status === 'review').length}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Dalam Review</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{sopData.filter(s => s.status === 'draft').length}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Draft</p>
                </div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8 border border-gray-200 dark:border-gray-700">
            <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
              <div className="flex flex-col md:flex-row gap-4 flex-1">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Cari SOP IPAL..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white w-full md:w-80"
                  />
                </div>

                {/* Filters */}
                <div className="flex gap-3">
                  <select
                    value={selectedKategori}
                    onChange={(e) => setSelectedKategori(e.target.value)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="">Semua Kategori</option>
                    {kategoris.map(kategori => (
                      <option key={kategori} value={kategori}>{kategori}</option>
                    ))}
                  </select>

                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="">Semua Status</option>
                    {statuses.map(status => (
                      <option key={status} value={status}>{statusConfig[status as keyof typeof statusConfig]?.label || status}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Add Button */}
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Tambah SOP IPAL
              </button>
            </div>
          </div>

          {/* SOP List */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">SOP IPAL</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Kategori</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Tanggal</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Aksi</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredSopData.map((sop) => {
                    const StatusIcon = statusConfig[sop.status as keyof typeof statusConfig]?.icon || AlertCircle;
                    return (
                      <tr key={sop.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="px-6 py-4">
                          <div>
                            <div className="text-sm font-medium text-gray-900 dark:text-white">{sop.judul}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">{sop.deskripsi.slice(0, 100)}...</div>
                            <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                              Versi {sop.versi} • {sop.ukuranFile}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${kategoriBadgeColors[sop.kategori] || 'bg-gray-100 text-gray-800'}`}>
                            {sop.kategori}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig[sop.status as keyof typeof statusConfig]?.color || 'bg-gray-100 text-gray-800'}`}>
                            <StatusIcon className="w-3 h-3" />
                            {statusConfig[sop.status as keyof typeof statusConfig]?.label || sop.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                          <div>{new Date(sop.tanggalTerbit).toLocaleDateString('id-ID')}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            Update: {new Date(sop.lastUpdate).toLocaleDateString('id-ID')}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleView(sop)}
                              className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                              title="Lihat Detail"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300"
                              title="Download"
                            >
                              <Download className="w-4 h-4" />
                            </button>
                            <button
                              className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300"
                              title="Edit"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(sop.id)}
                              className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                              title="Hapus"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {filteredSopData.length === 0 && (
              <div className="text-center py-12">
                <FileCog className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">Tidak ada SOP IPAL yang ditemukan</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedSop && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Detail SOP IPAL</h3>
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <span className="sr-only">Close</span>
                  ✕
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Judul SOP</label>
                  <p className="text-lg font-medium text-gray-900 dark:text-white">{selectedSop.judul}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Kategori</label>
                    <p className="text-gray-900 dark:text-white">{selectedSop.kategori}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Status</label>
                    <p className="text-gray-900 dark:text-white">{statusConfig[selectedSop.status as keyof typeof statusConfig]?.label}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Versi</label>
                    <p className="text-gray-900 dark:text-white">{selectedSop.versi}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Ukuran File</label>
                    <p className="text-gray-900 dark:text-white">{selectedSop.ukuranFile}</p>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Deskripsi</label>
                  <p className="text-gray-900 dark:text-white">{selectedSop.deskripsi}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Penanggung Jawab</label>
                  <p className="text-gray-900 dark:text-white">{selectedSop.penanggungjawab}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Tanggal Terbit</label>
                    <p className="text-gray-900 dark:text-white">{new Date(selectedSop.tanggalTerbit).toLocaleDateString('id-ID')}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Terakhir Update</label>
                    <p className="text-gray-900 dark:text-white">{new Date(selectedSop.lastUpdate).toLocaleDateString('id-ID')}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex gap-3">
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2">
                <Download className="w-4 h-4" />
                Download SOP
              </button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2">
                <Edit className="w-4 h-4" />
                Edit SOP
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
