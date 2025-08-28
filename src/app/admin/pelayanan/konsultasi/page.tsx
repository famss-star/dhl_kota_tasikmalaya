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
  MessageSquare
} from "lucide-react";

interface JenisKonsultasi {
  id: string;
  nama_jenis: string;
  deskripsi: string;
  kategori: 'teknis' | 'hukum' | 'prosedural' | 'umum';
  durasi_estimasi: number; // dalam menit
  metode: 'tatap_muka' | 'online' | 'telepon' | 'hybrid';
  biaya: number;
  syarat_dokumen: string[];
  pic_konsultan: string;
  kapasitas_harian: number;
  aktif: boolean;
}

interface JadwalKonsultasi {
  id: string;
  hari: string;
  jam_mulai: string;
  jam_selesai: string;
  kapasitas: number;
  jenis_layanan: string[];
  ruangan: string;
  konsultan: string;
  aktif: boolean;
}

interface KonsultasiTemplate {
  id: number;
  nama_layanan: string;
  deskripsi: string;
  jenis_konsultasi: JenisKonsultasi[];
  jadwal_konsultasi: JadwalKonsultasi[];
  persyaratan_umum: string[];
  prosedur_booking: string[];
  faq_umum: { pertanyaan: string; jawaban: string; }[];
  kpi_target: {
    response_booking: number; // jam
    satisfaction_target: number; // persen
    utilization_target: number; // persen
  };
  kontak_informasi: {
    telepon: string;
    email: string;
    whatsapp: string;
    alamat: string;
  };
  dasar_hukum: string[];
  status: 'aktif' | 'non-aktif';
}

