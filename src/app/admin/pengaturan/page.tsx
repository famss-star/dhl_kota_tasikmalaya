"use client";

import { useState, useEffect } from "react";
import { 
  Settings, 
  Save, 
  Upload, 
  RefreshCw, 
  Info, 
  Eye, 
  EyeOff,
  Globe,
  Share2,
  Search,
  Image as ImageIcon,
  Plus,
  Edit3,
  Trash2,
  X
} from "lucide-react";
import Image from "next/image";

interface LogoSettings {
  logoHeader: string;
  logoFooter: string;
  siteName: string;
  siteDescription: string;
}

interface SocialMediaSetting {
  id: string;
  platform: string;
  label: string;
  url: string;
  icon: string;
  isActive: boolean;
  order: number;
}

interface SEOSetting {
  id: string;
  key: string;
  label: string;
  value: string;
  type: "text" | "textarea" | "url" | "image";
  category: "basic" | "social" | "advanced";
}

interface WebsiteSetting {
  id: string;
  type: "logo_header" | "logo_footer" | "social_media" | "site_info" | "seo_meta";
  label: string;
  value: string;
  url?: string;
  icon?: string;
  order: number;
  isActive: boolean;
}

interface Setting {
  key: string;
  value: string;
}

interface SettingsMap {
  [key: string]: string;
}

