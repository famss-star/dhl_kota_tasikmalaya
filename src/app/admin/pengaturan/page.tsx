"use client";

import { useState, useEffect } from "react";
import { Settings, Save, Upload, RefreshCw, Info, Eye, EyeOff, User } from "lucide-react";
import Image from "next/image";
import { useLeaderData } from "@/hooks/useLeaderData";

interface LogoSettings {
  logoHeader: string;
  logoFooter: string;
  siteName: string;
  siteDescription: string;
}


const initialProfil = {
  namaInstansi: "DLH Kota Tasikmalaya",
  alamat: "Jl. Contoh No. 123, Tasikmalaya",
};
const initialStruktur = {
  struktur: "Struktur organisasi DLH Kota Tasikmalaya ...",
};
const initialTupoksi = {
  tupoksi: "Tugas pokok dan fungsi DLH Kota Tasikmalaya ...",
};
const initialVisiMisi = {
  visi: "Menjadi instansi lingkungan hidup terbaik ...",
  misi: "1. Melayani masyarakat\n2. Menjaga lingkungan ...",
};
const initialKontak = {
  email: "info@dlhtasik.go.id",
  telepon: "(0265) 123456",
};

export default function AdminPengaturan() {
  const [profil, setProfil] = useState(initialProfil);
  const [struktur, setStruktur] = useState(initialStruktur);
  const [tupoksi, setTupoksi] = useState(initialTupoksi);
  const [visiMisi, setVisiMisi] = useState(initialVisiMisi);
  const [kontak, setKontak] = useState(initialKontak);
  
  // Leader management
  const { leader, loading: leaderLoading, updateLeader } = useLeaderData();
  const [leaderForm, setLeaderForm] = useState({
    name: '',
    position: '',
    greeting: '',
    photo: ''
  });
  const [leaderUploading, setLeaderUploading] = useState(false);
  const [leaderPreview, setLeaderPreview] = useState(false);
  
  // Logo settings
  const [logoSettings, setLogoSettings] = useState<LogoSettings>({
    logoHeader: 'https://portal.tasikmalayakota.go.id/assets/uploads/logo-dlh.png',
    logoFooter: 'https://www.dlh.tasikmalayakota.go.id/images/logo-white-footer.png',
    siteName: 'Dinas Lingkungan Hidup Kota Tasikmalaya',
    siteDescription: 'Website resmi Dinas Lingkungan Hidup Kota Tasikmalaya'
  });
  const [logoLoading, setLogoLoading] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState<{ [key: string]: boolean }>({});

  // Fetch logo settings on component mount
  useEffect(() => {
    fetchLogoSettings();
  }, []);

  // Load leader data into form when leader data is available
  useEffect(() => {
    if (leader) {
      setLeaderForm({
        name: leader.name,
        position: leader.position,
        greeting: leader.greeting,
        photo: leader.photo
      });
    }
  }, [leader]);

interface Setting {
  key: string;
  value: string;
}

interface SettingsMap {
  [key: string]: string;
}

  const fetchLogoSettings = async () => {
    try {
      const response = await fetch('/api/settings');
      const data = await response.json();

      if (data.success) {
        const settingsMap = data.data.reduce((acc: SettingsMap, setting: Setting) => {
          acc[setting.key] = setting.value;
          return acc;
        }, {});

        setLogoSettings({
          logoHeader: settingsMap.logo_header || logoSettings.logoHeader,
          logoFooter: settingsMap.logo_footer || logoSettings.logoFooter,
          siteName: settingsMap.site_name || logoSettings.siteName,
          siteDescription: settingsMap.site_description || logoSettings.siteDescription,
        });
      }
    } catch (error) {
      console.error('Error fetching logo settings:', error);
    }
  };

  const handleImageUpload = async (settingKey: string, file: File) => {
    setUploading(settingKey);
    
    try {
      // Validasi file
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        alert('Format file tidak didukung. Gunakan JPG, PNG, atau WEBP.');
        return;
      }

      // Validasi ukuran file (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        alert('Ukuran file terlalu besar. Maksimal 2MB.');
        return;
      }

      const formData = new FormData();
      formData.append('image', file);
      formData.append('type', settingKey.includes('header') ? 'logo-header' : 'logo-footer');

      const uploadResponse = await fetch('/api/upload/image', {
        method: 'POST',
        body: formData,
      });

      const uploadData = await uploadResponse.json();

      if (uploadData.success) {
        // Update setting dengan URL baru
        await updateLogoSetting(settingKey, uploadData.data.url);
      } else {
        alert('Gagal mengupload gambar: ' + uploadData.error);
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Terjadi kesalahan saat mengupload gambar');
    } finally {
      setUploading(null);
    }
  };

  const updateLogoSetting = async (key: string, value: string) => {
    setLogoLoading(true);
    
    try {
      const response = await fetch('/api/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ key, value }),
      });

      const data = await response.json();

      if (data.success) {
        // Update state lokal
        const settingKeyMap: { [key: string]: keyof LogoSettings } = {
          'logo_header': 'logoHeader',
          'logo_footer': 'logoFooter',
          'site_name': 'siteName',
          'site_description': 'siteDescription'
        };
        
        const stateKey = settingKeyMap[key];
        if (stateKey) {
          setLogoSettings(prev => ({
            ...prev,
            [stateKey]: value
          }));
        }
        
        alert('Setting berhasil diperbarui!');
      } else {
        alert('Gagal memperbarui setting: ' + data.error);
      }
    } catch (error) {
      console.error('Update error:', error);
      alert('Terjadi kesalahan saat memperbarui setting');
    } finally {
      setLogoLoading(false);
    }
  };

  const togglePreview = (key: string) => {
    setShowPreview(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const getLogoSize = (key: string) => {
    if (key === 'logoHeader') {
      return { width: 60, height: 60, ratio: '1:1' };
    } else if (key === 'logoFooter') {
      return { width: 330, height: 60, ratio: '5.5:1' };
    }
    return { width: 100, height: 100, ratio: '1:1' };
  };

  // Leader management handlers
  const handleLeaderImageUpload = async (file: File) => {
    setLeaderUploading(true);
    
    try {
      // Validasi file
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        alert('Format file tidak didukung. Gunakan JPG, PNG, atau WEBP.');
        return;
      }

      // Validasi ukuran file (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        alert('Ukuran file terlalu besar. Maksimal 2MB.');
        return;
      }

      const formData = new FormData();
      formData.append('image', file);
      formData.append('type', 'leader-photo');

      const uploadResponse = await fetch('/api/upload/image', {
        method: 'POST',
        body: formData,
      });

      const uploadData = await uploadResponse.json();

      if (uploadData.success) {
        setLeaderForm(prev => ({
          ...prev,
          photo: uploadData.data.url
        }));
      } else {
        alert('Gagal mengupload gambar: ' + uploadData.error);
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Terjadi kesalahan saat mengupload gambar');
    } finally {
      setLeaderUploading(false);
    }
  };

  const handleLeaderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!leaderForm.name || !leaderForm.position || !leaderForm.greeting) {
      alert('Nama, jabatan, dan sambutan harus diisi!');
      return;
    }

    const result = await updateLeader(leaderForm);
    
    if (result.success) {
      alert('Data kepala dinas berhasil disimpan!');
    } else {
      alert('Gagal menyimpan data: ' + result.error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-gradient-to-r from-gray-700 to-green-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-3">
              <Settings className="w-9 h-9 text-white" />
              Pengaturan Website
            </h1>
            <p className="text-xl md:text-2xl opacity-90">Kelola semua data profil, struktur, visi misi, kontak, dan warna website DLH Kota Tasikmalaya</p>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-8xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 md:p-12 border border-gray-200 dark:border-gray-700 space-y-10">
          {/* Profil Instansi */}
          <form id="profil" className="space-y-4" onSubmit={e => {e.preventDefault(); alert('Profil instansi disimpan!')}}>
            <h2 className="text-xl font-bold mb-2">Profil Instansi</h2>
            <div>
              <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">Nama Instansi</label>
              <input type="text" name="namaInstansi" value={profil.namaInstansi} onChange={e => setProfil({...profil, namaInstansi: e.target.value})} className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white" />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">Alamat</label>
              <input type="text" name="alamat" value={profil.alamat} onChange={e => setProfil({...profil, alamat: e.target.value})} className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white" />
            </div>
            <button type="submit" className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300">
              <Save className="w-5 h-5" /> Simpan Profil
            </button>
          </form>

          {/* Logo */}
          <div id="logo" className="space-y-6">
            <h2 className="text-xl font-bold mb-4">Logo</h2>
            
            {/* Logo Header */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                    Logo Header (Navbar)
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                    <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    Logo untuk header/navbar dengan rasio 1:1 (persegi). Ukuran optimal: 60x60px hingga 100x100px
                  </p>
                </div>
                
                <button
                  onClick={() => togglePreview('logoHeader')}
                  className="flex items-center gap-2 px-3 py-1 text-sm bg-gray-100 dark:bg-gray-600 rounded-md hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors"
                >
                  {showPreview.logoHeader ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  {showPreview.logoHeader ? 'Sembunyikan' : 'Preview'}
                </button>
              </div>

              {/* Current Logo Preview */}
              {showPreview.logoHeader && logoSettings.logoHeader && (
                <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 bg-white dark:bg-gray-800 mb-4">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Logo Saat Ini (Rasio {getLogoSize('logoHeader').ratio}):
                  </p>
                  <div className="flex items-center justify-center bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border-2 border-dashed border-gray-300 dark:border-gray-600">
                    <Image
                      src={logoSettings.logoHeader}
                      alt="Logo Header"
                      width={getLogoSize('logoHeader').width}
                      height={getLogoSize('logoHeader').height}
                      className="object-contain"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                  </div>
                </div>
              )}

              {/* URL Input */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  URL Logo Header:
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={logoSettings.logoHeader}
                    onChange={(e) => setLogoSettings(prev => ({ ...prev, logoHeader: e.target.value }))}
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-600 dark:text-white"
                    placeholder="https://example.com/logo.png"
                  />
                  <button
                    onClick={() => updateLogoSetting('logo_header', logoSettings.logoHeader)}
                    disabled={logoLoading}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {logoLoading ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <Save className="w-4 h-4" />
                    )}
                    Simpan
                  </button>
                </div>
              </div>

              {/* Upload Section */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Upload Logo Header Baru:
                </label>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        handleImageUpload('logo_header', file);
                      }
                    }}
                    className="hidden"
                    id="upload-header"
                    disabled={uploading === 'logo_header'}
                  />
                  <label
                    htmlFor="upload-header"
                    className="cursor-pointer flex flex-col items-center gap-2"
                  >
                    {uploading === 'logo_header' ? (
                      <RefreshCw className="w-8 h-8 text-gray-400 animate-spin" />
                    ) : (
                      <Upload className="w-8 h-8 text-gray-400" />
                    )}
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {uploading === 'logo_header' ? 'Mengupload...' : 'Klik untuk upload gambar'}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-500">
                      Rasio 1:1 • Max 2MB • JPG, PNG, WEBP
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Logo Footer */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                    Logo Footer
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                    <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    Logo untuk footer dengan rasio 5.5:1 (landscape). Ukuran optimal: 330x60px atau kelipatannya
                  </p>
                </div>
                
                <button
                  onClick={() => togglePreview('logoFooter')}
                  className="flex items-center gap-2 px-3 py-1 text-sm bg-gray-100 dark:bg-gray-600 rounded-md hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors"
                >
                  {showPreview.logoFooter ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  {showPreview.logoFooter ? 'Sembunyikan' : 'Preview'}
                </button>
              </div>

              {/* Current Logo Preview */}
              {showPreview.logoFooter && logoSettings.logoFooter && (
                <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 bg-white dark:bg-gray-800 mb-4">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Logo Saat Ini (Rasio {getLogoSize('logoFooter').ratio}):
                  </p>
                  <div className="flex items-center justify-center bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border-2 border-dashed border-gray-300 dark:border-gray-600">
                    <Image
                      src={logoSettings.logoFooter}
                      alt="Logo Footer"
                      width={getLogoSize('logoFooter').width}
                      height={getLogoSize('logoFooter').height}
                      className="object-contain"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                  </div>
                </div>
              )}

              {/* URL Input */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  URL Logo Footer:
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={logoSettings.logoFooter}
                    onChange={(e) => setLogoSettings(prev => ({ ...prev, logoFooter: e.target.value }))}
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-600 dark:text-white"
                    placeholder="https://example.com/logo-footer.png"
                  />
                  <button
                    onClick={() => updateLogoSetting('logo_footer', logoSettings.logoFooter)}
                    disabled={logoLoading}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {logoLoading ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <Save className="w-4 h-4" />
                    )}
                    Simpan
                  </button>
                </div>
              </div>

              {/* Upload Section */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Upload Logo Footer Baru:
                </label>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        handleImageUpload('logo_footer', file);
                      }
                    }}
                    className="hidden"
                    id="upload-footer"
                    disabled={uploading === 'logo_footer'}
                  />
                  <label
                    htmlFor="upload-footer"
                    className="cursor-pointer flex flex-col items-center gap-2"
                  >
                    {uploading === 'logo_footer' ? (
                      <RefreshCw className="w-8 h-8 text-gray-400 animate-spin" />
                    ) : (
                      <Upload className="w-8 h-8 text-gray-400" />
                    )}
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {uploading === 'logo_footer' ? 'Mengupload...' : 'Klik untuk upload gambar'}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-500">
                      Rasio 5.5:1 • Max 2MB • JPG, PNG, WEBP
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Site Info */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Informasi Situs
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Nama Situs:
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={logoSettings.siteName}
                      onChange={(e) => setLogoSettings(prev => ({ ...prev, siteName: e.target.value }))}
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-600 dark:text-white"
                    />
                    <button
                      onClick={() => updateLogoSetting('site_name', logoSettings.siteName)}
                      disabled={logoLoading}
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {logoLoading ? (
                        <RefreshCw className="w-4 h-4 animate-spin" />
                      ) : (
                        <Save className="w-4 h-4" />
                      )}
                      Simpan
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Deskripsi Situs:
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={logoSettings.siteDescription}
                      onChange={(e) => setLogoSettings(prev => ({ ...prev, siteDescription: e.target.value }))}
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-600 dark:text-white"
                    />
                    <button
                      onClick={() => updateLogoSetting('site_description', logoSettings.siteDescription)}
                      disabled={logoLoading}
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {logoLoading ? (
                        <RefreshCw className="w-4 h-4 animate-spin" />
                      ) : (
                        <Save className="w-4 h-4" />
                      )}
                      Simpan
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Info Box */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">
                📝 Panduan Rasio Logo
              </h4>
              <ul className="text-sm text-blue-800 dark:text-blue-300 space-y-1">
                <li><strong>Logo Header (1:1):</strong> Untuk navbar, berbentuk persegi. Optimal: 60x60px - 100x100px</li>
                <li><strong>Logo Footer (5.5:1):</strong> Untuk footer, berbentuk landscape dengan teks. Optimal: 330x60px</li>
                <li><strong>Format:</strong> PNG dengan background transparan lebih baik</li>
                <li><strong>Ukuran file:</strong> Maksimal 2MB untuk performa optimal</li>
              </ul>
            </div>
          </div>
          {/* Struktur Organisasi */}
          <form id="struktur" className="space-y-4" onSubmit={e => {e.preventDefault(); alert('Struktur organisasi disimpan!')}}>
            <h2 className="text-xl font-bold mb-2">Struktur Organisasi</h2>
            <div>
              <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">Struktur Organisasi</label>
              <textarea name="struktur" value={struktur.struktur} onChange={e => setStruktur({...struktur, struktur: e.target.value})} className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white min-h-[80px]" />
            </div>
            <button type="submit" className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300">
              <Save className="w-5 h-5" /> Simpan Struktur
            </button>
          </form>
          {/* Tugas & Fungsi */}
          <form id="tupoksi" className="space-y-4" onSubmit={e => {e.preventDefault(); alert('Tugas & Fungsi disimpan!')}}>
            <h2 className="text-xl font-bold mb-2">Tugas & Fungsi</h2>
            <div>
              <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">Tugas & Fungsi</label>
              <textarea name="tupoksi" value={tupoksi.tupoksi} onChange={e => setTupoksi({...tupoksi, tupoksi: e.target.value})} className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white min-h-[80px]" />
            </div>
            <button type="submit" className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300">
              <Save className="w-5 h-5" /> Simpan Tugas & Fungsi
            </button>
          </form>
          {/* Visi & Misi */}
          <form id="visi" className="space-y-4" onSubmit={e => {e.preventDefault(); alert('Visi & Misi disimpan!')}}>
            <h2 className="text-xl font-bold mb-2">Visi & Misi</h2>
            <div>
              <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">Visi</label>
              <input type="text" name="visi" value={visiMisi.visi} onChange={e => setVisiMisi({...visiMisi, visi: e.target.value})} className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white" />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">Misi</label>
              <textarea name="misi" value={visiMisi.misi} onChange={e => setVisiMisi({...visiMisi, misi: e.target.value})} className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white min-h-[80px]" />
            </div>
            <button type="submit" className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300">
              <Save className="w-5 h-5" /> Simpan Visi & Misi
            </button>
          </form>
          {/* Kontak */}
          <form id="kontak" className="space-y-4" onSubmit={e => {e.preventDefault(); alert('Kontak disimpan!')}}>
            <h2 className="text-xl font-bold mb-2">Kontak</h2>
            <div>
              <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">Email</label>
              <input type="email" name="email" value={kontak.email} onChange={e => setKontak({...kontak, email: e.target.value})} className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white" />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">Telepon</label>
              <input type="text" name="telepon" value={kontak.telepon} onChange={e => setKontak({...kontak, telepon: e.target.value})} className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white" />
            </div>
            <button type="submit" className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300">
              <Save className="w-5 h-5" /> Simpan Kontak
            </button>
          </form>

          {/* Manajemen Kepala Dinas */}
          <form id="kepala-dinas" className="space-y-6" onSubmit={handleLeaderSubmit}>
            <div className="flex items-center gap-3 mb-4">
              <User className="w-6 h-6 text-green-600" />
              <h2 className="text-xl font-bold">Manajemen Kepala Dinas</h2>
            </div>
            
            {leaderLoading ? (
              <div className="animate-pulse space-y-4">
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
                <div className="h-20 bg-gray-300 dark:bg-gray-600 rounded mb-4"></div>
              </div>
            ) : (
              <>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">Nama Kepala Dinas</label>
                      <input 
                        type="text" 
                        value={leaderForm.name} 
                        onChange={e => setLeaderForm({...leaderForm, name: e.target.value})} 
                        className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="Contoh: Drs. Nama Pimpinan"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">Jabatan</label>
                      <input 
                        type="text" 
                        value={leaderForm.position} 
                        onChange={e => setLeaderForm({...leaderForm, position: e.target.value})} 
                        className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="Contoh: Kepala Dinas Lingkungan Hidup"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">Sambutan Kepala Dinas</label>
                      <textarea 
                        value={leaderForm.greeting} 
                        onChange={e => setLeaderForm({...leaderForm, greeting: e.target.value})} 
                        className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white min-h-[120px]"
                        placeholder="Tulis sambutan kepala dinas..."
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">Foto Kepala Dinas</label>
                      
                      {/* Preview foto */}
                      <div className="mb-4">
                        <div className="relative w-40 h-52 mx-auto bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden border-2 border-dashed border-gray-300 dark:border-gray-600">
                          {leaderForm.photo ? (
                            <Image
                              src={leaderForm.photo}
                              alt="Preview Kepala Dinas"
                              fill
                              className="object-cover object-top"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = "/pemimpin.png";
                              }}
                            />
                          ) : (
                            <div className="flex items-center justify-center h-full text-gray-400">
                              <User className="w-16 h-16" />
                            </div>
                          )}
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-2">
                          Rasio 3:4 (Portrait) - Optimal: 300x400px
                        </p>
                      </div>
                      
                      {/* Upload options */}
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Upload File Gambar
                          </label>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                handleLeaderImageUpload(file);
                              }
                            }}
                            disabled={leaderUploading}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 dark:file:bg-green-900 dark:file:text-green-200"
                          />
                        </div>
                        
                        <div className="text-sm text-gray-500 dark:text-gray-400 text-center">atau</div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            URL Gambar
                          </label>
                          <div className="flex gap-2">
                            <input
                              type="url"
                              value={leaderForm.photo}
                              onChange={(e) => setLeaderForm({...leaderForm, photo: e.target.value})}
                              placeholder="https://example.com/photo.jpg"
                              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                            />
                            <button
                              type="button"
                              onClick={() => setLeaderPreview(!leaderPreview)}
                              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                            >
                              {leaderPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      {leaderUploading && (
                        <div className="flex items-center gap-2 mt-3 text-blue-600 dark:text-blue-400">
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span className="text-sm">Mengupload foto...</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                  <h4 className="font-semibold text-yellow-900 dark:text-yellow-200 mb-2">
                    📸 Panduan Foto Kepala Dinas
                  </h4>
                  <ul className="text-sm text-yellow-800 dark:text-yellow-300 space-y-1">
                    <li><strong>Rasio 3:4 (Portrait):</strong> Foto potret standar. Optimal: 300x400px - 450x600px</li>
                    <li><strong>Format:</strong> JPG atau PNG dengan kualitas baik</li>
                    <li><strong>Ukuran file:</strong> Maksimal 2MB untuk performa optimal</li>
                    <li><strong>Posisi:</strong> Pastikan wajah terlihat jelas di bagian atas foto</li>
                    <li><strong>Background:</strong> Disarankan background yang bersih dan professional</li>
                  </ul>
                </div>
                
                <button 
                  type="submit" 
                  disabled={leaderLoading || leaderUploading}
                  className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
                >
                  <Save className="w-5 h-5" /> 
                  {leaderLoading ? 'Menyimpan...' : 'Simpan Data Kepala Dinas'}
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
