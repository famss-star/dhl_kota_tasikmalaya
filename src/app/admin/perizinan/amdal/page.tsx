"use client";

import { useState } from "react";
import { 
  Scale, 
  Save, 
  Eye, 
  Plus, 
  Trash2, 
  Download,
  Upload,
  CheckCircle,
  AlertCircle,
  Clock,
  FileCheck,
  TreePine,
  Edit3
} from "lucide-react";

interface AMDALStage {
  id: string;
  nama_tahap: string;
  deskripsi: string;
  waktu_proses: number;
  dokumen_required: string[];
  biaya: number;
  urutan: number;
}

interface AMDALTemplate {
  id: number;
  nama_perizinan: string;
  deskripsi: string;
  kategori_kegiatan: string[];
  tahapan_amdal: AMDALStage[];
  persyaratan_umum: string[];
  konsultan_tersertifikasi: boolean;
  komisi_amdal: string[];
  waktu_total: number;
  biaya_total: number;
  dasar_hukum: string[];
  status: 'aktif' | 'non-aktif';
}

export default function AdminPerizinanAMDALPage() {
  const [activeTab, setActiveTab] = useState<'info' | 'tahapan' | 'preview'>('info');
  const [amdal, setAmdal] = useState<AMDALTemplate>({
    id: 2,
    nama_perizinan: "Perizinan AMDAL (Analisis Mengenai Dampak Lingkungan Hidup)",
    deskripsi: "Perizinan untuk kegiatan yang berpotensi menimbulkan dampak penting terhadap lingkungan hidup, meliputi analisis dampak lingkungan, rencana pengelolaan lingkungan, dan rencana pemantauan lingkungan.",
    kategori_kegiatan: [
      "Industri kimia dasar",
      "Pertambangan dan penggalian",
      "Pembangkit listrik",
      "Infrastruktur jalan dan jembatan",
      "Pengembangan kawasan industri",
      "Perkebunan skala besar",
      "Perikanan dan kelautan",
      "Pengelolaan limbah B3"
    ],
    tahapan_amdal: [
      {
        id: "pelingkupan",
        nama_tahap: "Pelingkupan (Scoping)",
        deskripsi: "Penentuan lingkup studi AMDAL berdasarkan dampak hipotetik kegiatan",
        waktu_proses: 30,
        dokumen_required: [
          "Kerangka Acuan Analisis Dampak Lingkungan (KA-ANDAL)",
          "Peta lokasi dan tata ruang",
          "Deskripsi rona lingkungan awal",
          "Identifikasi dampak hipotetik"
        ],
        biaya: 15000000,
        urutan: 1
      },
      {
        id: "penyusunan",
        nama_tahap: "Penyusunan ANDAL",
        deskripsi: "Penyusunan dokumen Analisis Dampak Lingkungan",
        waktu_proses: 90,
        dokumen_required: [
          "Dokumen ANDAL lengkap",
          "Hasil survei dan analisis laboratorium",
          "Peta tematik dampak lingkungan",
          "Analisis prakiraan dampak"
        ],
        biaya: 75000000,
        urutan: 2
      },
      {
        id: "rpl_rpl",
        nama_tahap: "Penyusunan RKL-RPL",
        deskripsi: "Penyusunan Rencana Pengelolaan dan Rencana Pemantauan Lingkungan",
        waktu_proses: 60,
        dokumen_required: [
          "Dokumen RKL (Rencana Kelola Lingkungan)",
          "Dokumen RPL (Rencana Pantau Lingkungan)", 
          "Rencana organisasi pengelolaan",
          "Rencana pendanaan pengelolaan"
        ],
        biaya: 45000000,
        urutan: 3
      },
      {
        id: "evaluasi",
        nama_tahap: "Evaluasi Komisi AMDAL",
        deskripsi: "Evaluasi dan penilaian dokumen AMDAL oleh Komisi Penilai AMDAL",
        waktu_proses: 45,
        dokumen_required: [
          "Dokumen AMDAL lengkap",
          "Berita acara presentasi",
          "Tanggapan masyarakat",
          "Rekomendasi Komisi AMDAL"
        ],
        biaya: 5000000,
        urutan: 4
      }
    ],
    persyaratan_umum: [
      "Surat permohonan resmi dari pemrakarsa",
      "Akta pendirian perusahaan dan perubahannya",
      "NPWP perusahaan",
      "Izin lokasi/HGB/SHM",
      "Izin prinsip dari instansi teknis terkait",
      "Profil perusahaan dan rencana kegiatan",
      "Surat penunjukan konsultan AMDAL tersertifikasi",
      "Bukti pembayaran retribusi"
    ],
    konsultan_tersertifikasi: true,
    komisi_amdal: [
      "Ketua: Kepala Dinas Lingkungan Hidup",
      "Sekretaris: Kabid Pengendalian Pencemaran",
      "Anggota: Ahli Ekologi",
      "Anggota: Ahli Kesehatan Masyarakat",
      "Anggota: Ahli Sosial Ekonomi",
      "Anggota: Wakil Masyarakat Terdampak"
    ],
    waktu_total: 225, // Total dari semua tahapan
    biaya_total: 140000000, // Total biaya semua tahapan
    dasar_hukum: [
      "UU No. 32 Tahun 2009 tentang Perlindungan dan Pengelolaan Lingkungan Hidup",
      "PP No. 22 Tahun 2021 tentang Penyelenggaraan Perlindungan dan Pengelolaan Lingkungan Hidup",
      "Permen LHK No. 4 Tahun 2021 tentang Daftar Usaha/Kegiatan Wajib Amdal",
      "Permen LHK No. 5 Tahun 2021 tentang Tata Cara Penyusunan dan Penilaian Amdal",
      "Perda Kota Tasikmalaya tentang Retribusi Perizinan Lingkungan"
    ],
    status: 'aktif'
  });

  const [newKategori, setNewKategori] = useState("");
  const [newPersyaratan, setNewPersyaratan] = useState("");
  const [newDasarHukum, setNewDasarHukum] = useState("");
  const [newKomisi, setNewKomisi] = useState("");

  const [editingStage, setEditingStage] = useState<string | null>(null);
  const [newStage, setNewStage] = useState<AMDALStage>({
    id: "",
    nama_tahap: "",
    deskripsi: "",
    waktu_proses: 0,
    dokumen_required: [],
    biaya: 0,
    urutan: 0
  });

  // Functions for managing arrays
  const addKategori = () => {
    if (newKategori.trim()) {
      setAmdal(prev => ({
        ...prev,
        kategori_kegiatan: [...prev.kategori_kegiatan, newKategori.trim()]
      }));
      setNewKategori("");
    }
  };

  const removeKategori = (index: number) => {
    setAmdal(prev => ({
      ...prev,
      kategori_kegiatan: prev.kategori_kegiatan.filter((_, i) => i !== index)
    }));
  };

  const addPersyaratan = () => {
    if (newPersyaratan.trim()) {
      setAmdal(prev => ({
        ...prev,
        persyaratan_umum: [...prev.persyaratan_umum, newPersyaratan.trim()]
      }));
      setNewPersyaratan("");
    }
  };

  const removePersyaratan = (index: number) => {
    setAmdal(prev => ({
      ...prev,
      persyaratan_umum: prev.persyaratan_umum.filter((_, i) => i !== index)
    }));
  };

  const addDasarHukum = () => {
    if (newDasarHukum.trim()) {
      setAmdal(prev => ({
        ...prev,
        dasar_hukum: [...prev.dasar_hukum, newDasarHukum.trim()]
      }));
      setNewDasarHukum("");
    }
  };

  const removeDasarHukum = (index: number) => {
    setAmdal(prev => ({
      ...prev,
      dasar_hukum: prev.dasar_hukum.filter((_, i) => i !== index)
    }));
  };

  const addKomisi = () => {
    if (newKomisi.trim()) {
      setAmdal(prev => ({
        ...prev,
        komisi_amdal: [...prev.komisi_amdal, newKomisi.trim()]
      }));
      setNewKomisi("");
    }
  };

  const removeKomisi = (index: number) => {
    setAmdal(prev => ({
      ...prev,
      komisi_amdal: prev.komisi_amdal.filter((_, i) => i !== index)
    }));
  };

  const updateTotals = () => {
    const totalWaktu = amdal.tahapan_amdal.reduce((sum, stage) => sum + stage.waktu_proses, 0);
    const totalBiaya = amdal.tahapan_amdal.reduce((sum, stage) => sum + stage.biaya, 0);
    
    setAmdal(prev => ({
      ...prev,
      waktu_total: totalWaktu,
      biaya_total: totalBiaya
    }));
  };

  const handleSave = () => {
    updateTotals();
    console.log("Data AMDAL disimpan:", amdal);
    alert("Data AMDAL berhasil disimpan!");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg p-6">
        <div className="flex items-center gap-4">
          <div className="bg-white/20 p-3 rounded-full">
            <Scale className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">Admin Perizinan AMDAL</h1>
            <p className="text-green-100">Analisis Mengenai Dampak Lingkungan Hidup</p>
          </div>
          <div className="flex items-center gap-2">
            <TreePine className="w-5 h-5" />
            <span className="capitalize">{amdal.status}</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <div className="flex">
            {[
              { id: 'info', label: 'Informasi Umum', icon: Scale },
              { id: 'tahapan', label: 'Tahapan AMDAL', icon: FileCheck },
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
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Nama Perizinan
                  </label>
                  <input
                    type="text"
                    value={amdal.nama_perizinan}
                    onChange={(e) => setAmdal(prev => ({ ...prev, nama_perizinan: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={amdal.konsultan_tersertifikasi}
                      onChange={(e) => setAmdal(prev => ({ ...prev, konsultan_tersertifikasi: e.target.checked }))}
                      className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Wajib Konsultan Tersertifikasi</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Deskripsi
                </label>
                <textarea
                  value={amdal.deskripsi}
                  onChange={(e) => setAmdal(prev => ({ ...prev, deskripsi: e.target.value }))}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                />
              </div>

              {/* Kategori Kegiatan */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Kategori Kegiatan Wajib AMDAL
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
                  {amdal.kategori_kegiatan.map((kategori, index) => (
                    <div key={index} className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <TreePine className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0" />
                      <span className="flex-1 text-sm text-gray-900 dark:text-white">{kategori}</span>
                      <button
                        onClick={() => removeKategori(index)}
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
                    value={newKategori}
                    onChange={(e) => setNewKategori(e.target.value)}
                    placeholder="Tambah kategori kegiatan..."
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    onKeyPress={(e) => e.key === 'Enter' && addKategori()}
                  />
                  <button
                    onClick={addKategori}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Persyaratan Umum */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Persyaratan Umum
                </label>
                <div className="space-y-2 mb-3">
                  {amdal.persyaratan_umum.map((req, index) => (
                    <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0" />
                      <span className="flex-1 text-sm text-gray-900 dark:text-white">{req}</span>
                      <button
                        onClick={() => removePersyaratan(index)}
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
                    value={newPersyaratan}
                    onChange={(e) => setNewPersyaratan(e.target.value)}
                    placeholder="Tambah persyaratan..."
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    onKeyPress={(e) => e.key === 'Enter' && addPersyaratan()}
                  />
                  <button
                    onClick={addPersyaratan}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Komisi AMDAL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Komisi Penilai AMDAL
                </label>
                <div className="space-y-2 mb-3">
                  {amdal.komisi_amdal.map((anggota, index) => (
                    <div key={index} className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <span className="flex-1 text-sm text-gray-900 dark:text-white">{anggota}</span>
                      <button
                        onClick={() => removeKomisi(index)}
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
                    value={newKomisi}
                    onChange={(e) => setNewKomisi(e.target.value)}
                    placeholder="Tambah anggota komisi..."
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    onKeyPress={(e) => e.key === 'Enter' && addKomisi()}
                  />
                  <button
                    onClick={addKomisi}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
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
                  {amdal.dasar_hukum.map((hukum, index) => (
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
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    onKeyPress={(e) => e.key === 'Enter' && addDasarHukum()}
                  />
                  <button
                    onClick={addDasarHukum}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Tab: Tahapan AMDAL */}
          {activeTab === 'tahapan' && (
            <div className="space-y-6">
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-green-800 dark:text-green-300 mb-2">Rangkuman Tahapan</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{amdal.tahapan_amdal.length}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Total Tahapan</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{amdal.waktu_total}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Total Hari</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">Rp {amdal.biaya_total.toLocaleString()}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Total Biaya</div>
                  </div>
                </div>
              </div>

              {/* Tahapan List */}
              <div className="space-y-4">
                {amdal.tahapan_amdal
                  .sort((a, b) => a.urutan - b.urutan)
                  .map((stage) => (
                    <div key={stage.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                            {stage.urutan}
                          </div>
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{stage.nama_tahap}</h4>
                            <p className="text-gray-600 dark:text-gray-300 text-sm">{stage.deskripsi}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => setEditingStage(editingStage === stage.id ? null : stage.id)}
                          className="text-blue-600 hover:text-blue-700 transition-colors duration-200"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                          <div className="flex items-center gap-2 mb-1">
                            <Clock className="w-4 h-4 text-blue-600" />
                            <span className="text-sm font-medium text-gray-900 dark:text-white">Waktu Proses</span>
                          </div>
                          <div className="text-lg font-bold text-blue-600">{stage.waktu_proses} hari</div>
                        </div>
                        <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                          <div className="flex items-center gap-2 mb-1">
                            <Scale className="w-4 h-4 text-green-600" />
                            <span className="text-sm font-medium text-gray-900 dark:text-white">Biaya</span>
                          </div>
                          <div className="text-lg font-bold text-green-600">Rp {stage.biaya.toLocaleString()}</div>
                        </div>
                      </div>

                      <div>
                        <h5 className="font-medium text-gray-900 dark:text-white mb-2">Dokumen yang Diperlukan:</h5>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {stage.dokumen_required.map((doc, index) => (
                            <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-700 rounded">
                              <FileCheck className="w-4 h-4 text-gray-600 dark:text-gray-400 flex-shrink-0" />
                              <span className="text-sm text-gray-900 dark:text-white">{doc}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Tab: Preview */}
          {activeTab === 'preview' && (
            <div className="space-y-6">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{amdal.nama_perizinan}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{amdal.deskripsi}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-5 h-5 text-green-600" />
                      <span className="font-medium text-gray-900 dark:text-white">Total Waktu</span>
                    </div>
                    <div className="text-2xl font-bold text-green-600">{amdal.waktu_total} hari</div>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Scale className="w-5 h-5 text-blue-600" />
                      <span className="font-medium text-gray-900 dark:text-white">Total Biaya</span>
                    </div>
                    <div className="text-2xl font-bold text-blue-600">Rp {amdal.biaya_total.toLocaleString()}</div>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-5 h-5 text-purple-600" />
                      <span className="font-medium text-gray-900 dark:text-white">Status</span>
                    </div>
                    <div className="text-2xl font-bold text-purple-600 capitalize">{amdal.status}</div>
                  </div>
                </div>

                {/* Tahapan Timeline */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Alur Tahapan AMDAL</h4>
                  <div className="space-y-4">
                    {amdal.tahapan_amdal
                      .sort((a, b) => a.urutan - b.urutan)
                      .map((stage, index) => (
                        <div key={stage.id} className="flex items-start gap-4">
                          <div className="flex flex-col items-center">
                            <div className="bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                              {stage.urutan}
                            </div>
                            {index < amdal.tahapan_amdal.length - 1 && (
                              <div className="w-px h-12 bg-gray-300 dark:bg-gray-600 mt-2"></div>
                            )}
                          </div>
                          <div className="flex-1 pb-8">
                            <h5 className="font-semibold text-gray-900 dark:text-white">{stage.nama_tahap}</h5>
                            <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">{stage.deskripsi}</p>
                            <div className="flex items-center gap-4 text-sm">
                              <span className="flex items-center gap-1 text-blue-600">
                                <Clock className="w-4 h-4" />
                                {stage.waktu_proses} hari
                              </span>
                              <span className="flex items-center gap-1 text-green-600">
                                <Scale className="w-4 h-4" />
                                Rp {stage.biaya.toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Kategori Kegiatan */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Kategori Kegiatan Wajib AMDAL</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {amdal.kategori_kegiatan.map((kategori, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-white dark:bg-gray-800 rounded">
                        <TreePine className="w-4 h-4 text-green-600 flex-shrink-0" />
                        <span className="text-sm text-gray-900 dark:text-white">{kategori}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Persyaratan */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Persyaratan Umum</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {amdal.persyaratan_umum.map((req, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-white dark:bg-gray-800 rounded">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                        <span className="text-sm text-gray-900 dark:text-white">{req}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Komisi AMDAL */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Komisi Penilai AMDAL</h4>
                  <div className="space-y-2">
                    {amdal.komisi_amdal.map((anggota, index) => (
                      <div key={index} className="p-2 bg-white dark:bg-gray-800 rounded border-l-4 border-blue-600">
                        <span className="text-sm text-gray-900 dark:text-white">{anggota}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Dasar Hukum */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Dasar Hukum</h4>
                  <div className="space-y-2">
                    {amdal.dasar_hukum.map((hukum, index) => (
                      <div key={index} className="p-3 bg-white dark:bg-gray-800 rounded border-l-4 border-green-600">
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
