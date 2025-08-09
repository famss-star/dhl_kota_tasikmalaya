"use client";

import { useState } from "react";
import { Settings, Save } from "lucide-react";


const initialProfil = {
  namaInstansi: "DLH Kota Tasikmalaya",
  alamat: "Jl. Contoh No. 123, Tasikmalaya",
};
const initialStruktur = {
  struktur: "Struktur organisasi DLH Kota Tasikmalaya ...",
};
const initialTupoksi = {
  tupoksi: "Tugas pokok dan fungsi DLH Kota Tasikmalaya ...",
};
const initialVisiMisi = {
  visi: "Menjadi instansi lingkungan hidup terbaik ...",
  misi: "1. Melayani masyarakat\n2. Menjaga lingkungan ...",
};
const initialKontak = {
  email: "info@dlhtasik.go.id",
  telepon: "(0265) 123456",
};

export default function AdminPengaturan() {
  const [profil, setProfil] = useState(initialProfil);
  const [struktur, setStruktur] = useState(initialStruktur);
  const [tupoksi, setTupoksi] = useState(initialTupoksi);
  const [visiMisi, setVisiMisi] = useState(initialVisiMisi);
  const [kontak, setKontak] = useState(initialKontak);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-gradient-to-r from-gray-700 to-green-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-3">
              <Settings className="w-9 h-9 text-white" />
              Pengaturan Website
            </h1>
            <p className="text-xl md:text-2xl opacity-90">Kelola semua data profil, struktur, visi misi, kontak, dan warna website DLH Kota Tasikmalaya</p>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-8xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 md:p-12 border border-gray-200 dark:border-gray-700 space-y-10">
          {/* Profil Instansi */}
          <form id="profil" className="space-y-4" onSubmit={e => {e.preventDefault(); alert('Profil instansi disimpan!')}}>
            <h2 className="text-xl font-bold mb-2">Profil Instansi</h2>
            <div>
              <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">Nama Instansi</label>
              <input type="text" name="namaInstansi" value={profil.namaInstansi} onChange={e => setProfil({...profil, namaInstansi: e.target.value})} className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white" />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">Alamat</label>
              <input type="text" name="alamat" value={profil.alamat} onChange={e => setProfil({...profil, alamat: e.target.value})} className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white" />
            </div>
            <button type="submit" className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300">
              <Save className="w-5 h-5" /> Simpan Profil
            </button>
          </form>
          {/* Struktur Organisasi */}
          <form id="struktur" className="space-y-4" onSubmit={e => {e.preventDefault(); alert('Struktur organisasi disimpan!')}}>
            <h2 className="text-xl font-bold mb-2">Struktur Organisasi</h2>
            <div>
              <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">Struktur Organisasi</label>
              <textarea name="struktur" value={struktur.struktur} onChange={e => setStruktur({...struktur, struktur: e.target.value})} className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white min-h-[80px]" />
            </div>
            <button type="submit" className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300">
              <Save className="w-5 h-5" /> Simpan Struktur
            </button>
          </form>
          {/* Tugas & Fungsi */}
          <form id="tupoksi" className="space-y-4" onSubmit={e => {e.preventDefault(); alert('Tugas & Fungsi disimpan!')}}>
            <h2 className="text-xl font-bold mb-2">Tugas & Fungsi</h2>
            <div>
              <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">Tugas & Fungsi</label>
              <textarea name="tupoksi" value={tupoksi.tupoksi} onChange={e => setTupoksi({...tupoksi, tupoksi: e.target.value})} className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white min-h-[80px]" />
            </div>
            <button type="submit" className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300">
              <Save className="w-5 h-5" /> Simpan Tugas & Fungsi
            </button>
          </form>
          {/* Visi & Misi */}
          <form id="visi" className="space-y-4" onSubmit={e => {e.preventDefault(); alert('Visi & Misi disimpan!')}}>
            <h2 className="text-xl font-bold mb-2">Visi & Misi</h2>
            <div>
              <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">Visi</label>
              <input type="text" name="visi" value={visiMisi.visi} onChange={e => setVisiMisi({...visiMisi, visi: e.target.value})} className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white" />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">Misi</label>
              <textarea name="misi" value={visiMisi.misi} onChange={e => setVisiMisi({...visiMisi, misi: e.target.value})} className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white min-h-[80px]" />
            </div>
            <button type="submit" className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300">
              <Save className="w-5 h-5" /> Simpan Visi & Misi
            </button>
          </form>
          {/* Kontak */}
          <form id="kontak" className="space-y-4" onSubmit={e => {e.preventDefault(); alert('Kontak disimpan!')}}>
            <h2 className="text-xl font-bold mb-2">Kontak</h2>
            <div>
              <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">Email</label>
              <input type="email" name="email" value={kontak.email} onChange={e => setKontak({...kontak, email: e.target.value})} className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white" />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">Telepon</label>
              <input type="text" name="telepon" value={kontak.telepon} onChange={e => setKontak({...kontak, telepon: e.target.value})} className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white" />
            </div>
            <button type="submit" className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300">
              <Save className="w-5 h-5" /> Simpan Kontak
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