export default function AdminPelayananKonsultasiPage() {
  const [activeTab, setActiveTab] = useState<'info' | 'jenis' | 'preview'>('info');
  const [konsultasiData, setKonsultasiData] = useState<KonsultasiTemplate>({
    id: 2,
    nama_layanan: "Layanan Konsultasi Lingkungan",
    deskripsi: "Layanan konsultasi dan bimbingan teknis untuk masyarakat, pelaku usaha, dan instansi terkait masalah lingkungan hidup di Kota Tasikmalaya.",
    jenis_konsultasi: [
      {
        id: "amdal_ukl_upl",
        nama_jenis: "Konsultasi AMDAL/UKL-UPL",
        deskripsi: "Bimbingan penyusunan dokumen AMDAL, UKL-UPL untuk usaha/kegiatan",
        kategori: "teknis",
        durasi_estimasi: 120,
        metode: "hybrid",
        biaya: 0,
        syarat_dokumen: [
          "Profil usaha/kegiatan",
          "Rencana lokasi dan layout",
          "Data teknis kegiatan",
          "Studi kelayakan (jika ada)"
        ],
        pic_konsultan: "Tim Teknis AMDAL",
        kapasitas_harian: 4,
        aktif: true
      },
      {
        id: "perizinan_lingkungan",
        nama_jenis: "Konsultasi Perizinan Lingkungan",
        deskripsi: "Panduan prosedur dan persyaratan perizinan lingkungan",
        kategori: "prosedural",
        durasi_estimasi: 60,
        metode: "hybrid",
        biaya: 0,
        syarat_dokumen: [
          "Profil pemohon",
          "Jenis kegiatan yang akan dilakukan",
          "Lokasi kegiatan"
        ],
        pic_konsultan: "Petugas Perizinan",
        kapasitas_harian: 8,
        aktif: true
      },
      {
        id: "pengelolaan_limbah",
        nama_jenis: "Konsultasi Pengelolaan Limbah",
        deskripsi: "Bimbingan teknis pengelolaan limbah B3 dan non-B3",
        kategori: "teknis",
        durasi_estimasi: 90,
        metode: "tatap_muka",
        biaya: 0,
        syarat_dokumen: [
          "Jenis dan karakteristik limbah",
          "Volume limbah yang dihasilkan",
          "Sistem pengelolaan saat ini",
          "Rencana pengelolaan"
        ],
        pic_konsultan: "Ahli Pengelolaan Limbah",
        kapasitas_harian: 6,
        aktif: true
      },
      {
        id: "hukum_lingkungan",
        nama_jenis: "Konsultasi Hukum Lingkungan",
        deskripsi: "Konsultasi aspek hukum dan regulasi lingkungan hidup",
        kategori: "hukum",
        durasi_estimasi: 90,
        metode: "hybrid",
        biaya: 0,
        syarat_dokumen: [
          "Deskripsi kasus/masalah",
          "Dokumen terkait (jika ada)",
          "Kronologi kejadian"
        ],
        pic_konsultan: "Legal Officer",
        kapasitas_harian: 4,
        aktif: true
      }
    ],
    jadwal_konsultasi: [
      {
        id: "senin_pagi",
        hari: "Senin",
        jam_mulai: "08:00",
        jam_selesai: "12:00",
        kapasitas: 8,
        jenis_layanan: ["perizinan_lingkungan", "hukum_lingkungan"],
        ruangan: "Ruang Konsultasi 1",
        konsultan: "Tim Perizinan & Legal",
        aktif: true
      },
      {
        id: "senin_siang",
        hari: "Senin",
        jam_mulai: "13:00",
        jam_selesai: "16:00",
        kapasitas: 6,
        jenis_layanan: ["amdal_ukl_upl", "pengelolaan_limbah"],
        ruangan: "Ruang Konsultasi 2",
        konsultan: "Tim Teknis",
        aktif: true
      },
      {
        id: "selasa_pagi",
        hari: "Selasa",
        jam_mulai: "08:00",
        jam_selesai: "12:00",
        kapasitas: 8,
        jenis_layanan: ["perizinan_lingkungan", "pengelolaan_limbah"],
        ruangan: "Ruang Konsultasi 1",
        konsultan: "Tim Teknis & Perizinan",
        aktif: true
      },
      {
        id: "rabu_pagi",
        hari: "Rabu",
        jam_mulai: "08:00",
        jam_selesai: "12:00",
        kapasitas: 6,
        jenis_layanan: ["amdal_ukl_upl"],
        ruangan: "Ruang Konsultasi 2",
        konsultan: "Tim AMDAL",
        aktif: true
      },
      {
        id: "kamis_pagi",
        hari: "Kamis",
        jam_mulai: "08:00",
        jam_selesai: "12:00",
        kapasitas: 8,
        jenis_layanan: ["perizinan_lingkungan", "hukum_lingkungan"],
        ruangan: "Ruang Konsultasi 1",
        konsultan: "Tim Perizinan & Legal",
        aktif: true
      },
      {
        id: "jumat_pagi",
        hari: "Jumat",
        jam_mulai: "08:00",
        jam_selesai: "11:00",
        kapasitas: 6,
        jenis_layanan: ["pengelolaan_limbah", "hukum_lingkungan"],
        ruangan: "Ruang Konsultasi 1",
        konsultan: "Tim Teknis & Legal",
        aktif: true
      }
    ],
    persyaratan_umum: [
      "Mengisi formulir pendaftaran konsultasi",
      "Menyertakan identitas diri (KTP/Kartu Identitas)",
      "Menyiapkan dokumen pendukung sesuai jenis konsultasi",
      "Melakukan reservasi jadwal terlebih dahulu",
      "Hadir tepat waktu sesuai jadwal yang telah ditentukan"
    ],
    prosedur_booking: [
      "Akses website atau datang langsung ke kantor DLH",
      "Pilih jenis konsultasi yang dibutuhkan",
      "Pilih jadwal yang tersedia",
      "Isi formulir pendaftaran lengkap",
      "Upload dokumen pendukung yang diperlukan",
      "Submit pendaftaran dan tunggu konfirmasi",
      "Terima notifikasi konfirmasi jadwal",
      "Hadir sesuai jadwal yang telah dikonfirmasi"
    ],
    faq_umum: [
      {
        pertanyaan: "Apakah layanan konsultasi berbayar?",
        jawaban: "Tidak, semua layanan konsultasi DLH Kota Tasikmalaya adalah gratis untuk masyarakat."
      },
      {
        pertanyaan: "Berapa lama durasi konsultasi?",
        jawaban: "Durasi konsultasi bervariasi tergantung jenis, umumnya 60-120 menit per sesi."
      },
      {
        pertanyaan: "Bisakah konsultasi dilakukan secara online?",
        jawaban: "Ya, beberapa jenis konsultasi dapat dilakukan secara online melalui video call atau telepon."
      },
      {
        pertanyaan: "Dokumen apa saja yang perlu disiapkan?",
        jawaban: "Dokumen yang diperlukan berbeda sesuai jenis konsultasi. Detailnya dapat dilihat pada masing-masing jenis layanan."
      },
      {
        pertanyaan: "Bagaimana cara membatalkan jadwal konsultasi?",
        jawaban: "Pembatalan dapat dilakukan minimal 1x24 jam sebelum jadwal melalui telepon atau datang langsung."
      }
    ],
    kpi_target: {
      response_booking: 2, // jam
      satisfaction_target: 90, // persen
      utilization_target: 75 // persen
    },
    kontak_informasi: {
      telepon: "(0265) 123-456",
      email: "konsultasi@dlh.tasikmalayakota.go.id",
      whatsapp: "+62 265-123456",
      alamat: "Jl. Tentara Pelajar No.1, Tasikmalaya"
    },
    dasar_hukum: [
      "UU No. 25 Tahun 2009 tentang Pelayanan Publik",
      "UU No. 32 Tahun 2009 tentang Perlindungan dan Pengelolaan Lingkungan Hidup",
      "PP No. 27 Tahun 2012 tentang Izin Lingkungan",
      "Perda Kota Tasikmalaya tentang Pengelolaan Lingkungan Hidup",
      "Perwali Tasikmalaya tentang Standar Pelayanan Konsultasi"
    ],
    status: 'aktif'
  });

  const [newJenis, setNewJenis] = useState<JenisKonsultasi>({
    id: "",
    nama_jenis: "",
    deskripsi: "",
    kategori: "umum",
    durasi_estimasi: 60,
    metode: "hybrid",
    biaya: 0,
    syarat_dokumen: [],
    pic_konsultan: "",
    kapasitas_harian: 4,
    aktif: true
  });

  const [newJadwal, setNewJadwal] = useState<JadwalKonsultasi>({
    id: "",
    hari: "Senin",
    jam_mulai: "08:00",
    jam_selesai: "12:00",
    kapasitas: 4,
    jenis_layanan: [],
    ruangan: "",
    konsultan: "",
    aktif: true
  });

  const [newPersyaratan, setNewPersyaratan] = useState("");
  const [newProsedur, setNewProsedur] = useState("");
  const [newFAQ, setNewFAQ] = useState({ pertanyaan: "", jawaban: "" });
  const [newDasarHukum, setNewDasarHukum] = useState("");

  const getCategoryColor = (kategori: string) => {
    const colors = {
      'teknis': 'text-blue-600 bg-blue-100 dark:bg-blue-900/20',
      'hukum': 'text-purple-600 bg-purple-100 dark:bg-purple-900/20',
      'prosedural': 'text-green-600 bg-green-100 dark:bg-green-900/20',
      'umum': 'text-gray-600 bg-gray-100 dark:bg-gray-900/20'
    };
    return colors[kategori as keyof typeof colors] || colors.umum;
  };

  const getMethodIcon = (metode: string) => {
    const icons = {
      'tatap_muka': MapPin,
      'online': Mail,
      'telepon': Phone,
      'hybrid': Users
    };
    return icons[metode as keyof typeof icons] || Users;
  };

  const handleSave = () => {
    console.log("Data konsultasi disimpan:", konsultasiData);
    alert("Data konsultasi berhasil disimpan!");
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
            <h1 className="text-2xl font-bold">Admin Layanan Konsultasi</h1>
            <p className="text-blue-100">Kelola layanan konsultasi dan bimbingan teknis</p>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            <span className="capitalize">{konsultasiData.status}</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <div className="flex">
            {[
              { id: 'info', label: 'Informasi Umum', icon: HelpCircle },
              { id: 'jenis', label: 'Jenis & Jadwal', icon: Calendar },
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
          {/* Tab: Informasi Umum */}
          {activeTab === 'info' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Nama Layanan
                </label>
                <input
                  type="text"
                  value={konsultasiData.nama_layanan}
                  onChange={(e) => setKonsultasiData(prev => ({ ...prev, nama_layanan: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Deskripsi
                </label>
                <textarea
                  value={konsultasiData.deskripsi}
                  onChange={(e) => setKonsultasiData(prev => ({ ...prev, deskripsi: e.target.value }))}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                />
              </div>

              {/* KPI Targets */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Response Booking (jam)
                  </label>
                  <input
                    type="number"
                    value={konsultasiData.kpi_target.response_booking}
                    onChange={(e) => setKonsultasiData(prev => ({ 
                      ...prev, 
                      kpi_target: { ...prev.kpi_target, response_booking: parseInt(e.target.value) || 0 }
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
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
                    value={konsultasiData.kpi_target.satisfaction_target}
                    onChange={(e) => setKonsultasiData(prev => ({ 
                      ...prev, 
                      kpi_target: { ...prev.kpi_target, satisfaction_target: parseInt(e.target.value) || 0 }
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Target Utilisasi (%)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={konsultasiData.kpi_target.utilization_target}
                    onChange={(e) => setKonsultasiData(prev => ({ 
                      ...prev, 
                      kpi_target: { ...prev.kpi_target, utilization_target: parseInt(e.target.value) || 0 }
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
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
                      value={konsultasiData.kontak_informasi.telepon}
                      onChange={(e) => setKonsultasiData(prev => ({ 
                        ...prev, 
                        kontak_informasi: { ...prev.kontak_informasi, telepon: e.target.value }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={konsultasiData.kontak_informasi.email}
                      onChange={(e) => setKonsultasiData(prev => ({ 
                        ...prev, 
                        kontak_informasi: { ...prev.kontak_informasi, email: e.target.value }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      WhatsApp
                    </label>
                    <input
                      type="text"
                      value={konsultasiData.kontak_informasi.whatsapp}
                      onChange={(e) => setKonsultasiData(prev => ({ 
                        ...prev, 
                        kontak_informasi: { ...prev.kontak_informasi, whatsapp: e.target.value }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Alamat
                    </label>
                    <textarea
                      value={konsultasiData.kontak_informasi.alamat}
                      onChange={(e) => setKonsultasiData(prev => ({ 
                        ...prev, 
                        kontak_informasi: { ...prev.kontak_informasi, alamat: e.target.value }
                      }))}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* FAQ */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  FAQ (Frequently Asked Questions)
                </label>
                <div className="space-y-3 mb-4">
                  {konsultasiData.faq_umum.map((faq, index) => (
                    <div key={index} className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-gray-900 dark:text-white">{faq.pertanyaan}</h4>
                        <button
                          onClick={() => {
                            setKonsultasiData(prev => ({
                              ...prev,
                              faq_umum: prev.faq_umum.filter((_, i) => i !== index)
                            }));
                          }}
                          className="text-red-600 hover:text-red-700 transition-colors duration-200"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{faq.jawaban}</p>
                    </div>
                  ))}
                </div>

                <div className="p-4 border-2 border-dashed border-blue-300 dark:border-blue-600 rounded-lg">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">Tambah FAQ Baru</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Pertanyaan</label>
                      <input
                        type="text"
                        value={newFAQ.pertanyaan}
                        onChange={(e) => setNewFAQ(prev => ({ ...prev, pertanyaan: e.target.value }))}
                        placeholder="Masukkan pertanyaan"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Jawaban</label>
                      <textarea
                        value={newFAQ.jawaban}
                        onChange={(e) => setNewFAQ(prev => ({ ...prev, jawaban: e.target.value }))}
                        placeholder="Masukkan jawaban"
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                      />
                    </div>
                    <button
                      onClick={() => {
                        if (newFAQ.pertanyaan && newFAQ.jawaban) {
                          setKonsultasiData(prev => ({
                            ...prev,
                            faq_umum: [...prev.faq_umum, { ...newFAQ }]
                          }));
                          setNewFAQ({ pertanyaan: "", jawaban: "" });
                        }
                      }}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    >
                      <Plus className="w-4 h-4" />
                      Tambah FAQ
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab: Jenis & Jadwal */}
          {activeTab === 'jenis' && (
            <div className="space-y-8">
              {/* Jenis Konsultasi */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Jenis Konsultasi</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
                  {konsultasiData.jenis_konsultasi.map((jenis) => {
                    const MethodIcon = getMethodIcon(jenis.metode);
                    return (
                      <div key={jenis.id} className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-semibold text-gray-900 dark:text-white">{jenis.nama_jenis}</h4>
                              <span className={`px-2 py-1 rounded text-xs font-medium capitalize ${getCategoryColor(jenis.kategori)}`}>
                                {jenis.kategori}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{jenis.deskripsi}</p>
                          </div>
                          <button
                            onClick={() => {
                              setKonsultasiData(prev => ({
                                ...prev,
                                jenis_konsultasi: prev.jenis_konsultasi.filter(j => j.id !== jenis.id)
                              }));
                            }}
                            className="text-red-600 hover:text-red-700 transition-colors duration-200"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-blue-600" />
                            <span>{jenis.durasi_estimasi} menit</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MethodIcon className="w-4 h-4 text-green-600" />
                            <span className="capitalize">{jenis.metode.replace('_', ' ')}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-purple-600" />
                            <span>{jenis.kapasitas_harian}/hari</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-orange-600" />
                            <span className="text-xs">{jenis.pic_konsultan}</span>
                          </div>
                        </div>

                        <div className="text-sm">
                          <span className="font-medium text-gray-900 dark:text-white">Dokumen: </span>
                          <span className="text-gray-600 dark:text-gray-300">
                            {jenis.syarat_dokumen.length} dokumen diperlukan
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Jadwal Konsultasi */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Jadwal Konsultasi</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border border-gray-200 dark:border-gray-600 rounded-lg">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Hari</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Waktu</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Kapasitas</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Ruangan</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Konsultan</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                      {konsultasiData.jadwal_konsultasi.map((jadwal) => (
                        <tr key={jadwal.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                          <td className="px-4 py-3 text-sm text-gray-900 dark:text-white font-medium">{jadwal.hari}</td>
                          <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                            {jadwal.jam_mulai} - {jadwal.jam_selesai}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{jadwal.kapasitas}</td>
                          <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{jadwal.ruangan}</td>
                          <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{jadwal.konsultan}</td>
                          <td className="px-4 py-3">
                            <button
                              onClick={() => {
                                setKonsultasiData(prev => ({
                                  ...prev,
                                  jadwal_konsultasi: prev.jadwal_konsultasi.filter(j => j.id !== jadwal.id)
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
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{konsultasiData.nama_layanan}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">{konsultasiData.deskripsi}</p>
                
                {/* KPI Display */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-5 h-5 text-blue-600" />
                      <span className="font-medium text-gray-900 dark:text-white">Response Booking</span>
                    </div>
                    <div className="text-2xl font-bold text-blue-600">{konsultasiData.kpi_target.response_booking} jam</div>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="font-medium text-gray-900 dark:text-white">Target Kepuasan</span>
                    </div>
                    <div className="text-2xl font-bold text-green-600">{konsultasiData.kpi_target.satisfaction_target}%</div>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="w-5 h-5 text-purple-600" />
                      <span className="font-medium text-gray-900 dark:text-white">Target Utilisasi</span>
                    </div>
                    <div className="text-2xl font-bold text-purple-600">{konsultasiData.kpi_target.utilization_target}%</div>
                  </div>
                </div>

                {/* Jenis Konsultasi */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Jenis Konsultasi</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {konsultasiData.jenis_konsultasi.map((jenis) => {
                      const MethodIcon = getMethodIcon(jenis.metode);
                      return (
                        <div key={jenis.id} className="p-4 bg-white dark:bg-gray-800 rounded border-l-4 border-blue-600">
                          <div className="flex items-center gap-2 mb-2">
                            <h5 className="font-medium text-gray-900 dark:text-white">{jenis.nama_jenis}</h5>
                            <span className={`px-2 py-1 rounded text-xs font-medium capitalize ${getCategoryColor(jenis.kategori)}`}>
                              {jenis.kategori}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{jenis.deskripsi}</p>
                          <div className="grid grid-cols-2 gap-2 text-xs text-gray-500 dark:text-gray-400">
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {jenis.durasi_estimasi} min
                            </div>
                            <div className="flex items-center gap-1">
                              <MethodIcon className="w-3 h-3" />
                              {jenis.metode.replace('_', ' ')}
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              {jenis.kapasitas_harian}/hari
                            </div>
                            <div className="flex items-center gap-1">
                              <User className="w-3 h-3" />
                              {jenis.pic_konsultan}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Kontak Informasi */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Kontak Informasi</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded">
                      <Phone className="w-5 h-5 text-blue-600" />
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">Telepon</div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">{konsultasiData.kontak_informasi.telepon}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded">
                      <Mail className="w-5 h-5 text-green-600" />
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">Email</div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">{konsultasiData.kontak_informasi.email}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded">
                      <MessageSquare className="w-5 h-5 text-green-600" />
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">WhatsApp</div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">{konsultasiData.kontak_informasi.whatsapp}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded">
                      <MapPin className="w-5 h-5 text-red-600" />
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">Alamat</div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">{konsultasiData.kontak_informasi.alamat}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* FAQ */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">FAQ (Frequently Asked Questions)</h4>
                  <div className="space-y-3">
                    {konsultasiData.faq_umum.map((faq, index) => (
                      <div key={index} className="p-4 bg-white dark:bg-gray-800 rounded border-l-4 border-yellow-600">
                        <h5 className="font-medium text-gray-900 dark:text-white mb-2">{faq.pertanyaan}</h5>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{faq.jawaban}</p>
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
