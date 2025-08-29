"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  Users, 
  Save, 
  X,
  User,
  ArrowLeft,
  Calendar,
  Award,
  GraduationCap,
  Badge,
  Clock,
  Camera,
  Upload,
  ExternalLink
} from "lucide-react";

interface StaffMember {
  id: string;
  name: string;
  position: string;
  photo?: string;
  type: 'KEPALA_DINAS' | 'WAKIL' | 'SEKRETARIS' | 'KABID' | 'STAFF';
  greeting?: string; // Sambutan untuk kepala dinas
  employmentStatus: 'PNS' | 'PPPK' | 'HONORER';
  education: 'SMP' | 'SMA_SMK' | 'DIPLOMA' | 'S1' | 'S2' | 'S3';
  rank?: string;
  birthDate?: string;
  isActive: boolean;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

interface FormData {
  name: string;
  position: string;
  type: 'KEPALA_DINAS' | 'WAKIL' | 'SEKRETARIS' | 'KABID' | 'STAFF';
  greeting: string; // Sambutan untuk kepala dinas
  employmentStatus: 'PNS' | 'PPPK' | 'HONORER';
  education: 'SMP' | 'SMA_SMK' | 'DIPLOMA' | 'S1' | 'S2' | 'S3';
  rank: string;
  birthDate: string;
  photo: string;
  isActive: boolean;
  isPublished: boolean;
}

const StaffPage = () => {
  const [staffMembers, setStaffMembers] = useState<StaffMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingStaff, setEditingStaff] = useState<StaffMember | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<'KEPALA_DINAS' | 'WAKIL' | 'SEKRETARIS' | 'KABID' | 'STAFF' | 'PREVIEW'>('KEPALA_DINAS');
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    position: "",
    type: "KEPALA_DINAS",
    greeting: "",
    employmentStatus: "PNS",
    education: "S1",
    rank: "",
    birthDate: "",
    photo: "",
    isActive: true,
    isPublished: false
  });

  const tabs = [
    { key: 'KEPALA_DINAS' as const, label: 'Kepala Dinas', icon: User, maxCount: 1 },
    { key: 'WAKIL' as const, label: 'Wakil Kepala Dinas', icon: Users, maxCount: 1 },
    { key: 'SEKRETARIS' as const, label: 'Sekretaris', icon: User, maxCount: 1 },
    { key: 'KABID' as const, label: 'Kepala Bidang', icon: Users, maxCount: null },
    { key: 'STAFF' as const, label: 'Staff', icon: Users, maxCount: null },
    { key: 'PREVIEW' as const, label: 'Preview', icon: ExternalLink, maxCount: null }
  ];

  const typeLabels = {
    KEPALA_DINAS: "Kepala Dinas",
    WAKIL: "Wakil Kepala Dinas", 
    SEKRETARIS: "Sekretaris",
    KABID: "Kepala Bidang",
    STAFF: "Staff",
    PREVIEW: "Preview"
  };

  // Helper functions for preview
  const getKepalaDinas = () => staffMembers.find(s => s.type === 'KEPALA_DINAS' && s.isPublished && s.isActive);
  const getWakil = () => staffMembers.find(s => s.type === 'WAKIL' && s.isPublished && s.isActive);
  const getSekretaris = () => staffMembers.find(s => s.type === 'SEKRETARIS' && s.isPublished && s.isActive);
  const getKabids = () => staffMembers.filter(s => s.type === 'KABID' && s.isPublished && s.isActive);

  const employmentStatusLabels = {
    PNS: "Pegawai Negeri Sipil",
    PPPK: "PPPK",
    HONORER: "Honorer"
  };

  const educationLabels = {
    SMP: "SMP",
    SMA_SMK: "SMA/SMK",
    DIPLOMA: "Diploma",
    S1: "S1",
    S2: "S2",
    S3: "S3"
  };

  const getCurrentCount = (type: StaffMember['type']) => {
    return staffMembers.filter(staff => staff.type === type).length;
  };

  const isLimitReached = (type: StaffMember['type']) => {
    const tab = tabs.find(t => t.key === type);
    if (!tab || tab.maxCount === null) return false;
    return getCurrentCount(type) >= tab.maxCount;
  };

  useEffect(() => {
    fetchStaffMembers();
  }, []);

  const fetchStaffMembers = async () => {
    try {
      const response = await fetch('/api/admin/staff-members');
      if (response.ok) {
        const data = await response.json();
        setStaffMembers(data);
      } else {
        console.error('Failed to fetch staff members');
      }
    } catch (error) {
      console.error('Error fetching staff members:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePhotoUpload = async (file: File) => {
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      alert('File type not allowed. Please upload JPG, PNG, GIF, or WebP images only.');
      return;
    }

    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      alert('File size too large. Maximum 5MB allowed.');
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', 'staff');

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          // Update form data with the uploaded file URL
          setFormData(prev => ({
            ...prev,
            photo: result.data.url
          }));
          alert('Photo uploaded successfully!');
        } else {
          alert('Upload failed: ' + result.error);
        }
      } else {
        alert('Upload failed. Please try again.');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const openEditForm = (staff: StaffMember) => {
    setEditingStaff(staff);
    setFormData({
      name: staff.name,
      position: staff.position,
      type: staff.type,
      greeting: staff.greeting || "",
      employmentStatus: staff.employmentStatus,
      education: staff.education,
      rank: staff.rank || "",
      birthDate: staff.birthDate || "",
      photo: staff.photo || "",
      isActive: staff.isActive,
      isPublished: staff.isPublished
    });
    setShowForm(true);
  };

  const openAddForm = (type: StaffMember['type']) => {
    setEditingStaff(null);
    setFormData({
      name: "",
      position: "",
      type: type,
      greeting: "",
      employmentStatus: "PNS",
      education: "S1",
      rank: "",
      birthDate: "",
      photo: "",
      isActive: true,
      isPublished: false
    });
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingStaff(null);
    setFormData({
      name: "",
      position: "",
      type: "KEPALA_DINAS",
      greeting: "",
      employmentStatus: "PNS",
      education: "S1",
      rank: "",
      birthDate: "",
      photo: "",
      isActive: true,
      isPublished: false
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const url = editingStaff 
        ? `/api/admin/staff-members/${editingStaff.id}`
        : '/api/admin/staff-members';
      
      const method = editingStaff ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        await fetchStaffMembers();
        closeForm();
      } else {
        let errorMessage = `Error: ${response.status} ${response.statusText}`;
        try {
          const errorData = await response.json();
          errorMessage = `Error: ${errorData.error || errorMessage}`;
        } catch (jsonError) {
          // Response tidak berupa JSON, gunakan status message
          console.warn('Response bukan JSON:', jsonError);
        }
        alert(errorMessage);
      }
    } catch (error) {
      console.error('Error saving staff member:', error);
      alert('Error saving staff member');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this staff member?')) {
      try {
        const response = await fetch(`/api/admin/staff-members/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          await fetchStaffMembers();
        } else {
          let errorMessage = `Error: ${response.status} ${response.statusText}`;
          try {
            const errorData = await response.json();
            errorMessage = `Error: ${errorData.error || errorMessage}`;
          } catch (jsonError) {
            console.warn('Response bukan JSON:', jsonError);
          }
          alert(errorMessage);
        }
      } catch (error) {
        console.error('Error deleting staff member:', error);
        alert('Error deleting staff member');
      }
    }
  };

  // Search functionality
  const searchTerm = searchQuery.toLowerCase();
  const filteredStaff = staffMembers.filter(staff => {
    const matchesSearch = staff.name.toLowerCase().includes(searchTerm) ||
                          staff.position.toLowerCase().includes(searchTerm);
    const matchesTab = activeTab === 'PREVIEW' ? true : staff.type === activeTab;
    return matchesSearch && matchesTab;
  });

  // Helper function to check if "Add" button should be shown
  const canAddNew = (tabKey: typeof activeTab) => {
    if (tabKey === 'PREVIEW') return false; // No add button for preview
    const tab = tabs.find(t => t.key === tabKey);
    if (!tab || tab.maxCount === null) return true; // unlimited
    return getCurrentCount(tabKey as StaffMember['type']) < tab.maxCount;
  };

  const getStaffPhoto = (staff: StaffMember) => {
    if (staff.photo) {
      if (staff.photo.startsWith('http')) {
        return staff.photo;
      } else if (staff.photo.startsWith('/uploads/')) {
        return staff.photo;
      } else {
        return `/uploads/staff/${staff.photo}`;
      }
    }
    return '/pemimpin-placeholder.svg';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="items-center space-x-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Staff & Pimpinan</h1>
              <p className="text-gray-600 dark:text-gray-400">Manage staff members and leadership</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
              <input
                type="text"
                placeholder="Search staff..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm mb-6 border border-gray-200 dark:border-gray-700">
        <div className="border-b border-gray-200 dark:border-gray-600">
          <div className="flex space-x-8 px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const count = activeTab === 'PREVIEW' ? 
                (tab.key === 'PREVIEW' ? 0 : getCurrentCount(tab.key as StaffMember['type'])) : 
                getCurrentCount(tab.key as StaffMember['type']);
              
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center space-x-2 py-4 border-b-2 transition-colors ${
                    activeTab === tab.key
                      ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{tab.label}</span>
                  {tab.key !== 'PREVIEW' && (
                    <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                      activeTab === tab.key 
                        ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' 
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                    }`}>
                      {count}{tab.maxCount ? `/${tab.maxCount}` : ''}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'PREVIEW' ? (
            <div className="space-y-8">
              {/* Preview Mode - Public Organization Structure */}
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Struktur Organisasi</h2>
                <p className="text-gray-600 dark:text-gray-400">Dinas Lingkungan Hidup Kota Tasikmalaya</p>
              </div>
              
              <div className="max-w-4xl mx-auto">
                {/* Level 1: Kepala Dinas */}
                {getKepalaDinas() && (
                  <div className="flex justify-center mb-8">
                    <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-700 rounded-lg p-6 text-center max-w-xs">
                      <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-blue-200 dark:border-blue-600">
                        <Image
                          src={getStaffPhoto(getKepalaDinas()!)}
                          alt={getKepalaDinas()!.name}
                          width={96}
                          height={96}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="font-bold text-gray-900 dark:text-white mb-1">{getKepalaDinas()!.name}</h3>
                      <p className="text-blue-600 dark:text-blue-400 font-medium text-sm mb-2">{getKepalaDinas()!.position}</p>
                      <div className="flex items-center justify-center text-xs text-gray-500 dark:text-gray-400">
                        <Badge className="h-3 w-3 mr-1" />
                        {employmentStatusLabels[getKepalaDinas()!.employmentStatus]}
                      </div>
                    </div>
                  </div>
                )}

                {/* Level 2: Wakil Kepala Dinas & Sekretaris */}
                <div className="flex justify-center gap-8 mb-8">
                  {getWakil() && (
                    <div className="bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-700 rounded-lg p-6 text-center max-w-xs">
                      <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden border-4 border-green-200 dark:border-green-600">
                        <Image
                          src={getStaffPhoto(getWakil()!)}
                          alt={getWakil()!.name}
                          width={80}
                          height={80}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="font-bold text-gray-900 dark:text-white mb-1">{getWakil()!.name}</h3>
                      <p className="text-green-600 dark:text-green-400 font-medium text-sm mb-2">{getWakil()!.position}</p>
                      <div className="flex items-center justify-center text-xs text-gray-500 dark:text-gray-400">
                        <Badge className="h-3 w-3 mr-1" />
                        {employmentStatusLabels[getWakil()!.employmentStatus]}
                      </div>
                    </div>
                  )}

                  {getSekretaris() && (
                    <div className="bg-purple-50 dark:bg-purple-900/20 border-2 border-purple-200 dark:border-purple-700 rounded-lg p-6 text-center max-w-xs">
                      <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden border-4 border-purple-200 dark:border-purple-600">
                        <Image
                          src={getStaffPhoto(getSekretaris()!)}
                          alt={getSekretaris()!.name}
                          width={80}
                          height={80}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="font-bold text-gray-900 dark:text-white mb-1">{getSekretaris()!.name}</h3>
                      <p className="text-purple-600 dark:text-purple-400 font-medium text-sm mb-2">{getSekretaris()!.position}</p>
                      <div className="flex items-center justify-center text-xs text-gray-500 dark:text-gray-400">
                        <Badge className="h-3 w-3 mr-1" />
                        {employmentStatusLabels[getSekretaris()!.employmentStatus]}
                      </div>
                    </div>
                  )}
                </div>

                {/* Level 3: Kepala Bidang */}
                {getKabids().length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-center mb-6">Kepala Bidang</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {getKabids().map((kabid) => (
                        <div key={kabid.id} className="bg-orange-50 dark:bg-orange-900/20 border-2 border-orange-200 dark:border-orange-700 rounded-lg p-4 text-center">
                          <div className="w-16 h-16 mx-auto mb-3 rounded-full overflow-hidden border-4 border-orange-200 dark:border-orange-600">
                            <Image
                              src={getStaffPhoto(kabid)}
                              alt={kabid.name}
                              width={64}
                              height={64}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <h4 className="font-bold text-gray-900 dark:text-white mb-1 text-sm">{kabid.name}</h4>
                          <p className="text-orange-600 dark:text-orange-400 font-medium text-xs mb-2">{kabid.position}</p>
                          <div className="flex items-center justify-center text-xs text-gray-500 dark:text-gray-400">
                            <Badge className="h-3 w-3 mr-1" />
                            {employmentStatusLabels[kabid.employmentStatus]}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Message if no published staff */}
                {!getKepalaDinas() && !getWakil() && !getSekretaris() && getKabids().length === 0 && (
                  <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                    <Users className="h-12 w-12 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
                    <p>Belum ada staff yang dipublikasikan</p>
                    <p className="text-sm">Silakan aktifkan publikasi pada tab staff untuk menampilkannya di struktur organisasi</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <>
              {/* Add Button */}
              {canAddNew(activeTab) && (
                <div className="mb-6">
                  <button
                    onClick={() => openAddForm(activeTab)}
                    className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <Plus className="h-5 w-5" />
                    <span>Tambah {typeLabels[activeTab]}</span>
                  </button>
                </div>
              )}

              {/* Staff List */}
              {filteredStaff.length === 0 ? (
                <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                  <Users className="h-12 w-12 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
                  <p>
                    {searchQuery
                      ? `No staff found matching "${searchQuery}"`
                      : `No ${typeLabels[activeTab].toLowerCase()} found`
                    }
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredStaff.map((staff) => (
                    <div key={staff.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 border border-gray-200 dark:border-gray-600">
                      <div className="flex justify-between items-start mb-4">
                        <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-gray-200 dark:border-gray-500">
                          <Image
                            src={getStaffPhoto(staff)}
                            alt={staff.name}
                            width={64}
                            height={64}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => openEditForm(staff)}
                            className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                          >
                            <Edit3 className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(staff.id)}
                            className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h3 className="font-bold text-gray-900 dark:text-white">{staff.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{staff.position}</p>
                        
                        <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                          <div className="flex items-center">
                            <Badge className="h-3 w-3 mr-1" />
                            {employmentStatusLabels[staff.employmentStatus]}
                          </div>
                          <div className="flex items-center">
                            <GraduationCap className="h-3 w-3 mr-1" />
                            {educationLabels[staff.education]}
                          </div>
                        </div>

                        {staff.rank && (
                          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                            <Award className="h-3 w-3 mr-1" />
                            {staff.rank}
                          </div>
                        )}

                        {staff.birthDate && (
                          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                            <Calendar className="h-3 w-3 mr-1" />
                            {new Date(staff.birthDate).toLocaleDateString('id-ID')}
                          </div>
                        )}

                        <div className="flex items-center justify-between pt-2">
                          <div className="flex space-x-2">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              staff.isActive 
                                ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400' 
                                : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400'
                            }`}>
                              {staff.isActive ? 'Active' : 'Inactive'}
                            </span>
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              staff.isPublished 
                                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400' 
                                : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300'
                            }`}>
                              {staff.isPublished ? 'Published' : 'Draft'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-600">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {editingStaff ? 'Edit Staff Member' : `Add ${typeLabels[formData.type]}`}
              </h2>
              <button onClick={closeForm} className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300">
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Position</label>
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                />
              </div>

              {/* Type is automatically set based on active tab - hidden from user */}

              {/* Greeting field for KEPALA_DINAS only */}
              {formData.type === 'KEPALA_DINAS' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Greeting Message</label>
                  <textarea
                    name="greeting"
                    value={formData.greeting || ''}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Welcome message for the department head..."
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    This message will be displayed on the public organization page for the department head.
                  </p>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Employment Status</label>
                <select
                  name="employmentStatus"
                  value={formData.employmentStatus}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                >
                  <option value="PNS">PNS</option>
                  <option value="PPPK">PPPK</option>
                  <option value="HONORER">Honorer</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Education</label>
                <select
                  name="education"
                  value={formData.education}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                >
                  <option value="SMP">SMP</option>
                  <option value="SMA_SMK">SMA/SMK</option>
                  <option value="DIPLOMA">Diploma</option>
                  <option value="S1">S1</option>
                  <option value="S2">S2</option>
                  <option value="S3">S3</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Rank (Optional)</label>
                <input
                  type="text"
                  name="rank"
                  value={formData.rank}
                  onChange={handleInputChange}
                  placeholder="e.g., Pembina Tk.I, III/c"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Birth Date (Optional)</label>
                <input
                  type="date"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Photo</label>
                
                {/* Photo Preview */}
                {formData.photo && (
                  <div className="mb-3">
                    <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-gray-200 dark:border-gray-600 mx-auto">
                      <img
                        src={formData.photo.startsWith('http') ? formData.photo : `/uploads/staff/${formData.photo}`}
                        alt="Preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = '/pemimpin-placeholder.svg';
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* File Upload */}
                <div className="space-y-3">
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 mb-2 text-gray-500 dark:text-gray-400" />
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG, GIF, WebP (MAX. 5MB)</p>
                        {uploading && (
                          <p className="text-xs text-blue-500 mt-1">Uploading...</p>
                        )}
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            handlePhotoUpload(file);
                          }
                        }}
                        disabled={uploading}
                      />
                    </label>
                  </div>

                  {/* Manual URL Input */}
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300 dark:border-gray-600" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">Or enter URL manually</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Camera className="h-5 w-5 text-gray-400 dark:text-gray-500 flex-shrink-0" />
                    <input
                      type="text"
                      name="photo"
                      value={formData.photo}
                      onChange={handleInputChange}
                      placeholder="Photo filename or URL"
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    />
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Enter filename (for /uploads/staff/ directory) or full URL
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700"
                  />
                  <label className="ml-2 text-sm text-gray-700 dark:text-gray-300">Active</label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="isPublished"
                    checked={formData.isPublished}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700"
                  />
                  <label className="ml-2 text-sm text-gray-700 dark:text-gray-300">Published (visible in public organization structure)</label>
                </div>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  <Save className="h-5 w-5" />
                  <span>{editingStaff ? 'Update' : 'Save'}</span>
                </button>
                <button
                  type="button"
                  onClick={closeForm}
                  className="flex-1 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200 py-2 px-4 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffPage;
