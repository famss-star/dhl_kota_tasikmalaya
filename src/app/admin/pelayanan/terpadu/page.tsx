"use client";

import { useState } from "react";
import { 
  Globe, 
  Save, 
  Eye, 
  Plus, 
  Trash2, 
  Download,
  Upload,
  CheckCircle,
  AlertCircle,
  Clock,
  Calendar,
  User,
  FileText,
  Phone,
  Mail,
  MapPin,
  Users,
  BookOpen,
  MessageSquare,
  Search,
  Filter,
  Building,
  Zap,
  Target
} from "lucide-react";

interface LayananTerpadu {
  id: string;
  nama_layanan: string;
  dinas_penyelenggara: string;
  deskripsi: string;
  kategori: 'perizinan' | 'non_perizinan' | 'konsultasi' | 'informasi';
  jenis_layanan: 'online' | 'offline' | 'hybrid';
  persyaratan: string[];
  prosedur: string[];
  output_layanan: string;
  waktu_penyelesaian: number; // dalam hari
  biaya: number;
  dasar_hukum: string[];
  lokasi_pelayanan: string;
  jam_pelayanan: string;
  kontak_pic: string;
  aktif: boolean;
}

interface LoketTerpadu {
  id: string;
  nama_loket: string;
  lokasi: string;
  layanan_tersedia: string[];
  jam_operasional: string;
  kapasitas_harian: number;
  petugas_shift: string[];
  fasilitas: string[];
  kontak: string;
  aktif: boolean;
}

interface LayananTerpaduTemplate {
  id: number;
  nama_sistem: string;
  deskripsi: string;
  visi_misi: {
    visi: string;
    misi: string[];
  };
  layanan_terpadu: LayananTerpadu[];
  loket_terpadu: LoketTerpadu[];
  standar_pelayanan: {
    waktu_tunggu_max: number; // menit
    kepuasan_minimal: number; // persen
    penyelesaian_tepat_waktu: number; // persen
    kelengkapan_persyaratan: number; // persen
  };
  inovasi_pelayanan: string[];
  teknologi_pendukung: string[];
  kpi_target: {
    total_layanan: number;
    waktu_rata_rata: number; // hari
    kepuasan_pengguna: number; // persen
    digitalisasi_rate: number; // persen
  };
  kontak_informasi: {
    telepon: string;
    email: string;
    website: string;
    alamat: string;
    jam_layanan: string;
  };
  status: 'aktif' | 'non-aktif';
}

