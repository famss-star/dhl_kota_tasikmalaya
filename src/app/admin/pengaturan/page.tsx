"use client";

import React, { useState, useEffect } from "react";
import {
  Settings,
  Save,
  Upload,
  X,
  Plus,
  Edit3,
  Trash2,
  Image as ImageIcon,
  Share2,
  Search,
  Globe,
  Phone,
  Mail,
  MapPin,
  Clock,
  Languages,
  FileText,
  Info,
  Eye,
  EyeOff,
  RefreshCw,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  ExternalLink,
  Download,
} from "lucide-react";

interface LogoSettings {
  logoHeader: string;
  logoFooter: string;
  siteName: string;
  siteDescription: string;
}

interface Setting {
  key: string;
  value: string;
}

interface SettingsMap {
  [key: string]: string;
}

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

interface ContactInfo {
  id: string;
  type: "phone" | "email" | "address" | "hours" | "social" | "website";
  label: string;
  value: string;
  description?: string;
  isPublic: boolean;
  isPrimary: boolean;
  order: number;
  icon?: string;
}

interface OfficeLocation {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  mapCoordinates: {
    lat: number;
    lng: number;
  };
  workingHours: string;
  isMain: boolean;
  isActive: boolean;
}

// SEO Tab Component
function SEOTab() {
  const [seoSettings, setSeoSettings] = useState<SEOSettings>({
    id: "1",
    siteName: "DLH Kota Tasikmalaya",
    siteTitle: "DLH Kota Tasikmalaya",
    siteDescription: "Website resmi Dinas Lingkungan Hidup Kota Tasikmalaya",
    keywords: [
      "dinas lingkungan hidup",
      "tasikmalaya",
      "lingkungan",
      "kebersihan",
      "sampah",
    ],
    ogTitle: "DLH Kota Tasikmalaya - Dinas Lingkungan Hidup",
    ogDescription:
      "Website resmi Dinas Lingkungan Hidup Kota Tasikmalaya untuk pelayanan publik dan informasi lingkungan",
    ogImage: "/og-image.jpg",
    favicon: "/favicon.ico",
    robots: "index, follow",
    canonicalUrl: "https://dlh.tasikmalayakota.go.id",
    author: "DLH Kota Tasikmalaya",
    language: "id",
    isActive: true,
  });

  const [metaTags, setMetaTags] = useState<MetaTag[]>([
    {
      id: "1",
      name: "viewport",
      content: "width=device-width, initial-scale=1",
      type: "meta",
      isActive: true,
    },
    {
      id: "2",
      name: "theme-color",
      content: "#059669",
      type: "meta",
      isActive: true,
    },
    {
      id: "3",
      name: "og:type",
      content: "website",
      type: "property",
      isActive: true,
    },
  ]);

  const [newKeyword, setNewKeyword] = useState("");
  const [newMetaTag, setNewMetaTag] = useState({
    name: "",
    content: "",
    type: "meta" as const,
  });
  const [loading, setLoading] = useState(false);
  const [seoActiveTab, setSeoActiveTab] = useState<
    "basic" | "social" | "technical" | "meta"
  >("basic");

  const handleSaveSEO = async () => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("SEO Settings saved:", seoSettings);
      alert("Pengaturan SEO berhasil disimpan!");
    } catch (error) {
      console.error("Error saving SEO settings:", error);
      alert("Gagal menyimpan pengaturan SEO");
    } finally {
      setLoading(false);
    }
  };

  const handleAddKeyword = () => {
    if (
      newKeyword.trim() &&
      !seoSettings.keywords.includes(newKeyword.trim())
    ) {
      setSeoSettings((prev) => ({
        ...prev,
        keywords: [...prev.keywords, newKeyword.trim()],
      }));
      setNewKeyword("");
    }
  };

  const handleRemoveKeyword = (keyword: string) => {
    setSeoSettings((prev) => ({
      ...prev,
      keywords: prev.keywords.filter((k) => k !== keyword),
    }));
  };

  const handleAddMetaTag = () => {
    if (newMetaTag.name && newMetaTag.content) {
      const metaTag: MetaTag = {
        id: Date.now().toString(),
        ...newMetaTag,
        isActive: true,
      };
      setMetaTags((prev) => [...prev, metaTag]);
      setNewMetaTag({ name: "", content: "", type: "meta" });
    }
  };

  const handleRemoveMetaTag = (id: string) => {
    setMetaTags((prev) => prev.filter((tag) => tag.id !== id));
  };

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "ogImage" | "favicon"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const imageUrl = event.target?.result as string;
      setSeoSettings((prev) => ({ ...prev, [field]: imageUrl }));
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-6">
      {/* Info */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
          <div className="text-sm text-blue-800 dark:text-blue-200">
            <p className="font-medium mb-1">Informasi SEO & Metadata</p>
            <p>
              Kelola pengaturan SEO, metadata, dan pengaturan teknis website
              untuk meningkatkan visibilitas di mesin pencari.
            </p>
          </div>
        </div>
      </div>

      {/* SEO Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: "basic", label: "Dasar", icon: FileText },
              { id: "social", label: "Media Sosial", icon: Globe },
              { id: "technical", label: "Teknis", icon: Search },
              { id: "meta", label: "Meta Tags", icon: ImageIcon },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSeoActiveTab(tab.id as any)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                    seoActiveTab === tab.id
                      ? "border-blue-500 text-blue-600 dark:text-blue-400"
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

        {/* Basic SEO Tab */}
        {seoActiveTab === "basic" && (
          <div className="space-y-6">
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
                  onChange={(e) =>
                    setSeoSettings((prev) => ({
                      ...prev,
                      siteName: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
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
                  onChange={(e) =>
                    setSeoSettings((prev) => ({
                      ...prev,
                      siteTitle: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
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
                onChange={(e) =>
                  setSeoSettings((prev) => ({
                    ...prev,
                    siteDescription: e.target.value,
                  }))
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="Website resmi Dinas Lingkungan Hidup Kota Tasikmalaya"
                rows={3}
                maxLength={160}
              />
              <p className="text-xs text-gray-500 mt-1">
                {seoSettings.siteDescription.length}/160 karakter (optimal:
                150-160)
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
                  onKeyPress={(e) => e.key === "Enter" && handleAddKeyword()}
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Tambah kata kunci"
                />
                <button
                  onClick={handleAddKeyword}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
                >
                  Tambah
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {seoSettings.keywords.map((keyword, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full text-sm flex items-center gap-1"
                  >
                    {keyword}
                    <button
                      onClick={() => handleRemoveKeyword(keyword)}
                      className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200"
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Social Media SEO Tab */}
        {seoActiveTab === "social" && (
          <div className="space-y-6">
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
                  onChange={(e) =>
                    setSeoSettings((prev) => ({
                      ...prev,
                      ogTitle: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
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
                  onChange={(e) =>
                    setSeoSettings((prev) => ({
                      ...prev,
                      canonicalUrl: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
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
                onChange={(e) =>
                  setSeoSettings((prev) => ({
                    ...prev,
                    ogDescription: e.target.value,
                  }))
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
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
        )}

        {/* Technical SEO Tab */}
        {seoActiveTab === "technical" && (
          <div className="space-y-6">
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
                  onChange={(e) =>
                    setSeoSettings((prev) => ({
                      ...prev,
                      robots: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
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
                  onChange={(e) =>
                    setSeoSettings((prev) => ({
                      ...prev,
                      language: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
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
                onChange={(e) =>
                  setSeoSettings((prev) => ({
                    ...prev,
                    author: e.target.value,
                  }))
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
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
        )}

        {/* Meta Tags Tab */}
        {seoActiveTab === "meta" && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              Custom Meta Tags
            </h3>

            {/* Add New Meta Tag */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-4">
              <h4 className="font-medium text-gray-800 dark:text-white mb-3">
                Tambah Meta Tag Baru
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <select
                  value={newMetaTag.type}
                  onChange={(e) =>
                    setNewMetaTag((prev) => ({
                      ...prev,
                      type: e.target.value as any,
                    }))
                  }
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-white"
                >
                  <option value="meta">Meta</option>
                  <option value="property">Property</option>
                  <option value="httpEquiv">HTTP-Equiv</option>
                </select>
                <input
                  type="text"
                  value={newMetaTag.name}
                  onChange={(e) =>
                    setNewMetaTag((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-white"
                  placeholder="Name/Property"
                />
                <input
                  type="text"
                  value={newMetaTag.content}
                  onChange={(e) =>
                    setNewMetaTag((prev) => ({
                      ...prev,
                      content: e.target.value,
                    }))
                  }
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-white"
                  placeholder="Content"
                />
                <button
                  onClick={handleAddMetaTag}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
                >
                  Tambah
                </button>
              </div>
            </div>

            {/* Meta Tags List */}
            <div className="space-y-2">
              {metaTags.map((tag) => (
                <div
                  key={tag.id}
                  className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div className="flex items-center gap-2">
                    {tag.isActive ? (
                      <Eye size={16} className="text-blue-500" />
                    ) : (
                      <EyeOff size={16} className="text-gray-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <code className="text-sm font-mono text-gray-800 dark:text-gray-200">
                      &lt;meta{" "}
                      {tag.type === "property"
                        ? "property"
                        : tag.type === "httpEquiv"
                        ? "http-equiv"
                        : "name"}
                      =&quot;{tag.name}&quot; content=&quot;{tag.content}&quot;
                      /&gt;
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
        )}

        {/* SEO Save Button */}
        <div className="flex justify-end mt-6">
          <button
            onClick={handleSaveSEO}
            disabled={loading}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2"
          >
            {loading ? (
              <RefreshCw className="w-5 h-5 animate-spin" />
            ) : (
              <Save size={20} />
            )}
            {loading ? "Menyimpan..." : "Simpan Pengaturan SEO"}
          </button>
        </div>
      </div>
    </div>
  );
}

// Contact Tab Component
function ContactTab() {
  const [contactInfos, setContactInfos] = useState<ContactInfo[]>([]);
  const [officeLocations, setOfficeLocations] = useState<OfficeLocation[]>([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [contactActiveTab, setContactActiveTab] = useState<
    "info" | "locations"
  >("info");
  const [editingItem, setEditingItem] = useState<any>(null);
  const [editingType, setEditingType] = useState<"contact" | "location">(
    "contact"
  );

  const [contactFormData, setContactFormData] = useState({
    type: "phone" as ContactInfo["type"],
    label: "",
    value: "",
    description: "",
    isPublic: true,
    isPrimary: false,
    order: 1,
    icon: "",
  });

  const [locationFormData, setLocationFormData] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    lat: -7.3505,
    lng: 108.2201,
    workingHours: "",
    isMain: false,
    isActive: true,
  });

  const contactTypes = [
    { value: "phone", label: "Telepon", icon: Phone },
    { value: "email", label: "Email", icon: Mail },
    { value: "address", label: "Alamat", icon: MapPin },
    { value: "hours", label: "Jam Operasional", icon: Clock },
    { value: "social", label: "Media Sosial", icon: ExternalLink },
  ];

  // Mock data
  useEffect(() => {
    const mockContactInfos: ContactInfo[] = [
      {
        id: "1",
        type: "phone",
        label: "Telepon Utama",
        value: "(0265) 123456",
        description: "Nomor telepon kantor pusat DLH",
        isPublic: true,
        isPrimary: true,
        order: 1,
        icon: "phone",
      },
      {
        id: "2",
        type: "email",
        label: "Email Resmi",
        value: "info@dlh.tasikmalayakota.go.id",
        description: "Email resmi untuk komunikasi umum",
        isPublic: true,
        isPrimary: true,
        order: 3,
        icon: "mail",
      },
    ];

    const mockOfficeLocations: OfficeLocation[] = [
      {
        id: "1",
        name: "Kantor Pusat DLH Tasikmalaya",
        address:
          "Jl. Sutisna Senjaya No. 1, Kota Tasikmalaya, Jawa Barat 46116",
        phone: "(0265) 123456",
        email: "info@dlh.tasikmalayakota.go.id",
        mapCoordinates: {
          lat: -7.3505,
          lng: 108.2201,
        },
        workingHours: "Senin - Jumat: 08:00 - 16:00 WIB",
        isMain: true,
        isActive: true,
      },
    ];

    setContactInfos(mockContactInfos);
    setOfficeLocations(mockOfficeLocations);
  }, []);

  const handleEdit = (item: any, type: "contact" | "location") => {
    setEditingItem(item);
    setEditingType(type);

    if (type === "contact") {
      setContactFormData({
        type: item.type,
        label: item.label,
        value: item.value,
        description: item.description || "",
        isPublic: item.isPublic,
        isPrimary: item.isPrimary,
        order: item.order,
        icon: item.icon || "",
      });
    } else if (type === "location") {
      setLocationFormData({
        name: item.name,
        address: item.address,
        phone: item.phone,
        email: item.email,
        lat: item.mapCoordinates.lat,
        lng: item.mapCoordinates.lng,
        workingHours: item.workingHours,
        isMain: item.isMain,
        isActive: item.isActive,
      });
    }

    setShowModal(true);
  };

  const handleAdd = (type: "contact" | "location") => {
    setEditingItem(null);
    setEditingType(type);

    if (type === "contact") {
      setContactFormData({
        type: "phone",
        label: "",
        value: "",
        description: "",
        isPublic: true,
        isPrimary: false,
        order: contactInfos.length + 1,
        icon: "",
      });
    } else if (type === "location") {
      setLocationFormData({
        name: "",
        address: "",
        phone: "",
        email: "",
        lat: -7.3505,
        lng: 108.2201,
        workingHours: "",
        isMain: false,
        isActive: true,
      });
    }

    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (editingType === "contact") {
        const newContact: ContactInfo = {
          id: editingItem?.id || Date.now().toString(),
          ...contactFormData,
        };

        if (editingItem) {
          setContactInfos((prev) =>
            prev.map((c) => (c.id === editingItem.id ? newContact : c))
          );
        } else {
          setContactInfos((prev) => [...prev, newContact]);
        }
      } else if (editingType === "location") {
        const newLocation: OfficeLocation = {
          id: editingItem?.id || Date.now().toString(),
          ...locationFormData,
          mapCoordinates: {
            lat: locationFormData.lat,
            lng: locationFormData.lng,
          },
        };

        if (editingItem) {
          setOfficeLocations((prev) =>
            prev.map((l) => (l.id === editingItem.id ? newLocation : l))
          );
        } else {
          setOfficeLocations((prev) => [...prev, newLocation]);
        }
      }

      setShowModal(false);
      setEditingItem(null);
      alert("Data berhasil disimpan!");
    } catch (error) {
      console.error("Error saving data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, type: "contact" | "location") => {
    if (!confirm("Apakah Anda yakin ingin menghapus item ini?")) return;

    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      if (type === "contact") {
        setContactInfos((prev) => prev.filter((c) => c.id !== id));
      } else if (type === "location") {
        setOfficeLocations((prev) => prev.filter((l) => l.id !== id));
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    } finally {
      setLoading(false);
    }
  };

  const getIconComponent = (iconName: string) => {
    const icons: { [key: string]: any } = {
      phone: Phone,
      mail: Mail,
      "map-pin": MapPin,
      clock: Clock,
      facebook: Facebook,
      instagram: Instagram,
      twitter: Twitter,
      youtube: Youtube,
    };
    return icons[iconName] || Phone;
  };

  return (
    <div className="space-y-6">
      {/* Info */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
          <div className="text-sm text-blue-800 dark:text-blue-200">
            <p className="font-medium mb-1">Informasi Kontak & Lokasi</p>
            <p>
              Kelola informasi kontak dan lokasi kantor DLH yang akan
              ditampilkan di website dan halaman kontak.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setContactActiveTab("info")}
              className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                contactActiveTab === "info"
                  ? "border-blue-500 text-blue-600 dark:text-blue-400"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
              }`}
            >
              <Phone className="w-4 h-4" />
              Info Kontak
            </button>
            <button
              onClick={() => setContactActiveTab("locations")}
              className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                contactActiveTab === "locations"
                  ? "border-blue-500 text-blue-600 dark:text-blue-400"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
              }`}
            >
              <MapPin className="w-4 h-4" />
              Lokasi Kantor
            </button>
          </nav>
        </div>

        {/* Contact Info Tab */}
        {contactActiveTab === "info" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                Informasi Kontak
              </h3>
              <button
                onClick={() => handleAdd("contact")}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2"
              >
                <Plus size={16} />
                Tambah Kontak
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {contactInfos
                .sort((a, b) => a.order - b.order)
                .map((contact) => {
                  const IconComponent = getIconComponent(
                    contact.icon || "phone"
                  );
                  return (
                    <div
                      key={contact.id}
                      className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 border border-gray-200 dark:border-gray-600"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                            <IconComponent className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-800 dark:text-white">
                              {contact.label}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {
                                contactTypes.find(
                                  (t) => t.value === contact.type
                                )?.label
                              }
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          {contact.isPrimary && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                              Utama
                            </span>
                          )}
                          {contact.isPublic && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                              Publik
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-gray-700 dark:text-gray-300 font-medium mb-1">
                          {contact.value}
                        </p>
                        {contact.description && (
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {contact.description}
                          </p>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(contact, "contact")}
                          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1"
                        >
                          <Edit3 size={14} />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(contact.id, "contact")}
                          className="flex-1 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1"
                        >
                          <Trash2 size={14} />
                          Hapus
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}

        {/* Office Locations Tab */}
        {contactActiveTab === "locations" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                Lokasi Kantor
              </h3>
              <button
                onClick={() => handleAdd("location")}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2"
              >
                <Plus size={16} />
                Tambah Lokasi
              </button>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {officeLocations.map((location) => (
                <div
                  key={location.id}
                  className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 border border-gray-200 dark:border-gray-600"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold text-gray-800 dark:text-white">
                          {location.name}
                        </h4>
                        <div className="flex gap-1">
                          {location.isMain && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                              Kantor Utama
                            </span>
                          )}
                          {location.isActive && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                              Aktif
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                        <span className="text-gray-700 dark:text-gray-300 text-sm">
                          {location.address}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-700 dark:text-gray-300 text-sm">
                          {location.phone}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-700 dark:text-gray-300 text-sm">
                          {location.email}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-700 dark:text-gray-300 text-sm">
                          {location.workingHours}
                        </span>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        Koordinat Peta:
                      </p>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        Lat: {location.mapCoordinates.lat}, Lng:{" "}
                        {location.mapCoordinates.lng}
                      </p>
                      <button
                        onClick={() =>
                          window.open(
                            `https://maps.google.com/?q=${location.mapCoordinates.lat},${location.mapCoordinates.lng}`,
                            "_blank"
                          )
                        }
                        className="mt-2 text-blue-600 dark:text-blue-400 text-sm hover:underline flex items-center gap-1"
                      >
                        <ExternalLink className="w-3 h-3" />
                        Lihat di Google Maps
                      </button>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-6">
                    <button
                      onClick={() => handleEdit(location, "location")}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1"
                    >
                      <Edit3 size={14} />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(location.id, "location")}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1"
                    >
                      <Trash2 size={14} />
                      Hapus
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {editingItem ? "Edit" : "Tambah"}{" "}
                  {editingType === "contact" ? "Kontak" : "Lokasi"}
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                {editingType === "contact" && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Tipe Kontak
                        </label>
                        <select
                          value={contactFormData.type}
                          onChange={(e) =>
                            setContactFormData((prev) => ({
                              ...prev,
                              type: e.target.value as ContactInfo["type"],
                            }))
                          }
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                          required
                        >
                          {contactTypes.map((type) => (
                            <option key={type.value} value={type.value}>
                              {type.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Label
                        </label>
                        <input
                          type="text"
                          value={contactFormData.label}
                          onChange={(e) =>
                            setContactFormData((prev) => ({
                              ...prev,
                              label: e.target.value,
                            }))
                          }
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                          placeholder="Label kontak"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Nilai
                      </label>
                      <input
                        type="text"
                        value={contactFormData.value}
                        onChange={(e) =>
                          setContactFormData((prev) => ({
                            ...prev,
                            value: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        placeholder="Nilai kontak (nomor, email, alamat, dll)"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Deskripsi
                      </label>
                      <textarea
                        value={contactFormData.description}
                        onChange={(e) =>
                          setContactFormData((prev) => ({
                            ...prev,
                            description: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        placeholder="Deskripsi kontak"
                        rows={3}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Urutan
                        </label>
                        <input
                          type="number"
                          value={contactFormData.order}
                          onChange={(e) =>
                            setContactFormData((prev) => ({
                              ...prev,
                              order: parseInt(e.target.value),
                            }))
                          }
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                          min="1"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="isPublic"
                          checked={contactFormData.isPublic}
                          onChange={(e) =>
                            setContactFormData((prev) => ({
                              ...prev,
                              isPublic: e.target.checked,
                            }))
                          }
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label
                          htmlFor="isPublic"
                          className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                        >
                          Tampilkan di publik
                        </label>
                      </div>

                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="isPrimary"
                          checked={contactFormData.isPrimary}
                          onChange={(e) =>
                            setContactFormData((prev) => ({
                              ...prev,
                              isPrimary: e.target.checked,
                            }))
                          }
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label
                          htmlFor="isPrimary"
                          className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                        >
                          Kontak utama
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <Save size={16} />
                    )}
                    {loading ? "Menyimpan..." : "Simpan"}
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

// Language Tab Component
function LanguageTab() {
  interface TranslationEntry {
    id: string;
    key: string;
    category: string;
    description: string;
    translations: {
      [languageCode: string]: string;
    };
    isEditable: boolean;
    lastUpdated: string;
  }

  interface Language {
    code: string;
    name: string;
    nativeName: string;
    isActive: boolean;
    isDefault: boolean;
    flag: string;
  }

  interface TranslationCategory {
    id: string;
    name: string;
    description: string;
    entryCount: number;
    isActive: boolean;
  }

  const [languages, setLanguages] = useState<Language[]>([]);
  const [categories, setCategories] = useState<TranslationCategory[]>([]);
  const [translations, setTranslations] = useState<TranslationEntry[]>([]);
  const [filteredTranslations, setFilteredTranslations] = useState<
    TranslationEntry[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "translations" | "languages" | "categories"
  >("translations");

  // Modals and forms
  const [showTranslationModal, setShowTranslationModal] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [editingTranslation, setEditingTranslation] =
    useState<TranslationEntry | null>(null);
  const [editingLanguage, setEditingLanguage] = useState<Language | null>(null);
  const [editingCategory, setEditingCategory] =
    useState<TranslationCategory | null>(null);

  // Filters and search
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const [translationFormData, setTranslationFormData] = useState({
    key: "",
    category: "",
    description: "",
    translations: {} as { [key: string]: string },
  });

  const [languageFormData, setLanguageFormData] = useState({
    code: "",
    name: "",
    nativeName: "",
    isActive: true,
    isDefault: false,
    flag: "",
  });

  const [categoryFormData, setCategoryFormData] = useState({
    name: "",
    description: "",
    isActive: true,
  });

  // Mock data initialization
  useEffect(() => {
    const mockLanguages: Language[] = [
      {
        code: "id",
        name: "Indonesian",
        nativeName: "Bahasa Indonesia",
        isActive: true,
        isDefault: true,
        flag: "🇮🇩",
      },
      {
        code: "en",
        name: "English",
        nativeName: "English",
        isActive: true,
        isDefault: false,
        flag: "🇺🇸",
      },
      {
        code: "su",
        name: "Sundanese",
        nativeName: "Basa Sunda",
        isActive: false,
        isDefault: false,
        flag: "🏴",
      },
    ];

    const mockCategories: TranslationCategory[] = [
      {
        id: "1",
        name: "Navigation",
        description: "Menu navigasi dan link",
        entryCount: 15,
        isActive: true,
      },
      {
        id: "2",
        name: "Common",
        description: "Teks umum yang sering digunakan",
        entryCount: 32,
        isActive: true,
      },
      {
        id: "3",
        name: "Forms",
        description: "Label form dan pesan validasi",
        entryCount: 28,
        isActive: true,
      },
      {
        id: "4",
        name: "Messages",
        description: "Pesan sistem dan notifikasi",
        entryCount: 19,
        isActive: true,
      },
      {
        id: "5",
        name: "Footer",
        description: "Konten footer website",
        entryCount: 8,
        isActive: true,
      },
    ];

    const mockTranslations: TranslationEntry[] = [
      {
        id: "1",
        key: "nav.home",
        category: "Navigation",
        description: "Label menu beranda",
        translations: {
          id: "Beranda",
          en: "Home",
          su: "Imah",
        },
        isEditable: true,
        lastUpdated: "2024-01-15",
      },
      {
        id: "2",
        key: "nav.profile",
        category: "Navigation",
        description: "Label menu profil",
        translations: {
          id: "Profil",
          en: "Profile",
          su: "Profil",
        },
        isEditable: true,
        lastUpdated: "2024-01-15",
      },
      {
        id: "3",
        key: "nav.services",
        category: "Navigation",
        description: "Label menu layanan",
        translations: {
          id: "Layanan",
          en: "Services",
          su: "Layanan",
        },
        isEditable: true,
        lastUpdated: "2024-01-15",
      },
      {
        id: "4",
        key: "common.save",
        category: "Common",
        description: "Tombol simpan",
        translations: {
          id: "Simpan",
          en: "Save",
          su: "Simpen",
        },
        isEditable: true,
        lastUpdated: "2024-01-15",
      },
      {
        id: "5",
        key: "common.cancel",
        category: "Common",
        description: "Tombol batal",
        translations: {
          id: "Batal",
          en: "Cancel",
          su: "Batalkeun",
        },
        isEditable: true,
        lastUpdated: "2024-01-15",
      },
      {
        id: "6",
        key: "form.name.required",
        category: "Forms",
        description: "Pesan validasi nama wajib diisi",
        translations: {
          id: "Nama wajib diisi",
          en: "Name is required",
          su: "Nami kedah dieusian",
        },
        isEditable: true,
        lastUpdated: "2024-01-15",
      },
      {
        id: "7",
        key: "message.success.save",
        category: "Messages",
        description: "Pesan berhasil menyimpan",
        translations: {
          id: "Data berhasil disimpan",
          en: "Data successfully saved",
          su: "Data hasil disimpen",
        },
        isEditable: true,
        lastUpdated: "2024-01-15",
      },
      {
        id: "8",
        key: "footer.contact.title",
        category: "Footer",
        description: "Judul kontak di footer",
        translations: {
          id: "Hubungi Kami",
          en: "Contact Us",
          su: "Kontak Kami",
        },
        isEditable: true,
        lastUpdated: "2024-01-15",
      },
    ];

    setLanguages(mockLanguages);
    setCategories(mockCategories);
    setTranslations(mockTranslations);
    setFilteredTranslations(mockTranslations);

    // Initialize translation form with all active languages
    const initialTranslations: { [key: string]: string } = {};
    mockLanguages
      .filter((lang) => lang.isActive)
      .forEach((lang) => {
        initialTranslations[lang.code] = "";
      });
    setTranslationFormData((prev) => ({
      ...prev,
      translations: initialTranslations,
    }));
  }, []);

  // Filter translations based on search and filters
  useEffect(() => {
    let filtered = translations;

    if (searchTerm) {
      filtered = filtered.filter(
        (t) =>
          t.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
          t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          Object.values(t.translations).some((trans) =>
            trans.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter((t) => t.category === selectedCategory);
    }

    setFilteredTranslations(filtered);
  }, [searchTerm, selectedCategory, translations]);

  const handleEditTranslation = (translation: TranslationEntry) => {
    setEditingTranslation(translation);
    setTranslationFormData({
      key: translation.key,
      category: translation.category,
      description: translation.description,
      translations: { ...translation.translations },
    });
    setShowTranslationModal(true);
  };

  const handleAddTranslation = () => {
    setEditingTranslation(null);
    const initialTranslations: { [key: string]: string } = {};
    languages
      .filter((lang) => lang.isActive)
      .forEach((lang) => {
        initialTranslations[lang.code] = "";
      });
    setTranslationFormData({
      key: "",
      category: categories[0]?.name || "",
      description: "",
      translations: initialTranslations,
    });
    setShowTranslationModal(true);
  };

  const handleSubmitTranslation = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (editingTranslation) {
        setTranslations((prev) =>
          prev.map((t) =>
            t.id === editingTranslation.id
              ? {
                  ...t,
                  ...translationFormData,
                  lastUpdated: new Date().toISOString().split("T")[0],
                }
              : t
          )
        );
      } else {
        const newTranslation: TranslationEntry = {
          id: Date.now().toString(),
          ...translationFormData,
          isEditable: true,
          lastUpdated: new Date().toISOString().split("T")[0],
        };
        setTranslations((prev) => [...prev, newTranslation]);
      }

      setShowTranslationModal(false);
      setEditingTranslation(null);
      alert("Terjemahan berhasil disimpan!");
    } catch (error) {
      console.error("Error saving translation:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTranslation = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus terjemahan ini?")) return;

    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setTranslations((prev) => prev.filter((t) => t.id !== id));
    } catch (error) {
      console.error("Error deleting translation:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitLanguage = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (editingLanguage) {
        setLanguages((prev) =>
          prev.map((l) =>
            l.code === editingLanguage.code ? languageFormData : l
          )
        );
      } else {
        setLanguages((prev) => [...prev, languageFormData]);
      }

      setShowLanguageModal(false);
      setEditingLanguage(null);
      alert("Bahasa berhasil disimpan!");
    } catch (error) {
      console.error("Error saving language:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (editingCategory) {
        setCategories((prev) =>
          prev.map((c) =>
            c.id === editingCategory.id
              ? { ...editingCategory, ...categoryFormData }
              : c
          )
        );
      } else {
        const newCategory: TranslationCategory = {
          id: Date.now().toString(),
          ...categoryFormData,
          entryCount: 0,
        };
        setCategories((prev) => [...prev, newCategory]);
      }

      setShowCategoryModal(false);
      setEditingCategory(null);
      alert("Kategori berhasil disimpan!");
    } catch (error) {
      console.error("Error saving category:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleExportTranslations = () => {
    const dataStr = JSON.stringify(translations, null, 2);
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);
    const exportFileDefaultName = "translations.json";
    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="space-y-6">
      {/* Info */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
          <div className="text-sm text-blue-800 dark:text-blue-200">
            <p className="font-medium mb-1">Manajemen Bahasa & Terjemahan</p>
            <p>
              Kelola berbagai bahasa yang tersedia di website dan terjemahan
              konten untuk setiap bahasa.
            </p>
          </div>
        </div>
      </div>

      {/* Translation Management Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab("translations")}
              className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                activeTab === "translations"
                  ? "border-blue-500 text-blue-600 dark:text-blue-400"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
              }`}
            >
              <FileText className="w-4 h-4" />
              Terjemahan
            </button>
            <button
              onClick={() => setActiveTab("languages")}
              className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                activeTab === "languages"
                  ? "border-blue-500 text-blue-600 dark:text-blue-400"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
              }`}
            >
              <Languages className="w-4 h-4" />
              Bahasa
            </button>
            <button
              onClick={() => setActiveTab("categories")}
              className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                activeTab === "categories"
                  ? "border-blue-500 text-blue-600 dark:text-blue-400"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
              }`}
            >
              <Globe className="w-4 h-4" />
              Kategori
            </button>
          </nav>
        </div>

        {/* Translations Tab */}
        {activeTab === "translations" && (
          <div className="space-y-6">
            {/* Controls */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Cari terjemahan..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white w-64"
                  />
                </div>

                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="">Semua Kategori</option>
                  {categories
                    .filter((c) => c.isActive)
                    .map((category) => (
                      <option key={category.id} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                </select>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleExportTranslations}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
                >
                  <Download size={16} />
                  Export
                </button>
                <button
                  onClick={handleAddTranslation}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2"
                >
                  <Plus size={16} />
                  Tambah Terjemahan
                </button>
              </div>
            </div>

            {/* Translations Table */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl shadow-lg border border-gray-200 dark:border-gray-600 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-100 dark:bg-gray-600">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Key
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Kategori
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Deskripsi
                      </th>
                      {languages
                        .filter((lang) => lang.isActive)
                        .map((lang) => (
                          <th
                            key={lang.code}
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                          >
                            {lang.flag} {lang.code.toUpperCase()}
                          </th>
                        ))}
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-700 divide-y divide-gray-200 dark:divide-gray-600">
                    {filteredTranslations.map((translation) => (
                      <tr
                        key={translation.id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-600"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {translation.key}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                            {translation.category}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 dark:text-white max-w-xs truncate">
                            {translation.description}
                          </div>
                        </td>
                        {languages
                          .filter((lang) => lang.isActive)
                          .map((lang) => (
                            <td key={lang.code} className="px-6 py-4">
                              <div className="text-sm text-gray-900 dark:text-white max-w-xs truncate">
                                {translation.translations[lang.code] || "-"}
                              </div>
                            </td>
                          ))}
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => handleEditTranslation(translation)}
                              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm font-medium transition-colors flex items-center gap-1"
                            >
                              <Edit3 size={12} />
                              Edit
                            </button>
                            <button
                              onClick={() =>
                                handleDeleteTranslation(translation.id)
                              }
                              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm font-medium transition-colors flex items-center gap-1"
                            >
                              <Trash2 size={12} />
                              Hapus
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Languages Tab */}
        {activeTab === "languages" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                Pengaturan Bahasa
              </h3>
              <button
                onClick={() => {
                  setEditingLanguage(null);
                  setLanguageFormData({
                    code: "",
                    name: "",
                    nativeName: "",
                    isActive: true,
                    isDefault: false,
                    flag: "",
                  });
                  setShowLanguageModal(true);
                }}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2"
              >
                <Plus size={16} />
                Tambah Bahasa
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {languages.map((language) => (
                <div
                  key={language.code}
                  className="bg-gray-50 dark:bg-gray-700 rounded-xl shadow-lg border border-gray-200 dark:border-gray-600 p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{language.flag}</span>
                      <div>
                        <h4 className="font-semibold text-gray-800 dark:text-white">
                          {language.name}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {language.nativeName}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-500">
                          Code: {language.code}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    {language.isActive && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                        Aktif
                      </span>
                    )}
                    {language.isDefault && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                        Default
                      </span>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditingLanguage(language);
                        setLanguageFormData(language);
                        setShowLanguageModal(true);
                      }}
                      className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1"
                    >
                      <Edit3 size={14} />
                      Edit
                    </button>
                    {!language.isDefault && (
                      <button
                        onClick={async () => {
                          if (
                            !confirm(
                              "Apakah Anda yakin ingin menghapus bahasa ini?"
                            )
                          )
                            return;
                          setLanguages((prev) =>
                            prev.filter((l) => l.code !== language.code)
                          );
                        }}
                        className="flex-1 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1"
                      >
                        <Trash2 size={14} />
                        Hapus
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Categories Tab */}
        {activeTab === "categories" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                Kategori Terjemahan
              </h3>
              <button
                onClick={() => {
                  setEditingCategory(null);
                  setCategoryFormData({
                    name: "",
                    description: "",
                    isActive: true,
                  });
                  setShowCategoryModal(true);
                }}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2"
              >
                <Plus size={16} />
                Tambah Kategori
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="bg-gray-50 dark:bg-gray-700 rounded-xl shadow-lg border border-gray-200 dark:border-gray-600 p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-white">
                        {category.name}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {category.description}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                        {category.entryCount} entri terjemahan
                      </p>
                    </div>
                    {category.isActive && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                        Aktif
                      </span>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditingCategory(category);
                        setCategoryFormData({
                          name: category.name,
                          description: category.description,
                          isActive: category.isActive,
                        });
                        setShowCategoryModal(true);
                      }}
                      className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1"
                    >
                      <Edit3 size={14} />
                      Edit
                    </button>
                    <button
                      onClick={async () => {
                        if (
                          !confirm(
                            "Apakah Anda yakin ingin menghapus kategori ini?"
                          )
                        )
                          return;
                        setCategories((prev) =>
                          prev.filter((c) => c.id !== category.id)
                        );
                      }}
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1"
                    >
                      <Trash2 size={14} />
                      Hapus
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Translation Modal */}
        {showTranslationModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {editingTranslation ? "Edit Terjemahan" : "Tambah Terjemahan"}
                </h3>
                <button
                  onClick={() => setShowTranslationModal(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmitTranslation}>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Translation Key
                      </label>
                      <input
                        type="text"
                        value={translationFormData.key}
                        onChange={(e) =>
                          setTranslationFormData((prev) => ({
                            ...prev,
                            key: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        placeholder="Contoh: nav.home"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Kategori
                      </label>
                      <select
                        value={translationFormData.category}
                        onChange={(e) =>
                          setTranslationFormData((prev) => ({
                            ...prev,
                            category: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        required
                      >
                        {categories
                          .filter((c) => c.isActive)
                          .map((category) => (
                            <option key={category.id} value={category.name}>
                              {category.name}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Deskripsi
                    </label>
                    <textarea
                      value={translationFormData.description}
                      onChange={(e) =>
                        setTranslationFormData((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Deskripsi penggunaan terjemahan ini"
                      rows={2}
                      required
                    />
                  </div>

                  <div>
                    <h4 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-3">
                      Terjemahan per Bahasa
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {languages
                        .filter((lang) => lang.isActive)
                        .map((lang) => (
                          <div key={lang.code}>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              {lang.flag} {lang.name} ({lang.code})
                              {lang.isDefault && (
                                <span className="ml-2 text-xs text-blue-600 dark:text-blue-400">
                                  (Default)
                                </span>
                              )}
                            </label>
                            <input
                              type="text"
                              value={
                                translationFormData.translations[lang.code] ||
                                ""
                              }
                              onChange={(e) =>
                                setTranslationFormData((prev) => ({
                                  ...prev,
                                  translations: {
                                    ...prev.translations,
                                    [lang.code]: e.target.value,
                                  },
                                }))
                              }
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                              placeholder={`Terjemahan dalam ${lang.name}`}
                              required={lang.isDefault}
                            />
                          </div>
                        ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowTranslationModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <Save size={16} />
                    )}
                    {loading ? "Menyimpan..." : "Simpan"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Language Modal */}
        {showLanguageModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {editingLanguage ? "Edit Bahasa" : "Tambah Bahasa"}
                </h3>
                <button
                  onClick={() => setShowLanguageModal(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmitLanguage}>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Kode Bahasa
                      </label>
                      <input
                        type="text"
                        value={languageFormData.code}
                        onChange={(e) =>
                          setLanguageFormData((prev) => ({
                            ...prev,
                            code: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        placeholder="id, en, su"
                        maxLength={2}
                        required
                        disabled={!!editingLanguage}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Nama Bahasa
                      </label>
                      <input
                        type="text"
                        value={languageFormData.name}
                        onChange={(e) =>
                          setLanguageFormData((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        placeholder="Indonesian"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Nama Asli
                      </label>
                      <input
                        type="text"
                        value={languageFormData.nativeName}
                        onChange={(e) =>
                          setLanguageFormData((prev) => ({
                            ...prev,
                            nativeName: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        placeholder="Bahasa Indonesia"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Emoji Bendera
                      </label>
                      <input
                        type="text"
                        value={languageFormData.flag}
                        onChange={(e) =>
                          setLanguageFormData((prev) => ({
                            ...prev,
                            flag: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        placeholder="🇮🇩"
                        maxLength={2}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="isActive"
                        checked={languageFormData.isActive}
                        onChange={(e) =>
                          setLanguageFormData((prev) => ({
                            ...prev,
                            isActive: e.target.checked,
                          }))
                        }
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label
                        htmlFor="isActive"
                        className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                      >
                        Aktifkan bahasa ini
                      </label>
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="isDefault"
                        checked={languageFormData.isDefault}
                        onChange={(e) =>
                          setLanguageFormData((prev) => ({
                            ...prev,
                            isDefault: e.target.checked,
                          }))
                        }
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label
                        htmlFor="isDefault"
                        className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                      >
                        Jadikan bahasa default
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowLanguageModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <Save size={16} />
                    )}
                    {loading ? "Menyimpan..." : "Simpan"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Category Modal */}
        {showCategoryModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {editingCategory ? "Edit Kategori" : "Tambah Kategori"}
                </h3>
                <button
                  onClick={() => setShowCategoryModal(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmitCategory}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Nama Kategori
                    </label>
                    <input
                      type="text"
                      value={categoryFormData.name}
                      onChange={(e) =>
                        setCategoryFormData((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Navigation"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Deskripsi
                    </label>
                    <textarea
                      value={categoryFormData.description}
                      onChange={(e) =>
                        setCategoryFormData((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Deskripsi kategori terjemahan"
                      rows={3}
                      required
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="categoryIsActive"
                      checked={categoryFormData.isActive}
                      onChange={(e) =>
                        setCategoryFormData((prev) => ({
                          ...prev,
                          isActive: e.target.checked,
                        }))
                      }
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="categoryIsActive"
                      className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                    >
                      Aktifkan kategori ini
                    </label>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowCategoryModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <Save size={16} />
                    )}
                    {loading ? "Menyimpan..." : "Simpan"}
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

// Social Media Tab Component
function SocialMediaTab() {
  const [socialSettings, setSocialSettings] = useState({
    facebook: "https://facebook.com/dlhtasikmalaya",
    instagram: "https://instagram.com/dlhtasikmalaya",
    twitter: "https://twitter.com/dlhtasikmalaya",
    youtube: "https://youtube.com/dlhtasikmalaya",
    tiktok: "https://tiktok.com/@dlhtasikmalaya",
    whatsapp: "+6285123456789",
    showSocialLinks: true,
    socialShareButtons: true,
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Social Media Settings saved:", socialSettings);
      alert("Pengaturan media sosial berhasil disimpan!");
    } catch (error) {
      console.error("Error saving social media settings:", error);
      alert("Gagal menyimpan pengaturan media sosial");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Info */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
          <div className="text-sm text-blue-800 dark:text-blue-200">
            <p className="font-medium mb-1">Pengaturan Media Sosial</p>
            <p>
              Kelola link dan pengaturan media sosial yang akan ditampilkan di
              website dan footer.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Share2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Akun Media Sosial
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Facebook className="w-4 h-4 inline mr-2" />
                Facebook
              </label>
              <input
                type="url"
                value={socialSettings.facebook}
                onChange={(e) =>
                  setSocialSettings((prev) => ({
                    ...prev,
                    facebook: e.target.value,
                  }))
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="https://facebook.com/dlhtasikmalaya"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Instagram className="w-4 h-4 inline mr-2" />
                Instagram
              </label>
              <input
                type="url"
                value={socialSettings.instagram}
                onChange={(e) =>
                  setSocialSettings((prev) => ({
                    ...prev,
                    instagram: e.target.value,
                  }))
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="https://instagram.com/dlhtasikmalaya"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Twitter className="w-4 h-4 inline mr-2" />
                Twitter/X
              </label>
              <input
                type="url"
                value={socialSettings.twitter}
                onChange={(e) =>
                  setSocialSettings((prev) => ({
                    ...prev,
                    twitter: e.target.value,
                  }))
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="https://twitter.com/dlhtasikmalaya"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Youtube className="w-4 h-4 inline mr-2" />
                YouTube
              </label>
              <input
                type="url"
                value={socialSettings.youtube}
                onChange={(e) =>
                  setSocialSettings((prev) => ({
                    ...prev,
                    youtube: e.target.value,
                  }))
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="https://youtube.com/dlhtasikmalaya"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                TikTok
              </label>
              <input
                type="url"
                value={socialSettings.tiktok}
                onChange={(e) =>
                  setSocialSettings((prev) => ({
                    ...prev,
                    tiktok: e.target.value,
                  }))
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="https://tiktok.com/@dlhtasikmalaya"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                WhatsApp
              </label>
              <input
                type="tel"
                value={socialSettings.whatsapp}
                onChange={(e) =>
                  setSocialSettings((prev) => ({
                    ...prev,
                    whatsapp: e.target.value,
                  }))
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="+6285123456789"
              />
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              Pengaturan Tambahan
            </h3>

            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="showSocialLinks"
                  checked={socialSettings.showSocialLinks}
                  onChange={(e) =>
                    setSocialSettings((prev) => ({
                      ...prev,
                      showSocialLinks: e.target.checked,
                    }))
                  }
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="showSocialLinks"
                  className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                >
                  Tampilkan link media sosial di footer website
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="socialShareButtons"
                  checked={socialSettings.socialShareButtons}
                  onChange={(e) =>
                    setSocialSettings((prev) => ({
                      ...prev,
                      socialShareButtons: e.target.checked,
                    }))
                  }
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="socialShareButtons"
                  className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                >
                  Tampilkan tombol share media sosial di artikel/berita
                </label>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2"
            >
              {loading ? (
                <RefreshCw className="w-5 h-5 animate-spin" />
              ) : (
                <Save size={20} />
              )}
              {loading ? "Menyimpan..." : "Simpan Pengaturan Social Media"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function AdminPengaturan() {
  const [activeTab, setActiveTab] = useState<
    "logo" | "seo" | "kontak" | "bahasa" | "social"
  >("logo");

  const [logoSettings, setLogoSettings] = useState<LogoSettings>({
    logoHeader: "/logo-white-footer.png",
    logoFooter: "/logo-white-footer.png",
    siteName: "Dinas Lingkungan Hidup Kota Tasikmalaya",
    siteDescription: "Website resmi Dinas Lingkungan Hidup Kota Tasikmalaya",
  });

  const [logoLoading, setLogoLoading] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null);

  useEffect(() => {
    fetchLogoSettings();
  }, []);

  const fetchLogoSettings = async () => {
    try {
      const response = await fetch("/api/settings");
      const data = await response.json();

      if (data.success) {
        const settingsMap = data.data.reduce(
          (acc: SettingsMap, setting: Setting) => {
            acc[setting.key] = setting.value;
            return acc;
          },
          {}
        );

        setLogoSettings({
          logoHeader: settingsMap.logo_header || logoSettings.logoHeader,
          logoFooter: settingsMap.logo_footer || logoSettings.logoFooter,
          siteName: settingsMap.site_name || logoSettings.siteName,
          siteDescription:
            settingsMap.site_description || logoSettings.siteDescription,
        });
      }
    } catch (error) {
      console.error("Error fetching logo settings:", error);
    }
  };

  const handleImageUpload = async (settingKey: string, file: File) => {
    setUploading(settingKey);

    try {
      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/jpg",
        "image/webp",
      ];
      if (!allowedTypes.includes(file.type)) {
        alert("Format file tidak didukung. Gunakan JPG, PNG, atau WEBP.");
        return;
      }

      if (file.size > 2 * 1024 * 1024) {
        alert("Ukuran file terlalu besar. Maksimal 2MB.");
        return;
      }

      const formData = new FormData();
      formData.append("image", file);
      formData.append(
        "type",
        settingKey.includes("header") ? "logo-header" : "logo-footer"
      );

      const uploadResponse = await fetch("/api/upload/image", {
        method: "POST",
        body: formData,
      });

      const uploadData = await uploadResponse.json();

      if (uploadData.success) {
        await updateLogoSetting(settingKey, uploadData.data.url);
        await fetchLogoSettings();
      } else {
        alert("Gagal mengupload gambar: " + uploadData.error);
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Terjadi kesalahan saat mengupload gambar");
    } finally {
      setUploading(null);
    }
  };

  const updateLogoSetting = async (key: string, value: string) => {
    try {
      const response = await fetch("/api/settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          key,
          value,
          label:
            key === "logo_header"
              ? "Logo Header"
              : key === "logo_footer"
              ? "Logo Footer"
              : key === "site_name"
              ? "Nama Situs"
              : "Deskripsi Situs",
        }),
      });

      const data = await response.json();

      if (data.success) {
        setLogoSettings((prev) => ({
          ...prev,
          [key === "logo_header"
            ? "logoHeader"
            : key === "logo_footer"
            ? "logoFooter"
            : key === "site_name"
            ? "siteName"
            : "siteDescription"]: value,
        }));

        await fetchLogoSettings();
        alert("Pengaturan berhasil disimpan!");
      } else {
        alert("Gagal menyimpan pengaturan: " + data.error);
      }
    } catch (error) {
      console.error("Error updating setting:", error);
      alert("Terjadi kesalahan saat menyimpan pengaturan");
    }
  };

  const handleLogoSettingsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLogoLoading(true);

    try {
      await updateLogoSetting("site_name", logoSettings.siteName);
      await updateLogoSetting("site_description", logoSettings.siteDescription);
    } catch (error) {
      console.error("Error saving logo settings:", error);
    } finally {
      setLogoLoading(false);
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
                Pengaturan Website
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Kelola semua pengaturan website, SEO, kontak, dan terjemahan
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
                onClick={() => setActiveTab("kontak")}
                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                  activeTab === "kontak"
                    ? "border-blue-500 text-blue-600 dark:text-blue-400"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
                }`}
              >
                <Phone className="w-4 h-4" />
                Kontak & Lokasi
              </button>
              <button
                onClick={() => setActiveTab("bahasa")}
                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                  activeTab === "bahasa"
                    ? "border-blue-500 text-blue-600 dark:text-blue-400"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
                }`}
              >
                <Languages className="w-4 h-4" />
                Bahasa & Terjemahan
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
                  <p className="font-medium mb-1">Informasi Logo & Branding</p>
                  <p>
                    Upload logo header dan footer, serta atur informasi dasar
                    website. Logo akan digunakan di seluruh halaman website.
                  </p>
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
                    {logoSettings.logoHeader && (
                      <div className="flex-shrink-0">
                        <img
                          src={logoSettings.logoHeader}
                          alt="Logo Header"
                          className="w-32 h-16 object-contain bg-gray-100 dark:bg-gray-700 rounded-lg border"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <label className="cursor-pointer inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors">
                        <Upload className="w-4 h-4 mr-2" />
                        {uploading === "logo_header"
                          ? "Mengupload..."
                          : "Upload Logo Header"}
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleImageUpload("logo_header", file);
                          }}
                          disabled={uploading === "logo_header"}
                        />
                      </label>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Rekomendasi: PNG/JPG, max 2MB, rasio 4:1
                      </p>
                    </div>
                  </div>
                </div>

                {/* Logo Footer */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Logo Footer
                  </label>
                  <div className="flex items-center space-x-4">
                    {logoSettings.logoFooter && (
                      <div className="flex-shrink-0">
                        <img
                          src={logoSettings.logoFooter}
                          alt="Logo Footer"
                          className="w-32 h-16 object-contain bg-gray-100 dark:bg-gray-700 rounded-lg border"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <label className="cursor-pointer inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors">
                        <Upload className="w-4 h-4 mr-2" />
                        {uploading === "logo_footer"
                          ? "Mengupload..."
                          : "Upload Logo Footer"}
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleImageUpload("logo_footer", file);
                          }}
                          disabled={uploading === "logo_footer"}
                        />
                      </label>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Rekomendasi: PNG/JPG, max 2MB, rasio 4:1
                      </p>
                    </div>
                  </div>
                </div>

                {/* Site Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Nama Situs
                  </label>
                  <input
                    type="text"
                    value={logoSettings.siteName}
                    onChange={(e) =>
                      setLogoSettings((prev) => ({
                        ...prev,
                        siteName: e.target.value,
                      }))
                    }
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
                    onChange={(e) =>
                      setLogoSettings((prev) => ({
                        ...prev,
                        siteDescription: e.target.value,
                      }))
                    }
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white resize-none"
                    placeholder="Deskripsi singkat tentang situs web"
                    required
                  />
                </div>

                {/* Save Button */}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={logoLoading}
                    className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2"
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

        {/* SEO Tab */}
        {activeTab === "seo" && <SEOTab />}

        {/* Contact Tab */}
        {activeTab === "kontak" && <ContactTab />}

        {/* Language & Translation Tab */}
        {activeTab === "bahasa" && <LanguageTab />}

        {/* Social Media Tab */}
        {activeTab === "social" && <SocialMediaTab />}
      </div>
    </div>
  );
}
