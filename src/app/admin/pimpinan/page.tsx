"use client";

import { useState } from "react";
import { UserCog, Save } from "lucide-react";

const initialPimpinan = {
  nama: "Nama Pimpinan",
  jabatan: "Kepala DLH Kota Tasikmalaya",
  foto: "",
  biodata: "Biodata singkat pimpinan ...",
};

export default function AdminPimpinan() {
  const [pimpinan, setPimpinan] = useState(initialPimpinan);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-gradient-to-r from-gray-700 to-green-600 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 flex items-center justify-center gap-3">
              <UserCog className="w-8 h-8 text-white" />
              Manajemen Pimpinan
            </h1>
            <p className="text-lg md:text-xl opacity-90">Kelola data pimpinan DLH Kota Tasikmalaya</p>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-8xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 md:p-10 border border-gray-200 dark:border-gray-700">
          <form className="space-y-5" onSubmit={e => {e.preventDefault(); alert('Data pimpinan disimpan!')}}>
            <div>
              <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">Nama Pimpinan</label>
              <input type="text" name="nama" value={pimpinan.nama} onChange={e => setPimpinan({...pimpinan, nama: e.target.value})} className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white" />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">Jabatan</label>
              <select
                name="jabatan"
                value={pimpinan.jabatan}
                onChange={e => setPimpinan({ ...pimpinan, jabatan: e.target.value })}
                className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="Kepala DLH Kota Tasikmalaya">Kepala DLH Kota Tasikmalaya</option>
                <option value="Sekretaris">Sekretaris</option>
                <option value="Kepala Bidang Tata Lingkungan">Kepala Bidang Tata Lingkungan</option>
                <option value="Kepala Bidang Pengelolaan Sampah">Kepala Bidang Pengelolaan Sampah</option>
                <option value="Kepala Bidang Pengendalian Pencemaran">Kepala Bidang Pengendalian Pencemaran</option>
                <option value="Kepala Sub Bagian Umum">Kepala Sub Bagian Umum</option>
                <option value="Kepala Sub Bagian Keuangan">Kepala Sub Bagian Keuangan</option>
                <option value="Kepala Sub Bagian Kepegawaian">Kepala Sub Bagian Kepegawaian</option>
                <option value="Lainnya">Lainnya</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">Foto (URL)</label>
              <input type="text" name="foto" value={pimpinan.foto} onChange={e => setPimpinan({...pimpinan, foto: e.target.value})} className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white" />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">Biodata</label>
              <textarea name="biodata" value={pimpinan.biodata} onChange={e => setPimpinan({...pimpinan, biodata: e.target.value})} className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white min-h-[80px]" />
            </div>
            <button type="submit" className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300">
              <Save className="w-5 h-5" /> Simpan Data Pimpinan
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
