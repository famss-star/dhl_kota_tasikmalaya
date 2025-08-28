"use client";

import { useState } from "react";
import { 
  Droplets, 
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
  Factory,
  Beaker,
  Calendar
} from "lucide-react";

interface LimbahParameter {
  id: string;
  nama_parameter: string;
  satuan: string;
  baku_mutu: number;
  metode_uji: string;
  frekuensi_pantau: string;
}

interface IPLCTemplate {
  id: number;
  nama_perizinan: string;
  deskripsi: string;
  jenis_limbah: string[];
  parameter_wajib: LimbahParameter[];
  persyaratan: string[];
  masa_berlaku: number; // dalam tahun
  kewajiban_pemantauan: string[];
  sanksi_pelanggaran: string[];
  waktu_proses: number;
  biaya: number;
  dasar_hukum: string[];
  status: 'aktif' | 'non-aktif';
}

export default function AdminPerizinanIPLCPage() {
  const [activeTab, setActiveTab] = useState<'info' | 'parameter' | 'preview'>('info');
  const [iplc, setIplc] = useState<IPLCTemplate>({
    id: 3,
    nama_perizinan: "Izin Pembuangan Limbah Cair (IPLC)",
    deskripsi: "Izin untuk membuang limbah cair ke media lingkungan hidup dari usaha dan/atau kegiatan yang menghasilkan limbah cair.",
    jenis_limbah: [
      "Limbah domestik dari perkantoran",
      "Limbah industri makanan dan minuman",
      "Limbah industri tekstil",
      "Limbah industri farmasi",
      "Limbah industri kimia",
      "Limbah rumah sakit",
      "Limbah hotel dan restoran",
      "Limbah pasar tradisional"
    ],
    parameter_wajib: [
      {
        id: "ph",
        nama_parameter: "pH",
        satuan: "-",
        baku_mutu: 6.5,
        metode_uji: "SNI 06-6989.11-2004",
        frekuensi_pantau: "Setiap hari"
      },
      {
        id: "tss",
        nama_parameter: "Total Suspended Solid (TSS)",
        satuan: "mg/L",
        baku_mutu: 30,
        metode_uji: "SNI 06-6989.3-2004",
        frekuensi_pantau: "Setiap hari"
      },
      {
        id: "bod",
        nama_parameter: "Biochemical Oxygen Demand (BOD)",
        satuan: "mg/L",
        baku_mutu: 30,
        metode_uji: "SNI 6989.72:2009",
        frekuensi_pantau: "Setiap minggu"
      },
      {
        id: "cod",
        nama_parameter: "Chemical Oxygen Demand (COD)",
        satuan: "mg/L",
        baku_mutu: 100,
        metode_uji: "SNI 6989.73:2009",
        frekuensi_pantau: "Setiap minggu"
      },
      {
        id: "minyak_lemak",
        nama_parameter: "Minyak dan Lemak",
        satuan: "mg/L",
        baku_mutu: 5,
        metode_uji: "SNI 06-6989.10-2004",
        frekuensi_pantau: "Setiap bulan"
      },
      {
        id: "ammonia",
        nama_parameter: "Ammonia (NH3-N)",
        satuan: "mg/L",
        baku_mutu: 10,
        metode_uji: "SNI 06-6989.30-2005",
        frekuensi_pantau: "Setiap bulan"
      }
    ],
    persyaratan: [
      "Surat permohonan resmi",
      "Akta pendirian perusahaan",
      "NPWP perusahaan",
      "Izin usaha/kegiatan",
      "Dokumen AMDAL/UKL-UPL",
      "Rencana pengelolaan limbah cair",
      "Desain instalasi pengolahan limbah",
      "Hasil uji laboratorium limbah cair",
      "Perjanjian kerjasama dengan laboratorium terakreditasi",
      "Bukti pembayaran retribusi"
    ],
    masa_berlaku: 5,
    kewajiban_pemantauan: [
      "Melakukan pemantauan kualitas limbah cair secara berkala",
      "Menyampaikan laporan pemantauan setiap 3 bulan",
      "Memelihara instalasi pengolahan limbah dengan baik",
      "Melakukan kalibrasi alat monitoring secara rutin",
      "Menyediakan akses untuk pengawasan dan pemeriksaan",
      "Melaporkan keadaan darurat yang berpotensi mencemari lingkungan"
    ],
    sanksi_pelanggaran: [
      "Teguran tertulis untuk pelanggaran ringan",
      "Denda administratif sesuai ketentuan perda",
      "Penghentian sementara kegiatan pembuangan",
      "Pencabutan izin untuk pelanggaran berat",
      "Tuntutan ganti rugi kerusakan lingkungan"
    ],
    waktu_proses: 14,
    biaya: 2500000,
    dasar_hukum: [
      "UU No. 32 Tahun 2009 tentang Perlindungan dan Pengelolaan Lingkungan Hidup",
      "PP No. 22 Tahun 2021 tentang Penyelenggaraan Perlindungan dan Pengelolaan Lingkungan Hidup",
      "Permen LHK No. 68 Tahun 2016 tentang Baku Mutu Air Limbah Domestik",
      "Perda Kota Tasikmalaya tentang Pengelolaan Limbah Cair",
      "Perwali Tasikmalaya tentang Retribusi Perizinan Lingkungan"
    ],
    status: 'aktif'
  });

  const [newJenisLimbah, setNewJenisLimbah] = useState("");
  const [newPersyaratan, setNewPersyaratan] = useState("");
  const [newKewajiban, setNewKewajiban] = useState("");
  const [newSanksi, setNewSanksi] = useState("");
  const [newDasarHukum, setNewDasarHukum] = useState("");

  const [newParameter, setNewParameter] = useState<LimbahParameter>({
    id: "",
    nama_parameter: "",
    satuan: "",
    baku_mutu: 0,
    metode_uji: "",
    frekuensi_pantau: ""
  });

  // Functions for managing arrays
  const addJenisLimbah = () => {
    if (newJenisLimbah.trim()) {
      setIplc(prev => ({
        ...prev,
        jenis_limbah: [...prev.jenis_limbah, newJenisLimbah.trim()]
      }));
      setNewJenisLimbah("");
    }
  };

  const removeJenisLimbah = (index: number) => {
    setIplc(prev => ({
      ...prev,
      jenis_limbah: prev.jenis_limbah.filter((_, i) => i !== index)
    }));
  };

  const addParameter = () => {
    if (newParameter.nama_parameter && newParameter.id) {
      setIplc(prev => ({
        ...prev,
        parameter_wajib: [...prev.parameter_wajib, { ...newParameter }]
      }));
      setNewParameter({
        id: "",
        nama_parameter: "",
        satuan: "",
        baku_mutu: 0,
        metode_uji: "",
        frekuensi_pantau: ""
      });
    }
  };

  const removeParameter = (id: string) => {
    setIplc(prev => ({
      ...prev,
      parameter_wajib: prev.parameter_wajib.filter(param => param.id !== id)
    }));
  };

  const addPersyaratan = () => {
    if (newPersyaratan.trim()) {
      setIplc(prev => ({
        ...prev,
        persyaratan: [...prev.persyaratan, newPersyaratan.trim()]
      }));
      setNewPersyaratan("");
    }
  };

  const removePersyaratan = (index: number) => {
    setIplc(prev => ({
      ...prev,
      persyaratan: prev.persyaratan.filter((_, i) => i !== index)
    }));
  };

  const addKewajiban = () => {
    if (newKewajiban.trim()) {
      setIplc(prev => ({
        ...prev,
        kewajiban_pemantauan: [...prev.kewajiban_pemantauan, newKewajiban.trim()]
      }));
      setNewKewajiban("");
    }
  };

  const removeKewajiban = (index: number) => {
    setIplc(prev => ({
      ...prev,
      kewajiban_pemantauan: prev.kewajiban_pemantauan.filter((_, i) => i !== index)
    }));
  };

  const addSanksi = () => {
    if (newSanksi.trim()) {
      setIplc(prev => ({
        ...prev,
        sanksi_pelanggaran: [...prev.sanksi_pelanggaran, newSanksi.trim()]
      }));
      setNewSanksi("");
    }
  };

  const removeSanksi = (index: number) => {
    setIplc(prev => ({
      ...prev,
      sanksi_pelanggaran: prev.sanksi_pelanggaran.filter((_, i) => i !== index)
    }));
  };

  const addDasarHukum = () => {
    if (newDasarHukum.trim()) {
      setIplc(prev => ({
        ...prev,
        dasar_hukum: [...prev.dasar_hukum, newDasarHukum.trim()]
      }));
      setNewDasarHukum("");
    }
  };

  const removeDasarHukum = (index: number) => {
    setIplc(prev => ({
      ...prev,
      dasar_hukum: prev.dasar_hukum.filter((_, i) => i !== index)
    }));
  };

  const handleSave = () => {
    console.log("Data IPLC disimpan:", iplc);
    alert("Data IPLC berhasil disimpan!");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-lg p-6">
        <div className="flex items-center gap-4">
          <div className="bg-white/20 p-3 rounded-full">
            <Droplets className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">Admin Perizinan IPLC</h1>
            <p className="text-cyan-100">Izin Pembuangan Limbah Cair</p>
          </div>
          <div className="flex items-center gap-2">
            <Beaker className="w-5 h-5" />
            <span className="capitalize">{iplc.status}</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <div className="flex">
            {[
              { id: 'info', label: 'Informasi Umum', icon: Droplets },
              { id: 'parameter', label: 'Parameter & Baku Mutu', icon: Beaker },
              { id: 'preview', label: 'Preview', icon: Eye }
            ].map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-6 py-4 border-b-2 font-medium text-sm transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'border-cyan-500 text-cyan-600 dark:text-cyan-400'
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
                    value={iplc.nama_perizinan}
                    onChange={(e) => setIplc(prev => ({ ...prev, nama_perizinan: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Waktu Proses (hari)
                    </label>
                    <input
                      type="number"
                      value={iplc.waktu_proses}
                      onChange={(e) => setIplc(prev => ({ ...prev, waktu_proses: parseInt(e.target.value) || 0 }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Masa Berlaku (tahun)
                    </label>
                    <input
                      type="number"
                      value={iplc.masa_berlaku}
                      onChange={(e) => setIplc(prev => ({ ...prev, masa_berlaku: parseInt(e.target.value) || 0 }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Biaya (Rp)
                  </label>
                  <input
                    type="number"
                    value={iplc.biaya}
                    onChange={(e) => setIplc(prev => ({ ...prev, biaya: parseInt(e.target.value) || 0 }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Status
                  </label>
                  <select
                    value={iplc.status}
                    onChange={(e) => setIplc(prev => ({ ...prev, status: e.target.value as 'aktif' | 'non-aktif' }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="aktif">Aktif</option>
                    <option value="non-aktif">Non-Aktif</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Deskripsi
                </label>
                <textarea
                  value={iplc.deskripsi}
                  onChange={(e) => setIplc(prev => ({ ...prev, deskripsi: e.target.value }))}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                />
              </div>

              {/* Jenis Limbah */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Jenis Limbah yang Diatur
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
                  {iplc.jenis_limbah.map((jenis, index) => (
                    <div key={index} className="flex items-center gap-2 p-3 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg">
                      <Factory className="w-4 h-4 text-cyan-600 dark:text-cyan-400 flex-shrink-0" />
                      <span className="flex-1 text-sm text-gray-900 dark:text-white">{jenis}</span>
                      <button
                        onClick={() => removeJenisLimbah(index)}
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
                    value={newJenisLimbah}
                    onChange={(e) => setNewJenisLimbah(e.target.value)}
                    placeholder="Tambah jenis limbah..."
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    onKeyPress={(e) => e.key === 'Enter' && addJenisLimbah()}
                  />
                  <button
                    onClick={addJenisLimbah}
                    className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors duration-200"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Persyaratan */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Persyaratan
                </label>
                <div className="space-y-2 mb-3">
                  {iplc.persyaratan.map((req, index) => (
                    <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <CheckCircle className="w-4 h-4 text-cyan-600 dark:text-cyan-400 flex-shrink-0" />
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
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    onKeyPress={(e) => e.key === 'Enter' && addPersyaratan()}
                  />
                  <button
                    onClick={addPersyaratan}
                    className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors duration-200"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Kewajiban Pemantauan */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Kewajiban Pemantauan
                </label>
                <div className="space-y-2 mb-3">
                  {iplc.kewajiban_pemantauan.map((kewajiban, index) => (
                    <div key={index} className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <span className="flex-1 text-sm text-gray-900 dark:text-white">{kewajiban}</span>
                      <button
                        onClick={() => removeKewajiban(index)}
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
                    value={newKewajiban}
                    onChange={(e) => setNewKewajiban(e.target.value)}
                    placeholder="Tambah kewajiban..."
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    onKeyPress={(e) => e.key === 'Enter' && addKewajiban()}
                  />
                  <button
                    onClick={addKewajiban}
                    className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors duration-200"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Sanksi Pelanggaran */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Sanksi Pelanggaran
                </label>
                <div className="space-y-2 mb-3">
                  {iplc.sanksi_pelanggaran.map((sanksi, index) => (
                    <div key={index} className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                      <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 flex-shrink-0" />
                      <span className="flex-1 text-sm text-gray-900 dark:text-white">{sanksi}</span>
                      <button
                        onClick={() => removeSanksi(index)}
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
                    value={newSanksi}
                    onChange={(e) => setNewSanksi(e.target.value)}
                    placeholder="Tambah sanksi..."
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    onKeyPress={(e) => e.key === 'Enter' && addSanksi()}
                  />
                  <button
                    onClick={addSanksi}
                    className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors duration-200"
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
                  {iplc.dasar_hukum.map((hukum, index) => (
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
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    onKeyPress={(e) => e.key === 'Enter' && addDasarHukum()}
                  />
                  <button
                    onClick={addDasarHukum}
                    className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors duration-200"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Tab: Parameter & Baku Mutu */}
          {activeTab === 'parameter' && (
            <div className="space-y-6">
              <div className="bg-cyan-50 dark:bg-cyan-900/20 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-cyan-800 dark:text-cyan-300 mb-2">Parameter Wajib IPLC</h3>
                <p className="text-sm text-cyan-700 dark:text-cyan-400">
                  Parameter yang wajib dipantau dan dianalisis untuk limbah cair yang dibuang ke lingkungan
                </p>
              </div>

              {/* Parameter Table */}
              <div className="overflow-x-auto">
                <table className="w-full border border-gray-200 dark:border-gray-600 rounded-lg">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Parameter</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Satuan</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Baku Mutu</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Metode Uji</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Frekuensi</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                    {iplc.parameter_wajib.map((param, index) => (
                      <tr key={param.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="px-4 py-3 text-sm text-gray-900 dark:text-white font-medium">{param.nama_parameter}</td>
                        <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{param.satuan}</td>
                        <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                          <span className="font-mono bg-yellow-100 dark:bg-yellow-900/20 px-2 py-1 rounded text-yellow-800 dark:text-yellow-300">
                            {param.baku_mutu} {param.satuan}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{param.metode_uji}</td>
                        <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{param.frekuensi_pantau}</td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => removeParameter(param.id)}
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

              {/* Add New Parameter */}
              <div className="p-4 border-2 border-dashed border-cyan-300 dark:border-cyan-600 rounded-lg">
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Tambah Parameter Baru</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      ID Parameter
                    </label>
                    <input
                      type="text"
                      value={newParameter.id}
                      onChange={(e) => setNewParameter(prev => ({ ...prev, id: e.target.value }))}
                      placeholder="parameter_id"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Nama Parameter
                    </label>
                    <input
                      type="text"
                      value={newParameter.nama_parameter}
                      onChange={(e) => setNewParameter(prev => ({ ...prev, nama_parameter: e.target.value }))}
                      placeholder="Nama Parameter"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Satuan
                    </label>
                    <input
                      type="text"
                      value={newParameter.satuan}
                      onChange={(e) => setNewParameter(prev => ({ ...prev, satuan: e.target.value }))}
                      placeholder="mg/L, %, dll"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Baku Mutu
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={newParameter.baku_mutu}
                      onChange={(e) => setNewParameter(prev => ({ ...prev, baku_mutu: parseFloat(e.target.value) || 0 }))}
                      placeholder="0"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Metode Uji
                    </label>
                    <input
                      type="text"
                      value={newParameter.metode_uji}
                      onChange={(e) => setNewParameter(prev => ({ ...prev, metode_uji: e.target.value }))}
                      placeholder="SNI / Metode Standar"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Frekuensi Pantau
                    </label>
                    <select
                      value={newParameter.frekuensi_pantau}
                      onChange={(e) => setNewParameter(prev => ({ ...prev, frekuensi_pantau: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="">Pilih Frekuensi</option>
                      <option value="Setiap hari">Setiap hari</option>
                      <option value="Setiap minggu">Setiap minggu</option>
                      <option value="Setiap bulan">Setiap bulan</option>
                      <option value="Setiap 3 bulan">Setiap 3 bulan</option>
                      <option value="Setiap 6 bulan">Setiap 6 bulan</option>
                    </select>
                  </div>
                </div>
                <button
                  onClick={addParameter}
                  className="flex items-center gap-2 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors duration-200"
                >
                  <Plus className="w-4 h-4" />
                  Tambah Parameter
                </button>
              </div>
            </div>
          )}

          {/* Tab: Preview */}
          {activeTab === 'preview' && (
            <div className="space-y-6">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{iplc.nama_perizinan}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{iplc.deskripsi}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-5 h-5 text-cyan-600" />
                      <span className="font-medium text-gray-900 dark:text-white">Waktu Proses</span>
                    </div>
                    <div className="text-2xl font-bold text-cyan-600">{iplc.waktu_proses} hari</div>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Droplets className="w-5 h-5 text-blue-600" />
                      <span className="font-medium text-gray-900 dark:text-white">Biaya</span>
                    </div>
                    <div className="text-2xl font-bold text-blue-600">Rp {iplc.biaya.toLocaleString()}</div>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-5 h-5 text-green-600" />
                      <span className="font-medium text-gray-900 dark:text-white">Masa Berlaku</span>
                    </div>
                    <div className="text-2xl font-bold text-green-600">{iplc.masa_berlaku} tahun</div>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-5 h-5 text-purple-600" />
                      <span className="font-medium text-gray-900 dark:text-white">Status</span>
                    </div>
                    <div className="text-2xl font-bold text-purple-600 capitalize">{iplc.status}</div>
                  </div>
                </div>

                {/* Jenis Limbah */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Jenis Limbah yang Diatur</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {iplc.jenis_limbah.map((jenis, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-white dark:bg-gray-800 rounded">
                        <Factory className="w-4 h-4 text-cyan-600 flex-shrink-0" />
                        <span className="text-sm text-gray-900 dark:text-white">{jenis}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Parameter Table */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Parameter dan Baku Mutu</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full border border-gray-200 dark:border-gray-600 rounded-lg">
                      <thead className="bg-gray-100 dark:bg-gray-600">
                        <tr>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Parameter</th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Baku Mutu</th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Frekuensi</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                        {iplc.parameter_wajib.map((param) => (
                          <tr key={param.id}>
                            <td className="px-4 py-2 text-sm text-gray-900 dark:text-white">{param.nama_parameter}</td>
                            <td className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300">
                              <span className="font-mono bg-yellow-100 dark:bg-yellow-900/20 px-2 py-1 rounded text-yellow-800 dark:text-yellow-300">
                                {param.baku_mutu} {param.satuan}
                              </span>
                            </td>
                            <td className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300">{param.frekuensi_pantau}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Persyaratan */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Persyaratan</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {iplc.persyaratan.map((req, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-white dark:bg-gray-800 rounded">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                        <span className="text-sm text-gray-900 dark:text-white">{req}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Kewajiban */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Kewajiban Pemantauan</h4>
                  <div className="space-y-2">
                    {iplc.kewajiban_pemantauan.map((kewajiban, index) => (
                      <div key={index} className="p-2 bg-white dark:bg-gray-800 rounded border-l-4 border-blue-600">
                        <span className="text-sm text-gray-900 dark:text-white">{kewajiban}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sanksi */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Sanksi Pelanggaran</h4>
                  <div className="space-y-2">
                    {iplc.sanksi_pelanggaran.map((sanksi, index) => (
                      <div key={index} className="p-2 bg-white dark:bg-gray-800 rounded border-l-4 border-red-600">
                        <span className="text-sm text-gray-900 dark:text-white">{sanksi}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Dasar Hukum */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Dasar Hukum</h4>
                  <div className="space-y-2">
                    {iplc.dasar_hukum.map((hukum, index) => (
                      <div key={index} className="p-3 bg-white dark:bg-gray-800 rounded border-l-4 border-cyan-600">
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
          <button className="flex items-center gap-2 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors duration-200">
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
            className="flex items-center gap-2 px-6 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors duration-200"
          >
            <Save className="w-4 h-4" />
            Simpan Perubahan
          </button>
        </div>
      </div>
    </div>
  );
}
