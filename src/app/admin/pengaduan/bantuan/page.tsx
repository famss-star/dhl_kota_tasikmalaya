"use client";

import { useState } from "react";
import { 
  HelpCircle, 
  Save, 
  Eye, 
  Plus, 
  Trash2, 
  Download,
  Upload,
  CheckCircle,
  AlertTriangle,
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
  Star,
  Zap,
  Target,
  Settings
} from "lucide-react";

interface JenisBantuan {
  id: string;
  nama_bantuan: string;
  kategori: 'teknis' | 'administratif' | 'konsultasi' | 'informasi' | 'darurat';
  deskripsi: string;
  metode_bantuan: 'online' | 'offline' | 'hybrid' | 'telepon';
  waktu_respon: number; // jam
  durasi_bantuan: number; // menit
  kapasitas_harian: number;
  syarat_bantuan: string[];
  prosedur_bantuan: string[];
  pic_penanggung_jawab: string;
  tingkat_prioritas: 'rendah' | 'sedang' | 'tinggi' | 'darurat';
  biaya: number;
  aktif: boolean;
}

interface ChannelBantuan {
  id: string;
  nama_channel: string;
  platform: string;
  kontak: string;
  jam_operasional: string;
  kapasitas_concurrent: number;
  response_time_target: number; // menit
  jenis_bantuan_tersedia: string[];
  petugas_bertugas: string[];
  tingkat_kepuasan: number; // persen
  aktif: boolean;
}

interface BantuanTemplate {
  id: number;
  nama_layanan: string;
  deskripsi: string;
  visi_bantuan: string;
  tujuan_bantuan: string[];
  jenis_bantuan: JenisBantuan[];
  channel_bantuan: ChannelBantuan[];
  sla_bantuan: {
    response_time_max: number; // jam
    resolution_time_max: number; // hari
    satisfaction_target: number; // persen
    first_call_resolution: number; // persen
  };
  faq_bantuan: { pertanyaan: string; jawaban: string; kategori: string; }[];
  escalation_matrix: {
    level: number;
    nama_level: string;
    kondisi_escalation: string;
    waktu_escalation: number; // jam
    pic_escalation: string;
  }[];
  kpi_target: {
    total_bantuan_bulanan: number;
    waktu_respon_rata: number; // jam
    tingkat_kepuasan: number; // persen
    success_rate: number; // persen
  };
  kontak_darurat: {
    hotline_24jam: string;
    whatsapp_darurat: string;
    email_darurat: string;
    koordinator_darurat: string;
  };
  status: 'aktif' | 'non-aktif';
}

