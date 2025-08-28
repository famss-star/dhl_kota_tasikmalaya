"use client";

import { useState } from "react";
import { 
  MessageSquare, 
  Save, 
  Eye, 
  Plus, 
  Trash2, 
  Download,
  Upload,
  CheckCircle,
  AlertCircle,
  Clock,
  Phone,
  Mail,
  MapPin,
  User,
  Calendar,
  FileText,
  Tag
} from "lucide-react";

interface KategoriPengaduan {
  id: string;
  nama_kategori: string;
  deskripsi: string;
  prioritas: 'rendah' | 'sedang' | 'tinggi' | 'darurat';
  pic_responsible: string;
  sla_response: number; // dalam jam
  sla_resolution: number; // dalam hari
  aktif: boolean;
}

interface ChannelPengaduan {
  id: string;
  nama_channel: string;
  jenis: 'online' | 'offline' | 'hotline';
  kontak_info: string;
  jam_operasional: string;
  petugas_pic: string;
  aktif: boolean;
}

interface PengaduanTemplate {
  id: number;
  nama_layanan: string;
  deskripsi: string;
  kategori_pengaduan: KategoriPengaduan[];
  channel_pengaduan: ChannelPengaduan[];
  form_fields: any[];
  prosedur_penanganan: string[];
  escalation_matrix: string[];
  kpi_target: {
    response_time: number;
    resolution_time: number;
    satisfaction_target: number;
  };
  dasar_hukum: string[];
  status: 'aktif' | 'non-aktif';
}

