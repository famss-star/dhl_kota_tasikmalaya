"use client";

import React, { useState, useEffect } from "react";
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Save, 
  X, 
  Phone,
  Mail,
  MapPin,
  Clock,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  MessageSquare,
  ExternalLink
} from "lucide-react";

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

interface ContactPerson {
  id: string;
  name: string;
  position: string;
  department: string;
  phone: string;
  email: string;
  photo?: string;
  isPublic: boolean;
  order: number;
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

export default function AdminKontak() {
  const [contactInfos, setContactInfos] = useState<ContactInfo[]>([]);
  const [contactPersons, setContactPersons] = useState<ContactPerson[]>([]);
  const [officeLocations, setOfficeLocations] = useState<OfficeLocation[]>([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState<"info" | "persons" | "locations">("info");
  const [editingItem, setEditingItem] = useState<any>(null);
  const [editingType, setEditingType] = useState<"contact" | "person" | "location">("contact");

  const [contactFormData, setContactFormData] = useState({
    type: "phone" as ContactInfo["type"],
    label: "",
    value: "",
    description: "",
    isPublic: true,
    isPrimary: false,
    order: 1,
    icon: ""
  });

  const [personFormData, setPersonFormData] = useState({
    name: "",
    position: "",
    department: "",
    phone: "",
    email: "",
    photo: "",
    isPublic: true,
    order: 1
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
    isActive: true
  });

  const contactTypes = [
    { value: "phone", label: "Telepon", icon: Phone },
    { value: "email", label: "Email", icon: Mail },
    { value: "address", label: "Alamat", icon: MapPin },
    { value: "hours", label: "Jam Operasional", icon: Clock },
    { value: "social", label: "Media Sosial", icon: MessageSquare }
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
        icon: "phone"
      },
      {
        id: "2",
        type: "phone",
        label: "Hotline Pengaduan",
        value: "(0265) 789012",
        description: "Hotline 24 jam untuk pengaduan lingkungan",
        isPublic: true,
        isPrimary: false,
        order: 2,
        icon: "phone"
      },
      {
        id: "3",
        type: "email",
        label: "Email Resmi",
        value: "info@dlh.tasikmalayakota.go.id",
        description: "Email resmi untuk komunikasi umum",
        isPublic: true,
        isPrimary: true,
        order: 3,
        icon: "mail"
      },
      {
        id: "4",
        type: "email",
        label: "Email Pengaduan",
        value: "pengaduan@dlh.tasikmalayakota.go.id",
        description: "Email khusus untuk pengaduan masyarakat",
        isPublic: true,
        isPrimary: false,
        order: 4,
        icon: "mail"
      },
      {
        id: "5",
        type: "address",
        label: "Alamat Kantor",
        value: "Jl. Sutisna Senjaya No. 1, Kota Tasikmalaya, Jawa Barat 46116",
        description: "Alamat kantor pusat Dinas Lingkungan Hidup",
        isPublic: true,
        isPrimary: true,
        order: 5,
        icon: "map-pin"
      },
      {
        id: "6",
        type: "hours",
        label: "Jam Pelayanan",
        value: "Senin - Jumat: 08:00 - 16:00 WIB",
        description: "Jam operasional pelayanan publik",
        isPublic: true,
        isPrimary: true,
        order: 6,
        icon: "clock"
      },
      {
        id: "7",
        type: "social",
        label: "Facebook",
        value: "https://facebook.com/dlhtasikmalaya",
        description: "Halaman Facebook resmi DLH Tasikmalaya",
        isPublic: true,
        isPrimary: false,
        order: 7,
        icon: "facebook"
      },
      {
        id: "8",
        type: "social",
        label: "Instagram",
        value: "https://instagram.com/dlhtasikmalaya",
        description: "Akun Instagram resmi DLH Tasikmalaya",
        isPublic: true,
        isPrimary: false,
        order: 8,
        icon: "instagram"
      }
    ];

    const mockContactPersons: ContactPerson[] = [
      {
        id: "1",
        name: "Dr. Ahmad Suhendar, M.Si",
        position: "Kepala Dinas",
        department: "Pimpinan",
        phone: "(0265) 123456 ext. 101",
        email: "kadis@dlh.tasikmalayakota.go.id",
        photo: "/placeholder-person.jpg",
        isPublic: true,
        order: 1
      },
      {
        id: "2",
        name: "Drs. Budi Santoso, M.M",
        position: "Sekretaris Dinas",
        department: "Sekretariat",
        phone: "(0265) 123456 ext. 102",
        email: "sekretaris@dlh.tasikmalayakota.go.id",
        photo: "/placeholder-person.jpg",
        isPublic: true,
        order: 2
      },
      {
        id: "3",
        name: "Ir. Siti Nurhaliza, M.T",
        position: "Kepala Bidang Pengendalian Pencemaran",
        department: "Pengendalian Pencemaran",
        phone: "(0265) 123456 ext. 201",
        email: "pencemaran@dlh.tasikmalayakota.go.id",
        photo: "/placeholder-person.jpg",
        isPublic: true,
        order: 3
      },
      {
        id: "4",
        name: "Agus Pratama, S.T, M.Env",
        position: "Kepala Bidang Pengelolaan Sampah",
        department: "Pengelolaan Sampah",
        phone: "(0265) 123456 ext. 301",
        email: "sampah@dlh.tasikmalayakota.go.id",
        photo: "/placeholder-person.jpg",
        isPublic: true,
        order: 4
      }
    ];

    const mockOfficeLocations: OfficeLocation[] = [
      {
        id: "1",
        name: "Kantor Pusat DLH Tasikmalaya",
        address: "Jl. Sutisna Senjaya No. 1, Kota Tasikmalaya, Jawa Barat 46116",
        phone: "(0265) 123456",
        email: "info@dlh.tasikmalayakota.go.id",
        mapCoordinates: {
          lat: -7.3505,
          lng: 108.2201
        },
        workingHours: "Senin - Jumat: 08:00 - 16:00 WIB",
        isMain: true,
        isActive: true
      },
      {
        id: "2",
        name: "Kantor Cabang Kawalu",
        address: "Jl. Raya Kawalu No. 45, Kawalu, Tasikmalaya",
        phone: "(0265) 789012",
        email: "kawalu@dlh.tasikmalayakota.go.id",
        mapCoordinates: {
          lat: -7.3400,
          lng: 108.2100
        },
        workingHours: "Senin - Jumat: 08:00 - 15:00 WIB",
        isMain: false,
        isActive: true
      }
    ];

    setContactInfos(mockContactInfos);
    setContactPersons(mockContactPersons);
    setOfficeLocations(mockOfficeLocations);
  }, []);