export default function AdminPengaturan() {
  // Active tab state
  const [activeTab, setActiveTab] = useState<"logo" | "social" | "seo" | "website">("logo");
  
  // Logo settings
  const [logoSettings, setLogoSettings] = useState<LogoSettings>({
    logoHeader: '/logo-white-footer.png',
    logoFooter: '/logo-white-footer.png',
    siteName: 'Dinas Lingkungan Hidup Kota Tasikmalaya',
    siteDescription: 'Website resmi Dinas Lingkungan Hidup Kota Tasikmalaya'
  });
  const [logoLoading, setLogoLoading] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState<{ [key: string]: boolean }>({});

  // Social Media settings
  const [socialMediaSettings, setSocialMediaSettings] = useState<SocialMediaSetting[]>([]);
  const [socialFormData, setSocialFormData] = useState<Partial<SocialMediaSetting>>({});
  const [showSocialModal, setShowSocialModal] = useState(false);
  const [editingSocial, setEditingSocial] = useState<SocialMediaSetting | null>(null);

  // SEO settings
  const [seoSettings, setSeoSettings] = useState<SEOSetting[]>([]);
  const [seoFormData, setSeoFormData] = useState<Partial<SEOSetting>>({});
  const [showSeoModal, setShowSeoModal] = useState(false);
  const [editingSeo, setEditingSeo] = useState<SEOSetting | null>(null);

  // Website settings
  const [websiteSettings, setWebsiteSettings] = useState<WebsiteSetting[]>([]);
  const [websiteFormData, setWebsiteFormData] = useState<Partial<WebsiteSetting>>({});
  const [showWebsiteModal, setShowWebsiteModal] = useState(false);
  const [editingWebsite, setEditingWebsite] = useState<WebsiteSetting | null>(null);

  const [loading, setLoading] = useState(false);

  // Fetch logo settings on component mount
  useEffect(() => {
    fetchLogoSettings();
    initializeMockData();
  }, []);

  const initializeMockData = () => {
    // Mock Social Media Settings
    const mockSocialMedia: SocialMediaSetting[] = [
      {
        id: "1",
        platform: "facebook",
        label: "Facebook",
        url: "https://facebook.com/dhlkotatasikmalaya",
        icon: "facebook",
        isActive: true,
        order: 1
      },
      {
        id: "2", 
        platform: "instagram",
        label: "Instagram",
        url: "https://instagram.com/dhlkotatasikmalaya",
        icon: "instagram",
        isActive: true,
        order: 2
      },
      {
        id: "3",
        platform: "youtube",
        label: "YouTube",
        url: "https://youtube.com/@dhlkotatasikmalaya",
        icon: "youtube",
        isActive: true,
        order: 3
      }
    ];

    // Mock SEO Settings
    const mockSeoSettings: SEOSetting[] = [
      {
        id: "1",
        key: "meta_title",
        label: "Meta Title",
        value: "Dinas Lingkungan Hidup Kota Tasikmalaya",
        type: "text",
        category: "basic"
      },
      {
        id: "2", 
        key: "meta_description",
        label: "Meta Description",
        value: "Website resmi Dinas Lingkungan Hidup Kota Tasikmalaya untuk informasi lingkungan hidup dan pelayanan publik",
        type: "textarea",
        category: "basic"
      },
      {
        id: "3",
        key: "meta_keywords",
        label: "Meta Keywords", 
        value: "dinas lingkungan hidup, tasikmalaya, lingkungan, kebersihan, sampah",
        type: "textarea",
        category: "basic"
      },
      {
        id: "4",
        key: "og_title",
        label: "Open Graph Title",
        value: "Dinas Lingkungan Hidup Kota Tasikmalaya",
        type: "text",
        category: "social"
      },
      {
        id: "5",
        key: "og_description", 
        label: "Open Graph Description",
        value: "Website resmi DLH Kota Tasikmalaya",
        type: "textarea",
        category: "social"
      }
    ];

    // Mock Website Settings
    const mockWebsiteSettings: WebsiteSetting[] = [
      {
        id: "1",
        type: "site_info",
        label: "Alamat Email Kontak",
        value: "info@dhlkotatasikmalaya.go.id",
        order: 1,
        isActive: true
      },
      {
        id: "2",
        type: "site_info", 
        label: "Nomor Telepon",
        value: "(0265) 123456",
        order: 2,
        isActive: true
      },
      {
        id: "3",
        type: "site_info",
        label: "Alamat Kantor",
        value: "Jl. Siliwangi No. 1, Tasikmalaya",
        order: 3,
        isActive: true
      }
    ];

    setSocialMediaSettings(mockSocialMedia);
    setSeoSettings(mockSeoSettings);
    setWebsiteSettings(mockWebsiteSettings);
  };

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
        // Refresh logo settings
        await fetchLogoSettings();
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
    try {
      const response = await fetch('/api/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          key,
          value,
          label: key === 'logo_header' ? 'Logo Header' : key === 'logo_footer' ? 'Logo Footer' : key === 'site_name' ? 'Nama Situs' : 'Deskripsi Situs'
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Update local state
        setLogoSettings(prev => ({
          ...prev,
          [key === 'logo_header' ? 'logoHeader' : 
           key === 'logo_footer' ? 'logoFooter' :
           key === 'site_name' ? 'siteName' : 'siteDescription']: value
        }));
        
        // Refresh data dari server
        await fetchLogoSettings();
        
        alert('Pengaturan berhasil disimpan!');
      } else {
        alert('Gagal menyimpan pengaturan: ' + data.error);
      }
    } catch (error) {
      console.error('Error updating setting:', error);
      alert('Terjadi kesalahan saat menyimpan pengaturan');
    }
  };

  const handleLogoSettingsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLogoLoading(true);

    try {
      // Update site name and description
      await updateLogoSetting('site_name', logoSettings.siteName);
      await updateLogoSetting('site_description', logoSettings.siteDescription);
    } catch (error) {
      console.error('Error saving logo settings:', error);
    } finally {
      setLogoLoading(false);
    }
  };

  // Social Media Handlers
  const handleAddSocial = () => {
    setSocialFormData({
      platform: "",
      label: "",
      url: "",
      icon: "",
      order: socialMediaSettings.length + 1,
      isActive: true
    });
    setEditingSocial(null);
    setShowSocialModal(true);
  };

  const handleEditSocial = (social: SocialMediaSetting) => {
    setSocialFormData(social);
    setEditingSocial(social);
    setShowSocialModal(true);
  };

  const handleSubmitSocial = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingSocial) {
      const updatedSocial: SocialMediaSetting = {
        ...editingSocial,
        ...socialFormData
      } as SocialMediaSetting;
      
      setSocialMediaSettings(prev => 
        prev.map(s => s.id === editingSocial.id ? updatedSocial : s)
      );
    } else {
      const newSocial: SocialMediaSetting = {
        id: Date.now().toString(),
        ...socialFormData
      } as SocialMediaSetting;
      
      setSocialMediaSettings(prev => [...prev, newSocial]);
    }
    
    setShowSocialModal(false);
    setSocialFormData({});
    setEditingSocial(null);
  };

  const handleDeleteSocial = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus social media ini?')) {
      setSocialMediaSettings(prev => prev.filter(s => s.id !== id));
    }
  };

  // SEO Handlers
  const handleAddSeo = () => {
    setSeoFormData({
      key: "",
      label: "",
      value: "",
      type: "text",
      category: "basic"
    });
    setEditingSeo(null);
    setShowSeoModal(true);
  };

  const handleEditSeo = (seo: SEOSetting) => {
    setSeoFormData(seo);
    setEditingSeo(seo);
    setShowSeoModal(true);
  };

  const handleSubmitSeo = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingSeo) {
      const updatedSeo: SEOSetting = {
        ...editingSeo,
        ...seoFormData
      } as SEOSetting;
      
      setSeoSettings(prev => 
        prev.map(s => s.id === editingSeo.id ? updatedSeo : s)
      );
    } else {
      const newSeo: SEOSetting = {
        id: Date.now().toString(),
        ...seoFormData
      } as SEOSetting;
      
      setSeoSettings(prev => [...prev, newSeo]);
    }
    
    setShowSeoModal(false);
    setSeoFormData({});
    setEditingSeo(null);
  };

  const handleDeleteSeo = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus SEO setting ini?')) {
      setSeoSettings(prev => prev.filter(s => s.id !== id));
    }
  };

  // Website Settings Handlers
  const handleAddWebsite = () => {
    setWebsiteFormData({
      type: "site_info",
      label: "",
      value: "",
      order: websiteSettings.length + 1,
      isActive: true
    });
    setEditingWebsite(null);
    setShowWebsiteModal(true);
  };

  const handleEditWebsite = (website: WebsiteSetting) => {
    setWebsiteFormData(website);
    setEditingWebsite(website);
    setShowWebsiteModal(true);
  };

  const handleSubmitWebsite = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingWebsite) {
      const updatedWebsite: WebsiteSetting = {
        ...editingWebsite,
        ...websiteFormData
      } as WebsiteSetting;
      
      setWebsiteSettings(prev => 
        prev.map(w => w.id === editingWebsite.id ? updatedWebsite : w)
      );
    } else {
      const newWebsite: WebsiteSetting = {
        id: Date.now().toString(),
        ...websiteFormData
      } as WebsiteSetting;
      
      setWebsiteSettings(prev => [...prev, newWebsite]);
    }
    
    setShowWebsiteModal(false);
    setWebsiteFormData({});
    setEditingWebsite(null);
  };

  const handleDeleteWebsite = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus website setting ini?')) {
      setWebsiteSettings(prev => prev.filter(w => w.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="mx-auto">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center space-x-3">
            <Settings className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Pengaturan Website & SEO
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Kelola logo, social media, SEO, dan informasi website
              </p>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="mt-6">
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab("logo")}
                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                  activeTab === "logo"
                    ? "border-blue-500 text-blue-600 dark:text-blue-400"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
                }`}
              >
                <ImageIcon className="w-4 h-4" />
                Logo & Branding
              </button>
              <button
                onClick={() => setActiveTab("social")}
                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                  activeTab === "social"
                    ? "border-blue-500 text-blue-600 dark:text-blue-400"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
                }`}
              >
                <Share2 className="w-4 h-4" />
                Social Media
              </button>
              <button
                onClick={() => setActiveTab("seo")}
                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                  activeTab === "seo"
                    ? "border-blue-500 text-blue-600 dark:text-blue-400"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
                }`}
              >
                <Search className="w-4 h-4" />
                SEO & Metadata
              </button>
              <button
                onClick={() => setActiveTab("website")}
                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                  activeTab === "website"
                    ? "border-blue-500 text-blue-600 dark:text-blue-400"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
                }`}
              >
                <Globe className="w-4 h-4" />
                Website Settings
              </button>
            </nav>
          </div>
        </div>

        {/* Logo & Branding Tab */}
        {activeTab === "logo" && (
          <>
            {/* Info */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-8">
              <div className="flex items-start space-x-3">
                <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                <div className="text-sm text-blue-800 dark:text-blue-200">
                  <p className="font-medium mb-1">Catatan Pengaturan:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Logo header akan ditampilkan di bagian atas halaman website</li>
                    <li>Logo footer akan ditampilkan di bagian bawah halaman website</li>
                    <li>Format gambar yang didukung: JPG, PNG, WEBP (maksimal 2MB)</li>
                    <li>Nama dan deskripsi situs akan digunakan untuk SEO dan metadata</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Logo & Site Settings */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
              <div className="flex items-center space-x-3 mb-6">
                <ImageIcon className="w-6 h-6 text-green-600 dark:text-green-400" />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Logo & Informasi Dasar
                </h2>
              </div>
          
          <form onSubmit={handleLogoSettingsSubmit} className="space-y-6">
            {/* Logo Header */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Logo Header
              </label>
              <div className="flex items-center space-x-4">
                <div className="relative w-48 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden border-2 border-dashed border-gray-300 dark:border-gray-600">
                  <Image
                    src={logoSettings.logoHeader}
                    alt="Logo Header"
                    fill
                    className="object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/logo-dlh.png';
                    }}
                  />
                </div>
                <div className="flex-1">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleImageUpload('logo_header', file);
                    }}
                    className="block w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-blue-900 dark:file:text-blue-200"
                    disabled={uploading === 'logo_header'}
                  />
                  {uploading === 'logo_header' && (
                    <div className="mt-2 flex items-center text-sm text-blue-600 dark:text-blue-400">
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Mengunggah...
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setShowPreview(prev => ({ ...prev, logoHeader: !prev.logoHeader }))}
                  className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  {showPreview.logoHeader ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {showPreview.logoHeader && (
                <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Preview:</p>
                  <div className="relative w-64 h-16 bg-white dark:bg-gray-800 rounded border overflow-hidden">
                    <Image
                      src={logoSettings.logoHeader}
                      alt="Logo Header Preview"
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Logo Footer */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Logo Footer
              </label>
              <div className="flex items-center space-x-4">
                <div className="relative w-48 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden border-2 border-dashed border-gray-300 dark:border-gray-600">
                  <Image
                    src={logoSettings.logoFooter}
                    alt="Logo Footer"
                    fill
                    className="object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/logo-white-footer.png';
                    }}
                  />
                </div>
                <div className="flex-1">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleImageUpload('logo_footer', file);
                    }}
                    className="block w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-blue-900 dark:file:text-blue-200"
                    disabled={uploading === 'logo_footer'}
                  />
                  {uploading === 'logo_footer' && (
                    <div className="mt-2 flex items-center text-sm text-blue-600 dark:text-blue-400">
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Mengunggah...
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setShowPreview(prev => ({ ...prev, logoFooter: !prev.logoFooter }))}
                  className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  {showPreview.logoFooter ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {showPreview.logoFooter && (
                <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Preview:</p>
                  <div className="relative w-64 h-16 bg-green-900 rounded border overflow-hidden">
                    <Image
                      src={logoSettings.logoFooter}
                      alt="Logo Footer Preview"
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Site Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Nama Situs
              </label>
              <input
                type="text"
                value={logoSettings.siteName}
                onChange={(e) => setLogoSettings(prev => ({ ...prev, siteName: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="Nama situs web"
                required
              />
            </div>

            {/* Site Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Deskripsi Situs
              </label>
              <textarea
                value={logoSettings.siteDescription}
                onChange={(e) => setLogoSettings(prev => ({ ...prev, siteDescription: e.target.value }))}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white resize-none"
                placeholder="Deskripsi singkat tentang situs web"
                required
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={logoLoading}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg font-medium transition flex items-center space-x-2"
              >
                {logoLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Menyimpan...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Simpan Pengaturan</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
        </>
        )}

        {/* Social Media Tab */}
        {activeTab === "social" && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-3">
                  <Share2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Social Media Settings
                  </h2>
                </div>
                <button
                  onClick={handleAddSocial}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2"
                >
                  <Plus size={16} />
                  Tambah Social Media
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {socialMediaSettings.map((social) => (
                  <div key={social.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-medium text-gray-800 dark:text-white">
                          {social.label}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {social.platform}
                        </p>
                        <a
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 dark:text-blue-400 text-sm hover:underline"
                        >
                          {social.url}
                        </a>
                      </div>
                      {social.isActive && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                          Aktif
                        </span>
                      )}
                    </div>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditSocial(social)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded text-sm font-medium transition-colors flex items-center gap-1"
                      >
                        <Edit3 size={12} />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteSocial(social.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded text-sm font-medium transition-colors flex items-center gap-1"
                      >
                        <Trash2 size={12} />
                        Hapus
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SEO Tab */}
        {activeTab === "seo" && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-3">
                  <Search className="w-6 h-6 text-green-600 dark:text-green-400" />
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    SEO & Metadata Settings
                  </h2>
                </div>
                <button
                  onClick={handleAddSeo}
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2"
                >
                  <Plus size={16} />
                  Tambah SEO Setting
                </button>
              </div>

              {/* Group by Category */}
              {["basic", "social", "advanced"].map((category) => {
                const categorySettings = seoSettings.filter(s => s.category === category);
                const categoryLabel = category === "basic" ? "Basic SEO" : 
                                    category === "social" ? "Social Media SEO" : "Advanced SEO";
                
                if (categorySettings.length === 0) return null;
                
                return (
                  <div key={category} className="mb-6">
                    <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">
                      {categoryLabel}
                    </h3>
                    <div className="grid grid-cols-1 gap-4">
                      {categorySettings.map((seo) => (
                        <div key={seo.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                          <div className="flex justify-between items-start mb-3">
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-800 dark:text-white">
                                {seo.label}
                              </h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                Key: {seo.key}
                              </p>
                              <div className="mt-2">
                                {seo.type === "textarea" ? (
                                  <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
                                    {seo.value}
                                  </p>
                                ) : (
                                  <p className="text-sm text-gray-700 dark:text-gray-300">
                                    {seo.value}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEditSeo(seo)}
                              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded text-sm font-medium transition-colors flex items-center gap-1"
                            >
                              <Edit3 size={12} />
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteSeo(seo.id)}
                              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded text-sm font-medium transition-colors flex items-center gap-1"
                            >
                              <Trash2 size={12} />
                              Hapus
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Website Settings Tab */}
        {activeTab === "website" && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-3">
                  <Globe className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Website Settings
                  </h2>
                </div>
                <button
                  onClick={handleAddWebsite}
                  className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2"
                >
                  <Plus size={16} />
                  Tambah Setting
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {websiteSettings.map((website) => (
                  <div key={website.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-medium text-gray-800 dark:text-white">
                          {website.label}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {website.value}
                        </p>
                        <span className="inline-block px-2 py-1 text-xs bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded mt-2">
                          {website.type}
                        </span>
                      </div>
                      {website.isActive && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                          Aktif
                        </span>
                      )}
                    </div>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditWebsite(website)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded text-sm font-medium transition-colors flex items-center gap-1"
                      >
                        <Edit3 size={12} />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteWebsite(website.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded text-sm font-medium transition-colors flex items-center gap-1"
                      >
                        <Trash2 size={12} />
                        Hapus
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Modals will be added here */}

        {/* Social Media Modal */}
        {showSocialModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {editingSocial ? "Edit" : "Tambah"} Social Media
                </h3>
                <button
                  onClick={() => setShowSocialModal(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmitSocial} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Platform
                  </label>
                  <select
                    value={socialFormData.platform || ""}
                    onChange={(e) => setSocialFormData(prev => ({ ...prev, platform: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    required
                  >
                    <option value="">Pilih Platform</option>
                    <option value="facebook">Facebook</option>
                    <option value="instagram">Instagram</option>
                    <option value="twitter">Twitter</option>
                    <option value="youtube">YouTube</option>
                    <option value="tiktok">TikTok</option>
                    <option value="linkedin">LinkedIn</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Label
                  </label>
                  <input
                    type="text"
                    value={socialFormData.label || ""}
                    onChange={(e) => setSocialFormData(prev => ({ ...prev, label: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Contoh: Facebook Official"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    URL
                  </label>
                  <input
                    type="url"
                    value={socialFormData.url || ""}
                    onChange={(e) => setSocialFormData(prev => ({ ...prev, url: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="https://..."
                    required
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={socialFormData.isActive || false}
                    onChange={(e) => setSocialFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                    Aktif
                  </label>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowSocialModal(false)}
                    className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
                  >
                    {editingSocial ? "Update" : "Tambah"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* SEO Modal */}
        {showSeoModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {editingSeo ? "Edit" : "Tambah"} SEO Setting
                </h3>
                <button
                  onClick={() => setShowSeoModal(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmitSeo} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Key
                  </label>
                  <input
                    type="text"
                    value={seoFormData.key || ""}
                    onChange={(e) => setSeoFormData(prev => ({ ...prev, key: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                    placeholder="meta_title, og_description, dll"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Label
                  </label>
                  <input
                    type="text"
                    value={seoFormData.label || ""}
                    onChange={(e) => setSeoFormData(prev => ({ ...prev, label: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Meta Title, Open Graph Description, dll"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Value
                  </label>
                  {seoFormData.type === "textarea" ? (
                    <textarea
                      value={seoFormData.value || ""}
                      onChange={(e) => setSeoFormData(prev => ({ ...prev, value: e.target.value }))}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white resize-none"
                      required
                    />
                  ) : (
                    <input
                      type={seoFormData.type === "url" ? "url" : "text"}
                      value={seoFormData.value || ""}
                      onChange={(e) => setSeoFormData(prev => ({ ...prev, value: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                      required
                    />
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Type
                  </label>
                  <select
                    value={seoFormData.type || "text"}
                    onChange={(e) => setSeoFormData(prev => ({ ...prev, type: e.target.value as "text" | "textarea" | "url" | "image" }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="text">Text</option>
                    <option value="textarea">Textarea</option>
                    <option value="url">URL</option>
                    <option value="image">Image</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Category
                  </label>
                  <select
                    value={seoFormData.category || "basic"}
                    onChange={(e) => setSeoFormData(prev => ({ ...prev, category: e.target.value as "basic" | "social" | "advanced" }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="basic">Basic SEO</option>
                    <option value="social">Social Media SEO</option>
                    <option value="advanced">Advanced SEO</option>
                  </select>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowSeoModal(false)}
                    className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium"
                  >
                    {editingSeo ? "Update" : "Tambah"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Website Settings Modal */}
        {showWebsiteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {editingWebsite ? "Edit" : "Tambah"} Website Setting
                </h3>
                <button
                  onClick={() => setShowWebsiteModal(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmitWebsite} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Type
                  </label>
                  <select
                    value={websiteFormData.type || "site_info"}
                    onChange={(e) => setWebsiteFormData(prev => ({ ...prev, type: e.target.value as WebsiteSetting['type'] }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="site_info">Site Information</option>
                    <option value="logo_header">Logo Header</option>
                    <option value="logo_footer">Logo Footer</option>
                    <option value="social_media">Social Media</option>
                    <option value="seo_meta">SEO Meta</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Label
                  </label>
                  <input
                    type="text"
                    value={websiteFormData.label || ""}
                    onChange={(e) => setWebsiteFormData(prev => ({ ...prev, label: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Nama setting"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Value
                  </label>
                  <input
                    type="text"
                    value={websiteFormData.value || ""}
                    onChange={(e) => setWebsiteFormData(prev => ({ ...prev, value: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Nilai setting"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    URL (Opsional)
                  </label>
                  <input
                    type="url"
                    value={websiteFormData.url || ""}
                    onChange={(e) => setWebsiteFormData(prev => ({ ...prev, url: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                    placeholder="https://..."
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={websiteFormData.isActive || false}
                    onChange={(e) => setWebsiteFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                    className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  />
                  <label className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                    Aktif
                  </label>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowWebsiteModal(false)}
                    className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium"
                  >
                    {editingWebsite ? "Update" : "Tambah"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
