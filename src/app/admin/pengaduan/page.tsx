"use client";

import { useState, useEffect } from "react";
import { MessageSquare, Eye, CheckCircle, Clock, XCircle, Calendar, User, MapPin } from "lucide-react";

interface Complaint {
  id: string;
  title: string;
  description: string;
  category: string;
  status: string;
  priority: string;
  submitterName: string;
  submitterEmail: string;
  submitterPhone: string;
  location: string;
  date: string;
  response?: string;
  responseDate?: string;
  responseBy?: string;
  attachments?: string[];
}

export default function PengaduanPage() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isResponseModalOpen, setIsResponseModalOpen] = useState(false);
  const [responseText, setResponseText] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("semua");
  const [selectedCategory, setSelectedCategory] = useState("semua");

  const statusOptions = [
    { value: "semua", label: "Semua Status" },
    { value: "baru", label: "Baru" },
    { value: "diproses", label: "Sedang Diproses" },
    { value: "selesai", label: "Selesai" },
    { value: "ditolak", label: "Ditolak" },
  ];

  const categoryOptions = [
    { value: "semua", label: "Semua Kategori" },
    { value: "pencemaran-air", label: "Pencemaran Air" },
    { value: "pencemaran-udara", label: "Pencemaran Udara" },
    { value: "pencemaran-tanah", label: "Pencemaran Tanah" },
    { value: "kebisingan", label: "Kebisingan" },
    { value: "sampah", label: "Sampah" },
    { value: "limbah-b3", label: "Limbah B3" },
    { value: "lainnya", label: "Lainnya" },
  ];

  const priorityOptions = [
    { value: "rendah", label: "Rendah", color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" },
    { value: "sedang", label: "Sedang", color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300" },
    { value: "tinggi", label: "Tinggi", color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300" },
  ];

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      // TODO: Replace with actual API call
      const mockData: Complaint[] = [
        {
          id: "1",
          title: "Pencemaran Air Sungai Citanduy",
          description: "Terdapat limbah industri yang dibuang ke Sungai Citanduy, menyebabkan air berubah warna dan berbau tidak sedap. Hal ini sangat mengganggu warga sekitar dan dapat membahayakan kesehatan.",
          category: "pencemaran-air",
          status: "baru",
          priority: "tinggi",
          submitterName: "Ahmad Fauzi",
          submitterEmail: "ahmad.fauzi@email.com",
          submitterPhone: "081234567890",
          location: "Jl. Sungai Citanduy, Kelurahan Sukarame",
          date: "2024-08-21",
          attachments: ["/uploads/complaints/sungai-citanduy-1.jpg", "/uploads/complaints/sungai-citanduy-2.jpg"]
        },
        {
          id: "2",
          title: "Asap Hitam dari Pabrik",
          description: "Pabrik di kawasan industri mengeluarkan asap hitam pekat yang mencemari udara. Asap ini sangat mengganggu pernapasan warga di sekitar pabrik.",
          category: "pencemaran-udara",
          status: "diproses",
          priority: "sedang",
          submitterName: "Siti Nurhaliza",
          submitterEmail: "siti.nurhaliza@email.com",
          submitterPhone: "081987654321",
          location: "Kawasan Industri Cikurubuk",
          date: "2024-08-20",
          response: "Kami telah melakukan inspeksi ke lokasi dan sedang melakukan pengambilan sampel udara untuk analisis lebih lanjut.",
          responseDate: "2024-08-21",
          responseBy: "Tim Pengawasan DLH"
        },
        {
          id: "3",
          title: "Tumpukan Sampah di Jalan Raya",
          description: "Terdapat tumpukan sampah yang tidak diangkut selama beberapa hari di pinggir jalan raya, menimbulkan bau tidak sedap dan mengundang lalat.",
          category: "sampah",
          status: "selesai",
          priority: "rendah",
          submitterName: "Budi Santoso",
          submitterEmail: "budi.santoso@email.com",
          submitterPhone: "081122334455",
          location: "Jl. A.H. Nasution, Kelurahan Tamansari",
          date: "2024-08-18",
          response: "Sampah telah diangkut dan kami telah meningkatkan frekuensi pengangkutan sampah di lokasi tersebut.",
          responseDate: "2024-08-19",
          responseBy: "Dinas Kebersihan"
        }
      ];
      setComplaints(mockData);
    } catch (error) {
      console.error("Error fetching complaints:", error);
    }
  };

  const handleViewDetail = (complaint: Complaint) => {
    setSelectedComplaint(complaint);
    setIsDetailModalOpen(true);
  };

  const handleRespond = (complaint: Complaint) => {
    setSelectedComplaint(complaint);
    setResponseText(complaint.response || "");
    setIsResponseModalOpen(true);
  };

  const handleSubmitResponse = async () => {
    if (!selectedComplaint) return;
    
    try {
      // TODO: Implement actual API call
      console.log("Submitting response:", {
        complaintId: selectedComplaint.id,
        response: responseText,
        status: "diproses"
      });
      
      setIsResponseModalOpen(false);
      setResponseText("");
      fetchComplaints();
    } catch (error) {
      console.error("Error submitting response:", error);
    }
  };

  const handleUpdateStatus = async (complaintId: string, newStatus: string) => {
    try {
      // TODO: Implement actual API call
      console.log("Updating status:", { complaintId, newStatus });
      fetchComplaints();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const filteredComplaints = complaints.filter(complaint => {
    const statusMatch = selectedStatus === "semua" || complaint.status === selectedStatus;
    const categoryMatch = selectedCategory === "semua" || complaint.category === selectedCategory;
    return statusMatch && categoryMatch;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "baru":
        return <Clock className="w-4 h-4 text-blue-600" />;
      case "diproses":
        return <MessageSquare className="w-4 h-4 text-yellow-600" />;
      case "selesai":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "ditolak":
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "baru":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "diproses":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "selesai":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "ditolak":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Manajemen Pengaduan
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Kelola pengaduan masyarakat terkait lingkungan hidup
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 dark:text-blue-400 text-sm font-medium">Pengaduan Baru</p>
              <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                {complaints.filter(c => c.status === "baru").length}
              </p>
            </div>
            <Clock className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
        </div>

        <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border border-yellow-200 dark:border-yellow-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-600 dark:text-yellow-400 text-sm font-medium">Sedang Diproses</p>
              <p className="text-2xl font-bold text-yellow-900 dark:text-yellow-100">
                {complaints.filter(c => c.status === "diproses").length}
              </p>
            </div>
            <MessageSquare className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
          </div>
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 dark:text-green-400 text-sm font-medium">Selesai</p>
              <p className="text-2xl font-bold text-green-900 dark:text-green-100">
                {complaints.filter(c => c.status === "selesai").length}
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-900/20 rounded-lg p-4 border border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Total Pengaduan</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {complaints.length}
              </p>
            </div>
            <MessageSquare className="w-8 h-8 text-gray-600 dark:text-gray-400" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
        >
          {statusOptions.map((status) => (
            <option key={status.value} value={status.value}>
              {status.label}
            </option>
          ))}
        </select>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
        >
          {categoryOptions.map((category) => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>
      </div>

      {/* Complaints List */}
      <div className="space-y-4">
        {filteredComplaints.map((complaint) => (
          <div
            key={complaint.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  {getStatusIcon(complaint.status)}
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {complaint.title}
                  </h3>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    priorityOptions.find(p => p.value === complaint.priority)?.color
                  }`}>
                    {priorityOptions.find(p => p.value === complaint.priority)?.label}
                  </span>
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                  {complaint.description}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
                  <span className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    {complaint.submitterName}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {complaint.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(complaint.date).toLocaleDateString('id-ID')}
                  </span>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(complaint.status)}`}>
                    {statusOptions.find(s => s.value === complaint.status)?.label}
                  </span>
                </div>
              </div>

              <div className="flex gap-2 ml-4">
                <button
                  onClick={() => handleViewDetail(complaint)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg flex items-center gap-1 transition text-sm"
                >
                  <Eye className="w-4 h-4" />
                  Detail
                </button>
                {complaint.status !== "selesai" && (
                  <button
                    onClick={() => handleRespond(complaint)}
                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg flex items-center gap-1 transition text-sm"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Respon
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredComplaints.length === 0 && (
        <div className="text-center py-12">
          <MessageSquare className="w-24 h-24 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400">
            Belum ada pengaduan yang sesuai dengan filter yang dipilih
          </p>
        </div>
      )}

      {/* Detail Modal */}
      {isDetailModalOpen && selectedComplaint && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Detail Pengaduan
              </h2>
              <button
                onClick={() => setIsDetailModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {selectedComplaint.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {selectedComplaint.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Kategori
                  </label>
                  <p className="text-gray-900 dark:text-white">
                    {categoryOptions.find(c => c.value === selectedComplaint.category)?.label}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Prioritas
                  </label>
                  <p className="text-gray-900 dark:text-white">
                    {priorityOptions.find(p => p.value === selectedComplaint.priority)?.label}
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Pelapor
                </label>
                <p className="text-gray-900 dark:text-white">
                  {selectedComplaint.submitterName} - {selectedComplaint.submitterEmail} - {selectedComplaint.submitterPhone}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Lokasi
                </label>
                <p className="text-gray-900 dark:text-white">
                  {selectedComplaint.location}
                </p>
              </div>

              {selectedComplaint.response && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Respon ({selectedComplaint.responseDate})
                  </label>
                  <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                    <p className="text-gray-900 dark:text-white">
                      {selectedComplaint.response}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                      - {selectedComplaint.responseBy}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Response Modal */}
      {isResponseModalOpen && selectedComplaint && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Respon Pengaduan
              </h2>
              <button
                onClick={() => setIsResponseModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                ×
              </button>
            </div>

            <div className="mb-4">
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                {selectedComplaint.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Oleh: {selectedComplaint.submitterName}
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Respon
                </label>
                <textarea
                  value={responseText}
                  onChange={(e) => setResponseText(e.target.value)}
                  rows={5}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Tulis respon untuk pengaduan ini..."
                  required
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleSubmitResponse}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md transition"
                  disabled={!responseText.trim()}
                >
                  Kirim Respon
                </button>
                <button
                  onClick={() => setIsResponseModalOpen(false)}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-md transition"
                >
                  Batal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
