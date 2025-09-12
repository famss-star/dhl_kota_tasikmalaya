"use client";

import { useState, useEffect } from "react";
import { 
  Save, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube,
  Plus,
  Trash2,
  RefreshCw
} from "lucide-react";

interface ContactSetting {
  id?: string;
  officeName?: string;
  address?: string;
  phone?: string;
  fax?: string;
  whatsapp?: string;
  email?: string;
  emailPrimary?: string;
  emailSecondary?: string;
  mondayThursday?: string;
  friday?: string;
  weekend?: string;
  holiday?: string;
  facebook?: string;
  twitter?: string;
  instagram?: string;
  youtube?: string;
  tiktok?: string;
  mapUrl?: string;
  latitude?: number;
  longitude?: number;
  isActive?: boolean;
}

export default function AdminKontakPage() {
  const [contactData, setContactData] = useState<ContactSetting>({
    officeName: "",
    address: "",
    phone: "",
    fax: "",
    whatsapp: "",
    email: "",
    emailPrimary: "",
    emailSecondary: "",
    mondayThursday: "",
    friday: "",
    weekend: "",
    holiday: "",
    facebook: "",
    twitter: "",
    instagram: "",
    youtube: "",
    tiktok: "",
    mapUrl: "",
    isActive: true
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchContactData();
  }, []);

  const fetchContactData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/contact-settings');
      const result = await response.json();
      
      if (result.success && result.data.length > 0) {
        // If there's existing data, use the first record
        setContactData(result.data[0]);
      }
    } catch (error) {
      console.error("Error fetching contact data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      const method = contactData.id ? 'PUT' : 'POST';
      const url = contactData.id 
        ? `/api/contact-settings/${contactData.id}`
        : '/api/contact-settings';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData),
      });

      const result = await response.json();
      
      if (result.success) {
        setContactData(result.data);
        alert('Data kontak berhasil disimpan!');
      } else {
        alert('Gagal menyimpan data: ' + result.error);
      }
    } catch (error) {
      console.error("Error saving contact data:", error);
      alert('Terjadi error saat menyimpan data');
    } finally {
      setIsSaving(false);
    }
  };

  const handleInputChange = (field: keyof ContactSetting, value: string | number) => {
    setContactData(prev => ({ ...prev, [field]: value }));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <RefreshCw className="w-8 h-8 animate-spin text-green-600" />
            <span className="ml-2 text-lg">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              Kelola Informasi Kontak
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Edit informasi kontak yang akan ditampilkan di halaman publik
            </p>
          </div>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
          >
            <Save className="w-5 h-5 mr-2" />
            {isSaving ? 'Menyimpan...' : 'Simpan'}
          </button>
        </div>

        <div className="space-y-8">
          {/* Basic Information */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
              <MapPin className="w-6 h-6 mr-2 text-green-600" />
              Informasi Dasar
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Nama Instansi
                </label>
                <input
                  type="text"
                  value={contactData.officeName || ""}
                  onChange={(e) => handleInputChange('officeName', e.target.value)}
                  placeholder="Dinas Lingkungan Hidup Kota Tasikmalaya"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Alamat Lengkap
                </label>
                <textarea
                  value={contactData.address || ""}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  rows={3}
                  placeholder="Jl. RE Martadinata No.1, Kota Tasikmalaya, Jawa Barat 46116"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
              <Phone className="w-6 h-6 mr-2 text-blue-600" />
              Informasi Kontak
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Telepon
                </label>
                <input
                  type="text"
                  value={contactData.phone || ""}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="(0265) 321234"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Fax
                </label>
                <input
                  type="text"
                  value={contactData.fax || ""}
                  onChange={(e) => handleInputChange('fax', e.target.value)}
                  placeholder="(0265) 321235"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  WhatsApp
                </label>
                <input
                  type="text"
                  value={contactData.whatsapp || ""}
                  onChange={(e) => handleInputChange('whatsapp', e.target.value)}
                  placeholder="0812-3456-7890"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Email Information */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
              <Mail className="w-6 h-6 mr-2 text-purple-600" />
              Informasi Email
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Utama
                </label>
                <input
                  type="email"
                  value={contactData.emailPrimary || ""}
                  onChange={(e) => handleInputChange('emailPrimary', e.target.value)}
                  placeholder="info@dlh.tasikmalayakota.go.id"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Alternatif
                </label>
                <input
                  type="email"
                  value={contactData.email || ""}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="dlh@tasikmalayakota.go.id"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Pengaduan
                </label>
                <input
                  type="email"
                  value={contactData.emailSecondary || ""}
                  onChange={(e) => handleInputChange('emailSecondary', e.target.value)}
                  placeholder="pengaduan@dlh.tasikmalayakota.go.id"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Operating Hours */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
              <Clock className="w-6 h-6 mr-2 text-orange-600" />
              Jam Operasional
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Senin - Kamis
                </label>
                <input
                  type="text"
                  value={contactData.mondayThursday || ""}
                  onChange={(e) => handleInputChange('mondayThursday', e.target.value)}
                  placeholder="08:00 - 16:00 WIB"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Jumat
                </label>
                <input
                  type="text"
                  value={contactData.friday || ""}
                  onChange={(e) => handleInputChange('friday', e.target.value)}
                  placeholder="08:00 - 11:30 WIB"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Sabtu - Minggu
                </label>
                <input
                  type="text"
                  value={contactData.weekend || ""}
                  onChange={(e) => handleInputChange('weekend', e.target.value)}
                  placeholder="Tutup"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Hari Libur
                </label>
                <input
                  type="text"
                  value={contactData.holiday || ""}
                  onChange={(e) => handleInputChange('holiday', e.target.value)}
                  placeholder="Tutup"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
              <Facebook className="w-6 h-6 mr-2 text-blue-600" />
              Media Sosial
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Facebook
                </label>
                <input
                  type="url"
                  value={contactData.facebook || ""}
                  onChange={(e) => handleInputChange('facebook', e.target.value)}
                  placeholder="https://facebook.com/dlhtasikmalaya"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Twitter
                </label>
                <input
                  type="url"
                  value={contactData.twitter || ""}
                  onChange={(e) => handleInputChange('twitter', e.target.value)}
                  placeholder="https://twitter.com/dlh_tasikmalaya"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Instagram
                </label>
                <input
                  type="url"
                  value={contactData.instagram || ""}
                  onChange={(e) => handleInputChange('instagram', e.target.value)}
                  placeholder="https://instagram.com/dlh.tasikmalaya"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  YouTube
                </label>
                <input
                  type="url"
                  value={contactData.youtube || ""}
                  onChange={(e) => handleInputChange('youtube', e.target.value)}
                  placeholder="https://youtube.com/c/dlhtasikmalaya"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  TikTok
                </label>
                <input
                  type="url"
                  value={contactData.tiktok || ""}
                  onChange={(e) => handleInputChange('tiktok', e.target.value)}
                  placeholder="https://tiktok.com/@dlhtasikmalaya"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Map Settings */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
              <MapPin className="w-6 h-6 mr-2 text-red-600" />
              Pengaturan Peta
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  URL Google Maps
                </label>
                <textarea
                  value={contactData.mapUrl || ""}
                  onChange={(e) => handleInputChange('mapUrl', e.target.value)}
                  rows={3}
                  placeholder="https://www.google.com/maps/embed?pb=..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Latitude
                </label>
                <input
                  type="number"
                  step="any"
                  value={contactData.latitude || ""}
                  onChange={(e) => handleInputChange('latitude', parseFloat(e.target.value) || 0)}
                  placeholder="-7.3218"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Longitude
                </label>
                <input
                  type="number"
                  step="any"
                  value={contactData.longitude || ""}
                  onChange={(e) => handleInputChange('longitude', parseFloat(e.target.value) || 0)}
                  placeholder="108.1985"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Save Button - Fixed Bottom */}
        <div className="fixed bottom-6 right-6">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center px-6 py-3 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 disabled:opacity-50 transition-all duration-200"
          >
            <Save className="w-5 h-5 mr-2" />
            {isSaving ? 'Menyimpan...' : 'Simpan Semua'}
          </button>
        </div>
      </div>
    </div>
  );
}
