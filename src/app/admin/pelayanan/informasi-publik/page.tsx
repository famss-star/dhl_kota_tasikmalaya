"use client";

import { useState } from "react";
import { 
  Info, 
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
  Globe
} from "lucide-react";

interface KategoriInformasi {
  id: string;
  nama_kategori: string;
  deskripsi: string;
  kode_klasifikasi: string;
  tingkat_akses: 'terbuka' | 'terbatas' | 'rahasia';
  pic_pengelola: string;
  waktu_respon: number; // dalam jam
  biaya_akses: number;
  aktif: boolean;
}

interface JenisInformasi {
  id: string;
  nama_jenis: string;
  kategori_id: string;
  deskripsi: string;
  format_tersedia: string[];
  syarat_akses: string[];
  prosedur_permintaan: string[];
  waktu_penyediaan: number; // dalam hari
  biaya: number;
  kontak_pic: string;
  aktif: boolean;
}

interface InformasiPublikTemplate {
  id: number;
  nama_layanan: string;
  deskripsi: string;
  dasar_hukum: string[];
  kategori_informasi: KategoriInformasi[];
  jenis_informasi: JenisInformasi[];
  prosedur_umum: string[];
  mekanisme_keberatan: string[];
  sanksi_penolakan: string[];
  kpi_target: {
    response_time: number; // jam
    fulfillment_rate: number; // persen
    satisfaction_target: number; // persen
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

export default function AdminPelayananInformasiPublikPage() {
  const [activeTab, setActiveTab] = useState<'info' | 'kategori' | 'preview'>('info');
  const [informasiData, setInformasiData] = useState<InformasiPublikTemplate>({
    id: 3,
    nama_layanan: "Layanan Informasi Publik",
    deskripsi: "Layanan penyediaan informasi publik sesuai dengan Undang-Undang Keterbukaan Informasi Publik (KIP) untuk memenuhi hak masyarakat atas informasi.",
    dasar_hukum: [
      "UU No. 14 Tahun 2008 tentang Keterbukaan Informasi Publik",
      "PP No. 61 Tahun 2010 tentang Pelaksanaan UU Keterbukaan Informasi Publik",
      "Peraturan KI No. 1 Tahun 2021 tentang Standar Layanan Informasi Publik",
      "Perda Kota Tasikmalaya tentang Keterbukaan Informasi Publik"
    ],
    kategori_informasi: [
      {
        id: "informasi_berkala",
        nama_kategori: "Informasi Berkala",
        deskripsi: "Informasi yang wajib disediakan dan diumumkan secara berkala",
        kode_klasifikasi: "IB",
        tingkat_akses: "terbuka",
        pic_pengelola: "Humas & Dokumentasi",
        waktu_respon: 1,
        biaya_akses: 0,
        aktif: true
      },
      {
        id: "informasi_serta_merta",
        nama_kategori: "Informasi Serta Merta",
        deskripsi: "Informasi yang dapat mengancam hajat hidup orang banyak dan ketertiban umum",
        kode_klasifikasi: "ISM",
        tingkat_akses: "terbuka",
        pic_pengelola: "Humas & Hukum",
        waktu_respon: 1,
        biaya_akses: 0,
        aktif: true
      },
      {
        id: "informasi_setiap_saat",
        nama_kategori: "Informasi Setiap Saat",
        deskripsi: "Informasi yang harus disediakan setiap saat sesuai permintaan",
        kode_klasifikasi: "ISS",
        tingkat_akses: "terbuka",
        pic_pengelola: "Dokumentasi & Arsip",
        waktu_respon: 10,
        biaya_akses: 0,
        aktif: true
      },
      {
        id: "informasi_dikecualikan",
        nama_kategori: "Informasi Dikecualikan",
        deskripsi: "Informasi yang dikecualikan bersifat kerahasiaan publik sesuai UU",
        kode_klasifikasi: "ID",
        tingkat_akses: "rahasia",
        pic_pengelola: "Legal & Keamanan",
        waktu_respon: 30,
        biaya_akses: 0,
        aktif: true
      }
    ],
    jenis_informasi: [
      {
        id: "profil_dinas",
        nama_jenis: "Profil Dinas",
        kategori_id: "informasi_berkala",
        deskripsi: "Informasi profil, visi-misi, struktur organisasi, dan tugas fungsi dinas",
        format_tersedia: ["PDF", "Website", "Brosur"],
        syarat_akses: ["Mengisi formulir permintaan"],
        prosedur_permintaan: [
          "Datang ke kantor DLH atau akses website",
          "Isi formulir permintaan informasi",
          "Serahkan ke petugas informasi",
          "Terima informasi dalam format yang diminta"
        ],
        waktu_penyediaan: 1,
        biaya: 0,
        kontak_pic: "Humas DLH",
        aktif: true
      },
      {
        id: "peraturan_kebijakan",
        nama_jenis: "Peraturan dan Kebijakan",
        kategori_id: "informasi_berkala",
        deskripsi: "Peraturan perundang-undangan, kebijakan, dan regulasi bidang lingkungan",
        format_tersedia: ["PDF", "Hard Copy", "Website"],
        syarat_akses: ["Mengisi formulir permintaan", "Identitas diri"],
        prosedur_permintaan: [
          "Ajukan permohonan tertulis",
          "Sertakan identitas pemohon",
          "Tunggu verifikasi petugas",
          "Terima dokumen sesuai format yang diminta"
        ],
        waktu_penyediaan: 3,
        biaya: 10000,
        kontak_pic: "Bagian Hukum",
        aktif: true
      },
      {
        id: "laporan_kinerja",
        nama_jenis: "Laporan Kinerja",
        kategori_id: "informasi_berkala",
        deskripsi: "LAKIP, laporan kegiatan, capaian kinerja, dan evaluasi program",
        format_tersedia: ["PDF", "Excel", "Website"],
        syarat_akses: ["Formulir permintaan", "Surat permohonan resmi"],
        prosedur_permintaan: [
          "Ajukan surat permohonan resmi",
          "Isi formulir permintaan informasi",
          "Serahkan ke bagian perencanaan",
          "Tunggu proses verifikasi dan persetujuan",
          "Terima laporan dalam format yang diminta"
        ],
        waktu_penyediaan: 7,
        biaya: 25000,
        kontak_pic: "Bagian Perencanaan",
        aktif: true
      },
      {
        id: "data_lingkungan",
        nama_jenis: "Data Kualitas Lingkungan",
        kategori_id: "informasi_setiap_saat",
        deskripsi: "Data monitoring kualitas air, udara, dan lingkungan hidup",
        format_tersedia: ["Excel", "PDF", "Database"],
        syarat_akses: ["Formulir permintaan", "Surat permohonan", "Identitas pemohon"],
        prosedur_permintaan: [
          "Ajukan surat permohonan dengan tujuan penggunaan",
          "Isi formulir permintaan data spesifik",
          "Serahkan fotokopi identitas",
          "Tunggu verifikasi dan persetujuan teknis",
          "Bayar biaya pemrosesan data",
          "Terima data sesuai format yang diminta"
        ],
        waktu_penyediaan: 14,
        biaya: 50000,
        kontak_pic: "Bagian Pemantauan",
        aktif: true
      },
      {
        id: "info_darurat",
        nama_jenis: "Informasi Darurat Lingkungan",
        kategori_id: "informasi_serta_merta",
        deskripsi: "Informasi pencemaran, kebakaran, atau keadaan darurat lingkungan",
        format_tersedia: ["Website", "Siaran Pers", "Media Sosial"],
        syarat_akses: ["Tersedia langsung untuk publik"],
        prosedur_permintaan: [
          "Akses website resmi DLH",
          "Pantau media sosial resmi",
          "Hubungi hotline darurat",
          "Informasi disebarkan otomatis saat terjadi kejadian"
        ],
        waktu_penyediaan: 0,
        biaya: 0,
        kontak_pic: "Tim Tanggap Darurat",
        aktif: true
      }
    ],
    prosedur_umum: [
      "Ajukan permohonan informasi secara tertulis atau lisan",
      "Sertakan identitas pemohon yang jelas",
      "Jelaskan informasi yang diminta secara spesifik",
      "Tunggu konfirmasi dari petugas informasi",
      "Bayar biaya administrasi jika diperlukan",
      "Terima informasi sesuai jadwal yang ditetapkan",
      "Berikan feedback kepuasan layanan"
    ],
    mekanisme_keberatan: [
      "Ajukan keberatan tertulis dalam 30 hari sejak permintaan ditolak",
      "Sertakan alasan keberatan yang jelas dan lengkap",
      "Lampirkan bukti pendukung keberatan",
      "Serahkan ke Atasan PPID (Pejabat Pengelola Informasi dan Dokumentasi)",
      "Tunggu keputusan dalam 30 hari kerja",
      "Jika masih tidak puas, ajukan ke Komisi Informasi Provinsi"
    ],
    sanksi_penolakan: [
      "Pejabat yang menolak memberikan informasi tanpa alasan yang sah dapat dikenai sanksi administratif",
      "Sanksi berupa teguran tertulis, penurunan pangkat, atau pemberhentian",
      "Denda administratif sesuai peraturan perundang-undangan",
      "Kewajiban memberikan informasi setelah putusan Komisi Informasi",
      "Publikasi nama pejabat yang melanggar ketentuan KIP"
    ],
    kpi_target: {
      response_time: 10, // jam
      fulfillment_rate: 95, // persen
      satisfaction_target: 90 // persen
    },
    kontak_informasi: {
      telepon: "(0265) 123-789",
      email: "ppid@dlh.tasikmalayakota.go.id",
      website: "https://ppid.dlh.tasikmalayakota.go.id",
      alamat: "Jl. Tentara Pelajar No.1, Tasikmalaya",
      jam_layanan: "Senin-Jumat: 08:00-16:00 WIB"
    },
    status: 'aktif'
  });

  const [newKategori, setNewKategori] = useState<KategoriInformasi>({
    id: "",
    nama_kategori: "",
    deskripsi: "",
    kode_klasifikasi: "",
    tingkat_akses: "terbuka",
    pic_pengelola: "",
    waktu_respon: 1,
    biaya_akses: 0,
    aktif: true
  });

  const [newJenis, setNewJenis] = useState<JenisInformasi>({
    id: "",
    nama_jenis: "",
    kategori_id: "",
    deskripsi: "",
    format_tersedia: [],
    syarat_akses: [],
    prosedur_permintaan: [],
    waktu_penyediaan: 1,
    biaya: 0,
    kontak_pic: "",
    aktif: true
  });

  const [newProsedur, setNewProsedur] = useState("");
  const [newMekanisme, setNewMekanisme] = useState("");
  const [newSanksi, setNewSanksi] = useState("");
  const [newDasarHukum, setNewDasarHukum] = useState("");

  const getAccessLevelColor = (tingkat: string) => {
    const colors = {
      'terbuka': 'text-green-600 bg-green-100 dark:bg-green-900/20',
      'terbatas': 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20',
      'rahasia': 'text-red-600 bg-red-100 dark:bg-red-900/20'
    };
    return colors[tingkat as keyof typeof colors] || colors.terbuka;
  };

  const getAccessIcon = (tingkat: string) => {
    const icons = {
      'terbuka': Globe,
      'terbatas': Filter,
      'rahasia': AlertCircle
    };
    return icons[tingkat as keyof typeof icons] || Globe;
  };

  const handleSave = () => {
    console.log("Data informasi publik disimpan:", informasiData);
    alert("Data informasi publik berhasil disimpan!");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg p-6">
        <div className="flex items-center gap-4">
          <div className="bg-white/20 p-3 rounded-full">
            <Info className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">Admin Informasi Publik</h1>
            <p className="text-green-100">Kelola layanan informasi publik dan keterbukaan informasi</p>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            <span className="capitalize">{informasiData.status}</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <div className="flex">
            {[
              { id: 'info', label: 'Informasi Umum', icon: Info },
              { id: 'kategori', label: 'Kategori & Jenis', icon: BookOpen },
              { id: 'preview', label: 'Preview', icon: Eye }
            ].map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-6 py-4 border-b-2 font-medium text-sm transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'border-green-500 text-green-600 dark:text-green-400'
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
                  value={informasiData.nama_layanan}
                  onChange={(e) => setInformasiData(prev => ({ ...prev, nama_layanan: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Deskripsi
                </label>
                <textarea
                  value={informasiData.deskripsi}
                  onChange={(e) => setInformasiData(prev => ({ ...prev, deskripsi: e.target.value }))}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                />
              </div>

              {/* KPI Targets */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Target Kinerja (KPI)</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Response Time (jam)
                    </label>
                    <input
                      type="number"
                      value={informasiData.kpi_target.response_time}
                      onChange={(e) => setInformasiData(prev => ({ 
                        ...prev, 
                        kpi_target: { ...prev.kpi_target, response_time: parseInt(e.target.value) || 0 }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Fulfillment Rate (%)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={informasiData.kpi_target.fulfillment_rate}
                      onChange={(e) => setInformasiData(prev => ({ 
                        ...prev, 
                        kpi_target: { ...prev.kpi_target, fulfillment_rate: parseInt(e.target.value) || 0 }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
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
                      value={informasiData.kpi_target.satisfaction_target}
                      onChange={(e) => setInformasiData(prev => ({ 
                        ...prev, 
                        kpi_target: { ...prev.kpi_target, satisfaction_target: parseInt(e.target.value) || 0 }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Kontak Informasi */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Kontak PPID</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Telepon
                    </label>
                    <input
                      type="text"
                      value={informasiData.kontak_informasi.telepon}
                      onChange={(e) => setInformasiData(prev => ({ 
                        ...prev, 
                        kontak_informasi: { ...prev.kontak_informasi, telepon: e.target.value }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={informasiData.kontak_informasi.email}
                      onChange={(e) => setInformasiData(prev => ({ 
                        ...prev, 
                        kontak_informasi: { ...prev.kontak_informasi, email: e.target.value }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Website
                    </label>
                    <input
                      type="url"
                      value={informasiData.kontak_informasi.website}
                      onChange={(e) => setInformasiData(prev => ({ 
                        ...prev, 
                        kontak_informasi: { ...prev.kontak_informasi, website: e.target.value }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Jam Layanan
                    </label>
                    <input
                      type="text"
                      value={informasiData.kontak_informasi.jam_layanan}
                      onChange={(e) => setInformasiData(prev => ({ 
                        ...prev, 
                        kontak_informasi: { ...prev.kontak_informasi, jam_layanan: e.target.value }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Dasar Hukum */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Dasar Hukum
                </label>
                <div className="space-y-2 mb-4">
                  {informasiData.dasar_hukum.map((hukum, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-600 rounded-lg">
                      <span className="text-gray-900 dark:text-white">{hukum}</span>
                      <button
                        onClick={() => {
                          setInformasiData(prev => ({
                            ...prev,
                            dasar_hukum: prev.dasar_hukum.filter((_, i) => i !== index)
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
                    value={newDasarHukum}
                    onChange={(e) => setNewDasarHukum(e.target.value)}
                    placeholder="Tambah dasar hukum baru"
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <button
                    onClick={() => {
                      if (newDasarHukum.trim()) {
                        setInformasiData(prev => ({
                          ...prev,
                          dasar_hukum: [...prev.dasar_hukum, newDasarHukum.trim()]
                        }));
                        setNewDasarHukum("");
                      }
                    }}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Tab: Kategori & Jenis */}
          {activeTab === 'kategori' && (
            <div className="space-y-8">
              {/* Kategori Informasi */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Kategori Informasi</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
                  {informasiData.kategori_informasi.map((kategori) => {
                    const AccessIcon = getAccessIcon(kategori.tingkat_akses);
                    return (
                      <div key={kategori.id} className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-semibold text-gray-900 dark:text-white">{kategori.nama_kategori}</h4>
                              <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded text-xs font-mono">
                                {kategori.kode_klasifikasi}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{kategori.deskripsi}</p>
                          </div>
                          <button
                            onClick={() => {
                              setInformasiData(prev => ({
                                ...prev,
                                kategori_informasi: prev.kategori_informasi.filter(k => k.id !== kategori.id)
                              }));
                            }}
                            className="text-red-600 hover:text-red-700 transition-colors duration-200"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                          <div className="flex items-center gap-2">
                            <AccessIcon className="w-4 h-4 text-blue-600" />
                            <span className={`px-2 py-1 rounded text-xs font-medium capitalize ${getAccessLevelColor(kategori.tingkat_akses)}`}>
                              {kategori.tingkat_akses}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-green-600" />
                            <span>{kategori.waktu_respon} jam</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-purple-600" />
                            <span className="text-xs">{kategori.pic_pengelola}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-orange-600" />
                            <span>Rp {kategori.biaya_akses.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Jenis Informasi */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Jenis Informasi</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border border-gray-200 dark:border-gray-600 rounded-lg">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Jenis</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Kategori</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Format</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Waktu</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Biaya</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">PIC</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                      {informasiData.jenis_informasi.map((jenis) => {
                        const kategori = informasiData.kategori_informasi.find(k => k.id === jenis.kategori_id);
                        return (
                          <tr key={jenis.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                            <td className="px-4 py-3">
                              <div>
                                <div className="font-medium text-gray-900 dark:text-white">{jenis.nama_jenis}</div>
                                <div className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">{jenis.deskripsi}</div>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                              {kategori?.nama_kategori || 'N/A'}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                              {jenis.format_tersedia.join(', ')}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                              {jenis.waktu_penyediaan} hari
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                              {jenis.biaya === 0 ? 'Gratis' : `Rp ${jenis.biaya.toLocaleString()}`}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                              {jenis.kontak_pic}
                            </td>
                            <td className="px-4 py-3">
                              <button
                                onClick={() => {
                                  setInformasiData(prev => ({
                                    ...prev,
                                    jenis_informasi: prev.jenis_informasi.filter(j => j.id !== jenis.id)
                                  }));
                                }}
                                className="text-red-600 hover:text-red-700 transition-colors duration-200"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
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
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{informasiData.nama_layanan}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">{informasiData.deskripsi}</p>
                
                {/* KPI Display */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-5 h-5 text-green-600" />
                      <span className="font-medium text-gray-900 dark:text-white">Response Time</span>
                    </div>
                    <div className="text-2xl font-bold text-green-600">{informasiData.kpi_target.response_time} jam</div>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-5 h-5 text-blue-600" />
                      <span className="font-medium text-gray-900 dark:text-white">Fulfillment Rate</span>
                    </div>
                    <div className="text-2xl font-bold text-blue-600">{informasiData.kpi_target.fulfillment_rate}%</div>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="w-5 h-5 text-purple-600" />
                      <span className="font-medium text-gray-900 dark:text-white">Target Kepuasan</span>
                    </div>
                    <div className="text-2xl font-bold text-purple-600">{informasiData.kpi_target.satisfaction_target}%</div>
                  </div>
                </div>

                {/* Kategori Informasi */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Kategori Informasi</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {informasiData.kategori_informasi.map((kategori) => {
                      const AccessIcon = getAccessIcon(kategori.tingkat_akses);
                      return (
                        <div key={kategori.id} className="p-4 bg-white dark:bg-gray-800 rounded border-l-4 border-green-600">
                          <div className="flex items-center gap-2 mb-2">
                            <h5 className="font-medium text-gray-900 dark:text-white">{kategori.nama_kategori}</h5>
                            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded text-xs font-mono">
                              {kategori.kode_klasifikasi}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{kategori.deskripsi}</p>
                          <div className="grid grid-cols-2 gap-2 text-xs text-gray-500 dark:text-gray-400">
                            <div className="flex items-center gap-1">
                              <AccessIcon className="w-3 h-3" />
                              {kategori.tingkat_akses}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {kategori.waktu_respon} jam
                            </div>
                            <div className="flex items-center gap-1">
                              <User className="w-3 h-3" />
                              {kategori.pic_pengelola}
                            </div>
                            <div className="flex items-center gap-1">
                              <FileText className="w-3 h-3" />
                              {kategori.biaya_akses === 0 ? 'Gratis' : `Rp ${kategori.biaya_akses.toLocaleString()}`}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Kontak PPID */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Kontak PPID</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded">
                      <Phone className="w-5 h-5 text-blue-600" />
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">Telepon</div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">{informasiData.kontak_informasi.telepon}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded">
                      <Mail className="w-5 h-5 text-green-600" />
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">Email</div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">{informasiData.kontak_informasi.email}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded">
                      <Globe className="w-5 h-5 text-purple-600" />
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">Website</div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">{informasiData.kontak_informasi.website}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded">
                      <Clock className="w-5 h-5 text-orange-600" />
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">Jam Layanan</div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">{informasiData.kontak_informasi.jam_layanan}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Dasar Hukum */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Dasar Hukum</h4>
                  <div className="space-y-2">
                    {informasiData.dasar_hukum.map((hukum, index) => (
                      <div key={index} className="p-3 bg-white dark:bg-gray-800 rounded border-l-4 border-yellow-600">
                        <p className="text-sm text-gray-600 dark:text-gray-300">{hukum}</p>
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
          <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200">
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
            className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
          >
            <Save className="w-4 h-4" />
            Simpan Perubahan
          </button>
        </div>
      </div>
    </div>
  );
}