export default function AdminPelayananTerpaduPage() {
  const [activeTab, setActiveTab] = useState<'info' | 'layanan' | 'preview'>('info');
  const [terpaduData, setTerpaduData] = useState<LayananTerpaduTemplate>({
    id: 4,
    nama_sistem: "Sistem Pelayanan Terpadu DLH Kota Tasikmalaya",
    deskripsi: "Sistem pelayanan publik terintegrasi yang menyediakan berbagai layanan DLH dalam satu tempat untuk meningkatkan efisiensi dan kualitas pelayanan kepada masyarakat.",
    visi_misi: {
      visi: "Mewujudkan pelayanan lingkungan hidup yang prima, terpadu, dan berkelanjutan untuk kota Tasikmalaya yang bersih dan hijau",
      misi: [
        "Memberikan pelayanan publik yang cepat, tepat, dan terpercaya",
        "Mengintegrasikan seluruh layanan DLH dalam satu sistem terpadu",
        "Meningkatkan kualitas hidup masyarakat melalui pelayanan lingkungan yang optimal",
        "Mendorong partisipasi aktif masyarakat dalam pengelolaan lingkungan hidup",
        "Menerapkan teknologi informasi untuk pelayanan yang lebih efisien"
      ]
    },
    layanan_terpadu: [
      {
        id: "izin_lingkungan",
        nama_layanan: "Izin Lingkungan",
        dinas_penyelenggara: "DLH Kota Tasikmalaya",
        deskripsi: "Penerbitan izin lingkungan untuk usaha dan/atau kegiatan",
        kategori: "perizinan",
        jenis_layanan: "hybrid",
        persyaratan: [
          "Surat permohonan",
          "Dokumen AMDAL/UKL-UPL",
          "Profil usaha/kegiatan",
          "Peta lokasi",
          "Bukti pembayaran retribusi"
        ],
        prosedur: [
          "Pengajuan permohonan online/offline",
          "Verifikasi kelengkapan dokumen",
          "Evaluasi teknis dokumen lingkungan",
          "Konsultasi publik (jika diperlukan)",
          "Keputusan dan penerbitan izin"
        ],
        output_layanan: "Surat Keputusan Izin Lingkungan",
        waktu_penyelesaian: 45,
        biaya: 500000,
        dasar_hukum: [
          "UU No. 32 Tahun 2009",
          "PP No. 27 Tahun 2012",
          "Perda Kota Tasikmalaya"
        ],
        lokasi_pelayanan: "Kantor DLH / Online",
        jam_pelayanan: "Senin-Jumat 08:00-16:00",
        kontak_pic: "Bidang Penataan & Perizinan",
        aktif: true
      },
      {
        id: "rekomendasi_teknis",
        nama_layanan: "Rekomendasi Teknis Lingkungan",
        dinas_penyelenggara: "DLH Kota Tasikmalaya",
        deskripsi: "Pemberian rekomendasi teknis untuk berbagai kegiatan lingkungan",
        kategori: "non_perizinan",
        jenis_layanan: "hybrid",
        persyaratan: [
          "Surat permohonan",
          "Proposal kegiatan",
          "Data teknis lokasi",
          "Dokumen pendukung lainnya"
        ],
        prosedur: [
          "Pengajuan permohonan",
          "Verifikasi administrasi",
          "Survey lapangan",
          "Analisis teknis",
          "Penerbitan rekomendasi"
        ],
        output_layanan: "Surat Rekomendasi Teknis",
        waktu_penyelesaian: 14,
        biaya: 100000,
        dasar_hukum: [
          "UU No. 32 Tahun 2009",
          "Perda Kota Tasikmalaya"
        ],
        lokasi_pelayanan: "Kantor DLH",
        jam_pelayanan: "Senin-Jumat 08:00-16:00",
        kontak_pic: "Bidang Pengendalian Pencemaran",
        aktif: true
      },
      {
        id: "konsultasi_lingkungan",
        nama_layanan: "Konsultasi Lingkungan",
        dinas_penyelenggara: "DLH Kota Tasikmalaya",
        deskripsi: "Layanan konsultasi dan bimbingan teknis masalah lingkungan",
        kategori: "konsultasi",
        jenis_layanan: "hybrid",
        persyaratan: [
          "Identitas pemohon",
          "Deskripsi masalah/kebutuhan",
          "Dokumen pendukung"
        ],
        prosedur: [
          "Registrasi konsultasi",
          "Penjadwalan sesi konsultasi",
          "Pelaksanaan konsultasi",
          "Pemberian rekomendasi"
        ],
        output_layanan: "Hasil Konsultasi & Rekomendasi",
        waktu_penyelesaian: 3,
        biaya: 0,
        dasar_hukum: [
          "UU No. 25 Tahun 2009",
          "UU No. 32 Tahun 2009"
        ],
        lokasi_pelayanan: "Kantor DLH / Online",
        jam_pelayanan: "Senin-Jumat 08:00-16:00",
        kontak_pic: "Tim Konsultan Teknis",
        aktif: true
      },
      {
        id: "informasi_data_lingkungan",
        nama_layanan: "Informasi Data Lingkungan",
        dinas_penyelenggara: "DLH Kota Tasikmalaya",
        deskripsi: "Penyediaan data dan informasi kualitas lingkungan",
        kategori: "informasi",
        jenis_layanan: "hybrid",
        persyaratan: [
          "Surat permohonan",
          "Identitas pemohon",
          "Tujuan penggunaan data"
        ],
        prosedur: [
          "Pengajuan permohonan",
          "Verifikasi identitas",
          "Penyiapan data",
          "Penyerahan informasi"
        ],
        output_layanan: "Data Kualitas Lingkungan",
        waktu_penyelesaian: 7,
        biaya: 50000,
        dasar_hukum: [
          "UU No. 14 Tahun 2008",
          "UU No. 32 Tahun 2009"
        ],
        lokasi_pelayanan: "Kantor DLH / Online",
        jam_pelayanan: "Senin-Jumat 08:00-16:00",
        kontak_pic: "Bidang Pemantauan",
        aktif: true
      }
    ],
    loket_terpadu: [
      {
        id: "loket_1",
        nama_loket: "Loket Perizinan & Rekomendasi",
        lokasi: "Lantai 1 - Ruang Pelayanan Utama",
        layanan_tersedia: ["izin_lingkungan", "rekomendasi_teknis"],
        jam_operasional: "Senin-Jumat 08:00-16:00",
        kapasitas_harian: 20,
        petugas_shift: ["Petugas Perizinan A", "Petugas Perizinan B"],
        fasilitas: ["Komputer", "Printer", "Scanner", "AC", "Wifi"],
        kontak: "ext. 101",
        aktif: true
      },
      {
        id: "loket_2",
        nama_loket: "Loket Konsultasi & Informasi",
        lokasi: "Lantai 1 - Ruang Konsultasi",
        layanan_tersedia: ["konsultasi_lingkungan", "informasi_data_lingkungan"],
        jam_operasional: "Senin-Jumat 08:00-16:00",
        kapasitas_harian: 15,
        petugas_shift: ["Konsultan Teknis A", "Petugas Informasi"],
        fasilitas: ["Meja Konsultasi", "Proyektor", "AC", "Wifi"],
        kontak: "ext. 102",
        aktif: true
      },
      {
        id: "loket_online",
        nama_loket: "Layanan Online 24/7",
        lokasi: "Platform Digital - Website & Mobile App",
        layanan_tersedia: ["izin_lingkungan", "konsultasi_lingkungan", "informasi_data_lingkungan"],
        jam_operasional: "24 Jam / 7 Hari",
        kapasitas_harian: 100,
        petugas_shift: ["Admin Sistem", "CS Online"],
        fasilitas: ["Server", "Backup System", "Live Chat", "Video Call"],
        kontak: "cs@dlh.tasikmalayakota.go.id",
        aktif: true
      }
    ],
    standar_pelayanan: {
      waktu_tunggu_max: 30, // menit
      kepuasan_minimal: 85, // persen
      penyelesaian_tepat_waktu: 90, // persen
      kelengkapan_persyaratan: 95 // persen
    },
    inovasi_pelayanan: [
      "Sistem antrian online untuk mengurangi waktu tunggu",
      "Aplikasi mobile untuk tracking status permohonan",
      "Chat bot untuk informasi layanan 24/7",
      "Sistem reminder otomatis via WhatsApp/SMS",
      "E-signature untuk proses persetujuan digital",
      "Dashboard analytics untuk monitoring kinerja real-time"
    ],
    teknologi_pendukung: [
      "Sistem Informasi Manajemen Pelayanan (SIMP)",
      "Website Portal Pelayanan Terpadu",
      "Mobile Application iOS & Android",
      "WhatsApp Business API Integration",
      "Digital Document Management System",
      "Online Payment Gateway",
      "Video Conference System",
      "QR Code untuk tracking dokumen"
    ],
    kpi_target: {
      total_layanan: 1200, // per tahun
      waktu_rata_rata: 15, // hari
      kepuasan_pengguna: 90, // persen
      digitalisasi_rate: 75 // persen
    },
    kontak_informasi: {
      telepon: "(0265) 111-222",
      email: "pelayanan@dlh.tasikmalayakota.go.id",
      website: "https://pelayanan.dlh.tasikmalayakota.go.id",
      alamat: "Jl. Tentara Pelajar No.1, Tasikmalaya",
      jam_layanan: "Senin-Jumat: 08:00-16:00 WIB"
    },
    status: 'aktif'
  });

  const [newLayanan, setNewLayanan] = useState<LayananTerpadu>({
    id: "",
    nama_layanan: "",
    dinas_penyelenggara: "DLH Kota Tasikmalaya",
    deskripsi: "",
    kategori: "perizinan",
    jenis_layanan: "hybrid",
    persyaratan: [],
    prosedur: [],
    output_layanan: "",
    waktu_penyelesaian: 1,
    biaya: 0,
    dasar_hukum: [],
    lokasi_pelayanan: "",
    jam_pelayanan: "",
    kontak_pic: "",
    aktif: true
  });

  const [newLoket, setNewLoket] = useState<LoketTerpadu>({
    id: "",
    nama_loket: "",
    lokasi: "",
    layanan_tersedia: [],
    jam_operasional: "",
    kapasitas_harian: 10,
    petugas_shift: [],
    fasilitas: [],
    kontak: "",
    aktif: true
  });

  const [newMisi, setNewMisi] = useState("");
  const [newInovasi, setNewInovasi] = useState("");
  const [newTeknologi, setNewTeknologi] = useState("");

  const getCategoryColor = (kategori: string) => {
    const colors = {
      'perizinan': 'text-blue-600 bg-blue-100 dark:bg-blue-900/20',
      'non_perizinan': 'text-green-600 bg-green-100 dark:bg-green-900/20',
      'konsultasi': 'text-purple-600 bg-purple-100 dark:bg-purple-900/20',
      'informasi': 'text-orange-600 bg-orange-100 dark:bg-orange-900/20'
    };
    return colors[kategori as keyof typeof colors] || colors.perizinan;
  };

  const getServiceTypeIcon = (jenis: string) => {
    const icons = {
      'online': Globe,
      'offline': Building,
      'hybrid': Zap
    };
    return icons[jenis as keyof typeof icons] || Globe;
  };

  const handleSave = () => {
    console.log("Data layanan terpadu disimpan:", terpaduData);
    alert("Data layanan terpadu berhasil disimpan!");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg p-6">
        <div className="flex items-center gap-4">
          <div className="bg-white/20 p-3 rounded-full">
            <Globe className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">Admin Layanan Terpadu</h1>
            <p className="text-purple-100">Kelola sistem pelayanan publik terintegrasi DLH</p>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            <span className="capitalize">{terpaduData.status}</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <div className="flex">
            {[
              { id: 'info', label: 'Informasi Sistem', icon: Globe },
              { id: 'layanan', label: 'Layanan & Loket', icon: Building },
              { id: 'preview', label: 'Preview', icon: Eye }
            ].map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-6 py-4 border-b-2 font-medium text-sm transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'border-purple-500 text-purple-600 dark:text-purple-400'
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
          {/* Tab: Informasi Sistem */}
          {activeTab === 'info' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Nama Sistem
                </label>
                <input
                  type="text"
                  value={terpaduData.nama_sistem}
                  onChange={(e) => setTerpaduData(prev => ({ ...prev, nama_sistem: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Deskripsi
                </label>
                <textarea
                  value={terpaduData.deskripsi}
                  onChange={(e) => setTerpaduData(prev => ({ ...prev, deskripsi: e.target.value }))}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                />
              </div>

              {/* Visi Misi */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Visi & Misi</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Visi
                    </label>
                    <textarea
                      value={terpaduData.visi_misi.visi}
                      onChange={(e) => setTerpaduData(prev => ({ 
                        ...prev, 
                        visi_misi: { ...prev.visi_misi, visi: e.target.value }
                      }))}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Misi
                    </label>
                    <div className="space-y-2 mb-4">
                      {terpaduData.visi_misi.misi.map((misi, index) => (
                        <div key={index} className="flex items-center gap-2 p-3 border border-gray-200 dark:border-gray-600 rounded-lg">
                          <span className="flex-1 text-gray-900 dark:text-white">{misi}</span>
                          <button
                            onClick={() => {
                              setTerpaduData(prev => ({
                                ...prev,
                                visi_misi: {
                                  ...prev.visi_misi,
                                  misi: prev.visi_misi.misi.filter((_, i) => i !== index)
                                }
                              }));
                            }}
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
                        value={newMisi}
                        onChange={(e) => setNewMisi(e.target.value)}
                        placeholder="Tambah misi baru"
                        className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                      <button
                        onClick={() => {
                          if (newMisi.trim()) {
                            setTerpaduData(prev => ({
                              ...prev,
                              visi_misi: {
                                ...prev.visi_misi,
                                misi: [...prev.visi_misi.misi, newMisi.trim()]
                              }
                            }));
                            setNewMisi("");
                          }
                        }}
                        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* KPI Target */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Target KPI</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Total Layanan/Tahun
                    </label>
                    <input
                      type="number"
                      value={terpaduData.kpi_target.total_layanan}
                      onChange={(e) => setTerpaduData(prev => ({ 
                        ...prev, 
                        kpi_target: { ...prev.kpi_target, total_layanan: parseInt(e.target.value) || 0 }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Waktu Rata-rata (hari)
                    </label>
                    <input
                      type="number"
                      value={terpaduData.kpi_target.waktu_rata_rata}
                      onChange={(e) => setTerpaduData(prev => ({ 
                        ...prev, 
                        kpi_target: { ...prev.kpi_target, waktu_rata_rata: parseInt(e.target.value) || 0 }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Kepuasan Pengguna (%)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={terpaduData.kpi_target.kepuasan_pengguna}
                      onChange={(e) => setTerpaduData(prev => ({ 
                        ...prev, 
                        kpi_target: { ...prev.kpi_target, kepuasan_pengguna: parseInt(e.target.value) || 0 }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Digitalisasi Rate (%)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={terpaduData.kpi_target.digitalisasi_rate}
                      onChange={(e) => setTerpaduData(prev => ({ 
                        ...prev, 
                        kpi_target: { ...prev.kpi_target, digitalisasi_rate: parseInt(e.target.value) || 0 }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Kontak Informasi */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Kontak Informasi</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Telepon
                    </label>
                    <input
                      type="text"
                      value={terpaduData.kontak_informasi.telepon}
                      onChange={(e) => setTerpaduData(prev => ({ 
                        ...prev, 
                        kontak_informasi: { ...prev.kontak_informasi, telepon: e.target.value }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={terpaduData.kontak_informasi.email}
                      onChange={(e) => setTerpaduData(prev => ({ 
                        ...prev, 
                        kontak_informasi: { ...prev.kontak_informasi, email: e.target.value }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Website
                    </label>
                    <input
                      type="url"
                      value={terpaduData.kontak_informasi.website}
                      onChange={(e) => setTerpaduData(prev => ({ 
                        ...prev, 
                        kontak_informasi: { ...prev.kontak_informasi, website: e.target.value }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Jam Layanan
                    </label>
                    <input
                      type="text"
                      value={terpaduData.kontak_informasi.jam_layanan}
                      onChange={(e) => setTerpaduData(prev => ({ 
                        ...prev, 
                        kontak_informasi: { ...prev.kontak_informasi, jam_layanan: e.target.value }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab: Layanan & Loket */}
          {activeTab === 'layanan' && (
            <div className="space-y-8">
              {/* Layanan Terpadu */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Layanan Terpadu</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
                  {terpaduData.layanan_terpadu.map((layanan) => {
                    const ServiceTypeIcon = getServiceTypeIcon(layanan.jenis_layanan);
                    return (
                      <div key={layanan.id} className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-semibold text-gray-900 dark:text-white">{layanan.nama_layanan}</h4>
                              <span className={`px-2 py-1 rounded text-xs font-medium capitalize ${getCategoryColor(layanan.kategori)}`}>
                                {layanan.kategori.replace('_', ' ')}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{layanan.deskripsi}</p>
                          </div>
                          <button
                            onClick={() => {
                              setTerpaduData(prev => ({
                                ...prev,
                                layanan_terpadu: prev.layanan_terpadu.filter(l => l.id !== layanan.id)
                              }));
                            }}
                            className="text-red-600 hover:text-red-700 transition-colors duration-200"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                          <div className="flex items-center gap-2">
                            <ServiceTypeIcon className="w-4 h-4 text-blue-600" />
                            <span className="capitalize">{layanan.jenis_layanan}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-green-600" />
                            <span>{layanan.waktu_penyelesaian} hari</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-purple-600" />
                            <span>{layanan.biaya === 0 ? 'Gratis' : `Rp ${layanan.biaya.toLocaleString()}`}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-orange-600" />
                            <span className="text-xs">{layanan.kontak_pic}</span>
                          </div>
                        </div>

                        <div className="text-sm">
                          <span className="font-medium text-gray-900 dark:text-white">Output: </span>
                          <span className="text-gray-600 dark:text-gray-300">{layanan.output_layanan}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Loket Terpadu */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Loket Terpadu</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border border-gray-200 dark:border-gray-600 rounded-lg">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Nama Loket</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Lokasi</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Jam Operasional</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Kapasitas</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Layanan</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Kontak</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                      {terpaduData.loket_terpadu.map((loket) => (
                        <tr key={loket.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                          <td className="px-4 py-3">
                            <div className="font-medium text-gray-900 dark:text-white">{loket.nama_loket}</div>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{loket.lokasi}</td>
                          <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{loket.jam_operasional}</td>
                          <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{loket.kapasitas_harian}/hari</td>
                          <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                            {loket.layanan_tersedia.length} layanan
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{loket.kontak}</td>
                          <td className="px-4 py-3">
                            <button
                              onClick={() => {
                                setTerpaduData(prev => ({
                                  ...prev,
                                  loket_terpadu: prev.loket_terpadu.filter(l => l.id !== loket.id)
                                }));
                              }}
                              className="text-red-600 hover:text-red-700 transition-colors duration-200"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Tab: Preview */}
          {activeTab === 'preview' && (
            <div className="space-y-6">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{terpaduData.nama_sistem}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">{terpaduData.deskripsi}</p>
                
                {/* Visi Misi Display */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Visi & Misi</h4>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border-l-4 border-purple-600 mb-4">
                    <h5 className="font-medium text-gray-900 dark:text-white mb-2">Visi</h5>
                    <p className="text-gray-600 dark:text-gray-300">{terpaduData.visi_misi.visi}</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border-l-4 border-purple-600">
                    <h5 className="font-medium text-gray-900 dark:text-white mb-2">Misi</h5>
                    <ul className="space-y-1">
                      {terpaduData.visi_misi.misi.map((misi, index) => (
                        <li key={index} className="flex items-start gap-2 text-gray-600 dark:text-gray-300">
                          <span className="font-medium text-purple-600">{index + 1}.</span>
                          <span>{misi}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                {/* KPI Display */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="w-5 h-5 text-purple-600" />
                      <span className="font-medium text-gray-900 dark:text-white">Total Layanan</span>
                    </div>
                    <div className="text-2xl font-bold text-purple-600">{terpaduData.kpi_target.total_layanan.toLocaleString()}/tahun</div>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-5 h-5 text-blue-600" />
                      <span className="font-medium text-gray-900 dark:text-white">Waktu Rata-rata</span>
                    </div>
                    <div className="text-2xl font-bold text-blue-600">{terpaduData.kpi_target.waktu_rata_rata} hari</div>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="font-medium text-gray-900 dark:text-white">Kepuasan Pengguna</span>
                    </div>
                    <div className="text-2xl font-bold text-green-600">{terpaduData.kpi_target.kepuasan_pengguna}%</div>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="w-5 h-5 text-orange-600" />
                      <span className="font-medium text-gray-900 dark:text-white">Digitalisasi</span>
                    </div>
                    <div className="text-2xl font-bold text-orange-600">{terpaduData.kpi_target.digitalisasi_rate}%</div>
                  </div>
                </div>

                {/* Layanan Terpadu */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Layanan Terpadu</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {terpaduData.layanan_terpadu.map((layanan) => {
                      const ServiceTypeIcon = getServiceTypeIcon(layanan.jenis_layanan);
                      return (
                        <div key={layanan.id} className="p-4 bg-white dark:bg-gray-800 rounded border-l-4 border-purple-600">
                          <div className="flex items-center gap-2 mb-2">
                            <h5 className="font-medium text-gray-900 dark:text-white">{layanan.nama_layanan}</h5>
                            <span className={`px-2 py-1 rounded text-xs font-medium capitalize ${getCategoryColor(layanan.kategori)}`}>
                              {layanan.kategori.replace('_', ' ')}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{layanan.deskripsi}</p>
                          <div className="grid grid-cols-2 gap-2 text-xs text-gray-500 dark:text-gray-400">
                            <div className="flex items-center gap-1">
                              <ServiceTypeIcon className="w-3 h-3" />
                              {layanan.jenis_layanan}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {layanan.waktu_penyelesaian} hari
                            </div>
                            <div className="flex items-center gap-1">
                              <FileText className="w-3 h-3" />
                              {layanan.biaya === 0 ? 'Gratis' : `Rp ${layanan.biaya.toLocaleString()}`}
                            </div>
                            <div className="flex items-center gap-1">
                              <User className="w-3 h-3" />
                              {layanan.kontak_pic}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Kontak Informasi */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Kontak Informasi</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded">
                      <Phone className="w-5 h-5 text-blue-600" />
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">Telepon</div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">{terpaduData.kontak_informasi.telepon}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded">
                      <Mail className="w-5 h-5 text-green-600" />
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">Email</div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">{terpaduData.kontak_informasi.email}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded">
                      <Globe className="w-5 h-5 text-purple-600" />
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">Website</div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">{terpaduData.kontak_informasi.website}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded">
                      <Clock className="w-5 h-5 text-orange-600" />
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">Jam Layanan</div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">{terpaduData.kontak_informasi.jam_layanan}</div>
                      </div>
                    </div>
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
          <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200">
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
            className="flex items-center gap-2 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
          >
            <Save className="w-4 h-4" />
            Simpan Perubahan
          </button>
        </div>
      </div>
    </div>
  );
}
