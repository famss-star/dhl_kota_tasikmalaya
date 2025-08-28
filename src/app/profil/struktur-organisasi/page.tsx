
"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { User, Briefcase, Factory, Building2, Settings, Trash2, Trees } from 'lucide-react';

interface StaffMember {
  id: string;
  name: string;
  position: string;
  photo?: string;
  type: 'KEPALA_DINAS' | 'WAKIL' | 'SEKRETARIS' | 'KABID' | 'STAFF';
  employmentStatus: 'PNS' | 'PPPK' | 'HONORER';
  education: 'SMP' | 'SMA_SMK' | 'DIPLOMA' | 'S1' | 'S2' | 'S3';
  rank?: string;
  birthDate?: string;
  isActive: boolean;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  careerHistory?: CareerHistory[];
}

interface CareerHistory {
  id: string;
  position: string;
  institution: string;
  startDate: string;
  endDate?: string;
  description?: string;
  isActive: boolean;
  isPublished: boolean;
}

const StrukturOrganisasi: React.FC = () => {
  const [staffMembers, setStaffMembers] = useState<StaffMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStaffMembers();
  }, []);

  async function fetchStaffMembers() {
    try {
      const response = await fetch('/api/admin/staff-members');
      if (response.ok) {
        const data = await response.json();
        // Filter only published and active staff members
        const publishedStaff = data.filter((staff: StaffMember) => 
          staff.isPublished && staff.isActive
        );
        setStaffMembers(publishedStaff);
      }
    } catch (error) {
      console.error('Error fetching staff members:', error);
    } finally {
      setLoading(false);
    }
  }

  // Helper functions to get staff by type (already filtered for published only)
  const getKepalaDinas = () => staffMembers.find(s => s.type === 'KEPALA_DINAS');
  const getWakil = () => staffMembers.find(s => s.type === 'WAKIL');
  const getSekretaris = () => staffMembers.find(s => s.type === 'SEKRETARIS');
  const getKabids = () => staffMembers.filter(s => s.type === 'KABID');

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center min-h-[120px] flex flex-col justify-center">
            <div className="flex flex-col items-center justify-center mb-4">
              <h1 className="text-3xl md:text-5xl font-bold text-center leading-tight">
                Struktur Organisasi
              </h1>
            </div>
            <p className="text-lg opacity-90 max-w-3xl mx-auto">
              Dinas Lingkungan Hidup Kota Tasikmalaya
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          
          {/* Bagan Organisasi */}
          <section className="mb-12">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center border-b-4 border-green-500 pb-4">
                Bagan Struktur Organisasi
              </h2>
              

              {/* Kepala Dinas */}
              <div className="flex justify-center mb-8">
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg p-6 text-center shadow-lg flex flex-col items-center min-w-[280px]">
                  <div className="w-16 h-16 mb-3 rounded-full overflow-hidden border-4 border-blue-300">
                    <Image
                      src={getKepalaDinas()?.photo || '/pemimpin-placeholder.svg'}
                      alt={getKepalaDinas()?.name || 'Kepala Dinas'}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/pemimpin-placeholder.svg';
                      }}
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-2">KEPALA DINAS</h3>
                  <p className="text-sm opacity-90 mb-1">
                    {getKepalaDinas()?.position || 'Kepala Dinas Lingkungan Hidup'}
                  </p>
                  {getKepalaDinas()?.name && (
                    <p className="text-sm font-semibold bg-blue-800 bg-opacity-50 px-3 py-1 rounded-full">
                      {getKepalaDinas()!.name}
                    </p>
                  )}
                </div>
              </div>

              {/* Wakil Kepala Dinas - Only show if published */}
              {getWakil() && (
                <div className="flex justify-center mb-6">
                  <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-lg p-4 text-center shadow-lg flex flex-col items-center min-w-[250px]">
                    <div className="w-12 h-12 mb-2 rounded-full overflow-hidden border-2 border-indigo-300">
                      <Image
                        src={getWakil()!.photo || '/pemimpin-placeholder.svg'}
                        alt={getWakil()!.name}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-lg font-bold mb-1">WAKIL KEPALA DINAS</h3>
                    <p className="text-xs font-semibold bg-indigo-800 bg-opacity-50 px-2 py-1 rounded-full">
                      {getWakil()!.name}
                    </p>
                  </div>
                </div>
              )}

              {/* Sekretaris - Only show if published */}
              {getSekretaris() && (
                <div className="flex justify-center mb-8">
                  <div className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg p-4 text-center shadow-lg flex flex-col items-center min-w-[200px]">
                    <div className="w-12 h-12 mb-2 rounded-full overflow-hidden border-2 border-green-300">
                      <Image
                        src={getSekretaris()!.photo || '/pemimpin-placeholder.svg'}
                        alt={getSekretaris()!.name}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-lg font-bold mb-1">SEKRETARIS</h3>
                    <p className="text-xs font-semibold bg-green-800 bg-opacity-50 px-2 py-1 rounded-full">
                      {getSekretaris()!.name}
                    </p>
                  </div>
                </div>
              )}

              {/* Bidang-Bidang - Show dynamic Kabid data */}
              {getKabids().length > 0 && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                  {getKabids().map((kabid, index) => {
                    const colors = [
                      { bg: 'from-green-600 to-green-700', iconBg: 'bg-green-700', textBg: 'bg-green-800', icon: Trees },
                      { bg: 'from-red-600 to-red-700', iconBg: 'bg-red-700', textBg: 'bg-red-800', icon: Factory },
                      { bg: 'from-teal-600 to-teal-700', iconBg: 'bg-teal-700', textBg: 'bg-teal-800', icon: Trash2 },
                      { bg: 'from-purple-600 to-purple-700', iconBg: 'bg-purple-700', textBg: 'bg-purple-800', icon: Settings },
                      { bg: 'from-orange-600 to-orange-700', iconBg: 'bg-orange-700', textBg: 'bg-orange-800', icon: Building2 },
                      { bg: 'from-indigo-600 to-indigo-700', iconBg: 'bg-indigo-700', textBg: 'bg-indigo-800', icon: User }
                    ];
                    const colorScheme = colors[index % colors.length];
                    const IconComponent = colorScheme.icon;
                    
                    return (
                      <div key={kabid.id} className={`bg-gradient-to-r ${colorScheme.bg} text-white rounded-lg p-4 text-center shadow-lg flex flex-col items-center`}>
                        <div className="w-12 h-12 mb-2 rounded-full overflow-hidden border-2 border-white border-opacity-50">
                          <Image
                            src={kabid.photo || '/pemimpin-placeholder.svg'}
                            alt={kabid.name}
                            width={48}
                            height={48}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h4 className="font-semibold mb-2">KEPALA BIDANG</h4>
                        <p className="text-sm mb-2 font-medium">{kabid.position.replace('Kepala Bidang ', '').replace('KABID ', '')}</p>
                        <div className={`text-xs ${colorScheme.textBg} bg-opacity-50 rounded p-2 w-full`}>
                          <p className="font-semibold">{kabid.name}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
              
              {/* Static Bidang sections if no kabids are published */}
              {getKabids().length === 0 && (
                <div className="grid md:grid-cols-3 gap-4 mb-8">
                  <div className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg p-4 text-center shadow-lg flex flex-col items-center">
                    <Trees size={26} className="mb-1 text-green-200 bg-green-700 rounded-full p-0.5" />
                    <h4 className="font-semibold mb-2">BIDANG</h4>
                    <p className="text-sm mb-2">Tata Lingkungan</p>
                    <div className="text-xs space-y-1">
                      <div className="bg-green-800 bg-opacity-50 rounded p-1">Seksi Tata Ruang</div>
                      <div className="bg-green-800 bg-opacity-50 rounded p-1">Seksi AMDAL</div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg p-4 text-center shadow-lg flex flex-col items-center">
                    <Factory size={26} className="mb-1 text-red-200 bg-red-700 rounded-full p-0.5" />
                    <h4 className="font-semibold mb-2">BIDANG</h4>
                    <p className="text-sm mb-2">Pengendalian Pencemaran</p>
                    <div className="text-xs space-y-1">
                      <div className="bg-red-800 bg-opacity-50 rounded p-1">Seksi Air & Tanah</div>
                      <div className="bg-red-800 bg-opacity-50 rounded p-1">Seksi Udara & B3</div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-lg p-4 text-center shadow-lg flex flex-col items-center">
                    <Trash2 size={26} className="mb-1 text-teal-100 bg-teal-700 rounded-full p-0.5" />
                    <h4 className="font-semibold mb-2">BIDANG</h4>
                    <p className="text-sm mb-2">Pengelolaan Sampah</p>
                    <div className="text-xs space-y-1">
                      <div className="bg-teal-800 bg-opacity-50 rounded p-1">Seksi Pengurangan</div>
                      <div className="bg-teal-800 bg-opacity-50 rounded p-1">Seksi Penanganan</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Dynamic Staff Summary Section */}
          {(getKepalaDinas() || getWakil() || getSekretaris() || getKabids().length > 0) && (
            <section className="mb-12">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 border-b-4 border-blue-500 pb-2">
                  Pimpinan Dinas Lingkungan Hidup
                </h2>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Kepala Dinas Info */}
                  {getKepalaDinas() && (
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-6 rounded-lg border border-blue-200 dark:border-blue-700">
                      <div className="flex items-center gap-4 mb-4">
                        <Image
                          src={getKepalaDinas()!.photo || '/pemimpin-placeholder.svg'}
                          alt={getKepalaDinas()!.name || 'Kepala Dinas'}
                          width={60}
                          height={60}
                          className="w-15 h-15 rounded-full object-cover border-3 border-blue-300"
                        />
                        <div>
                          <h3 className="text-lg font-bold text-blue-800 dark:text-blue-200">Kepala Dinas</h3>
                          <p className="text-blue-600 dark:text-blue-400 font-semibold">{getKepalaDinas()!.name}</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{getKepalaDinas()!.position}</p>
                    </div>
                  )}

                  {/* Wakil Kepala Dinas Info */}
                  {getWakil() && (
                    <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20 p-6 rounded-lg border border-indigo-200 dark:border-indigo-700">
                      <div className="flex items-center gap-4 mb-4">
                        <Image
                          src={getWakil()!.photo || '/pemimpin-placeholder.svg'}
                          alt={getWakil()!.name}
                          width={60}
                          height={60}
                          className="w-15 h-15 rounded-full object-cover border-3 border-indigo-300"
                        />
                        <div>
                          <h3 className="text-lg font-bold text-indigo-800 dark:text-indigo-200">Wakil Kepala Dinas</h3>
                          <p className="text-indigo-600 dark:text-indigo-400 font-semibold">{getWakil()!.name}</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{getWakil()!.position}</p>
                    </div>
                  )}

                  {/* Sekretaris Info */}
                  {getSekretaris() && (
                    <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-6 rounded-lg border border-green-200 dark:border-green-700">
                      <div className="flex items-center gap-4 mb-4">
                        <Image
                          src={getSekretaris()!.photo || '/pemimpin-placeholder.svg'}
                          alt={getSekretaris()!.name}
                          width={60}
                          height={60}
                          className="w-15 h-15 rounded-full object-cover border-3 border-green-300"
                        />
                        <div>
                          <h3 className="text-lg font-bold text-green-800 dark:text-green-200">Sekretaris</h3>
                          <p className="text-green-600 dark:text-green-400 font-semibold">{getSekretaris()!.name}</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{getSekretaris()!.position}</p>
                    </div>
                  )}
                </div>

                {/* Kepala Bidang Cards */}
                {getKabids().length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Kepala Bidang</h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {getKabids().map((kabid, index) => {
                        const colors = [
                          { bg: 'from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20', border: 'border-purple-200 dark:border-purple-700', text: 'text-purple-800 dark:text-purple-200', subtext: 'text-purple-600 dark:text-purple-400' },
                          { bg: 'from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20', border: 'border-red-200 dark:border-red-700', text: 'text-red-800 dark:text-red-200', subtext: 'text-red-600 dark:text-red-400' },
                          { bg: 'from-teal-50 to-teal-100 dark:from-teal-900/20 dark:to-teal-800/20', border: 'border-teal-200 dark:border-teal-700', text: 'text-teal-800 dark:text-teal-200', subtext: 'text-teal-600 dark:text-teal-400' },
                          { bg: 'from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20', border: 'border-orange-200 dark:border-orange-700', text: 'text-orange-800 dark:text-orange-200', subtext: 'text-orange-600 dark:text-orange-400' }
                        ];
                        const colorScheme = colors[index % colors.length];
                        
                        return (
                          <div key={kabid.id} className={`bg-gradient-to-br ${colorScheme.bg} p-4 rounded-lg border ${colorScheme.border}`}>
                            <div className="flex items-center gap-3 mb-3">
                              <Image
                                src={kabid.photo || '/pemimpin-placeholder.svg'}
                                alt={kabid.name}
                                width={48}
                                height={48}
                                className="w-12 h-12 rounded-full object-cover border-2 border-white"
                              />
                              <div>
                                <h4 className={`font-bold ${colorScheme.text}`}>{kabid.name}</h4>
                                <p className={`text-sm ${colorScheme.subtext}`}>Kepala Bidang</p>
                              </div>
                            </div>
                            <p className="text-xs text-gray-600 dark:text-gray-400">{kabid.position}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Deskripsi Tugas */}
          <section className="mb-12">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 border-b-4 border-green-500 pb-2">
                Deskripsi Tugas Masing-Masing Bidang
              </h2>
              
              <div className="grid md:grid-cols-1 gap-8">
                <div className="space-y-6">
                  <div className="border-l-4 border-green-500 pl-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Trees size={22} className="text-green-600" />
                      <h3 className="text-xl font-semibold text-green-600">Bidang Tata Lingkungan</h3>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">Melaksanakan penyusunan baku mutu lingkungan hidup, analisis mengenai dampak lingkungan, dan tata ruang berbasis lingkungan hidup.</p>
                  </div>
                  
                  <div className="border-l-4 border-red-500 pl-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Factory size={22} className="text-red-500" />
                      <h3 className="text-xl font-semibold text-red-600">Bidang Pengendalian Pencemaran</h3>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">Melaksanakan pencegahan dan penanggulangan pencemaran air, udara, tanah, serta pengelolaan bahan berbahaya dan beracun (B3).</p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="border-l-4 border-teal-500 pl-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Trash2 size={22} className="text-teal-600" />
                      <h3 className="text-xl font-semibold text-teal-600">Bidang Pengelolaan Sampah</h3>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">Melaksanakan pengurangan dan penanganan sampah, termasuk pengembangan teknologi ramah lingkungan dan pemberdayaan masyarakat.</p>
                  </div>

                </div>
              </div>
            </div>
          </section>

          {/* Back to Profile */}
          <section>
            <div className="text-center">
              <a 
                href="/profil/tentang" 
                className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Kembali ke Halaman Tentang
              </a>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default StrukturOrganisasi;