export default function AdminSistemBantuanPage() {
  const [activeTab, setActiveTab] = useState<'info' | 'bantuan' | 'preview'>('info');
  const [bantuanData, setBantuanData] = useState<BantuanTemplate>({
    id: 1,
    nama_layanan: "Sistem Bantuan DLH Kota Tasikmalaya",
    deskripsi: "Sistem bantuan terpadu untuk memberikan dukungan, konsultasi, dan solusi kepada masyarakat terkait masalah lingkungan hidup.",
    visi_bantuan: "Menjadi sistem bantuan lingkungan yang responsif, solutif, dan terpercaya untuk mewujudkan kota Tasikmalaya yang berkelanjutan",
    tujuan_bantuan: [
      "Memberikan bantuan teknis dan konsultasi lingkungan yang berkualitas",
      "Menyediakan informasi akurat dan up-to-date tentang regulasi lingkungan",
      "Memfasilitasi penyelesaian masalah lingkungan secara cepat dan tepat",
      "Meningkatkan awareness dan partisipasi masyarakat dalam pelestarian lingkungan",
      "Membangun komunikasi yang efektif antara DLH dan masyarakat"
    ],
    jenis_bantuan: [
      {
        id: "konsultasi_teknis",
        nama_bantuan: "Konsultasi Teknis Lingkungan",
        kategori: "teknis",
        deskripsi: "Bantuan konsultasi untuk masalah teknis lingkungan dan pengelolaan limbah",
        metode_bantuan: "hybrid",
        waktu_respon: 2,
        durasi_bantuan: 60,
        kapasitas_harian: 8,
        syarat_bantuan: [
          "Identitas diri lengkap",
          "Deskripsi masalah yang jelas",
          "Dokumen pendukung terkait",
          "Lokasi kejadian/masalah"
        ],
        prosedur_bantuan: [
          "Hubungi layanan bantuan melalui channel tersedia",
          "Jelaskan masalah secara detail",
          "Petugas akan melakukan assessment awal",
          "Penjadwalan konsultasi sesuai kebutuhan",
          "Pelaksanaan konsultasi dan pemberian solusi"
        ],
        pic_penanggung_jawab: "Tim Teknis Lingkungan",
        tingkat_prioritas: "sedang",
        biaya: 0,
        aktif: true
      },
      {
        id: "bantuan_darurat",
        nama_bantuan: "Bantuan Darurat Lingkungan",
        kategori: "darurat",
        deskripsi: "Bantuan cepat untuk kejadian darurat lingkungan seperti pencemaran akut",
        metode_bantuan: "hybrid",
        waktu_respon: 1,
        durasi_bantuan: 30,
        kapasitas_harian: 24,
        syarat_bantuan: [
          "Laporan kejadian darurat",
          "Lokasi tepat kejadian",
          "Kontak pelapor",
          "Tingkat keparahan"
        ],
        prosedur_bantuan: [
          "Hubungi hotline darurat 24 jam",
          "Sampaikan informasi kejadian secara singkat",
          "Tim tanggap darurat akan bergerak",
          "Koordinasi dengan pelapor di lokasi",
          "Penanganan dan mitigasi dampak"
        ],
        pic_penanggung_jawab: "Tim Tanggap Darurat",
        tingkat_prioritas: "darurat",
        biaya: 0,
        aktif: true
      },
      {
        id: "informasi_regulasi",
        nama_bantuan: "Informasi Regulasi & Perizinan",
        kategori: "informasi",
        deskripsi: "Bantuan informasi tentang regulasi, persyaratan, dan prosedur perizinan",
        metode_bantuan: "online",
        waktu_respon: 4,
        durasi_bantuan: 30,
        kapasitas_harian: 20,
        syarat_bantuan: [
          "Identitas pemohon",
          "Jenis informasi yang dibutuhkan",
          "Tujuan penggunaan informasi"
        ],
        prosedur_bantuan: [
          "Akses portal informasi atau hubungi CS",
          "Isi formulir permintaan informasi",
          "Verifikasi kebutuhan informasi",
          "Penyediaan informasi sesuai permintaan",
          "Follow up jika diperlukan"
        ],
        pic_penanggung_jawab: "Bagian Informasi & Dokumentasi",
        tingkat_prioritas: "rendah",
        biaya: 0,
        aktif: true
      },
      {
        id: "mediasi_konflik",
        nama_bantuan: "Mediasi Konflik Lingkungan",
        kategori: "administratif",
        deskripsi: "Bantuan mediasi untuk penyelesaian konflik atau sengketa lingkungan",
        metode_bantuan: "offline",
        waktu_respon: 12,
        durasi_bantuan: 120,
        kapasitas_harian: 4,
        syarat_bantuan: [
          "Surat permohonan mediasi",
          "Identitas semua pihak terlibat",
          "Dokumen bukti konflik",
          "Kesediaan untuk mediasi"
        ],
        prosedur_bantuan: [
          "Pengajuan permohonan mediasi",
          "Verifikasi dan assessment kasus",
          "Penjadwalan sesi mediasi",
          "Pelaksanaan mediasi dengan mediator",
          "Pembuatan kesepakatan bersama"
        ],
        pic_penanggung_jawab: "Mediator Lingkungan",
        tingkat_prioritas: "tinggi",
        biaya: 0,
        aktif: true
      }
    ],
    channel_bantuan: [
      {
        id: "website_portal",
        nama_channel: "Portal Website",
        platform: "Website",
        kontak: "https://bantuan.dlh.tasikmalayakota.go.id",
        jam_operasional: "24 jam",
        kapasitas_concurrent: 50,
        response_time_target: 30,
        jenis_bantuan_tersedia: ["konsultasi_teknis", "informasi_regulasi"],
        petugas_bertugas: ["Admin Portal", "CS Online"],
        tingkat_kepuasan: 88,
        aktif: true
      },
      {
        id: "whatsapp_bantuan",
        nama_channel: "WhatsApp Bantuan",
        platform: "WhatsApp Business",
        kontak: "+62 265-111222",
        jam_operasional: "07:00 - 22:00",
        kapasitas_concurrent: 20,
        response_time_target: 15,
        jenis_bantuan_tersedia: ["konsultasi_teknis", "bantuan_darurat", "informasi_regulasi"],
        petugas_bertugas: ["CS WhatsApp 1", "CS WhatsApp 2", "CS Malam"],
        tingkat_kepuasan: 92,
        aktif: true
      },
      {
        id: "hotline_darurat",
        nama_channel: "Hotline Darurat",
        platform: "Telepon",
        kontak: "(0265) 911-ENV",
        jam_operasional: "24 jam",
        kapasitas_concurrent: 10,
        response_time_target: 5,
        jenis_bantuan_tersedia: ["bantuan_darurat"],
        petugas_bertugas: ["Operator Darurat 1", "Operator Darurat 2", "Koordinator Darurat"],
        tingkat_kepuasan: 95,
        aktif: true
      },
      {
        id: "kantor_langsung",
        nama_channel: "Layanan Langsung",
        platform: "Tatap Muka",
        kontak: "Kantor DLH Kota Tasikmalaya",
        jam_operasional: "08:00 - 16:00",
        kapasitas_concurrent: 15,
        response_time_target: 10,
        jenis_bantuan_tersedia: ["konsultasi_teknis", "mediasi_konflik", "informasi_regulasi"],
        petugas_bertugas: ["Petugas Layanan 1", "Petugas Layanan 2", "Supervisor"],
        tingkat_kepuasan: 94,
        aktif: true
      }
    ],
    sla_bantuan: {
      response_time_max: 4,
      resolution_time_max: 7,
      satisfaction_target: 90,
      first_call_resolution: 75
    },
    faq_bantuan: [
      {
        pertanyaan: "Bagaimana cara mengajukan bantuan konsultasi lingkungan?",
        jawaban: "Anda dapat mengajukan bantuan melalui website, WhatsApp, atau datang langsung ke kantor DLH. Siapkan identitas dan deskripsi masalah yang jelas.",
        kategori: "umum"
      },
      {
        pertanyaan: "Apakah layanan bantuan dikenakan biaya?",
        jawaban: "Semua layanan bantuan DLH Kota Tasikmalaya adalah gratis untuk masyarakat.",
        kategori: "biaya"
      },
      {
        pertanyaan: "Berapa lama waktu respon untuk bantuan darurat?",
        jawaban: "Untuk bantuan darurat, tim kami akan merespon dalam maksimal 1 jam melalui hotline 24 jam.",
        kategori: "darurat"
      },
      {
        pertanyaan: "Apa yang harus dilakukan jika terjadi pencemaran lingkungan?",
        jawaban: "Segera hubungi hotline darurat (0265) 911-ENV atau WhatsApp bantuan. Berikan informasi lokasi, jenis pencemaran, dan tingkat keparahan.",
        kategori: "darurat"
      }
    ],
    escalation_matrix: [
      {
        level: 1,
        nama_level: "Front Line Support",
        kondisi_escalation: "Masalah umum yang dapat diselesaikan dengan informasi standar",
        waktu_escalation: 2,
        pic_escalation: "Customer Service"
      },
      {
        level: 2,
        nama_level: "Technical Support",
        kondisi_escalation: "Masalah teknis yang memerlukan konsultasi spesialis",
        waktu_escalation: 4,
        pic_escalation: "Tim Teknis"
      },
      {
        level: 3,
        nama_level: "Senior Technical",
        kondisi_escalation: "Masalah kompleks yang memerlukan analisis mendalam",
        waktu_escalation: 8,
        pic_escalation: "Senior Technical Officer"
      },
      {
        level: 4,
        nama_level: "Management Level",
        kondisi_escalation: "Masalah serius yang berdampak luas atau memerlukan keputusan manajemen",
        waktu_escalation: 12,
        pic_escalation: "Kepala Bidang"
      },
      {
        level: 5,
        nama_level: "Executive Level",
        kondisi_escalation: "Krisis atau masalah yang memerlukan intervensi tingkat kepala dinas",
        waktu_escalation: 24,
        pic_escalation: "Kepala Dinas"
      }
    ],
    kpi_target: {
      total_bantuan_bulanan: 350,
      waktu_respon_rata: 2.5,
      tingkat_kepuasan: 90,
      success_rate: 95
    },
    kontak_darurat: {
      hotline_24jam: "(0265) 911-ENV",
      whatsapp_darurat: "+62 265-999888",
      email_darurat: "darurat@dlh.tasikmalayakota.go.id",
      koordinator_darurat: "Drs. Bambang Hermawan, M.Si"
    },
    status: 'aktif'
  });

  const [newTujuan, setNewTujuan] = useState("");
  const [newFAQ, setNewFAQ] = useState({ pertanyaan: "", jawaban: "", kategori: "umum" });

  const getCategoryColor = (kategori: string) => {
    const colors = {
      'teknis': 'text-blue-600 bg-blue-100 dark:bg-blue-900/20',
      'administratif': 'text-green-600 bg-green-100 dark:bg-green-900/20',
      'konsultasi': 'text-purple-600 bg-purple-100 dark:bg-purple-900/20',
      'informasi': 'text-orange-600 bg-orange-100 dark:bg-orange-900/20',
      'darurat': 'text-red-600 bg-red-100 dark:bg-red-900/20'
    };
    return colors[kategori as keyof typeof colors] || colors.teknis;
  };

  const getPriorityColor = (prioritas: string) => {
    const colors = {
      'rendah': 'text-gray-600 bg-gray-100 dark:bg-gray-900/20',
      'sedang': 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20',
      'tinggi': 'text-orange-600 bg-orange-100 dark:bg-orange-900/20',
      'darurat': 'text-red-600 bg-red-100 dark:bg-red-900/20'
    };
    return colors[prioritas as keyof typeof colors] || colors.sedang;
  };

  const getMethodIcon = (metode: string) => {
    const icons = {
      'online': MessageSquare,
      'offline': Users,
      'hybrid': Zap,
      'telepon': Phone
    };
    return icons[metode as keyof typeof icons] || MessageSquare;
  };

  const handleSave = () => {
    console.log("Data sistem bantuan disimpan:", bantuanData);
    alert("Data sistem bantuan berhasil disimpan!");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg p-6">
        <div className="flex items-center gap-4">
          <div className="bg-white/20 p-3 rounded-full">
            <HelpCircle className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">Admin Sistem Bantuan</h1>
            <p className="text-blue-100">Kelola sistem bantuan dan dukungan masyarakat</p>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            <span className="capitalize">{bantuanData.status}</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <div className="flex">
            {[
              { id: 'info', label: 'Informasi Sistem', icon: HelpCircle },
              { id: 'bantuan', label: 'Jenis & Channel', icon: Users },
              { id: 'preview', label: 'Preview', icon: Eye }
            ].map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-6 py-4 border-b-2 font-medium text-sm transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
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
                  Nama Layanan
                </label>
                <input
                  type="text"
                  value={bantuanData.nama_layanan}
                  onChange={(e) => setBantuanData(prev => ({ ...prev, nama_layanan: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Deskripsi
                </label>
                <textarea
                  value={bantuanData.deskripsi}
                  onChange={(e) => setBantuanData(prev => ({ ...prev, deskripsi: e.target.value }))}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Visi Bantuan
                </label>
                <textarea
                  value={bantuanData.visi_bantuan}
                  onChange={(e) => setBantuanData(prev => ({ ...prev, visi_bantuan: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                />
              </div>

              {/* Tujuan Bantuan */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tujuan Bantuan
                </label>
                <div className="space-y-2 mb-4">
                  {bantuanData.tujuan_bantuan.map((tujuan, index) => (
                    <div key={index} className="flex items-center gap-2 p-3 border border-gray-200 dark:border-gray-600 rounded-lg">
                      <span className="flex-1 text-gray-900 dark:text-white">{tujuan}</span>
                      <button
                        onClick={() => {
                          setBantuanData(prev => ({
                            ...prev,
                            tujuan_bantuan: prev.tujuan_bantuan.filter((_, i) => i !== index)
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
                    value={newTujuan}
                    onChange={(e) => setNewTujuan(e.target.value)}
                    placeholder="Tambah tujuan bantuan baru"
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <button
                    onClick={() => {
                      if (newTujuan.trim()) {
                        setBantuanData(prev => ({
                          ...prev,
                          tujuan_bantuan: [...prev.tujuan_bantuan, newTujuan.trim()]
                        }));
                        setNewTujuan("");
                      }
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* SLA & KPI */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Service Level Agreement (SLA)</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Response Time Max (jam)
                      </label>
                      <input
                        type="number"
                        value={bantuanData.sla_bantuan.response_time_max}
                        onChange={(e) => setBantuanData(prev => ({ 
                          ...prev, 
                          sla_bantuan: { ...prev.sla_bantuan, response_time_max: parseInt(e.target.value) || 0 }
                        }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Resolution Time Max (hari)
                      </label>
                      <input
                        type="number"
                        value={bantuanData.sla_bantuan.resolution_time_max}
                        onChange={(e) => setBantuanData(prev => ({ 
                          ...prev, 
                          sla_bantuan: { ...prev.sla_bantuan, resolution_time_max: parseInt(e.target.value) || 0 }
                        }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Target KPI</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Total Bantuan/Bulan
                      </label>
                      <input
                        type="number"
                        value={bantuanData.kpi_target.total_bantuan_bulanan}
                        onChange={(e) => setBantuanData(prev => ({ 
                          ...prev, 
                          kpi_target: { ...prev.kpi_target, total_bantuan_bulanan: parseInt(e.target.value) || 0 }
                        }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Tingkat Kepuasan (%)
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={bantuanData.kpi_target.tingkat_kepuasan}
                        onChange={(e) => setBantuanData(prev => ({ 
                          ...prev, 
                          kpi_target: { ...prev.kpi_target, tingkat_kepuasan: parseInt(e.target.value) || 0 }
                        }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Kontak Darurat */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Kontak Darurat</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Hotline 24 Jam
                    </label>
                    <input
                      type="text"
                      value={bantuanData.kontak_darurat.hotline_24jam}
                      onChange={(e) => setBantuanData(prev => ({ 
                        ...prev, 
                        kontak_darurat: { ...prev.kontak_darurat, hotline_24jam: e.target.value }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      WhatsApp Darurat
                    </label>
                    <input
                      type="text"
                      value={bantuanData.kontak_darurat.whatsapp_darurat}
                      onChange={(e) => setBantuanData(prev => ({ 
                        ...prev, 
                        kontak_darurat: { ...prev.kontak_darurat, whatsapp_darurat: e.target.value }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email Darurat
                    </label>
                    <input
                      type="email"
                      value={bantuanData.kontak_darurat.email_darurat}
                      onChange={(e) => setBantuanData(prev => ({ 
                        ...prev, 
                        kontak_darurat: { ...prev.kontak_darurat, email_darurat: e.target.value }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Koordinator Darurat
                    </label>
                    <input
                      type="text"
                      value={bantuanData.kontak_darurat.koordinator_darurat}
                      onChange={(e) => setBantuanData(prev => ({ 
                        ...prev, 
                        kontak_darurat: { ...prev.kontak_darurat, koordinator_darurat: e.target.value }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab: Jenis & Channel */}
          {activeTab === 'bantuan' && (
            <div className="space-y-8">
              {/* Jenis Bantuan */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Jenis Bantuan</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
                  {bantuanData.jenis_bantuan.map((bantuan) => {
                    const MethodIcon = getMethodIcon(bantuan.metode_bantuan);
                    return (
                      <div key={bantuan.id} className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-semibold text-gray-900 dark:text-white">{bantuan.nama_bantuan}</h4>
                              <span className={`px-2 py-1 rounded text-xs font-medium capitalize ${getCategoryColor(bantuan.kategori)}`}>
                                {bantuan.kategori}
                              </span>
                              <span className={`px-2 py-1 rounded text-xs font-medium capitalize ${getPriorityColor(bantuan.tingkat_prioritas)}`}>
                                {bantuan.tingkat_prioritas}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{bantuan.deskripsi}</p>
                          </div>
                          <button
                            onClick={() => {
                              setBantuanData(prev => ({
                                ...prev,
                                jenis_bantuan: prev.jenis_bantuan.filter(b => b.id !== bantuan.id)
                              }));
                            }}
                            className="text-red-600 hover:text-red-700 transition-colors duration-200"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                          <div className="flex items-center gap-2">
                            <MethodIcon className="w-4 h-4 text-blue-600" />
                            <span className="capitalize">{bantuan.metode_bantuan}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-green-600" />
                            <span>{bantuan.waktu_respon}h / {bantuan.durasi_bantuan}m</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-purple-600" />
                            <span>{bantuan.kapasitas_harian}/hari</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-orange-600" />
                            <span className="text-xs">{bantuan.pic_penanggung_jawab}</span>
                          </div>
                        </div>

                        <div className="text-sm">
                          <span className="font-medium text-gray-900 dark:text-white">Syarat: </span>
                          <span className="text-gray-600 dark:text-gray-300">
                            {bantuan.syarat_bantuan.length} persyaratan
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Channel Bantuan */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Channel Bantuan</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border border-gray-200 dark:border-gray-600 rounded-lg">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Channel</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Platform</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Kontak</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Jam Operasional</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Target Respon</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Kepuasan</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                      {bantuanData.channel_bantuan.map((channel) => (
                        <tr key={channel.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                          <td className="px-4 py-3">
                            <div className="font-medium text-gray-900 dark:text-white">{channel.nama_channel}</div>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{channel.platform}</td>
                          <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{channel.kontak}</td>
                          <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{channel.jam_operasional}</td>
                          <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{channel.response_time_target} mnt</td>
                          <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{channel.tingkat_kepuasan}%</td>
                          <td className="px-4 py-3">
                            <button
                              onClick={() => {
                                setBantuanData(prev => ({
                                  ...prev,
                                  channel_bantuan: prev.channel_bantuan.filter(c => c.id !== channel.id)
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

              {/* Escalation Matrix */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Escalation Matrix</h3>
                <div className="space-y-3">
                  {bantuanData.escalation_matrix.map((level) => (
                    <div key={level.level} className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`w-8 h-8 rounded-full bg-blue-${level.level * 100} flex items-center justify-center text-white font-bold`}>
                          {level.level}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 dark:text-white">{level.nama_level}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300">{level.kondisi_escalation}</p>
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {level.waktu_escalation}h → {level.pic_escalation}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab: Preview */}
          {activeTab === 'preview' && (
            <div className="space-y-6">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{bantuanData.nama_layanan}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{bantuanData.deskripsi}</p>
                
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border-l-4 border-blue-600 mb-6">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Visi Bantuan</h4>
                  <p className="text-gray-600 dark:text-gray-300">{bantuanData.visi_bantuan}</p>
                </div>
                
                {/* KPI Display */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="w-5 h-5 text-blue-600" />
                      <span className="font-medium text-gray-900 dark:text-white">Target Bantuan</span>
                    </div>
                    <div className="text-2xl font-bold text-blue-600">{bantuanData.kpi_target.total_bantuan_bulanan}/bulan</div>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-5 h-5 text-green-600" />
                      <span className="font-medium text-gray-900 dark:text-white">Waktu Respon</span>
                    </div>
                    <div className="text-2xl font-bold text-green-600">{bantuanData.kpi_target.waktu_respon_rata} jam</div>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Star className="w-5 h-5 text-yellow-600" />
                      <span className="font-medium text-gray-900 dark:text-white">Kepuasan</span>
                    </div>
                    <div className="text-2xl font-bold text-yellow-600">{bantuanData.kpi_target.tingkat_kepuasan}%</div>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-5 h-5 text-purple-600" />
                      <span className="font-medium text-gray-900 dark:text-white">Success Rate</span>
                    </div>
                    <div className="text-2xl font-bold text-purple-600">{bantuanData.kpi_target.success_rate}%</div>
                  </div>
                </div>

                {/* Jenis Bantuan */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Jenis Bantuan</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {bantuanData.jenis_bantuan.map((bantuan) => {
                      const MethodIcon = getMethodIcon(bantuan.metode_bantuan);
                      return (
                        <div key={bantuan.id} className="p-4 bg-white dark:bg-gray-800 rounded border-l-4 border-blue-600">
                          <div className="flex items-center gap-2 mb-2">
                            <h5 className="font-medium text-gray-900 dark:text-white">{bantuan.nama_bantuan}</h5>
                            <span className={`px-2 py-1 rounded text-xs font-medium capitalize ${getCategoryColor(bantuan.kategori)}`}>
                              {bantuan.kategori}
                            </span>
                            <span className={`px-2 py-1 rounded text-xs font-medium capitalize ${getPriorityColor(bantuan.tingkat_prioritas)}`}>
                              {bantuan.tingkat_prioritas}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{bantuan.deskripsi}</p>
                          <div className="grid grid-cols-2 gap-2 text-xs text-gray-500 dark:text-gray-400">
                            <div className="flex items-center gap-1">
                              <MethodIcon className="w-3 h-3" />
                              {bantuan.metode_bantuan}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {bantuan.waktu_respon}h
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              {bantuan.kapasitas_harian}/hari
                            </div>
                            <div className="flex items-center gap-1">
                              <User className="w-3 h-3" />
                              {bantuan.pic_penanggung_jawab}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Kontak Darurat */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Kontak Darurat</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded">
                      <Phone className="w-5 h-5 text-red-600" />
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">Hotline 24 Jam</div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">{bantuanData.kontak_darurat.hotline_24jam}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded">
                      <MessageSquare className="w-5 h-5 text-green-600" />
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">WhatsApp Darurat</div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">{bantuanData.kontak_darurat.whatsapp_darurat}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded">
                      <Mail className="w-5 h-5 text-blue-600" />
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">Email Darurat</div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">{bantuanData.kontak_darurat.email_darurat}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded">
                      <User className="w-5 h-5 text-purple-600" />
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">Koordinator</div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">{bantuanData.kontak_darurat.koordinator_darurat}</div>
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
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
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
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <Save className="w-4 h-4" />
            Simpan Perubahan
          </button>
        </div>
      </div>
    </div>
  );
}
