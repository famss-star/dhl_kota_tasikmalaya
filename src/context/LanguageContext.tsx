"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';

type Language = 'id' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
  mounted: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation data
const translations = {
  id: {
    // Navbar
    'navbar.home': 'Beranda',
    'navbar.profile': 'Profil',
    'navbar.about': 'Tentang DLH Kota Tasikmalaya',
    'navbar.vision_mission': 'Visi & Misi',
    'navbar.organizational_structure': 'Struktur Organisasi',
    'navbar.leadership': 'Pimpinan',
    'navbar.employees': 'Pegawai',
    'navbar.departments': 'Bidang Umum',
    'navbar.services': 'Layanan Publik',
    'navbar.public_services': 'Pelayanan Umum',
    'navbar.iplc_service': 'Pelayanan IPLC',
    'navbar.ka_andal': 'Rekomendasi KA-ANDAL',
    'navbar.kelayakan_lingkungan': 'Kelayakan Lingkungan',
    'navbar.sppl_service': 'Persetujuan SPPL',
    'navbar.pengaduan_pencemaran': 'Pengaduan Pencemaran',
    'navbar.general_permit': 'Perizinan Umum',
    'navbar.amdal_permit': 'Perizinan AMDAL',
    'navbar.iplc_permit': 'Perizinan IPLC',
    'navbar.sppl_permit': 'Perizinan SPPL',
    'navbar.ukl_upl_permit': 'Perizinan UKL-UPL',
    'navbar.information': 'Informasi',
    'navbar.news': 'Berita',
    'navbar.articles': 'Artikel',
    'navbar.agenda': 'Agenda Kegiatan',
    'navbar.umk_guidelines': 'Panduan Perizinan Berusaha (UMK)',
    'navbar.documents': 'Dokumen',
    'navbar.regulations': 'Peraturan Walikota',
    'navbar.emission_sop': 'SOP Pengendali Emisi',
    'navbar.wwtp_sop': 'SOP Instalasi Pengolahan Air Limbah',
    'navbar.gallery': 'Galeri',
    'navbar.photo_gallery': 'Galeri Foto',
    'navbar.video_gallery': 'Galeri Video',
    'navbar.file_downloads': 'File Download',
    'navbar.complaints': 'Pengaduan',
    'navbar.contact': 'Kontak',
    'navbar.links': 'Link',
    
    // Buttons
    'button.read_more': 'Lihat Selengkapnya',
    'button.hide': 'Sembunyikan',
    'button.back_to_departments': 'Kembali ke Halaman Bidang Kerja',
    'button.learn_more': 'Pelajari Lebih Lanjut',
    
    // Common
    'common.about': 'Tentang',
    'common.task_details': 'Rincian tugas',
    'common.main_tasks': 'Tugas Pokok',
    'common.functions': 'Fungsi',
    
    // Department Names
    'dept.environmental_planning': 'Bidang Tata Lingkungan',
    'dept.pollution_control': 'Bidang Pengendalian Pencemaran dan Penataan Lingkungan Hidup',
    'dept.waste_management': 'Bidang Pengelolaan Sampah',
    
    // Department Descriptions
    'dept.environmental_planning.desc': 'Mewujudkan tata kelola lingkungan yang berkelanjutan melalui perencanaan, pengawasan, dan pengendalian lingkungan di Kota Tasikmalaya',
    'dept.pollution_control.desc': 'Melaksanakan pengendalian pencemaran dan kerusakan lingkungan untuk mewujudkan kualitas lingkungan hidup yang lebih baik di Kota Tasikmalaya',
    'dept.waste_management.desc': 'Mewujudkan Kota Tasikmalaya yang bersih dan sehat melalui pengelolaan sampah yang terpadu dan berkelanjutan',
    
    // Department About
    'dept.environmental_planning.about': 'mempunyai tugas pokok menyelenggarakan perumusan kebijakan teknis dan pengoordinasian penyelenggaraan kebijakan perencanaan lingkungan hidup, pengelolaan keanekaragaman hayati dan pengelolaan ruang terbuka hijau (RTH).',
    'dept.pollution_control.about': 'mempunyai tugas pokok menyelenggarakan perumusan kebijakan teknis serta penyelenggaraan kebijakan di bidang pengendalian pencemaran dan/atau kerusakan lingkungan hidup serta pengawasan dan penyelesaian pengaduan masyarakat dalam bidang perlindungan dan pengelolaan lingkungan hidup.',
    'dept.waste_management.about': 'mempunyai tugas pokok mengoordinasikan perumusan kebijakan dan penyelenggaraan kebijakan pengelolaan sampah dan kemitraan lingkungan hidup.',
    
    // Titles
    'title.task_details_environmental': 'Rincian tugas Bidang Tata Lingkungan:',
    'title.task_details_pollution': 'Rincian tugas Bidang Pengendalian Pencemaran dan Penataan Lingkungan Hidup:',
    'title.task_details_waste': 'Rincian tugas Bidang Pengelolaan Sampah:',
  },
  en: {
    // Navbar
    'navbar.home': 'Home',
    'navbar.profile': 'Profile',
    'navbar.about': 'About DLH Tasikmalaya City',
    'navbar.vision_mission': 'Vision & Mission',
    'navbar.organizational_structure': 'Organizational Structure',
    'navbar.leadership': 'Leadership',
    'navbar.employees': 'Employees',
    'navbar.departments': 'Departments',
    'navbar.services': 'Public Services',
    'navbar.public_services': 'General Services',
    'navbar.iplc_service': 'IPLC Service',
    'navbar.ka_andal': 'KA-ANDAL Recommendation',
    'navbar.kelayakan_lingkungan': 'Environmental Feasibility',
    'navbar.sppl_service': 'SPPL Approval',
    'navbar.pengaduan_pencemaran': 'Pollution Complaints',
    'navbar.general_permit': 'General Permits',
    'navbar.amdal_permit': 'AMDAL Permits',
    'navbar.iplc_permit': 'IPLC Permits',
    'navbar.sppl_permit': 'SPPL Permits',
    'navbar.ukl_upl_permit': 'UKL-UPL Permits',
    'navbar.information': 'Information',
    'navbar.news': 'News',
    'navbar.articles': 'Articles',
    'navbar.agenda': 'Agenda',
    'navbar.umk_guidelines': 'UMK Guidelines',
    'navbar.documents': 'Documents',
    'navbar.regulations': 'Regulations',
    'navbar.emission_sop': 'Emission SOP',
    'navbar.wwtp_sop': 'WWTP SOP',
    'navbar.gallery': 'Gallery',
    'navbar.photo_gallery': 'Photo Gallery',
    'navbar.video_gallery': 'Video Gallery',
    'navbar.file_downloads': 'File Downloads',
    'navbar.complaints': 'Complaints',
    'navbar.contact': 'Contact',
    'navbar.links': 'Links',
    
    // Buttons
    'button.read_more': 'Read More',
    'button.hide': 'Hide',
    'button.back_to_departments': 'Back to Departments Page',
    'button.learn_more': 'Learn More',
    
    // Common
    'common.about': 'About',
    'common.task_details': 'Task Details',
    'common.main_tasks': 'Main Tasks',
    'common.functions': 'Functions',
    
    // Department Names
    'dept.environmental_planning': 'Environmental Planning Department',
    'dept.pollution_control': 'Pollution Control and Environmental Compliance Department',
    'dept.waste_management': 'Waste Management Department',
    
    // Department Descriptions
    'dept.environmental_planning.desc': 'Realizing sustainable environmental governance through planning, supervision, and environmental control in Tasikmalaya City',
    'dept.pollution_control.desc': 'Implementing pollution and environmental damage control to realize better environmental quality in Tasikmalaya City',
    'dept.waste_management.desc': 'Realizing a clean and healthy Tasikmalaya City through integrated and sustainable waste management',
    
    // Department About
    'dept.environmental_planning.about': 'has the main task of organizing technical policy formulation and coordinating the implementation of environmental planning policies, biodiversity management and green open space (RTH) management.',
    'dept.pollution_control.about': 'has the main task of organizing technical policy formulation and implementing policies in the field of pollution control and/or environmental damage as well as supervision and resolution of community complaints in the field of environmental protection and management.',
    'dept.waste_management.about': 'has the main task of coordinating policy formulation and implementing waste management and environmental partnership policies.',
    
    // Titles
    'title.task_details_environmental': 'Environmental Planning Department Task Details:',
    'title.task_details_pollution': 'Pollution Control and Environmental Compliance Department Task Details:',
    'title.task_details_waste': 'Waste Management Department Task Details:',
  }
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('id');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Get language from localStorage when component mounts
    const savedLanguage = localStorage.getItem('lang') as Language;
    if (savedLanguage && (savedLanguage === 'id' || savedLanguage === 'en')) {
      setLanguageState(savedLanguage);
    }
  }, []);

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
    localStorage.setItem('lang', newLanguage);
  };

  const t = (key: string): string => {
    const translation = translations[language][key as keyof typeof translations[typeof language]];
    return translation || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, mounted }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}