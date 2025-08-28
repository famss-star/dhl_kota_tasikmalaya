"use client";

import { useState } from "react";
import { 
  FileText, 
  Save, 
  Eye, 
  Plus, 
  Trash2, 
  Download,
  Upload,
  CheckCircle,
  AlertCircle,
  Clock,
  FileCheck
} from "lucide-react";

interface FormField {
  id: string;
  label: string;
  type: 'text' | 'textarea' | 'file' | 'select' | 'date' | 'number';
  required: boolean;
  placeholder?: string;
  options?: string[];
  validation?: string;
}

interface PerizinanTemplate {
  id: number;
  nama_perizinan: string;
  deskripsi: string;
  persyaratan: string[];
  form_fields: FormField[];
  dokumen_template: string[];
  waktu_proses: number;
  biaya: number;
  dasar_hukum: string[];
  status: 'aktif' | 'non-aktif';
}

export default function AdminPerizinanUmumPage() {
  const [activeTab, setActiveTab] = useState<'info' | 'persyaratan' | 'preview'>('info');
  const [perizinanData, setPerizinanData] = useState<PerizinanTemplate>({
    id: 1,
    nama_perizinan: "Perizinan Umum & Surat Keterangan Lingkungan",
    deskripsi: "Perizinan untuk kegiatan umum yang berkaitan dengan lingkungan hidup dan surat keterangan lingkungan untuk berbagai keperluan administratif.",
    persyaratan: [
      "Surat permohonan resmi",
      "KTP pemohon yang masih berlaku",
      "Surat kuasa (jika dikuasakan)",
      "Fotokopi NPWP",
      "Denah lokasi kegiatan",
      "Deskripsi rencana kegiatan",
      "Bukti pembayaran retribusi"
    ],
    form_fields: [
      {
        id: "nama_pemohon",
        label: "Nama Lengkap Pemohon",
        type: "text",
        required: true,
        placeholder: "Masukkan nama lengkap pemohon"
      },
      {
        id: "nik",
        label: "NIK",
        type: "text",
        required: true,
        placeholder: "Nomor Induk Kependudukan"
      },
      {
        id: "alamat",
        label: "Alamat Lengkap",
        type: "textarea",
        required: true,
        placeholder: "Alamat lengkap pemohon"
      },
      {
        id: "no_telepon",
        label: "Nomor Telepon",
        type: "text",
        required: true,
        placeholder: "Nomor telepon yang dapat dihubungi"
      },
      {
        id: "jenis_perizinan",
        label: "Jenis Perizinan",
        type: "select",
        required: true,
        options: [
          "Surat Keterangan Tidak Keberatan Lingkungan",
          "Izin Gangguan Lingkungan",
          "Rekomendasi Lingkungan",
          "Surat Pernyataan Pengelolaan Lingkungan"
        ]
      },
      {
        id: "lokasi_kegiatan",
        label: "Lokasi Kegiatan",
        type: "textarea",
        required: true,
        placeholder: "Alamat lokasi kegiatan yang akan dilakukan"
      },
      {
        id: "deskripsi_kegiatan",
        label: "Deskripsi Kegiatan",
        type: "textarea",
        required: true,
        placeholder: "Jelaskan detail kegiatan yang akan dilakukan"
      }
    ],
    dokumen_template: [
      "Template Surat Permohonan",
      "Format Deskripsi Kegiatan",
      "Contoh Denah Lokasi",
      "Template Surat Pernyataan"
    ],
    waktu_proses: 5,
    biaya: 50000,
    dasar_hukum: [
      "UU No. 32 Tahun 2009 tentang Perlindungan dan Pengelolaan Lingkungan Hidup",
      "Perda Kota Tasikmalaya No. 8 Tahun 2018 tentang Retribusi Perizinan Tertentu",
      "Perwali Tasikmalaya tentang Tata Cara Perizinan Lingkungan"
    ],
    status: 'aktif'
  });

  const [newPersyaratan, setNewPersyaratan] = useState("");
  const [newDasarHukum, setNewDasarHukum] = useState("");
  const [newFormField, setNewFormField] = useState<FormField>({
    id: "",
    label: "",
    type: "text",
    required: false,
    placeholder: ""
  });

  // Functions for managing arrays
  const addPersyaratan = () => {
    if (newPersyaratan.trim()) {
      setPerizinanData(prev => ({
        ...prev,
        persyaratan: [...prev.persyaratan, newPersyaratan.trim()]
      }));
      setNewPersyaratan("");
    }
  };

  const removePersyaratan = (index: number) => {
    setPerizinanData(prev => ({
      ...prev,
      persyaratan: prev.persyaratan.filter((_, i) => i !== index)
    }));
  };

  const addDasarHukum = () => {
    if (newDasarHukum.trim()) {
      setPerizinanData(prev => ({
        ...prev,
        dasar_hukum: [...prev.dasar_hukum, newDasarHukum.trim()]
      }));
      setNewDasarHukum("");
    }
  };

  const removeDasarHukum = (index: number) => {
    setPerizinanData(prev => ({
      ...prev,
      dasar_hukum: prev.dasar_hukum.filter((_, i) => i !== index)
    }));
  };

  const addFormField = () => {
    if (newFormField.label && newFormField.id) {
      setPerizinanData(prev => ({
        ...prev,
        form_fields: [...prev.form_fields, { ...newFormField }]
      }));
      setNewFormField({
        id: "",
        label: "",
        type: "text",
        required: false,
        placeholder: ""
      });
    }
  };

  const removeFormField = (id: string) => {
    setPerizinanData(prev => ({
      ...prev,
      form_fields: prev.form_fields.filter(field => field.id !== id)
    }));
  };

  const handleSave = () => {
    console.log("Data perizinan disimpan:", perizinanData);
    alert("Data perizinan berhasil disimpan!");
  };

  const renderFormField = (field: FormField, value: string = "") => {
    const baseClasses = "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white";
    
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
            {field.options?.map((option, idx) => (
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
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg p-6">
        <div className="flex items-center gap-4">
          <div className="bg-white/20 p-3 rounded-full">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">Admin Perizinan Umum</h1>
            <p className="text-blue-100">Kelola perizinan umum dan surat keterangan lingkungan</p>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            <span className="capitalize">{perizinanData.status}</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <div className="flex">
            {[
              { id: 'info', label: 'Informasi Umum', icon: FileText },
              { id: 'persyaratan', label: 'Persyaratan & Form', icon: FileCheck },
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
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Nama Perizinan
                  </label>
                  <input
                    type="text"
                    value={perizinanData.nama_perizinan}
                    onChange={(e) => setPerizinanData(prev => ({ ...prev, nama_perizinan: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Waktu Proses (hari)
                    </label>
                    <input
                      type="number"
                      value={perizinanData.waktu_proses}
                      onChange={(e) => setPerizinanData(prev => ({ ...prev, waktu_proses: parseInt(e.target.value) || 0 }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Biaya (Rp)
                    </label>
                    <input
                      type="number"
                      value={perizinanData.biaya}
                      onChange={(e) => setPerizinanData(prev => ({ ...prev, biaya: parseInt(e.target.value) || 0 }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Deskripsi
                </label>
                <textarea
                  value={perizinanData.deskripsi}
                  onChange={(e) => setPerizinanData(prev => ({ ...prev, deskripsi: e.target.value }))}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                />
              </div>

              {/* Dasar Hukum */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Dasar Hukum
                </label>
                <div className="space-y-2 mb-3">
                  {perizinanData.dasar_hukum.map((hukum, index) => (
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
                    placeholder="Tambah dasar hukum baru..."
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    onKeyPress={(e) => e.key === 'Enter' && addDasarHukum()}
                  />
                  <button
                    onClick={addDasarHukum}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Tab: Persyaratan & Form */}
          {activeTab === 'persyaratan' && (
            <div className="space-y-8">
              {/* Persyaratan */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Persyaratan Dokumen</h3>
                <div className="space-y-2 mb-4">
                  {perizinanData.persyaratan.map((req, index) => (
                    <div key={index} className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
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
                    placeholder="Tambah persyaratan baru..."
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    onKeyPress={(e) => e.key === 'Enter' && addPersyaratan()}
                  />
                  <button
                    onClick={addPersyaratan}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Form Fields */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Field Formulir</h3>
                <div className="space-y-3 mb-4">
                  {perizinanData.form_fields.map((field, index) => (
                    <div key={field.id} className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-900 dark:text-white">{field.label}</span>
                          {field.required && <span className="text-red-500 text-sm">*</span>}
                        </div>
                        <button
                          onClick={() => removeFormField(field.id)}
                          className="text-red-600 hover:text-red-700 transition-colors duration-200"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                        Tipe: <span className="font-medium">{field.type}</span>
                      </div>
                      {renderFormField(field)}
                    </div>
                  ))}
                </div>

                {/* Add New Field */}
                <div className="p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">Tambah Field Baru</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        ID Field
                      </label>
                      <input
                        type="text"
                        value={newFormField.id}
                        onChange={(e) => setNewFormField(prev => ({ ...prev, id: e.target.value }))}
                        placeholder="field_id"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Label
                      </label>
                      <input
                        type="text"
                        value={newFormField.label}
                        onChange={(e) => setNewFormField(prev => ({ ...prev, label: e.target.value }))}
                        placeholder="Label Field"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Tipe
                      </label>
                      <select
                        value={newFormField.type}
                        onChange={(e) => setNewFormField(prev => ({ ...prev, type: e.target.value as any }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      >
                        <option value="text">Text</option>
                        <option value="textarea">Textarea</option>
                        <option value="select">Select</option>
                        <option value="file">File</option>
                        <option value="date">Date</option>
                        <option value="number">Number</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Placeholder
                      </label>
                      <input
                        type="text"
                        value={newFormField.placeholder}
                        onChange={(e) => setNewFormField(prev => ({ ...prev, placeholder: e.target.value }))}
                        placeholder="Placeholder text"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mb-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={newFormField.required}
                        onChange={(e) => setNewFormField(prev => ({ ...prev, required: e.target.checked }))}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Wajib diisi</span>
                    </label>
                  </div>
                  <button
                    onClick={addFormField}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    <Plus className="w-4 h-4" />
                    Tambah Field
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Tab: Preview */}
          {activeTab === 'preview' && (
            <div className="space-y-6">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{perizinanData.nama_perizinan}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{perizinanData.deskripsi}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-5 h-5 text-blue-600" />
                      <span className="font-medium text-gray-900 dark:text-white">Waktu Proses</span>
                    </div>
                    <div className="text-2xl font-bold text-blue-600">{perizinanData.waktu_proses} hari</div>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="w-5 h-5 text-green-600" />
                      <span className="font-medium text-gray-900 dark:text-white">Biaya</span>
                    </div>
                    <div className="text-2xl font-bold text-green-600">Rp {perizinanData.biaya.toLocaleString()}</div>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-5 h-5 text-purple-600" />
                      <span className="font-medium text-gray-900 dark:text-white">Status</span>
                    </div>
                    <div className="text-2xl font-bold text-purple-600 capitalize">{perizinanData.status}</div>
                  </div>
                </div>

                {/* Persyaratan */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Persyaratan Dokumen</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {perizinanData.persyaratan.map((req, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-white dark:bg-gray-800 rounded">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                        <span className="text-sm text-gray-900 dark:text-white">{req}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Form Preview */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Form Permohonan</h4>
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-600">
                    <div className="space-y-4">
                      {perizinanData.form_fields.map((field) => (
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

                {/* Dasar Hukum */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Dasar Hukum</h4>
                  <div className="space-y-2">
                    {perizinanData.dasar_hukum.map((hukum, index) => (
                      <div key={index} className="p-3 bg-white dark:bg-gray-800 rounded border-l-4 border-blue-600">
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