  const handleEdit = (item: any, type: "contact" | "person" | "location") => {
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
        icon: item.icon || ""
      });
    } else if (type === "person") {
      setPersonFormData({
        name: item.name,
        position: item.position,
        department: item.department,
        phone: item.phone,
        email: item.email,
        photo: item.photo || "",
        isPublic: item.isPublic,
        order: item.order
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
        isActive: item.isActive
      });
    }
    
    setShowModal(true);
  };

  const handleAdd = (type: "contact" | "person" | "location") => {
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
        icon: ""
      });
    } else if (type === "person") {
      setPersonFormData({
        name: "",
        position: "",
        department: "",
        phone: "",
        email: "",
        photo: "",
        isPublic: true,
        order: contactPersons.length + 1
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
        isActive: true
      });
    }
    
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (editingType === "contact") {
        const newContact: ContactInfo = {
          id: editingItem?.id || Date.now().toString(),
          ...contactFormData
        };

        if (editingItem) {
          setContactInfos(prev => prev.map(c => c.id === editingItem.id ? newContact : c));
        } else {
          setContactInfos(prev => [...prev, newContact]);
        }
      } else if (editingType === "person") {
        const newPerson: ContactPerson = {
          id: editingItem?.id || Date.now().toString(),
          ...personFormData
        };

        if (editingItem) {
          setContactPersons(prev => prev.map(p => p.id === editingItem.id ? newPerson : p));
        } else {
          setContactPersons(prev => [...prev, newPerson]);
        }
      } else if (editingType === "location") {
        const newLocation: OfficeLocation = {
          id: editingItem?.id || Date.now().toString(),
          ...locationFormData,
          mapCoordinates: {
            lat: locationFormData.lat,
            lng: locationFormData.lng
          }
        };

        if (editingItem) {
          setOfficeLocations(prev => prev.map(l => l.id === editingItem.id ? newLocation : l));
        } else {
          setOfficeLocations(prev => [...prev, newLocation]);
        }
      }

      setShowModal(false);
      setEditingItem(null);
    } catch (error) {
      console.error('Error saving data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, type: "contact" | "person" | "location") => {
    if (!confirm('Apakah Anda yakin ingin menghapus item ini?')) return;
    
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (type === "contact") {
        setContactInfos(prev => prev.filter(c => c.id !== id));
      } else if (type === "person") {
        setContactPersons(prev => prev.filter(p => p.id !== id));
      } else if (type === "location") {
        setOfficeLocations(prev => prev.filter(l => l.id !== id));
      }
    } catch (error) {
      console.error('Error deleting item:', error);
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
      youtube: Youtube
    };
    return icons[iconName] || Phone;
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          Manajemen Kontak
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Kelola informasi kontak dan lokasi kantor DLH
        </p>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab("info")}
              className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                activeTab === "info"
                  ? "border-green-500 text-green-600 dark:text-green-400"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
              }`}
            >
              <Phone className="w-4 h-4" />
              Info Kontak
            </button>
            <button
              onClick={() => setActiveTab("persons")}
              className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                activeTab === "persons"
                  ? "border-green-500 text-green-600 dark:text-green-400"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              Kontak Person
            </button>
            <button
              onClick={() => setActiveTab("locations")}
              className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                activeTab === "locations"
                  ? "border-green-500 text-green-600 dark:text-green-400"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
              }`}
            >
              <MapPin className="w-4 h-4" />
              Lokasi Kantor
            </button>
          </nav>
        </div>
      </div>

      {/* Contact Info Tab */}
      {activeTab === "info" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              Informasi Kontak
            </h3>
            <button
              onClick={() => handleAdd("contact")}
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2"
            >
              <Plus size={16} />
              Tambah Kontak
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {contactInfos.sort((a, b) => a.order - b.order).map((contact) => {
              const IconComponent = getIconComponent(contact.icon || 'phone');
              return (
                <div key={contact.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                        <IconComponent className="w-5 h-5 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 dark:text-white">
                          {contact.label}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {contactTypes.find(t => t.value === contact.type)?.label}
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

      {/* Contact Persons Tab */}
      {activeTab === "persons" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              Kontak Person
            </h3>
            <button
              onClick={() => handleAdd("person")}
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2"
            >
              <Plus size={16} />
              Tambah Person
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {contactPersons.sort((a, b) => a.order - b.order).map((person) => (
              <div key={person.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center">
                    {person.photo ? (
                      <img src={person.photo} alt={person.name} className="w-16 h-16 rounded-full object-cover" />
                    ) : (
                      <MessageSquare className="w-8 h-8 text-gray-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800 dark:text-white">
                      {person.name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {person.position}
                    </p>
                    <p className="text-xs text-blue-600 dark:text-blue-400">
                      {person.department}
                    </p>
                  </div>
                  {person.isPublic && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                      Publik
                    </span>
                  )}
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-700 dark:text-gray-300">{person.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-700 dark:text-gray-300">{person.email}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(person, "person")}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1"
                  >
                    <Edit3 size={14} />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(person.id, "person")}
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

      {/* Office Locations Tab */}
      {activeTab === "locations" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              Lokasi Kantor
            </h3>
            <button
              onClick={() => handleAdd("location")}
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2"
            >
              <Plus size={16} />
              Tambah Lokasi
            </button>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {officeLocations.map((location) => (
              <div key={location.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
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
                      Lat: {location.mapCoordinates.lat}, Lng: {location.mapCoordinates.lng}
                    </p>
                    <button
                      onClick={() => window.open(`https://maps.google.com/?q=${location.mapCoordinates.lat},${location.mapCoordinates.lng}`, '_blank')}
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
                {editingItem ? "Edit" : "Tambah"} {
                  editingType === "contact" ? "Kontak" :
                  editingType === "person" ? "Person" : 
                  "Lokasi"
                }
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
                        onChange={(e) => setContactFormData(prev => ({ ...prev, type: e.target.value as ContactInfo["type"] }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                        required
                      >
                        {contactTypes.map(type => (
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
                        onChange={(e) => setContactFormData(prev => ({ ...prev, label: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
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
                      onChange={(e) => setContactFormData(prev => ({ ...prev, value: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
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
                      onChange={(e) => setContactFormData(prev => ({ ...prev, description: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
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
                        onChange={(e) => setContactFormData(prev => ({ ...prev, order: parseInt(e.target.value) }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
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
                        onChange={(e) => setContactFormData(prev => ({ ...prev, isPublic: e.target.checked }))}
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                      />
                      <label htmlFor="isPublic" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                        Tampilkan di publik
                      </label>
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="isPrimary"
                        checked={contactFormData.isPrimary}
                        onChange={(e) => setContactFormData(prev => ({ ...prev, isPrimary: e.target.checked }))}
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                      />
                      <label htmlFor="isPrimary" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
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
                  className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:from-gray-400 disabled:to-gray-500 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
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
  );
}
