
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-green-900 text-white pt-10 pb-4">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Kolom 1: Logo & Info */}
        <div className="flex flex-col items-center md:items-start gap-3">
          <img
            src="https://www.dlh.tasikmalayakota.go.id/images/logo-white-footer.png"
            alt="DLH Kota Tasikmalaya"
            className="h-auto w-auto object-contain mb-2"
          />
          <div className="font-bold text-lg">DLH Kota Tasikmalaya</div>
          <div className="text-xs mb-2">Dinas Lingkungan Hidup Kota Tasikmalaya</div>
          <div className="text-sm">Jl. Ir. H. Juanda No. 277, Tasikmalaya</div>
          <div className="text-sm">Telp: (0265) 330382</div>
          <div className="text-sm">Email: <a href="mailto:dlh@tasikmalayakota.go.id" className="underline hover:text-green-300">dlh@tasikmalayakota.go.id</a></div>
          <div className="text-sm">Website: <a href="https://dlh.tasikmalayakota.go.id" className="underline hover:text-green-300" target="_blank" rel="noopener noreferrer">dlh.tasikmalayakota.go.id</a></div>
          <div className="flex gap-3 mt-2">
            <a 
              href="https://instagram.com/dlhkotatasikmalaya" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Instagram" 
              className="hover:text-green-300">
              {/* ...svg Instagram... */}
              <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm8.75 2.25a.75.75 0 1 1 1.5 0a.75.75 0 0 1-1.5 0zM12 7.25a4.75 4.75 0 1 1 0 9.5a4.75 4.75 0 0 1 0-9.5zm0 1.5a3.25 3.25 0 1 0 0 6.5a3.25 3.25 0 0 0 0-6.5z" />
              </svg>
            </a>
            <a 
              href="https://facebook.com/dlhkotatasikmalaya" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Facebook" 
              className="hover:text-green-300">
              {/* ...svg Facebook... */}
              <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12c0-5.522-4.477-10-10-10S2 6.478 2 12c0 5.019 3.676 9.163 8.438 9.877v-6.987h-2.54v-2.89h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.261c-1.243 0-1.631.771-1.631 1.562v1.875h2.773l-.443 2.89h-2.33v6.987C18.324 21.163 22 17.019 22 12z" /></svg>
            </a>
            <a 
              href="https://twitter.com/dlhkotatasik" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Twitter" 
              className="hover:text-green-300">
              {/* ...svg Twitter... */}
              <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.46 6c-.77.35-1.6.59-2.47.7a4.3 4.3 0 0 0 1.88-2.37c-.83.5-1.75.87-2.72 1.07A4.28 4.28 0 0 0 16.11 4c-2.37 0-4.29 1.92-4.29 4.29 0 .34.04.67.11.99C7.69 9.13 4.07 7.38 1.64 4.77c-.37.64-.58 1.38-.58 2.17 0 1.5.76 2.83 1.92 3.61-.71-.02-1.38-.22-1.97-.54v.05c0 2.09 1.49 3.83 3.47 4.23-.36.1-.74.16-1.13.16-.28 0-.54-.03-.8-.08.54 1.68 2.12 2.9 3.99 2.93A8.6 8.6 0 0 1 2 19.54c-.29 0-.57-.02-.85-.05A12.13 12.13 0 0 0 8.29 21c7.55 0 11.68-6.26 11.68-11.68 0-.18-.01-.36-.02-.54A8.18 8.18 0 0 0 22.46 6z" /></svg>
            </a>
            <a 
              href="https://wa.me/6281222222222" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="WhatsApp" 
              className="hover:text-green-300">
              {/* ...svg WhatsApp... */}
              <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.028-.967-.271-.099-.468-.149-.666.15-.198.297-.767.967-.94 1.166-.173.198-.347.223-.644.075-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.447-.52.149-.174.198-.298.298-.497.099-.198.05-.373-.025-.522-.075-.149-.666-1.611-.912-2.207-.242-.579-.487-.5-.666-.51-.173-.008-.373-.01-.572-.01-.198 0-.52.075-.792.373-.271.298-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.075.149.198 2.099 3.205 5.077 4.377.711.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.413-.075-.124-.271-.198-.568-.347z" /></svg>
            </a>
          </div>
        </div>
        {/* Kolom 2: Link Internal */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="font-bold text-base mb-2">Link Internal</div>
          <Link href="/" className="hover:underline hover:text-green-300">Home</Link>
          <Link href="/informasi/berita" className="hover:underline hover:text-green-300">Berita & Event</Link>
          <Link href="/informasi/agenda" className="hover:underline hover:text-green-300">Agenda Penting</Link>
          <Link href="/galeri/foto" className="hover:underline hover:text-green-300">Galeri Photo</Link>
          <Link href="/galeri/video" className="hover:underline hover:text-green-300">Galeri Video</Link>
          <a href="/file-download" className="hover:underline hover:text-green-300">File Download</a>
        </div>
        {/* Kolom 3: Lokasi Kantor (Maps) */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="font-bold text-base mb-2">Lokasi Kantor DLH Kota Tasikmalaya</div>
          <iframe
src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d10521.109421788646!2d108.22818805156746!3d-7.352903338909428!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6f57799eeeb335%3A0xbc9b5d991117f749!2sKantor%20Dinas%20Lingkungan%20Hidup%20Kota%20Tasikmalaya!5e1!3m2!1sen!2sus!4v1752503640337!5m2!1sen!2sus"            width="100%"
            height="75%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Lokasi DLH Kota Tasikmalaya"
          ></iframe>
        </div>
      </div>
      <div className="container mx-auto text-center text-xs mt-8 border-t border-green-800 pt-3">
        Copyright ©2017 Dinas Lingkungan Hidup - Pemerintah Kota Tasikmalaya - www.dlh.tasikmalayakota.go.id. All Rights Reserved
      </div>
    </footer>
  );
}
