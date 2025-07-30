

import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Mail, Instagram, Facebook, Twitter, Youtube, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-green-900 text-white pt-10 pb-4">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Kolom 1: Logo & Info */}
        <div className="flex flex-col items-center md:items-start gap-3">
          <Image
            src="https://www.dlh.tasikmalayakota.go.id/images/logo-white-footer.png"
            alt="DLH Kota Tasikmalaya"
            width={330}
            height={60}
            className="w-full max-w-[330px] h-auto object-contain mb-2"
            priority
          />
          {/* <div className="font-bold text-lg">DLH Kota Tasikmalaya</div> */}
          <div className="text-sm flex items-center gap-2">
            <MapPin size={16} className="inline-block text-green-200" />
            Jl. Ir. H. Juanda No. 277, Tasikmalaya
          </div>
          <div className="text-sm flex items-center gap-2">
            <Phone size={16} className="inline-block text-green-200" />
            Telp: <a href="tel:(0265)330382" className="hover:underline hover:text-green-300">(0265) 330382</a>
          </div>
          <div className="text-sm flex items-center gap-2">
            <Mail size={16} className="inline-block text-green-200" />
            Email: <a href="mailto:dlh@tasikmalayakota.go.id" className="hover:underline hover:text-green-300 break-all">dlh@tasikmalayakota.go.id</a>
          </div>
          <div className="flex gap-3 mt-2">
            <a 
              href="https://instagram.com/dlhkotatasikmalaya" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Instagram" 
              className="hover:text-green-300">
              <Instagram size={22} className="inline-block" />
            </a>
            <a 
              href="https://facebook.com/dlhkotatasikmalaya" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Facebook" 
              className="hover:text-green-300">
              <Facebook size={22} className="inline-block" />
            </a>
            <a 
              href="https://twitter.com/dlhkotatasik" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Twitter" 
              className="hover:text-green-300">
              <Twitter size={22} className="inline-block" />
            </a>
            <a 
              href="https://wa.me/6281222222222" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="WhatsApp" 
              className="hover:text-green-300">
              <svg width="22" height="22" viewBox="0 0 32 32" fill="currentColor" className="inline-block">
                <path d="M16.003 3.2c-7.06 0-12.8 5.74-12.8 12.8 0 2.26.6 4.47 1.74 6.41L3.2 28.8l6.6-1.72c1.87 1.02 3.98 1.56 6.2 1.56h.01c7.06 0 12.8-5.74 12.8-12.8 0-3.42-1.33-6.64-3.75-9.06-2.42-2.42-5.64-3.75-9.06-3.75zm0 23.2c-1.97 0-3.89-.53-5.56-1.53l-.4-.24-3.92 1.02 1.05-3.82-.26-.39c-1.09-1.65-1.67-3.57-1.67-5.54 0-5.64 4.59-10.23 10.23-10.23 2.73 0 5.29 1.06 7.22 2.99 1.93 1.93 3 4.49 3 7.22 0 5.64-4.59 10.23-10.23 10.23zm5.6-7.67c-.31-.16-1.84-.91-2.12-1.01-.28-.1-.48-.16-.68.16-.2.31-.78 1.01-.96 1.22-.18.2-.36.23-.67.08-.31-.16-1.31-.48-2.5-1.53-.92-.82-1.54-1.83-1.72-2.14-.18-.31-.02-.48.13-.63.13-.13.29-.34.43-.51.14-.17.18-.29.29-.48.1-.2.05-.37 0-.52-.05-.16-.45-1.09-.62-1.5-.16-.39-.33-.34-.46-.35-.12-.01-.26-.01-.4-.01-.14 0-.37.05-.56.25-.19.2-.74.72-.74 1.74s.76 2.02.87 2.16c.11.14 1.5 2.39 3.63 3.26.51.22.91.35 1.22.45.51.16.97.14 1.34.09.41-.06 1.23-.5 1.4-.98.17-.48.17-.89.12-.98-.05-.09-.19-.14-.4-.25z"/>
              </svg>
            </a>
            <a 
              href="https://youtube.com/@dlhkotatasikmalaya" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="YouTube" 
              className="hover:text-green-300">
              <Youtube size={22} className="inline-block" />
            </a>
          </div>
        </div>
        {/* Kolom 2: Link Internal */}
        <div className="flex flex-col items-center md:items-start pl-5 gap-2">
          <div className="font-bold text-base mb-2">Link Internal</div>
          <Link href="/" className="hover:underline hover:text-green-300">Home</Link>
          <Link href="/informasi/berita" className="hover:underline hover:text-green-300">Berita & Event</Link>
          <Link href="/informasi/agenda" className="hover:underline hover:text-green-300">Agenda Penting</Link>
          <Link href="/galeri/foto" className="hover:underline hover:text-green-300">Galeri Photo</Link>
          <Link href="/galeri/video" className="hover:underline hover:text-green-300">Galeri Video</Link>
          <a href="/file-download" className="hover:underline hover:text-green-300">File Download</a>
        </div>

        {/* Kolom 3: Link Terkait */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="font-bold text-base mb-2">Link Terkait</div>
          <a href="https://tasikmalayakota.go.id" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-green-300">Pemerintah Kota Tasikmalaya</a>
          <a href="https://jdih.tasikmalayakota.go.id" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-green-300">JDIH Kota Tasikmalaya</a>
          <a href="https://lpse.tasikmalayakota.go.id" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-green-300">LPSE Kota Tasikmalaya</a>
          <a href="https://bapenda.tasikmalayakota.go.id" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-green-300">Bapenda Kota Tasikmalaya</a>
          <a href="https://dishub.tasikmalayakota.go.id" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-green-300">Dishub Kota Tasikmalaya</a>
        </div>
        {/* Kolom 4: Jam Operasional */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="font-bold text-base mb-2">Jam Operasional</div>
          <div className="text-sm">
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              <div className="font-semibold">Senin - Kamis</div>
              <div>08:00 - 16:00 WIB</div>
              
              <div className="font-semibold">Jumat</div>
              <div>08:00 - 11:30 WIB</div>
              
              <div className="font-semibold">Sabtu & Minggu</div>
              <div className='text-red-500 font-bold text-center'>Libur</div>
              
              <div className="font-semibold">Istirahat</div>
              <div>12:00 - 13:00 WIB</div>
            </div>
            
            <div className="mt-4 text-yellow-300">
              <div>* Pengecualian untuk pelayanan darurat</div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto text-center text-xs mt-8 border-t border-green-800 pt-3">
        Copyright ©2025 Dinas Lingkungan Hidup - Pemerintah Kota Tasikmalaya - www.dlh.tasikmalayakota.go.id. All Rights Reserved
      </div>
    </footer>
  );
}
