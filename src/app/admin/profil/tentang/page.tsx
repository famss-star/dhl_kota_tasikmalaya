"use client";

import { useState } from "react";
import { 
  Save, 
  Info, 
  Target, 
  Users, 
  Building2, 
  Plus, 
  Trash2, 
  Edit3,
  Image,
  Eye,
  EyeOff
} from "lucide-react";

export default function AdminTentangPage() {
  const [activeTab, setActiveTab] = useState("tentang");
  const [isLoading, setIsLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  // State untuk Tentang DLH
  const [tentangData, setTentangData] = useState({
    deskripsi: "Dinas Lingkungan Hidup Kota Tasikmalaya sebagai unit kerja teknis lingkungan yang menjalankan tugas, fungsi, kewenangan serta tanggung jawab koordinasi di bidang lingkungan hidup diperlukan kehadirannya untuk menunjang keberhasilan pembangunan daerah.",
    deskripsi_lanjutan: "Dengan deskripsi tugas yang demikian penting, maka diperlukan dukungan aparatur yang memadai baik dari segi kualitas maupun kuantitas untuk mendukung pencapaian sasaran dan prioritas pembangunan daerah. DLH Kota Tasikmalaya memiliki kantor yang berlokasi di Jl. Noenoeng Tisnasapoetra No.5 Kota Tasikmalaya.",
    alamat: "Jl. Noenoeng Tisnasapoetra No.5 Kota Tasikmalaya",
    tugas_pokok: "",
    fungsi: "",
    logo_url: "/logo-dlh.png"
  });

  // State untuk Visi & Misi
  const [visiMisiData, setVisiMisiData] = useState({
    visi: "TASIKMALAYA SEBAGAI KOTA INDUSTRI, JASA DAN PERDAGANGAN YANG RELIGIUS, INOVATIF, MAJU DAN BERKELANJUTAN",
    misi: [
      "Mewujudkan Sumber Daya Manusia Yang Berkualitas Dan Kehidupan Sosial Masyarakat Yang Religius Dan Berbudaya",
      "Mewujudkan Ekonomi Daerah Yang Berkeadilan, Kuat Dan Berdaya Saing Berbasis Industri, Jasa Dan Perdagangan", 
      "Mewujudkan Tata Kelola Pemerintahan Yang Baik Dan Bersih",
      "Mewujudkan Infrastruktur Daerah Yang Berkualitas Dan Merata",
      "Mewujudkan Pembangunan Yang Berkelanjutan"
    ]
  });

  const tabs = [
    { id: "tentang", label: "Tentang DLH", icon: Info },
    { id: "visi-misi", label: "Visi & Misi", icon: Target }
  ];

  const handleSave = async (section: string) => {
    setIsLoading(true);
    try {
      // Implementasi save ke database
      console.log(`Saving ${section} data...`);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulasi
      alert(`Data ${section} berhasil disimpan!`);
    } catch (error) {
      alert(`Gagal menyimpan data ${section}`);
    } finally {
      setIsLoading(false);
    }
  };

  const addMisi = () => {
    setVisiMisiData(prev => ({
      ...prev,
      misi: [...prev.misi, ""]
    }));
  };

  const removeMisi = (index: number) => {
    setVisiMisiData(prev => ({
      ...prev,
      misi: prev.misi.filter((_, i) => i !== index)
    }));
  };

  const updateMisi = (index: number, value: string) => {
    setVisiMisiData(prev => ({
      ...prev,
      misi: prev.misi.map((item, i) => i === index ? value : item)
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
          <Info className="w-8 h-8 text-green-600" />
          Manajemen Profil & Tentang
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Kelola informasi tentang DLH, visi misi, dan struktur organisasi
        </p>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center px-6 py-4">
            <nav className="flex space-x-8">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 transition-colors duration-200 ${
                      activeTab === tab.id
                        ? "border-green-500 text-green-600 dark:text-green-400"
                        : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
            
            <button
              onClick={() => setShowPreview(!showPreview)}
              className={`flex items-center gap-2 px-3 py-1 rounded-md text-sm transition-colors duration-200 ${
                showPreview 
                  ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                  : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
              }`}
            >
              {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              {showPreview ? "Sembunyikan Preview" : "Tampilkan Preview"}
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Tab: Tentang DLH */}
          {activeTab === "tentang" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Deskripsi Utama
                    </label>
                    <textarea
                      value={tentangData.deskripsi}
                      onChange={(e) => setTentangData(prev => ({ ...prev, deskripsi: e.target.value }))}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="Deskripsi utama tentang DLH Kota Tasikmalaya..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Deskripsi Lanjutan
                    </label>
                    <textarea
                      value={tentangData.deskripsi_lanjutan}
                      onChange={(e) => setTentangData(prev => ({ ...prev, deskripsi_lanjutan: e.target.value }))}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="Deskripsi lanjutan dan informasi tambahan..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Alamat Kantor
                    </label>
                    <input
                      type="text"
                      value={tentangData.alamat}
                      onChange={(e) => setTentangData(prev => ({ ...prev, alamat: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="Alamat lengkap kantor DLH..."
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Tugas Pokok
                    </label>
                    <textarea
                      value={tentangData.tugas_pokok}
                      onChange={(e) => setTentangData(prev => ({ ...prev, tugas_pokok: e.target.value }))}
                      rows={5}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="Tugas pokok DLH Kota Tasikmalaya..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Fungsi
                    </label>
                    <textarea
                      value={tentangData.fungsi}
                      onChange={(e) => setTentangData(prev => ({ ...prev, fungsi: e.target.value }))}
                      rows={5}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="Fungsi dan kewenangan DLH..."
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Logo URL
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={tentangData.logo_url}
                    onChange={(e) => setTentangData(prev => ({ ...prev, logo_url: e.target.value }))}
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="https://example.com/logo.png"
                  />
                  <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200">
                    <Image className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => handleSave("tentang")}
                  disabled={isLoading}
                  className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  <Save className="w-4 h-4" />
                  {isLoading ? "Menyimpan..." : "Simpan Tentang"}
                </button>
              </div>

              {/* Preview Section */}
              {showPreview && (
                <div className="mt-8 border-t border-gray-200 dark:border-gray-600 pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Eye className="w-5 h-5 text-green-600" />
                    Preview Halaman Tentang
                  </h3>
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-600">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                      <h4 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 border-b-4 border-green-500 pb-2">
                        Tentang Kami
                      </h4>
                      {tentangData.deskripsi && (
                        <p className="text-gray-700 dark:text-gray-300 mb-4 indent-8">
                          <span className="font-bold">Dinas Lingkungan Hidup Kota Tasikmalaya</span> {tentangData.deskripsi}
                        </p>
                      )}
                      {tentangData.deskripsi_lanjutan && (
                        <p className="text-gray-700 dark:text-gray-300 mb-4 indent-8">
                          {tentangData.deskripsi_lanjutan}
                        </p>
                      )}
                      {tentangData.alamat && (
                        <p className="text-gray-700 dark:text-gray-300 text-sm bg-gray-100 dark:bg-gray-700 p-3 rounded-md">
                          <strong>Alamat:</strong> {tentangData.alamat}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Tab: Visi & Misi */}
          {activeTab === "visi-misi" && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Visi
                </label>
                <textarea
                  value={visiMisiData.visi}
                  onChange={(e) => setVisiMisiData(prev => ({ ...prev, visi: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="Visi DLH Kota Tasikmalaya..."
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Misi
                  </label>
                  <button
                    onClick={addMisi}
                    className="flex items-center gap-2 px-3 py-1 text-sm bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200"
                  >
                    <Plus className="w-4 h-4" />
                    Tambah Misi
                  </button>
                </div>

                <div className="space-y-3">
                  {visiMisiData.misi.map((misi, index) => (
                    <div key={index} className="flex gap-2">
                      <div className="flex-shrink-0 w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-sm font-medium text-green-600 dark:text-green-400 mt-2">
                        {index + 1}
                      </div>
                      <textarea
                        value={misi}
                        onChange={(e) => updateMisi(index, e.target.value)}
                        rows={2}
                        className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        placeholder={`Misi ${index + 1}...`}
                      />
                      {visiMisiData.misi.length > 1 && (
                        <button
                          onClick={() => removeMisi(index)}
                          className="flex-shrink-0 w-8 h-8 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg flex items-center justify-center mt-2 transition-colors duration-200"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => handleSave("visi-misi")}
                  disabled={isLoading}
                  className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  <Save className="w-4 h-4" />
                  {isLoading ? "Menyimpan..." : "Simpan Visi & Misi"}
                </button>
              </div>

              {/* Preview Visi Misi */}
              {showPreview && (
                <div className="mt-8 border-t border-gray-200 dark:border-gray-600 pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Eye className="w-5 h-5 text-green-600" />
                    Preview Visi & Misi
                  </h3>
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-600">
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Visi Preview */}
                      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                        <h4 className="text-2xl font-bold text-green-600 dark:text-green-400 mb-4 text-center">
                          VISI
                        </h4>
                        <div className="text-center">
                          <p className="text-lg text-gray-700 dark:text-gray-300 italic font-medium leading-relaxed">
                            &quot;{visiMisiData.visi}&quot;
                          </p>
                        </div>
                      </div>

                      {/* Misi Preview */}
                      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                        <h4 className="text-2xl font-bold text-blue-600 dark:text-sky-600 mb-4 text-center">
                          MISI
                        </h4>
                        <ul className="space-y-3">
                          {visiMisiData.misi.map((misi, index) => (
                            <li key={index} className="flex items-start">
                              <span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full min-w-[2rem] min-h-[2rem] flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                                {index + 1}
                              </span>
                              <span className="text-gray-700 dark:text-gray-300 text-sm">
                                {misi}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