export default function AdminPelayananPengaduanPage() {
  const [activeTab, setActiveTab] = useState<'info' | 'kategori' | 'preview'>('info');
  const [pengaduanData, setPengaduanData] = useState<PengaduanTemplate>({
    id: 1,
    nama_layanan: "Layanan Pengaduan Masyarakat",
    deskripsi: "Layanan untuk menerima, menindaklanjuti, dan menyelesaikan pengaduan masyarakat terkait masalah lingkungan hidup di Kota Tasikmalaya.",
    kategori_pengaduan: [
      {
        id: "pencemaran_air",
        nama_kategori: "Pencemaran Air",
        deskripsi: "Pengaduan terkait pencemaran air sungai, sumur, atau sumber air lainnya",
        prioritas: "tinggi",
        pic_responsible: "Kabid Pengendalian Pencemaran",
        sla_response: 2,
        sla_resolution: 3,
        aktif: true
      },
      {
        id: "pencemaran_udara",
        nama_kategori: "Pencemaran Udara",
        deskripsi: "Pengaduan terkait pencemaran udara dari industri atau kendaraan",
        prioritas: "tinggi",
        pic_responsible: "Kabid Pengendalian Pencemaran",
        sla_response: 2,
        sla_resolution: 5,
        aktif: true
      },
      {
        id: "pengelolaan_sampah",
        nama_kategori: "Pengelolaan Sampah",
        deskripsi: "Pengaduan terkait masalah pengelolaan sampah dan kebersihan",
        prioritas: "sedang",
        pic_responsible: "Kabid Pengelolaan Sampah",
        sla_response: 4,
        sla_resolution: 7,
        aktif: true
      },
      {
        id: "kebisingan",
        nama_kategori: "Kebisingan",
        deskripsi: "Pengaduan terkait polusi suara dan kebisingan",
        prioritas: "sedang",
        pic_responsible: "Kabid Pengendalian Pencemaran",
        sla_response: 6,
        sla_resolution: 10,
        aktif: true
      },
      {
        id: "kerusakan_lingkungan",
        nama_kategori: "Kerusakan Lingkungan",
        deskripsi: "Pengaduan terkait kerusakan lingkungan dan ekosistem",
        prioritas: "tinggi",
        pic_responsible: "Kabid Tata Lingkungan",
        sla_response: 1,
        sla_resolution: 14,
        aktif: true
      }
    ],
    channel_pengaduan: [
      {
        id: "website",
        nama_channel: "Website DLH",
        jenis: "online",
        kontak_info: "https://dlh.tasikmalayakota.go.id/pengaduan",
        jam_operasional: "24/7",
        petugas_pic: "Admin Website",
        aktif: true
      },
      {
        id: "whatsapp",
        nama_channel: "WhatsApp",
        jenis: "online",
        kontak_info: "+62 265-123456",
        jam_operasional: "08:00 - 16:00",
        petugas_pic: "Petugas Pengaduan",
        aktif: true
      },
      {
        id: "hotline",
        nama_channel: "Hotline DLH",
        jenis: "hotline",
        kontak_info: "(0265) 123-456",
        jam_operasional: "08:00 - 16:00",
        petugas_pic: "Call Center DLH",
        aktif: true
      },
      {
        id: "kantor",
        nama_channel: "Datang Langsung",
        jenis: "offline",
        kontak_info: "Jl. Tentara Pelajar No.1, Tasikmalaya",
        jam_operasional: "08:00 - 15:00",
        petugas_pic: "Petugas Front Office",
        aktif: true
      }
    ],
    form_fields: [
      {
        id: "nama_pengadu",
        label: "Nama Lengkap Pengadu",
        type: "text",
        required: true,
        placeholder: "Masukkan nama lengkap"
      },
      {
        id: "no_telepon",
        label: "Nomor Telepon",
        type: "text",
        required: true,
        placeholder: "Nomor telepon yang dapat dihubungi"
      },
      {
        id: "email",
        label: "Email",
        type: "email",
        required: false,
        placeholder: "alamat@email.com"
      },
      {
        id: "alamat",
        label: "Alamat Pengadu",
        type: "textarea",
        required: true,
        placeholder: "Alamat lengkap pengadu"
      },
      {
        id: "kategori",
        label: "Kategori Pengaduan",
        type: "select",
        required: true,
        options: ["Pencemaran Air", "Pencemaran Udara", "Pengelolaan Sampah", "Kebisingan", "Kerusakan Lingkungan"]
      },
      {
        id: "lokasi_pengaduan",
        label: "Lokasi Kejadian",
        type: "textarea",
        required: true,
        placeholder: "Lokasi detail kejadian yang diadukan"
      },
      {
        id: "deskripsi_pengaduan",
        label: "Deskripsi Pengaduan",
        type: "textarea",
        required: true,
        placeholder: "Jelaskan detail pengaduan Anda"
      },
      {
        id: "foto_bukti",
        label: "Foto Bukti",
        type: "file",
        required: false,
        placeholder: "Upload foto sebagai bukti"
      }
    ],
    prosedur_penanganan: [
      "Penerimaan pengaduan melalui berbagai channel",
      "Verifikasi dan validasi pengaduan",
      "Kategorisasi dan penentuan prioritas",
      "Assignment ke petugas yang bertanggung jawab",
      "Investigasi lapangan jika diperlukan",
      "Koordinasi dengan instansi terkait",
      "Penyelesaian masalah dan tindak lanjut",
      "Pelaporan hasil kepada pengadu",
      "Follow up dan monitoring"
    ],
    escalation_matrix: [
      "Level 1: Petugas Pengaduan (0-24 jam)",
      "Level 2: Kepala Seksi (24-48 jam)",
      "Level 3: Kepala Bidang (48-72 jam)",
      "Level 4: Kepala Dinas (72+ jam)",
      "Level 5: Walikota (untuk kasus strategis)"
    ],
    kpi_target: {
      response_time: 4, // jam
      resolution_time: 7, // hari
      satisfaction_target: 85 // persen
    },
    dasar_hukum: [
      "UU No. 25 Tahun 2009 tentang Pelayanan Publik",
      "UU No. 32 Tahun 2009 tentang Perlindungan dan Pengelolaan Lingkungan Hidup",
      "PP No. 76 Tahun 2013 tentang Pengelolaan Limbah B3",
      "Perda Kota Tasikmalaya tentang Pengelolaan Lingkungan Hidup",
      "Perwali Tasikmalaya tentang Standar Pelayanan Publik"
    ],
    status: 'aktif'
  });

  const [newKategori, setNewKategori] = useState<KategoriPengaduan>({
    id: "",
    nama_kategori: "",
    deskripsi: "",
    prioritas: "sedang",
    pic_responsible: "",
    sla_response: 4,
    sla_resolution: 7,
    aktif: true
  });

  const [newChannel, setNewChannel] = useState<ChannelPengaduan>({
    id: "",
    nama_channel: "",
    jenis: "online",
    kontak_info: "",
    jam_operasional: "",
    petugas_pic: "",
    aktif: true
  });

  const [newProsedur, setNewProsedur] = useState("");
  const [newEscalation, setNewEscalation] = useState("");
  const [newDasarHukum, setNewDasarHukum] = useState("");

  // Functions for managing arrays
  const addKategori = () => {
    if (newKategori.nama_kategori && newKategori.id) {
      setPengaduanData(prev => ({
        ...prev,
        kategori_pengaduan: [...prev.kategori_pengaduan, { ...newKategori }]
      }));
      setNewKategori({
        id: "",
        nama_kategori: "",
        deskripsi: "",
        prioritas: "sedang",
        pic_responsible: "",
        sla_response: 4,
        sla_resolution: 7,
        aktif: true
      });
    }
  };

  const removeKategori = (id: string) => {
    setPengaduanData(prev => ({
      ...prev,
      kategori_pengaduan: prev.kategori_pengaduan.filter(kat => kat.id !== id)
    }));
  };

  const addChannel = () => {
    if (newChannel.nama_channel && newChannel.id) {
      setPengaduanData(prev => ({
        ...prev,
        channel_pengaduan: [...prev.channel_pengaduan, { ...newChannel }]
      }));
      setNewChannel({
        id: "",
        nama_channel: "",
        jenis: "online",
        kontak_info: "",
        jam_operasional: "",
        petugas_pic: "",
        aktif: true
      });
    }
  };

  const removeChannel = (id: string) => {
    setPengaduanData(prev => ({
      ...prev,
      channel_pengaduan: prev.channel_pengaduan.filter(ch => ch.id !== id)
    }));
  };

  const addProsedur = () => {
    if (newProsedur.trim()) {
      setPengaduanData(prev => ({
        ...prev,
        prosedur_penanganan: [...prev.prosedur_penanganan, newProsedur.trim()]
      }));
      setNewProsedur("");
    }
  };

  const removeProsedur = (index: number) => {
    setPengaduanData(prev => ({
      ...prev,
      prosedur_penanganan: prev.prosedur_penanganan.filter((_, i) => i !== index)
    }));
  };

  const addEscalation = () => {
    if (newEscalation.trim()) {
      setPengaduanData(prev => ({
        ...prev,
        escalation_matrix: [...prev.escalation_matrix, newEscalation.trim()]
      }));
      setNewEscalation("");
    }
  };

  const removeEscalation = (index: number) => {
    setPengaduanData(prev => ({
      ...prev,
      escalation_matrix: prev.escalation_matrix.filter((_, i) => i !== index)
    }));
  };

  const addDasarHukum = () => {
    if (newDasarHukum.trim()) {
      setPengaduanData(prev => ({
        ...prev,
        dasar_hukum: [...prev.dasar_hukum, newDasarHukum.trim()]
      }));
      setNewDasarHukum("");
    }
  };

  const removeDasarHukum = (index: number) => {
    setPengaduanData(prev => ({
      ...prev,
      dasar_hukum: prev.dasar_hukum.filter((_, i) => i !== index)
    }));
  };

  const handleSave = () => {
    console.log("Data pengaduan disimpan:", pengaduanData);
    alert("Data pengaduan berhasil disimpan!");
  };

  const getPriorityColor = (prioritas: string) => {
    const colors = {
      'rendah': 'text-green-600 bg-green-100 dark:bg-green-900/20',
      'sedang': 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20',
      'tinggi': 'text-red-600 bg-red-100 dark:bg-red-900/20',
      'darurat': 'text-purple-600 bg-purple-100 dark:bg-purple-900/20'
    };
    return colors[prioritas as keyof typeof colors] || colors.sedang;
  };

  const getChannelIcon = (jenis: string) => {
    const icons = {
      'online': Mail,
      'offline': MapPin,
      'hotline': Phone
    };
    return icons[jenis as keyof typeof icons] || Mail;
  };

  const renderFormField = (field: any, value: string = "") => {
    const baseClasses = "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white";
    
    switch (field.type) {
      case 'textarea':
        return (
          <textarea
            className={`${baseClasses} h-24 resize-none`}
            placeholder={field.placeholder}
            value={value}
            readOnly
          />
        );
      case 'select':
        return (
          <select className={baseClasses} value={value} disabled>
            <option value="">Pilih {field.label}</option>
            {field.options?.map((option: string, idx: number) => (
              <option key={idx} value={option}>{option}</option>
            ))}
          </select>
        );
      case 'file':
        return (
          <div className="flex items-center gap-2">
            <input type="file" className={baseClasses} disabled />
            <Upload className="w-5 h-5 text-gray-400" />
          </div>
        );
      default:
        return (
          <input
            type={field.type}
            className={baseClasses}
            placeholder={field.placeholder}
            value={value}
            readOnly
          />
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg p-6">
        <div className="flex items-center gap-4">
          <div className="bg-white/20 p-3 rounded-full">
            <MessageSquare className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">Admin Layanan Pengaduan</h1>
            <p className="text-red-100">Kelola sistem pengaduan masyarakat</p>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            <span className="capitalize">{pengaduanData.status}</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <div className="flex">
            {[
              { id: 'info', label: 'Informasi Umum', icon: MessageSquare },
              { id: 'kategori', label: 'Kategori & Channel', icon: Tag },
              { id: 'preview', label: 'Preview', icon: Eye }
            ].map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-6 py-4 border-b-2 font-medium text-sm transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'border-red-500 text-red-600 dark:text-red-400'
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="p-6">
          {/* Tab: Informasi Umum */}
          {activeTab === 'info' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Nama Layanan
                </label>
                <input
                  type="text"
                  value={pengaduanData.nama_layanan}
                  onChange={(e) => setPengaduanData(prev => ({ ...prev, nama_layanan: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Deskripsi
                </label>
                <textarea
                  value={pengaduanData.deskripsi}
                  onChange={(e) => setPengaduanData(prev => ({ ...prev, deskripsi: e.target.value }))}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                />
              </div>

              {/* KPI Targets */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Target Response Time (jam)
                  </label>
                  <input
                    type="number"
                    value={pengaduanData.kpi_target.response_time}
                    onChange={(e) => setPengaduanData(prev => ({ 
                      ...prev, 
                      kpi_target: { ...prev.kpi_target, response_time: parseInt(e.target.value) || 0 }
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Target Resolution Time (hari)
                  </label>
                  <input
                    type="number"
                    value={pengaduanData.kpi_target.resolution_time}
                    onChange={(e) => setPengaduanData(prev => ({ 
                      ...prev, 
                      kpi_target: { ...prev.kpi_target, resolution_time: parseInt(e.target.value) || 0 }
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Target Kepuasan (%)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={pengaduanData.kpi_target.satisfaction_target}
                    onChange={(e) => setPengaduanData(prev => ({ 
                      ...prev, 
                      kpi_target: { ...prev.kpi_target, satisfaction_target: parseInt(e.target.value) || 0 }
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              {/* Prosedur Penanganan */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Prosedur Penanganan
                </label>
                <div className="space-y-2 mb-3">
                  {pengaduanData.prosedur_penanganan.map((prosedur, index) => (
                    <div key={index} className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                      <div className="bg-red-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">
                        {index + 1}
                      </div>
                      <span className="flex-1 text-sm text-gray-900 dark:text-white">{prosedur}</span>
                      <button
                        onClick={() => removeProsedur(index)}
                        className="text-red-600 hover:text-red-700 transition-colors duration-200"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newProsedur}
                    onChange={(e) => setNewProsedur(e.target.value)}
                    placeholder="Tambah langkah prosedur..."
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    onKeyPress={(e) => e.key === 'Enter' && addProsedur()}
                  />
                  <button
                    onClick={addProsedur}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Escalation Matrix */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Escalation Matrix
                </label>
                <div className="space-y-2 mb-3">
                  {pengaduanData.escalation_matrix.map((escalation, index) => (
                    <div key={index} className="flex items-center gap-2 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                      <AlertCircle className="w-4 h-4 text-orange-600 dark:text-orange-400 flex-shrink-0" />
                      <span className="flex-1 text-sm text-gray-900 dark:text-white">{escalation}</span>
                      <button
                        onClick={() => removeEscalation(index)}
                        className="text-red-600 hover:text-red-700 transition-colors duration-200"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newEscalation}
                    onChange={(e) => setNewEscalation(e.target.value)}
                    placeholder="Tambah level escalation..."
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    onKeyPress={(e) => e.key === 'Enter' && addEscalation()}
                  />
                  <button
                    onClick={addEscalation}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Dasar Hukum */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Dasar Hukum
                </label>
                <div className="space-y-2 mb-3">
                  {pengaduanData.dasar_hukum.map((hukum, index) => (
                    <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <span className="flex-1 text-sm text-gray-900 dark:text-white">{hukum}</span>
                      <button
                        onClick={() => removeDasarHukum(index)}
                        className="text-red-600 hover:text-red-700 transition-colors duration-200"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newDasarHukum}
                    onChange={(e) => setNewDasarHukum(e.target.value)}
                    placeholder="Tambah dasar hukum..."
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    onKeyPress={(e) => e.key === 'Enter' && addDasarHukum()}
                  />
                  <button
                    onClick={addDasarHukum}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Tab: Kategori & Channel */}
          {activeTab === 'kategori' && (
            <div className="space-y-8">
              {/* Kategori Pengaduan */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Kategori Pengaduan</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
                  {pengaduanData.kategori_pengaduan.map((kategori) => (
                    <div key={kategori.id} className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 dark:text-white">{kategori.nama_kategori}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{kategori.deskripsi}</p>
                        </div>
                        <button
                          onClick={() => removeKategori(kategori.id)}
                          className="text-red-600 hover:text-red-700 transition-colors duration-200"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-3">
                        <div className="text-sm">
                          <span className="text-gray-600 dark:text-gray-300">Prioritas: </span>
                          <span className={`px-2 py-1 rounded text-xs font-medium capitalize ${getPriorityColor(kategori.prioritas)}`}>
                            {kategori.prioritas}
                          </span>
                        </div>
                        <div className="text-sm">
                          <span className="text-gray-600 dark:text-gray-300">SLA: </span>
                          <span className="font-medium text-gray-900 dark:text-white">
                            {kategori.sla_response}h / {kategori.sla_resolution}d
                          </span>
                        </div>
                      </div>
                      
                      <div className="text-sm">
                        <span className="text-gray-600 dark:text-gray-300">PIC: </span>
                        <span className="font-medium text-gray-900 dark:text-white">{kategori.pic_responsible}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add New Kategori */}
                <div className="p-4 border-2 border-dashed border-red-300 dark:border-red-600 rounded-lg">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">Tambah Kategori Baru</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">ID Kategori</label>
                      <input
                        type="text"
                        value={newKategori.id}
                        onChange={(e) => setNewKategori(prev => ({ ...prev, id: e.target.value }))}
                        placeholder="kategori_id"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nama Kategori</label>
                      <input
                        type="text"
                        value={newKategori.nama_kategori}
                        onChange={(e) => setNewKategori(prev => ({ ...prev, nama_kategori: e.target.value }))}
                        placeholder="Nama Kategori"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Deskripsi</label>
                      <textarea
                        value={newKategori.deskripsi}
                        onChange={(e) => setNewKategori(prev => ({ ...prev, deskripsi: e.target.value }))}
                        placeholder="Deskripsi kategori"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        rows={2}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Prioritas</label>
                      <select
                        value={newKategori.prioritas}
                        onChange={(e) => setNewKategori(prev => ({ ...prev, prioritas: e.target.value as any }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      >
                        <option value="rendah">Rendah</option>
                        <option value="sedang">Sedang</option>
                        <option value="tinggi">Tinggi</option>
                        <option value="darurat">Darurat</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">PIC Responsible</label>
                      <input
                        type="text"
                        value={newKategori.pic_responsible}
                        onChange={(e) => setNewKategori(prev => ({ ...prev, pic_responsible: e.target.value }))}
                        placeholder="Penanggung Jawab"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">SLA Response (jam)</label>
                      <input
                        type="number"
                        value={newKategori.sla_response}
                        onChange={(e) => setNewKategori(prev => ({ ...prev, sla_response: parseInt(e.target.value) || 0 }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">SLA Resolution (hari)</label>
                      <input
                        type="number"
                        value={newKategori.sla_resolution}
                        onChange={(e) => setNewKategori(prev => ({ ...prev, sla_resolution: parseInt(e.target.value) || 0 }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>
                  <button
                    onClick={addKategori}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
                  >
                    <Plus className="w-4 h-4" />
                    Tambah Kategori
                  </button>
                </div>
              </div>

              {/* Channel Pengaduan */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Channel Pengaduan</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {pengaduanData.channel_pengaduan.map((channel) => {
                    const IconComponent = getChannelIcon(channel.jenis);
                    return (
                      <div key={channel.id} className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <IconComponent className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                            <div>
                              <h4 className="font-semibold text-gray-900 dark:text-white">{channel.nama_channel}</h4>
                              <span className="text-xs bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-2 py-1 rounded capitalize">
                                {channel.jenis}
                              </span>
                            </div>
                          </div>
                          <button
                            onClick={() => removeChannel(channel.id)}
                            className="text-red-600 hover:text-red-700 transition-colors duration-200"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <div className="space-y-2 text-sm">
                          <div>
                            <span className="text-gray-600 dark:text-gray-300">Kontak: </span>
                            <span className="font-medium text-gray-900 dark:text-white">{channel.kontak_info}</span>
                          </div>
                          <div>
                            <span className="text-gray-600 dark:text-gray-300">Jam Operasional: </span>
                            <span className="font-medium text-gray-900 dark:text-white">{channel.jam_operasional}</span>
                          </div>
                          <div>
                            <span className="text-gray-600 dark:text-gray-300">PIC: </span>
                            <span className="font-medium text-gray-900 dark:text-white">{channel.petugas_pic}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Add New Channel */}
                <div className="p-4 border-2 border-dashed border-blue-300 dark:border-blue-600 rounded-lg">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">Tambah Channel Baru</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">ID Channel</label>
                      <input
                        type="text"
                        value={newChannel.id}
                        onChange={(e) => setNewChannel(prev => ({ ...prev, id: e.target.value }))}
                        placeholder="channel_id"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nama Channel</label>
                      <input
                        type="text"
                        value={newChannel.nama_channel}
                        onChange={(e) => setNewChannel(prev => ({ ...prev, nama_channel: e.target.value }))}
                        placeholder="Nama Channel"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Jenis Channel</label>
                      <select
                        value={newChannel.jenis}
                        onChange={(e) => setNewChannel(prev => ({ ...prev, jenis: e.target.value as any }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      >
                        <option value="online">Online</option>
                        <option value="offline">Offline</option>
                        <option value="hotline">Hotline</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Kontak Info</label>
                      <input
                        type="text"
                        value={newChannel.kontak_info}
                        onChange={(e) => setNewChannel(prev => ({ ...prev, kontak_info: e.target.value }))}
                        placeholder="Informasi kontak"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Jam Operasional</label>
                      <input
                        type="text"
                        value={newChannel.jam_operasional}
                        onChange={(e) => setNewChannel(prev => ({ ...prev, jam_operasional: e.target.value }))}
                        placeholder="08:00 - 16:00"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">PIC</label>
                      <input
                        type="text"
                        value={newChannel.petugas_pic}
                        onChange={(e) => setNewChannel(prev => ({ ...prev, petugas_pic: e.target.value }))}
                        placeholder="Petugas yang bertanggung jawab"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>
                  <button
                    onClick={addChannel}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    <Plus className="w-4 h-4" />
                    Tambah Channel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Tab: Preview */}
          {activeTab === 'preview' && (
            <div className="space-y-6">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{pengaduanData.nama_layanan}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">{pengaduanData.deskripsi}</p>
                
                {/* KPI Display */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-5 h-5 text-red-600" />
                      <span className="font-medium text-gray-900 dark:text-white">Target Response</span>
                    </div>
                    <div className="text-2xl font-bold text-red-600">{pengaduanData.kpi_target.response_time} jam</div>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="font-medium text-gray-900 dark:text-white">Target Resolution</span>
                    </div>
                    <div className="text-2xl font-bold text-green-600">{pengaduanData.kpi_target.resolution_time} hari</div>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <User className="w-5 h-5 text-purple-600" />
                      <span className="font-medium text-gray-900 dark:text-white">Target Kepuasan</span>
                    </div>
                    <div className="text-2xl font-bold text-purple-600">{pengaduanData.kpi_target.satisfaction_target}%</div>
                  </div>
                </div>

                {/* Kategori Pengaduan */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Kategori Pengaduan</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {pengaduanData.kategori_pengaduan.map((kategori) => (
                      <div key={kategori.id} className="p-3 bg-white dark:bg-gray-800 rounded border-l-4 border-red-600">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-gray-900 dark:text-white">{kategori.nama_kategori}</span>
                          <span className={`px-2 py-1 rounded text-xs font-medium capitalize ${getPriorityColor(kategori.prioritas)}`}>
                            {kategori.prioritas}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{kategori.deskripsi}</p>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          SLA: {kategori.sla_response}h / {kategori.sla_resolution}d • PIC: {kategori.pic_responsible}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Channel Pengaduan */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Channel Pengaduan</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {pengaduanData.channel_pengaduan.map((channel) => {
                      const IconComponent = getChannelIcon(channel.jenis);
                      return (
                        <div key={channel.id} className="p-3 bg-white dark:bg-gray-800 rounded">
                          <div className="flex items-center gap-2 mb-2">
                            <IconComponent className="w-4 h-4 text-blue-600" />
                            <span className="font-medium text-gray-900 dark:text-white">{channel.nama_channel}</span>
                            <span className="text-xs bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-2 py-1 rounded capitalize">
                              {channel.jenis}
                            </span>
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-300">
                            <div>{channel.kontak_info}</div>
                            <div>{channel.jam_operasional} • {channel.petugas_pic}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Form Preview */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Form Pengaduan</h4>
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-600">
                    <div className="space-y-4">
                      {pengaduanData.form_fields.map((field) => (
                        <div key={field.id}>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            {field.label}
                            {field.required && <span className="text-red-500 ml-1">*</span>}
                          </label>
                          {renderFormField(field)}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Prosedur Penanganan */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Prosedur Penanganan</h4>
                  <div className="space-y-2">
                    {pengaduanData.prosedur_penanganan.map((prosedur, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded">
                        <div className="bg-red-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">
                          {index + 1}
                        </div>
                        <span className="text-sm text-gray-900 dark:text-white">{prosedur}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Escalation Matrix */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Escalation Matrix</h4>
                  <div className="space-y-2">
                    {pengaduanData.escalation_matrix.map((escalation, index) => (
                      <div key={index} className="p-3 bg-white dark:bg-gray-800 rounded border-l-4 border-orange-600">
                        <span className="text-sm text-gray-900 dark:text-white">{escalation}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Dasar Hukum */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Dasar Hukum</h4>
                  <div className="space-y-2">
                    {pengaduanData.dasar_hukum.map((hukum, index) => (
                      <div key={index} className="p-3 bg-white dark:bg-gray-800 rounded border-l-4 border-gray-600">
                        <span className="text-sm text-gray-900 dark:text-white">{hukum}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200">
            <Download className="w-4 h-4" />
            Export Template
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200">
            <Upload className="w-4 h-4" />
            Import Data
          </button>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
            Reset
          </button>
          <button 
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
          >
            <Save className="w-4 h-4" />
            Simpan Perubahan
          </button>
        </div>
      </div>
    </div>
  );
}
