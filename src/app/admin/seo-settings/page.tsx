"use client";

import React, { useState, useEffect } from "react";
import { 
  Save, 
  Globe, 
  Search, 
  Image as ImageIcon,
  FileText,
  Eye,
  EyeOff,
  Upload,
  X
} from "lucide-react";

interface SEOSettings {
  id: string;
  siteName: string;
  siteTitle: string;
  siteDescription: string;
  keywords: string[];
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  favicon: string;
  robots: string;
  canonicalUrl: string;
  author: string;
  language: string;
  isActive: boolean;
}

interface MetaTag {
  id: string;
  name: string;
  content: string;
  type: "meta" | "property" | "httpEquiv";
  isActive: boolean;
}

export default function AdminSEOSettings() {
  const [seoSettings, setSeoSettings] = useState<SEOSettings>({
    id: "1",
    siteName: "DLH Kota Tasikmalaya",
    siteTitle: "DLH Kota Tasikmalaya",
    siteDescription: "Website resmi Dinas Lingkungan Hidup Kota Tasikmalaya",
    keywords: ["dinas lingkungan hidup", "tasikmalaya", "lingkungan", "kebersihan", "sampah"],
    ogTitle: "DLH Kota Tasikmalaya - Dinas Lingkungan Hidup",
    ogDescription: "Website resmi Dinas Lingkungan Hidup Kota Tasikmalaya untuk pelayanan publik dan informasi lingkungan",
    ogImage: "/og-image.jpg",
    favicon: "/favicon.ico",
    robots: "index, follow",
    canonicalUrl: "https://dlh.tasikmalayakota.go.id",
    author: "DLH Kota Tasikmalaya",
    language: "id",
    isActive: true
  });

  const [metaTags, setMetaTags] = useState<MetaTag[]>([
    {
      id: "1",
      name: "viewport",
      content: "width=device-width, initial-scale=1",
      type: "meta",
      isActive: true
    },
    {
      id: "2", 
      name: "theme-color",
      content: "#059669",
      type: "meta",
      isActive: true
    },
    {
      id: "3",
      name: "og:type",
      content: "website",
      type: "property",
      isActive: true
    }
  ]);

  const [newKeyword, setNewKeyword] = useState("");
  const [newMetaTag, setNewMetaTag] = useState({
    name: "",
    content: "",
    type: "meta" as const
  });
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"basic" | "social" | "technical" | "meta">("basic");

  const handleSaveSEO = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log("SEO Settings saved:", seoSettings);
      alert("Pengaturan SEO berhasil disimpan!");
    } catch (error) {
      console.error('Error saving SEO settings:', error);
      alert("Gagal menyimpan pengaturan SEO");
    } finally {
      setLoading(false);
    }
  };

  const handleAddKeyword = () => {
    if (newKeyword.trim() && !seoSettings.keywords.includes(newKeyword.trim())) {
      setSeoSettings(prev => ({
        ...prev,
        keywords: [...prev.keywords, newKeyword.trim()]
      }));
      setNewKeyword("");
    }
  };

  const handleRemoveKeyword = (keyword: string) => {
    setSeoSettings(prev => ({
      ...prev,
      keywords: prev.keywords.filter(k => k !== keyword)
    }));
  };

  const handleAddMetaTag = () => {
    if (newMetaTag.name && newMetaTag.content) {
      const metaTag: MetaTag = {
        id: Date.now().toString(),
        ...newMetaTag,
        isActive: true
      };
      setMetaTags(prev => [...prev, metaTag]);
      setNewMetaTag({ name: "", content: "", type: "meta" });
    }
  };

  const handleRemoveMetaTag = (id: string) => {
    setMetaTags(prev => prev.filter(tag => tag.id !== id));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: "ogImage" | "favicon") => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Simulasi upload image
    const reader = new FileReader();
    reader.onload = (event) => {
      const imageUrl = event.target?.result as string;
      setSeoSettings(prev => ({ ...prev, [field]: imageUrl }));
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          Pengaturan SEO & Metadata
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Kelola SEO, metadata, dan pengaturan teknis website
        </p>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: "basic", label: "Dasar", icon: FileText },
              { id: "social", label: "Media Sosial", icon: Globe },
              { id: "technical", label: "Teknis", icon: Search },
              { id: "meta", label: "Meta Tags", icon: ImageIcon }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                    activeTab === tab.id
                      ? "border-green-500 text-green-600 dark:text-green-400"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Basic SEO Tab */}
      {activeTab === "basic" && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              Informasi Dasar Website
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Nama Website
                </label>
                <input
                  type="text"
                  value={seoSettings.siteName}
                  onChange={(e) => setSeoSettings(prev => ({ ...prev, siteName: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                  placeholder="DLH Kota Tasikmalaya"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Judul Website (Title Tag)
                </label>
                <input
                  type="text"
                  value={seoSettings.siteTitle}
                  onChange={(e) => setSeoSettings(prev => ({ ...prev, siteTitle: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                  placeholder="DLH Kota Tasikmalaya"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Deskripsi Website (Meta Description)
              </label>
              <textarea
                value={seoSettings.siteDescription}
                onChange={(e) => setSeoSettings(prev => ({ ...prev, siteDescription: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                placeholder="Website resmi Dinas Lingkungan Hidup Kota Tasikmalaya"
                rows={3}
                maxLength={160}
              />
              <p className="text-xs text-gray-500 mt-1">
                {seoSettings.siteDescription.length}/160 karakter (optimal: 150-160)
              </p>
            </div>

            {/* Keywords */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Kata Kunci (Keywords)
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newKeyword}
                  onChange={(e) => setNewKeyword(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddKeyword()}
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Tambah kata kunci"
                />
                <button
                  onClick={handleAddKeyword}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors"
                >
                  Tambah
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {seoSettings.keywords.map((keyword, index) => (
                  <span
                    key={index}
                    className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded-full text-sm flex items-center gap-1"
                  >
                    {keyword}
                    <button
                      onClick={() => handleRemoveKeyword(keyword)}
                      className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-200"
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Social Media Tab */}
      {activeTab === "social" && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              Open Graph & Social Media
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  OG Title
                </label>
                <input
                  type="text"
                  value={seoSettings.ogTitle}
                  onChange={(e) => setSeoSettings(prev => ({ ...prev, ogTitle: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Judul untuk media sosial"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Canonical URL
                </label>
                <input
                  type="url"
                  value={seoSettings.canonicalUrl}
                  onChange={(e) => setSeoSettings(prev => ({ ...prev, canonicalUrl: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                  placeholder="https://dlh.tasikmalayakota.go.id"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                OG Description
              </label>
              <textarea
                value={seoSettings.ogDescription}
                onChange={(e) => setSeoSettings(prev => ({ ...prev, ogDescription: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                placeholder="Deskripsi untuk media sosial"
                rows={3}
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                OG Image (1200x630px)
              </label>
              <div className="flex items-center gap-4">
                {seoSettings.ogImage && (
                  <img 
                    src={seoSettings.ogImage} 
                    alt="OG Image Preview" 
                    className="w-32 h-16 object-cover rounded border"
                  />
                )}
                <label className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors flex items-center gap-2">
                  <Upload size={16} />
                  Upload OG Image
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, "ogImage")}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Technical Tab */}
      {activeTab === "technical" && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              Pengaturan Teknis
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Robots Meta
                </label>
                <select
                  value={seoSettings.robots}
                  onChange={(e) => setSeoSettings(prev => ({ ...prev, robots: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="index, follow">Index, Follow</option>
                  <option value="index, nofollow">Index, NoFollow</option>
                  <option value="noindex, follow">NoIndex, Follow</option>
                  <option value="noindex, nofollow">NoIndex, NoFollow</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Bahasa Website
                </label>
                <select
                  value={seoSettings.language}
                  onChange={(e) => setSeoSettings(prev => ({ ...prev, language: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="id">Bahasa Indonesia</option>
                  <option value="en">English</option>
                </select>
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Author/Penulis
              </label>
              <input
                type="text"
                value={seoSettings.author}
                onChange={(e) => setSeoSettings(prev => ({ ...prev, author: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                placeholder="DLH Kota Tasikmalaya"
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Favicon
              </label>
              <div className="flex items-center gap-4">
                {seoSettings.favicon && (
                  <img 
                    src={seoSettings.favicon} 
                    alt="Favicon Preview" 
                    className="w-8 h-8 object-cover rounded border"
                  />
                )}
                <label className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors flex items-center gap-2">
                  <Upload size={16} />
                  Upload Favicon
                  <input
                    type="file"
                    accept="image/x-icon,image/png"
                    onChange={(e) => handleImageUpload(e, "favicon")}
                    className="hidden"
                  />
                </label>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Format: .ico, .png (16x16px atau 32x32px)
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Meta Tags Tab */}
      {activeTab === "meta" && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              Custom Meta Tags
            </h3>
            
            {/* Add New Meta Tag */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-4">
              <h4 className="font-medium text-gray-800 dark:text-white mb-3">Tambah Meta Tag Baru</h4>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <select
                  value={newMetaTag.type}
                  onChange={(e) => setNewMetaTag(prev => ({ ...prev, type: e.target.value as any }))}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-600 dark:text-white"
                >
                  <option value="meta">Meta</option>
                  <option value="property">Property</option>
                  <option value="httpEquiv">HTTP-Equiv</option>
                </select>
                <input
                  type="text"
                  value={newMetaTag.name}
                  onChange={(e) => setNewMetaTag(prev => ({ ...prev, name: e.target.value }))}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-600 dark:text-white"
                  placeholder="Name/Property"
                />
                <input
                  type="text"
                  value={newMetaTag.content}
                  onChange={(e) => setNewMetaTag(prev => ({ ...prev, content: e.target.value }))}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-600 dark:text-white"
                  placeholder="Content"
                />
                <button
                  onClick={handleAddMetaTag}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors"
                >
                  Tambah
                </button>
              </div>
            </div>

            {/* Meta Tags List */}
            <div className="space-y-2">
              {metaTags.map((tag) => (
                <div key={tag.id} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center gap-2">
                    {tag.isActive ? (
                      <Eye size={16} className="text-green-500" />
                    ) : (
                      <EyeOff size={16} className="text-gray-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <code className="text-sm font-mono text-gray-800 dark:text-gray-200">
                      &lt;meta {tag.type === "property" ? "property" : tag.type === "httpEquiv" ? "http-equiv" : "name"}="{tag.name}" content="{tag.content}" /&gt;
                    </code>
                  </div>
                  <button
                    onClick={() => handleRemoveMetaTag(tag.id)}
                    className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSaveSEO}
          disabled={loading}
          className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:from-gray-400 disabled:to-gray-500 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Save size={20} />
          )}
          {loading ? "Menyimpan..." : "Simpan Pengaturan SEO"}
        </button>
      </div>
    </div>
  );
}
